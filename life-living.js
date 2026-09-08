/* ============================================================
   LIFE-LIVING.JS v1.2 — THE ANVIL (Bench 35, Tue 9/8/26)
   LIVE THE GAME — the Living Game's rooms as one CDN organ, seated in
   the Hall by a single script line (last in the body). The Hall belongs
   to its own bench; this file never replaces a Hall function or element.
   It decorates, and it re-decorates when the Hall redraws.

   v1.2 THE ANVIL — THE FORGE at HQ (founder: "it recognizes the entire
   journey to LIFE"). At the foot of the Hunter's Wall: an anvil. It
   glows when a forge token is waiting (lifeForge.available > 0). Tap →
   one line — "A legacy weapon is yours to design. Your badge: El Dueño ·
   Memo" — and the door DESIGN IT AT THE ARMORY → /arsenal#forge (writes
   4laws-origin so the chip's way back returns here). No token → the anvil
   rests, dim, wordless. Beneath: the weapons you have forged, as covers
   with your badge — in forge (bench) or shipped (gallery, tap to enter).
   Reads GamesCode v3.32+ (lifeForge). Visual law throughout.
   v1.1 THE SHELF — the Wall per the visual law, the Library shelf, THE THUMP.
   v1.0 THE WALL — the Hunter's Wall reads THE RECKONING.

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
  var LL = { v: '1.2', honors: null, library: null, forge: null, booted: false, open: '', openVol: '', anvilOpen: false };
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
      '.llBook p{margin:0;font-size:16px;line-height:1.55;color:#e8dcc0;white-space:pre-line;}' +
      /* v1.2 THE ANVIL */
      '#llForge{width:100%;border-top:1px solid #2a2416;margin-top:12px;padding-top:10px;text-align:center;}' +
      '.llAnvil{display:inline-block;width:72px;height:72px;border-radius:50%;border:2.5px solid #7a5a12;background:#10141b;font-size:34px;line-height:72px;cursor:pointer;opacity:.45;-webkit-transition:opacity .3s,box-shadow .3s,transform .3s;transition:opacity .3s,box-shadow .3s,transform .3s;}' +
      '.llAnvil.hot{opacity:1;border-color:#ffd75e;-webkit-animation:llGlow 1.4s ease-in-out infinite;animation:llGlow 1.4s ease-in-out infinite;}' +
      '.llAnvil.open{transform:scale(1.08);box-shadow:0 0 26px rgba(255,215,94,.8);}' +
      '.llForgeLine{display:none;margin:10px auto 0;max-width:420px;font-family:"Cinzel",serif;font-size:14px;color:#ffd75e;letter-spacing:.05em;}' +
      '.llForgeLine small{display:block;font-family:inherit;font-size:12px;color:#d8ccaa;font-style:italic;letter-spacing:.02em;margin-top:4px;}' +
      '.llForgeLine.on{display:block;}' +
      '.llForgeDoor{display:inline-block;margin-top:10px;padding:10px 18px;border-radius:999px;background:#c8a84b;color:#040608;font-family:"Cinzel",serif;font-size:12px;letter-spacing:.14em;text-decoration:none;font-weight:700;}' +
      '.llWeapons{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:12px;-webkit-justify-content:center;justify-content:center;margin-top:12px;}' +
      '.llWeapon{width:128px;text-decoration:none;color:inherit;}' +
      '.llWeaponCover{width:128px;height:96px;border-radius:10px;border:1.5px solid #c8a84b;background:#10141b center/cover no-repeat;position:relative;overflow:hidden;box-shadow:0 0 12px rgba(255,215,94,.25);}' +
      '.llWeaponCover.forge{border-style:dashed;opacity:.8;}' +
      '.llWeaponBadge{position:absolute;left:0;right:0;bottom:0;padding:3px 6px;background:rgba(4,6,8,.82);font-family:"Cinzel",serif;font-size:9px;letter-spacing:.08em;color:#ffd75e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
      '.llWeaponTitle{margin-top:5px;font-family:"Cinzel",serif;font-size:11px;color:#e8dcc0;letter-spacing:.05em;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
      '.llWeaponState{font-size:10px;color:#a89968;text-align:center;letter-spacing:.1em;}';
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
  function sym(kind) { return { trophy: '\uD83C\uDFC6', medal: '\uD83C\uDF96\uFE0F', ribbon: '\uD83C\uDF97\uFE0F', streak: '\uD83D\uDD25', forge: '\u2692\uFE0F', legacy: '\u2694\uFE0F', kill: '\u2694\uFE0F' }[kind] || '\u2605'; }
  function kindWord(kind) {
    var en = { trophy: 'TROPHY', medal: 'MEDAL', ribbon: 'RIBBON', streak: 'STREAK', forge: 'THE FORGE', legacy: 'LEGACY', kill: 'KILL' }[kind] || 'HONOR';
    var es = { trophy: 'TROFEO', medal: 'MEDALLA', ribbon: 'LIST\u00d3N', streak: 'RACHA', forge: 'LA FRAGUA', legacy: 'LEGADO', kill: 'CAZA' }[kind] || 'HONOR';
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
    try {
      post({ action: 'lifeForge', lang: lang() }).then(function (d) {
        if (d && d.success) { LL.forge = d; LL.renderForge(); }
      })['catch'](function () {});
    } catch (e3) {}
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
        h += '<div class="llHead' + (freshIds[t.id] ? ' fresh' : '') + (LL.open === t.id ? ' open' : '') + '" data-id="' + esc(t.id) + '">' + (head ? '<img src="' + esc(head) + '" alt="">' : sym(t.kind)) + '</div>';
      }
      h += '</div><div class="llLine" id="llLine"></div>';
    }
    h += '<div id="llForge"></div>';
    var wrap = document.createElement('div'); wrap.id = 'llWall'; wrap.innerHTML = h;
    var empty = w.querySelector('.emptyWall'); if (empty && (mounted.length || (D.kills && (D.kills.pile || D.kills.cold || D.kills.fog || D.kills.conq)))) { empty.style.display = 'none'; }
    if (w.firstChild) { w.insertBefore(wrap, w.firstChild); } else { w.appendChild(wrap); }
    var heads = wrap.querySelectorAll('.llHead');
    for (i = 0; i < heads.length; i++) { heads[i].onclick = onHead; }
    if (LL.open) { showLine(LL.open); }
    LL.renderForge();
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

  /* ---------- THE ANVIL: the Forge at HQ ---------- */
  LL.renderForge = function () {
    var f = $('llForge'); if (!f) { return; }
    var F = LL.forge; if (!F) { f.innerHTML = ''; return; }
    css();
    var hot = (F.available || 0) > 0, i, h = '';
    h += '<div class="llAnvil' + (hot ? ' hot' : '') + (LL.anvilOpen ? ' open' : '') + '" id="llAnvil" title="">\u2692</div>';
    h += '<div class="llForgeLine" id="llForgeLine"></div>';
    var W = F.weapons || [];
    if (W.length) {
      h += '<div class="llWeapons">';
      for (i = 0; i < W.length; i++) {
        var wpn = W[i], shipped = String(wpn.status || '').toLowerCase() === 'shipped' && wpn.link;
        var inner = '<div class="llWeaponCover' + (shipped ? '' : ' forge') + '"' + (wpn.imageUrl ? ' style="background-image:url(' + esc(wpn.imageUrl) + ')"' : '') + '><div class="llWeaponBadge">' + T('FORGED BY ', 'FORJADA POR ') + esc(wpn.badge || F.badge || '') + '</div></div>'
          + '<div class="llWeaponTitle">' + esc(wpn.title || T('(unnamed)', '(sin nombre)')) + '</div>'
          + '<div class="llWeaponState">' + (shipped ? T('IN THE LIBRARY', 'EN LA BIBLIOTECA') : T('AT THE FORGE', 'EN LA FRAGUA')) + '</div>';
        h += shipped ? ('<a class="llWeapon" href="' + esc(wpn.link) + '">' + inner + '</a>') : ('<div class="llWeapon">' + inner + '</div>');
      }
      h += '</div>';
    }
    f.innerHTML = h;
    var a = $('llAnvil'); if (a) { a.onclick = onAnvil; }
    if (LL.anvilOpen) { showForgeLine(); }
  };
  function onAnvil(ev) {
    LL.anvilOpen = !LL.anvilOpen;
    var a = $('llAnvil'); if (a) { a.className = a.className.replace(' open', '') + (LL.anvilOpen ? ' open' : ''); }
    if (LL.anvilOpen) { showForgeLine(); } else { var l = $('llForgeLine'); if (l) { l.className = 'llForgeLine'; } }
    if (ev && ev.stopPropagation) { ev.stopPropagation(); }
  }
  function showForgeLine() {
    var l = $('llForgeLine'), F = LL.forge; if (!l || !F) { return; }
    var hot = (F.available || 0) > 0;
    if (hot) {
      l.innerHTML = T('A legacy weapon is yours to design.', 'Un arma legado es tuya para dise\u00f1ar.')
        + '<small>' + T('Your badge: ', 'Tu insignia: ') + esc(F.badge || '') + (F.available > 1 ? (' \u00b7 ' + F.available + ' ' + T('tokens', 'fichas')) : '') + '</small>'
        + '<a class="llForgeDoor" id="llForgeDoor" href="/arsenal#forge">' + T('DESIGN IT AT THE ARMORY \u2192', 'DIS\u00c9\u00d1ALA EN LA ARMER\u00cdA \u2192') + '</a>';
    } else {
      l.innerHTML = T('The anvil rests.', 'El yunque descansa.')
        + '<small>' + T('A token comes from a project declared alive, a comeback, or fifty heads of one monster.', 'Una ficha llega con un proyecto declarado vivo, una remontada, o cincuenta cabezas de un monstruo.') + '</small>';
    }
    l.className = 'llForgeLine on';
    var d = $('llForgeDoor'); if (d) { d.onclick = function () { try { localStorage.setItem('4laws-origin', '/life'); } catch (e) {} }; }
  }

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
