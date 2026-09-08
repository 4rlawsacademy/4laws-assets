/* BENCH 33 super-bucket.js v1.7 — THE NAMED MOUTH (founder's field catch,
 * 9/2 night: he dragged a true screenshot onto the overlay's bucket and the
 * house said NOTHING — no todo, no bubble, no refusal. Verified in this
 * file: the drop handler ate real files (road 1) and dragged links (road 2),
 * but a drop carrying NEITHER — common when dragging from photo previews,
 * some iPad drags, or file "promises" the browser never fills — fell off
 * the end in silence. A silent bucket breaks the house law: every failure
 * the member can see carries its name.) v1.7: the fall-through now SPEAKS,
 * inline under the mouth in the member's tongue — "[empty-drop] That drag
 * carried no file — tap the bucket to choose it, or copy the image and
 * paste it here." — shown 8 seconds, then gone. Nothing else moved.
 * One organ overwrite + CDN purge and every bucket in the kingdom is
 * honest. v1.6 -> v1.7. ES5. Lineage:
 *
 * BENCH 31 super-bucket.js v1.6 — THE SILENT HOVER (founder, 8/30: the grey
 * "Click to choose a file…" tooltip still floated over every bucket, an old
 * promise contradicting the new signs). v1.6 removes the zone's title; the
 * promise line under the face is the only instruction. v1.5 -> v1.6. ES5.
 *
 * BENCH 31 super-bucket.js v1.5 — THE SHOWN LINK (founder, minutes after v1.4:
 * "It lit gold and didn't show the link... SUPER counter intuitive. It feels
 * like a failure.") v1.4 saved the instant a link was pasted, so the field
 * emptied before the member could see what arrived; the only proof was a
 * flash and a toast off-screen. v1.5: a paste STAYS in the field, visible;
 * SAVE (or Enter) saves; then a line under the mouth says "✓ Saved: <link>"
 * (✓ Guardado) and stays until the next save. Nothing else moved.
 * v1.4 -> v1.5. ES5. Lineage:
 *
 * BENCH 31 super-bucket.js v1.4 — THE LINK MOUTH (founder, 8/29 night, inside
 * a todo: "Tell me, where do I paste a link?" — there was nowhere. A pasted
 * link only landed while the zone itself had keyboard focus, which meant
 * click-the-picker-then-Esc-then-Cmd+V on a desktop and nothing at all on a
 * phone. "I don't want tricks. I want a working bucket.") v1.4: when the page
 * supplies opts.onUrl, every bucket grows a visible mouth for links — a slim
 * gold line under the promise, "🔗 Paste a link here / Pega un enlace aquí".
 * Tap it, paste, press Enter (or tap SAVE); an https link goes to opts.onUrl
 * exactly as the old paste road did, the field clears and flashes gold; a
 * non-link flashes red and stays so it can be fixed. Clicking the mouth never
 * opens the file picker. The old focus-paste road survives unchanged. Pages
 * need no change: one organ overwrite + purge and every bucket has a mouth.
 * v1.3 -> v1.4. ES5. Lineage:
 *
 * BENCH 30 super-bucket.js v1.3 — THE WHOLE HANDFUL (founder's field loss,
 * 8/28: he dropped three files into a bucket that says BRING IT ON, and the
 * organ kept the first and silently dropped the other two — every drop and
 * every pick handed the page files[0] only). v1.3: the picker allows many,
 * and every file in a drop or a pick reaches the page — one onFile call per
 * file in order, or, when the page supplies opts.onFiles(files), the whole
 * handful in one call so the page can send them as one breath. askTitle
 * mounts keep their one-at-a-time title row (the first file asks, the rest
 * wait in line). BD GATE CATCH (credited): a second drop or paste while a
 * title row was open overwrote the file being named — it now joins the
 * back of the line instead. Nothing else moved. version:'1.3'. Lineage:
 * v1.2 below.
 */
/* BENCH 30 super-bucket.js v1.2 — THE OPEN SHELF (founder's ruling, 8/28:
 * "why wouldn't I want to upload .docx, .doc or .txt files?"). v1.1 refused
 * anything but images/PDF/HEIC at the door — right for a READING mouth
 * (Doc B's road takes only images and PDFs), wrong for a SHELF mouth that
 * just racks a file in Drive for later; the legacy shelf inputs took Word
 * and text and the organ silently took that away when it was mounted on
 * them. v1.2 adds one option, 'allow': omit it and the reading wall stands
 * exactly as v1.1 (no page changes behavior by accident); pass
 * allow:'any' and the mouth takes every file the host page's road can
 * rack (shelf mounts). Nothing else moved. Pages that want the open shelf
 * pass it explicitly: /todos v55_20 (Smart Day shelf), pws-talent v91_18
 * (Favorite Day drawer wall). version:'1.2'. Lineage: v1.1 below.
 */
/* BENCH 29 super-bucket.js v1.1 — THE ONE MOUTH (v1.1: BD gate nits — dead _seq removed; crown now names the real isolation mechanism, closure-locality, which BD verified is stronger than the id scheme v1.0's comment wrongly described) (founder's ruling, 8/28:
 * "the bucket is the game's mouth" — one fleet organ, mounted anywhere,
 * so every page's bucket is the SAME real bucket and can never drift the
 * way hand-clones do; the sendFileToDockB typo of 8/27 is the standing
 * proof of why). Design rulings honored: (1) keep both doors per page
 * where two contexts exist (drawer = planning room, overlay = mid-
 * activity), but ONE MOUTH per door — the bucket subsumes + Add File and
 * + Add Link; Entertainment/Contacts/Alarms remain accessory buttons
 * (structured data, not droppable content). (2) Every hand the proven
 * buckets have: tap-to-browse, true drag/drop, clipboard paste (file
 * AND text-URL), name-it-in-a-breath. (3) The face is honest: the
 * promise line under it must say what actually happens on this page.
 *
 * USAGE (ES5, zero dependencies):
 *   SuperBucket.mount(hostElement, {
 *     lang:   function() { return 'en' or 'es'; }   // live, follows toggles
 *     face:   'chainsaw' | 'batea' | <https image URL> | null,
 *     promiseEn: 'Drop it here — Doc B reads it',   // the honest promise
 *     promiseEs: 'Suéltalo aquí — Doc B lo lee',
 *     accept: 'image/*,application/pdf',             // optional, default shown
 *     allow:  'any',                                 // v1.2, optional: open shelf — take every file type
 *     onFiles: function(files) { ... },              // v1.3, optional: receive a whole multi-file drop at once
 *     askTitle: true,                                // name-in-a-breath row
 *     onFile: function(file, title) { ... },         // REQUIRED — page decides
 *     onUrl:  function(url) { ... }                  // optional — pasted https
 *   });
 * Returns { reset: fn, host: el }. Mount multiple independently — every
 * piece of state is closure-local to its own mount() call, so two mounts
 * share nothing and can never collide (BD-verified: stronger than any id
 * scheme). All styling inline (no CSS file needed);
 * gold-on-felt house dress, 44px+ touch targets, bilingual via spans the
 * host page's own .en/.es CSS governs where present, else lang() picks.
 */
(function() {
  'use strict';
  var FACES = {
    chainsaw: 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/chainsaw-bucket-icon.jpg',
    batea:    'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/la-batea.jpg'
  };
  function mount(host, opts) {
    if (!host || !opts || typeof opts.onFile !== 'function') return null;
    var lang = (typeof opts.lang === 'function') ? opts.lang : function() { return 'en'; };
    var accept = opts.accept || 'image/*,application/pdf';
    var askTitle = (opts.askTitle !== false);
    var allowAny = (opts.allow === 'any'); /* v1.2 THE OPEN SHELF */
    var pending = null;

    var zone = document.createElement('div');
    zone.setAttribute('tabindex', '0');
    /* v1.6: no hover tooltip -- the promise line and the signs say it better */
    zone.style.cssText = 'margin:12px 0 6px;border:2px dashed rgba(200,168,75,0.45);border-radius:8px;padding:14px 12px;text-align:center;cursor:pointer;outline:none;';

    var faceUrl = opts.face ? (FACES[opts.face] || String(opts.face)) : '';
    var h = '';
    if (faceUrl) {
      h += '<img src="' + faceUrl + '" alt="" onerror="this.style.display=\'none\'" style="display:block;margin:0 auto 6px;max-width:200px;width:60%;border-radius:8px;box-shadow:0 5px 20px rgba(0,0,0,0.6), 0 0 16px rgba(200,168,75,0.25);">';
    }
    h += '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-style:italic;font-size:16px;color:rgba(240,230,204,0.6);">'
      + '<span class="en">' + (opts.promiseEn || 'Drop it here') + '</span>'
      + '<span class="es">' + (opts.promiseEs || opts.promiseEn || 'Su\u00e9ltalo aqu\u00ed') + '</span></div>';
    zone.innerHTML = h;

    var input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.style.display = 'none';
    zone.appendChild(input);

    var row = document.createElement('div');
    row.style.cssText = 'display:none;margin-top:12px;gap:8px;align-items:center;';
    var titleInp = document.createElement('input');
    titleInp.type = 'text';
    titleInp.maxLength = 60;
    titleInp.style.cssText = 'flex:1;min-width:0;min-height:40px;padding:6px 10px;background:rgba(240,230,204,0.05);border:1px solid rgba(200,168,75,0.35);border-radius:4px;color:#f0e6cc;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:16px;';
    var saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.style.cssText = 'min-height:44px;padding:8px 14px;font-family:Cinzel,serif;font-size:13px;letter-spacing:0.1em;color:#040608;background:#c8a84b;border:none;border-radius:4px;cursor:pointer;';
    saveBtn.innerHTML = '<span class="en">DROP IT</span><span class="es">AL BALDE</span>';
    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.style.cssText = 'min-height:44px;padding:8px 12px;font-family:Cinzel,serif;font-size:13px;letter-spacing:0.1em;color:#c8a84b;background:transparent;border:1px solid rgba(200,168,75,0.4);border-radius:4px;cursor:pointer;opacity:0.8;';
    cancelBtn.innerHTML = '<span class="en">Cancel</span><span class="es">Cancelar</span>';
    row.appendChild(titleInp); row.appendChild(saveBtn); row.appendChild(cancelBtn);
    zone.appendChild(row);

    /* v1.4 THE LINK MOUTH: a visible place for a link, only when the page takes links */
    var linkRow = null, linkInp = null, linkBtn = null, linkDone = null;
    if (typeof opts.onUrl === 'function') {
      linkRow = document.createElement('div');
      linkRow.style.cssText = 'display:flex;gap:8px;align-items:center;margin-top:10px;';
      linkInp = document.createElement('input');
      linkInp.type = 'url';
      linkInp.setAttribute('inputmode', 'url');
      linkInp.setAttribute('autocomplete', 'off');
      linkInp.setAttribute('autocapitalize', 'off');
      linkInp.placeholder = lang() === 'es' ? '\uD83D\uDD17 Pega un enlace aqu\u00ed' : '\uD83D\uDD17 Paste a link here';
      linkInp.style.cssText = 'flex:1;min-width:0;min-height:44px;padding:6px 12px;background:rgba(240,230,204,0.05);border:1px solid rgba(200,168,75,0.35);border-radius:4px;color:#f0e6cc;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:16px;outline:none;';
      linkBtn = document.createElement('button');
      linkBtn.type = 'button';
      linkBtn.style.cssText = 'min-height:44px;padding:8px 14px;font-family:Cinzel,serif;font-size:13px;letter-spacing:0.1em;color:#040608;background:#c8a84b;border:none;border-radius:4px;cursor:pointer;';
      linkBtn.innerHTML = '<span class="en">SAVE</span><span class="es">GUARDAR</span>';
      linkRow.appendChild(linkInp); linkRow.appendChild(linkBtn);
      zone.appendChild(linkRow);
      linkDone = document.createElement('div');   /* v1.5: the receipt */
      linkDone.style.cssText = 'display:none;margin-top:8px;font-family:\'Cormorant Garamond\',Georgia,serif;font-size:15px;color:#c8a84b;text-align:left;word-break:break-all;';
      zone.appendChild(linkDone);
    }
    host.appendChild(zone);

    function takeLink() {
      if (!linkInp) return;
      var u = String(linkInp.value || '').replace(/^\s+|\s+$/g, '').split(/[\r\n]/)[0];
      if (!u) return;
      if (!/^https?:\/\//i.test(u)) { linkInp.style.borderColor = 'rgba(220,80,80,0.9)'; setTimeout(function() { linkInp.style.borderColor = 'rgba(200,168,75,0.35)'; }, 900); return; }
      opts.onUrl(u);
      linkInp.value = '';
      if (linkDone) { linkDone.textContent = (lang() === 'es' ? '\u2713 Guardado: ' : '\u2713 Saved: ') + u; linkDone.style.display = 'block'; }   /* v1.5: say it, and show it */
      linkInp.style.borderColor = '#c8a84b'; setTimeout(function() { linkInp.style.borderColor = 'rgba(200,168,75,0.35)'; }, 700);
    }

    function reset() { pending = null; input.value = ''; row.style.display = 'none'; }
    /* v1.3 THE WHOLE HANDFUL: every file in a drop or pick reaches the page */
    var queue = [];
    function offerAll(list) {
      var arr = [], i;
      for (i = 0; i < (list ? list.length : 0); i++) { if (list[i]) arr.push(list[i]); }
      if (!arr.length) return;
      if (typeof opts.onFiles === 'function' && !askTitle) {
        var okArr = [];
        for (i = 0; i < arr.length; i++) { if (accepts(arr[i])) okArr.push(arr[i]); else flashNo(arr[i]); }
        if (okArr.length) opts.onFiles(okArr);
        return;
      }
      if (!askTitle) { for (i = 0; i < arr.length; i++) offer(arr[i]); return; }
      /* BD's gate catch (credited): a drop or paste while a title row is
         already open used to overwrite the file being named — lost, never
         queued. Now the newcomers join the back of the line and the open
         row keeps its file. */
      if (pending) { queue = queue.concat(arr); return; }
      queue = queue.concat(arr.slice(1));
      offer(arr[0]);
    }
    function nextInLine() { if (queue.length) { var f = queue.shift(); offer(f); } }
    function accepts(file) {
      var t = String(file.type || '').toLowerCase(), nm = String(file.name || '').toLowerCase();
      return allowAny || /^image\//.test(t) || t === 'application/pdf' || /\.(pdf|png|jpe?g|gif|webp|heic)$/.test(nm);
    }
    function flashNo(file) { host.style.borderColor = 'rgba(220,80,80,0.8)'; setTimeout(function() { host.style.borderColor = ''; }, 900); }
    function offer(file) {
      if (!file) return;
      var t = file.type || '';
      var nm = String(file.name || '').toLowerCase();
      var ok = allowAny || /^image\//.test(t) || t === 'application/pdf' || /\.(pdf|png|jpe?g|gif|webp|heic)$/.test(nm);
      if (!ok) { flashBorder('#b05050'); return; }
      if (!askTitle) { opts.onFile(file, ''); reset(); return; }
      pending = file;
      titleInp.placeholder = lang() === 'es' ? 'N\u00f3mbralo en un suspiro\u2026' : 'Name it in a breath\u2026';
      var base = String(file.name || '').replace(/\.[^.]+$/, '');
      titleInp.value = (base && base.toLowerCase().indexOf('screenshot') === -1 && base.toLowerCase().indexOf('img_') !== 0) ? base : '';
      row.style.display = 'flex';
      try { titleInp.focus(); } catch (eF) {}
    }
    function commit() {
      if (!pending) { reset(); return; }
      var t = String(titleInp.value || '').replace(/^\s+|\s+$/g, '');
      if (!t) t = (lang() === 'es' ? 'Captura ' : 'Screenshot ') + new Date().toLocaleDateString();
      var f = pending;
      reset();
      opts.onFile(f, t.substring(0, 60));
      nextInLine(); /* v1.3: the next file in the handful asks its title */
    }
    function flashBorder(color) {
      zone.style.borderColor = color;
      setTimeout(function() { zone.style.borderColor = 'rgba(200,168,75,0.45)'; }, 900);
    }

    zone.addEventListener('click', function(e) {
      if (row.style.display !== 'none') return;
      var tg = e.target;
      while (tg && tg !== zone) { if (tg === row || tg === linkRow) return; tg = tg.parentNode; }   /* v1.4: the link mouth never opens the picker */
      input.click();
    });
    input.multiple = true; /* v1.3 */
    input.addEventListener('change', function() { if (input.files && input.files.length) offerAll(input.files); });
    zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.style.borderColor = '#c8a84b'; });
    zone.addEventListener('dragleave', function() { zone.style.borderColor = 'rgba(200,168,75,0.45)'; });
    /* v1.7 THE NAMED MOUTH: a bucket never swallows in silence */
    var namedLine = null, namedTimer = null;
    function speakFailure_(en, es) {
      try {
        if (!namedLine) {
          namedLine = document.createElement('div');
          namedLine.style.cssText = 'margin-top:8px;font-size:13px;line-height:1.5;color:#e0b3b3;font-style:italic;text-align:center;';
          zone.appendChild(namedLine);
        }
        namedLine.textContent = (lang() === 'es') ? es : en;
        namedLine.style.display = 'block';
        if (namedTimer) clearTimeout(namedTimer);
        namedTimer = setTimeout(function() { if (namedLine) namedLine.style.display = 'none'; }, 8000);
      } catch (eS) {}
    }
    zone.addEventListener('drop', function(e) {
      e.preventDefault(); zone.style.borderColor = 'rgba(200,168,75,0.45)';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) { offerAll(e.dataTransfer.files); return; }
      /* a dragged LINK (from another tab's address bar) arrives as text */
      if (opts.onUrl && e.dataTransfer) {
        var u0 = '';
        try { u0 = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain') || ''; } catch (eU) {}
        u0 = String(u0).replace(/^\s+|\s+$/g, '').split(/[\r\n]/)[0];
        if (/^https?:\/\//i.test(u0)) { opts.onUrl(u0); return; }
      }
      /* v1.7: the drop carried no file and no link — name it, never silence */
      speakFailure_(
        '[empty-drop] That drag carried no file — tap the bucket to choose it, or copy the image and paste it here.',
        '[empty-drop] Ese arrastre no traía archivo — toca el balde para elegirlo, o copia la imagen y pégala aquí.'
      );
    });
    zone.addEventListener('paste', function(e) {
      var items = (e.clipboardData && e.clipboardData.items) || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          var pf = items[i].getAsFile();
          if (pf) { e.preventDefault(); e.stopPropagation(); offerAll([pf]); return; } /* v1.3: paste rides the same line */
        }
      }
      /* ONE MOUTH: a pasted https link racks as a link (subsumes + Add Link) */
      if (opts.onUrl && e.clipboardData) {
        var txt = '';
        try { txt = e.clipboardData.getData('text/plain') || ''; } catch (eT) {}
        txt = String(txt).replace(/^\s+|\s+$/g, '');
        if (/^https?:\/\//i.test(txt)) { e.preventDefault(); opts.onUrl(txt); }
      }
    });
    saveBtn.addEventListener('click', function(e) { e.stopPropagation(); commit(); });
    cancelBtn.addEventListener('click', function(e) { e.stopPropagation(); reset(); nextInLine(); });
    titleInp.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.keyCode === 13) { e.preventDefault(); commit(); } });
    titleInp.addEventListener('click', function(e) { e.stopPropagation(); });
    if (linkInp) {
      linkInp.addEventListener('click', function(e) { e.stopPropagation(); });
      linkInp.addEventListener('paste', function(e) { e.stopPropagation(); });   /* v1.5: a paste STAYS visible in the field; SAVE or Enter saves. Never reaches the zone's paste road. */
      linkInp.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.keyCode === 13) { e.preventDefault(); e.stopPropagation(); takeLink(); } });
      linkBtn.addEventListener('click', function(e) { e.stopPropagation(); takeLink(); });
      /* keep the placeholder in the member's tongue if the page swaps language after mount */
      zone.addEventListener('mouseenter', function() { linkInp.placeholder = lang() === 'es' ? '\uD83D\uDD17 Pega un enlace aqu\u00ed' : '\uD83D\uDD17 Paste a link here'; });
    }

    return { reset: reset, host: zone };
  }

  window.SuperBucket = { mount: mount, version: '1.7' };
})();
