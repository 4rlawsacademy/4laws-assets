/* BENCH 29 super-bucket.js v1.0 — THE ONE MOUTH (founder's ruling, 8/28:
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
 *     askTitle: true,                                // name-in-a-breath row
 *     onFile: function(file, title) { ... },         // REQUIRED — page decides
 *     onUrl:  function(url) { ... }                  // optional — pasted https
 *   });
 * Returns { reset: fn, host: el }. Mount multiple independently — ids are
 * generated, never colliding. All styling inline (no CSS file needed);
 * gold-on-felt house dress, 44px+ touch targets, bilingual via spans the
 * host page's own .en/.es CSS governs where present, else lang() picks.
 */
(function() {
  'use strict';
  var FACES = {
    chainsaw: 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/chainsaw-bucket-icon.jpg',
    batea:    'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/la-batea.jpg'
  };
  var _seq = 0;

  function mount(host, opts) {
    if (!host || !opts || typeof opts.onFile !== 'function') return null;
    _seq++;
    var lang = (typeof opts.lang === 'function') ? opts.lang : function() { return 'en'; };
    var accept = opts.accept || 'image/*,application/pdf';
    var askTitle = (opts.askTitle !== false);
    var pending = null;

    var zone = document.createElement('div');
    zone.setAttribute('tabindex', '0');
    zone.title = 'Click to choose a file - or drag one in, or copy a screenshot and press Cmd/Ctrl+V';
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
    host.appendChild(zone);

    function reset() { pending = null; input.value = ''; row.style.display = 'none'; }
    function offer(file) {
      if (!file) return;
      var t = file.type || '';
      var nm = String(file.name || '').toLowerCase();
      var ok = /^image\//.test(t) || t === 'application/pdf' || /\.(pdf|png|jpe?g|gif|webp|heic)$/.test(nm);
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
    }
    function flashBorder(color) {
      zone.style.borderColor = color;
      setTimeout(function() { zone.style.borderColor = 'rgba(200,168,75,0.45)'; }, 900);
    }

    zone.addEventListener('click', function(e) {
      if (row.style.display !== 'none') return;
      var tg = e.target;
      while (tg && tg !== zone) { if (tg === row) return; tg = tg.parentNode; }
      input.click();
    });
    input.addEventListener('change', function() { if (input.files && input.files[0]) offer(input.files[0]); });
    zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.style.borderColor = '#c8a84b'; });
    zone.addEventListener('dragleave', function() { zone.style.borderColor = 'rgba(200,168,75,0.45)'; });
    zone.addEventListener('drop', function(e) {
      e.preventDefault(); zone.style.borderColor = 'rgba(200,168,75,0.45)';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) { offer(e.dataTransfer.files[0]); return; }
      /* a dragged LINK (from another tab's address bar) arrives as text */
      if (opts.onUrl && e.dataTransfer) {
        var u0 = '';
        try { u0 = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain') || ''; } catch (eU) {}
        u0 = String(u0).replace(/^\s+|\s+$/g, '').split(/[\r\n]/)[0];
        if (/^https?:\/\//i.test(u0)) opts.onUrl(u0);
      }
    });
    zone.addEventListener('paste', function(e) {
      var items = (e.clipboardData && e.clipboardData.items) || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          var pf = items[i].getAsFile();
          if (pf) { e.preventDefault(); e.stopPropagation(); offer(pf); return; }
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
    cancelBtn.addEventListener('click', function(e) { e.stopPropagation(); reset(); });
    titleInp.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.keyCode === 13) { e.preventDefault(); commit(); } });
    titleInp.addEventListener('click', function(e) { e.stopPropagation(); });

    return { reset: reset, host: zone };
  }

  window.SuperBucket = { mount: mount, version: '1.0' };
})();
