/**
 * docb-core.js
 * 4 LAWS Academy — Shared Doc B AI capabilities
 * Version 3.1.0 — THE ONE VOICE (11/14/26, the Voice bench)
 *
 * WHERE IT LIVES: the GitHub shelf (4rlawsacademy/4laws-assets), under
 *   this same name. Every page with a Doc B chat loads it (seen: /todos).
 * THE WAY BACK: upload the earlier docb-core.js (Version 2.0.0, the robot
 *   voice) over this one, under the same name, and purge.
 * NEEDS: Main Apps Script with AUDIT 92 THE ONE VOICE (action docbSpeak).
 *   Until that is live, Doc B is simply silent.
 *
 * What changed in 3.x:
 *   Doc B speaks with the one house voice (ElevenLabs "David") on every
 *   page. This file holds NO key and never talks to ElevenLabs. It asks
 *   the house server "say this"; the house checks the member is signed
 *   in, keeps the key, and sends the sound back. The browser's robot
 *   voice (SpeechSynthesis) is retired: if the house cannot speak, Doc B
 *   stays silent, never the robot. Voice is ON by default; the sound
 *   button turns it off (saved).
 *
 * Provides:
 *   - Screenshot paste interception (document-level listener)
 *   - Screenshot paste feedback — gold thumbnail preview, unmissable
 *   - Camera button support — mobile photo input, same pipeline as paste
 *   - Voice output (the house voice) after every Doc B reply
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

  // ── THE ONE VOICE — the house speaks; this file only asks ────────────────
  var _HOUSE_URL   = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var _SESSION_KEY = '4laws-session';     // the member's sign-in, as every page keeps it
  var _MEMBER_KEY  = '4laws-member-id';
  var _SEND_MAX    = 3000;  // letters sent to the house; the house keeps its own cap
  var _audio       = null;  // one shared <audio> for the whole page
  var _xhr         = null;  // the request in flight, if any
  var _objUrl      = null;  // the sound now loaded, if any
  var _speakSeq    = 0;     // only the newest reply may speak
  var _restUntil   = 0;     // the house said "quiet for now": do not ask again until then
  var _SILENCE     = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

  // ── Load persisted voice preference ──────────────────────────────────────
  try {
    var _stored = localStorage.getItem(_voiceKey);
    if (_stored === 'false') { _voiceOn = false; }
  } catch (e) {}

  // ── INTERNAL HELPERS ─────────────────────────────────────────────────────

  function _saveVoicePref() {
    try { localStorage.setItem(_voiceKey, _voiceOn ? 'true' : 'false'); } catch (e) {}
  }

  function _stored_(key) {
    try { return localStorage.getItem(key) || ''; } catch (e) { return ''; }
  }

  function _getAudio() {
    if (!_audio && typeof global.Audio === 'function') {
      try { _audio = new global.Audio(); } catch (e) { _audio = null; }
    }
    return _audio;
  }

  function _micBack(delay) {
    if (_continuousMicFn) { setTimeout(_continuousMicFn, delay); }
  }

  /* Stops any reply being fetched or spoken. Returns true if one was. */
  function _cancelSpeech() {
    var wasActive = false;
    _speakSeq++;
    if (_xhr) {
      wasActive = true;
      try { _xhr.onload = null; _xhr.onerror = null; _xhr.ontimeout = null; _xhr.abort(); } catch (e) {}
      _xhr = null;
    }
    if (_audio) {
      if (!_audio.paused && _objUrl) { wasActive = true; }
      _audio.onended = null;
      _audio.onerror = null;
      try { _audio.pause(); } catch (e2) {}
    }
    if (_objUrl) {
      try { if (_objUrl.indexOf('blob:') === 0) { global.URL.revokeObjectURL(_objUrl); } } catch (e3) {}
      _objUrl = null;
    }
    /* The retired robot: silence it too, in case an old page started it */
    try { if (global.speechSynthesis) { global.speechSynthesis.cancel(); } } catch (e4) {}
    return wasActive;
  }

  /* Phones only let a page play sound after a tap. On the first tap or key,
     play one moment of silence so Doc B's later replies are allowed to speak. */
  function _unlockAudio() {
    document.removeEventListener('touchend', _unlockAudio, true);
    document.removeEventListener('click',    _unlockAudio, true);
    document.removeEventListener('keydown',  _unlockAudio, true);
    var a = _getAudio();
    if (!a || _objUrl) { return; }
    try {
      a.src = _SILENCE;
      var p = a.play();
      if (p && typeof p['catch'] === 'function') { p['catch'](function () {}); }
    } catch (e) {}
  }
  try {
    document.addEventListener('touchend', _unlockAudio, true);
    document.addEventListener('click',    _unlockAudio, true);
    document.addEventListener('keydown',  _unlockAudio, true);
  } catch (e) {}

  /* What the voice should say: the words, without the writing marks. */
  function _cleanForSpeech(text) {
    var t = String(text);
    t = t.replace(/```[\s\S]*?```/g, ' ');
    t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    t = t.replace(/<[^>]+>/g, ' ');
    t = t.replace(/https?:\/\/\S+/g, ' ');
    t = t.replace(/[*_#`~|]/g, ' ');
    t = t.replace(/\s+/g, ' ');
    t = t.replace(/^\s+|\s+$/g, '');
    if (t.length > _SEND_MAX) { t = t.substring(0, _SEND_MAX); }
    return t;
  }

  /* The house sends the sound as text (base64). Make it something <audio> can play. */
  function _soundUrl(b64, mime) {
    try {
      if (global.atob && global.Uint8Array && global.Blob && global.URL && global.URL.createObjectURL) {
        var bin = global.atob(b64), n = bin.length, bytes = new global.Uint8Array(n), i;
        for (i = 0; i < n; i++) { bytes[i] = bin.charCodeAt(i); }
        return global.URL.createObjectURL(new global.Blob([bytes], { type: mime }));
      }
    } catch (e) {}
    return 'data:' + mime + ';base64,' + b64;
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
        if (!_voiceOn) {
          if (_cancelSpeech()) { _micBack(400); }
        }
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
   * speak — say a Doc B reply aloud in the one house voice.
   * Asks the house server for the sound (the house checks the member is
   * signed in and holds the key). After speech ends — or if it cannot
   * play — reopens continuous mic if continuousMicFn is set. Never falls
   * back to the robot voice.
   *
   * @param {string}   text
   * @param {function} getLang  Returns 'en' or 'es' (the voice follows the words)
   */
  DocBCore.speak = function (text, getLang) {
    var clean   = (_voiceOn && text) ? _cleanForSpeech(text) : '';
    var session = clean ? _stored_(_SESSION_KEY) : '';
    var member  = clean ? _stored_(_MEMBER_KEY)  : '';
    var now     = new Date().getTime();
    if (!clean || !session || !member || now < _restUntil ||
        typeof global.XMLHttpRequest === 'undefined' || !_getAudio()) {
      /* Even if voice is off, still reopen mic in continuous mode */
      _micBack(300);
      return;
    }
    _cancelSpeech();
    var seq      = _speakSeq;
    var finished = false;
    function done() {
      if (finished) { return; }
      finished = true;
      if (seq !== _speakSeq) { return; }
      if (_audio) { _audio.onended = null; _audio.onerror = null; }
      if (_objUrl) {
        try { if (_objUrl.indexOf('blob:') === 0) { global.URL.revokeObjectURL(_objUrl); } } catch (e) {}
        _objUrl = null;
      }
      _micBack(400);
    }

    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    var xhr  = new global.XMLHttpRequest();
    _xhr = xhr;
    try {
      /* No headers set: the house's door takes a plain post, as every page sends it */
      xhr.open('POST', _HOUSE_URL, true);
      xhr.timeout = 40000;
    } catch (e) {
      _xhr = null;
      done();
      return;
    }
    xhr.onload = function () {
      if (_xhr === xhr) { _xhr = null; }
      if (seq !== _speakSeq) { return; }
      var d = null;
      try { d = JSON.parse(xhr.responseText); } catch (eP) { d = null; }
      if (!d || d.status !== 'ok' || !d.audio) {
        /* A daily limit reached, or the voice not set up: stop asking for a while */
        if (d && (d.code === 'QUIET_MEMBER' || d.code === 'QUIET_HOUSE' || d.code === 'VOICE_OFF')) {
          _restUntil = new Date().getTime() + 30 * 60 * 1000;
        }
        done();
        return;
      }
      if (!_voiceOn) { done(); return; }
      var a = _getAudio();
      try {
        _objUrl   = _soundUrl(d.audio, d.mime || 'audio/mpeg');
        a.onended = done;
        a.onerror = done;
        a.src     = _objUrl;
        var p = a.play();
        if (p && typeof p['catch'] === 'function') { p['catch'](done); }
      } catch (e2) {
        done();
      }
    };
    xhr.onerror   = function () { if (_xhr === xhr) { _xhr = null; } done(); };
    xhr.ontimeout = function () { if (_xhr === xhr) { _xhr = null; } done(); };
    try {
      xhr.send(JSON.stringify({
        action: 'docbSpeak',
        sessionId: session,
        requestingMemberId: member,
        text: clean,
        lang: (lang === 'es') ? 'es' : 'en'
      }));
    } catch (e3) {
      _xhr = null;
      done();
    }
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
      var caption = text || (lang === 'es' ? '¿Qué ves aquí?' : 'What do you see here?');
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
