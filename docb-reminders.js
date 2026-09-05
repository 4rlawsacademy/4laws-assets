/* ============================================================
   DOCB-REMINDERS.JS v2.3 — THE MID-RIGHT TAB & THE SERIES (9/5/26, the
   founder's first live field test of v2.2). Three cures:
   1. THE MID-RIGHT TAB -- the LIFE companion chip (life-companion.js,
      left:12px bottom:88px) and this organ's drawer (bottom:72px left:16px)
      both claimed the same corner; the founder's screenshot showed the
      LVL chip sitting on top of his reminder list. Every corner on this
      fleet is already spoken for -- LIFE bottom-left, the TODOS/TRUST
      pills bottom-center, Winston's badge and Find-ME on the right -- so
      the badge is now a tab on the mid-right EDGE, and the drawer opens
      as a centered panel under the Veil, where nothing else lives.
      The drawer gained its own × close.
   2. THE SERIES -- reminders born as a chain (every 5 minutes until the
      call is made) carry a shared seriesId. The drawer folds a chain
      into ONE line with a ×N tag; the badge counts a chain once; Done on
      any sibling flips the whole chain locally and pulls its queued
      siblings out of the Veil -- the server (PWS.gs Build 31.2) cascades
      the same way. Founder's ruling: "calls should stop once I click done."
   3. add() carries seriesId through to the backend.
   v2.2's crown stands below, unchanged in substance.
   ============================================================
   DOCB-REMINDERS.JS v2.2 — THE CLOSED DOOR (external gate catch, 9/4/26):
   the four backend handlers this organ talks to had no authentication at
   all -- v2.0/v2.1 never sent a sessionId because nothing asked for one.
   Now every request carries the session, injected once inside post_()
   so it can never be forgotten at a call site, matching the backend's
   own new pwsAuth_ gate on all four reminder actions (PWS.gs Build 31.1
   THE CLOSED DOOR). Reads the same shared '4laws-session' key every
   other page on this fleet already relies on for login state.
   v2.1's crown stands below, unchanged in substance.
   ============================================================
   DOCB-REMINDERS.JS v2.1 — THE ALARM CLOCK CHIP (9/4/26): the founder's
   own naming ruling, so Timer and Reminders never get confused for the
   same tool again -- Timer wears a stopwatch, Reminders wears the alarm
   clock. One addition: open() lets a room's own Accessories tile open
   this same drawer, not only the corner badge (see /todos v64.13's new
   REMINDERS chip). renderDrawer() guarded against a missing shell, in
   case open() is ever called before boot() found a member key to work
   with. v2.0's crown stands below, unchanged in substance.
   ============================================================
   DOCB-REMINDERS.JS v2.0 — THE CROSS-DEVICE WORD
   (Bench 34, 9/4/26, founder's field wound: v1.1 lived only in the
   browser that set it -- "why do I have to go to each device and set
   a separate reminder?" This platform is aiming to be a sellable
   product, not a personal device habit. Cure: the same Veil/scroll/
   quiet-completion design, now reading and writing a real backend
   store (MemberReminders sheet, Build 31 THE CROSS-DEVICE WORD in
   PWS.gs/Code.gs) instead of localStorage. Nothing about how this
   LOOKS or FEELS changed -- only where the words actually live.

   Member identity: reads the same shared localStorage key every
   sibling organ on this fleet already relies on ('4laws-member-id').
   If that key is missing, this organ renders nothing at all -- never
   breaks a page, same law v1.x always kept.

   BREAKING CHANGE from v1.1, deliberate and documented: add() now
   returns a Promise (it must ask the server), not an id synchronously.
   The one caller on the fleet today (/todos THE KEPT WORD) is updated
   in the same cut as this file -- see /todos v64.12.

   ADOPTION (unchanged, one line per page):
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/docb-reminders.js"></script>

   Public API:
     DocBReminders.add({ msg, remindAt, room }) -> Promise<id|null>
     DocBReminders.refresh() -- force a re-check against the server now
   ============================================================ */
(function () {
  'use strict';
  if (window.DocBReminders) { return; }

  var POST_URL = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var MEMBER_KEY = '4laws-member-id';
  var SESSION_KEY = '4laws-session'; /* v2.2: the backend's four reminder handlers now require this, matching every other sensitive PWS.gs endpoint's pwsAuth_ gate */
  var SEEN_THIS_LOAD = {}; /* v1.0's own rule, unchanged: a reminder queues into the Veil once per page-load */
  var cache = []; /* last list fetched from the server -- render reads this, never the network directly */
  var listInFlight = false;

  function memberId() {
    try { return localStorage.getItem(MEMBER_KEY) || ''; } catch (e) { return ''; }
  }
  function sessionId_() {
    try { return localStorage.getItem(SESSION_KEY) || ''; } catch (e) { return ''; }
  }
  function lang() {
    try {
      if (document.body && document.body.className.indexOf('lang-es') !== -1) { return 'es'; }
      return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en';
    } catch (e) { return 'en'; }
  }
  function T(o) { return o[lang()] || o.en; }
  function nowMs() { return (new Date()).getTime(); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function post_(body) {
    body.sessionId = sessionId_(); /* v2.2: every action on this backend is now auth-gated; inject once here so no call site can forget it */
    return fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' } /* matches the fleet's existing no-preflight POST convention */
    }).then(function (r) { return r.json(); });
  }

  /* ---------------- public: add / list / mark ---------------- */
  function add(o) {
    var mid = memberId();
    if (!mid || !o || !o.msg || !o.remindAt) { return Promise.resolve(null); }
    return post_({ action: 'pwsReminderAdd', requestingMemberId: mid, message: String(o.msg).substring(0, 400), remindAt: o.remindAt, room: o.room || '', seriesId: o.seriesId || '' })
      .then(function (d) {
        if (!d || !d.success) { return null; }
        refresh(); /* the new one should appear in the scroll right away, not wait for the next poll */
        return d.id;
      })
      ['catch'](function () { return null; });
  }
  function markSeen_(id) {
    var mid = memberId(); if (!mid) { return; }
    post_({ action: 'pwsReminderMarkSeen', requestingMemberId: mid, id: id })['catch'](function () {});
  }
  function markDone_(id) {
    var mid = memberId(); if (!mid) { return; }
    /* optimistic local flip so the UI feels instant; refresh() true-ups against the server right after.
       v2.3 THE SERIES: done takes its still-pending siblings with it (founder's ruling) -- server cascades too. */
    var sid = '';
    for (var i = 0; i < cache.length; i++) { if (cache[i].id === id) { cache[i].done = true; cache[i].seen = true; sid = cache[i].seriesId || ''; } }
    if (sid) {
      for (var j = 0; j < cache.length; j++) {
        if (cache[j].seriesId === sid && !cache[j].done) { cache[j].done = true; cache[j].seen = true; }
      }
      for (var k = veilQ.length - 1; k >= 0; k--) { if (veilQ[k].seriesId === sid) { veilQ.splice(k, 1); } } /* a queued sibling never speaks */
    }
    post_({ action: 'pwsReminderMarkDone', requestingMemberId: mid, id: id })
      .then(function () { refresh(); })
      ['catch'](function () {});
  }

  /* ---------------- styles (unchanged from v1.1) ---------------- */
  function css() {
    if (document.getElementById('drCss')) { return; }
    var s = document.createElement('style'); s.id = 'drCss';
    s.textContent = ''
      + '#drFab{position:fixed;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:2200000;background:#0a0d12;border:2px solid #c8a84b;border-right:none;color:#ffd75e;border-radius:999px 0 0 999px;min-height:48px;padding:0 14px 0 16px;font-size:14px;font-family:Cinzel,serif;letter-spacing:.08em;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.6);}' /* v2.3: mid-right tab -- every corner on this fleet is already spoken for (LIFE chip bottom-left, the pills bottom-center, Winston/Find-ME on the right) */
      + '#drFab.drQuiet{opacity:.55;}'
      + '#drVeil{position:fixed;left:50%;top:18px;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:2400000;width:340px;max-width:92vw;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:16px 18px;box-shadow:0 10px 34px rgba(0,0,0,.75);font-family:\'Cormorant Garamond\',Georgia,serif;display:none;}'
      + '#drVeil.on{display:block;}'
      + '.drKick{font-family:Cinzel,serif;font-size:11px;letter-spacing:.2em;color:#c8a84b;margin:0 0 6px;}'
      + '.drMsg{font-size:19px;line-height:1.4;color:#f0e6cc;margin:0 0 4px;}'
      + '.drRoom{font-size:13px;color:rgba(240,230,204,.55);margin:0 0 12px;font-style:italic;}'
      + '.drRow{display:-webkit-flex;display:flex;gap:10px;}'
      + '.drBtn{background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:13px;letter-spacing:.08em;padding:10px 16px;min-height:44px;cursor:pointer;}'
      + '.drGhost{background:none;border:1px solid rgba(200,168,75,.4);color:#c8a84b;border-radius:999px;font-family:Cinzel,serif;font-size:12px;letter-spacing:.08em;padding:10px 14px;min-height:44px;cursor:pointer;}'
      + '#drDrawer{position:fixed;left:50%;top:70px;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:2200001;width:360px;max-width:92vw;max-height:70vh;overflow:auto;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:14px 16px;box-shadow:0 8px 30px rgba(0,0,0,.8);font-family:\'Cormorant Garamond\',Georgia,serif;display:none;}' /* v2.3: centered panel, nothing else on the fleet lives top-center */
      + '#drDrawer .drClose{position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(200,168,75,.6);font-size:20px;line-height:1;cursor:pointer;padding:4px;}'
      + '.drSeries{display:inline-block;margin-left:6px;font-family:Cinzel,serif;font-size:10px;letter-spacing:.1em;color:#c8a84b;border:1px solid rgba(200,168,75,.4);border-radius:6px;padding:1px 6px;vertical-align:middle;}'
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

  /* ---------------- the Veil (unchanged behavior) ---------------- */
  var veilQ = [];
  var veilTimer = null;
  function queueVeil(item) { veilQ.push(item); showNextVeil(); }
  function showNextVeil() {
    var v = document.getElementById('drVeil');
    if (!veilQ.length) { v.className = ''; return; }
    if (v.className === 'on') { return; }
    var item = veilQ[0];
    v.innerHTML = '<button aria-label="Close" onclick="window.DocBReminders._later(\'' + item.id + '\')" style="position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(200,168,75,.6);font-size:20px;line-height:1;cursor:pointer;padding:4px;">\u00d7</button>'
      + '<p class="drKick">' + T({ en: 'A MESSAGE YOU LEFT YOURSELF', es: 'UN MENSAJE QUE TE DEJASTE' }) + '</p>'
      + '<p class="drMsg">' + esc(item.message) + '</p>'
      + (item.room ? '<p class="drRoom">' + esc(item.room) + '</p>' : '')
      + '<div class="drRow">'
      + '<button class="drBtn" onclick="window.DocBReminders._done(\'' + item.id + '\')">' + T({ en: '\u2713 Done', es: '\u2713 Hecho' }) + '</button>'
      + '<button class="drGhost" onclick="window.DocBReminders._later(\'' + item.id + '\')">' + T({ en: 'Later', es: 'Despu\u00e9s' }) + '</button>'
      + '</div>';
    v.className = 'on';
    if (veilTimer) { clearTimeout(veilTimer); }
    veilTimer = setTimeout(function () { advanceVeil(item.id); }, 12000);
  }
  function advanceVeil(id) {
    for (var i = 0; i < veilQ.length; i++) { if (veilQ[i].id === id) { veilQ.splice(i, 1); break; } }
    document.getElementById('drVeil').className = '';
    if (veilTimer) { clearTimeout(veilTimer); veilTimer = null; }
    setTimeout(showNextVeil, 250);
  }

  /* ---------------- the drawer (reads the server-synced cache) ---------------- */
  var drawerOpen = false;
  function toggleDrawer() { drawerOpen = !drawerOpen; renderDrawer(); }
  function renderDrawer() {
    var d = document.getElementById('drDrawer');
    if (!d) { return; } /* v2.1: open() can now be called by a room's own tile before this organ has anything to show -- never throw */
    if (!drawerOpen) { d.className = ''; return; }
    /* v2.3 THE SERIES: a chain of every-5-minute nudges is ONE thing to the member, not seven rows --
       show the earliest still-pending sibling as the face of the series (or the first, once all are done). */
    var seen = {}, folded = [];
    var sorted = cache.slice().sort(function (a, b) { return (new Date(a.remindAt)).getTime() - (new Date(b.remindAt)).getTime(); });
    for (var f = 0; f < sorted.length; f++) {
      var it0 = sorted[f], key = it0.seriesId || ('solo_' + it0.id);
      if (!seen[key]) { seen[key] = { item: it0, count: 0, pending: 0 }; folded.push(seen[key]); }
      seen[key].count++;
      if (!it0.done) { seen[key].pending++; if (seen[key].item.done) { seen[key].item = it0; } }
    }
    var list = [];
    for (var g = 0; g < folded.length; g++) { var e = folded[g].item; e._count = folded[g].count; e._pending = folded[g].pending; list.push(e); }
    list.sort(function (a, b) { return (new Date(b.remindAt)).getTime() - (new Date(a.remindAt)).getTime(); });
    var h = '<button class="drClose" aria-label="Close" onclick="window.DocBReminders._close()">\u00d7</button>'
      + '<p class="drTitle">' + T({ en: 'YOUR REMINDERS \u2014 nothing here is ever lost, on any device', es: 'TUS RECORDATORIOS \u2014 nada aqu\u00ed se pierde, en ning\u00fan dispositivo' }) + '</p>';
    if (!list.length) { h += '<p class="drIMsg" style="opacity:.6;">' + T({ en: 'Nothing waiting yet.', es: 'A\u00fan no hay nada esperando.' }) + '</p>'; }
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      var when = new Date(it.remindAt).toLocaleString();
      var seriesTag = (it._count > 1) ? '<span class="drSeries">\u00d7' + it._count + (it._pending ? ' \u00b7 ' + it._pending + ' ' + T({ en: 'left', es: 'faltan' }) : '') + '</span>' : '';
      h += '<div class="drItem' + (it.done ? ' drDone' : '') + '" id="drIt_' + it.id + '">'
        + '<p class="drIMsg">' + esc(it.message) + seriesTag + '</p>'
        + '<p class="drIWhen">' + when + (it.room ? ' \u00b7 ' + esc(it.room) : '') + '</p>'
        + (it.done ? '' : '<button class="drIBtn" onclick="window.DocBReminders._done(\'' + it.id + '\')">' + T({ en: '\u2713 Mark done', es: '\u2713 Marcar hecho' }) + '</button>')
        + '</div>';
    }
    d.innerHTML = h;
    d.className = 'on';
  }
  function renderFab() {
    var fab = document.getElementById('drFab');
    var due = 0, dueSeries = {};
    for (var i = 0; i < cache.length; i++) {
      var c = cache[i];
      if (c.done || (new Date(c.remindAt)).getTime() > nowMs()) { continue; }
      var k = c.seriesId || ('solo_' + c.id);
      if (!dueSeries[k]) { dueSeries[k] = true; due++; } /* v2.3: a series is one thing waiting, not seven */
    }
    if (!fab) {
      fab = document.createElement('button'); fab.id = 'drFab';
      fab.setAttribute('aria-label', 'Reminders');
      fab.onclick = toggleDrawer;
      document.body.appendChild(fab);
    }
    fab.className = due ? '' : 'drQuiet';
    fab.textContent = '\ud83d\udcec ' + T({ en: 'REMINDERS', es: 'RECORDATORIOS' }) + (due ? (' \u00b7 ' + due) : '');
  }

  /* ---------------- the sweep -- now a server fetch, not a localStorage read ---------------- */
  function refresh() {
    var mid = memberId();
    if (!mid || listInFlight) { return; }
    listInFlight = true;
    post_({ action: 'pwsReminderList', requestingMemberId: mid })
      .then(function (d) {
        listInFlight = false;
        if (!d || !d.success || !d.reminders) { return; }
        cache = d.reminders;
        var t = nowMs();
        for (var i = 0; i < cache.length; i++) {
          var it = cache[i];
          if (!it.done && (new Date(it.remindAt)).getTime() <= t && !it.seen && !SEEN_THIS_LOAD[it.id]) {
            SEEN_THIS_LOAD[it.id] = true;
            markSeen_(it.id); /* server-synced: another device won't re-pop this one either */
            it.seen = true;
            queueVeil(it);
          }
        }
        renderFab();
        if (drawerOpen) { renderDrawer(); }
      })
      ['catch'](function () { listInFlight = false; });
  }
  function buildShell() {
    if (document.getElementById('drVeil')) { return; }
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
    if (!memberId()) { return; } /* no member key on this page yet -- render nothing, break nothing, matches every organ before it */
    css(); buildShell(); renderFab();
    refresh();
    setInterval(refresh, 45000); /* a touch gentler than v1.x's 30s, now that each tick is a real network call */
    try {
      document.addEventListener('visibilitychange', function () { if (!document.hidden) { refresh(); } });
      window.addEventListener('focus', refresh);
    } catch (e) {}
  }

  window.DocBReminders = {
    add: add,
    refresh: refresh,
    open: function () { drawerOpen = true; renderDrawer(); },
    _close: function () { drawerOpen = false; renderDrawer(); }, /* v2.1: lets a room's own Accessories tile open the same drawer the corner badge does */
    _done: function (id) { markDone_(id); advanceVeil(id); glow(id); renderDrawer(); },
    _later: function (id) { advanceVeil(id); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
