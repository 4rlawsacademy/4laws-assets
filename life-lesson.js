/* ============================================================
   LIFE-LESSON.JS v1.1 — THE HOME TOUR (Bench 28, the Gaming Bench)
   Winston's one-time guided tour: show -> TRY IT -> celebrate -> next.
   v1.1 (9/3/26, cut on PWS_Talent_shell_v125_29 + todos v62.1 timber):
   1. FLEET SELECTORS - the view-toggle is found by its documented
      data-winston="view-toggle" stamp (brain-injected on /pws) with
      #pwsViewToggle as first try; the ACCESSORIES door is found by
      #tdUseAccDoor (future id), then the #tdUseAccWrap sibling walk,
      then an honest text scan of footer buttons (ACCESSORIES/
      ACCESORIOS) - one lesson now true on /todos AND /pws.
   2. THE COURTEOUS BUBBLE (founder's field catch): the bubble steps
      aside horizontally - target on the right half of the screen,
      bubble leans left; target left, bubble leans right - so it
      covers less of what sits under the spotlit button.
   3. BD counsel honored: id-first targeting wherever an id exists.
   v1.0 cut 9/3/26 on todos-v61_2_THE_GUARDED_NAME.html
   (header ids verified: pwsViewToggle / pwsVoiceBtn / pwsUseMoreBtn /
   pwsUseCloseBtn2; ACCESSORIES door = previousElementSibling of
   #tdUseAccWrap in the workbench footer).
   Founder's laws honored:
   - after each step the member TRIES the real button (real action
     detected in capture phase; no OK-button theater); the real room
     answers — the view flips, the drawer unfolds. Consequence teaches.
   - once-per-member: localStorage '4laws-lesson' (separate key from
     Bench 33's '4laws-winston' — a walked tour never dims a whisper).
   - one face: winston-medallion.png from the organ bank, never forked.
   - one voice: terse, warm, first person, signed — WINSTON.
   - EN/ES via '4laws-lang' / body.lang-es.
   - graceful: unknown lesson keys ignored; missing/invisible buttons
     skipped honestly; if this organ fails to load, nothing breaks.
   ADOPTION (Bench 33, one line inside the /todos paste, beside the
   super-bucket tag):
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/life-lesson.js"></script>
   The organ sweeps on its own: when the Doc B room opens and the
   member has never walked the tour, Winston offers it once.
   ============================================================ */
(function(){
  'use strict';
  if (window.LifeLesson) { return; } /* one organ, never twice */

  var CDN = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/';
  var MEMKEY = '4laws-lesson';
  var lessons = {}, cur = null, step = 0;
  var shades = [], ring = null, arrow = null, bubble = null, capture = null;
  var offeredThisLoad = {};

  /* ---------------- plumbing ---------------- */
  function lang(){
    try {
      if (document.body && document.body.className.indexOf('lang-es') !== -1) { return 'es'; }
      return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en';
    } catch(e) { return 'en'; }
  }
  function T(o){ var L = lang(); return o[L] || o.en; }
  function mem(){ try { return JSON.parse(localStorage.getItem(MEMKEY) || '{}'); } catch(e) { return {}; } }
  function memSet(m){ try { localStorage.setItem(MEMKEY, JSON.stringify(m)); } catch(e) {} }
  function visible(el){
    if (!el) { return false; }
    if (!el.offsetParent && el.offsetWidth === 0 && el.offsetHeight === 0) { return false; }
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }
  function findEl(st){
    var el = null;
    try {
      if (st.find) { el = st.find(); }
      else if (st.sel) { el = document.querySelector(st.sel); }
    } catch(e) {}
    return (el && visible(el)) ? el : null;
  }

  /* ---------------- styles (self-injected; no page CSS touched) ---------------- */
  function css(){
    if (document.getElementById('llCss')) { return; }
    var s = document.createElement('style'); s.id = 'llCss';
    s.textContent = ''
      + '.llShade{position:fixed;background:rgba(2,3,5,.84);z-index:2500000;}'
      + '.llRing{position:fixed;border:2.5px solid #ffd75e;border-radius:12px;box-shadow:0 0 18px rgba(255,215,94,.55);z-index:2500001;pointer-events:none;}'
      + '.llRing.pulse{box-shadow:0 0 34px rgba(255,215,94,.95);}'
      + '.llArrow{position:fixed;z-index:2500002;font-size:30px;color:#ffd75e;text-shadow:0 2px 8px rgba(0,0,0,.9);pointer-events:none;-webkit-animation:llBob 1.1s ease-in-out infinite;animation:llBob 1.1s ease-in-out infinite;}'
      + '@-webkit-keyframes llBob{0%,100%{-webkit-transform:translateY(0);}50%{-webkit-transform:translateY(7px);}}'
      + '@keyframes llBob{0%,100%{transform:translateY(0);}50%{transform:translateY(7px);}}'
      + '.llBubble{position:fixed;z-index:2500003;max-width:340px;width:88vw;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:14px 16px 12px;box-shadow:0 8px 30px rgba(0,0,0,.8);font-family:\'Cormorant Garamond\',Georgia,serif;}'
      + '.llTop{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:10px;margin:0 0 8px;}'
      + '.llCoin{width:44px;height:44px;border-radius:50%;border:2px solid #ffd75e;object-fit:cover;background:#10141b;}'
      + '.llCoinPh{width:44px;height:44px;border-radius:50%;border:2px solid #ffd75e;background:#10141b;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;font-family:Cinzel,serif;font-weight:900;color:#ffd75e;font-size:20px;}'
      + '.llStep{font-family:Cinzel,serif;font-size:12px;letter-spacing:.22em;color:#c8a84b;}'
      + '.llSay{font-size:19px;color:#f0e6cc;margin:0 0 4px;line-height:1.45;}'
      + '.llTry{font-size:18px;font-style:italic;color:#ffd75e;margin:0 0 8px;}'
      + '.llSign{font-family:Cinzel,serif;font-size:12px;letter-spacing:.18em;color:#c8a84b;text-align:right;margin:2px 0 8px;}'
      + '.llBtnRow{display:-webkit-flex;display:flex;gap:10px;-webkit-align-items:center;align-items:center;}'
      + '.llNext{background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:15px;letter-spacing:.12em;padding:11px 22px;min-height:46px;cursor:pointer;}'
      + '.llSkip{background:none;border:none;color:#8a7b52;font-family:Cinzel,serif;font-size:12px;letter-spacing:.15em;cursor:pointer;padding:10px 4px;min-height:44px;}'
      + '.llDots{margin-left:auto;font-size:13px;color:#8a7b52;letter-spacing:.3em;}'
      + '.llDots b{color:#ffd75e;}'
      + '.llOffer{position:fixed;left:50%;bottom:22px;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:2400000;background:rgba(6,8,12,.97);border:2px solid #c8a84b;border-radius:14px;padding:12px 16px;max-width:360px;width:92vw;box-shadow:0 8px 30px rgba(0,0,0,.8);font-family:\'Cormorant Garamond\',Georgia,serif;}';
    document.head.appendChild(s);
  }

  function coinHtml(){
    return '<img class="llCoin" src="' + CDN + 'winston-medallion.png" alt="Winston" onerror="this.outerHTML=\'&lt;div class=&quot;llCoinPh&quot;&gt;W&lt;/div&gt;\'">';
  }

  /* ---------------- UI lifecycle ---------------- */
  function clearUI(){
    var i;
    for (i = 0; i < shades.length; i++) { if (shades[i].parentNode) { shades[i].parentNode.removeChild(shades[i]); } }
    shades = [];
    if (ring && ring.parentNode) { ring.parentNode.removeChild(ring); } ring = null;
    if (arrow && arrow.parentNode) { arrow.parentNode.removeChild(arrow); } arrow = null;
    if (bubble && bubble.parentNode) { bubble.parentNode.removeChild(bubble); } bubble = null;
    if (capture) { document.removeEventListener('click', capture, true); capture = null; }
  }
  function shade(t, l, w, h){
    var d = document.createElement('div'); d.className = 'llShade';
    d.style.top = t + 'px'; d.style.left = l + 'px'; d.style.width = w + 'px'; d.style.height = h + 'px';
    document.body.appendChild(d); shades.push(d); return d;
  }
  function dots(){
    var s = ''; for (var i = 0; i < cur.steps.length; i++) { s += (i <= step ? '\u25CF' : '\u25CB'); } return s;
  }

  function place(el, st){
    var r = el.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight, pad = 6;
    var t = Math.max(0, r.top - pad), l = Math.max(0, r.left - pad);
    var w = Math.min(vw - l, r.width + pad * 2), h = Math.min(vh - t, r.height + pad * 2);
    shade(0, 0, vw, t); shade(t + h, 0, vw, Math.max(0, vh - (t + h)));
    shade(t, 0, l, h); shade(t, l + w, Math.max(0, vw - (l + w)), h);
    ring = document.createElement('div'); ring.className = 'llRing';
    ring.style.top = t + 'px'; ring.style.left = l + 'px'; ring.style.width = w + 'px'; ring.style.height = h + 'px';
    document.body.appendChild(ring);
    var below = (t + h + 250 < vh);
    arrow = document.createElement('div'); arrow.className = 'llArrow';
    arrow.innerHTML = below ? '&#x25BC;' : '&#x25B2;';
    arrow.style.top = (below ? t + h + 4 : Math.max(0, t - 40)) + 'px';
    arrow.style.left = (l + w / 2 - 14) + 'px';
    document.body.appendChild(arrow);
    bubble = document.createElement('div'); bubble.className = 'llBubble';
    var total = cur.steps.length;
    var tryLine = st.noTry ? '' : '<p class="llTry">' + T(st.tryTxt) + '</p>';
    var nextBtn = st.noTry ? '<button class="llNext" id="llNextBtn">' + (lang() === 'es' ? 'SIGUIENTE' : 'NEXT') + '</button>' : '';
    bubble.innerHTML = '<div class="llTop">' + coinHtml()
      + '<span class="llStep">' + (lang() === 'es' ? 'PASO ' : 'STEP ') + (step + 1) + ' / ' + total + '</span>'
      + '<span class="llDots"><b>' + dots() + '</b></span></div>'
      + '<p class="llSay">' + T(st.say) + '</p>' + tryLine
      + '<p class="llSign">&mdash; WINSTON</p>'
      + '<div class="llBtnRow">' + nextBtn
      + '<button class="llSkip" id="llSkipBtn">' + (lang() === 'es' ? 'SALTAR EL TOUR' : 'SKIP THE TOUR') + '</button></div>';
    var bw = Math.min(340, vw * 0.88);
    bubble.style.top = (below ? (t + h + 44) : Math.max(8, t - 40 - 250)) + 'px';
    /* v1.1 THE COURTEOUS BUBBLE: lean away from the target's half so less is covered */
    var cx = l + w / 2, bLeft;
    if (vw - bw > 40) {
      bLeft = (cx > vw / 2) ? 12 : (vw - bw - 12);
    } else {
      bLeft = Math.max(8, Math.min(vw - 8 - bw, cx - bw / 2));
    }
    bubble.style.left = bLeft + 'px';
    document.body.appendChild(bubble);
    document.getElementById('llSkipBtn').onclick = finish;
    if (st.noTry) {
      document.getElementById('llNextBtn').onclick = advance;
    } else {
      capture = function(ev){
        var n = ev.target;
        while (n) { if (n === el) { celebrate(st); return; } n = n.parentNode; }
      };
      document.addEventListener('click', capture, true);
    }
  }

  function celebrate(st){
    if (capture) { document.removeEventListener('click', capture, true); capture = null; }
    if (ring) { ring.className = 'llRing pulse'; }
    if (bubble) {
      bubble.innerHTML = '<div class="llTop">' + coinHtml() + '</div>'
        + '<p class="llSay">' + T(st.cheer) + '</p><p class="llSign">&mdash; WINSTON</p>';
    }
    setTimeout(advance, 1400);
  }

  function advance(){
    clearUI(); step += 1;
    if (!cur || step >= cur.steps.length) { finish(); return; }
    show();
  }

  function finish(){
    clearUI();
    if (cur) { var m = mem(); m[cur.key] = 'done'; memSet(m); }
    cur = null; step = 0;
  }

  function show(){
    var st = cur.steps[step];
    var el = findEl(st);
    if (!el) { step += 1; if (step >= cur.steps.length) { finish(); } else { show(); } return; } /* skip honestly */
    try { el.scrollIntoView({ block: 'center' }); } catch(e) { try { el.scrollIntoView(); } catch(e2) {} }
    setTimeout(function(){ clearUI(); place(el, st); }, 200);
  }

  function start(key){
    if (!lessons[key]) { return; }
    css(); clearUI(); cur = lessons[key]; cur.key = key; step = 0; show();
  }

  /* ---------------- the offer (sweeps until the room opens) ---------------- */
  function offer(key){
    if (!lessons[key] || offeredThisLoad[key]) { return; }
    var m = mem(); if (m[key]) { return; }
    var probe = findEl(lessons[key].steps[0]);
    if (!probe) { return; }
    css(); offeredThisLoad[key] = true;
    var o = document.createElement('div'); o.className = 'llOffer';
    o.innerHTML = '<div class="llTop">' + coinHtml()
      + '<span class="llStep">' + T(lessons[key].offerTitle) + '</span></div>'
      + '<p class="llSay">' + T(lessons[key].offerLine) + '</p><p class="llSign">&mdash; WINSTON</p>'
      + '<div class="llBtnRow"><button class="llNext" id="llGo">' + (lang() === 'es' ? 'TOMAR EL TOUR' : 'TAKE THE TOUR') + '</button>'
      + '<button class="llSkip" id="llNo">' + (lang() === 'es' ? 'AHORA NO' : 'NOT NOW') + '</button></div>';
    document.body.appendChild(o);
    document.getElementById('llGo').onclick = function(){ o.parentNode.removeChild(o); start(key); };
    document.getElementById('llNo').onclick = function(){ o.parentNode.removeChild(o); var m2 = mem(); m2[key] = 'declined'; memSet(m2); };
  }
  function sweep(key){
    setInterval(function(){ try { offer(key); } catch(e) {} }, 2500);
  }

  window.LifeLesson = { register: function(k, l){ lessons[k] = l; }, start: start, offer: offer, sweep: sweep };

  /* ============================================================
     LESSON LIBRARY — 'docb-header' (true /todos v61.2 ids)
     Facts per Doc B's own DOORS canon: view switch flips the room;
     the speaker reads aloud; the \u22ef menu holds Reframe; ACCESSORIES
     holds timer, music, games, links, cash, contacts; X saves and
     closes — nothing is lost.
     ============================================================ */
  LifeLesson.register('docb-header', {
    offerTitle: { en: 'FIRST TIME IN A DOC B ROOM?', es: '\u00bfPRIMERA VEZ EN UNA SALA DE DOC B?' },
    offerLine: { en: 'Take the 60-second tour of this cockpit \u2014 five doors, and the room is yours.', es: 'Toma el tour de 60 segundos de esta cabina \u2014 cinco puertas, y la sala es tuya.' },
    steps: [
      { find: function(){ return document.getElementById('pwsViewToggle') || document.querySelector('[data-winston="view-toggle"]'); },
        say: { en: 'This little square changes your ENTIRE view \u2014 the full conversation, or the workbench with your tools.', es: 'Este cuadrito cambia TODA tu vista \u2014 la conversaci\u00f3n completa, o el banco de trabajo con tus herramientas.' },
        tryTxt: { en: 'Try it. Tap it now \u2014 watch the room change.', es: 'Pru\u00e9balo. T\u00f3calo ahora \u2014 mira c\u00f3mo cambia la sala.' },
        cheer: { en: 'That\u2019s it! Tap it anytime to switch views.', es: '\u00a1Eso es! T\u00f3calo cuando quieras para cambiar de vista.' } },
      { sel: '#pwsVoiceBtn',
        say: { en: 'The speaker \u2014 tap it and Doc B reads his words out loud. Tap again for silence.', es: 'La bocina \u2014 t\u00f3cala y Doc B lee sus palabras en voz alta. T\u00f3cala de nuevo para silencio.' },
        tryTxt: { en: 'Try it. Give Doc B his voice.', es: 'Pru\u00e9balo. Dale su voz a Doc B.' },
        cheer: { en: 'See? His voice is yours to command.', es: '\u00bfVes? Su voz est\u00e1 a tus \u00f3rdenes.' } },
      { sel: '#pwsUseMoreBtn',
        say: { en: 'The \u22ef drawer \u2014 rare tools tucked in here (like Reframe), so the room stays clean.', es: 'El caj\u00f3n \u22ef \u2014 herramientas raras guardadas aqu\u00ed (como Reencuadre), para que la sala quede limpia.' },
        tryTxt: { en: 'Try it. Open the drawer.', es: 'Pru\u00e9balo. Abre el caj\u00f3n.' },
        cheer: { en: 'That\u2019s where the rare tools sleep.', es: 'Ah\u00ed duermen las herramientas raras.' } },
      { find: function(){
          var d = document.getElementById('tdUseAccDoor'); if (d) { return d; }
          var w = document.getElementById('tdUseAccWrap'); if (w && w.previousElementSibling) { return w.previousElementSibling; }
          var foot = document.getElementById('pwsUseFooter');
          if (foot) {
            var bs = foot.getElementsByTagName('button');
            for (var bi = 0; bi < bs.length; bi++) {
              var tx = (bs[bi].textContent || '').replace(/^\s+/, '');
              if (tx.indexOf('ACCESSORIES') === 0 || tx.indexOf('ACCESORIOS') === 0) { return bs[bi]; }
            }
          }
          return null;
        },
        say: { en: 'ACCESSORIES \u2014 a folded shelf on the workbench: the timer with a real alarm, music, games, links, contacts, cash request.', es: 'ACCESORIOS \u2014 una repisa plegada en el banco: el temporizador con alarma real, m\u00fasica, juegos, enlaces, contactos, solicitud de dinero.' },
        tryTxt: { en: 'Try it. Unfold the shelf \u2014 then fold it back if you like.', es: 'Pru\u00e9balo. Despliega la repisa \u2014 y pli\u00e9gala de nuevo si quieres.' },
        cheer: { en: 'Everything small lives there, out of your way.', es: 'Todo lo peque\u00f1o vive ah\u00ed, sin estorbarte.' } },
      { sel: '#pwsUseCloseBtn2', noTry: true,
        say: { en: 'And this \u2715 closes the room when your work is done \u2014 it SAVES everything first; nothing is ever lost. Don\u2019t tap it yet. Tour complete: the room is yours.', es: 'Y esta \u2715 cierra la sala cuando terminas \u2014 primero GUARDA todo; nunca se pierde nada. No la toques todav\u00eda. Tour completo: la sala es tuya.' },
        cheer: { en: '', es: '' } }
    ]
  });

  /* boot: the tour offers itself when a Doc B room opens (once per member) */
  sweep('docb-header');
})();
