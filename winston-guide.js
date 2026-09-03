/* BENCH 33 winston-guide.js v1.1 — THE SIXTH WHISPER & THE OPEN LIBRARY
 * (9/3/26, paired with /todos v61.1 THE CLEAR HEADER): the founder ruled
 * the overlay's view-toggle square — "makes an amazing difference in
 * functionality" with no hint it exists — "definitely needs a Winston
 * whisper." Key 'view-toggle' joins the library. And for Bench 28's
 * LESSON: WinstonGuide.register(key, {en:{line,more}, es:{line,more}})
 * lets any page add page-local whispers without forking the organ —
 * registered keys rescan immediately. v1.0 -> v1.1. ES5. Lineage:
 *
 * BENCH 33 winston-guide.js v1.0 — THE WINSTON WHISPERS (crowned by the
 * founder 9/2/26 night, "THE DRAFT" game: five buttons, five whispers,
 * the liturgy read -> design -> create). Winston is the kingdom's living
 * manual: a coin-sized medallion beside a marked button; TAP it (phones
 * have no hover — the tap is the law) and a comic bubble speaks ONE terse
 * line in Winston's voice, with a small + for the longer story. Pages
 * mark buttons with data-winston="key"; this organ finds them — including
 * ones rendered later — and takes its post. Once-per-member memory: after
 * a whisper has been opened 3 times it dims to a quiet coin (never gone —
 * a manual stays findable). Medallion face: winston-medallion.png on the
 * assets CDN; if absent, a gold "W" coin stands in. First wave keys:
 * bucket, create-todo, read-shelf, design-tool, build-document. ES5. */
(function() {
  if (window.WinstonGuide) return;
  var CDN_FACE = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/winston-medallion.png';
  var LS_KEY = '4laws-winston';
  var LIB = {
    'bucket': {
      en: { line: 'Drop anything on me \u2014 a letter, a bill, a photo. I read it and put every piece where it belongs.',
            more: 'This is the house\u2019s mouth. Whatever lands here gets read on the spot \u2014 pictures, PDFs, Word, plain text. People go to Contacts, links go to Links, and the reading stays in the room, so nothing is ever lost in a downloads folder.' },
      es: { line: 'Su\u00e9ltame lo que sea \u2014 una carta, una factura, una foto. Lo leo y pongo cada pieza en su lugar.',
            more: 'Esta es la boca de la casa. Lo que cae aqu\u00ed se lee al instante \u2014 fotos, PDF, Word, texto. Las personas van a Contactos, los enlaces a Enlaces, y la lectura queda en la sala para que nada se pierda.' } },
    'create-todo': {
      en: { line: 'Tell me the thing in plain words. A reminder if it\u2019s small \u2014 real help if it\u2019s not.',
            more: 'One title, a line of detail, and one honest question: is this more than a reminder? Say yes and the house opens a room for it \u2014 with a chat, a shelf, and tools. Say no and it simply reminds you.' },
      es: { line: 'Dime la cosa en palabras sencillas. Un recordatorio si es peque\u00f1a \u2014 ayuda de verdad si no lo es.',
            more: 'Un t\u00edtulo, una l\u00ednea de detalle y una pregunta honesta: \u00bfes m\u00e1s que un recordatorio? Di que s\u00ed y la casa le abre una sala \u2014 con chat, estante y herramientas. Di que no y simplemente te recuerda.' } },
    'read-shelf': {
      en: { line: 'Everything you\u2019ve dropped in this room, I can read \u2014 say the word and I\u2019ll go through it.',
            more: 'Files you drop don\u2019t vanish \u2014 they sit on this room\u2019s shelf. Tap here and every one of them is brought into the chat and read, so the answers use your real papers, not guesses.' },
      es: { line: 'Todo lo que has soltado en esta sala, lo puedo leer \u2014 da la orden y lo repaso.',
            more: 'Los archivos que sueltas no desaparecen \u2014 quedan en el estante de esta sala. Toca aqu\u00ed y cada uno llega al chat y se lee, para que las respuestas usen tus papeles reales, no suposiciones.' } },
    'design-tool': {
      en: { line: 'Behind this door is Bruno, the house blacksmith. Describe your problem \u2014 he designs and builds you a tool for it.',
            more: 'Not every problem is a document. Some need a calculator, a tracker, a sorter \u2014 a working tool. Bruno asks to see the trap, then forges the tool right here, and it stays pinned in this room.' },
      es: { line: 'Tras esta puerta est\u00e1 Bruno, el herrero de la casa. Descr\u00edbele tu problema \u2014 te dise\u00f1a y forja una herramienta.',
            more: 'No todo problema es un documento. Algunos piden una calculadora, un contador, un clasificador \u2014 una herramienta que funcione. Bruno pide ver la trampa, la forja aqu\u00ed mismo, y queda fijada en esta sala.' } },
    'view-toggle': {
      en: { line: 'This little square changes the whole room — full chat, or the workbench. Tap it and see.',
            more: 'Two views live here: the full conversation for reading and talking, and the workbench view with the tools rail — the shelf, the accessories, the document doors. Most people never find this switch. Now you have.' },
      es: { line: 'Este cuadrito cambia toda la sala — chat completo o banco de trabajo. Tócalo y verás.',
            more: 'Aquí viven dos vistas: la conversación completa para leer y hablar, y el banco de trabajo con las herramientas — el estante, los accesorios, las puertas de documentos. Casi nadie encuentra este botón. Tú ya sí.' } },
    'build-document': {
      en: { line: 'When our talk is ready, I press it into a real document \u2014 it waits on this room\u2019s shelf.',
            more: 'Letters, form answers, lists, spreadsheets, even slides \u2014 built from what was actually read and said in this room, nothing invented. Word and PDF land on the shelf, ready when you are.' },
      es: { line: 'Cuando nuestra charla est\u00e1 lista, la convierto en un documento de verdad \u2014 te espera en el estante de esta sala.',
            more: 'Cartas, respuestas de formularios, listas, hojas de c\u00e1lculo, hasta diapositivas \u2014 hechas de lo que de verdad se ley\u00f3 y se dijo en esta sala, nada inventado. Word y PDF llegan al estante, listos cuando t\u00fa lo est\u00e9s.' } }
  };
  function lang_() {
    try { return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en'; } catch (e) { return 'en'; }
  }
  function seen_() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function markSeen_(key) {
    var s = seen_(); s[key] = (s[key] || 0) + 1;
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch (e) {}
    return s[key];
  }
  var bubble = null;
  function closeBubble_() { if (bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble); bubble = null; }
  function openBubble_(coin, key) {
    closeBubble_();
    var L = LIB[key]; if (!L) return;
    var t = L[lang_()] || L.en;
    var opens = markSeen_(key);
    if (opens >= 3) coin.style.opacity = '0.35';
    bubble = document.createElement('div');
    bubble.style.cssText = 'position:fixed;z-index:99999;max-width:290px;background:#14100a;border:1px solid #c8a84b;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,0.65);padding:12px 14px;font-family:\'Cormorant Garamond\',Georgia,serif;';
    var lineEl = document.createElement('div');
    lineEl.style.cssText = 'font-size:17px !important;line-height:1.5;color:#f0e6cc;';
    lineEl.textContent = '\u201c' + t.line + '\u201d';
    var who = document.createElement('div');
    who.style.cssText = 'margin-top:6px;font-size:12px !important;letter-spacing:0.14em;color:#c8a84b;font-family:Cinzel,serif;';
    who.textContent = '\u2014 WINSTON';
    var moreBtn = document.createElement('button');
    moreBtn.textContent = '+';
    moreBtn.style.cssText = 'position:absolute;top:6px;right:8px;background:transparent;border:1px solid rgba(200,168,75,0.5);border-radius:50%;width:24px;height:24px;color:#c8a84b;font-size:15px;line-height:1;cursor:pointer;';
    var moreEl = document.createElement('div');
    moreEl.style.cssText = 'display:none;margin-top:8px;padding-top:8px;border-top:1px solid rgba(200,168,75,0.3);font-size:15px !important;line-height:1.55;color:rgba(240,230,204,0.85);';
    moreEl.textContent = t.more;
    moreBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      moreEl.style.display = (moreEl.style.display === 'none') ? 'block' : 'none';
      moreBtn.textContent = (moreEl.style.display === 'none') ? '+' : '\u2013';
    });
    bubble.appendChild(lineEl); bubble.appendChild(who); bubble.appendChild(moreBtn); bubble.appendChild(moreEl);
    document.body.appendChild(bubble);
    var r = coin.getBoundingClientRect();
    var bw = bubble.offsetWidth || 290, bh = bubble.offsetHeight || 90;
    var left = Math.min(Math.max(8, r.left - 40), (window.innerWidth || 360) - bw - 8);
    var top = r.top - bh - 10;
    if (top < 8) top = r.bottom + 10;
    bubble.style.left = left + 'px'; bubble.style.top = top + 'px';
    setTimeout(function() {
      document.addEventListener('click', function once(ev) {
        if (bubble && !bubble.contains(ev.target)) { closeBubble_(); document.removeEventListener('click', once, true); }
      }, true);
    }, 50);
  }
  function makeCoin_(key) {
    var coin = document.createElement('span');
    coin.setAttribute('data-winston-coin', key);
    coin.style.cssText = 'display:inline-block;width:24px;height:24px;vertical-align:middle;margin-left:7px;cursor:pointer;flex-shrink:0;';
    var img = document.createElement('img');
    img.src = CDN_FACE; img.alt = 'Winston';
    img.style.cssText = 'width:24px;height:24px;border-radius:50%;border:1px solid #c8a84b;display:block;box-shadow:0 1px 5px rgba(0,0,0,0.5);';
    img.onerror = function() {
      coin.removeChild(img);
      coin.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;border:1px solid #c8a84b;background:#14100a;color:#c8a84b;font-family:Cinzel,serif;font-size:13px;font-weight:700;">W</span>';
    };
    coin.appendChild(img);
    if ((seen_()[key] || 0) >= 3) coin.style.opacity = '0.35';
    coin.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); openBubble_(coin, key); });
    return coin;
  }
  function place_(el, key) {
    var coin = makeCoin_(key);
    if (el.tagName === 'BUTTON' || el.tagName === 'A') {
      if (el.parentNode) el.parentNode.insertBefore(coin, el.nextSibling);
    } else {
      /* a zone (the bucket): the coin stands in its top-right corner */
      var cs = window.getComputedStyle ? getComputedStyle(el) : null;
      if (cs && cs.position === 'static') el.style.position = 'relative';
      coin.style.cssText += 'position:absolute;top:6px;right:6px;margin-left:0;z-index:5;';
      el.appendChild(coin);
    }
  }
  function scan() {
    var els = document.querySelectorAll('[data-winston]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.getAttribute('data-winston-done')) continue;
      var key = el.getAttribute('data-winston');
      if (!LIB[key]) continue;
      el.setAttribute('data-winston-done', '1');
      try { place_(el, key); } catch (eP) {}
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
  setInterval(scan, 2500); /* posts rendered later still get their Winston */
  function register(key, entry) {
    /* v1.1 THE OPEN LIBRARY: pages (e.g. the LESSON) add local whispers without forking the organ */
    if (!key || !entry || !entry.en || !entry.en.line) return false;
    if (LIB[key]) return false; /* the organ's own canon is never overwritten */
    LIB[key] = { en: { line: String(entry.en.line), more: String(entry.en.more || entry.en.line) },
                 es: entry.es && entry.es.line ? { line: String(entry.es.line), more: String(entry.es.more || entry.es.line) } : { line: String(entry.en.line), more: String(entry.en.more || entry.en.line) } };
    scan();
    return true;
  }
  window.WinstonGuide = { scan: scan, register: register, version: '1.1' };
})();
