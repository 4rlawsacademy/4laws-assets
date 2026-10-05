/* 4 LAWS ACADEMY — pulse.js v2 THE ONE TONGUE (Bench 50, 10/4/26)
 * v2 adds a second small organ under the pulse (see the bottom of this
 * file): ONE language memory for the whole site. Founder's ruling 10/4:
 * one tap on EN or ES on any page changes every page, for members too.
 * The pulse itself is unchanged, save one line: it stays silent when the
 * tap is the organ's own hand and not the member's finger.
 * Way back: pulse.js v1 THE PULSE (the file as it stood before this one).
 *
 * 4 LAWS ACADEMY — pulse.js v1 THE PULSE (Bench 23, 8/20/26)
 * THE FEEDBACK LAW, LAYER ONE — the Constitutional Amendment, founder's
 * decree 8/19: "no more buttons or functions that do not provide feedback
 * that the website is actually working." Many members distrust technology;
 * a silent button teaches them the site is broken, and a slow-internet
 * moment turns fifteen desperate taps into fifteen duplicate submissions.
 *
 * This file is the meta layer: the instant "I heard you." Every tap on any
 * button or door, on every page that carries this script, answers with a
 * brief gold pulse the moment the finger lands — before any network road
 * even starts. It promises nothing about success (only each button's own
 * code can honestly say "it worked" — that is layer two, cut per page);
 * it promises only that the tap was heard.
 *
 * Usage (one line per page, beside the winston/find-me footer pair):
 *   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/pulse.js"></script>
 *
 * Laws honored:
 *  - Self-contained, ES5, single IIFE, injects its own CSS, mounts once.
 *  - PURE ACKNOWLEDGMENT: no preventDefault, no stopPropagation, no logic
 *    touched — the page behaves exactly as before, plus a glow.
 *  - NO transform and NO filter in the pulse (either would break elements
 *    positioned by inline transform — the companions' translateX — or
 *    create surprise containing blocks). Box-shadow only: layout-inert.
 *  - Opt-out: any element carrying data-no-pulse is left silent.
 */
(function() {
  if (window.__flPulseMounted) return;
  window.__flPulseMounted = true;

  var css = '' +
    '@keyframes flPulseGlow{' +
    '0%{box-shadow:0 0 0 0 rgba(200,168,75,0.75),0 0 14px 2px rgba(200,168,75,0.45);}' +
    '100%{box-shadow:0 0 0 9px rgba(200,168,75,0),0 0 20px 6px rgba(200,168,75,0);}}' +
    '.fl-pulse{animation:flPulseGlow 0.45s ease-out;}';

  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  if (document.head) document.head.appendChild(style);

  // Walk up from the tapped node to the nearest thing that acts like a
  // button or a door. Conservative on purpose: real controls only, so the
  // pulse never lands on plain text or a background.
  function findControl(node) {
    var hops = 0;
    while (node && node !== document && hops < 8) {
      if (node.nodeType === 1) {
        var tag = node.tagName ? node.tagName.toUpperCase() : '';
        if (node.getAttribute && node.getAttribute('data-no-pulse') !== null) return null;
        if (tag === 'BUTTON') return node;
        if (tag === 'A' && node.getAttribute && node.getAttribute('href')) return node;
        if (tag === 'INPUT') {
          var t = (node.getAttribute('type') || '').toLowerCase();
          if (t === 'button' || t === 'submit') return node;
        }
        if (node.getAttribute && node.getAttribute('role') === 'button') return node;
      }
      node = node.parentNode;
      hops++;
    }
    return null;
  }

  function pulse(el) {
    // restart cleanly if the member taps twice fast: drop the class, force
    // a reflow so the animation re-arms, then wear it again.
    el.className = el.className.replace(/\s*fl-pulse/g, '');
    void el.offsetWidth;
    el.className += ' fl-pulse';
    window.setTimeout(function() {
      el.className = el.className.replace(/\s*fl-pulse/g, '');
    }, 500);
  }

  // Capture phase: the pulse fires even if the page's own handler stops
  // propagation later. Cosmetic only — the event continues untouched.
  document.addEventListener('click', function(e) {
    try {
      if (window.__flTongueSelf) return;   /* v2: the organ's own tap wears no glow */
      var el = findControl(e.target);
      if (el) pulse(el);
    } catch (err) {}
  }, true);
})();

/* ---------------------------------------------------------------------------
 * THE ONE TONGUE (v2, Bench 50, 10/4/26)
 *
 * The wound: every page kept the language its own way. Trust and Studio wrote
 * the shared note ('4laws-lang'); /todos kept a private note ('td_lang');
 * Studio Create kept another ('sc_lang'); PWS Talent kept none and always
 * woke in English. The shared pieces (the Reminders tab, the level badge)
 * read only the shared note. So a tap on one page never reached the others.
 *
 * The cure, laid over the pages without touching them:
 *  1. A tap on any page's EN / ES button writes the shared note, and the two
 *     private notes with it, so every page wakes in the same language.
 *  2. When a page opens, if its language differs from the shared note, the
 *     organ taps that page's own EN / ES button -- the page's own code does
 *     the changing, exactly as if the member had tapped it.
 *  3. If there is no shared note yet, the site is ENGLISH (founder's ruling
 *     10/4/26). The browser's language is never consulted. Spanish is a tap.
 *  4. A change made in another open tab is followed here.
 *
 * A language button is recognized by its marks, not by a list of pages:
 * an id ending in LangEn / LangEs (tdLangEn, pwsLangEn, scLangEn, ptLangEn),
 * or data-lang="en|es" on an element whose class carries "lang-btn" (Studio).
 * A new page that follows either custom is covered without a new cut.
 *
 * Laws honored: self-contained, ES5, single IIFE, mounts once; no
 * preventDefault, no stopPropagation; at most six taps of its own per page
 * load; it stops for good the moment the member taps a language button.
 * ------------------------------------------------------------------------- */
(function() {
  if (window.__flTongueMounted) return;
  window.__flTongueMounted = true;

  var KEY = '4laws-lang';
  var PRIVATE = ['td_lang', 'sc_lang'];
  var MAX_OWN_TAPS = 6;
  var _ownTaps = 0, _memberTapped = false, _timer = null, _tries = 0;

  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function ok(l) { return l === 'en' || l === 'es'; }

  /* which language does this one element stand for? '' if it is no language button */
  function langOf(el) {
    if (!el || el.nodeType !== 1 || !el.getAttribute) return '';
    var id = el.id || '';
    if (/LangEn$/.test(id)) return 'en';
    if (/LangEs$/.test(id)) return 'es';
    var dl = el.getAttribute('data-lang');
    var cls = (typeof el.className === 'string') ? el.className : '';
    if (ok(dl) && cls.indexOf('lang-btn') !== -1) return dl;
    return '';
  }
  /* walk up from a tapped node to the language button it sits in, if any */
  function langFromTap(node) {
    var hops = 0, l;
    while (node && node !== document && hops < 4) {
      l = langOf(node); if (l) return l;
      node = node.parentNode; hops++;
    }
    return '';
  }
  function buttons() {
    var out = [], list, i;
    try { list = document.querySelectorAll('[id$="LangEn"],[id$="LangEs"],[data-lang][class*="lang-btn"]'); } catch (e) { list = []; }
    for (i = 0; i < list.length; i++) { if (langOf(list[i])) out.push(list[i]); }
    return out;
  }
  /* the language the page is showing now: its lit button. '' if unknown. */
  function pageLang() {
    var b = buttons(), i, cls;
    for (i = 0; i < b.length; i++) {
      cls = (typeof b[i].className === 'string') ? b[i].className : '';
      if ((' ' + cls + ' ').indexOf(' active ') !== -1) return langOf(b[i]);
    }
    return '';
  }
  function remember(lang) {
    if (!ok(lang)) return;
    lsSet(KEY, lang);
    for (var i = 0; i < PRIVATE.length; i++) lsSet(PRIVATE[i], lang);
  }

  /* bring this page to the shared note by tapping its own button */
  function follow(force) {
    var want = lsGet(KEY);
    if (!ok(want)) return;
    if (_memberTapped && !force) return;
    var cur = pageLang();
    if (!cur || cur === want) return;
    if (_ownTaps >= MAX_OWN_TAPS) return;
    var b = buttons(), i;
    for (i = 0; i < b.length; i++) {
      if (langOf(b[i]) === want) {
        _ownTaps++;
        window.__flTongueSelf = true;
        try { b[i].click(); } catch (e) {}
        window.__flTongueSelf = false;
        return;
      }
    }
  }

  /* 1. the member's tap is the law: write it where every page will read it */
  document.addEventListener('click', function(e) {
    try {
      var l = langFromTap(e.target);
      if (!l) return;
      remember(l);
      if (!window.__flTongueSelf) _memberTapped = true;
    } catch (err) {}
  }, true);

  /* 3. no shared note yet: the site is English. Founder's ruling 10/4/26:
        "The default has to be in English." Never the browser's language,
        never an old private note -- Spanish is one tap away, and that tap
        is then remembered everywhere. */
  (function seed() {
    var shared = lsGet(KEY);
    remember(ok(shared) ? shared : 'en');   /* also keeps the private notes in step */
  })();

  /* 2. follow the shared note as the page wakes; pages wake at different speeds */
  function tick() {
    _tries++;
    try { follow(false); } catch (e) {}
    if (_memberTapped || _tries >= 18) { if (_timer) { window.clearInterval(_timer); _timer = null; } }
  }
  function start() {
    tick();
    if (!_timer) _timer = window.setInterval(tick, 700);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  window.addEventListener('load', function() { try { follow(false); } catch (e) {} });

  /* 4. another tab changed the language: follow it here too */
  window.addEventListener('storage', function(e) {
    try {
      if (!e || e.key !== KEY || !ok(e.newValue)) return;
      for (var i = 0; i < PRIVATE.length; i++) lsSet(PRIVATE[i], e.newValue);
      _ownTaps = 0;
      follow(true);
    } catch (err) {}
  });
})();
