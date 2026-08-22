/* 4 LAWS ACADEMY - pws-talent-v88.js - THE FORGE ON THE STAGE
 * v88 (Bench 25, 8/22/26): THE ONE ROOM LAW reaches the wall (founder's
 * ruling: "anywhere with a talk-to-Doc-B needs the same advanced tool —
 * the bucket with program, talk to Bruno, and the accessories").
 * (1) THE RECOGNITION doctrine enters every tool-overlay chat prompt:
 * when the member sends a photo or document, Doc B NAMES what arrived
 * warmly and specifically ("Ah — I see you have an anniversary coming"),
 * gives the facts that matter, and ends by asking what they want the
 * tool to DO for them — with endings fitted to what he saw. The camera
 * and screenshot-paste already standing in the overlay ARE the mouth;
 * this gives the mouth its brain. (2) ⚒ FORGE THE TOOL stands
 * front-of-house in every tool overlay: Bruno wonders (the chin rub),
 * Ace DELIVERS THE WORK from the session's own conversation — the
 * complete letter, the three gift ideas with where to get them, the
 * drafted request, the dated plan — parsed (TOOL: <name>), PINNED as a
 * gold card at the top of the feed, and PERSISTED as tool.forged on the
 * confirmedTools entry (the contacts/herd precedent: pwsToolsPayload
 * serializes whole, survives reload on the pwsSaveTools wire).
 * Relaunch the tool tomorrow: the work is standing — "next time, just
 * go" finally means it. (3) The Sound Shelf learns 'forge'. Twin of
 * /todos v54 THE ONE ROOM — the fleet speaks one dialect. Carries all
 * of v87.2 (legible ACCESSORIES door, the Range, the medal wire).
 * DEPLOY: new filename pws-talent-v88.js + shell pointer flip v115.16
 * — upload the JS FIRST, confirm it serves, then paste the shell.
 * v87.2 (Bench 25, 8/22/26): the founder's launch verdict ("there's no
 * bucket... this doesn't seem much different") answered the same hour.
 * (1) THE LEGIBLE DOOR: the toolbox emoji rendered as an unreadable red
 * blob on felt — gone; the door now reads ACCESSORIES ▾ / ACCESORIOS ▾
 * in gold Cinzel, centered, letter-spaced. (2) THE RANGE v1 — the fun
 * part arrives front-of-house in every tool overlay (Armory Brief
 * Phase 3, first cut): a 🎯 RANGE panel above the accessories door.
 * Targets hang as paper cards (name + bounty amount); TAP = THE SHOT —
 * gunshot from the Sound Shelf (sounds/gunshot.wav, silent till the
 * WAV lands), the card jerks, spins and FALLS, marked dead, persisted.
 * Fallen targets lie struck-through below with a standing/down count.
 * + ADD row hangs a new target by hand ("name $amount" — trailing
 * amount parsed). Range-clear moment: last target down -> the victory
 * line ("Range clear. Nothing owes you fear this month.") + medal
 * sound + Find ME done-chime. PERSISTENCE BY THE CONTACTS PRECEDENT
 * (BD's law from v87.1 honored at birth): herd lives as tool.herd on
 * the confirmedTools entry — pwsToolsPayload() serializes the array
 * whole, so the herd survives reload on the same pwsSaveTools wire
 * contacts ride. Window launches (_isWindowLaunch) show no range —
 * ranges belong to tools. NEXT (Phase 3B): the /todos saw feeds sawed
 * bills onto this herd automatically.
 * v87.1 (Bench 25, 8/22/26): BD GATE CATCH, honored — the v87 "honest
 * exception" leaned on tool._presel, an in-memory flag never serialized
 * by pwsToolsPayload(), so it died on reload and the door started
 * collapsed for the exact "next time, just go" member it was written
 * for. THE DOOR REMEMBERS now: accOpen is computed from the tool's
 * ACTUAL saved evidence — savedLink (music, backend-persisted),
 * tool.links, tool.contacts (both ride pwsSaveTools), and _usePB (the
 * timer's stored personal best) — with the session _presel flags kept
 * only as a same-session bonus (they cover timer/reminders/cash in the
 * minutes right after configuring, before evidence lands). Fields not
 * reachable here (reminders/cash on the equip: row) fail toward CLOSED,
 * which costs one tap, never a lie. Same filename — v87 never reached
 * the CDN; shell v115.15 pairing unchanged.
 * v87 (Bench 25, 8/22/26): the founder's field verdict on the tool
 * overlay ("these are not tools, these are accessories — a Swiss watch
 * with a bunch of functions... I don't need this on launch") becomes
 * law, per THE ARMORY FOUNDING BRIEF v1.3, Build Phase 2. (1) THE ONE
 * DOOR: the seven-button launcher grid (Music Room / Timer / Games /
 * Reminders / Links / Cash / Contacts) folds behind ONE outlined
 * button — "🧰 ACCESSORIES / ACCESORIOS" — collapsed by default so
 * LAUNCH opens the WORK (the frame, Doc B, the brain), not the watch
 * functions. Honest exception: if the member preselected accessories
 * when configuring (any _presel flag) the door starts OPEN — they
 * armed those, show them armed. ▶ Play (the tool's own saved music)
 * and DOC ASSIST (the brain) stay front-of-house: one is armed, the
 * other is not an accessory. Every button keeps its exact wiring —
 * this cut moves furniture, it rewires nothing. (2) THE SOUND SHELF
 * arrives on the wall (same placeholder law as /todos v52.1): guarded
 * pwsPlaySound(name) -> assets repo sounds/<name>.wav, SILENT if the
 * file is absent; published as window.pwsPlaySound for every future
 * weapon. Wired now: 'medal' fires inside Mark Done beside the Find ME
 * done-chime — the ding awaits its medal.wav with zero further code.
 * DEPLOY: new filename pws-talent-v87.js + shell pointer flip
 * (v115.15) — cache-proof.
 * Lineage: v86 THE SLEEPING SHELF
/* 4 LAWS ACADEMY - pws-talent-v86.js - THE SLEEPING SHELF
 * v86 (Bench 23, 8/21/26): the permanent sleeping shelf from /todos
 * (key '4laws-sleeping') was invisible to the PWS Talent brain — items
 * the founder put to sleep on /todos still appeared in MY DAY here,
 * defeating the purpose of sleeping them. Root cause: this brain only
 * knew the OLD daily-reset skip key ('4laws-skipped-YYYY-MM-DD'),
 * while /todos v50.10 moved to a permanent undated key. Fix: _isSkipped
 * now checks BOTH lists. One function, six render paths, all honor
 * sleep instantly. Per-device (both pages read the same browser
 * storage), same as the /todos design.
 * Lineage: v85 THE AWAKENED MIND
/* 4 LAWS ACADEMY - pws-talent-v85.js - THE AWAKENED MIND (Bench 17/C, 8/4/26)
 * v85: THE LENS — the untrapped doctrine, the four shadows named gently,
 * name-the-need, Ace's summons, the crisis floor — injected at the ONE
 * doorway every Doc B conversation ships through (post(): payload.systemPrompt),
 * so all fourteen prompt builders inherit it, and every future one will too.
 * Coach specialists live elsewhere, deliberately untouched.
 * Lineage: v84 THE NERVE ENDINGS
 * v84: guarded one-line wires to the Find ME layer (page runs identically
 * when find-me.js is absent): done-chime on check-in and Mark Done; the
 * Gauntlet hums while Doc B cogitates in the overlay, quiets when the
 * answer lands. BD10 hardening: every wire guards the METHOD, not just the object - version-skew between module and wires now no-ops instead of detonating. Lineage: v83 THE HONEST CLOCK -
 * Built on the LIVE v105-lineage inline script (383KB), NOT the stale repo
 * v82 snapshot (36KB behind). Live base had already cured UTC dates,
 * station payload leaks, and URLSearchParams. Three live bugs remained:
 *  1) '99:99' exile of untimed items -> pwsNormalizeSchedule (positions kept).
 *  2) No mobile reorder (HTML5 drag never fires on touch) -> arrow buttons,
 *     speaking the drag's own dialect: _manualOrder = true.
 *  3) Cascade: windows with no link info credited nothing on DONE ->
 *     fourth-tier exact-label credit; a UNIQUE match self-heals the cid.
 * Completes the CDN externalization staged two weeks ago: /pws becomes a
 * thin shell (v110) pointing here. */

(function() {
  'use strict';
  // pws_TALENT v105 -- AUTO-LINK + THE FOURTH LEAK. (1) A FOURTH pwsSaveStation leak was hiding in pwsSaveModify: it posts action:action from a map, so no grep for the literal 'pwsSaveStation' found it -- not Bench 4's, not Bug Detector 8's. Every MODIFY on Contributions re-armed the reset that erases the dots. Now uses pwsStationPayload(). Lesson: audit by DATA SHAPE, not by call-site string. (2) AUTO-LINK: the modify AI was only ever shown labels and times, so it could not attach contributionCid even in principle, and a member whose windows were planned in a different conversation from their Contributions could never earn credit without linking every window by hand. The Registry is now passed to Doc B numbered, and Doc B returns servesIndex; pwsResolveServesIndex maps index -> cid deterministically. AI proposes, code writes the fact. Out-of-range or missing index fails safe as no link, and an existing hand-made link is never overwritten. v104.3 base -- THE DOTS STOP DISAPPEARING. Root cause: seven pwsSaveStation call sites, only two carried _lastResetDate, and the boot daily-reset keys off exactly that field. Tapping a Contributions dot by hand saved the dots WITHOUT the stamp; the next load read it empty, concluded a new day had started, and wiped every dot to not-started -- so every hand-set dot armed the reset that erased it. The cascade (pwsBehavioralCascade, DONE -> crushing) was never broken; it just faithfully wrote back the empty stamp the toggle left behind. Fix: pwsStationPayload(), one canonical builder every save path uses, mirroring pwsToolsPayload. Plus the boot reset now treats a MISSING stamp as corruption rather than a new day -- it stamps and resets nothing, so no member loses a day to this on first load. v104.2 base -- THE DOOR LOOKS LIKE A DOOR. The Entertainment Center row in the EC menu was wearing pws-links-save-btn, so it rendered as a second filled gold block directly under SAVE -- two gold buttons, no way to tell a save from a navigation, and it clipped at the panel edge. Now outlined rather than filled, cream on felt, 17px, full width, with a post-layout scroll so the last row is never cut off. Font family unquoted in cssText per the standing watch item. v104.1 base -- TWO MORE DEAD BUTTONS FOUND AND CLOSED. Same v83 residue as the Self Encouragement card: the TWS tool rail's Reminders entry was function(){ void 0; } -- a SECOND silent reminder, now on the real Twilio wire (pwsToggleAlarmsMenu). The rail's music link still called pwsOpenDeparture; it now opens the inline EC menu like the launcher. Mastery Check-In parsed its stage and project id then swallowed the tap; it is genuinely unbuilt, so it now SAYS so instead of pretending. House rule from today: a button that does nothing silently is a lie -- either wire it or have it speak. v104 base -- THE DEAD CARD DIES. SELF ENCOURAGEMENT TIME sat under the Entertainment Center tiles looking alive with a LAUNCH button whose two click handlers were literally function(){ void 0; } -- the residue of v83 stripping pwsOpenSelfEncouragement for the port to Trust and leaving the card behind. Card, orphaned overlay (nothing opened it) and the whole quote/panel subsystem removed together; the working code is preserved intact in SELF_ENCOURAGEMENT_for_TRUST.js so the Trust build starts from something proven. Reclaims headroom in a file that had ~2.5KB left. v103 base -- THE FAKE REMINDER DIES. The launcher's Reminders button was still the v83-era stopgap (two prompt() boxes, browser Notification, setTimeout) sitting three inches from the wall's real Twilio alarms -- two reminder systems in one overlay, and the prettier one silently failed the moment the tab closed. Now both doors use one wire: pwsToggleAlarmsMenu posts pwsSaveReminder into the Reminders sheet, fired by the five-minute server heartbeat, delivered by Twilio (honest stub queue until live). Time + message + phone, phone remembered after once, alarms listed inline, all persisted to cfg.reminders on the activity's equip: row. pwsToggleReminderPanel deleted outright. v102 base -- THE MENU THAT KEEPS YOU: the launcher's three ejecting buttons stop throwing the member out. Music and Games now open pwsToggleECMenu() in the feed -- the links saved for THIS activity, each with OPEN straight to that URL in a new tab, an inline add form, and the Entertainment Center as the LAST row (a door you choose, never one you fall through). Play opens its saved link directly instead of a departure screen. Reads/writes cfg.ecLinks on the activity's equip: row -- same store as the wall and /todos, so a track added here appears on both. Departure screens now reachable only by deliberate tap. v101 base -- ENTERTAINMENT ON THE WALL: the equipping wall gains a fifth panel reading cfg.ecLinks -- the same store todos_v33's inline EC panel already writes ({url,label,icon,category}; music/games/news/other). Per-track OPEN goes straight to that link in a new tab; no departure screen, the member never leaves the window. Add/remove ride the existing funnel (pwsEquipSaveCfg_ -> pwsSaveEquip), so a track saved on the stage stands in the workshop and vice versa -- one equip: row, now five panels. v100.1 base -- MY FAVORITE DAY: the My Plan section label becomes "My Favorite Day" / "Mi Dia Favorito", carrying pws-accordion-section alongside pws-day-section-label so it wears the same Cinzel 22/700 white as My Projects and My Contributions (the accordion rule sits later in the sheet and wins on font, weight and color; the day-label rule keeps the gold divider beneath it), centered. NO stylesheet change -- pws-talent.css untouched, no jsDelivr purge needed. The name is the psychology: this page is a game, and the question it asks is how good a day can I build. v100 base -- STORAGE SWAP (Director's Ruling 7/25, per-activity rows): equipment now lives on its own equip:<name> PWS row, never in the one window_config cell. One write door (pwsEquipSaveCfg_ -> pwsSaveEquip), one read accessor (pwsEquipMerge_: equip wins, legacy fills gaps, migrated = the row exists, no flags). Reads ride pwsGetEquipAll, which returns the new store and the legacy blob in one round trip so read-through migration costs no extra fetch. All 3 write sites and 2 read sites converted; pwsSaveLinkEntry branch 2 (window launch) routed through the funnel, branches 1 (TWS) and 3 (tool.links) deliberately untouched -- room rebuild's business. NO UI CHANGES: storage only. Backend PWS.gs Build 20 @ Main 226. v99.2 base -- invocation fix: deep-link watch now starts at script parse (v99/v99.1 mounted it in pwsRenderAll, which boot never calls -- proven live); fire-once guard added so mid-session renders can't re-open a closed overlay. v99.1: retry patience fix (proven live 7/24: walk sound, cards render past the old 6s window on cold loads; now 60 tries x 1s). v99: FORGE->ACTIVATE deep link (?activate=<obligation> auto-opens that tool's activation overlay; DOM-matched, retried, silent no-op on unknown names). v98 base -- EQUIPPING STANDARD WALL (Sprint #2 clone pass A, 7/24): every My Plan drawer now shows the window's equipped wall -- On the Shelf (files: tap opens from Drive, + Add File racks via pwsUploadFile @ Main 223, X unracks + pwsDeleteFile, >10MB link-only fallback), Links (+ add, in-place open), Contacts (tel: tap-to-call), Alarms (SMS via pwsSaveReminder, today-only display, honest one-shot line) -- reading the SAME window_config keys todos_v31 writes (files/links/contacts/reminders/reminderPhone): one shape, two doors, zero migration. Drawer open-state survives equip re-renders (pwsEquipRerender_). v97 base -- THE UNIFICATION: the note-drawer law selector becomes ONE picker, one question -- 'What does this serve?' Registry contributions first (cid -> dot crush + Respect/Responsibility split), the four bare laws beneath (bar credit only), mint door at the bottom (pwsAppendStation via Games URL, idempotent). Precedence made physical: choosing a contribution deletes lawTag and vice versa. Mint guard: picker resting on __mint__ assigns nothing until Create succeeds. data-law-select retired; data-serves-select + pwsServesMint born.

  // v95: the member's calendar date, from their local clock. toISOString is
  // UTC -- after 8 PM EDT it names TOMORROW, so evening check-ins were logged
  // to a day that had not happened yet and vanished from today's restore.
  // -- Bench 17 THE HONEST CLOCK: timed items flow chronologically through
  // the timed positions; untimed items KEEP the exact positions the member
  // gave them - no more '99:99' exile of the morning ritual.
  function pwsNormalizeSchedule(fs) {
    if (!fs || !fs.length) return;
    var timed = [];
    for (var i = 0; i < fs.length; i++) {
      var tv = fs[i].time || fs[i].derivedTime || '';
      if (tv) timed.push({ t: parseInt(String(tv).replace(':', ''), 10) || 0, s: fs[i] });
    }
    timed.sort(function(a, b) { return a.t - b.t; });
    var ti = 0;
    for (var k = 0; k < fs.length; k++) {
      var hv = fs[k].time || fs[k].derivedTime || '';
      if (hv) fs[k] = timed[ti++].s;
    }
  }

  function pwsLocalDate() {
    var d = new Date();
    var mo = d.getMonth() + 1;
    var da = d.getDate();
    return d.getFullYear() + '-' + (mo < 10 ? '0' + mo : mo) + '-' + (da < 10 ? '0' + da : da);
  }

  var NL = '\n';
  var DEPLOY_URL = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var GAMES_URL  = 'https://script.google.com/macros/s/AKfycbw1usnBC3UWpdkkBLMTPcuTWGKs3Ez_zLxSE-wZOu4WJ04UvpxKzuEPzbdPZ9WCLdX5sw/exec';
  var SESSION_KEY = '4laws-session';
  var MEMBER_KEY  = '4laws-member-id';
  var MODEL       = 'claude-sonnet-4-6';

  var _session  = null;
  var _memberId = null;
  var _lang     = 'en';
  var _obsData        = null;
  var _trustScores    = null;   // Trust Score from generateTrustScore
  var _toolsData      = null;
  var _dayData        = null;
  var _windowConfig   = {};

  // Today's skip list — stored in localStorage, auto-resets on new date
  var _SKIP_KEY = '4laws-skipped-';
  function _todayKey() { return _SKIP_KEY + pwsLocalDate(); }
  function _loadSkipped() {
    try { return JSON.parse(localStorage.getItem(_todayKey()) || '[]'); } catch(e) { return []; }
  }
  function _saveSkipped(arr) {
    try { localStorage.setItem(_todayKey(), JSON.stringify(arr)); } catch(e) {}
  }
  // v86 THE SLEEPING SHELF (Bench 23 port, 8/21/26): /todos' permanent
  // sleep list ('4laws-sleeping') was invisible to this brain -- it only
  // knew the old daily-reset skip key. Now _isSkipped checks BOTH: the
  // daily skip (for single-day hides via the brain's own UI) AND the
  // permanent sleeping shelf (for items the founder put to sleep on
  // /todos). One function change; every filter in this file already
  // calls _isSkipped, so all six render paths honor sleep instantly.
  var _TD_SLEEP_KEY = '4laws-sleeping';
  function _loadSleeping() {
    try { return JSON.parse(localStorage.getItem(_TD_SLEEP_KEY) || '[]'); } catch(e) { return []; }
  }
  function _isSkipped(label) {
    return _loadSkipped().indexOf(label) !== -1 || _loadSleeping().indexOf(label) !== -1;
  }
  function _skipToday(label) {
    var arr = _loadSkipped();
    if (arr.indexOf(label) === -1) arr.push(label);
    _saveSkipped(arr);
  }
  function _unskip(label) {
    _saveSkipped(_loadSkipped().filter(function(l){ return l !== label; }));
  }
  var _adherenceData  = null;
  var _projectData    = null;
  var _unlockTool     = null;
  var _unlockHistory  = [];
  var _unlockMicActive   = false;
  var _unlockRecognizer  = null;
  var _useTool        = null;
  var _useHistory     = [];
  var _useMicActive   = false;
  var _useRecognizer  = null;
  var _timerInterval  = null;
  var _timerStart     = null;
  var _timerSeconds   = 0;
  var _pbKey          = null;
  var _musicSaved     = false;
  var _progShown      = false;   // guards DOC ASSIST question from rendering twice per session
  var _useAwaitingDread   = false; // Mental Filter: waiting for dread/excited answer
  var _useAwaitingReframe = false; // Mental Filter: waiting for reframe answer

  var _useStartTime   = null;
  var _usePB          = null;
  var _linkAsked      = {};
  var _docbHistory = [];

  var PWS_DOCB_LENS = '\n\nTHE LENS \u2014 how you read every problem: people never lack drive; they lack opportunity \u2014 trapped, not broken. ' +
    'Diagnose the trap, never the person: which need is pinched \u2014 Safety (Limits), Possession (Responsibility), Belonging (Respect), Creation (Talent) \u2014 ' +
    'and which direction: starving (their own pattern \u2192 practice, encouragement, tools) or violated (someone crossing in \u2192 lines and protective force). ' +
    'Recurring traps have gentle names, used only to help the member fight something that is not themselves: the Fog (creation starved), the Pile (possession starved \u2014 its weapon is the Chainsaw on /todos), ' +
    'the Cold Shoulder (belonging starved \u2014 most arguments are this in costume; underneath is \'see me\'), the Conqueror (safety violated \u2014 beaten by a drawn line and a closed door, never by pushing harder). ' +
    'Never weaponize a name against the member. Every argument is really an unmet need \u2014 name it and the fight disappears. ' +
    'One missed day is rest, not debt; never streak-shame. Praise in success; encouragement especially in failure. ' +
    'When a member needs a concrete custom tool for a specific trap, you may say: \'This sounds like a job for Ace\' \u2014 the Academy\'s weaponsmith, whose question is \'Show me the trap.\' ' +
    'If real danger, abuse, or crisis appears: drop all of this instantly \u2014 no names, no game \u2014 and be plainly, fully serious.';

  function post(payload) {
    // Bench 17/C: every Doc B mind, one doorway — the lens rides every prompt.
    if (payload && payload.systemPrompt) { payload.systemPrompt = payload.systemPrompt + PWS_DOCB_LENS; }
    if (payload.action === 'cftConvTurn') {
      var body = {
        action:   'handleGamesAI',
        system:   payload.systemPrompt,
        messages: payload.conversationHistory
      };
      return fetch(GAMES_URL, { method: 'POST', body: JSON.stringify(body) })
        .then(function(r) { return r.json(); })
        .then(function(d) {
          var text = (d && d.content && d.content[0] && d.content[0].text) ? d.content[0].text : (d && d.reply) ? d.reply : '';
          return { success: !!text, reply: text };
        });
    }
    return fetch(DEPLOY_URL, { method: 'POST', body: JSON.stringify(payload) })
      .then(function(r) { return r.json(); });
  }

  function escHtml(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function fmtTime(t) { return t || ''; }

  // v89: when the AI modify flow replaces confirmedObs wholesale, carry each
  // existing dot's stable cid onto the new entry with the same text (R4:
  // identity is stable; a rename mints fresh next load, a keep keeps its id).
  function pwsCarryCids(oldArr, newArr) {
    if (!oldArr || !newArr) return newArr;
    newArr.forEach(function(n) {
      if (!n || n.cid || !n.text) return;
      var t = n.text.toString().toLowerCase().trim();
      for (var ci = 0; ci < oldArr.length; ci++) {
        var o = oldArr[ci];
        if (o && o.cid && o.text && o.text.toString().toLowerCase().trim() === t) { n.cid = o.cid; break; }
      }
    });
    return newArr;
  }

  // v105 AUTO-LINK: the AI proposes an INDEX, the code resolves the cid.
  // Why an index and not the cid itself: platform law is that AI proposes
  // and deterministic controls write single facts. Doc B emitting a 30-char
  // cid is a hallucination surface; a small integer is not, and an
  // out-of-range integer fails safe as no link at all. Root cause this
  // closes: the modify AI was only ever shown labels and times, so it could
  // not attach a contributionCid even in principle -- pwsCarrySlotFields
  // existed purely to rescue links the AI would otherwise destroy. A member
  // whose windows were built in a different conversation from their
  // Contributions could never get credit without linking all of them by hand.
  function pwsRegistryPromptBlock() {
    var obs = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs : [];
    if (!obs.length) return '';
    var lines = [];
    for (var i = 0; i < obs.length; i++) {
      if (obs[i] && obs[i].text) lines.push('[' + i + '] ' + obs[i].text);
    }
    if (!lines.length) return '';
    return ' The member\'s Registry of declared contributions, numbered: ' +
      lines.join(' | ') +
      '. For EVERY schedule slot that serves one of these contributions, include a field "servesIndex" set to that number. Use the number only, never invent one, and omit servesIndex entirely when a slot serves none of them. Never output a cid.';
  }

  // Resolves servesIndex -> contributionCid deterministically. Never
  // overwrites a link the member made by hand; an out-of-range or absent
  // index simply leaves the slot unlinked.
  function pwsResolveServesIndex(arr) {
    var obs = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs : [];
    if (!arr || !obs.length) return arr;
    for (var i = 0; i < arr.length; i++) {
      var sl = arr[i];
      if (!sl) continue;
      var idx = sl.servesIndex;
      if (sl.servesIndex !== undefined) { try { delete sl.servesIndex; } catch (e) { sl.servesIndex = undefined; } }
      if (sl.contributionCid) continue;
      var n = parseInt(idx, 10);
      if (isNaN(n) || n < 0 || n >= obs.length) continue;
      if (obs[n] && obs[n].cid) sl.contributionCid = obs[n].cid;
    }
    return arr;
  }

  // v92: when the MODIFY chat rebuilds the day, the AI only sees labels and
  // times -- so its draft would silently strip contributionCid links, lawTag,
  // notes, and every other field. Match draft slots to existing slots to
  // carry those fields over.
  // v107 -- TITLE PLUMBING FIX (real version): every slot now carries a
  // permanent id, minted once at birth (pwsEnsureSlotIds_) and handed to
  // Doc B during MODIFY with an explicit instruction to echo it back
  // unchanged, even when it rewords the label. That id is now the
  // authoritative match -- exact, unambiguous, never guessed. Label and
  // time matching remain ONLY as a defensive fallback for the rare case
  // an AI response drops the id despite the instruction (models aren't
  // perfectly obedient); when that happens the recovered slot still gets
  // a fresh id going forward via pwsEnsureSlotIds_, so the gap self-heals
  // by the next round. An old slot with a contribution link that STILL
  // can't be matched by any tier is logged loudly (console.warn) instead
  // of silently losing its credit -- on-screen surfacing is a follow-up
  // design decision, not guessed here.
  function pwsCarrySlotFields(oldArr, newArr) {
    if (!oldArr || !newArr) return newArr;
    var claimed = new Array(oldArr.length);
    var byId = {};
    oldArr.forEach(function(o, si) { if (o && o.id) byId[o.id] = si; });

    function carry(n, o) {
      var ks = Object.keys(o);
      for (var ki = 0; ki < ks.length; ki++) {
        if (n[ks[ki]] === undefined) n[ks[ki]] = o[ks[ki]];
      }
    }

    // Tier 0: exact id match -- the real fix, authoritative when present.
    newArr.forEach(function(n) {
      if (!n || !n.id) return;
      var si = byId[n.id];
      if (si !== undefined && !claimed[si]) {
        carry(n, oldArr[si]);
        claimed[si] = true;
        n._pwsCarried = true;
      }
    });

    // Tier 1 (fallback only): exact label match, for slots where the id
    // didn't come back -- unambiguous when found, but wording-dependent.
    newArr.forEach(function(n) {
      if (!n || n._pwsCarried || !n.label) return;
      var t = (n.label + '').toLowerCase().trim();
      for (var si = 0; si < oldArr.length; si++) {
        if (claimed[si]) continue;
        var o = oldArr[si];
        if (o && o.label && (o.label + '').toLowerCase().trim() === t) {
          carry(n, o);
          claimed[si] = true;
          n._pwsCarried = true;
          break;
        }
      }
    });

    // Tier 2 (fallback only): same time, only when exactly one unclaimed
    // old slot shares it -- a tie is left unmatched rather than risk
    // attaching the wrong contributionCid to the wrong task.
    newArr.forEach(function(n) {
      if (!n || n._pwsCarried) return;
      var nt = (n.derivedTime || n.time || '').toString().trim();
      if (!nt) return;
      var matchIdx = -1, matchCount = 0;
      for (var si = 0; si < oldArr.length; si++) {
        if (claimed[si]) continue;
        var o = oldArr[si];
        var ot = o && (o.derivedTime || o.time || '').toString().trim();
        if (ot && ot === nt) { matchCount++; matchIdx = si; }
      }
      if (matchCount === 1) {
        carry(n, oldArr[matchIdx]);
        claimed[matchIdx] = true;
        n._pwsCarried = true;
      }
    });

    // Loud safety net: an unclaimed old slot with a real contribution link
    // is a silent credit-loss unless we say something now.
    oldArr.forEach(function(o, si) {
      if (claimed[si]) return;
      if (o && (o.contributionCid || (o.contributionId !== undefined && o.contributionId !== null))) {
        console.warn('[pwsCarrySlotFields] Contribution link lost on MODIFY -- old slot "' +
          (o.label || '?') + '" (' + (o.derivedTime || o.time || '?') + ', id=' + (o.id || 'none') +
          ') had a contribution link that no new slot could be matched to (its id was not echoed back). ' +
          'Credit for this item will not register until re-linked by hand via the serves-picker.');
      }
    });

    newArr.forEach(function(n) { if (n) delete n._pwsCarried; });
    return newArr;
  }

  // v107: mints a permanent id on any schedule slot that doesn't have one
  // yet -- called on every day-load (backfills slots created before this
  // fix existed) and right after a MODIFY merge (covers brand-new slots
  // Doc B just added, so they have an id before the very next round).
  function pwsEnsureSlotIds_(arr) {
    if (!arr) return arr;
    arr.forEach(function(s) {
      if (s && !s.id) s.id = 'slot_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    });
    return arr;
  }

  function pwsGetUrlParam(name) {
    var q = window.location.search.substring(1);
    if (!q) return null;
    var pairs = q.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var kv = pairs[i].split('=');
      var rawKey = (kv[0] || '').replace(/\+/g, ' ');
      var key; try { key = decodeURIComponent(rawKey); } catch (e) { key = rawKey; }
      if (key === name) {
        if (kv[1] === undefined) return '';
        var rawVal = kv[1].replace(/\+/g, ' ');
        try { return decodeURIComponent(rawVal); } catch (e) { return rawVal; }
      }
    }
    return null;
  }

  function pwsInit() {
    var _urlSession = pwsGetUrlParam('session');
    var _urlMember = pwsGetUrlParam('member');
    var _urlDname = pwsGetUrlParam('dname');
    if (_urlSession && _urlMember) {
      localStorage.setItem(SESSION_KEY, _urlSession);
      localStorage.setItem(MEMBER_KEY, _urlMember);
      if (_urlDname) {
        localStorage.setItem('4laws-display-name', _urlDname);
      }
      history.replaceState({}, '', window.location.pathname);
    }
    _session  = localStorage.getItem(SESSION_KEY);
    _memberId = localStorage.getItem(MEMBER_KEY);
    if (!_session || !_memberId) {
      document.getElementById('pwsRedirect').classList.add('show');
      return;
    }
    function pwsLoadWeather(lat, lon) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
      '&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph';
    fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (!d || !d.current_weather) return;
      var cw = d.current_weather;
      var temp = Math.round(cw.temperature);
      var code = cw.weathercode;
      var icon, desc;
      if (code === 0) { icon = '\u2600\ufe0f'; desc = _lang === 'es' ? 'Despejado' : 'Clear'; }
      else if (code <= 2) { icon = '\u26c5'; desc = _lang === 'es' ? 'Parcialmente nublado' : 'Partly cloudy'; }
      else if (code <= 3) { icon = '\u2601\ufe0f'; desc = _lang === 'es' ? 'Nublado' : 'Overcast'; }
      else if (code <= 49) { icon = '\uD83C\uDF2B\ufe0f'; desc = _lang === 'es' ? 'Niebla' : 'Foggy'; }
      else if (code <= 59) { icon = '\uD83C\uDF26\ufe0f'; desc = _lang === 'es' ? 'Llovizna' : 'Drizzle'; }
      else if (code <= 69) { icon = '\uD83C\uDF27\ufe0f'; desc = _lang === 'es' ? 'Lluvia' : 'Rain'; }
      else if (code <= 79) { icon = '\u2744\ufe0f'; desc = _lang === 'es' ? 'Nieve' : 'Snow'; }
      else if (code <= 84) { icon = '\uD83C\uDF27\ufe0f'; desc = _lang === 'es' ? 'Chubascos' : 'Showers'; }
      else if (code <= 99) { icon = '\u26c8\ufe0f'; desc = _lang === 'es' ? 'Tormenta' : 'Thunderstorm'; }
      else { icon = '\uD83C\uDF21\ufe0f'; desc = ''; }
      var strip = document.getElementById('pwsWeatherStrip');
      var iconEl = document.getElementById('pwsWeatherIcon');
      var tempEl = document.getElementById('pwsWeatherTemp');
      var descEl = document.getElementById('pwsWeatherDesc');
      if (iconEl) iconEl.textContent = icon;
      if (tempEl) tempEl.textContent = temp + '\u00b0F';
      if (descEl) descEl.textContent = desc;
      if (strip) strip.style.display = 'flex';
    }).catch(function(){});
  }



  pwsSetCurrentTime();
    setInterval(pwsTickClock, 60000);
    var _dname = localStorage.getItem('4laws-display-name') || '';
    var _welcomeEl = document.getElementById('pwsWelcome');
    if (_welcomeEl && _dname) {
      _welcomeEl.innerHTML = '<span class="en">Welcome back, ' + escHtml(_dname) + '. Your station is ready.</span>'
        + '<span class="es">Bienvenido de vuelta, ' + escHtml(_dname) + '. Tu estaci\u00f3n est\u00e1 lista.</span>';
    }
    pwsLoadAll();
    pwsInitAccordion();

    // Hash navigation — auto-open accordion if URL has #accordionId
    (function() {
      var hash = window.location.hash ? window.location.hash.replace('#','') : '';
      if (hash) {
        var target = document.getElementById(hash);
        if (target && target.classList.contains('pws-accordion-card')) {
          target.classList.add('open');
          setTimeout(function() { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 400);
        }
      }
    }());
    pwsTWSHookAccordion();
    pwsUpdateAccordionStatus();
    pwsEntertainmentBridgeInbound();

    var _pauseBtn = document.getElementById('pwsUsePauseBtn');
    if (_pauseBtn) _pauseBtn.addEventListener('click', pwsTogglePause);
    var _closeBtn2 = document.getElementById('pwsUseCloseBtn2');
    if (_closeBtn2) _closeBtn2.addEventListener('click', pwsCloseUse);

    var _docbInp = document.getElementById('pwsDocBInput');
    if (_docbInp) _docbInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendDocB(); }
    });
    var _docbShortcuts = document.getElementById('pwsDocBShortcuts');
    if (_docbShortcuts) _docbShortcuts.addEventListener('click', function(e) {
      var btn = e.target.closest ? e.target.closest('[data-docb-shortcut]') : null;
      if (!btn) return;
      pwsDocBQuickTool(btn.getAttribute('data-docb-shortcut'));
    });
    var _docbCam = document.getElementById('pwsDocBCamInput');
    if (_docbCam) _docbCam.addEventListener('change', function() {
      if (!_docbCam.files || !_docbCam.files[0]) return;
      if (typeof DocBCore !== 'undefined') {
        DocBCore.handleCameraFile(_docbCam.files[0]);
      }
    });
    var _docbImgClear = document.getElementById('pwsDocBImgClear');
    if (_docbImgClear) _docbImgClear.addEventListener('click', function() {
      if (typeof DocBCore !== 'undefined') DocBCore.clearPending();
      var prev = document.getElementById('pwsDocBImgPreview'); if (prev) prev.style.display = 'none';
    });

    // DocBCore init
    function initDocBCore() {
      if (typeof DocBCore === 'undefined') { setTimeout(initDocBCore, 200); return; }
      DocBCore.init({
        inputId:       'pwsUseInput',
        previewId:     'pwsUseImgPreview',
        thumbId:       'pwsUseImgThumb',
        clearBtnId:    'pwsUseImgClear',
        voiceBtnId:    'pwsVoiceBtn',
        cameraInputId: 'pwsCamInput',
        getLang:       function() { return _lang; }
      });
    }
    try { localStorage.removeItem('4laws-voice-on'); } catch(e) {}
    initDocBCore();

    // Opening voice greeting — one time per device
    var greetKey = '4laws-voice-greeted';
    var greeted = false;
    try { greeted = localStorage.getItem(greetKey) === 'true'; } catch(e) {}
    if (!greeted) {
      setTimeout(function() {
        if (window.speechSynthesis) {
          var utt = new SpeechSynthesisUtterance(_lang === 'es' ? 'Hola. Puedo hablar contigo.' : 'Hi. I can talk.');
          utt.lang = _lang === 'es' ? 'es-US' : 'en-US';
          window.speechSynthesis.speak(utt);
        }
        var vBtn = document.getElementById('pwsVoiceBtn');
        if (vBtn) {
          var pc = 0;
          var pi = setInterval(function() {
            vBtn.style.boxShadow = pc % 2 === 0 ? '0 0 0 3px rgba(200,168,75,0.6)' : 'none';
            pc++; if (pc >= 6) { clearInterval(pi); vBtn.style.boxShadow = 'none'; }
          }, 400);
        }
      }, 1200);
    }
    var _addTalentBtn = document.getElementById('pwsAddTalentBtn');
    if (_addTalentBtn) _addTalentBtn.addEventListener('click', pwsOpenTalentBuilder);
    var _startFreshBtn = document.getElementById('pwsStartFreshBtn');
    if (_startFreshBtn) _startFreshBtn.addEventListener('click', pwsStartFresh);
    var _ecJewel = document.getElementById('pwsECJewel');
    if (_ecJewel) _ecJewel.addEventListener('click', function() { pwsOpenDeparture('/music',_lang==='es'?'Centro de Entretenimiento':'Entertainment Center'); });

    document.addEventListener('change', function(ev) {
      var chk = ev.target;
      if (!chk || !chk.classList.contains('pws-todo-check')) return;
      var label = chk.getAttribute('data-todo-label') || '';
      pwsToggleTodo(chk, label);
    });
    document.addEventListener('change', function(ev) {
      var el = ev.target;
      if (!el) return;
      if (el.id === 'pwsInviteRelationship') { pwsInviteUpdatePreview(); return; }
    });
  }

  var _lastWindowKey  = null;
  var _snoozeUntil    = null;
  var _endOfDayFired  = false;

  function pwsSetCurrentTime() {
    var now  = new Date();
    var h    = now.getHours();
    var m    = now.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12  = h % 12 || 12;
    var mStr = m < 10 ? '0' + m : '' + m;
    var el   = document.getElementById('pwsNowTime');
    if (el) el.textContent = h12 + ':' + mStr + ' ' + ampm;
  }

  function pwsTickClock() { pwsSetCurrentTime(); pwsCheckWindowTransition(); }

  function pwsCheckWindowTransition() {
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule.length) return;
    if (_snoozeUntil && Date.now() < _snoozeUntil) return;
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var current  = pwsFindCurrentWindow(schedule);
    var currentKey = current ? (current.derivedTime + '|' + current.activity) : 'none';
    if (currentKey !== _lastWindowKey) {
      var prevKey = _lastWindowKey;
      _lastWindowKey = currentKey;
      if (prevKey === null) return;
      if (!current) { pwsEndOfDaySummary(schedule); } else { pwsWindowNudge(current); }
    }
    pwsRenderCurrentWindow();
  }

  function pwsWindowNudge(win) {
    pwsOpenDocB();
    var actName = win.activity || 'your next activity';
    var nudgeEN = 'Time to shift.' + NL + NL + 'You said you\u0027d do \u201c' + actName + '\u201d. Ready?';
    var nudgeES = 'Hora de cambiar.' + NL + NL + 'Dijiste que har\u00edas \u201c' + actName + '\u201d. \u00bfListo?';
    setTimeout(function() {
      pwsAppendBubble(_lang === 'es' ? nudgeES : nudgeEN, 'docb');
      var feed = document.getElementById('pwsDocBFeed');
      if (!feed) return;
      var btnRow = document.createElement('div');
      btnRow.className = 'pws-nudge-btn-row';
      btnRow.setAttribute('data-window-activity', win.activity || '');
      btnRow.setAttribute('data-window-key', (win.derivedTime || '') + '_' + (win.activity || '').replace(/\s+/g, '_').substring(0, 20));
      btnRow.innerHTML =
        '<button class="pws-nudge-btn ready" onclick="pwsNudgeReady(this)"><span class="en">READY</span><span class="es">LISTO</span></button>' +
        '<button class="pws-nudge-btn snooze" onclick="pwsNudgeSnooze(this)"><span class="en">NEED A MINUTE</span><span class="es">UN MINUTO</span></button>';
      feed.appendChild(btnRow);
      feed.scrollTop = feed.scrollHeight;
    }, 400);
  }

  window.pwsNudgeReady = function pwsNudgeReady(btn) {
    var row = btn.closest('.pws-nudge-btn-row');
    var activityLabel = row ? (row.getAttribute('data-window-activity') || '') : '';
    var windowKey = row ? (row.getAttribute('data-window-key') || '') : '';
    if (row) row.parentNode.removeChild(row);
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: pwsLocalDate(), windowKey: windowKey || 'transition',
      activityLabel: activityLabel || 'window transition', completed: true, note: '', lawTag: 'responsibility' });
    pwsAppendBubble(_lang === 'es' ? 'Bien. Vamos.' : 'Good. Let\u0027s go.', 'docb');
  };

  window.pwsNudgeSnooze = function pwsNudgeSnooze(btn) {
    var row = btn.closest('.pws-nudge-btn-row');
    var activityLabel = row ? (row.getAttribute('data-window-activity') || '') : '';
    var windowKey = row ? (row.getAttribute('data-window-key') || '') : '';
    if (row) row.parentNode.removeChild(row);
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: pwsLocalDate(), windowKey: windowKey || 'transition',
      activityLabel: activityLabel || 'window transition', completed: false, note: 'snoozed 5 minutes', lawTag: 'responsibility' });
    _snoozeUntil = Date.now() + (5 * 60 * 1000);
    pwsAppendBubble(_lang === 'es' ? 'Entendido. Vuelvo en 5 minutos.' : 'Got it. I\u0027ll check back in 5 minutes.', 'docb');
    setTimeout(function() {
      _snoozeUntil = null;
      if (!_dayData || !_dayData.finalSchedule) return;
      var sched = _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; });
      var current = pwsFindCurrentWindow(sched);
      if (current) pwsWindowNudge(current);
    }, 5 * 60 * 1000);
  };

  function pwsEndOfDaySummary(schedule) {
    if (_endOfDayFired) return;
    _endOfDayFired = true;
    pwsOpenHandoff(schedule);
  }

  function pwsLoadAll() {
    pwsShowLoading(true);
    Promise.all([
      post({ action: 'pwsGetStation',        sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetTools',          sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetDay',            sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetTodayAdherence', sessionId: _session, requestingMemberId: _memberId, date: pwsLocalDate() }).catch(function(){ return null; }),
      post({ action: 'pwsGetEquipAll',       sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      fetch(GAMES_URL, { method: 'POST', body: JSON.stringify({ action: 'pwsMintStationCids', memberId: _memberId }) }).then(function(r){ return r.json(); }).catch(function(){ return null; })
    ]).then(function(results) {
      var dStation = results[0], dTools = results[1], dDay = results[2], dAdherence = results[3], dWinConfig = results[4], dMint = results[5];
      if (dStation && dStation.status === 'ok') { _obsData = dStation.data ? Object.assign({}, dStation.data, { lastSavedAt: dStation.lastSavedAt }) : null; }
      if (_obsData && _obsData.confirmedObs && dMint && dMint.success && dMint.confirmedObs && dMint.confirmedObs.length) {
        _obsData.confirmedObs.forEach(function(ob, mi) {
          var m = dMint.confirmedObs[mi];
          if (ob && !ob.cid && m && m.cid) { ob.cid = m.cid; }
        });
      }
      if (_obsData && _obsData.confirmedObs) {
        var _todayReset = pwsLocalDate();
        var _lastReset = _obsData._lastResetDate || '';
        if (!_lastReset) {
          // v104.3: NO stamp means a record written by one of the old leaking
          // save paths -- corruption evidence, not evidence of a new day.
          // Stamp today and reset NOTHING. Wiping here is what destroyed the
          // member's dots every reload. A brand-new member is unaffected:
          // their obligations are already not-started.
          _obsData._lastResetDate = _todayReset;
          post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
            data: pwsStationPayload({ _lastResetDate: _todayReset }) });
        } else if (_lastReset !== _todayReset) {
          // A real new day: yesterday's dots clear.
          _obsData.confirmedObs.forEach(function(ob) { ob.state = 'not-started'; });
          _obsData._lastResetDate = _todayReset;
          post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
            data: pwsStationPayload({ _lastResetDate: _todayReset }) });
        }
      }
      if (!_obsData || !_obsData.confirmedObs || !_obsData.confirmedObs.length) {
        var alreadyPrompted = sessionStorage.getItem('pws_onboard_prompted');
        var twsOpen = document.getElementById('pwsTWSOverlay') && document.getElementById('pwsTWSOverlay').classList.contains('open');
        if (!alreadyPrompted && !twsOpen) {
          sessionStorage.setItem('pws_onboard_prompted', '1');
          setTimeout(function() { window.location.href = '/todos'; }, 800);
        }
      }
      if (dTools && dTools.status === 'ok') { _toolsData = dTools.data ? Object.assign({}, dTools.data, { lastSavedAt: dTools.lastSavedAt }) : null; }
      if (dDay && dDay.status === 'ok') { _dayData = dDay.data ? Object.assign({}, dDay.data, { lastSavedAt: dDay.lastSavedAt }) : null; }
      if (_dayData && _dayData.finalSchedule) {
        pwsEnsureSlotIds_(_dayData.finalSchedule);
        _dayData.finalSchedule.forEach(function(s) { s._checkedIn = ''; });
      }
      if (dAdherence && dAdherence.status === 'ok') {
        _adherenceData = dAdherence;
        if (_dayData && _dayData.finalSchedule && dAdherence.records && dAdherence.records.length) {
          var filteredSched = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
          var _todayStr = pwsLocalDate();
          // Build keyMap — log is append-only so last record per windowKey wins
          var keyMap = {};
          dAdherence.records.forEach(function(rec) {
            if (rec.date && rec.date !== _todayStr) return; // today only
            if (rec.windowKey) {
              keyMap[rec.windowKey] = rec; // later entries overwrite earlier
            }
          });
          filteredSched.forEach(function(slot, i) {
            var labelKey = 'label_' + (slot.label || '').replace(/\s+/g, '_').toLowerCase();
            var posKey = 'window_' + i;
            var rec = keyMap[labelKey] || keyMap[posKey];
            if (!rec) {
              var recKeys = Object.keys(keyMap);
              for (var r = 0; r < recKeys.length; r++) {
                var candidate = keyMap[recKeys[r]];
                if (candidate.activityLabel && candidate.activityLabel === slot.label) {
                  rec = candidate;
                  break;
                }
              }
            }
            if (rec) slot._checkedIn = rec.completed ? 'done' : 'missed';
          });
        }
      }
      if (dWinConfig && dWinConfig.status === 'ok') { _windowConfig = pwsEquipMerge_(dWinConfig.data, dWinConfig.legacy); }
      // Sort by time only on first load — preserve manual drag order thereafter
      if (_dayData && _dayData.finalSchedule && _dayData.finalSchedule.length && !_dayData._manualOrder) {
        pwsNormalizeSchedule(_dayData.finalSchedule);
      }
      pwsShowLoading(false);
      try { pwsRenderStationTile(); } catch(e) {}
      try { pwsRenderToolsTile(); } catch(e) {}
      try { pwsRenderDayTile(); } catch(e) {}
      try { pwsRenderCurrentWindow(); } catch(e) {}
      pwsLoadProjectTile();
      try { pwsUpdateAccordionStatus(); } catch(e) {}
      if (_dayData && _dayData.finalSchedule && _dayData.finalSchedule.length) {
        var sched0 = _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; });
        var curr0 = pwsFindCurrentWindow(sched0);
        _lastWindowKey = curr0 ? (curr0.derivedTime + '|' + curr0.activity) : 'none';
      }
      _endOfDayFired = false;
    }).catch(function() {
      pwsShowLoading(false);
      try { pwsRenderStationTile(); } catch(e) {}
      try { pwsRenderToolsTile(); } catch(e) {}
      try { pwsRenderDayTile(); } catch(e) {}
      pwsLoadProjectTile();
    });
  }

  function pwsShowLoading(show) {
    var els = document.querySelectorAll('.pws-loading');
    els.forEach(function(el) { el.style.display = show ? 'flex' : 'none'; });
  }

  function pwsRenderAll() {
    pwsRenderCurrentWindow(); pwsRenderStationTile(); pwsRenderToolsTile(); pwsRenderDayTile(); pwsUpdateAccordionStatus(); pwsEnsureProjectSlot();
  }

  function pwsEnsureProjectSlot() {
    if (!_dayData || !_dayData.finalSchedule) return;
    var hasProject = (_projectData && _projectData.projectId) || (_twsProject && _twsProject.title);
    if (!hasProject) return;
    var projTitle = (_projectData && _projectData.title) ? _projectData.title : ((_twsProject && _twsProject.title) ? _twsProject.title : '');
    if (!projTitle) return;
    var slotLabel=_lang==='es'?'Trabajar en Mi Proyecto':'Work on My Project';
    var alreadyExists = _dayData.finalSchedule.some(function(s) {
      return (s.label || '').toLowerCase().indexOf('work on my project') !== -1 ||
             (s.label || '').toLowerCase().indexOf('trabajar en mi proyecto') !== -1 ||
             (s.isProjectSlot === true);
    });
    if (alreadyExists) return;
    _dayData.finalSchedule.push({
      label:         slotLabel,
      activity:      slotLabel,
      note:          projTitle,
      isProjectSlot: true,
      type:          'obligation',
      ownsIt:        true,
      _checkedIn:    ''
    });
    setTimeout(function() { pwsSaveDaySchedule(); pwsRenderDayTile(); }, 100);
  }

  function pwsRenderCurrentWindow() {
    var actEl = document.getElementById('pwsNowActivity');
    var chemEl = document.getElementById('pwsNowChem');
    if (!actEl) return;
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule.length) {
      actEl.innerHTML = '';
      if (chemEl) chemEl.innerHTML = '';
      return;
    }
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var current = pwsFindCurrentWindow(schedule);
    if (current) {
      actEl.innerHTML = '<span class="' + _lang + '">' + escHtml(current.label) + '</span>';
      if (chemEl) chemEl.innerHTML = current.chem ? '<span class="pws-now-chem">' + escHtml(current.chem) + '</span>' : '';
    } else {
      actEl.innerHTML = _lang === 'es' ? '<span class="es">Todo completado por hoy. Buen trabajo.</span>' : '<span class="en">All done for today. Good work.</span>';
      if (chemEl) chemEl.innerHTML = '';
    }
  }

  function pwsFindCurrentWindow(schedule) {
    if (!schedule || !schedule.length) return null;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var nowMins = h * 60 + m;
    var labelHours = { 'early morning': 5, 'morning': 8, 'midday': 12, 'afternoon': 14, 'after school': 16, 'evening': 18, 'before bed': 21, 'wake up': 6, 'prepare for good sleep': 21 };
    var best = null, bestMins = -1;
    schedule.forEach(function(s) {
      var label = (s.derivedTime || s.time || '').toLowerCase().trim();
      var windowMins = -1;
      var labelHour = labelHours[label];
      if (labelHour !== undefined) { windowMins = labelHour * 60; }
      if (windowMins < 0) {
        var m1 = label.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
        if (m1) {
          var hh = parseInt(m1[1], 10);
          var mm = parseInt(m1[2], 10);
          var ampm = m1[3].toLowerCase();
          if (ampm === 'pm' && hh < 12) hh += 12;
          if (ampm === 'am' && hh === 12) hh = 0;
          windowMins = hh * 60 + mm;
        }
      }
      if (windowMins < 0) {
        var m2 = label.match(/(\d{1,2})(am|pm)/i);
        if (m2) {
          var hh2 = parseInt(m2[1], 10);
          var ampm2 = m2[2].toLowerCase();
          if (ampm2 === 'pm' && hh2 < 12) hh2 += 12;
          if (ampm2 === 'am' && hh2 === 12) hh2 = 0;
          windowMins = hh2 * 60;
        }
      }
      if (windowMins < 0) {
        var m3 = label.match(/^(\d{1,2}):(\d{2})$/);
        if (m3) { windowMins = parseInt(m3[1], 10) * 60 + parseInt(m3[2], 10); }
      }
      if (windowMins >= 0 && windowMins <= nowMins && windowMins > bestMins) {
        bestMins = windowMins; best = s;
      }
    });
    return best || schedule[0];
  }

  function pwsIsValidObligation(text) {
    if (!text || typeof text !== 'string') return false;
    var t = text.trim();
    if (t.length < 3 || t.length > 120) return false;
    if (/^I (really|have a hard|can\u0027t|don\u0027t|feel|just|hate|always|never)/i.test(t)) return false;
    if (/my parents take me|i am late|hard for me|this part is/i.test(t)) return false;
    if (t.charAt(t.length - 1) === '?') return false;
    if (/^(Here\u0027s|Based on|Want me to|Let me|I can help|A lot of)/i.test(t)) return false;
    return true;
  }

  function pwsIsValidTool(t) {
    if (!t || typeof t !== 'object') return false;
    var obl = (t.obligation || '').trim();
    var en = (t.en || '').trim();
    if (!obl && !en) return false;
    if (/^Based on your|^Here\u0027s a specific tool|^I can help you with/i.test(en)) return false;
    t._oblDirty = !!(obl && !pwsIsValidObligation(obl));
    return true;
  }

  var ALIVENESS_LABELS = {
    en: { 'first-step': 'First Step \u2756', stirring: 'Stirring', growing: 'Growing', alive: 'Alive', resonant: 'Resonant' },
    es: { 'first-step': 'Primer Paso \u2756', stirring: 'Despertando', growing: 'Creciendo', alive: 'Vivo', resonant: 'Resonante' }
  };

  function buildAlivenessRow(w, lang) {
    var rawLabel = w.alivenessLabel || 'quiet';
    var tier = (rawLabel === 'quiet') ? 'first-step' : rawLabel;
    var percent = (typeof w.alivenessPercent === 'number') ? w.alivenessPercent : 0;
    if (tier === 'first-step' && percent < 10) percent = 10;
    var labelMap = ALIVENESS_LABELS[lang] || ALIVENESS_LABELS['en'];
    var labelText = labelMap[tier] || tier;
    var witnessCount = w.witnessCount || 0;
    var witnessText = witnessCount > 0 ? (witnessCount === 1 ? (lang === 'es' ? '1 testigo' : '1 witness') : (witnessCount + (lang === 'es' ? ' testigos' : ' witnesses'))) : '';
    return '<div class="gw-aliveness-header"><span class="gw-alive-label ' + escHtml(tier) + '">' + escHtml(labelText) + '</span>' +
      (witnessText ? '<span class="gw-witness-count">' + escHtml(witnessText) + '</span>' : '') + '</div>' +
      '<div class="gw-vitality-track"><div class="gw-vitality-fill ' + escHtml(tier) + '" style="width:' + percent + '%"></div></div>';
  }

  function renderTrustScoreCard(scores, certified) {
    if (!scores) return '';
    var lang = _lang;
    var names = lang === 'es'
      ? { talent: 'Talento', respect: 'Respeto', responsibility: 'Responsabilidad', limits: 'L\u00edmites' }
      : { talent: 'Talent',  respect: 'Respect', responsibility: 'Responsibility',  limits: 'Limits' };
    // Cascade direction: Talent -> Respect -> Responsibility -> Limits
    var laws = ['talent', 'respect', 'responsibility', 'limits'];
    var titleText = lang === 'es' ? 'Puntuaci\u00f3n de Confianza' : 'Trust Score';
    var gridHtml = laws.map(function(law) {
      var val = Math.min(100, Math.max(0, parseInt(scores[law] || 0, 10)));
      return '<div class="pws-trust-law-score">' +
        '<div class="pws-trust-law-row">' +
          '<div class="pws-trust-law-name">' + names[law] + '</div>' +
          '<div class="pws-trust-law-bar"><div class="pws-trust-law-bar-fill ' + law + '" id="pwsTscBar_' + law + '" style="width:0%"></div></div>' +
          '<div class="pws-trust-law-value ' + law + '">' + val + '</div>' +
        '</div>' +
        '</div>';
    }).join('');
    var overall = Math.min(100, Math.max(0, parseInt(scores.overall || 0, 10)));
    var weightNote = lang === 'es'
      ? 'Talento \u2192 Respeto \u2192 Responsabilidad \u2192 L\u00edmites'
      : 'Talent \u2192 Respect \u2192 Responsibility \u2192 Limits';
    var certHtml = certified
      ? '<div class="pws-trust-certified-row">' +
          '<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;display:inline-block;vertical-align:middle;margin-right:4px;">' +
            '<circle cx="22" cy="22" r="20" fill="none" stroke="#c8a84b" stroke-width="2"/>' +
            '<circle cx="22" cy="22" r="15" fill="#040608"/>' +
            '<polygon points="22,10 28,16 28,28 22,34 16,28 16,16" fill="#1a4fa0" opacity="0.9"/>' +
            '<polygon points="22,3 24,7 22,9 20,7" fill="#c8a84b"/>' +
          '</svg>' +
          (lang === 'es' ? 'Confianza Certificada' : 'Trust Certified') +
        '</div>'
      : '';
    var html = '<div class="pws-trust-score-card">' +
      '<div class="pws-trust-score-title">' + titleText + '</div>' +
      '<div class="pws-trust-score-grid">' + gridHtml + '</div>' +
      '<div class="pws-trust-overall">' +
        '<div>' +
          '<div class="pws-trust-overall-label">' + (lang === 'es' ? 'General' : 'Overall') + '</div>' +
          '<div class="pws-trust-overall-value">' + overall + '</div>' +
        '</div>' +
        '<div class="pws-trust-weight-note">' + weightNote + '</div>' +
      '</div>' +
      certHtml +
    '</div>';
    // Animate bars after DOM insertion
    setTimeout(function() {
      laws.forEach(function(law) {
        var fill = document.getElementById('pwsTscBar_' + law);
        var val = Math.min(100, Math.max(0, parseInt(scores[law] || 0, 10)));
        if (fill) fill.style.width = val + '%';
      });
    }, 60);
    return html;
  }

  var PWS_WIN_IMGS = [
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777144880149-LUDSLH9MISJ5FZFU97MY/unsplash-image-VCLNNMRl07k.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777146171508-MKUKY00DET6GYV3TIL97/unsplash-image-RMCHhAxXbWE.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777146749711-L0IECK3QHQT1NOLKW45A/unsplash-image-qWYvQMIJyfE.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777145803351-LX8N6HJDU0U67K3EC363/unsplash-image-nO7CzM6e5eA.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777146596645-KMZOJ84SMNEGCAIB13RY/unsplash-image-CZT7lkrt5sU.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777145629037-LP1QN7CB6QYXU390YBV3/unsplash-image-TKCPeKjcTGU.jpg?format=750w'
  ];

  function pwsLoadProjectTile() {
    pwsRenderProjectTile(null);
    post({ action: 'getProjects', sessionId: _session, requestingMemberId: _memberId })
    .then(function(d) {
      if (!d || d.status !== 'ok' || !d.projects || !d.projects.length) return;
      var activeProjects = d.projects.filter(function(p) { return p.status !== 'archived'; });
      if (!activeProjects.length) activeProjects = d.projects;
      activeProjects.sort(function(a, b) {
        var da = a.createdAt || a.createdDate || a.created || '';
        var db = b.createdAt || b.createdDate || b.created || '';
        return da > db ? -1 : da < db ? 1 : 0;
      });
      var proj = activeProjects[0];
      return post({ action: 'getProjectWindows', sessionId: _session, requestingMemberId: _memberId, projectId: proj.projectId })
      .then(function(wd) {
        var latestTitle = (wd && wd.status === 'ok' && wd.windows && wd.windows.length) ? (wd.windows[0].title || '') : '';
        var restoredActivities = [];
        if (_toolsData && _toolsData._projectActivities && proj.projectId && _toolsData._projectActivities[proj.projectId]) {
          restoredActivities = _toolsData._projectActivities[proj.projectId];
        }
        if (!restoredActivities.length && proj.activities) {
          try {
            restoredActivities = typeof proj.activities === 'string' ? JSON.parse(proj.activities) : proj.activities;
          } catch(e) {}
        }
        if (!restoredActivities.length && _twsProject && _twsProject.activities && _twsProject.activities.length) {
          restoredActivities = _twsProject.activities;
        }
        _projectData = { projectId: proj.projectId, name: proj.name || '', latestWindowTitle: latestTitle, category: proj.category || '', description: proj.description || '', photo: proj.photo || '', title: proj.name || proj.title || '', type: proj.type || 'main', masteryStage: proj.masteryStage || 1, sessionCount: proj.sessionCount || 0, streakDays: proj.streakDays || 0, lastPracticed: proj.lastPracticed || '', entertainmentLinks: proj.entertainmentLinks || '[]', fundingStatus: proj.fundingStatus || 'none', fundingLetter: proj.fundingLetter || '', status: proj.status || 'active', activities: restoredActivities };
        _twsProject = _projectData;
        pwsRenderProjectTile(_projectData);
        pwsUpdateAccordionStatus();
      });
    }).catch(function() {});
  }

  function pwsRenderProjectTile(data) {
    // Gateway mode — projects live in Talent Hub (/talent-1)
    var preview = document.getElementById('pwsGatewayProjectPreview');
    if (!preview) return;
    if (data && (data.projectId || data.name || data.title)) {
      var name = data.name || data.title || '';
      var desc = data.description || '';
      preview.innerHTML =
        '<div style="background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.18);border-radius:6px;padding:14px 16px;text-align:left;">' +
          '<div style="font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c8a84b;margin-bottom:6px;">ACTIVE PROJECT</div>' +
          '<div style="font-family:\'Playfair Display\',serif;font-size:22px;color:#f0e6cc;font-weight:700;">' + escHtml(name) + '</div>' +
          (desc ? '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(240,230,204,0.55);margin-top:4px;">' + escHtml(desc) + '</div>' : '') +
        '</div>';
    } else {
      preview.innerHTML = '';
    }
  }

  function pwsRenderProjectCard(proj) {
    // Delegated to Talent Hub — this is a no-op in gateway mode
    pwsRenderProjectTile(proj);
  }

  function pwsRenderProjectActivities(proj) {
    var container = document.getElementById('pwsTWSActivitiesRow');
    if (!container) return;
    container.innerHTML = '';
    if (!proj || proj.type !== 'main') return;
    var activities = [];
    try {
      if (typeof proj.activities === 'string' && proj.activities.length > 2) {
        activities = JSON.parse(proj.activities);
      } else if (Array.isArray(proj.activities)) {
        activities = proj.activities;
      }
    } catch(e) { return; }
    if (!activities || !activities.length) return;

    var header = document.createElement('div');
    header.style.cssText = "font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c8a84b;margin-top:14px;margin-bottom:6px;cursor:pointer;display:flex;align-items:center;gap:8px;padding-bottom:6px;border-bottom:1px solid rgba(200,168,75,0.2);";
    header.innerHTML = 'MY ACTIVITIES <span id="pwsActToggleArrow" style="font-size:10px;">&#9660;</span>';
    container.appendChild(header);

    var listWrap = document.createElement('div');
    listWrap.id = 'pwsActList';
    listWrap.className = 'pws-activity-list';
    container.appendChild(listWrap);

    header.addEventListener('click', function() {
      var isOpen = listWrap.style.display !== 'none';
      listWrap.style.display = isOpen ? 'none' : 'flex';
      var arrow = document.getElementById('pwsActToggleArrow');
      if (arrow) arrow.innerHTML = isOpen ? '&#9654;' : '&#9660;';
    });

    activities.forEach(function(act, idx) {
      var row = document.createElement('div');
      row.className = 'pws-activity-row' + (act.status === 'done' ? ' done' : '');

      var dot = document.createElement('span');
      var dotColor = act.status === 'done' ? '#4caf50' : act.status === 'in-progress' ? '#c8a84b' : 'rgba(240,230,204,0.3)';
      dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:" + dotColor + ";flex-shrink:0;display:inline-block;";

      var titleEl = document.createElement('div');
      titleEl.className = 'pws-activity-title';
      titleEl.textContent = act.title || act;

      var statusEl = document.createElement('div');
      statusEl.className = 'pws-activity-status';
      var statusMap = { 'not-started': 'Not started', 'in-progress': 'In progress', 'done': 'Done \u2713' };
      statusEl.textContent = statusMap[act.status] || 'Not started';

      row.appendChild(dot);
      row.appendChild(titleEl);
      row.appendChild(statusEl);

      if (act.status !== 'done') {
        var btn = document.createElement('button');
        btn.className = 'pws-activity-activate-btn';
        btn.textContent = 'ACTIVATE';
        btn.setAttribute('data-act-idx', String(idx));
        btn.addEventListener('click', function() {
          var actIdx = parseInt(btn.getAttribute('data-act-idx'), 10);
          var actItem = activities[actIdx];
          if (!actItem) return;
          if (actItem.status === 'not-started') {
            actItem.status = 'in-progress';
            if (_twsProject) { _twsProject.activities = activities; }
            pwsUpdateProject({ activities: JSON.stringify(activities) });
          }
          var syntheticTool = {
            obligation: actItem.title || actItem,
            en: actItem.title || actItem,
            label: actItem.title || actItem,
            type: 'talent',
            isTalent: true,
            projectId: proj.projectId,
            configured: false,
            links: [],
            contacts: []
          };
          _useTool = syntheticTool;
          pwsOpenUse(_useTool);
        });
        row.appendChild(btn);
      }

      listWrap.appendChild(row);
    });
  }

  /* --- TWS Tool context ---
     Sets _useTool to a synthetic object so existing panel functions
     (Links, Reminders, Cash, Contacts, Assist) work with TWS project card.
     Called every time the project card renders.
  */
  function pwsTWSSetToolContext(proj) {
    _useTool = {
      obligation: proj.title || 'My Project',
      en:         proj.description || proj.title || 'My Project',
      label:      proj.title || 'My Project',
      category:   proj.category || '',
      link:       proj.link || '',
      links:      proj.links || [],
      contacts:   proj.contacts || [],
      parentPhone: proj.parentPhone || '',
      hasAssist:  true,
      _tws:       true    // flag so we know this is TWS context, not ACTIVATE
    };
  }

  /* --- TWS panel feed resolver ---
     Panel toggles that target pwsUseFeed will be patched to call
     pwsTWSGetFeed() instead, returning the right host div.
  */
  function pwsTWSGetFeed() {
    var useOverlay = document.getElementById('pwsUseOverlay');
    var overlayOpen = useOverlay && useOverlay.classList.contains('open');
    if (overlayOpen) {
      var panelZone = document.getElementById('pwsToolPanelZone');
      if (panelZone) return panelZone;
    }
    var twsFeed = document.getElementById('pwsTWSPanelFeed');
    if (twsFeed) return twsFeed;
    return document.getElementById('pwsUseFeed');
  }

  function pwsRenderTWSProjectTools(proj) {
    var toolsRow = document.getElementById('pwsTWSToolsRow');
    if (!toolsRow) return;
    var cat = (proj.category || '').toLowerCase();

    var ALL_TOOLS = [
      { key: 'Music',      icon: '\uD83C\uDFB5', label: 'Music',       labelEs: 'M\u00fasica',      action: function() { pwsEntertainmentBridgeOutbound('music'); } },
      { key: 'CFT',        icon: '\uD83D\uDCB0', label: 'CFT',         labelEs: 'CFT',              action: function() { pwsToggleCashPanel(); } },
      { key: 'Contacts',   icon: '\uD83D\uDCE8', label: 'Contacts',    labelEs: 'Contactos',        action: function() { pwsToggleContactsPanel(); } },
      { key: 'Doc B',      icon: '\uD83E\uDD16', label: 'Doc B',       labelEs: 'Doc B',            action: function() { pwsOpenDocB(); } },
      { key: 'Links',      icon: '\uD83D\uDD17', label: 'Links',       labelEs: 'Enlaces',          action: function() { pwsToggleLinksPanel(); } },
      { key: 'Timer',      icon: '\u23F1',        label: 'Timer',       labelEs: 'Cron\u00f3metro',  action: function() { pwsToggleTimerPanel(); } },
      { key: 'Reminders',  icon: '\uD83D\uDD14', label: 'Reminders',   labelEs: 'Recordatorios',   action: function() { pwsToggleAlarmsMenu(); } },
      { key: 'Games',      icon: '\uD83C\uDFAE', label: 'Games',       labelEs: 'Juegos',           action: function() { pwsEntertainmentBridgeOutbound('game'); } },
      { key: 'Notes',      icon: '\uD83D\uDCDD', label: 'Notes',       labelEs: 'Notas',            action: function() { pwsOpenTWSNotes(); } },
      { key: 'Camera',     icon: '\uD83D\uDCF7', label: 'Camera',      labelEs: 'C\u00e1mara',     action: function() { pwsOpenTWSCamera(); } },
      { key: 'Video Links',icon: '\uD83D\uDCF9', label: 'Video Links', labelEs: 'Video',            action: function() { pwsToggleLinksPanel(); } }
    ];

    var suggestedKeys;
    if (cat === 'move your body')      suggestedKeys = ['Music','Timer','Links','Contacts','CFT','Doc B','Video Links','Reminders'];
    else if (cat === 'make stuff')     suggestedKeys = ['Music','Timer','Camera','Links','Contacts','CFT','Doc B','Notes','Reminders'];
    else if (cat === 'build things')   suggestedKeys = ['Timer','Links','Music','Contacts','CFT','Doc B','Notes','Reminders'];
    else if (cat === 'play & compete') suggestedKeys = ['Timer','Games','Links','Contacts','CFT','Doc B','Video Links','Reminders'];
    else if (cat === 'own the outdoors') suggestedKeys = ['Camera','Notes','Links','Contacts','CFT','Doc B','Timer','Reminders'];
    else if (cat === 'connect with people') suggestedKeys = ['Music','Links','Contacts','CFT','Doc B','Timer','Notes','Reminders'];
    else if (cat === 'weird & awesome') suggestedKeys = ['Timer','Camera','Music','Links','CFT','Doc B','Notes','Reminders'];
    else suggestedKeys = ['Music','CFT','Contacts','Doc B','Links','Timer','Reminders','Notes'];

    var toolMap = {};
    ALL_TOOLS.forEach(function(t) { toolMap[t.key] = t; });

    var existingTalentTools = {};
    if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(ct) {
        var projTitle = (_twsProject && _twsProject.title) ? _twsProject.title : (proj.title || '');
        if (ct.type === 'talent' && ct.obligation === projTitle) {
          existingTalentTools[ct.en] = true;
        }
      });
    }
    var hasConfirmedTools = Object.keys(existingTalentTools).length > 0;

    var _selectedToolKeys = hasConfirmedTools ? {} : {};
    if (!hasConfirmedTools && _toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(ct) {
        if (ct.obligation === (proj.title || '') && ct.type === 'talent') {
          _selectedToolKeys[ct.en] = true;
        }
      });
    }

    toolsRow.innerHTML = '';

    var quoteBubble = document.createElement('div');
    quoteBubble.style.cssText = 'display:flex;align-items:flex-start;gap:10px;background:rgba(4,6,8,0.7);border:1px solid rgba(200,168,75,0.15);border-radius:8px;padding:14px 16px;margin-bottom:14px;';
    var avatarImg = document.createElement('img');
    avatarImg.src = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/a2eea043-07f6-47c0-8b79-85b1f4b886da/4LAWS+logo+print.jpg?format=1000w';
    avatarImg.alt = '4 LAWS';
    avatarImg.style.cssText = 'width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid rgba(200,168,75,0.3);';
    var quoteText = document.createElement('div');
    quoteText.style.cssText = 'flex:1;';
    var quoteBody = document.createElement('div');
    quoteBody.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:21px !important;font-style:italic;color:#c8a84b;line-height:1.45;margin-bottom:4px;";
    quoteBody.textContent = 'Chosen talent. Not forced. Choose what truly turns you on.';
    var quoteAttr = document.createElement('div');
    quoteAttr.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.14em;color:rgba(240,230,204,0.45);text-transform:uppercase;';
    quoteAttr.textContent = '\u2014 Doc B';
    quoteText.appendChild(quoteBody);
    quoteText.appendChild(quoteAttr);
    quoteBubble.appendChild(avatarImg);
    quoteBubble.appendChild(quoteText);
    toolsRow.appendChild(quoteBubble);

    if (hasConfirmedTools) {
      pwsTWSRenderActiveToolGrid(toolMap, existingTalentTools, toolsRow, proj);
    } else if (!proj.projectId) {
      var selectionWrap = document.createElement('div');

      var promptDiv = document.createElement('div');
      promptDiv.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:20px !important;font-style:italic;color:rgba(240,230,204,0.7);margin-bottom:12px;line-height:1.4;";
      promptDiv.innerHTML = '<span class="en">Which of these do you want in your toolkit?</span><span class="es" style="display:none;">\u00bfCu\u00e1les de estas quieres en tu kit?</span>';
      selectionWrap.appendChild(promptDiv);

      var selGrid = document.createElement('div');
      selGrid.className = 'pws-launcher-grid';
      selGrid.id = 'pwsTWSToolSelGrid';

      suggestedKeys.forEach(function(key) {
        var t = toolMap[key];
        if (!t) return;
        var isSelected = !!_selectedToolKeys[key];
        var btn = document.createElement('button');
        btn.className = 'pws-use-footer-btn pws-launcher-btn' + (isSelected ? ' mark-done' : '');
        btn.setAttribute('data-tool-key', key);
        btn.innerHTML = t.icon + ' <span class="en">' + escHtml(t.label) + '</span><span class="es" style="display:none;">' + escHtml(t.labelEs) + '</span>';
        btn.addEventListener('click', function() {
          var currently = btn.classList.contains('mark-done');
          btn.classList.toggle('mark-done', !currently);
          if (!currently) { _selectedToolKeys[key] = true; }
          else { delete _selectedToolKeys[key]; }
        });
        selGrid.appendChild(btn);
      });
      selectionWrap.appendChild(selGrid);

      var confirmBtn = document.createElement('button');
      confirmBtn.className = 'pws-plan-day-btn';
      confirmBtn.style.cssText = 'width:100%;margin-top:10px;padding:11px 20px;font-size:14px !important;letter-spacing:0.18em;';
      confirmBtn.innerHTML = '<span class="en">\u2713 Add to My Toolkit</span><span class="es" style="display:none;">\u2713 Agregar a Mi Kit</span>';
      confirmBtn.addEventListener('click', function() { pwsTWSConfirmToolSelection(_selectedToolKeys, toolMap, proj, selectionWrap, toolsRow); });
      selectionWrap.appendChild(confirmBtn);

      toolsRow.appendChild(selectionWrap);
    }

    var fundingBtn = document.createElement('button');
    fundingBtn.className = 'pws-plan-day-btn';
    fundingBtn.style.cssText = 'width:100%;margin-top:10px;padding:11px 20px;font-size:14px !important;letter-spacing:0.18em;background:rgba(200,168,75,0.15);';
    fundingBtn.innerHTML = '<span class="en">\uD83D\uDCB3 FUNDING</span><span class="es" style="display:none;">\uD83D\uDCB3 FINANCIAMIENTO</span>';
    fundingBtn.addEventListener('click', pwsOpenFunding);
    toolsRow.appendChild(fundingBtn);

    var goToolsBtn = document.createElement('button');
    goToolsBtn.className = 'pws-launcher-done';
    goToolsBtn.style.cssText = 'margin-top:8px;width:100%;padding:9px 20px;font-size:12px !important;letter-spacing:0.16em;';
    goToolsBtn.innerHTML = '<span class="en">\u2192 Go to Tools &amp; Entertainment</span><span class="es" style="display:none;">\u2192 Ir a Herramientas</span>';
    goToolsBtn.addEventListener('click', function() {
      var toolsCard = document.getElementById('pwsAccordionResponsibility');
      if (toolsCard) {
        toolsCard.classList.add('open');
        toolsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    toolsRow.appendChild(goToolsBtn);

    var editBtn = document.createElement('button');
    editBtn.className = 'pws-launcher-done';
    editBtn.style.marginTop = '4px';
    editBtn.innerHTML = '<span class="en">\u2295 New Project</span><span class="es" style="display:none;">\u2295 Nuevo Proyecto</span>';
    editBtn.addEventListener('click', pwsOpenTWS);
    toolsRow.appendChild(editBtn);
  }

  /* Confirm tool selection: push into confirmedTools, save, render active grid */
  function pwsTWSConfirmToolSelection(selectedKeys, toolMap, proj, selectionWrap, toolsRow) {
    var projTitle = (_twsProject && _twsProject.title) ? _twsProject.title : (proj.title || 'My Project');
    var keys = Object.keys(selectedKeys);
    if (!keys.length) return;

    if (!_toolsData) _toolsData = { confirmedTools: [], addedToolNames: [], _items: [] };
    if (!_toolsData.confirmedTools) _toolsData.confirmedTools = [];

    _toolsData.confirmedTools = _toolsData.confirmedTools.filter(function(ct) {
      return !(ct.obligation === projTitle && ct.type === 'talent');
    });

    keys.forEach(function(key) {
      _toolsData.confirmedTools.push({
        obligation:  projTitle,
        en:          key,
        label:       key,
        type:        'talent',
        isTalent:    true,
        projectId:   (_twsProject && _twsProject.projectId) || '',
        configured:  false,
        links:       [],
        contacts:    []
      });
    });

    if (_twsProject) { _twsProject.tools = keys.join(','); }
    pwsUpdateProject({ tools: keys.join(',') });

    post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
      data: pwsToolsPayload()
    }).catch(function() {});

    if (selectionWrap && selectionWrap.parentNode) selectionWrap.parentNode.removeChild(selectionWrap);
    pwsTWSRenderActiveToolGrid(toolMap, selectedKeys, toolsRow, proj);

    pwsRenderToolsTile();

    // -------------------------------------------------------
    // After the member builds their tool set for the first time,
    // prompt them to name their daily system.
    // Only ask once — skip if templateName already exists.
    // -------------------------------------------------------
    if (!_toolsData.templateName) {
      setTimeout(function() {
        pwsShowTemplateNamingPrompt();
      }, 800);
    }
  }

  // -------------------------------------------------------
  // Inserts a naming card after the tool grid in the Tools
  // & Entertainment accordion section.
  // -------------------------------------------------------
  function pwsShowTemplateNamingPrompt() {
    var existing = document.getElementById('pwsTemplateNamingWrap');
    if (existing) return;

    var toolsSection = document.getElementById('pwsToolsSaved') || document.getElementById('pwsToolsSection');
    var insertTarget = document.querySelector('#pwsRoot .pws-section');
    // Find the Tools & Entertainment accordion body to append
    var accordionBody = document.getElementById('pwsAccordionResponsibility');
    if (!accordionBody) { accordionBody = document.querySelector('#pwsRoot .pws-section'); }

    var wrap = document.createElement('div');
    wrap.id = 'pwsTemplateNamingWrap';
    wrap.style.cssText = 'margin-top:24px;padding:20px 22px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.3);border-radius:6px;';
    wrap.innerHTML = '<div style="font-family:\'Cinzel\',serif;font-size:18px !important;letter-spacing:0.2em;color:#c8a84b;text-transform:uppercase;margin-bottom:10px;">'
      + '<span class="en">Name Your Daily System</span>'
      + '<span class="es">Nombra Tu Sistema Diario</span>'
      + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:22px !important;font-style:italic;color:rgba(240,230,204,0.7);margin-bottom:14px;line-height:1.5;">'
      + '<span class="en">You\'ve built your daily system. Give it a name.</span>'
      + '<span class="es">Construiste tu sistema diario. P\u00f3nle un nombre.</span>'
      + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px !important;font-style:italic;color:rgba(240,230,204,0.4);margin-bottom:14px;">'
      + '<span class="en">Examples: "The Clinical Warrior" &middot; "My Morning Architecture" &middot; "Eduardo\'s Daily Code"</span>'
      + '<span class="es">Ejemplos: "El Guerrero Cl\u00ednico" &middot; "Mi Arquitectura Matutina" &middot; "El C\u00f3digo Diario de Eduardo"</span>'
      + '</div>'
      + '<div style="display:flex;gap:10px;align-items:center;">'
      + '<input id="pwsTemplateNameInput" type="text" placeholder="My system name..." style="flex:1;background:rgba(240,230,204,0.05);border:1px solid rgba(200,168,75,0.35);border-radius:4px;color:#f0e6cc;font-family:\'Cormorant Garamond\',serif;font-size:24px !important;padding:9px 14px;outline:none;" />'
      + '<button id="pwsTemplateNameSave" style="font-family:\'Cinzel\',serif;font-size:16px !important;letter-spacing:0.14em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:9px 18px;cursor:pointer;white-space:nowrap;">'
      + '<span class="en">Save</span><span class="es">Guardar</span>'
      + '</button>'
      + '<button id="pwsTemplateNameSkip" style="font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,230,204,0.3);background:transparent;border:none;cursor:pointer;padding:9px 6px;">'
      + '<span class="en">Later</span><span class="es">Despu\u00e9s</span>'
      + '</button>'
      + '</div>'
      + '<div id="pwsTemplateNameStatus" style="font-family:\'Cormorant Garamond\',serif;font-size:20px !important;color:#c8a84b;margin-top:8px;min-height:24px;"></div>';

    // Insert after the tool grid in the page
    var refNode = document.getElementById('pwsToolsSaved');
    if (refNode && refNode.parentNode) {
      refNode.parentNode.insertBefore(wrap, refNode.nextSibling);
    } else {
      var page = document.querySelector('#pwsRoot .pws-page');
      if (page) page.insertBefore(wrap, page.firstChild);
    }

    pwsApplyLang();

    document.getElementById('pwsTemplateNameSave').addEventListener('click', function() {
      var name = (document.getElementById('pwsTemplateNameInput').value || '').trim();
      if (!name) return;
      _toolsData.templateName = name;
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
        data: pwsToolsPayload()
      }).catch(function() {});
      var status = document.getElementById('pwsTemplateNameStatus');
      if (status) status.textContent = '\u2728 ' + name;
      setTimeout(function() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
        pwsRenderToolsTile();
      }, 1600);
    });

    document.getElementById('pwsTemplateNameSkip').addEventListener('click', function() {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    });
  }

  /* Active tool grid — shown after tools are confirmed */
  function pwsTWSRenderActiveToolGrid(toolMap, selectedKeys, toolsRow, proj) {
    var existingGrid = document.getElementById('pwsTWSActiveGrid');
    if (existingGrid) existingGrid.parentNode.removeChild(existingGrid);
    var wrap = document.createElement('div');
    wrap.id = 'pwsTWSActiveGrid';
    var grid = document.createElement('div');
    grid.className = 'pws-launcher-grid';
    Object.keys(selectedKeys).forEach(function(key) {
      var t = toolMap[key];
      if (!t) return;
      var btn = document.createElement('button');
      btn.className = 'pws-use-footer-btn pws-launcher-btn';
      btn.innerHTML = t.icon + ' <span class="en">' + escHtml(t.label) + '</span><span class="es" style="display:none;">' + escHtml(t.labelEs) + '</span>';
      btn.addEventListener('click', t.action);
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    var fundingBtn = toolsRow.querySelector('.pws-plan-day-btn');
    if (fundingBtn) { toolsRow.insertBefore(wrap, fundingBtn); }
    else { toolsRow.appendChild(wrap); }
  }

  /* ============================================================
     TWS PANEL MANAGER
     One panel open at a time in the project card feed.
     All toggle functions call pwsTWSClosePanels() before opening.
     Toggle-closed (same button = remove) still works via existing id check.
  ============================================================ */
  var TWS_PANEL_IDS = [
    'pwsLinksPanelInner',
    'pwsCashPanelInner',
    'pwsReminderPanelInner',
    'pwsContactsPanelInner',
    'pwsAssistChatWrap',
    'pwsTWSTimerPanelInner',
    'pwsTWSCameraPanel'
  ];

  function pwsTWSClosePanels(exceptId) {
    var twsFeed = document.getElementById('pwsTWSPanelFeed');
    var panelZone = document.getElementById('pwsToolPanelZone');
    TWS_PANEL_IDS.forEach(function(id) {
      if (id === exceptId) return;
      var el = document.getElementById(id);
      if (!el) return;
      if ((twsFeed && twsFeed.contains(el)) || (panelZone && panelZone.contains(el))) {
        el.parentNode.removeChild(el);
      }
    });
    if (exceptId !== 'pwsTWSTimerPanelInner' && _twsTimerInterval) {
      clearInterval(_twsTimerInterval);
      _twsTimerInterval = null;
      _twsTimerStart    = null;
      _twsTimerSeconds  = 0;
    }
  }

  /* pwsToggleTimerPanel — inline timer for TWS project card */
  function pwsToggleTimerPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsTWSTimerPanelInner');
    if (existing) {
      if (_twsTimerInterval) { clearInterval(_twsTimerInterval); _twsTimerInterval = null; _twsTimerStart = null; _twsTimerSeconds = 0; }
      existing.parentNode.removeChild(existing);
      return;
    }
    pwsTWSClosePanels('pwsTWSTimerPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsTWSTimerPanelInner';
    panel.style.textAlign = 'center';

    var proj = _twsProject || {};
    var pbKey = 'pws-pb-tws-' + (proj.title || 'project').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 30);
    var pb = null;
    try { var pbRaw = localStorage.getItem(pbKey); if (pbRaw) pb = JSON.parse(pbRaw); } catch(e) {}

    var pbLine = document.createElement('div');
    pbLine.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.2em;color:rgba(200,168,75,0.6);text-transform:uppercase;margin-bottom:10px;';
    pbLine.textContent = pb ? (_lang === 'es' ? 'Mejor: ' + pwsFmtSeconds(pb.best) : 'Best: ' + pwsFmtSeconds(pb.best)) : (_lang === 'es' ? 'Primer intento' : 'First attempt');
    panel.appendChild(pbLine);

    var display = document.createElement('div');
    display.id = 'pwsTWSTimerDisplay';
    display.style.cssText = 'font-family:\'Playfair Display\',serif;font-size:56px !important;font-weight:700;color:#f0e6cc;line-height:1;margin-bottom:12px;';
    display.textContent = '0:00';
    panel.appendChild(display);

    var startBtn = document.createElement('button');
    startBtn.id = 'pwsTWSTimerStartBtn';
    startBtn.className = 'pws-links-save-btn';
    startBtn.style.cssText = 'width:100%;padding:12px 20px;font-size:14px !important;letter-spacing:0.18em;';
    startBtn.textContent = _lang === 'es' ? '\u25b6 INICIAR' : '\u25b6 START';
    var startHandler = function() { pwsTWSStartTimer(pbKey, pb, display, startBtn); };
    startBtn._twsStartHandler = startHandler;
    startBtn.addEventListener('click', startHandler);
    panel.appendChild(startBtn);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  var _twsTimerInterval = null;
  var _twsTimerStart    = null;
  var _twsTimerSeconds  = 0;

  function pwsTWSStartTimer(pbKey, pb, display, startBtn) {
    if (_twsTimerInterval) return;
    _twsTimerStart   = Date.now();
    _twsTimerSeconds = 0;

    var stopHandler = function() { pwsTWSStopTimer(pbKey, pb, display, startBtn); };
    startBtn.removeEventListener('click', startBtn._twsStartHandler);
    startBtn._twsStopHandler = stopHandler;
    startBtn.addEventListener('click', stopHandler);

    startBtn.textContent = _lang === 'es' ? '\u2713 LISTO \u2014 PARAR' : '\u2713 DONE \u2014 STOP';
    startBtn.style.background = '#c8a84b';
    startBtn.style.color = '#040608';

    _twsTimerInterval = setInterval(function() {
      _twsTimerSeconds = Math.floor((Date.now() - _twsTimerStart) / 1000);
      if (display) display.textContent = pwsFmtSeconds(_twsTimerSeconds);
    }, 1000);
  }

  function pwsTWSStopTimer(pbKey, pb, display, startBtn) {
    if (!_twsTimerInterval) return;
    clearInterval(_twsTimerInterval);
    _twsTimerInterval = null;
    var elapsed = _twsTimerSeconds;
    var prevBest = pb ? pb.best : null;
    var isNewBest = (prevBest === null || elapsed < prevBest);
    var newPB = { best: isNewBest ? elapsed : prevBest, lastSeconds: elapsed, lastDate: new Date().toLocaleDateString(), count: (pb ? (pb.count || 0) : 0) + 1 };
    try { localStorage.setItem(pbKey, JSON.stringify(newPB)); } catch(e) {}
    if (display) {
      display.textContent = pwsFmtSeconds(elapsed);
      display.style.color = isNewBest ? '#c8a84b' : '#f0e6cc';
    }
    if (startBtn) {
      startBtn.removeEventListener('click', startBtn._twsStopHandler);
      startBtn.textContent = isNewBest
        ? (_lang === 'es' ? '\u00a1Nuevo R\u00e9cord! ' + pwsFmtSeconds(elapsed) : 'New Best! ' + pwsFmtSeconds(elapsed))
        : (pwsFmtSeconds(elapsed) + (_lang === 'es' ? ' \u2014 Mejor: ' + pwsFmtSeconds(newPB.best) : ' \u2014 Best: ' + pwsFmtSeconds(newPB.best)));
      startBtn.style.background = 'transparent';
      startBtn.style.border = '1px solid rgba(200,168,75,0.4)';
      startBtn.style.color = '#c8a84b';
      startBtn.style.cursor = 'default';
    }
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: pwsLocalDate(),
      windowKey: 'tws_timer_' + (_twsProject ? (_twsProject.title || 'project').replace(/\s+/g,'_').substring(0,20) : 'project'),
      activityLabel: (_twsProject && _twsProject.title) || 'Project work',
      completed: true, note: 'timer: ' + pwsFmtSeconds(elapsed) + (isNewBest ? ' (new PB)' : ''), lawTag: 'talent' });
    _twsTimerStart   = null;
    _twsTimerSeconds = 0;
  }

  function pwsRenderStationTile() {
    var container = document.getElementById('pwsObsCards');
    if (!container) return;
    if (!_obsData || !_obsData.confirmedObs || !_obsData.confirmedObs.length) {
      container.innerHTML = '<div class="pws-empty-state">' +
        '<p class="pws-empty-msg"><span class="en">No day built yet. Tell Doc B your day.</span>' +
        '<span class="es">Tu d\u00eda a\u00fan no est\u00e1 configurado. Cu\u00e9ntale a Doc B c\u00f3mo es tu d\u00eda t\u00edpico y se crear\u00e1n tus contribuciones.</span></p>' +
        '<a class="pws-goto-studio-btn" href="/todos" style="text-decoration:none;display:inline-block;">' +
        '<span class="en">\u2192 Tell Doc B About My Day</span>' +
        '<span class="es">\u2192 Contarle a Doc B Sobre Mi D\u00eda</span></a></div>';
      pwsUpdateSavedLabel('pwsObsSaved', null); return;
    }
    var stateEN = { 'not-started': 'Not Started', 'in-progress': 'In Progress', 'crushing': 'Crushing It' };
    var stateES = { 'not-started': 'Sin comenzar', 'in-progress': 'En proceso', 'crushing': 'Lo estoy logrando' };
    var obsWithIdx = [];
    _obsData.confirmedObs.forEach(function(o, i) { if (pwsIsValidObligation(o.text)) obsWithIdx.push({ ob: o, origIdx: i }); });
    if (!obsWithIdx.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">Your day hasn\u0027t been set up yet. Tell Doc B what your typical day looks like.</span><span class="es">Tu d\u00eda a\u00fan no est\u00e1 configurado. Cu\u00e9ntale a Doc B c\u00f3mo es tu d\u00eda.</span></p>' +
        '<a class="pws-goto-studio-btn" href="/todos" style="text-decoration:none;display:inline-block;"><span class="en">\u2192 Tell Doc B About My Day</span><span class="es">\u2192 Contarle a Doc B Sobre Mi D\u00eda</span></a></div>';
      pwsUpdateSavedLabel('pwsObsSaved', _obsData.lastSavedAt); return;
    }
    container.innerHTML = '';
    obsWithIdx.forEach(function(item) {
      var o = item.ob; var origIdx = item.origIdx;
      var state = o.state || 'not-started';
      var checkClass = state === 'crushing' ? ' done' : state === 'in-progress' ? ' in-progress' : '';
      var stateClass = state === 'crushing' ? ' crushing' : state === 'in-progress' ? ' in-progress' : '';
      var card = document.createElement('div');
      card.className = 'pws-obs-card';
      card.setAttribute('data-idx', origIdx);
      card.style.cssText = 'position:relative;display:flex;align-items:center;gap:14px;';
      var check = document.createElement('div');
      check.className = 'pws-obs-check' + checkClass;
      check.addEventListener('click', function() { pwsToggleObs(origIdx); });
      var text = document.createElement('div');
      text.className = 'pws-obs-text';
      text.textContent = o.text;
      text.style.flex = '1';
      text.addEventListener('click', function() { pwsToggleObs(origIdx); });
      var stateEl = document.createElement('div');
      stateEl.className = 'pws-obs-state' + stateClass;
      stateEl.innerHTML = '<span class="en">' + (stateEN[state] || state) + '</span><span class="es">' + (stateES[state] || state) + '</span>';
      stateEl.addEventListener('click', function() { pwsToggleObs(origIdx); });
      var delBtn = document.createElement('button');
      delBtn.className = 'pws-tool-delete-btn';
      delBtn.textContent = '\u2715';
      delBtn.title = _lang === 'es' ? 'Eliminar' : 'Delete';
      delBtn.style.cssText = 'flex-shrink:0;font-size:14px !important;padding:2px 6px;';
      (function(idx) {
        delBtn.addEventListener('click', function(ev) {
          ev.stopPropagation();
          pwsDeleteObs(idx);
        });
      }(origIdx));
      card.appendChild(check);
      card.appendChild(text);
      card.appendChild(stateEl);
      card.appendChild(delBtn);
      container.appendChild(card);
    });
    pwsUpdateSavedLabel('pwsObsSaved', _obsData.lastSavedAt);
    var contribCont = document.getElementById('pwsContribCards');
    if (contribCont) {
      var completed = _obsData.confirmedObs.filter(function(o){ return o.state === 'crushing'; }).length;
      var total = _obsData.confirmedObs.length || 1;
      var obligationRate = completed / (total || 1);

      fetch(GAMES_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'generateTrustScore', memberId: _memberId, sessionId: _session })
      })
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var trustOverall = (d && d.success && d.scores && typeof d.scores.overall === 'number') ? d.scores.overall : 50;
        var percent = Math.round((obligationRate * 0.6 * 100) + (trustOverall * 0.4));
        percent = Math.min(100, Math.max(0, percent));
        var tier = percent >= 80 ? 'resonant' : percent >= 60 ? 'alive' : percent >= 40 ? 'growing' : percent >= 20 ? 'stirring' : 'first-step';
        _trustScores = d.success ? d.scores : null;
        fetch(GAMES_URL, { method: 'POST', body: JSON.stringify({ action: 'getTrustCertificate', memberId: _memberId }) })
        .then(function(cr) { return cr.json(); })
        .then(function(cd) {
          var certified = cd && cd.certified;
          contribCont.innerHTML = buildAlivenessRow({ alivenessLabel: tier, alivenessPercent: percent, witnessCount: 0 }, _lang);
          var tsc = document.getElementById('pwsTrustScoreCascade');
          if (tsc) tsc.innerHTML = renderTrustScoreCard(_trustScores, certified);
        })
        .catch(function() {
          contribCont.innerHTML = buildAlivenessRow({ alivenessLabel: tier, alivenessPercent: percent, witnessCount: 0 }, _lang);
        });
      })
      .catch(function() {
        var percent = Math.round(obligationRate * 100);
        var tier = percent >= 80 ? 'resonant' : percent >= 60 ? 'alive' : percent >= 40 ? 'growing' : percent >= 20 ? 'stirring' : 'first-step';
        contribCont.innerHTML = buildAlivenessRow({ alivenessLabel: tier, alivenessPercent: percent, witnessCount: 0 }, _lang);
      });
    }
  }

  window.pwsToggleObs = function pwsToggleObs(idx) {
    if (!_obsData || !_obsData.confirmedObs) return;
    var ob = _obsData.confirmedObs[idx]; if (!ob) return;
    var states = ['not-started', 'in-progress', 'crushing'];
    ob.state = states[(states.indexOf(ob.state || 'not-started') + 1) % states.length];
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
      data: pwsStationPayload() });
    pwsRenderStationTile(); pwsRenderToolsTile(); pwsUpdateAccordionStatus();
  };

  window.pwsDeleteObs = function pwsDeleteObs(idx) {
    if (!_obsData || !_obsData.confirmedObs) return;
    _obsData.confirmedObs.splice(idx, 1);
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
      data: pwsStationPayload() });
    pwsRenderStationTile();
    pwsRenderToolsTile();
    pwsUpdateAccordionStatus();
  };

  function pwsRenderToolsTile() {
    var container = document.getElementById('pwsToolCards');
    if (!container) return;
    if (!_toolsData || !_toolsData.confirmedTools || !_toolsData.confirmedTools.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">No tools configured yet. Complete My Tools &amp; Entertainment in Studio first.</span><span class="es">A\u00fan no hay herramientas configuradas.</span></p><button class="pws-goto-studio-btn" onclick="window.top.location.href=\u0027/studio\u0027"><span class="en">\u2192 Go to Studio</span><span class="es">\u2192 Ir al Studio</span></button></div>';
      pwsUpdateSavedLabel('pwsToolsSaved', null); return;
    }
    var validTools = _toolsData.confirmedTools.filter(pwsIsValidTool);
    if (!validTools.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">No tools configured yet.</span><span class="es">A\u00fan no hay herramientas.</span></p><button class="pws-goto-studio-btn" onclick="window.top.location.href=\u0027/studio\u0027"><span class="en">\u2192 Go to Studio</span><span class="es">\u2192 Ir al Studio</span></button></div>';
      pwsUpdateSavedLabel('pwsToolsSaved', _toolsData.lastSavedAt); return;
    }
    var allWindowsComplete = _adherenceData && _adherenceData.allWindowsComplete === true;
    container.innerHTML = '';
    // v96: the Foundry door -- stages get exit signs, not saw tables (S1/S2).
    var foundryDoor = document.createElement('div');
    foundryDoor.style.cssText = 'text-align:right;margin:0 0 10px 0;';
    foundryDoor.innerHTML = '<a href="/todos?create=tool" style="font-family:Cinzel,serif;font-size:16px !important;letter-spacing:0.14em;text-transform:uppercase;color:#c8a84b;text-decoration:none;border:1px solid rgba(200,168,75,0.5);border-radius:3px;padding:7px 14px;display:inline-block;"><span class="en">+ New Activity Tool \u2192</span><span class="es">+ Nueva Herramienta \u2192</span></a>';
    container.appendChild(foundryDoor);

    // -------------------------------------------------------
    // Show the member's named system at the top of the tile.
    // -------------------------------------------------------
    if (_toolsData.templateName) {
      var nameHeader = document.createElement('div');
      nameHeader.style.cssText = 'font-family:\'Cinzel\',serif;font-size:20px !important;letter-spacing:0.18em;color:rgba(200,168,75,0.75);text-transform:uppercase;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid rgba(200,168,75,0.15);display:flex;align-items:center;justify-content:space-between;';
      nameHeader.innerHTML = '<span>\u2605 ' + escHtml(_toolsData.templateName) + '</span>'
        + '<button id="pwsRenameSystemBtn" style="font-family:\'Cinzel\',serif;font-size:13px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(200,168,75,0.4);background:transparent;border:none;cursor:pointer;padding:2px 6px;" title="Rename">'
        + '<span class="en">Rename</span><span class="es">Renombrar</span>'
        + '</button>';
      container.appendChild(nameHeader);
      pwsApplyLang();
      var renameBtn = document.getElementById('pwsRenameSystemBtn');
      if (renameBtn) {
        renameBtn.addEventListener('click', function() {
          _toolsData.templateName = null;
          pwsShowTemplateNamingPrompt();
          pwsRenderToolsTile();
        });
      }
    }

    /* ── Group talent tools by obligation ──────────────────────────────
       Talent tools (isTalent === true) sharing the same obligation string
       render as ONE grouped card with all their tool buttons inside.
       Non-talent tools render as individual cards exactly as before.
    ──────────────────────────────────────────────────────────────────── */

    var talentGroups = {};
    var talentGroupOrder = [];
    var nonTalentTools = [];

    validTools.forEach(function(t, idx) {
      if (t.isTalent === true || t.type === 'talent') {
        var obl = t.obligation || 'My Project';
        if (!talentGroups[obl]) {
          talentGroups[obl] = { obligation: obl, tools: [] };
          talentGroupOrder.push(obl);
        }
        talentGroups[obl].tools.push({ tool: t, validIdx: idx });
      } else {
        nonTalentTools.push({ tool: t, validIdx: idx });
      }
    });

    talentGroupOrder.forEach(function(obl) {
      var group = talentGroups[obl];
      var isMainProject = group.tools.length > 0 && (group.tools[0].tool.type === 'main' ||
        (_twsProject && _twsProject.title === obl && _twsProject.type === 'main'));
      var configuredCount = group.tools.filter(function(item) { return item.tool.configured === true; }).length;
      var subtitle = configuredCount === group.tools.length
        ? (_lang === 'es' ? 'Todo configurado' : 'All configured')
        : (configuredCount + ' of ' + group.tools.length + (_lang === 'es' ? ' configurados' : ' configured'));

      var groupCard = document.createElement('div');
      groupCard.className = 'pws-tool-card unlocked';
      groupCard.style.position = 'relative';
      if (isMainProject) { groupCard.style.borderColor = 'rgba(200,168,75,0.55)'; }

      var lockDiv = document.createElement('div');
      lockDiv.className = 'pws-tool-lock';
      var lockIcon = document.createElement('div');
      lockIcon.className = 'pws-tool-lock-icon';
      lockDiv.appendChild(lockIcon);
      groupCard.appendChild(lockDiv);

      var infoDiv = document.createElement('div');
      infoDiv.className = 'pws-tool-info';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'pws-tool-name';
      if (isMainProject) { nameDiv.style.color = '#c8a84b'; }
      nameDiv.textContent = obl;
      var oblDiv = document.createElement('div');
      oblDiv.className = 'pws-tool-obligation';
      oblDiv.textContent = subtitle;
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(oblDiv);
      groupCard.appendChild(infoDiv);

      var actionDiv = document.createElement('div');
      actionDiv.className = 'pws-tool-action';
      var activateBtn = document.createElement('button');
      activateBtn.className = 'pws-tool-open-btn';
      activateBtn.innerHTML = '<span class="en">Activate</span><span class="es">Activar</span>';
      var firstValidIdx = group.tools[0].validIdx;
      (function(vi) {
        activateBtn.addEventListener('click', function() { pwsOpenUse(vi); });
      }(firstValidIdx));
      actionDiv.appendChild(activateBtn);
      groupCard.appendChild(actionDiv);

      var delGroupBtn = document.createElement('button');
      delGroupBtn.className = 'pws-tool-delete-btn';
      delGroupBtn.textContent = '\u2715';
      delGroupBtn.title = _lang === 'es' ? 'Eliminar proyecto' : 'Remove project tools';
      delGroupBtn.addEventListener('click', function(ev) {
        ev.stopPropagation();
        _toolsData.confirmedTools = _toolsData.confirmedTools.filter(function(ct) {
          return !(ct.obligation === obl && (ct.isTalent === true || ct.type === 'talent'));
        });
        post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
          data: pwsToolsPayload() });
        pwsRenderToolsTile();
      });
      groupCard.appendChild(delGroupBtn);

      container.appendChild(groupCard);
    });

    nonTalentTools.forEach(function(item) {
      var t = item.tool;
      var idx = item.validIdx;
      var shortTitle = pwsShortTitle(t.en || '');
      var level = t.surrogateLevel || 'alone';
      var isIndependent = (level === 'alone' || level === 'surrogate-alone');
      var isCheck = (level === 'check' || level === 'surrogate-check');
      var isFull = (level === 'full' || level === 'surrogate-full');
      var isUnlocked = isIndependent || (isCheck && allWindowsComplete) || (isFull && pwsIsToolUnlocked(t));

      var card = document.createElement('div');
      card.className = 'pws-tool-card' + (isUnlocked ? ' unlocked' : '');
      card.setAttribute('data-tool-idx', idx);

      var lockDiv = document.createElement('div');
      lockDiv.className = 'pws-tool-lock';
      var lockIcon = document.createElement('div');
      lockIcon.className = 'pws-tool-lock-icon';
      lockDiv.appendChild(lockIcon);
      card.appendChild(lockDiv);

      var infoDiv = document.createElement('div');
      infoDiv.className = 'pws-tool-info';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'pws-tool-name' + (t._oblDirty ? ' pws-tool-name-dim' : '');
      nameDiv.textContent = t._oblDirty ? 'Obligation unclear' : (t.obligation || shortTitle);
      var oblDiv = document.createElement('div');
      oblDiv.className = 'pws-tool-obligation';
      oblDiv.textContent = shortTitle;
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(oblDiv);
      card.appendChild(infoDiv);

      var actionDiv = document.createElement('div');
      actionDiv.className = 'pws-tool-action';
      if (isUnlocked) {
        var openBtn = document.createElement('button');
        openBtn.className = 'pws-tool-open-btn';
        var isConfigured = t.configured === true;
        openBtn.innerHTML = isConfigured
          ? '<span class="en">&#9654; Launch</span><span class="es">&#9654; Lanzar</span>'
          : '<span class="en">Activate</span><span class="es">Activar</span>';
        if (isConfigured) { openBtn.style.cssText = 'background:rgba(200,168,75,0.18);border:1px solid rgba(200,168,75,0.6);color:#f0e6cc;'; }
        (function(i) { openBtn.addEventListener('click', function() { pwsOpenUse(i, isConfigured); }); }(idx));
        actionDiv.appendChild(openBtn);
      } else if (isFull) {
        var unlockBtn = document.createElement('button');
        unlockBtn.className = 'pws-tool-unlock-btn';
        unlockBtn.innerHTML = '<span class="en">Talk to Doc B</span><span class="es">Habla con Doc B</span>';
        (function(i) { unlockBtn.addEventListener('click', function() { pwsOpenUnlock(i); }); }(idx));
        actionDiv.appendChild(unlockBtn);
      } else {
        var lockedLabel = document.createElement('div');
        lockedLabel.className = 'pws-tool-locked-label';
        lockedLabel.innerHTML = '<span class="en">Keep crushing it</span><span class="es">Sigue adelante</span>';
        actionDiv.appendChild(lockedLabel);
      }
      card.appendChild(actionDiv);

      var delBtn = document.createElement('button');
      delBtn.className = 'pws-tool-delete-btn';
      delBtn.textContent = '\u2715';
      delBtn.title = _lang === 'es' ? 'Eliminar herramienta' : 'Remove tool';
      (function(i) {
        delBtn.addEventListener('click', function(ev) {
          ev.stopPropagation();
          _toolsData.confirmedTools.splice(i, 1);
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
          pwsRenderToolsTile();
        });
      }(idx));
      card.appendChild(delBtn);

      container.appendChild(card);
    });

    pwsUpdateSavedLabel('pwsToolsSaved', _toolsData.lastSavedAt);

    // ── LOCKED BOTTOM ROW: appended after the grid, not inside it ──
    var existingLocked = container.parentNode ? container.parentNode.querySelector('.pws-locked-row') : null;
    if (existingLocked) existingLocked.parentNode.removeChild(existingLocked);

    var lockedRow = document.createElement('div');
    lockedRow.className = 'pws-locked-row';
    lockedRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;';

    // EC card
    var ecTile = document.createElement('div');
    ecTile.style.cssText = 'background:#8B0000;border:1px solid #c8a84b;cursor:pointer;padding:0;overflow:hidden;border-radius:4px;';
    ecTile.addEventListener('click', function() { pwsOpenDeparture('/music', _lang === 'es' ? 'Centro de Entretenimiento' : 'Entertainment Center'); });
    var ecSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ecSvg.setAttribute('viewBox', '0 0 300 120');
    ecSvg.setAttribute('width', '100%');
    ecSvg.setAttribute('height', '120');
    ecSvg.innerHTML =
      '<rect x="0" y="0" width="300" height="120" fill="#8B0000"/>' +
      '<rect x="8" y="8" width="284" height="104" fill="none" stroke="#c8a84b" stroke-width="0.75"/>' +
      '<line x1="8" y1="8" x2="24" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="8" x2="8" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="8" x2="276" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="8" x2="292" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="8" y1="112" x2="24" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="112" x2="8" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="112" x2="276" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="112" x2="292" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<polygon points="150,16 153,24 161,24 155,29 157,37 150,32 143,37 145,29 139,24 147,24" fill="#c8a84b" opacity="0.9"/>' +
      '<polygon points="150,104 153,96 161,96 155,91 157,83 150,88 143,83 145,91 139,96 147,96" fill="#c8a84b" opacity="0.9"/>' +
      '<text x="150" y="68" font-family="Cinzel,serif" font-size="22" font-weight="900" fill="#f0e6cc" text-anchor="middle" letter-spacing="6">ENTERTAINMENT CENTER</text>';
    ecTile.appendChild(ecSvg);

    // Smart Day card
    var sdTile = document.createElement('div');
    sdTile.style.cssText = 'background:#0a1525;border:1px solid #c8a84b;cursor:pointer;padding:0;overflow:hidden;border-radius:4px;box-shadow:0 0 14px rgba(139,26,26,0.35);';
    sdTile.addEventListener('click', function() { window.location.href = '/todos'; });
    var sdSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sdSvg.setAttribute('viewBox', '0 0 300 120');
    sdSvg.setAttribute('width', '100%');
    sdSvg.setAttribute('height', '120');
    sdSvg.innerHTML =
      '<image href="https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1784260716989-WW09UBO4IAM0LA51BNX7/unsplash-image-aw9cszR7FGU.jpg?format=300w" x="0" y="0" width="300" height="120" preserveAspectRatio="xMidYMid slice" opacity="0.35"/>' +
      '<rect x="8" y="8" width="284" height="104" fill="none" stroke="#c8a84b" stroke-width="0.75"/>' +
      '<line x1="8" y1="8" x2="24" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="8" x2="8" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="8" x2="276" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="8" x2="292" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="8" y1="112" x2="24" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="112" x2="8" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="112" x2="276" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="112" x2="292" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<polygon points="150,16 153,24 161,24 155,29 157,37 150,32 143,37 145,29 139,24 147,24" fill="#c8a84b" opacity="0.9"/>' +
      '<polygon points="150,104 153,96 161,96 155,91 157,83 150,88 143,83 145,91 139,96 147,96" fill="#c8a84b" opacity="0.9"/>' +
      '<text x="150" y="68" font-family="Cinzel,serif" font-size="22" font-weight="900" fill="#f0e6cc" text-anchor="middle" letter-spacing="6">SMART DAY</text>';
    sdTile.appendChild(sdSvg);

    lockedRow.appendChild(ecTile);
    lockedRow.appendChild(sdTile);
    if (container.parentNode) container.parentNode.appendChild(lockedRow);
  }

  var _unlockedTools = {};
  function pwsIsToolUnlocked(t) { var key = (t.obligation || '') + '|' + (t.en || ''); return !!_unlockedTools[key]; }
  function pwsMarkToolUnlocked(t) { var key = (t.obligation || '') + '|' + (t.en || ''); _unlockedTools[key] = true; }

  // v104.3 THE CANONICAL STATION PAYLOAD -- every pwsSaveStation goes
  // through here. Three of seven save paths were omitting _lastResetDate,
  // and the boot reset keys off that field: tap a dot by hand, the toggle
  // saved your dots WITHOUT the stamp, next load read it as empty, decided
  // a new day had begun, and wiped every dot back to not-started. Each
  // hand-set dot armed the reset that erased it. A field any call site can
  // silently drop will be dropped again, so there is now exactly one door.
  function pwsStationPayload(extra) {
    var d = _obsData || {};
    var p = {
      confirmedObs:   d.confirmedObs || [],
      hateList:       d.hateList     || [],
      wishList:       d.wishList     || [],
      whatMatters:    d.whatMatters  || '',
      _lastResetDate: d._lastResetDate || pwsLocalDate()
    };
    if (extra) {
      for (var k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) p[k] = extra[k];
      }
    }
    return p;
  }

  // Helper: build the canonical tools save payload (always includes templateName)
  function pwsToolsPayload() {
    return {
      confirmedTools:  _toolsData ? (_toolsData.confirmedTools || []) : [],
      addedToolNames:  _toolsData ? (_toolsData.addedToolNames  || []) : [],
      _items:          _toolsData ? (_toolsData._items           || []) : [],
      _projectActivities: _toolsData ? (_toolsData._projectActivities || {}) : {},
      templateName:    _toolsData ? (_toolsData.templateName    || '') : ''
    };
  }

  function pwsShortTitle(rec) {
    var s = (rec || '').replace(/^(I'd suggest|Try|Use|Consider|How about|Check out)\s+/i, '');
    var cut = s.search(/[.,:;!?\n]/);
    var t = (cut > 0 && cut < 60) ? s.substring(0, cut) : s.substring(0, 50);
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function pwsRenderDayTile() {
    var container = document.getElementById('pwsDayList');
    var todosCont = document.getElementById('pwsDayTodos');
    if (!container) return;
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">No schedule yet. Go to Contributions.</span><span class="es">Sin horario. Ve a Contribuciones.</span></p><button class="pws-goto-studio-btn" onclick="var c=document.getElementById(\u0027pwsAccordionRespect\u0027);if(c){c.classList.add(\u0027open\u0027);c.scrollIntoView({behavior:\u0027smooth\u0027,block:\u0027start\u0027});}"><span class="en">\u2192 Go to My Contributions</span><span class="es">\u2192 Ir a Mis Contribuciones</span></button></div>';
      if (todosCont) todosCont.innerHTML = ''; return;
    }
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var current = pwsFindCurrentWindow(schedule);
    var bookendHTML = '';
    if (_dayData.wakeTime || _dayData.bedTime) {
      bookendHTML = '<div class="pws-day-bookends">' +
        (_dayData.wakeTime ? '<span class="pws-day-bookend"><span class="en">Wake: </span><span class="es">Despertar: </span>' + escHtml(_dayData.wakeTime) + '</span>' : '') +
        (_dayData.bedTime ? '<span class="pws-day-bookend"><span class="en">Wind down: </span><span class="es">Relajarse: </span>' + escHtml(_dayData.bedTime) + '</span>' : '') + '</div>';
    }
    var planItems = [];
    schedule.forEach(function(s, idx) { planItems.push({ s: s, idx: idx }); });
    var planNum = 0;
    var planRowsHTML = planItems.map(function(entry) {
      var s = entry.s, idx = entry.idx;
      planNum++;
      var isCurrent = current && s.label === current.label;
      var checkedIn = s._checkedIn || '';
      var timeStr = escHtml(fmtTime(s.derivedTime || s.time || ''));
      var hasObl = false;
      var launchIdx = -1;
      var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
      var sLabel = (s.label || s.activity || '').toLowerCase().trim();
      for (var ti = 0; ti < validTools.length; ti++) {
        var tLabel = (validTools[ti].label || validTools[ti].obligation || validTools[ti].en || '').toLowerCase().trim();
        var tObl   = (validTools[ti].obligation || validTools[ti].label || validTools[ti].en || '').toLowerCase().trim();
        var slotWords = sLabel.replace(/[^a-z\s]/g, '').split(/\s+/).filter(function(w) { return w.length > 3; });
        var toolWords = tObl.replace(/[^a-z\s]/g, '').split(/\s+/).filter(function(w) { return w.length > 3; });
        var hasOverlap = slotWords.some(function(sw) { return toolWords.indexOf(sw) !== -1; });
        if (sLabel && (sLabel === tLabel || sLabel === tObl || hasOverlap)) {
          hasObl    = true;
          launchIdx = ti;
          break;
        }
      }
      var hasNote = s.note && s.note.trim();
      var noteIndicator = hasNote ? '<span class="pws-note-indicator" title="Note">&#x270E;</span>' : '';
      var isGaming = (s.type === 'gaming' || /game/i.test(s.label || ''));
      var isMasterySlot = s.isMastery === true;
      var hasMusicalChem = /focus|flow|calm|energy/i.test(s.chem || '');
      var checkinHTML = '';
      if (s.isProjectSlot) {
        checkinHTML = '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
          '<button class="pws-day-launch-btn" onclick="event.stopPropagation();var c=document.getElementById(\'pwsAccordionTalent\');if(c){c.classList.add(\'open\');c.scrollIntoView({behavior:\'smooth\',block:\'start\'});}">' +
          '<span class="en">&#9654; Go to My Project</span><span class="es">&#9654; Ir a Mi Proyecto</span></button></div>';
      } else if (isMasterySlot) {
        var mStage = s.masteryStage || 1;
        var mStageLabel = ['', 'Discovery', 'Practice', 'Competence', 'Automaticity'][mStage] || '';
        var mProjId = escHtml(s.projectId || '');
        checkinHTML = '<div class="pws-plan-seq-meta" style="color:rgba(200,168,75,0.7);">Stage ' + mStage + ': ' + mStageLabel + '</div>' +
          '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
          '<button class="pws-day-launch-btn" data-mastery-checkin="1" data-mastery-idx="' + idx + '" data-mastery-stage="' + mStage + '" data-mastery-projid="' + mProjId + '">' +
          '<span class="en">\u2713 Check In</span><span class="es">\u2713 Reportar</span></button></div>';
      } else if (isGaming) {
        var counts = pwsCountContributions();
        var allDone = counts.total > 0 && counts.crushing === counts.total;
        if (allDone) {
          checkinHTML = '<div class="pws-checkin-row"><button class="pws-gaming-play-btn" data-gaming-play="scheduled"><span class="en">&#9654; Play Games</span><span class="es">&#9654; Jugar</span></button></div>';
        } else {
          checkinHTML = '<div class="pws-checkin-row" onclick="event.stopPropagation();"><span class="pws-gaming-locked-tag"><span class="en">Almost there \u2014 finish your day</span><span class="es">Ya casi \u2014 termina tu d\u00eda</span></span></div>';
        }
      } else {
        checkinHTML = '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
        '<button class="pws-checkin-btn done' + (checkedIn === 'done' ? ' checked' : '') + '" onclick="pwsCheckinByLabel(' + JSON.stringify(s.label).replace(/"/g, '&quot;') + ',\'done\')"><span class="en">Done</span><span class="es">Listo</span></button>' +
        '<button class="pws-checkin-btn missed' + (checkedIn === 'missed' ? ' checked' : '') + '" onclick="pwsCheckinByLabel(' + JSON.stringify(s.label).replace(/"/g, '&quot;') + ',\'missed\')"><span class="en">Missed</span><span class="es">Me lo salt\u00e9</span></button></div>';
      }
      var winCfgKey = s.label || '';
      var winCfg = _windowConfig && winCfgKey && _windowConfig[winCfgKey] ? _windowConfig[winCfgKey] : null;
      if (s.isTodo) {
        var todoUrl = '/todos?open=' + encodeURIComponent(s.label || '');
        checkinHTML += '<div class="pws-checkin-row" style="margin-top:4px !important;"><button class="pws-day-launch-btn" data-todo-url="' + encodeURIComponent(s.label || '') + '"><span class="en">&#9654; Open in Todos</span><span class="es">&#9654; Abrir en Tareas</span></button></div>';
      } else if (hasObl) {
        checkinHTML += '<div class="pws-checkin-row" style="margin-top:4px !important;"><button class="pws-day-launch-btn" data-launch-tool="' + launchIdx + '" data-obligation="' + escHtml(validTools[launchIdx] ? (validTools[launchIdx].obligation || validTools[launchIdx].en || '') : '') + '"><span class="en">&#9654; Launch</span><span class="es">&#9654; Lanzar</span></button></div>';
      } else if (winCfg) {
        checkinHTML += '<div class="pws-checkin-row" style="margin-top:4px !important;"><button class="pws-day-launch-btn" data-launch-window="' + escHtml(winCfgKey) + '"><span class="en">&#9654; Launch</span><span class="es">&#9654; Lanzar</span></button></div>';
      }
      var fsIdx = _dayData.finalSchedule.indexOf(s);
      return '<div class="pws-plan-seq-row' + (isCurrent ? ' current-window' : '') + '" draggable="true" data-idx="' + fsIdx + '">' +
        '<div class="pws-drag-handle" draggable="false">&#x2261;</div><div class="pws-plan-seq-num">' + planNum + '</div>' +
        '<div class="pws-seq-arrows"><button type="button" class="pws-seq-arrow" onclick="pwsSeqMove(' + fsIdx + ',-1);event.stopPropagation();" aria-label="Move up">&#9650;</button><button type="button" class="pws-seq-arrow" onclick="pwsSeqMove(' + fsIdx + ',1);event.stopPropagation();" aria-label="Move down">&#9660;</button></div>' +
        '<div class="pws-plan-seq-body">' +
        '<div class="pws-plan-seq-label" onclick="pwsToggleNote(' + idx + ');event.stopPropagation();">' + escHtml(s.label || '') + (s.isTodo ? '<span class="pws-todo-badge"> TODO</span>' : '') + noteIndicator + '</div>' +
        (s.chem ? '<div class="pws-plan-seq-meta">' + escHtml(s.chem) + (isCurrent ? ' \u2014 <span class="en">Now</span><span class="es">Ahora</span>' : '') + (timeStr ? ' \u00b7 ' + timeStr : '') + '</div>' : (timeStr ? '<div class="pws-plan-seq-meta">' + timeStr + '</div>' : '')) +
        checkinHTML +
        '<div class="pws-item-note-wrap" id="pwsNoteWrap' + idx + '" onclick="event.stopPropagation();"><textarea class="pws-item-note" id="pwsNote' + idx + '" rows="2" placeholder="Add a note \u2014 phone number, link, agenda...">' + escHtml(s.note || '') + '</textarea>' + (function() {
          // v97 UNIFICATION: one picker, one question -- "What does this serve?"
          // Registry contributions first (cid -> dot crush + split engine),
          // the four bare laws beneath (bar credit only), mint door at bottom.
          // Contribution link wins precedence; the handler makes it physical.
          var es97 = (_lang === 'es');
          var lawVal = (s.lawTag === 'talent' || s.lawTag === 'respect' || s.lawTag === 'responsibility' || s.lawTag === 'limits') ? s.lawTag : '';
          var curCid = s.contributionCid || '';
          var legacyIdx = (s.contributionId !== undefined && s.contributionId !== null) ? parseInt(s.contributionId, 10) : -1;
          var hasLink = !!curCid || legacyIdx >= 0;
          var h = '<select data-serves-select="' + fsIdx + '" style="margin-top:6px;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.25);border-radius:3px;color:#c8a84b;font-family:Cinzel,serif;font-size:15px;letter-spacing:0.08em;padding:5px 8px;max-width:100%;">';
          h += '<option value=""' + (!hasLink && !lawVal ? ' selected' : '') + '>' + (es97 ? '\u2014 \u00bfA qu\u00e9 sirve? \u2014' : '\u2014 What does this serve? \u2014') + '</option>';
          var obs97 = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs : [];
          for (var ci97 = 0; ci97 < obs97.length; ci97++) {
            var ob97 = obs97[ci97]; if (!ob97) continue;
            var val97 = ob97.cid ? ob97.cid : ('idx_' + ci97);
            var sel97 = (curCid && ob97.cid === curCid) || (!curCid && legacyIdx === ci97);
            h += '<option value="' + escHtml(val97) + '"' + (sel97 ? ' selected' : '') + '>' + escHtml(ob97.text || ((es97 ? 'Contribuci\u00f3n ' : 'Contribution ') + (ci97 + 1))) + '</option>';
          }
          var laws97 = [['talent', 'Talent', 'Talento'], ['respect', 'Respect', 'Respeto'], ['responsibility', 'Responsibility', 'Responsabilidad'], ['limits', 'Limits', 'L\u00edmites']];
          for (var li = 0; li < laws97.length; li++) {
            h += '<option value="' + laws97[li][0] + '"' + (!hasLink && lawVal === laws97[li][0] ? ' selected' : '') + '>' + (es97 ? laws97[li][2] : laws97[li][1]) + '</option>';
          }
          h += '<option value="__mint__">' + (es97 ? '+ Nueva contribuci\u00f3n\u2026' : '+ New contribution\u2026') + '</option>';
          h += '</select>';
          h += '<div id="pwsServesMint' + fsIdx + '" style="display:none;margin-top:6px;">' +
            '<input type="text" id="pwsServesMintInput' + fsIdx + '" maxlength="120" placeholder="' + (es97 ? 'Nombra la contribuci\u00f3n\u2026' : 'Name the contribution\u2026') + '" style="width:100%;box-sizing:border-box;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.25);border-radius:4px;color:#f0e6cc;font-family:Cormorant Garamond,serif;font-size:18px;padding:10px 12px;outline:none;min-height:44px;">' +
            '<button id="pwsServesMintBtn' + fsIdx + '" onclick="pwsServesMint(' + fsIdx + ');event.stopPropagation();" style="width:100%;box-sizing:border-box;margin-top:8px;background:rgba(200,168,75,0.12);border:1px solid #c8a84b;border-radius:4px;color:#c8a84b;font-family:Cinzel,serif;font-size:16px;letter-spacing:0.12em;text-transform:uppercase;padding:10px 12px;cursor:pointer;min-height:44px;">' + (es97 ? 'Crear' : 'Create') + '</button>' +
            '<div id="pwsServesMintStatus' + fsIdx + '" style="font-family:Cormorant Garamond,serif;font-size:15px;color:rgba(240,230,204,0.6);margin-top:6px;min-height:18px;"></div>' +
          '</div>';
          // v98 EQUIPPING STANDARD clone: the window's wall, on the stage.
          // Same window_config keys as todos_v31 -- files/links/contacts/
          // reminders/reminderPhone -- one shape, two doors, zero migration.
          h += pwsEquipWallHTML(fsIdx, winCfg, es97);
          return h;
        })() + '</div>' +
        '</div></div>';
    }).join('');
    container.innerHTML = bookendHTML + '<div class="pws-day-section-label pws-accordion-section" style="text-align:center;"><span class="en">My Favorite Day</span><span class="es">Mi D\u00eda Favorito</span></div>' +
      (planRowsHTML || '<div class="pws-empty-state" style="padding:10px 0;"><span class="en pws-empty-msg">No scheduled items yet.</span><span class="es pws-empty-msg">Sin actividades programadas a\u00fan.</span></div>');
    pwsWireDrag(container);
    if (todosCont) { todosCont.innerHTML = ''; }
    pwsUpdateSavedLabel('pwsDaySaved', _dayData.lastSavedAt);
  }

  window.pwsToggleTodo = function pwsToggleTodo(checkbox, activityLabel) {
    var schedule = _dayData && _dayData.finalSchedule ? _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; }) : [];
    var item = schedule.filter(function(s){ return s.label === activityLabel; })[0];
    if (item) item._todoChecked = checkbox.checked;
    var row = checkbox.parentNode;
    if (row) { var txt = row.querySelector('.pws-todo-text'); if (txt) { if (checkbox.checked) txt.classList.add('checked'); else txt.classList.remove('checked'); } }
  };

  window.pwsCheckin = function pwsCheckin(idx, result) {
    if (idx < 0) return;
    if (!_dayData || !_dayData.finalSchedule) return;
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var item = schedule[idx]; if (!item) return;
    item._checkedIn = result;
    pwsSaveDaySchedule();
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: pwsLocalDate(), windowKey: 'label_' + (item.label || ('window_' + idx)).replace(/\s+/g, '_').toLowerCase(),
      activityLabel: item.label || ('window_' + idx), completed: result === 'done', note: '', lawTag: pwsLawTagFromSlot(item) });
    pwsRenderDayTile();
    pwsBehavioralCascade(item, result, schedule);
    var allChecked = schedule.filter(function(s) { return s._checkedIn; });
    var doneCount = schedule.filter(function(s) { return s._checkedIn === 'done'; }).length;
    if (allChecked.length === schedule.length) pwsAdherenceFeedback(doneCount, schedule.length);
  };

  window.pwsCheckinByLabel = function pwsCheckinByLabel(label, result) {
    if (window.FindME && window.FindME.chime && result) { window.FindME.chime('done'); }
    if (!_dayData || !_dayData.finalSchedule) return;
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var item = null;
    var idx = -1;
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].label === label) { item = schedule[i]; idx = i; break; }
    }
    if (!item) return;
    item._checkedIn = result;
    pwsSaveDaySchedule();
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: pwsLocalDate(), windowKey: 'label_' + (item.label || ('window_' + idx)).replace(/\s+/g, '_').toLowerCase(),
      activityLabel: item.label || ('window_' + idx), completed: result === 'done', note: '', lawTag: pwsLawTagFromSlot(item) });
    pwsRenderDayTile();
    pwsBehavioralCascade(item, result, schedule);
    var allChecked = schedule.filter(function(s) { return s._checkedIn; });
    var doneCount = schedule.filter(function(s) { return s._checkedIn === 'done'; }).length;
    if (allChecked.length === schedule.length) pwsAdherenceFeedback(doneCount, schedule.length);
  };

  // v97 UNIFICATION: mint door inside the serves picker. Ported from
  // /todos tdMintContribution (v28). Calls pwsAppendStation (Games URL,
  // idempotent -- duplicate text returns existing, never twins), adopts
  // the contribution locally, links the slot by cid, saves the day, and
  // re-renders so the new dot appears on the Contributions tile at once.
  window.pwsServesMint = function pwsServesMint(fsIdx) {
    var inp = document.getElementById('pwsServesMintInput' + fsIdx);
    var btn = document.getElementById('pwsServesMintBtn' + fsIdx);
    var st  = document.getElementById('pwsServesMintStatus' + fsIdx);
    if (!inp) return;
    var text = (inp.value || '').replace(/^\s+|\s+$/g, '');
    if (!text) { if (st) st.textContent = _lang === 'es' ? 'Escribe un nombre primero.' : 'Write a name first.'; return; }
    if (btn) btn.disabled = true;
    if (st)  st.textContent = _lang === 'es' ? 'Declarando\u2026' : 'Declaring\u2026';
    fetch(GAMES_URL, { method: 'POST', body: JSON.stringify({ action: 'pwsAppendStation', memberId: _memberId, text: text }) })
      .then(function(r){ return r.json(); })
      .then(function(d) {
        if (!d || !d.success || !d.contribution || !d.contribution.cid) {
          if (st)  st.textContent = _lang === 'es' ? 'No se pudo guardar. Intenta de nuevo.' : 'Could not save. Try again.';
          if (btn) btn.disabled = false;
          return;
        }
        var c = d.contribution;
        if (!_obsData) _obsData = { confirmedObs: [] };
        if (!_obsData.confirmedObs) _obsData.confirmedObs = [];
        var already = false;
        _obsData.confirmedObs.forEach(function(ob) { if (ob && ob.cid === c.cid) already = true; });
        if (!already) _obsData.confirmedObs.push(c);
        var slot = (_dayData && _dayData.finalSchedule) ? _dayData.finalSchedule[fsIdx] : null;
        if (slot) {
          slot.contributionCid = c.cid;
          delete slot.contributionId;
          delete slot.lawTag;
          pwsSaveDaySchedule();
        }
        pwsRenderStationTile();
        pwsRenderToolsTile();
        pwsRenderDayTile();
      })
      .catch(function() {
        if (st)  st.textContent = _lang === 'es' ? 'Error de conexi\u00f3n.' : 'Connection error.';
        if (btn) btn.disabled = false;
      });
  };

  // ── v98 EQUIPPING STANDARD — the wall, cloned from todos_v31 ─────────
  // The Racked Promise on the stage: every drawer shows what the window
  // owns -- Shelf, Links, Contacts, Alarms -- reading the SAME
  // window_config keys the workshop writes. Rack here, see it there.
  // Sticky Config law: every act below writes into the window's own
  // config. Bytes live in Drive (PWSFiles.gs, Main 223); the sheet racks
  // only {fileId, name, viewUrl}.

  var PWS_EQ_ROW  = 'display:flex;align-items:center;gap:8px;margin-top:6px;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.2);border-radius:4px;padding:8px 10px;';
  var PWS_EQ_HDR  = 'font-family:Cinzel,serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(200,168,75,0.7);margin-top:14px;';
  var PWS_EQ_A    = 'flex:1;color:#c8a84b;font-family:Cormorant Garamond,serif;font-size:18px;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-height:28px;display:flex;align-items:center;';
  var PWS_EQ_TXT  = 'flex:1;color:#f0e6cc;font-family:Cormorant Garamond,serif;font-size:18px;';
  var PWS_EQ_X    = 'background:none;border:1px solid rgba(200,168,75,0.25);border-radius:4px;color:rgba(240,230,204,0.6);cursor:pointer;min-width:34px;min-height:34px;font-size:15px;';
  var PWS_EQ_BTN  = 'width:100%;box-sizing:border-box;margin-top:6px;background:rgba(200,168,75,0.12);border:1px solid #c8a84b;border-radius:4px;color:#c8a84b;font-family:Cinzel,serif;font-size:15px;letter-spacing:0.12em;text-transform:uppercase;padding:9px 12px;cursor:pointer;min-height:44px;';
  var PWS_EQ_IN   = 'width:100%;box-sizing:border-box;margin-top:6px;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.25);border-radius:4px;color:#f0e6cc;font-family:Cormorant Garamond,serif;font-size:18px;padding:10px 12px;outline:none;min-height:44px;';
  var PWS_EQ_DIM  = 'font-family:Cormorant Garamond,serif;font-size:14px;color:rgba(240,230,204,0.45);margin-top:4px;';

  function pwsEquipWallHTML(fsIdx, cfg, es) {
    cfg = cfg || {};
    var h = '';
    // Shelf
    h += '<div style="' + PWS_EQ_HDR + '">' + (es ? 'En el estante' : 'On the shelf') + '</div>';
    var files = cfg.files || [];
    if (!files.length) {
      h += '<div style="' + PWS_EQ_DIM + '">' + (es ? 'Nada guardado a\u00fan.' : 'Nothing racked yet.') + '</div>';
    }
    for (var fi = 0; fi < files.length; fi++) {
      var f = files[fi]; if (!f) continue;
      h += '<div style="' + PWS_EQ_ROW + '"><a href="' + escHtml(f.viewUrl || '#') + '" target="_blank" rel="noopener" style="' + PWS_EQ_A + '">\uD83D\uDCC4 ' + escHtml(f.name || 'file') + '</a><button onclick="pwsEquipRemove(\'file\',' + fsIdx + ',' + fi + ');event.stopPropagation();" style="' + PWS_EQ_X + '">\u2715</button></div>';
    }
    h += '<input type="file" id="pwsEquipFile' + fsIdx + '" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.webp" style="display:none;" onchange="pwsEquipFileChosen(' + fsIdx + ',this)">';
    h += '<button onclick="document.getElementById(\'pwsEquipFile' + fsIdx + '\').click();event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? '+ Agregar Archivo' : '+ Add File') + '</button>';
    h += '<div id="pwsEquipFileStatus' + fsIdx + '" style="' + PWS_EQ_DIM + 'min-height:16px;"></div>';
    // Links
    h += '<div style="' + PWS_EQ_HDR + '">' + (es ? 'Enlaces' : 'Links') + '</div>';
    var links = cfg.links || [];
    for (var li2 = 0; li2 < links.length; li2++) {
      var lk = links[li2]; if (!lk) continue;
      var lUrl = lk.url || (typeof lk === 'string' ? lk : ''); if (!lUrl) continue;
      h += '<div style="' + PWS_EQ_ROW + '"><a href="' + escHtml(lUrl) + '" target="_blank" rel="noopener" style="' + PWS_EQ_A + '">\uD83D\uDD17 ' + escHtml(lk.name || lUrl) + '</a><button onclick="pwsEquipRemove(\'link\',' + fsIdx + ',' + li2 + ');event.stopPropagation();" style="' + PWS_EQ_X + '">\u2715</button></div>';
    }
    h += '<div id="pwsEquipLinkForm' + fsIdx + '" style="display:none;">' +
      '<input type="text" id="pwsEquipLinkName' + fsIdx + '" placeholder="' + (es ? 'Nombre (opcional)' : 'Name (optional)') + '" style="' + PWS_EQ_IN + '">' +
      '<input type="text" id="pwsEquipLinkUrl' + fsIdx + '" placeholder="https://\u2026" style="' + PWS_EQ_IN + '">' +
      '<button onclick="pwsEquipSaveLink(' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? 'Guardar Enlace' : 'Save Link') + '</button></div>';
    h += '<button onclick="pwsEquipToggle(\'Link\',' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? '+ Agregar Enlace' : '+ Add Link') + '</button>';
    // Entertainment (v101: the wall's fifth panel -- same ecLinks store todos writes)
    h += '<div style="' + PWS_EQ_HDR + '">' + (es ? 'Entretenimiento' : 'Entertainment') + '</div>';
    var ecl = cfg.ecLinks || [];
    if (!ecl.length) h += '<div style="' + PWS_EQ_DIM + '">' + (es ? 'Sin enlaces guardados.' : 'No saved links yet.') + '</div>';
    for (var ei2 = 0; ei2 < ecl.length; ei2++) {
      var ec2 = ecl[ei2]; if (!ec2 || !ec2.url) continue;
      h += '<div style="' + PWS_EQ_ROW + '"><a href="' + escHtml(ec2.url) + '" target="_blank" rel="noopener" style="' + PWS_EQ_A + '">' + (ec2.icon || '\uD83D\uDD17') + ' ' + escHtml(ec2.label || ec2.url) + '</a><button onclick="pwsEquipRemove(\'ec\',' + fsIdx + ',' + ei2 + ');event.stopPropagation();" style="' + PWS_EQ_X + '">\u2715</button></div>';
    }
    h += '<div id="pwsEquipECForm' + fsIdx + '" style="display:none;">' +
      '<select id="pwsEquipECCat' + fsIdx + '" style="' + PWS_EQ_IN + 'cursor:pointer;">' +
        '<option value="music">\uD83C\uDFB5 ' + (es ? 'M\u00fasica' : 'Music') + '</option>' +
        '<option value="games">\uD83C\uDFAE ' + (es ? 'Juegos' : 'Games') + '</option>' +
        '<option value="news">\uD83D\uDCFA ' + (es ? 'Noticias' : 'News') + '</option>' +
        '<option value="other">\uD83D\uDD17 ' + (es ? 'Otro' : 'Other') + '</option></select>' +
      '<input type="text" id="pwsEquipECUrl' + fsIdx + '" placeholder="https://\u2026" style="' + PWS_EQ_IN + '">' +
      '<input type="text" id="pwsEquipECName' + fsIdx + '" placeholder="' + (es ? 'Nombre (opcional)' : 'Name (optional)') + '" style="' + PWS_EQ_IN + '">' +
      '<button onclick="pwsEquipSaveEC(' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? 'Guardar' : 'Save') + '</button></div>';
    h += '<button onclick="pwsEquipToggle(\'EC\',' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? '+ Agregar Entretenimiento' : '+ Add Entertainment') + '</button>';
    // Contacts
    h += '<div style="' + PWS_EQ_HDR + '">' + (es ? 'Contactos' : 'Contacts') + '</div>';
    var contacts = cfg.contacts || [];
    for (var ci2 = 0; ci2 < contacts.length; ci2++) {
      var c = contacts[ci2]; if (!c) continue;
      var tel = c.phone ? ('tel:' + String(c.phone).replace(/[^0-9+]/g, '')) : '';
      if (tel) {
        h += '<div style="' + PWS_EQ_ROW + '"><a href="' + tel + '" style="' + PWS_EQ_A + '">\uD83D\uDCDE ' + escHtml(c.name || c.phone || '') + '</a><button onclick="pwsEquipRemove(\'contact\',' + fsIdx + ',' + ci2 + ');event.stopPropagation();" style="' + PWS_EQ_X + '">\u2715</button></div>';
      } else {
        h += '<div style="' + PWS_EQ_ROW + '"><div style="' + PWS_EQ_TXT + '">\uD83D\uDCDE ' + escHtml(c.name || '') + '</div><button onclick="pwsEquipRemove(\'contact\',' + fsIdx + ',' + ci2 + ');event.stopPropagation();" style="' + PWS_EQ_X + '">\u2715</button></div>';
      }
    }
    h += '<div id="pwsEquipContactForm' + fsIdx + '" style="display:none;">' +
      '<input type="text" id="pwsEquipContactName' + fsIdx + '" placeholder="' + (es ? 'Nombre' : 'Name') + '" style="' + PWS_EQ_IN + '">' +
      '<input type="text" id="pwsEquipContactPhone' + fsIdx + '" placeholder="' + (es ? 'Tel\u00e9fono' : 'Phone') + '" style="' + PWS_EQ_IN + '">' +
      '<button onclick="pwsEquipSaveContact(' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? 'Guardar Contacto' : 'Save Contact') + '</button></div>';
    h += '<button onclick="pwsEquipToggle(\'Contact\',' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? '+ Agregar Contacto' : '+ Add Contact') + '</button>';
    // Alarms
    h += '<div style="' + PWS_EQ_HDR + '">' + (es ? 'Alarmas (SMS)' : 'Alarms (SMS)') + '</div>';
    var rems = cfg.reminders || [];
    var todayEq = pwsLocalDate();
    var shownEq = 0;
    for (var ri2 = 0; ri2 < rems.length; ri2++) {
      var r = rems[ri2]; if (!r || !r.time) continue;
      if (r.date && r.date !== todayEq) continue;
      h += '<div style="' + PWS_EQ_ROW + '"><div style="' + PWS_EQ_TXT + '">\u23F0 ' + escHtml(r.time) + (r.note ? ' \u2014 ' + escHtml(r.note) : '') + '</div></div>';
      shownEq++;
    }
    if (!shownEq) h += '<div style="' + PWS_EQ_DIM + '">' + (es ? 'Sin alarmas hoy.' : 'No alarms today.') + '</div>';
    var phonePre = cfg.reminderPhone || (function(){ try { return localStorage.getItem('4laws-alarm-phone') || ''; } catch(e) { return ''; } })();
    h += '<div id="pwsEquipAlarmForm' + fsIdx + '" style="display:none;">' +
      '<input type="time" id="pwsEquipAlarmTime' + fsIdx + '" style="' + PWS_EQ_IN + '">' +
      '<input type="text" id="pwsEquipAlarmNote' + fsIdx + '" placeholder="' + (es ? 'Mensaje' : 'Message') + '" style="' + PWS_EQ_IN + '">' +
      '<input type="text" id="pwsEquipAlarmPhone' + fsIdx + '" value="' + escHtml(phonePre) + '" placeholder="' + (es ? 'Tu celular (una vez)' : 'Your cell (asked once)') + '" style="' + PWS_EQ_IN + '">' +
      '<div style="' + PWS_EQ_DIM + '">' + (es ? 'Suena hoy a esa hora \u2014 un texto, sin cancelar.' : 'Fires today at that time \u2014 one text, no cancel.') + '</div>' +
      '<button onclick="pwsEquipSaveAlarm(' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? 'Poner Alarma' : 'Set Alarm') + '</button></div>';
    h += '<button onclick="pwsEquipToggle(\'Alarm\',' + fsIdx + ');event.stopPropagation();" style="' + PWS_EQ_BTN + '">' + (es ? '+ Agregar Alarma' : '+ Add Alarm') + '</button>';
    return h;
  }

  function pwsEquipCfg_(fsIdx) {
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule[fsIdx]) return null;
    var wLabel = _dayData.finalSchedule[fsIdx].label || '';
    if (!wLabel) return null;
    if (!_windowConfig) _windowConfig = {};
    if (!_windowConfig[wLabel]) _windowConfig[wLabel] = {};
    return { label: wLabel, cfg: _windowConfig[wLabel] };
  }
  // v100 STORAGE SWAP -- the one write door. Every wall in this file goes
  // through here and lands on its own equip:<name> row. Nothing in /pws
  // writes the legacy window_config blob any more.
  function pwsEquipSaveCfg_(wLabel) {
    if (!wLabel) return Promise.resolve(null);
    if (!_windowConfig) _windowConfig = {};
    if (!_windowConfig[wLabel]) _windowConfig[wLabel] = {};
    return post({ action: 'pwsSaveEquip', sessionId: _session, requestingMemberId: _memberId, activityName: wLabel, config: _windowConfig[wLabel] });
  }
  // v100 PRECEDENCE LAW -- one accessor, every read site. Equip wins,
  // legacy fills the gaps, and an activity is "migrated" by the mere
  // existence of its equip: row. No flags, nothing to desync. Once an
  // activity is migrated its legacy entry is never read again.
  function pwsEquipMerge_(equipMap, legacyMap) {
    var out = {}, k;
    if (legacyMap) { for (k in legacyMap) { if (Object.prototype.hasOwnProperty.call(legacyMap, k)) out[k] = legacyMap[k]; } }
    if (equipMap)  { for (k in equipMap)  { if (Object.prototype.hasOwnProperty.call(equipMap,  k)) out[k] = equipMap[k];  } }
    return out;
  }
  function pwsEquipRerender_() {
    var openIds = [];
    var wraps = document.querySelectorAll('.pws-item-note-wrap.open');
    for (var i = 0; i < wraps.length; i++) openIds.push(wraps[i].id);
    pwsRenderDayTile();
    for (var j = 0; j < openIds.length; j++) {
      var w = document.getElementById(openIds[j]);
      if (w) w.classList.add('open');
    }
  }
  window.pwsEquipToggle = function pwsEquipToggle(kind, fsIdx) {
    var f = document.getElementById('pwsEquip' + kind + 'Form' + fsIdx);
    if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
  };
  window.pwsEquipFileChosen = function pwsEquipFileChosen(fsIdx, inputEl) {
    var w = pwsEquipCfg_(fsIdx); if (!w) return;
    var file = inputEl && inputEl.files && inputEl.files[0]; if (!file) return;
    var st = document.getElementById('pwsEquipFileStatus' + fsIdx);
    if (file.size > 10 * 1024 * 1024) {
      if (st) st.textContent = _lang === 'es' ? 'M\u00e1s de 10MB \u2014 agr\u00e9galo como enlace.' : 'Over 10MB \u2014 rack it as a link instead.';
      return;
    }
    if (st) st.textContent = _lang === 'es' ? 'Guardando en el estante\u2026' : 'Racking it\u2026';
    var reader = new FileReader();
    reader.onloadend = function() {
      var base64 = reader.result.split(',')[1];
      post({ action: 'pwsUploadFile', sessionId: _session, requestingMemberId: _memberId,
        fileName: file.name, mediaType: file.type || 'application/octet-stream', base64Data: base64 })
      .then(function(d) {
        if (!d || d.status !== 'ok' || !d.file || !d.file.fileId) {
          if (st) st.textContent = (d && d.code === 'too_large')
            ? (_lang === 'es' ? 'M\u00e1s de 10MB \u2014 agr\u00e9galo como enlace.' : 'Over 10MB \u2014 rack it as a link instead.')
            : (_lang === 'es' ? 'No se pudo guardar. Intenta de nuevo.' : 'Could not rack it. Try again.');
          return;
        }
        if (!w.cfg.files) w.cfg.files = [];
        w.cfg.files.push({ fileId: d.file.fileId, name: d.file.name, viewUrl: d.file.viewUrl, mediaType: d.file.mediaType || '' });
        pwsEquipSaveCfg_(w.label).catch(function(){});
        pwsEquipRerender_();
      })
      .catch(function() { if (st) st.textContent = _lang === 'es' ? 'Error de conexi\u00f3n.' : 'Connection error.'; });
    };
    reader.readAsDataURL(file);
  };
  window.pwsEquipRemove = function pwsEquipRemove(kind, fsIdx, itemIdx) {
    var w = pwsEquipCfg_(fsIdx); if (!w) return;
    if (kind === 'file') {
      if (!w.cfg.files || !w.cfg.files[itemIdx]) return;
      var fRec = w.cfg.files[itemIdx];
      if (!confirm(_lang === 'es' ? '\u00bfQuitar "' + (fRec.name || 'archivo') + '" del estante?' : 'Remove "' + (fRec.name || 'file') + '" from the shelf?')) return;
      w.cfg.files.splice(itemIdx, 1);
      if (fRec.fileId) post({ action: 'pwsDeleteFile', sessionId: _session, requestingMemberId: _memberId, fileId: fRec.fileId }).catch(function(){});
    } else if (kind === 'link') {
      if (!w.cfg.links) return;
      w.cfg.links.splice(itemIdx, 1);
    } else if (kind === 'ec') {
      if (!w.cfg.ecLinks) return;
      w.cfg.ecLinks.splice(itemIdx, 1);
    } else if (kind === 'contact') {
      if (!w.cfg.contacts) return;
      w.cfg.contacts.splice(itemIdx, 1);
    }
    pwsEquipSaveCfg_(w.label).catch(function(){});
    pwsEquipRerender_();
  };
  window.pwsEquipSaveLink = function pwsEquipSaveLink(fsIdx) {
    var w = pwsEquipCfg_(fsIdx); if (!w) return;
    var nEl = document.getElementById('pwsEquipLinkName' + fsIdx);
    var uEl = document.getElementById('pwsEquipLinkUrl' + fsIdx);
    var url = uEl ? (uEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    if (!w.cfg.links) w.cfg.links = [];
    w.cfg.links.push({ name: nEl ? (nEl.value || '').replace(/^\s+|\s+$/g, '') : '', url: url });
    pwsEquipSaveCfg_(w.label).catch(function(){});
    pwsEquipRerender_();
  };
  window.pwsEquipSaveEC = function pwsEquipSaveEC(fsIdx) {
    var w = pwsEquipCfg_(fsIdx); if (!w) return;
    var cEl = document.getElementById('pwsEquipECCat' + fsIdx);
    var uEl = document.getElementById('pwsEquipECUrl' + fsIdx);
    var nEl = document.getElementById('pwsEquipECName' + fsIdx);
    var url = uEl ? (uEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    var key = cEl ? cEl.value : 'other';
    var META = { music: { icon: '\uD83C\uDFB5', label: 'Music' }, games: { icon: '\uD83C\uDFAE', label: 'Games' }, news: { icon: '\uD83D\uDCFA', label: 'News' }, other: { icon: '\uD83D\uDD17', label: 'Link' } };
    var meta = META[key] || META.other;
    var nm = nEl ? (nEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    if (!w.cfg.ecLinks) w.cfg.ecLinks = [];
    w.cfg.ecLinks.push({ url: url, label: nm || meta.label, icon: meta.icon, category: key });
    pwsEquipSaveCfg_(w.label).catch(function(){});
    pwsEquipRerender_();
  };
  window.pwsEquipSaveContact = function pwsEquipSaveContact(fsIdx) {
    var w = pwsEquipCfg_(fsIdx); if (!w) return;
    var nEl = document.getElementById('pwsEquipContactName' + fsIdx);
    var pEl = document.getElementById('pwsEquipContactPhone' + fsIdx);
    var cName = nEl ? (nEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    var cPhone = pEl ? (pEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    if (!cName && !cPhone) return;
    if (!w.cfg.contacts) w.cfg.contacts = [];
    w.cfg.contacts.push({ name: cName, phone: cPhone });
    pwsEquipSaveCfg_(w.label).catch(function(){});
    pwsEquipRerender_();
  };
  window.pwsEquipSaveAlarm = function pwsEquipSaveAlarm(fsIdx) {
    var w = pwsEquipCfg_(fsIdx); if (!w) return;
    var tEl = document.getElementById('pwsEquipAlarmTime' + fsIdx);
    var nEl = document.getElementById('pwsEquipAlarmNote' + fsIdx);
    var pEl = document.getElementById('pwsEquipAlarmPhone' + fsIdx);
    var aTime = tEl ? tEl.value : '';
    var aNote = nEl ? (nEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    var aPhone = pEl ? (pEl.value || '').replace(/^\s+|\s+$/g, '') : '';
    if (!aTime || !aPhone) {
      var stA = document.getElementById('pwsEquipFileStatus' + fsIdx);
      if (stA) stA.textContent = !aTime ? (_lang === 'es' ? 'Elige una hora.' : 'Set a time first.') : (_lang === 'es' ? 'Falta tu celular.' : 'Add your cell number.');
      return;
    }
    post({ action: 'pwsSaveReminder', sessionId: _session, requestingMemberId: _memberId,
      memberId: _memberId, toolObligation: w.label, reminderTime: aTime, reminderNote: aNote, phone: aPhone })
    .then(function(d) {
      if (!d || !d.success) return;
      if (!w.cfg.reminders) w.cfg.reminders = [];
      w.cfg.reminders.push({ time: aTime, note: aNote, date: pwsLocalDate() });
      w.cfg.reminderPhone = aPhone;
      try { localStorage.setItem('4laws-alarm-phone', aPhone); } catch(e) {}
      pwsEquipSaveCfg_(w.label).catch(function(){});
      pwsEquipRerender_();
    })
    .catch(function(){});
  };

  // v99 FORGE->ACTIVATE HANDSHAKE (stage side, ratified one motion 7/24):
  // /pws?activate=<obligation> opens that tool's activation overlay the
  // moment the Tools tile has rendered it. DOM-driven match (the rendered
  // .pws-tool-name text) so it survives internal index changes; retries
  // briefly because tools render after async load. Silent no-op when the
  // name isn't found -- a deleted tool must not strand the member in an
  // error, the stage simply stands as normal.
  function pwsActivateDeepLink_(tries) {
    if (_pwsDeepLinkFired) return;
    var m = /[?&]activate=([^&]+)/.exec(window.location.search || '');
    if (!m) return;
    var target = '';
    try { target = decodeURIComponent(m[1].replace(/\+/g, ' ')); } catch(e) { return; }
    target = target.replace(/^\s+|\s+$/g, '');
    if (!target) return;
    var names = document.querySelectorAll('.pws-tool-name');
    for (var i = 0; i < names.length; i++) {
      if ((names[i].textContent || '').replace(/^\s+|\s+$/g, '') === target) {
        var card = names[i].parentNode ? names[i].parentNode.parentNode : null;
        var btn = card && card.querySelector ? card.querySelector('.pws-tool-open-btn') : null;
        if (btn) { _pwsDeepLinkFired = true; btn.click(); return; }
      }
    }
    // v99.1: deep-linked arrivals deserve patience -- the Tools cards ride
    // several sequential GAS fetches and can take well past 6s on a cold
    // load (proven live 7/24: cards present, matcher already expired).
    // 60 tries x 1s = a full minute of watching before giving up silently.
    if (tries < 60) setTimeout(function() { pwsActivateDeepLink_(tries + 1); }, 1000);
  }
  // v99.2: the watch starts HERE, at script parse -- independent of every
  // render path. (v99/v99.1 mounted the call inside pwsRenderAll, which
  // the boot success path never invokes -- proven live 7/24: code present,
  // card present, matcher never ran.) The 60s retry loop does the waiting;
  // _pwsDeepLinkFired makes the click once-only so mid-session re-renders
  // can never resurrect the overlay after the member closes it.
  var _pwsDeepLinkFired = false;
  try { pwsActivateDeepLink_(0); } catch (eDL) {}

  function pwsAdherenceFeedback(done, total) {
    var ratio = total > 0 ? done / total : 0;
    var msgEN, msgES;
    if (ratio >= 1) {
      msgEN = 'You ran it. Every single window.' + NL + NL + 'Three months of this and it stops being a schedule. It becomes who you are.';
      msgES = 'Lo cumpliste. Cada ventana.' + NL + NL + 'Tres meses de esto y deja de ser un horario. Se convierte en qui\u00e9n eres.';
    } else if (ratio >= 0.57) {
      msgEN = 'Strong day. ' + done + ' out of ' + total + ' windows.' + NL + NL + 'The gaps tell us something \u2014 want to look at them together?';
      msgES = 'Buen d\u00eda. ' + done + ' de ' + total + ' ventanas.' + NL + NL + 'Los espacios nos dicen algo \u2014 \u00bfquieres que los revisemos juntos?';
    } else {
      msgEN = 'Something is getting in the way. ' + done + ' out of ' + total + ' today.' + NL + NL + 'Want to talk about it?';
      msgES = 'Algo se est\u00e1 interponiendo. ' + done + ' de ' + total + ' hoy.' + NL + NL + '\u00bfQuieres hablar de ello?';
    }
    pwsOpenDocB();
    setTimeout(function() { pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb'); }, 400);
  }

  // v106 -- TITLE PLUMBING FIX: the three tiers below (cid -> legacy index
  // -> exact obligation text) are unchanged in order and logic -- every
  // item that linked correctly before still links correctly now. The only
  // change: a completion that LOOKED linked (carried a contributionCid, a
  // legacy contributionId, or an obligation string) but matched nothing
  // used to fail with zero signal anywhere. Now it says so.
  function pwsBehavioralCascade(item, result, schedule) {
    if (result === 'done' && _obsData && _obsData.confirmedObs) {
      var obsMatched = false;
      var hadLinkInfo = !!(item.contributionCid ||
        (item.contributionId !== undefined && item.contributionId !== null) ||
        item.obligation);

      if (item.contributionCid) {
        _obsData.confirmedObs.forEach(function(o) {
          if (o && o.cid === item.contributionCid && o.state !== 'crushing') { o.state = 'crushing'; obsMatched = true; }
        });
      } else if (item.contributionId !== undefined && item.contributionId !== null) {
        var ob = _obsData.confirmedObs[item.contributionId];
        if (ob && ob.state !== 'crushing') { ob.state = 'crushing'; obsMatched = true; }
      } else if (item.obligation) {
        var oblText = item.obligation.toLowerCase().trim();
        _obsData.confirmedObs.forEach(function(o) {
          if (o.state !== 'crushing' && o.text && o.text.toLowerCase().trim() === oblText) {
            o.state = 'crushing'; obsMatched = true;
          }
        });
      }

      // Bench 17 fourth tier: no link info at all - fall back to exact label.
      // A UNIQUE match self-heals: the discovered cid is written onto the
      // window (the member's own naming writes the fact), so next time the
      // first tier catches it.
      if (!obsMatched && !hadLinkInfo && item.label) {
        var lblText = item.label.toLowerCase().trim();
        var lblHits = _obsData.confirmedObs.filter(function(o) {
          return o && o.text && o.text.toLowerCase().trim() === lblText;
        });
        if (lblHits.length) {
          lblHits.forEach(function(o) { if (o.state !== 'crushing') { o.state = 'crushing'; obsMatched = true; } });
          if (lblHits.length === 1 && lblHits[0].cid) {
            item.contributionCid = lblHits[0].cid;
            try { pwsSaveDaySchedule(); } catch (eSelfHeal) {}
          }
        }
      }

      if (!obsMatched && hadLinkInfo) {
        console.warn('[pwsBehavioralCascade] DONE was marked on "' + (item.label || item.obligation || '?') +
          '" but no matching Contribution could be found (cid=' + (item.contributionCid || 'none') +
          ', legacy idx=' + (item.contributionId !== undefined ? item.contributionId : 'none') +
          '). No credit was applied -- the link is likely stale, re-link by hand via the serves-picker.');
      }

      if (obsMatched) {
        post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
          data: pwsStationPayload() });
        pwsRenderStationTile();
        pwsRenderToolsTile();
        pwsRenderDayTile();
      }
    }
    if (_adherenceData) {
      var doneCount = schedule.filter(function(s) { return s._checkedIn === 'done'; }).length;
      var totalCount = schedule.length;
      if (totalCount > 0 && doneCount === totalCount && !_adherenceData.allWindowsComplete) {
        _adherenceData.allWindowsComplete = true;
        pwsRenderToolsTile();
      }
    }
    var allChecked = schedule.filter(function(s) { return s._checkedIn; });
    if (allChecked.length === schedule.length && !_endOfDayFired) {
      pwsEndOfDaySummary(schedule);
    }
  }

  function pwsUpdateSavedLabel(elId, isoStr) {
    var el = document.getElementById(elId);
    if (!el || !isoStr) return;
    try { var d = new Date(isoStr); var mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]; el.textContent = (_lang === 'es' ? 'Guardado ' : 'Saved ') + mo + ' ' + d.getDate(); } catch(e) {}
  }

  function initDocBCoreHeader() {
    if (typeof DocBCore === 'undefined') { setTimeout(initDocBCoreHeader, 200); return; }
    DocBCore.init({
      inputId:       'pwsDocBInput',
      previewId:     'pwsDocBImgPreview',
      thumbId:       'pwsDocBImgThumb',
      clearBtnId:    'pwsDocBImgClear',
      voiceBtnId:    'pwsDocBVoiceBtn',
      cameraInputId: 'pwsDocBCamInput',
      getLang:       function() { return _lang; }
    });
  }
  setTimeout(initDocBCoreHeader, 400);

  function pwsDocBSpeakGreeting() {
    var now = new Date();
    var h = now.getHours();
    var timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    var current = (_dayData && _dayData.finalSchedule) ? pwsFindCurrentWindow(_dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; })) : null;
    var memberName = localStorage.getItem('4laws-display-name') || 'Eduardo';
    var greetEN, greetES;
    if (current) {
      greetEN = 'Hi ' + memberName + '. It\u2019s ' + timeStr + '. Your ' + current.label + ' window is open. What do you need?';
      greetES = 'Hola ' + memberName + '. Son las ' + timeStr + '. Tu ventana de ' + current.label + ' est\u00e1 abierta. \u00bfQu\u00e9 necesitas?';
    } else {
      greetEN = 'Hi ' + memberName + '. It\u2019s ' + timeStr + '. What do you need?';
      greetES = 'Hola ' + memberName + '. Son las ' + timeStr + '. \u00bfQu\u00e9 necesitas?';
    }
    var greetText = _lang === 'es' ? greetES : greetEN;
    pwsAppendBubble(greetText, 'docb');
    _docbHistory.push({ role: 'assistant', content: greetText });
    if (typeof DocBCore !== 'undefined') {
      setTimeout(function() { DocBCore.speak(greetText, function(){ return _lang; }); }, 200);
    } else if (window.speechSynthesis) {
      var utt = new SpeechSynthesisUtterance(greetText);
      utt.lang = _lang === 'es' ? 'es-US' : 'en-US';
      setTimeout(function() { window.speechSynthesis.speak(utt); }, 200);
    }
  }

  function pwsDocBCheckNavCmd(text) {
    var lower = text.toLowerCase().trim();
    var navTrigger = /^(take me to|open|go to|navigate to|launch|start)\s+(.+)$/.exec(lower);
    if (!navTrigger) return false;
    var dest = navTrigger[2].trim();
    var routes = {
      studio:  '/studio',    atelier: '/studio',   'bond room': '/studio',
      todos:   '/todos',     'my day': '/todos',   'to do': '/todos', 'todo': '/todos',
      trust:   'https://www.4lawsacademy.com/pws-trust', 'trust repair': 'https://www.4lawsacademy.com/pws-trust',
      games:   '/games',     'game room': '/games', gaming: '/games',
      music:   '/music',     'music room': '/music',
      pws:     '/pws',
      home:    '/pws',
      community: '/community-talent', talent: '/talent'
    };
    for (var key in routes) {
      if (routes.hasOwnProperty(key) && dest.indexOf(key) !== -1) {
        var url = routes[key];
        var confirmMsg = (_lang === 'es' ? 'Abriendo ' : 'Opening ') + key + '\u2026';
        pwsAppendBubble(confirmMsg, 'docb');
        if (typeof DocBCore !== 'undefined') DocBCore.speak(confirmMsg, function(){ return _lang; });
        setTimeout(function(u) { return function() { window.location.href = u; }; }(url), 700);
        return true;
      }
    }
    return false;
  }

  window.pwsDocBQuickTool = function pwsDocBQuickTool(tool) {
    pwsAppendBubble(_lang==='es'?'Abre tu actividad para esto.':'Open your activity for this.','docb');
    if(tool==='cash'||tool==='todos')window.location.href='/todos';
  };

  window.pwsOpenDocB = function pwsOpenDocB() {
    var ov = document.getElementById('pwsDocBOverlay'); if (ov) ov.classList.add('open');
    if (!_docbHistory.length) {
      pwsDocBSpeakGreeting();
    }
    var inp = document.getElementById('pwsDocBInput'); if (inp) setTimeout(function() { inp.focus(); }, 80);
  };
  window.pwsCloseDocB = function pwsCloseDocB() {
    var ov = document.getElementById('pwsDocBOverlay'); if (ov) ov.classList.remove('open');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  function useStopMic() {
    if (_useRecognizer) { try { _useRecognizer.stop(); _useRecognizer.onresult = null; _useRecognizer.onend = null; } catch(e) {} _useRecognizer = null; }
    _useMicActive = false; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleUseMic = function pwsToggleUseMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
    if (_useMicActive) { useStopMic(); return; }
    useStopMic(); _useRecognizer = new SR(); _useRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US'; _useRecognizer.continuous = true; _useRecognizer.interimResults = true;
    _useRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsUseInput'); if (inp) inp.value = transcript.trim(); };
    _useRecognizer.onend = function() { _useMicActive = false; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.remove('listening'); };
    _useRecognizer.start(); _useMicActive = true; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.add('listening');
  };

  window.pwsOpenPlanUse = function pwsOpenPlanUse(toolIdx) { if (toolIdx === undefined || toolIdx < 0) return; pwsOpenUse(toolIdx, true); };

  window.pwsOpenUse = function pwsOpenUse(toolIdx, fromLaunch) {
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    // BUILD 1 FIX: accept a pre-built synthetic tool object (window launch from My Day)
    var tool;
    if (typeof toolIdx === 'object' && toolIdx !== null) {
      tool = toolIdx;
    } else {
      tool = validTools[toolIdx];
    }
    if (!tool) return;

    if (tool.isTalent === true || tool.type === 'talent') {
      _useTool = tool;
      var pauseKey = pwsActivatePauseKey();
      var savedRaw = null;
      try { savedRaw = localStorage.getItem(pauseKey); } catch(e) {}
      if (savedRaw) {
        try {
          var saved = JSON.parse(savedRaw);
          if (saved && saved.obligation === tool.obligation) {
            _useHistory = saved.history || [];
            _timerSeconds = saved.timerSeconds || 0;
            _useTool._fromLaunch = false;
            _timerPaused = false;
            var feed = document.getElementById('pwsUseFeed'); if (feed) feed.innerHTML = '';
            var titleEl = document.getElementById('pwsUseTitle'); if (titleEl) titleEl.textContent = tool.obligation || tool.en;
            var ov = document.getElementById('pwsUseOverlay'); if (ov) ov.classList.add('open');
            _useHistory.forEach(function(msg) {
              useAppendBubble(msg.content, msg.role === 'user' ? 'member' : 'docb');
            });
            var allProjToolsR = validTools.filter(function(ct) { return ct.obligation === tool.obligation && (ct.isTalent || ct.type === 'talent'); });
            var cfgR = allProjToolsR.filter(function(ct) { return ct.configured === true; }).length;
            var welcomeEN = 'Welcome back! You\u2019ve configured ' + cfgR + ' of ' + allProjToolsR.length + ' tools. Ready to continue?';
            var welcomeES = '\u00a1Bienvenido de vuelta! Configuraste ' + cfgR + ' de ' + allProjToolsR.length + ' herramientas. \u00bfSeguimos?';
            useAppendBubble(_lang === 'es' ? welcomeES : welcomeEN, 'docb');
            pwsRenderUseFooter(false, false, tool.link);
            var inp = document.getElementById('pwsUseInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
            return;
          }
        } catch(e) {}
      }
    }
    _useTool = tool; _useTool._fromLaunch = !!fromLaunch; _useHistory = []; _timerSeconds = 0; _useStartTime = null; _musicSaved = false; _progShown = false; _useAwaitingDread = false; _useAwaitingReframe = false;
    if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
    var oblKey = (tool.obligation || tool.en || 'tool').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 40);
    _pbKey = 'pws-pb-' + oblKey; _usePB = null;
    try { var pbRaw = localStorage.getItem(_pbKey); if (pbRaw) _usePB = JSON.parse(pbRaw); } catch(e) {}
    var toolFullDesc = tool.en || '';
    var oblLabel = (!tool._oblDirty && tool.obligation) ? tool.obligation : '';
    var toolName = pwsShortTitle(toolFullDesc || oblLabel || 'this tool');
    var isTimer = /timer|sprint|personal best|beat|minutes|seconds|record|how fast|fastest|race|challenge/i.test(toolFullDesc);
    var titleEl = document.getElementById('pwsUseTitle'); if (titleEl) titleEl.textContent = oblLabel || toolName;
    var feed = document.getElementById('pwsUseFeed'); if (feed) feed.innerHTML = '';
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'none';
    var timerDisp = document.getElementById('pwsTimerDisplay'); if (timerDisp) timerDisp.textContent = '0:00';
    var zone3 = document.getElementById('pwsToolPanelZone'); if (zone3) zone3.innerHTML = '';
    var ov = document.getElementById('pwsUseOverlay'); if (ov) ov.classList.add('open');
    var activatingQ = '';
    if (tool.isTalent === true || tool.type === 'talent') {
      var projName = tool.obligation || 'your project';
      var allTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(function(ct) { return ct.obligation === tool.obligation && (ct.isTalent === true || ct.type === 'talent'); }) : [];
      var configuredCount = allTools.filter(function(ct) { return ct.configured === true; }).length;
      var totalCount = allTools.length;
      if (configuredCount === 0) {
        activatingQ = _lang === 'es'
          ? 'Est\u00e1s trabajando en \u201c' + projName + '\u201d. \u00bfCu\u00e1l herramienta quieres configurar primero \u2014 tus enlaces, contactos, cron\u00f3metro, recordatorios? Dime y la configuramos ahora.'
          : 'You\u2019re working on \u201c' + projName + '\u201d. Which tool do you want to set up first \u2014 your links, contacts, timer, reminders? Tell me and we\u2019ll get it configured right now.';
      } else if (configuredCount < totalCount) {
        activatingQ = _lang === 'es'
          ? projName + ' \u2014 ' + configuredCount + ' de ' + totalCount + ' herramientas configuradas. \u00bfCu\u00e1l configuramos hoy?'
          : projName + ' \u2014 ' + configuredCount + ' of ' + totalCount + ' tools configured. Which one are we setting up today?';
      } else {
        activatingQ = _lang === 'es'
          ? '\u00bfC\u00f3mo va ' + projName + ' hoy?'
          : 'How is ' + projName + ' going today?';
      }
    } else if (isTimer && _usePB) {
      activatingQ = _lang === 'es' ? 'Tu mejor tiempo es ' + pwsFmtSeconds(_usePB.best) + '. \u00bfLo superas hoy? Toca INICIAR.' : 'Your personal best is ' + pwsFmtSeconds(_usePB.best) + '. Beat it today? Tap START.';
    } else if (isTimer) {
      activatingQ = _lang === 'es' ? '\u00bfListo para empezar? Toca INICIAR cuando quieras.' : 'Ready to go? Tap START when you\u0027re ready.';
    } else if (!tool.configured) {
      var toolShort = pwsShortTitle(toolFullDesc || tool.obligation || 'this tool');
      activatingQ = _lang === 'es'
        ? 'Vamos a configurar \u201c' + toolShort + '\u201d. \u00bfQu\u00e9 enlaces, recordatorios o contactos necesitas aqu\u00ed? Usa los botones de abajo para agregar cada uno \u2014 cuando termines, esta herramienta estar\u00e1 lista para lanzar.'
        : 'Let\u2019s set up \u201c' + toolShort + '\u201d. What links, reminders, or contacts do you need here? Use the buttons below to add each one \u2014 when you\u2019re done, this tool will be ready to launch.';
    } else {
      activatingQ = _lang === 'es' ? '\u00bfC\u00f3mo lo vamos a hacer hoy?' : 'How are we making this happen today?';
    }

    if (fromLaunch && !tool.configured) {
      var desc2 = toolFullDesc;
      var presel = {
        music:   /music|playlist|song|podcast/i.test(desc2),
        timer:   /timer|sprint|minutes|beat|streak/i.test(desc2),
        links:   /link|video|youtube|article/i.test(desc2),
        contact: /contact|call|text|reach out/i.test(desc2),
        cash:    /cash|pay|earn|money/i.test(desc2),
        remind:  /remind|reminder|alert/i.test(desc2),
        assist:  /help|stuck|question|explain|math|email|search|assist|support|guide|practice|study|write|read/i.test(desc2)
      };

      var preselNames = [];
      if (presel.timer)   preselNames.push(_lang === 'es' ? 'Cron\u00f3metro' : 'Timer');
      if (presel.music)   preselNames.push(_lang === 'es' ? 'Sala de M\u00fasica' : 'Music Room');
      if (presel.links)   preselNames.push(_lang === 'es' ? 'Enlaces' : 'Links');
      if (presel.contact) preselNames.push(_lang === 'es' ? 'Contactos' : 'Contacts');
      if (presel.cash)    preselNames.push(_lang === 'es' ? 'Pedir Dinero' : 'Cash Request');
      if (presel.remind)  preselNames.push(_lang === 'es' ? 'Recordatorios' : 'Reminders');

      var progMsgEN, progMsgES;
      if (preselNames.length) {
        var nameList = preselNames.join(' and ');
        progMsgEN = 'One final step.' + NL + NL +
          'Based on your plan, I\u0027ve set up ' + nameList + ' for this activity. The highlighted buttons are ready. Tap to confirm or adjust anything.' + NL + NL +
          'I\u0027m here to help you as you execute your activity.' + NL + NL +
          'When you finish, launch your games. You earned it.' + NL + NL +
          'Next time you tap Launch, everything runs automatically. No setup. Just go.';
        var nameListES = preselNames.join(' y ');
        progMsgES = 'Un \u00faltimo paso.' + NL + NL +
          'Bas\u00e1ndome en tu plan, he preparado ' + nameListES + ' para esta actividad. Los botones resaltados est\u00e1n listos. Toca para confirmar o ajustar.' + NL + NL +
          'Estoy aqu\u00ed para ayudarte mientras ejecutas tu actividad.' + NL + NL +
          'Cuando termines, lanza tus juegos. Te lo ganaste.' + NL + NL +
          'La pr\u00f3xima vez que toques Lanzar, todo corre autom\u00e1ticamente. Sin configuraci\u00f3n. Solo ve.';
      } else {
        progMsgEN = 'One final step.' + NL + NL +
          'Your tools are below. Click each one as you use it \u2014 start your timer, open your music, pull up your links. ' +
          'I\u0027m here to help you as you execute your activity.' + NL + NL +
          'When you finish, launch your games. You earned it.' + NL + NL +
          'Next time you tap Launch, everything runs automatically. No setup. Just go.';
        progMsgES = 'Un \u00faltimo paso.' + NL + NL +
          'Tus herramientas est\u00e1n abajo. Toca cada una cuando la uses \u2014 inicia tu cron\u00f3metro, abre tu m\u00fasica, accede a tus enlaces. ' +
          'Estoy aqu\u00ed para ayudarte mientras ejecutas tu actividad.' + NL + NL +
          'Cuando termines, lanza tus juegos. Te lo ganaste.' + NL + NL +
          'La pr\u00f3xima vez que toques Lanzar, todo corre autom\u00e1ticamente. Sin configuraci\u00f3n. Solo ve.';
      }

      tool._presel = presel;

      pwsShowPentagonSign(function() {
        var progMsg = _lang === 'es' ? progMsgES : progMsgEN;
        useAppendBubble(progMsg, 'docb');
        _useHistory.push({ role: 'assistant', content: progMsg });

        if (presel.assist) {
          setTimeout(function() {
            if (_progShown) return;
            _progShown = true;
            var feed2 = document.getElementById('pwsUseFeed');
            if (feed2) {
              var questionWrap = document.createElement('div');
              questionWrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-top:10px;padding:14px 16px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.2);';

              var questionLabel = document.createElement('div');
              questionLabel.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:22px !important;color:rgba(240,230,204,0.85);";
              questionLabel.textContent = _lang === 'es'
                ? '\u00bfQuieres Doc Asistente disponible durante esta actividad?'
                : 'Do you want Doc Assist available during this activity?';

              var btnRow = document.createElement('div');
              btnRow.id = 'pwsAssistYesNoRow';
              btnRow.style.cssText = 'display:flex;gap:8px;';

              var yesBtn = document.createElement('button');
              yesBtn.className = 'pws-use-footer-btn pws-launcher-btn';
              yesBtn.style.cssText = 'padding:8px 16px;font-size:16px !important;flex:1;';
              yesBtn.textContent = _lang === 'es' ? 'S\u00cd' : 'YES';

              var noBtn = document.createElement('button');
              noBtn.className = 'pws-use-footer-btn pws-launcher-btn';
              noBtn.style.cssText = 'padding:8px 16px;font-size:14px !important;flex:2;background:transparent;color:rgba(240,230,204,0.4);border:1px solid rgba(240,230,204,0.15);';
              noBtn.textContent = _lang === 'es' ? 'NO \u2014 YO PUEDO' : 'NO \u2014 I\u0027VE GOT THIS';

              yesBtn.addEventListener('click', function() {
                questionWrap.parentNode.removeChild(questionWrap);
                pwsHandleAssistYesNo('yes');
              });

              noBtn.addEventListener('click', function() {
                questionWrap.parentNode.removeChild(questionWrap);
                pwsHandleAssistYesNo('no');
              });

              btnRow.appendChild(yesBtn);
              btnRow.appendChild(noBtn);
              questionWrap.appendChild(questionLabel);
              questionWrap.appendChild(btnRow);
              feed2.appendChild(questionWrap);
              feed2.scrollTop = feed2.scrollHeight;
            }
          }, 600);
        }

      });
    } else {
      var openingEN, openingES, openingMsg;

      // -------------------------------------------------------
      // If the tool has a saved mentalFilter frame, show it first
      // before the activating question. Provides the reframe on
      // every LAUNCH without the member having to think about it.
      // -------------------------------------------------------
      var filterPrefix = '';
      if (tool.mentalFilter && tool.mentalFilter.length) {
        filterPrefix = (_lang === 'es')
          ? '\uD83D\uDCA1 Tu marco para esta actividad: ' + tool.mentalFilter + NL + NL
          : '\uD83D\uDCA1 Your frame for this: ' + tool.mentalFilter + NL + NL;
      }

      if (tool.isTalent === true || tool.type === 'talent') {
        openingEN = filterPrefix + activatingQ;
        openingES = filterPrefix + activatingQ;
      } else {
        openingEN = filterPrefix + 'We built this together:' + NL + NL + toolFullDesc + NL + NL + activatingQ;
        openingES = filterPrefix + 'Lo construimos juntos:' + NL + NL + toolFullDesc + NL + NL + activatingQ;
      }
      openingMsg = _lang === 'es' ? openingES : openingEN;
      useAppendBubble(openingMsg, 'docb');
      _useHistory.push({ role: 'assistant', content: openingMsg });

      // -------------------------------------------------------
      // For newly added tools that don't yet have a mentalFilter,
      // ask the dread question after the opening message so Doc B
      // can capture a frame and save it.
      // -------------------------------------------------------
      if (!tool.mentalFilter && !tool.configured) {
        var dreadQ = (_lang === 'es')
          ? '\u00bfC\u00f3mo te sientes con esta actividad \u2014 es algo que esperas con ganas o tiendes a posponerla?'
          : 'One quick question \u2014 is this something you look forward to, or do you tend to dread it?';
        setTimeout(function() {
          useAppendBubble(dreadQ, 'docb');
          _useHistory.push({ role: 'assistant', content: dreadQ });
          _useAwaitingDread = true;
        }, 600);
      }
    }
    pwsRenderUseFooter(isTimer, false, tool.link);

    // Reframe button — visible inside USE overlay when mentalFilter exists or tool is configured
    (function() {
      var existingReframe = document.getElementById('pwsReframeBtn');
      if (existingReframe) existingReframe.parentNode.removeChild(existingReframe);
      var header = document.querySelector('#pwsUsePanel .pws-unlock-header');
      if (!header) return;
      var rfBtn = document.createElement('button');
      rfBtn.id = 'pwsReframeBtn';
      rfBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:16px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(200,168,75,0.6);background:transparent;border:1px solid rgba(200,168,75,0.2);border-radius:3px;padding:4px 10px;cursor:pointer;white-space:nowrap;transition:color 0.2s,border-color 0.2s;';
      rfBtn.innerHTML = '<span class="en">Reframe</span><span class="es">Reencuadrar</span>';
      pwsApplyLang();
      rfBtn.addEventListener('click', function() {
        // Open Wisdom/Revelations page in new tab
        window.open('https://www.4lawsacademy.com/course-revelations', '_blank');
        // Also send a reframe prompt to Doc B
        var reframeQ = (_lang === 'es')
          ? '\u00bfQu\u00e9 marco te ayuda con esta actividad cuando se pone dif\u00edcil?'
          : 'What frame helps you with this when it gets hard?';
        useAppendBubble(reframeQ, 'docb');
        _useHistory.push({ role: 'assistant', content: reframeQ });
        _useAwaitingReframe = true;
        var inp = document.getElementById('pwsUseInput'); if (inp) { inp.focus(); }
      });
      var closeBtn = header.querySelector('.pws-docb-close');
      if (closeBtn && closeBtn.parentNode) { closeBtn.parentNode.insertBefore(rfBtn, closeBtn); }
    }());
    if (tool.configured && tool.links && tool.links.length) {
      setTimeout(pwsToggleLinksPanel, 120);
    }
    var inp = document.getElementById('pwsUseInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
  };

  /* ── BENCH 25 v87: THE SOUND SHELF (founder's placeholder law,
     twin of /todos v52.1) ── drop a WAV named <name>.wav into the
     assets repo's sounds/ folder and it comes alive here with zero
     code changes. Missing file = silence, never an error. */
  function pwsPlaySound(name) {
    try {
      var aud = new Audio('https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/sounds/' + name + '.wav');
      aud.volume = 0.85;
      var pr = aud.play();
      if (pr && pr.catch) pr.catch(function() {});
    } catch (eSnd) {}
  }
  window.pwsPlaySound = pwsPlaySound;

  /* ── BENCH 25 v88: THE FORGE ON THE STAGE ── Bruno wonders, Ace
     delivers, the tool remains — pinned on the feed, persisted on the
     confirmedTools entry (the contacts/herd precedent). */
  function pwsForgedSave_() {
    if (!_useTool) return;
    if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.forged = _useTool.forged || null; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
  }
  function pwsForgeCopyFallback_(txt) {
    try {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px;';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (eCp) {}
  }
  function pwsRenderForged_() {
    var feed = document.getElementById('pwsUseFeed');
    if (!feed) return;
    var oldCard = document.getElementById('pwsForgedCard');
    if (oldCard && oldCard.parentNode) oldCard.parentNode.removeChild(oldCard);
    var fg = (_useTool && _useTool.forged) ? _useTool.forged : null;
    if (!fg) return;
    var card = document.createElement('div');
    card.id = 'pwsForgedCard';
    card.style.cssText = 'margin:6px 0 10px;padding:14px;background:rgba(200,168,75,0.07);border:1px solid #c8a84b;border-radius:6px;';
    var ttl = document.createElement('div');
    ttl.style.cssText = 'font-family:Cinzel,serif;font-size:16px;letter-spacing:0.16em;color:#c8a84b;margin-bottom:8px;';
    ttl.textContent = '\u2692 ' + fg.name;
    card.appendChild(ttl);
    var body = document.createElement('div');
    body.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:19px;line-height:1.5;color:#f0e6cc;white-space:pre-wrap;";
    body.textContent = fg.output;
    card.appendChild(body);
    var cpy = document.createElement('button');
    cpy.style.cssText = 'margin-top:10px;padding:8px 18px;background:#c8a84b;border:none;border-radius:4px;color:#040608;font-family:Cinzel,serif;font-size:13px;letter-spacing:0.14em;cursor:pointer;';
    cpy.innerHTML = '<span class="en">COPY</span><span class="es">COPIAR</span>';
    cpy.onclick = function(evC) {
      evC.stopPropagation();
      var done = function() { /* honest per-action state */ cpy.textContent = _lang === 'es' ? '\u2713 Copiado' : '\u2713 Copied'; setTimeout(function() { cpy.innerHTML = '<span class="en">COPY</span><span class="es">COPIAR</span>'; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fg.output).then(done).catch(function() { pwsForgeCopyFallback_(fg.output); done(); });
      } else { pwsForgeCopyFallback_(fg.output); done(); }
    };
    card.appendChild(cpy);
    feed.insertBefore(card, feed.firstChild);
  }
  function pwsForgeTool_() {
    if (!_useTool) return;
    var wonder = _lang === 'es'
      ? 'Mmm\u2026 d\u00e9jame hablar con Ace. Creo que vale la pena preguntarle. \u2692'
      : 'Mmm\u2026 let me talk to Ace. I think this one\u2019s worth asking. \u2692';
    useAppendBubble(wonder, 'docb');
    var thinking = useAppendBubble('\u2026', 'docb');
    var toolNm = _useTool.obligation || _useTool.en || 'this tool';
    var forgeSys = 'You are the output of Ace, the silent master toolmaker of 4 LAWS Academy, delivered through Doc B. '
      + 'Read the conversation about this tool ("' + String(toolNm).replace(/"/g, '') + '") and PRODUCE THE WORK the member asked for \u2014 never advice about doing it, the thing itself: '
      + 'if a letter or email \u2014 write it COMPLETE and ready to send; if a gift \u2014 three concrete ideas, each with why it fits and where to get it; '
      + 'if money \u2014 the request drafted word for word; if a task or event \u2014 the plan as concrete dated steps. '
      + 'If the conversation gives you almost nothing, forge the most useful starting version from the tool\u2019s name and say what to fill in. '
      + 'FORMAT: first line exactly "TOOL: " + a short name (2-5 words). Then a blank line. Then the work itself, complete. '
      + 'No markdown, no questions, no hedging. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    var histF = [];
    (_useHistory || []).slice(-12).forEach(function(mF) {
      histF.push({ role: mF.role === 'user' ? 'user' : 'assistant', content: typeof mF.content === 'string' ? mF.content : mF.content });
    });
    histF.push({ role: 'user', content: _lang === 'es' ? 'Forja la herramienta.' : 'Forge the tool.' });
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: forgeSys, conversationHistory: histF })
      .then(function(d) {
        var r = (d && d.reply) ? d.reply : ((d && d.content && d.content[0]) ? d.content[0].text : '');
        r = r ? String(r).replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`{1,3}/g, '') : '';
        if (!r) { if (thinking) thinking.textContent = _lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.'; return; }
        var name = _lang === 'es' ? 'Herramienta' : 'Tool';
        var outp = r;
        var m = /^TOOL:\s*(.+)$/m.exec(r);
        if (m) { name = m[1].trim(); outp = r.substring(r.indexOf(m[0]) + m[0].length).replace(/^\s+/, ''); }
        _useTool.forged = { name: name, output: outp, forgedAt: new Date().toISOString() };
        pwsForgedSave_();
        var delivered = _lang === 'es'
          ? 'Ace lo mir\u00f3 y se puso a trabajar. Tu herramienta est\u00e1 arriba \u2014 forjada y tuya. \u2692'
          : 'Ace looked at it and got to work. Your tool stands above \u2014 forged, and yours. \u2692';
        if (thinking) thinking.textContent = delivered;
        pwsRenderForged_();
        pwsPlaySound('forge');
        if (window.FindME && window.FindME.chime && window.FindME.chime.call) { try { window.FindME.chime('tool'); } catch (eCh) {} }
      }).catch(function() { if (thinking) thinking.textContent = _lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.'; });
  }

  /* ── BENCH 25 v87.2: THE RANGE ── the fun part, front-of-house.
     Herd persistence rides the contacts precedent: tool.herd on the
     confirmedTools entry, serialized whole by pwsToolsPayload(). */
  function pwsHerdSave_() {
    if (!_useTool) return;
    if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.herd = _useTool.herd || []; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
  }
  function pwsRenderRange_() {
    var wrap = document.getElementById('pwsRangeWrap');
    if (!wrap || !_useTool || _useTool._isWindowLaunch) return;
    var herd = _useTool.herd || [];
    var standing = herd.filter(function(h) { return !h.dead; });
    var down = herd.filter(function(h) { return h.dead; });
    wrap.innerHTML = '';
    var hd = document.createElement('div');
    hd.style.cssText = 'font-family:Cinzel,serif;font-size:14px;letter-spacing:0.2em;color:#c8a84b;text-align:center;margin:4px 0 8px;';
    hd.textContent = '\uD83C\uDFAF ' + (_lang === 'es' ? 'EL CAMPO DE TIRO' : 'THE RANGE')
      + '  \u2014  ' + standing.length + (_lang === 'es' ? ' colgando' : ' standing') + ' \u00b7 ' + down.length + (_lang === 'es' ? ' abatidos' : ' down');
    wrap.appendChild(hd);
    if (!herd.length) {
      var emp = document.createElement('div');
      emp.style.cssText = "font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:rgba(240,230,204,0.55);text-align:center;margin-bottom:8px;";
      emp.textContent = _lang === 'es' ? 'Nada colgado todav\u00eda. Cuelga tu primer blanco abajo.' : 'Nothing hanging yet. Hang your first target below.';
      wrap.appendChild(emp);
    }
    standing.forEach(function(h) {
      var card = document.createElement('button');
      card.type = 'button';
      card.style.cssText = 'display:block;width:100%;margin:0 0 8px;padding:12px 14px;background:#0a0c0f;border:1px solid rgba(200,168,75,0.55);border-radius:4px;cursor:pointer;text-align:center;transition:transform 0.5s cubic-bezier(.6,0,1,.4), opacity 0.5s ease;';
      var nm = document.createElement('div');
      nm.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:22px;color:#f0e6cc;";
      nm.textContent = h.name;
      card.appendChild(nm);
      if (h.amount) {
        var am = document.createElement('div');
        am.style.cssText = 'font-family:Cinzel,serif;font-size:15px;letter-spacing:0.12em;color:#c8a84b;margin-top:2px;';
        am.textContent = h.amount;
        card.appendChild(am);
      }
      var hint = document.createElement('div');
      hint.style.cssText = 'font-size:12px;letter-spacing:0.16em;color:rgba(240,230,204,0.4);margin-top:4px;font-family:Cinzel,serif;';
      hint.textContent = _lang === 'es' ? 'TOCA PARA DISPARAR' : 'TAP TO SHOOT';
      card.appendChild(hint);
      card.onclick = function() {
        pwsPlaySound('gunshot');
        card.style.transform = 'rotate(75deg) translateY(90px)';
        card.style.opacity = '0';
        h.dead = true; h.killedAt = new Date().toISOString();
        pwsHerdSave_();
        setTimeout(function() {
          pwsRenderRange_();
          var left = (_useTool.herd || []).filter(function(x) { return !x.dead; }).length;
          if (left === 0) {
            pwsPlaySound('medal');
            if (window.FindME && window.FindME.chime) { window.FindME.chime('done'); }
            useAppendBubble(_lang === 'es'
              ? 'Campo despejado. Nada te debe miedo este mes. \uD83C\uDFAF'
              : 'Range clear. Nothing owes you fear this month. \uD83C\uDFAF', 'docb');
          }
        }, 550);
      };
      wrap.appendChild(card);
    });
    down.forEach(function(h) {
      var dd = document.createElement('div');
      dd.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(240,230,204,0.35);text-decoration:line-through;text-align:center;margin:0 0 4px;";
      dd.textContent = '\u2620 ' + h.name + (h.amount ? ' \u00b7 ' + h.amount : '');
      wrap.appendChild(dd);
    });
    var addRow = document.createElement('div');
    addRow.style.cssText = 'display:flex;gap:6px;margin:8px 0 4px;';
    var addInp = document.createElement('input');
    addInp.type = 'text';
    addInp.id = 'pwsRangeAddInp';
    addInp.placeholder = _lang === 'es' ? 'Nombre \u00b7 $monto' : 'Target name \u00b7 $amount';
    addInp.style.cssText = 'flex:1;min-width:0;background:rgba(240,230,204,0.08);border:1px solid rgba(200,168,75,0.5);color:#f0e6cc;padding:10px 12px;font-size:16px;border-radius:4px;';
    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'pws-use-footer-btn pws-launcher-btn';
    addBtn.style.cssText = 'font-family:Cinzel,serif !important;letter-spacing:0.12em !important;color:#c8a84b !important;text-align:center !important;';
    addBtn.textContent = _lang === 'es' ? '+ COLGAR' : '+ HANG IT';
    addBtn.onclick = function() {
      var v = (addInp.value || '').trim();
      if (!v) return;
      var amt = '';
      var m = /\$\s*[0-9][0-9,\.]*\s*$/.exec(v);
      if (m) { amt = m[0].replace(/\s+/g, ''); v = v.substring(0, m.index).replace(/[\s\u00b7\-\u2014,]+$/, '').trim(); }
      if (!_useTool.herd) _useTool.herd = [];
      _useTool.herd.push({ name: v || (_lang === 'es' ? 'Blanco' : 'Target'), amount: amt, dead: false, addedAt: new Date().toISOString() });
      pwsHerdSave_();
      pwsRenderRange_();
      var ni = document.getElementById('pwsRangeAddInp'); if (ni) ni.focus();
    };
    addRow.appendChild(addInp);
    addRow.appendChild(addBtn);
    wrap.appendChild(addRow);
  }

  function pwsRenderUseFooter(isTimer, isMedia, savedLink) {
    var footer = document.getElementById('pwsUseFooter');
    if (!footer) return;
    footer.innerHTML = '';

    var presel = (_useTool && _useTool._presel) ? _useTool._presel : {};

    if (savedLink) {
      var btnPlay = document.createElement('button');
      btnPlay.className = 'pws-use-footer-btn open-music';
      btnPlay.id = 'pwsUsePlayBtn';
      btnPlay.textContent = _lang === 'es' ? '\u25b6 Reproducir' : '\u25b6 Play';
      btnPlay.onclick = function() { window.open(savedLink, '_blank', 'noopener'); };
      footer.appendChild(btnPlay);
    }

    /* ── BENCH 25 v88: THE FORGE stands front-of-house ── */
    if (_useTool) {
      var forgeStBtn = document.createElement('button');
      forgeStBtn.className = 'pws-use-footer-btn pws-launcher-btn';
      forgeStBtn.style.cssText = 'width:100%;border:1px solid #c8a84b;background:transparent;color:#c8a84b !important;font-family:Cinzel,serif !important;letter-spacing:0.16em !important;text-align:center !important;font-size:15px !important;';
      forgeStBtn.innerHTML = '<span class="en">\u2692 FORGE THE TOOL</span><span class="es">\u2692 FORJA LA HERRAMIENTA</span>';
      forgeStBtn.onclick = pwsForgeTool_;
      footer.appendChild(forgeStBtn);
      setTimeout(pwsRenderForged_, 0);
    }

    /* ── BENCH 25 v87.2: THE RANGE mounts front-of-house ── */
    if (_useTool && !_useTool._isWindowLaunch) {
      var rangeWrap = document.createElement('div');
      rangeWrap.id = 'pwsRangeWrap';
      rangeWrap.style.cssText = 'width:100%;padding:6px 0;';
      footer.appendChild(rangeWrap);
      setTimeout(pwsRenderRange_, 0);
    }

    /* ── BENCH 25 v87: THE ACCESSORIES DOOR ── the grid folds behind
       one honest label. Collapsed by default: LAUNCH opens the WORK.
       If the member preselected accessories at configure time, the
       door starts open — they armed those, show them armed. */
    var accOpen = !!(
      presel.music || presel.timer || presel.remind || presel.links || presel.cash || presel.contact ||
      savedLink ||
      (_useTool && _useTool.links && _useTool.links.length) ||
      (_useTool && _useTool.contacts && _useTool.contacts.length) ||
      _usePB
    ); /* v87.1: saved evidence outranks the session flag — the door survives reload */
    var accWrap = document.createElement('div');
    accWrap.id = 'pwsAccWrap';
    accWrap.style.cssText = 'display:' + (accOpen ? 'block' : 'none') + ';width:100%;';
    var accDoor = document.createElement('button');
    accDoor.className = 'pws-use-footer-btn pws-launcher-btn';
    accDoor.id = 'pwsAccDoorBtn';
    accDoor.style.cssText = 'width:100%;border:1px solid rgba(200,168,75,0.5);background:transparent;color:#c8a84b !important;font-family:Cinzel,serif !important;letter-spacing:0.18em !important;text-align:center !important;font-size:15px !important;';
    function accDoorLabel() {
      accDoor.textContent = (_lang === 'es' ? 'ACCESORIOS' : 'ACCESSORIES') + ' ' + (accOpen ? '\u25B4' : '\u25BE');
    }
    accDoorLabel();
    accDoor.onclick = function() {
      accOpen = !accOpen;
      accWrap.style.display = accOpen ? 'block' : 'none';
      accDoorLabel();
    };

    var grid = document.createElement('div');
    grid.className = 'pws-launcher-grid';

    var btnMusic = document.createElement('button');
    btnMusic.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.music ? ' pws-launcher-presel' : '');
    btnMusic.textContent = '\uD83C\uDFB5 ' + (_lang === 'es' ? 'Sala de M\u00fasica' : 'Music Room');
    btnMusic.onclick = function() { pwsToggleECMenu('music', '/music', _lang === 'es' ? 'Sala de Musica' : 'Music Room'); };
    grid.appendChild(btnMusic);

    var pbLabel = _usePB
      ? (_lang === 'es' ? '\u23F1 Mejor: ' + pwsFmtSeconds(_usePB.best) : '\u23F1 Best: ' + pwsFmtSeconds(_usePB.best))
      : (_lang === 'es' ? '\u23F1 Iniciar Cron\u00f3metro' : '\u23F1 Start Timer');
    var btnTimer = document.createElement('button');
    btnTimer.className = 'pws-use-footer-btn start-timer pws-launcher-btn' + (presel.timer ? ' pws-launcher-presel' : '');
    btnTimer.id = 'pwsUseStartTimerBtn';
    btnTimer.textContent = pbLabel;
    btnTimer.onclick = pwsStartTimer;
    grid.appendChild(btnTimer);

    var counts = pwsCountContributions();
    var btnGames = document.createElement('button');
    btnGames.className = 'pws-use-footer-btn pws-launcher-btn';
    if (counts.total > 0 && counts.crushing === counts.total) {
      btnGames.textContent = '\uD83C\uDFAE ' + (_lang === 'es' ? 'Jugar' : 'Play Games');
      btnGames.onclick = function() { pwsToggleECMenu('games', '/games?unlock=scheduled', 'Games'); };
    } else if (counts.crushing > 0) {
      btnGames.textContent = '\uD83C\uDFAE ' + (_lang === 'es' ? 'Jugar' : 'Play Games');
      btnGames.onclick = function() { pwsToggleECMenu('games', '/games?unlock=free', 'Games'); };
    } else {
      btnGames.textContent = '\uD83C\uDFAE ' + (_lang === 'es' ? 'Juegos \u2014 termina tu d\u00eda primero' : 'Games \u2014 finish your day first');
      btnGames.disabled = true;
      btnGames.style.opacity = '0.35';
      btnGames.style.cursor = 'default';
    }
    grid.appendChild(btnGames);

    var btnReminders = document.createElement('button');
    btnReminders.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.remind ? ' pws-launcher-presel' : '');
    btnReminders.textContent = '\uD83D\uDD14 ' + (_lang === 'es' ? 'Recordatorios' : 'Reminders');
    btnReminders.addEventListener('click', pwsToggleAlarmsMenu);
    grid.appendChild(btnReminders);

    var btnLinks = document.createElement('button');
    btnLinks.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.links ? ' pws-launcher-presel' : '');
    btnLinks.textContent = '\uD83D\uDD17 ' + (_lang === 'es' ? 'Enlaces' : 'Links');
    btnLinks.addEventListener('click', pwsToggleLinksPanel);
    grid.appendChild(btnLinks);

    var btnCash = document.createElement('button');
    btnCash.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.cash ? ' pws-launcher-presel' : '');
    btnCash.textContent = '\uD83D\uDCB0 ' + (_lang === 'es' ? 'Pedir Dinero' : 'Cash Request');
    btnCash.addEventListener('click', pwsToggleCashPanel);
    grid.appendChild(btnCash);

    var btnContacts = document.createElement('button');
    btnContacts.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.contact ? ' pws-launcher-presel' : '');
    btnContacts.textContent = '\uD83D\uDCE8 ' + (_lang === 'es' ? 'Contactos' : 'Contacts');
    btnContacts.addEventListener('click', pwsToggleContactsPanel);
    grid.appendChild(btnContacts);

    if (_useTool && _useTool.hasAssist) {
      var btnAssist = document.createElement('button');
      btnAssist.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.assist ? ' pws-launcher-presel' : '');
      btnAssist.textContent = '\uD83E\uDD16 ' + (_lang === 'es' ? 'DOC ASISTENTE' : 'DOC ASSIST');
      btnAssist.addEventListener('click', pwsToggleAssistChat);
      footer.appendChild(btnAssist); /* v87: the brain stands front-of-house, never behind the accessories door */
    }

    footer.appendChild(accDoor);
    accWrap.appendChild(grid);
    footer.appendChild(accWrap);

    if (!_useTool || !_useTool.configured) {
      var btnCfg = document.createElement('button');
      btnCfg.className = 'pws-use-footer-btn pws-launcher-done';
      btnCfg.id = 'pwsDoneConfiguringBtn';
      btnCfg.textContent = _lang === 'es' ? '\u2713 Listo, Configurado' : '\u2713 Done Configuring';
      btnCfg.onclick = function() {
        if (_useTool && _toolsData && _toolsData.confirmedTools) {
          _toolsData.confirmedTools.forEach(function(t) {
            if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.configured = true; }
          });
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
          pwsRenderToolsTile();
        }
        useAppendBubble(_lang === 'es' ? 'Configurado. La pr\u00f3xima vez lo ver\u00e1s listo para lanzar.' : 'Configured. Next time you\u2019ll see it ready to launch.', 'docb');
        var cfgBtn = document.getElementById('pwsDoneConfiguringBtn');
        if (cfgBtn) cfgBtn.parentNode.removeChild(cfgBtn);
        var btnD = document.createElement('button');
        btnD.className = 'pws-use-footer-btn pws-launcher-done';
        btnD.id = 'pwsUseMarkDoneBtn';
        btnD.textContent = _lang === 'es' ? '\u2713 Marcar como Listo' : '\u2713 Mark Done';
        btnD.onclick = pwsMarkDone;
        footer.appendChild(btnD);
      };
      footer.appendChild(btnCfg);
    } else {
      var btnDone = document.createElement('button');
      btnDone.className = 'pws-use-footer-btn pws-launcher-done';
      btnDone.id = 'pwsUseMarkDoneBtn';
      btnDone.textContent = _lang === 'es' ? '\u2713 Marcar como Listo' : '\u2713 Mark Done';
      btnDone.onclick = pwsMarkDone;
      footer.appendChild(btnDone);
    }

    var btnSaveChatTop = document.createElement('button');
    btnSaveChatTop.className = 'pws-use-footer-btn pws-launcher-done';
    btnSaveChatTop.id = 'pwsUseSaveChatBtn';
    btnSaveChatTop.style.cssText = 'font-size:12px !important;letter-spacing:0.14em;opacity:0.8;padding:8px 20px;border:1px solid rgba(200,168,75,0.4);';
    btnSaveChatTop.textContent = _lang === 'es' ? '\u2193 Guardar Chat' : '\u2193 Save Chat';
    btnSaveChatTop.addEventListener('click', function() {
      if (!_useHistory || !_useHistory.length) return;
      var winName = (_useTool && (_useTool.obligation || _useTool.en)) ? (_useTool.obligation || _useTool.en) : 'Session';
      var lines = [winName + ' \u2014 Doc B Chat', new Date().toLocaleString(), ''];
      _useHistory.forEach(function(m) {
        var role = m.role === 'user' ? 'You' : 'Doc B';
        var content2 = typeof m.content === 'string' ? m.content : '[image]';
        lines.push(role + ': ' + content2);
        lines.push('');
      });
      var blob2 = new Blob([lines.join('\n')], { type: 'text/plain' });
      var url2 = URL.createObjectURL(blob2);
      var a2 = document.createElement('a');
      a2.href = url2;
      a2.download = winName.replace(/\s+/g,'_') + '_chat_' + pwsLocalDate() + '.txt';
      a2.click();
      URL.revokeObjectURL(url2);
    });
    footer.appendChild(btnSaveChatTop);

    if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
      var btnSave = document.createElement('button');
      btnSave.className = 'pws-use-footer-btn pws-launcher-done';
      btnSave.style.cssText = 'font-size:12px !important;letter-spacing:0.14em;opacity:0.6;padding:8px 20px;';
      btnSave.textContent = _lang === 'es' ? '\u2193 Guardar Sesi\u00f3n' : '\u2193 Save Session';
      btnSave.addEventListener('click', function() {
        var projName = (_useTool && _useTool.obligation) ? _useTool.obligation : 'Project';
        var lines = [projName + ' \u2014 ACTIVATE Session', new Date().toLocaleString(), ''];
        _useHistory.forEach(function(m) {
          lines.push((m.role === 'user' ? 'You: ' : 'Doc B: ') + m.content);
          lines.push('');
        });
        var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = projName.replace(/\s+/g,'_') + '_session_' + pwsLocalDate() + '.txt';
        a.click();
        URL.revokeObjectURL(url);
      });
      footer.appendChild(btnSave);
    }

    footer.style.display = 'flex';
    footer.style.flexDirection = 'column';
    footer.style.gap = '8px';
  }

  window.pwsCloseUse = function pwsCloseUse() {
    useStopMic(); if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }

    var hadSession = (_useStartTime !== null) || (_musicSaved === true) || (document.getElementById('pwsUseMarkDoneBtn') === null);
    if (hadSession && _useTool && _toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.configured = true; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });

      if (_useTool.isTalent === true) {
        if (!_dayData) _dayData = {};
        if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
        var slotObligation = _useTool.obligation || '';
        var alreadyExists = false;
        for (var dsi = 0; dsi < _dayData.finalSchedule.length; dsi++) {
          var slot = _dayData.finalSchedule[dsi];
          if (slot.isMastery && (slot.label === slotObligation + ' Practice' || slot.obligation === slotObligation)) {
            alreadyExists = true; break;
          }
        }
        if (!alreadyExists && slotObligation) {
          _dayData.finalSchedule.push({
            label:        slotObligation + ' Practice',
            activity:     slotObligation + ' Practice',
            obligation:   slotObligation,
            stage:        'Stage 1: Discovery',
            isTalent:     true,
            isMastery:    true,
            projectId:    _useTool.projectId || '',
            masteryStage: 1,
            type:         'obligation',
            ownsIt:       true
          });
          pwsSaveDaySchedule();
          pwsRenderDayTile();
        }
      }
    }

    if (_useStartTime && _useTool) {
      var elapsed = Math.round((Date.now() - _useStartTime) / 1000);
      post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId, date: pwsLocalDate(), windowKey: 'tool_abandoned_' + oblKeyFromTool(), activityLabel: (_useTool.obligation || 'tool use'), completed: false, note: 'abandoned after ' + pwsFmtSeconds(elapsed), lawTag: pwsLawTag(_useTool) });
    }
    var ov = document.getElementById('pwsUseOverlay'); if (ov) ov.classList.remove('open');
    var footer = document.getElementById('pwsUseFooter'); if (footer) { footer.innerHTML = ''; footer.style.display = 'none'; }
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'none';
    if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) { pwsClearActivateSession(); }
    _useTool = null; _useHistory = []; _timerSeconds = 0; _timerStart = null; _useStartTime = null; _pbKey = null; _usePB = null; _musicSaved = false; _progShown = false; _useAwaitingDread = false; _useAwaitingReframe = false;
    if (typeof DocBCore !== 'undefined') { DocBCore.clearPending(); }
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); }
  };

  window.pwsSendUse = function pwsSendUse() {
    var inp = document.getElementById('pwsUseInput');
    var text = inp ? inp.value.trim() : '';
    var hasPending = (typeof DocBCore !== 'undefined') && !!DocBCore.getPending();
    if (!text && !hasPending) return;
    if (inp) inp.value = '';
    useStopMic();

    var displayText = (typeof DocBCore !== 'undefined') ? DocBCore.displayText(text, function(){ return _lang; }) : text;
    var userContent = (typeof DocBCore !== 'undefined') ? DocBCore.buildContent(text, function(){ return _lang; }) : text;

    useAppendBubble(displayText, 'member');
    if (window.FindME && window.FindME.gauntlet) { window.FindME.gauntlet(); }
    _useHistory.push({ role: 'user', content: userContent });

    // -------------------------------------------------------
    // -------------------------------------------------------
    if (_useAwaitingDread && _useTool) {
      _useAwaitingDread = false;
      var dreadText = text.toLowerCase();
      var isDread = /dread|avoid|hate|hard|struggle|don't want|dont want|resist|not look|not forward|tempt|difficult|tough|not enjoy/i.test(dreadText);
      var isExcited = /look forward|excited|love|enjoy|can't wait|cant wait|like|happy|great|good|easy|want to/i.test(dreadText);

      if (isDread || (!isExcited && dreadText.length > 3)) {
        // They dread it — ask for the frame
        var frameAskEN = 'Got it. That honesty matters. What would make this feel more like YOUR choice instead of a burden \u2014 even one word or phrase?';
        var frameAskES = 'Entendido. Esa honestidad importa. \u00bfQu\u00e9 har\u00eda que esto se sintiera m\u00e1s como TU elecci\u00f3n en lugar de una carga \u2014 aunque sea una palabra o frase?';
        var frameAsk = _lang === 'es' ? frameAskES : frameAskEN;
        useAppendBubble(frameAsk, 'docb');
        _useHistory.push({ role: 'assistant', content: frameAsk });
        _useAwaitingReframe = true;
        return;
      } else {
        // They're excited — acknowledge and move on
        var excitedMsgEN = 'That energy is the fuel. Let\u2019s go \u2014 ' + (_useTool.en || 'this activity') + ' is ready for you.';
        var excitedMsgES = 'Esa energ\u00eda es el combustible. Vamos \u2014 ' + (_useTool.en || 'esta actividad') + ' te est\u00e1 esperando.';
        useAppendBubble(_lang === 'es' ? excitedMsgES : excitedMsgEN, 'docb');
        _useHistory.push({ role: 'assistant', content: _lang === 'es' ? excitedMsgES : excitedMsgEN });
        return;
      }
    }

    if (_useAwaitingReframe && _useTool) {
      _useAwaitingReframe = false;
      var theFrame = text.trim();
      if (theFrame.length > 1) {
        _useTool.mentalFilter = theFrame;
        if (_toolsData && _toolsData.confirmedTools) {
          var mfIdx;
          for (mfIdx = 0; mfIdx < _toolsData.confirmedTools.length; mfIdx++) {
            var mfTool = _toolsData.confirmedTools[mfIdx];
            if (mfTool.en === _useTool.en && mfTool.obligation === _useTool.obligation) {
              _toolsData.confirmedTools[mfIdx].mentalFilter = theFrame;
              break;
            }
          }
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
            data: pwsToolsPayload()
          }).catch(function() {});
        }
        var savedFrameEN = '\u2728 Saved: \u201c' + theFrame + '\u201d \u2014 that\u2019s your frame. Every time you launch this, you\u2019ll see it first.';
        var savedFrameES = '\u2728 Guardado: \u201c' + theFrame + '\u201d \u2014 ese es tu marco. Cada vez que lances esto, lo ver\u00e1s primero.';
        useAppendBubble(_lang === 'es' ? savedFrameES : savedFrameEN, 'docb');
        _useHistory.push({ role: 'assistant', content: _lang === 'es' ? savedFrameES : savedFrameEN });
      }
      return;
    }
    // -------------------------------------------------------

    var typingId = 'pws-use-typing-' + Date.now();
    var feed = document.getElementById('pwsUseFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }
    var toolFullDesc = _useTool ? (_useTool.en || '') : '';
    var pbContext = _usePB ? ('Personal best: ' + pwsFmtSeconds(_usePB.best) + '. Last session: ' + (_usePB.lastSeconds ? pwsFmtSeconds(_usePB.lastSeconds) : 'n/a') + ' on ' + (_usePB.lastDate || 'unknown') + '. Total completions: ' + (_usePB.count || 1) + '.') : '';
    var forcedOpener, systemPrompt;
    var imgCapability = 'IMAGE CAPABILITY: You can receive and describe screenshots and photos. If the member shares an image, describe what you see and connect it to their work.\n\n';
    if (_useTool && (_useTool.isTalent === true || _useTool.type === 'talent')) {
      var projName = _useTool.obligation || 'your project';
      var allProjTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(function(ct) { return ct.obligation === _useTool.obligation && (ct.isTalent === true || ct.type === 'talent'); }) : [];
      var cfgCount = allProjTools.filter(function(ct) { return ct.configured === true; }).length;
      var totalCt = allProjTools.length;
      var toolNames = allProjTools.map(function(ct) { return ct.en || ''; }).filter(Boolean).join(', ');
      forcedOpener = _useTool.obligation + ' \u2014 ' + cfgCount + ' of ' + totalCt + ' tools configured.';
      systemPrompt = imgCapability + 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' + NL +
        'The member is working on their talent project: "' + projName + '".' + NL +
        'Available tools for this project: ' + toolNames + '.' + NL +
        'Configured so far: ' + cfgCount + ' of ' + totalCt + '.' + NL +
        'Your job: help them configure each tool specifically for this project. Ask what links, contacts, reminders, or timer settings they want for each one. One tool at a time.' + NL +
        'When they describe a setting, confirm it and tell them it is saved. Be warm, direct, brief. 2-3 sentences max.' + NL +
        'Do NOT ask generic coaching questions. This is a setup session, not a reflection session.' + NL +
        'Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    } else if (_useTool && _useTool._fromLaunch && !_useTool.configured) {
      forcedOpener = 'One final step. Your tools are below. I\u0027m here to help you as you execute your activity.';
      systemPrompt = imgCapability + 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' + NL +
        'The member\u0027s tool prescription is: ' + toolFullDesc + NL +
        'Use it as background context only. Do not quote it back. Do not summarize it. Ask one focused question at a time to help them execute their activity right now.' + NL +
        'Stay warm, present, and direct. 2\u20133 sentences max. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    } else {
      forcedOpener = 'We built this together:' + NL + NL + toolFullDesc;
      if (pbContext) forcedOpener += NL + NL + pbContext;
      systemPrompt = imgCapability + 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS. Coach this member through their tool. Stay warm, real, on their side. 2\u20133 sentences max.' + NL + 'THE RECOGNITION: if the member sends a photo or document of something that arrived in their life, do NOT file a report. FIRST LINE: recognize it warmly and specifically, like a friend who instantly sees what this is (e.g. \"Ah \u2014 I see you have an anniversary coming.\" or \"I see there\u2019s trouble with this lawyer.\"). THEN the two or three facts that matter from it. LAST LINE: ask what they want the tool to do for them, offering endings fitted to what you saw (write the letter, find the gift, get the money request ready, build the plan). For that recognition turn you may use up to 6 sentences.' + NL + 'Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    }
    var priorTurns = _useHistory.slice(1);
    var messages = [{ role: 'assistant', content: forcedOpener }].concat(priorTurns);
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: messages })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { useAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _useHistory.push({ role: 'assistant', content: reply }); useAppendBubble(reply, 'docb');
      if (typeof DocBCore !== 'undefined') { DocBCore.speak(reply, function(){ return _lang; }); }
      // FIX 2: Auto-resume mic after Doc B replies (hands-free conversation)
      if (_useMicActive === false) {
        var SR2 = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SR2) {
          setTimeout(function() {
            useStopMic();
            _useRecognizer = new SR2();
            _useRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
            _useRecognizer.continuous = true; _useRecognizer.interimResults = true;
            _useRecognizer.onresult = function(e) { var t = ''; for (var ri = 0; ri < e.results.length; ri++) { t += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsUseInput'); if (inp) inp.value = t.trim(); };
            _useRecognizer.onend = function() { _useMicActive = false; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.remove('listening'); };
            _useRecognizer.start(); _useMicActive = true;
            var micBtn = document.getElementById('pwsUseMic'); if (micBtn) micBtn.classList.add('listening');
          }, 800);
        }
      }
      if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
        var allTalentTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(function(ct) { return ct.obligation === _useTool.obligation && (ct.isTalent || ct.type === 'talent'); }) : [];
        var cfgNow = allTalentTools.filter(function(ct) { return ct.configured === true; }).length;
        if (cfgNow === allTalentTools.length && allTalentTools.length > 0) {
          var historyText = _useHistory.map(function(m) { return m.content; }).join(' ');
          allTalentTools.forEach(function(ct) {
            var toolName = ct.en || '';
            var summaryMatch = historyText.match(new RegExp('([^\\n]+)' + toolName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '[^\\n]*configured[^\\n]*', 'i'));
            if (summaryMatch && summaryMatch[1] && summaryMatch[1].trim().length > toolName.length) {
              ct.en = summaryMatch[1].trim().substring(0, 120);
            }
          });
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
            data: pwsToolsPayload() });
          pwsClearActivateSession();
          pwsRenderToolsTile();
          var slotObl = _useTool.obligation || '';
          if (slotObl) {
            if (!_dayData) _dayData = {};
            if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
            var slotExists = false;
            for (var si = 0; si < _dayData.finalSchedule.length; si++) {
              var sl = _dayData.finalSchedule[si];
              if (sl.isMastery && (sl.obligation === slotObl || sl.label === slotObl + ' Practice')) { slotExists = true; break; }
            }
            if (!slotExists) {
              _dayData.finalSchedule.push({
                label:        slotObl + ' Practice',
                activity:     slotObl + ' Practice',
                obligation:   slotObl,
                stage:        'Stage 1: Discovery',
                isTalent:     true,
                isMastery:    true,
                projectId:    _useTool.projectId || '',
                masteryStage: 1,
                type:         'obligation',
                ownsIt:       true
              });
              pwsSaveDaySchedule();
              pwsRenderDayTile();
            }
          }
        }
        pwsSaveActivateSession();
      }
      var replyMentionsMusic = /music|playlist|song|spotify|youtube|track|link|paste/i.test(reply);
      var noLinkYet = !(_useTool && _useTool.link) && !_musicSaved;
      if (replyMentionsMusic && noLinkYet && !document.getElementById('pwsMusicPrompt')) {
        var mp = document.createElement('div'); mp.className = 'pws-music-prompt'; mp.id = 'pwsMusicPrompt';
        var mpInp = document.createElement('input'); mpInp.type = 'text'; mpInp.className = 'pws-music-input'; mpInp.id = 'pwsMusicLinkInput';
        mpInp.placeholder = _lang === 'es' ? 'Pega tu enlace de Spotify o YouTube...' : 'Paste your Spotify or YouTube link...';
        var mpSave = document.createElement('button'); mpSave.className = 'pws-music-save-btn'; mpSave.textContent = _lang === 'es' ? 'Guardar' : 'Save'; mpSave.onclick = pwsSaveMusicLink;
        mp.appendChild(mpInp); mp.appendChild(mpSave); useAppendNode(mp);
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      useAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  };

  var PWS_LAW_TIPS = {
    'Law of Limits': 'Law of Limits \u2014 Every person has the right to be safe. Enforced by boundaries. Obeyed by respecting them.',
    'Law of Responsibility': 'Law of Responsibility \u2014 Every person has the right to possess what belongs to them.',
    'Law of Respect': 'Law of Respect \u2014 Every person has the right to belong. Enforced by inclusion.',
    'Law of Talent': 'Law of Talent \u2014 Every person has the right to self-determination. Enforced by choice.'
  };

  function pwsStripMarkdown(text) {
    return (text || '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/^#{1,6}\s+/gm, '');
  }

  function pwsMarkupLaws(text) {
    var laws = ['Law of Limits', 'Law of Responsibility', 'Law of Respect', 'Law of Talent'];
    var result = escHtml(text);
    laws.forEach(function(law) {
      var tip = PWS_LAW_TIPS[law] || ''; var safeEn = escHtml(tip);
      var escapedLaw = law.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      result = result.replace(new RegExp(escapedLaw, 'g'), '<span class="pws-law-ref">' + escHtml(law) + '<span class="pws-law-tip">' + safeEn + '</span></span>');
    });
    return result;
  }

  function useAppendBubble(text, role) {
    if (role === 'docb' && window.FindME && window.FindME.quiet) { window.FindME.quiet(); }
    var feed = document.getElementById('pwsUseFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.style.whiteSpace = 'pre-line';
    if (role === 'docb') div.innerHTML = pwsMarkupLaws(pwsStripMarkdown(text)); else div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  function useAppendNode(node) { var feed = document.getElementById('pwsUseFeed'); if (!feed || !node) return; feed.appendChild(node); feed.scrollTop = feed.scrollHeight; }

  function pwsFmtSeconds(s) { var m = Math.floor(s / 60); var sec = s % 60; return m + ':' + (sec < 10 ? '0' : '') + sec; }

  window.pwsStartTimer = function pwsStartTimer() {
    if (_timerInterval) return;
    _useStartTime = Date.now();
    var footer = document.getElementById('pwsUseFooter');
    if (footer) {
      var startBtn = document.getElementById('pwsUseStartTimerBtn'); if (startBtn) startBtn.parentNode.removeChild(startBtn);
      var stopBtn = document.createElement('button'); stopBtn.className = 'pws-use-footer-btn stop-timer'; stopBtn.id = 'pwsUseStopTimerBtn';
      stopBtn.textContent = _lang === 'es' ? '\u2713 Listo \u2014 Parar' : '\u2713 Done \u2014 Stop'; stopBtn.onclick = pwsStopTimer; footer.insertBefore(stopBtn, footer.firstChild);
    }
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'block';
    var pbLabelEl = document.getElementById('pwsTimerPbLabel');
    if (pbLabelEl) pbLabelEl.textContent = _usePB ? (_lang === 'es' ? 'Mejor: ' + pwsFmtSeconds(_usePB.best) : 'Best: ' + pwsFmtSeconds(_usePB.best)) : (_lang === 'es' ? 'Primer intento' : 'First attempt');
    _timerStart = Date.now(); _timerSeconds = 0;
    _timerInterval = setInterval(function() { _timerSeconds = Math.floor((Date.now() - _timerStart) / 1000); var el = document.getElementById('pwsTimerDisplay'); if (el) el.textContent = pwsFmtSeconds(_timerSeconds); }, 1000);
  };

  window.pwsStopTimer = function pwsStopTimer() {
    if (!_timerInterval) return; clearInterval(_timerInterval); _timerInterval = null;
    var elapsed = _timerSeconds;
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'none';
    var footer = document.getElementById('pwsUseFooter'); if (footer) { var stopBtn = document.getElementById('pwsUseStopTimerBtn'); if (stopBtn) stopBtn.parentNode.removeChild(stopBtn); }
    var prevBest = _usePB ? _usePB.best : null;
    var isNewBest = (prevBest === null || elapsed < prevBest);
    var newPB = { best: isNewBest ? elapsed : prevBest, lastSeconds: elapsed, lastDate: new Date().toLocaleDateString(), count: (_usePB ? (_usePB.count || 0) : 0) + 1 };
    _usePB = newPB; try { localStorage.setItem(_pbKey, JSON.stringify(newPB)); } catch(e) {}
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId, date: pwsLocalDate(), windowKey: 'tool_use_' + oblKeyFromTool(), activityLabel: (_useTool && _useTool.obligation) || 'tool use', completed: true, note: 'timer: ' + pwsFmtSeconds(elapsed) + (isNewBest ? ' (new PB)' : ''), lawTag: pwsLawTag(_useTool) });
    if (isNewBest) {
      var cel = document.createElement('div'); cel.className = 'pws-pb-celebration';
      var headline = document.createElement('div'); headline.className = 'pws-pb-headline'; headline.textContent = _lang === 'es' ? '\u00a1Nuevo R\u00e9cord Personal!' : 'New Personal Best!';
      var pbTime = document.createElement('div'); pbTime.className = 'pws-pb-time'; pbTime.textContent = pwsFmtSeconds(elapsed);
      cel.appendChild(headline); cel.appendChild(pbTime);
      var zone3 = document.getElementById('pwsToolPanelZone');
      if (zone3) { zone3.innerHTML = ''; zone3.appendChild(cel); } else { useAppendNode(cel); }
      useAppendBubble(_lang === 'es' ? 'Lo lograste. ' + pwsFmtSeconds(elapsed) + '. Eso queda registrado.' : 'You did it. ' + pwsFmtSeconds(elapsed) + '. That\u0027s on the board now.', 'docb');
    } else {
      var zone3b = document.getElementById('pwsToolPanelZone');
      var resultMsg = _lang === 'es' ? pwsFmtSeconds(elapsed) + ' hoy. Tu mejor sigue siendo ' + pwsFmtSeconds(prevBest) + '.' : pwsFmtSeconds(elapsed) + ' today. Best: ' + pwsFmtSeconds(prevBest) + '.';
      if (zone3b) { zone3b.innerHTML = '<div style="font-family:\'Cinzel\',serif;font-size:22px !important;color:#c8a84b;text-align:center;padding:16px;">' + resultMsg + '</div>'; }
      useAppendBubble(_lang === 'es' ? pwsFmtSeconds(elapsed) + ' hoy. Tu mejor sigue siendo ' + pwsFmtSeconds(prevBest) + '. Ma\u00f1ana.' : pwsFmtSeconds(elapsed) + ' today. Your best is still ' + pwsFmtSeconds(prevBest) + '. Tomorrow.', 'docb');
    }
    _useStartTime = null;
  };

  function pwsLawTag(tool) {
    if (!tool) return 'responsibility';
    if (pwsToolTracesToContribution(tool)) return 'contribution';
    if (tool.isTalent === true || tool.type === 'talent') return 'talent';
    if (tool.lawTag) return tool.lawTag;
    return 'responsibility';
  }

  // v91: a tool traces to a Contributions dot when it carries a cid link
  // (future foundry builds) or its obligation text matches a dot's text.
  // Matched tools log lawTag:'contribution' so the engine can split the
  // act into Respect + Responsibility (ratified constants, GamesCode v3.3).
  function pwsToolTracesToContribution(tool) {
    if (!tool) return false;
    if (tool.contributionCid) return true;
    if (!_obsData || !_obsData.confirmedObs || !_obsData.confirmedObs.length) return false;
    var tObl = ((tool.obligation || '') + '').toLowerCase().trim();
    if (!tObl) return false;
    for (var ci = 0; ci < _obsData.confirmedObs.length; ci++) {
      var ob = _obsData.confirmedObs[ci];
      var oText = ob && ob.text ? (ob.text + '').toLowerCase().trim() : '';
      if (oText && oText === tObl) return true;
    }
    return false;
  }

  function pwsLawTagFromSlot(s) {
    if (!s) return 'responsibility';
    if (s.contributionCid) return 'contribution';
    if (s.contributionId !== undefined && s.contributionId !== null) return 'contribution';
    // v92: a slot may declare its own law -- 'Clinical Work + Academy Open'
    // is Talent because the member says so. Validated to the four laws.
    if (s.lawTag === 'talent' || s.lawTag === 'respect' || s.lawTag === 'responsibility' || s.lawTag === 'limits') return s.lawTag;
    if (s.isProjectSlot === true) return 'talent';
    if (s.isMastery === true) return 'talent';
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    var sLabel = (s.label || '').toLowerCase().trim();
    for (var _ti = 0; _ti < validTools.length; _ti++) {
      var _ct = validTools[_ti];
      var _tObl = (_ct.obligation || _ct.label || '').toLowerCase().trim();
      if (_tObl && (_tObl === sLabel || sLabel.indexOf(_tObl.substring(0,8)) !== -1)) {
        return pwsLawTag(_ct);
      }
    }
    return 'responsibility';
  }

  function oblKeyFromTool() { if (!_useTool) return 'unknown'; return (_useTool.obligation || _useTool.en || 'tool').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 40); }

  window.pwsSaveMusicLink = function pwsSaveMusicLink() {
    var inp = document.getElementById('pwsMusicLinkInput'); if (!inp || !inp.value.trim()) return;
    var link = inp.value.trim();
    var savedLink = /^https?:\/\//i.test(link) ? link : 'https://www.youtube.com/results?search_query=' + encodeURIComponent(link);
    if (_useTool) {
      _useTool.link = savedLink;
      if (_toolsData && _toolsData.confirmedTools) {
        _toolsData.confirmedTools.forEach(function(t) { if (t.obligation === _useTool.obligation && t.en === _useTool.en) t.link = savedLink; });
        post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
      }
    }
    var prompt = document.getElementById('pwsMusicPrompt'); if (prompt) prompt.parentNode.removeChild(prompt);
    var footer = document.getElementById('pwsUseFooter');
    if (footer && !document.getElementById('pwsUsePlayBtn')) {
      var playBtn = document.createElement('button'); playBtn.className = 'pws-use-footer-btn open-music'; playBtn.id = 'pwsUsePlayBtn';
      playBtn.textContent = _lang === 'es' ? '\u25b6 Reproducir' : '\u25b6 Play'; playBtn.onclick = function() { pwsOpenDeparture(savedLink, (_useTool && _useTool.en) ? _useTool.en : savedLink); }; footer.insertBefore(playBtn, footer.firstChild);
    }
    pwsOpenDeparture(savedLink, (_useTool && _useTool.en) ? _useTool.en : savedLink); _musicSaved = true;
    useAppendBubble(_lang === 'es' ? 'Guardado. La pr\u00f3xima vez solo toca Reproducir.' : 'Saved. Next time just tap Play.', 'docb');
  };

  window.pwsMarkDone = function pwsMarkDone() {
    if (window.FindME && window.FindME.chime) { window.FindME.chime('done'); }
    pwsPlaySound('medal'); /* v87: the ding awaits its medal.wav on the Sound Shelf */
    var footer = document.getElementById('pwsUseFooter'); if (footer) { var doneBtn = document.getElementById('pwsUseMarkDoneBtn'); if (doneBtn) doneBtn.parentNode.removeChild(doneBtn); }
    var oblLabel = (_useTool && !_useTool._oblDirty && _useTool.obligation) ? _useTool.obligation : '';
    var matched = false;
    if (_obsData && _obsData.confirmedObs && oblLabel) {
      _obsData.confirmedObs.forEach(function(o) { if (o.text && o.text.toLowerCase().trim() === oblLabel.toLowerCase().trim()) { o.state = 'crushing'; matched = true; } });
      if (matched) {
        post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId, data: pwsStationPayload() });
        pwsRenderStationTile(); pwsRenderToolsTile();
      }
    }
    if (_dayData && _dayData.finalSchedule && oblLabel) {
      var sLabel = oblLabel.toLowerCase().trim();
      var dayMatched = false;
      _dayData.finalSchedule.forEach(function(s) {
        var slotLabel = (s.label || s.activity || '').toLowerCase().trim();
        if (slotLabel && (slotLabel === sLabel || slotLabel.indexOf(sLabel.substring(0,8)) !== -1)) {
          s._checkedIn = 'done'; dayMatched = true;
        }
      });
      if (dayMatched) { pwsSaveDaySchedule(); pwsRenderDayTile(); }
    }
    var durationSec = _useStartTime ? Math.round((Date.now() - _useStartTime) / 1000) : 0;
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId, date: pwsLocalDate(), windowKey: 'tool_done_' + oblKeyFromTool(), activityLabel: oblLabel || 'tool use', completed: true, note: 'marked done via USE overlay', lawTag: pwsLawTag(_useTool), data: { date: new Date().toISOString(), obligationText: (_useTool && _useTool.obligation) || '', toolName: (_useTool && _useTool.en) ? _useTool.en.substring(0, 60) : '', durationSeconds: durationSec, outcome: 'completed' } });
    _useStartTime = null;

    if (_useTool && _toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.configured = true; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
      pwsRenderToolsTile();
    }

    var doneNode = document.createElement('div'); doneNode.className = 'pws-done-confirm';
    var doneText = document.createElement('div'); doneText.className = 'pws-done-confirm-text';
    doneText.textContent = matched ? (_lang === 'es' ? '\u2713 \u201c' + oblLabel + '\u201d \u2014 Lo lograste.' : '\u2713 \u201c' + oblLabel + '\u201d \u2014 Done.') : (_lang === 'es' ? '\u2713 Marcado como listo.' : '\u2713 Marked done.');
    doneNode.appendChild(doneText); useAppendNode(doneNode);
    setTimeout(function() { useAppendBubble(_lang === 'es' ? 'Bien hecho. Eso cuenta.' : 'Well done. That counts.', 'docb'); }, 400);
  };

  function unlockStopMic() {
    if (_unlockRecognizer) { try { _unlockRecognizer.stop(); _unlockRecognizer.onresult = null; _unlockRecognizer.onend = null; } catch(e) {} _unlockRecognizer = null; }
    _unlockMicActive = false; var btn = document.getElementById('pwsUnlockMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleUnlockMic = function pwsToggleUnlockMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
    if (_unlockMicActive) { unlockStopMic(); return; }
    unlockStopMic(); _unlockRecognizer = new SR(); _unlockRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US'; _unlockRecognizer.continuous = true; _unlockRecognizer.interimResults = true;
    _unlockRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsUnlockInput'); if (inp) inp.value = transcript.trim(); };
    _unlockRecognizer.onend = function() { _unlockMicActive = false; var btn = document.getElementById('pwsUnlockMic'); if (btn) btn.classList.remove('listening'); };
    _unlockRecognizer.start(); _unlockMicActive = true; var btn = document.getElementById('pwsUnlockMic'); if (btn) btn.classList.add('listening');
  };

  window.pwsOpenUnlock = function pwsOpenUnlock(toolIdx) {
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    var tool = validTools[toolIdx]; if (!tool) return;
    _unlockTool = tool; _unlockHistory = [];
    var titleEl = document.getElementById('pwsUnlockTitle'); if (titleEl) titleEl.textContent = _lang === 'es' ? 'Desbloquear Herramienta' : 'Unlock Tool';
    var feed = document.getElementById('pwsUnlockFeed'); if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsUnlockOverlay'); if (ov) ov.classList.add('open');
    var toolName = pwsShortTitle(tool.en || tool.obligation || 'this tool');
    var openingEN = 'You want to use \u201c' + toolName + '\u201d.' + NL + NL + 'Before I open it, I want to understand how you plan to use it responsibly.' + NL + NL + 'What does this tool help you with?';
    var openingES = 'Quieres usar \u201c' + toolName + '\u201d.' + NL + NL + 'Antes de abrirlo, quiero entender c\u00f3mo planeas usarlo de manera responsable.' + NL + NL + '\u00bfPara qu\u00e9 te ayuda esta herramienta?';
    var openingMsg = _lang === 'es' ? openingES : openingEN;
    unlockAppendBubble(openingMsg, 'docb'); _unlockHistory.push({ role: 'assistant', content: openingMsg });
    var inp = document.getElementById('pwsUnlockInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
  };

  window.pwsCloseUnlock = function pwsCloseUnlock() {
    unlockStopMic(); var ov = document.getElementById('pwsUnlockOverlay'); if (ov) ov.classList.remove('open'); _unlockTool = null; _unlockHistory = [];
  };

  window.pwsSendUnlock = function pwsSendUnlock() {
    var inp = document.getElementById('pwsUnlockInput'); if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim(); inp.value = ''; unlockStopMic();
    unlockAppendBubble(text, 'member'); _unlockHistory.push({ role: 'user', content: text });
    var typingId = 'pws-unlock-typing-' + Date.now();
    var feed = document.getElementById('pwsUnlockFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }
    var toolName = _unlockTool ? pwsShortTitle(_unlockTool.en || _unlockTool.obligation || 'this tool') : 'this tool';
    var systemPrompt = 'You are Doc B on the 4 LAWS Academy platform. A member wants to unlock a tool. Have a real conversation about responsible use. Ask one focused question at a time. When satisfied, end your response with UNLOCK_READY on its own line. Tool: \u201c' + toolName + '\u201d. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _unlockHistory })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { unlockAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _unlockHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('UNLOCK_READY');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        unlockAppendBubble(displayMsg || (_lang === 'es' ? 'Listo. Herramienta desbloqueada.' : 'You\u0027re ready. Tool unlocked.'), 'docb');
        if (_unlockTool) pwsMarkToolUnlocked(_unlockTool);
        setTimeout(function() { pwsCloseUnlock(); pwsRenderToolsTile(); }, 1800);
      } else { unlockAppendBubble(reply, 'docb'); }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      unlockAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  };

  function unlockAppendBubble(text, role) {
    var feed = document.getElementById('pwsUnlockFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.style.whiteSpace = 'pre-line'; div.textContent = text;
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  var _modifyTile = '', _modifyHistory = [], _modifyDraft = null;
  var _modifyMicActive = false, _modifyRecognizer = null;

  function modifyStopMic() {
    if (_modifyRecognizer) { try { _modifyRecognizer.stop(); _modifyRecognizer.onresult = null; _modifyRecognizer.onend = null; } catch(e) {} _modifyRecognizer = null; }
    _modifyMicActive = false; var btn = document.getElementById('pwsModifyMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleModifyMic = function pwsToggleModifyMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
    if (_modifyMicActive) { modifyStopMic(); return; }
    modifyStopMic(); _modifyRecognizer = new SR(); _modifyRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US'; _modifyRecognizer.continuous = true; _modifyRecognizer.interimResults = true;
    _modifyRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsModifyInput'); if (inp) inp.value = transcript.trim(); };
    _modifyRecognizer.onend = function() { _modifyMicActive = false; var btn = document.getElementById('pwsModifyMic'); if (btn) btn.classList.remove('listening'); };
    _modifyRecognizer.start(); _modifyMicActive = true; var btn = document.getElementById('pwsModifyMic'); if (btn) btn.classList.add('listening');
  };

  window.pwsOpenModify = function pwsOpenModify(tileKey) {
    _modifyTile = tileKey; _modifyHistory = []; _modifyDraft = null;
    var titleEl = document.getElementById('pwsModifyTitle');
    var titles = { station: { en: 'Update My Contributions', es: 'Actualizar Mis Contribuciones' }, tools: { en: 'Update My Tools', es: 'Actualizar Mis Herramientas' }, day: { en: 'Update My Day', es: 'Actualizar Mi D\u00eda' } };
    var t = titles[tileKey] || titles.station;
    if (titleEl) titleEl.innerHTML = '<span class="en">' + t.en + '</span><span class="es">' + t.es + '</span>';
    var feed = document.getElementById('pwsModifyFeed'); if (feed) feed.innerHTML = '';
    var actions = document.getElementById('pwsModifyActions'); if (actions) actions.style.display = 'none';
    var ov = document.getElementById('pwsModifyOverlay'); if (ov) ov.classList.add('open');
    var openingEN = '', openingES = '';
    if (tileKey === 'station') {
      var validCount = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs.filter(function(o){ return pwsIsValidObligation(o.text); }).length : 0;
      openingEN = 'You have ' + validCount + ' obligation' + (validCount !== 1 ? 's' : '') + ' on your list.' + NL + NL + 'What has changed?';
      openingES = 'Tienes ' + validCount + ' obligaci\u00f3n' + (validCount !== 1 ? 'es' : '') + ' en tu lista.' + NL + NL + '\u00bfQu\u00e9 ha cambiado?';
    } else if (tileKey === 'tools') {
      var toolCount = (_toolsData && _toolsData.confirmedTools) ? _toolsData.confirmedTools.filter(pwsIsValidTool).length : 0;
      openingEN = 'You have ' + toolCount + ' tool' + (toolCount !== 1 ? 's' : '') + ' built.' + NL + NL + 'What has changed?';
      openingES = 'Tienes ' + toolCount + ' herramienta' + (toolCount !== 1 ? 's' : '') + ' construida' + (toolCount !== 1 ? 's' : '') + '.' + NL + NL + '\u00bfQu\u00e9 ha cambiado?';
    } else if (tileKey === 'day') {
      var dayCount = (_dayData && _dayData.finalSchedule) ? _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; }).length : 0;
      openingEN = 'Your day has ' + dayCount + ' window' + (dayCount !== 1 ? 's' : '') + '.' + NL + NL + 'What has changed?';
      openingES = 'Tu d\u00eda tiene ' + dayCount + ' ventana' + (dayCount !== 1 ? 's' : '') + '.' + NL + NL + '\u00bfQu\u00e9 ha cambiado?';
    }
    modifyAppendBubble(_lang === 'es' ? openingES : openingEN, 'docb');
    _modifyHistory.push({ role: 'assistant', content: _lang === 'es' ? openingES : openingEN });
    var inp = document.getElementById('pwsModifyInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
  };

  window.pwsCloseModify = function pwsCloseModify() {
    modifyStopMic(); var ov = document.getElementById('pwsModifyOverlay'); if (ov) ov.classList.remove('open');
    _modifyTile = ''; _modifyHistory = []; _modifyDraft = null;
  };

  window.pwsSendModify = function pwsSendModify() {
    var inp = document.getElementById('pwsModifyInput'); if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim(); inp.value = ''; modifyStopMic();
    modifyAppendBubble(text, 'member'); _modifyHistory.push({ role: 'user', content: text });
    var typingId = 'pws-modify-typing-' + Date.now();
    var feed = document.getElementById('pwsModifyFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }
    var tileContext = '';
    if (_modifyTile === 'station' && _obsData) { var obs = (_obsData.confirmedObs || []).filter(function(o){ return pwsIsValidObligation(o.text); }); tileContext = 'Current obligations: ' + obs.map(function(o){ return o.text + ' (' + (o.state || 'not-started') + ')'; }).join(', ') + '. whatMatters: ' + (_obsData.whatMatters || 'not set') + '.'; }
    else if (_modifyTile === 'tools' && _toolsData) { var tools = (_toolsData.confirmedTools || []).filter(pwsIsValidTool); tileContext = 'Current tools: ' + tools.map(function(t){ return t.obligation + ' -> ' + t.en; }).join(', ') + '.'; }
    else if (_modifyTile === 'day' && _dayData) { pwsEnsureSlotIds_(_dayData.finalSchedule); var sched = (_dayData.finalSchedule || []).filter(function(s){ return s.ownsIt !== false; }); tileContext = 'Current schedule: ' + sched.map(function(s){ return '[id:' + s.id + '] ' + s.derivedTime + ' ' + s.label + (s.lawTag ? ' [law:' + s.lawTag + ']' : '') + (s.contributionCid ? ' [already linked]' : ''); }).join(', ') + pwsRegistryPromptBlock() + '. Each slot in finalSchedule may carry an optional lawTag field (one of "talent","respect","responsibility","limits") which credits that law in the Trust Score. If the member asks to mark or credit a window as one of the four laws, set lawTag on that slot. CRITICAL: every slot listed above has an id shown as [id:...] -- when you return finalSchedule, you MUST include that exact same id value on that slot, unchanged, even if you reword its label or change its time. Only leave id out for a genuinely brand-new slot that did not exist above. Always return the COMPLETE schedule as finalSchedule, keeping every slot with its exact label, time, and id.'; }
    var systemPrompt = 'You are Doc B on the 4 LAWS Academy platform. Member wants to update their ' + _modifyTile + ' tile. ' + tileContext + ' Ask what changed, understand the reason, then propose the specific update. When ready, end with READY_TO_SAVE followed by the raw JSON object only -- no markdown, no code fences, no commentary after it. NEVER tell the member a change is saved or done: saving happens only when they press the SAVE button that appears after your READY_TO_SAVE block. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _modifyHistory })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { modifyAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _modifyHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('READY_TO_SAVE');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        var jsonStr = reply.substring(markerIdx + 'READY_TO_SAVE'.length).trim();
        // v93: Doc B sometimes wraps the JSON in markdown code fences -- strip
        // them, then isolate first { .. last } as belt-and-suspenders.
        jsonStr = jsonStr.replace(/^```[a-zA-Z]*\s*/, '').replace(/```\s*$/, '').trim();
        var _fb = jsonStr.indexOf('{'); var _lb = jsonStr.lastIndexOf('}');
        if (_fb !== -1 && _lb > _fb) jsonStr = jsonStr.substring(_fb, _lb + 1);
        try { _modifyDraft = JSON.parse(jsonStr); } catch(e) { _modifyDraft = null; }
        if (_modifyDraft) {
          var actions = document.getElementById('pwsModifyActions'); if (actions) actions.style.display = 'flex';
          modifyAppendBubble(displayMsg || (_lang === 'es' ? 'Cambios listos.' : 'Changes ready.'), 'docb');
        } else {
          // v93: honest failure instead of a false 'Changes ready.'
          modifyAppendBubble(_lang === 'es' ? 'No pude preparar el cambio \u2014 p\u00eddemelo de nuevo.' : 'I could not prepare that change \u2014 please ask me again.', 'docb');
        }
      } else { modifyAppendBubble(reply, 'docb'); }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      modifyAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  };

  window.pwsSaveModify = function pwsSaveModify() {
    if (!_modifyDraft || !_modifyTile) return;
    var actionMap = { station: 'pwsSaveStation', tools: 'pwsSaveTools', day: 'pwsSaveDay' };
    var action = actionMap[_modifyTile]; if (!action) return;
    if (_modifyTile === 'station' && _obsData) { if (_modifyDraft.confirmedObs) _obsData.confirmedObs = pwsCarryCids(_obsData.confirmedObs, _modifyDraft.confirmedObs); if (_modifyDraft.whatMatters !== undefined) _obsData.whatMatters = _modifyDraft.whatMatters; }
    else if (_modifyTile === 'tools' && _toolsData) { if (_modifyDraft.confirmedTools) _toolsData.confirmedTools = _modifyDraft.confirmedTools; }
    else if (_modifyTile === 'day' && _dayData) { if (_modifyDraft.finalSchedule) { _dayData.finalSchedule = pwsCarrySlotFields(_dayData.finalSchedule, pwsResolveServesIndex(_modifyDraft.finalSchedule)); pwsEnsureSlotIds_(_dayData.finalSchedule); } }
    var saveData = {};
    if (_modifyTile === 'station') saveData = pwsStationPayload();
    else if (_modifyTile === 'tools') saveData = pwsToolsPayload();
    else if (_modifyTile === 'day') saveData = { finalSchedule: _dayData.finalSchedule, wakeTime: _dayData.wakeTime || '', bedTime: _dayData.bedTime || '', rankedPriorities: _dayData.rankedPriorities || [], howGoodCould: _dayData.howGoodCould || '', howGoodWant: _dayData.howGoodWant || '', _manualOrder: _dayData._manualOrder || false };
    post({ action: action, sessionId: _session, requestingMemberId: _memberId, data: saveData });
    if (_modifyTile === 'station') pwsRenderStationTile(); else if (_modifyTile === 'tools') pwsRenderToolsTile(); else if (_modifyTile === 'day') pwsRenderDayTile();
    modifyAppendBubble(_lang === 'es' ? 'Guardado. Tu ' + _modifyTile + ' ha sido actualizado.' : 'Saved. Your ' + _modifyTile + ' has been updated.', 'docb');
    var actions = document.getElementById('pwsModifyActions'); if (actions) actions.style.display = 'none';
    setTimeout(pwsCloseModify, 1800);
  };

  function modifyAppendBubble(text, role) {
    var feed = document.getElementById('pwsModifyFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.style.whiteSpace = 'pre-line'; div.textContent = text;
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  window.pwsSendDocB = function pwsSendDocB() {
    var inp = document.getElementById('pwsDocBInput');
    var hasPending = (typeof DocBCore !== 'undefined') && !!DocBCore.getPending();
    if (!inp || (!inp.value.trim() && !hasPending)) return;
    var text = inp.value.trim(); inp.value = ''; pwsStopMic();

    if (text && pwsDocBCheckNavCmd(text)) return;

    var displayText = (typeof DocBCore !== 'undefined') ? DocBCore.displayText(text, function(){ return _lang; }) : text;
    var userContent = (typeof DocBCore !== 'undefined') ? DocBCore.buildContent(text, function(){ return _lang; }) : text;

    pwsAppendBubble(displayText, 'member');
    _docbHistory.push({ role: 'user', content: userContent });
    var typingId = 'pws-typing-' + Date.now();
    var feed = document.getElementById('pwsDocBFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb pws-typing'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }

    var mn3 = localStorage.getItem('4laws-display-name') || 'Eduardo';
    var now3 = new Date();
    var cp = ['Member: '+mn3,'Time: '+now3.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})+', '+now3.toLocaleDateString([],{weekday:'long'})];
    if (_obsData && _obsData.confirmedObs && _obsData.confirmedObs.length) { cp.push('Obligations: '+_obsData.confirmedObs.map(function(o){return o.text+' ('+(o.state||'pending')+')';}).join(', ')); }
    if (_dayData && _dayData.finalSchedule && _dayData.finalSchedule.length) {
      var cw3 = pwsFindCurrentWindow(_dayData.finalSchedule.filter(function(s){return s.ownsIt!==false;}));
      if (cw3) cp.push('Current window: '+cw3.label);
      cp.push('Schedule: '+_dayData.finalSchedule.map(function(s){return s.label+(s.time?' @ '+s.time:'');}).join(' | '));
    }
    if (_twsProject && _twsProject.name) { cp.push('Project: '+_twsProject.name+' (Stage '+(_twsProject.masteryStage||1)+', '+(_twsProject.sessionCount||0)+' sessions)'); }
    var systemPrompt = 'You are Doc B, header co-pilot on '+mn3+'\'s PWS at 4 LAWS Academy. Voice of Dr. Eduardo Bustamante, creator of the 4 LAWS. '+
      'Context: '+cp.join('. ')+'. Be warm, direct, under 3 sentences. Respond in '+(_lang==='es'?'Spanish':'English')+'.';

    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _docbHistory.slice(-14) })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content && d.content[0]) reply = d.content[0].text || '';
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (reply) {
        _docbHistory.push({ role: 'assistant', content: reply });
        pwsAppendBubble(reply, 'docb');
        if (typeof DocBCore !== 'undefined') DocBCore.speak(reply, function(){ return _lang; });
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsAppendBubble(_lang === 'es' ? 'Intenta de nuevo en un momento.' : 'Try again in a moment.', 'docb');
    });
  };

  function pwsAppendBubble(text, role) {
    var feed = document.getElementById('pwsDocBFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  var _micActive = false, _recognition = null;
  function pwsStopMic() {
    if (_recognition) { try { _recognition.stop(); _recognition.onresult = null; _recognition.onend = null; } catch(e) {} _recognition = null; }
    _micActive = false; var btn = document.getElementById('pwsDocBMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleMic = function pwsToggleMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) { pwsAppendBubble('Microphone not supported in this browser.', 'docb'); return; }
    if (_micActive) { pwsStopMic(); return; }
    pwsStopMic(); _recognition = new SR(); _recognition.lang = _lang === 'es' ? 'es-US' : 'en-US'; _recognition.continuous = true; _recognition.interimResults = true;
    _recognition.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsDocBInput'); if (inp) inp.value = transcript.trim(); };
    _recognition.onend = function() { _micActive = false; var btn = document.getElementById('pwsDocBMic'); if (btn) btn.classList.remove('listening'); };
    _recognition.start(); _micActive = true; var btn = document.getElementById('pwsDocBMic'); if (btn) btn.classList.add('listening');
  };

  function pwsApplyLang() {
    var root = document.getElementById('pwsRoot');
    if (root) root.setAttribute('data-lang', _lang);
  }

  window.pwsSetLang = function pwsSetLang(lang) {
    _lang = lang; var root = document.getElementById('pwsRoot'); if (root) root.setAttribute('data-lang', lang);
    var en = document.getElementById('pwsLangEn'); var es = document.getElementById('pwsLangEs');
    if (en) en.classList.toggle('active', lang === 'en'); if (es) es.classList.toggle('active', lang === 'es');
    pwsRenderAll();
  };

  window.pwsOpenPlanMyDay = function pwsOpenPlanMyDay() {
    window.location.href = '/todos';
  };

  window.pwsClosePlanMyDay    = function pwsClosePlanMyDay() {};
  window.pwsPmdSave           = function pwsPmdSave() {};
  window.pwsPmdStartAddMore   = function pwsPmdStartAddMore() { window.location.href = '/todos'; };
  window.pwsPmdSend           = function pwsPmdSend() {};
  window.pwsOpenAdultOnboard  = function pwsOpenAdultOnboard() { window.location.href = '/todos'; };
  window.pwsCloseAdultOnboard = function pwsCloseAdultOnboard() {};


  function pwsTWSPause() {
    twsStopMic();
    var snapshot = {
      history:     _twsHistory,
      phase:       _twsPhase,
      projType:    _twsProjectType,
      category:    _twsSelectedCategory,
      skill:       _twsSelectedSkill,
      savedAt:     new Date().toISOString()
    };
    try { localStorage.setItem(_TWS_PAUSE_KEY + '_' + (_memberId || 'guest'), JSON.stringify(snapshot)); } catch(e) {}
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.remove('open');
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) feed.innerHTML = '';
    _twsHistory = [];
    _twsPhase = 'entry';
    _twsProjectType = '';
    _twsSelectedCategory = '';
    _twsSelectedSkill = '';
    var tile = document.getElementById('pwsTalentTile');
    if (tile) {
      var note = document.createElement('div');
      note.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(200,168,75,0.7);padding:10px 16px;font-style:italic;";
      note.textContent = 'Conversation saved. Tap My Projects to continue where you left off.';
      tile.insertBefore(note, tile.firstChild);
      setTimeout(function() { if (note.parentNode) note.parentNode.removeChild(note); }, 5000);
    }
  }

  function pwsTWSRestorePause() {
    var key = _TWS_PAUSE_KEY + '_' + (_memberId || 'guest');
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return false;
      var snap = JSON.parse(raw);
      if (!snap || !snap.history || !snap.history.length) return false;
      _twsHistory          = snap.history;
      _twsPhase            = snap.phase || 'entry';
      _twsProjectType      = snap.projType || '';
      _twsSelectedCategory = snap.category || '';
      _twsSelectedSkill    = snap.skill || '';
      localStorage.removeItem(key);
      return true;
    } catch(e) { return false; }
  }

  window.pwsOpenTWSFromProject = function() {
    if (!_twsProject || !_twsProject.projectId) { pwsOpenTWS(); return; }
    _twsHistory = [];
    var hasActivities = _twsProject.activities && _twsProject.activities.length;
    _twsPhase = hasActivities ? 'work' : 'main_obstacle';
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.add('open');
    var titleEl = document.getElementById('pwsTWSTitle');
    if (titleEl) titleEl.textContent = _twsProject.title || 'My Project';
    var resumeMsg = hasActivities
      ? 'Welcome back. "' + (_twsProject.title || 'your project') + '" has ' + _twsProject.activities.length + ' workstreams ready. Which one are you working on today?'
      : 'Welcome back. Your project "' + (_twsProject.title || 'your project') + '" is live. What’s standing between you and launch right now?';
    pwsTWSAppendBubble(resumeMsg, 'docb');
    _twsHistory.push({ role: 'assistant', content: resumeMsg });
    var inputRow = document.getElementById('pwsTWSInputRow');
    if (inputRow) inputRow.style.display = 'flex';
  };

  function pwsOpenTWS() {
    var _twsResuming = pwsTWSRestorePause();
    if (!_twsResuming) {
      _twsHistory = [];
      _twsPhase = 'entry';
      _twsSelectedCategory = '';
      _twsSelectedSkill    = '';
      _twsProjectType      = '';
    }
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) feed.innerHTML = '';
    var inputRow = document.getElementById('pwsTWSInputRow');
    if (inputRow) inputRow.style.display = 'flex';
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.add('open');

    var closeBtn = document.getElementById('pwsTWSCloseBtn');
    if (closeBtn) {
      var newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      newClose.addEventListener('click', pwsCloseTWS);
    }
    var sendBtn = document.getElementById('pwsTWSSendBtn');
    if (sendBtn) {
      var newSend = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newSend, sendBtn);
      newSend.addEventListener('click', pwsSendTWS);
    }
    var micBtn = document.getElementById('pwsTWSMic');
    if (micBtn) {
      var micClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(micClone, micBtn);
      micClone.addEventListener('click', pwsToggleTWSMic);
    }
    var pauseBtn = document.getElementById('pwsTWSPauseBtn');
    if (pauseBtn) {
      var pauseClone = pauseBtn.cloneNode(true);
      pauseBtn.parentNode.replaceChild(pauseClone, pauseBtn);
      pauseClone.addEventListener('click', pwsTWSPause);
    }
    var inp = document.getElementById('pwsTWSInput');
    if (inp) {
      inp.value = '';
      var newInp = inp.cloneNode(true);
      inp.parentNode.replaceChild(newInp, inp);
      newInp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendTWS(); }
      });
      setTimeout(function() { newInp.focus(); }, 80);
    }

    if (_twsResuming && _twsHistory.length) {
      var resumeFeed = document.getElementById('pwsTWSFeed');
      if (resumeFeed) {
        for (var rhi = 0; rhi < _twsHistory.length; rhi++) {
          var rh = _twsHistory[rhi];
          pwsTWSAppendBubble(rh.content, rh.role === 'user' ? 'member' : 'docb');
        }
        var resumeNote = document.createElement('div');
        resumeNote.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(200,168,75,0.6);padding:6px 12px;font-style:italic;text-align:center;";
        resumeNote.textContent = 'Welcome back \u2014 your conversation is restored.';
        resumeFeed.appendChild(resumeNote);
        resumeFeed.scrollTop = resumeFeed.scrollHeight;
      }
      pwsTWSShowInput(true);
      return;
    }

    var forkEN = 'Is this something you want to get good at \u2014 a skill or craft you want to master?\n\nOr is this something you want to build and put into the world?';
    var forkES = '\u00bfEsto es algo en lo que quieres mejorar \u2014 una habilidad o arte que quieres dominar?\n\n\u00bfO es algo que quieres construir y lanzar al mundo?';
    var forkMsg = _lang === 'es' ? forkES : forkEN;
    pwsTWSAppendBubble(forkMsg, 'docb');
    pwsTWSShowInput(false);

    setTimeout(function() {
      var feedEl = document.getElementById('pwsTWSFeed');
      if (!feedEl) return;
      var forkRow = document.createElement('div');
      forkRow.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding:6px 0;';

      var getGoodBtn = document.createElement('button');
      getGoodBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:12px 10px;cursor:pointer;';
      getGoodBtn.innerHTML = '\uD83C\uDFAF <span class="en">Get Good \u2014 a skill I want to master</span><span class="es" style="display:none;">Mejorar \u2014 una habilidad que quiero dominar</span>';
      getGoodBtn.addEventListener('click', function() {
        if (forkRow.parentNode) forkRow.parentNode.removeChild(forkRow);
        pwsTWSForkGetGood();
        pwsTWSAskAlreadyInLove();
      });

      var buildBtn = document.createElement('button');
      buildBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:rgba(240,230,204,0.5);background:transparent;border:1px solid rgba(240,230,204,0.15);border-radius:3px;padding:12px 10px;cursor:pointer;';
      buildBtn.innerHTML = '\uD83D\uDE80 <span class="en">Build It \u2014 something I want to launch into the world</span><span class="es" style="display:none;">Construirlo \u2014 algo que quiero lanzar al mundo</span>';
      buildBtn.addEventListener('click', function() {
        if (forkRow.parentNode) forkRow.parentNode.removeChild(forkRow);
        pwsTWSForkMain();
      });

      forkRow.appendChild(getGoodBtn);
      forkRow.appendChild(buildBtn);
      feedEl.appendChild(forkRow);
      feedEl.scrollTop = feedEl.scrollHeight;
    }, 400);
  }

  function pwsCloseTWS() {
    twsStopMic();
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.remove('open');
    _twsHistory = [];
    _twsPhase = 'entry';
  }

  function pwsTWSForkGetGood() {
    _twsProjectType = 'get-good';
    _twsPhase = 'path_a';
    var msgEN = 'Perfect. A skill you want to master.\n\nTell me more — what specifically do you want to be able to do? What does getting good at this look like for you?';
    var msgES = 'Perfecto. Una habilidad que quieres dominar.\n\nCu\u00e9ntame m\u00e1s \u2014 \u00bfqu\u00e9 espec\u00edficamente quieres poder hacer? \u00bfC\u00f3mo se ver\u00eda dominar esto para ti?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory.push({ role: 'assistant', content: msg });
    pwsTWSShowInput(true);
  }

  function pwsTWSForkMain() {
    _twsProjectType = 'main';
    _twsPhase = 'path_a';
    pwsTWSAppendBubble('Build It.', 'member');
    var msgEN = 'A life project. That\'s different.\n\nTell me: what does the world look like when this is done? Who is changed by it?';
    var msgES = 'Un proyecto de vida. Eso es diferente.\n\nD\u00edme: \u00bfc\u00f3mo se ve el mundo cuando esto est\u00e1 terminado? \u00bfQui\u00e9n cambia gracias a ello?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Build It \u2014 a life project to launch' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSAskAlreadyInLove() {
    var msgEN = 'Are you already in love with a specific skill?\n\nOr do you want to explore what calls you?';
    var msgES = '\u00bfYa est\u00e1s enamorado de una habilidad espec\u00edfica?\n\n\u00bfO quieres explorar lo que te llama?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    pwsTWSShowInput(false);
    setTimeout(function() {
      var feedEl = document.getElementById('pwsTWSFeed');
      if (!feedEl) return;
      var btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:10px;padding:6px 0;';
      var yesBtn = document.createElement('button');
      yesBtn.style.cssText = 'flex:1;font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:12px 10px;cursor:pointer;';
      yesBtn.innerHTML = '<span class="en">YES \u2014 I know what I want</span><span class="es" style="display:none;">S\u00cd \u2014 Ya s\u00e9 lo que quiero</span>';
      yesBtn.addEventListener('click', function() {
        if (btnRow.parentNode) btnRow.parentNode.removeChild(btnRow);
        pwsTWSPathA();
      });
      var exploreBtn = document.createElement('button');
      exploreBtn.style.cssText = 'flex:1;font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:rgba(240,230,204,0.5);background:transparent;border:1px solid rgba(240,230,204,0.15);border-radius:3px;padding:12px 10px;cursor:pointer;';
      exploreBtn.innerHTML = '<span class="en">Explore with me</span><span class="es" style="display:none;">Explorar conmigo</span>';
      exploreBtn.addEventListener('click', function() {
        if (btnRow.parentNode) btnRow.parentNode.removeChild(btnRow);
        pwsTWSPathB();
      });
      btnRow.appendChild(yesBtn);
      btnRow.appendChild(exploreBtn);
      feedEl.appendChild(btnRow);
      feedEl.scrollTop = feedEl.scrollHeight;
    }, 300);
  }

  function pwsTWSPathA() {
    _twsPhase = 'path_a';
    var msgEN = 'Tell me about it.\n\nWhat are you working on or wanting to create?';
    var msgES = 'Cu\u00e9ntame.\n\n\u00bfEn qu\u00e9 est\u00e1s trabajando o qu\u00e9 quieres crear?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'YES \u2014 I know what I want' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSPathB() {
    _twsProjectType = 'get-good';
    _twsPhase = 'path_b_category';
    var msgEN = 'No problem. Let\u2019s find it.\n\nWhich of these calls you?';
    var msgES = 'Sin problema. Vamos a encontrarlo.\n\n\u00bfCu\u00e1l de estas te llama?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Not sure yet' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(false);
    pwsTWSRenderCategories();
  }

  function pwsTWSRenderCategories() {
    var feed = document.getElementById('pwsTWSFeed');
    if (!feed) return;
    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 0;width:100%;';
    TWS_CATEGORIES.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.2);border-radius:6px;padding:14px 10px;cursor:pointer;font-family:\'Cinzel\',serif;font-size:13px !important;letter-spacing:0.1em;text-transform:uppercase;color:#f0e6cc;transition:border-color 0.2s,background 0.2s;';
      btn.innerHTML = '<span style="font-size:26px !important;line-height:1;">' + cat.emoji + '</span>' +
        '<span class="en">' + escHtml(cat.label) + '</span>' +
        '<span class="es" style="display:none;">' + escHtml(cat.labelEs) + '</span>';
      (function(c) {
        btn.addEventListener('click', function() {
          if (grid.parentNode) grid.parentNode.removeChild(grid);
          pwsTWSCategorySelected(c);
        });
      }(cat));
      grid.appendChild(btn);
    });
    feed.appendChild(grid);
    feed.scrollTop = feed.scrollHeight;
  }

  /* Submenu skill lists per category — 4-6 options + Something Else */
  var TWS_SUBMENUS = {
    'Move Your Body':      ['Dance', 'Fitness', 'Martial Arts', 'Yoga', 'Swimming', 'Running'],
    'Make Stuff':          ['Drawing & Art', 'Music', 'Writing', 'Photography', 'Cooking', 'Crafts'],
    'Build Things':        ['Woodworking', 'Coding', 'Electronics', 'Mechanics', 'Architecture', 'DIY Home'],
    'Play & Compete':      ['Chess', 'Card Games', 'Video Games', 'Sports Strategy', 'Puzzles', 'Trivia'],
    'Own the Outdoors':    ['Hiking', 'Gardening', 'Survival Skills', 'Fishing', 'Camping', 'Nature Study'],
    'Connect with People': ['Public Speaking', 'Singing', 'Comedy', 'Teaching', 'Podcasting', 'Storytelling'],
    'Weird & Awesome':     ['Magic Tricks', 'Knife Throwing', 'Juggling', 'Origami', 'Beatboxing', 'Yo-Yo']
  };

  function pwsTWSCategorySelected(cat) {
    _twsSelectedCategory = cat.key;
    pwsTWSAppendBubble(cat.emoji + ' ' + cat.label, 'member');
    var promptEN = 'Good. What specifically calls you?';
    var promptES = 'Bien. \u00bfQu\u00e9 especificamente te llama?';
    pwsTWSAppendBubble(_lang === 'es' ? promptES : promptEN, 'docb');
    pwsTWSShowInput(false);
    pwsTWSRenderSubmenu(cat);
  }

  function pwsTWSRenderSubmenu(cat) {
    var feed = document.getElementById('pwsTWSFeed');
    if (!feed) return;
    var skills = TWS_SUBMENUS[cat.key] || [];
    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 0;width:100%;';
    var btnStyle = 'display:flex;align-items:center;justify-content:center;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.2);border-radius:6px;padding:12px 10px;cursor:pointer;font-family:\'Cinzel\',serif;font-size:12px !important;letter-spacing:0.1em;text-transform:uppercase;color:#f0e6cc;transition:border-color 0.2s,background 0.2s;text-align:center;';
    skills.forEach(function(skill) {
      var btn = document.createElement('button');
      btn.style.cssText = btnStyle;
      btn.textContent = skill;
      (function(sk) {
        btn.addEventListener('click', function() {
          if (grid.parentNode) grid.parentNode.removeChild(grid);
          pwsTWSSkillSelected(cat, sk);
        });
      }(skill));
      grid.appendChild(btn);
    });
    var elseBtn = document.createElement('button');
    elseBtn.style.cssText = btnStyle + 'border-color:rgba(200,168,75,0.4);color:rgba(200,168,75,0.85);grid-column:1/-1;';
    elseBtn.textContent = '\u2728 Something Else';
    elseBtn.addEventListener('click', function() {
      if (grid.parentNode) grid.parentNode.removeChild(grid);
      pwsTWSSkillSomethingElse(cat);
    });
    grid.appendChild(elseBtn);
    feed.appendChild(grid);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsTWSSkillSelected(cat, skill) {
    _twsSelectedSkill = skill;
    _twsPhase = 'path_b_build';
    pwsTWSAppendBubble(skill, 'member');
    var msgEN = 'Let\'s build your ' + skill + ' project.\n\nWhat does mastery look like for you? What would you be able to do that you can\'t do today?';
    var msgES = 'Vamos a construir tu proyecto de ' + skill + '.\n\n\u00bfC\u00f3mo se ver\u00eda la maestr\u00eda para ti? \u00bfQu\u00e9 podr\u00edas hacer que hoy no puedes?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Category: ' + cat.label + ', Skill: ' + skill },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSSkillSomethingElse(cat) {
    _twsSelectedSkill = '';
    _twsPhase = 'path_b_build';
    pwsTWSAppendBubble('\u2728 Something Else', 'member');
    var msgEN = 'What is it? Tell me what you want to get good at.';
    var msgES = '\u00bfQu\u00e9 es? Cu\u00e9ntame en qu\u00e9 quieres ser bueno.';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Category: ' + cat.label + ', Skill: Something Else' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSShowInput(show) {
    var row = document.getElementById('pwsTWSInputRow');
    if (row) row.style.display = show ? 'flex' : 'none';
    if (show) {
      var inp = document.getElementById('pwsTWSInput');
      if (inp) setTimeout(function() { inp.focus(); }, 80);
    }
  }

  function pwsSendTWS() {
    var inp = document.getElementById('pwsTWSInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    twsStopMic();
    pwsTWSAppendBubble(text, 'member');
    _twsHistory.push({ role: 'user', content: text });
    if (_twsPhase === 'work') {
      var workSys = 'You are Doc B, coaching ' + (_lang === 'es' ? 'en español' : 'in English') + ' on the project "' + (_twsProject && _twsProject.title || 'this project') + '". ' +
        'The member has these workstreams: ' + (_twsProject && _twsProject.activities ? _twsProject.activities.map(function(a) { return a.title || a; }).join(', ') : '') + '. ' +
        'Be brief, direct, and actionable. One focused question or suggestion at a time. Never create a new project or ask for a project name.';
      var typingId2 = 'pws-tws-typing-' + Date.now();
      var feed2 = document.getElementById('pwsTWSFeed');
      if (feed2) { var td2 = document.createElement('div'); td2.className = 'pws-docb-bubble docb'; td2.id = typingId2; td2.textContent = '\u2026'; feed2.appendChild(td2); feed2.scrollTop = feed2.scrollHeight; }
      pwsTWSShowInput(false);
      post({ action: 'cftConvTurn', systemPrompt: workSys, conversationHistory: _twsHistory.slice() }).then(function(d) {
        var t2 = document.getElementById(typingId2); if (t2) t2.parentNode.removeChild(t2);
        var reply = (d && d.reply) ? d.reply : (_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.');
        pwsTWSAppendBubble(reply, 'docb'); _twsHistory.push({ role: 'assistant', content: reply }); pwsTWSShowInput(true);
      }).catch(function() {
        var t2 = document.getElementById(typingId2); if (t2) t2.parentNode.removeChild(t2);
        pwsTWSAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); pwsTWSShowInput(true);
      });
      return;
    }

    if (_twsPhase === 'main_obstacle') {
      if (_twsProject) { _twsProject.obstacle = text; }
      pwsUpdateProject({ obstacle: text });
      var actIntro_EN = 'A project this size needs a plan. Let me suggest some steps to get you there \u2014 you tell me what fits.';
      var actIntro_ES = 'Un proyecto de este tama\u00f1o necesita un plan. D\u00e9jame sugerirte algunos pasos para llegar ah\u00ed \u2014 t\u00fa me dices qu\u00e9 encaja.';
      pwsTWSAppendBubble(_lang === 'es' ? actIntro_ES : actIntro_EN, 'docb');
      _twsPhase = 'activities_build';
      _twsActivities = [];
      pwsTWSProposeActivities();
      return;
    }
    if (_twsPhase === 'activities_build') {
      pwsTWSCallDocBActivities();
      return;
    }
    if (_twsPhase === 'mastery_1') {
      if (_twsProject) { _twsProject.masteryVision = text; }
      pwsUpdateProject({ masteryVision: text });
      var closeEN = 'Your project is saved and your tools are ready.\n\nHead to Tools & Entertainment and activate them \u2014 that\u2019s where we\u2019ll set up exactly how your sessions run.';
      var closeES = 'Tu proyecto est\u00e1 guardado y tus herramientas est\u00e1n listas.\n\nVe a Herramientas y Entretenimiento y act\u00edvalas \u2014 ah\u00ed configuraremos c\u00f3mo corren tus sesiones.';
      pwsTWSAppendBubble(_lang === 'es' ? closeES : closeEN, 'docb');
      _twsPhase = 'done';
      setTimeout(function() {
        pwsCloseTWS();
        pwsRenderProjectTile(null);
        pwsUpdateAccordionStatus();
      }, 2200);
      return;
    }
    if (_twsPhase === 'entry' || _twsPhase === 'path_a') {
      _twsPhase = 'path_a';
    }
    pwsTWSCallDocB();
  }

  function pwsTWSCallDocB() {
    var typingId = 'pws-tws-typing-' + Date.now();
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }
    var catContext = _twsSelectedCategory ? ' The member is working in the category: "' + _twsSelectedCategory + '".' : '';
    var skillContext = _twsSelectedSkill ? ' Their specific chosen skill is: "' + _twsSelectedSkill + '".' : '';
    var typeContext = _twsProjectType === 'main'
      ? ' This is a MAIN LIFE PROJECT — something they want to build and put into the world. Ask about impact, vision, what changes when it\'s done. Not mastery of a skill.'
      : ' This is a GET-GOOD project — a skill or practice they want to master.';
    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' You are having a real conversation with an adult member who is building a project in their Talent Work Station.' + catContext + skillContext + typeContext +
      ' Your goal: understand what they want to create, build, or become, then generate a project card.' +
      ' Ask ONE focused question at a time. Be warm, direct. Do NOT echo their words verbatim \u2014 rephrase, elevate, believe in them.' +
      ' Do NOT repeat any question you have already asked. Continue naturally from the conversation history.' +
      ' When you have a clear enough picture (title, what the project is), end with PROJECT_READY on its own line, then JSON: {"title":"2-5 vivid words","description":"One empowering sentence","photo":"","category":"' + (_twsSelectedCategory || '') + '","skill":"' + (_twsSelectedSkill || '') + '","type":"' + (_twsProjectType || 'main') + '"}.' +
      ' Keep each response to 2-3 sentences max. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _twsHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTWSAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _twsHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('PROJECT_READY');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        if (displayMsg) pwsTWSAppendBubble(displayMsg, 'docb');
        var jsonStart = reply.indexOf('{', markerIdx);
        var jsonEnd = reply.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            var projData = JSON.parse(reply.substring(jsonStart, jsonEnd + 1));
            pwsTWSFinalize(projData);
          } catch(e) {
            pwsTWSAppendBubble(_lang === 'es' ? 'Algo sali\u00f3 mal. Int\u00e9ntalo de nuevo.' : 'Something went wrong. Try again.', 'docb');
          }
        }
      } else {
        pwsTWSAppendBubble(reply, 'docb');
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTWSAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  }

  function pwsTWSFinalize(projData) {
    _twsPhase = 'done';
    var newProjId = 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    var resolvedType = _twsProjectType || projData.type || 'main';
    _twsProject = {
      projectId:          newProjId,
      title:              projData.title       || 'My Project',
      description:        projData.description || '',
      photo:              projData.photo        || '',
      category:           projData.category    || _twsSelectedCategory || '',
      skill:              projData.skill       || _twsSelectedSkill    || '',
      type:               resolvedType,
      tools:              'Music,CFT,Contacts,Doc B,Links,Timer,Reminders',
      masteryStage:       1,
      sessionCount:       0,
      lastPracticed:      '',
      streakDays:         0,
      entertainmentLinks: '[]',
      activities:         [],
      isMain:             resolvedType === 'main',
      isPublic:           false,
      studioWindowId:     '',
      fundingStatus:      'none',
      fundingLetter:      '',
      createdDate:        new Date().toISOString(),
      status:             'active'
    };
    if (!_twsProject.photo) {
      var imgIdx = Math.floor(Math.random() * PWS_WIN_IMGS.length);
      _twsProject.photo = PWS_WIN_IMGS[imgIdx];
    }
    post({
      action:             'projectCreate',
      sessionId:          _session,
      requestingMemberId: _memberId,
      name:               _twsProject.title,
      description:        _twsProject.description,
      lawTag:             'talent',
      category:           _twsProject.category,
      skill:              _twsProject.skill || '',
      photo:              _twsProject.photo,
      type:               _twsProject.type,
      tools:              _twsProject.tools,
      masteryStage:       _twsProject.masteryStage,
      sessionCount:       0,
      lastPracticed:      '',
      streakDays:         0,
      entertainmentLinks: '[]',
      isMain:             true,
      isPublic:           false,
      studioWindowId:     '',
      fundingStatus:      'none',
      fundingLetter:      '',
      activities:         JSON.stringify(_twsProject.activities || []),
      createdDate:        _twsProject.createdDate,
      status:             'active',
      projectData:        _twsProject
    }).catch(function() {});
    var doneEN = '\u2713 Your project is created.\n\n"' + _twsProject.title + '" is now live in My Projects with your tools ready.';
    var doneES = '\u2713 Tu proyecto est\u00e1 creado.\n\n"' + _twsProject.title + '" ya est\u00e1 en Mis Proyectos con tus herramientas listas.';
    pwsTWSAppendBubble(_lang === 'es' ? doneES : doneEN, 'docb');
    setTimeout(function() {
      pwsTWSShowInput(false);
      if (_twsProject.type === 'main') {
        var mainQ_EN = 'One last thing.\n\nWhat\u2019s standing between you and this right now? What\u2019s the biggest obstacle?';
        var mainQ_ES = 'Una \u00faltima cosa.\n\n\u00bfQu\u00e9 se interpone entre t\u00fa y esto ahora mismo? \u00bfCu\u00e1l es el mayor obst\u00e1culo?';
        pwsTWSAppendBubble(_lang === 'es' ? mainQ_ES : mainQ_EN, 'docb');
        pwsTWSShowInput(true);
        _twsPhase = 'main_obstacle';
      } else {
        var masteryEN = 'One more thing before we close.\n\nWhat does mastery look like for you in "' + _twsProject.title + '"? What would you be able to do that you can\u2019t do today?';
        var masteryES = 'Una cosa m\u00e1s antes de cerrar.\n\n\u00bfC\u00f3mo se ver\u00eda la maestr\u00eda para ti en "' + _twsProject.title + '"? \u00bfQu\u00e9 podr\u00edas hacer que hoy no puedes?';
        pwsTWSAppendBubble(_lang === 'es' ? masteryES : masteryEN, 'docb');
        pwsTWSShowInput(true);
        _twsPhase = 'mastery_1';
      }
    }, 1800);
  }

  function pwsTWSProposeActivities() {
    var typingId = 'pws-tws-act-' + Date.now();
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) {
      var dot = document.createElement('div');
      dot.className = 'pws-docb-bubble docb';
      dot.id = typingId;
      dot.textContent = '\u2026';
      feed.appendChild(dot);
      feed.scrollTop = feed.scrollHeight;
    }
    var projTitle = _twsProject ? _twsProject.title : 'this project';
    var projDesc  = _twsProject ? (_twsProject.description || '') : '';
    var obstacle  = _twsProject ? (_twsProject.obstacle || '') : '';
    var sys = 'You are Doc B helping plan a major life project called "' + projTitle + '".' +
      (projDesc ? ' Description: ' + projDesc + '.' : '') +
      (obstacle ? ' Main obstacle: ' + obstacle + '.' : '') +
      ' Propose 6-8 ordered, concrete workstreams needed to make this project real.' +
      ' Number them. Keep each title under 6 words.' +
      ' Then ask: "Does this feel right? Remove anything, add anything, or say GO to lock it in."' +
      ' When the member confirms or says GO, end your reply with ACTIVITIES_READY on its own line, then JSON array:' +
      ' [{"title":"Activity name","tools":"Music,Timer,Doc B"},...]' +
      ' Use only these tool names: Music, Timer, Links, Contacts, Doc B, Notes, Reminders, CFT, Camera, Video Links.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: _twsProject ? _twsProject.projectId : '', systemPrompt: sys, conversationHistory: _twsHistory.slice() })
    .then(function(d) {
      var reply = (d && d.reply) ? d.reply : '';
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTWSAppendBubble('Try again in a moment.', 'docb'); return; }
      _twsHistory.push({ role: 'assistant', content: reply });
      pwsHandleActivitiesReply(reply);
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTWSAppendBubble('Try again in a moment.', 'docb');
    });
  }

  function pwsTWSCallDocBActivities() {
    var typingId = 'pws-tws-act2-' + Date.now();
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) {
      var dot = document.createElement('div');
      dot.className = 'pws-docb-bubble docb';
      dot.id = typingId;
      dot.textContent = '\u2026';
      feed.appendChild(dot);
      feed.scrollTop = feed.scrollHeight;
    }
    var sys = 'You are Doc B. The member is reviewing a proposed activity list for "' + (_twsProject ? _twsProject.title : 'their project') + '".' +
      ' Help them refine it. When they confirm or say GO, end with ACTIVITIES_READY on its own line, then JSON array:' +
      ' [{"title":"Activity name","tools":"Music,Timer,Doc B"},...]' +
      ' Use only these tool names: Music, Timer, Links, Contacts, Doc B, Notes, Reminders, CFT, Camera, Video Links.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: _twsProject ? _twsProject.projectId : '', systemPrompt: sys, conversationHistory: _twsHistory.slice() })
    .then(function(d) {
      var reply = (d && d.reply) ? d.reply : '';
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTWSAppendBubble('Try again in a moment.', 'docb'); return; }
      _twsHistory.push({ role: 'assistant', content: reply });
      pwsHandleActivitiesReply(reply);
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTWSAppendBubble('Try again in a moment.', 'docb');
    });
  }

  function pwsHandleActivitiesReply(reply) {
    if (reply.indexOf('ACTIVITIES_READY') !== -1) {
      var beforeAct = reply.substring(0, reply.indexOf('ACTIVITIES_READY')).trim();
      if (beforeAct) pwsTWSAppendBubble(beforeAct, 'docb');
      var js = reply.indexOf('[', reply.indexOf('ACTIVITIES_READY'));
      var je = reply.lastIndexOf(']');
      if (js !== -1 && je !== -1) {
        try {
          var parsed = JSON.parse(reply.substring(js, je + 1));
          var activitiesData = parsed.map(function(a, i) {
            return {
              id:     'act_' + Date.now() + '_' + i,
              title:  (typeof a === 'string') ? a : (a.title || ''),
              tools:  (typeof a === 'object' && a.tools) ? a.tools : 'Doc B,Timer',
              status: 'not-started'
            };
          });
          if (_twsProject) { _twsProject.activities = activitiesData; }
          pwsUpdateProject({ activities: JSON.stringify(activitiesData) });
          if (_toolsData && _toolsData.confirmedTools) {
            _toolsData.confirmedTools.forEach(function(ct) {
              if (ct.isTalent === true && ct.projectId === (_twsProject && _twsProject.projectId)) {
                ct._activities = activitiesData;
              }
            });
            if (_twsProject && _twsProject.projectId) {
              if (!_toolsData._projectActivities) _toolsData._projectActivities = {};
              _toolsData._projectActivities[_twsProject.projectId] = activitiesData;
            }
            post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() }).catch(function() {});
          }
          var count = activitiesData.length;
          var doneEN = '\u2713 Your plan is set. ' + count + ' workstreams saved \u2014 each gets its own tools when you activate it. Head to My Projects to begin.';
          var doneES = '\u2713 Tu plan est\u00e1 listo. ' + count + ' ejes guardados \u2014 cada uno tiene sus propias herramientas cuando lo actives. Ve a Mis Proyectos.';
          pwsTWSAppendBubble(_lang === 'es' ? doneES : doneEN, 'docb');
          _twsPhase = 'done';
          setTimeout(function() {
            pwsCloseTWS();
            pwsRenderProjectTile(null);
            pwsUpdateAccordionStatus();
          }, 2500);
        } catch(e) { pwsTWSAppendBubble(reply, 'docb'); }
      }
    } else {
      pwsTWSAppendBubble(reply, 'docb');
      pwsTWSShowInput(true);
    }
  }

  function pwsTWSAppendBubble(text, role) {
    var feed = document.getElementById('pwsTWSFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function twsStopMic() {
    if (_twsRecognizer) { try { _twsRecognizer.stop(); _twsRecognizer.onresult = null; _twsRecognizer.onend = null; } catch(e) {} _twsRecognizer = null; }
    _twsMicActive = false;
    var btn = document.getElementById('pwsTWSMic');
    if (btn) btn.classList.remove('listening');
  }

  function pwsToggleTWSMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_twsMicActive) { twsStopMic(); return; }
    twsStopMic();
    _twsRecognizer = new SR();
    _twsRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _twsRecognizer.continuous = true;
    _twsRecognizer.interimResults = true;
    _twsRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsTWSInput'); if (inp) inp.value = transcript.trim(); };
    _twsRecognizer.onend = function() {
      _twsMicActive = false;
      var btn = document.getElementById('pwsTWSMic');
      if (btn) btn.classList.remove('listening');
    };
    _twsRecognizer.start();
    _twsMicActive = true;
    var btn = document.getElementById('pwsTWSMic');
    if (btn) btn.classList.add('listening');
  }

  function pwsOpenTWSCFT() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'You need funds for your project. Tell me: what do you need and how much?';
      var msgES = 'Necesitas fondos para tu proyecto. D\u00edme: \u00bfqu\u00e9 necesitas y cu\u00e1nto?';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSContacts() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'Who do you need to reach out to for this project?';
      var msgES = '\u00bfA qui\u00e9n necesitas contactar para este proyecto?';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSLinks() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'What resource or link do you need for your project? Share it here.';
      var msgES = '\u00bfQu\u00e9 recurso o enlace necesitas? Comp\u00e1rtelo aqu\u00ed.';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSTimer() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'Let\u2019s time your work session. Tell me when you\u2019re ready and I\u2019ll start the clock.';
      var msgES = 'Vamos a cronometrar tu sesi\u00f3n. D\u00edme cuando est\u00e9s listo y empezamos.';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSRecord() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'Ready to record? Open your device camera or microphone app to capture your work.';
      var msgES = '\u00bfListo para grabar? Abre tu c\u00e1mara o micr\u00f3fono para capturar tu trabajo.';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSCamera() {
    var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      pwsOpenDocB();
      setTimeout(function() {
        var msgEN = 'Camera ready. Open your phone camera to capture your work and come back to share it.';
        var msgES = 'C\u00e1mara lista. Abre la c\u00e1mara de tu tel\u00e9fono y regresa a compartir.';
        pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
      }, 300);
    } else {
      var feed = pwsTWSGetFeed();
      if (!feed) return;
      var existing = document.getElementById('pwsTWSCameraPanel');
      if (existing) { existing.parentNode.removeChild(existing); return; }
      pwsTWSClosePanels('pwsTWSCameraPanel');
      var panel = document.createElement('div');
      panel.className = 'pws-links-panel';
      panel.id = 'pwsTWSCameraPanel';
      var label = document.createElement('div');
      label.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,168,75,0.6);margin-bottom:10px;';
      label.innerHTML = '<span class="en">Attach Image or Video</span><span class="es">Adjuntar Imagen o Video</span>';
      panel.appendChild(label);
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,video/*';
      fileInput.style.cssText = "display:block;width:100%;font-family:'Cormorant Garamond',serif;font-size:18px !important;color:#f0e6cc;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.25);border-radius:4px;padding:8px 10px;cursor:pointer;box-sizing:border-box;";
      fileInput.addEventListener('change', function() {
        if (!fileInput.files || !fileInput.files.length) return;
        var file = fileInput.files[0];
        var confirm = document.createElement('div');
        confirm.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:20px !important;font-style:italic;color:#4caf82;margin-top:10px;";
        confirm.textContent = '\u2713 ' + file.name + (_lang === 'es' ? ' adjuntado.' : ' attached.');
        panel.appendChild(confirm);
        if (_twsProject) {
          if (!_twsProject.attachments) _twsProject.attachments = [];
          _twsProject.attachments.push({ name: file.name, type: file.type, date: pwsLocalDate() });
          post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId, name: _twsProject.title || 'Project', lawTag: 'talent', projectData: _twsProject }).catch(function() {});
        }
      });
      panel.appendChild(fileInput);
      feed.appendChild(panel);
      feed.scrollTop = feed.scrollHeight;
    }
  }

  function pwsOpenTWSNotes() {
    var ov = document.getElementById('pwsTWSNotesOverlay');
    if (ov) ov.classList.add('open');
    var area = document.getElementById('pwsTWSNotesArea');
    if (area) { area.value = _twsNotesDraft || ''; setTimeout(function() { area.focus(); }, 80); }
    var closeBtn = document.getElementById('pwsTWSNotesCloseBtn');
    if (closeBtn) {
      var clone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(clone, closeBtn);
      clone.addEventListener('click', function() {
        var areaEl = document.getElementById('pwsTWSNotesArea');
        if (areaEl) _twsNotesDraft = areaEl.value;
        var notesOv = document.getElementById('pwsTWSNotesOverlay');
        if (notesOv) notesOv.classList.remove('open');
      });
    }
    var saveBtn = document.getElementById('pwsTWSNotesSaveBtn');
    if (saveBtn) {
      var sClone = saveBtn.cloneNode(true);
      saveBtn.parentNode.replaceChild(sClone, saveBtn);
      sClone.addEventListener('click', function() {
        var areaEl = document.getElementById('pwsTWSNotesArea');
        if (areaEl) _twsNotesDraft = areaEl.value;
        if (_twsProject) {
          _twsProject.notes = _twsNotesDraft;
          post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId, name: _twsProject.title || 'Project', lawTag: 'talent', projectData: _twsProject }).catch(function() {});
        }
        var notesOv = document.getElementById('pwsTWSNotesOverlay');
        if (notesOv) notesOv.classList.remove('open');
      });
    }
  }

  /* TWS accordion auto-open hook: when MY PROJECTS accordion opens with no project */
  var _twsAccordionHooked = false;
  function pwsTWSHookAccordion() {
    if (_twsAccordionHooked) return;
    _twsAccordionHooked = true;
    var hdr = document.getElementById('pwsAccordionTalentHdr');
    if (!hdr) return;
    hdr.addEventListener('click', function() {
      setTimeout(function() {
        var card = document.getElementById('pwsAccordionTalent');
        if (!card || !card.classList.contains('open')) return;
        var hasProject = (_projectData && _projectData.projectId) || (_twsProject && _twsProject.title);
        if (!hasProject && _session) pwsOpenTWS();
      }, 600);
    });
  }

  function pwsToggleTalentMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_talentMicActive) {
      if (_talentRecognizer) { try { _talentRecognizer.stop(); } catch(e) {} _talentRecognizer = null; }
      _talentMicActive = false;
      var btn = document.getElementById('pwsTalentMic');
      if (btn) btn.classList.remove('listening');
      return;
    }
    _talentRecognizer = new SR();
    _talentRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _talentRecognizer.continuous = true;
    _talentRecognizer.interimResults = true;
    _talentRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } if (inp) inp.value = transcript.trim(); };
    _talentRecognizer.onend = function() {
      _talentMicActive = false;
      var btn = document.getElementById('pwsTalentMic');
      if (btn) btn.classList.remove('listening');
    };
    _talentRecognizer.start();
    _talentMicActive = true;
    var btn = document.getElementById('pwsTalentMic');
    if (btn) btn.classList.add('listening');
  }

  /* ADULT ONBOARDING -- builds station, tools, and day from scra */


  window.pwsSeqMove = function(idx, dir) {
    if (!_dayData || !_dayData.finalSchedule) return;
    var sched = _dayData.finalSchedule;
    var j = idx + dir;
    if (j < 0 || j >= sched.length) return;
    var tmp = sched[idx]; sched[idx] = sched[j]; sched[j] = tmp;
    _dayData._manualOrder = true; // same dialect the drag speaks
    pwsSaveDaySchedule();
    pwsRenderDayTile();
  };

  function pwsWireDrag(container) {
    if (!document.getElementById('pwsSeqArrowCss')) {
      var _ac = document.createElement('style');
      _ac.id = 'pwsSeqArrowCss';
      _ac.appendChild(document.createTextNode('.pws-seq-arrows{display:flex;flex-direction:column;gap:3px;margin-right:8px;flex:0 0 auto;}.pws-seq-arrow{width:34px;height:26px;background:rgba(200,168,75,0.10);border:1px solid rgba(200,168,75,0.45);border-radius:4px;color:#c8a84b;font-size:12px;line-height:1;cursor:pointer;padding:0;}.pws-seq-arrow:active{background:rgba(200,168,75,0.35);}'));
      document.head.appendChild(_ac);
    }
    if (container._dragWired) return;
    container._dragWired = true;
    var dragSrcIdx = null;
    container.addEventListener('dragstart', function(ev) { var row = ev.target.closest ? ev.target.closest('.pws-plan-seq-row') : null; if (!row) return; dragSrcIdx = parseInt(row.getAttribute('data-idx'), 10); row.classList.add('dragging'); ev.dataTransfer.effectAllowed = 'move'; });
    container.addEventListener('dragover', function(ev) { ev.preventDefault(); ev.dataTransfer.dropEffect = 'move'; var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) rows[i].classList.remove('drag-over'); var row = ev.target.closest ? ev.target.closest('.pws-plan-seq-row') : null; if (row) row.classList.add('drag-over'); });
    container.addEventListener('dragleave', function() { var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) rows[i].classList.remove('drag-over'); });
    container.addEventListener('drop', function(ev) {
      ev.preventDefault(); var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) { rows[i].classList.remove('drag-over'); rows[i].classList.remove('dragging'); }
      var row = ev.target.closest ? ev.target.closest('.pws-plan-seq-row') : null; if (!row || dragSrcIdx === null) return;
      var dropIdx = parseInt(row.getAttribute('data-idx'), 10); if (dragSrcIdx === dropIdx) return;
      var sched = _dayData.finalSchedule; var moved = sched.splice(dragSrcIdx, 1)[0]; sched.splice(dropIdx, 0, moved); dragSrcIdx = null;
      _dayData._manualOrder = true;
      pwsSaveDaySchedule(); pwsRenderDayTile();
    });
    container.addEventListener('dragend', function() { var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) { rows[i].classList.remove('dragging'); rows[i].classList.remove('drag-over'); } dragSrcIdx = null; });
    container.addEventListener('focusout', function(ev) {
      var ta = ev.target; if (!ta || !ta.classList.contains('pws-item-note')) return;
      var id = ta.id || ''; var match = id.match(/^pwsNote(\d+)$/); if (!match) return; pwsSaveNote(parseInt(match[1], 10));
    });
    container.addEventListener('change', function(ev) {
      // v97 UNIFICATION: one picker -- contribution cid (dot + split),
      // legacy index fallback, bare law (bar only), or the mint door.
      // Precedence made physical: setting one field deletes the others.
      var sel = ev.target;
      if (!sel || !sel.getAttribute || sel.getAttribute('data-serves-select') === null) return;
      var lsi = parseInt(sel.getAttribute('data-serves-select'), 10);
      if (isNaN(lsi) || !_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule[lsi]) return;
      var slot = _dayData.finalSchedule[lsi];
      var lv = sel.value;
      var mintRow = document.getElementById('pwsServesMint' + lsi);
      if (lv === '__mint__') {
        // Mint guard: nothing is assigned until Create succeeds.
        if (mintRow) { mintRow.style.display = 'block'; var mIn = document.getElementById('pwsServesMintInput' + lsi); if (mIn) { try { mIn.focus(); } catch(e) {} } }
        return;
      }
      if (mintRow) mintRow.style.display = 'none';
      if (lv.indexOf('cid_') === 0) {
        slot.contributionCid = lv;
        delete slot.contributionId;
        delete slot.lawTag;
      } else if (lv.indexOf('idx_') === 0) {
        slot.contributionId = parseInt(lv.substring(4), 10);
        delete slot.contributionCid;
        delete slot.lawTag;
      } else if (lv === 'talent' || lv === 'respect' || lv === 'responsibility' || lv === 'limits') {
        slot.lawTag = lv;
        delete slot.contributionCid;
        delete slot.contributionId;
      } else {
        delete slot.lawTag;
        delete slot.contributionCid;
        delete slot.contributionId;
      }
      pwsSaveDaySchedule();
      pwsRenderDayTile();
    });
    container.addEventListener('click', function(ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-gaming-play]') : null;
      if (btn) { ev.stopPropagation(); pwsOpenDeparture('https://4lawsacademy.com/games?unlock=' + btn.getAttribute('data-gaming-play'), 'Games'); return; }
      var mBtn = ev.target.closest ? ev.target.closest('[data-music-link]') : null;
      if (mBtn) { ev.stopPropagation(); pwsToggleECMenu('music', '/music', _lang === 'es' ? 'Sala de Musica' : 'Music Room'); return; }
      var cBtn = ev.target.closest ? ev.target.closest('[data-mastery-checkin]') : null;
      if (cBtn) {
        ev.stopPropagation();
        var mStage = parseInt(cBtn.getAttribute('data-mastery-stage'), 10) || 1;
        var mProjId = cBtn.getAttribute('data-mastery-projid') || '';
        // v104.1: pwsOpenMasteryCheckIn was stubbed in v83 and never rebuilt.
        // Say so rather than swallow the tap -- a button that does nothing
        // silently is the same lie the Self Encouragement card was telling.
        useAppendBubble(_lang === 'es'
          ? 'El registro de maestria aun no esta construido - viene con PWS Trust.'
          : 'Mastery check-in isn\'t built yet - it comes with PWS Trust.', 'docb');
        void mStage; void mProjId;
        return;
      }
      var lBtn = ev.target.closest ? ev.target.closest('[data-launch-tool]') : null;
      if (lBtn) {
        ev.stopPropagation();
        var tIdx = parseInt(lBtn.getAttribute('data-launch-tool'), 10);
        var btnObligation = lBtn.getAttribute('data-obligation') || '';
        var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
        var launchTool = validTools[tIdx];
        if (!launchTool || (btnObligation && launchTool.obligation !== btnObligation && launchTool.en !== btnObligation)) {
          launchTool = null;
          if (btnObligation) {
            for (var fi = 0; fi < validTools.length; fi++) {
              if (validTools[fi].obligation === btnObligation || validTools[fi].en === btnObligation) {
                launchTool = validTools[fi];
                tIdx = fi;
                break;
              }
            }
          }
        }
        if (!launchTool) return;
        if (launchTool.configured) {
          pwsFireTool(launchTool);
        } else {
          pwsOpenPlanUse(tIdx);
        }
      }
      var tBtn = ev.target.closest ? ev.target.closest('[data-todo-url]') : null;
      if (tBtn) {
        ev.stopPropagation();
        var todoLabel = decodeURIComponent(tBtn.getAttribute('data-todo-url') || '');
        window.location.href = '/todos?open=' + encodeURIComponent(todoLabel);
        return;
      }
      var wBtn = ev.target.closest ? ev.target.closest('[data-launch-window]') : null;
      if (wBtn) {
        ev.stopPropagation();
        var wLabel = wBtn.getAttribute('data-launch-window') || '';
        // PLUMBING FIX: always fetch fresh window config at launch time — never rely on stale cache
        post({ action: 'pwsGetEquipAll', sessionId: _session, requestingMemberId: _memberId })
        .then(function(wd) {
          if (wd && wd.status === 'ok') _windowConfig = pwsEquipMerge_(wd.data, wd.legacy);
          var wCfg = (_windowConfig && wLabel && _windowConfig[wLabel]) ? _windowConfig[wLabel] : {};
          var synth = {
            obligation:  wLabel,
            en:          wLabel,
            es:          wLabel,
            label:       wLabel,
            configured:  true,
            hasAssist:   true,
            links:       wCfg.links    || [],
            contacts:    wCfg.contacts || [],
            notes:       wCfg.notes    || '',
            _presel: {
              timer:   !!(wCfg.tools && wCfg.tools.indexOf('timer')    !== -1),
              music:   !!(wCfg.tools && wCfg.tools.indexOf('music')    !== -1),
              links:   !!(wCfg.links   && wCfg.links.length),
              contact: !!(wCfg.contacts && wCfg.contacts.length),
              cash:    !!(wCfg.tools && wCfg.tools.indexOf('cash')     !== -1),
              remind:  !!(wCfg.tools && wCfg.tools.indexOf('reminders') !== -1),
              assist:  true
            },
            _isWindowLaunch: true,
            _windowLabel:    wLabel
          };
          _useTool = synth;
          pwsOpenUse(synth, false);
        }).catch(function() {
          // fallback to cached config if fetch fails
          var wCfg2 = (_windowConfig && wLabel && _windowConfig[wLabel]) ? _windowConfig[wLabel] : {};
          var synth2 = { obligation: wLabel, en: wLabel, es: wLabel, label: wLabel, configured: true, hasAssist: true,
            links: wCfg2.links || [], contacts: wCfg2.contacts || [], notes: wCfg2.notes || '',
            _presel: { timer: false, music: false, links: !!(wCfg2.links && wCfg2.links.length), contact: !!(wCfg2.contacts && wCfg2.contacts.length), cash: false, remind: false, assist: true },
            _isWindowLaunch: true, _windowLabel: wLabel };
          _useTool = synth2; pwsOpenUse(synth2, false);
        });
      }
    });
  }

  window.pwsToggleNote = function pwsToggleNote(idx) {
    var wrap = document.getElementById('pwsNoteWrap' + idx); if (!wrap) return;
    var isOpen = wrap.classList.contains('open'); wrap.classList.toggle('open', !isOpen);
    if (!isOpen) { var ta = document.getElementById('pwsNote' + idx); if (ta) setTimeout(function() { ta.focus(); }, 60); }
  };

  window.pwsSaveNote = function pwsSaveNote(idx) {
    var ta = document.getElementById('pwsNote' + idx); if (!ta || !_dayData || !_dayData.finalSchedule) return;
    var sched = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false; }); var item = sched[idx]; if (!item) return;
    item.note = ta.value; pwsSaveDaySchedule();
    var body = ta.closest ? ta.closest('.pws-plan-seq-body') : null; var labelEl = body ? body.querySelector('.pws-plan-seq-label') : null;
    if (labelEl) { var existingInd = labelEl.querySelector('.pws-note-indicator'); if (item.note.trim()) { if (!existingInd) { var ind = document.createElement('span'); ind.className = 'pws-note-indicator'; ind.title = 'Note'; ind.innerHTML = '&#x270E;'; labelEl.appendChild(ind); } } else { if (existingInd) existingInd.parentNode.removeChild(existingInd); } }
  };

  window.pwsShowTodoInput = function pwsShowTodoInput() {
    var addRow = document.getElementById('pwsAddTodoRow'); var inputRow = document.getElementById('pwsTodoInputRow'); var inp = document.getElementById('pwsTodoInput');
    if (addRow) addRow.style.display = 'none'; if (inputRow) inputRow.classList.add('open'); if (inp) setTimeout(function() { inp.focus(); }, 60);
  };

  window.pwsCancelTodo = function pwsCancelTodo() {
    var addRow = document.getElementById('pwsAddTodoRow'); var inputRow = document.getElementById('pwsTodoInputRow'); var inp = document.getElementById('pwsTodoInput');
    if (inputRow) inputRow.classList.remove('open'); if (addRow) addRow.style.display = 'flex'; if (inp) inp.value = '';
  };

  window.pwsCommitTodo = function pwsCommitTodo() {
    var inp = document.getElementById('pwsTodoInput'); if (!inp || !inp.value.trim()) { pwsCancelTodo(); return; }
    var text = inp.value.trim(); inp.value = '';
    if (!_dayData) _dayData = {}; if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
    _dayData.finalSchedule.push({ type: 'todo', label: text, isTodo: true, ownsIt: true, note: '', _checkedIn: '', seq: _dayData.finalSchedule.length + 1 });
    pwsSaveDaySchedule(); pwsRenderDayTile(); pwsCancelTodo();
  };

  window.pwsDeleteTodo = function pwsDeleteTodo(idx) {
    if (!_dayData || !_dayData.finalSchedule) return;
    var sched = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false; }); var item = sched[idx];
    if (!item || !item.isTodo) return;
    var fullIdx = _dayData.finalSchedule.indexOf(item); if (fullIdx > -1) _dayData.finalSchedule.splice(fullIdx, 1);
    pwsSaveDaySchedule(); pwsRenderDayTile();
  };

  function pwsSaveDaySchedule() {
    if (!_dayData) return;
    var cleanSchedule = (_dayData.finalSchedule || []).map(function(slot) {
      var clean = {};
      var keys = Object.keys(slot);
      for (var k = 0; k < keys.length; k++) {
        if (keys[k] !== '_checkedIn') clean[keys[k]] = slot[keys[k]];
      }
      return clean;
    });
    post({ action: 'pwsSaveDay', sessionId: _session, requestingMemberId: _memberId, data: { finalSchedule: cleanSchedule, wakeTime: _dayData.wakeTime || '', bedTime: _dayData.bedTime || '', rankedPriorities: _dayData.rankedPriorities || [], howGoodCould: _dayData.howGoodCould || '', howGoodWant: _dayData.howGoodWant || '', _manualOrder: _dayData._manualOrder || false } });
    pwsUpdateSavedLabel('pwsDaySaved', new Date().toISOString());
  }

  var _roleUrls = { 'kid': '4lawsacademy.com/youth', 'young_adult': '4lawsacademy.com/self', 'couple': '4lawsacademy.com/couples', 'family': '4lawsacademy.com/family' };
  var _roleLines = { 'kid': 'Your rights. Your fire. Your call.', 'young_adult': 'Your rights. Your fire. Your call.', 'couple': 'Have a Trust & Talent marriage.', 'family': 'Build a culture your kids will thank you for.' };

  function pwsBuildInviteMessage(name, shortUrl, role) {
    var displayName = name || 'Your family member';
    var roleUrl = _roleUrls[role] || '4lawsacademy.com/family';
    var roleLine = _roleLines[role] || '';
    return displayName + ' \u2014 your family just purchased a trust and talent system. Check out your portal: ' + shortUrl + '\n\n' + roleLine + ': ' + roleUrl;
  }

  window.pwsOpenInvite = function pwsOpenInvite() {
    var nameEl = document.getElementById('pwsInviteName'); var phone = document.getElementById('pwsInvitePhone'); var rel = document.getElementById('pwsInviteRelationship');
    if (nameEl) nameEl.value = ''; if (phone) phone.value = ''; if (rel) rel.value = '';
    var preview = document.getElementById('pwsInvitePreview'); if (preview) { preview.style.whiteSpace = 'pre-line'; preview.textContent = 'Enter a name, phone, and relationship to preview the message.'; }
    var status = document.getElementById('pwsInviteStatus'); if (status) { status.textContent = ''; status.className = 'pws-invite-status'; }
    var sendBtn = document.getElementById('pwsInviteSendBtn'); if (sendBtn) sendBtn.disabled = true;
    document.getElementById('pwsInviteOverlay').classList.add('open');
    var nameInp = document.getElementById('pwsInviteName'); var phoneInp = document.getElementById('pwsInvitePhone');
    if (nameInp) nameInp.addEventListener('input', pwsInviteUpdatePreview);
    if (phoneInp) phoneInp.addEventListener('input', pwsInviteUpdatePreview);
  };

  window.pwsCloseInvite = function pwsCloseInvite() { document.getElementById('pwsInviteOverlay').classList.remove('open'); };

  window.pwsInviteUpdatePreview = function pwsInviteUpdatePreview() {
    var nameEl = document.getElementById('pwsInviteName'); var phoneEl = document.getElementById('pwsInvitePhone'); var relEl = document.getElementById('pwsInviteRelationship');
    var inviteeName = nameEl ? nameEl.value.trim() : ''; var phone = phoneEl ? phoneEl.value.trim() : ''; var role = relEl ? relEl.value : '';
    var preview = document.getElementById('pwsInvitePreview'); var sendBtn = document.getElementById('pwsInviteSendBtn');
    if (!preview) return;
    if (!role || !phone) { preview.style.whiteSpace = 'normal'; preview.textContent = 'Enter a name, phone, and relationship to preview the message.'; if (sendBtn) sendBtn.disabled = true; return; }
    preview.style.whiteSpace = 'pre-line'; preview.textContent = pwsBuildInviteMessage(inviteeName, phone, role);
    if (sendBtn) sendBtn.disabled = false;
  };

  window.pwsSendInvite = function pwsSendInvite() {
    var nameEl = document.getElementById('pwsInviteName'); var phoneEl = document.getElementById('pwsInvitePhone'); var relEl = document.getElementById('pwsInviteRelationship');
    var inviteeName = nameEl ? nameEl.value.trim() : ''; var phone = phoneEl ? phoneEl.value.trim() : ''; var role = relEl ? relEl.value : '';
    if (!phone || !role) { pwsInviteSetStatus(_lang === 'es' ? 'Ingresa un n\u00famero y elige una relaci\u00f3n.' : 'Enter a phone number and select a relationship.', 'error'); return; }
    var sendBtn = document.getElementById('pwsInviteSendBtn'); if (sendBtn) sendBtn.disabled = true;
    pwsInviteSetStatus(_lang === 'es' ? 'Generando enlace...' : 'Generating link\u2026', '');
    post({ action: 'generateJoinCode', sessionId: _session, requestingMemberId: _memberId, toPhone: phone, role: role })
    .then(function(d) {
      if (!d || d.status !== 'ok') { pwsInviteSetStatus(_lang === 'es' ? 'No se pudo generar el enlace.' : 'Could not generate link.', 'error'); if (sendBtn) sendBtn.disabled = false; return; }
      var msg = pwsBuildInviteMessage(inviteeName, d.shortUrl, role);
      post({ action: 'handleTwilioSMS', sessionId: _session, requestingMemberId: _memberId, toPhone: phone, message: msg, relationship: role })
      .then(function(d2) {
        if (d2 && d2.status === 'ok') {
          var numDisplay = phone.replace(/\d(?=\d{4})/g, '*');
          pwsInviteSetStatus(_lang === 'es' ? 'Invitaci\u00f3n enviada a ' + numDisplay + ' \u2705' : 'Invitation sent to ' + numDisplay + ' \u2705', 'success');
        } else {
          pwsInviteSetStatus(_lang === 'es' ? 'No se pudo enviar \u2014 verifica el n\u00famero e intenta de nuevo.' : 'Couldn\u0027t send \u2014 check the number and try again.', 'error');
          if (sendBtn) sendBtn.disabled = false;
        }
      }).catch(function() { pwsInviteSetStatus(_lang === 'es' ? 'Error de conexi\u00f3n \u2014 intenta de nuevo.' : 'Connection error \u2014 try again.', 'error'); if (sendBtn) sendBtn.disabled = false; });
    }).catch(function() { pwsInviteSetStatus(_lang === 'es' ? 'Error de conexi\u00f3n \u2014 intenta de nuevo.' : 'Connection error \u2014 try again.', 'error'); if (sendBtn) sendBtn.disabled = false; });
  };

  function pwsInviteSetStatus(msg, cls) { var el = document.getElementById('pwsInviteStatus'); if (!el) return; el.textContent = msg; el.className = 'pws-invite-status' + (cls ? ' ' + cls : ''); }

  /* GAMES CONNECTION -- Build June 2026 */

  function pwsCountContributions() {
    var obs = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs : [];
    var total = obs.length;
    var crushing = obs.filter(function(o) { return o.state === 'crushing'; }).length;
    return { total: total, crushing: crushing, partial: crushing > 0 && crushing < total };
  }

  function pwsRenderEntertainmentTile(container) {
    if (!container) return;
    var existing = container.querySelector('.pws-ec-tile');
    if (existing) existing.parentNode.removeChild(existing);
    var tile = document.createElement('div');
    tile.className = 'pws-ec-tile';
    tile.style.cssText = 'background:#8B0000;border:1px solid #c8a84b;cursor:pointer;padding:0;overflow:hidden;min-height:80px;';
    tile.addEventListener('click', function() { pwsOpenDeparture('/music', _lang === 'es' ? 'Centro de Entretenimiento' : 'Entertainment Center'); });

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 300 80');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '80');
    svg.innerHTML =
      '<rect x="0" y="0" width="300" height="80" fill="#8B0000"/>' +
      '<rect x="6" y="6" width="288" height="68" fill="none" stroke="#c8a84b" stroke-width="0.75"/>' +
      '<line x1="6" y1="6" x2="22" y2="6" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="6" y1="6" x2="6" y2="22" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="6" x2="278" y2="6" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="6" x2="294" y2="22" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="6" y1="74" x2="22" y2="74" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="6" y1="74" x2="6" y2="58" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="74" x2="278" y2="74" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="74" x2="294" y2="58" stroke="#c8a84b" stroke-width="1"/>' +
      '<polygon points="150,10 152,15 157,15 153,18 154.5,23 150,20 145.5,23 147,18 143,15 148,15" fill="#c8a84b" opacity="0.9"/>' +
      '<polygon points="150,70 152,65 157,65 153,62 154.5,57 150,60 145.5,57 147,62 143,65 148,65" fill="#c8a84b" opacity="0.9"/>' +
      '<text x="150" y="48" font-family="Cinzel,serif" font-size="22" font-weight="900" fill="#f0e6cc" text-anchor="middle" letter-spacing="6">ENTERTAINMENT CENTER</text>';
    tile.appendChild(svg);
    container.appendChild(tile);
  }

    /* PAUSE -- persistent in USE overlay header */
  var _timerPaused    = false;
  var _timerPausedAt  = 0;

  function pwsActivatePauseKey() {
    var obl = (_useTool && _useTool.obligation) ? _useTool.obligation.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'').substring(0,40) : 'project';
    return 'pws_activate_pause_' + (_memberId || 'guest') + '_' + obl;
  }

  function pwsSaveActivateSession() {
    if (!_useTool || !(_useTool.isTalent || _useTool.type === 'talent')) return;
    var snapshot = {
      obligation:     _useTool.obligation || '',
      toolIdx:        _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool).indexOf(_useTool) : -1,
      history:        _useHistory,
      timerSeconds:   _timerSeconds,
      savedAt:        new Date().toISOString()
    };
    try { localStorage.setItem(pwsActivatePauseKey(), JSON.stringify(snapshot)); } catch(e) {}
  }

  function pwsClearActivateSession() {
    try { localStorage.removeItem(pwsActivatePauseKey()); } catch(e) {}
  }

  function pwsTogglePause() {
    var btn = document.getElementById('pwsUsePauseBtn');
    if (_timerPaused) {
      _timerPaused = false;
      _timerStart = Date.now() - (_timerPausedAt * 1000);
      _timerInterval = setInterval(function() {
        _timerSeconds = Math.floor((Date.now() - _timerStart) / 1000);
        var el = document.getElementById('pwsTimerDisplay');
        if (el) el.textContent = pwsFmtSeconds(_timerSeconds);
      }, 1000);
      if (btn) { btn.classList.remove('paused'); btn.innerHTML = '<span class="en">&#9646;&#9646; Pause</span><span class="es">&#9646;&#9646; Pausa</span>'; }
    } else if (_timerInterval) {
      _timerPaused = true;
      _timerPausedAt = _timerSeconds;
      clearInterval(_timerInterval); _timerInterval = null;
      if (btn) { btn.classList.add('paused'); btn.innerHTML = '<span class="en">&#9654; Resume</span><span class="es">&#9654; Reanudar</span>'; }
      if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
        pwsSaveActivateSession();
      }
    } else if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
      pwsSaveActivateSession();
      useAppendBubble(_lang === 'es'
        ? 'Sesi\u00f3n pausada \u2014 tu progreso est\u00e1 guardado. Regresa cuando quieras y seguimos.'
        : 'Session paused \u2014 your progress is saved. Come back anytime and we\u2019ll pick up right where we left off.', 'docb');
      if (btn) { btn.classList.add('paused'); btn.innerHTML = '<span class="en">&#9654; Resume</span><span class="es">&#9654; Reanudar</span>'; }
      var newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', function() {
        newBtn.classList.remove('paused');
        newBtn.innerHTML = '<span class="en">&#9646;&#9646; Pause</span><span class="es">&#9646;&#9646; Pausa</span>';
        var resumeClone = newBtn.cloneNode(true);
        newBtn.parentNode.replaceChild(resumeClone, newBtn);
        resumeClone.addEventListener('click', pwsTogglePause);
        useAppendBubble(_lang === 'es' ? 'Bienvenido de vuelta. \u00bfSeguimos?' : 'Welcome back. Ready to continue?', 'docb');
      });
    } else {
      // No timer, not a talent tool — PAUSE becomes Save Chat
      if (_useHistory && _useHistory.length) {
        var winName2 = (_useTool && (_useTool.obligation || _useTool.en)) ? (_useTool.obligation || _useTool.en) : 'Session';
        var lines2 = [winName2 + ' \u2014 Doc B Chat', new Date().toLocaleString(), ''];
        _useHistory.forEach(function(m) {
          var role2 = m.role === 'user' ? 'You' : 'Doc B';
          var cnt2 = typeof m.content === 'string' ? m.content : '[image]';
          lines2.push(role2 + ': ' + cnt2);
          lines2.push('');
        });
        var blob3 = new Blob([lines2.join('\n')], { type: 'text/plain' });
        var url3 = URL.createObjectURL(blob3);
        var a3 = document.createElement('a');
        a3.href = url3; a3.target = '_blank';
        a3.download = winName2.replace(/\s+/g,'_') + '_chat_' + pwsLocalDate() + '.txt';
        a3.click();
        URL.revokeObjectURL(url3);
        useAppendBubble(_lang === 'es' ? 'Chat guardado. \u00bfSeguimos?' : 'Chat saved. Ready to continue?', 'docb');
        if (btn) { btn.innerHTML = '<span class="en">&#10003; Saved</span><span class="es">&#10003; Guardado</span>'; }
        setTimeout(function() {
          if (btn) btn.innerHTML = '<span class="en">&#9646;&#9646; Pause</span><span class="es">&#9646;&#9646; Pausa</span>';
        }, 2000);
      } else {
        var inp = document.getElementById('pwsUseInput');
        if (inp) { inp.focus(); }
      }
    }
  }

  /* FIRE TOOL -- LAUNCH execution (configured tools only) */
  function pwsFireTool(tool) {
    // Always open the USE overlay first — links and media accessible from inside
    if (tool._isWindowLaunch) { pwsOpenUse(tool, false); return; }

    var desc = tool.en || '';
    var isTimer = /timer|sprint|personal best|beat|minutes|seconds|record|how fast|fastest|race|challenge/i.test(desc);

    // Open USE overlay for all tools — user accesses links from inside via Links button
    if (isTimer) {
      var tIdx = pwsToolToIdx(tool);
      if (tIdx > -1) {
        pwsOpenPlanUse(tIdx);
        setTimeout(pwsStartTimer, 600);
      }
      return;
    }

    post({
      action:             'pwsLogAdherence',
      sessionId:          _session,
      requestingMemberId: _memberId,
      date:               pwsLocalDate(),
      windowKey:          'tool_launch_' + (tool.obligation || 'tool').replace(/\s+/g, '_').substring(0, 30),
      activityLabel:      tool.obligation || 'tool use',
      completed:          true,
      note:               'launched from My Day',
      lawTag:             pwsLawTag(tool)
    });

    var tIdx2 = pwsToolToIdx(tool);
    if (tIdx2 > -1) {
      pwsOpenUse(tIdx2, false);
    } else {
      pwsOpenUse(tool, false);
    }
  }

  function pwsToolToIdx(tool) {
    if (!_toolsData || !_toolsData.confirmedTools) return -1;
    var valid = _toolsData.confirmedTools.filter(pwsIsValidTool);
    for (var i = 0; i < valid.length; i++) {
      if (valid[i].obligation === tool.obligation && valid[i].en === tool.en) return i;
    }
    return -1;
  }

  var _depSeconds=0,_depSiteName='',_depUrl='',_depInterval=null;
  function pwsOpenDeparture(url,name) {
    var twsOv = document.getElementById('pwsTWSOverlay');
    if (twsOv && twsOv.classList.contains('open')) { window.open(url, '_blank'); return; }
    var useOv = document.getElementById('pwsUseOverlay');
    if (useOv && useOv.classList.contains('open')) { window.open(url, '_blank'); return; }
    var shortName = name || url;
    if (shortName.length > 40) { shortName = shortName.substring(0, shortName.indexOf(' ', 30) > 0 ? shortName.indexOf(' ', 30) : 40) + '...'; }
    var dep=document.getElementById('pwsDeparture'),nameEl=document.getElementById('pwsDepName'),launch=document.getElementById('pwsDepLaunch'),timerEl=document.getElementById('pwsDepTimer'),backBtn=document.getElementById('pwsDepBack');
    if (!dep) { window.open(url,'_blank'); return; }
    if (nameEl) nameEl.textContent=shortName;
    if (launch) launch.href=url;
    if (timerEl) timerEl.textContent='0:00';
    _depSeconds=0; _depSiteName=shortName; _depUrl=url;
    if (backBtn) backBtn.onclick=pwsCloseDeparture;
    if (_depInterval) clearInterval(_depInterval);
    _depInterval=setInterval(function(){
      _depSeconds++;
      var m=Math.floor(_depSeconds/60),s=_depSeconds%60,el=document.getElementById('pwsDepTimer');
      if (el) el.textContent=m+':'+(s<10?'0':'')+s;
    },1000);
    dep.classList.add('open'); document.body.style.overflow='hidden';
  }
  function pwsCloseDeparture() {
    if (_depInterval) { clearInterval(_depInterval); _depInterval=null; }
    var dep=document.getElementById('pwsDeparture');
    if (dep) dep.classList.remove('open');
    document.body.style.overflow='';
    if (_depSeconds>0) {
      pwsShowLaunchToast(_depSiteName+' \u2014 '+Math.floor(_depSeconds/60)+'m '+(_depSeconds%60)+'s');
      post({action:'handleECLogSession',memberId:_memberId,sessionId:_session,room:'tool',siteName:_depSiteName,url:_depUrl,durationSeconds:_depSeconds,sessionDate:pwsLocalDate(),sessionTime:new Date().toTimeString().slice(0,8)});
    }
    _depSeconds=0;
  }
  function pwsShowLaunchToast(msg) {
    var existing = document.getElementById('pwsLaunchToast');
    if (existing) existing.parentNode.removeChild(existing);
    var toast = document.createElement('div');
    toast.id = 'pwsLaunchToast';
    toast.textContent = msg || (_lang === 'es' ? 'Lanzado.' : 'Launched.');
    toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:#c8a84b;color:#040608;font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.18em;padding:10px 24px;z-index:9999;pointer-events:none;border-radius:2px;max-width:90vw;text-align:center;';
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 2800);
  }

  /* DOC ASSIST -- inline chat within the overlay feed */

  function pwsHandleAssistYesNo(answer) {
    var btnRow = document.getElementById('pwsAssistYesNoRow');
    if (btnRow && btnRow.parentNode) btnRow.parentNode.removeChild(btnRow);
    useAppendBubble(answer === 'yes' ? (_lang === 'es' ? 'S\u00ed' : 'Yes') : (_lang === 'es' ? 'No \u2014 Yo puedo' : 'No \u2014 I\u0027ve got this'), 'member');
    pwsContinueAssistFlow(answer);
  }

  function pwsContinueAssistFlow(answer) {
    if (answer === 'yes') {
      if (_useTool) _useTool.hasAssist = true;
      if (_toolsData && _toolsData.confirmedTools && _useTool) {
        _toolsData.confirmedTools.forEach(function(t) {
          if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.hasAssist = true; }
        });
        post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
      }
      useAppendBubble(_lang === 'es' ? 'Listo. Estar\u00e9 aqu\u00ed.' : 'Got it. I\u0027ll be here.', 'docb');
      pwsRenderUseFooter(false, false, _useTool ? _useTool.link : null);
    } else {
      useAppendBubble(_lang === 'es' ? 'Entendido. Lanza cuando est\u00e9s listo.' : 'Got it. Launch when you\u0027re ready.', 'docb');
    }
  }
  function pwsToggleAssistChat() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsAssistChatWrap');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsAssistChatWrap');

    var wrap = document.createElement('div');
    wrap.id = 'pwsAssistChatWrap';
    wrap.className = 'pws-links-panel';
    wrap.style.gap = '8px';

    var heading = document.createElement('div');
    heading.style.cssText = 'font-family:\'Cinzel\',serif;font-size:12px !important;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,168,75,0.7);';
    heading.textContent = _lang === 'es' ? 'DOC ASISTENTE' : 'DOC ASSIST';
    wrap.appendChild(heading);

    var inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;gap:8px;';

    var inp = document.createElement('textarea');
    inp.id = 'pwsAssistInput';
    inp.className = 'pws-links-input';
    inp.rows = 2;
    inp.style.resize = 'none';
    inp.placeholder = _lang === 'es' ? '\u00bfEn qu\u00e9 necesitas ayuda?' : 'What do you need help with?';

    var sendBtn = document.createElement('button');
    sendBtn.className = 'pws-links-save-btn';
    sendBtn.style.alignSelf = 'flex-end';
    sendBtn.textContent = _lang === 'es' ? 'ENVIAR' : 'SEND';
    sendBtn.addEventListener('click', pwsSendAssist);

    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendAssist(); }
    });

    inputRow.appendChild(inp);
    inputRow.appendChild(sendBtn);

    var replyArea = document.createElement('div');
    replyArea.id = 'pwsAssistReply';
    replyArea.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:20px !important;color:rgba(240,230,204,0.85);line-height:1.5;min-height:32px;";

    wrap.appendChild(inputRow);
    wrap.appendChild(replyArea);
    feed.appendChild(wrap);
    feed.scrollTop = feed.scrollHeight;
    setTimeout(function() { inp.focus(); }, 60);
  }

  function pwsSendAssist() {
    var inp = document.getElementById('pwsAssistInput');
    var replyArea = document.getElementById('pwsAssistReply');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    if (replyArea) replyArea.textContent = _lang === 'es' ? '\u2026' : '\u2026';

    var toolContext = (_useTool && _useTool.en) ? _useTool.en : '';
    var systemPrompt = 'You are Doc B on 4 LAWS Academy. The member is currently working on: "' + toolContext + '". ' +
      'They need help right now. Answer directly and briefly \u2014 2 sentences max. ' +
      'If it\u0027s a math problem, solve it. If it\u0027s a writing question, answer it. If it\u0027s a search, summarize what they need. ' +
      'Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';

    post({
      action:              'cftConvTurn',
      sessionId:           _session,
      requestingMemberId:  _memberId,
      projectId:           '',
      systemPrompt:        systemPrompt,
      conversationHistory: [{ role: 'user', content: text }]
    })
    .then(function(d) {
      var reply = (d && d.reply) ? d.reply : ((d && d.content && d.content[0]) ? d.content[0].text : '');
      if (replyArea) replyArea.textContent = reply || (_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.');
      var feed = pwsTWSGetFeed();
      if (feed) feed.scrollTop = feed.scrollHeight;
    })
    .catch(function() {
      if (replyArea) replyArea.textContent = _lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.';
    });
  }

  /* ================================================================
     v103 THE REAL ALARM IN THE LAUNCHER.
     The old launcher reminder was a v83-era stopgap: two prompt()
     boxes, a browser Notification and a setTimeout that died the
     moment the tab closed or navigated -- and four buttons beside it
     navigated away. It promised a member with executive-function load
     that it would remember for them, and then silently did not.
     This panel is the SAME wire the wall uses: pwsSaveReminder into
     the Reminders sheet, fired by the five-minute server heartbeat,
     delivered by Twilio (honest stub queue until Twilio goes live).
     Time, message, and phone -- the phone remembered after once.
     ================================================================ */
  function pwsToggleAlarmsMenu() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsAlarmMenuInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsAlarmMenuInner');

    var name = pwsECName_();
    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsAlarmMenuInner';

    var listDiv = document.createElement('div');
    panel.appendChild(listDiv);

    function cfgFor_() {
      if (!name) return null;
      if (!_windowConfig) _windowConfig = {};
      if (!_windowConfig[name]) _windowConfig[name] = {};
      return _windowConfig[name];
    }

    function renderAlarms() {
      listDiv.innerHTML = '';
      var cfg = cfgFor_();
      var rems = (cfg && cfg.reminders) ? cfg.reminders : [];
      var today = pwsLocalDate();
      var shown = 0;
      for (var i = 0; i < rems.length; i++) {
        var r = rems[i];
        if (!r || !r.time) continue;
        if (r.date && r.date !== today) continue;
        var row = document.createElement('div');
        row.className = 'pws-links-row';
        var lab = document.createElement('span');
        lab.className = 'pws-links-label';
        lab.textContent = '\u23F0 ' + r.time + (r.note ? ' \u2014 ' + r.note : '');
        row.appendChild(lab);
        listDiv.appendChild(row);
        shown++;
      }
      if (!shown) {
        var none = document.createElement('div');
        none.className = 'pws-links-empty';
        none.textContent = _lang === 'es' ? 'Sin alarmas hoy.' : 'No alarms today.';
        listDiv.appendChild(none);
      }
    }
    renderAlarms();

    var savedPhone = '';
    var cfg0 = cfgFor_();
    if (cfg0 && cfg0.reminderPhone) { savedPhone = cfg0.reminderPhone; }
    else { try { savedPhone = localStorage.getItem('4laws-alarm-phone') || ''; } catch (e) { savedPhone = ''; } }

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';
    var ti = document.createElement('input');
    ti.type = 'time'; ti.className = 'pws-links-input';
    var mi = document.createElement('input');
    mi.type = 'text'; mi.className = 'pws-links-input';
    mi.placeholder = _lang === 'es' ? 'Mensaje' : 'Message';
    var pi = document.createElement('input');
    pi.type = 'text'; pi.className = 'pws-links-input';
    pi.value = savedPhone;
    pi.placeholder = _lang === 'es' ? 'Tu celular (una vez)' : 'Your cell (asked once)';
    var note = document.createElement('div');
    note.className = 'pws-links-empty';
    note.textContent = _lang === 'es'
      ? 'Llega como texto hoy a esa hora \u2014 aunque cierres la p\u00e1gina.'
      : 'Arrives as a text today at that time \u2014 even if you close the page.';
    var sb = document.createElement('button');
    sb.className = 'pws-links-save-btn';
    sb.textContent = _lang === 'es' ? 'PONER ALARMA' : 'SET ALARM';
    sb.addEventListener('click', function() {
      var aTime  = ti.value || '';
      var aNote  = (mi.value || '').replace(/^\s+|\s+$/g, '');
      var aPhone = (pi.value || '').replace(/^\s+|\s+$/g, '');
      if (!aTime)  { note.textContent = _lang === 'es' ? 'Elige una hora.' : 'Set a time first.'; return; }
      if (!aPhone) { note.textContent = _lang === 'es' ? 'Falta tu celular.' : 'Add your cell number.'; return; }
      sb.disabled = true;
      post({ action: 'pwsSaveReminder', sessionId: _session, requestingMemberId: _memberId,
        memberId: _memberId, toolObligation: name, reminderTime: aTime, reminderNote: aNote, phone: aPhone })
      .then(function(d) {
        sb.disabled = false;
        if (!d || !d.success) { note.textContent = _lang === 'es' ? 'No se guard\u00f3. Intenta de nuevo.' : 'Not saved. Try again.'; return; }
        var cfg = cfgFor_();
        if (cfg) {
          if (!cfg.reminders) cfg.reminders = [];
          cfg.reminders.push({ time: aTime, note: aNote, date: pwsLocalDate() });
          cfg.reminderPhone = aPhone;
          if (name) pwsEquipSaveCfg_(name).catch(function(){});
        }
        try { localStorage.setItem('4laws-alarm-phone', aPhone); } catch (e2) {}
        ti.value = ''; mi.value = '';
        note.textContent = _lang === 'es' ? 'Alarma puesta.' : 'Alarm set.';
        renderAlarms();
      })
      .catch(function() {
        sb.disabled = false;
        note.textContent = _lang === 'es' ? 'No se guard\u00f3. Intenta de nuevo.' : 'Not saved. Try again.';
      });
    });
    form.appendChild(ti); form.appendChild(mi); form.appendChild(pi);
    form.appendChild(sb);
    panel.appendChild(form);
    panel.appendChild(note);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  /* ================================================================
     v102 THE MENU THAT KEEPS YOU -- no more jarring jumps.
     A launcher button opens the links YOU saved for THIS activity,
     right here in the feed. OPEN goes straight to that link in a new
     tab; the overlay stays exactly where it was. The Entertainment
     Center is the LAST row, a door you choose -- never one you fall
     through. Reads and writes cfg.ecLinks on the activity's equip: row,
     the same store the wall and /todos both use.
     ================================================================ */
  function pwsECName_() {
    if (!_useTool) return '';
    return _useTool.obligation || _useTool.en || _useTool.label || '';
  }
  function pwsECList_() {
    var n = pwsECName_();
    if (!n || !_windowConfig || !_windowConfig[n]) return [];
    return _windowConfig[n].ecLinks || [];
  }
  function pwsECSave_(list) {
    var n = pwsECName_(); if (!n) return;
    if (!_windowConfig) _windowConfig = {};
    if (!_windowConfig[n]) _windowConfig[n] = {};
    _windowConfig[n].ecLinks = list;
    pwsEquipSaveCfg_(n).catch(function(){});
  }
  var PWS_EC_META = {
    music: { icon: '\uD83C\uDFB5', label: 'Music' },
    games: { icon: '\uD83C\uDFAE', label: 'Games' },
    news:  { icon: '\uD83D\uDCFA', label: 'News'  },
    other: { icon: '\uD83D\uDD17', label: 'Link'  }
  };
  function pwsToggleECMenu(cat, roomPath, roomLabel) {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsECMenuInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsECMenuInner');

    var meta  = PWS_EC_META[cat] || PWS_EC_META.other;
    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsECMenuInner';

    var listDiv = document.createElement('div');
    panel.appendChild(listDiv);

    function renderEC() {
      listDiv.innerHTML = '';
      var all = pwsECList_();
      var mine = [];
      for (var i = 0; i < all.length; i++) {
        if (all[i] && all[i].category === cat) mine.push({ it: all[i], idx: i });
      }
      if (!mine.length) {
        var none = document.createElement('div');
        none.className = 'pws-links-empty';
        none.textContent = _lang === 'es'
          ? 'Nada guardado aqu\u00ed todav\u00eda \u2014 agrega uno abajo.'
          : 'Nothing saved here yet \u2014 add one below.';
        listDiv.appendChild(none);
        return;
      }
      for (var j = 0; j < mine.length; j++) {
        (function(entry) {
          var row = document.createElement('div');
          row.className = 'pws-links-row';
          var lab = document.createElement('span');
          lab.className = 'pws-links-label';
          lab.textContent = (entry.it.icon || meta.icon) + ' ' + (entry.it.label || entry.it.url);
          row.appendChild(lab);
          var op = document.createElement('button');
          op.className = 'pws-links-open-btn';
          op.textContent = _lang === 'es' ? 'ABRIR' : 'OPEN';
          op.addEventListener('click', function() {
            window.open(entry.it.url, '_blank', 'noopener');
          });
          row.appendChild(op);
          listDiv.appendChild(row);
        }(mine[j]));
      }
    }
    renderEC();

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';
    var ui = document.createElement('input');
    ui.type = 'text'; ui.className = 'pws-links-input';
    ui.placeholder = _lang === 'es' ? 'Pega un enlace\u2026' : 'Paste a URL\u2026';
    var ni = document.createElement('input');
    ni.type = 'text'; ni.className = 'pws-links-input';
    ni.placeholder = _lang === 'es' ? 'Nombre (opcional)' : 'Name (optional)';
    var sb = document.createElement('button');
    sb.className = 'pws-links-save-btn';
    sb.textContent = _lang === 'es' ? 'GUARDAR' : 'SAVE';
    sb.addEventListener('click', function() {
      var u = (ui.value || '').replace(/^\s+|\s+$/g, '');
      if (!u) return;
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      var nm = (ni.value || '').replace(/^\s+|\s+$/g, '');
      var list = pwsECList_().slice();
      list.push({ url: u, label: nm || meta.label, icon: meta.icon, category: cat });
      pwsECSave_(list);
      ui.value = ''; ni.value = '';
      renderEC();
    });
    form.appendChild(ui); form.appendChild(ni); form.appendChild(sb);
    panel.appendChild(form);

    // v104.2: the door must not look like the SAVE button. Outlined, not
    // filled; cream on felt; big enough to read without leaning in. Font
    // family unquoted in cssText per the standing watch item.
    var ecBtn = document.createElement('button');
    ecBtn.style.cssText = 'display:block;width:100%;box-sizing:border-box;margin:16px 0 4px;padding:14px 16px;background:transparent;border:1px solid rgba(200,168,75,0.55);border-radius:4px;color:#f0e6cc;font-family:Cinzel,serif;font-size:17px !important;letter-spacing:0.12em;text-transform:uppercase;text-align:center;cursor:pointer;line-height:1.35;';
    ecBtn.textContent = _lang === 'es'
      ? 'Centro de Entretenimiento \u2192'
      : 'Entertainment Center \u2192';
    ecBtn.addEventListener('click', function() {
      pwsOpenDeparture(roomPath, roomLabel);
    });
    panel.appendChild(ecBtn);

    feed.appendChild(panel);
    // scroll after layout so the last row is never clipped at the panel edge
    feed.scrollTop = feed.scrollHeight;
    setTimeout(function() { feed.scrollTop = feed.scrollHeight; }, 60);
  }

  /* LINKS PANEL -- toggled from launcher Links button */
  function pwsToggleLinksPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsLinksPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsLinksPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsLinksPanelInner';

    var listDiv = document.createElement('div');
    listDiv.id = 'pwsLinksList';
    pwsRenderLinksList(listDiv);
    panel.appendChild(listDiv);

    var isConfigured = _useTool && _useTool.configured;

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';
    form.id = 'pwsLinksForm';
    if (isConfigured) form.style.display = 'none';

    var urlInp = document.createElement('input');
    urlInp.type = 'text';
    urlInp.className = 'pws-links-input';
    urlInp.id = 'pwsLinksUrlInput';
    urlInp.placeholder = _lang === 'es' ? 'Pega un enlace...' : 'Paste a URL...';

    var labelInp = document.createElement('input');
    labelInp.type = 'text';
    labelInp.className = 'pws-links-input';
    labelInp.id = 'pwsLinksLabelInput';
    labelInp.placeholder = _lang === 'es' ? 'Etiqueta (opcional)' : 'Label (optional)';

    var saveBtn = document.createElement('button');
    saveBtn.className = 'pws-links-save-btn';
    saveBtn.textContent = _lang === 'es' ? 'GUARDAR' : 'SAVE';
    saveBtn.addEventListener('click', function() {
      pwsSaveLinkEntry();
      var f = document.getElementById('pwsLinksForm');
      if (f && isConfigured) f.style.display = 'none';
      var editBtn = document.getElementById('pwsLinksEditBtn');
      if (editBtn) editBtn.textContent = _lang === 'es' ? '+ Agregar enlace' : '+ Add link';
    });

    form.appendChild(urlInp);
    form.appendChild(labelInp);
    form.appendChild(saveBtn);
    panel.appendChild(form);

    if (isConfigured) {
      var editBtn = document.createElement('button');
      editBtn.id = 'pwsLinksEditBtn';
      editBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.14em;text-transform:uppercase;color:rgba(200,168,75,0.6);background:transparent;border:none;cursor:pointer;padding:4px 0;text-align:left;';
      editBtn.textContent = _lang === 'es' ? '+ Agregar enlace' : '+ Add link';
      editBtn.addEventListener('click', function() {
        var f = document.getElementById('pwsLinksForm');
        if (!f) return;
        var isHidden = f.style.display === 'none';
        f.style.display = isHidden ? 'flex' : 'none';
        editBtn.textContent = isHidden ? (_lang === 'es' ? '\u2715 Cancelar' : '\u2715 Cancel') : (_lang === 'es' ? '+ Agregar enlace' : '+ Add link');
      });
      panel.appendChild(editBtn);
    }

    listDiv.addEventListener('click', function(ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-link-url]') : null;
      if (!btn) return;
      var url = btn.getAttribute('data-link-url');
      if (!url) return;
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsRenderLinksList(container) {
    if (!container) return;
    var links = (_useTool && _useTool.links) ? _useTool.links : [];
    if (!links.length) {
      container.innerHTML = '<div class="pws-links-empty">' +
        (_lang === 'es' ? 'No hay enlaces guardados a\u00fan.' : 'No links saved yet.') +
        '</div>';
      return;
    }
    container.innerHTML = links.map(function(entry, i) {
      var displayLabel = escHtml(entry.label || entry.url || 'Link ' + (i + 1));
      return '<div class="pws-links-row">' +
        '<span class="pws-links-label">' + displayLabel + '</span>' +
        '<button class="pws-links-open-btn" data-link-url="' + escHtml(entry.url || '') + '">' +
          (_lang === 'es' ? 'ABRIR' : 'OPEN') +
        '</button>' +
      '</div>';
    }).join('');
  }

  function pwsSaveLinkEntry() {
    var urlInp   = document.getElementById('pwsLinksUrlInput');
    var labelInp = document.getElementById('pwsLinksLabelInput');
    if (!urlInp || !urlInp.value.trim()) return;
    var url   = urlInp.value.trim();
    var label = labelInp ? labelInp.value.trim() : '';
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    if (!label) label = url;
    if (!_useTool.links) _useTool.links = [];
    _useTool.links.push({ url: url, label: label });
    if (_useTool._tws && _twsProject) {
      _twsProject.links = _useTool.links;
      post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId,
        name: _twsProject.title, description: _twsProject.description, lawTag: 'talent',
        category: _twsProject.category, photo: _twsProject.photo, projectData: _twsProject }).catch(function() {});
    } else if (_useTool._isWindowLaunch && _useTool._windowLabel) {
      var wl = _useTool._windowLabel;
      if (!_windowConfig[wl]) _windowConfig[wl] = {};
      _windowConfig[wl].links = _useTool.links;
      // v100: branch 2 of the three-store problem now rides the funnel --
      // its migration starts a sprint early. Branches 1 (TWS project) and
      // 3 (tool.links) stay untouched; they are the room rebuild's business.
      pwsEquipSaveCfg_(wl).catch(function() {});
    } else if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.links = _useTool.links; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
    urlInp.value = '';
    if (labelInp) labelInp.value = '';
    var listDiv = document.getElementById('pwsLinksList');
    if (listDiv) pwsRenderLinksList(listDiv);
  }

  /* CASH REQUEST PANEL */
  function pwsToggleCashPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsCashPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsCashPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsCashPanelInner';

    var amountInp = document.createElement('input');
    amountInp.type = 'number'; amountInp.className = 'pws-links-input';
    amountInp.id = 'pwsCashAmount';
    amountInp.placeholder = _lang === 'es' ? '\u00bfCu\u00e1nto necesitas? ($)' : 'How much do you need? ($)';
    amountInp.min = '1';

    var reasonInp = document.createElement('input');
    reasonInp.type = 'text'; reasonInp.className = 'pws-links-input';
    reasonInp.id = 'pwsCashReason';
    reasonInp.placeholder = _lang === 'es' ? '\u00bfPara qu\u00e9 es? Una oraci\u00f3n.' : 'What\u0027s it for? One sentence.';

    var phoneInp = document.createElement('input');
    phoneInp.type = 'tel'; phoneInp.className = 'pws-links-input';
    phoneInp.id = 'pwsCashPhone';
    phoneInp.placeholder = _lang === 'es' ? 'Tel\u00e9fono del padre/madre' : 'Parent\u0027s phone number';
    if (_useTool && _useTool.parentPhone) phoneInp.value = _useTool.parentPhone;

    var sendBtn = document.createElement('button');
    sendBtn.className = 'pws-links-save-btn';
    sendBtn.textContent = _lang === 'es' ? 'ENVIAR SOLICITUD' : 'SEND REQUEST';
    sendBtn.addEventListener('click', pwsSendCashRequest);

    var confirmDiv = document.createElement('div');
    confirmDiv.className = 'pws-cash-confirm';
    confirmDiv.id = 'pwsCashConfirm';

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';
    form.appendChild(amountInp);
    form.appendChild(reasonInp);
    form.appendChild(phoneInp);
    form.appendChild(sendBtn);
    form.appendChild(confirmDiv);
    panel.appendChild(form);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSendCashRequest() {
    var amountEl = document.getElementById('pwsCashAmount');
    var reasonEl = document.getElementById('pwsCashReason');
    var phoneEl  = document.getElementById('pwsCashPhone');
    var confirmEl = document.getElementById('pwsCashConfirm');
    if (!amountEl || !reasonEl || !phoneEl) return;
    var amount = amountEl.value.trim();
    var reason = reasonEl.value.trim();
    var phone  = phoneEl.value.trim();
    if (!amount || !reason || !phone) {
      if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Completa todos los campos.' : 'Please fill in all fields.'; confirmEl.style.color = 'rgba(240,100,100,0.8)'; }
      return;
    }
    if (_useTool) { _useTool.parentPhone = phone; }
    if (_toolsData && _toolsData.confirmedTools && _useTool) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.parentPhone = phone; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
    var memberName = localStorage.getItem('4laws-display-name') || 'Your member';
    var msg = memberName + ' is requesting $' + amount + ' for ' + reason + '. Reply YES to approve or NO to decline.';
    post({ action: 'handleTwilioSMS', sessionId: _session, requestingMemberId: _memberId, toPhone: phone, message: msg, relationship: 'parent' });
    if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Solicitud enviada.' : 'Request sent.'; confirmEl.style.color = '#4caf82'; }
  }

  /* REMINDERS PANEL */


  function pwsSaveWindowReminders(wLabel, rems, phone) {
    if (!wLabel) return;
    if (!_windowConfig) _windowConfig = {};
    if (!_windowConfig[wLabel]) _windowConfig[wLabel] = {};
    _windowConfig[wLabel].reminders     = rems;
    _windowConfig[wLabel].reminderPhone = phone;
    pwsEquipSaveCfg_(wLabel).catch(function(){});
  }

  function pwsFireSingleReminder(time, note, phone) {
    if (!phone || !time) return;
    post({ action: 'pwsSaveReminder', sessionId: _session, requestingMemberId: _memberId,
      memberId: _memberId, toolObligation: (_useTool && _useTool.obligation) || '',
      reminderTime: time, reminderNote: note, phone: phone,
      date: pwsLocalDate() }).catch(function(){});
  }

  function pwsSaveReminder() {
    var timeEl = document.getElementById('pwsReminderTime');
    var noteEl = document.getElementById('pwsReminderNote');
    var phoneEl = document.getElementById('pwsReminderPhone');
    var confirmEl = document.getElementById('pwsReminderConfirm');
    if (!timeEl || !timeEl.value) {
      if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Elige una hora.' : 'Please set a time.'; confirmEl.style.color = 'rgba(240,100,100,0.8)'; }
      return;
    }
    pwsFireSingleReminder(timeEl.value, noteEl ? noteEl.value.trim() : '', phoneEl ? phoneEl.value.trim() : '');
    if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Recordatorio guardado.' : 'Reminder set.'; confirmEl.style.color = '#4caf82'; }
  }


  /* CONTACTS PANEL */
  function pwsToggleContactsPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsContactsPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsContactsPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsContactsPanelInner';

    var listDiv = document.createElement('div');
    listDiv.id = 'pwsContactsList';
    pwsRenderContactsList(listDiv);
    panel.appendChild(listDiv);

    listDiv.addEventListener('click', function(ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-contact-action]') : null;
      if (!btn) return;
      var action = btn.getAttribute('data-contact-action');
      var phone  = btn.getAttribute('data-contact-phone');
      if (!phone) return;
      var cleanPhone = phone.replace(/[^0-9+]/g, '');
      window.location.href = (action === 'call' ? 'tel:' : 'sms:') + cleanPhone;
    });

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';

    var nameInp = document.createElement('input');
    nameInp.type = 'text'; nameInp.className = 'pws-links-input';
    nameInp.id = 'pwsContactName';
    nameInp.placeholder = _lang === 'es' ? 'Nombre' : 'Name';

    var phoneInp = document.createElement('input');
    phoneInp.type = 'tel'; phoneInp.className = 'pws-links-input';
    phoneInp.id = 'pwsContactPhone';
    phoneInp.placeholder = _lang === 'es' ? 'N\u00famero de tel\u00e9fono' : 'Phone number';

    var extraInp = document.createElement('input');
    extraInp.type = 'text'; extraInp.className = 'pws-links-input';
    extraInp.id = 'pwsContactExtra';
    extraInp.placeholder = _lang === 'es' ? 'Enlace extra (opcional: Zoom, Discord...)' : 'Extra link (optional: Zoom, Discord...)';

    var saveBtn = document.createElement('button');
    saveBtn.className = 'pws-links-save-btn';
    saveBtn.textContent = _lang === 'es' ? 'GUARDAR' : 'SAVE';
    saveBtn.addEventListener('click', pwsSaveContact);

    form.appendChild(nameInp);
    form.appendChild(phoneInp);
    form.appendChild(extraInp);
    form.appendChild(saveBtn);
    panel.appendChild(form);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsRenderContactsList(container) {
    if (!container) return;
    var contacts = (_useTool && _useTool.contacts) ? _useTool.contacts : [];
    if (!contacts.length) {
      container.innerHTML = '<div class="pws-links-empty">' +
        (_lang === 'es' ? 'No hay contactos guardados a\u00fan.' : 'No contacts saved yet.') +
        '</div>';
      return;
    }
    container.innerHTML = contacts.map(function(c) {
      var nameHtml  = escHtml(c.name || 'Contact');
      var phoneAttr = escHtml(c.phone || '');
      var extraHtml = c.extraLink
        ? '<a href="' + escHtml(c.extraLink) + '" target="_blank" rel="noopener noreferrer" style="font-family:\'Cinzel\',serif;font-size:10px !important;letter-spacing:0.12em;color:rgba(200,168,75,0.6);margin-left:6px;">LINK</a>'
        : '';
      return '<div class="pws-links-row">' +
        '<span class="pws-links-label">' + nameHtml + extraHtml + '</span>' +
        '<div style="display:flex;gap:6px;flex-shrink:0;">' +
          '<button class="pws-contact-action-btn" data-contact-action="call" data-contact-phone="' + phoneAttr + '">' +
            (_lang === 'es' ? 'LLAMAR' : 'CALL') +
          '</button>' +
          '<button class="pws-contact-action-btn" data-contact-action="text" data-contact-phone="' + phoneAttr + '">' +
            (_lang === 'es' ? 'TEXTO' : 'TEXT') +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function pwsSaveContact() {
    var nameEl  = document.getElementById('pwsContactName');
    var phoneEl = document.getElementById('pwsContactPhone');
    var extraEl = document.getElementById('pwsContactExtra');
    if (!nameEl || !phoneEl) return;
    var name  = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var extra = extraEl ? extraEl.value.trim() : '';
    if (!name || !phone) return;
    if (!_useTool.contacts) _useTool.contacts = [];
    _useTool.contacts.push({ name: name, phone: phone, extraLink: extra || '' });
    if (_useTool._tws && _twsProject) {
      _twsProject.contacts = _useTool.contacts;
      post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId,
        name: _twsProject.title, description: _twsProject.description, lawTag: 'talent',
        category: _twsProject.category, photo: _twsProject.photo, projectData: _twsProject }).catch(function() {});
    } else if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.contacts = _useTool.contacts; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
    nameEl.value = ''; phoneEl.value = ''; if (extraEl) extraEl.value = '';
    var listDiv = document.getElementById('pwsContactsList');
    if (listDiv) pwsRenderContactsList(listDiv);
  }

  /* PENTAGON SIGN -- programming session opener */
  function pwsShowPentagonSign(callback) {
    var feed = document.getElementById('pwsUseFeed');
    if (!feed) { if (callback) callback(); return; }
    var wrap = document.createElement('div');
    wrap.className = 'pws-pentagon-wrap';
    var pent = document.createElement('div');
    pent.className = 'pws-pentagon';
    var txt = document.createElement('div');
    txt.className = 'pws-pentagon-text';
    txt.textContent = _lang === 'es' ? 'VAMOS A PROGRAMAR ESTO' : 'LET\u0027S TIME THE TOOLS';
    pent.appendChild(txt);
    wrap.appendChild(pent);
    feed.appendChild(wrap);
    feed.scrollTop = feed.scrollHeight;
    setTimeout(function() {
      wrap.style.transition = 'opacity 0.5s ease';
      wrap.style.opacity = '0';
      setTimeout(function() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
        if (callback) callback();
      }, 500);
    }, 1800);
  }

  /* TALENT BUILDER -- builds tool from strength/desire conversat */
  var _talentHistory = [];

  function pwsOpenTalentBuilder() {
    _talentHistory = [];
    var feed = document.getElementById('pwsTalentFeed');
    if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsTalentOverlay');
    if (ov) ov.classList.add('open');
    var opening = _lang === 'es'
      ? 'Cu\u00e9ntame \u2014 \u00bfen qu\u00e9 quieres convertirte o qu\u00e9 quieres dominar?'
      : 'Tell me \u2014 what do you want to become or master?';
    pwsTalentAppendBubble(opening, 'docb');
    _talentHistory.push({ role: 'assistant', content: opening });
    var inp = document.getElementById('pwsTalentInput');
    if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
    var closeBtn = document.getElementById('pwsTalentCloseBtn');
    if (closeBtn) {
      var newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      newClose.addEventListener('click', pwsCloseTalentBuilder);
    }
    var sendBtn = document.getElementById('pwsTalentSendBtn');
    if (sendBtn) {
      var newSend = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newSend, sendBtn);
      newSend.addEventListener('click', pwsSendTalent);
    }
    var micBtn = document.getElementById('pwsTalentMic');
    if (micBtn) {
      var micClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(micClone, micBtn);
      micClone.addEventListener('click', pwsToggleTalentMic);
    }
    var talentInp = document.getElementById('pwsTalentInput');
    if (talentInp) {
      talentInp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendTalent(); }
      });
    }
  }

  function pwsCloseTalentBuilder() {
    var ov = document.getElementById('pwsTalentOverlay');
    if (ov) ov.classList.remove('open');
    _talentHistory = [];
  }

  function pwsTalentAppendBubble(text, role) {
    var feed = document.getElementById('pwsTalentFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = text;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSendTalent() {
    var inp = document.getElementById('pwsTalentInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    pwsTalentAppendBubble(text, 'member');
    _talentHistory.push({ role: 'user', content: text });
    var typingId = 'pws-talent-typing-' + Date.now();
    var feed = document.getElementById('pwsTalentFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }
    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' A member wants to build a Talent Tool \u2014 something they want to become or master.' +
      ' Have a short focused conversation to understand their desire.' +
      ' When you build the prescription, naturally recommend relevant platform tools where they fit:' +
      ' mention a timer for timed practice sets, music for focus or energy, reminders for consistency, links for resources.' +
      ' Weave these recommendations into the prescription text naturally \u2014 do not list them separately.' +
      ' When you have enough to build a tool prescription, end your response with TALENT_READY on its own line,' +
      ' followed by a JSON block: {"label":"short tool name","prescription":"full tool description","subtitle":"one sentence about the member"}.' +
      ' The JSON fields must follow these rules:' +
      ' "label" = a vivid 2-4 word tool name ONLY \u2014 maximum four words \u2014 examples: "Inner World Shield", "Cuban Voice Awakening", "Vocal Legacy". Never a full sentence. Never more than four words.' +
      ' "subtitle" = one personal sentence about the member\u0027s specific situation \u2014 this is where the poetic empathy line goes, NOT in label.' +
      ' "prescription" = the full behavioral protocol.' +
      ' Use the subtitle field to personalize the tool card.' +
      ' Keep it warm, direct, 2\u20133 sentences max per turn. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _talentHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTalentAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _talentHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('TALENT_READY');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        if (displayMsg) pwsTalentAppendBubble(displayMsg, 'docb');
        var jsonStart = reply.indexOf('{', markerIdx);
        var jsonEnd = reply.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            var toolData = JSON.parse(reply.substring(jsonStart, jsonEnd + 1));
            pwsSaveTalentTool(toolData);
          } catch(e) {
            pwsTalentAppendBubble(_lang === 'es' ? 'Algo sali\u00f3 mal. Int\u00e9ntalo de nuevo.' : 'Something went wrong. Try again.', 'docb');
          }
        }
      } else {
        pwsTalentAppendBubble(reply, 'docb');
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTalentAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  }

  function pwsSaveTalentTool(toolData) {
    var label        = (toolData && toolData.label)        || 'Talent Tool';
    var prescription = (toolData && toolData.prescription) || '';
    var subtitle     = (toolData && toolData.subtitle)     || label;
    if (!_toolsData) _toolsData = { confirmedTools: [], addedToolNames: [], _items: [] };
    if (!_toolsData.confirmedTools) _toolsData.confirmedTools = [];
    var newTool = {
      label:        label,
      en:           prescription,
      obligation:   label,
      subtitle:     subtitle,
      type:         'talent',
      hasAssist:    true,
      configured:   false,
      link:         '',
      timerMinutes: 0
    };
    _toolsData.confirmedTools.push(newTool);
    post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() })
    .then(function() {
      pwsTalentAppendBubble(_lang === 'es' ? '\u2713 Herramienta de talento guardada. Aparece en Mis Herramientas.' : '\u2713 Talent tool saved. It\u0027s now in your Tools.', 'docb');
      pwsRenderToolsTile();
      var addRow = document.createElement('div');
      addRow.style.cssText = 'display:flex;gap:10px;padding:4px 0;';
      var btnYes = document.createElement('button');
      btnYes.className = 'pws-use-footer-btn';
      btnYes.textContent = _lang === 'es' ? 'S\u00ed, agregar' : 'YES \u2014 Add to My Day';
      btnYes.addEventListener('click', function() {
        addRow.parentNode.removeChild(addRow);
        pwsAddTalentToolToDay(newTool);
        pwsCloseTalentBuilder();
      });
      var btnLater = document.createElement('button');
      btnLater.className = 'pws-use-footer-btn';
      btnLater.textContent = _lang === 'es' ? 'Despu\u00e9s' : 'Maybe Later';
      btnLater.addEventListener('click', function() {
        addRow.parentNode.removeChild(addRow);
        pwsCloseTalentBuilder();
      });
      addRow.appendChild(btnYes);
      addRow.appendChild(btnLater);
      var feed = document.getElementById('pwsTalentFeed');
      if (feed) { feed.appendChild(addRow); feed.scrollTop = feed.scrollHeight; }
    });
  }

  function pwsAddTalentToolToDay(tool) {
    if (!_dayData) return;
    if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    var tIdx = -1;
    var tLabel = tool.label || tool.obligation || '';
    for (var i = 0; i < validTools.length; i++) {
      if ((validTools[i].label || '').toLowerCase() === tLabel.toLowerCase() ||
          (validTools[i].obligation || '').toLowerCase() === tLabel.toLowerCase()) {
        tIdx = i; break;
      }
    }
    _dayData.finalSchedule.push({
      label:       tLabel,
      activity:    tLabel,
      derivedTime: '',
      ownsIt:      true,
      isTalent:    true,
      obligation:  tool.obligation || tLabel,
      toolIdx:     tIdx,
      type:        'obligation'
    });
    post({ action: 'pwsSaveDay', sessionId: _session, requestingMemberId: _memberId, data: _dayData })
    .then(function() { pwsRenderDayTile(); });
  }

  var _talentMicActive  = false;
  var _twsHistory  = [];
  var _twsProject  = null;
  var _twsMicActive   = false;
  var _twsRecognizer  = null;
  var _twsNotesDraft  = '';

  /* START FRESH -- clears all station data and reopens onboardin */
  function pwsStartFresh() {
    _obsData   = null;
    _toolsData = null;
    _dayData   = null;
    var emptyObs  = { confirmedObs: [], hateList: [], wishList: [], whatMatters: '' };
    var emptyTools = { confirmedTools: [], addedToolNames: [], _items: [] };
    var emptyDay  = { finalSchedule: [], wakeTime: '', bedTime: '', rankedPriorities: [], howGoodCould: '', howGoodWant: '' };
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId, data: emptyObs });
    post({ action: 'pwsSaveTools',   sessionId: _session, requestingMemberId: _memberId, data: emptyTools });
    post({ action: 'pwsSaveDay',     sessionId: _session, requestingMemberId: _memberId, data: emptyDay });
    pwsRenderStationTile();
    pwsRenderToolsTile();
    pwsRenderDayTile();
    setTimeout(function() { window.location.href = '/todos'; }, 500);
  }

  /* ACCORDION — toggle and live status lines */
  function pwsInitAccordion() {
    var headers = ['pwsAccordionLimitsHdr','pwsAccordionRespectHdr','pwsAccordionResponsibilityHdr','pwsAccordionTalentHdr'];
    var cards   = ['pwsAccordionLimits',   'pwsAccordionRespect',   'pwsAccordionResponsibility',   'pwsAccordionTalent'];
    for (var i = 0; i < headers.length; i++) {
      (function(idx) {
        var hdr = document.getElementById(headers[idx]);
        if (!hdr) return;
        hdr.addEventListener('click', function() {
          var card = document.getElementById(cards[idx]);
          if (!card) return;
          if (card.classList.contains('open')) { card.classList.remove('open'); } else { card.classList.add('open'); }
        });
      }(i));
    }
  }

  /* ADDITION 1 — updateProject helper */
  function pwsUpdateProject(fields) {
    if (!_twsProject || !_twsProject.projectId) return;
    var payload = { action: 'updateProject', sessionId: _session, requestingMemberId: _memberId, projectId: _twsProject.projectId, name: _twsProject.title || 'Project', lawTag: 'talent' };
    var keys = Object.keys(fields);
    for (var ki = 0; ki < keys.length; ki++) { payload[keys[ki]] = fields[keys[ki]]; }
    for (var li = 0; li < keys.length; li++) { _twsProject[keys[li]] = fields[keys[li]]; }
    post(payload).catch(function() {});
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
      data: Object.assign({}, _obsData || {}, { _twsProject: _twsProject }) }).catch(function() {});
  }

  /* ADDITION 2 — MASTERY LEARNING LOOP */

  function pwsMasteryScheduleFirstSession(whenText) {
    if (!_twsProject || !_twsProject.projectId) return;
    var projId    = _twsProject.projectId;
    var projTitle = _twsProject.title || 'Project Practice';
    var label = projTitle + ' Practice';
    if (!_dayData) _dayData = {};
    if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
    _dayData.finalSchedule.push({
      label:        label,
      activity:     label,
      derivedTime:  whenText || 'evening',
      ownsIt:       true,
      isTalent:     true,
      isMastery:    true,
      projectId:    projId,       // confirmed set — not empty string
      masteryStage: 1,
      type:         'obligation'
    });
    post({ action: 'pwsSaveDay', sessionId: _session, requestingMemberId: _memberId, data: _dayData }).catch(function() {});
    pwsUpdateProject({ masteryStage: 2 });
    var doneEN = '\u2713 Added to My Day.\n\nStage 2 is Practice. Each time you show up, I\'ll check in with you. Three sessions and we move to Stage 3.\n\nClose this and tap your project card to see your tools.';
    var doneES = '\u2713 Agregado a Mi D\u00eda.\n\nEtapa 2 es Pr\u00e1ctica. Cada vez que aparezcas, te har\u00e9 un reporte. Tres sesiones y avanzamos a Etapa 3.\n\nCierra esto y toca tu proyecto para ver tus herramientas.';
    pwsTWSAppendBubble(_lang === 'es' ? doneES : doneEN, 'docb');
    _twsPhase = 'done';
    setTimeout(function() {
      pwsCloseTWS();
      pwsRenderProjectTile(null);
      pwsRenderDayTile();
      pwsUpdateAccordionStatus();
    }, 2500);
  }

  var _masteryCheckHistory = [];



  var _masteryMicActive = false;
  var _masteryRecognizer = null;

  function pwsToggleMasteryMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_masteryMicActive) {
      if (_masteryRecognizer) { try { _masteryRecognizer.stop(); } catch(e) {} _masteryRecognizer = null; }
      _masteryMicActive = false;
      var btn = document.getElementById('pwsMasteryMic');
      if (btn) btn.classList.remove('listening');
      return;
    }
    _masteryRecognizer = new SR();
    _masteryRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _masteryRecognizer.continuous = true;
    _masteryRecognizer.interimResults = true;
    _masteryRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } if (inp) inp.value = transcript.trim(); };
    _masteryRecognizer.onend = function() {
      _masteryMicActive = false;
      var btn = document.getElementById('pwsMasteryMic');
      if (btn) btn.classList.remove('listening');
    };
    _masteryRecognizer.start();
    _masteryMicActive = true;
    var btn = document.getElementById('pwsMasteryMic');
    if (btn) btn.classList.add('listening');
  }

  function pwsMasteryAppendBubble(text, role) {
    var feed = document.getElementById('pwsMasteryFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSendMasteryCheckIn(stage) {
    var inp = document.getElementById('pwsMasteryInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    if (_masteryMicActive && _masteryRecognizer) { try { _masteryRecognizer.stop(); } catch(e) {} _masteryMicActive = false; }
    pwsMasteryAppendBubble(text, 'member');
    _masteryCheckHistory.push({ role: 'user', content: text });

    var newCount = ((_twsProject && _twsProject.sessionCount) || 0) + 1;
    var today = pwsLocalDate();
    var newStreak = ((_twsProject && _twsProject.streakDays) || 0) + 1;

    var newStage = stage;
    if (stage === 2 && newCount >= 3) newStage = 3;
    if (stage === 3 && newCount >= 10 && newStreak >= 5) newStage = 4;

    pwsUpdateProject({ sessionCount: newCount, lastPracticed: today, streakDays: newStreak, masteryStage: newStage });

    var typingId = 'pws-mastery-typing-' + Date.now();
    var feed = document.getElementById('pwsMasteryFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }
    var projTitle = (_twsProject && _twsProject.title) || 'the project';
    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' The member just completed a practice session for their project "' + projTitle + '", Stage ' + stage + '.' +
      ' Total sessions: ' + newCount + '. Streak: ' + newStreak + ' days.' +
      (newStage > stage ? ' They just advanced to Stage ' + newStage + '! Celebrate this genuinely.' : '') +
      ' Respond warmly to what they noticed. Ask one brief follow-up. 2-3 sentences max.' +
      ' Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: (_twsProject && _twsProject.projectId) || '', systemPrompt: systemPrompt, conversationHistory: _masteryCheckHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsMasteryAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb'); return; }
      _masteryCheckHistory.push({ role: 'assistant', content: reply });
      pwsMasteryAppendBubble(reply, 'docb');
      setTimeout(function() {
        var mo = document.getElementById('pwsMasteryOverlay');
        if (mo) mo.classList.remove('open');
        pwsRenderDayTile();
        pwsUpdateAccordionStatus();
      }, 3000);
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsMasteryAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb');
    });
  }

  function pwsMasteryRenderCheckIn(s, idx) {
    var stage = s.masteryStage || 1;
    var projId = s.projectId || '';
    return '<div class="pws-checkin-row" style="margin-top:4px !important;" onclick="event.stopPropagation();">' +
      '<button class="pws-day-launch-btn" data-mastery-checkin="1" data-mastery-idx="' + idx + '" data-mastery-stage="' + stage + '" data-mastery-projid="' + escHtml(projId) + '">' +
      '<span class="en">\u2713 Check In</span><span class="es">\u2713 Reportar</span></button></div>';
  }

  /* ADDITION 3 — ENTERTAINMENT CENTER BRIDGE */

  function pwsEntertainmentBridgeOutbound(linkType) {
    var label = linkType === 'music' ? (_lang === 'es' ? 'Sala de Musica' : 'Music Room') : 'Games';
    if (!_twsProject || !_twsProject.projectId) { pwsOpenDeparture(linkType === 'music' ? '/music' : '/games', label); return; }
    var base = linkType === 'music' ? '/music' : '/games';
    pwsOpenDeparture(base + '?returnTo=pws&projectId=' + encodeURIComponent(_twsProject.projectId) + '&linkType=' + encodeURIComponent(linkType), label);
  }

  function pwsEntertainmentBridgeInbound() {
    var params = window.location.search;
    if (!params || params.indexOf('returnTo=pws') === -1) return;
    var projectIdMatch = params.match(/projectId=([^&]+)/);
    if (!projectIdMatch) return;
    var projectId = decodeURIComponent(projectIdMatch[1]);
    var pending = null;
    try { var raw = localStorage.getItem('4laws-pending-entertainment-link'); if (raw) pending = JSON.parse(raw); } catch(e) {}
    if (!pending) return;
    try { localStorage.removeItem('4laws-pending-entertainment-link'); } catch(e) {}
    var existing = [];
    try { if (_twsProject && _twsProject.entertainmentLinks) existing = JSON.parse(_twsProject.entertainmentLinks); } catch(e) {}
    pending.linkedDate = pwsLocalDate();
    existing.push(pending);
    var updatedLinks = JSON.stringify(existing);
    pwsUpdateProject({ entertainmentLinks: updatedLinks });
    setTimeout(function() {
      var feed = document.getElementById('pwsTWSPanelFeed');
      if (!feed) return;
      var confirm = document.createElement('div');
      confirm.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:22px !important;font-style:italic;color:#4caf82;padding:10px 0;";
      confirm.textContent = (pending.title || (pending.type === 'music' ? 'Playlist' : 'Game')) + (_lang === 'es' ? ' vinculado a tu proyecto.' : ' linked to your project.');
      feed.appendChild(confirm);
      feed.scrollTop = feed.scrollHeight;
    }, 600);
    try { window.history.replaceState({}, '', window.location.pathname); } catch(e) {}
  }

  /* ADDITION 4 — ADULT CFT CONVERSATION */

  var _fundingHistory  = [];
  var _fundingLayer    = 0;
  var _fundingLetter   = '';
  var _fundingMicActive   = false;
  var _fundingRecognizer  = null;

  function pwsOpenFunding() {
    _fundingHistory = [];
    _fundingLayer   = 1;
    _fundingLetter  = '';
    var feed = document.getElementById('pwsFundingFeed');
    if (feed) feed.innerHTML = '';
    var letterWrap = document.getElementById('pwsFundingLetterWrap');
    if (letterWrap) letterWrap.style.display = 'none';
    var ov = document.getElementById('pwsFundingOverlay');
    if (ov) ov.classList.add('open');

    var closeBtn = document.getElementById('pwsFundingCloseBtn');
    if (closeBtn) {
      var cClone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(cClone, closeBtn);
      cClone.addEventListener('click', pwsCloseFunding);
    }
    var sendBtn = document.getElementById('pwsFundingSendBtn');
    if (sendBtn) {
      var sClone = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(sClone, sendBtn);
      sClone.addEventListener('click', pwsSendFunding);
    }
    var micBtn = document.getElementById('pwsFundingMic');
    if (micBtn) {
      var mClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(mClone, micBtn);
      mClone.addEventListener('click', pwsToggleFundingMic);
    }
    var inp = document.getElementById('pwsFundingInput');
    if (inp) {
      inp.value = '';
      var iClone = inp.cloneNode(true);
      inp.parentNode.replaceChild(iClone, inp);
      iClone.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendFunding(); }
      });
      setTimeout(function() { iClone.focus(); }, 80);
    }

    var projTitle = (_twsProject && _twsProject.title) || 'your project';
    var openEN = 'Let\'s talk about what "' + projTitle + '" needs to move forward.\n\nWhat can you allocate from your own budget right now? And what monthly commitment could you realistically make?';
    var openES = 'Hablemos de lo que "' + projTitle + '" necesita para avanzar.\n\n\u00bfQu\u00e9 puedes asignar de tu propio presupuesto ahora mismo? \u00bfY qu\u00e9 compromiso mensual podr\u00edas hacer de manera realista?';
    var openMsg = _lang === 'es' ? openES : openEN;
    pwsFundingAppendBubble(openMsg, 'docb');
    _fundingHistory.push({ role: 'assistant', content: openMsg });
  }

  function pwsCloseFunding() {
    fundingStopMic();
    var ov = document.getElementById('pwsFundingOverlay');
    if (ov) ov.classList.remove('open');
    _fundingHistory = [];
    _fundingLayer   = 0;
  }

  function pwsFundingAppendBubble(text, role) {
    var feed = document.getElementById('pwsFundingFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function fundingStopMic() {
    if (_fundingRecognizer) { try { _fundingRecognizer.stop(); _fundingRecognizer.onresult = null; _fundingRecognizer.onend = null; } catch(e) {} _fundingRecognizer = null; }
    _fundingMicActive = false;
    var btn = document.getElementById('pwsFundingMic');
    if (btn) btn.classList.remove('listening');
  }

  function pwsToggleFundingMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_fundingMicActive) { fundingStopMic(); return; }
    fundingStopMic();
    _fundingRecognizer = new SR();
    _fundingRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _fundingRecognizer.continuous = true;
    _fundingRecognizer.interimResults = true;
    _fundingRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } if (inp) inp.value = transcript.trim(); };
    _fundingRecognizer.onend = function() {
      _fundingMicActive = false;
      var btn = document.getElementById('pwsFundingMic');
      if (btn) btn.classList.remove('listening');
    };
    _fundingRecognizer.start();
    _fundingMicActive = true;
    var btn = document.getElementById('pwsFundingMic');
    if (btn) btn.classList.add('listening');
  }

  function pwsSendFunding() {
    var inp = document.getElementById('pwsFundingInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    fundingStopMic();
    pwsFundingAppendBubble(text, 'member');
    _fundingHistory.push({ role: 'user', content: text });

    var typingId = 'pws-funding-typing-' + Date.now();
    var feed = document.getElementById('pwsFundingFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }

    var projTitle = (_twsProject && _twsProject.title) || 'the project';
    var category  = (_twsProject && _twsProject.category) || '';
    var layerGuide = [
      '',
      'Layer 1 \u2014 Personal Budget: Understand what they can allocate now and monthly. When you have a clear picture, naturally transition to Layer 2.',
      'Layer 2 \u2014 Personal Network: Ask who in their life believes in this project. Help them identify relatives, friends, mentors, faith community. Help them think about a dignified personal ask \u2014 an invitation to invest in someone they love. When done, transition to Layer 3.',
      'Layer 3 \u2014 Institutional Funding: Based on project category "' + category + '", identify 2-3 specific grants or funds that apply. Give names and next steps. For each, one sentence on what it is. Ask which institution they want to approach. Then go to Layer 4.',
      'Layer 4 \u2014 Grant Letter: The member has chosen an institution. Ask: "Want me to write your letter?" WAIT for yes. Then write a professional grant letter in their voice: name and background, project vision "' + projTitle + '", specific funding need, community impact. Output between LETTER_START and LETTER_END. Ask if they want edits.',
      'Layer 5 \u2014 Funding Plan: Assemble everything into a simple one-page summary: what is needed, where it comes from, and timeline. End with FUNDING_COMPLETE on its own line.'
    ][_fundingLayer] || '';

    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' You are helping a member develop a complete funding strategy for their project "' + projTitle + '".' +
      ' Current layer: ' + _fundingLayer + ' of 5. ' + layerGuide +
      ' Be warm, direct, adult-appropriate. Ask one focused question at a time. 2-3 sentences max per turn.' +
      ' When you complete a layer and transition to the next, increment your internal layer count by telling the member what is next.' +
      ' Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';

    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: (_twsProject && _twsProject.projectId) || '', systemPrompt: systemPrompt, conversationHistory: _fundingHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsFundingAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb'); return; }
      _fundingHistory.push({ role: 'assistant', content: reply });

      var letterStart = reply.indexOf('LETTER_START');
      var letterEnd   = reply.indexOf('LETTER_END');
      if (letterStart !== -1 && letterEnd !== -1) {
        var letterText = reply.substring(letterStart + 'LETTER_START'.length, letterEnd).trim();
        var beforeLetter = reply.substring(0, letterStart).trim();
        var afterLetter  = reply.substring(letterEnd + 'LETTER_END'.length).trim();
        if (beforeLetter) pwsFundingAppendBubble(beforeLetter, 'docb');
        var letterWrap = document.getElementById('pwsFundingLetterWrap');
        var letterDiv  = document.getElementById('pwsFundingLetterText');
        if (letterWrap) letterWrap.style.display = 'block';
        if (letterDiv)  letterDiv.textContent = letterText;
        _fundingLetter = letterText;
        if (afterLetter) pwsFundingAppendBubble(afterLetter, 'docb');
        _fundingLayer = 5;
        pwsUpdateProject({ fundingStatus: 'letter-generated', fundingLetter: letterText });
        return;
      }

      if (reply.indexOf('FUNDING_COMPLETE') !== -1) {
        var displayMsg = reply.substring(0, reply.indexOf('FUNDING_COMPLETE')).trim();
        if (displayMsg) pwsFundingAppendBubble(displayMsg, 'docb');
        pwsUpdateProject({ fundingStatus: 'completed' });
        var completedEN = '\u2713 Your funding plan is complete. It\u2019s saved to your project.';
        var completedES = '\u2713 Tu plan de financiamiento est\u00e1 completo. Est\u00e1 guardado en tu proyecto.';
        pwsFundingAppendBubble(_lang === 'es' ? completedES : completedEN, 'docb');
        var inputRow = document.getElementById('pwsFundingInputRow');
        if (inputRow) inputRow.style.display = 'none';
        return;
      }

      pwsFundingAppendBubble(reply, 'docb');
      if (_fundingLayer < 5) {
        var advanceSignals = ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 5', 'now let\'s talk about', 'moving to', 'next, let\'s', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5'];
        for (var ai = 0; ai < advanceSignals.length; ai++) {
          if (reply.toLowerCase().indexOf(advanceSignals[ai].toLowerCase()) !== -1) {
            _fundingLayer = Math.min(_fundingLayer + 1, 5);
            break;
          }
        }
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsFundingAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb');
    });
  }

  function pwsUpdateAccordionStatus() {
    var limitsEl         = document.getElementById('pwsStatusLimits');
    var respectEl        = document.getElementById('pwsStatusRespect');
    var responsibilityEl = document.getElementById('pwsStatusResponsibility');
    var talentEl         = document.getElementById('pwsStatusTalent');

    if (limitsEl && _dayData && _dayData.finalSchedule) {
      var sched = _dayData.finalSchedule.filter(function(s) { return !s.isTodo; });
      var done  = sched.filter(function(s) { return s._checkedIn === 'done'; }).length;
      var total = sched.length;
      var next  = null;
      for (var i = 0; i < sched.length; i++) {
        if (!sched[i]._checkedIn) { next = sched[i].label || sched[i].activity; break; }
      }
      if (total === 0) {
        limitsEl.textContent = 'Plan your day to begin';
      } else if (done === total) {
        limitsEl.textContent = 'Day complete. You crushed it.';
      } else if (next) {
        limitsEl.textContent = done + ' of ' + total + ' complete \u2014 ' + next + ' is next';
      } else {
        limitsEl.textContent = done + ' of ' + total + ' complete';
      }
    }

    if (respectEl && _obsData && _obsData.confirmedObs) {
      var crushing = (_obsData.confirmedObs || []).filter(function(o) { return o.state === 'crushing'; }).length;
      var totalObl = (_obsData.confirmedObs || []).length;
      if (totalObl === 0) {
        respectEl.textContent = 'Build your station to begin';
      } else {
        respectEl.textContent = 'Crushing it on ' + crushing + ' of ' + totalObl;
      }
    }

    if (responsibilityEl && _toolsData && _toolsData.confirmedTools) {
      var tools    = _toolsData.confirmedTools.filter(pwsIsValidTool);
      var crushing2 = _obsData && _obsData.confirmedObs ? (_obsData.confirmedObs || []).filter(function(o) { return o.state === 'crushing'; }).length : 0;
      var needed   = 4;
      var gamesStatus = crushing2 >= needed ? 'Games unlocked' : (needed - crushing2) + ' more to unlock Games';
      responsibilityEl.textContent = tools.length + ' tools ready \u2014 ' + gamesStatus;
    }

    if (talentEl) {
      if (_twsProject && _twsProject.title) {
        var stage = _twsProject.masteryStage || 1;
        var stageLabels = ['', 'Discovery', 'Practice', 'Competence', 'Automaticity'];
        var sessions = _twsProject.sessionCount || 0;
        talentEl.textContent = _twsProject.title + ' \u2014 Stage ' + stage + ': ' + (stageLabels[stage] || '') + (sessions > 0 ? ' \u00b7 ' + sessions + ' sessions' : '');
      } else if (_projectData && _projectData.name) {
        talentEl.textContent = _projectData.name + ' \u2014 in progress';
      } else {
        talentEl.textContent = 'No projects yet';
      }
    }
  }

  window.pwsRestoreAll = pwsLoadAll;


  var _handoffHistory=[],_handoffFocusItem=null;
  function pwsOpenHandoff(schedule){
    var inc=(schedule||[]).filter(function(s){return s._checkedIn!=='done'&&!s.isTodo&&s.ownsIt!==false;});
    if(!inc.length){pwsOpenDocB();setTimeout(function(){pwsAppendBubble(_lang==='es'?'Día completo. Mañana empieza limpio.':'Day complete. Tomorrow starts clean.','docb');},300);return;}
    var ov=document.getElementById('pwsHandoffOverlay');if(!ov)return;
    ov.classList.add('open');_handoffHistory=[];_handoffFocusItem=null;
    var list=document.getElementById('pwsHandoffList');
    if(list){list.innerHTML='';inc.forEach(function(it){var r=pwsBuildHandoffRow(it);list.appendChild(r);});}
    var f=document.getElementById('pwsHandoffDocBFeed');if(f)f.innerHTML='';
    var msg=_lang==='es'?inc.length+' elemento'+(inc.length!==1?'s':'')+' necesitan decisión.':inc.length+' item'+(inc.length!==1?'s':'')+' need a decision.';
    setTimeout(function(){pwsHandoffDocBAppend(msg,'docb');_handoffHistory.push({role:'assistant',content:msg});},300);
    document.getElementById('pwsHandoffCloseBtn').onclick=function(){ov.classList.remove('open');};
    document.getElementById('pwsHandoffSendBtn').onclick=function(){pwsHandoffSend();};
    document.getElementById('pwsHandoffDoneBtn').onclick=function(){ov.classList.remove('open');pwsOpenDocB();setTimeout(function(){pwsAppendBubble(_lang==='es'?'Día cerrado. Mañana empieza ahora.':'Day closed. Tomorrow starts now.','docb');},300);};
    var hi=document.getElementById('pwsHandoffDocBInput');if(hi)hi.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();pwsHandoffSend();}};
  }
  function pwsBuildHandoffRow(it){
    var r=document.createElement('div');r.style.cssText='background:rgba(240,230,204,0.03);border:1px solid rgba(240,230,204,0.08);border-radius:6px;padding:12px 14px;';
    r.innerHTML='<b style=\"display:block;font-family:Cormorant Garamond,serif;font-size:22px;color:#f0e6cc;margin-bottom:6px;font-weight:400;\">'+escHtml(it.label||it.activity||'')+'</b>'+(it.time?'<small style=\"display:block;font-family:Cinzel,serif;font-size:11px;color:rgba(200,168,75,0.5);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;\">'+fmtTime(it.time)+'</small>':'')+'<div style=\"display:flex;gap:6px;flex-wrap:wrap;\"><button data-dec=\"carry\" class=\"pws-checkin-btn done\">Carry</button><button data-dec=\"done\" class=\"pws-checkin-btn done\">Done</button><button data-dec=\"drop\" class=\"pws-checkin-btn missed\">Drop</button><button data-dec=\"ask\" class=\"pws-modify-btn\">Ask Doc B</button></div>';
    r.addEventListener('click',function(ev){var btn=ev.target.closest?ev.target.closest('[data-dec]'):(ev.target.getAttribute&&ev.target.getAttribute('data-dec')?ev.target:null);if(!btn)return;var dec=btn.getAttribute('data-dec');if(dec==='carry'){it._handoffDecision='carry';r.style.opacity='0.45';pwsHandoffDocBAppend(_lang==='es'?'→ Llevar':'→ Carried.','docb');}else if(dec==='done'){it._checkedIn='done';it._handoffDecision='done';r.style.opacity='0.35';pwsSaveDaySchedule();pwsHandoffDocBAppend(_lang==='es'?'✓ Hecho':'✓ Logged.','docb');}else if(dec==='drop'){it._handoffDecision='drop';r.style.opacity='0.3';pwsHandoffDocBAppend(_lang==='es'?'Soltado.':'Dropped.','docb');}else if(dec==='ask'){_handoffFocusItem=it;var i2=document.getElementById('pwsHandoffDocBInput');if(i2){i2.placeholder=(_lang==='es'?'Sobre: ':'About: ')+(it.label||'');i2.focus();}}});
    pwsApplyLang();return r;
  }
  function pwsHandoffDocBAppend(text,role){var f=document.getElementById('pwsHandoffDocBFeed');if(!f)return;var b=document.createElement('div');b.className='pws-docb-bubble '+role;b.textContent=text;f.appendChild(b);f.scrollTop=f.scrollHeight;}
  function pwsHandoffSend(){
    var inp=document.getElementById('pwsHandoffDocBInput'),text=inp?inp.value.trim():'';if(!text)return;if(inp)inp.value='';
    pwsHandoffDocBAppend(text,'member');_handoffHistory.push({role:'user',content:text});
    var fc=_handoffFocusItem?'Item: "'+(_handoffFocusItem.label||'')+'" . ':'';
    var sys='Doc B end-of-day handoff. '+fc+'Brief. Respond in '+(_lang==='es'?'Spanish':'English')+'.';
    var tid='ho-'+Date.now(),tp=document.createElement('div');tp.className='pws-docb-bubble docb';tp.id=tid;tp.textContent='…';
    var f=document.getElementById('pwsHandoffDocBFeed');if(f){f.appendChild(tp);f.scrollTop=f.scrollHeight;}
    post({action:'cftConvTurn',sessionId:_session,requestingMemberId:_memberId,projectId:'',systemPrompt:sys,conversationHistory:_handoffHistory.slice(-10)}).then(function(d){var r=(d&&d.reply)?d.reply:'';var t=document.getElementById(tid);if(t)t.parentNode.removeChild(t);if(!r){pwsHandoffDocBAppend(_lang==='es'?'Intenta de nuevo.':'Try again.','docb');return;}_handoffHistory.push({role:'assistant',content:r});pwsHandoffDocBAppend(r,'docb');}).catch(function(){var t=document.getElementById(tid);if(t)t.parentNode.removeChild(t);});
  }

  // v103: pwsToggleReminderPanel DELETED. It was prompt() + Notification +
  // setTimeout -- a timer that died on tab close while telling a member it
  // would remember for them. Replaced by pwsToggleAlarmsMenu (server-side
  // Reminders sheet + heartbeat + Twilio). Never reintroduce a client-side
  // timer as a reminder: if the promise outlives the tab, so must the timer.




  function pwsOpenMasteryCheckIn(projectId, stage) {
    _masteryCheckHistory = [];
    var proj = _twsProject || {};
    var projTitle = proj.title || 'your project';
    var sessionNum = (proj.sessionCount || 0) + 1;
    var feed = document.getElementById('pwsMasteryFeed');
    if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsMasteryOverlay');
    if (ov) ov.classList.add('open');
    var stageLabel = ['', 'Discovery', 'Practice', 'Competence', 'Automaticity'][stage] || 'Practice';
    var openEN = 'Session ' + sessionNum + ' of "' + projTitle + '" \u2014 Stage ' + stage + ': ' + stageLabel + '.\n\nHow did it go? What did you notice?';
    var openES = 'Sesi\u00f3n ' + sessionNum + ' de "' + projTitle + '" \u2014 Etapa ' + stage + ': ' + stageLabel + '.\n\n\u00bfC\u00f3mo te fue? \u00bfQu\u00e9 notaste?';
    var openMsg = _lang === 'es' ? openES : openEN;
    pwsMasteryAppendBubble(openMsg, 'docb');
    _masteryCheckHistory.push({ role: 'assistant', content: openMsg });
    var closeBtn = document.getElementById('pwsMasteryCloseBtn');
    if (closeBtn) {
      var cClone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(cClone, closeBtn);
      cClone.addEventListener('click', function() {
        var mo = document.getElementById('pwsMasteryOverlay');
        if (mo) mo.classList.remove('open');
      });
    }
    var sendBtn = document.getElementById('pwsMasterySendBtn');
    if (sendBtn) {
      var sClone = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(sClone, sendBtn);
      sClone.addEventListener('click', function() { pwsSendMasteryCheckIn(stage); });
    }
    var inp = document.getElementById('pwsMasteryInput');
    if (inp) {
      inp.value = '';
      var iClone = inp.cloneNode(true);
      inp.parentNode.replaceChild(iClone, inp);
      iClone.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendMasteryCheckIn(stage); }
      });
      setTimeout(function() { iClone.focus(); }, 80);
    }
    var micBtn = document.getElementById('pwsMasteryMic');
    if (micBtn) {
      var mClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(mClone, micBtn);
      mClone.addEventListener('click', function() { pwsToggleMasteryMic(); });
    }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', pwsInit); } else { pwsInit(); }

})();
