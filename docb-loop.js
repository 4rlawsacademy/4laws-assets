/* ============================================================
   DOCB-LOOP.JS v1.0 — THE EYES (Bench 50, Mon 11/9/26)
   The founder, after a night in which the form tool wrote nothing and said
   "Filled", and Doc B judged a signature he could not see: "We were limping
   along with an incomplete feedback loop... the architecture is to audit and
   complete the feedback loop."
   This is the loop's one organ. Every hand in the house (the form filler, the
   pen, the shelf, the bucket) REPORTS here what it just did, in one plain
   line plus facts. Every page hands Doc B the last report before he speaks,
   so he says what the house knows and never guesses.
   The API, tiny on purpose:
     DocBLoop.report(key, line, facts)  -- a hand says what it did
     DocBLoop.last(key)                 -- {line, facts, at} or null
     DocBLoop.factLine(key, lang)       -- one sentence for a prompt, or ''
     DocBLoop.on(fn)                    -- listen (fn(key, rec))
   Keys are the page's business (a todo id, a paper id). Records live in
   memory and in localStorage ('4laws-loop'), newest 200 kept.
   No network. No UI. Loaded by pulse.js or by a page directly.
   ============================================================ */
(function () {
  'use strict';
  if (window.DocBLoop && window.DocBLoop.version) { return; }
  var KEY = '4laws-loop', MAX = 200, mem = null, subs = [];
  function load_() {
    if (mem) { return mem; }
    try { mem = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { mem = {}; }
    if (typeof mem !== 'object' || Array.isArray(mem)) { mem = {}; }
    return mem;
  }
  function save_() {
    try {
      var keys = Object.keys(mem);
      if (keys.length > MAX) { keys.sort(function (a, b) { return (mem[a].at || '') < (mem[b].at || '') ? -1 : 1; }); for (var i = 0; i < keys.length - MAX; i++) { delete mem[keys[i]]; } }
      localStorage.setItem(KEY, JSON.stringify(mem));
    } catch (e) {}
  }
  function report(key, line, facts) {
    if (!key) { return null; }
    var m = load_();
    var rec = { line: String(line || ''), facts: facts || {}, at: new Date().toISOString() };
    m[String(key)] = rec; save_();
    for (var i = 0; i < subs.length; i++) { try { subs[i](String(key), rec); } catch (e) {} }
    return rec;
  }
  function last(key) { var m = load_(); return (key && m[String(key)]) ? m[String(key)] : null; }
  function when_(iso, lang) {
    try { var d = new Date(iso); return d.toLocaleDateString(lang === 'es' ? 'es' : 'en', { month: 'numeric', day: 'numeric' }) + ' ' + d.toLocaleTimeString(lang === 'es' ? 'es' : 'en', { hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; }
  }
  function factLine(key, lang) {
    var r = last(key); if (!r) { return ''; }
    var w = when_(r.at, lang);
    return (lang === 'es' ? 'LO ÚLTIMO QUE HIZO LA CASA' : 'THE LAST THING THE HOUSE DID') + (w ? ' (' + w + ')' : '') + ': ' + r.line;
  }
  function on(fn) { if (typeof fn === 'function') { subs.push(fn); } }
  window.DocBLoop = { report: report, last: last, factLine: factLine, on: on, when: when_, version: '1.0' };
})();
