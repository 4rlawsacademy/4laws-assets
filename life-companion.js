/* ============================================================
   LIFE-COMPANION.JS v1.0.1 — THE COMPANION (Bench 28, 9/4/26)
   v1.0.1 (gate catch before first upload): HERO_NAMES en slots for
   resp and limits carried the Spanish names; now THE OWNER / THE
   GUARDIAN per the Hall's canonical HEROES array.
   The founder's field wound, verbatim: "I go to OPEN THE DOOR...
   I feel like I left the game." Cure: the game walks THROUGH the
   door with the member. A small standing chip on the real pages —
   the hero's coin, the level, the progress — that unfolds into the
   mission card and holds the road back to the Hall.
   Zero backend: reads the same localStorage state the Hall keeps
   ('lifeHallDemo'), same domain, always fresh (re-read on focus,
   on visibility, and every 45s). If the member has no game yet,
   NOTHING renders — the page stays exactly as it was.
   Art: uses window.LifeArt when the page loads life-art.js;
   otherwise a gold letter-coin stands in. Never breaks a page.
   ADOPTION (one line per real page, beside the sibling organs):
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/life-companion.js"></script>
   (life-art.js on the same page is optional but gives the true
   hero faces.)
   ============================================================ */
(function () {
  'use strict';
  if (window.LifeCompanion) { return; }

  var KEY = 'lifeHallDemo';
  var HERO_NAMES = {
    talent: { en: 'THE SPARK', es: 'LA CHISPA' },
    respect: { en: 'THE BRIDGE', es: 'EL PUENTE' },
    resp: { en: 'THE OWNER', es: 'EL DUE\u00d1O' },
    limits: { en: 'THE GUARDIAN', es: 'LA GUARDIANA' }
  };
  var LEVELS_MIN = [
    { en: 'Your Home', es: 'Tu Hogar' },
    { en: 'Smart Day', es: 'D\u00eda Inteligente' },
    { en: 'The TODOS Pill', es: 'La P\u00edldora TODOS' },
    { en: 'The TRUST Pill', es: 'La P\u00edldora TRUST' },
    { en: 'Studio Create', es: 'Studio Create' },
    { en: 'Studio & Gallery', es: 'Studio y Galer\u00eda' },
    { en: 'The Creator Family', es: 'La Familia de Creadores' }
  ];

  var open = false, lastJson = '';

  function lang() {
    try {
      if (document.body && document.body.className.indexOf('lang-es') !== -1) { return 'es'; }
      return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en';
    } catch (e) { return 'en'; }
  }
  function T(o) { return o[lang()] || o.en; }
  function state() {
    try {
      var r = localStorage.getItem(KEY);
      if (!r) { return null; }
      var p = JSON.parse(r);
      return (p && p.hero) ? p : null;
    } catch (e) { return null; }
  }
  function heroArt(hero) {
    try {
      if (window.LifeArt) {
        var u = window.LifeArt.get('hero.' + hero);
        if (u) { return u; }
      }
    } catch (e) {}
    return '';
  }
  function css() {
    if (document.getElementById('lcCss')) { return; }
    var s = document.createElement('style'); s.id = 'lcCss';
    s.textContent = ''
      + '#lcChip{position:fixed;left:12px;bottom:88px;z-index:2300000;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:8px;background:rgba(6,8,12,.95);border:2px solid #c8a84b;border-radius:999px;padding:6px 14px 6px 6px;box-shadow:0 4px 18px rgba(0,0,0,.6);cursor:pointer;font-family:Cinzel,serif;}'
      + '#lcChip img,#lcChip .lcPh{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #ffd75e;}'
      + '#lcChip .lcPh{background:#10141b;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;color:#ffd75e;font-weight:900;font-size:17px;}'
      + '#lcChip .lcLvl{font-size:13px;letter-spacing:.1em;color:#ffd75e;}'
      + '#lcCard{position:fixed;left:12px;bottom:150px;z-index:2300001;width:290px;max-width:92vw;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:14px 16px;box-shadow:0 8px 30px rgba(0,0,0,.8);font-family:\'Cormorant Garamond\',Georgia,serif;display:none;}'
      + '#lcCard.on{display:block;}'
      + '.lcKick{font-family:Cinzel,serif;font-size:11px;letter-spacing:.22em;color:#c8a84b;margin:0 0 4px;}'
      + '.lcTitle{font-family:Cinzel,serif;font-size:19px;color:#f0e6cc;margin:0 0 6px;}'
      + '.lcProg{font-size:17px;color:#ffd75e;margin:0 0 10px;}'
      + '.lcBtn{display:inline-block;background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:13px;letter-spacing:.1em;padding:10px 18px;min-height:44px;text-decoration:none;cursor:pointer;}'
      + '.lcGhost{background:none;border:none;color:#8a7b52;font-family:Cinzel,serif;font-size:11px;letter-spacing:.12em;cursor:pointer;padding:10px 6px;min-height:44px;}';
    document.head.appendChild(s);
  }
  function render() {
    var st = state();
    var chip = document.getElementById('lcChip');
    var card = document.getElementById('lcCard');
    if (!st) {
      if (chip) { chip.parentNode.removeChild(chip); }
      if (card) { card.parentNode.removeChild(card); }
      lastJson = '';
      return;
    }
    var j = JSON.stringify([st.hero, st.level, st.missions && st.missions[st.level]]);
    if (j === lastJson && chip) { return; }
    lastJson = j;
    css();
    var lvl = Math.max(1, Math.min(7, Number(st.level) || 1));
    var done = 0, m = (st.missions && st.missions[lvl]) || [];
    for (var i = 0; i < m.length; i++) { if (m[i]) { done++; } }
    var art = heroArt(st.hero);
    var hn = HERO_NAMES[st.hero] ? T(HERO_NAMES[st.hero]) : 'HERO';
    var face = art ? '<img src="' + art + '" alt="">' : '<span class="lcPh">' + hn.charAt(0) + '</span>';
    if (!chip) {
      chip = document.createElement('div'); chip.id = 'lcChip';
      chip.onclick = function () { open = !open; document.getElementById('lcCard').className = open ? 'on' : ''; };
      document.body.appendChild(chip);
    }
    chip.innerHTML = face + '<span class="lcLvl">' + (lang() === 'es' ? 'NIVEL ' : 'LVL ') + lvl + '</span>';
    if (!card) {
      card = document.createElement('div'); card.id = 'lcCard';
      document.body.appendChild(card);
    }
    var isMaster = (Number(st.level) || 1) > 7;
    card.innerHTML = '<p class="lcKick">' + hn + ' \u00b7 LIFE</p>'
      + '<p class="lcTitle">' + (isMaster ? T({ en: 'Master of the 4 Laws', es: 'Maestro de las 4 Leyes' }) : (T({ en: 'Level ', es: 'Nivel ' }) + lvl + ' \u00b7 ' + T(LEVELS_MIN[lvl - 1]))) + '</p>'
      + (isMaster ? '' : '<p class="lcProg">' + done + ' / 3 ' + T({ en: 'orders true', es: '\u00f3rdenes cumplidas' }) + '</p>')
      + '<a class="lcBtn" href="/life">' + T({ en: 'OPEN THE HALL \u2192', es: 'ABRE EL SAL\u00d3N \u2192' }) + '</a> '
      + '<button class="lcGhost" onclick="document.getElementById(\'lcCard\').className=\'\';">' + T({ en: 'CLOSE', es: 'CERRAR' }) + '</button>';
    card.className = open ? 'on' : '';
  }
  function boot() {
    render();
    setInterval(render, 45000);
    try {
      document.addEventListener('visibilitychange', function () { if (!document.hidden) { lastJson = ''; render(); } });
      window.addEventListener('focus', function () { lastJson = ''; render(); });
    } catch (e) {}
  }
  window.LifeCompanion = { refresh: function () { lastJson = ''; render(); } };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
