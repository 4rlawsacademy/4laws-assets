/* ============================================================
   LIFE-LIVING.JS v1.0 — THE WALL (Bench 35, Sun 9/6/26)
   LIVE THE GAME — the Living Game's rooms as one CDN organ, seated in
   the Hall by a single script line. Bench 36 keeps the Hall; this file
   never touches it. It decorates.
   v1.0 THE WALL: the Hunter's Wall reads THE RECKONING (GamesCode
   v3.21+, door lifeHonors). On the Hall's own render it appends, above
   the tutorial's trophies: the Hunter's Card (real heads per monster,
   LifeArt faces), the running streaks, today's kills, and every mounted
   honor — trophies (the law's defeat painting as the head), medals,
   ribbons, streaks — as plates. New honors since this device last
   looked become one message-scroll line each (key 4laws-honors-seen,
   createdAt compare; same rule as the Saga's unread).
   THE HOOK CONTRACT (what this file needs the Hall to keep stable):
     globals  lifePost(body)  lifeCreds()  txt(en,es)  lifeSaga(line)
              lifeRenderTrophies()   S (the Hall's state; S.trophies)
              LifeArt (optional; life-art.js)
     ids      #trophyWall   #hall (class 'on' when entered)
   Fire-and-forget: on an older backend or any failure the wall renders
   exactly as the Hall renders it alone.
   ES5 only. CDN: 4rlawsacademy/4laws-assets@main/life-living.js
   ============================================================ */
(function () {
  if (window.LifeLiving) { return; }
  var LL = { v: '1.0', honors: null, booted: false };
  window.LifeLiving = LL;

  var MON = {
    pile: { law: 'responsibility', en: 'THE PILE', es: 'LA PILA' },
    cold: { law: 'respect', en: 'THE COLD SHOULDER', es: 'EL DESAIRE' },
    fog:  { law: 'talent', en: 'THE FOG', es: 'LA NIEBLA' },
    conq: { law: 'limits', en: 'THE VIOLATOR', es: 'EL TRANSGRESOR' }
  };

  function T(en, es) { try { if (typeof window.txt === 'function') { return window.txt(en, es); } } catch (e) {} return en; }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function art() { return window.LifeArt || { get: function () { return ''; }, pair: function () { return { monster: '', defeat: '', hero: '', triumph: '' }; } }; }
  function todayIso() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }

  /* ---------- CSS, injected once ---------- */
  function css() {
    if ($('lifeLivingCss')) { return; }
    var st = document.createElement('style'); st.id = 'lifeLivingCss';
    st.textContent =
      '.llCard{width:100%;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:10px;margin-bottom:6px;}' +
      '.llKill{-webkit-flex:1 1 120px;flex:1 1 120px;background:#10141b;border:1.5px solid #2a2416;border-radius:12px;padding:10px 12px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:10px;}' +
      '.llKill img{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid #c8a84b;}' +
      '.llKill .llName{font-family:"Cinzel",serif;font-size:11px;color:#a89968;letter-spacing:.06em;}' +
      '.llKill .llCount{font-family:"Cinzel",serif;font-size:22px;color:#ffd75e;line-height:1;}' +
      '.llKill .llCount small{font-size:11px;color:#a89968;margin-left:4px;}' +
      '.llToday{width:100%;font-style:italic;color:#c8a84b;font-size:16px;margin:2px 0 4px;}' +
      '.llPlates{width:100%;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;gap:12px;-webkit-justify-content:center;justify-content:center;}' +
      '.llPlate{width:120px;text-align:center;}' +
      '.llHead{width:84px;height:84px;border-radius:50%;border:3px solid #ffd75e;background:#10141b;margin:0 auto 6px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;font-size:36px;overflow:hidden;box-shadow:0 0 14px rgba(255,215,94,.35);}' +
      '.llHead img{width:100%;height:100%;object-fit:cover;}' +
      '.llKind{font-size:11px;color:#a89968;letter-spacing:.08em;font-family:"Cinzel",serif;}' +
      '.llName2{font-family:"Cinzel",serif;font-size:13px;color:#ffd75e;letter-spacing:.05em;}' +
      '.llDetail{font-size:13px;color:#d8ccaa;font-style:italic;}' +
      '.llDate{font-size:13px;color:#a89968;}' +
      '.llRule{width:100%;height:1px;background:#2a2416;margin:8px 0;}';
    document.head.appendChild(st);
  }

  /* ---------- the feed ---------- */
  function sym(kind) { return { trophy: '\uD83C\uDFC6', medal: '\uD83C\uDF96\uFE0F', ribbon: '\uD83C\uDF97\uFE0F', streak: '\uD83D\uDD25', kill: '\u2694\uFE0F' }[kind] || '\u2605'; }
  function kindWord(kind) {
    var en = { trophy: 'TROPHY', medal: 'MEDAL', ribbon: 'RIBBON', streak: 'STREAK', kill: 'KILL' }[kind] || 'HONOR';
    var es = { trophy: 'TROFEO', medal: 'MEDALLA', ribbon: 'LIST\u00d3N', streak: 'RACHA', kill: 'CAZA' }[kind] || 'HONOR';
    return T(en, es);
  }
  function line(h) { return sym(h.kind) + ' ' + (h.kind === 'kill' ? '' : (kindWord(h.kind) + ' \u00b7 ')) + h.name + (h.detail ? (' \u2014 ' + h.detail) : ''); }

  function herald(list) {
    try {
      var seen = localStorage.getItem('4laws-honors-seen') || '', newest = seen, i, fresh = [];
      for (i = 0; i < list.length; i++) {
        if (list[i].createdAt && list[i].createdAt > seen) { fresh.push(list[i]); if (list[i].createdAt > newest) { newest = list[i].createdAt; } }
      }
      if (typeof window.lifeSaga === 'function') { for (i = fresh.length - 1; i >= 0; i--) { window.lifeSaga(line(fresh[i])); } }
      if (newest !== seen) { localStorage.setItem('4laws-honors-seen', newest); }
    } catch (e) {}
  }

  LL.fetch = function () {
    try {
      if (typeof window.lifePost !== 'function' || typeof window.lifeCreds !== 'function' || !window.lifeCreds()) { return; }
      window.lifePost({ action: 'lifeHonors', limit: 40 }).then(function (d) {
        if (d && d.success) { LL.honors = d; LL.render(); herald(d.honors || []); }
      })['catch'](function () {});
    } catch (e) {}
  };

  /* ---------- the wall ---------- */
  LL.render = function () {
    var w = $('trophyWall'); if (!w) { return; }
    var old = $('llWall'); if (old) { old.parentNode.removeChild(old); }
    var oldRule = $('llRule'); if (oldRule) { oldRule.parentNode.removeChild(oldRule); }
    var D = LL.honors; if (!D) { return; }
    css();
    var A = art(), h = '', i, k, mounted = [], today = [], tIso = todayIso(), real = D.honors || [];
    for (i = 0; i < real.length; i++) { if (real[i].kind === 'kill') { if (real[i].date === tIso) { today.push(real[i]); } } else { mounted.push(real[i]); } }
    if (D.kills) {
      h += '<div class="llCard">';
      for (k in MON) {
        if (!MON.hasOwnProperty(k)) { continue; }
        var m = MON[k], img = '';
        try { img = A.pair(m.law).monster || A.get(k) || ''; } catch (e1) { img = ''; }
        h += '<div class="llKill">' + (img ? '<img src="' + esc(img) + '" alt="">' : '') + '<div><div class="llName">' + T(m.en, m.es) + '</div><div class="llCount">' + (D.kills[k] || 0) + '<small>' + T('heads', 'cabezas') + '</small></div></div></div>';
      }
      h += '</div>';
      if (D.streak && (D.streak.favorite || D.streak.contributions)) {
        h += '<div class="llToday">' + T('Favorite Day ' + (D.streak.favorite || 0) + ' days running \u00b7 giving ' + (D.streak.contributions || 0) + ' days running', 'D\u00eda Favorito ' + (D.streak.favorite || 0) + ' d\u00edas seguidos \u00b7 dando ' + (D.streak.contributions || 0) + ' d\u00edas seguidos') + '</div>';
      }
    }
    if (today.length) { var tl = []; for (i = 0; i < today.length; i++) { tl.push(esc(today[i].name) + ' \u2014 ' + esc(today[i].detail)); } h += '<div class="llToday">' + T('Today: ', 'Hoy: ') + tl.join(' \u00b7 ') + '</div>'; }
    if (mounted.length) {
      h += '<div class="llPlates">';
      for (i = 0; i < mounted.length; i++) {
        var t = mounted[i], head = '';
        try { if (t.kind === 'trophy' && t.law) { head = A.pair(t.law).defeat || ''; } } catch (e2) { head = ''; }
        h += '<div class="llPlate"><div class="llHead">' + (head ? '<img src="' + esc(head) + '" alt="">' : sym(t.kind)) + '</div><div class="llKind">' + kindWord(t.kind) + '</div><div class="llName2">' + esc(t.name) + '</div>' + (t.detail ? '<div class="llDetail">' + esc(t.detail) + '</div>' : '') + '<div class="llDate">' + esc(t.date) + '</div></div>';
      }
      h += '</div>';
    }
    if (!h) { return; }
    var wrap = document.createElement('div'); wrap.id = 'llWall'; wrap.style.width = '100%'; wrap.innerHTML = h;
    /* the empty-wall line goes quiet once real honors stand */
    var empty = w.querySelector('.emptyWall'); if (empty && (mounted.length || (D.kills && (D.kills.pile || D.kills.cold || D.kills.fog || D.kills.conq)))) { empty.style.display = 'none'; }
    if (w.firstChild) { w.insertBefore(wrap, w.firstChild); } else { w.appendChild(wrap); }
    if (w.children.length > 1) { var rule = document.createElement('div'); rule.id = 'llRule'; rule.className = 'llRule'; w.insertBefore(rule, wrap.nextSibling); }
  };

  /* ---------- seat: decorate the Hall's own render, never replace it ---------- */
  function seat() {
    if (LL.booted) { return; }
    if (typeof window.lifeRenderTrophies !== 'function' || !$('trophyWall')) { return; }
    LL.booted = true;
    var orig = window.lifeRenderTrophies;
    window.lifeRenderTrophies = function () { try { orig.apply(this, arguments); } catch (e) {} try { LL.render(); } catch (e2) {} };
    css();
  }
  function tick() {
    seat();
    var hall = $('hall');
    if (LL.booted && !LL.honors && hall && (hall.className || '').indexOf('on') >= 0) { LL.fetch(); }
  }
  var timer = setInterval(function () { tick(); if (LL.honors) { clearInterval(timer); } }, 1200);
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', tick); } else { tick(); }
})();
