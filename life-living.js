/* ============================================================
   LIFE-LIVING.JS v1.1 — THE SHELF (Bench 35, Mon 9/7/26)
   LIVE THE GAME — the Living Game's rooms as one CDN organ, seated in
   the Hall by a single script line (last in the body). The Hall belongs
   to its own bench; this file never replaces a Hall function or element.
   It decorates, and it re-decorates when the Hall redraws.

   v1.1 THE SHELF — the founder's visual law applied ("a glowing thing →
   what's that? → one bite → gone"; never a ledger, never a book):
   · THE WALL: four monster faces with their head counts (a glance), then
     a row of glowing heads/medals with NO words. Tap one → a single line
     rises. Tap again → gone. One open at a time.
   · THE LIBRARY: a shelf of spines at the foot of the Saga window (door
     lifeLibrary, GamesCode v3.25+). Tap a spine → one card rises with the
     month's condensed telling. Tap again → gone.
   · THE THUMP: a new honor since this device last looked = one low
     synthesized thump (WebAudio, no file) + one message-scroll line.
   · Re-decorates after the Hall's own renders via a MutationObserver on
     #trophyWall and #sagaReal (no new Hall names required).
   v1.0 THE WALL — the Hunter's Wall reads THE RECKONING (lifeHonors).

   THE HOOK CONTRACT (kept stable by the Hall):
     globals  lifePost(body)  lifeCreds()  txt(en,es)  lifeSaga(line)
              lifeRenderTrophies()  S.trophies   LifeArt (optional)
     ids      #trophyWall   #sagaReal   #hall (class 'on' when entered)
   Fire-and-forget: on an older backend or any failure the Hall renders
   exactly as it renders alone. ES5 only.
   CDN: 4rlawsacademy/4laws-assets@main/life-living.js
   ============================================================ */
(function () {
  if (window.LifeLiving) { return; }
  var LL = { v: '1.1', honors: null, library: null, booted: false, open: '', openVol: '' };
  window.LifeLiving = LL;

  var MON = {
    pile: { law: 'responsibility', en: 'THE PILE', es: 'LA PILA' },
    cold: { law: 'respect', en: 'THE COLD SHOULDER', es: 'EL DESAIRE' },
    fog:  { law: 'talent', en: 'THE FOG', es: 'LA NIEBLA' },
    conq: { law: 'limits', en: 'THE VIOLATOR', es: 'EL TRANSGRESOR' }
  };

  function T(en, es) { try { if (typeof window.txt === 'function') { return window.txt(en, es); } } catch (e) {} return en; }
  function lang() { try { return (localStorage.getItem('4laws-lang') || 'en').indexOf('es') === 0 ? 'es' : 'en'; } catch (e) { return 'en'; } }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function art() { return window.LifeArt || { get: function () { return ''; }, pair: function () { return { monster: '', defeat: '', hero: '', triumph: '' }; } }; }
  function todayIso() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function post(body) { return window.lifePost(body); }
  function canPost() { return typeof window.lifePost === 'function' && typeof window.lifeCreds === 'function' && !!window.lifeCreds(); }

  /* ---------- CSS, once ---------- */
  function css() {
    if ($('lifeLivingCss')) { return; }
    var st = document.createElement('style'); st.id = 'lifeLivingCss';
    st.textContent =
      '#llWall,#llShelf{width:100%;}' +
      '.llCard{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:10px;margin-bottom:8px;}' +
      '.llKill{-webkit-flex:1 1 110px;flex:1 1 110px;background:#10141b;border:1.5px solid #2a2416;border-radius:12px;padding:8px 10px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:10px;}' +
      '.llKill img{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #c8a84b;}' +
      '.llKill .llName{font-family:"Cinzel",serif;font-size:10px;color:#a89968;letter-spacing:.06em;}' +
      '.llKill .llCount{font-family:"Cinzel",serif;font-size:22px;color:#ffd75e;line-height:1;}' +
      '.llHeads{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:12px;-webkit-justify-content:center;justify-content:center;padding:6px 0 2px;}' +
      '.llHead{width:64px;height:64px;border-radius:50%;border:2.5px solid #c8a84b;background:#10141b;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;font-size:28px;overflow:hidden;cursor:pointer;box-shadow:0 0 10px rgba(255,215,94,.25);-webkit-transition:box-shadow .25s,transform .25s;transition:box-shadow .25s,transform .25s;}' +
      '.llHead img{width:100%;height:100%;object-fit:cover;}' +
      '.llHead.fresh{-webkit-animation:llGlow 1.6s ease-in-out infinite;animation:llGlow 1.6s ease-in-out infinite;}' +
      '.llHead.open{box-shadow:0 0 22px rgba(255,215,94,.7);transform:scale(1.08);border-color:#ffd75e;}' +
      '@-webkit-keyframes llGlow{0%,100%{box-shadow:0 0 10px rgba(255,215,94,.25);}50%{box-shadow:0 0 24px rgba(255,215,94,.75);}}' +
      '@keyframes llGlow{0%,100%{box-shadow:0 0 10px rgba(255,215,94,.25);}50%{box-shadow:0 0 24px rgba(255,215,94,.75);}}' +
      '.llLine{display:none;text-align:center;font-family:"Cinzel",serif;font-size:14px;color:#ffd75e;letter-spacing:.05em;padding:8px 6px 2px;}' +
      '.llLine small{display:block;font-family:inherit;font-size:12px;color:#d8ccaa;letter-spacing:.02em;font-style:italic;margin-top:3px;}' +
      '.llLine.on{display:block;}' +
      '.llShelfRow{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:8px;-webkit-align-items:flex-end;align-items:flex-end;padding:10px 4px 8px;border-top:1px solid #2a2416;margin-top:10px;}' +
      '.llSpine{width:38px;height:120px;border-radius:4px 4px 2px 2px;background:linear-gradient(180deg,#3a2c12,#1c150a);border:1.5px solid #c8a84b;box-shadow:inset 0 0 0 2px #10141b,0 3px 6px rgba(0,0,0,.6);cursor:pointer;position:relative;-webkit-transition:transform .2s,box-shadow .2s;transition:transform .2s,box-shadow .2s;}' +
      '.llSpine span{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%) rotate(-90deg);transform:translate(-50%,-50%) rotate(-90deg);white-space:nowrap;font-family:"Cinzel",serif;font-size:10px;letter-spacing:.1em;color:#ffd75e;}' +
      '.llSpine.open{transform:translateY(-6px);box-shadow:inset 0 0 0 2px #10141b,0 0 18px rgba(255,215,94,.6);}' +
      '.llSpine.now{opacity:.55;border-style:dashed;}' +
      '.llShelfLabel{width:100%;font-family:"Cinzel",serif;font-size:11px;color:#a89968;letter-spacing:.12em;}' +
      '.llBook{display:none;background:#0c1016;border:1.5px solid #c8a84b;border-radius:12px;padding:16px 18px;margin-top:8px;}' +
      '.llBook.on{display:block;}' +
      '.llBook h4{margin:0 0 2px;font-family:"Cinzel",serif;font-size:16px;color:#ffd75e;letter-spacing:.06em;}' +
      '.llBook .llMonth{font-size:12px;color:#a89968;letter-spacing:.1em;margin-bottom:10px;}' +
      '.llBook p{margin:0;font-size:16px;line-height:1.55;color:#e8dcc0;white-space:pre-line;}';
    document.head.appendChild(st);
  }

  /* ---------- THE THUMP (no file) ---------- */
  var actx = null;
  LL.thump = function () {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) { return; }
      if (!actx) { actx = new AC(); }
      if (actx.state === 'suspended' && actx.resume) { actx.resume(); }
      var t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.22);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.9, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 0.32);
      var n = actx.createBufferSource(), buf = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.05), actx.sampleRate), data = buf.getChannelData(0), i;
      for (i = 0; i < data.length; i++) { data[i] = (Math.random() * 2 - 1) * (1 - i / data.length); }
      var ng = actx.createGain(); ng.gain.setValueAtTime(0.25, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      n.buffer = buf; n.connect(ng); ng.connect(actx.destination); n.start(t);
    } catch (e) {}
  };

  /* ---------- honors ---------- */
  function sym(kind) { return { trophy: '\uD83C\uDFC6', medal: '\uD83C\uDF96\uFE0F', ribbon: '\uD83C\uDF97\uFE0F', streak: '\uD83D\uDD25', forge: '\u2692\uFE0F', kill: '\u2694\uFE0F' }[kind] || '\u2605'; }
  function kindWord(kind) {
    var en = { trophy: 'TROPHY', medal: 'MEDAL', ribbon: 'RIBBON', streak: 'STREAK', forge: 'THE FORGE', kill: 'KILL' }[kind] || 'HONOR';
    var es = { trophy: 'TROFEO', medal: 'MEDALLA', ribbon: 'LIST\u00d3N', streak: 'RACHA', forge: 'LA FRAGUA', kill: 'CAZA' }[kind] || 'HONOR';
    return T(en, es);
  }
  function line(h) { return sym(h.kind) + ' ' + (h.kind === 'kill' ? '' : (kindWord(h.kind) + ' \u00b7 ')) + h.name + (h.detail ? (' \u2014 ' + h.detail) : ''); }

  var freshIds = {};
  function herald(list) {
    try {
      var seen = localStorage.getItem('4laws-honors-seen') || '', newest = seen, i, fresh = [];
      for (i = 0; i < list.length; i++) {
        if (list[i].createdAt && list[i].createdAt > seen) { fresh.push(list[i]); freshIds[list[i].id] = true; if (list[i].createdAt > newest) { newest = list[i].createdAt; } }
      }
      if (typeof window.lifeSaga === 'function') { for (i = fresh.length - 1; i >= 0; i--) { window.lifeSaga(line(fresh[i])); } }
      if (fresh.length) { LL.thump(); }
      if (newest !== seen) { localStorage.setItem('4laws-honors-seen', newest); }
    } catch (e) {}
  }

  LL.fetch = function () {
    if (!canPost()) { return; }
    try {
      post({ action: 'lifeHonors', limit: 40 }).then(function (d) {
        if (d && d.success) { LL.honors = d; LL.renderWall(); herald(d.honors || []); }
      })['catch'](function () {});
    } catch (e) {}
    try {
      post({ action: 'lifeLibrary', limit: 24 }).then(function (d) {
        if (d && d.success) { LL.library = d; LL.renderShelf(); }
      })['catch'](function () {});
    } catch (e2) {}
  };

  /* ---------- THE WALL: faces with numbers, heads without words ---------- */
  LL.renderWall = function () {
    var w = $('trophyWall'); if (!w || !LL.honors) { return; }
    var old = $('llWall'); if (old) { old.parentNode.removeChild(old); }
    css();
    var A = art(), D = LL.honors, real = D.honors || [], mounted = [], i, k, h = '';
    for (i = 0; i < real.length; i++) { if (real[i].kind !== 'kill') { mounted.push(real[i]); } }
    if (D.kills) {
      h += '<div class="llCard">';
      for (k in MON) {
        if (!MON.hasOwnProperty(k)) { continue; }
        var m = MON[k], img = '';
        try { img = A.pair(m.law).monster || A.get(k) || ''; } catch (e1) { img = ''; }
        h += '<div class="llKill">' + (img ? '<img src="' + esc(img) + '" alt="">' : '') + '<div><div class="llName">' + T(m.en, m.es) + '</div><div class="llCount">' + (D.kills[k] || 0) + '</div></div></div>';
      }
      h += '</div>';
    }
    if (mounted.length) {
      h += '<div class="llHeads">';
      for (i = 0; i < mounted.length; i++) {
        var t = mounted[i], head = '';
        try { if (t.kind === 'trophy' && t.law) { head = A.pair(t.law).defeat || ''; } } catch (e2) { head = ''; }
        h += '<div class="llHead' + (freshIds[t.id] ? ' fresh' : '') + (LL.open === t.id ? ' open' : '') + '" data-id="' + esc(t.id) + '" title="">' + (head ? '<img src="' + esc(head) + '" alt="">' : sym(t.kind)) + '</div>';
      }
      h += '</div><div class="llLine" id="llLine"></div>';
    }
    if (!h) { return; }
    var wrap = document.createElement('div'); wrap.id = 'llWall'; wrap.innerHTML = h;
    var empty = w.querySelector('.emptyWall'); if (empty && (mounted.length || (D.kills && (D.kills.pile || D.kills.cold || D.kills.fog || D.kills.conq)))) { empty.style.display = 'none'; }
    if (w.firstChild) { w.insertBefore(wrap, w.firstChild); } else { w.appendChild(wrap); }
    var heads = wrap.querySelectorAll('.llHead');
    for (i = 0; i < heads.length; i++) { heads[i].onclick = onHead; }
    if (LL.open) { showLine(LL.open); }
  };
  function onHead(ev) {
    var id = this.getAttribute('data-id');
    if (LL.open === id) { LL.open = ''; hideLine(); this.className = this.className.replace(' open', ''); return; }
    LL.open = id; var all = document.querySelectorAll('.llHead.open'); for (var i = 0; i < all.length; i++) { all[i].className = all[i].className.replace(' open', ''); }
    this.className += ' open'; this.className = this.className.replace(' fresh', ''); delete freshIds[id];
    showLine(id);
    if (ev && ev.stopPropagation) { ev.stopPropagation(); }
  }
  function showLine(id) {
    var el = $('llLine'); if (!el || !LL.honors) { return; }
    var list = LL.honors.honors || [], i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id !== id) { continue; }
      el.innerHTML = kindWord(list[i].kind) + ' \u00b7 ' + esc(list[i].name) + (list[i].detail ? '<small>' + esc(list[i].detail) + ' \u00b7 ' + esc(list[i].date) + '</small>' : '<small>' + esc(list[i].date) + '</small>');
      el.className = 'llLine on'; return;
    }
  }
  function hideLine() { var el = $('llLine'); if (el) { el.className = 'llLine'; } }

  /* ---------- THE LIBRARY: a shelf of spines at the foot of the Saga ---------- */
  LL.renderShelf = function () {
    var s = $('sagaReal'); if (!s || !LL.library) { return; }
    var old = $('llShelf'); if (old) { old.parentNode.removeChild(old); }
    css();
    var L = lang(), vols = LL.library.volumes || [], i, h = '';
    h += '<div class="llShelfRow"><div class="llShelfLabel">' + T('THE LIBRARY', 'LA BIBLIOTECA') + '</div>';
    for (i = 0; i < vols.length; i++) {
      var v = vols[i];
      h += '<div class="llSpine' + (LL.openVol === v.id ? ' open' : '') + '" data-id="' + esc(v.id) + '"><span>' + esc(L === 'es' ? v.labelES : v.labelEN) + '</span></div>';
    }
    var cur = LL.library.currentMonth || '';
    if (cur) { h += '<div class="llSpine now" title="' + T('this month, still being written', 'este mes, a\u00fan escribi\u00e9ndose') + '"><span>' + esc(monthLabel(cur, L)) + '</span></div>'; }
    h += '</div><div class="llBook" id="llBook"></div>';
    var wrap = document.createElement('div'); wrap.id = 'llShelf'; wrap.innerHTML = h;
    s.appendChild(wrap);
    var spines = wrap.querySelectorAll('.llSpine[data-id]');
    for (i = 0; i < spines.length; i++) { spines[i].onclick = onSpine; }
    if (LL.openVol) { showBook(LL.openVol); }
  };
  function monthLabel(m, L) {
    var mm = Number(m.slice(5, 7)) || 1, y = m.slice(0, 4);
    var en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var es = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    return (L === 'es' ? es[mm - 1] : en[mm - 1]) + ' ' + y;
  }
  function onSpine(ev) {
    var id = this.getAttribute('data-id');
    if (LL.openVol === id) { LL.openVol = ''; var b = $('llBook'); if (b) { b.className = 'llBook'; } this.className = this.className.replace(' open', ''); return; }
    LL.openVol = id; var all = document.querySelectorAll('.llSpine.open'); for (var i = 0; i < all.length; i++) { all[i].className = all[i].className.replace(' open', ''); }
    this.className += ' open'; showBook(id);
    if (ev && ev.stopPropagation) { ev.stopPropagation(); }
  }
  function showBook(id) {
    var b = $('llBook'); if (!b || !LL.library) { return; }
    var L = lang(), vols = LL.library.volumes || [], i;
    for (i = 0; i < vols.length; i++) {
      if (vols[i].id !== id) { continue; }
      var v = vols[i];
      b.innerHTML = '<h4>' + esc(L === 'es' ? v.titleES : v.titleEN) + '</h4><div class="llMonth">' + esc(L === 'es' ? v.labelES : v.labelEN) + '</div><p>' + esc(L === 'es' ? v.textES : v.textEN) + '</p>';
      b.className = 'llBook on'; return;
    }
  }

  /* ---------- seat: decorate, and re-decorate when the Hall redraws ---------- */
  function observe(id, fn) {
    var el = $(id); if (!el || !window.MutationObserver) { return; }
    var mo = new MutationObserver(function () {
      if (el.querySelector('#llWall') || el.querySelector('#llShelf')) { return; }
      try { fn(); } catch (e) {}
    });
    mo.observe(el, { childList: true });
  }
  function seat() {
    if (LL.booted) { return; }
    if (typeof window.lifeRenderTrophies !== 'function' || !$('trophyWall')) { return; }
    LL.booted = true;
    var orig = window.lifeRenderTrophies;
    window.lifeRenderTrophies = function () { try { orig.apply(this, arguments); } catch (e) {} try { LL.renderWall(); } catch (e2) {} };
    observe('trophyWall', LL.renderWall);
    observe('sagaReal', LL.renderShelf);
    css();
  }
  function tick() {
    seat();
    var hall = $('hall');
    if (LL.booted && !LL.honors && hall && (hall.className || '').indexOf('on') >= 0) { LL.fetch(); }
  }
  var timer = setInterval(function () { tick(); if (LL.honors) { clearInterval(timer); } }, 1200);
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', tick); } else { tick(); }
})();
