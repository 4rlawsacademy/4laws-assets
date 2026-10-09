/* 4 LAWS ACADEMY -- house.js v1.3 THE ONE MAKER'S DOOR (Bench 54, 10/9/26)
 * The founder's ruling (10/8): the Production Studio takes Studio Create's
 * place. From this version every plain header link to /studio-create reads
 * PRODUCTION STUDIO (ESTUDIO DE PRODUCCION) and opens /production-studio.
 * A link that carries an errand (/studio-create?edit=..., ?project=...) is
 * left exactly as it is, so editing an existing Window still opens the old
 * room, and the old room itself is untouched and reachable by its address.
 * To undo: set RENAME_ON to false (or upload v1.2).
 * -- carried below:
 * 4 LAWS ACADEMY -- house.js v1.2 BUTLER AT THE GATE (Bench 54, 10/9/26)
 * Founder's correction the morning v1.1 went live: at the gate on PWS
 * Trust the bar says BUTLER B, not WINSTON ("No butler anywhere. You put
 * Winston." -- his ruling the night before was Butler at the gate; the
 * bench misread a dictated word). One change: the gate wears BUTLER B;
 * when a Law coach takes over in that window it wears COACH B, as before.
 * Also: the bar now stays pinned at the top of a window whose whole body
 * scrolls (the PWS Talent tool window), where before it scrolled away with
 * the chat and looked as if it were missing.
 * Way back: house.js v1.1.
 * -- carried below:
 * 4 LAWS ACADEMY -- house.js v1.1 THE THREE HATS (Bench 54, 10/9/26)
 * Founder's rulings, the night v1.0 went live: there is ONE Doc B and he
 * wears three hats -- BUTLER B (gets things done), COACH B (trains you in
 * the laws), TRUST B (ongoing trust repair). Whichever one you talk to
 * knows what you told the others. The names are the same in English and
 * Spanish ("Trust B" stays; "Confianza B" would be a huge word). So the bar
 * now wears the hat of the room, and where a member of his STAFF is the
 * one speaking (Winston at the gate on PWS Trust) the bar wears that
 * name and that face. Bruno's chat already carries his own face, name and
 * line, so it is left as it is. Only the bar's words and face changed;
 * placement, the loader and the room-name list are as in v1.0.
 * Way back: house.js v1.0.
 * -- carried below:
 * 4 LAWS ACADEMY -- house.js v1.0 THE BUTLER'S HOUSE (Bench 54, 10/9/26)
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
  window.__house4laws = '1.3';

  var FACE = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/b89dd487-6077-4b22-9ea2-50a853ded0c1/imgg-xzu-k936r3e9.png?format=300w';
  var WINSTON_FACE = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/winston-medallion.png';

  /* ── WHO IS SPEAKING: Doc B's three hats, and his staff ─────────────────
     The names are names: the same in English and Spanish. Only the line
     under the name changes tongue.                                       */
  var WHO = {
    butler:  { name: 'BUTLER B', en: 'A butler that knows the 4 LAWS', es: 'Un mayordomo que conoce las 4 LEYES' },
    coach:   { name: 'COACH B',  en: 'A coach that knows the 4 LAWS',  es: 'Un coach que conoce las 4 LEYES' },
    trust:   { name: 'TRUST B',  en: 'Ongoing trust repair',           es: 'Reparaci\u00F3n continua de la confianza' },
    winston: { name: 'WINSTON',  en: 'The tech guy',                   es: 'El t\u00E9cnico', face: WINSTON_FACE, plainFace: true }
  };

  /* ── THE LIST: every Doc B chat on the site ─────────────────────────────
     feed  = the id of the box the chat messages appear in
     hide  = the room's old small name line, which the bar replaces      */
  var CHATS = [
    { feed: 'pwsUseFeed', who: 'butler' },                                   /* /todos: Grandpa and the tool window */
    { feed: 'drFeed', who: 'coach' },                                        /* /life: the coach's room */
    { feed: 'pwsDocBFeed', who: 'butler' },                                  /* PWS Talent: Doc B */
    { feed: 'pwsFundingFeed', who: 'butler' }, { feed: 'pwsModifyFeed', who: 'butler' },
    { feed: 'pwsMasteryFeed', who: 'coach' },                                /* PWS Talent: the practice check-in */
    { feed: 'pwsTWSFeed', who: 'coach', hide: '#pwsTWSCoachLabel' },         /* PWS Talent coach; the Coaching Center's Talent Coach */
    { feed: 'pwsTalentFeed', who: 'butler' }, { feed: 'pwsUnlockFeed', who: 'butler' },
    /* PWS Trust: ONE window, two speakers -- Winston at the gate, then the coach */
    { feed: 'ptTWSFeed', hide: '#ptTWSCoachName', who: function () {
        var t = document.getElementById('ptTWSTitle');
        return (t && /winston|gate/i.test(t.textContent || '')) ? 'butler' : 'coach';   /* v1.2: the gate is the Butler's */
      } },
    { feed: 'sessMessages', who: 'trust' },                                  /* the AI Companion */
    { feed: 'stFoundFeed', who: 'butler' },                                  /* /studio: founding a project */
    { feed: 'faDocBMessages', who: 'butler', hide: '.fa-tws-coach-name' }    /* Family Atelier */
  ];
  function whoOf(c) {
    var w = 'butler';
    try { w = (typeof c.who === 'function') ? c.who() : (c.who || 'butler'); } catch (e) { w = 'butler'; }
    return WHO[w] ? w : 'butler';
  }

  /* ── THE LIST: the names of the rooms (header links are renamed from here) */
  /* THE SWAP IS NOT DONE YET: /studio-create still opens the old Studio Create,
     so its links keep their old name today. On the day the Production Studio
     takes that address, set RENAME_ON to true (one upload) and every header
     link to it reads PRODUCTION STUDIO / ESTUDIO DE PRODUCCION. */
  var RENAME_ON = true;
  var ROOMS = [
    { path: '/studio-create', to: '/production-studio', en: 'Production Studio', es: 'Estudio de Producci\u00F3n', old: /^[\s\u2190-\u21FF]*studio\s*create[\s\u2190-\u21FF]*$/i, oldEs: /^[\s\u2190-\u21FF]*(estudio\s*crear|crear\s*en\s*el\s*estudio|studio\s*create)[\s\u2190-\u21FF]*$/i }
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
      '.hb-butler{display:flex;align-items:center;gap:12px;flex:none;box-sizing:border-box;width:100%;padding:8px 14px;margin:0;background:#000;border:1px solid #c8a84b;border-bottom-width:2px;border-radius:10px 10px 0 0;box-shadow:inset 0 0 0 3px #000,inset 0 0 0 4px rgba(200,168,75,.5);text-align:left;position:sticky;top:0;z-index:6;}' +
      '.hb-face{flex:none;display:block;width:52px;height:52px;border-radius:50%;border:2px solid #c8a84b;background:#000 no-repeat;background-size:172% auto;background-position:47% 34%;box-shadow:0 0 10px rgba(200,168,75,.45);}' +
      '.hb-face.hb-plain{background-size:cover;background-position:center;}' +
      '.hb-star{flex:none;font-size:32px;line-height:1;color:#e8c96a;}' +
      '.hb-word{display:block;font-family:"Bangers","Comic Sans MS","Chalkboard SE",cursive;font-size:32px;line-height:1;letter-spacing:.09em;color:#fff;text-shadow:2px 2px 0 #000,4px 4px 0 rgba(200,168,75,.85);}' +
      '.hb-sub{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;line-height:1.15;color:rgba(240,230,204,.88);margin-top:3px;}' +
      '@media (max-width:640px){.hb-word{font-size:26px}.hb-sub{font-size:15px}.hb-face{width:44px;height:44px}}';
    document.head.appendChild(s);
  }

  var _faceOk = {};   /* per picture: undefined = not known yet, true/false once tried */
  function faceInto(holder, w) {
    var src = w.face || FACE;
    var star = function () { holder.className = 'hb-star'; holder.style.backgroundImage = ''; holder.textContent = '\u2605'; };
    var face = function () { holder.className = 'hb-face' + (w.plainFace ? ' hb-plain' : ''); holder.textContent = ''; holder.style.backgroundImage = 'url("' + src + '")'; };
    if (_faceOk[src] === true) { face(); return; }
    star();
    if (_faceOk[src] === false) return;
    var probe = new Image();
    probe.onload = function () { _faceOk[src] = true; if (holder.getAttribute('data-src') === src) face(); };
    probe.onerror = function () { _faceOk[src] = false; };
    holder.setAttribute('data-src', src);
    probe.src = src;
  }

  function makeBar() {
    var bar = document.createElement('div'); bar.className = 'hb-butler'; bar.setAttribute('data-hb', '1');
    var holder = document.createElement('span'); holder.className = 'hb-star';
    var txt = document.createElement('span');
    var word = document.createElement('span'); word.className = 'hb-word';
    var sub = document.createElement('span'); sub.className = 'hb-sub';
    txt.appendChild(word); txt.appendChild(sub);
    bar.appendChild(holder); bar.appendChild(txt);
    return bar;
  }
  /* the bar wears the name, the line and the face of whoever is speaking now */
  function dress(bar, key) {
    var w = WHO[key], l = lang();
    var word = bar.querySelector('.hb-word'), sub = bar.querySelector('.hb-sub'), holder = bar.firstChild;
    if (word && word.textContent !== w.name) word.textContent = w.name;
    if (sub && sub.textContent !== w[l]) sub.textContent = w[l];
    if (bar.getAttribute('data-who') !== key) {
      bar.setAttribute('data-who', key);
      holder.setAttribute('data-src', w.face || FACE);
      faceInto(holder, w);
    }
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
        dress(prev, whoOf(c));
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
          /* only the plain door: a link with an errand (?edit=, ?project=, #...) keeps its old room */
          var plain = /^(https?:\/\/(www\.)?4lawsacademy\.com)?\/studio-create\/?$/i.test(href);
          if (!plain) continue;
          renameNode(a, room);
          if (room.to) a.setAttribute('href', room.to);
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

  function run() { placeBars(); renameLinks(); }
  function start() {
    run();
    /* rooms that are built or opened after the page loads are caught here */
    window.setInterval(function () { run(); }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
