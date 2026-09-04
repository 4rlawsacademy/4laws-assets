/* ============================================================
   LIFE-ART.JS v1.0 — THE GALLERY (Bench 28, the Gaming Bench, 9/4/26)
   The ONE canonical art registry for the LIFE training game.
   Every game module (the Hall, the Challenge Engine, the Veil,
   the kill rites) reads its images from here — one mouth, so a
   repainted scene changes everywhere with one edit.
   All art founder-generated (Squarespace AI, "comic book" key) or
   founder-hunted; format params trued to display size.
   Usage:  LifeArt.get('defeat.pile')  ->  url string ('' if unknown)
   ============================================================ */
(function () {
  'use strict';
  if (window.LifeArt) { return; }

  var SQ = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/';
  var CDN = 'https://cdn.jsdelivr.net/gh/4rlawsacademy/4laws-assets@main/';

  var ART = {
    /* ---- the crest ---- */
    'crest.logo':          SQ + 'a2eea043-07f6-47c0-8b79-85b1f4b886da/4LAWS+logo+print.jpg?format=500w',

    /* ---- the storefront (title + window banners) ---- */
    'page.poster':         SQ + '7dd052ca-b43f-4158-83c8-6535cdda2a83/imgg-b67-m44d7v3b.png?format=1000w',
    'page.sunrise':        SQ + '1788356515956-77GMK36GG9JGJFI7F366/unsplash-image-sFEEy4_VOjU.jpg?format=1500w',
    'page.birth':          SQ + '1788356027745-7DA102G6PW931N2SUSMY/unsplash-image-8c6eS43iq1o.jpg?format=1500w',
    'page.hunt':           SQ + '1788356879580-6T7IYHQIL4UP34LNWFN3/unsplash-image-f1q4NlVRYSc.jpg?format=1000w',
    'page.wall':           SQ + '1788358241437-J8SX6YMSF8AMMWNTWD3X/unsplash-image-u715bKFZBvA.jpg?format=1000w',
    'page.saga':           SQ + '1788358660376-ZIO99QMD79GSZ3VOHQMC/unsplash-image-Oqklpz8_oks.jpg?format=750w',
    'page.armory':         SQ + '1788358082246-ROCIWHHFHQNZNVOWQLUV/unsplash-image-vrJeY7-8aIE.jpg?format=750w',

    /* ---- the brood (portraits) ---- */
    'monster.fog':         SQ + '66a178cc-1974-4d50-b084-10e1757f97c6/imgg-0v5-gv34m4gb.png?format=750w',
    'monster.cold':        SQ + '50a2ad79-d353-4647-b0ae-5701ac62dcc3/imgg-7t8-l4z0l80l.png?format=750w',
    'monster.pile':        SQ + '123c3bf9-a66c-4543-81db-d656f103336d/imgg-rhr-jwc1f5p9.png?format=750w',
    'monster.violator':    SQ + 'f3f84bc5-e044-44ec-8cad-c6a95f464f8c/imgg-k7w-88h3lvwm.png?format=750w',
    'monster.gris':        SQ + '3bbc49a1-f6f1-4c4c-a8f5-beeb54b32a96/imgg-h01-axcjf3xh.png?format=750w',

    /* ---- the heroes (portraits) ---- */
    'hero.talent':         SQ + 'e9978f1f-2704-4d19-863f-a3992fbbd3ac/imgg-n6s-i91rkzw9.png?format=750w',
    'hero.respect':        SQ + '75b6f36e-038a-4db3-8367-c7db239ced53/imgg-0pu-ch7jtvay.png?format=750w',
    'hero.resp':           SQ + '73787ef0-3e4c-4d86-86bd-4b0ee759740c/imgg-47u-5l2zw16s.png?format=750w',
    'hero.limits':         SQ + 'e0611c31-22db-42e0-a8fe-9688ccff299e/imgg-uai-gpldn0bg.png?format=750w',

    /* ---- the defeats (kill-rite scenes) ---- */
    'defeat.pile':         SQ + '72fc7e67-03c0-4e5f-ae87-eb4116b6a181/imgg-8n9-8lf3ltme.png?format=1000w',
    'defeat.fog':          SQ + '1169e996-adb2-4d3a-8b06-a73b912751ee/imgg-8co-n63rz81v.png?format=1000w',
    'defeat.cold':         SQ + '21ddcf7d-c6b7-4402-85a4-c3334adbe9cd/imgg-ih5-8xxr1rwj.png?format=1000w',
    'defeat.violator':     SQ + '09989420-042b-429f-b8fd-e6e0917d74b1/imgg-g7z-8bmm5k2j.png?format=1000w',

    /* ---- the triumphs (hero-bloom scenes) ---- */
    'triumph.talent':      SQ + '6e4e02d1-583f-4f49-8a53-afc0705106f8/imgg-m8d-ydqvsae5.png?format=1000w',
    'triumph.respect':     SQ + 'eb143799-b207-49ae-b5de-ee127ade8faf/imgg-68q-xqznq5jo.png?format=1000w',
    'triumph.resp':        SQ + '9079721d-8be2-4ec9-8432-0b581fbf29bb/imgg-835-twryag7n.png?format=1000w',
    'triumph.limits':      SQ + 'dc8e348b-df38-4f4e-9dba-067c361eeafb/imgg-jwu-tp8vjp7w.png?format=1000w',

    /* ---- the stage & the faces of the house ---- */
    'stage.shadowRange':   SQ + '8f5e450b-e9a3-4785-a955-d07bd7e976ae/imgg-cee-xnr2p3o5.png?format=1500w',
    'face.brunoSmith':     SQ + '5ed0cd6e-18fc-4c07-b4f5-d0bb463e0625/imgg-hdl-4sacrham.png?format=750w',
    'face.winston':        CDN + 'winston-medallion.png',

    /* ---- the pairings the rites walk (law -> monster -> hero) ---- */
    'pair.talent':   'monster.fog|defeat.fog|hero.talent|triumph.talent',
    'pair.respect':  'monster.cold|defeat.cold|hero.respect|triumph.respect',
    'pair.resp':     'monster.pile|defeat.pile|hero.resp|triumph.resp',
    'pair.limits':   'monster.violator|defeat.violator|hero.limits|triumph.limits'
  };

  window.LifeArt = {
    get: function (key) { return ART[key] || ''; },
    pair: function (law) {
      var p = (ART['pair.' + law] || '').split('|');
      return {
        monster: ART[p[0]] || '', defeat: ART[p[1]] || '',
        hero: ART[p[2]] || '', triumph: ART[p[3]] || ''
      };
    }
  };
})();
