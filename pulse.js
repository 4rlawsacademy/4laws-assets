/* 4 LAWS ACADEMY — pulse.js v1 THE PULSE (Bench 23, 8/20/26)
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
      var el = findControl(e.target);
      if (el) pulse(el);
    } catch (err) {}
  }, true);
})();
