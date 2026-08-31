/* ═══════════════════════════════════════════════════════════════════════
   BENCH 31 — tuxedo.js v1.0 THE TUXEDO (8/30/26)
   The fleet's discovery organ, from the founder's design: "a white chat
   bubble with a black rim around the edges, tuxedo look... comes up bold,
   very slightly off white, large text, occupies real estate on what it
   does. Goes away when you scroll away. Gotta wanna read it."

   WHAT IT IS: hover (desktop) or tap-and-hold (touch) any TAUGHT element
   and a bold off-white bubble with a black tuxedo rim rises above it,
   saying in one sentence what that button does — in the room's language.
   Move away / lift / scroll, and it's gone. It contrasts the serene gold
   rooms on purpose: when it speaks, it is the loudest thing on screen,
   and it says one useful thing.

   MOUNT CONTRACT (ES5, no dependencies):
     Tuxedo.lang(fn)                    — fn() -> 'en' | 'es' (default 'en')
     Tuxedo.teach(target, {en, es})     — target: selector string or element.
                                          Selector pupils are LIVE: taught
                                          now or whenever they later exist
                                          (delegated lookup at show time).
     Tuxedo.discover(on)                — the game's "change views": every
                                          taught, visible element glows with
                                          a tuxedo outline; tap/hover any to
                                          read it. Tuxedo.discover(false)
                                          ends the tour.
     Auto-teach: any element carrying data-tux-en / data-tux-es attributes
     is a pupil with no registration call at all.

   HOUSE LAWS: ES5 throughout; one bubble element reused; nothing invented
   (no bubble without words); never blocks a tap (the bubble itself is
   pointer-transparent); z-index high enough to clear overlays. The game
   bench (THE LIFE game) is this organ's intended best customer: it will
   feed lessons through the same teach road and run tours via discover().
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.Tuxedo) return;   /* one tuxedo per page */

  var _lang = function () { return 'en'; };
  var _pupils = [];            /* { sel: string|null, el: element|null, words: {en, es} } */
  var _bubble = null, _hideT = null, _holdT = null, _shownFor = null, _discover = false;

  function txWords_(p) {
    var l = 'en';
    try { l = _lang() === 'es' ? 'es' : 'en'; } catch (e) { l = 'en'; }
    return (p.words && (p.words[l] || p.words.en || p.words.es)) || '';
  }

  function txBubble_() {
    if (_bubble) return _bubble;
    _bubble = document.createElement('div');
    _bubble.id = 'tuxedoBubble';
    _bubble.setAttribute('role', 'tooltip');
    _bubble.style.cssText = [
      'position:fixed', 'z-index:2147483000', 'display:none',
      'max-width:340px', 'padding:16px 20px',
      'background:#faf7f0',                       /* very slightly off white */
      'color:#141210',                            /* near-black, bold, big   */
      'border:2px solid #0a0a0a',                 /* the tuxedo rim          */
      'border-radius:12px',
      'box-shadow:0 10px 32px rgba(0,0,0,0.5), 0 2px 0 #0a0a0a',
      'font-family:Georgia,\'Times New Roman\',serif',
      'font-size:17px', 'font-weight:700', 'line-height:1.45',
      'letter-spacing:0.01em', 'text-align:left',
      'pointer-events:none',                      /* never blocks the tap    */
      'opacity:0', 'transition:opacity 140ms ease'
    ].join(';');
    document.body.appendChild(_bubble);
    return _bubble;
  }

  function txPlace_(el) {
    var b = txBubble_(), r;
    try { r = el.getBoundingClientRect(); } catch (e) { return; }
    b.style.left = '0px'; b.style.top = '-9999px'; b.style.display = 'block';
    var bw = b.offsetWidth, bh = b.offsetHeight;
    var vw = window.innerWidth || document.documentElement.clientWidth;
    var x = r.left + (r.width / 2) - (bw / 2);
    if (x < 8) x = 8;
    if (x + bw > vw - 8) x = vw - 8 - bw;
    var y = r.top - bh - 12;                     /* above the button…       */
    if (y < 8) y = r.bottom + 12;                /* …or below if no room    */
    b.style.left = Math.round(x) + 'px';
    b.style.top = Math.round(y) + 'px';
  }

  function txShow_(el, p) {
    var words = txWords_(p);
    if (!words) return;                          /* nothing invented        */
    if (_hideT) { clearTimeout(_hideT); _hideT = null; }
    var b = txBubble_();
    b.textContent = words;
    _shownFor = el;
    txPlace_(el);
    b.style.opacity = '1';
  }

  function txHide_() {
    if (_holdT) { clearTimeout(_holdT); _holdT = null; }
    if (!_bubble || !_shownFor) return;
    _shownFor = null;
    _bubble.style.opacity = '0';
    if (_hideT) clearTimeout(_hideT);
    _hideT = setTimeout(function () { if (_bubble && !_shownFor) _bubble.style.display = 'none'; }, 160);
  }

  /* find the pupil for an event target: registered pupils first, then
     the data-tux auto-teach road; walks up so a tap on a button's icon
     still finds the button */
  function txFind_(start) {
    var el = start, hops = 0, i;
    while (el && el.nodeType === 1 && hops < 6) {
      for (i = 0; i < _pupils.length; i++) {
        var p = _pupils[i];
        if (p.el && p.el === el) return { el: el, p: p };
        if (p.sel) {
          try { if (el.matches && el.matches(p.sel)) return { el: el, p: p }; } catch (eM) {}
        }
      }
      if (el.getAttribute && (el.getAttribute('data-tux-en') || el.getAttribute('data-tux-es'))) {
        return { el: el, p: { words: { en: el.getAttribute('data-tux-en') || '', es: el.getAttribute('data-tux-es') || '' } } };
      }
      el = el.parentNode; hops++;
    }
    return null;
  }

  /* ── desktop: hover ── */
  document.addEventListener('mouseover', function (ev) {
    var hit = txFind_(ev.target);
    if (hit) txShow_(hit.el, hit.p);
  }, true);
  document.addEventListener('mouseout', function (ev) {
    if (!_shownFor) return;
    var hit = txFind_(ev.target);
    if (hit && hit.el === _shownFor) txHide_();
  }, true);

  /* ── touch: tap-and-hold (450ms), lift to dismiss ── */
  document.addEventListener('touchstart', function (ev) {
    var hit = txFind_(ev.target);
    if (!hit) return;
    if (_holdT) clearTimeout(_holdT);
    _holdT = setTimeout(function () { txShow_(hit.el, hit.p); }, 450);
  }, true);
  document.addEventListener('touchend', txHide_, true);
  document.addEventListener('touchcancel', txHide_, true);

  /* goes away when you scroll away */
  window.addEventListener('scroll', txHide_, true);

  /* ── discovery view: every taught element wears the rim ── */
  function txMarkAll_(on) {
    var i, el, list = [];
    for (i = 0; i < _pupils.length; i++) {
      var p = _pupils[i];
      if (p.el) { list.push(p.el); }
      else if (p.sel) {
        try {
          var found = document.querySelectorAll(p.sel), j;
          for (j = 0; j < found.length; j++) list.push(found[j]);
        } catch (eQ) {}
      }
    }
    try {
      var autos = document.querySelectorAll('[data-tux-en],[data-tux-es]'), k;
      for (k = 0; k < autos.length; k++) list.push(autos[k]);
    } catch (eA) {}
    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (on) {
        if (!el.getAttribute('data-tux-prev-outline')) el.setAttribute('data-tux-prev-outline', el.style.outline || 'none');
        el.style.outline = '2px solid #0a0a0a';
        el.style.outlineOffset = '2px';
        el.style.boxShadow = '0 0 0 4px #faf7f0, 0 0 14px rgba(0,0,0,0.45)';
      } else {
        var prev = el.getAttribute('data-tux-prev-outline');
        el.style.outline = (prev && prev !== 'none') ? prev : '';
        el.style.outlineOffset = '';
        el.style.boxShadow = '';
        el.removeAttribute('data-tux-prev-outline');
      }
    }
  }

  window.Tuxedo = {
    version: '1.0',
    lang: function (fn) { if (typeof fn === 'function') _lang = fn; },
    teach: function (target, words) {
      if (!target || !words || (!words.en && !words.es)) return;
      if (typeof target === 'string') _pupils.push({ sel: target, el: null, words: words });
      else if (target.nodeType === 1) _pupils.push({ sel: null, el: target, words: words });
    },
    discover: function (on) {
      _discover = (on !== false);
      txMarkAll_(_discover);
      if (!_discover) txHide_();
      return _discover;
    },
    hide: txHide_,
    _pupilCount: function () { return _pupils.length; }
  };
})();
