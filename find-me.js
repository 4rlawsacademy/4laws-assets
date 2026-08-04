/* 4 LAWS ACADEMY — find-me.js — v2 THE FIRST WORDS (Bench 17/B-front, Aug 4 2026)
 * v2 adds the mouth: a gold message bubble beside the spark, and the first
 * client-side voice — first-ever arrival, daily first touch, return after
 * absence — sparse by law (at most one ambient line per day per device),
 * rotating variants (a repeated phrase stops reinforcing), fully bilingual,
 * honoring the off-switch. Adds FindME.say(en,es) and FindME.quiet() for
 * page wiring. Lineage: v1 THE ARRIVAL —
 * Find ME — The Quest for Favorite Day. The ambient layer, first breath.
 * One script line per page and the presence arrives: a small gold spark,
 * the ME door (revelation behind it), the gold opt-out exactly as ruled,
 * and the sound engine — Gauntlet / Fade / Swell, reward chimes, arrival
 * theme — all placeholder-driven: tracks live on the assets repo under
 * canonical names; absent files fail SILENT (no fake beeps — honesty law).
 * Includes the Audition Room: every slot lists candidate variants
 * (findme-<slot>-1..5) with play buttons, so the founder selects Dro's
 * hammer by ear. Courtesy rule enforced: if any other audio/video on the
 * page is playing, Find ME yields (Respect, applied to sound).
 * API (for Bench B wiring and beyond):
 *   FindME.gauntlet(funny?) FindME.swell() FindME.rest() FindME.arrive()
 *   FindME.chime('done'|'salvage'|'tool') FindME.offerRest() FindME.open()
 *   FindME.isOff()
 * ES5. Single IIFE. Self-styled. Touches nothing else. */
(function() {
  'use strict';
  if (window.__findMeMounted) return;
  window.__findMeMounted = true;

  var CDN = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/';
  var OFF_KEY = '4laws-findme-off';

  var TRACKS = {
    gauntlet:      'findme-gauntlet.mp3',
    gauntletFunny: 'findme-gauntlet-funny.mp3',
    swell:         'findme-swell.mp3',
    fade:          'findme-fade-chirp.mp3',
    arrive:        'findme-arrive.mp3',
    chimeDone:     'findme-chime-done.mp3',
    chimeSalvage:  'findme-chime-salvage.mp3',
    chimeTool:     'findme-chime-tool.mp3'
  };
  var SLOT_LABELS = [
    { key: 'gauntlet',      en: 'The Gauntlet (thinking, suspense)', es: 'El Guante (pensando, suspenso)' },
    { key: 'gauntletFunny', en: 'The Gauntlet, funny',               es: 'El Guante, c\u00f3mico' },
    { key: 'swell',         en: 'The Swell (engagement rises)',      es: 'El Crescendo (el esfuerzo sube)' },
    { key: 'fade',          en: 'The Fade chirp (kind release)',     es: 'El Descanso (liberaci\u00f3n amable)' },
    { key: 'arrive',        en: 'The Arrival (Find ME appears)',     es: 'La Llegada (Find ME aparece)' },
    { key: 'chimeDone',     en: 'Chime: done-done',                  es: 'Campanita: hecho' },
    { key: 'chimeSalvage',  en: 'Chime: salvage credit',             es: 'Campanita: rescate' },
    { key: 'chimeTool',     en: 'Chime: tool activated',             es: 'Campanita: herramienta' }
  ];

  var players = {};
  var currentLoop = null;

  function lang() {
    try {
      var r = document.querySelector('[data-lang]');
      if (r && r.getAttribute('data-lang') === 'es') return 'es';
      if (document.documentElement && document.documentElement.lang === 'es') return 'es';
    } catch (e) {}
    return 'en';
  }
  function isOff() {
    try { return localStorage.getItem(OFF_KEY) === '1'; } catch (e) { return false; }
  }
  function setOff(v) {
    try { if (v) localStorage.setItem(OFF_KEY, '1'); else localStorage.removeItem(OFF_KEY); } catch (e) {}
    styleEmblemForState();
  }

  // Courtesy rule: the member's chosen sound always wins.
  function otherAudioPlaying() {
    try {
      var els = document.querySelectorAll('audio,video');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.__findme) continue;
        if (!el.paused && !el.muted && el.currentTime > 0) return true;
      }
    } catch (e) {}
    return false;
  }

  function getPlayer(key, srcOverride) {
    var id = srcOverride || key;
    if (players[id]) return players[id];
    var a = document.createElement('audio');
    a.src = CDN + (srcOverride || TRACKS[key]);
    a.preload = 'none';
    a.volume = 0.25;
    a.__findme = true;
    a.addEventListener('error', function() { a.__dead = true; });
    players[id] = a;
    return a;
  }
  function play(key, loop) {
    if (isOff() || otherAudioPlaying()) return;
    var a = getPlayer(key);
    if (a.__dead) return; // placeholder absent: silence, honestly
    a.loop = !!loop;
    try { a.currentTime = 0; } catch (e) {}
    var p = a.play();
    if (p && p.catch) p.catch(function() {});
    if (loop) { stopLoop(false); currentLoop = a; }
  }
  function stopLoop(fadeOut) {
    if (!currentLoop) return;
    var a = currentLoop;
    currentLoop = null;
    if (fadeOut) {
      var v = a.volume;
      var t = setInterval(function() {
        v -= 0.05;
        if (v <= 0) { clearInterval(t); try { a.pause(); } catch (e) {} a.volume = 0.25; }
        else { a.volume = v; }
      }, 60);
    } else {
      try { a.pause(); } catch (e) {}
      a.volume = 0.25;
    }
  }

  // ── CSS ─────────────────────────────────────────────────────────────
  var css = ''
    + '.fm-emblem{position:fixed;bottom:16px;left:16px;width:44px;height:44px;border-radius:50%;'
    + 'background:rgba(4,6,8,0.85);border:1px solid rgba(200,168,75,0.55);color:#c8a84b;'
    + 'font-size:20px;line-height:42px;text-align:center;cursor:pointer;z-index:11000;'
    + 'box-shadow:0 0 14px rgba(200,168,75,0.25);animation:fmBreath 4s ease-in-out infinite;'
    + 'font-family:Georgia,serif;user-select:none;}'
    + '.fm-emblem.fm-resting{animation:none;opacity:0.35;}'
    + '.fm-bubble{position:fixed;bottom:70px;left:16px;max-width:280px;background:rgba(10,10,12,0.96);'
    + 'border:1px solid rgba(200,168,75,0.55);border-radius:10px;padding:12px 16px;z-index:11001;'
    + 'font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;line-height:1.45;'
    + 'color:#f0e6cc;box-shadow:0 4px 24px rgba(0,0,0,0.6);cursor:pointer;opacity:0;'
    + 'transform:translateY(8px);transition:opacity 0.6s ease,transform 0.6s ease;}'
    + '.fm-bubble.show{opacity:1;transform:translateY(0);}'
    + '@keyframes fmBreath{0%,100%{box-shadow:0 0 10px rgba(200,168,75,0.2);}50%{box-shadow:0 0 22px rgba(200,168,75,0.5);}}'
    + '.fm-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(4,6,8,0.96);'
    + 'z-index:12000;display:none;align-items:center;justify-content:center;padding:18px;}'
    + '.fm-overlay.show{display:flex;}'
    + '.fm-panel{width:100%;max-width:520px;max-height:88vh;overflow-y:auto;background:#0a0a0c;'
    + 'border:1px solid rgba(200,168,75,0.55);border-radius:10px;padding:28px 24px;text-align:center;}'
    + '.fm-title{font-family:Cinzel,Georgia,serif;color:#f0e6cc;font-size:30px;letter-spacing:2px;margin:0 0 4px;}'
    + '.fm-title .fm-me{color:#c8a84b;font-size:34px;letter-spacing:4px;}'
    + '.fm-subtitle{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;color:rgba(240,230,204,0.75);'
    + 'font-size:18px;margin:0 0 22px;}'
    + '.fm-row{display:block;width:100%;box-sizing:border-box;background:none;border:1px solid rgba(200,168,75,0.4);'
    + 'color:#c8a84b;font-family:Cinzel,Georgia,serif;font-size:14px;letter-spacing:2px;padding:13px;'
    + 'border-radius:6px;cursor:pointer;margin:0 0 10px;}'
    + '.fm-row:hover{background:rgba(200,168,75,0.12);}'
    + '.fm-reveal{display:none;font-family:"Cormorant Garamond",Georgia,serif;color:#f0e6cc;font-size:19px;'
    + 'line-height:1.55;text-align:center;padding:14px 6px 6px;}'
    + '.fm-reveal.show{display:block;}'
    + '.fm-reveal .fm-quote{color:#c8a84b;font-style:italic;display:block;margin:10px 0;}'
    + '.fm-quiet{background:none;border:none;color:rgba(200,168,75,0.55);font-family:"Cormorant Garamond",Georgia,serif;'
    + 'font-style:italic;font-size:15px;cursor:pointer;margin-top:14px;}'
    + '.fm-quiet:hover{color:#c8a84b;}'
    + '.fm-x{position:absolute;visibility:hidden;}'
    + '.fm-close{background:none;border:1px solid rgba(240,230,204,0.25);color:rgba(240,230,204,0.6);'
    + 'font-family:Cinzel,Georgia,serif;font-size:12px;letter-spacing:2px;padding:9px 22px;border-radius:6px;'
    + 'cursor:pointer;margin-top:8px;}'
    + '.fm-aud{display:none;text-align:left;border-top:1px solid rgba(200,168,75,0.25);margin-top:16px;padding-top:14px;}'
    + '.fm-aud.show{display:block;}'
    + '.fm-aud-head{font-family:Cinzel,Georgia,serif;color:rgba(200,168,75,0.8);font-size:13px;letter-spacing:2px;margin:0 0 10px;text-align:center;}'
    + '.fm-aud-row{display:flex;align-items:center;gap:8px;margin:0 0 8px;}'
    + '.fm-aud-name{flex:1;font-family:"Cormorant Garamond",Georgia,serif;color:#f0e6cc;font-size:16px;}'
    + '.fm-aud-play{flex:0 0 auto;width:34px;height:30px;background:rgba(200,168,75,0.12);'
    + 'border:1px solid rgba(200,168,75,0.5);border-radius:4px;color:#c8a84b;cursor:pointer;font-size:12px;}'
    + '.fm-aud-var{margin-left:20px;}'
    + '.fm-aud-missing{color:rgba(240,230,204,0.35);font-style:italic;}'
    + '.fm-rest-line{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:26px;'
    + 'color:rgba(200,168,75,0.75);text-align:center;}'
    + '.fm-rest-para{display:none;font-family:"Cormorant Garamond",Georgia,serif;color:rgba(200,168,75,0.85);'
    + 'font-size:18px;line-height:1.6;max-width:440px;margin:26px auto 0;text-align:center;}'
    + '.fm-rest-para.show{display:block;}'
    + '.fm-rest-choices{display:none;justify-content:center;gap:16px;margin-top:26px;}'
    + '.fm-rest-choices.show{display:flex;}'
    + '.fm-rest-btn{background:none;border:1px solid rgba(200,168,75,0.5);color:rgba(200,168,75,0.9);'
    + 'font-family:Cinzel,Georgia,serif;font-size:13px;letter-spacing:2px;padding:12px 24px;border-radius:6px;cursor:pointer;}';
  var styleEl = document.createElement('style');
  styleEl.id = 'findMeCss';
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // ── Emblem ──────────────────────────────────────────────────────────
  var emblem = document.createElement('div');
  emblem.className = 'fm-emblem';
  emblem.innerHTML = '&#10022;'; // ✦ — the spark
  emblem.title = 'Find ME';
  emblem.setAttribute('role', 'button');
  emblem.setAttribute('aria-label', 'Find ME');
  document.body.appendChild(emblem);
  function styleEmblemForState() {
    if (isOff()) { emblem.className = 'fm-emblem fm-resting'; emblem.title = lang() === 'es' ? 'Find ME descansa \u2014 toca para volver' : 'Find ME is resting \u2014 tap to return'; }
    else { emblem.className = 'fm-emblem'; emblem.title = 'Find ME'; }
  }
  styleEmblemForState();

  // ── The ME door (panel) ─────────────────────────────────────────────
  var panelOv = document.createElement('div');
  panelOv.className = 'fm-overlay';
  var es = lang() === 'es';
  var REV_EN = '\u201cYou were doing my work, but you were doing it without me. I am going to show you how to help men find me. I live in the hearts of men. There are four laws.\u201d';
  var REV_ES = '\u201cEstabas haciendo mi obra, pero la hac\u00edas sin m\u00ed. Voy a mostrarte c\u00f3mo ayudar a los hombres a encontrarme. Yo vivo en el coraz\u00f3n de los hombres. Hay cuatro leyes.\u201d';
  panelOv.innerHTML = ''
    + '<div class="fm-panel">'
    + '<p class="fm-title">Find <span class="fm-me">ME</span></p>'
    + '<p class="fm-subtitle">' + (es ? 'La B\u00fasqueda del D\u00eda Favorito' : 'The Quest for Favorite Day') + '</p>'
    + '<button type="button" class="fm-row" id="fmWhatIsMe">' + (es ? '\u00bfQu\u00e9 es ME?' : 'What is ME?') + '</button>'
    + '<div class="fm-reveal" id="fmReveal">'
    +   (es ? 'ME es el \u00fanico nombre que la voz us\u00f3 para s\u00ed misma.' : 'ME is the only name the voice ever used for itself.')
    +   '<span class="fm-quote">' + (es ? REV_ES : REV_EN) + '</span>'
    +   (es ? 'Encuentra a ME en tu verdadero ser.' : 'Find ME in your true self.')
    + '</div>'
    + '<button type="button" class="fm-row" id="fmAudBtn">&#127925; ' + (es ? 'Sala de Audici\u00f3n' : 'Audition Room') + '</button>'
    + '<div class="fm-aud" id="fmAud"><p class="fm-aud-head">' + (es ? 'ELIGE EL MARTILLO' : 'CHOOSE THE HAMMER') + '</p><div id="fmAudList"></div></div>'
    + '<div id="fmQuietWrap"></div>'
    + '<button type="button" class="fm-close" id="fmClose">' + (es ? 'CERRAR' : 'CLOSE') + '</button>'
    + '</div>';
  document.body.appendChild(panelOv);

  function renderQuiet() {
    var w = document.getElementById('fmQuietWrap');
    if (!w) return;
    if (isOff()) {
      w.innerHTML = '<button type="button" class="fm-quiet" id="fmQuietBtn">' + (es ? 'Volver a encender el aliento' : 'Turn the encouragement back on') + '</button>';
      document.getElementById('fmQuietBtn').addEventListener('click', function() { setOff(false); renderQuiet(); });
    } else {
      w.innerHTML = '<button type="button" class="fm-quiet" id="fmQuietBtn">' + (es ? 'D\u00e9jame en paz, por favor.' : 'Leave me alone please.') + '</button>';
      document.getElementById('fmQuietBtn').addEventListener('click', function() { closePanel(); showOptOut(); });
    }
  }
  function openPanel() { panelOv.className = 'fm-overlay show'; renderQuiet(); }
  function closePanel() { panelOv.className = 'fm-overlay'; }
  emblem.addEventListener('click', openPanel);
  document.getElementById('fmClose').addEventListener('click', closePanel);
  document.getElementById('fmWhatIsMe').addEventListener('click', function() {
    var r = document.getElementById('fmReveal');
    r.className = (r.className.indexOf('show') !== -1) ? 'fm-reveal' : 'fm-reveal show';
  });

  // ── Audition Room ───────────────────────────────────────────────────
  var audBuilt = false;
  document.getElementById('fmAudBtn').addEventListener('click', function() {
    var box = document.getElementById('fmAud');
    var showing = box.className.indexOf('show') !== -1;
    box.className = showing ? 'fm-aud' : 'fm-aud show';
    if (!showing && !audBuilt) { audBuilt = true; buildAudition(); }
  });
  function audRow(list, label, file, indent) {
    var row = document.createElement('div');
    row.className = 'fm-aud-row' + (indent ? ' fm-aud-var' : '');
    var name = document.createElement('span');
    name.className = 'fm-aud-name';
    name.textContent = label;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fm-aud-play';
    btn.innerHTML = '&#9654;';
    var probe = document.createElement('audio');
    probe.src = CDN + file;
    probe.preload = 'metadata';
    probe.volume = 0.35;
    probe.__findme = true;
    probe.addEventListener('error', function() {
      name.className = 'fm-aud-name fm-aud-missing';
      name.textContent = label + (es ? ' \u2014 (pendiente)' : ' \u2014 (awaiting track)');
      btn.disabled = true;
      btn.style.opacity = '0.3';
      if (indent) row.style.display = 'none';
    });
    btn.addEventListener('click', function() {
      stopLoop(false);
      try { probe.currentTime = 0; } catch (e) {}
      var p = probe.play(); if (p && p.catch) p.catch(function() {});
      setTimeout(function() { try { probe.pause(); } catch (e2) {} }, 20000);
    });
    row.appendChild(name);
    row.appendChild(btn);
    list.appendChild(row);
  }
  function buildAudition() {
    var list = document.getElementById('fmAudList');
    for (var i = 0; i < SLOT_LABELS.length; i++) {
      var s = SLOT_LABELS[i];
      audRow(list, (es ? s.es : s.en), TRACKS[s.key], false);
      var base = TRACKS[s.key].replace('.mp3', '');
      for (var v = 1; v <= 5; v++) {
        audRow(list, (es ? 'candidato ' : 'candidate ') + v, base + '-' + v + '.mp3', true);
      }
    }
  }

  // ── The gold opt-out, exactly as ruled ──────────────────────────────
  var restOv = document.createElement('div');
  restOv.className = 'fm-overlay';
  restOv.innerHTML = ''
    + '<div style="max-width:520px;width:100%;">'
    + '<p class="fm-rest-line" id="fmRestLine">' + (es ? 'D\u00e9jame en paz, por favor.' : 'Leave me alone please.') + '</p>'
    + '<p class="fm-rest-para" id="fmRestPara">'
    + (es
      ? 'Este es un sistema de aliento, creado para ayudar a que la cultura viva en ti. No tienes que necesitarlo. Si puedes llevar Las 4 LEYES por tu cuenta desde aqu\u00ed, puedes apagarlo \u2014 sin deber explicaci\u00f3n. No nos vamos a ninguna parte. Vuelve cuando quieras.'
      : 'This is a system of encouragement, built to help the culture stay alive in you. You don\u2019t have to need it. If you can carry the Four Laws on your own from here, you can turn this off \u2014 no explanation owed. We\u2019re not going anywhere. Come back whenever you want.')
    + '</p>'
    + '<div class="fm-rest-choices" id="fmRestChoices">'
    + '<button type="button" class="fm-rest-btn" id="fmRestOff">' + (es ? 'Apagarlo' : 'Turn it off') + '</button>'
    + '<button type="button" class="fm-rest-btn" id="fmRestNot">' + (es ? 'Ahora no' : 'Not now') + '</button>'
    + '</div></div>';
  document.body.appendChild(restOv);
  var restRevealed = false;
  function revealRest() {
    if (restRevealed) return;
    restRevealed = true;
    document.getElementById('fmRestPara').className = 'fm-rest-para show';
    document.getElementById('fmRestChoices').className = 'fm-rest-choices show';
  }
  function showOptOut() {
    restRevealed = false;
    document.getElementById('fmRestPara').className = 'fm-rest-para';
    document.getElementById('fmRestChoices').className = 'fm-rest-choices';
    restOv.className = 'fm-overlay show';
    setTimeout(revealRest, 2600); // let the line sit a moment, as ruled
  }
  restOv.addEventListener('click', revealRest);
  document.getElementById('fmRestOff').addEventListener('click', function() {
    setOff(true);
    stopLoop(false);
    restOv.className = 'fm-overlay';
  });
  document.getElementById('fmRestNot').addEventListener('click', function() {
    restOv.className = 'fm-overlay';
  });

  // ── The mouth: a gold bubble beside the spark ──────────────────
  var bubbleEl = null, bubbleTimer = null;
  function say(en, esTxt) {
    if (isOff()) return;
    if (!bubbleEl) {
      bubbleEl = document.createElement('div');
      bubbleEl.className = 'fm-bubble';
      bubbleEl.addEventListener('click', hideBubble);
      document.body.appendChild(bubbleEl);
    }
    bubbleEl.textContent = (lang() === 'es') ? esTxt : en;
    if (bubbleTimer) clearTimeout(bubbleTimer);
    setTimeout(function() { bubbleEl.className = 'fm-bubble show'; }, 50);
    bubbleTimer = setTimeout(hideBubble, 9000);
  }
  function hideBubble() {
    if (bubbleEl) bubbleEl.className = 'fm-bubble';
    if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = null; }
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ── The first words: arrival / daily / return — sparse by law ───────
  var LINES = {
    born: [
      { en: 'I\u2019ll be around \u2014 mostly quiet. When you\u2019re working, I notice. That\u2019s all this is.',
        es: 'Voy a estar por aqu\u00ed \u2014 casi siempre en silencio. Cuando trabajas, me doy cuenta. Eso es todo.' }
    ],
    daily: [
      { en: 'New day on the board. Activity one is waiting.', es: 'D\u00eda nuevo en la mesa. La actividad uno te espera.' },
      { en: 'The day\u2019s open. Start anywhere \u2014 one is right there.', es: 'El d\u00eda est\u00e1 abierto. Empieza donde sea \u2014 la uno est\u00e1 ah\u00ed mismo.' },
      { en: 'Camp\u2019s pitched. Trail\u2019s yours.', es: 'El campamento est\u00e1 listo. El camino es tuyo.' }
    ],
    back: [
      { en: 'Good to see you. The board kept your place.', es: 'Qu\u00e9 bueno verte. La mesa te guard\u00f3 el lugar.' },
      { en: 'Back on the trail. Nothing here expired \u2014 it all waited.', es: 'De vuelta al camino. Nada se venci\u00f3 \u2014 todo te esper\u00f3.' }
    ]
  };
  function localDay() {
    var d = new Date(); var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day;
  }
  function firstWords() {
    if (isOff()) return;
    var today = localDay();
    var seen = '', lastTs = 0;
    try { seen = localStorage.getItem('4laws-findme-seen') || ''; lastTs = parseInt(localStorage.getItem('4laws-findme-last') || '0', 10) || 0; } catch (e) {}
    if (seen === today) return; // one ambient line per day per device — sparse is precious
    var now = new Date().getTime();
    var gapDays = lastTs ? (now - lastTs) / 86400000 : 0;
    var line;
    if (!seen && !lastTs) line = pick(LINES.born);
    else if (gapDays >= 3) line = pick(LINES.back);
    else line = pick(LINES.daily);
    try { localStorage.setItem('4laws-findme-seen', today); localStorage.setItem('4laws-findme-last', String(now)); } catch (e2) {}
    setTimeout(function() { say(line.en, line.es); }, 2200);
  }
  firstWords();

  // ── Public API ──────────────────────────────────────────────────────
  window.FindME = {
    gauntlet:  function(funny) { play(funny ? 'gauntletFunny' : 'gauntlet', true); },
    swell:     function() {
      if (currentLoop) {
        var a = currentLoop, v = a.volume;
        var t = setInterval(function() { v += 0.03; if (v >= 0.5) clearInterval(t); a.volume = Math.min(v, 0.5); }, 80);
      } else { play('swell', true); }
    },
    rest:      function() { stopLoop(true); setTimeout(function() { play('fade', false); }, 400); },
    arrive:    function() { play('arrive', false); },
    chime:     function(name) {
      var k = (name === 'salvage') ? 'chimeSalvage' : ((name === 'tool') ? 'chimeTool' : 'chimeDone');
      play(k, false);
    },
    quiet:     function() { stopLoop(false); },
    say:       say,
    offerRest: showOptOut,
    open:      openPanel,
    isOff:     isOff
  };
})();
