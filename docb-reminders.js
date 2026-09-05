/* ============================================================
   DOCB-REMINDERS.JS v1.1 — THE ESCAPED SCROLL (external gate catch,
   9/4/26: v1.0 inserted item.msg/item.room into innerHTML unescaped in
   both the Veil and the drawer -- a real injection risk, since this
   organ is explicitly built to be fed free text from any room, and the
   founder's own motivating case was text lifted from an email or a
   voicemail transcript. Verdict: Not Clear. Cured, not argued, per
   house law. Four fixes in this pass:
   1. esc() escapes &, <, >, " before insertion -- applied at both
      render sites, matching (and extending) the /todos ledger modal's
      existing '<' convention.
   2. queueVeil()'s vestigial no-op condition removed (dead code, never
      reachable, flagged in the same review).
   3. toMs() now returns null for a genuinely unparseable date instead
      of silently defaulting to "right now" -- a caller's malformed
      remindAt used to become an immediately-firing reminder instead of
      a visible mistake.
   4. add() honors that null and refuses to seat the reminder, warning
      to console instead of masking the bug with a plausible-looking
      wrong time.
   v1.0 crown stands below, unchanged in spirit -- only the render and
   validation code moved. ============================================================
   DOCB-REMINDERS.JS v1.0 — A MESSAGE YOU LEFT YOURSELF
   (Bench 34, 9/4/26, founder's field wound: a real referral needed a
   callback reminder, and the only tool on the platform was a countdown
   that dies the moment the page closes. Founder's own words shaped this
   whole design: not "overdue," not a debt -- "a message you left
   yourself." Not a game reward -- a pause button on your own momentum,
   so an accomplishment doesn't slide by unmarked while you're already
   three thoughts into the next thing. Modeled on /life's Veil + Message
   Scroll pattern (calm banner, permanent log, nothing lost) -- borrowed
   as a TEMPLATE only, per the founder's own ruling; zero connection to
   the game's state or files.

   Zero backend: one shared localStorage key, same domain, works the
   instant this script tag rides any Doc B AI page next to the ones it
   already carries. Any room's own code can call DocBReminders.add(...)
   to seat a reminder (see /todos's own CREATE side for the pattern);
   this organ owns only the surfacing, the scroll, and the completion
   moment -- never the creating.

   ADOPTION (one line per page, beside the sibling organs):
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/docb-reminders.js"></script>

   Public API:
     DocBReminders.add({ msg: 'Call Sarah\u2019s office', remindAt: <ms epoch
       or ISO string>, room: 'Estate Planning part 2' (optional) }) -> id
     DocBReminders.refresh()  -- force a re-check right now
   ============================================================ */
(function () {
  'use strict';
  if (window.DocBReminders) { return; }

  var KEY = '4laws-reminders';
  var SEEN_THIS_LOAD = {}; /* v1.0: a reminder queues into the Veil once per page-load, never re-nags on the 30s poll */

  function lang() {
    try {
      if (document.body && document.body.className.indexOf('lang-es') !== -1) { return 'es'; }
      return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en';
    } catch (e) { return 'en'; }
  }
  function T(o) { return o[lang()] || o.en; }
  function nowMs() { return (new Date()).getTime(); }
  function toMs(v) {
    /* v1.1: was defaulting an unparseable date to "right now" -- a caller
       bug (a malformed remindAt) would silently become an immediately-
       firing reminder instead of surfacing the mistake. */
    if (typeof v === 'number' && !isNaN(v)) { return v; }
    var d = new Date(v);
    return isNaN(d.getTime()) ? null : d.getTime();
  }
  function uid() { return 'rmd_' + nowMs().toString(36) + '_' + Math.random().toString(36).slice(2, 8); }
  function esc(s) {
    /* v1.1: external gate catch (9/4) -- item.msg/item.room are free text
       that can arrive from a document, email, or voicemail transcript
       via any room's DocBReminders.add() call; neither render surface
       escaped it before innerHTML. Matches the fleet's existing '<'
       escape convention (the /todos ledger modal), extended to the
       other three characters that matter for innerHTML safety. */
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function load() {
    try {
      var r = localStorage.getItem(KEY);
      var arr = r ? JSON.parse(r) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function save(arr) {
    try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
  }

  function add(o) {
    if (!o || !o.msg || !o.remindAt) { return null; }
    var ms = toMs(o.remindAt);
    if (ms === null) {
      try { if (window.console && console.warn) { console.warn('DocBReminders.add: unparseable remindAt, reminder not set', o.remindAt); } } catch (eW) {}
      return null;
    }
    var list = load();
    var item = {
      id: uid(),
      msg: String(o.msg).substring(0, 400),
      room: o.room ? String(o.room).substring(0, 120) : '',
      remindAt: ms,
      createdAt: nowMs(),
      seen: false,
      done: false,
      seenAt: 0,
      doneAt: 0
    };
    list.push(item);
    save(list);
    render();
    return item.id;
  }
  function markSeen(id) {
    var list = load();
    for (var i = 0; i < list.length; i++) { if (list[i].id === id && !list[i].seen) { list[i].seen = true; list[i].seenAt = nowMs(); } }
    save(list);
    render();
  }
  function markDone(id) {
    var list = load();
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) { list[i].seen = true; list[i].done = true; list[i].doneAt = nowMs(); } }
    save(list);
    render();
    return list;
  }

  /* ---------------- styles ---------------- */
  function css() {
    if (document.getElementById('drCss')) { return; }
    var s = document.createElement('style'); s.id = 'drCss';
    s.textContent = ''
      + '#drFab{position:fixed;bottom:16px;left:16px;z-index:2200000;background:#0a0d12;border:2px solid #c8a84b;color:#ffd75e;border-radius:999px;min-height:48px;padding:0 16px;font-size:14px;font-family:Cinzel,serif;letter-spacing:.08em;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.6);}'
      + '#drFab.drQuiet{opacity:.55;}'
      + '#drVeil{position:fixed;left:50%;top:18px;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:2400000;width:340px;max-width:92vw;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:16px 18px;box-shadow:0 10px 34px rgba(0,0,0,.75);font-family:\'Cormorant Garamond\',Georgia,serif;display:none;}'
      + '#drVeil.on{display:block;}'
      + '.drKick{font-family:Cinzel,serif;font-size:11px;letter-spacing:.2em;color:#c8a84b;margin:0 0 6px;}'
      + '.drMsg{font-size:19px;line-height:1.4;color:#f0e6cc;margin:0 0 4px;}'
      + '.drRoom{font-size:13px;color:rgba(240,230,204,.55);margin:0 0 12px;font-style:italic;}'
      + '.drRow{display:-webkit-flex;display:flex;gap:10px;}'
      + '.drBtn{background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:13px;letter-spacing:.08em;padding:10px 16px;min-height:44px;cursor:pointer;}'
      + '.drGhost{background:none;border:1px solid rgba(200,168,75,.4);color:#c8a84b;border-radius:999px;font-family:Cinzel,serif;font-size:12px;letter-spacing:.08em;padding:10px 14px;min-height:44px;cursor:pointer;}'
      + '#drDrawer{position:fixed;bottom:72px;left:16px;z-index:2200001;width:320px;max-width:90vw;max-height:60vh;overflow:auto;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:14px 16px;box-shadow:0 8px 30px rgba(0,0,0,.8);font-family:\'Cormorant Garamond\',Georgia,serif;display:none;}'
      + '#drDrawer.on{display:block;}'
      + '.drTitle{font-family:Cinzel,serif;font-size:12px;letter-spacing:.16em;color:#c8a84b;margin:0 0 10px;}'
      + '.drItem{border-top:1px solid rgba(200,168,75,.2);padding:10px 0;}'
      + '.drItem:first-child{border-top:none;}'
      + '.drItem.drDone .drIMsg{color:rgba(240,230,204,.45);text-decoration:line-through;}'
      + '.drIMsg{font-size:16px;color:#f0e6cc;margin:0 0 3px;}'
      + '.drIWhen{font-size:12px;color:rgba(200,168,75,.7);}'
      + '.drIBtn{margin-top:6px;background:none;border:1px solid rgba(200,168,75,.45);color:#c8a84b;border-radius:8px;font-family:Cinzel,serif;font-size:11px;letter-spacing:.08em;padding:6px 10px;cursor:pointer;}'
      + '.drGlow{-webkit-animation:drPulse 900ms ease-out;animation:drPulse 900ms ease-out;}'
      + '@-webkit-keyframes drPulse{0%{box-shadow:0 0 0 0 rgba(200,168,75,.55);}100%{box-shadow:0 0 0 14px rgba(200,168,75,0);}}'
      + '@keyframes drPulse{0%{box-shadow:0 0 0 0 rgba(200,168,75,.55);}100%{box-shadow:0 0 0 14px rgba(200,168,75,0);}}';
    document.head.appendChild(s);
  }

  /* ---------------- the Veil (one at a time, calm) ---------------- */
  var veilQ = [];
  var veilTimer = null;
  function queueVeil(item) {
    veilQ.push(item);
    showNextVeil();
  }
  function showNextVeil() {
    var v = document.getElementById('drVeil');
    if (!veilQ.length) { v.className = ''; return; }
    if (v.className === 'on') { return; } /* one visible at a time; the next waits its turn */
    var item = veilQ[0];
    v.innerHTML = '<button aria-label="Close" onclick="window.DocBReminders._later(\'' + item.id + '\')" style="position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(200,168,75,.6);font-size:20px;line-height:1;cursor:pointer;padding:4px;">\u00d7</button>'
      + '<p class="drKick">' + T({ en: 'A MESSAGE YOU LEFT YOURSELF', es: 'UN MENSAJE QUE TE DEJASTE' }) + '</p>'
      + '<p class="drMsg">' + esc(item.msg) + '</p>'
      + (item.room ? '<p class="drRoom">' + esc(item.room) + '</p>' : '')
      + '<div class="drRow">'
      + '<button class="drBtn" onclick="window.DocBReminders._done(\'' + item.id + '\')">' + T({ en: '\u2713 Done', es: '\u2713 Hecho' }) + '</button>'
      + '<button class="drGhost" onclick="window.DocBReminders._later(\'' + item.id + '\')">' + T({ en: 'Later', es: 'Despu\u00e9s' }) + '</button>'
      + '</div>';
    v.className = 'on';
    if (veilTimer) { clearTimeout(veilTimer); }
    veilTimer = setTimeout(function () { advanceVeil(item.id); }, 12000); /* v1.0: a little longer than the game's 8s -- this one is personal, not a story beat */
  }
  function advanceVeil(id) {
    for (var i = 0; i < veilQ.length; i++) { if (veilQ[i].id === id) { veilQ.splice(i, 1); break; } }
    document.getElementById('drVeil').className = '';
    if (veilTimer) { clearTimeout(veilTimer); veilTimer = null; }
    setTimeout(showNextVeil, 250);
  }

  /* ---------------- the drawer (the permanent scroll) ---------------- */
  var drawerOpen = false;
  function toggleDrawer() {
    drawerOpen = !drawerOpen;
    renderDrawer();
  }
  function renderDrawer() {
    var d = document.getElementById('drDrawer');
    if (!drawerOpen) { d.className = ''; return; }
    var list = load().slice().sort(function (a, b) { return b.remindAt - a.remindAt; });
    var h = '<p class="drTitle">' + T({ en: 'YOUR REMINDERS \u2014 nothing here is ever lost', es: 'TUS RECORDATORIOS \u2014 nada aqu\u00ed se pierde' }) + '</p>';
    if (!list.length) {
      h += '<p class="drIMsg" style="opacity:.6;">' + T({ en: 'Nothing waiting yet.', es: 'A\u00fan no hay nada esperando.' }) + '</p>';
    }
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      var when = new Date(it.remindAt).toLocaleString();
      h += '<div class="drItem' + (it.done ? ' drDone' : '') + '" id="drIt_' + it.id + '">'
        + '<p class="drIMsg">' + esc(it.msg) + '</p>'
        + '<p class="drIWhen">' + when + (it.room ? ' \u00b7 ' + esc(it.room) : '') + '</p>'
        + (it.done ? '' : '<button class="drIBtn" onclick="window.DocBReminders._done(\'' + it.id + '\')">' + T({ en: '\u2713 Mark done', es: '\u2713 Marcar hecho' }) + '</button>')
        + '</div>';
    }
    d.innerHTML = h;
    d.className = 'on';
  }
  function renderFab() {
    var fab = document.getElementById('drFab');
    var due = 0;
    var list = load();
    for (var i = 0; i < list.length; i++) { if (!list[i].done && list[i].remindAt <= nowMs()) { due++; } }
    if (!fab) {
      fab = document.createElement('button'); fab.id = 'drFab';
      fab.setAttribute('aria-label', 'Reminders');
      fab.onclick = toggleDrawer;
      document.body.appendChild(fab);
    }
    fab.className = due ? '' : 'drQuiet';
    fab.textContent = '\ud83d\udcec ' + T({ en: 'REMINDERS', es: 'RECORDATORIOS' }) + (due ? (' \u00b7 ' + due) : '');
  }

  /* ---------------- the sweep ---------------- */
  function sweep() {
    var list = load();
    var t = nowMs();
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (!it.done && it.remindAt <= t && !SEEN_THIS_LOAD[it.id]) {
        SEEN_THIS_LOAD[it.id] = true;
        markSeen(it.id); /* seen the moment it surfaces \u2014 done is a separate, deliberate act */
        queueVeil(it);
      }
    }
    renderFab();
  }
  function render() { css(); document.getElementById('drVeil') || buildShell(); renderFab(); if (drawerOpen) { renderDrawer(); } sweep(); }
  function buildShell() {
    var v = document.createElement('div'); v.id = 'drVeil';
    document.body.appendChild(v);
    var d = document.createElement('div'); d.id = 'drDrawer';
    document.body.appendChild(d);
  }

  function glow(id) {
    var el = document.getElementById('drIt_' + id);
    if (el) { el.className += ' drGlow'; setTimeout(function () { el.className = el.className.replace(' drGlow', ''); }, 950); }
  }

  function boot() {
    css(); buildShell(); renderFab();
    sweep();
    setInterval(sweep, 30000);
    try {
      document.addEventListener('visibilitychange', function () { if (!document.hidden) { sweep(); } });
      window.addEventListener('focus', sweep);
    } catch (e) {}
  }

  window.DocBReminders = {
    add: add,
    refresh: sweep,
    _done: function (id) { markDone(id); advanceVeil(id); glow(id); renderDrawer(); },
    _later: function (id) { advanceVeil(id); } /* stays seen, stays in the scroll, just steps out of the way */
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
