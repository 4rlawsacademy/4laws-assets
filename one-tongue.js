/* one-tongue.js v1.0 — ONE TONGUE, ONE HOUSE (Bench 49, Sun 10/4/26, founder's ruling)
 * The site's language switch (Weglot) decides the member's tongue; every app page follows it
 * with its own hand-written Spanish, never a translation. Loaded by ONE LINE in each app page's
 * Page Header Code Injection, so it runs before every code block on the page:
 *   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/one-tongue.js"></script>
 * What it does: (1) at page start, reads Weglot's choice (Weglot.getCurrentLang(), else the wglang
 * cookie, else an /es/ path, else <html lang>) and, only when that choice has CHANGED since the last
 * visit, writes the fleet note 4laws-lang ('es' or 'en') so a page's own ES button still holds within
 * a session; (2) keeps listening for the switch (Weglot's languageChanged) and, when it moves,
 * writes the note and tells the page with a window event 'onetongue' {lang}; (3) exposes
 * window.OneTongue = { lang(), site(), on(fn) }. Nothing else. ES5 only. */
(function () {
  var KEY = '4laws-lang', LAST = '4laws-lang-site';
  function norm(v) { v = String(v || '').toLowerCase(); return v.indexOf('es') === 0 ? 'es' : (v ? 'en' : ''); }
  function cookie(name) { try { var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : ''; } catch (e) { return ''; } }
  function site() {
    try { if (window.Weglot && typeof Weglot.getCurrentLang === 'function') { var w = norm(Weglot.getCurrentLang()); if (w) return w; } } catch (e0) {}
    var c = norm(cookie('wglang')); if (c) return c;
    try { if (/^\/es(\/|$)/.test(location.pathname)) return 'es'; } catch (e1) {}
    try { var h = norm(document.documentElement.getAttribute('lang')); if (h) return h; } catch (e2) {}
    return '';
  }
  function get() { try { return norm(localStorage.getItem(KEY)) || 'en'; } catch (e) { return 'en'; } }
  function set(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }
  var subs = [];
  function tell(l) {
    for (var i = 0; i < subs.length; i++) { try { subs[i](l); } catch (e) {} }
    try { window.dispatchEvent(new CustomEvent('onetongue', { detail: { lang: l } })); } catch (e2) {
      try { var ev = document.createEvent('CustomEvent'); ev.initCustomEvent('onetongue', true, true, { lang: l }); window.dispatchEvent(ev); } catch (e3) {}
    }
  }
  /* (1) at page start: follow the site's switch when it has moved since last time */
  var s = site(), last = '';
  try { last = localStorage.getItem(LAST) || ''; } catch (e4) {}
  if (s && s !== last) { set(s); try { localStorage.setItem(LAST, s); } catch (e5) {} }
  /* (2) keep listening: Weglot may load after this line, so look for it for a little while */
  var tries = 0, hooked = false;
  function hook() {
    tries++;
    try {
      if (window.Weglot && typeof Weglot.on === 'function' && !hooked) {
        hooked = true;
        Weglot.on('languageChanged', function (newLang) {
          var l = norm(newLang); if (!l) return;
          set(l); try { localStorage.setItem(LAST, l); } catch (e6) {}
          tell(l);
        });
        var now = site(); if (now && now !== get()) { set(now); try { localStorage.setItem(LAST, now); } catch (e7) {} tell(now); }
      }
    } catch (e8) {}
    if (!hooked && tries < 40) setTimeout(hook, 250);
  }
  hook();
  window.OneTongue = { lang: get, site: site, on: function (fn) { if (typeof fn === 'function') subs.push(fn); }, version: '1.0' };
})();