/**
 * docb-core.js
 * 4 LAWS Academy — Shared Doc B AI capabilities
 * Version 1.0.0
 *
 * Provides:
 *   - Screenshot paste interception on any textarea
 *   - Voice output (SpeechSynthesis) after every Doc B reply
 *   - Voice toggle button rendering + localStorage persistence
 *   - Pending screenshot lifecycle (set / get / clear)
 *
 * Usage per page:
 *   DocBCore.init({ inputId, previewId, thumbId, clearBtnId, voiceBtnId, getLang })
 *   DocBCore.speak(text)
 *   DocBCore.getPending()   -> { base64, dataUrl, mediaType } or null
 *   DocBCore.clearPending()
 *   DocBCore.buildContent(text, getLang)  -> string or array (with image block)
 *
 * Constitution compliance:
 *   ES5 only. No arrow functions. No const/let. No external dependencies.
 *   Safe on pages that never call DocBCore.init() — fully inert until invoked.
 */

(function (global) {
  'use strict';

  var _pending   = null;   // { base64, dataUrl, mediaType }
  var _voiceOn   = true;
  var _voiceKey  = '4laws-voice-on';

  // ── Load persisted voice preference ──────────────────────────────────────
  try {
    var _stored = localStorage.getItem(_voiceKey);
    if (_stored === 'false') { _voiceOn = false; }
  } catch (e) {}

  // ── INTERNAL HELPERS ─────────────────────────────────────────────────────

  function _saveVoicePref() {
    try { localStorage.setItem(_voiceKey, _voiceOn ? 'true' : 'false'); } catch (e) {}
  }

  function _cancelSpeech() {
    if (global.speechSynthesis) { global.speechSynthesis.cancel(); }
  }

  function _clearPreviewUI(previewId, thumbId) {
    var prev  = document.getElementById(previewId);
    var thumb = document.getElementById(thumbId);
    if (prev)  { prev.style.display = 'none'; }
    if (thumb) { thumb.src = ''; }
  }

  // ── PUBLIC API ────────────────────────────────────────────────────────────

  var DocBCore = {};

  /**
   * init — wire paste listener, voice button, and image clear button.
   * Call once per page after DOM is ready.
   *
   * @param {Object} cfg
   *   inputId    {string}   ID of the chat textarea
   *   previewId  {string}   ID of the image preview container div
   *   thumbId    {string}   ID of the <img> thumbnail element
   *   clearBtnId {string}   ID of the ✕ clear-screenshot button
   *   voiceBtnId {string}   ID of the 🔊 voice toggle button
   *   getLang    {function} Returns 'en' or 'es' — called at speak time
   */
  DocBCore.init = function (cfg) {
    cfg = cfg || {};

    // ── Voice button ──────────────────────────────────────────────────────
    var voiceBtn = document.getElementById(cfg.voiceBtnId || '');
    if (voiceBtn) {
      if (_voiceOn) { voiceBtn.classList.add('active'); }
      voiceBtn.addEventListener('click', function () {
        _voiceOn = !_voiceOn;
        _saveVoicePref();
        voiceBtn.classList.toggle('active', _voiceOn);
        if (!_voiceOn) { _cancelSpeech(); }
      });
    }

    // ── Paste listener on document — catches paste anywhere on the page ──────
    document.addEventListener('paste', function (e) {
      var items = e.clipboardData && e.clipboardData.items;
      if (!items) { return; }
      var i;
      for (i = 0; i < items.length; i++) {
        if (/^image\//.test(items[i].type)) {
          var file = items[i].getAsFile();
          if (!file) { continue; }
          (function (f) {
            var reader = new FileReader();
            reader.onloadend = function () {
              var dataUrl   = reader.result;
              var base64    = dataUrl.split(',')[1];
              var mediaType = f.type || 'image/png';
              _pending = { base64: base64, dataUrl: dataUrl, mediaType: mediaType };
              var prev  = document.getElementById(cfg.previewId || '');
              var thumb = document.getElementById(cfg.thumbId   || '');
              if (thumb) { thumb.src = dataUrl; }
              if (prev)  { prev.style.display = ''; }
              /* Also make the parent container visible if hidden */
              if (prev && prev.parentElement && prev.parentElement.style.display === 'none') {
                prev.style.display = 'flex';
              }
            };
            reader.readAsDataURL(f);
          }(file));
          e.preventDefault();
          return;
        }
      }
    });

    // ── Clear screenshot button ───────────────────────────────────────────
    var clearBtn = document.getElementById(cfg.clearBtnId || '');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        _pending = null;
        _clearPreviewUI(cfg.previewId, cfg.thumbId);
      });
    }

    // Store cfg on the object so clearPending/getPending can reference UI IDs
    DocBCore._cfg = cfg;
  };

  /**
   * speak — fire SpeechSynthesis for a Doc B reply.
   * Respects voiceOn toggle and lang preference.
   *
   * @param {string}   text
   * @param {function} getLang  Returns 'en' or 'es'
   */
  DocBCore.speak = function (text, getLang) {
    if (!_voiceOn || !global.speechSynthesis || !text) { return; }
    _cancelSpeech();
    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    var utt  = new SpeechSynthesisUtterance(text);
    utt.lang = (lang === 'es') ? 'es-US' : 'en-US';
    global.speechSynthesis.speak(utt);
  };

  /**
   * getPending — returns the pending screenshot object or null.
   */
  DocBCore.getPending = function () {
    return _pending;
  };

  /**
   * clearPending — clears pending screenshot and hides preview UI.
   * Uses IDs from the last init() call.
   */
  DocBCore.clearPending = function () {
    _pending = null;
    var cfg = DocBCore._cfg || {};
    _clearPreviewUI(cfg.previewId, cfg.thumbId);
  };

  /**
   * buildContent — returns the user message content block.
   * If a screenshot is pending, returns an array with image + text blocks.
   * If no screenshot, returns the plain text string.
   * Always calls clearPending() after building.
   *
   * @param {string}   text      The typed message (may be empty)
   * @param {function} getLang   Returns 'en' or 'es'
   * @returns {string|Array}
   */
  DocBCore.buildContent = function (text, getLang) {
    var lang    = (typeof getLang === 'function') ? getLang() : 'en';
    var snap    = _pending;
    var content;

    if (snap) {
      var caption = text || (lang === 'es' ? '\u00bfQu\u00e9 ves aqu\u00ed?' : 'What do you see here?');
      content = [
        { type: 'image', source: { type: 'base64', media_type: snap.mediaType, data: snap.base64 } },
        { type: 'text',  text: caption }
      ];
    } else {
      content = text;
    }

    DocBCore.clearPending();
    return content;
  };

  /**
   * displayText — returns the string to show in the chat bubble
   * for the current message (handles screenshot placeholder).
   *
   * @param {string}   text
   * @param {function} getLang
   * @returns {string}
   */
  DocBCore.displayText = function (text, getLang) {
    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    if (!text && _pending) {
      return lang === 'es' ? '[Captura de pantalla enviada]' : '[Screenshot sent]';
    }
    return text;
  };

  /**
   * voiceOn — read current voice preference (useful for page-level checks).
   */
  DocBCore.isVoiceOn = function () {
    return _voiceOn;
  };

  // ── Expose globally ───────────────────────────────────────────────────────
  global.DocBCore = DocBCore;

}(window));
