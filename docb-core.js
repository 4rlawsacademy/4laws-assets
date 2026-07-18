/**
 * docb-core.js
 * 4 LAWS Academy — Shared Doc B AI capabilities
 * Version 2.0.0
 *
 * Provides:
 *   - Screenshot paste interception (document-level listener)
 *   - Screenshot paste feedback — gold thumbnail preview, unmissable
 *   - Camera button support — mobile photo input, same pipeline as paste
 *   - Voice output (SpeechSynthesis) after every Doc B reply
 *   - Continuous mic mode — auto-reopens after Doc B finishes speaking
 *   - Voice toggle button rendering + localStorage persistence
 *   - Pending screenshot lifecycle (set / get / clear)
 *
 * Usage per page:
 *   DocBCore.init({ inputId, previewId, thumbId, clearBtnId, voiceBtnId,
 *                   cameraInputId, continuousMicFn, getLang })
 *   DocBCore.speak(text, getLang)
 *   DocBCore.getPending()   -> { base64, dataUrl, mediaType } or null
 *   DocBCore.clearPending()
 *   DocBCore.buildContent(text, getLang)  -> string or array (with image block)
 *   DocBCore.displayText(text, getLang)   -> string for chat bubble
 *   DocBCore.isVoiceOn()
 *
 * Constitution compliance:
 *   ES5 only. No arrow functions. No const/let. No external dependencies.
 *   Safe on pages that never call DocBCore.init() — fully inert until invoked.
 */

(function (global) {
  'use strict';

  var _pending        = null;   // { base64, dataUrl, mediaType }
  var _voiceOn        = true;
  var _voiceKey       = '4laws-voice-on';
  var _cfg            = {};
  var _continuousMicFn = null;  // page-level function to restart mic after speech

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

  function _showPreview(dataUrl) {
    var prev  = document.getElementById(_cfg.previewId || '');
    var thumb = document.getElementById(_cfg.thumbId   || '');
    if (thumb) { thumb.src = dataUrl; }
    if (prev) {
      prev.style.display = 'flex';
      /* Pulse the preview gold to make it unmissable */
      prev.style.transition = 'box-shadow 0.3s';
      prev.style.boxShadow  = '0 0 0 2px #c8a84b';
      setTimeout(function() {
        if (prev) { prev.style.boxShadow = 'none'; }
      }, 1200);
    }
    /* If parent is hidden (e.g. sessInputArea display:none), show preview independently */
    if (prev && prev.parentElement && prev.parentElement.style.display === 'none') {
      prev.style.position = 'fixed';
      prev.style.bottom   = '80px';
      prev.style.left     = '50%';
      prev.style.transform = 'translateX(-50%)';
      prev.style.zIndex   = '9999';
      prev.style.background = '#0a0c0f';
      prev.style.border   = '1px solid rgba(200,168,75,0.5)';
      prev.style.borderRadius = '6px';
      prev.style.padding  = '8px 12px';
    }
  }

  function _setPending(base64, dataUrl, mediaType) {
    _pending = { base64: base64, dataUrl: dataUrl, mediaType: mediaType };
    _showPreview(dataUrl);
  }

  function _readFileAndSet(file) {
    var reader = new FileReader();
    reader.onloadend = function () {
      var dataUrl   = reader.result;
      var base64    = dataUrl.split(',')[1];
      var mediaType = file.type || 'image/png';
      _setPending(base64, dataUrl, mediaType);
    };
    reader.readAsDataURL(file);
  }

  // ── PUBLIC API ────────────────────────────────────────────────────────────

  var DocBCore = {};

  /**
   * init — wire all DocBCore capabilities for this page.
   * Call once per page after DOM is ready.
   *
   * @param {Object} cfg
   *   inputId          {string}    ID of the chat textarea
   *   previewId        {string}    ID of the image preview container div
   *   thumbId          {string}    ID of the <img> thumbnail element
   *   clearBtnId       {string}    ID of the X clear-screenshot button
   *   voiceBtnId       {string}    ID of the voice toggle button
   *   cameraInputId    {string}    ID of the hidden <input type="file"> for camera
   *   continuousMicFn  {function}  Page function to call after speech ends to reopen mic
   *   getLang          {function}  Returns 'en' or 'es'
   */
  DocBCore.init = function (cfg) {
    _cfg = cfg || {};
    _continuousMicFn = (typeof _cfg.continuousMicFn === 'function') ? _cfg.continuousMicFn : null;

    // ── Voice button ──────────────────────────────────────────────────────
    var voiceBtn = document.getElementById(_cfg.voiceBtnId || '');
    if (voiceBtn) {
      if (_voiceOn) { voiceBtn.classList.add('active'); }
      voiceBtn.addEventListener('click', function () {
        _voiceOn = !_voiceOn;
        _saveVoicePref();
        voiceBtn.classList.toggle('active', _voiceOn);
        if (!_voiceOn) { _cancelSpeech(); }
      });
    }

    // ── Paste listener on document — catches paste anywhere on the page ───
    document.addEventListener('paste', function (e) {
      var items = e.clipboardData && e.clipboardData.items;
      if (!items) { return; }
      var i;
      for (i = 0; i < items.length; i++) {
        if (/^image\//.test(items[i].type)) {
          var file = items[i].getAsFile();
          if (!file) { continue; }
          _readFileAndSet(file);
          e.preventDefault();
          return;
        }
      }
    });

    // ── Camera input handler — for mobile photo/file picker ───────────────
    var camInput = document.getElementById(_cfg.cameraInputId || '');
    if (camInput) {
      camInput.addEventListener('change', function () {
        if (!camInput.files || !camInput.files[0]) { return; }
        _readFileAndSet(camInput.files[0]);
        camInput.value = '';
      });
    }

    // ── Clear screenshot button ───────────────────────────────────────────
    var clearBtn = document.getElementById(_cfg.clearBtnId || '');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        _pending = null;
        _clearPreviewUI(_cfg.previewId, _cfg.thumbId);
      });
    }

    DocBCore._cfg = _cfg;
  };

  /**
   * speak — fire SpeechSynthesis for a Doc B reply.
   * After speech ends, reopens continuous mic if continuousMicFn is set.
   *
   * @param {string}   text
   * @param {function} getLang  Returns 'en' or 'es'
   */
  DocBCore.speak = function (text, getLang) {
    if (!_voiceOn || !global.speechSynthesis || !text) {
      /* Even if voice is off, still reopen mic in continuous mode */
      if (_continuousMicFn) { setTimeout(_continuousMicFn, 300); }
      return;
    }
    _cancelSpeech();
    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    var utt  = new SpeechSynthesisUtterance(text);
    utt.lang = (lang === 'es') ? 'es-US' : 'en-US';
    utt.onend = function () {
      if (_continuousMicFn) { setTimeout(_continuousMicFn, 400); }
    };
    utt.onerror = function () {
      if (_continuousMicFn) { setTimeout(_continuousMicFn, 400); }
    };
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
   */
  DocBCore.clearPending = function () {
    _pending = null;
    _clearPreviewUI(_cfg.previewId, _cfg.thumbId);
  };

  /**
   * buildContent — returns the user message content block.
   * If a screenshot is pending, returns array with image + text blocks.
   * If no screenshot, returns plain text string.
   * Always calls clearPending() after building.
   *
   * @param {string}   text
   * @param {function} getLang
   * @returns {string|Array}
   */
  DocBCore.buildContent = function (text, getLang) {
    var lang  = (typeof getLang === 'function') ? getLang() : 'en';
    var snap  = _pending;
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
   * displayText — returns the string to show in the chat bubble.
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
   * isVoiceOn — read current voice preference.
   */
  DocBCore.isVoiceOn = function () {
    return _voiceOn;
  };

  /**
   * setContinuousMic — set or clear the continuous mic callback after init.
   * Useful for pages that wire the mic function after DocBCore.init() runs.
   *
   * @param {function|null} fn
   */
  DocBCore.setContinuousMic = function (fn) {
    _continuousMicFn = (typeof fn === 'function') ? fn : null;
  };

  // ── Expose globally ───────────────────────────────────────────────────────
  global.DocBCore = DocBCore;

}(window));
