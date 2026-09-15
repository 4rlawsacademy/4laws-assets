/* ═══ belt.js v1.0 THE BELT (Bench 40, Tue 9/15/26; THE ARMORY CARD §3 + §3b, cut 3).
 * One organ, one belt, everywhere. A small emblem — the member's own image — floats on
 * every page of the house that carries this line. Drag it where you like; it remembers its
 * spot on this device. Tap it and the seven fan out around it (a soft drift, never a pop);
 * tap away and they fold. Tap a weapon and it FIRES THERE: on a page that hosts the room
 * (PWS Talent, /todos) the weapon's room opens over the page; a weapon that is a page or a
 * wall simply opens; on a page with no room the belt says so and carries the member to the
 * weapon's home. Drop a file on the emblem and the page's chainsaw draws first — Grandpa on
 * /todos, Bruno on PWS Talent; on a page with no bucket the belt says so.
 *
 * THE ROW: the member's own equip row 'belt' (the same road every window config rides:
 * pwsGetEquipAll / pwsSaveEquip on the Main deploy) —
 *   { tools: [{ key, name, kind: 'tool'|'page', url?, home: 'talent'|'todos'|'' }], pins: [key],
 *     proposed: true|false, updatedAt }
 * THE BELT HOLDS SEVEN. The page that owns the wall (PWS Talent) proposes and edits the row;
 * this organ reads it, shows it, fires it. A page may register a host:
 *   window.BeltHost = { fire: function(item) -> true if handled,
 *                       drop: function(files) -> true if handled,
 *                       name: 'talent' }
 * Without a host, the organ falls back to the fleet's known doors (tdGrandpaFiles_ on /todos).
 *
 * SHELL LINE (one per page, after the other organs):
 *   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/belt.js"></script>
 * IMAGE: window.PWS_ARMORY_IMAGES.belt (set by the shell), else the organ's own buckle.
 * ═══ */
(function () {
  'use strict';
  if (window.Belt) { return; }

  var DEPLOY_URL = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var SESSION_KEY = '4laws-session', MEMBER_KEY = '4laws-member-id';
  var POS_KEY = '4laws-belt-pos';
  var MAX = 7;
  var HOMES = { talent: '/pws', todos: '/todos', arsenal: '/arsenal' };

  var _row = null, _open = false, _loaded = false;
  var _session = '', _memberId = '';
  try { _session = localStorage.getItem(SESSION_KEY) || ''; _memberId = localStorage.getItem(MEMBER_KEY) || ''; } catch (e) {}

  function lang() { try { return (document.documentElement.lang || '').slice(0, 2) === 'es' ? 'es' : ((window._lang === 'es') ? 'es' : 'en'); } catch (e) { return 'en'; } }
  function T(en, es) { return lang() === 'es' ? es : en; }
  function post(payload) {
    return fetch(DEPLOY_URL, { method: 'POST', body: JSON.stringify(payload) }).then(function (r) { return r.json(); });
  }

  /* ── the row ── */
  function normalize(raw) {
    var r = raw; if (typeof r === 'string') { try { r = JSON.parse(r); } catch (e) { r = null; } }
    if (!r || typeof r !== 'object') return { tools: [], pins: [], proposed: false };
    var tools = Array.isArray(r.tools) ? r.tools.filter(function (t) { return t && t.key && t.name; }).slice(0, MAX) : [];
    return { tools: tools, pins: Array.isArray(r.pins) ? r.pins : [], proposed: !!r.proposed, updatedAt: r.updatedAt || '' };
  }
  function load(cb) {
    if (!_session || !_memberId) { _row = { tools: [], pins: [], proposed: false }; _loaded = true; if (cb) cb(_row); return; }
    post({ action: 'pwsGetEquipAll', sessionId: _session, requestingMemberId: _memberId }).then(function (d) {
      var c = null;
      if (d && d.status === 'ok') { c = (d.data && d.data.belt) || (d.legacy && d.legacy.belt) || null; }
      _row = normalize(c); _loaded = true; if (cb) cb(_row);
    })['catch'](function () { _row = _row || { tools: [], pins: [], proposed: false }; _loaded = true; if (cb) cb(_row); });
  }
  function save(row) {
    _row = normalize(row); _row.updatedAt = new Date().toISOString();
    render();
    if (!_session || !_memberId) return Promise.resolve(null);
    return post({ action: 'pwsSaveEquip', sessionId: _session, requestingMemberId: _memberId, activityName: 'belt', config: _row });
  }

  /* ── the emblem ── */
  var css = ''
    + '#beltRoot{position:fixed;z-index:9400;left:auto;right:18px;bottom:96px;width:64px;height:64px;touch-action:none;}'
    + '#beltEmblem{width:64px;height:64px;border-radius:50%;border:2px solid #c8a84b;box-shadow:0 6px 24px rgba(0,0,0,0.6),0 0 0 3px rgba(4,6,8,0.85);background:#1a1408 center/cover no-repeat;cursor:grab;user-select:none;-webkit-user-select:none;transition:transform .25s ease;}'
    + '#beltEmblem:active{cursor:grabbing;}'
    + '#beltRoot.open #beltEmblem{transform:scale(1.08);}'
    + '#beltRoot.over #beltEmblem{box-shadow:0 0 0 6px rgba(200,168,75,0.45),0 6px 24px rgba(0,0,0,0.6);}'
    + '#beltFan{position:absolute;left:32px;top:32px;width:0;height:0;pointer-events:none;}'
    + '.belt-item{position:absolute;left:-58px;top:-24px;width:116px;padding:10px 10px;border-radius:8px;background:rgba(4,6,8,0.96);border:1px solid rgba(200,168,75,0.5);color:#f0e6cc;font-family:"Cormorant Garamond",Georgia,serif;font-size:15px;line-height:1.15;text-align:center;cursor:pointer;opacity:0;transform:translate(0,0) scale(.6) rotate(-8deg);transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .35s ease;pointer-events:none;box-shadow:0 6px 18px rgba(0,0,0,.55);}'
    + '.belt-item .belt-kind{display:block;font-family:Cinzel,serif;font-size:9px;letter-spacing:.16em;color:#c8a84b;margin-bottom:3px;}'
    + '.belt-item.pinned{border-color:#c8a84b;}'
    + '#beltRoot.open .belt-item{opacity:1;pointer-events:auto;transform:translate(var(--bx),var(--by)) scale(1) rotate(0deg);}'
    + '#beltRoot.open .belt-item:hover{background:rgba(200,168,75,0.14);}'
    + '.belt-empty{position:absolute;left:-90px;top:-20px;width:180px;color:rgba(240,230,204,.85);font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:15px;text-align:center;background:rgba(4,6,8,.96);border:1px solid rgba(200,168,75,.4);border-radius:8px;padding:10px;opacity:0;pointer-events:none;transition:opacity .35s;}'
    + '#beltRoot.open .belt-empty{opacity:1;pointer-events:auto;}'
    + '#beltSay{position:fixed;z-index:9401;left:50%;bottom:24px;transform:translateX(-50%);max-width:min(92vw,520px);background:rgba(4,6,8,.96);border:1px solid rgba(200,168,75,.5);color:#f0e6cc;font-family:"Cormorant Garamond",Georgia,serif;font-size:17px;padding:12px 18px;border-radius:8px;opacity:0;pointer-events:none;transition:opacity .3s;text-align:center;}'
    + '#beltSay.on{opacity:1;}'
    + '@media (max-width:640px){#beltRoot{right:12px;bottom:88px;width:56px;height:56px;}#beltEmblem{width:56px;height:56px;}#beltFan{left:28px;top:28px;}}';

  var root, emblem, fan, sayEl, sayTimer;
  function say(text, ms) {
    if (!sayEl) { sayEl = document.createElement('div'); sayEl.id = 'beltSay'; document.body.appendChild(sayEl); }
    sayEl.textContent = text; sayEl.classList.add('on');
    clearTimeout(sayTimer); sayTimer = setTimeout(function () { sayEl.classList.remove('on'); }, ms || 4200);
  }
  function build() {
    if (root) return;
    var st = document.createElement('style'); st.id = 'beltCss'; st.appendChild(document.createTextNode(css)); document.head.appendChild(st);
    root = document.createElement('div'); root.id = 'beltRoot';
    emblem = document.createElement('div'); emblem.id = 'beltEmblem'; emblem.title = T('Your belt', 'Tu cinturón');
    var img = (window.PWS_ARMORY_IMAGES && window.PWS_ARMORY_IMAGES.belt) || '';
    if (img) { emblem.style.backgroundImage = 'url(' + JSON.stringify(img) + ')'; }
    else { emblem.style.backgroundImage = "url(\"data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#1a1408"/><rect x="8" y="26" width="48" height="12" rx="3" fill="#5a3a12" stroke="#c8a84b" stroke-width="1.5"/><rect x="27" y="23" width="10" height="18" rx="2" fill="none" stroke="#c8a84b" stroke-width="2"/><circle cx="16" cy="32" r="1.6" fill="#c8a84b"/><circle cx="48" cy="32" r="1.6" fill="#c8a84b"/></svg>') + "\")"; }
    fan = document.createElement('div'); fan.id = 'beltFan';
    root.appendChild(emblem); root.appendChild(fan); document.body.appendChild(root);
    /* remembered spot on this device */
    try { var p = JSON.parse(localStorage.getItem(POS_KEY) || 'null'); if (p && typeof p.x === 'number') { placeAt(p.x, p.y); } } catch (e) {}
    wireDrag(); wireDrop();
    emblem.addEventListener('click', function (e) { if (_dragged) { _dragged = false; return; } toggle(); });
    document.addEventListener('click', function (e) { if (_open && !root.contains(e.target)) { setOpen(false); } }, true);
  }
  function placeAt(x, y) {
    var w = root.offsetWidth || 64, h = root.offsetHeight || 64;
    x = Math.max(4, Math.min(window.innerWidth - w - 4, x)); y = Math.max(4, Math.min(window.innerHeight - h - 4, y));
    root.style.left = x + 'px'; root.style.top = y + 'px'; root.style.right = 'auto'; root.style.bottom = 'auto';
  }
  var _dragged = false;
  function wireDrag() {
    var sx = 0, sy = 0, ox = 0, oy = 0, moving = false;
    function down(e) { var pt = e.touches ? e.touches[0] : e; sx = pt.clientX; sy = pt.clientY; var r = root.getBoundingClientRect(); ox = r.left; oy = r.top; moving = true; _dragged = false; }
    function move(e) { if (!moving) return; var pt = e.touches ? e.touches[0] : e; var dx = pt.clientX - sx, dy = pt.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 6) { _dragged = true; if (_open) setOpen(false); placeAt(ox + dx, oy + dy); if (e.cancelable) e.preventDefault(); } }
    function up() { if (!moving) return; moving = false; if (_dragged) { var r = root.getBoundingClientRect(); try { localStorage.setItem(POS_KEY, JSON.stringify({ x: r.left, y: r.top })); } catch (e) {} setTimeout(function () { _dragged = false; }, 50); } }
    emblem.addEventListener('mousedown', down); document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    emblem.addEventListener('touchstart', down, { passive: true }); document.addEventListener('touchmove', move, { passive: false }); document.addEventListener('touchend', up);
    window.addEventListener('resize', function () { var r = root.getBoundingClientRect(); if (root.style.left) placeAt(r.left, r.top); });
  }
  function wireDrop() {
    ['dragenter', 'dragover'].forEach(function (ev) { emblem.addEventListener(ev, function (e) { e.preventDefault(); e.stopPropagation(); root.classList.add('over'); }); });
    emblem.addEventListener('dragleave', function () { root.classList.remove('over'); });
    emblem.addEventListener('drop', function (e) {
      e.preventDefault(); e.stopPropagation(); root.classList.remove('over');
      var files = []; try { for (var i = 0; i < e.dataTransfer.files.length; i++) files.push(e.dataTransfer.files[i]); } catch (eF) {}
      if (!files.length) return;
      takeDrop(files);
    });
  }
  function takeDrop(files) {
    try { if (window.BeltHost && typeof window.BeltHost.drop === 'function' && window.BeltHost.drop(files)) { say(T('Drawn. The chainsaw has it.', 'Desenfundado. La motosierra lo tiene.')); return; } } catch (e) {}
    try { if (typeof window.tdGrandpaFiles_ === 'function') { window.tdGrandpaFiles_(files); say(T('Drawn. Doc B has it at the door.', 'Desenfundado. Doc B lo tiene en la puerta.')); return; } } catch (e2) {}
    say(T('No bucket on this page. Drop it on the TODOS door or on Bruno.', 'No hay cubeta en esta página. Suéltalo en la puerta de TODOS o con Bruno.'), 5200);
  }

  /* ── the fan ── */
  function setOpen(on) { _open = !!on; root.classList.toggle('open', _open); if (_open) render(); }
  function toggle() { setOpen(!_open); }
  function render() {
    if (!fan) return;
    fan.innerHTML = '';
    var tools = (_row && _row.tools) ? _row.tools : [];
    if (!tools.length) {
      var emp = document.createElement('div'); emp.className = 'belt-empty';
      emp.textContent = _loaded ? T('Your belt is empty. Arm it in Tools & Entertainment.', 'Tu cinturón está vacío. Ármalo en Herramientas y Entretenimiento.') : T('Reading your belt…', 'Leyendo tu cinturón…');
      emp.addEventListener('click', function () { window.location.href = HOMES.talent; });
      fan.appendChild(emp); return;
    }
    /* which way to fan: away from the nearest edges */
    var r = root.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var toLeft = cx > window.innerWidth / 2, toUp = cy > window.innerHeight / 2;
    var n = tools.length, radius = 112, start = toLeft ? (toUp ? 180 : 180) : (toUp ? 0 : 0);
    tools.forEach(function (t, i) {
      var el = document.createElement('div'); el.className = 'belt-item' + ((_row.pins || []).indexOf(t.key) !== -1 ? ' pinned' : '');
      var ang; /* spread over a quarter-to-half circle pointing into the page */
      var span = 100, base = toLeft ? (toUp ? 190 : 170) : (toUp ? -10 : 10);
      ang = (base + (toLeft ? -1 : 1) * (toUp ? 1 : -1) * ((n === 1) ? span / 2 : (i * span / (n - 1)))) * Math.PI / 180;
      var bx = Math.cos(ang) * radius, by = Math.sin(ang) * radius;
      el.style.setProperty('--bx', bx.toFixed(1) + 'px'); el.style.setProperty('--by', by.toFixed(1) + 'px');
      el.style.transitionDelay = (i * 45) + 'ms';
      var k = document.createElement('span'); k.className = 'belt-kind'; k.textContent = t.kind === 'page' ? T('OPEN', 'ABRIR') : T('FIRE', 'DISPARAR');
      el.appendChild(k); el.appendChild(document.createTextNode(t.name));
      el.addEventListener('click', function (e) { e.stopPropagation(); fire(t); });
      fan.appendChild(el);
    });
  }
  function fire(t) {
    setOpen(false);
    try { if (window.BeltHost && typeof window.BeltHost.fire === 'function' && window.BeltHost.fire(t)) return; } catch (e) {}
    if (t.kind === 'page' && t.url) { window.location.href = t.url; return; }
    var home = HOMES[t.home] || HOMES.talent;
    say(T('No room on this page — taking you to its home.', 'No hay sala en esta página; te llevo a su casa.'), 2600);
    setTimeout(function () { window.location.href = home + (home.indexOf('?') === -1 ? '?' : '&') + 'belt=' + encodeURIComponent(t.key); }, 700);
  }

  /* ── the organ's public hands (for the wall that owns the belt) ── */
  window.Belt = {
    load: load,
    row: function () { return _row; },
    save: save,
    has: function (key) { return !!(_row && _row.tools.some(function (t) { return t.key === key; })); },
    put: function (item) {
      var row = normalize(_row || {}); if (row.tools.some(function (t) { return t.key === item.key; })) return Promise.resolve(row);
      if (row.tools.length >= MAX) {
        /* one comes off: the last unpinned, never a pinned one */
        var idx = -1; for (var i = row.tools.length - 1; i >= 0; i--) { if (row.pins.indexOf(row.tools[i].key) === -1) { idx = i; break; } }
        if (idx === -1) { say(T('Seven pinned. Take one off the belt first.', 'Siete fijadas. Quita una del cinturón primero.')); return Promise.resolve(row); }
        row.tools.splice(idx, 1);
      }
      row.tools.push(item); row.proposed = false;
      return save(row);
    },
    remove: function (key) { var row = normalize(_row || {}); row.tools = row.tools.filter(function (t) { return t.key !== key; }); row.pins = row.pins.filter(function (k) { return k !== key; }); row.proposed = false; return save(row); },
    pin: function (key, on) { var row = normalize(_row || {}); row.pins = row.pins.filter(function (k) { return k !== key; }); if (on) row.pins.push(key); return save(row); },
    propose: function (items) { /* the wall proposes a whole belt when the member has none */ var row = normalize(_row || {}); if (row.tools.length) return Promise.resolve(row); row.tools = items.slice(0, MAX); row.proposed = true; return save(row); },
    say: say,
    open: function () { setOpen(true); },
    max: MAX
  };

  function boot() {
    if (!document.body) { setTimeout(boot, 60); return; }
    build();
    load(function () { render(); });
  }
  boot();
})();
