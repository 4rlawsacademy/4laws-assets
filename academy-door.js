/* ✦ academy-door.js v1.1 (Bench 48, Sun 9/27/26 night; gated: no reload loop on the store page, popup fallback) — THE DOOR ON THE PAGE SIDE.
   One line in every page's code block:
   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/academy-door.js"></script>
   It watches every answer the backends give (fetch and XMLHttpRequest). When an answer says
   code:'ACADEMY_DOOR' (the clock is out) it sends the person to the store page the backend
   names. When an answer says code:'NO_SEATS' (family seats full) it asks one question and opens
   the $3 seat. No design lives here; the store page is the beautiful part. Nothing else moves. ✦ */
(function () {
  'use strict';
  if (window.__academyDoorInstalled) return; window.__academyDoorInstalled = true;
  var HOSTS = /script\.google\.com|script\.googleusercontent\.com/;
  var fired = false;
  function handle(text) {
    if (fired || !text || text.length > 200000) return;
    if (text.indexOf('ACADEMY_DOOR') === -1 && text.indexOf('NO_SEATS') === -1) return;
    var d = null; try { d = JSON.parse(text); } catch (e) { return; }
    if (!d || d.status !== 'error') return;
    if (d.code === 'ACADEMY_DOOR' && d.storeUrl) {
      /* v1.1 (gate): never reload the store page onto itself */
      var here = window.location.pathname.replace(/\/+$/, ''), there = '';
      try { there = new URL(d.storeUrl, window.location.href).pathname.replace(/\/+$/, ''); } catch (e) {}
      if (there && here === there) return;
      fired = true;
      try { sessionStorage.setItem('4laws-door-message', d.message || ''); } catch (e) {}
      window.location.href = d.storeUrl;
      return;
    }
    if (d.code === 'NO_SEATS' && d.seatUrl) {
      var ok = window.confirm((d.error || 'Your family seats are full.') + '\n\nAdd a seat for $3 a month?');
      if (ok) { var w = window.open(d.seatUrl, '_blank'); if (!w) { window.location.href = d.seatUrl; } }
    }
  }
  /* fetch */
  if (window.fetch) {
    var origFetch = window.fetch;
    window.fetch = function (input, init) {
      var url = (typeof input === 'string') ? input : (input && input.url) || '';
      var p = origFetch.apply(this, arguments);
      if (!HOSTS.test(url)) return p;
      return p.then(function (res) {
        try { res.clone().text().then(handle).catch(function(){}); } catch (e) {}
        return res;
      });
    };
  }
  /* XMLHttpRequest */
  if (window.XMLHttpRequest) {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      try {
        if (HOSTS.test(String(url || ''))) {
          this.addEventListener('load', function () { try { if (this.responseType === '' || this.responseType === 'text') handle(this.responseText); } catch (e) {} });
        }
      } catch (e) {}
      return origOpen.apply(this, arguments);
    };
  }
})();
