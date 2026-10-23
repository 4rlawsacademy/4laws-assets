/* ═══ house-arrows-v1.js THE ARROWS (Bench 57, Fri 10/23/26). The organ that teaches: an arrow and one written line on the
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
  if (window.HouseArrows && window.HouseArrows.v) return;

  function lang() { try { return localStorage.getItem('4laws-lang') === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; } }
  function here() { return ((location.pathname || '/').replace(/\/+$/, '') || '/').toLowerCase(); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function $(sel) { try { return document.querySelector(sel); } catch (e) { return null; } }
  function visible(el) { if (!el) return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; }

  /* ── the lessons ───────────────────────────────────────────────────────────────────────────────────────────────── */
  var LESSONS = {
    'pws-day-one': {
      page: function (p) { return p === '/pws' || p.indexOf('/pws-talent') === 0; },
      ready: function () { return visible($('#pwsAccordionLimitsHdr')) || visible($('#pwsTodoFab')); },
      intro: { en: 'Before you begin: four things that follow you everywhere, then your day.', es: 'Antes de empezar: cuatro cosas que te siguen a todas partes, y luego tu día.' },
      steps: [
        { sel: '#pwsTodoFab',       en: 'TODOS. When a problem lands — a bill, a form, a letter — press here. Bruno is there.', es: 'TODOS. Cuando cae un problema — una cuenta, un formulario, una carta — presiona aquí. Bruno está ahí.', look: true },
        { sel: '#pwsTrustFab',      en: 'TRUST. When a relationship strains, press here. We repair it together.', es: 'CONFIANZA. Cuando una relación se tensa, presiona aquí. La reparamos juntos.', look: true },
        { sel: '#beltEmblem',       en: 'Your belt. Your tools ride here, wherever you are in the house.', es: 'Tu cinturón. Tus herramientas viajan aquí, donde estés en la casa.', look: true },
        { sel: '#drFab',            en: 'Reminders. The house taps you on the shoulder, by text, at the hour you set.', es: 'Recordatorios. La casa te toca el hombro, por texto, a la hora que fijes.', look: true },
        { sel: '#pwsAccordionRespectHdr', en: 'Your contributions — what you told me you give. Open it and read them once.', es: 'Tus contribuciones — lo que me dijiste que das. Ábrelo y léelas una vez.' },
        { sel: '#pwsAccordionLimitsHdr',  en: 'Your Favorite Day. This is where you live now. Open it.', es: 'Tu Día Favorito. Aquí vives ahora. Ábrelo.' },
        { sel: 'a.pws-plan-day-btn[href="/todos"]', en: 'PLAN MY DAY. Tap it, and tomorrow is waiting for you on the other side.', es: 'PLANEAR MI DÍA. Tócalo, y mañana te espera del otro lado.', last: true }
      ]
    },
    'todos-day-two': {
      page: function (p) { return p === '/todos'; },
      ready: function () { return !!$('#tdDayCards .td-case-header'); },
      steps: [
        { sel: '#tdDayHdr',                       en: 'Your Smart Day. Every activity you planned is here.', es: 'Tu Día Inteligente. Cada actividad que planeaste está aquí.', look: true },
        { sel: '#tdDayCards .td-case-header',     en: 'Tap your first activity. Every activity is a room with a butler in it.', es: 'Toca tu primera actividad. Cada actividad es un cuarto con un mayordomo adentro.' },
        { sel: '#pwsUseInput',                    en: 'Tell him what this activity needs today. One line is enough.', es: 'Dile qué necesita esta actividad hoy. Con una línea basta.', look: true },
        { sel: '#pwsUseMarkDoneBtn',              en: 'When it is done: DONE — SAVE. Your tools come alive here, one activity at a time.', es: 'Cuando esté hecho: LISTO — GUARDAR. Tus herramientas cobran vida aquí, una actividad a la vez.', last: true }
      ]
    },
    'studio-the-coach': {
      page: function (p) { return p === '/studio'; },
      ready: function () { return visible($('#stCoachInput')); },
      steps: [
        { sel: '#stCoachInput',          en: 'Tell Coach B what you want to make. He asks a little, then he writes.', es: 'Dile a Coach B qué quieres hacer. Él pregunta un poco, y luego escribe.', look: true },
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
    '@media (max-width:700px){#haCard{font-size:20px;padding:14px 14px 10px;}#haChip{font-size:11px;padding:7px 11px;}}';

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
    if (isFixed(target)) return;                           /* a pill that floats never needs the page to move */
    try { var r = target.getBoundingClientRect(); var y = r.top + window.pageYOffset - Math.max(120, window.innerHeight * 0.38); window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' }); } catch (e) {}
  }

  /* ── running a lesson ──────────────────────────────────────────────────────────────────────────────────────────── */
  function build() {
    dress();
    if (!arrow) { arrow = document.createElement('div'); arrow.id = 'haArrow'; document.body.appendChild(arrow); }
    if (!card) { card = document.createElement('div'); card.id = 'haCard'; document.body.appendChild(card); }
  }
  function hideAll() { if (arrow) arrow.style.display = 'none'; if (card) card.style.display = 'none'; unlight(); running = null; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
  function waitFor(fn, ms, cb) { var t0 = Date.now(); (function tick() { var ok = false; try { ok = !!fn(); } catch (e) {} if (ok) return cb(true); if (Date.now() - t0 > ms) return cb(false); setTimeout(tick, 350); })(); }

  function run(key, force) {
    var L = LESSONS[key]; if (!L) return;
    if (!force && ls('4laws-lesson-' + key) === '1') return;
    if (running) return;
    running = key; build();
    var Lg = lang(); var i = -1; var onClick = null, onKey = null;
    function done(finished) {
      document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', onMove); window.removeEventListener('resize', onMove);
      if (finished) ls('4laws-lesson-' + key, '1');
      hideAll();
    }
    var curTarget = null;
    function onMove() { if (curTarget) place(curTarget); }
    function show(n) {
      i = n; var st = L.steps[i]; if (!st) return done(true);
      waitFor(function () { return visible($(st.sel)); }, 12000, function (ok) {
        if (!ok) { return show(i + 1); }                    /* a target this page does not have today: skip it */
        var t = $(st.sel); curTarget = t; unlight(); t.classList.add('ha-lit'); lit = t;
        scrollTo(t);
        card.innerHTML = '<div class="ha-words"></div><div class="ha-row"><span class="ha-n"></span><span style="display:flex;gap:8px;"><button type="button" class="ha-mute" title="' + (Lg === 'es' ? 'Voz' : 'Voice') + '">' + (muted() ? '🔇' : '🔊') + '</button><button type="button" class="ha-later">' + (Lg === 'es' ? 'Luego' : 'Later') + '</button><button type="button" class="ha-next">' + (st.last ? (Lg === 'es' ? 'Entendido' : 'Got it') : (Lg === 'es' ? 'Siguiente →' : 'Next →')) + '</button></span></div>';
        card.querySelector('.ha-words').textContent = st[Lg] || st.en;
        card.querySelector('.ha-n').textContent = (i + 1) + ' / ' + L.steps.length;
        card.querySelector('.ha-next').addEventListener('click', function () { if (st.last) done(true); else show(i + 1); });
        card.querySelector('.ha-later').addEventListener('click', function () { done(false); });
        card.querySelector('.ha-mute').addEventListener('click', function (ev) { ls('4laws-charles-mute', muted() ? '0' : '1'); ev.target.textContent = muted() ? '🔇' : '🔊'; if (muted()) { try { window.speechSynthesis.cancel(); } catch (e) {} } else speak(st[Lg] || st.en); });
        arrow.style.display = 'block';
        setTimeout(function () { place(t); }, 420); place(t);
        speak(st[Lg] || st.en);
      });
    }
    onClick = function (ev) {
      var st = L.steps[i]; if (!st || st.look) return;             /* a 'look' step is only shown; the next tap is not the lesson's */
      var t = $(st.sel); if (t && t.contains(ev.target)) { setTimeout(function () { if (st.last) done(true); else show(i + 1); }, 250); }
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
  function makeChip() {
    if (chip || !pageLessons().length) return;
    dress(); chip = document.createElement('button'); chip.id = 'haChip'; chip.type = 'button';
    chip.textContent = (lang() === 'es' ? 'MUÉSTRAME ✦' : 'SHOW ME ✦');
    chip.addEventListener('click', function () { if (running) { hideAll(); return; } var ks = pageLessons(); var k = null; for (var j = 0; j < ks.length; j++) { var Lx = LESSONS[ks[j]]; var ok = false; try { ok = Lx.ready(); } catch (e) {} if (ok) { k = ks[j]; break; } } if (!k) k = ks[0]; run(k, true); });
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
  function start() {
    wireEarning(); makeChip();
    var ks = pageLessons(); if (!ks.length) return;
    (function next(j) {
      if (j >= ks.length) return; var k = ks[j]; var L = LESSONS[k];
      if (ls('4laws-lesson-' + k) === '1') return next(j + 1);
      waitFor(L.ready, (k === 'studio-the-coach') ? 90000 : 20000, function (ok) { if (ok) run(k, false); next(j + 1); });
    })(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 900); }); else setTimeout(start, 900);

  window.HouseArrows = { v: 1, run: function (k) { run(k, true); }, replay: function () { var ks = pageLessons(); if (ks.length) run(ks[0], true); }, stop: hideAll, lessons: function () { return Object.keys(LESSONS); }, reset: function () { for (var k in LESSONS) { try { localStorage.removeItem('4laws-lesson-' + k); } catch (e) {} } } };
})();
