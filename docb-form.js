/* ============================================================
   DOCB-FORM.JS v1.0 — THE FORM (Bench 34, 9/10/26)
   Founder: "I know I'm going to get form requests. Do we have a system
   that fills out forms and signs them?" -- and a real FMLA form due in
   five days. The house could draft ANSWERS as a letter; it could not
   write into the boxes of the paper the agency actually sent. This is
   the last supertool in the pen's family: never rebuild their paper,
   work on the original.

   TWO ROADS, one tool:
   1. FILLABLE FORMS (real fields -- most agency PDFs, the FMLA forms):
      every field is found, numbered in reading order, and drawn as a
      gold box on the real page. Tap a box, type; or press ASK DOC B and
      the page sends Doc B a PICTURE of the numbered form -- Doc B reads
      the questions and answers BY NUMBER; the answers land in the boxes
      for the member to confirm. FILL IT writes them into the original's
      fields. The original bytes are never rebuilt.
   2. FLAT FORMS (a scan, a photocopy -- no fields): tap anywhere on the
      page and type; each placed text is listed and can be resized or
      removed; FILL IT draws them onto the original.
   The signature is the pen's job (docb-sign.js): the filled form racks
   and downloads, and the member signs it next.

   Zero backend of its own; loads pdf.js and pdf-lib lazily on first
   open, like the pen. ES5.

   ADOPTION (one line per page, beside the sibling organs):
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/docb-form.js"></script>

   Public API:
     DocBForm.open({ pdfB64, name,
       onAskDocB: function (pngDataUrl, fieldSummaryText) {..},  // page sends the picture to Doc B
       onDone: function (filledBytesUint8, suggestedName, mode) {..} })
     DocBForm.apply({ "1": "Eduardo M. Bustamante", "7": true, ... })   // answers by box number
   ============================================================ */
(function () {
  'use strict';
  if (window.DocBForm) { return; }

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
  function b64ToU8_(b64) { var bin = atob(b64), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) { out[i] = bin.charCodeAt(i); } return out; }

  function css() {
    if (document.getElementById('dfCss')) { return; }
    var s = document.createElement('style'); s.id = 'dfCss';
    s.textContent = ''
      + '#dfVeil{position:fixed;inset:0;z-index:2600000;background:rgba(4,6,8,.94);display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;padding:12px;overflow:hidden;font-family:\'Cormorant Garamond\',Georgia,serif;color:#f0e6cc;}'
      + '.dfBar{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:10px;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:8px;}'
      + '.dfKick{font-family:Cinzel,serif;font-size:12px;letter-spacing:.18em;color:#c8a84b;-webkit-flex:1;flex:1;min-width:160px;}'
      + '.dfHint{font-size:15px;color:rgba(240,230,204,.8);margin:0 0 8px;font-style:italic;}'
      + '.dfBody{display:-webkit-flex;display:flex;gap:12px;-webkit-flex:1;flex:1;min-height:0;}'
      + '.dfStageWrap{-webkit-flex:1;flex:1;min-width:0;overflow:auto;}'
      + '.dfStage{position:relative;display:inline-block;box-shadow:0 10px 40px rgba(0,0,0,.8);border:1px solid rgba(200,168,75,.5);background:#fff;cursor:crosshair;}'
      + '.dfStage canvas{display:block;}'
      + '.dfBox{position:absolute;border:1.5px solid rgba(200,168,75,.95);background:rgba(200,168,75,.10);box-sizing:border-box;cursor:pointer;}'
      + '.dfBox.on{border-color:#ffd75e;background:rgba(255,215,94,.22);box-shadow:0 0 0 2px rgba(255,215,94,.5);}'
      + '.dfBox.filled{background:rgba(120,200,120,.16);border-color:rgba(120,200,120,.9);}'
      + '.dfNum{position:absolute;left:-2px;top:-14px;font:700 10px/12px Cinzel,serif;color:#040608;background:#ffd75e;border-radius:3px;padding:0 3px;}'
      + '.dfPane{width:320px;max-width:42vw;overflow:auto;background:rgba(6,8,12,.97);border:1px solid rgba(200,168,75,.5);border-radius:12px;padding:10px 12px;}'
      + '.dfRow{border-top:1px solid rgba(200,168,75,.18);padding:8px 0;}'
      + '.dfRow:first-child{border-top:none;}'
      + '.dfRow.on{background:rgba(255,215,94,.08);}'
      + '.dfLbl{font:700 11px/1.3 Cinzel,serif;letter-spacing:.1em;color:#c8a84b;margin-bottom:4px;}'
      + '.dfIn{width:100%;box-sizing:border-box;background:#0a0d12;border:1px solid rgba(200,168,75,.45);border-radius:8px;color:#f0e6cc;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:16px;padding:6px 8px;}'
      + '.dfBtn{background:#c8a84b;color:#040608;border:none;border-radius:999px;font-family:Cinzel,serif;font-size:13px;letter-spacing:.08em;padding:10px 18px;min-height:44px;cursor:pointer;}'
      + '.dfBtn[disabled]{opacity:.45;cursor:default;}'
      + '.dfGhostBtn{background:none;border:1px solid rgba(200,168,75,.5);color:#c8a84b;border-radius:999px;font-family:Cinzel,serif;font-size:12px;letter-spacing:.08em;padding:10px 14px;min-height:44px;cursor:pointer;}'
      + '.dfPg{font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;}'
      + '.dfSmall{font-size:12px;color:rgba(240,230,204,.6);}';
    document.head.appendChild(s);
  }

  var st = null;

  function close_() { var v = document.getElementById('dfVeil'); if (v && v.parentNode) { v.parentNode.removeChild(v); } st = null; }

  /* ---------- discovering the fields (fillable road) ---------- */
  function discover_(pdfDoc) {
    var out = [];
    var form;
    try { form = pdfDoc.getForm(); } catch (e) { return out; }
    var pages = pdfDoc.getPages();
    var pageRefs = pages.map(function (p) { return p.ref; });
    var fields = [];
    try { fields = form.getFields(); } catch (e2) { return out; }
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i], kind = 'text';
      var cn = (f && f.constructor && f.constructor.name) || '';
      if (/CheckBox/.test(cn)) { kind = 'check'; } else if (/RadioGroup/.test(cn)) { kind = 'radio'; } else if (/Dropdown/.test(cn)) { kind = 'select'; } else if (/OptionList/.test(cn)) { kind = 'select'; } else if (/TextField/.test(cn)) { kind = 'text'; } else { continue; }
      var widgets = [];
      try { widgets = f.acroField.getWidgets(); } catch (e3) {}
      for (var w = 0; w < widgets.length; w++) {
        var rect = null, pIdx = 0;
        try { rect = widgets[w].getRectangle(); } catch (e4) {}
        try {
          var pref = widgets[w].P();
          for (var pi = 0; pi < pageRefs.length; pi++) { if (pageRefs[pi] === pref) { pIdx = pi; break; } }
          if (!pref) { /* some writers omit /P: find the page whose Annots holds this widget */
            for (var pj = 0; pj < pages.length; pj++) { var an = pages[pj].node.Annots(); if (an && an.asArray && an.asArray().indexOf(widgets[w].ref) !== -1) { pIdx = pj; break; } }
          }
        } catch (e5) {}
        if (!rect) { continue; }
        var opts = [];
        if (kind === 'select') { try { opts = f.getOptions(); } catch (e6) {} }
        var onVal = '';
        if (kind === 'radio') { try { onVal = widgets[w].getOnValue ? String(widgets[w].getOnValue() || '') : ''; } catch (e7) {} }
        var cur = '';
        try { if (kind === 'text') { cur = f.getText() || ''; } else if (kind === 'check') { cur = f.isChecked() ? true : false; } else if (kind === 'select') { cur = (f.getSelected() || [])[0] || ''; } else if (kind === 'radio') { cur = f.getSelected() || ''; } } catch (e8) {}
        out.push({ field: f, name: f.getName(), kind: kind, page: pIdx, x: rect.x, y: rect.y, w: rect.width, h: rect.height, opts: opts, onVal: onVal, value: cur, filled: false });
      }
    }
    /* reading order: page, then top-to-bottom (PDF y grows upward), then left-to-right */
    out.sort(function (a, b) { if (a.page !== b.page) { return a.page - b.page; } var dy = (b.y + b.h) - (a.y + a.h); if (Math.abs(dy) > 6) { return dy; } return a.x - b.x; });
    for (var n = 0; n < out.length; n++) { out[n].n = n + 1; }
    return out;
  }

  /* ---------- drawing ---------- */
  function renderPage_() {
    var canvas = document.getElementById('dfCanvas'), stage = document.getElementById('dfStage');
    if (!canvas || !st || !st.doc) { return Promise.resolve(); }
    return st.doc.getPage(st.page).then(function (pg) {
      var wrap = document.getElementById('dfStageWrap');
      var maxW = Math.max(320, (wrap ? wrap.clientWidth : 700) - 8);
      var base = pg.getViewport({ scale: 1 });
      var scale = Math.min(maxW / base.width, 1.7);
      var vp = pg.getViewport({ scale: scale });
      canvas.width = Math.floor(vp.width); canvas.height = Math.floor(vp.height);
      st.scale = scale; st.pageH = base.height; st.pageW = base.width;
      var pgEl = document.getElementById('dfPg'); if (pgEl) { pgEl.textContent = T({ en: 'PAGE ', es: 'P\u00c1GINA ' }) + st.page + ' / ' + st.doc.numPages; }
      return pg.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise.then(drawBoxes_);
    });
  }
  function drawBoxes_() {
    var stage = document.getElementById('dfStage'); if (!stage || !st) { return; }
    var old = stage.querySelectorAll('.dfBox'); for (var i = 0; i < old.length; i++) { old[i].parentNode.removeChild(old[i]); }
    var items = st.mode === 'fields' ? st.fields : st.texts;
    for (var k = 0; k < items.length; k++) {
      var it = items[k]; if (it.page !== st.page - 1) { continue; }
      var d = document.createElement('div'); d.className = 'dfBox' + (st.cur === k ? ' on' : '') + (it.filled ? ' filled' : '');
      var left = it.x * st.scale, top = (st.pageH - it.y - it.h) * st.scale;
      d.style.left = left + 'px'; d.style.top = top + 'px'; d.style.width = Math.max(10, it.w * st.scale) + 'px'; d.style.height = Math.max(10, it.h * st.scale) + 'px';
      d.innerHTML = '<span class="dfNum">' + (it.n || (k + 1)) + '</span>';
      (function (idx) { d.addEventListener('click', function (ev) { ev.stopPropagation(); select_(idx); }); })(k);
      stage.appendChild(d);
    }
  }
  function select_(idx) {
    st.cur = idx; drawBoxes_(); renderPane_();
    var row = document.getElementById('dfRow_' + idx); if (row) { try { row.scrollIntoView({ block: 'nearest' }); } catch (e) {} var inp = row.querySelector('.dfIn'); if (inp) { inp.focus(); } }
  }
  function renderPane_() {
    var pane = document.getElementById('dfPane'); if (!pane || !st) { return; }
    var es = (lang() === 'es'), h = '';
    if (st.mode === 'fields') {
      h += '<div class="dfSmall" style="margin-bottom:8px;">' + st.fields.length + ' ' + T({ en: 'boxes found. Tap one on the page or fill them here.', es: 'casillas encontradas. Toca una en la p\u00e1gina o ll\u00e9nalas aqu\u00ed.' }) + '</div>';
      for (var i = 0; i < st.fields.length; i++) {
        var f = st.fields[i];
        h += '<div class="dfRow' + (st.cur === i ? ' on' : '') + '" id="dfRow_' + i + '"><div class="dfLbl">#' + f.n + ' \u00b7 ' + T({ en: 'p.', es: 'p\u00e1g.' }) + (f.page + 1) + (f.filled ? ' \u2713' : '') + '</div>';
        if (f.kind === 'text') { h += '<input class="dfIn" data-i="' + i + '" value="' + esc(f.value) + '">'; }
        else if (f.kind === 'check') { h += '<label><input type="checkbox" data-i="' + i + '"' + (f.value ? ' checked' : '') + '> ' + T({ en: 'checked', es: 'marcado' }) + '</label>'; }
        else if (f.kind === 'radio') { h += '<label><input type="checkbox" data-i="' + i + '"' + (String(f.value) === String(f.onVal) && f.onVal ? ' checked' : '') + '> ' + T({ en: 'select this option', es: 'elegir esta opci\u00f3n' }) + (f.onVal ? ' (' + esc(f.onVal) + ')' : '') + '</label>'; }
        else if (f.kind === 'select') { h += '<select class="dfIn" data-i="' + i + '"><option value="">\u2014</option>' + f.opts.map(function (o) { return '<option' + (o === f.value ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>'; }
        h += '</div>';
      }
    } else {
      h += '<div class="dfSmall" style="margin-bottom:8px;">' + T({ en: 'No fillable boxes in this form. Tap anywhere on the page to place text.', es: 'Este formulario no tiene casillas. Toca en la p\u00e1gina para colocar texto.' }) + '</div>';
      for (var j = 0; j < st.texts.length; j++) {
        var t = st.texts[j];
        h += '<div class="dfRow' + (st.cur === j ? ' on' : '') + '" id="dfRow_' + j + '"><div class="dfLbl">#' + (j + 1) + ' \u00b7 ' + T({ en: 'p.', es: 'p\u00e1g.' }) + (t.page + 1) + '</div>'
          + '<input class="dfIn" data-i="' + j + '" value="' + esc(t.value) + '" placeholder="' + T({ en: 'text\u2026', es: 'texto\u2026' }) + '">'
          + '<div style="display:flex;gap:8px;align-items:center;margin-top:4px;"><span class="dfSmall">' + T({ en: 'size', es: 'tama\u00f1o' }) + '</span><input type="range" min="7" max="18" value="' + t.size + '" data-size="' + j + '" style="flex:1;">'
          + '<button class="dfGhostBtn" style="min-height:32px;padding:4px 10px;" data-del="' + j + '">\u00d7</button></div></div>';
      }
    }
    pane.innerHTML = h;
    var ins = pane.querySelectorAll('[data-i]');
    for (var q = 0; q < ins.length; q++) {
      (function (el) {
        var i2 = parseInt(el.getAttribute('data-i'), 10);
        el.addEventListener('focus', function () { if (st.cur !== i2) { st.cur = i2; drawBoxes_(); } });
        el.addEventListener('input', function () { onEdit_(i2, el); });
        el.addEventListener('change', function () { onEdit_(i2, el); });
      })(ins[q]);
    }
    var sz = pane.querySelectorAll('[data-size]');
    for (var r = 0; r < sz.length; r++) { (function (el) { el.addEventListener('input', function () { st.texts[parseInt(el.getAttribute('data-size'), 10)].size = parseInt(el.value, 10) || 10; drawBoxes_(); }); })(sz[r]); }
    var dl = pane.querySelectorAll('[data-del]');
    for (var u = 0; u < dl.length; u++) { (function (el) { el.addEventListener('click', function () { st.texts.splice(parseInt(el.getAttribute('data-del'), 10), 1); st.cur = -1; drawBoxes_(); renderPane_(); }); })(dl[u]); }
  }
  function onEdit_(i, el) {
    if (st.mode === 'fields') {
      var f = st.fields[i];
      if (f.kind === 'check' || f.kind === 'radio') { f.value = el.checked ? (f.kind === 'radio' ? f.onVal : true) : (f.kind === 'radio' ? '' : false); }
      else { f.value = el.value; }
      f.filled = !!(f.value === true || (f.value && String(f.value).length));
    } else {
      var t = st.texts[i]; t.value = el.value; t.filled = !!(t.value && t.value.length);
      var box = document.getElementById('dfStage'); if (box) { drawBoxes_(); }
    }
    var lbl = document.querySelector('#dfRow_' + i + ' .dfLbl'); if (lbl) { drawBoxes_(); }
  }
  function onStageTap_(ev) {
    if (!st || st.mode !== 'flat') { return; }
    var canvas = document.getElementById('dfCanvas'); var r = canvas.getBoundingClientRect();
    var k = canvas.width / r.width;
    var cx = (ev.clientX - r.left) * k, cy = (ev.clientY - r.top) * k;
    var size = 10, w = 160, h = size * 1.4;
    var x = cx / st.scale, yTop = cy / st.scale;
    st.texts.push({ page: st.page - 1, x: x, y: st.pageH - yTop - h, w: w, h: h, size: size, value: '', filled: false });
    st.cur = st.texts.length - 1; drawBoxes_(); renderPane_();
    var row = document.getElementById('dfRow_' + st.cur); if (row) { var inp = row.querySelector('.dfIn'); if (inp) { inp.focus(); } }
  }

  /* ---------- Doc B's picture ---------- */
  function snapshot_() {
    var canvas = document.getElementById('dfCanvas'); if (!canvas) { return ''; }
    var c = document.createElement('canvas'); c.width = canvas.width; c.height = canvas.height;
    var g = c.getContext('2d'); g.drawImage(canvas, 0, 0);
    var items = st.mode === 'fields' ? st.fields : st.texts;
    g.lineWidth = 2; g.font = 'bold 13px Arial';
    for (var i = 0; i < items.length; i++) {
      var it = items[i]; if (it.page !== st.page - 1) { continue; }
      var left = it.x * st.scale, top = (st.pageH - it.y - it.h) * st.scale, w = Math.max(10, it.w * st.scale), h = Math.max(10, it.h * st.scale);
      g.strokeStyle = 'rgba(200,120,0,0.95)'; g.strokeRect(left, top, w, h);
      var label = String(it.n || (i + 1));
      g.fillStyle = '#ffd75e'; g.fillRect(left, top - 15, 8 + label.length * 8, 15);
      g.fillStyle = '#000'; g.fillText(label, left + 3, top - 3);
    }
    return c.toDataURL('image/png');
  }
  function summary_() {
    var items = st.mode === 'fields' ? st.fields : [];
    var lines = [];
    for (var i = 0; i < items.length; i++) { var f = items[i]; if (f.page !== st.page - 1) { continue; } lines.push('#' + f.n + ' ' + (f.kind === 'check' ? 'checkbox' : f.kind === 'radio' ? 'option(' + (f.onVal || '?') + ')' : f.kind === 'select' ? 'choice[' + f.opts.join('|') + ']' : 'text') + (f.value && f.value !== true ? ' (now: ' + String(f.value).substring(0, 40) + ')' : f.value === true ? ' (now: checked)' : '')); }
    return lines.join('\n');
  }
  function askDocB_() {
    if (!st || typeof st.onAskDocB !== 'function') { return; }
    var png = snapshot_(); if (!png) { return; }
    st.onAskDocB(png, summary_(), st.page, st.doc ? st.doc.numPages : 1);
    var hint = document.getElementById('dfHint'); if (hint) { hint.textContent = T({ en: 'Sent the numbered page to Doc B \u2014 the answers will land in the boxes. Confirm each one before you fill.', es: 'Env\u00ede la p\u00e1gina numerada a Doc B \u2014 las respuestas caer\u00e1n en las casillas. Confirma cada una antes de llenar.' }); }
  }
  function apply(map) {
    if (!st || !map) { return 0; }
    var applied = 0;
    var items = st.mode === 'fields' ? st.fields : [];
    for (var i = 0; i < items.length; i++) {
      var f = items[i], key = String(f.n), v = map.hasOwnProperty(key) ? map[key] : (map.hasOwnProperty('#' + key) ? map['#' + key] : undefined);
      if (v === undefined || v === null || v === '') { continue; }
      if (f.kind === 'check') { f.value = (v === true || /^(true|yes|x|checked|s\u00ed|si)$/i.test(String(v))); }
      else if (f.kind === 'radio') { f.value = (v === true || /^(true|yes|x|checked|s\u00ed|si)$/i.test(String(v))) ? f.onVal : (String(v) === f.onVal ? f.onVal : ''); }
      else if (f.kind === 'select') { var vv = String(v); var hit = f.opts.filter(function (o) { return o.toLowerCase() === vv.toLowerCase(); })[0]; f.value = hit || ''; }
      else { f.value = String(v).substring(0, 500); }
      f.filled = !!(f.value === true || (f.value && String(f.value).length));
      if (f.filled) { applied++; }
    }
    drawBoxes_(); renderPane_();
    var hint = document.getElementById('dfHint');
    if (hint) { hint.textContent = (lang() === 'es' ? 'Doc B llen\u00f3 ' + applied + ' casillas. Rev\u00edsalas, corrige lo que haga falta, y luego LL\u00c9NALO.' : 'Doc B filled ' + applied + ' boxes. Check them, fix what needs fixing, then FILL IT.'); }
    return applied;
  }

  /* ---------- writing onto the original ---------- */
  function fill_() {
    if (!st) { return; }
    var btn = document.getElementById('dfFill'); if (btn) { btn.disabled = true; }
    var PDFLib = window.PDFLib, hint = document.getElementById('dfHint');
    PDFLib.PDFDocument.load(st.pdfU8, { ignoreEncryption: true }).then(function (pdfDoc) {
      if (st.mode === 'fields') {
        var form = pdfDoc.getForm();
        var byName = {};
        var all = form.getFields();
        for (var a = 0; a < all.length; a++) { byName[all[a].getName()] = all[a]; }
        for (var i = 0; i < st.fields.length; i++) {
          var f = st.fields[i], live = byName[f.name]; if (!live) { continue; }
          try {
            if (f.kind === 'text') { if (f.value && String(f.value).length) { live.setText(String(f.value)); } }
            else if (f.kind === 'check') { if (f.value === true) { live.check(); } else if (f.filled === false && f.value === false) { live.uncheck(); } }
            else if (f.kind === 'radio') { if (f.value && f.onVal && f.value === f.onVal) { live.select(f.onVal); } }
            else if (f.kind === 'select') { if (f.value) { live.select(f.value); } }
          } catch (eF) {}
        }
        try { form.updateFieldAppearances(); } catch (eU) {}
      } else {
        return pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica).then(function (font) {
          var pages = pdfDoc.getPages();
          for (var j = 0; j < st.texts.length; j++) {
            var t = st.texts[j]; if (!t.value) { continue; }
            var pg = pages[t.page]; if (!pg) { continue; }
            pg.drawText(String(t.value), { x: t.x + 2, y: t.y + 3, size: t.size, font: font, color: PDFLib.rgb(0.05, 0.05, 0.1) });
          }
          return pdfDoc;
        });
      }
      return pdfDoc;
    }).then(function (pdfDoc) { return pdfDoc.save(); })
    .then(function (bytes) {
      var base = String(st.name || 'form.pdf').replace(/\.pdf$/i, '');
      var suggested = base + (lang() === 'es' ? ' \u2014 lleno.pdf' : ' \u2014 filled.pdf');
      var cb = st.onDone, mode = st.mode; close_();
      if (typeof cb === 'function') { cb(bytes, suggested, mode); }
    })['catch'](function (e) {
      if (btn) { btn.disabled = false; }
      if (hint) { hint.textContent = T({ en: 'Couldn\u2019t write into this form.', es: 'No se pudo escribir en este formulario.' }) + (e && e.message ? ' [' + String(e.message).substring(0, 120) + ']' : ''); }
    });
  }

  function open(o) {
    if (!o || !o.pdfB64) { return; }
    css(); close_();
    st = { name: o.name || 'form.pdf', pdfU8: b64ToU8_(o.pdfB64), onDone: o.onDone, onAskDocB: o.onAskDocB, page: 1, scale: 1, mode: 'fields', fields: [], texts: [], cur: -1 };
    var v = document.createElement('div'); v.id = 'dfVeil';
    v.innerHTML = '<div class="dfBar"><span class="dfKick">\ud83d\udccb ' + T({ en: 'FILL THIS FORM', es: 'LLENA ESTE FORMULARIO' }) + ' \u00b7 ' + esc(st.name) + '</span>'
      + '<button class="dfGhostBtn" id="dfPrev">\u25c0</button><span class="dfPg" id="dfPg"></span><button class="dfGhostBtn" id="dfNext">\u25b6</button>'
      + '<button class="dfGhostBtn" id="dfAsk">\ud83e\udd16 ' + T({ en: 'Ask Doc B', es: 'Preg\u00fantale a Doc B' }) + '</button>'
      + '<button class="dfBtn" id="dfFill">\u2713 ' + T({ en: 'Fill it', es: 'Ll\u00e9nalo' }) + '</button>'
      + '<button class="dfGhostBtn" id="dfClose">\u00d7</button></div>'
      + '<p class="dfHint" id="dfHint">' + T({ en: 'Reading the form\u2026', es: 'Leyendo el formulario\u2026' }) + '</p>'
      + '<div class="dfBody"><div class="dfStageWrap" id="dfStageWrap"><div class="dfStage" id="dfStage"><canvas id="dfCanvas"></canvas></div></div><div class="dfPane" id="dfPane"></div></div>';
    document.body.appendChild(v);
    document.getElementById('dfClose').onclick = close_;
    document.getElementById('dfFill').onclick = fill_;
    document.getElementById('dfAsk').onclick = askDocB_;
    document.getElementById('dfPrev').onclick = function () { if (st.page > 1) { st.page--; st.cur = -1; renderPage_().then(renderPane_); } };
    document.getElementById('dfNext').onclick = function () { if (st.doc && st.page < st.doc.numPages) { st.page++; st.cur = -1; renderPage_().then(renderPane_); } };
    document.getElementById('dfStage').addEventListener('click', onStageTap_);
    window.addEventListener('resize', drawBoxes_);
    libs_().then(function () {
      return window.PDFLib.PDFDocument.load(st.pdfU8, { ignoreEncryption: true });
    }).then(function (pdfDoc) {
      if (!st) { return; }
      st.fields = discover_(pdfDoc);
      st.mode = st.fields.length ? 'fields' : 'flat';
      return window.pdfjsLib.getDocument({ data: st.pdfU8.slice(0) }).promise;
    }).then(function (doc) {
      if (!st) { return; }
      st.doc = doc; st.page = 1;
      var hint = document.getElementById('dfHint');
      if (hint) { hint.textContent = st.mode === 'fields'
        ? T({ en: 'Tap a box and type, or press Ask Doc B and let him read the questions and answer by number. Confirm, then Fill it.', es: 'Toca una casilla y escribe, o pulsa Preg\u00fantale a Doc B y deja que lea las preguntas y responda por n\u00famero. Confirma y luego Ll\u00e9nalo.' })
        : T({ en: 'This is a flat form. Tap where an answer goes and type it. Then Fill it.', es: 'Es un formulario plano. Toca donde va cada respuesta y escr\u00edbela. Luego Ll\u00e9nalo.' }); }
      var ask = document.getElementById('dfAsk'); if (ask && st.mode !== 'fields') { ask.style.display = 'none'; }
      return renderPage_().then(renderPane_);
    })['catch'](function (e) {
      var hint = document.getElementById('dfHint');
      if (hint) { hint.textContent = T({ en: 'Couldn\u2019t open that PDF.', es: 'No se pudo abrir ese PDF.' }) + (e && e.message ? ' [' + String(e.message).substring(0, 100) + ']' : ''); }
    });
  }

  window.DocBForm = { open: open, apply: apply, close: close_, version: '1.0' };
})();
