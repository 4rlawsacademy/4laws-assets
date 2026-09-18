/* ============================================================
   DOCB-REMINDERS.JS v2.9 — THE QUIET TAB (Bench 34, 9/18/26; see refresh()) on
   v2.8 — THE PEOPLE HAND (Bench 41, Sun 9/13/26; the
   founder: "put the contacts into GitHub... then I can access it from
   anywhere"). The picker leaves /todos and lives HERE, in the organ every
   page seats: one hand, DocBReminders.pickPerson(cb), opens a big centered
   sheet -- WHO? -- that searches the house book AND the member's dropped
   address book together (the compact book /todos keeps on the device under
   '4laws-book-drop_<memberId>'; the organ reads it, never writes it);
   matches stand big with phone and email; ＋ hands the person back to the
   page that asked (a room's Contacts, a Window, a form) and files them in
   the house book too. DocBReminders.openBook() opens the same sheet to
   browse and ＋ into the house with no page waiting. The Meetings form's
   FROM THIS HOUSE now opens this sheet as well (the in-drawer list stays
   for the drawer). One picker, every page. v2.7 stands below.
   ============================================================
   DOCB-REMINDERS.JS v2.7 — THE HOUSE BOOK (Bench 41, Sat 9/12/26; the
   founder: "instead of entering contacts manually, why can't they have
   access to my contacts on my device?... I want this badly... the
   difference between a Ford and a Cadillac for the butler work").
   ONE BOOK FOR THE WHOLE HOUSE: every contact the Butler ever seated in
   any room (read from every window's config through pwsGetEquipAll,
   read-only) plus everyone picked from the phone, merged by name into one
   library. The book's own additions and enrichments live on ONE reserved
   equip row, '__house_book__' (the same trick /todos uses for its
   checklist: a key no real activity can ever be named), saved through
   pwsSaveEquip -- so a pick on the phone is on the Mac at the next load.
   No backend change.
   FROM MY PHONE (in the Meetings form): the browser's Contact Picker
   (Safari on iPhone, Chrome on Android) opens the phone's own contacts;
   the member taps people; name, phone and email land in the guests AND in
   the book. Where no picker exists (the Mac) the button says so honestly
   and points to the .vcf road. Never the whole address book -- only who
   was chosen, each time.
   FROM THIS HOUSE (every device): the book as a picker -- a search box,
   one tap per person into the guests; a person missing a number or an
   email shows the gap, and ✎ opens a small card (phone, email, link) --
   fill it, save, and the book is richer from then on.
   HONEST LINE (gate's catch, 9/12): the picker is Android's alone -- every
   iPhone browser is WebKit -- so the fallback names the iPhone road exactly.
   Public hands for the pages: DocBReminders.pickFromPhone(cb),
   DocBReminders.houseBook(cb), DocBReminders.addToHouse(contact).
   v2.6 stands below.
   ============================================================
   DOCB-REMINDERS.JS v2.6 — THE KEYED DRAWER (Bench 41, Sat 9/12/26; the
   founder, testing the Arsenal's doors from the LIFE Hall: Meetings
   "took me to PWS talent, in other words to my working page, which is
   nothing"). The wall's doors carry keys now; this organ rides ten pages,
   so the reader lives HERE once and every page learns it at once:
     <page>#weapon=reminders  -> the drawer opens with + NEW REMINDER open
     <page>#weapon=meetings   -> the drawer opens with + NEW MEETING open
   The key is stripped from the address after landing (a reload does not
   re-open). Other keys (timer, sign, form...) belong to the page's own
   brain and are left untouched. Nothing else moved; v2.5 stands below.
   Fleet law: pages that seat this organ bump ?v= on its line to fetch it.
   ============================================================
   DOCB-REMINDERS.JS v2.5 — A MESSAGE YOU LEFT FOR SOMEONE (9/5/26, the
   founder: "we're one step away... cut"). Meetings: a reminder with a
   guest list, a door, and an owner -- carved with his rulings:
   - a guest bows out alone, no reason asked ("it's their group, not ours");
   - the owner (whoever made it, on whatever page) alone holds Cancel
     and Reschedule;
   - the choices unfold, they do not crowd (tap a meeting, its options
     open; nothing stacked on its face).
   In the panel: "+ NEW MEETING" (title, time, once/daily/weekly, a Zoom
   or other link, guests one per line as "Name, phone"), a MEETINGS
   section above the personal reminders. In the Veil: a meeting rises on
   every guest's device at once with Join -> (the door), Later, and
   Can't make it for guests. Guest identity is PHONE -- the one identity
   the house already trusts; a phone that belongs to a member puts the
   meeting in their own Veil, an outsider's phone goes to the Twilio
   queue (PWS.gs Build 32). Recurrence: the client computes the next
   occurrence; a happening-now meeting counts on the badge for an hour.
   Honest limits, named: meeting "seen" is per page-load only (a live
   meeting re-rises on reload within its hour); resolving "everyone
   present here" into guests is the next cut (needs the room's member
   roster); the Companion's mediation hook and the Armory key call
   DocBReminders.createMeeting() when they are built. Two independent
   fetches -- a meetings failure never blanks the reminders.
   v2.4.1's crown stands below.
   ============================================================
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

  /* ---------------- v2.5 A MESSAGE YOU LEFT FOR SOMEONE: meetings ---------------- */
  var meetings = [];          /* last list from the server */
  var openMtg = '';           /* which meeting's choices are unfolded in the panel */
  var reschedMtg = '';        /* which meeting has its reschedule picker open */
  var mtgFormOpen = false;
  function mtgNext_(m) {
    /* next occurrence: the start itself, or -- for daily/weekly -- the first occurrence no older than an hour */
    var t = (new Date(m.startAt)).getTime();
    if (isNaN(t)) { return NaN; }
    var period = (m.recurrence === 'daily') ? 86400000 : (m.recurrence === 'weekly') ? 604800000 : 0;
    if (!period) { return t; }
    var floor = nowMs() - 3600000;
    while (t < floor) { t += period; }
    return t;
  }
  function mtgLive_(m) { return m && m.status !== 'cancelled' && m.myStatus !== 'out'; }
  function mtgGuestLine_(m) {
    var names = [], outs = 0;
    for (var i = 0; i < (m.guests || []).length; i++) { var g = m.guests[i]; if (g.status === 'out') { outs++; } else { names.push(g.name || g.phone || '?'); } }
    var line = names.join(', ');
    if (outs) { line += (line ? ' \u00b7 ' : '') + outs + ' ' + T({ en: 'out', es: 'fuera' }); }
    return line;
  }
  function mtgCreate_(o) {
    var mid = memberId(); if (!mid) { return Promise.resolve(null); }
    return post_({ action: 'pwsMeetingCreate', requestingMemberId: mid, title: o.title, startAt: o.startAt, recurrence: o.recurrence || '', link: o.link || '', room: o.room || '', guests: o.guests || [] })
      .then(function (d) { if (d && d.success) { refresh(); return d.id; } return null; })['catch'](function () { return null; });
  }
  function mtgAct_(action, extra) {
    var mid = memberId(); if (!mid) { return Promise.resolve(false); }
    var body = { action: action, requestingMemberId: mid };
    for (var k in extra) { if (extra.hasOwnProperty(k)) { body[k] = extra[k]; } }
    return post_(body).then(function (d) { refresh(); return !!(d && d.success); })['catch'](function () { return false; });
  }
  /* ---------------- v2.7 THE HOUSE BOOK ---------------- */
  var HOUSE_KEY = '__house_book__';
  var bookAll = [], bookOwn = [], bookLoaded = false, bookBusy = false, bookOpen = false, bookEdit = '', bookQ = '';
  function bookKey_(n) { return String(n || '').toLowerCase().replace(/[^a-z0-9\u00e0-\u00ff ]+/g, ' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); }
  function bookFill_(list, c) {
    /* merge by name: fill gaps, never wipe */
    if (!c || !c.name) { return list; }
    var k = bookKey_(c.name);
    for (var i = 0; i < list.length; i++) {
      var e = list[i]; if (!e || bookKey_(e.name) !== k) { continue; }
      if (c.phone && !e.phone) { e.phone = c.phone; }
      if (c.email && !e.email) { e.email = c.email; }
      if (c.extraLink && !e.extraLink) { e.extraLink = c.extraLink; }
      if (c.note && !e.note) { e.note = c.note; }
      return list;
    }
    list.push({ name: String(c.name).substring(0, 80), phone: c.phone || '', email: c.email || '', extraLink: c.extraLink || '', note: c.note || '' });
    return list;
  }
  function bookLoad_(cb) {
    var mid = memberId(); if (!mid) { if (cb) { cb([]); } return; }
    if (bookLoaded) { if (cb) { cb(bookAll); } return; }
    if (bookBusy) { setTimeout(function () { bookLoad_(cb); }, 300); return; }
    bookBusy = true;
    post_({ action: 'pwsGetEquipAll', requestingMemberId: mid })
      .then(function (d) {
        bookBusy = false;
        var maps = [], k;
        if (d && d.legacy) { maps.push(d.legacy); }
        if (d && d.data) { maps.push(d.data); }
        var all = [], own = [];
        for (var m = 0; m < maps.length; m++) {
          for (k in maps[m]) {
            if (!Object.prototype.hasOwnProperty.call(maps[m], k)) { continue; }
            var cfg = maps[m][k]; if (!cfg || !cfg.contacts || !cfg.contacts.length) { continue; }
            if (k === HOUSE_KEY) { own = cfg.contacts.slice(); continue; }
            for (var c = 0; c < cfg.contacts.length; c++) { bookFill_(all, cfg.contacts[c]); }
          }
        }
        /* the book's own row is applied LAST so the member's enrichments win */
        for (var o = 0; o < own.length; o++) { var oc = own[o]; if (!oc || !oc.name) { continue; } var ok = bookKey_(oc.name), hit = false;
          for (var a = 0; a < all.length; a++) { if (bookKey_(all[a].name) === ok) { hit = true; if (oc.phone) { all[a].phone = oc.phone; } if (oc.email) { all[a].email = oc.email; } if (oc.extraLink) { all[a].extraLink = oc.extraLink; } if (oc.note) { all[a].note = oc.note; } } }
          if (!hit) { all.push({ name: oc.name, phone: oc.phone || '', email: oc.email || '', extraLink: oc.extraLink || '', note: oc.note || '' }); } }
        all.sort(function (x, y) { return bookKey_(x.name) < bookKey_(y.name) ? -1 : 1; });
        bookAll = all; bookOwn = own; bookLoaded = true;
        if (cb) { cb(bookAll); }
      })
      ['catch'](function () { bookBusy = false; if (cb) { cb(bookAll); } });
  }
  function bookSave_() {
    var mid = memberId(); if (!mid) { return Promise.resolve(false); }
    return post_({ action: 'pwsSaveEquip', requestingMemberId: mid, activityName: HOUSE_KEY, config: { contacts: bookOwn, houseBook: true, updatedAt: nowMs() } })
      .then(function (d) { return !!(d && (d.status === 'ok' || d.success)); })['catch'](function () { return false; });
  }
  function bookAdd_(c, silent) {
    if (!c || !c.name) { return; }
    bookFill_(bookAll, c); bookFill_(bookOwn, c);
    /* an enrichment overwrites the own row's copy so the newest words stand */
    for (var i = 0; i < bookOwn.length; i++) { if (bookKey_(bookOwn[i].name) === bookKey_(c.name)) { if (c.phone) { bookOwn[i].phone = c.phone; } if (c.email) { bookOwn[i].email = c.email; } if (c.extraLink) { bookOwn[i].extraLink = c.extraLink; } } }
    for (var j = 0; j < bookAll.length; j++) { if (bookKey_(bookAll[j].name) === bookKey_(c.name)) { if (c.phone) { bookAll[j].phone = c.phone; } if (c.email) { bookAll[j].email = c.email; } if (c.extraLink) { bookAll[j].extraLink = c.extraLink; } } }
    bookSave_().then(function (ok) { if (!ok && !silent) { toast_(T({ en: 'Couldn\u2019t reach the house book \u2014 kept on this device for now.', es: 'No alcanc\u00e9 el libro de la casa \u2014 guardado en este dispositivo por ahora.' })); } });
  }
  function phonePick_(cb) {
    var es = (lang() === 'es');
    var nav = window.navigator;
    if (!(nav && nav.contacts && nav.contacts.select)) {
      toast_(es ? 'Este dispositivo no tiene selector de contactos (solo Android). En iPhone: Contactos \u2192 Compartir \u2192 Guardar en Archivos, y suelta la tarjeta en la boca + de /todos.' : 'No contact picker on this device (Android only). On iPhone: Contacts \u2192 Share \u2192 Save to Files, then drop the card into the + mouth on /todos.');
      if (cb) { cb([]); } return;
    }
    nav.contacts.select(['name', 'tel', 'email'], { multiple: true }).then(function (picked) {
      var out = [];
      for (var i = 0; i < (picked || []).length; i++) {
        var p = picked[i] || {};
        var c = { name: (p.name && p.name[0]) ? String(p.name[0]) : '', phone: (p.tel && p.tel[0]) ? String(p.tel[0]) : '', email: (p.email && p.email[0]) ? String(p.email[0]) : '' };
        if (!c.name && !c.phone) { continue; }
        if (!c.name) { c.name = c.phone; }
        out.push(c); bookAdd_(c, true);
      }
      if (out.length) { toast_(es ? out.length + ' en el libro de la casa.' : out.length + ' filed in the house book.'); }
      if (cb) { cb(out); }
    })['catch'](function () { if (cb) { cb([]); } });
  }
  function guestsAppend_(list) {
    var g = document.getElementById('drMGuests'); if (!g) { return; }
    var lines = String(g.value || '').replace(/\s+$/, '');
    for (var i = 0; i < list.length; i++) {
      var c = list[i]; if (!c || !c.name) { continue; }
      var line = c.name + (c.phone ? ', ' + c.phone : '');
      if (lines.indexOf(line) !== -1) { continue; }
      lines = lines ? (lines + '\n' + line) : line;
    }
    g.value = lines;
  }
  function bookHtml_() {
    var es = (lang() === 'es');
    var h = '<div class="drBk" id="drBk">'
      + '<input class="drIn" id="drBkQ" placeholder="' + (es ? 'Buscar\u2026' : 'Search\u2026') + '" value="' + esc(bookQ) + '" oninput="window.DocBReminders._bookQ(this.value)">';
    if (!bookLoaded) { h += '<div class="drBkEmpty">' + (es ? 'Leyendo el libro de la casa\u2026' : 'Reading the house book\u2026') + '</div>'; return h + '</div>'; }
    var q = bookKey_(bookQ), n = 0;
    for (var i = 0; i < bookAll.length; i++) {
      var c = bookAll[i]; if (!c || !c.name) { continue; }
      if (q && bookKey_(c.name + ' ' + (c.phone || '') + ' ' + (c.email || '')).indexOf(q) === -1) { continue; }
      n++; var k = bookKey_(c.name);
      if (bookEdit === k) {
        h += '<div class="drBkEdit"><div class="drBkName">' + esc(c.name) + '</div>'
          + '<input class="drIn" id="drBkP" placeholder="' + (es ? 'Tel\u00e9fono' : 'Phone') + '" value="' + esc(c.phone || '') + '">'
          + '<input class="drIn" id="drBkE" placeholder="Email" value="' + esc(c.email || '') + '">'
          + '<input class="drIn" id="drBkL" placeholder="' + (es ? 'Enlace (opcional)' : 'Link (optional)') + '" value="' + esc(c.extraLink || '') + '">'
          + '<div class="drFRow"><button class="drBtn" onclick="window.DocBReminders._bookSave(\'' + esc(k) + '\')">' + (es ? 'Guardar' : 'Save') + '</button>'
          + '<button class="drGhost" onclick="window.DocBReminders._bookEdit(\'\')">' + (es ? 'Cancelar' : 'Cancel') + '</button></div></div>';
        continue;
      }
      var gap = (!c.phone && !c.email) ? (es ? 'SIN DATOS' : 'NO NUMBER') : (!c.phone ? (es ? 'SIN TEL\u00c9FONO' : 'NO PHONE') : '');
      h += '<div class="drBkIt"><div class="drBkName" onclick="window.DocBReminders._bookPick(\'' + esc(k) + '\')">' + esc(c.name) + '<small>' + esc([c.phone, c.email].filter(function (x) { return !!x; }).join(' \u00b7 ')) + '</small></div>'
        + (gap ? '<span class="drBkGap">' + gap + '</span>' : '')
        + '<button class="drBkPen" title="' + (es ? 'Completar' : 'Fill in') + '" onclick="window.DocBReminders._bookEdit(\'' + esc(k) + '\')">\u270e</button></div>';
      if (n >= 60) { break; }
    }
    if (!n) { h += '<div class="drBkEmpty">' + (es ? 'El libro est\u00e1 vac\u00edo por ahora \u2014 el Mayordomo lo llena a medida que trabajas.' : 'The book is empty for now \u2014 the Butler fills it as you work.') + '</div>'; }
    return h + '</div>';
  }
  function bookFind_(k) { for (var i = 0; i < bookAll.length; i++) { if (bookKey_(bookAll[i].name) === k) { return bookAll[i]; } } return null; }

  /* ---------------- v2.8 THE PEOPLE HAND ---------------- */
  var _pplCb = null, _pplQ = '', _pplPool = null, _pplIn = {};
  function pplDropped_() {
    try { var r = localStorage.getItem('4laws-book-drop_' + memberId()); var b = r ? (JSON.parse(r) || []) : []; var out = []; for (var i = 0; i < b.length; i++) { if (b[i] && b[i].n) out.push({ name: b[i].n, phone: b[i].p || '', email: b[i].e || '' }); } return out; } catch (e) { return []; }
  }
  function pplPool_(cb) {
    if (_pplPool) { cb(_pplPool); return; }
    bookLoad_(function (house) {
      var pool = [], seen = {};
      function add(c, inHouse) { if (!c || !c.name) return; var k = bookKey_(c.name); if (!k) return; if (seen[k]) { if (inHouse) _pplIn[k] = 1; return; } seen[k] = 1; if (inHouse) _pplIn[k] = 1; pool.push({ name: c.name, phone: c.phone || '', email: c.email || '' }); }
      for (var i = 0; i < (house || []).length; i++) add(house[i], true);
      var d = pplDropped_(); for (var j = 0; j < d.length; j++) add(d[j], false);
      pool.sort(function (x, y) { return bookKey_(x.name) < bookKey_(y.name) ? -1 : 1; });
      _pplPool = pool; cb(pool);
    });
  }
  function pplShell_() {
    var el = document.getElementById('drPeople'); if (el) return el;
    el = document.createElement('div'); el.id = 'drPeople';
    el.innerHTML = '<div class="drPPanel"><div class="drPHead"><div class="drPCmd" id="drPCmd"></div><button class="drPClose" data-ppl="close">\u00d7</button></div><div class="drPBody" id="drPBody"></div></div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (ev) {
      if (ev.target === el) { pplClose_(); return; }
      var t = ev.target; while (t && t !== el && !(t.getAttribute && t.getAttribute('data-ppl'))) t = t.parentNode;
      if (!t || t === el) return;
      var a = t.getAttribute('data-ppl');
      if (a === 'close') { pplClose_(); return; }
      if (a === 'add') { var i = parseInt(t.getAttribute('data-i'), 10); pplPool_(function (pool) { var c = pool[i]; if (!c) return; bookAdd_(c, true); _pplIn[bookKey_(c.name)] = 1; t.className = 'drPAdd in'; t.textContent = '\u2713'; toast_(T({ en: '\u2713 ' + c.name, es: '\u2713 ' + c.name })); if (_pplCb) { var f = _pplCb; pplClose_(); f(c); } }); return; }
    });
    el.addEventListener('input', function (ev) { if (ev.target && ev.target.id === 'drPQ') { _pplQ = ev.target.value; pplRender_(); } });
    return el;
  }
  function pplRender_() {
    var body = document.getElementById('drPBody'); if (!body) return;
    var es = (lang() === 'es'), q = bookKey_(_pplQ);
    pplPool_(function (pool) {
      var h = '<input class="drPQ" id="drPQ" type="text" autocomplete="off" autocapitalize="off" placeholder="' + (es ? 'Escribe un nombre\u2026' : 'Type a name\u2026') + '" value="' + esc(_pplQ) + '">', n = 0;
      if (!pool.length) { h += '<div class="drPNote">' + (es ? 'A\u00fan no hay nadie en la casa. Suelta tu libreta (.vcf) en la puerta + de /todos.' : 'No one in the house yet. Drop your address book (.vcf) at the + door on /todos.') + '</div>'; }
      else if (!q) { h += '<div class="drPNote">' + (es ? pool.length + ' personas \u00b7 escribe para buscar.' : pool.length + ' people \u00b7 type to search.') + '</div>'; }
      else {
        for (var i = 0; i < pool.length && n < 40; i++) { var c = pool[i]; if (bookKey_(c.name + ' ' + c.phone + ' ' + c.email).indexOf(q) === -1) continue; n++; var inH = !!_pplIn[bookKey_(c.name)];
          h += '<div class="drPRow"><div class="drPNm">' + esc(c.name) + (c.phone || c.email ? '<small>' + esc([c.phone, c.email].filter(function (x) { return !!x; }).join(' \u00b7 ')) + '</small>' : '') + '</div><button class="drPAdd' + (inH && !_pplCb ? ' in' : '') + '" data-ppl="add" data-i="' + i + '">' + (inH && !_pplCb ? '\u2713' : '\uFF0B') + '</button></div>'; }
        if (!n) h += '<div class="drPNote">' + (es ? 'Nadie con ese nombre.' : 'No one by that name.') + '</div>';
      }
      var keep = document.activeElement && document.activeElement.id === 'drPQ', pos = keep ? document.activeElement.selectionStart : null;
      body.innerHTML = h;
      var qq = document.getElementById('drPQ'); if (qq && (keep || !_pplQ)) { try { qq.focus(); if (pos !== null) qq.setSelectionRange(pos, pos); } catch (e) {} }
    });
  }
  function pplOpen_(cb, cmd) {
    _pplCb = cb || null; _pplQ = ''; _pplPool = null; _pplIn = {};
    var el = pplShell_(); var es = (lang() === 'es');
    document.getElementById('drPCmd').textContent = cmd || (cb ? (es ? '\u00bfQui\u00e9n?' : 'Who?') : (es ? 'Tu gente.' : 'Your people.'));
    el.className = 'on'; pplRender_();
  }
  function pplClose_() { var el = document.getElementById('drPeople'); if (el) el.className = ''; _pplCb = null; }

  function mtgFormHtml_() {
    var es = (lang() === 'es');
    var def = new Date(nowMs() + 24 * 3600000); def.setMinutes(0, 0, 0);
    return '<div class="drForm" id="drMForm">'
      + '<input id="drMTitle" class="drIn" maxlength="200" placeholder="' + (es ? 'Reuni\u00f3n\u2026' : 'Meeting\u2026') + '">'
      + '<div class="drFRow"><input id="drMAt" class="drIn" type="datetime-local" value="' + localInputValue_(def) + '">'
      + '<select id="drMRep" class="drIn drSel"><option value="">' + (es ? 'Una vez' : 'Once') + '</option><option value="daily">' + (es ? 'Cada d\u00eda' : 'Every day') + '</option><option value="weekly">' + (es ? 'Cada semana' : 'Every week') + '</option></select></div>'
      + '<input id="drMLink" class="drIn" maxlength="400" placeholder="' + (es ? 'Enlace de Zoom u otro (opcional)' : 'Zoom or other link (optional)') + '">'
      + '<textarea id="drMGuests" class="drIn" rows="3" placeholder="' + (es ? 'Invitados \u2014 uno por l\u00ednea: Nombre, tel\u00e9fono' : 'Guests \u2014 one per line: Name, phone') + '"></textarea>'
      + '<div class="drBkRow"><button class="drGhost" onclick="window.DocBReminders._fromPhone()">\ud83d\udcc7 ' + (es ? 'DE MI TEL\u00c9FONO' : 'FROM MY PHONE') + '</button>'
      + '<button class="drGhost" onclick="window.DocBReminders._pickGuest()">\ud83c\udfe0 ' + (es ? 'DE ESTA CASA' : 'FROM THIS HOUSE') + '</button></div>'
      + (bookOpen ? bookHtml_() : '')
      + '<div class="drFRow"><button class="drBtn" onclick="window.DocBReminders._submitMeeting()">' + (es ? '\ud83d\udcc5 Crear' : '\ud83d\udcc5 Create') + '</button>'
      + '<button class="drGhost" onclick="window.DocBReminders._toggleMeetingForm()">' + (es ? 'Cancelar' : 'Cancel') + '</button></div>'
      + '</div>';
  }
  function submitMeeting_() {
    var es = (lang() === 'es');
    var tEl = document.getElementById('drMTitle'), aEl = document.getElementById('drMAt'), rEl = document.getElementById('drMRep'), lEl = document.getElementById('drMLink'), gEl = document.getElementById('drMGuests');
    if (!tEl || !aEl) { return; }
    var title = String(tEl.value || '').replace(/^\s+|\s+$/g, '');
    var at = new Date(aEl.value);
    if (!title) { toast_(es ? 'Ponle nombre a la reuni\u00f3n.' : 'Give the meeting a name.'); return; }
    if (isNaN(at.getTime())) { toast_(es ? 'Elige una hora v\u00e1lida.' : 'Pick a valid time.'); return; }
    var guests = [], lines = String(gEl ? gEl.value : '').split(/\n+/);
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i].replace(/^\s+|\s+$/g, ''); if (!ln) { continue; }
      var parts = ln.split(/\s*,\s*/);
      var name = parts[0] || '', phone = '';
      for (var j = 1; j < parts.length; j++) { if (/\d{7,}/.test(parts[j].replace(/\D/g, ''))) { phone = parts[j]; } }
      if (!phone && /\d{7,}/.test(name.replace(/\D/g, ''))) { phone = name; name = ''; }
      guests.push({ name: name, phone: phone });
    }
    mtgCreate_({ title: title, startAt: at.getTime(), recurrence: rEl ? rEl.value : '', link: lEl ? String(lEl.value || '').replace(/^\s+|\s+$/g, '') : '', room: (document.title || '').substring(0, 80), guests: guests })
      .then(function (id) {
        if (id) { toast_('\ud83d\udcc5 ' + (es ? 'Reuni\u00f3n creada: ' : 'Meeting set: ') + at.toLocaleString()); mtgFormOpen = false; renderDrawer(); }
        else { toast_(es ? 'No se pudo crear la reuni\u00f3n \u2014 revisa la conexi\u00f3n e intenta de nuevo.' : 'Couldn\u2019t create the meeting \u2014 check your connection and try again.'); }
      });
  }
  function mtgItemHtml_(m) {
    var es = (lang() === 'es');
    var next = mtgNext_(m), when = isNaN(next) ? '' : new Date(next).toLocaleString();
    var open = (openMtg === m.id);
    var who = m.isOwner ? T({ en: 'You host', es: 'T\u00fa convocas' }) : ((es ? 'Convoca ' : 'Hosted by ') + esc(m.ownerName || '?'));
    var h = '<div class="drItem' + (m.status === 'cancelled' || m.myStatus === 'out' ? ' drDone' : '') + '" id="drMt_' + m.id + '">'
      + '<p class="drIMsg" style="cursor:pointer;" onclick="window.DocBReminders._unfold(\'' + m.id + '\')">\ud83d\udcc5 ' + esc(m.title) + (m.recurrence ? '<span class="drSeries">' + (m.recurrence === 'daily' ? T({ en: 'DAILY', es: 'DIARIO' }) : T({ en: 'WEEKLY', es: 'SEMANAL' })) + '</span>' : '') + '</p>'
      + '<p class="drIWhen">' + when + ' \u00b7 ' + who + (m.status === 'cancelled' ? ' \u00b7 ' + T({ en: 'cancelled', es: 'cancelada' }) : '') + (m.myStatus === 'out' ? ' \u00b7 ' + T({ en: 'you bowed out', es: 'te retiraste' }) : '') + '</p>';
    if (open) { /* the choices unfold; they do not crowd */
      var gl = mtgGuestLine_(m);
      if (gl) { h += '<p class="drIWhen">' + esc(gl) + '</p>'; }
      h += '<div class="drFRow" style="margin-top:6px;">';
      if (m.link && m.status !== 'cancelled') { h += '<a class="drIBtn" href="' + esc(m.link) + '" target="_blank" rel="noopener">' + T({ en: 'Join \u2192', es: 'Entrar \u2192' }) + '</a>'; }
      if (m.isOwner && m.status !== 'cancelled') {
        h += '<button class="drIBtn" onclick="window.DocBReminders._resched(\'' + m.id + '\')">' + T({ en: 'Reschedule', es: 'Reprogramar' }) + '</button>'
          + '<button class="drIBtn" onclick="window.DocBReminders._cancelMtg(\'' + m.id + '\')">' + T({ en: 'Cancel meeting', es: 'Cancelar reuni\u00f3n' }) + '</button>';
      } else if (!m.isOwner && m.myStatus === 'invited' && m.status !== 'cancelled') {
        h += '<button class="drIBtn" onclick="window.DocBReminders._bowOut(\'' + m.id + '\')">' + T({ en: 'Can\u2019t make it', es: 'No podr\u00e9 ir' }) + '</button>';
      }
      h += '</div>';
      if (reschedMtg === m.id) {
        var cur = isNaN(next) ? new Date() : new Date(next);
        h += '<div class="drFRow" style="margin-top:8px;"><input id="drRs_' + m.id + '" class="drIn" type="datetime-local" value="' + localInputValue_(cur) + '">'
          + '<button class="drBtn" onclick="window.DocBReminders._reschedSave(\'' + m.id + '\')">' + T({ en: 'Save', es: 'Guardar' }) + '</button></div>';
      }
    }
    return h + '</div>';
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
      + '.drBkRow{display:flex;gap:8px;margin:6px 0 8px;flex-wrap:wrap;}'
      + '.drBk{margin:4px 0 10px;padding:8px;border:1px solid rgba(200,168,75,.35);border-radius:10px;background:rgba(240,230,204,.03);max-height:300px;overflow-y:auto;-webkit-overflow-scrolling:touch;}'
      + '.drBkIt{display:flex;align-items:center;gap:8px;padding:8px 6px;border-bottom:1px solid rgba(200,168,75,.15);}'
      + '.drBkName{flex:1;min-width:0;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:20px;color:#f0e6cc;cursor:pointer;line-height:1.2;}'
      + '.drBkName small{display:block;font-size:14px;color:rgba(240,230,204,.55);}'
      + '.drBkGap{font-family:Cinzel,serif;font-size:10px;letter-spacing:.1em;color:#e0a86a;border:1px solid rgba(224,168,106,.5);border-radius:999px;padding:2px 7px;white-space:nowrap;}'
      + '.drBkPen{background:none;border:1px solid rgba(200,168,75,.45);color:#c8a84b;border-radius:8px;font-size:14px;padding:6px 9px;cursor:pointer;min-height:36px;}'
      + '.drBkEdit{padding:6px 6px 10px;border-bottom:1px solid rgba(200,168,75,.15);}'
      + '.drBkEdit .drIn{margin:4px 0;font-size:16px;padding:8px 10px;}'
      + '#drPeople{position:fixed;top:0;left:0;right:0;bottom:0;z-index:9500;background:rgba(4,6,8,.86);display:none;align-items:center;justify-content:center;padding:16px 10px 96px;box-sizing:border-box;}'
      + '#drPeople.on{display:flex;}'
      + '.drPPanel{width:100%;max-width:720px;max-height:100%;display:flex;flex-direction:column;background:linear-gradient(180deg,#100c07 0%,#070809 100%);border:1px solid rgba(200,168,75,.55);border-radius:18px;box-shadow:0 18px 60px rgba(0,0,0,.7),0 0 30px rgba(200,168,75,.12);}'
      + '.drPHead{display:flex;align-items:center;gap:12px;padding:16px 18px 10px;}'
      + '.drPCmd{flex:1;min-width:0;font-family:Cinzel,serif;font-size:26px;letter-spacing:.08em;color:#ffd75e;text-shadow:0 0 16px rgba(200,168,75,.35);}'
      + '.drPClose{font-size:26px;line-height:1;color:#c8a84b;background:transparent;border:none;cursor:pointer;padding:4px 8px;}'
      + '.drPBody{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:6px 18px 22px;}'
      + '.drPQ{width:100%;box-sizing:border-box;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:26px;padding:12px 14px;background:rgba(240,230,204,.05);border:1.5px solid rgba(200,168,75,.5);border-radius:12px;color:#f0e6cc;margin:0 0 12px;}'
      + '.drPRow{display:flex;align-items:center;gap:10px;padding:10px 6px;border-bottom:1px solid rgba(200,168,75,.15);}'
      + '.drPNm{flex:1;min-width:0;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:24px;line-height:1.2;color:#f0e6cc;} .drPNm small{display:block;font-size:16px;color:rgba(240,230,204,.55);}'
      + '.drPAdd{flex:0 0 auto;min-width:52px;min-height:46px;font-family:Cinzel,serif;font-size:22px;color:#040608;background:#c8a84b;border:none;border-radius:10px;cursor:pointer;} .drPAdd.in{background:transparent;color:#ffd75e;border:1px solid rgba(255,215,94,.6);}'
      + '.drPNote{font-family:\'Cormorant Garamond\',Georgia,serif;font-style:italic;font-size:17px;color:rgba(240,230,204,.55);margin:4px 0 10px;}'
      + '.drBkEmpty{font-family:\'Cormorant Garamond\',Georgia,serif;font-style:italic;font-size:16px;color:rgba(240,230,204,.55);padding:8px 6px;}'
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
    if (item._meeting) { /* v2.5: a meeting rising on everyone's device at once */
      var mm = item._meeting;
      v.innerHTML = '<button aria-label="Close" onclick="window.DocBReminders._later(\'' + item.id + '\')" style="position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(200,168,75,.6);font-size:20px;line-height:1;cursor:pointer;padding:4px;">\u00d7</button>'
        + '<p class="drKick">' + (mm.isOwner ? T({ en: 'YOUR MEETING', es: 'TU REUNI\u00d3N' }) : (esc(mm.ownerName || '') + ' \u00b7 ' + T({ en: 'A MEETING', es: 'UNA REUNI\u00d3N' }))) + '</p>'
        + '<p class="drMsg">\ud83d\udcc5 ' + esc(mm.title) + '</p>'
        + '<p class="drRoom">' + new Date(mtgNext_(mm)).toLocaleString() + (mtgGuestLine_(mm) ? ' \u00b7 ' + esc(mtgGuestLine_(mm)) : '') + '</p>'
        + '<div class="drRow">'
        + (mm.link ? '<a class="drBtn" href="' + esc(mm.link) + '" target="_blank" rel="noopener" onclick="window.DocBReminders._later(\'' + item.id + '\')">' + T({ en: 'Join \u2192', es: 'Entrar \u2192' }) + '</a>' : '')
        + '<button class="drGhost" onclick="window.DocBReminders._later(\'' + item.id + '\')">' + T({ en: 'Later', es: 'Despu\u00e9s' }) + '</button>'
        + ((!mm.isOwner && mm.myStatus === 'invited') ? '<button class="drGhost" onclick="window.DocBReminders._bowOut(\'' + mm.id + '\');window.DocBReminders._later(\'' + item.id + '\')">' + T({ en: 'Can\u2019t make it', es: 'No podr\u00e9 ir' }) + '</button>' : '')
        + '</div>';
      v.className = 'on';
      if (veilTimer) { clearTimeout(veilTimer); }
      veilTimer = setTimeout(function () { advanceVeil(item.id); }, 20000); /* a meeting lingers a little longer than a note */
      return;
    }
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
    /* v2.5: meetings first -- the family's table sits above the personal list */
    var live = [], past = [];
    for (var mi = 0; mi < meetings.length; mi++) { (mtgLive_(meetings[mi]) ? live : past).push(meetings[mi]); }
    live.sort(function (a, b) { return mtgNext_(a) - mtgNext_(b); });
    h += mtgFormOpen ? mtgFormHtml_() : '<button class="drNew" onclick="window.DocBReminders._toggleMeetingForm()">\uff0b ' + T({ en: 'NEW MEETING', es: 'NUEVA REUNI\u00d3N' }) + '</button> ';
    if (live.length || past.length) {
      h += '<p class="drTitle" style="margin-top:8px;">' + T({ en: 'MEETINGS', es: 'REUNIONES' }) + '</p>';
      for (var li = 0; li < live.length; li++) { h += mtgItemHtml_(live[li]); }
      for (var pi = 0; pi < past.length && pi < 5; pi++) { h += mtgItemHtml_(past[pi]); }
      h += '<p class="drTitle" style="margin-top:12px;">' + T({ en: 'REMINDERS', es: 'RECORDATORIOS' }) + '</p>';
    }
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
    for (var mi = 0; mi < meetings.length; mi++) { var mx = meetings[mi]; var nx = mtgNext_(mx); if (mtgLive_(mx) && !isNaN(nx) && nx <= nowMs() && nx > nowMs() - 3600000) { due++; } } /* v2.5: a meeting that is happening now counts */
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
  /* v2.9 THE QUIET TAB (Bench 34, 9/18/26; re-cut on v2.8 after the gate caught a
     v2.6 collision cut on a stale v2.5): every open Doc B tab checked in every 45s,
     so a dozen tabs opened together knocked on the script server a dozen times in
     the same second, once a minute, and a build landing in that burst was turned
     away with no answer. Now a tab you are not looking at checks in every 5
     minutes; the one you are looking at keeps its 45s; switching to a tab refreshes
     it at once (the visibilitychange listener below). Nothing else moved. */
  var _lastRefresh = 0;
  function refresh() {
    try { if (document.hidden && (Date.now() - _lastRefresh) < 300000) { return; } } catch (eH) {}
    _lastRefresh = Date.now();
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
    /* v2.5: the meetings ride a second, independent fetch -- a failure here never blanks the reminders */
    post_({ action: 'pwsMeetingList', requestingMemberId: mid })
      .then(function (d) {
        if (!d || !d.success || !d.meetings) { return; }
        meetings = d.meetings;
        var t = nowMs();
        for (var i = 0; i < meetings.length; i++) {
          var m = meetings[i]; if (!mtgLive_(m)) { continue; }
          var nx = mtgNext_(m); if (isNaN(nx) || nx > t) { continue; }
          var occ = m.id + '@' + nx;
          if (SEEN_THIS_LOAD[occ]) { continue; }
          SEEN_THIS_LOAD[occ] = true;
          queueVeil({ id: occ, _meeting: m });
        }
        renderFab();
        if (drawerOpen) { renderDrawer(); }
      })
      ['catch'](function () {});
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
    /* v2.6 THE KEYED DRAWER: a weapon key on the address opens the right form */
    try {
      var kh = String(window.location.hash || ''), km = kh.match(/weapon=(reminders|meetings)/i);
      if (km) {
        var key = km[1].toLowerCase();
        formOpen = (key === 'reminders'); mtgFormOpen = (key === 'meetings'); drawerOpen = true;
        renderDrawer();
        try { window.history.replaceState({}, '', window.location.pathname + window.location.search); } catch (eH) {}
        setTimeout(function () { try { var d = document.getElementById('drDrawer'); if (d && d.scrollIntoView) { d.scrollIntoView({ block: 'start' }); } } catch (eS) {} }, 200);
      }
    } catch (eK) {}
    setInterval(refresh, 45000); /* a touch gentler than v1.x's 30s, now that each tick is a real network call */
    try {
      document.addEventListener('visibilitychange', function () { if (!document.hidden) { _lastRefresh = 0; refresh(); } }); /* v2.9: a tab coming back always refreshes */
      window.addEventListener('focus', refresh);
    } catch (e) {}
  }

  window.DocBReminders = {
    add: add,
    refresh: refresh,
    open: function () { drawerOpen = true; renderDrawer(); },
    openReminder: function () { drawerOpen = true; formOpen = true; mtgFormOpen = false; renderDrawer(); },   /* v2.6: a page may land the member on the form */
    /* v2.7 THE HOUSE BOOK */
    pickFromPhone: phonePick_,
    /* v2.8 THE PEOPLE HAND */
    pickPerson: function (cb, cmd) { pplOpen_(cb, cmd); },
    openBook: function () { pplOpen_(null); },
    _pickGuest: function () { pplOpen_(function (c) { guestsAppend_([c]); }, (lang() === 'es') ? '\u00bfA qui\u00e9n invitas?' : 'Who is invited?'); },
    houseBook: function (cb) { bookLoad_(cb); },
    addToHouse: function (c) { bookAdd_(c, true); },
    _fromPhone: function () { phonePick_(function (list) { if (list.length) { guestsAppend_(list); if (bookOpen) { renderDrawer(); } } }); },
    _toggleBook: function () { bookOpen = !bookOpen; renderDrawer(); if (bookOpen && !bookLoaded) { bookLoad_(function () { renderDrawer(); }); } },
    _bookQ: function (v) { bookQ = String(v || ''); var box = document.getElementById('drBk'); if (!box) { return; } var wrap = document.createElement('div'); wrap.innerHTML = bookHtml_(); box.parentNode.replaceChild(wrap.firstChild, box); var q = document.getElementById('drBkQ'); if (q) { q.focus(); try { q.setSelectionRange(q.value.length, q.value.length); } catch (eS) {} } },
    _bookPick: function (k) { var c = bookFind_(k); if (c) { guestsAppend_([c]); toast_(T({ en: '\u2713 ' + c.name, es: '\u2713 ' + c.name })); } },
    _bookEdit: function (k) { bookEdit = k || ''; renderDrawer(); },
    _bookSave: function (k) {
      var c = bookFind_(k); if (!c) { bookEdit = ''; renderDrawer(); return; }
      var p = document.getElementById('drBkP'), e = document.getElementById('drBkE'), l = document.getElementById('drBkL');
      bookAdd_({ name: c.name, phone: p ? String(p.value || '').replace(/^\s+|\s+$/g, '') : '', email: e ? String(e.value || '').replace(/^\s+|\s+$/g, '') : '', extraLink: l ? String(l.value || '').replace(/^\s+|\s+$/g, '') : '' });
      bookEdit = ''; renderDrawer(); toast_(T({ en: '\u2713 ' + c.name + ' \u2014 filled in.', es: '\u2713 ' + c.name + ' \u2014 completado.' }));
    },
    openMeeting: function () { drawerOpen = true; mtgFormOpen = true; formOpen = false; renderDrawer(); },
    promptClause: promptClause, /* v2.4: rooms append this to their systemPrompt */
    harvest: harvest,           /* v2.4: rooms pass Doc B's reply through this */
    _close: function () { drawerOpen = false; formOpen = false; renderDrawer(); },
    _toggleForm: function () { formOpen = !formOpen; renderDrawer(); },
    _submitForm: submitForm_,
    createMeeting: mtgCreate_, /* v2.5: rooms (mediation, an activity with the Armory key) may call this directly */
    _toggleMeetingForm: function () { mtgFormOpen = !mtgFormOpen; renderDrawer(); },
    _submitMeeting: submitMeeting_,
    _unfold: function (id) { openMtg = (openMtg === id) ? '' : id; reschedMtg = ''; renderDrawer(); },
    _resched: function (id) { reschedMtg = (reschedMtg === id) ? '' : id; renderDrawer(); },
    _reschedSave: function (id) {
      var el = document.getElementById('drRs_' + id); var at = el ? new Date(el.value) : null;
      if (!at || isNaN(at.getTime())) { toast_(T({ en: 'Pick a valid time.', es: 'Elige una hora v\u00e1lida.' })); return; }
      mtgAct_('pwsMeetingReschedule', { id: id, startAt: at.getTime() }).then(function (ok) { toast_(ok ? T({ en: '\ud83d\udcc5 Rescheduled.', es: '\ud83d\udcc5 Reprogramada.' }) : T({ en: 'Couldn\u2019t reschedule.', es: 'No se pudo reprogramar.' })); reschedMtg = ''; });
    },
    _cancelMtg: function (id) { mtgAct_('pwsMeetingCancel', { id: id }).then(function (ok) { toast_(ok ? T({ en: 'Meeting cancelled.', es: 'Reuni\u00f3n cancelada.' }) : T({ en: 'Couldn\u2019t cancel.', es: 'No se pudo cancelar.' })); }); },
    _bowOut: function (id) { mtgAct_('pwsMeetingBowOut', { id: id }).then(function (ok) { toast_(ok ? T({ en: 'You\u2019re out \u2014 no reason needed.', es: 'Te retiraste \u2014 sin explicaciones.' }) : T({ en: 'Couldn\u2019t bow out.', es: 'No se pudo retirar.' })); }); }, /* v2.1: lets a room's own Accessories tile open the same drawer the corner badge does */
    _done: function (id) { markDone_(id); advanceVeil(id); glow(id); renderDrawer(); },
    _later: function (id) { advanceVeil(id); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();