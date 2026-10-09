/* 4 LAWS ACADEMY -- house.js v1.0 THE BUTLER'S HOUSE (Bench 54, 10/9/26)
 * ONE shared list for the whole site. v1 does two jobs:
 *  (1) THE BUTLER BAR on every Doc B chat: his face, BUTLER, and
 *      "A butler that knows the 4 LAWS" / "Un mayordomo que conoce las
 *      4 LEYES". A room's old small name line (COACH B, DOC B...) steps
 *      aside so he never wears two name tags.
 *  (2) THE NAMES OF THE ROOMS, in English and Spanish, put on the header
 *      links of every page that loads this file: change a name HERE and
 *      it changes everywhere. First rename: Studio Create is now the
 *      Production Studio.
 * Held for a later cut, on purpose: the guiding arrow's steps and the
 * play button for the founder's videos.
 * It never throws into the page: every step is guarded, and a room it
 * does not know is simply left alone.
 * Loaded by a short loader at the foot of pulse.js and life-art.js; pages
 * that load neither (family-atelier, bonds) carry one script line.
 * Way back: remove the loader lines; nothing else depends on this file.
 */
(function () {
  'use strict';
  if (window.__house4laws) return;
  window.__house4laws = '1.0';

  var FACE = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/b89dd487-6077-4b22-9ea2-50a853ded0c1/imgg-xzu-k936r3e9.png?format=300w';
  var SUB = { en: 'A butler that knows the 4 LAWS', es: 'Un mayordomo que conoce las 4 LEYES' };

  /* ── THE LIST: every Doc B chat on the site ─────────────────────────────
     feed  = the id of the box the chat messages appear in
     hide  = the room's old small name line, which the bar replaces      */
  var CHATS = [
    { feed: 'pwsUseFeed' },                                   /* /todos: Grandpa and the tool window */
    { feed: 'drFeed' },                                       /* /life: the coach's room */
    { feed: 'pwsDocBFeed' },                                  /* PWS Talent: Doc B */
    { feed: 'pwsFundingFeed' }, { feed: 'pwsMasteryFeed' }, { feed: 'pwsModifyFeed' },
    { feed: 'pwsTWSFeed', hide: '#pwsTWSCoachLabel' },        /* PWS Talent coach; the Coaching Center's Talent Coach */
    { feed: 'pwsTalentFeed' }, { feed: 'pwsUnlockFeed' },
    { feed: 'ptTWSFeed', hide: '#ptTWSCoachName' },           /* PWS Trust: Coach B */
    { feed: 'sessMessages' },                                 /* the AI Companion */
    { feed: 'stFoundFeed' },                                  /* /studio: founding a project */
    { feed: 'faDocBMessages', hide: '.fa-tws-coach-name' }    /* Family Atelier */
  ];

  /* ── THE LIST: the names of the rooms (header links are renamed from here) */
  /* THE SWAP IS NOT DONE YET: /studio-create still opens the old Studio Create,
     so its links keep their old name today. On the day the Production Studio
     takes that address, set RENAME_ON to true (one upload) and every header
     link to it reads PRODUCTION STUDIO / ESTUDIO DE PRODUCCION. */
  var RENAME_ON = false;
  var ROOMS = [
    { path: '/studio-create', en: 'Production Studio', es: 'Estudio de Producci\u00F3n', old: /^[\s\u2190-\u21FF]*studio\s*create[\s\u2190-\u21FF]*$/i, oldEs: /^[\s\u2190-\u21FF]*(estudio\s*crear|crear\s*en\s*el\s*estudio|studio\s*create)[\s\u2190-\u21FF]*$/i }
  ];

  function lang() {
    try { var l = window.localStorage.getItem('4laws-lang'); if (l === 'es' || l === 'en') return l; } catch (e) {}
    try { if (/^es/i.test(document.documentElement.lang || '')) return 'es'; } catch (e2) {}
    return 'en';
  }

  function css() {
    if (document.getElementById('hbCss')) return;
    try {
      var f = document.createElement('link'); f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Bangers&display=swap';
      document.head.appendChild(f);
    } catch (e) {}
    var s = document.createElement('style'); s.id = 'hbCss';
    s.textContent =
      '.hb-butler{display:flex;align-items:center;gap:12px;flex:none;box-sizing:border-box;width:100%;padding:8px 14px;margin:0;background:#000;border:1px solid #c8a84b;border-bottom-width:2px;border-radius:10px 10px 0 0;box-shadow:inset 0 0 0 3px #000,inset 0 0 0 4px rgba(200,168,75,.5);text-align:left;}' +
      '.hb-face{flex:none;display:block;width:52px;height:52px;border-radius:50%;border:2px solid #c8a84b;background:#000 no-repeat;background-size:172% auto;background-position:47% 34%;box-shadow:0 0 10px rgba(200,168,75,.45);}' +
      '.hb-star{flex:none;font-size:32px;line-height:1;color:#e8c96a;}' +
      '.hb-word{display:block;font-family:"Bangers","Comic Sans MS","Chalkboard SE",cursive;font-size:32px;line-height:1;letter-spacing:.09em;color:#fff;text-shadow:2px 2px 0 #000,4px 4px 0 rgba(200,168,75,.85);}' +
      '.hb-sub{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;line-height:1.15;color:rgba(240,230,204,.88);margin-top:3px;}' +
      '@media (max-width:640px){.hb-word{font-size:26px}.hb-sub{font-size:15px}.hb-face{width:44px;height:44px}}';
    document.head.appendChild(s);
  }

  var _faceOk = null;   /* null = not known yet, true/false once tried */
  function faceInto(holder) {
    var star = function () { holder.className = 'hb-star'; holder.style.backgroundImage = ''; holder.textContent = '\u2605'; };
    var face = function () { holder.className = 'hb-face'; holder.textContent = ''; holder.style.backgroundImage = 'url("' + FACE + '")'; };
    if (_faceOk === true) { face(); return; }
    star();
    if (_faceOk === false) return;
    var probe = new Image();
    probe.onload = function () { _faceOk = true; face(); };
    probe.onerror = function () { _faceOk = false; };
    probe.src = FACE;
  }

  function makeBar() {
    var bar = document.createElement('div'); bar.className = 'hb-butler'; bar.setAttribute('data-hb', '1');
    var holder = document.createElement('span'); faceInto(holder);
    var txt = document.createElement('span');
    var word = document.createElement('span'); word.className = 'hb-word'; word.textContent = 'BUTLER';
    var sub = document.createElement('span'); sub.className = 'hb-sub'; sub.textContent = SUB[lang()];
    txt.appendChild(word); txt.appendChild(sub);
    bar.appendChild(holder); bar.appendChild(txt);
    return bar;
  }

  function placeBars() {
    for (var i = 0; i < CHATS.length; i++) {
      try {
        var c = CHATS[i], feed = document.getElementById(c.feed);
        if (!feed || !feed.parentNode) continue;
        var prev = feed.previousElementSibling;
        if (!(prev && prev.getAttribute && prev.getAttribute('data-hb') === '1')) {
          css();
          prev = makeBar();
          feed.parentNode.insertBefore(prev, feed);
        }
        /* the bar is seen only while its chat is: a chat that has not opened yet shows no bar */
        var hidden = false;
        try { hidden = (window.getComputedStyle(feed).display === 'none'); } catch (eH) {}
        var want = hidden ? 'none' : '';
        if (prev.style.display !== want) prev.style.display = want;
        if (c.hide) {
          var olds = document.querySelectorAll(c.hide);
          for (var k = 0; k < olds.length; k++) { if (olds[k].style.display !== 'none') olds[k].style.display = 'none'; }
        }
      } catch (e) {}
    }
  }

  function retongue() {
    try {
      var subs = document.querySelectorAll('.hb-butler .hb-sub'), t = SUB[lang()];
      for (var i = 0; i < subs.length; i++) { if (subs[i].textContent !== t) subs[i].textContent = t; }
    } catch (e) {}
  }

  /* header links: the room's name comes from THE LIST */
  function renameLinks() {
    if (!RENAME_ON && !window.__houseRenameTest) return;
    try {
      var as = document.querySelectorAll('a[href]');
      for (var i = 0; i < as.length; i++) {
        var a = as[i], href = String(a.getAttribute('href') || '');
        for (var r = 0; r < ROOMS.length; r++) {
          var room = ROOMS[r];
          if (href.indexOf(room.path) === -1) continue;
          renameNode(a, room);
        }
      }
    } catch (e) {}
  }
  function renameNode(a, room) {
    /* only plain words are touched: a text node whose whole text is the old name (arrows kept) */
    var walk = function (node, isEs) {
      for (var n = node.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) {
          var raw = String(n.nodeValue || '');
          if (!raw.replace(/\s/g, '')) continue;
          var es = isEs;
          if (room.old.test(raw) || (es && room.oldEs.test(raw))) {
            var pre = /^[\s\u2190-\u21FF]*/.exec(raw)[0], post = /[\s\u2190-\u21FF]*$/.exec(raw)[0];
            var upper = (raw.replace(/[^A-Za-z]/g, '') === raw.replace(/[^A-Za-z]/g, '').toUpperCase());
            var name = es ? room.es : room.en;
            n.nodeValue = pre + (upper ? name.toUpperCase() : name) + post;
          }
        } else if (n.nodeType === 1) {
          var cls = String(n.className || '');
          walk(n, isEs || /(^|\s)es(\s|$)/.test(cls));
        }
      }
    };
    walk(a, false);
  }

  function run() { placeBars(); retongue(); renameLinks(); }
  function start() {
    run();
    /* rooms that are built or opened after the page loads are caught here */
    window.setInterval(function () { run(); }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
