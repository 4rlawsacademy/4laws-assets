/* ═══ house-arrows-v1_13.js THE ROOM OFFERED (Bench 57, Sat 10/24/26 afternoon; way back: house-arrows-v1_12.js in the pointer). Founder's full walk of the house with v1.12, seven finds: (1) the chat room was never offered -- 'you have to accidentally open a window' -- so the Smart Day walk's room card carries SHOW ME THE ROOM: it runs the chat room walk right there and returns to the same card after (a walk can now branch into another and come back; run() takes a starting step). (2) 'I have to open Smart Day for it to work': the first-activity card opens the folded Smart Day itself, never toggling it shut. (3) TRY IT on a pill leaves the page and there was no RESUME: a walk left by TRY IT is remembered for half an hour and picks up at the same card when the page is opened again. (4) The pen's card sat under the site's top bar: a card is never placed under the top 80px of the screen -- it goes below its target instead. (5) The voice read capitals as letters ('I T', 'A D D'): spoken words are lowercased, PWS excepted. (6) MAKE SOMETHING FROM IT asks for a project first (the page requires it): YOUR SCRIPT is four cards -- title, words, PICK A PROJECT (a new one named anything is fine; READ YOUR SCRIPT brings you back), then MAKE, which carries it to the Production Studio. (7) The Pile card says what the Mill does: the order of battle across everything, not only letters. v: '1.13', cut 13. Carries v1.12:
 * house-arrows-v1_12.js THE SHORT ROAD TO A SCRIPT (Bench 57, Sat 10/24/26 afternoon; way back: house-arrows-v1_11.js in the pointer). Founder at Coach B: 'I have to go through a whole chat and create a project and all that to get a walkthrough. So no, it doesn't work... I don't even know how to turn this thing off.' The walk was built on the long road. The short one is on the page: the pen button (COACH B WRITES IT) is a switch -- tap it, it reads I WRITE IT, and the script room opens at once, empty, for the member; YOUR SCRIPT wakes right there, no dialogue, no project. Coach B's walk is now four cards: the box (with PUT A LINE IN THE BOX), PICK A PROJECT, the X (closes him any time, chat kept), and the pen switch, whose tap opens the room and wakes the next walk. A step may now find its target by a function (find:) when a selector cannot name it (the pen button is found by its pen). The sample button also shows on a card without an arrow. And a card superseded by NEXT before its target appeared can no longer render on top of the current one. v: '1.12', cut 12. Carries v1.11:
 * house-arrows-v1_11.js THE CHAT ROOM (Bench 57, Sat 10/24/26 afternoon; way back: house-arrows-v1_10.js in the pointer). Three things the founder asked for after walking /studio and /todos. (1) THE CHAT ROOM: a walk for the room itself, the first time an activity's room is open on /todos -- the title (the same butler everywhere), the voice button, tools away and back, the X, the text box, the mic, the camera, the bucket, the tools under the chat, DONE -- SAVE; every card held, TRY IT on every card. (2) A LINE IN THE BOX: 'people are just trying. They have no idea what they want to create' -- Coach B's first card carries PUT A LINE IN THE BOX, which drops a sample into the coach's text box to send as is. (3) The activity card no longer asks a question with no answer: 'Butler is here if this activity needs something -- music, a link, a contact, a reminder. Nothing today? DONE -- SAVE and go.' Also: a walk that waits on a moment (a room open, a script written, a show open) is now watched for as long as the page is open, not only in the first twenty seconds -- a script written after a long talk still wakes its walk. v: '1.11', cut 11 (the gate's catch: the twice-loaded guard compared versions as numbers, and 1.11 is smaller than 1.2 -- it now compares a plain count). Carries v1.10:
 * house-arrows-v1_10.js THE WALK THAT WAITS ITS MOMENT (Bench 57, Sat 10/24/26 afternoon; way back: house-arrows-v1_9.js in the pointer). Founder on /studio: 'I can safely conclude that I'm completely baffled what this does' -- YOUR SCRIPT ran from the menu and from THE WHOLE TOUR with no script on the page, three cards pointing at nothing. A walk that waits on a moment (a script written, a show open) now waits for it everywhere: the menu shows it greyed with its when-line, a tap on it says the line and starts nothing, THE WHOLE TOUR passes over it, and a forced run is refused. Coach B's last card says what comes next. v: 1.10. Carries v1.9:
 * house-arrows-v1_9.js TRY IT (Bench 57, Sat 10/24/26 afternoon; way back: house-arrows-v1_8.js in the pointer). Founder: 'if people can try it, you know, as they go through the tour, try it, boom, click, do it, see what it's like, and then resume.' Every card now carries TRY IT: the arrow and the card step aside, the SHOW ME chip becomes RESUME, and the member plays with the thing for as long as they like -- opens it, closes it, taps around -- and nothing advances, nothing is held. RESUME brings the same card back, the arrow found again, right where they were. LATER stays what it is: the walk put away. v: 1.9. Carries v1.8:
 * house-arrows-v1_8.js THE CREATION ROAD (Bench 57, Sat 10/24/26 midday; way back: house-arrows-v1_7.js in the pointer; pairs with production-studio v3.9, which carries the arrows loader line). Founder: 'all of those pages want arrows, baby. The arrows are the teachers' -- the creation side gets its section. /studio: COACH B (as before) and YOUR SCRIPT, which wakes the moment the coach hands over a script (the title, the words, then MAKE SOMETHING FROM IT -- the page leaves for the Production Studio and the arrows pick up there). /production-studio: THE SHOW ON THE TABLE, which wakes when a show is open: the slides, RECORD MY VOICE, record the screen, WATCH, PUT THE PICTURES IN LECTERN, MAKE THE OTHER LANGUAGE, PUBLISH, and last SHOW ME HOW -- the page's own working guide, which the tour hands you to. Tour buttons are held (a tap only moves on; nothing records or leaves by accident). A step marked opt is skipped quietly when its button is not on the page yet (WATCH and the other language appear after a take), so the tour never shows an empty card. v: 1.8. Carries v1.7:
 * house-arrows-v1_7.js THE ARROW THAT FOLLOWS (Bench 57, Sat 10/24/26 morning; way back: house-arrows-v1_6.js in the pointer). Founder walked Favorite Day twice: NEXT works every time, tapping where the arrow points does not -- 'it took me to my footer page', and the Co-Pilot stayed open over the treat card. Both are the page acting a beat after the tap: Favorite Day redraws its rows once it opens, so the DONE button the arrow was on is replaced and the arrow is left on a ghost; and the Co-Pilot opens a moment after the name is tapped, after the walk had already tried to close it. Now: while a card is up, the walk checks twice a second that its target is still on the page -- if it was redrawn, the arrow finds the new one and moves to it; a step's before() may run again a moment later (again: [ms...]), and the treat card closes the Co-Pilot at 0, 700 and 1500 ms. Tap where the arrow points: it works. v: 1.7. Carries v1.6:
 * house-arrows-v1_6.js THE STRAIGHT WALK (Bench 57, Sat 10/24/26 morning; way back: house-arrows-v1_5.js in the pointer). Founder's Friday-night finds on Favorite Day's walk, all in this file: (1) the Limits header is a toggle, and the walk tapped it whenever it could not see its target -- so when Favorite Day was already open (or still unfolding after his own tap) the 'open it' tap closed it, and every arrow after pointed into a folded card ('it derails at 2 of 5', 'jumping around'); now a step says what counts as already open (opened:), and the walk never taps the way in when the way is open. (2) Tapping an activity's name opens Butler's Co-Pilot window for it -- the card said 'it unfolds'; now the words say what happens, and the ADD A TREAT card closes the Co-Pilot first (pwsCloseDocB). (3) GO TO MY PROJECT was found by the first button of its kind on the page, not the one on Talent Time -- every arrow now takes the first VISIBLE match. (4) The last card says the tap leaves for the Studio, where the coach's walk picks up. (5) A walk put away with LATER no longer ambushes on the next visit: it waits for SHOW ME; a walk simply left mid-way still picks up by itself. v: 1.6. Carries v1.5:
 * house-arrows-v1_5.js PICK WHAT YOU LEARN (Bench 57, Fri 10/23/26 night; way back: house-arrows-v1_4.js in the pointer). Founder: 'this is a learning tool. How could I not pick what I want to learn?' -- SHOW ME on a page with more than one walk now drops a short list under it, each walk by a plain name (PWS: THE WHOLE TOUR · THE FOUR PILLS · MY FAVORITE DAY; /todos: SMART DAY AND GRANDPA; Family: THE FAMILY ROOM; Studio: COACH B), a check beside the ones already walked; Favorite Day's walk gains a card on the activity's name (tap it: the accessories open -- note, links, tools Butler gave it -- change them, tap again and they fold away); one tap and that walk starts, no loop around the house to get another chance. THE WHOLE TOUR runs the page's walks back to back. A page with one walk still starts it on the first tap. Also: Favorite Day's three later cards open the card first if it is folded (the founder saw the last card at the top with no arrow while GO TO MY PROJECT sat under a closed Favorite Day). v: 1.5. Carries v1.4:
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
  if (window.HouseArrows && window.HouseArrows.cut >= 13) return;   /* loaded twice: the first copy stands (the cut is a plain count; 1.11 read as a number is smaller than 1.2) */

  function lang() { try { return localStorage.getItem('4laws-lang') === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; } }
  function here() { return ((location.pathname || '/').replace(/\/+$/, '') || '/').toLowerCase(); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function target(st) { if (st.find) { try { return st.find() || null; } catch (e) { return null; } } return $(st.sel); }
  function visible(el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; }
  function $(sel) { try { var all = document.querySelectorAll(sel); for (var i = 0; i < all.length; i++) { if (visible(all[i])) return all[i]; } return all[0] || null; } catch (e) { return null; } }   /* the first VISIBLE match; the first match only when none is visible */

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
        { sel: 'a.pws-plan-day-btn[href="/todos"]', via: '#pwsAccordionLimitsHdr', opened: '#pwsAccordionLimits.open', en: 'PLAN MY DAY. Tap it, and tomorrow is waiting for you on the other side.', es: 'PLANEAR MI DÍA. Tócalo, y mañana te espera del otro lado.', last: true }
      ]
    },
    'pws-day-three': {
      name: { en: 'My Favorite Day', es: 'Mi Día Favorito' },
      page: function (p) { return p === '/pws' || p.indexOf('/pws-talent') === 0; },
      after: 'todos-day-two',
      ready: function () { return visible($('#pwsAccordionLimitsHdr')); },
      steps: [
        { sel: '#pwsAccordionLimitsHdr',          en: 'Back home. Your Favorite Day now carries the day you planned. Open it.', es: 'De vuelta en casa. Tu Día Favorito ya lleva el día que planeaste. Ábrelo.' },
        { sel: '#pwsDayCol .pws-checkin-btn.done', via: '#pwsAccordionLimitsHdr', opened: '#pwsAccordionLimits.open', en: 'Each activity, in its hour. DONE when it is done, MISSED when you missed it. This is the game: a day that keeps you safe, in your lane, and becomes a habit.', es: 'Cada actividad, a su hora. HECHO cuando está hecha, FALTÉ cuando la faltaste. Este es el juego: un día que te cuida, te mantiene en tu carril, y se vuelve hábito.', look: true },
        { sel: '#pwsDayCol .pws-plan-seq-label',   via: '#pwsAccordionLimitsHdr', opened: '#pwsAccordionLimits.open', en: 'Tap an activity\u2019s name and Butler opens for it: its note, its links, the tools he gave it. Change what you like. The X closes him, and the day is clean again \u2014 especially on a phone.', es: 'Toca el nombre de una actividad y el Mayordomo se abre para ella: su nota, sus enlaces, las herramientas que le dio. Cambia lo que quieras. La X lo cierra, y el d\u00eda queda limpio otra vez \u2014 sobre todo en el tel\u00e9fono.', look: true },
        { sel: '.pws-board-plate',                 via: '#pwsAccordionLimitsHdr', opened: '#pwsAccordionLimits.open', before: function () { try { var o = document.getElementById('pwsDocBOverlay'); if (o && visible(o) && window.pwsCloseDocB) window.pwsCloseDocB(); } catch (e) {} }, again: [700, 1500], en: 'ADD A TREAT. Set something you look forward to into the day — a coffee, a walk, a song — and that activity counts double.', es: 'AÑADIR UN DELEITE. Pon en el día algo que esperas con ganas — un café, una caminata, una canción — y esa actividad cuenta doble.', look: true },
        { sel: '.pws-day-launch-btn',              via: '#pwsAccordionLimitsHdr', opened: '#pwsAccordionLimits.open', en: 'TALENT TIME is an activity everyone has. Do your talent work anywhere and mark it done. GO TO MY PROJECT leaves this page for the Studio, where your coach is waiting \u2014 and the arrows pick you up there.', es: 'TIEMPO DE TALENTO es una actividad que todos tienen. Haz tu trabajo de talento donde sea y márcalo hecho. IR A MI PROYECTO sale de esta página al Estudio, donde tu coach te espera \u2014 y las flechas te reciben all\u00ed.', look: true, last: true }
      ]
    },
    'todos-day-two': {
      name: { en: 'Smart Day and Grandpa', es: 'Día Inteligente y el Abuelo' },
      page: function (p) { return p === '/todos'; },
      ready: function () { return !!$('#tdDayCards .td-case-header'); },
      steps: [
        { sel: '#tdDayHdr',                       en: 'Your Smart Day. Every activity you planned is here.', es: 'Tu Día Inteligente. Cada actividad que planeaste está aquí.', look: true },
        { sel: '#tdDayCards .td-case-header',     via: '#tdDayHdr', opened: '#tdAccordionDay.open', en: 'Tap your first activity. Every activity is a room with a butler in it.', es: 'Toca tu primera actividad. Cada actividad es un cuarto con un mayordomo adentro.' },
        { sel: '#pwsUseInput',                    via: '#tdDayCards .td-case-header', branch: { key: 'todos-the-room', en: 'SHOW ME THE ROOM', es: 'MU\u00c9STRAME EL CUARTO' }, en: 'Butler is here if this activity needs something \u2014 music, a link, a contact, a reminder. Nothing today? DONE \u2014 SAVE and go.', es: 'El Mayordomo est\u00e1 aqu\u00ed por si esta actividad necesita algo: m\u00fasica, un enlace, un contacto, un recordatorio. \u00bfNada hoy? LISTO \u2014 GUARDAR y sigue.', look: true },
        { sel: '.td-room-doors button:nth-child(2)', en: 'SLEEP puts an activity to rest for today. It waits under the list, and WAKE brings it back.', es: 'DORMIR deja descansar una actividad por hoy. Espera bajo la lista, y DESPERTAR la trae de vuelta.', look: true, hold: true },
        { sel: '#pwsUseMarkDoneBtn',              en: 'When it is done: DONE — SAVE. Your tools come alive here, one activity at a time. Tap it, and the room closes behind you.', es: 'Cuando esté hecho: LISTO — GUARDAR. Tus herramientas cobran vida aquí, una actividad a la vez. Tócalo, y el cuarto se cierra tras de ti.', look: true },
        { sel: '#tdTodosHdr',                     en: 'Upstairs: MY TODOS. When a problem lands — a bill, a form, a letter — it comes here. Open it.', es: 'Arriba: MIS TODOS. Cuando cae un problema — una cuenta, un formulario, una carta — llega aquí. Ábrelo.', before: function () { try { var o = document.getElementById('pwsUseOverlay'); if (o && o.classList.contains('open') && window.pwsCloseUse) window.pwsCloseUse(); } catch (e) {} } },
        { sel: '#tdGrandpa #pwsUseInput',          via: '#tdTodosHdr', en: 'Grandpa. Tell him the problem, or drop the paper in his bucket — a photo is enough. He takes it from there.', es: 'El Abuelo. Cuéntale el problema, o suelta el papel en su balde — con una foto basta. Él se encarga.', look: true },
        { sel: '#tdPileBar',                      en: 'THE PILE \u2014 the Mill. A stack of letters? Drop them all on him at once. He sorts them into todos, and sets the order of battle across everything: what to do next, what can wait.', es: 'LA PILA, el Molino. \u00bfUn mont\u00f3n de cartas? Su\u00e9ltalas todas de una vez. \u00c9l las ordena en todos, y fija el orden de batalla de todo: qu\u00e9 sigue, qu\u00e9 puede esperar.', look: true },
        { sel: '#tdList .td-case-header',          en: 'Every todo Grandpa makes is a room too: the same butler, the same tools, adapted to that problem. They sort themselves into projects, and the finished ones keep their records.', es: 'Cada todo que hace el Abuelo también es un cuarto: el mismo mayordomo, las mismas herramientas, adaptadas a ese problema. Se ordenan solos en proyectos, y los terminados guardan sus registros.', look: true },
        { sel: '#hsScroll a.hs-home',              en: 'Now home. Tap PWS on the scroll: your Favorite Day is waiting there with the day you planned.', es: 'Ahora a casa. Toca PWS en el pergamino: tu Día Favorito te espera ahí con el día que planeaste.', last: true }
      ]
    },
    'todos-the-room': {
      name: { en: 'The chat room', es: 'El cuarto de chat' },
      when: { en: 'when an activity\u2019s room is open', es: 'cuando est\u00e9 abierto el cuarto de una actividad' },
      after: 'todos-day-two',
      page: function (p) { return p === '/todos'; },
      ready: function () { var o = $('#pwsUseOverlay'); return !!o && o.classList.contains('open') && visible($('#pwsUseInput')); },
      steps: [
        { sel: '#pwsUseTitle',       en: 'This is the room for this activity. The same butler lives in every room of the house; learn this one and you know them all.', es: 'Este es el cuarto de esta actividad. El mismo mayordomo vive en cada cuarto de la casa; aprende este y los conoces todos.', look: true, hold: true },
        { sel: '#pwsVoiceBtn',       en: 'He talks. This turns his voice off \u2014 and on again.', es: '\u00c9l habla. Esto apaga su voz, y la enciende otra vez.', look: true, hold: true },
        { sel: '#pwsViewToggle',     en: 'Tools away, tools back. Full chat when you want only words.', es: 'Herramientas fuera, herramientas de vuelta. Solo chat cuando quieras solo palabras.', look: true, hold: true },
        { sel: '#pwsUseCloseBtn2',   en: 'The X closes the room. Nothing is lost \u2014 it is all here when you come back.', es: 'La X cierra el cuarto. No se pierde nada: todo est\u00e1 aqu\u00ed cuando vuelvas.', look: true, hold: true },
        { sel: '#pwsUseInput',       en: 'Type to him here.', es: 'Escr\u00edbele aqu\u00ed.', look: true, hold: true },
        { sel: '#pwsUseMic',         en: 'Or talk: tap the mic and say it.', es: 'O habla: toca el micr\u00f3fono y d\u00edselo.', look: true, hold: true },
        { sel: '#pwsCamBtn',         en: 'A paper, a bill, a screen \u2014 the camera shows it to him.', es: 'Un papel, una cuenta, una pantalla: la c\u00e1mara se la muestra.', look: true, hold: true },
        { sel: '#pwsUsePanel [id^="tdUpload_"]', en: 'The bucket. Drop anything \u2014 a file, a link, a contact card. He reads it, and it stays on this activity\u2019s shelf.', es: 'El balde. Suelta lo que sea: un archivo, un enlace, una tarjeta de contacto. \u00c9l lo lee, y queda en el estante de esta actividad.', look: true, hold: true, opt: true },
        { sel: '#pwsUseFooter .pws-use-footer-btn:not(.mark-done)', en: 'Under the chat, the tools: links, contacts, cash, stationery. One tap opens each.', es: 'Bajo el chat, las herramientas: enlaces, contactos, dinero, papeler\u00eda. Un toque abre cada una.', look: true, hold: true, opt: true },
        { sel: '#pwsUseMarkDoneBtn', en: 'And DONE \u2014 SAVE when you are through. Try any of these with TRY IT, then RESUME.', es: 'Y LISTO \u2014 GUARDAR cuando termines. Prueba cualquiera con PRU\u00c9BALO, y luego SEGUIR.', look: true, hold: true, last: true }
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
        { sel: '#stCoachInput',          via: '#stCoachBtn', en: 'Tell Coach B what you want to make \u2014 a talk, a song, a letter \u2014 and answer what he asks. Nothing in mind? Tap PUT A LINE IN THE BOX and send it as it is.', es: 'Dile a Coach B qu\u00e9 quieres hacer \u2014 una charla, una canci\u00f3n, una carta \u2014 y responde lo que pregunte. \u00bfNada en mente? Toca PONER UNA L\u00cdNEA y env\u00edala tal cual.', look: true, sample: { en: 'A two-minute talk for my family: the one thing I wish I had known at twenty.', es: 'Una charla de dos minutos para mi familia: lo que me hubiera gustado saber a los veinte.' } },
        { sel: '#stScrLine button',      en: 'Give it a home: PICK A PROJECT, or make a new one. A script with no home is kept anyway.', es: 'Dale un hogar: ELIGE UN PROYECTO, o haz uno nuevo. Un guion sin hogar se guarda igual.', look: true, hold: true },
        { sel: '#stCoachX',              en: 'The X closes him any time. The chat is kept; come back when you like.', es: 'La X lo cierra cuando quieras. La charla se guarda; vuelve cuando gustes.', look: true, hold: true },
        { find: function () { var bs = document.querySelectorAll('#stScrLine button'); for (var i = 0; i < bs.length; i++) { if (bs[i].textContent.indexOf('\u270D') === 0) return bs[i]; } return null; }, en: 'Two ways to a script. Talk with him, and he writes it. Or tap this pen: it turns to I WRITE IT and the script room opens now \u2014 empty, yours, and the arrows walk you through it. Tap the pen again to hand the writing back to him.', es: 'Dos caminos a un guion. Habla con \u00e9l, y \u00e9l lo escribe. O toca esta pluma: pasa a YO LO ESCRIBO y el cuarto del guion se abre ya \u2014 vac\u00edo, tuyo, y las flechas te gu\u00edan. Toca la pluma otra vez para devolverle la escritura.', last: true }
      ]
    },
    'studio-your-script': {
      name: { en: 'Your script', es: 'Tu guion' },
      when: { en: 'when Coach B has written it', es: 'cuando Coach B lo haya escrito' },
      page: function (p) { return p === '/studio'; },
      ready: function () { return visible($('#stScrView')) && visible($('#stScrMake')); },
      steps: [
        { sel: '#stScrTitle',  en: 'Your script. Give it a title \u2014 or change the one he gave it.', es: 'Tu guion. Ponle un t\u00edtulo, o cambia el que \u00e9l le puso.', look: true },
        { sel: '#stScrWords',  en: 'The words. Yours to write here \u2014 or, if Coach B wrote them, read them aloud and change anything.', es: 'Las palabras. Escr\u00edbelas aqu\u00ed, o, si Coach B las escribi\u00f3, l\u00e9elas en voz alta y cambia lo que quieras.', look: true },
        { sel: '#stScrLine button', en: 'Give it a home first: PICK A PROJECT \u2014 a new one named anything is fine. READ YOUR SCRIPT brings you back here.', es: 'Primero dale un hogar: ELIGE UN PROYECTO; uno nuevo con cualquier nombre sirve. LEER TU GUION te trae de vuelta aqu\u00ed.', look: true, hold: true },
        { sel: '#stScrMake',   en: 'MAKE SOMETHING FROM IT saves the script and carries it to the Production Studio. This page leaves \u2014 and the arrows pick you up there.', es: 'CREAR ALGO CON ESTO guarda el guion y lo lleva al Estudio de Producci\u00f3n. Esta p\u00e1gina se va, y las flechas te reciben all\u00e1.', look: true, last: true }
      ]
    },
    'production-the-show': {
      name: { en: 'The show on the table', es: 'El show en la mesa' },
      when: { en: 'when a show is open', es: 'cuando haya un show abierto' },
      page: function (p) { return p === '/production-studio'; },
      ready: function () { return visible($('#psSlides')) && !!$('#psSlides').firstElementChild && visible($('#psRecord')); },
      steps: [
        { sel: '#psSlides',  en: 'Your show. One slide per line of your script \u2014 Butler set them here. A picture on a slide serves both languages.', es: 'Tu show. Una diapositiva por cada l\u00ednea de tu guion: el Mayordomo las puso aqu\u00ed. Una imagen en una diapositiva sirve para los dos idiomas.', look: true },
        { sel: '#psRecord',  en: 'RECORD MY VOICE. Read each line as it comes; the show keeps your voice with your words.', es: 'GRABAR MI VOZ. Lee cada l\u00ednea cuando llegue; el show guarda tu voz con tus palabras.', look: true, hold: true },
        { sel: '#psScreen',  en: 'Or record your screen, to show something while you speak.', es: 'O graba tu pantalla, para mostrar algo mientras hablas.', look: true, hold: true, opt: true },
        { sel: '#psWatch',   en: 'WATCH: your show as others will see it \u2014 the title on top, the picture, your words under it.', es: 'VER: tu show como lo ver\u00e1n los dem\u00e1s: el t\u00edtulo arriba, la imagen, tus palabras debajo.', look: true, hold: true, opt: true },
        { sel: '#psLectern', en: 'PUT THE PICTURES IN LECTERN: the makeup room. Pictures from the library or from any page \u2014 and its bar brings you back here.', es: 'PONER LAS IM\u00c1GENES EN EL ATRIL: el cuarto de maquillaje. Im\u00e1genes de la biblioteca o de cualquier p\u00e1gina, y su barra te trae de vuelta aqu\u00ed.', look: true, hold: true, opt: true },
        { sel: '#psTwin',    en: 'MAKE THE OTHER LANGUAGE: the same show in its sister tongue, tied to this one.', es: 'HACER EL OTRO IDIOMA: el mismo show en su lengua hermana, unido a este.', look: true, hold: true, opt: true },
        { sel: '#psPublish', en: 'PUBLISH: your show goes into a Window of yours, and from there to the Gallery.', es: 'PUBLICAR: tu show entra en una Ventana tuya, y de ah\u00ed a la Galer\u00eda.', look: true, hold: true, opt: true },
        { sel: '#psHowTop',  en: 'When you are making a real show, SHOW ME HOW up here walks you step by step \u2014 it watches your work and points at the next thing.', es: 'Cuando hagas un show de verdad, MU\u00c9STRAME C\u00d3MO aqu\u00ed arriba te gu\u00eda paso a paso: mira tu trabajo y se\u00f1ala lo que sigue.', look: true, hold: true, last: true }
      ]
    },
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
    '#haChip.ha-paused{background:linear-gradient(180deg,#2a4a1e,#143010);border-color:#b8e29a;color:#eaffd8;}' +
    '#haCard .ha-sample{display:block;margin:10px 0 2px;font-family:Cinzel,serif;font-size:13px;font-weight:700;letter-spacing:0.14em;color:#2b1a00;background:linear-gradient(180deg,#ffe9a8,#d9b85a);border:1px solid #fff2c8;border-radius:8px;padding:8px 12px;cursor:pointer;}' +
    '#haMenu{position:fixed;right:10px;z-index:99981;display:none;flex-direction:column;gap:6px;background:linear-gradient(180deg,#3d060b,#24040a);border:1px solid rgba(226,194,112,0.8);border-radius:14px;padding:10px;box-shadow:0 10px 28px rgba(0,0,0,0.6);}' +
    '#haMenu button{font-family:Cinzel,serif;font-size:14px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ffe9a8;background:rgba(255,233,168,0.06);border:1px solid rgba(226,194,112,0.45);border-radius:10px;padding:10px 14px;cursor:pointer;text-align:left;white-space:nowrap;}' +
    '#haMenu button:hover{background:rgba(255,233,168,0.14);}#haMenu button .ha-done{opacity:0.7;margin-left:8px;}' +
    '#haMenu button.ha-wait{opacity:0.45;cursor:default;}#haMenu button .ha-when{font-weight:400;text-transform:none;letter-spacing:0.02em;font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:15px;}' +
    '@media (max-width:700px){#haCard{font-size:20px;padding:14px 14px 10px;}#haChip{font-size:11px;padding:7px 11px;}#haMenu button{font-size:13px;}}';

  var arrow, card, chip, lit = null, running = null, paused = null;   /* paused: the function that brings the walk back after TRY IT */
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
      text = String(text).replace(/\b([A-Z\u00c0-\u00dc]{2,})\b/g, function (w) { return w === 'PWS' ? w : w.toLowerCase(); });   /* the voice read capitals as letters */
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
    card.style.visibility = 'hidden'; card.style.display = 'block';
    var cw = card.offsetWidth, ch = card.offsetHeight;
    var above = (r.top - 34 - 58 - ch) >= 80;                /* room above the target for the arrow + card, clear of the site's top bar */
    arrow.className = above ? 'down' : 'up';
    arrow.style.left = (cx - 18) + 'px';
    arrow.style.top = above ? (r.top + sy - 34) + 'px' : (r.bottom + sy + 8) + 'px';
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

  function run(key, force, then, startAt) {
    var L = LESSONS[key]; if (!L) { if (then) then(); return; }
    if (L.when && !isReady(key)) { if (then) then(); return; }   /* its moment has not come */
    if (!force && ls('4laws-lesson-' + key) === '1') { if (then) then(); return; }
    if (running) return;
    running = key; build();
    var Lg = lang(); var i = -1; var onClick = null, onKey = null;
    function done(finished) {
      stopRun = null; stopFollow(); paused = null; chipWords(); try { localStorage.removeItem('4laws-resume'); } catch (eR) {}
      document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', onMove); window.removeEventListener('resize', onMove);
      if (finished && shown) { ls('4laws-lesson-' + key, '1'); try { localStorage.removeItem('4laws-later-' + key); } catch (eL) {} }
      curTarget = null; hideAll();
      if (finished && then) setTimeout(then, 400);
    }
    var curTarget = null, shown = false, curSel = null, follow = null;
    function stopFollow() { if (follow) { clearInterval(follow); follow = null; } }
    stopRun = function () { done(false); };
    function onMove() { if (curTarget) place(curTarget); }
    var showSeq = 0;
    function show(n) {
      i = n; var st = L.steps[i]; if (!st) return done(true);
      var mySeq = ++showSeq;   /* a card superseded by NEXT before its target appeared must never render later */
      try { if (st.before) st.before(); } catch (eB) {}
      if (st.before && st.again) { st.again.forEach(function (ms) { setTimeout(function () { if (running === key && L.steps[i] === st) { try { st.before(); } catch (eA) {} } }, ms); }); }   /* the page may act a beat after the tap: do it again */
      if (st.via && !visible(target(st)) && !(st.opened && $(st.opened))) { var v = $(st.via); if (v && visible(v)) { try { v.click(); } catch (eV) {} } }   /* open the way first (a folded card, a closed room) -- never when the way is already open: the header is a toggle */
      waitFor(function () { return visible(target(st)); }, st.opt ? 1200 : (st.via ? 4000 : 5000), function (ok) {
        if (mySeq !== showSeq || running !== key) return;
        if (!ok && st.opt) { if (st.last) return done(true); return show(i + 1); }   /* a button this page does not have yet: pass it quietly */
        var t = ok ? target(st) : null; curTarget = t; curSel = st; unlight(); if (t) { t.classList.add('ha-lit'); lit = t; }
        stopFollow(); if (t) { follow = setInterval(function () { if (running !== key) return stopFollow(); if (curTarget && !document.body.contains(curTarget)) { var nt = target(curSel); if (nt && visible(nt)) { curTarget = nt; unlight(); nt.classList.add('ha-lit'); lit = nt; place(nt); } } }, 500); }   /* the page redrew the target: the arrow follows it */
        shown = true; ls('4laws-shown-' + key, '1');
        if (st.last) ls('4laws-lesson-' + key, '1');   /* the last card on the screen is the walk finished -- GOT IT, LATER, or a tap that leaves the page all count */
        if (t) scrollTo(t);
        card.innerHTML = '<div class="ha-words"></div><div class="ha-row"><span class="ha-n"></span><span style="display:flex;gap:8px;"><button type="button" class="ha-mute" title="' + (Lg === 'es' ? 'Voz' : 'Voice') + '">' + (muted() ? '🔇' : '🔊') + '</button><button type="button" class="ha-try">' + (Lg === 'es' ? 'Pru\u00e9balo' : 'Try it') + '</button><button type="button" class="ha-later">' + (Lg === 'es' ? 'Luego' : 'Later') + '</button><button type="button" class="ha-next">' + (st.last ? (Lg === 'es' ? 'Entendido' : 'Got it') : (Lg === 'es' ? 'Siguiente →' : 'Next →')) + '</button></span></div>';
        card.querySelector('.ha-words').textContent = st[Lg] || st.en;
        if (st.branch && LESSONS[st.branch.key]) { var bb = document.createElement('button'); bb.type = 'button'; bb.className = 'ha-sample'; bb.textContent = st.branch[Lg] || st.branch.en; bb.addEventListener('click', function (ev) { ev.stopPropagation(); var back = i; done(false); run(st.branch.key, true, function () { run(key, true, then, back); }); }); card.querySelector('.ha-words').appendChild(bb); }   /* a walk inside a walk: the room explained, then back to this card */
        if (st.sample) { var sb = document.createElement('button'); sb.type = 'button'; sb.className = 'ha-sample'; sb.textContent = (Lg === 'es' ? 'PONER UNA L\u00cdNEA' : 'PUT A LINE IN THE BOX'); sb.addEventListener('click', function (ev) { ev.stopPropagation(); try { var box = target(st); if (!box) return; box.value = st.sample[Lg] || st.sample.en; box.dispatchEvent(new Event('input', { bubbles: true })); box.focus(); } catch (eS) {} }); card.querySelector('.ha-words').appendChild(sb); }
        card.querySelector('.ha-n').textContent = (i + 1) + ' / ' + L.steps.length;
        card.querySelector('.ha-next').addEventListener('click', function () { if (st.last) done(true); else show(i + 1); });
        card.querySelector('.ha-later').addEventListener('click', function () { ls('4laws-later-' + key, '1'); done(false); });
        card.querySelector('.ha-try').addEventListener('click', function () {   /* step aside: play with it, then RESUME brings this card back */
          var n = i; stopFollow(); curTarget = null; unlight(); arrow.style.display = 'none'; card.style.display = 'none'; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (eT) {}
          paused = function () { paused = null; chipWords(); show(n); }; chipWords();
          try { localStorage.setItem('4laws-resume', JSON.stringify({ key: key, i: n, at: Date.now() })); } catch (eR) {}   /* if TRY IT leaves the page, the walk picks up here on return */
        });
        card.querySelector('.ha-mute').addEventListener('click', function (ev) { ls('4laws-charles-mute', muted() ? '0' : '1'); ev.target.textContent = muted() ? '🔇' : '🔊'; if (muted()) { try { window.speechSynthesis.cancel(); } catch (e) {} } else speak(st[Lg] || st.en); });
        if (t) { arrow.style.display = 'block'; setTimeout(function () { place(t); }, 420); place(t); if (i === 0) { setTimeout(function () { if (running === key && curTarget === t) { scrollTo(t); place(t); } }, 1500); setTimeout(function () { if (running === key && curTarget === t) place(t); }, 3000); } }
        else { arrow.style.display = 'none'; card.style.display = 'block'; card.style.visibility = 'visible'; card.style.left = Math.max(8, (window.innerWidth - card.offsetWidth) / 2) + 'px'; try { window.scrollTo(0, 0); } catch (e0) {} card.style.top = '90px'; }   /* a target that cannot be found: the card still comes, at the top, so nothing fails in silence */
        speak(st[Lg] || st.en);
      });
    }
    onClick = function (ev) {
      if (paused) return;
      var st = L.steps[i]; if (!st) return; var t = target(st); if (!t || !t.contains(ev.target)) return;
      if (st.hold) {   /* shown, not opened: a tap on a pill during the walk only moves the walk on (it would carry you off the page) */
        ev.preventDefault(); ev.stopPropagation(); if (st.last) done(true); else show(i + 1); return;
      }
      if (st.last) ls('4laws-lesson-' + key, '1');
      setTimeout(function () { if (st.last) done(true); else show(i + 1); }, 250);   /* any other target: the tap does its real work, and the walk moves on */
    };
    onKey = function (ev) { if (paused) return; var st = L.steps[i]; if (!st || ev.key !== 'Enter') return; var t = target(st); if (t && t === ev.target && !st.look) setTimeout(function () { if (st.last) done(true); else show(i + 1); }, 250); };
    document.addEventListener('click', onClick, true); document.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', onMove); window.addEventListener('resize', onMove);
    if (L.intro && !force && !startAt) { speak(L.intro[Lg] || L.intro.en); }
    show(startAt || 0);
  }

  /* ── the SHOW ME chip: help is never hidden ────────────────────────────────────────────────────────────────────── */
  function isReady(k) { try { return !!LESSONS[k].ready(); } catch (e) { return false; } }
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
    function row(label, done, fn) { var b = document.createElement('button'); b.type = 'button'; b.innerHTML = label + (done ? '<span class="ha-done">\u2713</span>' : ''); b.addEventListener('click', function (ev) { ev.stopPropagation(); menuHide(); fn(); }); menu.appendChild(b); return b; }
    row(Lg === 'es' ? 'Todo el recorrido' : 'The whole tour', false, function () { (function go(j) { if (j >= ks.length) return; if (LESSONS[ks[j]].when && !isReady(ks[j])) return go(j + 1); run(ks[j], true, function () { go(j + 1); }); })(0); });
    for (var j = 0; j < ks.length; j++) { (function (k) { var L = LESSONS[k]; var nm = (L.name && (L.name[Lg] || L.name.en)) || k;
      if (L.when && !isReady(k)) { var wl = L.when[Lg] || L.when.en; var b = row(nm + ' <span class="ha-when">\u2014 ' + wl + '</span>', false, function () { speak(nm + ': ' + wl); }); b.className = 'ha-wait'; return; }
      row(nm, ls('4laws-lesson-' + k) === '1', function () { run(k, true); }); })(ks[j]); }
    menu.style.display = 'flex'; menuPlace();
  }
  function chipWords() { if (!chip) return; chip.textContent = paused ? (lang() === 'es' ? 'SEGUIR \u2726' : 'RESUME \u2726') : (lang() === 'es' ? 'MU\u00c9STRAME \u2726' : 'SHOW ME \u2726'); chip.className = paused ? 'ha-paused' : ''; }
  function makeChip() {
    if (chip || !pageLessons().length) return;
    dress(); chip = document.createElement('button'); chip.id = 'haChip'; chip.type = 'button';
    chip.textContent = (lang() === 'es' ? 'MUÉSTRAME ✦' : 'SHOW ME ✦');
    chip.addEventListener('click', function () {
      if (paused) { var back = paused; back(); return; }   /* RESUME: the card comes back where it was */
      if (menu && menu.style.display === 'flex') { menuHide(); return; }
      if (running) { var r = card ? card.getBoundingClientRect() : null; if (r && card.style.display === 'block' && (r.bottom < 60 || r.top > window.innerHeight - 60)) { try { window.scrollTo({ top: Math.max(0, r.top + window.pageYOffset - 120), behavior: 'smooth' }); } catch (e0) {} return; } hideAll(); return; }
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
    setInterval(function () {   /* walks that wait on a moment: watched for as long as the page is open */
      if (running || paused) return; var ks = pageLessons();
      for (var j = 0; j < ks.length; j++) { var k = ks[j], L = LESSONS[k]; if (!L.when) continue; if (ls('4laws-lesson-' + k) === '1' || ls('4laws-later-' + k) === '1') continue; if (L.after && ls('4laws-lesson-' + L.after) !== '1') continue; if (isReady(k)) { run(k, false); return; } }
    }, 1500);
    var ks = pageLessons(); if (!ks.length) return;
    try { var rs = JSON.parse(ls('4laws-resume') || 'null'); if (rs && LESSONS[rs.key] && ks.indexOf(rs.key) >= 0 && (Date.now() - rs.at) < 30 * 60000) { localStorage.removeItem('4laws-resume'); waitFor(LESSONS[rs.key].ready, 20000, function (ok) { if (ok) run(rs.key, true, null, rs.i); }); return; } } catch (eR) {}   /* back from a TRY IT that left the page: the same card */
    (function next(j) {
      if (j >= ks.length) return; var k = ks[j]; var L = LESSONS[k];
      if (ls('4laws-lesson-' + k) === '1') return next(j + 1);
      if (L.after && ls('4laws-lesson-' + L.after) !== '1') return next(j + 1);   /* not yet: this walk comes after another one */
      if (ls('4laws-later-' + k) === '1') return next(j + 1);   /* put away with LATER once: from here it waits for SHOW ME, it does not ambush */
      waitFor(L.ready, (k === 'studio-the-coach') ? 90000 : 20000, function (ok) { if (ok) run(k, false); next(j + 1); });
    })(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 900); }); else setTimeout(start, 900);

  window.HouseArrows = { v: '1.13', cut: 13, resume: function () { if (paused) { var b = paused; b(); } }, run: function (k) { run(k, true); }, replay: function () { var ks = pageLessons(); if (ks.length) run(ks[0], true); }, stop: hideAll, lessons: function () { return Object.keys(LESSONS); }, reset: function () { for (var k in LESSONS) { try { localStorage.removeItem('4laws-lesson-' + k); localStorage.removeItem('4laws-shown-' + k); localStorage.removeItem('4laws-later-' + k); } catch (e) {} } } };
})();
