/* 4 LAWS ACADEMY — winston-badge.js v1 (Bench 15/16, 8/1/26)
 * THE WINSTON BADGE — the IT guy, everywhere.
 * Director's ruling: "a small avatar button somewhere obvious...
 * Winston's face shows up... you click, and you get a chat."
 *
 * Usage (one line per page, end of any code block):
 *   <script src="https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/winston-badge.js"></script>
 *
 * Self-contained, ES5, single IIFE, injects its own CSS, mounts once.
 * Quiet gold-ringed avatar, fixed bottom-right; hover/focus grows it and
 * whispers "Puzzled? — Winston" (ES: "¿Intrigado? — Winston");
 * click walks to /winston. Skips mounting on /winston itself.
 */
(function() {
  if (window.__wnBadgeMounted) return;
  window.__wnBadgeMounted = true;
  try {
    if (window.location && /\/winston(\/|$|\?)/.test(window.location.pathname)) return;
  } catch (e) {}

  var AVATAR = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1785616009652-AH977B31BILM7Y2XYFHR/unsplash-image-x2swFGcFoN0.jpg?format=300w';

  function lang() {
    var l = 'en';
    try { l = localStorage.getItem('4laws-lang') || 'en'; } catch (e) {}
    return (l === 'es') ? 'es' : 'en';
  }

  var css = '' +
    '#wnBadge{position:fixed;right:18px;bottom:18px;z-index:9400;' +
    'display:flex;align-items:center;gap:10px;cursor:pointer;' +
    'text-decoration:none;border:none;background:transparent;padding:0;}' +
    '#wnBadge .wnb-face{width:52px;height:52px;border-radius:50%;' +
    'border:2px solid #c8a84b;object-fit:cover;display:block;' +
    'box-shadow:0 2px 14px rgba(0,0,0,.55);opacity:.85;' +
    'transition:transform .25s ease,opacity .25s ease,box-shadow .25s ease;}' +
    '#wnBadge:hover .wnb-face,#wnBadge:focus .wnb-face{transform:scale(1.18);' +
    'opacity:1;box-shadow:0 0 20px rgba(200,168,75,.45);}' +
    '#wnBadge .wnb-whisper{font-family:"Cormorant Garamond",Georgia,serif;' +
    'font-style:italic;font-size:19px;color:#f0e6cc;' +
    'background:rgba(4,6,8,.92);border:1px solid rgba(200,168,75,.5);' +
    'padding:8px 14px;white-space:nowrap;opacity:0;' +
    'transform:translateX(8px);pointer-events:none;' +
    'transition:opacity .25s ease,transform .25s ease;}' +
    '#wnBadge:hover .wnb-whisper,#wnBadge:focus .wnb-whisper{opacity:1;' +
    'transform:translateX(0);}' +
    '@media (max-width:640px){#wnBadge{right:12px;bottom:12px;}' +
    '#wnBadge .wnb-face{width:46px;height:46px;}' +
    '#wnBadge .wnb-whisper{display:none;}}';

  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  var whisper = (lang() === 'es') ? '\u00bfIntrigado? \u2014 Winston'
                                  : 'Puzzled? \u2014 Winston';

  var a = document.createElement('a');
  a.id = 'wnBadge';
  a.href = '/winston';
  a.setAttribute('aria-label', 'Ask Winston, the IT Guide');
  a.innerHTML = '<span class="wnb-whisper">' + whisper + '</span>' +
    '<img class="wnb-face" src="' + AVATAR + '" alt="Winston" />';

  if (document.body) {
    document.body.appendChild(a);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(a);
    });
  }
})();
