/* ============================================================
   LIFE-COMPANION.JS v1.4 — THE MATCHED ORDER (Bench 28, 9/5/26)
   v1.4: the gate's cross-check catch — Level 1's three orders still
   carried the pre-v3.6 sequence (station-first), while the Hall
   reordered to talk→forge→enter in v3.6 THE ONE DOOR so the door
   tap becomes the third mission and lifeSense's auto-fill lands on
   the right slots. Both surfaces read/write the SAME missions[level]
   array by raw position with no labels — a mismatched order here
   meant a member's checked box on the chip lit a DIFFERENT meaning
   on the Hall. Now byte-for-byte matched to the Hall's canonical order.
   LIFE-COMPANION.JS v1.3 — THE RIGHT CORNER (Bench 28, 9/5/26)
   v1.3: founder field catch — the chip stacked on top of /todos's own
   piano icon and Bench 33's new REMINDERS pill, both bottom-left.
   Moved to bottom-right (mirrors the Hall's own 📜 MESSAGES pill,
   so LIFE consistently claims the right side and never collides with
   a page's native bottom-left controls).
   LIFE-COMPANION.JS v1.2 — THE WAITING CHAPTER (Bench 28, 9/5/26)
   v1.2: wired to Bench 35's Saga contract. On boot, fetch lifeSaga
   limit:1; if the newest chapter's createdAt is newer than
   localStorage['4laws-saga-seen'], show a small waiting-chapter row
   in the card: "a chapter is waiting" (kind absence/encouragement) or
   "Doc B wrote you a letter" (depth 3). Boolean + kind only -- no
   count, this is a friend, not an inbox. The chip NEVER marks seen
   (only the Hall does, on render) -- tapping OPEN THE HALL is how the
   member goes to actually read it. Fire-and-forget; any failure
   leaves the chip exactly as v1.1 renders it.
   LIFE-COMPANION.JS v1.1 — THE TRUE SQUIRE (Bench 28, 9/4/26)
   Founder's field verdict on v1.0: "a cluttered screen with nothing
   but one button... I end up where I started." The chip was a
   doorman; it becomes a SQUIRE — the mission itself rides with you:
   - the card now carries the level's THREE MARCHING ORDERS, tappable
     right there on the real page (same state the Hall reads; checks
     push to the Games backend fire-and-forget);
   - the stakes line rides too (which monster this wounds);
   - ON ARRIVAL the card blooms open once per visit while orders are
     unfinished — stepping through the door no longer feels like
     leaving the game; the game meets you on the other side;
   - THE HERALD: a signed-in member with NO game yet is invited once
     ("Doc B will read your file and name your enemy"); NOT NOW is
     remembered and never nags again;
   - OPEN THE HALL remains as the road to the war rooms.
   Canon note: order/stake texts mirror the Hall's LEVELS array (the
   Hall is the one mouth; change there -> change here).
   Adoption unchanged: one script line; life-art.js optional for the
   true hero faces. Same filename on the CDN; upload over + purge.
   ============================================================ */
(function () {
  'use strict';
  if (window.LifeCompanion) { return; }

  var KEY = 'lifeHallDemo';
  var GAMES_URL = 'https://script.google.com/macros/s/AKfycbw1usnBC3UWpdkkBLMTPcuTWGKs3Ez_zLxSE-wZOu4WJ04UvpxKzuEPzbdPZ9WCLdX5sw/exec';
  var SKEY = '4laws-session', MKEY = '4laws-member-id';
  var HERO_NAMES = {
    talent: { en: 'THE SPARK', es: 'LA CHISPA' },
    respect: { en: 'THE BRIDGE', es: 'EL PUENTE' },
    resp: { en: 'THE OWNER', es: 'EL DUE\u00d1O' },
    limits: { en: 'THE GUARDIAN', es: 'LA GUARDIANA' }
  };
  var LV = [
    { t: { en: 'Your Home', es: 'Tu Hogar' },
      m: [{ en: 'Complete the Talent chat and the Contributions chat with Doc B', es: 'Completa la charla de Talento y la de Contribuciones con Doc B' },
          { en: 'Create and activate the tools he prescribes', es: 'Crea y activa las herramientas que \u00e9l te recete' },
          { en: 'Enter your Personal Work Station \u2014 this is your home', es: 'Entra a tu Estaci\u00f3n de Trabajo Personal \u2014 este es tu hogar' }],
      s: { en: 'Wounds The Fog', es: 'Hiere a La Niebla' } },
    { t: { en: 'Smart Day', es: 'D\u00eda Inteligente' },
      m: [{ en: 'Configure each new tool as an activity on Smart Day', es: 'Configura cada herramienta como actividad en D\u00eda Inteligente' },
          { en: 'Return to the Limits card in your Station', es: 'Vuelve a la tarjeta de L\u00edmites en tu Estaci\u00f3n' },
          { en: 'Build your Favorite Day \u2014 you win when you have one', es: 'Construye tu D\u00eda Favorito \u2014 ganas cuando lo tengas' }],
      s: { en: 'Starves El Gris', es: 'Mata de hambre a El Gris' } },
    { t: { en: 'The TODOS Pill', es: 'La P\u00edldora TODOS' },
      m: [{ en: 'Tap the TODOS pill', es: 'Toca la p\u00edldora TODOS' },
          { en: 'Drop something real in the bucket \u2014 let Doc B read it', es: 'Deja algo real en el balde \u2014 que Doc B lo lea' },
          { en: 'Kill your first todo', es: 'Elimina tu primer pendiente' }],
      s: { en: 'Wounds The Pile', es: 'Hiere a El Mont\u00f3n' } },
    { t: { en: 'The TRUST Pill', es: 'La P\u00edldora TRUST' },
      m: [{ en: 'Tap the TRUST pill', es: 'Toca la p\u00edldora TRUST' },
          { en: 'Meet the trust breakers \u2014 know their faces', es: 'Conoce a los rompe-confianza \u2014 aprende sus caras' },
          { en: 'Restore trust with Doc B AI \u2014 your first repair', es: 'Restaura la confianza con Doc B AI \u2014 tu primera reparaci\u00f3n' }],
      s: { en: 'Bars The Violator', es: 'Detiene a El Transgresor' } },
    { t: { en: 'Studio Create', es: 'Studio Create' },
      m: [{ en: 'Enter Studio Create', es: 'Entra a Studio Create' },
          { en: 'Drop your idea in La Batea', es: 'Deja tu idea en La Batea' },
          { en: 'Publish your first Window', es: 'Publica tu primera Ventana' }],
      s: { en: 'Deep wound to The Fog', es: 'Herida profunda a La Niebla' } },
    { t: { en: 'Studio & Gallery', es: 'Studio y Galer\u00eda' },
      m: [{ en: 'Walk your Studio \u2014 your works on the wall', es: 'Recorre tu Studio \u2014 tus obras en la pared' },
          { en: 'Show your work in the Gallery', es: 'Muestra tu obra en la Galer\u00eda' },
          { en: 'Meet another creator', es: 'Conoce a otro creador' }],
      s: { en: 'Thaws The Cold Shoulder', es: 'Derrite a El Desaire' } },
    { t: { en: 'The Creator Family', es: 'La Familia de Creadores' },
      m: [{ en: 'Gather your creator family', es: 'Re\u00fane a tu familia de creadores' },
          { en: 'Form your atelier \u2014 create together', es: 'Forma tu atelier \u2014 creen juntos' },
          { en: 'The FAMILY pill awakens when you arrive', es: 'La p\u00edldora FAMILIA despierta cuando llegues' }],
      s: { en: 'El Gris cannot survive a family of creators', es: 'El Gris no sobrevive a una familia de creadores' } }
  ];

  var open = false, lastJson = '', pushBusy = false;

  function lang() {
    try {
      if (document.body && document.body.className.indexOf('lang-es') !== -1) { return 'es'; }
      return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en';
    } catch (e) { return 'en'; }
  }
  function T(o) { return o[lang()] || o.en; }
  function state() {
    try { var r = localStorage.getItem(KEY); if (!r) { return null; }
      var p = JSON.parse(r); return (p && p.hero) ? p : null;
    } catch (e) { return null; }
  }
  function creds() {
    try { var s = localStorage.getItem(SKEY), m = localStorage.getItem(MKEY);
      if (s && m) { return { sessionId: s, memberId: m }; } } catch (e) {}
    return null;
  }
  function saveState(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {} }
  function push(p) {
    var c = creds(); if (!c || pushBusy) { return; }
    pushBusy = true;
    try {
      var pr = fetch(GAMES_URL, { method: 'POST', body: JSON.stringify({
        action: 'lifeSaveState', sessionId: c.sessionId, memberId: c.memberId,
        level: p.level, missionsJson: JSON.stringify(p.missions || {})
      }) });
      if (pr && pr['catch']) { pr['catch'](function () {}); }
    } catch (e) {}
    setTimeout(function () { pushBusy = false; }, 1200);
  }
  function heroArt(hero) {
    try { if (window.LifeArt) { var u = window.LifeArt.get('hero.' + hero); if (u) { return u; } } } catch (e) {}
    return '';
  }
  function css() {
    if (document.getElementById('lcCss')) { return; }
    var s = document.createElement('style'); s.id = 'lcCss';
    s.textContent = ''
      + '#lcChip{position:fixed;right:12px;bottom:88px;z-index:2300000;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:8px;background:rgba(6,8,12,.95);border:2px solid #c8a84b;border-radius:999px;padding:6px 14px 6px 6px;box-shadow:0 4px 18px rgba(0,0,0,.6);cursor:pointer;font-family:Cinzel,serif;}'
      + '#lcChip img,#lcChip .lcPh{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #ffd75e;}'
      + '#lcChip .lcPh{background:#10141b;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;color:#ffd75e;font-weight:900;font-size:17px;}'
      + '#lcChip .lcLvl{font-size:13px;letter-spacing:.1em;color:#ffd75e;}'
      + '#lcCard{position:fixed;right:12px;bottom:150px;z-index:2300001;width:330px;max-width:94vw;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:14px 16px;box-shadow:0 8px 30px rgba(0,0,0,.8);font-family:\'Cormorant Garamond\',Georgia,serif;display:none;}'
      + '#lcCard.on{display:block;}'
      + '.lcKick{font-family:Cinzel,serif;font-size:11px;letter-spacing:.22em;color:#c8a84b;margin:0 0 4px;}'
      + '.lcTitle{font-family:Cinzel,serif;font-size:18px;color:#f0e6cc;margin:0 0 10px;}'
      + '.lcRow{display:-webkit-flex;display:flex;-webkit-align-items:flex-start;align-items:flex-start;gap:10px;margin:0 0 9px;cursor:pointer;}'
      + '.lcChk{min-width:34px;min-height:34px;border-radius:8px;border:2px solid #c8a84b;background:none;color:#ffd75e;font-size:16px;line-height:1;}'
      + '.lcChk.on{background:#c8a84b;color:#040608;}'
      + '.lcTxt{font-size:16px;color:#f0e6cc;line-height:1.35;padding-top:5px;}'
      + '.lcStakes{font-style:italic;font-size:15px;color:#c8a84b;margin:4px 0 10px;}'
      + '.lcBtn{display:inline-block;background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;padding:10px 16px;min-height:42px;text-decoration:none;cursor:pointer;}'
      + '.lcGhost{background:none;border:none;color:#8a7b52;font-family:Cinzel,serif;font-size:11px;letter-spacing:.12em;cursor:pointer;padding:10px 6px;min-height:42px;}';
    document.head.appendChild(s);
  }
  function toggleOrder(i) {
    var p = state(); if (!p) { return; }
    var lvl = Math.max(1, Math.min(7, Number(p.level) || 1));
    if (!p.missions) { p.missions = {}; }
    if (!p.missions[lvl]) { p.missions[lvl] = [false, false, false]; }
    p.missions[lvl][i] = !p.missions[lvl][i];
    saveState(p); push(p); lastJson = ''; render();
  }
  var waitingKind = '';   /* '' | 'absence' | 'encouragement' | 'letter' */
  function sagaFetch() {
    var c = creds(); if (!c) { return; }
    try {
      var pr = fetch(GAMES_URL, { method: 'POST', body: JSON.stringify({
        action: 'lifeSaga', sessionId: c.sessionId, memberId: c.memberId, limit: 1
      }) });
      pr.then(function (r) { return r.json(); }).then(function (d) {
        if (!d || !d.success || !d.chapters || !d.chapters.length) { return; }
        var ch = d.chapters[0];
        var seen = ''; try { seen = localStorage.getItem('4laws-saga-seen') || ''; } catch (e) {}
        var isNew = ch.createdAt && ch.createdAt > seen;
        var relevant = (ch.kind === 'absence' || ch.kind === 'encouragement');
        waitingKind = (isNew && relevant) ? (ch.depth === 3 ? 'letter' : 'waiting') : '';
        lastJson = ''; render();
      })['catch'](function () {});
    } catch (e) {}
  }
  function render() {
    var st = state();
    var chip = document.getElementById('lcChip');
    var card = document.getElementById('lcCard');
    if (!st) { herald(chip, card); return; }
    var lvl = Math.max(1, Math.min(7, Number(st.level) || 1));
    var m = (st.missions && st.missions[lvl]) || [false, false, false];
    var j = JSON.stringify([st.hero, lvl, m, lang(), open]);
    if (j === lastJson && chip) { return; }
    lastJson = j;
    css();
    var isMaster = (Number(st.level) || 1) > 7;
    var done = 0; for (var i = 0; i < m.length; i++) { if (m[i]) { done++; } }
    var art = heroArt(st.hero);
    var hn = HERO_NAMES[st.hero] ? T(HERO_NAMES[st.hero]) : 'HERO';
    var face = art ? '<img src="' + art + '" alt="">' : '<span class="lcPh">' + hn.charAt(0) + '</span>';
    if (!chip) {
      chip = document.createElement('div'); chip.id = 'lcChip';
      chip.onclick = function () { open = !open; lastJson = ''; render(); };
      document.body.appendChild(chip);
    }
    chip.innerHTML = face + '<span class="lcLvl">' + (lang() === 'es' ? 'NIVEL ' : 'LVL ') + lvl + (isMaster ? '' : ' \u00b7 ' + done + '/3') + '</span>';
    if (!card) { card = document.createElement('div'); card.id = 'lcCard'; document.body.appendChild(card); }
    var h = '<p class="lcKick">' + hn + ' \u00b7 LIFE</p>';
    if (isMaster) {
      h += '<p class="lcTitle">' + T({ en: 'Master of the 4 Laws', es: 'Maestro de las 4 Leyes' }) + '</p>';
    } else {
      var L = LV[lvl - 1];
      h += '<p class="lcTitle">' + T({ en: 'Level ', es: 'Nivel ' }) + lvl + ' \u00b7 ' + T(L.t) + '</p>';
      for (var k = 0; k < 3; k++) {
        h += '<div class="lcRow" onclick="LifeCompanion.toggle(' + k + ')">'
          + '<button class="lcChk' + (m[k] ? ' on' : '') + '">' + (m[k] ? '\u2713' : '') + '</button>'
          + '<span class="lcTxt">' + T(L.m[k]) + '</span></div>';
      }
      h += '<p class="lcStakes">' + T(L.s) + ' \u00b7 ' + T({ en: 'check only what is TRUE', es: 'marca solo lo VERDADERO' }) + '</p>';
    }
    if (waitingKind) {
      var wLine = (waitingKind === 'letter')
        ? T({ en: '\u2709 Doc B wrote you a letter', es: '\u2709 Doc B te escribi\u00f3 una carta' })
        : T({ en: '\uD83D\uDCD6 A chapter is waiting', es: '\uD83D\uDCD6 Un cap\u00edtulo te espera' });
      h += '<p class="lcStakes" style="color:#ffd75e;">' + wLine + '</p>';
    }
    h += '<a class="lcBtn" href="/life">' + T({ en: 'OPEN THE HALL \u2192', es: 'ABRE EL SAL\u00d3N \u2192' }) + '</a> '
      + '<button class="lcGhost" onclick="LifeCompanion.close()">' + T({ en: 'CLOSE', es: 'CERRAR' }) + '</button>';
    card.innerHTML = h;
    card.className = open ? 'on' : '';
  }
  /* THE HERALD: signed-in, no game yet -> one standing invitation, never a nag */
  function herald(chip, card) {
    var declined = '';
    try { declined = localStorage.getItem('lc-herald-declined') || ''; } catch (e) {}
    if (!creds() || declined) {
      if (chip) { chip.parentNode.removeChild(chip); }
      if (card) { card.parentNode.removeChild(card); }
      lastJson = ''; return;
    }
    var j = 'herald|' + lang() + '|' + open;
    if (j === lastJson && chip) { return; }
    lastJson = j; css();
    if (!chip) {
      chip = document.createElement('div'); chip.id = 'lcChip';
      chip.onclick = function () { open = !open; lastJson = ''; render(); };
      document.body.appendChild(chip);
    }
    chip.innerHTML = '<span class="lcPh">\u2694</span><span class="lcLvl">LIFE</span>';
    if (!card) { card = document.createElement('div'); card.id = 'lcCard'; document.body.appendChild(card); }
    card.innerHTML = '<p class="lcKick">LIFE \u00b7 ' + T({ en: 'THE TRAINING GAME', es: 'EL JUEGO DE ENTRENAMIENTO' }) + '</p>'
      + '<p class="lcTitle">' + T({ en: 'Your training awaits', es: 'Tu entrenamiento te espera' }) + '</p>'
      + '<p class="lcTxt" style="display:block;padding:0;margin:0 0 10px;">' + T({ en: 'Doc B will read your file and name the enemy in your life \u2014 then the law names your hero.', es: 'Doc B leer\u00e1 tu expediente y nombrar\u00e1 al enemigo de tu vida \u2014 luego la ley nombra a tu h\u00e9roe.' }) + '</p>'
      + '<a class="lcBtn" href="/life">' + T({ en: 'BEGIN AT THE HALL \u2192', es: 'COMIENZA EN EL SAL\u00d3N \u2192' }) + '</a> '
      + '<button class="lcGhost" onclick="LifeCompanion.decline()">' + T({ en: 'NOT NOW', es: 'AHORA NO' }) + '</button>';
    card.className = open ? 'on' : '';
  }
  /* the bloom: arriving with unfinished orders, the card opens itself once per visit */
  function bloom() {
    try {
      if (sessionStorage.getItem('lc-bloomed')) { return; }
      var st = state(); if (!st) { return; }
      var lvl = Math.max(1, Math.min(7, Number(st.level) || 1));
      var m = (st.missions && st.missions[lvl]) || [false, false, false];
      var done = 0; for (var i = 0; i < m.length; i++) { if (m[i]) { done++; } }
      if (done < 3) { open = true; sessionStorage.setItem('lc-bloomed', '1'); lastJson = ''; render(); }
    } catch (e) {}
  }
  function boot() {
    render(); setTimeout(bloom, 900); setTimeout(sagaFetch, 1300);
    setInterval(function () { lastJson = ''; render(); }, 45000);
    try {
      document.addEventListener('visibilitychange', function () { if (!document.hidden) { lastJson = ''; render(); } });
      window.addEventListener('focus', function () { lastJson = ''; render(); sagaFetch(); });
    } catch (e) {}
  }
  window.LifeCompanion = {
    refresh: function () { lastJson = ''; render(); },
    toggle: toggleOrder,
    close: function () { open = false; lastJson = ''; render(); },
    decline: function () { try { localStorage.setItem('lc-herald-declined', '1'); } catch (e) {} open = false; lastJson = ''; render(); }
  };
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); }
  else { boot(); }
})();
