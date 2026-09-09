/* ============================================================
   v1.4.1 — flame (streaks) and the legacy sword delivered; all seven honor
   kinds now carry real art. Complete.
   v1.4 THE GLASS WALL — the founder's two rulings before deploy: (1) never
   icons — every kind gets a real painted image he supplies, seated by name;
   (2) not felt cards with a
   floating icon — a MOSAIC WALL of tiles packed edge to edge (1px seams),
   the image fills the tile, name+count on a bottom shade; earned = full
   color and lit, unearned = the same tile desaturated and dark but still
   named — nothing hidden from the wall. The anvil face and forge coins are
   real art now too. "Broke in your pocket, rich in our cyber world."
   v1.3.1 THE BLOOM — the founder's correction before deploy: the pictures are
   good; keep them, and let them GROW — hover (or tap, on a phone) a monster's
   face or any picture in a list and it blooms from icon to a full round photo,
   then settles. Same file; not yet deployed.
   LIFE-LIVING.JS v1.3 — THE TROPHY ROOM (Bench 35, Tue 9/8/26 night, the
   founder's dictated verdict on the first filled Wall: "I had to study the
   page" — text too small and dim to know the four cards were monsters; a
   row of look-alike glowing circles with no names; the anvil "a black
   button that blinks… zero art"; "this is a trophy space — pearls, gems,
   gold"). THE TROPHY ROOM: a MONSTERS header and each monster's name in
   the house gold filling its card, the count large; the honors as SHELVES
   you can read from across the room — TROPHIES · MEDALS · RIBBONS · STREAKS ·
   FORGES — each a plate with its icon and count in big gold, empty shelves
   dim but named, tap a shelf → that kind's list one line each, new ones
   glow; THE FORGE with Bruno-at-the-forge art from the house gallery, gold
   coins for tokens, the badge as a gold plate, a gold door; a bottom banner
   of the house's own art. Cumulative on v1.2.1.
   LIFE-LIVING.JS v1.2.1 — THE PILE'S FACE (Bench 35, Tue 9/8/26, field catch:
   the Pile's face was blank on the Wall — LifeArt keys Responsibility as
   'resp', not 'responsibility'; the face and the trophy heads now ask by
   the right key. Cumulative on v1.2.)
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
  var LL = { v: '1.4.1', honors: null, library: null, forge: null, booted: false, open: '', openVol: '', anvilOpen: false, shelfOpen: '' };
  window.LifeLiving = LL;

  var MON = {
    pile: { law: 'resp', en: 'THE PILE', es: 'LA PILA' },   /* v1.2.1: LifeArt's key for Responsibility is 'resp' */
    cold: { law: 'respect', en: 'THE COLD SHOULDER', es: 'EL DESAIRE' },
    fog:  { law: 'talent', en: 'THE FOG', es: 'LA NIEBLA' },
    conq: { law: 'limits', en: 'THE VIOLATOR', es: 'EL TRANSGRESOR' }
  };

  var HONOR_ART = {
    trophy: 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/f66509a9-af4a-4756-a7b0-405ef075fafb/imgg-z4a-p9v28pj6.png?format=1500w',
    medal:  'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/7549ee31-d0ad-467a-89d4-47c4d874b8ad/imgg-lkl-zxnz5hw3.png?format=1500w',
    ribbon: 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/b22c1595-3754-4222-8445-4bcb943f230b/imgg-gdl-jf7xfovj.png?format=1500w',
    forge:  'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/bc0abcc4-919d-46fd-8fcf-7d11837435c4/imgg-o38-cwf6u1nx.png?format=1500w',
    streak: 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/c4bc220d-a140-453c-8b5c-8dd141dad67a/imgg-vww-u9ghd1t9.png?format=1500w',
    legacy: 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/756e6018-db58-42ff-9e73-79fc31350afa/imgg-gzk-usqgtcl5.png?format=1500w'
  };
  var COIN_ART = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/5fa9b77f-b9f4-4e34-8726-9c0f31b5300f/imgg-9ad-b9rlsrh7.png?format=1500w';
  var FORGE_FACE_ART = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/b428b5d7-1560-4b9d-95ac-5b7cbbc73962/imgg-law-45zaoux9.png?format=1500w';
  var BANNER_ART = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/cee43634-0f83-41c6-acc1-3d2163ba9027/imgg-92r-9wv3wsh2.png?format=1500w';

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
      '.llHdr{font-family:"Cinzel",serif;font-size:13px;letter-spacing:.28em;color:#c8a84b;text-align:center;margin:4px 0 10px;}' +
      '.llHdr:before,.llHdr:after{content:"\u2014";color:#7a5a12;margin:0 10px;}' +
      '.llCard{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:10px;margin-bottom:14px;}' +
      '.llKill{-webkit-flex:1 1 200px;flex:1 1 200px;background:linear-gradient(180deg,#151a22,#0c1016);border:1.5px solid #7a5a12;border-radius:12px;padding:12px 14px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:12px;box-shadow:inset 0 0 0 1px rgba(255,215,94,.08);}' +
      '.llKill img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #c8a84b;-webkit-flex:none;flex:none;cursor:pointer;-webkit-transition:width .35s,height .35s,box-shadow .35s;transition:width .35s,height .35s,box-shadow .35s;}' +
      '.llKill img:hover,.llKill img.big{width:148px;height:148px;box-shadow:0 0 24px rgba(255,215,94,.6);border-color:#ffd75e;}' +
      '.llKill .llName{-webkit-flex:1;flex:1;font-family:"Cinzel",serif;font-size:19px;font-weight:700;color:#ffd75e;letter-spacing:.06em;line-height:1.15;text-shadow:0 1px 0 #7a5a12,0 2px 8px rgba(0,0,0,.8);}' +
      '.llKill .llCount{-webkit-flex:none;flex:none;font-family:"Cinzel",serif;font-size:34px;color:#ffd75e;line-height:1;text-shadow:0 0 14px rgba(255,215,94,.45);}' +
      '.llKill .llCount small{display:block;font-size:9px;letter-spacing:.2em;color:#a89968;text-align:right;margin-top:2px;}' +
      '.llShelves{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:2px;margin-bottom:2px;}' +
      '.llShelfCard{-webkit-flex:1 1 130px;flex:1 1 130px;aspect-ratio:1/1;background:#0c1016 center/cover no-repeat;border:1px solid #1a1408;cursor:pointer;position:relative;overflow:hidden;-webkit-transition:box-shadow .25s,-webkit-filter .25s;transition:box-shadow .25s,filter .25s;}' +
      '.llShelfCard .llTileShade{position:absolute;left:0;right:0;bottom:0;top:55%;background:linear-gradient(180deg,rgba(4,6,8,0) 0%,rgba(4,6,8,.92) 100%);}' +
      '.llShelfCard .llIcon{position:absolute;left:50%;top:44%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:30px;opacity:.8;}' +
      '.llShelfCard .llN{position:absolute;left:0;right:0;bottom:20px;text-align:center;font-family:"Cinzel",serif;font-size:26px;color:#ffd75e;line-height:1;text-shadow:0 0 12px rgba(0,0,0,.9),0 0 16px rgba(255,215,94,.5);}' +
      '.llShelfCard .llLbl{position:absolute;left:0;right:0;bottom:6px;text-align:center;font-family:"Cinzel",serif;font-size:10px;letter-spacing:.18em;color:#f0e6cc;text-shadow:0 1px 3px rgba(0,0,0,.9);}' +
      '.llShelfCard.empty{-webkit-filter:grayscale(.9) brightness(.35);filter:grayscale(.9) brightness(.35);cursor:default;}' +
      '.llShelfCard.empty .llN{color:#8a7a4a;text-shadow:none;}' +
      '.llShelfCard.fresh{box-shadow:inset 0 0 0 2px #ffd75e,0 0 20px rgba(255,215,94,.6);-webkit-animation:llGlow 1.6s ease-in-out infinite;animation:llGlow 1.6s ease-in-out infinite;}' +
      '.llShelfCard.open{box-shadow:inset 0 0 0 2px #ffd75e,0 0 24px rgba(255,215,94,.7);}' +
      '.llList{display:none;margin:4px auto 10px;max-width:560px;}' +
      '.llList.on{display:block;}' +
      '.llRow{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid #2a2416;}' +
      '.llRow .llRowHead{width:44px;height:44px;border-radius:50%;border:2px solid #c8a84b;background:#10141b;-webkit-flex:none;flex:none;overflow:hidden;font-size:22px;line-height:44px;text-align:center;cursor:pointer;-webkit-transition:width .35s,height .35s,line-height .35s,box-shadow .35s;transition:width .35s,height .35s,line-height .35s,box-shadow .35s;}' +
      '.llRow .llRowHead:hover,.llRow .llRowHead.big{width:132px;height:132px;line-height:132px;font-size:56px;box-shadow:0 0 24px rgba(255,215,94,.6);border-color:#ffd75e;}' +
      '.llShelfCard img.llTileFull{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;-webkit-transition:-webkit-filter .35s;transition:filter .35s;}' +
      '.llRow .llRowHead img{width:100%;height:100%;object-fit:cover;}' +
      '.llRow .llRowName{font-family:"Cinzel",serif;font-size:14px;color:#ffd75e;letter-spacing:.05em;}' +
      '.llRow .llRowDetail{font-size:13px;color:#d8ccaa;font-style:italic;}' +
      '.llRow .llRowDate{margin-left:auto;font-size:11px;color:#a89968;-webkit-flex:none;flex:none;}' +
      '.llRow.fresh .llRowHead{box-shadow:0 0 14px rgba(255,215,94,.7);border-color:#ffd75e;}' +
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
      /* v1.3 THE FORGE: art, coins, a gold plate */
      '#llForge{width:100%;border-top:1px solid #2a2416;margin-top:14px;padding-top:12px;text-align:center;}' +
      '.llAnvil{display:inline-block;width:148px;height:148px;border-radius:50%;border:3px solid #7a5a12;background:#10141b center 30%/cover no-repeat;cursor:pointer;opacity:.5;-webkit-filter:grayscale(.7);filter:grayscale(.7);position:relative;-webkit-transition:opacity .3s,box-shadow .3s,transform .3s,-webkit-filter .3s;transition:opacity .3s,box-shadow .3s,transform .3s,filter .3s;}' +
      '.llAnvil.hot{-webkit-filter:none;filter:none;}' +
      '.llAnvil .llAnvilSym{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:52px;line-height:1;}' +
      '.llAnvil.hasArt .llAnvilSym{display:none;}' +
      '.llAnvil.hot{opacity:1;border-color:#ffd75e;-webkit-animation:llGlow 1.4s ease-in-out infinite;animation:llGlow 1.4s ease-in-out infinite;}' +
      '.llAnvil.open{transform:scale(1.05);box-shadow:0 0 30px rgba(255,215,94,.85);}' +
      '.llCoins{margin-top:10px;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;gap:6px;min-height:34px;}' +
      '.llCoins img{width:32px;height:32px;border-radius:50%;box-shadow:0 0 8px rgba(255,215,94,.5);}' +
      '.llForgeLine{display:none;margin:12px auto 0;max-width:460px;}' +
      '.llForgeLine.on{display:block;}' +
      '.llForgeTitle{font-family:"Cinzel",serif;font-size:16px;font-weight:700;color:#ffd75e;letter-spacing:.12em;text-shadow:0 1px 0 #7a5a12,0 0 12px rgba(255,215,94,.4);}' +
      '.llBadgePlate{display:inline-block;margin-top:8px;padding:8px 18px;border:1.5px solid #ffd75e;border-radius:10px;background:linear-gradient(180deg,#2a2010,#151009);font-family:"Cinzel",serif;font-size:14px;color:#ffd75e;letter-spacing:.1em;box-shadow:0 0 16px rgba(255,215,94,.3),inset 0 0 0 1px rgba(255,215,94,.15);}' +
      '.llForgeRest{font-family:"Cinzel",serif;font-size:13px;color:#a89968;letter-spacing:.12em;}' +
      '.llForgeDoor{display:inline-block;margin-top:12px;padding:12px 24px;border-radius:999px;background:linear-gradient(180deg,#ffd75e,#c8a84b);color:#040608;font-family:"Cinzel",serif;font-size:13px;letter-spacing:.16em;text-decoration:none;font-weight:700;box-shadow:0 0 18px rgba(255,215,94,.45);}' +
      '.llBanner{width:100%;height:130px;border-radius:12px;margin-top:18px;background:#10141b center/cover no-repeat;border:1.5px solid #7a5a12;position:relative;overflow:hidden;}' +
      '.llBanner:after{content:"";position:absolute;left:0;right:0;top:0;bottom:0;background:linear-gradient(90deg,rgba(4,6,8,.55),rgba(4,6,8,0) 40%,rgba(4,6,8,0) 60%,rgba(4,6,8,.55));}' +
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
  var SHELVES = [
    { kind: 'trophy', en: 'TROPHIES', es: 'TROFEOS' },
    { kind: 'medal',  en: 'MEDALS',   es: 'MEDALLAS' },
    { kind: 'ribbon', en: 'RIBBONS',  es: 'LISTONES' },
    { kind: 'streak', en: 'STREAKS',  es: 'RACHAS' },
    { kind: 'forge',  en: 'FORGES',   es: 'FRAGUAS' },
    { kind: 'legacy', en: 'LEGACIES', es: 'LEGADOS' }
  ];
  function artKey(law) { return law === 'responsibility' ? 'resp' : law; }
  function bannerArt() { var A = art(), keys = ['window-wall', 'wall', 'banner-wall', 'trophy-case'], i, u; for (i = 0; i < keys.length; i++) { try { u = A.get(keys[i]); if (u) { return u; } } catch (e) {} } return ''; }
  function forgeArt() { var A = art(), keys = ['bruno', 'bruno-smith', 'brunoSmith', 'smith', 'window-armory', 'armory'], i, u; for (i = 0; i < keys.length; i++) { try { u = A.get(keys[i]); if (u) { return u; } } catch (e) {} } return ''; }
  

  LL.renderWall = function () {
    var w = $('trophyWall'); if (!w || !LL.honors) { return; }
    var old = $('llWall'); if (old) { old.parentNode.removeChild(old); }
    css();
    var A = art(), D = LL.honors, real = D.honors || [], i, k, h = '', byKind = {}, freshKind = {};
    for (i = 0; i < real.length; i++) {
      var r = real[i]; if (r.kind === 'kill') { continue; }
      byKind[r.kind] = byKind[r.kind] || []; byKind[r.kind].push(r);
      if (freshIds[r.id]) { freshKind[r.kind] = true; }
    }
    /* MONSTERS -- the names in the house gold, filling the card; the count large */
    if (D.kills) {
      h += '<div class="llHdr">' + T('MONSTERS', 'MONSTRUOS') + '</div><div class="llCard">';
      for (k in MON) {
        if (!MON.hasOwnProperty(k)) { continue; }
        var m = MON[k], img = '';
        try { img = A.pair(m.law).monster || A.get(k) || ''; } catch (e1) { img = ''; }
        h += '<div class="llKill">' + (img ? '<img src="' + esc(img) + '" alt="">' : '') + '<div class="llName">' + T(m.en, m.es) + '</div><div class="llCount">' + (D.kills[k] || 0) + '<small>' + T('HEADS', 'CABEZAS') + '</small></div></div>';
      }
      h += '</div>';
    }
    /* THE SHELVES -- readable from across the room; empty ones dim but named */
    h += '<div class="llHdr">' + T('HONORS', 'HONORES') + '</div><div class="llShelves">';
    var anyMounted = false;
    for (i = 0; i < SHELVES.length; i++) {
      var sh = SHELVES[i], list = byKind[sh.kind] || [], n = list.length; if (n) { anyMounted = true; }
      var art2 = HONOR_ART[sh.kind];
      h += '<div class="llShelfCard' + (n ? '' : ' empty') + (freshKind[sh.kind] ? ' fresh' : '') + (LL.shelfOpen === sh.kind ? ' open' : '') + '" data-kind="' + sh.kind + '" style="' + (art2 ? 'background-image:url(' + esc(art2) + ')' : '') + '">'
        + (art2 ? '' : '<div class="llIcon">' + sym(sh.kind) + '</div>') + '<div class="llTileShade"></div><div class="llN">' + n + '</div><div class="llLbl">' + T(sh.en, sh.es) + '</div></div>';
    }
    h += '</div><div class="llList" id="llList"></div>';
    h += '<div id="llForge"></div>';
    var ban = BANNER_ART || bannerArt(); if (ban) { h += '<div class="llBanner" style="background-image:url(' + esc(ban) + ')"></div>'; }
    var wrap = document.createElement('div'); wrap.id = 'llWall'; wrap.innerHTML = h;
    var empty = w.querySelector('.emptyWall'); if (empty && (anyMounted || (D.kills && (D.kills.pile || D.kills.cold || D.kills.fog || D.kills.conq)))) { empty.style.display = 'none'; }
    if (w.firstChild) { w.insertBefore(wrap, w.firstChild); } else { w.appendChild(wrap); }
    var cards = wrap.querySelectorAll('.llShelfCard');
    for (i = 0; i < cards.length; i++) { if (cards[i].className.indexOf('empty') < 0) { cards[i].onclick = onShelf; } }
    var faces = wrap.querySelectorAll('.llKill img');
    for (i = 0; i < faces.length; i++) { faces[i].onclick = bloom; }
    if (LL.shelfOpen) { showList(LL.shelfOpen); }
    LL.renderForge();
  };
  function onShelf(ev) {
    var kind = this.getAttribute('data-kind');
    if (LL.shelfOpen === kind) { LL.shelfOpen = ''; var l0 = $('llList'); if (l0) { l0.className = 'llList'; } this.className = this.className.replace(' open', ''); return; }
    LL.shelfOpen = kind; var all = document.querySelectorAll('.llShelfCard.open'); for (var i = 0; i < all.length; i++) { all[i].className = all[i].className.replace(' open', ''); }
    this.className += ' open'; this.className = this.className.replace(' fresh', '');
    showList(kind);
    if (ev && ev.stopPropagation) { ev.stopPropagation(); }
  }
  function showList(kind) {
    var l = $('llList'); if (!l || !LL.honors) { return; }
    var A = art(), list = LL.honors.honors || [], i, h = '';
    for (i = 0; i < list.length; i++) {
      var t = list[i]; if (t.kind !== kind) { continue; }
      var head = ''; try { if (t.kind === 'trophy' && t.law) { head = A.pair(artKey(t.law)).defeat || ''; } } catch (e) { head = ''; }
      h += '<div class="llRow' + (freshIds[t.id] ? ' fresh' : '') + '"><div class="llRowHead">' + (head ? '<img src="' + esc(head) + '" alt="">' : sym(t.kind)) + '</div><div><div class="llRowName">' + esc(t.name) + '</div>' + (t.detail ? '<div class="llRowDetail">' + esc(t.detail) + '</div>' : '') + '</div><div class="llRowDate">' + esc(t.date) + '</div></div>';
      delete freshIds[t.id];
    }
    l.innerHTML = h; l.className = h ? 'llList on' : 'llList';
    var heads = l.querySelectorAll('.llRowHead');
    for (i = 0; i < heads.length; i++) { heads[i].onclick = bloom; }
  }
  /* a picture blooms from icon to photo on tap (phones have no hover); tap again, it settles */
  function bloom(ev) {
    var on = this.className.indexOf(' big') >= 0;
    var all = document.querySelectorAll('.big'); for (var i = 0; i < all.length; i++) { all[i].className = all[i].className.replace(' big', ''); }
    if (!on) { this.className += ' big'; }
    if (ev && ev.stopPropagation) { ev.stopPropagation(); }
  }

  /* ---------- THE ANVIL: the Forge at HQ ---------- */
  LL.renderForge = function () {
    var f = $('llForge'); if (!f) { return; }
    var F = LL.forge; if (!F) { f.innerHTML = ''; return; }
    css();
    var hot = (F.available || 0) > 0, i, h = '', fa = FORGE_FACE_ART || forgeArt();
    h += '<div class="llHdr">' + T('THE FORGE', 'LA FRAGUA') + '</div>';
    h += '<div class="llAnvil' + (hot ? ' hot' : '') + (LL.anvilOpen ? ' open' : '') + (fa ? ' hasArt' : '') + '" id="llAnvil"' + (fa ? ' style="background-image:url(' + esc(fa) + ')"' : '') + '><span class="llAnvilSym">\u2692</span></div>';
    var coins = '', total = Math.max(F.available || 0, 0);
    for (i = 0; i < Math.min(total, 6); i++) { coins += '<img src="' + esc(COIN_ART) + '" alt="">'; }
    h += '<div class="llCoins">' + coins + (total > 6 ? '<span style="font-family:Cinzel,serif;color:#ffd75e;align-self:center;"> +' + (total - 6) + '</span>' : '') + '</div>';
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
      l.innerHTML = '<div class="llForgeTitle">' + T('A LEGACY WEAPON IS YOURS', 'UN ARMA LEGADO ES TUYA') + '</div>'
        + '<div class="llBadgePlate">' + esc(F.badge || '') + '</div>'
        + '<div><a class="llForgeDoor" id="llForgeDoor" href="/arsenal#forge">' + T('DESIGN IT AT THE ARMORY \u2192', 'DIS\u00c9\u00d1ALA EN LA ARMER\u00cdA \u2192') + '</a></div>';
    } else {
      l.innerHTML = '<div class="llForgeRest">' + T('THE ANVIL RESTS', 'EL YUNQUE DESCANSA') + '</div>';
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
