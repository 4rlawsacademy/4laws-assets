/* ═══ trust-belt-v1_0.js THE TRUST BELT (Bench 61, Tue 11/10/26; loaded by the PWS Talent page's code block, one script tag right after belt.js -- block v125_119; pairs with Main 361+, AUDIT 91, so the belts are counted from the facts). Reads the house's readerLook door: { status:'ok', reading:{ current, belts[], text, next, step } }. The founder's rulings of 11/10: the weapons belt's buckle on the left edge becomes the TRUST BELT -- "an icon of pride". The belt hero (his sheet of 11/10: one child, six belts, white to black) wears the member's belt on a portrait medal where the old buckle sat. Tap it: one card -- the hero full length in that belt, the belt's name, how it was earned, the reader's own line, what earns the next, and a door to the next step; a small door at the foot opens the old tools belt (belt.js stays loaded, its buckle hidden, its panel kept). THE ARRIVAL: when the reader says a belt is newly earned (mark:true writes it down and says it once), one warm line -- "You just earned your ORANGE belt." -- and house-arrows points once at the door that came with it (orange -> the TODOS medallion; green -> STUDIO; blue -> LIFE). No new pill: this takes the old one's seat. A stranger (no session) sees nothing. ═══ */
(function () {
  if (window.TrustBelt && window.TrustBelt.cut >= 1) return;
  var DEPLOY = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var SHEET = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/4bd76b61-ed53-498b-a106-4793adf58dcc/imgg-air-5egkz9v2.png?format=2500w';
  /* the six figures on the sheet, by the center of each, as a percent of the sheet's width */
  var CX = { white: 10.8, yellow: 26.7, orange: 42.5, green: 58.3, blue: 74.2, black: 90 };
  var ORDER = ['white', 'yellow', 'orange', 'green', 'blue', 'black'];
  var RING = { white: '#f2f2f2', yellow: '#ffe01a', orange: '#ffa31f', green: '#3aa655', blue: '#4a8cf5', black: '#2a2a2a' };
  var NAME = { white: ['White', 'Blanco'], yellow: ['Yellow', 'Amarillo'], orange: ['Orange', 'Naranja'], green: ['Green', 'Verde'], blue: ['Blue', 'Azul'], black: ['Black', 'Negro'] };
  var HOW = {
    white:  ['Your Favorite Day is built.', 'Tu Día Favorito está armado.'],
    yellow: ['A week of your Favorite Day, lived.', 'Una semana de tu Día Favorito, vivida.'],
    orange: ['Your todos, solved — not avoided.', 'Tus pendientes, resueltos — no evitados.'],
    green:  ['You made a Window. Something of yours exists.', 'Hiciste una Ventana. Algo tuyo existe.'],
    blue:   ['You passed the blue road: tone, importance, the line.', 'Pasaste el camino azul: el tono, la importancia, la línea.'],
    black:  ['You can name a broken law and enforce it.', 'Sabes nombrar una ley rota y hacerla cumplir.']
  };
  var NEXT = {
    white:  ['Next: yellow — a week of days.', 'Sigue: amarillo — una semana de días.'],
    yellow: ['Next: orange — solve three todos.', 'Sigue: naranja — resuelve tres pendientes.'],
    orange: ['Next: green — make your first Window.', 'Sigue: verde — haz tu primera Ventana.'],
    green:  ['Next: blue — the blue road of games.', 'Sigue: azul — el camino azul de juegos.'],
    blue:   ['Next: black — Battle Arena, then Law Enforcement.', 'Sigue: negro — la Arena, luego Hacer Cumplir la Ley.'],
    black:  ['Black. The belt stays. The practice goes on.', 'Negro. El cinturón se queda. La práctica sigue.']
  };
  /* the door that comes with each belt, for the one arrow */
  var DOOR = { orange: ['#pwsTodoFab', 'You just earned your TODOS.', 'Acabas de ganarte tus PENDIENTES.'], green: ['a[href="/studio"]', 'You just earned the STUDIO.', 'Acabas de ganarte el ESTUDIO.'], blue: ['a[href="/life"]', 'You just earned LIFE Hall.', 'Acabas de ganarte el Salón LIFE.'] };
  var root, medal, card, _data = null, _open = false;

  function lang() { try { return (document.documentElement.lang || '').slice(0, 2) === 'es' ? 'es' : ((window._lang === 'es') ? 'es' : 'en'); } catch (e) { return 'en'; } }
  function T(pair) { return lang() === 'es' ? pair[1] : pair[0]; }
  function key() { try { var s = localStorage.getItem('4laws-session'), m = localStorage.getItem('4laws-member-id'); return (s && m) ? { sessionId: s, requestingMemberId: m } : null; } catch (e) { return null; } }
  function look(mark) {
    var k = key(); if (!k) return Promise.resolve(null);
    var body = { action: 'readerLook', sessionId: k.sessionId, requestingMemberId: k.requestingMemberId, lang: lang(), mark: !!mark };
    return fetch(DEPLOY, { method: 'POST', body: JSON.stringify(body) }).then(function (r) { return r.json(); }).then(function (d) { /* the house answers { status:'ok', reading:{...} }; the reading is what we read */ return (d && d.status === 'ok' && d.reading) ? d.reading : null; }).catch(function () { return null; });
  }
  /* a crop of the sheet: one hero, head to feet (full) or head to belt (medal) */
  function hero(belt, w, h, full) {
    var cx = CX[belt] || CX.white;
    var bw = full ? 15 : 14;                     /* percent of the sheet's width */
    var y0 = full ? 27 : 29, y1 = full ? 71 : 56; /* percent of the sheet's height */
    var bh = y1 - y0, x0 = cx - bw / 2;
    var px = (x0 / (100 - bw)) * 100, py = (y0 / (100 - bh)) * 100;
    return '<span style="display:block;width:' + w + 'px;height:' + h + 'px;background:url(' + SHEET + ') no-repeat;background-size:' + (10000 / bw) + '% ' + (10000 / bh) + '%;background-position:' + px + '% ' + py + '%;border-radius:inherit;"></span>';
  }
  var css = '#trustBelt{position:fixed;z-index:9400;left:14px;bottom:132px;width:62px;height:88px;cursor:pointer;user-select:none;-webkit-user-select:none;}' +
    '#trustBeltMedal{width:62px;height:88px;border-radius:14px;border:3px solid #c8a84b;background:#fdf8ec;box-shadow:0 6px 24px rgba(0,0,0,0.6),0 0 0 3px rgba(4,6,8,0.85);overflow:hidden;transition:transform .25s ease;}' +
    '#trustBelt:hover #trustBeltMedal{transform:translateY(-2px) scale(1.04);}' +
    '#trustBeltCard{position:fixed;z-index:9401;left:84px;bottom:100px;width:min(340px,calc(100vw - 100px));padding:18px 18px 14px;border:1px solid #c8a84b;border-radius:14px;background:linear-gradient(180deg,#1b1508,#0f0b04 70%,#15100a);box-shadow:0 14px 44px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,233,168,0.25);color:#f0e6cc;font-family:Cormorant Garamond,Georgia,serif;display:none;}' +
    '#trustBeltCard.open{display:block;animation:tbIn .25s ease;}' +
    '@keyframes tbIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
    '#trustBeltCard .tb-x{position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(200,168,75,0.8);font-size:20px;cursor:pointer;line-height:1;}' +
    '#trustBeltCard .tb-top{display:flex;gap:14px;align-items:flex-end;}' +
    '#trustBeltCard .tb-hero{width:96px;height:150px;border-radius:12px;background:#fdf8ec;border:2px solid #c8a84b;overflow:hidden;flex:0 0 auto;}' +
    '#trustBeltCard .tb-name{font-family:Cinzel,serif;font-weight:700;font-size:24px;letter-spacing:0.08em;text-transform:uppercase;line-height:1.1;text-shadow:0 0 12px rgba(255,214,120,0.35);}' +
    '#trustBeltCard .tb-sub{font-family:Cinzel,serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(200,168,75,0.8);margin-bottom:6px;}' +
    '#trustBeltCard .tb-how{font-size:19px;font-style:italic;line-height:1.35;margin-top:6px;color:#f6e9c6;}' +
    '#trustBeltCard .tb-line{font-size:18px;line-height:1.4;margin:14px 0 0;color:rgba(240,230,204,0.9);}' +
    '#trustBeltCard .tb-next{font-size:18px;line-height:1.35;margin:12px 0 0;color:#ffe9a8;}' +
    '#trustBeltCard .tb-row{display:flex;gap:10px;margin-top:14px;align-items:center;}' +
    '#trustBeltCard .tb-btn{flex:1;min-height:44px;font-family:Cinzel,serif;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffe9a8;background:linear-gradient(180deg,#3a2c0f,#1a1408 55%,#2b2010);border:1px solid #c8a84b;border-radius:8px;cursor:pointer;text-decoration:none;display:flex;align-items:center;justify-content:center;padding:0 12px;text-align:center;}' +
    '#trustBeltCard .tb-tools{display:block;margin-top:12px;font-size:15px;letter-spacing:0.08em;color:rgba(200,168,75,0.7);background:none;border:none;cursor:pointer;text-decoration:underline;text-underline-offset:3px;font-family:Cormorant Garamond,Georgia,serif;}' +
    '#trustBeltCard .tb-ladder{display:flex;gap:6px;margin-top:12px;}' +
    '#trustBeltCard .tb-ladder span{flex:1;height:8px;border-radius:4px;border:1px solid rgba(200,168,75,0.35);opacity:0.28;}' +
    '#trustBeltCard .tb-ladder span.held{opacity:1;box-shadow:0 0 8px rgba(255,214,120,0.35);}' +
    '#trustBeltToast{position:fixed;z-index:9402;left:50%;bottom:92px;transform:translateX(-50%);max-width:min(420px,calc(100vw - 32px));padding:14px 20px;border:1px solid #c8a84b;border-radius:12px;background:linear-gradient(180deg,#2a2010,#120e06);color:#ffe9a8;font-family:Cormorant Garamond,Georgia,serif;font-size:21px;text-align:center;box-shadow:0 12px 36px rgba(0,0,0,0.65);animation:tbIn .4s ease;}' +
    '#beltRoot{display:none !important;}' +   /* the old buckle stands down; its panel stays for the tools door */
    '@media (max-width:640px){#trustBelt{left:10px;bottom:150px;width:50px;height:72px;}#trustBeltMedal{width:50px;height:72px;border-width:2px;}#trustBeltCard{left:12px;right:12px;width:auto;bottom:84px;}}';

  function build() {
    if (root) return;
    var st = document.createElement('style'); st.id = 'trustBeltCss'; st.appendChild(document.createTextNode(css)); document.head.appendChild(st);
    root = document.createElement('div'); root.id = 'trustBelt'; root.title = T(['Your Trust Belt', 'Tu Cinturón de Confianza']);
    medal = document.createElement('div'); medal.id = 'trustBeltMedal'; root.appendChild(medal);
    card = document.createElement('div'); card.id = 'trustBeltCard';
    document.body.appendChild(root); document.body.appendChild(card);
    root.addEventListener('click', function () { setOpen(!_open); });
    document.addEventListener('click', function (e) { if (_open && !root.contains(e.target) && !card.contains(e.target)) setOpen(false); }, true);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && _open) setOpen(false); });
  }
  function current() { return (_data && _data.current) ? _data.current : 'white'; }
  function renderMedal() {
    var b = current();
    medal.style.borderColor = RING[b] || '#c8a84b';
    medal.innerHTML = hero(b, medal.clientWidth || 62, medal.clientHeight || 88, false);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function renderCard() {
    var b = current(), es = lang() === 'es';
    var held = {}; (_data && _data.belts || []).forEach(function (x) { if (x.held) held[x.id] = true; }); if (!_data) held.white = true;
    var ladder = ORDER.map(function (id) { return '<span class="' + (held[id] ? 'held' : '') + '" style="background:' + RING[id] + '" title="' + esc(T(NAME[id])) + '"></span>'; }).join('');
    var step = _data && _data.step && _data.step.page ? _data.step : null;
    var line = (_data && _data.text) ? _data.text : '';
    card.innerHTML = '<button class="tb-x" aria-label="close">&#10005;</button>' +
      '<div class="tb-top"><div class="tb-hero">' + hero(b, 96, 150, true) + '</div><div>' +
      '<div class="tb-sub">' + esc(es ? 'Cinturón de Confianza' : 'Trust Belt') + '</div>' +
      '<div class="tb-name" style="color:' + (b === 'white' ? '#fff' : (b === 'black' ? '#e8e8e8' : RING[b])) + '">' + esc(T(NAME[b])) + '</div>' +
      '<div class="tb-how">' + esc(T(HOW[b])) + '</div></div></div>' +
      '<div class="tb-ladder">' + ladder + '</div>' +
      (line ? '<div class="tb-line">' + esc(line) + '</div>' : '') +
      '<div class="tb-next">' + esc(T(NEXT[b])) + '</div>' +
      (step ? '<div class="tb-row"><a class="tb-btn" href="' + esc(step.page) + '">' + esc(step.label || (es ? 'Ir' : 'Go')) + ' &rarr;</a></div>' : '') +
      '<button class="tb-tools">' + esc(es ? 'Mi cinturón de herramientas ▸' : 'My tools belt ▸') + '</button>';
    card.querySelector('.tb-x').onclick = function (e) { e.stopPropagation(); setOpen(false); };
    card.querySelector('.tb-tools').onclick = function (e) { e.stopPropagation(); setOpen(false); try { if (window.Belt && window.Belt.open) { var br = document.getElementById('beltRoot'); if (br) br.style.setProperty('display', 'block', 'important'); window.Belt.open(); } } catch (eB) {} };
  }
  function setOpen(on) { _open = !!on; if (_open) renderCard(); card.classList.toggle('open', _open); }
  function toast(text) {
    var t = document.getElementById('trustBeltToast'); if (t) t.parentNode.removeChild(t);
    t = document.createElement('div'); t.id = 'trustBeltToast'; t.textContent = text; document.body.appendChild(t);
    setTimeout(function () { try { t.style.transition = 'opacity .8s'; t.style.opacity = '0'; setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 900); } catch (e) {} }, 5200);
  }
  function arrival(newly) {
    /* one warm line for the highest belt that just arrived, and one arrow at its door */
    var top = null; ORDER.forEach(function (id) { if (newly.indexOf(id) !== -1) top = id; }); if (!top) return;
    var es = lang() === 'es';
    toast(es ? ('Acabas de ganarte el cinturón ' + NAME[top][1].toLowerCase() + '.') : ('You just earned your ' + NAME[top][0].toLowerCase() + ' belt.'));
    var d = DOOR[top]; if (!d) return;
    setTimeout(function () { try { if (window.HouseArrows && window.HouseArrows.pointOnce && document.querySelector(d[0])) window.HouseArrows.pointOnce(d[0], d[1], d[2]); } catch (e) {} }, 2600);
  }
  function boot() {
    if (!document.body) { setTimeout(boot, 60); return; }
    if (!key()) return;   /* a stranger sees nothing */
    build(); renderMedal();
    look(true).then(function (d) {
      if (!d || !d.belts) return;
      _data = d; renderMedal(); if (_open) renderCard();
      var newly = (d.belts || []).filter(function (x) { return x.newly; }).map(function (x) { return x.id; });
      if (newly.length) arrival(newly);
    });
  }
  window.TrustBelt = { v: '1.0', cut: 1, open: function () { setOpen(true); }, close: function () { setOpen(false); }, data: function () { return _data; }, refresh: function () { return look(false).then(function (d) { if (d && d.belts) { _data = d; renderMedal(); if (_open) renderCard(); } return d; }); } };
  boot();
})();
