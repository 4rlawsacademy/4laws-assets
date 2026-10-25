/* ═══ charles-voice-v1.js ONE VOICE IN THE HOUSE (Bench 57, Sun 10/25/26 evening; GitHub 4rlawsacademy/4laws-assets; first cut -- no way back needed: without this file every reader falls back to what it did before). Founder: "I don't like the robots." Every chat and the arrows read with the browser's own reader, each picking its own voice. This organ picks ONE voice for the house per language -- the best natural voice the member's device has (Apple's enhanced and Siri-class voices, Google's, Microsoft's Natural ones), male for Charles when one is there, US/Latin Spanish before Spain's -- and keeps the member's own choice when they make one (SHOW ME -> VOICE in the arrows). Anything that talks calls CharlesVoice.say(text, lang) and sounds like the same man everywhere. The arrows use it from v1.18; each chat room adopts it at its next cut (one line, and say() in place of its own reader). What it cannot do: invent a voice the device does not have. ═══ */
(function () {
  'use strict';
  if (window.CharlesVoice && window.CharlesVoice.cut >= 1) return;
  var MUTE = '4laws-charles-mute';
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function lang() { var l = ls('4laws-lang') || (document.documentElement.lang || 'en'); return (String(l).toLowerCase().indexOf('es') === 0) ? 'es' : 'en'; }
  function synth() { try { return window.speechSynthesis || null; } catch (e) { return null; } }

  /* ── what a good voice sounds like, by its name (the device never says) ─────────────────────────────── */
  var NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|junior|organ|pipe organ|ralph|rocko|shelley|superstar|trinoids|whisper|wobble|zarvox|eddy|flo|grandma|grandpa|reed|sandy|fred|kathy|espeak|compact/i;
  var PREMIUM = /premium|enhanced|natural|neural|siri|\(natural\)|online/i;
  var GOOD_EN = /google (us|uk) english|daniel|tom|alex|aaron|arthur|oliver|rishi|samantha|ava|allison|karen|moira|fiona|evan|nathan|zira|aria|jenny|guy|davis|christopher|eric|ryan|brian/i;
  var GOOD_ES = /google espa|jorge|diego|juan|carlos|andr|pablo|dario|dalia|paulina|m[oó]nica|marisol|angelica|isabela|camila|raul|alvaro|elvira|sabina|lupe|mia|ximena/i;
  var MALE_EN = /daniel|tom|alex|aaron|arthur|oliver|rishi|evan|nathan|guy|davis|christopher|eric|ryan|brian|male|james|george|mark/i;
  var MALE_ES = /jorge|diego|juan|carlos|andr|pablo|dario|raul|alvaro|gerardo|hombre|male/i;

  function all() { var s = synth(); try { return (s && s.getVoices()) || []; } catch (e) { return []; } }
  function score(v, L) {
    var n = String(v.name || ''), lg = String(v.lang || '').toLowerCase(); var s = 0;
    if (lg.indexOf(L) !== 0) return -1000;
    if (NOVELTY.test(n)) return -500;
    if (PREMIUM.test(n)) s += 60;
    if (L === 'en') { if (GOOD_EN.test(n)) s += 30; if (MALE_EN.test(n)) s += 20; if (lg === 'en-us' || lg === 'en_us') s += 8; if (lg === 'en-gb' || lg === 'en_gb') s += 6; }
    else { if (GOOD_ES.test(n)) s += 30; if (MALE_ES.test(n)) s += 20; if (/es-(us|mx|419|co|ar|cl|pe)/.test(lg) || /es_(us|mx)/.test(lg)) s += 12; if (/es-es|es_es/.test(lg)) s -= 6; }
    if (v.localService) s += 4;   /* no waiting on the network */
    if (/google/i.test(n)) s += 10;
    if (/microsoft/i.test(n) && !PREMIUM.test(n)) s -= 10;
    return s;
  }
  function ranked(L) { L = L || lang(); var vs = all().slice(0); vs.sort(function (a, b) { return score(b, L) - score(a, L); }); var out = []; for (var i = 0; i < vs.length; i++) { if (score(vs[i], L) > -500) out.push(vs[i]); } return out; }
  function byId(id) { var vs = all(); for (var i = 0; i < vs.length; i++) { if (vs[i].voiceURI === id || vs[i].name === id) return vs[i]; } return null; }
  function chosenId(L) { return ls('4laws-voice-' + (L || lang())); }
  function pick(L) { L = L || lang(); var c = chosenId(L); if (c) { var v = byId(c); if (v) return v; } var r = ranked(L); return r[0] || null; }
  function choose(L, id) { L = L || lang(); ls('4laws-voice-' + L, id || ''); }
  function candidates(L, n) { return ranked(L).slice(0, n || 3); }

  /* ── speaking ─────────────────────────────────────────────────────────────────────────────────────────── */
  var _ready = false, _waiters = [];
  function ready(cb) { if (_ready || all().length) { _ready = true; if (cb) cb(); return; } if (cb) _waiters.push(cb); }
  try { var S = synth(); if (S) { S.onvoiceschanged = function () { _ready = true; var w = _waiters; _waiters = []; for (var i = 0; i < w.length; i++) { try { w[i](); } catch (e) {} } }; } } catch (e0) {}
  setTimeout(function () { ready(null); }, 800);

  function muted() { return ls(MUTE) === '1'; }
  function clean(t) { return String(t || '').replace(/\b([A-ZÀ-Ü]{2,})\b/g, function (w) { return w === 'PWS' ? w : w.toLowerCase(); }).replace(/[✦✧★☆→←]/g, ' '); }   /* capitals read as letters; stars and arrows read as nothing */
  function say(text, L, opts) {
    opts = opts || {}; var S = synth(); if (!S || muted() && !opts.force) return null;
    L = L || lang(); var t = clean(text); if (!t.replace(/\s+/g, '')) return null;
    try { S.cancel(); } catch (e1) {}
    var u = new SpeechSynthesisUtterance(t);
    u.lang = (L === 'es') ? 'es-US' : 'en-US'; u.rate = opts.rate || 0.95; u.pitch = opts.pitch || 1.0; u.volume = 1;
    var v = opts.voice || pick(L); if (v) { u.voice = v; u.lang = v.lang || u.lang; }
    if (opts.onend) u.onend = opts.onend;
    try { S.speak(u); } catch (e2) {}
    return u;
  }
  function stop() { var S = synth(); try { if (S) S.cancel(); } catch (e) {} }
  function sample(L) { return (L || lang()) === 'es' ? 'Soy Charles. Estoy aquí en cada cuarto de la casa.' : 'I am Charles. I am here in every room of the house.'; }

  window.CharlesVoice = { v: '1.0', cut: 1, ready: ready, voices: ranked, candidates: candidates, pick: pick, choose: choose, chosen: chosenId, say: say, stop: stop, sample: sample, muted: muted, lang: lang };
})();
