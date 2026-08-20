/* 4 LAWS ACADEMY — recognition.js v1 THE CEREMONY RIDES THE FLEET
 * (Bench 23, 8/20/26 — the founder's Points Decree, site-wide arm)
 *
 * The two companion pills wear the same ids on every page of the fleet
 * (#pwsTodoFab, #pwsTrustFab — the fleet pass made them uniform). So one
 * file can give EVERY page the ceremony of recognition: a tap on either
 * pill fires a fire-and-forget beacon to the Games Division's
 * EngagementLog, and the Trust Score's judgment (distinct active days,
 * capped — GamesCode v3.10) does the rest. Decree mapping:
 *   TODOS pill -> Law of Responsibility
 *   TRUST pill -> Law of Limits
 * (Doc B sends are wired inside each page's own block, where the send
 * roads live — /todos carries them as of v50.12.)
 *
 * Usage (one line per page, beside the winston/find-me/pulse footer):
 *   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/recognition.js"></script>
 *
 * Laws honored: self-contained, ES5, single IIFE, mounts once, touches
 * no logic — no preventDefault, no stopPropagation, navigation and every
 * existing handler run exactly as before. Listens in capture phase at
 * the document, so it survives the header-seats scripts moving the pills
 * around the DOM. Silent when signed out, silent on pages with no pills,
 * silent on any failure.
 */
(function() {
  if (window.__flRecognitionMounted) return;
  window.__flRecognitionMounted = true;

  var GAMES_URL = 'https://script.google.com/macros/s/AKfycbw1usnBC3UWpdkkBLMTPcuTWGKs3Ez_zLxSE-wZOu4WJ04UvpxKzuEPzbdPZ9WCLdX5sw/exec';

  function memberId() {
    try { return localStorage.getItem('4laws-member-id') || ''; } catch (e) { return ''; }
  }

  function beacon(kind) {
    try {
      var mid = memberId();
      if (!mid) return; // signed out: no ceremony, no error
      var payload = JSON.stringify({
        action: 'gamesLogEngagement', memberId: mid, kind: kind,
        surface: (window.location && window.location.pathname) || ''
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(GAMES_URL, new Blob([payload], { type: 'text/plain' }));
        return;
      }
      fetch(GAMES_URL, { method: 'POST', body: payload, keepalive: true })['catch'](function() {});
    } catch (e) {}
  }

  // Which pill, if any, does this tap belong to? Walk up a few hops —
  // the pills are anchors full of spans and svg, so the tap usually
  // lands on a child.
  function pillKind(node) {
    var hops = 0;
    while (node && node !== document && hops < 10) {
      if (node.id === 'pwsTodoFab') return 'pill_todos';
      if (node.id === 'pwsTrustFab') return 'pill_trust';
      node = node.parentNode;
      hops++;
    }
    return null;
  }

  document.addEventListener('click', function(e) {
    try {
      var kind = pillKind(e.target);
      if (kind) beacon(kind);
    } catch (err) {}
  }, true);
})();
