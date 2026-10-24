/* ═══ house-arrows-v1_5.js PICK WHAT YOU LEARN (Bench 57, Fri 10/23/26 night; way back: house-arrows-v1_4.js in the pointer). Founder: 'this is a learning tool. How could I not pick what I want to learn?' -- SHOW ME on a page with more than one walk now drops a short list under it, each walk by a plain name (PWS: THE WHOLE TOUR · THE FOUR PILLS · MY FAVORITE DAY; /todos: SMART DAY AND GRANDPA; Family: THE FAMILY ROOM; Studio: COACH B), a check beside the ones already walked; Favorite Day's walk gains a card on the activity's name (tap it: the accessories open -- note, links, tools Butler gave it -- change them, tap again and they fold away); one tap and that walk starts, no loop around the house to get another chance. THE WHOLE TOUR runs the page's walks back to back. A page with one walk still starts it on the first tap. Also: Favorite Day's three later cards open the card first if it is folded (the founder saw the last card at the top with no arrow while GO TO MY PROJECT sat under a closed Favorite Day). v: 1.5. Carries v1.4:
 * house-arrows-v1_4.js NOTHING IN SILENCE (Bench 57, Fri 10/23/26 evening; way back: house-arrows-v1_2.js in the pointer -- v1.3 was never seen working past /todos). Founder, home from the Smart Day walk: no card on Favorite Day, and SHOW ME started day one over. The walk had been able to finish without ever showing a card (every target missed = finished), so a stale 'finished' could sit on Favorite Day's walk and nothing would ever come. Now: a walk counts as finished only after a card was shown (a shown-mark is kept beside the finished-mark, and a finished-mark with no shown-mark is cleared once, so Favorite Day's walk comes back); a target that cannot be found no longer makes the walk skip in silence -- the card appears at the top of the page, arrowless, with its words and its step number, so what failed is on the screen; SHOW ME, meeting a running walk whose card is off the screen, brings the card into view instead of putting the walk away (a second tap with the card in view puts it away); the first card is placed again as the page settles (1.5s and 3s) and the page is scrolled to it once more. v: 1.4. Carries v1.3:
 * house-arrows-v1_3.js THE WALK THAT REMEMBERS (Bench 57, Fri 10/23/26 afternoon; way back: house-arrows-v1_2.js -- change house-arrows.txt back to that name). Founder walked PWS then /todos and found two seams, both in this file. One: a walk only wrote 'finished' when GOT IT was pressed, so tapping the last target where the arrow pointed (PLAN MY DAY, which leaves for /todos) left PWS believing day one never happened; on the way home it started over, and SHOW ME, meeting a running walk, only put it away ('it just starts at the beginning... show me doesn't do anything'). Now a walk is finished the moment its last card is on the screen, and a tap on a last target writes it before the page can leave. Two: the Smart Day room walk showed DONE -- SAVE and then SLEEP, but DONE closes the room and SLEEP lives inside it, so the card sat outside the closed room until the wait gave up and jumped upstairs ('it closed... and then jumped'). Now SLEEP is shown first, held (a tap only moves on -- the first activity should not be put to sleep during the tour), then DONE -- SAVE, which closes the room and the walk goes upstairs as it should. Also: a target that is gone from the page is given 5 seconds, not 12, before the walk moves on; and the /todos walk ends by pointing at the PWS buckle on the scroll: home, where Favorite Day's walk is waiting. v: 1.3. Everything else as v1.2:
 * house-arrows-v1_2.js THE THIRD WALK (Bench 57, Fri 10/23/26 2:20 PM; the lessons file, named by its cut from now on; loaded by house-arrows-loader.js through the pointer house-arrows.txt; way back: write house-arrows-v1.js in the pointer). Contents = v1.2 of house-arrows-v1.js:
 * first thing to tap, the first time a room opens for a member -- the founder's ruling of 10/22 ('each of these pages, we're
 * gonna have to have them open and put an arrow at the first thing, and out comes a written explanation of what that is and
 * how to start there'). One file, one line per page; the lessons live here, keyed by the page's address, so the pages need
 * nothing but the line. Each lesson runs once per device (localStorage) and can be replayed any time from the SHOW ME chip
 * (help is never hidden). A step moves on when its target is tapped, or on NEXT. The line is spoken (every chat talks; the
 * mute is shared with Charles: 4laws-charles-mute). The same file wires the EARNING of doors for the scroll (house-scroll):
 * the first word to Coach B earns STUDIO; the first DONE -- SAVE in an activity room earns LIFE and FUN; saves on three
 * different days earn FAMILY. Lessons: /pws THE BUTTONS LESSON + the day-one arrows; /todos day two; /studio the coach.
 * ═══ */
(function () {
  'use strict';
  if (window.HouseArrows && window.HouseArrows.v >= 1.2) return;

  function lang() { try { return localStorage.getItem('4laws-lang') === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; } }
  function here() { return ((location.pathname || '/').replace(/\/+$/, '') || '/').toLowerCase(); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function $(sel) { try { return document.querySelector(sel); } catch (e) { return null; } }
  function visible(el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; }

  /* ── the lessons ───────────────────────────────────────────────────────────────────────────────────────────────── */
  var LESSONS = {
    'pws-day-one': {
      name: { en: 'The four pills', es: 'Las cuatro píldoras' },
      page: function (p) { return p === '/pws' || p.indexOf('/pws-talent') === 0; },
      ready: function () { return visible($('#pwsAccordionLimitsHdr')) || visible($('#pwsTodoFab')); },
      intro: { en: 'Before you begin: four things that follow you everywhere, then your day.', es: 'Antes de empezar: cuatro cosas que te siguen a todas partes, y luego tu día.' },
      steps: [
        { sel: '#pwsTodoFab',       en: 'TODOS. When a problem lands — a bill, a form, a letter — press here. Bruno is there.', es: 'TODOS. Cuando cae un problema — una cuenta, un formulario, una carta — presiona aquí. Bruno está ahí.', look: true, hold: true },
        { sel: '#pwsTrustFab',      en: 'TRUST. When a relationship strains, press here. We repair it together.', es: 'CONFIANZA. Cuando una relación se tensa, presiona aquí. La reparamos juntos.', look: true, hold: true },
        { sel: '#beltEmblem',       en: 'Your belt. Your tools ride here, wherever you are in the house.', es: 'Tu cinturón. Tus herramientas viajan aquí, donde estés en la casa.', look: true, hold: true },
        { sel: '#drFab',            en: 'Reminders. The house taps you on the shoulder, by text, at the hour you set.', es: 'Recordatorios. La casa te toca el hombro, por texto, a la hora que fijes.', look: true, hold: true },
        { sel: '#pwsAccordionRespectHdr', en: 'Your contributions — what you told me you give. Open it and read them once.', es: 'Tus contribuciones — lo que me dijiste que das. Ábrelo y léelas una vez.' },
        { sel: '#pwsAccordionLimitsHdr',  en: 'Your Favorite Day. This is where you live now. Open it.', es: 'Tu Día Favorito. Aquí vives ahora. Ábrelo.' },
        { sel: 'a.pws-plan-day-btn[href="/todos"]', via: '#pwsAccordionLimitsHdr', en: 'PLAN MY DAY. Tap it, and tomorrow is waiting for you on the other side.', es: 'PLANEAR MI DÍA. Tócalo, y mañana te espera del otro lado.', last: true }
      ]
    },
    'pws-day-three': {
      name: { en: 'My Favorite Day', es: 'Mi Día Favorito' },
      page: function (p) { return p === '/pws' || p.indexOf('/pws-talent') === 0; },
      after: 'todos-day-two',
      ready: function () { return visible($('#pwsAccordionLimitsHdr')); },
      steps: [
        { sel: '#pwsAccordionLimitsHdr',          en: 'Back home. Your Favorite Day now carries the day you planned. Open it.', es: 'De vuelta en casa. Tu Día Favorito ya lleva el día que planeaste. Ábrelo.' },
        { sel: '#pwsDayCol .pws-checkin-btn.done', via: '#pwsAccordionLimitsHdr', en: 'Each activity, in its hour. DONE when it is done, MISSED when you missed it. This is the game: a day that keeps you safe, in your lane, and becomes a habit.', es: 'Cada actividad, a su hora. HECHO cuando está hecha, FALTÉ cuando la faltaste. Este es el juego: un día que te cuida, te mantiene en tu carril, y se vuelve hábito.', look: true },
        { sel: '#pwsDayCol .pws-plan-seq-label',   via: '#pwsAccordionLimitsHdr', en: 'Tap an activity\u2019s name and it opens: the note, the links, the tools Butler gave it. Change what you like. Tap the name again and it folds away \u2014 a clean day, especially on a phone.', es: 'Toca el nombre de una actividad y se abre: la nota, los enlaces, las herramientas que le dio el Mayordomo. Cambia lo que quieras. Toca el nombre otra vez y se pliega \u2014 un d\u00eda limpio, sobre todo en el tel\u00e9fono.', look: true },
        { sel: '.pws-board-plate',                 via: '#pwsAccordionLimitsHdr', en: 'ADD A TREAT. Set something you look forward to into the day — a coffee, a walk, a song — and that activity counts double.', es: 'AÑADIR UN DELEITE. Pon en el día algo que esperas con ganas — un café, una caminata, una canción — y esa actividad cuenta doble.', look: true },
        { sel: '.pws-day-launch-btn',              via: '#pwsAccordionLimitsHdr', en: 'TALENT TIME is an activity everyone has. Do your talent work anywhere and mark it done. GO TO MY PROJECT takes you to your coach, when it is time to make something of it.', es: 'TIEMPO DE TALENTO es una actividad que todos tienen. Haz tu trabajo de talento donde sea y márcalo hecho. IR A MI PROYECTO te lleva a tu coach, cuando toque hacer algo con ello.', look: true, last: true }
      ]
    },
    'todos-day-two': {
      name: { en: 'Smart Day and Grandpa', es: 'Día Inteligente y el Abuelo' },
      page: function (p) { return p === '/todos'; },
      ready: function () { return !!$('#tdDayCards .td-case-header'); },
      steps: [
        { sel: '#tdDayHdr',                       en: 'Your Smart Day. Every activity you planned is here.', es: 'Tu Día Inteligente. Cada actividad que planeaste está aquí.', look: true },
        { sel: '#tdDayCards .td-case-header',     en: 'Tap your first activity. Every activity is a room with a butler in it.', es: 'Toca tu primera actividad. Cada actividad es un cuarto con un mayordomo adentro.' },
        { sel: '#pwsUseInput',                    via: '#tdDayCards .td-case-header', en: 'Tell him what this activity needs today. One line is enough.', es: 'Dile qué necesita esta actividad hoy. Con una línea basta.', look: true },
        { sel: '.td-room-doors button:nth-child(2)', en: 'SLEEP puts an activity to rest for today. It waits under the list, and WAKE brings it back.', es: 'DORMIR deja descansar una actividad por hoy. Espera bajo la lista, y DESPERTAR la trae de vuelta.', look: true, hold: true },
        { sel: '#pwsUseMarkDoneBtn',              en: 'When it is done: DONE — SAVE. Your tools come alive here, one activity at a time. Tap it, and the room closes behind you.', es: 'Cuando esté hecho: LISTO — GUARDAR. Tus herramientas cobran vida aquí, una actividad a la vez. Tócalo, y el cuarto se cierra tras de ti.', look: true },
        { sel: '#tdTodosHdr',                     en: 'Upstairs: MY TODOS. When a problem lands — a bill, a form, a letter — it comes here. Open it.', es: 'Arriba: MIS TODOS. Cuando cae un problema — una cuenta, un formulario, una carta — llega aquí. Ábrelo.', before: function () { try { var o = document.getElementById('pwsUseOverlay'); if (o && o.classList.contains('open') && window.pwsCloseUse) window.pwsCloseUse(); } catch (e) {} } },
        { sel: '#tdGrandpa #pwsUseInput',          via: '#tdTodosHdr', en: 'Grandpa. Tell him the problem, or drop the paper in his bucket — a photo is enough. He takes it from there.', es: 'El Abuelo. Cuéntale el problema, o suelta el papel en su balde — con una foto basta. Él se encarga.', look: true },
        { sel: '#tdPileBar',                      en: 'THE PILE. A stack of letters? Drop them all on him at once. He sorts them into todos and a plan in thirty seconds.', es: 'LA PILA. ¿Un montón de cartas? Suéltalas todas de una vez. Él las ordena en todos y un plan en treinta segundos.', look: true },
        { sel: '#tdList .td-case-header',          en: 'Every todo Grandpa makes is a room too: the same butler, the same tools, adapted to that problem. They sort themselves into projects, and the finished ones keep their records.', es: 'Cada todo que hace el Abuelo también es un cuarto: el mismo mayordomo, las mismas herramientas, adaptadas a ese problema. Se ordenan solos en proyectos, y los terminados guardan sus registros.', look: true },
        { sel: '#hsScroll a.hs-home',              en: 'Now home. Tap PWS on the scroll: your Favorite Day is waiting there with the day you planned.', es: 'Ahora a casa. Toca PWS en el pergamino: tu Día Favorito te espera ahí con el día que planeaste.', last: true }
      ]
    },
    'family-first-look': {
      name: { en: 'The family room', es: 'El cuarto de la familia' },
      page: function (p) { return p.indexOf('/family-atelier') === 0; },
      ready: function () { return visible($('#faInviteOpenBtn')) || visible($('#faDocBOpenBtn')); },
      steps: [
        { sel: '#faInviteOpenBtn',  en: 'Your family comes in here. INVITE sends one person a text with your words and a door of their own.', es: 'Tu familia entra por aquí. INVITAR le manda a una persona un texto con tus palabras y una puerta propia.', look: true, hold: true },
        { sel: '#faMemberList',     en: 'Your people, as they arrive. Each one keeps their own day and their own rooms; this is where you see them.', es: 'Tu gente, conforme llega. Cada quien guarda su propio día y sus propios cuartos; aquí es donde los ves.', look: true },
        { sel: '#faDocBOpenBtn',    en: 'DOC B for the family: a question about someone you love, answered without walking into their rooms.', es: 'DOC B para la familia: una pregunta sobre alguien que amas, respondida sin entrar en sus cuartos.', look: true, hold: true, last: true }
      ]
    },
    'studio-the-coach': {
      name: { en: 'Coach B', es: 'Coach B' },
      page: function (p) { return p === '/studio'; },
      ready: function () { return visible($('#stCoachInput')) || visible($('#stCoachBtn')); },
      steps: [
        { sel: '#stCoachInput',          via: '#stCoachBtn', en: 'Tell Coach B what you want to make. He asks a little, then he writes.', es: 'Dile a Coach B qué quieres hacer. Él pregunta un poco, y luego escribe.', look: true },
        { sel: '#stScrLine button',      en: 'Give it a home: pick a project, or make a new one.', es: 'Dale un hogar: elige un proyecto, o haz uno nuevo.', last: true }
      ]
    }
  };

  /* ── dress ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  var CSS = '' +
    '#haArrow{position:absolute;z-index:99990;width:0;height:0;pointer-events:none;filter:drop-shadow(0 0 10px rgba(255,214,120,0.8));animation:haBob 1.1s ease-in-out infinite;}' +
    '#haArrow.down{border-left:18px solid transparent;border-right:18px solid transparent;border-top:28px solid #ffd978;}' +
    '#haArrow.up{border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:28px solid #ffd978;}' +
    '#haArrow:after{content:"";position:absolute;left:-5px;width:10px;height:26px;background:#ffd978;}' +
    '#haArrow.down:after{top:-54px;}#haArrow.up:after{top:28px;}' +
    '@keyframes haBob{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}' +
    '#haCard{position:absolute;z-index:99991;max-width:min(92vw,560px);background:linear-gradient(180deg,#6b0d14,#3e070c);border:1px solid rgba(226,194,112,0.85);border-radius:8px;box-shadow:0 12px 36px rgba(0,0,0,0.65),inset 0 1px 0 rgba(255,236,180,0.2);padding:16px 18px 12px;color:#fff3d6;font-family:"Cormorant Garamond",Georgia,serif;font-size:23px;line-height:1.35;}' +
    '#haCard .ha-words{margin:0 0 10px;}' +
    '#haCard .ha-row{display:flex;align-items:center;justify-content:space-between;gap:10px;}' +
    '#haCard .ha-n{font-family:Cinzel,serif;font-size:12px;letter-spacing:0.2em;color:rgba(240,214,150,0.75);}' +
    '#haCard button{font-family:Cinzel,serif;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;border-radius:5px;padding:8px 14px;cursor:pointer;}' +
    '#haCard .ha-next{background:linear-gradient(180deg,#e2c270,#a9842f);color:#2a1a05;border:1px solid #f0d890;}' +
    '#haCard .ha-later{background:transparent;color:rgba(240,214,150,0.8);border:1px solid rgba(226,194,112,0.45);}' +
    '#haCard .ha-mute{background:transparent;color:rgba(240,214,150,0.9);border:1px solid rgba(226,194,112,0.45);padding:6px 9px;font-size:15px;}' +
    '.ha-lit{outline:3px solid #ffd978 !important;outline-offset:3px;box-shadow:0 0 0 6px rgba(255,217,120,0.25),0 0 28px rgba(255,214,120,0.7) !important;border-radius:8px;}' +
    '#haChip{position:fixed;right:10px;z-index:99980;font-family:Cinzel,serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#ffe9a8;background:linear-gradient(180deg,#7a0f16,#3d060b);border:1px solid rgba(226,194,112,0.8);border-radius:999px;padding:8px 14px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,0.5);}' +
    '#haMenu{position:fixed;right:10px;z-index:99981;display:none;flex-direction:column;gap:6px;background:linear-gradient(180deg,#3d060b,#24040a);border:1px solid rgba(226,194,112,0.8);border-radius:14px;padding:10px;box-shadow:0 10px 28px rgba(0,0,0,0.6);}' +
    '#haMenu button{font-family:Cinzel,serif;font-size:14px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ffe9a8;background:rgba(255,233,168,0.06);border:1px solid rgba(226,194,112,0.45);border-radius:10px;padding:10px 14px;cursor:pointer;text-align:left;white-space:nowrap;}' +
    '#haMenu button:hover{background:rgba(255,233,168,0.14);}#haMenu button .ha-done{opacity:0.7;margin-left:8px;}' +
    '@media (max-width:700px){#haCard{font-size:20px;padding:14px 14px 10px;}#haChip{font-size:11px;padding:7px 11px;}#haMenu button{font-size:13px;}}';

  var arrow, card, chip, lit = null, running = null;
  function dress() {
    if (document.getElementById('haCss')) return;
    var st = document.createElement('style'); st.id = 'haCss'; st.textContent = CSS; document.head.appendChild(st);
  }

  /* ── voice ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  function muted() { return ls('4laws-charles-mute') === '1'; }
  function speak(text) {
    try {
      if (muted() || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text); var L = lang();
      u.lang = (L === 'es') ? 'es-US' : 'en-GB'; u.rate = 0.92; u.pitch = 0.95;
      var v = null; try { if (window.CharlesVoice && window.CharlesVoice.pick) v = window.CharlesVoice.pick(L); } catch (e1) {}
      if (!v) { var vs = window.speechSynthesis.getVoices() || []; for (var i = 0; i < vs.length; i++) { if ((vs[i].lang || '').toLowerCase().indexOf(L === 'es' ? 'es' : 'en') === 0) { v = vs[i]; break; } } }
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ── placing the arrow and the card ────────────────────────────────────────────────────────────────────────────── */
  function unlight() { if (lit) { lit.classList.remove('ha-lit'); lit = null; } }
  function place(target) {
    if (!arrow || !card || !target) return;
    var r = target.getBoundingClientRect(); var sx = window.pageXOffset, sy = window.pageYOffset;
    var cx = r.left + r.width / 2 + sx;
    var above = r.top >= 170;                               /* room above the target for the arrow + card */
    arrow.className = above ? 'down' : 'up';
    arrow.style.left = (cx - 18) + 'px';
    arrow.style.top = above ? (r.top + sy - 34) + 'px' : (r.bottom + sy + 8) + 'px';
    card.style.visibility = 'hidden'; card.style.display = 'block';
    var cw = card.offsetWidth, ch = card.offsetHeight;
    var left = Math.max(8 + sx, Math.min(cx - cw / 2, sx + window.innerWidth - cw - 8));
    card.style.left = left + 'px';
    card.style.top = above ? (r.top + sy - 34 - 58 - ch) + 'px' : (r.bottom + sy + 8 + 58) + 'px';
    card.style.visibility = 'visible';
  }
  function isFixed(el) { try { while (el && el !== document.body) { if (getComputedStyle(el).position === 'fixed') return true; el = el.parentElement; } } catch (e) {} return false; }
  function scrollTo(target) {
    if (isFixed(target)) { try { target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e0) {} return; }   /* inside a room that scrolls on its own: bring it into the room's view */
    try { var r = target.getBoundingClientRect(); var y = r.top + window.pageYOffset - Math.max(120, window.innerHeight * 0.38); window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' }); } catch (e) {}
  }

  /* ── running a lesson ──────────────────────────────────────────────────────────────────────────────────────────── */
  function build() {
    dress();
    if (!arrow) { arrow = document.createElement('div'); arrow.id = 'haArrow'; document.body.appendChild(arrow); }
    if (!card) { card = document.createElement('div'); card.id = 'haCard'; document.body.appendChild(card); }
  }
  var stopRun = null;   /* the running walk's own ending, so putting it away also unhooks its listeners */
  function hideAll() { if (stopRun) { var f = stopRun; stopRun = null; f(); return; } if (arrow) arrow.style.display = 'none'; if (card) card.style.display = 'none'; unlight(); running = null; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
  function waitFor(fn, ms, cb) { var t0 = Date.now(); (function tick() { var ok = false; try { ok = !!fn(); } catch (e) {} if (ok) return cb(true); if (Date.now() - t0 > ms) return cb(false); setTimeout(tick, 350); })(); }

  function run(key, force, then) {
    var L = LESSONS[key]; if (!L) { if (then) then(); return; }
    if (!force && ls('4laws-lesson-' + key) === '1') { if (then) then(); return; }
    if (running) return;
    running = key; build();
    var Lg = lang(); var i = -1; var onClick = null, onKey = null;
    function done(finished) {
      stopRun = null;
      document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', onMove); window.removeEventListener('resize', onMove);
      if (finished && shown) ls('4laws-lesson-' + key, '1');
      curTarget = null; hideAll();
      if (finished && then) setTimeout(then, 400);
    }
    var curTarget = null, shown = false;
    stopRun = function () { done(false); };
    function onMove() { if (curTarget) place(curTarget); }
    function show(n) {
      i = n; var st = L.steps[i]; if (!st) return done(true);
      try { if (st.before) st.before(); } catch (eB) {}
      if (st.via && !visible($(st.sel))) { var v = $(st.via); if (v && visible(v)) { try { v.click(); } catch (eV) {} } }   /* open the way first (a folded card, a closed room) */
      waitFor(function () { return visible($(st.sel)); }, st.via ? 4000 : 5000, function (ok) {
        var t = ok ? $(st.sel) : null; curTarget = t; unlight(); if (t) { t.classList.add('ha-lit'); lit = t; }
        shown = true; ls('4laws-shown-' + key, '1');
        if (st.last) ls('4laws-lesson-' + key, '1');   /* the last card on the screen is the walk finished -- GOT IT, LATER, or a tap that leaves the page all count */
        if (t) scrollTo(t);
        card.innerHTML = '<div class="ha-words"></div><div class="ha-row"><span class="ha-n"></span><span style="display:flex;gap:8px;"><button type="button" class="ha-mute" title="' + (Lg === 'es' ? 'Voz' : 'Voice') + '">' + (muted() ? '🔇' : '🔊') + '</button><button type="button" class="ha-later">' + (Lg === 'es' ? 'Luego' : 'Later') + '</button><button type="button" class="ha-next">' + (st.last ? (Lg === 'es' ? 'Entendido' : 'Got it') : (Lg === 'es' ? 'Siguiente →' : 'Next →')) + '</button></span></div>';
        card.querySelector('.ha-words').textContent = st[Lg] || st.en;
        card.querySelector('.ha-n').textContent = (i + 1) + ' / ' + L.steps.length;
        card.querySelector('.ha-next').addEventListener('click', function () { if (st.last) done(true); else show(i + 1); });
        card.querySelector('.ha-later').addEventListener('click', function () { done(false); });
        card.querySelector('.ha-mute').addEventListener('click', function (ev) { ls('4laws-charles-mute', muted() ? '0' : '1'); ev.target.textContent = muted() ? '🔇' : '🔊'; if (muted()) { try { window.speechSynthesis.cancel(); } catch (e) {} } else speak(st[Lg] || st.en); });
        if (t) { arrow.style.display = 'block'; setTimeout(function () { place(t); }, 420); place(t); if (i === 0) { setTimeout(function () { if (running === key && curTarget === t) { scrollTo(t); place(t); } }, 1500); setTimeout(function () { if (running === key && curTarget === t) place(t); }, 3000); } }
        else { arrow.style.display = 'none'; card.style.display = 'block'; card.style.visibility = 'visible'; card.style.left = Math.max(8, (window.innerWidth - card.offsetWidth) / 2) + 'px'; try { window.scrollTo(0, 0); } catch (e0) {} card.style.top = '90px'; }   /* a target that cannot be found: the card still comes, at the top, so nothing fails in silence */
        speak(st[Lg] || st.en);
      });
    }
    onClick = function (ev) {
      var st = L.steps[i]; if (!st) return; var t = $(st.sel); if (!t || !t.contains(ev.target)) return;
      if (st.hold) {   /* shown, not opened: a tap on a pill during the walk only moves the walk on (it would carry you off the page) */
        ev.preventDefault(); ev.stopPropagation(); if (st.last) done(true); else show(i + 1); return;
      }
      if (st.last) ls('4laws-lesson-' + key, '1');
      setTimeout(function () { if (st.last) done(true); else show(i + 1); }, 250);   /* any other target: the tap does its real work, and the walk moves on */
    };
    onKey = function (ev) { var st = L.steps[i]; if (!st || ev.key !== 'Enter') return; var t = $(st.sel); if (t && t === ev.target && !st.look) setTimeout(function () { if (st.last) done(true); else show(i + 1); }, 250); };
    document.addEventListener('click', onClick, true); document.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', onMove); window.addEventListener('resize', onMove);
    if (L.intro && !force) { speak(L.intro[Lg] || L.intro.en); }
    show(0);
  }

  /* ── the SHOW ME chip: help is never hidden ────────────────────────────────────────────────────────────────────── */
  function pageLessons() { var p = here(); var out = []; for (var k in LESSONS) { if (LESSONS[k].page(p)) out.push(k); } return out; }
  function chipPlace() { if (!chip) return; var s = document.getElementById('hsScroll'); var top = 12; if (s) { var r = s.getBoundingClientRect(); if (r.bottom > 0 && r.bottom < window.innerHeight) top = r.bottom + 10; } chip.style.top = top + 'px'; }
  var menu = null;
  function menuHide() { if (menu) menu.style.display = 'none'; }
  function menuPlace() { if (!menu || !chip) return; var r = chip.getBoundingClientRect(); menu.style.top = (r.bottom + 8) + 'px'; menu.style.right = Math.max(10, window.innerWidth - r.right) + 'px'; }
  function menuShow(ks) {
    var Lg = lang();
    if (!menu) { menu = document.createElement('div'); menu.id = 'haMenu'; document.body.appendChild(menu);
      document.addEventListener('click', function (ev) { if (menu.style.display === 'flex' && !menu.contains(ev.target) && ev.target !== chip) menuHide(); }, true);
      window.addEventListener('scroll', menuPlace); window.addEventListener('resize', menuPlace); }
    menu.innerHTML = '';
    function row(label, done, fn) { var b = document.createElement('button'); b.type = 'button'; b.innerHTML = label + (done ? '<span class="ha-done">\u2713</span>' : ''); b.addEventListener('click', function (ev) { ev.stopPropagation(); menuHide(); fn(); }); menu.appendChild(b); }
    row(Lg === 'es' ? 'Todo el recorrido' : 'The whole tour', false, function () { (function go(j) { if (j >= ks.length) return; run(ks[j], true, function () { go(j + 1); }); })(0); });
    for (var j = 0; j < ks.length; j++) { (function (k) { var L = LESSONS[k]; var nm = (L.name && (L.name[Lg] || L.name.en)) || k; row(nm, ls('4laws-lesson-' + k) === '1', function () { run(k, true); }); })(ks[j]); }
    menu.style.display = 'flex'; menuPlace();
  }
  function makeChip() {
    if (chip || !pageLessons().length) return;
    dress(); chip = document.createElement('button'); chip.id = 'haChip'; chip.type = 'button';
    chip.textContent = (lang() === 'es' ? 'MUÉSTRAME ✦' : 'SHOW ME ✦');
    chip.addEventListener('click', function () {
      if (menu && menu.style.display === 'flex') { menuHide(); return; }
      if (running) { var r = card ? card.getBoundingClientRect() : null; if (r && card.style.display === 'block' && (r.bottom < 0 || r.top > window.innerHeight)) { try { window.scrollTo({ top: Math.max(0, r.top + window.pageYOffset - 120), behavior: 'smooth' }); } catch (e0) {} return; } hideAll(); return; }
      var ks = pageLessons();
      if (ks.length === 1) { run(ks[0], true); return; }
      menuShow(ks);   /* more than one walk on this page: pick what you learn */
    });
    document.body.appendChild(chip); chipPlace();
    window.addEventListener('scroll', chipPlace); window.addEventListener('resize', chipPlace); setTimeout(chipPlace, 800); setTimeout(chipPlace, 3000);
  }

  /* ── earning doors (the scroll lights them) ────────────────────────────────────────────────────────────────────── */
  function earn(k) { try { if (window.HouseScroll && window.HouseScroll.earn) { var d = window.HouseScroll.doors(); if (d && d.indexOf(k) >= 0) return; window.HouseScroll.earn(k); } } catch (e) {} }
  function wireEarning() {
    var p = here();
    if (p === '/studio') {
      document.addEventListener('click', function (ev) { var b = $('#stCoachSend'); if (b && b.contains(ev.target)) { var inp = $('#stCoachInput'); if (inp && String(inp.value || '').trim()) earn('studio'); } }, true);
      document.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && !ev.shiftKey && ev.target && ev.target.id === 'stCoachInput' && String(ev.target.value || '').trim()) earn('studio'); }, true);
    }
    if (p === '/todos') {
      document.addEventListener('click', function (ev) {
        var b = $('#pwsUseMarkDoneBtn'); if (!b || !b.contains(ev.target)) return;
        earn('life'); earn('fun');
        var day = new Date().toISOString().slice(0, 10); var days = []; try { days = JSON.parse(ls('4laws-day-saves') || '[]'); } catch (e) {}
        if (days.indexOf(day) < 0) { days.push(day); ls('4laws-day-saves', JSON.stringify(days.slice(-14))); }
        if (days.length >= 3) earn('family');
      }, true);
    }
  }

  /* ── start ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
  function unsilence() { for (var k in LESSONS) { if (ls('4laws-lesson-' + k) === '1' && ls('4laws-shown-' + k) !== '1') { try { localStorage.removeItem('4laws-lesson-' + k); } catch (eS) {} } } }   /* finished in silence by an older file: not finished */
  function start() {
    unsilence(); wireEarning(); makeChip();
    var ks = pageLessons(); if (!ks.length) return;
    (function next(j) {
      if (j >= ks.length) return; var k = ks[j]; var L = LESSONS[k];
      if (ls('4laws-lesson-' + k) === '1') return next(j + 1);
      if (L.after && ls('4laws-lesson-' + L.after) !== '1') return next(j + 1);   /* not yet: this walk comes after another one */
      waitFor(L.ready, (k === 'studio-the-coach') ? 90000 : 20000, function (ok) { if (ok) run(k, false); next(j + 1); });
    })(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 900); }); else setTimeout(start, 900);

  window.HouseArrows = { v: 1.5, run: function (k) { run(k, true); }, replay: function () { var ks = pageLessons(); if (ks.length) run(ks[0], true); }, stop: hideAll, lessons: function () { return Object.keys(LESSONS); }, reset: function () { for (var k in LESSONS) { try { localStorage.removeItem('4laws-lesson-' + k); localStorage.removeItem('4laws-shown-' + k); } catch (e) {} } } };
})();
