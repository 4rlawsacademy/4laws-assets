/* ═══ house-arrows-loader.js (Bench 57, Fri 10/23/26). The one line every work page carries for the arrows. It never changes.
 * It reads house-arrows.txt from GitHub (raw, never cached more than five minutes, fetched fresh here) to learn the name of
 * the current lessons file, then loads that file from the delivery network. A new cut of the lessons = upload the new file
 * under a new name + change the one line in house-arrows.txt. No purge, no hard reload, no page pastes.
 * If the pointer cannot be read, it falls back to house-arrows-v1_2.js. ═══ */
(function () {
  'use strict';
  if (window.__houseArrowsLoader) return; window.__houseArrowsLoader = 1;
  var CDN = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/';
  var POINTER = 'https://raw.githubusercontent.com/4rlawsacademy/4laws-assets/main/house-arrows.txt';
  var FALLBACK = 'house-arrows-v1_2.js';
  function load(name) {
    name = String(name || '').trim().split(/\s+/)[0];
    if (!/^house-arrows-[A-Za-z0-9_.-]+\.js$/.test(name)) name = FALLBACK;
    var s = document.createElement('script'); s.src = CDN + name; s.async = true; document.head.appendChild(s);
  }
  try {
    var ctl = ('AbortController' in window) ? new AbortController() : null; if (ctl) setTimeout(function () { try { ctl.abort(); } catch (e) {} }, 4000);
    fetch(POINTER + '?t=' + Math.floor(Date.now() / 60000), { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (txt) { load(txt || FALLBACK); })
      .catch(function () { load(FALLBACK); });
  } catch (e) { load(FALLBACK); }
})();
