/**
 * docb-core.js
 * 4 LAWS Academy — Shared Doc B AI capabilities
 * Version 3.2.0 — THE ONE VOICE, EVERYWHERE IT CAN REACH (11/14/26, the Voice bench)
 *
 * WHERE IT LIVES: the GitHub shelf (4rlawsacademy/4laws-assets), under
 *   this same name. Every page with a Doc B chat loads it (seen: /todos,
 *   the Work Station); charles-voice-v1.js (cut 2) loads it on the other
 *   pages that have arrows.
 * THE WAY BACK: upload the earlier docb-core.js (Version 3.1.0) over this
 *   one, under the same name, and purge.
 * NEEDS: Main Apps Script with AUDIT 93 THE KEPT LINES (action docbSpeak).
 *
 * The voice (3.x):
 *   Doc B speaks with the one house voice (ElevenLabs "David"). This file
 *   holds NO key and never talks to ElevenLabs. It asks the house server
 *   "say this"; the house checks the member is signed in, keeps the key,
 *   and sends the sound back. If the house cannot speak, Doc B is silent,
 *   never the robot. Voice is ON by default; the sound button turns it
 *   off, and off STAYS off (kept under 4laws-voice-off, which no page
 *   erases).
 * New in 3.2:
 *   - THE CATCH: anything on the page that still speaks through the
 *     browser's robot (speechSynthesis.speak) is caught and said by the
 *     house voice instead: the arrows' fallback, the Production Studio's
 *     own reader. Each caller keeps its own mute; this file adds none.
 *   - "Hi. I can talk." is not said any more (founder, 11/14/26).
 *   - THE HUSH IS OBEYED: when a page above (the Lectern, recording)
 *     silences speechSynthesis.speak, the house voice is silent too.
 *   - DocBCore.sayLine(text, lang, { keep, onend }): one line, said now.
 *     keep:true marks a FIXED line (an arrows card): the house makes its
 *     sound once and keeps it. DocBCore.stopSpeaking() stops everything.
 *   - If an older copy of this file already wired the page, this one
 *     only takes over the voice and leaves the rest as it stands.
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

  var VOICE_CUT = 2;
  var _old = global.DocBCore;
  if (_old && _old.voiceCut >= VOICE_CUT) { return; }                    /* loaded twice: the first copy stands */
  var _patching = !!(_old && typeof _old.init === 'function');          /* an older copy already wired this page: take over the voice only */

  var _pending        = null;   // { base64, dataUrl, mediaType }
  var _voiceOn        = true;
  var _voiceKey       = '4laws-voice-on';    // the old key: some pages erase it at every visit
  var _voiceOffKey    = '4laws-voice-off';   // 3.2: '1' = off. No page erases this one, so off stays off
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
  var _queue       = [];    // lines waiting their turn
  var _cur         = null;  // the line being fetched or spoken
  var _restUntil   = 0;     // the house said "this member / the house is done for today": no new replies until then
  var _offUntil    = 0;     // the house said "the voice is not set up" or "not signed in": ask nothing until then
  var _lines       = {};    // fixed lines already heard on this page: said again without asking
  var _lineCount   = 0;
  var _shimOn      = false; // the catch is installed on speechSynthesis
  var _origSpeak   = null, _origCancel = null;
  var _GREETING    = /^(hi\.? i can talk\.?|hola\.? puedo hablar contigo\.?)$/i;   // retired 11/14/26
  var _SILENCE     = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

  // ── Load persisted voice preference ──────────────────────────────────────
  function _prefOn() {
    try {
      if (localStorage.getItem(_voiceOffKey) === '1') { return false; }
      if (localStorage.getItem(_voiceKey) === 'false') { return false; }
    } catch (e) {}
    return true;
  }
  _voiceOn = _prefOn();

  // ── INTERNAL HELPERS ─────────────────────────────────────────────────────

  function _saveVoicePref() {
    try {
      localStorage.setItem(_voiceKey, _voiceOn ? 'true' : 'false');
      if (_voiceOn) { localStorage.removeItem(_voiceOffKey); } else { localStorage.setItem(_voiceOffKey, '1'); }
    } catch (e) {}
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

  function _micFn() {
    if (_continuousMicFn) { return _continuousMicFn; }
    try {
      var d = global.DocBCore;
      if (d && typeof d.__mic === 'function') { return d.__mic; }
      if (d && d._cfg && typeof d._cfg.continuousMicFn === 'function') { return d._cfg.continuousMicFn; }
    } catch (e) {}
    return null;
  }
  function _micBack(delay) {
    var fn = _micFn();
    if (fn) { setTimeout(fn, delay); }
  }
  function _fire(fn, arg) { if (typeof fn === 'function') { try { fn(arg); } catch (e) {} } }

  /* ── THE HUSH: a page above (the Lectern, recording) silences speechSynthesis.speak. Obey it. ── */
  function _isNative(fn) { try { return /\[native code\]/.test(Function.prototype.toString.call(fn)); } catch (e) { return true; } }
  function _synth() { try { return global.speechSynthesis || null; } catch (e) { return null; } }
  function _installShim() {
    var S = _synth(); if (!S || _shimOn) { return; }
    if (!_isNative(S.speak)) { return; }                 /* already silenced by someone: leave their hand on it */
    try {
      _origSpeak = S.speak; _origCancel = S.cancel;
      S.speak = _shimSpeak; S.cancel = _shimCancel;
      _shimOn = (S.speak === _shimSpeak);
    } catch (e) { _shimOn = false; }
  }
  function _hushed() {
    var S = _synth(); if (!S) { return false; }
    if (_shimOn) { return S.speak !== _shimSpeak; }      /* someone took our place: hushed */
    _installShim();
    if (_shimOn) { return false; }
    return !_isNative(S.speak);                          /* silenced before we arrived */
  }

  /* ── THE LINE: one voice, one line at a time ── */
  function _dropSound() {
    if (_xhr) {
      try { _xhr.onload = null; _xhr.onerror = null; _xhr.ontimeout = null; _xhr.abort(); } catch (e) {}
      _xhr = null;
    }
    if (_audio) {
      _audio.onended = null; _audio.onerror = null;
      try { _audio.pause(); } catch (e2) {}
    }
    if (_objUrl) {
      try { if (_objUrl.indexOf('blob:') === 0) { global.URL.revokeObjectURL(_objUrl); } } catch (e3) {}
      _objUrl = null;
    }
  }
  /* Stops everything said or waiting. Returns true if something was. A stopped line's own onend still fires (as the browser's reader does); the mic is not reopened here. */
  function _stopAll() {
    var was = !!_cur || _queue.length > 0, q = _queue, c = _cur, i;
    _queue = []; _cur = null;
    _dropSound();
    if (c && !c.done) { c.done = true; _fire(c.onend); }
    for (i = 0; i < q.length; i++) { if (!q[i].done) { q[i].done = true; _fire(q[i].onend); } }
    return was;
  }
  function _done(item) {
    if (_cur === item) { _cur = null; _dropSound(); }
    if (!item.done) { item.done = true; _fire(item.onend); if (item.mic) { _micBack(400); } }
    _pump();
  }
  function _pump() {
    if (_cur || !_queue.length) { return; }
    _cur = _queue.shift();
    _start(_cur);
  }
  function _play(item, b64, mime) {
    if (_cur !== item) { return; }
    if (_hushed() || (item.mic && !_prefOn())) { _done(item); return; }
    var a = _getAudio(); if (!a) { _done(item); return; }
    try {
      _objUrl   = _soundUrl(b64, mime || 'audio/mpeg');
      a.onended = function () { _done(item); };
      a.onerror = function () { _done(item); };
      a.src     = _objUrl;
      _fire(item.onstart);
      var p = a.play();
      if (p && typeof p['catch'] === 'function') { p['catch'](function () { _done(item); }); }
    } catch (e) { _done(item); }
  }
  function _start(item) {
    var session = _stored_(_SESSION_KEY), member = _stored_(_MEMBER_KEY), now = new Date().getTime();
    if (_hushed() || !session || !member || now < _offUntil || (!item.keep && now < _restUntil) ||
        typeof global.XMLHttpRequest === 'undefined' || !_getAudio()) { _done(item); return; }
    if (item.keep && _lines.hasOwnProperty('k:' + item.text)) { _play(item, _lines['k:' + item.text], 'audio/mpeg'); return; }
    var xhr = new global.XMLHttpRequest();
    _xhr = xhr;
    try {
      /* No headers set: the house's door takes a plain post, as every page sends it */
      xhr.open('POST', _HOUSE_URL, true);
      xhr.timeout = 40000;
    } catch (e) { _xhr = null; _done(item); return; }
    xhr.onload = function () {
      if (_xhr === xhr) { _xhr = null; }
      if (_cur !== item) { return; }
      var d = null;
      try { d = JSON.parse(xhr.responseText); } catch (eP) { d = null; }
      if (!d || d.status !== 'ok' || !d.audio) {
        var until = new Date().getTime() + 30 * 60 * 1000;
        if (d && (d.code === 'QUIET_MEMBER' || d.code === 'QUIET_HOUSE')) { _restUntil = until; }
        if (d && (d.code === 'VOICE_OFF' || d.code === 'NO_SESSION')) { _offUntil = until; }
        _done(item);
        return;
      }
      if (item.keep && _lineCount < 60) { _lines['k:' + item.text] = d.audio; _lineCount++; }
      _play(item, d.audio, d.mime);
    };
    xhr.onerror   = function () { if (_xhr === xhr) { _xhr = null; } _done(item); };
    xhr.ontimeout = function () { if (_xhr === xhr) { _xhr = null; } _done(item); };
    try {
      var body = { action: 'docbSpeak', sessionId: session, requestingMemberId: member, text: item.text, lang: (item.lang === 'es') ? 'es' : 'en' };
      if (item.keep) { body.keep = true; }
      xhr.send(JSON.stringify(body));
    } catch (e3) { _xhr = null; _done(item); }
  }

  /* ── THE CATCH: what the page hands to the browser's robot, the house voice says ── */
  function _shimSpeak(u) {
    var text = '';
    try { text = _cleanForSpeech((u && u.text) || ''); } catch (e) { text = ''; }
    var item = { text: text, lang: (u && /^es/i.test(String(u.lang || ''))) ? 'es' : 'en', keep: false, mic: false, done: false,
      onstart: function () { if (u) { _fire(u.onstart, { utterance: u }); } },
      onend:   function () { if (u) { _fire(u.onend,   { utterance: u }); } } };
    if (!text || (u && u.volume === 0) || _GREETING.test(text)) { item.done = true; setTimeout(function () { _fire(item.onend); }, 0); return; }   /* nothing to say, an unlock, or the retired greeting */
    _queue.push(item);
    _pump();
  }
  function _shimCancel() {
    _stopAll();
    try { if (_origCancel) { _origCancel.call(_synth()); } } catch (e) {}
  }

  /* Stops any reply being fetched or spoken. Returns true if one was. */
  function _cancelSpeech() {
    var was = _stopAll();
    try { var S = _synth(); if (S && _origCancel && _shimOn) { _origCancel.call(S); } } catch (e4) {}
    return was;
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
      _voiceOn = _prefOn();
      voiceBtn.classList.toggle('active', _voiceOn);
      voiceBtn.addEventListener('click', function () {
        _voiceOn = !_prefOn();
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
   * back to the robot voice. A new reply takes the place of the last one.
   *
   * @param {string}   text
   * @param {function} getLang  Returns 'en' or 'es' (the voice follows the words)
   */
  function _speakReply(text, getLang) {
    var clean = (_prefOn() && text) ? _cleanForSpeech(text) : '';
    if (!clean) {
      /* Even if voice is off, still reopen mic in continuous mode */
      _micBack(300);
      return;
    }
    _stopAll();
    var lang = (typeof getLang === 'function') ? getLang() : 'en';
    _queue.push({ text: clean, lang: (lang === 'es') ? 'es' : 'en', keep: false, mic: true, done: false });
    _pump();
  }
  DocBCore.speak = _speakReply;

  /**
   * sayLine — say one line now, in the house voice (the arrows, a page's own words).
   * @param {string} text
   * @param {string} lang   'en' or 'es'
   * @param {Object} opts   keep:true = a FIXED line, kept by the house after its first telling; onend = called when done
   */
  function _sayLine(text, lang, opts) {
    opts = opts || {};
    var clean = text ? _cleanForSpeech(text) : '';
    if (!clean) { _fire(opts.onend); return; }
    _stopAll();
    _queue.push({ text: clean, lang: (lang === 'es') ? 'es' : 'en', keep: !!opts.keep, mic: false, done: false, onend: opts.onend || null });
    _pump();
  }
  DocBCore.sayLine = _sayLine;
  DocBCore.stopSpeaking = function () { _stopAll(); };
  DocBCore.voiceCut = VOICE_CUT;

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
    return _prefOn();
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
  _installShim();
  if (_patching) {
    /* An older copy wired this page (its paste, camera and voice button stand). Take over the voice only. */
    var _oldSetMic = _old.setContinuousMic;
    _old.speak = _speakReply;
    _old.sayLine = _sayLine;
    _old.stopSpeaking = DocBCore.stopSpeaking;
    _old.isVoiceOn = DocBCore.isVoiceOn;
    _old.setContinuousMic = function (fn) {
      _old.__mic = (typeof fn === 'function') ? fn : null;
      if (typeof _oldSetMic === 'function') { try { _oldSetMic(fn); } catch (e) {} }
    };
    _old.voiceCut = VOICE_CUT;
  } else {
    global.DocBCore = DocBCore;
  }

}(window));
