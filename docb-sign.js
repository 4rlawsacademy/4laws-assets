/* ============================================================
   DOCB-SIGN.JS v1.3 — THE EYES (9/17/26, founder: "If I can see the f'ng
   document I would be able to decide. If I can't see the document, I
   can't decide whether I need it." The pen's chooser was a number prompt
   -- "one, two, or three, and they all look alike" -- and three letters
   got signed plain before the right one was found). Two exports for any
   room: choose({title, items, onPick}) -- a veil of cards, each showing
   its first page (PDF via pdf.js, images as themselves, a mark for the
   rest), its name, a tag; and thumb(el, b64, mime) -- the same picture
   drawn into any element (the shelf list uses it). v1.2 below.
   ============================================================
   DOCB-SIGN.JS v1.2 — THE PEN'S OWN SIZE (9/10/26, founder: "signed by a
   giant"): the signature landed at 170pt wide on every letter and made
   the member shrink it each time. Now it opens at a pen-sized 120pt, the
   slider reaches down to 60, and the size you last used is remembered
   ('4laws-sign-size') so it lands right forever after. v1.1 below.
   ============================================================
   DOCB-SIGN.JS v1.1 — THE TRUE PNG (9/10/26, the pen's first field walk
   on Yoniel's letter): preview drew, the tap landed, and the stamp
   refused -- "locked or damaged" -- because the file named signature.png
   was not a PNG (the founder saved it from a CDN link that re-encodes on
   the way down; the ghost showed a white box, not transparency). Two
   cures: the signature is now normalized through a canvas into true PNG
   bytes before embedding, so the stamper never trusts a file name; and a
   failure names its step (the PDF, the signature, or the placement) with
   the library's own reason in brackets -- named, never vague. v1.0's
   crown stands below.
   ============================================================
   DOCB-SIGN.JS v1.0 — THE PEN (Bench 34, 9/9/26)
   Founder's field wound, verbatim: "I gave the system a completely
   written letter with stationery header and all, just needed a
   signature, and instead I got [a rebuilt letter with no stationery]."
   SIGN IT (8/29) was always the PRINTER: it rebuilds the last document
   Doc B wrote, with the member's signature under the closing. The house
   had no PEN -- no way to sign a paper the member brought from outside.
   This is the pen. The original PDF's bytes are never rebuilt: its last
   page (or any page) is drawn as a preview, the member TAPS where the
   signature goes, and the signature image is stamped onto the original
   at that spot. Stationery, letterhead, layout -- untouched.

   Zero backend of its own: the page hands it the PDF bytes, the
   signature bytes, and a callback for the signed result. Two standard
   libraries load lazily on first use, only when the pen is opened:
   pdf.js (to draw the preview) and pdf-lib (to stamp the original).
   Nothing renders and nothing loads until a room calls open().

   ADOPTION (one line per page, beside the sibling organs):
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/docb-sign.js"></script>

   Public API:
     DocBSign.open({
       pdfB64: <base64 of the PDF>, name: <file name>,
       sigB64: <base64 of the signature image>, sigMime: 'image/png',
       onSigned: function (signedBytesUint8, suggestedName) { ... }
     })
   ============================================================ */
(function () {
  'use strict';
  if (window.DocBSign) { return; }

  var PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js';
  var PDFJS_WORKER = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
  var PDFLIB_URL = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';

  function lang() {
    try {
      if (document.body && document.body.className.indexOf('lang-es') !== -1) { return 'es'; }
      return (localStorage.getItem('4laws-lang') === 'es') ? 'es' : 'en';
    } catch (e) { return 'en'; }
  }
  function T(o) { return o[lang()] || o.en; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function loadScript_(url) {
    return new Promise(function (res, rej) {
      var sc = document.createElement('script'); sc.src = url; sc.async = true;
      sc.onload = function () { res(); }; sc.onerror = function () { rej(new Error('load failed: ' + url)); };
      document.head.appendChild(sc);
    });
  }
  var libsP = null;
  function libs_() {
    if (libsP) { return libsP; }
    libsP = Promise.resolve()
      .then(function () { return window.pdfjsLib ? null : loadScript_(PDFJS_URL); })
      .then(function () { try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER; } catch (e) {} })
      .then(function () { return window.PDFLib ? null : loadScript_(PDFLIB_URL); })
      ['catch'](function (e) { libsP = null; throw e; });
    return libsP;
  }
  function b64ToU8_(b64) {
    var bin = atob(b64), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) { out[i] = bin.charCodeAt(i); }
    return out;
  }

  function css() {
    if (document.getElementById('dsCss')) { return; }
    var s = document.createElement('style'); s.id = 'dsCss';
    s.textContent = ''
      + '#dsVeil{position:fixed;inset:0;z-index:2600000;background:rgba(4,6,8,.92);display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;padding:14px;overflow:auto;font-family:\'Cormorant Garamond\',Georgia,serif;}'
      + '.dsBar{width:100%;max-width:820px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:10px;-webkit-flex-wrap:wrap;flex-wrap:wrap;color:#f0e6cc;margin-bottom:10px;}'
      + '.dsKick{font-family:Cinzel,serif;font-size:12px;letter-spacing:.18em;color:#c8a84b;-webkit-flex:1;flex:1;min-width:160px;}'
      + '.dsHint{width:100%;max-width:820px;font-size:16px;color:rgba(240,230,204,.8);margin:0 0 10px;font-style:italic;}'
      + '.dsStage{position:relative;max-width:100%;box-shadow:0 10px 40px rgba(0,0,0,.8);border:1px solid rgba(200,168,75,.5);background:#fff;cursor:crosshair;}'
      + '.dsStage canvas{display:block;max-width:100%;height:auto;}'
      + '.dsGhost{position:absolute;pointer-events:none;opacity:.92;outline:1px dashed rgba(200,168,75,.9);}'
      + '.dsBtn{background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:13px;letter-spacing:.08em;padding:10px 18px;min-height:44px;cursor:pointer;}'
      + '.dsBtn[disabled]{opacity:.45;cursor:default;}'
      + '.dsGhostBtn{background:none;border:1px solid rgba(200,168,75,.5);color:#c8a84b;border-radius:999px;font-family:Cinzel,serif;font-size:12px;letter-spacing:.08em;padding:10px 14px;min-height:44px;cursor:pointer;}'
      + '.dsRange{width:140px;}'
      + '.dsPg{font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;color:#f0e6cc;}';
    document.head.appendChild(s);
  }

  var st = null; /* the open session */

  function close_() {
    var v = document.getElementById('dsVeil'); if (v && v.parentNode) { v.parentNode.removeChild(v); }
    st = null;
  }

  function renderPage_() {
    var stage = document.getElementById('dsStage'), canvas = document.getElementById('dsCanvas');
    if (!stage || !canvas || !st || !st.doc) { return Promise.resolve(); }
    return st.doc.getPage(st.page).then(function (pg) {
      var maxW = Math.min(800, (window.innerWidth || 800) - 40);
      var base = pg.getViewport({ scale: 1 });
      var scale = Math.min(maxW / base.width, 1.6);
      var vp = pg.getViewport({ scale: scale });
      canvas.width = Math.floor(vp.width); canvas.height = Math.floor(vp.height);
      st.scale = scale; st.pageW = base.width; st.pageH = base.height;
      var pgEl = document.getElementById('dsPg'); if (pgEl) { pgEl.textContent = T({ en: 'PAGE ', es: 'P\u00c1GINA ' }) + st.page + ' / ' + st.doc.numPages; }
      placeGhost_();
      return pg.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    });
  }
  function placeGhost_() {
    var g = document.getElementById('dsGhost'), canvas = document.getElementById('dsCanvas'), btn = document.getElementById('dsStamp');
    if (!g || !canvas) { return; }
    if (!st.at || st.at.page !== st.page) { g.style.display = 'none'; if (btn) { btn.disabled = true; } return; }
    var disp = canvas.getBoundingClientRect();
    var k = disp.width / canvas.width; /* CSS px per canvas px */
    var wCss = st.sigWpt * st.scale * k, hCss = wCss / st.sigAspect;
    var cxCss = st.at.cx * k, cyCss = st.at.cy * k;
    g.style.display = 'block'; g.style.width = wCss + 'px'; g.style.height = hCss + 'px';
    g.style.left = (cxCss - wCss / 2) + 'px'; g.style.top = (cyCss - hCss / 2) + 'px';
    if (btn) { btn.disabled = false; }
  }
  function onTap_(ev) {
    var canvas = document.getElementById('dsCanvas'); if (!canvas || !st) { return; }
    var r = canvas.getBoundingClientRect();
    var k = canvas.width / r.width;
    var t = (ev.touches && ev.touches[0]) ? ev.touches[0] : ev;
    st.at = { page: st.page, cx: (t.clientX - r.left) * k, cy: (t.clientY - r.top) * k };
    placeGhost_();
    if (ev.cancelable) { ev.preventDefault(); }
  }

  function sigAsPng_() {
    /* v1.1: the file named signature.png may not BE a PNG (a CDN can re-encode
       on the way down; a browser saves whatever it got under the name you
       typed). The preview <img> already decoded it -- draw that onto a canvas
       and export true PNG bytes, so the stamper never has to trust a name. */
    return new Promise(function (res, rej) {
      var ghost = document.getElementById('dsGhost');
      if (!ghost || !ghost.naturalWidth) { rej(new Error('signature image did not decode')); return; }
      try {
        var c = document.createElement('canvas'); c.width = ghost.naturalWidth; c.height = ghost.naturalHeight;
        c.getContext('2d').drawImage(ghost, 0, 0);
        var dataUrl = c.toDataURL('image/png');
        res(b64ToU8_(dataUrl.split(',')[1] || ''));
      } catch (e) { rej(e); }
    });
  }
  function stamp_() {
    if (!st || !st.at) { return; }
    var btn = document.getElementById('dsStamp'); if (btn) { btn.disabled = true; btn.textContent = T({ en: 'Stamping\u2026', es: 'Firmando\u2026' }); }
    var hint = document.getElementById('dsHint');
    var PDFLib = window.PDFLib;
    var step = 'pdf';
    PDFLib.PDFDocument.load(st.pdfU8, { ignoreEncryption: true }).then(function (pdfDoc) {
      step = 'signature';
      return sigAsPng_().then(function (pngU8) { return pdfDoc.embedPng(pngU8); }).then(function (img) {
        step = 'stamp';
        var page = pdfDoc.getPage(st.at.page - 1);
        var pw = page.getWidth(), ph = page.getHeight();
        var w = st.sigWpt, h = w / st.sigAspect;
        /* canvas px -> PDF points; the preview was drawn from the same page box, origin flipped */
        var x = st.at.cx / st.scale - w / 2;
        var y = ph - (st.at.cy / st.scale) - h / 2;
        x = Math.max(0, Math.min(pw - w, x)); y = Math.max(0, Math.min(ph - h, y));
        page.drawImage(img, { x: x, y: y, width: w, height: h });
        return pdfDoc.save();
      });
    }).then(function (bytes) {
      var base = String(st.name || 'document.pdf').replace(/\.pdf$/i, '');
      var suggested = base + (lang() === 'es' ? ' \u2014 firmado.pdf' : ' \u2014 signed.pdf');
      var cb = st.onSigned;
      close_();
      if (typeof cb === 'function') { cb(bytes, suggested); }
    })['catch'](function (e) {
      if (btn) { btn.disabled = false; btn.textContent = T({ en: '\u270D Stamp it', es: '\u270D F\u00edrmalo' }); }
      var why = (e && e.message) ? String(e.message).substring(0, 120) : '';
      var msg = (step === 'pdf')
        ? T({ en: 'Couldn\u2019t open this PDF for stamping \u2014 it may be locked or damaged.', es: 'No se pudo abrir este PDF para firmar \u2014 puede estar bloqueado o da\u00f1ado.' })
        : (step === 'signature')
          ? T({ en: 'Couldn\u2019t read your signature image.', es: 'No se pudo leer la imagen de tu firma.' })
          : T({ en: 'Couldn\u2019t place the signature on the page.', es: 'No se pudo colocar la firma en la p\u00e1gina.' });
      if (hint) { hint.textContent = msg + (why ? ' [' + why + ']' : ''); }
    });
  }

  function open(o) {
    if (!o || !o.pdfB64 || !o.sigB64) { return; }
    css();
    close_();
    var remembered = 120; try { remembered = parseInt(localStorage.getItem('4laws-sign-size') || '120', 10) || 120; } catch (eLs) {}
    st = { name: o.name || 'document.pdf', pdfU8: b64ToU8_(o.pdfB64), sigU8: b64ToU8_(o.sigB64), sigMime: o.sigMime || 'image/png', onSigned: o.onSigned, page: 1, at: null, sigWpt: remembered, sigAspect: 2.4, scale: 1 }; /* v1.2: a pen-sized default, and the size you last used */
    var v = document.createElement('div'); v.id = 'dsVeil';
    v.innerHTML = '<div class="dsBar"><span class="dsKick">\u270D ' + T({ en: 'SIGN THIS FILE', es: 'FIRMA ESTE ARCHIVO' }) + ' \u00b7 ' + esc(st.name) + '</span>'
      + '<button class="dsGhostBtn" id="dsPrev">\u25c0</button><span class="dsPg" id="dsPg"></span><button class="dsGhostBtn" id="dsNext">\u25b6</button>'
      + '<span class="dsPg">' + T({ en: 'SIZE', es: 'TAMA\u00d1O' }) + '</span><input class="dsRange" id="dsSize" type="range" min="60" max="320" value="' + remembered + '">'
      + '<button class="dsBtn" id="dsStamp" disabled>\u270D ' + T({ en: 'Stamp it', es: 'F\u00edrmalo' }) + '</button>'
      + '<button class="dsGhostBtn" id="dsClose">\u00d7</button></div>'
      + '<p class="dsHint" id="dsHint">' + T({ en: 'Loading the page\u2026', es: 'Cargando la p\u00e1gina\u2026' }) + '</p>'
      + '<div class="dsStage" id="dsStage"><canvas id="dsCanvas"></canvas><img class="dsGhost" id="dsGhost" alt="" style="display:none"></div>';
    document.body.appendChild(v);
    var ghost = document.getElementById('dsGhost');
    ghost.src = 'data:' + st.sigMime + ';base64,' + o.sigB64;
    ghost.onload = function () { if (ghost.naturalWidth && ghost.naturalHeight) { st.sigAspect = ghost.naturalWidth / ghost.naturalHeight; placeGhost_(); } };
    document.getElementById('dsClose').onclick = close_;
    document.getElementById('dsStamp').onclick = stamp_;
    document.getElementById('dsSize').oninput = function () { st.sigWpt = parseInt(this.value, 10) || 120; try { localStorage.setItem('4laws-sign-size', String(st.sigWpt)); } catch (eS) {} placeGhost_(); };
    document.getElementById('dsPrev').onclick = function () { if (st.page > 1) { st.page--; renderPage_(); } };
    document.getElementById('dsNext').onclick = function () { if (st.doc && st.page < st.doc.numPages) { st.page++; renderPage_(); } };
    var stage = document.getElementById('dsStage');
    stage.addEventListener('click', onTap_);
    stage.addEventListener('touchstart', onTap_, { passive: false });
    window.addEventListener('resize', placeGhost_);

    libs_().then(function () {
      return window.pdfjsLib.getDocument({ data: st.pdfU8.slice(0) }).promise;
    }).then(function (doc) {
      if (!st) { return; }
      st.doc = doc; st.page = doc.numPages; /* a letter is signed at its end: open on the last page */
      var hint = document.getElementById('dsHint');
      if (hint) { hint.textContent = T({ en: 'Tap where your signature goes. Tap again to move it. Then stamp.', es: 'Toca donde va tu firma. Toca de nuevo para moverla. Luego f\u00edrmalo.' }); }
      return renderPage_();
    })['catch'](function () {
      var hint = document.getElementById('dsHint');
      if (hint) { hint.textContent = T({ en: 'Couldn\u2019t open that PDF.', es: 'No se pudo abrir ese PDF.' }); }
    });
  }

  /* ---------------- v1.3 THE EYES: see the paper before you choose it ---------------- */
  function thumbInto_(el, b64, mime) {
    if (!el) { return Promise.resolve(); }
    el.innerHTML = '';
    if (b64 && /^image\//i.test(mime || '')) {
      var img = document.createElement('img'); img.src = 'data:' + mime + ';base64,' + b64; img.style.cssText = 'max-width:100%;max-height:100%;display:block;margin:auto;';
      el.appendChild(img); return Promise.resolve();
    }
    if (!b64 || !/pdf/i.test(mime || '')) {
      var mark = /word|docx?/i.test(mime || '') ? 'W' : /sheet|xlsx|csv/i.test(mime || '') ? 'X' : /audio/i.test(mime || '') ? '\u266a' : /pdf/i.test(mime || '') ? 'PDF' : '\u25a1';
      el.innerHTML = '<div style="font:700 26px Cinzel,serif;color:#c8a84b;text-align:center;padding-top:34px;">' + mark + '</div>';
      return Promise.resolve();
    }
    return libs_().then(function () {
      return window.pdfjsLib.getDocument({ data: b64ToU8_(b64) }).promise;
    }).then(function (doc) { return doc.getPage(1); }).then(function (pg) {
      var base = pg.getViewport({ scale: 1 });
      var scale = Math.min((el.clientWidth || 160) / base.width, (el.clientHeight || 200) / base.height) || 0.2;
      var vp = pg.getViewport({ scale: scale });
      var c = document.createElement('canvas'); c.width = Math.floor(vp.width); c.height = Math.floor(vp.height); c.style.cssText = 'display:block;margin:auto;background:#fff;';
      el.innerHTML = ''; el.appendChild(c);
      return pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    })['catch'](function () { el.innerHTML = '<div style="font:700 26px Cinzel,serif;color:#c8a84b;text-align:center;padding-top:34px;">PDF</div>'; });
  }
  function chooseCss_() {
    if (document.getElementById('dcCss')) { return; }
    var st2 = document.createElement('style'); st2.id = 'dcCss';
    st2.textContent = ''
      + '#dcVeil{position:fixed;top:0;left:0;right:0;bottom:0;z-index:2600000;background:rgba(4,6,8,.94);overflow:auto;padding:16px;font-family:\'Cormorant Garamond\',Georgia,serif;color:#f0e6cc;}'
      + '.dcTitle{font-family:Cinzel,serif;font-size:20px;letter-spacing:.06em;color:#f0e6cc;text-align:center;margin:8px 0 14px;}'
      + '.dcGrid{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:14px;-webkit-justify-content:center;justify-content:center;}'
      + '.dcCard{width:180px;background:rgba(10,13,18,.98);border:2px solid rgba(200,168,75,.55);border-radius:12px;padding:10px;cursor:pointer;text-align:center;}'
      + '.dcCard:hover{border-color:#ffd75e;}'
      + '.dcThumb{width:160px;height:200px;margin:0 auto 8px;background:#fff;border:1px solid rgba(200,168,75,.35);overflow:hidden;}'
      + '.dcName{font-size:16px;line-height:1.25;color:#f0e6cc;word-break:break-word;}'
      + '.dcTag{font-family:Cinzel,serif;font-size:10px;letter-spacing:.12em;color:#c8a84b;margin-top:4px;}'
      + '.dcClose{position:fixed;top:12px;right:16px;background:none;border:1px solid rgba(200,168,75,.5);color:#c8a84b;border-radius:999px;font-size:22px;line-height:1;width:44px;height:44px;cursor:pointer;}';
    document.head.appendChild(st2);
  }
  function choose(o) {
    if (!o || !o.items || !o.items.length) { return; }
    chooseCss_();
    var old = document.getElementById('dcVeil'); if (old && old.parentNode) { old.parentNode.removeChild(old); }
    var v = document.createElement('div'); v.id = 'dcVeil';
    var h = '<button class="dcClose" aria-label="Close">\u00d7</button><p class="dcTitle">' + esc(o.title || T({ en: 'Pick one.', es: 'Elige uno.' })) + '</p><div class="dcGrid">';
    for (var i = 0; i < o.items.length; i++) {
      var it = o.items[i];
      h += '<div class="dcCard" data-i="' + i + '"><div class="dcThumb" id="dcT_' + i + '"><div style="color:#999;font-size:13px;text-align:center;padding-top:90px;">\u2026</div></div><div class="dcName">' + esc(it.name || '') + '</div>' + (it.tag ? '<div class="dcTag">' + esc(it.tag) + '</div>' : '') + '</div>';
    }
    h += '</div>';
    v.innerHTML = h;
    document.body.appendChild(v);
    function closeC() { if (v.parentNode) { v.parentNode.removeChild(v); } }
    v.querySelector('.dcClose').onclick = function () { closeC(); if (typeof o.onCancel === 'function') { o.onCancel(); } };
    var cards = v.querySelectorAll('.dcCard');
    for (var c = 0; c < cards.length; c++) {
      (function (card) {
        card.addEventListener('click', function () { var it2 = o.items[parseInt(card.getAttribute('data-i'), 10)]; closeC(); if (typeof o.onPick === 'function') { o.onPick(it2); } });
      })(cards[c]);
    }
    for (var k = 0; k < o.items.length; k++) {
      (function (idx) {
        var it3 = o.items[idx], el = document.getElementById('dcT_' + idx);
        if (typeof it3.fetch !== 'function') { thumbInto_(el, '', it3.mime || ''); return; }
        it3.fetch().then(function (r) { if (r && r.b64) { return thumbInto_(el, r.b64, r.mime || ''); } return thumbInto_(el, '', it3.mime || ''); })['catch'](function () { thumbInto_(el, '', it3.mime || ''); });
      })(k);
    }
  }

  window.DocBSign = { open: open, close: close_, choose: choose, thumb: thumbInto_, version: '1.3' };
})();
