/* ═══ charles-voice-v1.js cut 2 THE ONE VOICE (the Voice bench, Sat 11/14/26; GitHub 4rlawsacademy/4laws-assets, same name as before because the arrows load it by this name; way back: upload the earlier charles-voice-v1.js (cut 1, the browser's voices) over this one and purge). Founder: the arrows still spoke with the robot after the chats got David. This organ no longer picks a voice from the device: it hands every line to the house voice (docb-core.js 3.2, which asks the house server; the house holds the key). An arrows line is a FIXED line, so it is asked with keep: the house makes its sound once and keeps it. The three-voice choice is gone (candidates() answers none, so the arrows' VOICE row does not show). If the house cannot speak, the arrows are silent -- never the robot. It loads docb-core.js by itself on a page that does not carry it. The arrows file is not changed. Needs Main AUDIT 93. ═══ */
(function () {
  'use strict';
  if (window.CharlesVoice && window.CharlesVoice.cut >= 2) return;
  var MUTE = '4laws-charles-mute';
  var CORE = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/docb-core.js?v=3_2';
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function lang() { var l = ls('4laws-lang') || (document.documentElement.lang || 'en'); return (String(l).toLowerCase().indexOf('es') === 0) ? 'es' : 'en'; }
  function muted() { return ls(MUTE) === '1'; }
  function clean(t) { return String(t || '').replace(/\b([A-ZÀ-Ü]{2,})\b/g, function (w) { return w === 'PWS' ? w : w.toLowerCase(); }).replace(/[✦✧★☆→←]/g, ' '); }   /* capitals read as letters; stars and arrows read as nothing */

  /* ── the house voice: docb-core.js 3.2 or later ───────────────────────────────────────────────────────── */
  function core() { var c = window.DocBCore; return (c && c.voiceCut >= 2 && typeof c.sayLine === 'function') ? c : null; }
  var _asked = false, _waiting = [];
  function loadCore() {
    if (_asked || core()) return; _asked = true;
    try { var sc = document.createElement('script'); sc.id = 'docbCoreVoiceJs'; sc.src = CORE; sc.async = true; document.head.appendChild(sc); } catch (e) {}
  }
  function whenCore(fn) {
    var c = core(); if (c) { fn(c); return; }
    loadCore(); _waiting.push(fn);
    if (_waiting.length > 1) return;
    var t0 = Date.now();
    (function tick() {
      var c2 = core(), w, i;
      if (c2 || (Date.now() - t0) > 7000) { w = _waiting; _waiting = []; for (i = 0; i < w.length; i++) { try { w[i](c2); } catch (e) {} } return; }
      setTimeout(tick, 200);
    })();
  }
  loadCore();

  function say(text, L, opts) {
    opts = opts || {}; if (muted() && !opts.force) return null;
    L = L || lang(); var t = clean(text); if (!t.replace(/\s+/g, '')) return null;
    var line = { text: t, lang: L, stopped: false };
    _last = line;
    whenCore(function (c) {
      if (line.stopped || _last !== line || !c) { if (opts.onend) { try { opts.onend(); } catch (e) {} } return; }   /* a newer line took its place, or the house voice never came: silence */
      c.sayLine(t, L, { keep: true, onend: opts.onend || null });
    });
    return line;
  }
  var _last = null;
  function stop() { if (_last) _last.stopped = true; var c = core(); try { if (c && c.stopSpeaking) c.stopSpeaking(); } catch (e) {} }
  function sample(L) { return (L || lang()) === 'es' ? 'Soy Charles. Estoy aquí en cada cuarto de la casa.' : 'I am Charles. I am here in every room of the house.'; }
  function none() { return []; }

  /* one voice: nothing to choose. The old names stay so every caller still finds them. */
  window.CharlesVoice = { v: '2.0', cut: 2, ready: function (cb) { if (cb) cb(); }, voices: none, candidates: none, pick: function () { return null; }, choose: function () {}, chosen: function () { return ''; }, say: say, stop: stop, sample: sample, muted: muted, lang: lang };
})();
