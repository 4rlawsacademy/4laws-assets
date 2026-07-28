/* ═══════════════════════════════════════════════════════════════════
   WINDOW DEEP RENDER — v1.0 — BENCH 10 SUB-DEPLOY J2 (7/28/2026)
   4 LAWS Academy — shared module, hosted on GitHub/jsDelivr CDN
   Repo: 4rlawsacademy/4laws-assets @ main / window-deep-render.js
   CDN:  https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/window-deep-render.js
   (Remember: purge.jsdelivr.net after every new commit.)

   PURPOSE
   The window's carrying capacity, rendered. Takes the attachments
   array served by the backend (validated at write by Window.gs,
   parsed at read by Gallery.gs) and renders full depth INSIDE the
   window page: longform pieces fetched from R2 and rendered in-room,
   link cards, image views, shelf documents. One module, imported by
   every surface that renders window depth — never copied (the
   DocBCore discipline; Rule 13's best friend).

   CONTRACT (Director's ruling, 7/28/26 — R2-hosted longform):
     attachment = { type: 'longform'|'link'|'image'|'document',
                    title: string, url: 'https://...' }

   USAGE (from any page, after this script loads):
     WindowDeepRender.render(containerEl, attachmentsArray, {
       getLang: function() { return 'en' or 'es'; }   // optional
     });
   Renders nothing (and clears the container) when the array is empty
   — lightness on the door is the caller's concern; this module only
   builds the room.

   ES5 only. Single IIFE. All CSS scoped under .wdr- prefix and
   injected once. No inline event attributes.
   ═══════════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  var STYLE_ID = 'wdr-styles-v1';

  var CSS = '' +
    '.wdr-root { margin-top: 34px; }' +
    '.wdr-section { border: 1px solid rgba(200,168,75,0.25); border-radius: 4px; background: rgba(240,230,204,0.02); padding: 28px 26px; margin-bottom: 26px; }' +
    '.wdr-section-title { font-family: "Cinzel", serif; font-size: 22px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #c8a84b; text-align: center; margin: 0 0 20px 0; }' +
    '.wdr-longform-title { font-family: "Playfair Display", Georgia, serif; font-size: 34px; font-weight: 700; color: #f0d97a; margin: 0 0 18px 0; line-height: 1.15; }' +
    '.wdr-longform-body { font-family: "Cormorant Garamond", serif; font-size: 23px; line-height: 1.65; color: #f0e6cc; }' +
    '.wdr-longform-body h1, .wdr-longform-body h2, .wdr-longform-body h3 { font-family: "Playfair Display", Georgia, serif; color: #f0d97a; line-height: 1.2; margin: 26px 0 12px 0; }' +
    '.wdr-longform-body h1 { font-size: 32px; } .wdr-longform-body h2 { font-size: 28px; } .wdr-longform-body h3 { font-size: 25px; }' +
    '.wdr-longform-body p { margin: 0 0 16px 0; }' +
    '.wdr-longform-body a { color: #c8a84b; text-decoration: underline; }' +
    '.wdr-longform-body img { max-width: 100%; height: auto; border-radius: 3px; border: 1px solid rgba(200,168,75,0.3); }' +
    '.wdr-longform-body table { border-collapse: collapse; width: 100%; margin: 16px 0; }' +
    '.wdr-longform-body th, .wdr-longform-body td { border: 1px solid rgba(200,168,75,0.3); padding: 10px 12px; font-size: 21px; text-align: left; }' +
    '.wdr-longform-body th { font-family: "Cinzel", serif; font-size: 16px; letter-spacing: 0.12em; text-transform: uppercase; color: #c8a84b; }' +
    '.wdr-longform-body blockquote { border-left: 3px solid rgba(200,168,75,0.5); margin: 16px 0; padding: 6px 0 6px 18px; font-style: italic; color: rgba(240,230,204,0.85); }' +
    '.wdr-longform-body ul, .wdr-longform-body ol { margin: 0 0 16px 0; padding-left: 28px; }' +
    '.wdr-loading { font-family: "Cormorant Garamond", serif; font-size: 20px; font-style: italic; color: rgba(240,230,204,0.55); text-align: center; padding: 18px 0; }' +
    '.wdr-fail { font-family: "Cormorant Garamond", serif; font-size: 20px; color: rgba(240,230,204,0.7); text-align: center; padding: 12px 0; }' +
    '.wdr-fail a { color: #c8a84b; text-decoration: underline; }' +
    '.wdr-link-row { display: flex; align-items: center; gap: 12px; border: 1px solid rgba(200,168,75,0.2); border-radius: 4px; background: rgba(240,230,204,0.03); padding: 14px 16px; margin-bottom: 10px; text-decoration: none; transition: border-color 0.25s ease; }' +
    '.wdr-link-row:hover { border-color: rgba(200,168,75,0.55); }' +
    '.wdr-link-glyph { font-size: 20px; flex-shrink: 0; }' +
    '.wdr-link-title { font-family: "Cormorant Garamond", serif; font-size: 22px; color: #c8a84b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
    '.wdr-link-arrow { margin-left: auto; color: rgba(200,168,75,0.6); font-size: 18px; flex-shrink: 0; }' +
    '.wdr-img-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }' +
    '.wdr-img-cell { display: block; border: 1px solid rgba(200,168,75,0.25); border-radius: 4px; overflow: hidden; background: #040608; }' +
    '.wdr-img-cell img { display: block; width: 100%; height: 210px; object-fit: cover; }' +
    '.wdr-img-caption { font-family: "Cormorant Garamond", serif; font-size: 18px; color: rgba(240,230,204,0.75); padding: 8px 10px; }' +
    '@media (max-width: 768px) {' +
      '.wdr-section { padding: 20px 16px; }' +
      '.wdr-longform-title { font-size: 28px; }' +
      '.wdr-longform-body { font-size: 21px; }' +
      '.wdr-img-grid { grid-template-columns: 1fr; }' +
    '}';

  var LABELS = {
    linked:    { en: 'Linked Work',      es: 'Obra Enlazada' },
    shelf:     { en: 'On the Shelf',     es: 'En el Estante' },
    views:     { en: 'More Views',       es: 'M\u00e1s Vistas' },
    opening:   { en: 'Opening the full piece\u2026', es: 'Abriendo la obra completa\u2026' },
    failOpen:  { en: 'Could not open this piece here.', es: 'No se pudo abrir la obra aqu\u00ed.' },
    failLink:  { en: 'Visit it directly \u2192', es: 'Visitarla directamente \u2192' }
  };

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function pick(label, lang) {
    return (lang === 'es') ? label.es : label.en;
  }

  function safeUrl(url) {
    return (typeof url === 'string' && url.indexOf('https://') === 0) ? url : '';
  }

  /* ── SANITIZER ────────────────────────────────────────────────────
     Longform HTML is authored inside the platform, but the renderer
     still trusts nothing: scripts, frames, embeds, styles, event
     attributes, and javascript: URLs are all stripped before the
     content enters the page. */
  var BLOCKED_TAGS = { SCRIPT: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, STYLE: 1, LINK: 1, META: 1, FORM: 1, INPUT: 1, BUTTON: 1, TEXTAREA: 1, SELECT: 1 };

  function sanitizeNode(node) {
    var i, child;
    var children = [];
    for (i = 0; i < node.childNodes.length; i++) children.push(node.childNodes[i]);
    for (i = 0; i < children.length; i++) {
      child = children[i];
      if (child.nodeType === 1) {
        if (BLOCKED_TAGS[child.tagName]) {
          node.removeChild(child);
          continue;
        }
        var attrs = [];
        var j;
        for (j = 0; j < child.attributes.length; j++) attrs.push(child.attributes[j].name);
        for (j = 0; j < attrs.length; j++) {
          var name = attrs[j].toLowerCase();
          if (name.indexOf('on') === 0) { child.removeAttribute(attrs[j]); continue; }
          if (name === 'href' || name === 'src') {
            var v = String(child.getAttribute(attrs[j]) || '');
            var vTrim = v.replace(/^\s+/, '').toLowerCase();
            if (vTrim.indexOf('javascript:') === 0 || vTrim.indexOf('data:') === 0 || vTrim.indexOf('vbscript:') === 0) {
              child.removeAttribute(attrs[j]);
            }
          }
          if (name === 'style') { child.removeAttribute(attrs[j]); }
        }
        if (child.tagName === 'A') {
          child.setAttribute('target', '_blank');
          child.setAttribute('rel', 'noopener');
        }
        sanitizeNode(child);
      } else if (child.nodeType === 8) {
        node.removeChild(child);
      }
    }
  }

  function sanitizeHtml(html) {
    var doc;
    try {
      doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
    } catch (e) {
      return null;
    }
    if (!doc || !doc.body) return null;
    sanitizeNode(doc.body);
    return doc.body;
  }

  /* ── SECTION BUILDERS ───────────────────────────────────────────── */

  function buildLongform(att, lang) {
    var section = document.createElement('div');
    section.className = 'wdr-section';
    var h = document.createElement('h2');
    h.className = 'wdr-longform-title';
    h.textContent = att.title;
    section.appendChild(h);

    var body = document.createElement('div');
    body.className = 'wdr-longform-body';
    var loading = document.createElement('div');
    loading.className = 'wdr-loading';
    loading.textContent = pick(LABELS.opening, lang);
    body.appendChild(loading);
    section.appendChild(body);

    var url = safeUrl(att.url);
    if (!url) {
      body.innerHTML = '';
      appendFail(body, att, lang);
      return section;
    }

    fetch(url)
      .then(function(resp) {
        if (!resp.ok) throw new Error('http ' + resp.status);
        return resp.text();
      })
      .then(function(text) {
        var cleanBody = sanitizeHtml(text);
        body.innerHTML = '';
        if (!cleanBody) { appendFail(body, att, lang); return; }
        while (cleanBody.firstChild) {
          body.appendChild(cleanBody.firstChild);
        }
      })
      .catch(function() {
        body.innerHTML = '';
        appendFail(body, att, lang);
      });

    return section;
  }

  function appendFail(container, att, lang) {
    var fail = document.createElement('div');
    fail.className = 'wdr-fail';
    var span = document.createElement('span');
    span.textContent = pick(LABELS.failOpen, lang) + ' ';
    fail.appendChild(span);
    var url = safeUrl(att.url);
    if (url) {
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = pick(LABELS.failLink, lang);
      fail.appendChild(a);
    }
    container.appendChild(fail);
  }

  function buildLinkSection(items, lang) {
    var section = document.createElement('div');
    section.className = 'wdr-section';
    var h = document.createElement('h2');
    h.className = 'wdr-section-title';
    h.textContent = pick(LABELS.linked, lang);
    section.appendChild(h);
    for (var i = 0; i < items.length; i++) {
      section.appendChild(buildRow(items[i], '\uD83D\uDD17'));
    }
    return section;
  }

  function buildDocSection(items, lang) {
    var section = document.createElement('div');
    section.className = 'wdr-section';
    var h = document.createElement('h2');
    h.className = 'wdr-section-title';
    h.textContent = pick(LABELS.shelf, lang);
    section.appendChild(h);
    for (var i = 0; i < items.length; i++) {
      section.appendChild(buildRow(items[i], '\uD83D\uDCC4'));
    }
    return section;
  }

  function buildRow(att, glyph) {
    var url = safeUrl(att.url);
    var row = document.createElement(url ? 'a' : 'div');
    row.className = 'wdr-link-row';
    if (url) {
      row.href = url;
      row.target = '_blank';
      row.rel = 'noopener';
    }
    var g = document.createElement('span');
    g.className = 'wdr-link-glyph';
    g.textContent = glyph;
    var t = document.createElement('span');
    t.className = 'wdr-link-title';
    t.textContent = att.title;
    var arrow = document.createElement('span');
    arrow.className = 'wdr-link-arrow';
    arrow.textContent = '\u2192';
    row.appendChild(g);
    row.appendChild(t);
    row.appendChild(arrow);
    return row;
  }

  function buildImageSection(items, lang) {
    var section = document.createElement('div');
    section.className = 'wdr-section';
    var h = document.createElement('h2');
    h.className = 'wdr-section-title';
    h.textContent = pick(LABELS.views, lang);
    section.appendChild(h);
    var grid = document.createElement('div');
    grid.className = 'wdr-img-grid';
    for (var i = 0; i < items.length; i++) {
      var att = items[i];
      var url = safeUrl(att.url);
      if (!url) continue;
      var cell = document.createElement('a');
      cell.className = 'wdr-img-cell';
      cell.href = url;
      cell.target = '_blank';
      cell.rel = 'noopener';
      var img = document.createElement('img');
      img.src = url;
      img.alt = att.title;
      img.loading = 'lazy';
      cell.appendChild(img);
      if (att.title) {
        var cap = document.createElement('div');
        cap.className = 'wdr-img-caption';
        cap.textContent = att.title;
        cell.appendChild(cap);
      }
      grid.appendChild(cell);
    }
    section.appendChild(grid);
    return section;
  }

  /* ── PUBLIC API ─────────────────────────────────────────────────── */

  function render(container, attachments, opts) {
    if (!container) return;
    injectStyles();
    container.innerHTML = '';

    var list = attachments;
    if (Object.prototype.toString.call(list) !== '[object Array]') list = [];
    if (!list.length) return;

    var lang = 'en';
    try {
      if (opts && typeof opts.getLang === 'function') lang = opts.getLang() || 'en';
      else if (opts && typeof opts.lang === 'string') lang = opts.lang;
    } catch (e) { lang = 'en'; }

    var root = document.createElement('div');
    root.className = 'wdr-root';

    var longforms = [];
    var links = [];
    var images = [];
    var documents = [];
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (!a || !a.type || !a.title) continue;
      if (a.type === 'longform') longforms.push(a);
      else if (a.type === 'link') links.push(a);
      else if (a.type === 'image') images.push(a);
      else if (a.type === 'document') documents.push(a);
    }

    /* Depth first: the full pieces render in-room at the top of the
       carried section; the lighter shelves follow. */
    for (var lf = 0; lf < longforms.length; lf++) {
      root.appendChild(buildLongform(longforms[lf], lang));
    }
    if (images.length)    root.appendChild(buildImageSection(images, lang));
    if (documents.length) root.appendChild(buildDocSection(documents, lang));
    if (links.length)     root.appendChild(buildLinkSection(links, lang));

    container.appendChild(root);
  }

  window.WindowDeepRender = { render: render, version: '1.0' };

})();
