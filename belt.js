/* ═══ belt.js v2.1 MY DAY (Bench 42, Sun 9/20/26): on phones the buckle's SHORTCUTS gain MY DAY / MI DÍA -- tap and the page jumps to the MY FAVORITE DAY card (window.pwsMyDayJump, pws-talent v91_91). Cumulative on v2.0. ═══ */
/* ═══ belt.js v2.0 SHORTCUTS (Bench 42, Sat 9/19/26): on phones the loose pills -- REMINDERS (#drFab), the piano (found by its 🎹),
 * the LVL chip (#lcChip) -- leave the screen and live under a SHORTCUTS title at the foot of the buckle's panel, as rows in the
 * weapons' dress; tap one and it does what the pill did. Desktops unchanged. TODOS and TRUST stay at the bottom. Cumulative on v1.9.
/* ═══ belt.js v1.9 FOUR FACES (Bench 42, Fri 9/18/26): the Talent face (equip row 'belt4': the Spark, the Patron, the Forge,
 * the Herald, Doc B AI). TURN THE BELT cycles Responsibility -> Respect -> Limits -> Talent; a 'talent' item fires the Talent
 * room on PWS Talent or carries the member there (/pws?talent=<key>). Cumulative on v1.8.
/* ═══ belt.js v1.8 THREE FACES (Bench 42, Fri 9/18/26): the Limits face (equip row 'belt3': the Surveyor, the Fence
 * Builder, Secret Agent, Doc B AI). TURN THE BELT cycles Responsibility -> Respect -> Limits; a 'limits' item fires the
 * Limits room on PWS Talent or carries the member there (/pws?limits=<key>). Cumulative on v1.7.
belt.js v1.7 TWO FACES (Bench 40, Wed 9/16/26 night): one buckle, two faces -- the Responsibility
 * face (equip row 'belt') and the Respect face (equip row 'belt2': the Vanisher, the Exposer, the Replacer, Doc B
 * AI). The panel opens on the face last used and carries a turn control; a 'respect' item fires the Respect room
 * on PWS Talent or carries the member there. Cumulative on v1.6.
 * belt.js v1.6 THE LEFT HAND (Bench 40, Wed 9/16/26): the buckle's home is the left edge above the piano
 * on every device -- on the phone it was hiding under the LVL chip on the right. Cumulative on v1.5.
 * belt.js v1.5 THE NAME JUMPS (Bench 40, Tue 9/15/26 night): move over a row and it grows and
 * brightens; rows are taller with the name on its own line. Cumulative on v1.4.
 * belt.js v1.4 THE PANEL (Bench 40, Tue 9/15/26 night): the column is now a fixed panel placed by
 * measured coordinates beside the buckle -- every row static, in a plain column, wide enough to read;
 * nothing can stack. Cumulative on v1.3.
 * belt.js v1.3 THE SEAL (Bench 40, Tue 9/15/26 evening): the column's rows wear gold, bold, larger names
 * and a lighter veil over a pictured row; the shell now loads this organ with a ?v= stamp so a new version
 * is never hidden behind the CDN's memory. Cumulative on v1.2.
 * belt.js v1.2 THE PICTURED ROW (Bench 40, Tue 9/15/26): a row whose item carries an image wears it
 * (an Arsenal weapon's own picture); a page item fires by opening its link anywhere. Cumulative on v1.1.
 * belt.js v1.1 THE COLUMN (Bench 40, Tue 9/15/26 afternoon): the radial fan stacked the seven on
 * top of each other -- unreadable. Now the belt opens as a column rising from the buckle (or falling
 * from it near the top of the screen), one row per weapon: FIRE / OPEN and the name, staggered in.
 * Cumulative on v1.0.
 * belt.js v1.0 THE BELT (Bench 40, Tue 9/15/26; THE ARMORY CARD §3 + §3b, cut 3).
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

  var _row = null, _row2 = null, _row3 = null, _row4 = null, _open = false, _loaded = false, _face = 'work';
  try { _face = localStorage.getItem('4laws-belt-face') || 'work'; } catch (e0) {}
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
    var tools = Array.isArray(r.tools) ? r.tools.filter(function (t) { return t && t.key && t.name; }).slice(0, MAX).map(function (t) { return { key: t.key, name: t.name, kind: t.kind || 'tool', url: t.url || '', image: t.image || '', home: t.home || '' }; }) : [];
    return { tools: tools, pins: Array.isArray(r.pins) ? r.pins : [], proposed: !!r.proposed, touched: !!r.touched, updatedAt: r.updatedAt || '' };
  }
  function load(cb) {
    if (!_session || !_memberId) { _row = { tools: [], pins: [], proposed: false }; _loaded = true; if (cb) cb(_row); return; }
    post({ action: 'pwsGetEquipAll', sessionId: _session, requestingMemberId: _memberId }).then(function (d) {
      var c = null;
      var c2 = null, c3 = null, c4 = null;
      if (d && d.status === 'ok') { c = (d.data && d.data.belt) || (d.legacy && d.legacy.belt) || null; c2 = (d.data && d.data.belt2) || (d.legacy && d.legacy.belt2) || null; c3 = (d.data && d.data.belt3) || (d.legacy && d.legacy.belt3) || null; c4 = (d.data && d.data.belt4) || (d.legacy && d.legacy.belt4) || null; }
      _row = normalize(c); _row2 = normalize(c2); if (c2 && typeof c2 === 'object' && c2.touched) _row2.touched = true; _row3 = normalize(c3); if (c3 && typeof c3 === 'object' && c3.touched) _row3.touched = true; _row4 = normalize(c4); if (c4 && typeof c4 === 'object' && c4.touched) _row4.touched = true; _loaded = true; if (cb) cb(_row);
    })['catch'](function () { _row = _row || { tools: [], pins: [], proposed: false }; _row2 = _row2 || { tools: [], pins: [], proposed: false }; _row3 = _row3 || { tools: [], pins: [], proposed: false }; _row4 = _row4 || { tools: [], pins: [], proposed: false }; _loaded = true; if (cb) cb(_row); });
  }
  function save2(row) {
    _row2 = normalize(row); _row2.updatedAt = new Date().toISOString(); _row2.touched = !!row.touched || !row.proposed;
    render();
    if (!_session || !_memberId) return Promise.resolve(null);
    return post({ action: 'pwsSaveEquip', sessionId: _session, requestingMemberId: _memberId, activityName: 'belt2', config: _row2 });
  }
  function save3(row) {
    _row3 = normalize(row); _row3.updatedAt = new Date().toISOString(); _row3.touched = !!row.touched || !row.proposed;
    render();
    if (!_session || !_memberId) return Promise.resolve(null);
    return post({ action: 'pwsSaveEquip', sessionId: _session, requestingMemberId: _memberId, activityName: 'belt3', config: _row3 });
  }
  function save4(row) {
    _row4 = normalize(row); _row4.updatedAt = new Date().toISOString(); _row4.touched = !!row.touched || !row.proposed;
    render();
    if (!_session || !_memberId) return Promise.resolve(null);
    return post({ action: 'pwsSaveEquip', sessionId: _session, requestingMemberId: _memberId, activityName: 'belt4', config: _row4 });
  }
  function setFace(f) { _face = (f === 'respect' || f === 'limits' || f === 'talent') ? f : 'work'; try { localStorage.setItem('4laws-belt-face', _face); } catch (e) {} render(); }
  function nextFace() { return _face === 'work' ? 'respect' : (_face === 'respect' ? 'limits' : (_face === 'limits' ? 'talent' : 'work')); }
  function save(row) {
    _row = normalize(row); _row.updatedAt = new Date().toISOString();
    render();
    if (!_session || !_memberId) return Promise.resolve(null);
    return post({ action: 'pwsSaveEquip', sessionId: _session, requestingMemberId: _memberId, activityName: 'belt', config: _row });
  }

  /* ── the emblem ── */
  var css = ''
    + '#beltRoot{position:fixed;z-index:9400;left:14px;right:auto;bottom:132px;width:64px;height:64px;touch-action:none;}'
    + '#beltEmblem{width:64px;height:64px;border-radius:50%;border:2px solid #c8a84b;box-shadow:0 6px 24px rgba(0,0,0,0.6),0 0 0 3px rgba(4,6,8,0.85);background:#1a1408 center/cover no-repeat;cursor:grab;user-select:none;-webkit-user-select:none;transition:transform .25s ease;}'
    + '#beltEmblem:active{cursor:grabbing;}'
    + '#beltRoot.open #beltEmblem{transform:scale(1.08);}'
    + '#beltRoot.over #beltEmblem{box-shadow:0 0 0 6px rgba(200,168,75,0.45),0 6px 24px rgba(0,0,0,0.6);}'
    + '#beltFan{position:absolute;left:32px;top:32px;width:0;height:0;pointer-events:none;}'
    + '#beltFan{width:220px;}'
    + '#beltFan.up{bottom:0;top:auto;left:auto;right:0;}'
    + '#beltFan.down{top:0;bottom:auto;left:auto;right:0;}'
    + '#beltFan.left{right:0;left:auto;}'
    + '#beltFan.rightside{left:0;right:auto;}'
    + '#beltPanel{position:fixed;z-index:9402;width:270px;display:none;flex-direction:column;gap:8px;pointer-events:none;}'
    + '#beltPanel.on{display:flex;}'
    + '#beltPanel .belt-item{position:relative !important;left:auto !important;top:auto !important;transform:none !important;width:100%;box-sizing:border-box;}'
    + '.belt-item{padding:11px 12px;border-radius:8px;background:rgba(4,6,8,0.96);border:1px solid rgba(200,168,75,0.5);color:#f2d98a;font-family:Cinzel,serif;font-size:14px;font-weight:700;letter-spacing:.06em;line-height:1.2;text-align:left;cursor:pointer;opacity:0;transform:translateY(10px) scale(.96);transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .3s ease;pointer-events:none;box-shadow:0 6px 18px rgba(0,0,0,.55);display:flex;align-items:baseline;gap:8px;text-shadow:0 2px 4px #000,0 3px 10px rgba(0,0,0,.9);}'
    + '.belt-item .belt-kind{font-family:Cinzel,serif;font-size:9px;letter-spacing:.16em;color:#c8a84b;flex-shrink:0;}'
    + '.belt-item.pinned{border-color:#c8a84b;}'
    + '.belt-item.pictured{min-height:64px;align-items:flex-end;}'
    + '#beltPanel.on .belt-item{opacity:1;pointer-events:auto;}'
    + '#beltPanel.on .belt-item:hover{background:rgba(200,168,75,0.22);transform:scale(1.06) !important;border-color:#f2d585;color:#fff3c4;z-index:2;}'
    + '#beltPanel .belt-item{display:block;min-height:58px;font-size:16px;padding:12px 14px;}'
    + '#beltPanel .belt-item .belt-kind{display:block;margin-bottom:4px;}'
    + '#beltPanel .belt-item.pictured{text-shadow:0 2px 8px rgba(0,0,0,1);}'
    + '.belt-empty{position:relative;width:100%;box-sizing:border-box;color:rgba(240,230,204,.85);font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:15px;text-align:center;background:rgba(4,6,8,.96);border:1px solid rgba(200,168,75,.4);border-radius:8px;padding:10px;opacity:0;pointer-events:none;transition:opacity .35s;}'
    + '#beltPanel.on .belt-empty{opacity:1;pointer-events:auto;}'
    + '#beltPanel .belt-sc-title{font-family:Cinzel,serif;font-weight:700;font-size:12px;letter-spacing:0.22em;color:#f2d585;text-align:center;margin:6px 0 -2px;text-shadow:0 2px 8px rgba(0,0,0,1);}'
    + '#beltPanel .belt-item.belt-sc{min-height:44px;padding:9px 14px;font-size:15px;}'
    + 'body.belt-phone #drFab,body.belt-phone #lcChip,body.belt-phone .belt-sc-hidden{display:none !important;}'
    + '#beltSay{position:fixed;z-index:9401;left:50%;bottom:24px;transform:translateX(-50%);max-width:min(92vw,520px);background:rgba(4,6,8,.96);border:1px solid rgba(200,168,75,.5);color:#f0e6cc;font-family:"Cormorant Garamond",Georgia,serif;font-size:17px;padding:12px 18px;border-radius:8px;opacity:0;pointer-events:none;transition:opacity .3s;text-align:center;}'
    + '#beltSay.on{opacity:1;}'
    + '@media (max-width:640px){#beltRoot{left:10px;right:auto;bottom:150px;width:56px;height:56px;}#beltEmblem{width:56px;height:56px;}}';

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
    fan = document.createElement('div'); fan.id = 'beltPanel';
    root.appendChild(emblem); document.body.appendChild(root); document.body.appendChild(fan);
    /* remembered spot on this device */
    try { var p = JSON.parse(localStorage.getItem(POS_KEY) || 'null'); if (p && typeof p.x === 'number') { placeAt(p.x, p.y); } } catch (e) {}
    wireDrag(); wireDrop();
    emblem.addEventListener('click', function (e) { if (_dragged) { _dragged = false; return; } toggle(); });
    document.addEventListener('click', function (e) { if (_open && !root.contains(e.target) && !fan.contains(e.target)) { setOpen(false); } }, true);
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
  function setOpen(on) { _open = !!on; root.classList.toggle('open', _open); fan.classList.toggle('on', _open); if (_open) render(); }
  function toggle() { setOpen(!_open); }
  function render() {
    if (!fan) return;
    fan.innerHTML = '';
    var cur = _face === 'respect' ? _row2 : (_face === 'limits' ? _row3 : (_face === 'talent' ? _row4 : _row));
    var tools = (cur && cur.tools) ? cur.tools : [];
    /* the turn control sits first in the panel */
    var turn = document.createElement('div'); turn.className = 'belt-item belt-turn'; turn.style.cssText = 'text-align:center;justify-content:center;background:rgba(200,168,75,0.12);';
    turn.innerHTML = '<span class="belt-kind">' + T('TURN THE BELT', 'GIRA EL CINTURÓN') + '</span>' + (nextFace() === 'respect' ? T('\u21c4 Respect', '\u21c4 Respeto') : nextFace() === 'limits' ? T('\u21c4 Limits', '\u21c4 L\u00edmites') : nextFace() === 'talent' ? T('\u21c4 Talent', '\u21c4 Talento') : T('\u21c4 Responsibility', '\u21c4 Responsabilidad'));
    turn.addEventListener('click', function (e) { e.stopPropagation(); setFace(nextFace()); });
    if (!tools.length) {
      var emp = document.createElement('div'); emp.className = 'belt-empty';
      fan.appendChild(turn);
      emp.textContent = _loaded ? T('Your belt is empty. Arm it in Tools & Entertainment.', 'Tu cinturón está vacío. Ármalo en Herramientas y Entretenimiento.') : T('Reading your belt…', 'Leyendo tu cinturón…');
      emp.addEventListener('click', function () { window.location.href = HOMES.talent; });
      var r0 = root.getBoundingClientRect(); fan.style.left = Math.max(8, (r0.left > 290 ? r0.left - 280 : r0.right + 10)) + 'px'; fan.style.top = Math.max(8, r0.top - 10) + 'px';
      fan.appendChild(emp); appendShortcuts(); return;
    }
    /* the panel sits beside the buckle: above it when the buckle is low, below when high; on the side with room */
    var r = root.getBoundingClientRect(), W = 270, GAP = 10;
    var left = (r.left > W + 20) ? (r.left - W - GAP) : (r.right + GAP);
    left = Math.max(8, Math.min(window.innerWidth - W - 8, left));
    fan.style.left = left + 'px';
    var scN = isPhone() ? shortcuts().length : 0; var rowsH = (tools.length + 1) * 66 + tools.length * 8 + (scN ? 22 + scN * 52 : 0);
    var top = (r.top + r.height / 2 > window.innerHeight * 0.5) ? (r.bottom - rowsH) : r.top;
    top = Math.max(8, Math.min(window.innerHeight - rowsH - 8, top));
    fan.style.top = top + 'px';
    fan.appendChild(turn);
    tools.forEach(function (t, i) {
      var el = document.createElement('div'); el.className = 'belt-item' + ((_row.pins || []).indexOf(t.key) !== -1 ? ' pinned' : '') + (t.image ? ' pictured' : '');
      if (t.image) { el.style.background = 'linear-gradient(rgba(4,6,8,0.05),rgba(4,6,8,0.7)),url(' + JSON.stringify(t.image) + ') center/cover no-repeat'; }
      el.style.transitionDelay = (i * 40) + 'ms';
      var k = document.createElement('span'); k.className = 'belt-kind'; k.textContent = t.kind === 'page' ? T('OPEN', 'ABRIR') : (t.kind === 'respect' ? T('RESPECT', 'RESPETO') : t.kind === 'limits' ? T('LIMITS', 'L\u00cdMITES') : t.kind === 'talent' ? T('TALENT', 'TALENTO') : T('FIRE', 'DISPARAR'));
      el.appendChild(k); el.appendChild(document.createTextNode(t.name));
      el.addEventListener('click', function (e) { e.stopPropagation(); fire(t); });
      fan.appendChild(el);
    });
    appendShortcuts();
  }
  /* v2.0 SHORTCUTS */
  function isPhone() { try { return window.matchMedia && window.matchMedia('(max-width: 760px)').matches; } catch (e) { return window.innerWidth <= 760; } }
  function pianoEl() {
    var els = document.querySelectorAll('button,div,a,span'); for (var i = 0; i < els.length; i++) { var el = els[i]; if (el.id === 'beltPanel' || el.closest && el.closest('#beltPanel')) continue; var t = (el.textContent || '').trim(); if (t.length <= 4 && t.indexOf('\uD83C\uDFB9') !== -1) { var fixedEl = el; while (fixedEl && fixedEl !== document.body) { try { if (window.getComputedStyle(fixedEl).position === 'fixed') return fixedEl; } catch (e) {} fixedEl = fixedEl.parentNode; } } }
    return null;
  }
  function shortcuts() {
    var list = [];
    var fab = document.getElementById('drFab'); if (fab) list.push({ name: T('REMINDERS', 'RECORDATORIOS'), icon: '\uD83D\uDCEC', el: fab });
    var pn = pianoEl(); if (pn) { pn.classList.add('belt-sc-hidden'); list.push({ name: T('PIANO', 'PIANO'), icon: '\uD83C\uDFB9', el: pn }); }
    var chip = document.getElementById('lcChip'); if (chip) list.push({ name: (chip.textContent || '').replace(/\s+/g, ' ').trim() || 'LVL', icon: '\uD83C\uDFAE', el: chip });
    if (typeof window.pwsMyDayJump === 'function') list.unshift({ name: T('MY DAY', 'MI D\u00cdA'), icon: '\uD83D\uDCC5', fn: window.pwsMyDayJump });   /* v2.1 */
    return list;
  }
  function applyPhone() { try { document.body.classList.toggle('belt-phone', isPhone()); if (isPhone()) pianoEl(); else { var h = document.querySelectorAll('.belt-sc-hidden'); for (var i = 0; i < h.length; i++) h[i].classList.remove('belt-sc-hidden'); } } catch (e) {} }
  function appendShortcuts() {
    if (!isPhone()) return 0;
    var sc = shortcuts(); if (!sc.length) return 0;
    var t = document.createElement('div'); t.className = 'belt-sc-title'; t.textContent = T('SHORTCUTS', 'ATAJOS'); fan.appendChild(t);
    sc.forEach(function (x) {
      var el = document.createElement('div'); el.className = 'belt-item belt-sc'; el.textContent = x.icon + '  ' + x.name;
      el.addEventListener('click', function (e) { e.stopPropagation(); setOpen(false); if (x.fn) { try { x.fn(); } catch (eF) {} return; } try { var target = x.el; var inner = target.querySelector && target.querySelector('button,a'); (inner && inner !== target ? inner : target).click(); } catch (eC) {} });
      fan.appendChild(el);
    });
    return sc.length;
  }
  function fire(t) {
    setOpen(false);
    try { if (window.BeltHost && typeof window.BeltHost.fire === 'function' && window.BeltHost.fire(t)) return; } catch (e) {}
    if (t.kind === 'page' && t.url) { window.location.href = t.url; return; }
    if ((t.kind === 'respect' || t.kind === 'limits' || t.kind === 'talent') && t.url) { window.location.href = t.url; return; }
    var home = HOMES[t.home] || HOMES.talent;
    say(T('No room on this page — taking you to its home.', 'No hay sala en esta página; te llevo a su casa.'), 2600);
    setTimeout(function () { window.location.href = home + (home.indexOf('?') === -1 ? '?' : '&') + 'belt=' + encodeURIComponent(t.key); }, 700);
  }

  /* ── the organ's public hands (for the wall that owns the belt) ── */
  window.Belt = {
    load: load,
    row: function () { return _row; },
    row2: function () { return _row2; },
    row3: function () { return _row3; },
    row4: function () { return _row4; },
    save: save,
    save2: save2,
    save3: save3,
    save4: save4,
    remove4: function (key) { var row = normalize(_row4 || {}); row.tools = row.tools.filter(function (t) { return t.key !== key; }); row.pins = row.pins.filter(function (k) { return k !== key; }); row.proposed = false; row.touched = true; return save4(row); },
    remove3: function (key) { var row = normalize(_row3 || {}); row.tools = row.tools.filter(function (t) { return t.key !== key; }); row.pins = row.pins.filter(function (k) { return k !== key; }); row.proposed = false; row.touched = true; return save3(row); },
    remove2: function (key) { var row = normalize(_row2 || {}); row.tools = row.tools.filter(function (t) { return t.key !== key; }); row.pins = row.pins.filter(function (k) { return k !== key; }); row.proposed = false; row.touched = true; return save2(row); },
    face: function () { return _face; },
    setFace: setFace,
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
    /* v2.0: the pills fold into SHORTCUTS on phones; the organs draw their pills late, so look again a few times */
    applyPhone(); [800, 2000, 4500].forEach(function (ms) { setTimeout(applyPhone, ms); }); window.addEventListener('resize', applyPhone);
  }
  boot();
})();
