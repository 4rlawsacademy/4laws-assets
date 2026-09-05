/* ============================================================
   DOCB-REMINDERS.JS v2.4.1 — THE HONEST FORM (external gate catch, 9/5/26):
   the new "+ NEW REMINDER" form confirmed success even when every save
   failed -- it counted successes and never failures, the exact bug the
   AI road already had cured in /todos v64.11. Cured, not argued: the
   form now mirrors harvest()'s own branching -- success only when
   something truly saved, an honest failure line otherwise, and on total
   failure the form stays open with the member's words still in it.
   The rest of v2.4 stands below.
   ============================================================
   DOCB-REMINDERS.JS v2.4 — FROM ANYWHERE (9/5/26, the founder: "I want to
   set reminders from anywhere the idea comes to mind, not just when
   working todos" -- and until now only /todos's own room knew the trick).
   Two roads, both in this one file so every page inherits them on purge:
   1. "+ NEW REMINDER" inside the panel -- message, a time picker, and an
      optional chain (every N minutes × count). Deterministic, no Doc B
      needed, so it works even on pages with no chat at all (/studio,
      /atelier, /doc-b-ai). Room label = the page title.
   2. THE VOICE ROAD, portable: promptClause() (THE KEPT WORD with the
      member's live clock -- the exact words /todos field-proved) and
      harvest(reply, room) (every REMINDER_SET line parsed, series-aware,
      seated, honestly toasted, stripped from the reply). Any Doc B room
      adds one guarded line to its prompt and one to its landing. Wired
      this cut into /pws-trust's coaches, /talent-1's coaches, /studio-
      create's Doc B, /ai-companion's session, and /pws's tool-room
      overlay + header co-pilot. The organ carries its own small toast
      so no room has to lend one. v2.3's crown stands below.
   ============================================================
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

  /* ---------------- v2.4: the organ carries the voice road for every room ---------------- */
  function toast_(msg) {
    try {
      var t = document.getElementById('drToast');
      if (!t) { t = document.createElement('div'); t.id = 'drToast'; document.body.appendChild(t); }
      t.textContent = msg; t.className = 'on';
      clearTimeout(t._tm); t._tm = setTimeout(function () { t.className = ''; }, 3600);
    } catch (e) {}
  }
  function promptClause() {
    /* THE KEPT WORD, portable: any room appends this to its systemPrompt. Carries the
       member's real clock so Doc B computes true timestamps. Same words /todos proved. */
    return ' THE KEPT WORD: RIGHT NOW, the member\u2019s exact clock time is ' + (new Date()).toString() + '. '
      + 'When the member asks to be reminded, prompted, or nudged about something at a real future moment \u2014 later today, tomorrow, or any time you must compute from what they said (\u2018in 20 minutes\u2019, \u2018at 2:15\u2019, \u2018tomorrow morning\u2019) \u2014 '
      + 'compute the true timestamp from the clock time just given, then END your reply with one REMINDER_SET line PER MOMENT, each on its own line, nothing after them: REMINDER_SET {"remindAt":"<ISO 8601 with their own timezone offset>","message":"<the plain thing to tell them>","series":<number>}. '
      + 'THE SERIES: when the member wants the same nudge repeated (\u2018every 5 minutes from 12:00 to 12:30\u2019, \u2018every day at 9\u2019), emit one line per moment and give all of them the SAME "series" number (1 for the first chain, 2 for a second unrelated chain); a single stand-alone reminder omits "series". Marking any one of a series done silences the rest \u2014 the house handles that. Cap a series at 12 lines; for \u2018every day\u2019 set the next 7 days. '
      + 'ONLY PROMISE WHAT YOU EMIT: never say you will remind them at times you did not write a line for. Confirm warmly in your own words BEFORE the lines, never as a list of steps, never telling the member to set anything themselves. If no real time can be worked out from what they said, ask ONE clarifying question instead of guessing. '
      + 'NEVER emit these lines for a same-session countdown (checking something in a few minutes while still here) \u2014 that is a Timer, not a reminder. ';
  }
  function harvest(reply, room) {
    /* Parses every REMINDER_SET line out of a Doc B reply, seats them (series-aware),
       toasts the honest count, and returns the reply with the lines stripped. Safe on
       any string; returns it untouched when there is nothing to harvest. */
    reply = (reply == null) ? '' : String(reply);
    var lines = [], re = /REMINDER_SET\s*(\{[\s\S]*?\})/g, m;
    while ((m = re.exec(reply)) !== null) { lines.push(m[1]); }
    if (!lines.length) { return reply; }
    var clean = reply.replace(/REMINDER_SET\s*\{[\s\S]*?\}/g, '').replace(/\s+$/, '');
    var seriesMap = {}, ok = 0, bad = 0, first = null, pending = lines.length;
    function finish() {
      if (--pending > 0) { return; }
      var es = (lang() === 'es');
      if (ok && !bad) { toast_('\u23F0 ' + (ok > 1 ? (es ? ok + ' recordatorios puestos, el primero ' : ok + ' reminders set, first at ') : (es ? 'Recordatorio puesto para ' : 'Reminder set for ')) + (first ? (new Date(first)).toLocaleString() : '')); }
      else if (ok && bad) { toast_('\u23F0 ' + ok + (es ? ' puestos; ' : ' set; ') + bad + (es ? ' no se pudieron fijar.' : ' couldn\u2019t be pinned down.')); }
      else { toast_(es ? 'No pude fijar la hora del recordatorio. Intenta de nuevo con una hora clara.' : 'Couldn\u2019t pin down that time for the reminder. Try again with a clearer time.'); }
    }
    for (var i = 0; i < lines.length; i++) {
      try {
        var o = JSON.parse(lines[i]);
        if (!o || !o.remindAt || !o.message) { bad++; finish(); continue; }
        var sid = '';
        if (o.series !== undefined && o.series !== null && o.series !== '') {
          var sk = String(o.series);
          if (!seriesMap[sk]) { seriesMap[sk] = 'ser_' + nowMs().toString(36) + '_' + sk.replace(/[^a-z0-9]/gi, '').substring(0, 8); }
          sid = seriesMap[sk];
        }
        if (!first || (new Date(o.remindAt)).getTime() < (new Date(first)).getTime()) { first = o.remindAt; }
        add({ msg: String(o.message).substring(0, 400), remindAt: o.remindAt, room: room || '', seriesId: sid })
          .then(function (id) { if (id) { ok++; } else { bad++; } finish(); });
      } catch (e) { bad++; finish(); }
    }
    return clean;
  }

  /* ---------------- v2.4: "+ New reminder" -- from anywhere, no Doc B needed ---------------- */
  function pad2_(n) { return (n < 10 ? '0' : '') + n; }
  function localInputValue_(d) {
    return d.getFullYear() + '-' + pad2_(d.getMonth() + 1) + '-' + pad2_(d.getDate()) + 'T' + pad2_(d.getHours()) + ':' + pad2_(d.getMinutes());
  }
  function formHtml_() {
    var es = (lang() === 'es');
    var def = new Date(nowMs() + 60 * 60 * 1000); def.setSeconds(0, 0);
    return '<div class="drForm" id="drForm">'
      + '<input id="drFMsg" class="drIn" maxlength="400" placeholder="' + (es ? 'Recu\u00e9rdame\u2026' : 'Remind me to\u2026') + '">'
      + '<div class="drFRow"><input id="drFAt" class="drIn" type="datetime-local" value="' + localInputValue_(def) + '">'
      + '<select id="drFRep" class="drIn drSel"><option value="0">' + (es ? 'Una vez' : 'Once') + '</option><option value="5">' + (es ? 'Cada 5 min' : 'Every 5 min') + '</option><option value="10">' + (es ? 'Cada 10 min' : 'Every 10 min') + '</option><option value="15">' + (es ? 'Cada 15 min' : 'Every 15 min') + '</option><option value="60">' + (es ? 'Cada hora' : 'Every hour') + '</option><option value="1440">' + (es ? 'Cada d\u00eda' : 'Every day') + '</option></select>'
      + '<select id="drFCnt" class="drIn drSel"><option value="3">\u00d73</option><option value="5">\u00d75</option><option value="7" selected>\u00d77</option><option value="12">\u00d712</option></select></div>'
      + '<div class="drFRow"><button class="drBtn" onclick="window.DocBReminders._submitForm()">' + (es ? '\u23F0 Guardar' : '\u23F0 Save') + '</button>'
      + '<button class="drGhost" onclick="window.DocBReminders._toggleForm()">' + (es ? 'Cancelar' : 'Cancel') + '</button></div>'
      + '</div>';
  }
  var formOpen = false;
  function submitForm_() {
    var msgEl = document.getElementById('drFMsg'), atEl = document.getElementById('drFAt'), repEl = document.getElementById('drFRep'), cntEl = document.getElementById('drFCnt');
    if (!msgEl || !atEl) { return; }
    var msg = String(msgEl.value || '').replace(/^\s+|\s+$/g, '');
    var at = new Date(atEl.value);
    var es = (lang() === 'es');
    if (!msg) { toast_(es ? 'Escribe qu\u00e9 recordarte.' : 'Write what to remind you of.'); return; }
    if (isNaN(at.getTime())) { toast_(es ? 'Elige una hora v\u00e1lida.' : 'Pick a valid time.'); return; }
    var every = parseInt(repEl ? repEl.value : '0', 10) || 0;
    var count = every ? (parseInt(cntEl ? cntEl.value : '1', 10) || 1) : 1;
    var sid = every ? ('ser_' + nowMs().toString(36) + '_form') : '';
    var okN = 0, badN = 0, pending = count;
    function fin() {
      /* v2.4.1: external gate catch -- the form's toast confirmed success even when every add()
         failed. Same branching harvest() already uses: success only when something truly saved. */
      if (--pending > 0) { return; }
      if (okN && !badN) {
        toast_('\u23F0 ' + (okN > 1 ? okN + (es ? ' recordatorios puestos, el primero ' : ' reminders set, first at ') : (es ? 'Recordatorio puesto para ' : 'Reminder set for ')) + at.toLocaleString());
        formOpen = false; renderDrawer();
      } else if (okN && badN) {
        toast_('\u23F0 ' + okN + (es ? ' puestos; ' : ' set; ') + badN + (es ? ' no se pudieron guardar.' : ' couldn\u2019t be saved.'));
        formOpen = false; renderDrawer();
      } else {
        toast_(es ? 'No se pudo guardar el recordatorio \u2014 revisa la conexi\u00f3n e intenta de nuevo.' : 'Couldn\u2019t save the reminder \u2014 check your connection and try again.');
        /* the form stays open with the words still in it; nothing typed is lost */
      }
    }
    for (var i = 0; i < count; i++) {
      add({ msg: msg, remindAt: at.getTime() + i * every * 60000, room: (document.title || '').substring(0, 80), seriesId: sid })
        .then(function (id) { if (id) { okN++; } else { badN++; } fin(); });
    }
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
      + '.drForm{margin:8px 0 12px;padding:10px;border:1px dashed rgba(200,168,75,.45);border-radius:10px;}'
      + '.drIn{width:100%;box-sizing:border-box;background:#0a0d12;border:1px solid rgba(200,168,75,.45);border-radius:8px;color:#f0e6cc;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:16px;padding:8px 10px;margin-bottom:8px;}'
      + '.drSel{width:auto;}'
      + '.drFRow{display:-webkit-flex;display:flex;gap:8px;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-items:center;align-items:center;}'
      + '.drNew{display:inline-block;margin:0 0 10px;background:none;border:1px solid rgba(200,168,75,.5);color:#c8a84b;border-radius:999px;font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;padding:8px 14px;cursor:pointer;}'
      + '#drToast{position:fixed;left:50%;bottom:24px;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:2500000;background:#14100a;border:1px solid #c8a84b;color:#f0e6cc;border-radius:10px;padding:10px 16px;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:16px;max-width:92vw;box-shadow:0 6px 24px rgba(0,0,0,.7);opacity:0;pointer-events:none;-webkit-transition:opacity .25s;transition:opacity .25s;}'
      + '#drToast.on{opacity:1;}'
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
    h += formOpen ? formHtml_() : '<button class="drNew" onclick="window.DocBReminders._toggleForm()">\uff0b ' + T({ en: 'NEW REMINDER', es: 'NUEVO RECORDATORIO' }) + '</button>'; /* v2.4: from anywhere, no Doc B needed */
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
    promptClause: promptClause, /* v2.4: rooms append this to their systemPrompt */
    harvest: harvest,           /* v2.4: rooms pass Doc B's reply through this */
    _close: function () { drawerOpen = false; formOpen = false; renderDrawer(); },
    _toggleForm: function () { formOpen = !formOpen; renderDrawer(); },
    _submitForm: submitForm_, /* v2.1: lets a room's own Accessories tile open the same drawer the corner badge does */
    _done: function (id) { markDone_(id); advanceVeil(id); glow(id); renderDrawer(); },
    _later: function (id) { advanceVeil(id); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
