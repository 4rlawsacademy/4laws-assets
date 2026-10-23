/* ═══ house-scroll-v1_3.js THE CROWN (Bench 57, Thu 10/22/26 9:40 PM; way back: house-scroll-v1_1.js, the one live on /pws). Founder, seeing the band run edge to edge: 'it looks sloppy and cheap not to end it right where the rest of the page ends, where the black ends... like a T' -- the band now finds the page column right under it and wears exactly its left edge and width, re-measured as the page settles and on resize; edge to edge only on a page with no column. Carries v1.2 THE BOLD SCROLL (never pasted): Founder, seeing v1.1 live: 'the letters are very small... don't be afraid to be bold in the size of the words' -- doors at 22px bold, spacing wider, each side spread evenly across its half, medallion grown to 86px, the band's row stretched to 1500px. Each cut of the scroll ships under its own file name because the delivery network keeps serving an old copy under a reused one. Before this: v1.1 THE CRIMSON SCROLL -- First look on /pws: the band sat lopsided because it inherited the shell wrapper's crooked box, and black read dull. Now the band runs edge to edge across the screen and centers itself (width 100vw, left 50%, translated back) so it is symmetric on every page; crimson velvet like the Entertainment Center marquee -- the color of Limits, the law the house teaches first -- with gold letters, the lit door white-gold, dark doors sunk into the velvet. Everything else as v1 THE SCROLL:
 * 4 LAWS Academy -- the map of the house. Ruled tonight: seven doors, the 4 LAWS logo dead center (home = MY DAY,
 * /pws; "PWS is home and it's a logo, where you work. LIFE is where you play"); LIFE · TODOS · STUDIO on the left,
 * FAMILY · TRUST · FUN on the right; lit gold with the underline where you are, as the Entertainment Center does it;
 * unearned doors DIMMED, never hidden ("they are becoming familiar territory") with a small unlit lamp, and a tap on a
 * dark door answers in one line (never a dead tap); day-one lights: the logo, TODOS, TRUST; opens every door in the
 * SAME window (the page's own TR -> / STUDIO buttons open new tabs -- the scroll always leaves a way back); folds on a
 * phone to the medallion + the lit door, tap to unfurl. One line per page: the script draws itself where its tag is
 * placed (inside the body) or at the top of the body (from the page's header injection). Doors come from Main
 * (action doorsRead, cached one day); until Main knows doors (AUDIT 74), the scroll FAILS OPEN -- every door lit --
 * so no one already in the house loses a lamp. Pages may call window.HouseScroll.earn('studio') when a door is earned.
 * ═══ */
(function () {
  'use strict';
  if (window.HouseScroll && window.HouseScroll.v) return;

  var MAIN = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var LOGO = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/a2eea043-07f6-47c0-8b79-85b1f4b886da/4LAWS+logo+print.jpg?format=500w';
  var ALWAYS = { home: 1, todos: 1, trust: 1 };
  var DOORS = [
    { k: 'life',   href: '/life',           en: 'LIFE',   es: 'LIFE',      side: 'l', notEn: 'Not yet. Sit with Charles first; the game opens after.',            notEs: 'Todavía no. Siéntate primero con Charles; el juego se abre después.' },
    { k: 'todos',  href: '/todos',          en: 'TODOS',  es: 'TODOS',     side: 'l', notEn: '', notEs: '' },
    { k: 'studio', href: '/studio',         en: 'STUDIO', es: 'ESTUDIO',   side: 'l', notEn: 'Not yet. Choose your talent project with your coach and this one opens.', notEs: 'Todavía no. Escoge tu proyecto de talento con tu coach y esta se abre.' },
    { k: 'home',   href: '/pws',            en: 'MY DAY', es: 'MI DÍA', side: 'c', notEn: '', notEs: '' },
    { k: 'family', href: '/family-atelier', en: 'FAMILY', es: 'FAMILIA',   side: 'r', notEn: 'Not yet. Live a few days in your own day; then the family comes in.',     notEs: 'Todavía no. Vive unos días en tu propio día; después entra la familia.' },
    { k: 'trust',  href: '/pws-trust',      en: 'TRUST',  es: 'CONFIANZA', side: 'r', notEn: '', notEs: '' },
    { k: 'fun',    href: '/music',          en: 'FUN',    es: 'DIVERSIÓN', side: 'r', notEn: 'Not yet. Finish one day and the Entertainment Center opens.',       notEs: 'Todavía no. Termina un día y se abre el Centro de Entretenimiento.' }
  ];
  var CSS = '' +
    '#hsScroll{font-family:Cinzel,"Cormorant Garamond",Georgia,serif;position:relative;z-index:900;width:100vw;left:0;box-sizing:border-box;margin:0;padding:0;background:linear-gradient(180deg,#7a0f16 0%,#5a0a10 55%,#3d060b 100%);border-top:1px solid rgba(226,194,112,0.75);border-bottom:1px solid rgba(226,194,112,0.75);box-shadow:0 8px 26px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,236,180,0.18), inset 0 -1px 0 rgba(0,0,0,0.35);}' +
    '#hsScroll:before,#hsScroll:after{content:"";position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(226,194,112,0.7) 12%,rgba(226,194,112,0.7) 88%,transparent);pointer-events:none;}' +
    '#hsScroll:before{top:3px;}#hsScroll:after{bottom:3px;}' +
    'html,body{overflow-x:hidden;}' +
    '#hsScroll .hs-row{display:flex;align-items:center;justify-content:center;gap:0;max-width:1500px;margin:0 auto;padding:8px 10px;}' +
    '#hsScroll .hs-side{display:flex;flex:1 1 0;align-items:center;justify-content:space-evenly;gap:0;min-width:0;}' +
    '#hsScroll .hs-side.hs-r{justify-content:space-evenly;}' +
    '#hsScroll a.hs-door{position:relative;display:inline-block;text-decoration:none;color:rgba(240,214,150,0.88);font-size:22px;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;padding:18px 14px 16px;white-space:nowrap;transition:color .25s,opacity .25s;}' +
    '#hsScroll a.hs-door:hover{color:#ffe9a8;}' +
    '#hsScroll a.hs-door.on{color:#fff6dc;text-shadow:0 0 14px rgba(255,224,150,0.75);}' +
    '#hsScroll a.hs-door.on:after{content:"";position:absolute;left:10px;right:10px;bottom:8px;height:3px;background:linear-gradient(90deg,transparent,#e2c270,transparent);box-shadow:0 0 8px rgba(255,214,120,0.6);}' +
    '#hsScroll a.hs-door.dim{color:rgba(240,214,150,0.32);cursor:pointer;}' +
    '#hsScroll a.hs-door.dim:hover{color:rgba(240,214,150,0.5);}' +
    '#hsScroll a.hs-door .hs-lamp{display:none;}' +
    '#hsScroll a.hs-door.dim .hs-lamp{display:inline-block;width:7px;height:7px;border-radius:50%;border:1px solid rgba(226,194,112,0.5);margin-left:7px;vertical-align:middle;background:transparent;}' +
    '#hsScroll .hs-mid{flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:0 30px;}' +
    '#hsScroll a.hs-home{display:flex;align-items:center;justify-content:center;width:86px;height:86px;border-radius:50%;border:1px solid rgba(226,194,112,0.85);box-shadow:0 0 0 3px #4a080e,0 0 0 4px rgba(226,194,112,0.5),0 0 18px rgba(255,214,120,0.4);background:#0b1222;overflow:hidden;text-decoration:none;transition:box-shadow .25s;}' +
    '#hsScroll a.hs-home img{width:78px;height:78px;object-fit:cover;border-radius:50%;filter:brightness(1.08);display:block;}' +
    '#hsScroll a.hs-home.on{box-shadow:0 0 0 3px #4a080e,0 0 0 4px rgba(226,194,112,1),0 0 28px rgba(255,214,120,0.8);}' +
    '#hsScroll a.hs-home:hover{box-shadow:0 0 0 3px #4a080e,0 0 0 4px rgba(226,194,112,1),0 0 28px rgba(255,214,120,0.8);}' +
    '#hsScroll .hs-line{flex:0 0 70px;height:2px;background:linear-gradient(90deg,transparent,rgba(226,194,112,0.75));margin-right:-6px;}' +
    '#hsScroll .hs-line.hs-after{background:linear-gradient(90deg,rgba(226,194,112,0.75),transparent);margin-right:0;margin-left:-6px;}' +
    '#hsScroll .hs-say{position:absolute;left:50%;top:100%;transform:translateX(-50%);margin-top:8px;max-width:min(92vw,520px);background:#2a0407;border:1px solid rgba(226,194,112,0.7);color:#efe2bf;font-family:"Cormorant Garamond",Georgia,serif;font-size:19px;line-height:1.35;padding:12px 18px;border-radius:6px;box-shadow:0 10px 30px rgba(0,0,0,0.6);z-index:901;text-align:center;display:none;}' +
    '#hsScroll .hs-say.show{display:block;}' +
    '#hsScroll .hs-fold{display:none;}' +
    '@media (max-width:700px){' +
      '#hsScroll .hs-row{flex-wrap:wrap;padding:4px 6px 6px;}' +
      '#hsScroll a.hs-door{font-size:16px;letter-spacing:0.18em;padding:12px 10px 10px;}' +
      '#hsScroll .hs-mid{padding:0 10px;order:0;flex:1 1 100%;justify-content:center;}' +
      '#hsScroll .hs-line{display:none;}' +
      '#hsScroll .hs-side,#hsScroll .hs-side.hs-r{flex:1 1 100%;justify-content:center;gap:0;}' +
      '#hsScroll.folded .hs-side a.hs-door:not(.on){display:none;}' +
      '#hsScroll.folded .hs-side{flex:1 1 auto;}' +
      '#hsScroll.folded .hs-mid{flex:0 0 auto;}' +
      '#hsScroll .hs-fold{display:block;position:absolute;right:10px;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;border:1px solid rgba(226,194,112,0.6);background:transparent;color:rgba(240,214,150,0.9);font-size:16px;line-height:32px;text-align:center;cursor:pointer;padding:0;}' +
      '#hsScroll a.hs-home{width:60px;height:60px;}#hsScroll a.hs-home img{width:54px;height:54px;}' +
    '}';

  function lang() { try { var l = localStorage.getItem('4laws-lang'); return l === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; } }
  function creds() { var o = {}; try { o.memberId = localStorage.getItem('4laws-member-id') || ''; o.session = localStorage.getItem('4laws-session') || ''; } catch (e) {} return o; }
  function here() { var p = (location.pathname || '/').replace(/\/+$/, '') || '/'; return p.toLowerCase(); }
  function isHere(d) {
    var p = here();
    if (d.k === 'home') return p === '/pws' || p.indexOf('/pws-talent') === 0;
    if (d.k === 'fun') return /^\/(music|games|social|sports|movies|feed|entertainment)/.test(p);
    if (d.k === 'family') return p.indexOf('/family') === 0;
    if (d.k === 'trust') return p === '/pws-trust' || p.indexOf('/trust') === 0;
    if (d.k === 'studio') return p === '/studio' || p.indexOf('/production-studio') === 0 || p.indexOf('/lectern') === 0 || p.indexOf('/watch') === 0;
    return p === d.href || p.indexOf(d.href + '/') === 0;
  }

  /* ── doors: what is lit. null = unknown = fail open (all lit) ── */
  var _doors = null;
  function readCache() { try { var j = JSON.parse(localStorage.getItem('4laws-doors') || 'null'); if (j && j.doors && j.at && (Date.now() - j.at) < 86400000) return j.doors; } catch (e) {} return null; }
  function writeCache(doors) { try { localStorage.setItem('4laws-doors', JSON.stringify({ doors: doors, at: Date.now() })); } catch (e) {} }
  function lit(k) { if (ALWAYS[k]) return true; if (!_doors) return true; return _doors.indexOf(k) >= 0; }
  function fetchDoors() {
    var c = creds(); if (!c.memberId || !c.session) return;
    var ctl = ('AbortController' in window) ? new AbortController() : null; if (ctl) setTimeout(function () { try { ctl.abort(); } catch (e) {} }, 12000);
    fetch(MAIN, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'doorsRead', memberId: c.memberId, session: c.session }), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var d = j && (j.data || j);
        if (d && Object.prototype.toString.call(d.doors) === '[object Array]') { _doors = d.doors.map(String); writeCache(_doors); paint(); }
      })
      .catch(function () { /* Main does not know doors yet, or the road is slow: stay open */ });
  }

  /* ── draw ── */
  var root, say;
  function build() {
    var L = lang();
    var st = document.createElement('style'); st.id = 'hsScrollCss'; st.textContent = CSS; document.head.appendChild(st);
    root = document.createElement('nav'); root.id = 'hsScroll'; root.setAttribute('aria-label', '4 LAWS Academy');
    var row = document.createElement('div'); row.className = 'hs-row';
    var left = document.createElement('div'); left.className = 'hs-side hs-l';
    var right = document.createElement('div'); right.className = 'hs-side hs-r';
    var mid = document.createElement('div'); mid.className = 'hs-mid';
    var l1 = document.createElement('span'); l1.className = 'hs-line';
    var l2 = document.createElement('span'); l2.className = 'hs-line hs-after';
    var home = DOORS.filter(function (d) { return d.k === 'home'; })[0];
    var hm = document.createElement('a'); hm.className = 'hs-home'; hm.href = home.href; hm.title = L === 'es' ? 'Mi Día · casa' : 'My Day · home'; hm.setAttribute('data-door', 'home');
    var img = document.createElement('img'); img.src = LOGO; img.alt = '4 LAWS Academy'; hm.appendChild(img);
    mid.appendChild(l1); mid.appendChild(hm); mid.appendChild(l2);
    DOORS.forEach(function (d) {
      if (d.k === 'home') return;
      var a = document.createElement('a'); a.className = 'hs-door'; a.href = d.href; a.setAttribute('data-door', d.k);
      a.textContent = L === 'es' ? d.es : d.en;
      var lamp = document.createElement('span'); lamp.className = 'hs-lamp'; a.appendChild(lamp);
      a.addEventListener('click', function (ev) {
        if (a.classList.contains('dim')) { ev.preventDefault(); speakNot(d); }
      });
      (d.side === 'l' ? left : right).appendChild(a);
    });
    row.appendChild(left); row.appendChild(mid); row.appendChild(right);
    root.appendChild(row);
    say = document.createElement('div'); say.className = 'hs-say'; root.appendChild(say);
    var fold = document.createElement('button'); fold.className = 'hs-fold'; fold.type = 'button'; fold.textContent = '☰'; fold.title = L === 'es' ? 'Toda la casa' : 'The whole house';
    fold.addEventListener('click', function () { root.classList.toggle('folded'); try { localStorage.setItem('4laws-scroll-open', root.classList.contains('folded') ? '0' : '1'); } catch (e) {} });
    root.appendChild(fold);
    var open = '0'; try { open = localStorage.getItem('4laws-scroll-open') || '0'; } catch (e) {}
    if (open !== '1') root.classList.add('folded');
    paint();
  }
  /* the band runs edge to edge whatever box it was born in: measure where the wrapper put it and slide it to the screen's left edge */
  /* the band wears the page's own width: it finds the page column right under it (the first sizable block that
     follows the scroll) and takes that block's left edge and width -- a crown on the page, not a bar across the sky.
     If no column is found (a bare page), it runs edge to edge. */
  function column() {
    var n = root.nextElementSibling, tries = 0;
    while (n && tries < 8) {
      if (n.nodeType === 1 && n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE' && n.tagName !== 'LINK') {
        var r = n.getBoundingClientRect();
        if (r.width >= 300 && r.height >= 60) return r;
      }
      n = n.nextElementSibling; tries++;
    }
    var p = root.parentNode; if (p && p.nodeType === 1 && p !== document.body) { var pr = p.getBoundingClientRect(); if (pr.width >= 300) return pr; }
    return null;
  }
  function align() {
    if (!root) return;
    root.style.left = '0px'; root.style.width = '100vw';
    var mine = root.getBoundingClientRect().left;
    var c = column();
    if (c) { root.style.left = (c.left - mine) + 'px'; root.style.width = Math.round(c.width) + 'px'; }
    else if (Math.abs(mine) > 0.5) root.style.left = (-mine) + 'px';
  }
  function paint() {
    if (!root) return;
    var any = false;
    DOORS.forEach(function (d) {
      var a = root.querySelector('[data-door="' + d.k + '"]'); if (!a) return;
      var on = isHere(d); if (on) any = true;
      a.classList.toggle('on', on);
      if (d.k !== 'home') a.classList.toggle('dim', !lit(d.k));
    });
    if (!any) { /* a page off the map (Arrival, a weapon): nothing lit, the logo still glows as home */ }
  }
  var _sayT = null;
  function speakNot(d) {
    var L = lang(); var t = L === 'es' ? d.notEs : d.notEn; if (!t) return;
    say.textContent = t; say.classList.add('show');
    clearTimeout(_sayT); _sayT = setTimeout(function () { say.classList.remove('show'); }, 5200);
    try { if (window.CharlesVoice && window.CharlesVoice.say) window.CharlesVoice.say(t); } catch (e) {}
  }

  /* ── mount: before its own tag when the tag is in the body; else at the top of the body ── */
  function mount() {
    var cs = document.currentScript;
    build();
    if (cs && cs.parentNode && cs.parentNode !== document.head && document.body && document.body.contains(cs)) { cs.parentNode.insertBefore(root, cs); }
    else if (document.body) { document.body.insertBefore(root, document.body.firstChild); }
    else { document.addEventListener('DOMContentLoaded', function () { document.body.insertBefore(root, document.body.firstChild); }); }
    _doors = readCache(); paint(); fetchDoors();
    align(); setTimeout(align, 60); setTimeout(align, 400); setTimeout(align, 1200); setTimeout(align, 3000);
    window.addEventListener('resize', align);
    window.addEventListener('load', align);
  }
  if (document.currentScript && document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  window.HouseScroll = {
    v: 1,
    doors: function () { return _doors ? _doors.slice() : null; },
    relight: function () { paint(); align(); },
    earn: function (k) {
      k = String(k || ''); if (!k) return;
      if (!_doors) _doors = [];
      if (_doors.indexOf(k) < 0) _doors.push(k);
      writeCache(_doors); paint();
      var c = creds(); if (!c.memberId || !c.session) return;
      try { fetch(MAIN, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'doorsEarn', memberId: c.memberId, session: c.session, door: k }) }).catch(function () {}); } catch (e) {}
    }
  };
})();
