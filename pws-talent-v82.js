(function() {
  'use strict';

  var NL = '\n';
  var DEPLOY_URL = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
  var GAMES_URL  = 'https://script.google.com/macros/s/AKfycbw1usnBC3UWpdkkBLMTPcuTWGKs3Ez_zLxSE-wZOu4WJ04UvpxKzuEPzbdPZ9WCLdX5sw/exec';
  var SESSION_KEY = '4laws-session';
  var MEMBER_KEY  = '4laws-member-id';
  var MODEL       = 'claude-sonnet-4-6';

  var _session  = null;
  var _memberId = null;
  var _lang     = 'en';
  var _obsData        = null;
  var _trustScores    = null;   // Trust Score from generateTrustScore
  var _toolsData      = null;
  var _dayData        = null;
  var _windowConfig   = {};

  // Today's skip list — stored in localStorage, auto-resets on new date
  var _SKIP_KEY = '4laws-skipped-';
  function _todayKey() { return _SKIP_KEY + new Date().toISOString().substring(0, 10); }
  function _loadSkipped() {
    try { return JSON.parse(localStorage.getItem(_todayKey()) || '[]'); } catch(e) { return []; }
  }
  function _saveSkipped(arr) {
    try { localStorage.setItem(_todayKey(), JSON.stringify(arr)); } catch(e) {}
  }
  function _isSkipped(label) { return _loadSkipped().indexOf(label) !== -1; }
  function _skipToday(label) {
    var arr = _loadSkipped();
    if (arr.indexOf(label) === -1) arr.push(label);
    _saveSkipped(arr);
  }
  function _unskip(label) {
    _saveSkipped(_loadSkipped().filter(function(l){ return l !== label; }));
  }
  var _adherenceData  = null;
  var _projectData    = null;
  var _unlockTool     = null;
  var _unlockHistory  = [];
  var _unlockMicActive   = false;
  var _unlockRecognizer  = null;
  var _useTool        = null;
  var _useHistory     = [];
  var _useMicActive   = false;
  var _useRecognizer  = null;
  var _timerInterval  = null;
  var _timerStart     = null;
  var _timerSeconds   = 0;
  var _pbKey          = null;
  var _musicSaved     = false;
  var _progShown      = false;   // guards DOC ASSIST question from rendering twice per session
  var _useAwaitingDread   = false; // Mental Filter: waiting for dread/excited answer
  var _useAwaitingReframe = false; // Mental Filter: waiting for reframe answer

  var _useStartTime   = null;
  var _usePB          = null;
  var _linkAsked      = {};
  var _docbHistory = [];

  function post(payload) {
    if (payload.action === 'cftConvTurn') {
      var body = {
        action:   'handleGamesAI',
        system:   payload.systemPrompt,
        messages: payload.conversationHistory
      };
      return fetch(GAMES_URL, { method: 'POST', body: JSON.stringify(body) })
        .then(function(r) { return r.json(); })
        .then(function(d) {
          var text = (d && d.content && d.content[0] && d.content[0].text) ? d.content[0].text : (d && d.reply) ? d.reply : '';
          return { success: !!text, reply: text };
        });
    }
    return fetch(DEPLOY_URL, { method: 'POST', body: JSON.stringify(payload) })
      .then(function(r) { return r.json(); });
  }

  function escHtml(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function fmtTime(t) { return t || ''; }

  function pwsInit() {
    var _urlParams = new URLSearchParams(window.location.search);
    var _urlSession = _urlParams.get('session');
    var _urlMember = _urlParams.get('member');
    var _urlDname = _urlParams.get('dname');
    if (_urlSession && _urlMember) {
      localStorage.setItem(SESSION_KEY, _urlSession);
      localStorage.setItem(MEMBER_KEY, _urlMember);
      if (_urlDname) {
        localStorage.setItem('4laws-display-name', decodeURIComponent(_urlDname));
      }
      history.replaceState({}, '', window.location.pathname);
    }
    _session  = localStorage.getItem(SESSION_KEY);
    _memberId = localStorage.getItem(MEMBER_KEY);
    if (!_session || !_memberId) {
      document.getElementById('pwsRedirect').classList.add('show');
      return;
    }
    function pwsLoadWeather(lat, lon) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
      '&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph';
    fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (!d || !d.current_weather) return;
      var cw = d.current_weather;
      var temp = Math.round(cw.temperature);
      var code = cw.weathercode;
      var icon, desc;
      if (code === 0) { icon = '\u2600\ufe0f'; desc = _lang === 'es' ? 'Despejado' : 'Clear'; }
      else if (code <= 2) { icon = '\u26c5'; desc = _lang === 'es' ? 'Parcialmente nublado' : 'Partly cloudy'; }
      else if (code <= 3) { icon = '\u2601\ufe0f'; desc = _lang === 'es' ? 'Nublado' : 'Overcast'; }
      else if (code <= 49) { icon = '\uD83C\uDF2B\ufe0f'; desc = _lang === 'es' ? 'Niebla' : 'Foggy'; }
      else if (code <= 59) { icon = '\uD83C\uDF26\ufe0f'; desc = _lang === 'es' ? 'Llovizna' : 'Drizzle'; }
      else if (code <= 69) { icon = '\uD83C\uDF27\ufe0f'; desc = _lang === 'es' ? 'Lluvia' : 'Rain'; }
      else if (code <= 79) { icon = '\u2744\ufe0f'; desc = _lang === 'es' ? 'Nieve' : 'Snow'; }
      else if (code <= 84) { icon = '\uD83C\uDF27\ufe0f'; desc = _lang === 'es' ? 'Chubascos' : 'Showers'; }
      else if (code <= 99) { icon = '\u26c8\ufe0f'; desc = _lang === 'es' ? 'Tormenta' : 'Thunderstorm'; }
      else { icon = '\uD83C\uDF21\ufe0f'; desc = ''; }
      var strip = document.getElementById('pwsWeatherStrip');
      var iconEl = document.getElementById('pwsWeatherIcon');
      var tempEl = document.getElementById('pwsWeatherTemp');
      var descEl = document.getElementById('pwsWeatherDesc');
      if (iconEl) iconEl.textContent = icon;
      if (tempEl) tempEl.textContent = temp + '\u00b0F';
      if (descEl) descEl.textContent = desc;
      if (strip) strip.style.display = 'flex';
    }).catch(function(){});
  }

  function pwsInitWeather() {
    var HOLYOKE_LAT = 42.2043;
    var HOLYOKE_LON = -72.6162;
    var pref = '';
    try { pref = localStorage.getItem('4laws-weather-pref') || ''; } catch(e) {}

    if (pref === 'yes') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(pos) { pwsLoadWeather(pos.coords.latitude, pos.coords.longitude); },
          function() { pwsLoadWeather(HOLYOKE_LAT, HOLYOKE_LON); }
        );
      } else {
        pwsLoadWeather(HOLYOKE_LAT, HOLYOKE_LON);
      }
      return;
    }

    if (pref === 'no') {
      pwsLoadWeather(HOLYOKE_LAT, HOLYOKE_LON);
      return;
    }

    // First visit — show permission banner in now-hero
    var strip = document.getElementById('pwsWeatherStrip');
    if (!strip) return;
    var banner = document.createElement('div');
    banner.id = 'pwsWeatherBanner';
    banner.style.cssText = 'display:flex;align-items:center;gap:10px;margin-top:8px;padding:7px 12px;background:rgba(200,168,75,0.1);border:1px solid rgba(200,168,75,0.35);border-radius:4px;';
    banner.innerHTML = '<span style="font-family:\'Cormorant Garamond\',serif;font-size:20px !important;color:rgba(240,230,204,0.8);">'
      + '<span class="en">Allow location for weather?</span>'
      + '<span class="es">&#191;Permitir ubicaci&#243;n para el clima?</span>'
      + '</span>'
      + '<button id="pwsWeatherYes" style="font-family:\'Cinzel\',serif;font-size:16px !important;letter-spacing:0.12em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:4px 12px;cursor:pointer;">Yes</button>'
      + '<button id="pwsWeatherNo"  style="font-family:\'Cinzel\',serif;font-size:16px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,230,204,0.5);background:transparent;border:1px solid rgba(240,230,204,0.2);border-radius:3px;padding:4px 12px;cursor:pointer;">No</button>';
    strip.parentNode.insertBefore(banner, strip.nextSibling);
    pwsApplyLang();

    document.getElementById('pwsWeatherYes').addEventListener('click', function() {
      try { localStorage.setItem('4laws-weather-pref', 'yes'); } catch(e) {}
      banner.parentNode.removeChild(banner);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(pos) { pwsLoadWeather(pos.coords.latitude, pos.coords.longitude); },
          function() { pwsLoadWeather(HOLYOKE_LAT, HOLYOKE_LON); }
        );
      } else {
        pwsLoadWeather(HOLYOKE_LAT, HOLYOKE_LON);
      }
    });

    document.getElementById('pwsWeatherNo').addEventListener('click', function() {
      try { localStorage.setItem('4laws-weather-pref', 'no'); } catch(e) {}
      banner.parentNode.removeChild(banner);
      pwsLoadWeather(HOLYOKE_LAT, HOLYOKE_LON);
    });
  }

  pwsSetCurrentTime();
    setInterval(pwsTickClock, 60000);
    var _dname = localStorage.getItem('4laws-display-name') || '';
    var _welcomeEl = document.getElementById('pwsWelcome');
    if (_welcomeEl && _dname) {
      _welcomeEl.innerHTML = '<span class="en">Welcome back, ' + escHtml(_dname) + '. Your station is ready.</span>'
        + '<span class="es">Bienvenido de vuelta, ' + escHtml(_dname) + '. Tu estaci\u00f3n est\u00e1 lista.</span>';
    }
    pwsLoadAll();
    pwsInitAccordion();

    // Hash navigation — auto-open accordion if URL has #accordionId
    (function() {
      var hash = window.location.hash ? window.location.hash.replace('#','') : '';
      if (hash) {
        var target = document.getElementById(hash);
        if (target && target.classList.contains('pws-accordion-card')) {
          target.classList.add('open');
          setTimeout(function() { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 400);
        }
      }
    }());
    pwsTWSHookAccordion();
    pwsUpdateAccordionStatus();
    pwsEntertainmentBridgeInbound();

    var _pauseBtn = document.getElementById('pwsUsePauseBtn');
    if (_pauseBtn) _pauseBtn.addEventListener('click', pwsTogglePause);
    var _closeBtn2 = document.getElementById('pwsUseCloseBtn2');
    if (_closeBtn2) _closeBtn2.addEventListener('click', pwsCloseUse);

    // BUILD 3: Wire header Doc B Enter key and camera
    var _docbInp = document.getElementById('pwsDocBInput');
    if (_docbInp) _docbInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendDocB(); }
    });
    // BUILD 3: Shortcut button delegation
    var _docbShortcuts = document.getElementById('pwsDocBShortcuts');
    if (_docbShortcuts) _docbShortcuts.addEventListener('click', function(e) {
      var btn = e.target.closest ? e.target.closest('[data-docb-shortcut]') : null;
      if (!btn) return;
      pwsDocBQuickTool(btn.getAttribute('data-docb-shortcut'));
    });
    var _docbCam = document.getElementById('pwsDocBCamInput');
    if (_docbCam) _docbCam.addEventListener('change', function() {
      if (!_docbCam.files || !_docbCam.files[0]) return;
      if (typeof DocBCore !== 'undefined') {
        DocBCore.handleCameraFile(_docbCam.files[0]);
      }
    });
    var _docbImgClear = document.getElementById('pwsDocBImgClear');
    if (_docbImgClear) _docbImgClear.addEventListener('click', function() {
      if (typeof DocBCore !== 'undefined') DocBCore.clearPending();
      var prev = document.getElementById('pwsDocBImgPreview'); if (prev) prev.style.display = 'none';
    });

    // DocBCore init
    function initDocBCore() {
      if (typeof DocBCore === 'undefined') { setTimeout(initDocBCore, 200); return; }
      DocBCore.init({
        inputId:       'pwsUseInput',
        previewId:     'pwsUseImgPreview',
        thumbId:       'pwsUseImgThumb',
        clearBtnId:    'pwsUseImgClear',
        voiceBtnId:    'pwsVoiceBtn',
        cameraInputId: 'pwsCamInput',
        getLang:       function() { return _lang; }
      });
    }
    try { localStorage.removeItem('4laws-voice-on'); } catch(e) {}
    initDocBCore();

    // Opening voice greeting — one time per device
    var greetKey = '4laws-voice-greeted';
    var greeted = false;
    try { greeted = localStorage.getItem(greetKey) === 'true'; } catch(e) {}
    if (!greeted) {
      setTimeout(function() {
        if (window.speechSynthesis) {
          var utt = new SpeechSynthesisUtterance(_lang === 'es' ? 'Hola. Puedo hablar contigo.' : 'Hi. I can talk.');
          utt.lang = _lang === 'es' ? 'es-US' : 'en-US';
          window.speechSynthesis.speak(utt);
        }
        var vBtn = document.getElementById('pwsVoiceBtn');
        if (vBtn) {
          var pc = 0;
          var pi = setInterval(function() {
            vBtn.style.boxShadow = pc % 2 === 0 ? '0 0 0 3px rgba(200,168,75,0.6)' : 'none';
            pc++; if (pc >= 6) { clearInterval(pi); vBtn.style.boxShadow = 'none'; }
          }, 400);
        }
      }, 1200);
    }
    var _addTalentBtn = document.getElementById('pwsAddTalentBtn');
    if (_addTalentBtn) _addTalentBtn.addEventListener('click', pwsOpenTalentBuilder);
    var _startFreshBtn = document.getElementById('pwsStartFreshBtn');
    if (_startFreshBtn) _startFreshBtn.addEventListener('click', pwsStartFresh);
    var _ecJewel = document.getElementById('pwsECJewel');
    if (_ecJewel) _ecJewel.addEventListener('click', function() { pwsOpenDeparture('/music',_lang==='es'?'Centro de Entretenimiento':'Entertainment Center'); });

    document.addEventListener('change', function(ev) {
      var chk = ev.target;
      if (!chk || !chk.classList.contains('pws-todo-check')) return;
      var label = chk.getAttribute('data-todo-label') || '';
      pwsToggleTodo(chk, label);
    });
    document.addEventListener('change', function(ev) {
      var el = ev.target;
      if (!el) return;
      if (el.id === 'pwsInviteRelationship') { pwsInviteUpdatePreview(); return; }
    });
  }

  var _lastWindowKey  = null;
  var _snoozeUntil    = null;
  var _endOfDayFired  = false;

  function pwsSetCurrentTime() {
    var now  = new Date();
    var h    = now.getHours();
    var m    = now.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12  = h % 12 || 12;
    var mStr = m < 10 ? '0' + m : '' + m;
    var el   = document.getElementById('pwsNowTime');
    if (el) el.textContent = h12 + ':' + mStr + ' ' + ampm;
  }

  function pwsTickClock() { pwsSetCurrentTime(); pwsCheckWindowTransition(); }

  function pwsCheckWindowTransition() {
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule.length) return;
    if (_snoozeUntil && Date.now() < _snoozeUntil) return;
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var current  = pwsFindCurrentWindow(schedule);
    var currentKey = current ? (current.derivedTime + '|' + current.activity) : 'none';
    if (currentKey !== _lastWindowKey) {
      var prevKey = _lastWindowKey;
      _lastWindowKey = currentKey;
      if (prevKey === null) return;
      if (!current) { pwsEndOfDaySummary(schedule); } else { pwsWindowNudge(current); }
    }
    pwsRenderCurrentWindow();
  }

  function pwsWindowNudge(win) {
    pwsOpenDocB();
    var actName = win.activity || 'your next activity';
    var nudgeEN = 'Time to shift.' + NL + NL + 'You said you\u0027d do \u201c' + actName + '\u201d. Ready?';
    var nudgeES = 'Hora de cambiar.' + NL + NL + 'Dijiste que har\u00edas \u201c' + actName + '\u201d. \u00bfListo?';
    setTimeout(function() {
      pwsAppendBubble(_lang === 'es' ? nudgeES : nudgeEN, 'docb');
      var feed = document.getElementById('pwsDocBFeed');
      if (!feed) return;
      var btnRow = document.createElement('div');
      btnRow.className = 'pws-nudge-btn-row';
      btnRow.setAttribute('data-window-activity', win.activity || '');
      btnRow.setAttribute('data-window-key', (win.derivedTime || '') + '_' + (win.activity || '').replace(/\s+/g, '_').substring(0, 20));
      btnRow.innerHTML =
        '<button class="pws-nudge-btn ready" onclick="pwsNudgeReady(this)"><span class="en">READY</span><span class="es">LISTO</span></button>' +
        '<button class="pws-nudge-btn snooze" onclick="pwsNudgeSnooze(this)"><span class="en">NEED A MINUTE</span><span class="es">UN MINUTO</span></button>';
      feed.appendChild(btnRow);
      feed.scrollTop = feed.scrollHeight;
    }, 400);
  }

  window.pwsNudgeReady = function pwsNudgeReady(btn) {
    var row = btn.closest('.pws-nudge-btn-row');
    var activityLabel = row ? (row.getAttribute('data-window-activity') || '') : '';
    var windowKey = row ? (row.getAttribute('data-window-key') || '') : '';
    if (row) row.parentNode.removeChild(row);
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: new Date().toISOString().substring(0, 10), windowKey: windowKey || 'transition',
      activityLabel: activityLabel || 'window transition', completed: true, note: '', lawTag: 'responsibility' });
    pwsAppendBubble(_lang === 'es' ? 'Bien. Vamos.' : 'Good. Let\u0027s go.', 'docb');
  };

  window.pwsNudgeSnooze = function pwsNudgeSnooze(btn) {
    var row = btn.closest('.pws-nudge-btn-row');
    var activityLabel = row ? (row.getAttribute('data-window-activity') || '') : '';
    var windowKey = row ? (row.getAttribute('data-window-key') || '') : '';
    if (row) row.parentNode.removeChild(row);
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: new Date().toISOString().substring(0, 10), windowKey: windowKey || 'transition',
      activityLabel: activityLabel || 'window transition', completed: false, note: 'snoozed 5 minutes', lawTag: 'responsibility' });
    _snoozeUntil = Date.now() + (5 * 60 * 1000);
    pwsAppendBubble(_lang === 'es' ? 'Entendido. Vuelvo en 5 minutos.' : 'Got it. I\u0027ll check back in 5 minutes.', 'docb');
    setTimeout(function() {
      _snoozeUntil = null;
      if (!_dayData || !_dayData.finalSchedule) return;
      var sched = _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; });
      var current = pwsFindCurrentWindow(sched);
      if (current) pwsWindowNudge(current);
    }, 5 * 60 * 1000);
  };

  function pwsEndOfDaySummary(schedule) {
    if (_endOfDayFired) return;
    _endOfDayFired = true;
    pwsOpenHandoff(schedule);
  }

  function pwsLoadAll() {
    pwsShowLoading(true);
    Promise.all([
      post({ action: 'pwsGetStation',        sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetTools',          sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetDay',            sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetTodayAdherence', sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; }),
      post({ action: 'pwsGetWindowConfig',   sessionId: _session, requestingMemberId: _memberId }).catch(function(){ return null; })
    ]).then(function(results) {
      var dStation = results[0], dTools = results[1], dDay = results[2], dAdherence = results[3], dWinConfig = results[4];
      if (dStation && dStation.status === 'ok') { _obsData = dStation.data ? Object.assign({}, dStation.data, { lastSavedAt: dStation.lastSavedAt }) : null; }
      // Reset contribution states daily
      if (_obsData && _obsData.confirmedObs) {
        var _todayReset = new Date().toISOString().substring(0, 10);
        var _lastReset = _obsData._lastResetDate || '';
        if (_lastReset !== _todayReset) {
          _obsData.confirmedObs.forEach(function(ob) { ob.state = 'not-started'; });
          _obsData._lastResetDate = _todayReset;
          post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
            data: { confirmedObs: _obsData.confirmedObs, hateList: _obsData.hateList || [], wishList: _obsData.wishList || [], whatMatters: _obsData.whatMatters || '', _lastResetDate: _todayReset }
          });
        }
      }
      if (!_obsData || !_obsData.confirmedObs || !_obsData.confirmedObs.length) {
        var alreadyPrompted = sessionStorage.getItem('pws_onboard_prompted');
        var twsOpen = document.getElementById('pwsTWSOverlay') && document.getElementById('pwsTWSOverlay').classList.contains('open');
        if (!alreadyPrompted && !twsOpen) {
          sessionStorage.setItem('pws_onboard_prompted', '1');
          setTimeout(function() { window.location.href = '/todos'; }, 800);
        }
      }
      if (dTools && dTools.status === 'ok') { _toolsData = dTools.data ? Object.assign({}, dTools.data, { lastSavedAt: dTools.lastSavedAt }) : null; }
      if (dDay && dDay.status === 'ok') { _dayData = dDay.data ? Object.assign({}, dDay.data, { lastSavedAt: dDay.lastSavedAt }) : null; }
      // Reset _checkedIn on load — prevents stale state
      if (_dayData && _dayData.finalSchedule) {
        _dayData.finalSchedule.forEach(function(s) { s._checkedIn = ''; });
      }
      if (dAdherence && dAdherence.status === 'ok') {
        _adherenceData = dAdherence;
        if (_dayData && _dayData.finalSchedule && dAdherence.records && dAdherence.records.length) {
          var filteredSched = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
          var _todayStr = new Date().toISOString().substring(0, 10);
          // Build keyMap — log is append-only so last record per windowKey wins
          var keyMap = {};
          dAdherence.records.forEach(function(rec) {
            if (rec.date && rec.date !== _todayStr) return; // today only
            if (rec.windowKey) {
              keyMap[rec.windowKey] = rec; // later entries overwrite earlier
            }
          });
          // Three-tier match: label_ key, window_N positional, activityLabel scan
          filteredSched.forEach(function(slot, i) {
            var labelKey = 'label_' + (slot.label || '').replace(/\s+/g, '_').toLowerCase();
            var posKey = 'window_' + i;
            var rec = keyMap[labelKey] || keyMap[posKey];
            if (!rec) {
              var recKeys = Object.keys(keyMap);
              for (var r = 0; r < recKeys.length; r++) {
                var candidate = keyMap[recKeys[r]];
                if (candidate.activityLabel && candidate.activityLabel === slot.label) {
                  rec = candidate;
                  break;
                }
              }
            }
            if (rec) slot._checkedIn = rec.completed ? 'done' : 'missed';
          });
        }
      }
      if (dWinConfig && dWinConfig.status === 'ok' && dWinConfig.data) { _windowConfig = dWinConfig.data; }
      // Sort finalSchedule by time so out-of-order windows display correctly
      if (_dayData && _dayData.finalSchedule && _dayData.finalSchedule.length) {
        _dayData.finalSchedule.sort(function(a, b) {
          var ta = (a.time || a.derivedTime || '99:99').replace(':', '');
          var tb = (b.time || b.derivedTime || '99:99').replace(':', '');
          return parseInt(ta, 10) - parseInt(tb, 10);
        });
      }
      pwsShowLoading(false);
      try { pwsRenderStationTile(); } catch(e) {}
      try { pwsRenderToolsTile(); } catch(e) {}
      try { pwsRenderDayTile(); } catch(e) {}
      try { pwsRenderCurrentWindow(); } catch(e) {}
      pwsLoadProjectTile();
      try { pwsUpdateAccordionStatus(); } catch(e) {}
      if (_dayData && _dayData.finalSchedule && _dayData.finalSchedule.length) {
        var sched0 = _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; });
        var curr0 = pwsFindCurrentWindow(sched0);
        _lastWindowKey = curr0 ? (curr0.derivedTime + '|' + curr0.activity) : 'none';
      }
      _endOfDayFired = false;
    }).catch(function() {
      pwsShowLoading(false);
      try { pwsRenderStationTile(); } catch(e) {}
      try { pwsRenderToolsTile(); } catch(e) {}
      try { pwsRenderDayTile(); } catch(e) {}
      pwsLoadProjectTile();
    });
  }

  function pwsShowLoading(show) {
    var els = document.querySelectorAll('.pws-loading');
    els.forEach(function(el) { el.style.display = show ? 'flex' : 'none'; });
  }

  function pwsRenderAll() {
    pwsRenderCurrentWindow(); pwsRenderStationTile(); pwsRenderToolsTile(); pwsRenderDayTile(); pwsUpdateAccordionStatus(); pwsEnsureProjectSlot();
    pwsInitWeather();
  }

  function pwsEnsureProjectSlot() {
    if (!_dayData || !_dayData.finalSchedule) return;
    var hasProject = (_projectData && _projectData.projectId) || (_twsProject && _twsProject.title);
    if (!hasProject) return;
    var projTitle = (_projectData && _projectData.title) ? _projectData.title : ((_twsProject && _twsProject.title) ? _twsProject.title : '');
    if (!projTitle) return;
    var slotLabel=_lang==='es'?'Trabajar en Mi Proyecto':'Work on My Project';
    var alreadyExists = _dayData.finalSchedule.some(function(s) {
      return (s.label || '').toLowerCase().indexOf('work on my project') !== -1 ||
             (s.label || '').toLowerCase().indexOf('trabajar en mi proyecto') !== -1 ||
             (s.isProjectSlot === true);
    });
    if (alreadyExists) return;
    _dayData.finalSchedule.push({
      label:         slotLabel,
      activity:      slotLabel,
      note:          projTitle,
      isProjectSlot: true,
      type:          'obligation',
      ownsIt:        true,
      _checkedIn:    ''
    });
    setTimeout(function() { pwsSaveDaySchedule(); pwsRenderDayTile(); }, 100);
  }

  function pwsRenderCurrentWindow() {
    var actEl = document.getElementById('pwsNowActivity');
    var chemEl = document.getElementById('pwsNowChem');
    if (!actEl) return;
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule.length) {
      actEl.innerHTML = '';
      if (chemEl) chemEl.innerHTML = '';
      return;
    }
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var current = pwsFindCurrentWindow(schedule);
    if (current) {
      actEl.innerHTML = '<span class="' + _lang + '">' + escHtml(current.label) + '</span>';
      if (chemEl) chemEl.innerHTML = current.chem ? '<span class="pws-now-chem">' + escHtml(current.chem) + '</span>' : '';
    } else {
      actEl.innerHTML = _lang === 'es' ? '<span class="es">Todo completado por hoy. Buen trabajo.</span>' : '<span class="en">All done for today. Good work.</span>';
      if (chemEl) chemEl.innerHTML = '';
    }
  }

  function pwsFindCurrentWindow(schedule) {
    if (!schedule || !schedule.length) return null;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var nowMins = h * 60 + m;
    var labelHours = { 'early morning': 5, 'morning': 8, 'midday': 12, 'afternoon': 14, 'after school': 16, 'evening': 18, 'before bed': 21, 'wake up': 6, 'prepare for good sleep': 21 };
    var best = null, bestMins = -1;
    schedule.forEach(function(s) {
      var label = (s.derivedTime || s.time || '').toLowerCase().trim();
      var windowMins = -1;
      var labelHour = labelHours[label];
      if (labelHour !== undefined) { windowMins = labelHour * 60; }
      if (windowMins < 0) {
        var m1 = label.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
        if (m1) {
          var hh = parseInt(m1[1], 10);
          var mm = parseInt(m1[2], 10);
          var ampm = m1[3].toLowerCase();
          if (ampm === 'pm' && hh < 12) hh += 12;
          if (ampm === 'am' && hh === 12) hh = 0;
          windowMins = hh * 60 + mm;
        }
      }
      if (windowMins < 0) {
        var m2 = label.match(/(\d{1,2})(am|pm)/i);
        if (m2) {
          var hh2 = parseInt(m2[1], 10);
          var ampm2 = m2[2].toLowerCase();
          if (ampm2 === 'pm' && hh2 < 12) hh2 += 12;
          if (ampm2 === 'am' && hh2 === 12) hh2 = 0;
          windowMins = hh2 * 60;
        }
      }
      if (windowMins < 0) {
        var m3 = label.match(/^(\d{1,2}):(\d{2})$/);
        if (m3) { windowMins = parseInt(m3[1], 10) * 60 + parseInt(m3[2], 10); }
      }
      if (windowMins >= 0 && windowMins <= nowMins && windowMins > bestMins) {
        bestMins = windowMins; best = s;
      }
    });
    return best || schedule[0];
  }

  function pwsIsValidObligation(text) {
    if (!text || typeof text !== 'string') return false;
    var t = text.trim();
    if (t.length < 3 || t.length > 120) return false;
    if (/^I (really|have a hard|can\u0027t|don\u0027t|feel|just|hate|always|never)/i.test(t)) return false;
    if (/my parents take me|i am late|hard for me|this part is/i.test(t)) return false;
    if (t.charAt(t.length - 1) === '?') return false;
    if (/^(Here\u0027s|Based on|Want me to|Let me|I can help|A lot of)/i.test(t)) return false;
    return true;
  }

  function pwsIsValidTool(t) {
    if (!t || typeof t !== 'object') return false;
    var obl = (t.obligation || '').trim();
    var en = (t.en || '').trim();
    if (!obl && !en) return false;
    if (/^Based on your|^Here\u0027s a specific tool|^I can help you with/i.test(en)) return false;
    t._oblDirty = !!(obl && !pwsIsValidObligation(obl));
    return true;
  }

  var ALIVENESS_LABELS = {
    en: { 'first-step': 'First Step \u2756', stirring: 'Stirring', growing: 'Growing', alive: 'Alive', resonant: 'Resonant' },
    es: { 'first-step': 'Primer Paso \u2756', stirring: 'Despertando', growing: 'Creciendo', alive: 'Vivo', resonant: 'Resonante' }
  };

  function buildAlivenessRow(w, lang) {
    var rawLabel = w.alivenessLabel || 'quiet';
    var tier = (rawLabel === 'quiet') ? 'first-step' : rawLabel;
    var percent = (typeof w.alivenessPercent === 'number') ? w.alivenessPercent : 0;
    if (tier === 'first-step' && percent < 10) percent = 10;
    var labelMap = ALIVENESS_LABELS[lang] || ALIVENESS_LABELS['en'];
    var labelText = labelMap[tier] || tier;
    var witnessCount = w.witnessCount || 0;
    var witnessText = witnessCount > 0 ? (witnessCount === 1 ? (lang === 'es' ? '1 testigo' : '1 witness') : (witnessCount + (lang === 'es' ? ' testigos' : ' witnesses'))) : '';
    return '<div class="gw-aliveness-header"><span class="gw-alive-label ' + escHtml(tier) + '">' + escHtml(labelText) + '</span>' +
      (witnessText ? '<span class="gw-witness-count">' + escHtml(witnessText) + '</span>' : '') + '</div>' +
      '<div class="gw-vitality-track"><div class="gw-vitality-fill ' + escHtml(tier) + '" style="width:' + percent + '%"></div></div>';
  }

  function renderTrustScoreCard(scores, certified) {
    if (!scores) return '';
    var lang = _lang;
    var names = lang === 'es'
      ? { talent: 'Talento', respect: 'Respeto', responsibility: 'Responsabilidad', limits: 'L\u00edmites' }
      : { talent: 'Talent',  respect: 'Respect', responsibility: 'Responsibility',  limits: 'Limits' };
    // Cascade direction: Talent -> Respect -> Responsibility -> Limits
    var laws = ['talent', 'respect', 'responsibility', 'limits'];
    var titleText = lang === 'es' ? 'Puntuaci\u00f3n de Confianza' : 'Trust Score';
    var gridHtml = laws.map(function(law) {
      var val = Math.min(100, Math.max(0, parseInt(scores[law] || 0, 10)));
      return '<div class="pws-trust-law-score">' +
        '<div class="pws-trust-law-row">' +
          '<div class="pws-trust-law-name">' + names[law] + '</div>' +
          '<div class="pws-trust-law-bar"><div class="pws-trust-law-bar-fill ' + law + '" id="pwsTscBar_' + law + '" style="width:0%"></div></div>' +
          '<div class="pws-trust-law-value ' + law + '">' + val + '</div>' +
        '</div>' +
        '</div>';
    }).join('');
    var overall = Math.min(100, Math.max(0, parseInt(scores.overall || 0, 10)));
    var weightNote = lang === 'es'
      ? 'Talento \u2192 Respeto \u2192 Responsabilidad \u2192 L\u00edmites'
      : 'Talent \u2192 Respect \u2192 Responsibility \u2192 Limits';
    var certHtml = certified
      ? '<div class="pws-trust-certified-row">' +
          '<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;display:inline-block;vertical-align:middle;margin-right:4px;">' +
            '<circle cx="22" cy="22" r="20" fill="none" stroke="#c8a84b" stroke-width="2"/>' +
            '<circle cx="22" cy="22" r="15" fill="#040608"/>' +
            '<polygon points="22,10 28,16 28,28 22,34 16,28 16,16" fill="#1a4fa0" opacity="0.9"/>' +
            '<polygon points="22,3 24,7 22,9 20,7" fill="#c8a84b"/>' +
          '</svg>' +
          (lang === 'es' ? 'Confianza Certificada' : 'Trust Certified') +
        '</div>'
      : '';
    var html = '<div class="pws-trust-score-card">' +
      '<div class="pws-trust-score-title">' + titleText + '</div>' +
      '<div class="pws-trust-score-grid">' + gridHtml + '</div>' +
      '<div class="pws-trust-overall">' +
        '<div>' +
          '<div class="pws-trust-overall-label">' + (lang === 'es' ? 'General' : 'Overall') + '</div>' +
          '<div class="pws-trust-overall-value">' + overall + '</div>' +
        '</div>' +
        '<div class="pws-trust-weight-note">' + weightNote + '</div>' +
      '</div>' +
      certHtml +
    '</div>';
    // Animate bars after DOM insertion
    setTimeout(function() {
      laws.forEach(function(law) {
        var fill = document.getElementById('pwsTscBar_' + law);
        var val = Math.min(100, Math.max(0, parseInt(scores[law] || 0, 10)));
        if (fill) fill.style.width = val + '%';
      });
    }, 60);
    return html;
  }

  var PWS_WIN_IMGS = [
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777144880149-LUDSLH9MISJ5FZFU97MY/unsplash-image-VCLNNMRl07k.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777146171508-MKUKY00DET6GYV3TIL97/unsplash-image-RMCHhAxXbWE.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777146749711-L0IECK3QHQT1NOLKW45A/unsplash-image-qWYvQMIJyfE.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777145803351-LX8N6HJDU0U67K3EC363/unsplash-image-nO7CzM6e5eA.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777146596645-KMZOJ84SMNEGCAIB13RY/unsplash-image-CZT7lkrt5sU.jpg?format=750w',
    'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1777145629037-LP1QN7CB6QYXU390YBV3/unsplash-image-TKCPeKjcTGU.jpg?format=750w'
  ];

  function pwsLoadProjectTile() {
    pwsRenderProjectTile(null);
    post({ action: 'getProjects', sessionId: _session, requestingMemberId: _memberId })
    .then(function(d) {
      if (!d || d.status !== 'ok' || !d.projects || !d.projects.length) return;
      var activeProjects = d.projects.filter(function(p) { return p.status !== 'archived'; });
      if (!activeProjects.length) activeProjects = d.projects;
      activeProjects.sort(function(a, b) {
        var da = a.createdAt || a.createdDate || a.created || '';
        var db = b.createdAt || b.createdDate || b.created || '';
        return da > db ? -1 : da < db ? 1 : 0;
      });
      var proj = activeProjects[0];
      return post({ action: 'getProjectWindows', sessionId: _session, requestingMemberId: _memberId, projectId: proj.projectId })
      .then(function(wd) {
        var latestTitle = (wd && wd.status === 'ok' && wd.windows && wd.windows.length) ? (wd.windows[0].title || '') : '';
        var restoredActivities = [];
        if (_toolsData && _toolsData._projectActivities && proj.projectId && _toolsData._projectActivities[proj.projectId]) {
          restoredActivities = _toolsData._projectActivities[proj.projectId];
        }
        if (!restoredActivities.length && proj.activities) {
          try {
            restoredActivities = typeof proj.activities === 'string' ? JSON.parse(proj.activities) : proj.activities;
          } catch(e) {}
        }
        if (!restoredActivities.length && _twsProject && _twsProject.activities && _twsProject.activities.length) {
          restoredActivities = _twsProject.activities;
        }
        _projectData = { projectId: proj.projectId, name: proj.name || '', latestWindowTitle: latestTitle, category: proj.category || '', description: proj.description || '', photo: proj.photo || '', title: proj.name || proj.title || '', type: proj.type || 'main', masteryStage: proj.masteryStage || 1, sessionCount: proj.sessionCount || 0, streakDays: proj.streakDays || 0, lastPracticed: proj.lastPracticed || '', entertainmentLinks: proj.entertainmentLinks || '[]', fundingStatus: proj.fundingStatus || 'none', fundingLetter: proj.fundingLetter || '', status: proj.status || 'active', activities: restoredActivities };
        _twsProject = _projectData;
        pwsRenderProjectTile(_projectData);
        pwsUpdateAccordionStatus();
      });
    }).catch(function() {});
  }

  function pwsRenderProjectTile(data) {
    // Gateway mode — projects live in Talent Hub (/talent-1)
    var preview = document.getElementById('pwsGatewayProjectPreview');
    if (!preview) return;
    if (data && (data.projectId || data.name || data.title)) {
      var name = data.name || data.title || '';
      var desc = data.description || '';
      preview.innerHTML =
        '<div style="background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.18);border-radius:6px;padding:14px 16px;text-align:left;">' +
          '<div style="font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c8a84b;margin-bottom:6px;">ACTIVE PROJECT</div>' +
          '<div style="font-family:\'Playfair Display\',serif;font-size:22px;color:#f0e6cc;font-weight:700;">' + escHtml(name) + '</div>' +
          (desc ? '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(240,230,204,0.55);margin-top:4px;">' + escHtml(desc) + '</div>' : '') +
        '</div>';
    } else {
      preview.innerHTML = '';
    }
  }

  function pwsRenderProjectCard(proj) {
    // Delegated to Talent Hub — this is a no-op in gateway mode
    pwsRenderProjectTile(proj);
  }

  function pwsRenderProjectActivities(proj) {
    var container = document.getElementById('pwsTWSActivitiesRow');
    if (!container) return;
    container.innerHTML = '';
    if (!proj || proj.type !== 'main') return;
    var activities = [];
    try {
      if (typeof proj.activities === 'string' && proj.activities.length > 2) {
        activities = JSON.parse(proj.activities);
      } else if (Array.isArray(proj.activities)) {
        activities = proj.activities;
      }
    } catch(e) { return; }
    if (!activities || !activities.length) return;

    var header = document.createElement('div');
    header.style.cssText = "font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c8a84b;margin-top:14px;margin-bottom:6px;cursor:pointer;display:flex;align-items:center;gap:8px;padding-bottom:6px;border-bottom:1px solid rgba(200,168,75,0.2);";
    header.innerHTML = 'MY ACTIVITIES <span id="pwsActToggleArrow" style="font-size:10px;">&#9660;</span>';
    container.appendChild(header);

    var listWrap = document.createElement('div');
    listWrap.id = 'pwsActList';
    listWrap.className = 'pws-activity-list';
    container.appendChild(listWrap);

    header.addEventListener('click', function() {
      var isOpen = listWrap.style.display !== 'none';
      listWrap.style.display = isOpen ? 'none' : 'flex';
      var arrow = document.getElementById('pwsActToggleArrow');
      if (arrow) arrow.innerHTML = isOpen ? '&#9654;' : '&#9660;';
    });

    activities.forEach(function(act, idx) {
      var row = document.createElement('div');
      row.className = 'pws-activity-row' + (act.status === 'done' ? ' done' : '');

      var dot = document.createElement('span');
      var dotColor = act.status === 'done' ? '#4caf50' : act.status === 'in-progress' ? '#c8a84b' : 'rgba(240,230,204,0.3)';
      dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:" + dotColor + ";flex-shrink:0;display:inline-block;";

      var titleEl = document.createElement('div');
      titleEl.className = 'pws-activity-title';
      titleEl.textContent = act.title || act;

      var statusEl = document.createElement('div');
      statusEl.className = 'pws-activity-status';
      var statusMap = { 'not-started': 'Not started', 'in-progress': 'In progress', 'done': 'Done \u2713' };
      statusEl.textContent = statusMap[act.status] || 'Not started';

      row.appendChild(dot);
      row.appendChild(titleEl);
      row.appendChild(statusEl);

      if (act.status !== 'done') {
        var btn = document.createElement('button');
        btn.className = 'pws-activity-activate-btn';
        btn.textContent = 'ACTIVATE';
        btn.setAttribute('data-act-idx', String(idx));
        btn.addEventListener('click', function() {
          var actIdx = parseInt(btn.getAttribute('data-act-idx'), 10);
          var actItem = activities[actIdx];
          if (!actItem) return;
          if (actItem.status === 'not-started') {
            actItem.status = 'in-progress';
            if (_twsProject) { _twsProject.activities = activities; }
            pwsUpdateProject({ activities: JSON.stringify(activities) });
          }
          var syntheticTool = {
            obligation: actItem.title || actItem,
            en: actItem.title || actItem,
            label: actItem.title || actItem,
            type: 'talent',
            isTalent: true,
            projectId: proj.projectId,
            configured: false,
            links: [],
            contacts: []
          };
          _useTool = syntheticTool;
          pwsOpenUse(_useTool);
        });
        row.appendChild(btn);
      }

      listWrap.appendChild(row);
    });
  }

  /* --- TWS Tool context ---
     Sets _useTool to a synthetic object so existing panel functions
     (Links, Reminders, Cash, Contacts, Assist) work with TWS project card.
     Called every time the project card renders.
  */
  function pwsTWSSetToolContext(proj) {
    _useTool = {
      obligation: proj.title || 'My Project',
      en:         proj.description || proj.title || 'My Project',
      label:      proj.title || 'My Project',
      category:   proj.category || '',
      link:       proj.link || '',
      links:      proj.links || [],
      contacts:   proj.contacts || [],
      parentPhone: proj.parentPhone || '',
      hasAssist:  true,
      _tws:       true    // flag so we know this is TWS context, not ACTIVATE
    };
  }

  /* --- TWS panel feed resolver ---
     Panel toggles that target pwsUseFeed will be patched to call
     pwsTWSGetFeed() instead, returning the right host div.
  */
  function pwsTWSGetFeed() {
    var useOverlay = document.getElementById('pwsUseOverlay');
    var overlayOpen = useOverlay && useOverlay.classList.contains('open');
    if (overlayOpen) {
      var panelZone = document.getElementById('pwsToolPanelZone');
      if (panelZone) return panelZone;
    }
    var twsFeed = document.getElementById('pwsTWSPanelFeed');
    if (twsFeed) return twsFeed;
    return document.getElementById('pwsUseFeed');
  }

  function pwsRenderTWSProjectTools(proj) {
    var toolsRow = document.getElementById('pwsTWSToolsRow');
    if (!toolsRow) return;
    var cat = (proj.category || '').toLowerCase();

    var ALL_TOOLS = [
      { key: 'Music',      icon: '\uD83C\uDFB5', label: 'Music',       labelEs: 'M\u00fasica',      action: function() { pwsEntertainmentBridgeOutbound('music'); } },
      { key: 'CFT',        icon: '\uD83D\uDCB0', label: 'CFT',         labelEs: 'CFT',              action: function() { pwsToggleCashPanel(); } },
      { key: 'Contacts',   icon: '\uD83D\uDCE8', label: 'Contacts',    labelEs: 'Contactos',        action: function() { pwsToggleContactsPanel(); } },
      { key: 'Doc B',      icon: '\uD83E\uDD16', label: 'Doc B',       labelEs: 'Doc B',            action: function() { pwsOpenDocB(); } },
      { key: 'Links',      icon: '\uD83D\uDD17', label: 'Links',       labelEs: 'Enlaces',          action: function() { pwsToggleLinksPanel(); } },
      { key: 'Timer',      icon: '\u23F1',        label: 'Timer',       labelEs: 'Cron\u00f3metro',  action: function() { pwsToggleTimerPanel(); } },
      { key: 'Reminders',  icon: '\uD83D\uDD14', label: 'Reminders',   labelEs: 'Recordatorios',   action: function() { pwsToggleReminderPanel(); } },
      { key: 'Games',      icon: '\uD83C\uDFAE', label: 'Games',       labelEs: 'Juegos',           action: function() { pwsEntertainmentBridgeOutbound('game'); } },
      { key: 'Notes',      icon: '\uD83D\uDCDD', label: 'Notes',       labelEs: 'Notas',            action: function() { pwsOpenTWSNotes(); } },
      { key: 'Camera',     icon: '\uD83D\uDCF7', label: 'Camera',      labelEs: 'C\u00e1mara',     action: function() { pwsOpenTWSCamera(); } },
      { key: 'Video Links',icon: '\uD83D\uDCF9', label: 'Video Links', labelEs: 'Video',            action: function() { pwsToggleLinksPanel(); } }
    ];

    var suggestedKeys;
    if (cat === 'move your body')      suggestedKeys = ['Music','Timer','Links','Contacts','CFT','Doc B','Video Links','Reminders'];
    else if (cat === 'make stuff')     suggestedKeys = ['Music','Timer','Camera','Links','Contacts','CFT','Doc B','Notes','Reminders'];
    else if (cat === 'build things')   suggestedKeys = ['Timer','Links','Music','Contacts','CFT','Doc B','Notes','Reminders'];
    else if (cat === 'play & compete') suggestedKeys = ['Timer','Games','Links','Contacts','CFT','Doc B','Video Links','Reminders'];
    else if (cat === 'own the outdoors') suggestedKeys = ['Camera','Notes','Links','Contacts','CFT','Doc B','Timer','Reminders'];
    else if (cat === 'connect with people') suggestedKeys = ['Music','Links','Contacts','CFT','Doc B','Timer','Notes','Reminders'];
    else if (cat === 'weird & awesome') suggestedKeys = ['Timer','Camera','Music','Links','CFT','Doc B','Notes','Reminders'];
    else suggestedKeys = ['Music','CFT','Contacts','Doc B','Links','Timer','Reminders','Notes'];

    var toolMap = {};
    ALL_TOOLS.forEach(function(t) { toolMap[t.key] = t; });

    var existingTalentTools = {};
    if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(ct) {
        var projTitle = (_twsProject && _twsProject.title) ? _twsProject.title : (proj.title || '');
        if (ct.type === 'talent' && ct.obligation === projTitle) {
          existingTalentTools[ct.en] = true;
        }
      });
    }
    var hasConfirmedTools = Object.keys(existingTalentTools).length > 0;

    var _selectedToolKeys = hasConfirmedTools ? {} : {};
    if (!hasConfirmedTools && _toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(ct) {
        if (ct.obligation === (proj.title || '') && ct.type === 'talent') {
          _selectedToolKeys[ct.en] = true;
        }
      });
    }

    toolsRow.innerHTML = '';

    var quoteBubble = document.createElement('div');
    quoteBubble.style.cssText = 'display:flex;align-items:flex-start;gap:10px;background:rgba(4,6,8,0.7);border:1px solid rgba(200,168,75,0.15);border-radius:8px;padding:14px 16px;margin-bottom:14px;';
    var avatarImg = document.createElement('img');
    avatarImg.src = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/a2eea043-07f6-47c0-8b79-85b1f4b886da/4LAWS+logo+print.jpg?format=1000w';
    avatarImg.alt = '4 LAWS';
    avatarImg.style.cssText = 'width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid rgba(200,168,75,0.3);';
    var quoteText = document.createElement('div');
    quoteText.style.cssText = 'flex:1;';
    var quoteBody = document.createElement('div');
    quoteBody.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:21px !important;font-style:italic;color:#c8a84b;line-height:1.45;margin-bottom:4px;";
    quoteBody.textContent = 'Chosen talent. Not forced. Choose what truly turns you on.';
    var quoteAttr = document.createElement('div');
    quoteAttr.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.14em;color:rgba(240,230,204,0.45);text-transform:uppercase;';
    quoteAttr.textContent = '\u2014 Doc B';
    quoteText.appendChild(quoteBody);
    quoteText.appendChild(quoteAttr);
    quoteBubble.appendChild(avatarImg);
    quoteBubble.appendChild(quoteText);
    toolsRow.appendChild(quoteBubble);

    if (hasConfirmedTools) {
      pwsTWSRenderActiveToolGrid(toolMap, existingTalentTools, toolsRow, proj);
    } else if (!proj.projectId) {
      var selectionWrap = document.createElement('div');

      var promptDiv = document.createElement('div');
      promptDiv.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:20px !important;font-style:italic;color:rgba(240,230,204,0.7);margin-bottom:12px;line-height:1.4;";
      promptDiv.innerHTML = '<span class="en">Which of these do you want in your toolkit?</span><span class="es" style="display:none;">\u00bfCu\u00e1les de estas quieres en tu kit?</span>';
      selectionWrap.appendChild(promptDiv);

      var selGrid = document.createElement('div');
      selGrid.className = 'pws-launcher-grid';
      selGrid.id = 'pwsTWSToolSelGrid';

      suggestedKeys.forEach(function(key) {
        var t = toolMap[key];
        if (!t) return;
        var isSelected = !!_selectedToolKeys[key];
        var btn = document.createElement('button');
        btn.className = 'pws-use-footer-btn pws-launcher-btn' + (isSelected ? ' mark-done' : '');
        btn.setAttribute('data-tool-key', key);
        btn.innerHTML = t.icon + ' <span class="en">' + escHtml(t.label) + '</span><span class="es" style="display:none;">' + escHtml(t.labelEs) + '</span>';
        btn.addEventListener('click', function() {
          var currently = btn.classList.contains('mark-done');
          btn.classList.toggle('mark-done', !currently);
          if (!currently) { _selectedToolKeys[key] = true; }
          else { delete _selectedToolKeys[key]; }
        });
        selGrid.appendChild(btn);
      });
      selectionWrap.appendChild(selGrid);

      var confirmBtn = document.createElement('button');
      confirmBtn.className = 'pws-plan-day-btn';
      confirmBtn.style.cssText = 'width:100%;margin-top:10px;padding:11px 20px;font-size:14px !important;letter-spacing:0.18em;';
      confirmBtn.innerHTML = '<span class="en">\u2713 Add to My Toolkit</span><span class="es" style="display:none;">\u2713 Agregar a Mi Kit</span>';
      confirmBtn.addEventListener('click', function() { pwsTWSConfirmToolSelection(_selectedToolKeys, toolMap, proj, selectionWrap, toolsRow); });
      selectionWrap.appendChild(confirmBtn);

      toolsRow.appendChild(selectionWrap);
    }

    var fundingBtn = document.createElement('button');
    fundingBtn.className = 'pws-plan-day-btn';
    fundingBtn.style.cssText = 'width:100%;margin-top:10px;padding:11px 20px;font-size:14px !important;letter-spacing:0.18em;background:rgba(200,168,75,0.15);';
    fundingBtn.innerHTML = '<span class="en">\uD83D\uDCB3 FUNDING</span><span class="es" style="display:none;">\uD83D\uDCB3 FINANCIAMIENTO</span>';
    fundingBtn.addEventListener('click', pwsOpenFunding);
    toolsRow.appendChild(fundingBtn);

    var goToolsBtn = document.createElement('button');
    goToolsBtn.className = 'pws-launcher-done';
    goToolsBtn.style.cssText = 'margin-top:8px;width:100%;padding:9px 20px;font-size:12px !important;letter-spacing:0.16em;';
    goToolsBtn.innerHTML = '<span class="en">\u2192 Go to Tools &amp; Entertainment</span><span class="es" style="display:none;">\u2192 Ir a Herramientas</span>';
    goToolsBtn.addEventListener('click', function() {
      var toolsCard = document.getElementById('pwsAccordionResponsibility');
      if (toolsCard) {
        toolsCard.classList.add('open');
        toolsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    toolsRow.appendChild(goToolsBtn);

    var editBtn = document.createElement('button');
    editBtn.className = 'pws-launcher-done';
    editBtn.style.marginTop = '4px';
    editBtn.innerHTML = '<span class="en">\u2295 New Project</span><span class="es" style="display:none;">\u2295 Nuevo Proyecto</span>';
    editBtn.addEventListener('click', pwsOpenTWS);
    toolsRow.appendChild(editBtn);
  }

  /* Confirm tool selection: push into confirmedTools, save, render active grid */
  function pwsTWSConfirmToolSelection(selectedKeys, toolMap, proj, selectionWrap, toolsRow) {
    var projTitle = (_twsProject && _twsProject.title) ? _twsProject.title : (proj.title || 'My Project');
    var keys = Object.keys(selectedKeys);
    if (!keys.length) return;

    if (!_toolsData) _toolsData = { confirmedTools: [], addedToolNames: [], _items: [] };
    if (!_toolsData.confirmedTools) _toolsData.confirmedTools = [];

    _toolsData.confirmedTools = _toolsData.confirmedTools.filter(function(ct) {
      return !(ct.obligation === projTitle && ct.type === 'talent');
    });

    keys.forEach(function(key) {
      _toolsData.confirmedTools.push({
        obligation:  projTitle,
        en:          key,
        label:       key,
        type:        'talent',
        isTalent:    true,
        projectId:   (_twsProject && _twsProject.projectId) || '',
        configured:  false,
        links:       [],
        contacts:    []
      });
    });

    if (_twsProject) { _twsProject.tools = keys.join(','); }
    pwsUpdateProject({ tools: keys.join(',') });

    post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
      data: pwsToolsPayload()
    }).catch(function() {});

    if (selectionWrap && selectionWrap.parentNode) selectionWrap.parentNode.removeChild(selectionWrap);
    pwsTWSRenderActiveToolGrid(toolMap, selectedKeys, toolsRow, proj);

    pwsRenderToolsTile();

    // -------------------------------------------------------
    // TEMPLATE NAMING — Item 4
    // After the member builds their tool set for the first time,
    // prompt them to name their daily system.
    // Only ask once — skip if templateName already exists.
    // -------------------------------------------------------
    if (!_toolsData.templateName) {
      setTimeout(function() {
        pwsShowTemplateNamingPrompt();
      }, 800);
    }
  }

  // -------------------------------------------------------
  // pwsShowTemplateNamingPrompt
  // Inserts a naming card after the tool grid in the Tools
  // & Entertainment accordion section.
  // -------------------------------------------------------
  function pwsShowTemplateNamingPrompt() {
    var existing = document.getElementById('pwsTemplateNamingWrap');
    if (existing) return;

    var toolsSection = document.getElementById('pwsToolsSaved') || document.getElementById('pwsToolsSection');
    var insertTarget = document.querySelector('#pwsRoot .pws-section');
    // Find the Tools & Entertainment accordion body to append
    var accordionBody = document.getElementById('pwsAccordionResponsibility');
    if (!accordionBody) { accordionBody = document.querySelector('#pwsRoot .pws-section'); }

    var wrap = document.createElement('div');
    wrap.id = 'pwsTemplateNamingWrap';
    wrap.style.cssText = 'margin-top:24px;padding:20px 22px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.3);border-radius:6px;';
    wrap.innerHTML = '<div style="font-family:\'Cinzel\',serif;font-size:18px !important;letter-spacing:0.2em;color:#c8a84b;text-transform:uppercase;margin-bottom:10px;">'
      + '<span class="en">Name Your Daily System</span>'
      + '<span class="es">Nombra Tu Sistema Diario</span>'
      + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:22px !important;font-style:italic;color:rgba(240,230,204,0.7);margin-bottom:14px;line-height:1.5;">'
      + '<span class="en">You\'ve built your daily system. Give it a name.</span>'
      + '<span class="es">Construiste tu sistema diario. P\u00f3nle un nombre.</span>'
      + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px !important;font-style:italic;color:rgba(240,230,204,0.4);margin-bottom:14px;">'
      + '<span class="en">Examples: "The Clinical Warrior" &middot; "My Morning Architecture" &middot; "Eduardo\'s Daily Code"</span>'
      + '<span class="es">Ejemplos: "El Guerrero Cl\u00ednico" &middot; "Mi Arquitectura Matutina" &middot; "El C\u00f3digo Diario de Eduardo"</span>'
      + '</div>'
      + '<div style="display:flex;gap:10px;align-items:center;">'
      + '<input id="pwsTemplateNameInput" type="text" placeholder="My system name..." style="flex:1;background:rgba(240,230,204,0.05);border:1px solid rgba(200,168,75,0.35);border-radius:4px;color:#f0e6cc;font-family:\'Cormorant Garamond\',serif;font-size:24px !important;padding:9px 14px;outline:none;" />'
      + '<button id="pwsTemplateNameSave" style="font-family:\'Cinzel\',serif;font-size:16px !important;letter-spacing:0.14em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:9px 18px;cursor:pointer;white-space:nowrap;">'
      + '<span class="en">Save</span><span class="es">Guardar</span>'
      + '</button>'
      + '<button id="pwsTemplateNameSkip" style="font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,230,204,0.3);background:transparent;border:none;cursor:pointer;padding:9px 6px;">'
      + '<span class="en">Later</span><span class="es">Despu\u00e9s</span>'
      + '</button>'
      + '</div>'
      + '<div id="pwsTemplateNameStatus" style="font-family:\'Cormorant Garamond\',serif;font-size:20px !important;color:#c8a84b;margin-top:8px;min-height:24px;"></div>';

    // Insert after the tool grid in the page
    var refNode = document.getElementById('pwsToolsSaved');
    if (refNode && refNode.parentNode) {
      refNode.parentNode.insertBefore(wrap, refNode.nextSibling);
    } else {
      var page = document.querySelector('#pwsRoot .pws-page');
      if (page) page.insertBefore(wrap, page.firstChild);
    }

    pwsApplyLang();

    document.getElementById('pwsTemplateNameSave').addEventListener('click', function() {
      var name = (document.getElementById('pwsTemplateNameInput').value || '').trim();
      if (!name) return;
      _toolsData.templateName = name;
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
        data: pwsToolsPayload()
      }).catch(function() {});
      var status = document.getElementById('pwsTemplateNameStatus');
      if (status) status.textContent = '\u2728 ' + name;
      setTimeout(function() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
        pwsRenderToolsTile();
      }, 1600);
    });

    document.getElementById('pwsTemplateNameSkip').addEventListener('click', function() {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
    });
  }

  /* Active tool grid — shown after tools are confirmed */
  function pwsTWSRenderActiveToolGrid(toolMap, selectedKeys, toolsRow, proj) {
    var existingGrid = document.getElementById('pwsTWSActiveGrid');
    if (existingGrid) existingGrid.parentNode.removeChild(existingGrid);
    var wrap = document.createElement('div');
    wrap.id = 'pwsTWSActiveGrid';
    var grid = document.createElement('div');
    grid.className = 'pws-launcher-grid';
    Object.keys(selectedKeys).forEach(function(key) {
      var t = toolMap[key];
      if (!t) return;
      var btn = document.createElement('button');
      btn.className = 'pws-use-footer-btn pws-launcher-btn';
      btn.innerHTML = t.icon + ' <span class="en">' + escHtml(t.label) + '</span><span class="es" style="display:none;">' + escHtml(t.labelEs) + '</span>';
      btn.addEventListener('click', t.action);
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    var fundingBtn = toolsRow.querySelector('.pws-plan-day-btn');
    if (fundingBtn) { toolsRow.insertBefore(wrap, fundingBtn); }
    else { toolsRow.appendChild(wrap); }
  }

  /* ============================================================
     TWS PANEL MANAGER
     One panel open at a time in the project card feed.
     All toggle functions call pwsTWSClosePanels() before opening.
     Toggle-closed (same button = remove) still works via existing id check.
  ============================================================ */
  var TWS_PANEL_IDS = [
    'pwsLinksPanelInner',
    'pwsCashPanelInner',
    'pwsReminderPanelInner',
    'pwsContactsPanelInner',
    'pwsAssistChatWrap',
    'pwsTWSTimerPanelInner',
    'pwsTWSCameraPanel'
  ];

  function pwsTWSClosePanels(exceptId) {
    var twsFeed = document.getElementById('pwsTWSPanelFeed');
    var panelZone = document.getElementById('pwsToolPanelZone');
    TWS_PANEL_IDS.forEach(function(id) {
      if (id === exceptId) return;
      var el = document.getElementById(id);
      if (!el) return;
      if ((twsFeed && twsFeed.contains(el)) || (panelZone && panelZone.contains(el))) {
        el.parentNode.removeChild(el);
      }
    });
    if (exceptId !== 'pwsTWSTimerPanelInner' && _twsTimerInterval) {
      clearInterval(_twsTimerInterval);
      _twsTimerInterval = null;
      _twsTimerStart    = null;
      _twsTimerSeconds  = 0;
    }
  }

  /* pwsToggleTimerPanel — inline timer for TWS project card */
  function pwsToggleTimerPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsTWSTimerPanelInner');
    if (existing) {
      if (_twsTimerInterval) { clearInterval(_twsTimerInterval); _twsTimerInterval = null; _twsTimerStart = null; _twsTimerSeconds = 0; }
      existing.parentNode.removeChild(existing);
      return;
    }
    pwsTWSClosePanels('pwsTWSTimerPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsTWSTimerPanelInner';
    panel.style.textAlign = 'center';

    var proj = _twsProject || {};
    var pbKey = 'pws-pb-tws-' + (proj.title || 'project').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 30);
    var pb = null;
    try { var pbRaw = localStorage.getItem(pbKey); if (pbRaw) pb = JSON.parse(pbRaw); } catch(e) {}

    var pbLine = document.createElement('div');
    pbLine.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.2em;color:rgba(200,168,75,0.6);text-transform:uppercase;margin-bottom:10px;';
    pbLine.textContent = pb ? (_lang === 'es' ? 'Mejor: ' + pwsFmtSeconds(pb.best) : 'Best: ' + pwsFmtSeconds(pb.best)) : (_lang === 'es' ? 'Primer intento' : 'First attempt');
    panel.appendChild(pbLine);

    var display = document.createElement('div');
    display.id = 'pwsTWSTimerDisplay';
    display.style.cssText = 'font-family:\'Playfair Display\',serif;font-size:56px !important;font-weight:700;color:#f0e6cc;line-height:1;margin-bottom:12px;';
    display.textContent = '0:00';
    panel.appendChild(display);

    var startBtn = document.createElement('button');
    startBtn.id = 'pwsTWSTimerStartBtn';
    startBtn.className = 'pws-links-save-btn';
    startBtn.style.cssText = 'width:100%;padding:12px 20px;font-size:14px !important;letter-spacing:0.18em;';
    startBtn.textContent = _lang === 'es' ? '\u25b6 INICIAR' : '\u25b6 START';
    var startHandler = function() { pwsTWSStartTimer(pbKey, pb, display, startBtn); };
    startBtn._twsStartHandler = startHandler;
    startBtn.addEventListener('click', startHandler);
    panel.appendChild(startBtn);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  var _twsTimerInterval = null;
  var _twsTimerStart    = null;
  var _twsTimerSeconds  = 0;

  function pwsTWSStartTimer(pbKey, pb, display, startBtn) {
    if (_twsTimerInterval) return;
    _twsTimerStart   = Date.now();
    _twsTimerSeconds = 0;

    var stopHandler = function() { pwsTWSStopTimer(pbKey, pb, display, startBtn); };
    startBtn.removeEventListener('click', startBtn._twsStartHandler);
    startBtn._twsStopHandler = stopHandler;
    startBtn.addEventListener('click', stopHandler);

    startBtn.textContent = _lang === 'es' ? '\u2713 LISTO \u2014 PARAR' : '\u2713 DONE \u2014 STOP';
    startBtn.style.background = '#c8a84b';
    startBtn.style.color = '#040608';

    _twsTimerInterval = setInterval(function() {
      _twsTimerSeconds = Math.floor((Date.now() - _twsTimerStart) / 1000);
      if (display) display.textContent = pwsFmtSeconds(_twsTimerSeconds);
    }, 1000);
  }

  function pwsTWSStopTimer(pbKey, pb, display, startBtn) {
    if (!_twsTimerInterval) return;
    clearInterval(_twsTimerInterval);
    _twsTimerInterval = null;
    var elapsed = _twsTimerSeconds;
    var prevBest = pb ? pb.best : null;
    var isNewBest = (prevBest === null || elapsed < prevBest);
    var newPB = { best: isNewBest ? elapsed : prevBest, lastSeconds: elapsed, lastDate: new Date().toLocaleDateString(), count: (pb ? (pb.count || 0) : 0) + 1 };
    try { localStorage.setItem(pbKey, JSON.stringify(newPB)); } catch(e) {}
    if (display) {
      display.textContent = pwsFmtSeconds(elapsed);
      display.style.color = isNewBest ? '#c8a84b' : '#f0e6cc';
    }
    if (startBtn) {
      startBtn.removeEventListener('click', startBtn._twsStopHandler);
      startBtn.textContent = isNewBest
        ? (_lang === 'es' ? '\u00a1Nuevo R\u00e9cord! ' + pwsFmtSeconds(elapsed) : 'New Best! ' + pwsFmtSeconds(elapsed))
        : (pwsFmtSeconds(elapsed) + (_lang === 'es' ? ' \u2014 Mejor: ' + pwsFmtSeconds(newPB.best) : ' \u2014 Best: ' + pwsFmtSeconds(newPB.best)));
      startBtn.style.background = 'transparent';
      startBtn.style.border = '1px solid rgba(200,168,75,0.4)';
      startBtn.style.color = '#c8a84b';
      startBtn.style.cursor = 'default';
    }
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: new Date().toISOString().substring(0, 10),
      windowKey: 'tws_timer_' + (_twsProject ? (_twsProject.title || 'project').replace(/\s+/g,'_').substring(0,20) : 'project'),
      activityLabel: (_twsProject && _twsProject.title) || 'Project work',
      completed: true, note: 'timer: ' + pwsFmtSeconds(elapsed) + (isNewBest ? ' (new PB)' : ''), lawTag: 'talent' });
    _twsTimerStart   = null;
    _twsTimerSeconds = 0;
  }

  function pwsRenderStationTile() {
    var container = document.getElementById('pwsObsCards');
    if (!container) return;
    if (!_obsData || !_obsData.confirmedObs || !_obsData.confirmedObs.length) {
      container.innerHTML = '<div class="pws-empty-state">' +
        '<p class="pws-empty-msg"><span class="en">No day built yet. Tell Doc B your day.</span>' +
        '<span class="es">Tu d\u00eda a\u00fan no est\u00e1 configurado. Cu\u00e9ntale a Doc B c\u00f3mo es tu d\u00eda t\u00edpico y se crear\u00e1n tus contribuciones.</span></p>' +
        '<a class="pws-goto-studio-btn" href="/todos" style="text-decoration:none;display:inline-block;">' +
        '<span class="en">\u2192 Tell Doc B About My Day</span>' +
        '<span class="es">\u2192 Contarle a Doc B Sobre Mi D\u00eda</span></a></div>';
      pwsUpdateSavedLabel('pwsObsSaved', null); return;
    }
    var stateEN = { 'not-started': 'Not Started', 'in-progress': 'In Progress', 'crushing': 'Crushing It' };
    var stateES = { 'not-started': 'Sin comenzar', 'in-progress': 'En proceso', 'crushing': 'Lo estoy logrando' };
    var obsWithIdx = [];
    _obsData.confirmedObs.forEach(function(o, i) { if (pwsIsValidObligation(o.text)) obsWithIdx.push({ ob: o, origIdx: i }); });
    if (!obsWithIdx.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">Your day hasn\u0027t been set up yet. Tell Doc B what your typical day looks like.</span><span class="es">Tu d\u00eda a\u00fan no est\u00e1 configurado. Cu\u00e9ntale a Doc B c\u00f3mo es tu d\u00eda.</span></p>' +
        '<a class="pws-goto-studio-btn" href="/todos" style="text-decoration:none;display:inline-block;"><span class="en">\u2192 Tell Doc B About My Day</span><span class="es">\u2192 Contarle a Doc B Sobre Mi D\u00eda</span></a></div>';
      pwsUpdateSavedLabel('pwsObsSaved', _obsData.lastSavedAt); return;
    }
    container.innerHTML = '';
    obsWithIdx.forEach(function(item) {
      var o = item.ob; var origIdx = item.origIdx;
      var state = o.state || 'not-started';
      var checkClass = state === 'crushing' ? ' done' : state === 'in-progress' ? ' in-progress' : '';
      var stateClass = state === 'crushing' ? ' crushing' : state === 'in-progress' ? ' in-progress' : '';
      var card = document.createElement('div');
      card.className = 'pws-obs-card';
      card.setAttribute('data-idx', origIdx);
      card.style.cssText = 'position:relative;display:flex;align-items:center;gap:14px;';
      var check = document.createElement('div');
      check.className = 'pws-obs-check' + checkClass;
      check.addEventListener('click', function() { pwsToggleObs(origIdx); });
      var text = document.createElement('div');
      text.className = 'pws-obs-text';
      text.textContent = o.text;
      text.style.flex = '1';
      text.addEventListener('click', function() { pwsToggleObs(origIdx); });
      var stateEl = document.createElement('div');
      stateEl.className = 'pws-obs-state' + stateClass;
      stateEl.innerHTML = '<span class="en">' + (stateEN[state] || state) + '</span><span class="es">' + (stateES[state] || state) + '</span>';
      stateEl.addEventListener('click', function() { pwsToggleObs(origIdx); });
      var delBtn = document.createElement('button');
      delBtn.className = 'pws-tool-delete-btn';
      delBtn.textContent = '\u2715';
      delBtn.title = _lang === 'es' ? 'Eliminar' : 'Delete';
      delBtn.style.cssText = 'flex-shrink:0;font-size:14px !important;padding:2px 6px;';
      (function(idx) {
        delBtn.addEventListener('click', function(ev) {
          ev.stopPropagation();
          pwsDeleteObs(idx);
        });
      }(origIdx));
      card.appendChild(check);
      card.appendChild(text);
      card.appendChild(stateEl);
      card.appendChild(delBtn);
      container.appendChild(card);
    });
    pwsUpdateSavedLabel('pwsObsSaved', _obsData.lastSavedAt);
    var contribCont = document.getElementById('pwsContribCards');
    if (contribCont) {
      var completed = _obsData.confirmedObs.filter(function(o){ return o.state === 'crushing'; }).length;
      var total = _obsData.confirmedObs.length || 1;
      var obligationRate = completed / (total || 1);

      fetch(GAMES_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'generateTrustScore', memberId: _memberId, sessionId: _session })
      })
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var trustOverall = (d && d.success && d.scores && typeof d.scores.overall === 'number') ? d.scores.overall : 50;
        var percent = Math.round((obligationRate * 0.6 * 100) + (trustOverall * 0.4));
        percent = Math.min(100, Math.max(0, percent));
        var tier = percent >= 80 ? 'resonant' : percent >= 60 ? 'alive' : percent >= 40 ? 'growing' : percent >= 20 ? 'stirring' : 'first-step';
        _trustScores = d.success ? d.scores : null;
        fetch(GAMES_URL, { method: 'POST', body: JSON.stringify({ action: 'getTrustCertificate', memberId: _memberId }) })
        .then(function(cr) { return cr.json(); })
        .then(function(cd) {
          var certified = cd && cd.certified;
          contribCont.innerHTML = buildAlivenessRow({ alivenessLabel: tier, alivenessPercent: percent, witnessCount: 0 }, _lang);
          var tsc = document.getElementById('pwsTrustScoreCascade');
          if (tsc) tsc.innerHTML = renderTrustScoreCard(_trustScores, certified);
        })
        .catch(function() {
          contribCont.innerHTML = buildAlivenessRow({ alivenessLabel: tier, alivenessPercent: percent, witnessCount: 0 }, _lang);
        });
      })
      .catch(function() {
        var percent = Math.round(obligationRate * 100);
        var tier = percent >= 80 ? 'resonant' : percent >= 60 ? 'alive' : percent >= 40 ? 'growing' : percent >= 20 ? 'stirring' : 'first-step';
        contribCont.innerHTML = buildAlivenessRow({ alivenessLabel: tier, alivenessPercent: percent, witnessCount: 0 }, _lang);
      });
    }
  }

  window.pwsToggleObs = function pwsToggleObs(idx) {
    if (!_obsData || !_obsData.confirmedObs) return;
    var ob = _obsData.confirmedObs[idx]; if (!ob) return;
    var states = ['not-started', 'in-progress', 'crushing'];
    ob.state = states[(states.indexOf(ob.state || 'not-started') + 1) % states.length];
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
      data: { confirmedObs: _obsData.confirmedObs, hateList: _obsData.hateList || [], wishList: _obsData.wishList || [], whatMatters: _obsData.whatMatters || '' } });
    pwsRenderStationTile(); pwsRenderToolsTile(); pwsUpdateAccordionStatus();
  };

  window.pwsDeleteObs = function pwsDeleteObs(idx) {
    if (!_obsData || !_obsData.confirmedObs) return;
    _obsData.confirmedObs.splice(idx, 1);
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
      data: { confirmedObs: _obsData.confirmedObs, hateList: _obsData.hateList || [], wishList: _obsData.wishList || [], whatMatters: _obsData.whatMatters || '' } });
    pwsRenderStationTile();
    pwsRenderToolsTile();
    pwsUpdateAccordionStatus();
  };

  function pwsRenderToolsTile() {
    var container = document.getElementById('pwsToolCards');
    if (!container) return;
    if (!_toolsData || !_toolsData.confirmedTools || !_toolsData.confirmedTools.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">No tools configured yet. Complete My Tools &amp; Entertainment in Studio first.</span><span class="es">A\u00fan no hay herramientas configuradas.</span></p><button class="pws-goto-studio-btn" onclick="window.top.location.href=\u0027/studio\u0027"><span class="en">\u2192 Go to Studio</span><span class="es">\u2192 Ir al Studio</span></button></div>';
      pwsUpdateSavedLabel('pwsToolsSaved', null); return;
    }
    var validTools = _toolsData.confirmedTools.filter(pwsIsValidTool);
    if (!validTools.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">No tools configured yet.</span><span class="es">A\u00fan no hay herramientas.</span></p><button class="pws-goto-studio-btn" onclick="window.top.location.href=\u0027/studio\u0027"><span class="en">\u2192 Go to Studio</span><span class="es">\u2192 Ir al Studio</span></button></div>';
      pwsUpdateSavedLabel('pwsToolsSaved', _toolsData.lastSavedAt); return;
    }
    var allWindowsComplete = _adherenceData && _adherenceData.allWindowsComplete === true;
    container.innerHTML = '';

    // -------------------------------------------------------
    // TEMPLATE NAME DISPLAY — Item 4
    // Show the member's named system at the top of the tile.
    // -------------------------------------------------------
    if (_toolsData.templateName) {
      var nameHeader = document.createElement('div');
      nameHeader.style.cssText = 'font-family:\'Cinzel\',serif;font-size:20px !important;letter-spacing:0.18em;color:rgba(200,168,75,0.75);text-transform:uppercase;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid rgba(200,168,75,0.15);display:flex;align-items:center;justify-content:space-between;';
      nameHeader.innerHTML = '<span>\u2605 ' + escHtml(_toolsData.templateName) + '</span>'
        + '<button id="pwsRenameSystemBtn" style="font-family:\'Cinzel\',serif;font-size:13px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(200,168,75,0.4);background:transparent;border:none;cursor:pointer;padding:2px 6px;" title="Rename">'
        + '<span class="en">Rename</span><span class="es">Renombrar</span>'
        + '</button>';
      container.appendChild(nameHeader);
      pwsApplyLang();
      var renameBtn = document.getElementById('pwsRenameSystemBtn');
      if (renameBtn) {
        renameBtn.addEventListener('click', function() {
          _toolsData.templateName = null;
          pwsShowTemplateNamingPrompt();
          pwsRenderToolsTile();
        });
      }
    }

    /* ── Group talent tools by obligation ──────────────────────────────
       Talent tools (isTalent === true) sharing the same obligation string
       render as ONE grouped card with all their tool buttons inside.
       Non-talent tools render as individual cards exactly as before.
    ──────────────────────────────────────────────────────────────────── */

    var talentGroups = {};
    var talentGroupOrder = [];
    var nonTalentTools = [];

    validTools.forEach(function(t, idx) {
      if (t.isTalent === true || t.type === 'talent') {
        var obl = t.obligation || 'My Project';
        if (!talentGroups[obl]) {
          talentGroups[obl] = { obligation: obl, tools: [] };
          talentGroupOrder.push(obl);
        }
        talentGroups[obl].tools.push({ tool: t, validIdx: idx });
      } else {
        nonTalentTools.push({ tool: t, validIdx: idx });
      }
    });

    talentGroupOrder.forEach(function(obl) {
      var group = talentGroups[obl];
      var isMainProject = group.tools.length > 0 && (group.tools[0].tool.type === 'main' ||
        (_twsProject && _twsProject.title === obl && _twsProject.type === 'main'));
      var configuredCount = group.tools.filter(function(item) { return item.tool.configured === true; }).length;
      var subtitle = configuredCount === group.tools.length
        ? (_lang === 'es' ? 'Todo configurado' : 'All configured')
        : (configuredCount + ' of ' + group.tools.length + (_lang === 'es' ? ' configurados' : ' configured'));

      var groupCard = document.createElement('div');
      groupCard.className = 'pws-tool-card unlocked';
      groupCard.style.position = 'relative';
      if (isMainProject) { groupCard.style.borderColor = 'rgba(200,168,75,0.55)'; }

      var lockDiv = document.createElement('div');
      lockDiv.className = 'pws-tool-lock';
      var lockIcon = document.createElement('div');
      lockIcon.className = 'pws-tool-lock-icon';
      lockDiv.appendChild(lockIcon);
      groupCard.appendChild(lockDiv);

      var infoDiv = document.createElement('div');
      infoDiv.className = 'pws-tool-info';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'pws-tool-name';
      if (isMainProject) { nameDiv.style.color = '#c8a84b'; }
      nameDiv.textContent = obl;
      var oblDiv = document.createElement('div');
      oblDiv.className = 'pws-tool-obligation';
      oblDiv.textContent = subtitle;
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(oblDiv);
      groupCard.appendChild(infoDiv);

      var actionDiv = document.createElement('div');
      actionDiv.className = 'pws-tool-action';
      var activateBtn = document.createElement('button');
      activateBtn.className = 'pws-tool-open-btn';
      activateBtn.innerHTML = '<span class="en">Activate</span><span class="es">Activar</span>';
      var firstValidIdx = group.tools[0].validIdx;
      (function(vi) {
        activateBtn.addEventListener('click', function() { pwsOpenUse(vi); });
      }(firstValidIdx));
      actionDiv.appendChild(activateBtn);
      groupCard.appendChild(actionDiv);

      var delGroupBtn = document.createElement('button');
      delGroupBtn.className = 'pws-tool-delete-btn';
      delGroupBtn.textContent = '\u2715';
      delGroupBtn.title = _lang === 'es' ? 'Eliminar proyecto' : 'Remove project tools';
      delGroupBtn.addEventListener('click', function(ev) {
        ev.stopPropagation();
        _toolsData.confirmedTools = _toolsData.confirmedTools.filter(function(ct) {
          return !(ct.obligation === obl && (ct.isTalent === true || ct.type === 'talent'));
        });
        post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
          data: pwsToolsPayload() });
        pwsRenderToolsTile();
      });
      groupCard.appendChild(delGroupBtn);

      container.appendChild(groupCard);
    });

    nonTalentTools.forEach(function(item) {
      var t = item.tool;
      var idx = item.validIdx;
      var shortTitle = pwsShortTitle(t.en || '');
      var level = t.surrogateLevel || 'alone';
      var isIndependent = (level === 'alone' || level === 'surrogate-alone');
      var isCheck = (level === 'check' || level === 'surrogate-check');
      var isFull = (level === 'full' || level === 'surrogate-full');
      var isUnlocked = isIndependent || (isCheck && allWindowsComplete) || (isFull && pwsIsToolUnlocked(t));

      var card = document.createElement('div');
      card.className = 'pws-tool-card' + (isUnlocked ? ' unlocked' : '');
      card.setAttribute('data-tool-idx', idx);

      var lockDiv = document.createElement('div');
      lockDiv.className = 'pws-tool-lock';
      var lockIcon = document.createElement('div');
      lockIcon.className = 'pws-tool-lock-icon';
      lockDiv.appendChild(lockIcon);
      card.appendChild(lockDiv);

      var infoDiv = document.createElement('div');
      infoDiv.className = 'pws-tool-info';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'pws-tool-name' + (t._oblDirty ? ' pws-tool-name-dim' : '');
      nameDiv.textContent = t._oblDirty ? 'Obligation unclear' : (t.obligation || shortTitle);
      var oblDiv = document.createElement('div');
      oblDiv.className = 'pws-tool-obligation';
      oblDiv.textContent = shortTitle;
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(oblDiv);
      card.appendChild(infoDiv);

      var actionDiv = document.createElement('div');
      actionDiv.className = 'pws-tool-action';
      if (isUnlocked) {
        var openBtn = document.createElement('button');
        openBtn.className = 'pws-tool-open-btn';
        var isConfigured = t.configured === true;
        openBtn.innerHTML = isConfigured
          ? '<span class="en">&#9654; Launch</span><span class="es">&#9654; Lanzar</span>'
          : '<span class="en">Activate</span><span class="es">Activar</span>';
        if (isConfigured) { openBtn.style.cssText = 'background:rgba(200,168,75,0.18);border:1px solid rgba(200,168,75,0.6);color:#f0e6cc;'; }
        (function(i) { openBtn.addEventListener('click', function() { pwsOpenUse(i, isConfigured); }); }(idx));
        actionDiv.appendChild(openBtn);
      } else if (isFull) {
        var unlockBtn = document.createElement('button');
        unlockBtn.className = 'pws-tool-unlock-btn';
        unlockBtn.innerHTML = '<span class="en">Talk to Doc B</span><span class="es">Habla con Doc B</span>';
        (function(i) { unlockBtn.addEventListener('click', function() { pwsOpenUnlock(i); }); }(idx));
        actionDiv.appendChild(unlockBtn);
      } else {
        var lockedLabel = document.createElement('div');
        lockedLabel.className = 'pws-tool-locked-label';
        lockedLabel.innerHTML = '<span class="en">Keep crushing it</span><span class="es">Sigue adelante</span>';
        actionDiv.appendChild(lockedLabel);
      }
      card.appendChild(actionDiv);

      var delBtn = document.createElement('button');
      delBtn.className = 'pws-tool-delete-btn';
      delBtn.textContent = '\u2715';
      delBtn.title = _lang === 'es' ? 'Eliminar herramienta' : 'Remove tool';
      (function(i) {
        delBtn.addEventListener('click', function(ev) {
          ev.stopPropagation();
          _toolsData.confirmedTools.splice(i, 1);
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
          pwsRenderToolsTile();
        });
      }(idx));
      card.appendChild(delBtn);

      container.appendChild(card);
    });

    pwsUpdateSavedLabel('pwsToolsSaved', _toolsData.lastSavedAt);

    // ── LOCKED BOTTOM ROW: appended after the grid, not inside it ──
    var existingLocked = container.parentNode ? container.parentNode.querySelector('.pws-locked-row') : null;
    if (existingLocked) existingLocked.parentNode.removeChild(existingLocked);

    var lockedRow = document.createElement('div');
    lockedRow.className = 'pws-locked-row';
    lockedRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;';

    // EC card
    var ecTile = document.createElement('div');
    ecTile.style.cssText = 'background:#8B0000;border:1px solid #c8a84b;cursor:pointer;padding:0;overflow:hidden;border-radius:4px;';
    ecTile.addEventListener('click', function() { pwsOpenDeparture('/music', _lang === 'es' ? 'Centro de Entretenimiento' : 'Entertainment Center'); });
    var ecSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ecSvg.setAttribute('viewBox', '0 0 300 120');
    ecSvg.setAttribute('width', '100%');
    ecSvg.setAttribute('height', '120');
    ecSvg.innerHTML =
      '<rect x="0" y="0" width="300" height="120" fill="#8B0000"/>' +
      '<rect x="8" y="8" width="284" height="104" fill="none" stroke="#c8a84b" stroke-width="0.75"/>' +
      '<line x1="8" y1="8" x2="24" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="8" x2="8" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="8" x2="276" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="8" x2="292" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="8" y1="112" x2="24" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="112" x2="8" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="112" x2="276" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="112" x2="292" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<polygon points="150,16 153,24 161,24 155,29 157,37 150,32 143,37 145,29 139,24 147,24" fill="#c8a84b" opacity="0.9"/>' +
      '<polygon points="150,104 153,96 161,96 155,91 157,83 150,88 143,83 145,91 139,96 147,96" fill="#c8a84b" opacity="0.9"/>' +
      '<text x="150" y="68" font-family="Cinzel,serif" font-size="22" font-weight="900" fill="#f0e6cc" text-anchor="middle" letter-spacing="6">ENTERTAINMENT CENTER</text>';
    ecTile.appendChild(ecSvg);

    // Smart Day card
    var sdTile = document.createElement('div');
    sdTile.style.cssText = 'background:#0a1525;border:1px solid #c8a84b;cursor:pointer;padding:0;overflow:hidden;border-radius:4px;box-shadow:0 0 14px rgba(139,26,26,0.35);';
    sdTile.addEventListener('click', function() { window.location.href = '/todos'; });
    var sdSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sdSvg.setAttribute('viewBox', '0 0 300 120');
    sdSvg.setAttribute('width', '100%');
    sdSvg.setAttribute('height', '120');
    sdSvg.innerHTML =
      '<image href="https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/1784260716989-WW09UBO4IAM0LA51BNX7/unsplash-image-aw9cszR7FGU.jpg?format=300w" x="0" y="0" width="300" height="120" preserveAspectRatio="xMidYMid slice" opacity="0.35"/>' +
      '<rect x="8" y="8" width="284" height="104" fill="none" stroke="#c8a84b" stroke-width="0.75"/>' +
      '<line x1="8" y1="8" x2="24" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="8" x2="8" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="8" x2="276" y2="8" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="8" x2="292" y2="24" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="8" y1="112" x2="24" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="8" y1="112" x2="8" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="292" y1="112" x2="276" y2="112" stroke="#c8a84b" stroke-width="1"/><line x1="292" y1="112" x2="292" y2="96" stroke="#c8a84b" stroke-width="1"/>' +
      '<polygon points="150,16 153,24 161,24 155,29 157,37 150,32 143,37 145,29 139,24 147,24" fill="#c8a84b" opacity="0.9"/>' +
      '<polygon points="150,104 153,96 161,96 155,91 157,83 150,88 143,83 145,91 139,96 147,96" fill="#c8a84b" opacity="0.9"/>' +
      '<text x="150" y="68" font-family="Cinzel,serif" font-size="22" font-weight="900" fill="#f0e6cc" text-anchor="middle" letter-spacing="6">SMART DAY</text>';
    sdTile.appendChild(sdSvg);

    lockedRow.appendChild(ecTile);
    lockedRow.appendChild(sdTile);
    if (container.parentNode) container.parentNode.appendChild(lockedRow);
    var eS=container.parentNode?container.parentNode.querySelector('.pws-se-card'):null;
    if(eS) eS.parentNode.removeChild(eS);
    var seCard=document.createElement('div'); seCard.className='pws-se-card';
    seCard.style.cssText='margin-top:12px;display:flex;align-items:center;gap:12px;background:rgba(200,168,75,0.05);border:1px solid rgba(200,168,75,0.22);border-radius:6px;padding:14px 18px;cursor:pointer;';
    seCard.innerHTML='<div style="flex:1;"><div style="font-family:\'Cinzel\',serif;font-size:15px !important;letter-spacing:0.18em;color:#c8a84b;text-transform:uppercase;margin-bottom:4px;"><span class="en">Self Encouragement Time</span><span class="es">Aliento Personal</span></div><div style="font-family:\'Cormorant Garamond\',serif;font-size:20px !important;font-style:italic;color:rgba(240,230,204,0.5);"><span class="en">Soul Scroll + your own voice</span><span class="es">Revelación + tu propia voz</span></div></div><button class="pws-tool-open-btn"><span class="en">► Launch</span><span class="es">► Lanzar</span></button>';
    seCard.querySelector('.pws-tool-open-btn').addEventListener('click',function(ev){ev.stopPropagation();pwsOpenSelfEncouragement();});
    seCard.addEventListener('click',function(){pwsOpenSelfEncouragement();});
    pwsApplyLang();
    if(container.parentNode) container.parentNode.appendChild(seCard);
  }

  var _unlockedTools = {};
  function pwsIsToolUnlocked(t) { var key = (t.obligation || '') + '|' + (t.en || ''); return !!_unlockedTools[key]; }
  function pwsMarkToolUnlocked(t) { var key = (t.obligation || '') + '|' + (t.en || ''); _unlockedTools[key] = true; }

  // Helper: build the canonical tools save payload (always includes templateName)
  function pwsToolsPayload() {
    return {
      confirmedTools:  _toolsData ? (_toolsData.confirmedTools || []) : [],
      addedToolNames:  _toolsData ? (_toolsData.addedToolNames  || []) : [],
      _items:          _toolsData ? (_toolsData._items           || []) : [],
      _projectActivities: _toolsData ? (_toolsData._projectActivities || {}) : {},
      templateName:    _toolsData ? (_toolsData.templateName    || '') : ''
    };
  }

  function pwsShortTitle(rec) {
    var s = (rec || '').replace(/^(I'd suggest|Try|Use|Consider|How about|Check out)\s+/i, '');
    var cut = s.search(/[.,:;!?\n]/);
    var t = (cut > 0 && cut < 60) ? s.substring(0, cut) : s.substring(0, 50);
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function pwsRenderDayTile() {
    var container = document.getElementById('pwsDayList');
    var todosCont = document.getElementById('pwsDayTodos');
    if (!container) return;
    if (!_dayData || !_dayData.finalSchedule || !_dayData.finalSchedule.length) {
      container.innerHTML = '<div class="pws-empty-state"><p class="pws-empty-msg"><span class="en">No schedule yet. Go to Contributions.</span><span class="es">Sin horario. Ve a Contribuciones.</span></p><button class="pws-goto-studio-btn" onclick="var c=document.getElementById(\u0027pwsAccordionRespect\u0027);if(c){c.classList.add(\u0027open\u0027);c.scrollIntoView({behavior:\u0027smooth\u0027,block:\u0027start\u0027});}"><span class="en">\u2192 Go to My Contributions</span><span class="es">\u2192 Ir a Mis Contribuciones</span></button></div>';
      if (todosCont) todosCont.innerHTML = ''; return;
    }
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var current = pwsFindCurrentWindow(schedule);
    var bookendHTML = '';
    if (_dayData.wakeTime || _dayData.bedTime) {
      bookendHTML = '<div class="pws-day-bookends">' +
        (_dayData.wakeTime ? '<span class="pws-day-bookend"><span class="en">Wake: </span><span class="es">Despertar: </span>' + escHtml(_dayData.wakeTime) + '</span>' : '') +
        (_dayData.bedTime ? '<span class="pws-day-bookend"><span class="en">Wind down: </span><span class="es">Relajarse: </span>' + escHtml(_dayData.bedTime) + '</span>' : '') + '</div>';
    }
    var planItems = [], todoItems = [];
    schedule.forEach(function(s, idx) { if (s.isTodo) todoItems.push({ s: s, idx: idx }); else planItems.push({ s: s, idx: idx }); });
    var planNum = 0;
    var planRowsHTML = planItems.map(function(entry) {
      var s = entry.s, idx = entry.idx;
      planNum++;
      var isCurrent = current && s.label === current.label;
      var checkedIn = s._checkedIn || '';
      var timeStr = escHtml(fmtTime(s.derivedTime || s.time || ''));
      var hasObl = false;
      var launchIdx = -1;
      var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
      var sLabel = (s.label || s.activity || '').toLowerCase().trim();
      for (var ti = 0; ti < validTools.length; ti++) {
        var tLabel = (validTools[ti].label || validTools[ti].obligation || validTools[ti].en || '').toLowerCase().trim();
        var tObl   = (validTools[ti].obligation || validTools[ti].label || validTools[ti].en || '').toLowerCase().trim();
        var slotWords = sLabel.replace(/[^a-z\s]/g, '').split(/\s+/).filter(function(w) { return w.length > 3; });
        var toolWords = tObl.replace(/[^a-z\s]/g, '').split(/\s+/).filter(function(w) { return w.length > 3; });
        var hasOverlap = slotWords.some(function(sw) { return toolWords.indexOf(sw) !== -1; });
        if (sLabel && (sLabel === tLabel || sLabel === tObl || hasOverlap)) {
          hasObl    = true;
          launchIdx = ti;
          break;
        }
      }
      var hasNote = s.note && s.note.trim();
      var noteIndicator = hasNote ? '<span class="pws-note-indicator" title="Note">&#x270E;</span>' : '';
      var isGaming = (s.type === 'gaming' || /game/i.test(s.label || ''));
      var isMasterySlot = s.isMastery === true;
      var hasMusicalChem = /focus|flow|calm|energy/i.test(s.chem || '');
      var checkinHTML = '';
      if (s.isProjectSlot) {
        checkinHTML = '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
          '<button class="pws-day-launch-btn" onclick="event.stopPropagation();var c=document.getElementById(\'pwsAccordionTalent\');if(c){c.classList.add(\'open\');c.scrollIntoView({behavior:\'smooth\',block:\'start\'});}">' +
          '<span class="en">&#9654; Go to My Project</span><span class="es">&#9654; Ir a Mi Proyecto</span></button></div>';
      } else if (isMasterySlot) {
        var mStage = s.masteryStage || 1;
        var mStageLabel = ['', 'Discovery', 'Practice', 'Competence', 'Automaticity'][mStage] || '';
        var mProjId = escHtml(s.projectId || '');
        checkinHTML = '<div class="pws-plan-seq-meta" style="color:rgba(200,168,75,0.7);">Stage ' + mStage + ': ' + mStageLabel + '</div>' +
          '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
          '<button class="pws-day-launch-btn" data-mastery-checkin="1" data-mastery-idx="' + idx + '" data-mastery-stage="' + mStage + '" data-mastery-projid="' + mProjId + '">' +
          '<span class="en">\u2713 Check In</span><span class="es">\u2713 Reportar</span></button></div>';
      } else if (isGaming) {
        var counts = pwsCountContributions();
        var allDone = counts.total > 0 && counts.crushing === counts.total;
        if (allDone) {
          checkinHTML = '<div class="pws-checkin-row"><button class="pws-gaming-play-btn" data-gaming-play="scheduled"><span class="en">&#9654; Play Games</span><span class="es">&#9654; Jugar</span></button></div>';
        } else {
          checkinHTML = '<div class="pws-checkin-row" onclick="event.stopPropagation();"><span class="pws-gaming-locked-tag"><span class="en">Almost there \u2014 finish your day</span><span class="es">Ya casi \u2014 termina tu d\u00eda</span></span></div>';
        }
      } else {
        checkinHTML = '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
        '<button class="pws-checkin-btn done' + (checkedIn === 'done' ? ' checked' : '') + '" onclick="pwsCheckinByLabel(' + JSON.stringify(s.label) + ',\'done\')"><span class="en">Done</span><span class="es">Listo</span></button>' +
        '<button class="pws-checkin-btn missed' + (checkedIn === 'missed' ? ' checked' : '') + '" onclick="pwsCheckinByLabel(' + JSON.stringify(s.label) + ',\'missed\')"><span class="en">Missed</span><span class="es">Me lo salt\u00e9</span></button></div>';
      }
      var winCfgKey = s.label || '';
      var winCfg = _windowConfig && winCfgKey && _windowConfig[winCfgKey] ? _windowConfig[winCfgKey] : null;
      if (hasObl) {
        checkinHTML += '<div class="pws-checkin-row" style="margin-top:4px !important;"><button class="pws-day-launch-btn" data-launch-tool="' + launchIdx + '" data-obligation="' + escHtml(validTools[launchIdx] ? (validTools[launchIdx].obligation || validTools[launchIdx].en || '') : '') + '"><span class="en">&#9654; Launch</span><span class="es">&#9654; Lanzar</span></button></div>';
      } else if (winCfg) {
        checkinHTML += '<div class="pws-checkin-row" style="margin-top:4px !important;"><button class="pws-day-launch-btn" data-launch-window="' + escHtml(winCfgKey) + '"><span class="en">&#9654; Launch</span><span class="es">&#9654; Lanzar</span></button></div>';
      }
      return '<div class="pws-plan-seq-row' + (isCurrent ? ' current-window' : '') + '" draggable="true" data-idx="' + idx + '">' +
        '<div class="pws-drag-handle" draggable="false">&#x2261;</div><div class="pws-plan-seq-num">' + planNum + '</div>' +
        '<div class="pws-plan-seq-body">' +
        '<div class="pws-plan-seq-label" onclick="pwsToggleNote(' + idx + ');event.stopPropagation();">' + escHtml(s.label || '') + noteIndicator + '</div>' +
        (s.chem ? '<div class="pws-plan-seq-meta">' + escHtml(s.chem) + (isCurrent ? ' \u2014 <span class="en">Now</span><span class="es">Ahora</span>' : '') + (timeStr ? ' \u00b7 ' + timeStr : '') + '</div>' : (timeStr ? '<div class="pws-plan-seq-meta">' + timeStr + '</div>' : '')) +
        checkinHTML +
        '<div class="pws-item-note-wrap" id="pwsNoteWrap' + idx + '" onclick="event.stopPropagation();"><textarea class="pws-item-note" id="pwsNote' + idx + '" rows="2" placeholder="Add a note \u2014 phone number, link, agenda...">' + escHtml(s.note || '') + '</textarea></div>' +
        '</div></div>';
    }).join('');
    container.innerHTML = bookendHTML + '<div class="pws-day-section-label"><span class="en">My Plan</span><span class="es">Mi Plan</span></div>' +
      (planRowsHTML || '<div class="pws-empty-state" style="padding:10px 0;"><span class="en pws-empty-msg">No scheduled items yet.</span><span class="es pws-empty-msg">Sin actividades programadas a\u00fan.</span></div>');
    pwsWireDrag(container);
    if (todosCont) {
      var todoRowsHTML = todoItems.map(function(entry) {
        var s = entry.s, idx = entry.idx;
        var checkedIn = s._checkedIn || '';
        var hasNote = s.note && s.note.trim();
        var noteIndicator = hasNote ? '<span class="pws-note-indicator" title="Note">&#x270E;</span>' : '';
        return '<div class="pws-plan-seq-row" data-idx="' + idx + '">' +
          '<button class="pws-todo-delete" onclick="pwsDeleteTodo(' + idx + ')">&#x2715;</button>' +
          '<div class="pws-plan-seq-body">' +
          '<div class="pws-plan-seq-label" onclick="pwsToggleNote(' + idx + ');event.stopPropagation();">' + escHtml(s.label || '') + noteIndicator + '</div>' +
          '<div class="pws-checkin-row" onclick="event.stopPropagation();">' +
          '<button class="pws-checkin-btn done' + (checkedIn === 'done' ? ' checked' : '') + '" onclick="pwsCheckinByLabel(' + JSON.stringify(s.label) + ',\'done\')"><span class="en">Done</span><span class="es">Listo</span></button>' +
          '<button class="pws-checkin-btn missed' + (checkedIn === 'missed' ? ' checked' : '') + '" onclick="pwsCheckinByLabel(' + JSON.stringify(s.label) + ',\'missed\')"><span class="en">Missed</span><span class="es">Me lo salt\u00e9</span></button></div>' +
          '<div class="pws-item-note-wrap" id="pwsNoteWrap' + idx + '" onclick="event.stopPropagation();"><textarea class="pws-item-note" id="pwsNote' + idx + '" rows="2" placeholder="Add a note...">' + escHtml(s.note || '') + '</textarea></div>' +
          '</div></div>';
      }).join('');
      todosCont.innerHTML = '<div class="pws-day-section-label" style="margin-top:24px;"><span class="en">My To-Dos</span><span class="es">Mis Tareas</span></div>' + (todoRowsHTML || '');
    }
    pwsUpdateSavedLabel('pwsDaySaved', _dayData.lastSavedAt);
  }

  window.pwsToggleTodo = function pwsToggleTodo(checkbox, activityLabel) {
    var schedule = _dayData && _dayData.finalSchedule ? _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; }) : [];
    var item = schedule.filter(function(s){ return s.label === activityLabel; })[0];
    if (item) item._todoChecked = checkbox.checked;
    var row = checkbox.parentNode;
    if (row) { var txt = row.querySelector('.pws-todo-text'); if (txt) { if (checkbox.checked) txt.classList.add('checked'); else txt.classList.remove('checked'); } }
  };

  window.pwsCheckin = function pwsCheckin(idx, result) {
    if (idx < 0) return;
    if (!_dayData || !_dayData.finalSchedule) return;
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var item = schedule[idx]; if (!item) return;
    item._checkedIn = result;
    pwsSaveDaySchedule();
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: new Date().toISOString().substring(0, 10), windowKey: 'label_' + (item.label || ('window_' + idx)).replace(/\s+/g, '_').toLowerCase(),
      activityLabel: item.label || ('window_' + idx), completed: result === 'done', note: '', lawTag: pwsLawTagFromSlot(item) });
    pwsRenderDayTile();
    var allChecked = schedule.filter(function(s) { return s._checkedIn; });
    var doneCount = schedule.filter(function(s) { return s._checkedIn === 'done'; }).length;
    if (allChecked.length === schedule.length) pwsAdherenceFeedback(doneCount, schedule.length);
  };

  window.pwsCheckinByLabel = function pwsCheckinByLabel(label, result) {
    if (!_dayData || !_dayData.finalSchedule) return;
    var schedule = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false && !_isSkipped(s.label || ''); });
    var item = null;
    var idx = -1;
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].label === label) { item = schedule[i]; idx = i; break; }
    }
    if (!item) return;
    item._checkedIn = result;
    pwsSaveDaySchedule();
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId,
      date: new Date().toISOString().substring(0, 10), windowKey: 'label_' + (item.label || ('window_' + idx)).replace(/\s+/g, '_').toLowerCase(),
      activityLabel: item.label || ('window_' + idx), completed: result === 'done', note: '', lawTag: pwsLawTagFromSlot(item) });
    pwsRenderDayTile();
    var allChecked = schedule.filter(function(s) { return s._checkedIn; });
    var doneCount = schedule.filter(function(s) { return s._checkedIn === 'done'; }).length;
    if (allChecked.length === schedule.length) pwsAdherenceFeedback(doneCount, schedule.length);
  };

  function pwsAdherenceFeedback(done, total) {
    var ratio = total > 0 ? done / total : 0;
    var msgEN, msgES;
    if (ratio >= 1) {
      msgEN = 'You ran it. Every single window.' + NL + NL + 'Three months of this and it stops being a schedule. It becomes who you are.';
      msgES = 'Lo cumpliste. Cada ventana.' + NL + NL + 'Tres meses de esto y deja de ser un horario. Se convierte en qui\u00e9n eres.';
    } else if (ratio >= 0.57) {
      msgEN = 'Strong day. ' + done + ' out of ' + total + ' windows.' + NL + NL + 'The gaps tell us something \u2014 want to look at them together?';
      msgES = 'Buen d\u00eda. ' + done + ' de ' + total + ' ventanas.' + NL + NL + 'Los espacios nos dicen algo \u2014 \u00bfquieres que los revisemos juntos?';
    } else {
      msgEN = 'Something is getting in the way. ' + done + ' out of ' + total + ' today.' + NL + NL + 'Want to talk about it?';
      msgES = 'Algo se est\u00e1 interponiendo. ' + done + ' de ' + total + ' hoy.' + NL + NL + '\u00bfQuieres hablar de ello?';
    }
    pwsOpenDocB();
    setTimeout(function() { pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb'); }, 400);
  }

  function pwsUpdateSavedLabel(elId, isoStr) {
    var el = document.getElementById(elId);
    if (!el || !isoStr) return;
    try { var d = new Date(isoStr); var mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]; el.textContent = (_lang === 'es' ? 'Guardado ' : 'Saved ') + mo + ' ' + d.getDate(); } catch(e) {}
  }

  // BUILD 3: DocBCore integration for header Doc B
  function initDocBCoreHeader() {
    if (typeof DocBCore === 'undefined') { setTimeout(initDocBCoreHeader, 200); return; }
    DocBCore.init({
      inputId:       'pwsDocBInput',
      previewId:     'pwsDocBImgPreview',
      thumbId:       'pwsDocBImgThumb',
      clearBtnId:    'pwsDocBImgClear',
      voiceBtnId:    'pwsDocBVoiceBtn',
      cameraInputId: 'pwsDocBCamInput',
      getLang:       function() { return _lang; }
    });
  }
  setTimeout(initDocBCoreHeader, 400);

  // BUILD 3: Doc B voice greeting on open
  function pwsDocBSpeakGreeting() {
    var now = new Date();
    var h = now.getHours();
    var timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    var current = (_dayData && _dayData.finalSchedule) ? pwsFindCurrentWindow(_dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; })) : null;
    var memberName = localStorage.getItem('4laws-display-name') || 'Eduardo';
    var greetEN, greetES;
    if (current) {
      greetEN = 'Hi ' + memberName + '. It\u2019s ' + timeStr + '. Your ' + current.label + ' window is open. What do you need?';
      greetES = 'Hola ' + memberName + '. Son las ' + timeStr + '. Tu ventana de ' + current.label + ' est\u00e1 abierta. \u00bfQu\u00e9 necesitas?';
    } else {
      greetEN = 'Hi ' + memberName + '. It\u2019s ' + timeStr + '. What do you need?';
      greetES = 'Hola ' + memberName + '. Son las ' + timeStr + '. \u00bfQu\u00e9 necesitas?';
    }
    var greetText = _lang === 'es' ? greetES : greetEN;
    pwsAppendBubble(greetText, 'docb');
    _docbHistory.push({ role: 'assistant', content: greetText });
    if (typeof DocBCore !== 'undefined') {
      setTimeout(function() { DocBCore.speak(greetText, function(){ return _lang; }); }, 200);
    } else if (window.speechSynthesis) {
      var utt = new SpeechSynthesisUtterance(greetText);
      utt.lang = _lang === 'es' ? 'es-US' : 'en-US';
      setTimeout(function() { window.speechSynthesis.speak(utt); }, 200);
    }
  }

  // BUILD 3: Keyword-based navigation routing (fast, no AI)
  function pwsDocBCheckNavCmd(text) {
    var lower = text.toLowerCase().trim();
    var navTrigger = /^(take me to|open|go to|navigate to|launch|start)\s+(.+)$/.exec(lower);
    if (!navTrigger) return false;
    var dest = navTrigger[2].trim();
    var routes = {
      studio:  '/studio',    atelier: '/studio',   'bond room': '/studio',
      todos:   '/todos',     'my day': '/todos',   'to do': '/todos', 'todo': '/todos',
      trust:   'https://www.4lawsacademy.com/pws-trust', 'trust repair': 'https://www.4lawsacademy.com/pws-trust',
      games:   '/games',     'game room': '/games', gaming: '/games',
      music:   '/music',     'music room': '/music',
      pws:     '/pws',
      home:    '/pws',
      community: '/community-talent', talent: '/talent'
    };
    for (var key in routes) {
      if (routes.hasOwnProperty(key) && dest.indexOf(key) !== -1) {
        var url = routes[key];
        var confirmMsg = (_lang === 'es' ? 'Abriendo ' : 'Opening ') + key + '\u2026';
        pwsAppendBubble(confirmMsg, 'docb');
        if (typeof DocBCore !== 'undefined') DocBCore.speak(confirmMsg, function(){ return _lang; });
        setTimeout(function(u) { return function() { window.location.href = u; }; }(url), 700);
        return true;
      }
    }
    return false;
  }

  // BUILD 3: Quick tool shortcuts inline in Doc B feed
  window.pwsDocBQuickTool = function pwsDocBQuickTool(tool) {
    pwsAppendBubble(_lang==='es'?'Abre tu actividad para esto.':'Open your activity for this.','docb');
    if(tool==='cash'||tool==='todos')window.location.href='/todos';
  };

  window.pwsOpenDocB = function pwsOpenDocB() {
    var ov = document.getElementById('pwsDocBOverlay'); if (ov) ov.classList.add('open');
    if (!_docbHistory.length) {
      pwsDocBSpeakGreeting();
    }
    var inp = document.getElementById('pwsDocBInput'); if (inp) setTimeout(function() { inp.focus(); }, 80);
  };
  window.pwsCloseDocB = function pwsCloseDocB() {
    var ov = document.getElementById('pwsDocBOverlay'); if (ov) ov.classList.remove('open');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  function useStopMic() {
    if (_useRecognizer) { try { _useRecognizer.stop(); _useRecognizer.onresult = null; _useRecognizer.onend = null; } catch(e) {} _useRecognizer = null; }
    _useMicActive = false; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleUseMic = function pwsToggleUseMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
    if (_useMicActive) { useStopMic(); return; }
    useStopMic(); _useRecognizer = new SR(); _useRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US'; _useRecognizer.continuous = true; _useRecognizer.interimResults = true;
    _useRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsUseInput'); if (inp) inp.value = transcript.trim(); };
    _useRecognizer.onend = function() { _useMicActive = false; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.remove('listening'); };
    _useRecognizer.start(); _useMicActive = true; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.add('listening');
  };

  window.pwsOpenPlanUse = function pwsOpenPlanUse(toolIdx) { if (toolIdx === undefined || toolIdx < 0) return; pwsOpenUse(toolIdx, true); };

  window.pwsOpenUse = function pwsOpenUse(toolIdx, fromLaunch) {
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    // BUILD 1 FIX: accept a pre-built synthetic tool object (window launch from My Day)
    var tool;
    if (typeof toolIdx === 'object' && toolIdx !== null) {
      tool = toolIdx;
    } else {
      tool = validTools[toolIdx];
    }
    if (!tool) return;

    if (tool.isTalent === true || tool.type === 'talent') {
      _useTool = tool;
      var pauseKey = pwsActivatePauseKey();
      var savedRaw = null;
      try { savedRaw = localStorage.getItem(pauseKey); } catch(e) {}
      if (savedRaw) {
        try {
          var saved = JSON.parse(savedRaw);
          if (saved && saved.obligation === tool.obligation) {
            _useHistory = saved.history || [];
            _timerSeconds = saved.timerSeconds || 0;
            _useTool._fromLaunch = false;
            _timerPaused = false;
            var feed = document.getElementById('pwsUseFeed'); if (feed) feed.innerHTML = '';
            var titleEl = document.getElementById('pwsUseTitle'); if (titleEl) titleEl.textContent = tool.obligation || tool.en;
            var ov = document.getElementById('pwsUseOverlay'); if (ov) ov.classList.add('open');
            _useHistory.forEach(function(msg) {
              useAppendBubble(msg.content, msg.role === 'user' ? 'member' : 'docb');
            });
            var allProjToolsR = validTools.filter(function(ct) { return ct.obligation === tool.obligation && (ct.isTalent || ct.type === 'talent'); });
            var cfgR = allProjToolsR.filter(function(ct) { return ct.configured === true; }).length;
            var welcomeEN = 'Welcome back! You\u2019ve configured ' + cfgR + ' of ' + allProjToolsR.length + ' tools. Ready to continue?';
            var welcomeES = '\u00a1Bienvenido de vuelta! Configuraste ' + cfgR + ' de ' + allProjToolsR.length + ' herramientas. \u00bfSeguimos?';
            useAppendBubble(_lang === 'es' ? welcomeES : welcomeEN, 'docb');
            pwsRenderUseFooter(false, false, tool.link);
            var inp = document.getElementById('pwsUseInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
            return;
          }
        } catch(e) {}
      }
    }
    _useTool = tool; _useTool._fromLaunch = !!fromLaunch; _useHistory = []; _timerSeconds = 0; _useStartTime = null; _musicSaved = false; _progShown = false; _useAwaitingDread = false; _useAwaitingReframe = false;
    if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
    var oblKey = (tool.obligation || tool.en || 'tool').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 40);
    _pbKey = 'pws-pb-' + oblKey; _usePB = null;
    try { var pbRaw = localStorage.getItem(_pbKey); if (pbRaw) _usePB = JSON.parse(pbRaw); } catch(e) {}
    var toolFullDesc = tool.en || '';
    var oblLabel = (!tool._oblDirty && tool.obligation) ? tool.obligation : '';
    var toolName = pwsShortTitle(toolFullDesc || oblLabel || 'this tool');
    var isTimer = /timer|sprint|personal best|beat|minutes|seconds|record|how fast|fastest|race|challenge/i.test(toolFullDesc);
    var titleEl = document.getElementById('pwsUseTitle'); if (titleEl) titleEl.textContent = oblLabel || toolName;
    var feed = document.getElementById('pwsUseFeed'); if (feed) feed.innerHTML = '';
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'none';
    var timerDisp = document.getElementById('pwsTimerDisplay'); if (timerDisp) timerDisp.textContent = '0:00';
    var zone3 = document.getElementById('pwsToolPanelZone'); if (zone3) zone3.innerHTML = '';
    var ov = document.getElementById('pwsUseOverlay'); if (ov) ov.classList.add('open');
    var activatingQ = '';
    if (tool.isTalent === true || tool.type === 'talent') {
      var projName = tool.obligation || 'your project';
      var allTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(function(ct) { return ct.obligation === tool.obligation && (ct.isTalent === true || ct.type === 'talent'); }) : [];
      var configuredCount = allTools.filter(function(ct) { return ct.configured === true; }).length;
      var totalCount = allTools.length;
      if (configuredCount === 0) {
        activatingQ = _lang === 'es'
          ? 'Est\u00e1s trabajando en \u201c' + projName + '\u201d. \u00bfCu\u00e1l herramienta quieres configurar primero \u2014 tus enlaces, contactos, cron\u00f3metro, recordatorios? Dime y la configuramos ahora.'
          : 'You\u2019re working on \u201c' + projName + '\u201d. Which tool do you want to set up first \u2014 your links, contacts, timer, reminders? Tell me and we\u2019ll get it configured right now.';
      } else if (configuredCount < totalCount) {
        activatingQ = _lang === 'es'
          ? projName + ' \u2014 ' + configuredCount + ' de ' + totalCount + ' herramientas configuradas. \u00bfCu\u00e1l configuramos hoy?'
          : projName + ' \u2014 ' + configuredCount + ' of ' + totalCount + ' tools configured. Which one are we setting up today?';
      } else {
        activatingQ = _lang === 'es'
          ? '\u00bfC\u00f3mo va ' + projName + ' hoy?'
          : 'How is ' + projName + ' going today?';
      }
    } else if (isTimer && _usePB) {
      activatingQ = _lang === 'es' ? 'Tu mejor tiempo es ' + pwsFmtSeconds(_usePB.best) + '. \u00bfLo superas hoy? Toca INICIAR.' : 'Your personal best is ' + pwsFmtSeconds(_usePB.best) + '. Beat it today? Tap START.';
    } else if (isTimer) {
      activatingQ = _lang === 'es' ? '\u00bfListo para empezar? Toca INICIAR cuando quieras.' : 'Ready to go? Tap START when you\u0027re ready.';
    } else if (!tool.configured) {
      var toolShort = pwsShortTitle(toolFullDesc || tool.obligation || 'this tool');
      activatingQ = _lang === 'es'
        ? 'Vamos a configurar \u201c' + toolShort + '\u201d. \u00bfQu\u00e9 enlaces, recordatorios o contactos necesitas aqu\u00ed? Usa los botones de abajo para agregar cada uno \u2014 cuando termines, esta herramienta estar\u00e1 lista para lanzar.'
        : 'Let\u2019s set up \u201c' + toolShort + '\u201d. What links, reminders, or contacts do you need here? Use the buttons below to add each one \u2014 when you\u2019re done, this tool will be ready to launch.';
    } else {
      activatingQ = _lang === 'es' ? '\u00bfC\u00f3mo lo vamos a hacer hoy?' : 'How are we making this happen today?';
    }

    if (fromLaunch && !tool.configured) {
      var desc2 = toolFullDesc;
      var presel = {
        music:   /music|playlist|song|podcast/i.test(desc2),
        timer:   /timer|sprint|minutes|beat|streak/i.test(desc2),
        links:   /link|video|youtube|article/i.test(desc2),
        contact: /contact|call|text|reach out/i.test(desc2),
        cash:    /cash|pay|earn|money/i.test(desc2),
        remind:  /remind|reminder|alert/i.test(desc2),
        assist:  /help|stuck|question|explain|math|email|search|assist|support|guide|practice|study|write|read/i.test(desc2)
      };

      var preselNames = [];
      if (presel.timer)   preselNames.push(_lang === 'es' ? 'Cron\u00f3metro' : 'Timer');
      if (presel.music)   preselNames.push(_lang === 'es' ? 'Sala de M\u00fasica' : 'Music Room');
      if (presel.links)   preselNames.push(_lang === 'es' ? 'Enlaces' : 'Links');
      if (presel.contact) preselNames.push(_lang === 'es' ? 'Contactos' : 'Contacts');
      if (presel.cash)    preselNames.push(_lang === 'es' ? 'Pedir Dinero' : 'Cash Request');
      if (presel.remind)  preselNames.push(_lang === 'es' ? 'Recordatorios' : 'Reminders');

      var progMsgEN, progMsgES;
      if (preselNames.length) {
        var nameList = preselNames.join(' and ');
        progMsgEN = 'One final step.' + NL + NL +
          'Based on your plan, I\u0027ve set up ' + nameList + ' for this activity. The highlighted buttons are ready. Tap to confirm or adjust anything.' + NL + NL +
          'I\u0027m here to help you as you execute your activity.' + NL + NL +
          'When you finish, launch your games. You earned it.' + NL + NL +
          'Next time you tap Launch, everything runs automatically. No setup. Just go.';
        var nameListES = preselNames.join(' y ');
        progMsgES = 'Un \u00faltimo paso.' + NL + NL +
          'Bas\u00e1ndome en tu plan, he preparado ' + nameListES + ' para esta actividad. Los botones resaltados est\u00e1n listos. Toca para confirmar o ajustar.' + NL + NL +
          'Estoy aqu\u00ed para ayudarte mientras ejecutas tu actividad.' + NL + NL +
          'Cuando termines, lanza tus juegos. Te lo ganaste.' + NL + NL +
          'La pr\u00f3xima vez que toques Lanzar, todo corre autom\u00e1ticamente. Sin configuraci\u00f3n. Solo ve.';
      } else {
        progMsgEN = 'One final step.' + NL + NL +
          'Your tools are below. Click each one as you use it \u2014 start your timer, open your music, pull up your links. ' +
          'I\u0027m here to help you as you execute your activity.' + NL + NL +
          'When you finish, launch your games. You earned it.' + NL + NL +
          'Next time you tap Launch, everything runs automatically. No setup. Just go.';
        progMsgES = 'Un \u00faltimo paso.' + NL + NL +
          'Tus herramientas est\u00e1n abajo. Toca cada una cuando la uses \u2014 inicia tu cron\u00f3metro, abre tu m\u00fasica, accede a tus enlaces. ' +
          'Estoy aqu\u00ed para ayudarte mientras ejecutas tu actividad.' + NL + NL +
          'Cuando termines, lanza tus juegos. Te lo ganaste.' + NL + NL +
          'La pr\u00f3xima vez que toques Lanzar, todo corre autom\u00e1ticamente. Sin configuraci\u00f3n. Solo ve.';
      }

      tool._presel = presel;

      pwsShowPentagonSign(function() {
        var progMsg = _lang === 'es' ? progMsgES : progMsgEN;
        useAppendBubble(progMsg, 'docb');
        _useHistory.push({ role: 'assistant', content: progMsg });

        if (presel.assist) {
          setTimeout(function() {
            if (_progShown) return;
            _progShown = true;
            var feed2 = document.getElementById('pwsUseFeed');
            if (feed2) {
              var questionWrap = document.createElement('div');
              questionWrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-top:10px;padding:14px 16px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.2);';

              var questionLabel = document.createElement('div');
              questionLabel.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:22px !important;color:rgba(240,230,204,0.85);";
              questionLabel.textContent = _lang === 'es'
                ? '\u00bfQuieres Doc Asistente disponible durante esta actividad?'
                : 'Do you want Doc Assist available during this activity?';

              var btnRow = document.createElement('div');
              btnRow.id = 'pwsAssistYesNoRow';
              btnRow.style.cssText = 'display:flex;gap:8px;';

              var yesBtn = document.createElement('button');
              yesBtn.className = 'pws-use-footer-btn pws-launcher-btn';
              yesBtn.style.cssText = 'padding:8px 16px;font-size:16px !important;flex:1;';
              yesBtn.textContent = _lang === 'es' ? 'S\u00cd' : 'YES';

              var noBtn = document.createElement('button');
              noBtn.className = 'pws-use-footer-btn pws-launcher-btn';
              noBtn.style.cssText = 'padding:8px 16px;font-size:14px !important;flex:2;background:transparent;color:rgba(240,230,204,0.4);border:1px solid rgba(240,230,204,0.15);';
              noBtn.textContent = _lang === 'es' ? 'NO \u2014 YO PUEDO' : 'NO \u2014 I\u0027VE GOT THIS';

              yesBtn.addEventListener('click', function() {
                questionWrap.parentNode.removeChild(questionWrap);
                pwsHandleAssistYesNo('yes');
              });

              noBtn.addEventListener('click', function() {
                questionWrap.parentNode.removeChild(questionWrap);
                pwsHandleAssistYesNo('no');
              });

              btnRow.appendChild(yesBtn);
              btnRow.appendChild(noBtn);
              questionWrap.appendChild(questionLabel);
              questionWrap.appendChild(btnRow);
              feed2.appendChild(questionWrap);
              feed2.scrollTop = feed2.scrollHeight;
            }
          }, 600);
        }

      });
    } else {
      var openingEN, openingES, openingMsg;

      // -------------------------------------------------------
      // MENTAL FILTER — Item 1
      // If the tool has a saved mentalFilter frame, show it first
      // before the activating question. Provides the reframe on
      // every LAUNCH without the member having to think about it.
      // -------------------------------------------------------
      var filterPrefix = '';
      if (tool.mentalFilter && tool.mentalFilter.length) {
        filterPrefix = (_lang === 'es')
          ? '\uD83D\uDCA1 Tu marco para esta actividad: ' + tool.mentalFilter + NL + NL
          : '\uD83D\uDCA1 Your frame for this: ' + tool.mentalFilter + NL + NL;
      }

      if (tool.isTalent === true || tool.type === 'talent') {
        openingEN = filterPrefix + activatingQ;
        openingES = filterPrefix + activatingQ;
      } else {
        openingEN = filterPrefix + 'We built this together:' + NL + NL + toolFullDesc + NL + NL + activatingQ;
        openingES = filterPrefix + 'Lo construimos juntos:' + NL + NL + toolFullDesc + NL + NL + activatingQ;
      }
      openingMsg = _lang === 'es' ? openingES : openingEN;
      useAppendBubble(openingMsg, 'docb');
      _useHistory.push({ role: 'assistant', content: openingMsg });

      // -------------------------------------------------------
      // MENTAL FILTER DREAD PROMPT
      // For newly added tools that don't yet have a mentalFilter,
      // ask the dread question after the opening message so Doc B
      // can capture a frame and save it.
      // -------------------------------------------------------
      if (!tool.mentalFilter && !tool.configured) {
        var dreadQ = (_lang === 'es')
          ? '\u00bfC\u00f3mo te sientes con esta actividad \u2014 es algo que esperas con ganas o tiendes a posponerla?'
          : 'One quick question \u2014 is this something you look forward to, or do you tend to dread it?';
        setTimeout(function() {
          useAppendBubble(dreadQ, 'docb');
          _useHistory.push({ role: 'assistant', content: dreadQ });
          _useAwaitingDread = true;
        }, 600);
      }
    }
    pwsRenderUseFooter(isTimer, false, tool.link);

    // Reframe button — visible inside USE overlay when mentalFilter exists or tool is configured
    (function() {
      var existingReframe = document.getElementById('pwsReframeBtn');
      if (existingReframe) existingReframe.parentNode.removeChild(existingReframe);
      var header = document.querySelector('#pwsUsePanel .pws-unlock-header');
      if (!header) return;
      var rfBtn = document.createElement('button');
      rfBtn.id = 'pwsReframeBtn';
      rfBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:16px !important;letter-spacing:0.12em;text-transform:uppercase;color:rgba(200,168,75,0.6);background:transparent;border:1px solid rgba(200,168,75,0.2);border-radius:3px;padding:4px 10px;cursor:pointer;white-space:nowrap;transition:color 0.2s,border-color 0.2s;';
      rfBtn.innerHTML = '<span class="en">Reframe</span><span class="es">Reencuadrar</span>';
      pwsApplyLang();
      rfBtn.addEventListener('click', function() {
        // Open Wisdom/Revelations page in new tab
        window.open('https://www.4lawsacademy.com/course-revelations', '_blank');
        // Also send a reframe prompt to Doc B
        var reframeQ = (_lang === 'es')
          ? '\u00bfQu\u00e9 marco te ayuda con esta actividad cuando se pone dif\u00edcil?'
          : 'What frame helps you with this when it gets hard?';
        useAppendBubble(reframeQ, 'docb');
        _useHistory.push({ role: 'assistant', content: reframeQ });
        _useAwaitingReframe = true;
        var inp = document.getElementById('pwsUseInput'); if (inp) { inp.focus(); }
      });
      var closeBtn = header.querySelector('.pws-docb-close');
      if (closeBtn && closeBtn.parentNode) { closeBtn.parentNode.insertBefore(rfBtn, closeBtn); }
    }());
    if (tool.configured && tool.links && tool.links.length) {
      setTimeout(pwsToggleLinksPanel, 120);
    }
    var inp = document.getElementById('pwsUseInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
  };

  function pwsRenderUseFooter(isTimer, isMedia, savedLink) {
    var footer = document.getElementById('pwsUseFooter');
    if (!footer) return;
    footer.innerHTML = '';

    var presel = (_useTool && _useTool._presel) ? _useTool._presel : {};

    if (savedLink) {
      var btnPlay = document.createElement('button');
      btnPlay.className = 'pws-use-footer-btn open-music';
      btnPlay.id = 'pwsUsePlayBtn';
      btnPlay.textContent = _lang === 'es' ? '\u25b6 Reproducir' : '\u25b6 Play';
      btnPlay.onclick = function() { pwsOpenDeparture(savedLink, (_useTool && _useTool.en) ? _useTool.en : savedLink); };
      footer.appendChild(btnPlay);
    }

    var grid = document.createElement('div');
    grid.className = 'pws-launcher-grid';

    var btnMusic = document.createElement('button');
    btnMusic.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.music ? ' pws-launcher-presel' : '');
    btnMusic.textContent = '\uD83C\uDFB5 ' + (_lang === 'es' ? 'Sala de M\u00fasica' : 'Music Room');
    btnMusic.onclick = function() { pwsOpenDeparture('/music', _lang === 'es' ? 'Sala de Musica' : 'Music Room'); };
    grid.appendChild(btnMusic);

    var pbLabel = _usePB
      ? (_lang === 'es' ? '\u23F1 Mejor: ' + pwsFmtSeconds(_usePB.best) : '\u23F1 Best: ' + pwsFmtSeconds(_usePB.best))
      : (_lang === 'es' ? '\u23F1 Iniciar Cron\u00f3metro' : '\u23F1 Start Timer');
    var btnTimer = document.createElement('button');
    btnTimer.className = 'pws-use-footer-btn start-timer pws-launcher-btn' + (presel.timer ? ' pws-launcher-presel' : '');
    btnTimer.id = 'pwsUseStartTimerBtn';
    btnTimer.textContent = pbLabel;
    btnTimer.onclick = pwsStartTimer;
    grid.appendChild(btnTimer);

    var counts = pwsCountContributions();
    var btnGames = document.createElement('button');
    btnGames.className = 'pws-use-footer-btn pws-launcher-btn';
    if (counts.total > 0 && counts.crushing === counts.total) {
      btnGames.textContent = '\uD83C\uDFAE ' + (_lang === 'es' ? 'Jugar' : 'Play Games');
      btnGames.onclick = function() { pwsOpenDeparture('/games?unlock=scheduled', 'Games'); };
    } else if (counts.crushing > 0) {
      btnGames.textContent = '\uD83C\uDFAE ' + (_lang === 'es' ? 'Jugar' : 'Play Games');
      btnGames.onclick = function() { pwsOpenDeparture('/games?unlock=free', 'Games'); };
    } else {
      btnGames.textContent = '\uD83C\uDFAE ' + (_lang === 'es' ? 'Juegos \u2014 termina tu d\u00eda primero' : 'Games \u2014 finish your day first');
      btnGames.disabled = true;
      btnGames.style.opacity = '0.35';
      btnGames.style.cursor = 'default';
    }
    grid.appendChild(btnGames);

    var btnReminders = document.createElement('button');
    btnReminders.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.remind ? ' pws-launcher-presel' : '');
    btnReminders.textContent = '\uD83D\uDD14 ' + (_lang === 'es' ? 'Recordatorios' : 'Reminders');
    btnReminders.addEventListener('click', pwsToggleReminderPanel);
    grid.appendChild(btnReminders);

    var btnLinks = document.createElement('button');
    btnLinks.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.links ? ' pws-launcher-presel' : '');
    btnLinks.textContent = '\uD83D\uDD17 ' + (_lang === 'es' ? 'Enlaces' : 'Links');
    btnLinks.addEventListener('click', pwsToggleLinksPanel);
    grid.appendChild(btnLinks);

    var btnCash = document.createElement('button');
    btnCash.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.cash ? ' pws-launcher-presel' : '');
    btnCash.textContent = '\uD83D\uDCB0 ' + (_lang === 'es' ? 'Pedir Dinero' : 'Cash Request');
    btnCash.addEventListener('click', pwsToggleCashPanel);
    grid.appendChild(btnCash);

    var btnContacts = document.createElement('button');
    btnContacts.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.contact ? ' pws-launcher-presel' : '');
    btnContacts.textContent = '\uD83D\uDCE8 ' + (_lang === 'es' ? 'Contactos' : 'Contacts');
    btnContacts.addEventListener('click', pwsToggleContactsPanel);
    grid.appendChild(btnContacts);

    if (_useTool && _useTool.hasAssist) {
      var btnAssist = document.createElement('button');
      btnAssist.className = 'pws-use-footer-btn pws-launcher-btn' + (presel.assist ? ' pws-launcher-presel' : '');
      btnAssist.textContent = '\uD83E\uDD16 ' + (_lang === 'es' ? 'DOC ASISTENTE' : 'DOC ASSIST');
      btnAssist.addEventListener('click', pwsToggleAssistChat);
      grid.appendChild(btnAssist);
    }

    footer.appendChild(grid);

    if (!_useTool || !_useTool.configured) {
      var btnCfg = document.createElement('button');
      btnCfg.className = 'pws-use-footer-btn pws-launcher-done';
      btnCfg.id = 'pwsDoneConfiguringBtn';
      btnCfg.textContent = _lang === 'es' ? '\u2713 Listo, Configurado' : '\u2713 Done Configuring';
      btnCfg.onclick = function() {
        if (_useTool && _toolsData && _toolsData.confirmedTools) {
          _toolsData.confirmedTools.forEach(function(t) {
            if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.configured = true; }
          });
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
          pwsRenderToolsTile();
        }
        useAppendBubble(_lang === 'es' ? 'Configurado. La pr\u00f3xima vez lo ver\u00e1s listo para lanzar.' : 'Configured. Next time you\u2019ll see it ready to launch.', 'docb');
        var cfgBtn = document.getElementById('pwsDoneConfiguringBtn');
        if (cfgBtn) cfgBtn.parentNode.removeChild(cfgBtn);
        var btnD = document.createElement('button');
        btnD.className = 'pws-use-footer-btn pws-launcher-done';
        btnD.id = 'pwsUseMarkDoneBtn';
        btnD.textContent = _lang === 'es' ? '\u2713 Marcar como Listo' : '\u2713 Mark Done';
        btnD.onclick = pwsMarkDone;
        footer.appendChild(btnD);
      };
      footer.appendChild(btnCfg);
    } else {
      var btnDone = document.createElement('button');
      btnDone.className = 'pws-use-footer-btn pws-launcher-done';
      btnDone.id = 'pwsUseMarkDoneBtn';
      btnDone.textContent = _lang === 'es' ? '\u2713 Marcar como Listo' : '\u2713 Mark Done';
      btnDone.onclick = pwsMarkDone;
      footer.appendChild(btnDone);
    }

    var btnSaveChatTop = document.createElement('button');
    btnSaveChatTop.className = 'pws-use-footer-btn pws-launcher-done';
    btnSaveChatTop.id = 'pwsUseSaveChatBtn';
    btnSaveChatTop.style.cssText = 'font-size:12px !important;letter-spacing:0.14em;opacity:0.8;padding:8px 20px;border:1px solid rgba(200,168,75,0.4);';
    btnSaveChatTop.textContent = _lang === 'es' ? '\u2193 Guardar Chat' : '\u2193 Save Chat';
    btnSaveChatTop.addEventListener('click', function() {
      if (!_useHistory || !_useHistory.length) return;
      var winName = (_useTool && (_useTool.obligation || _useTool.en)) ? (_useTool.obligation || _useTool.en) : 'Session';
      var lines = [winName + ' \u2014 Doc B Chat', new Date().toLocaleString(), ''];
      _useHistory.forEach(function(m) {
        var role = m.role === 'user' ? 'You' : 'Doc B';
        var content2 = typeof m.content === 'string' ? m.content : '[image]';
        lines.push(role + ': ' + content2);
        lines.push('');
      });
      var blob2 = new Blob([lines.join('\n')], { type: 'text/plain' });
      var url2 = URL.createObjectURL(blob2);
      var a2 = document.createElement('a');
      a2.href = url2;
      a2.download = winName.replace(/\s+/g,'_') + '_chat_' + new Date().toISOString().substring(0,10) + '.txt';
      a2.click();
      URL.revokeObjectURL(url2);
    });
    footer.appendChild(btnSaveChatTop);

    if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
      var btnSave = document.createElement('button');
      btnSave.className = 'pws-use-footer-btn pws-launcher-done';
      btnSave.style.cssText = 'font-size:12px !important;letter-spacing:0.14em;opacity:0.6;padding:8px 20px;';
      btnSave.textContent = _lang === 'es' ? '\u2193 Guardar Sesi\u00f3n' : '\u2193 Save Session';
      btnSave.addEventListener('click', function() {
        var projName = (_useTool && _useTool.obligation) ? _useTool.obligation : 'Project';
        var lines = [projName + ' \u2014 ACTIVATE Session', new Date().toLocaleString(), ''];
        _useHistory.forEach(function(m) {
          lines.push((m.role === 'user' ? 'You: ' : 'Doc B: ') + m.content);
          lines.push('');
        });
        var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = projName.replace(/\s+/g,'_') + '_session_' + new Date().toISOString().substring(0,10) + '.txt';
        a.click();
        URL.revokeObjectURL(url);
      });
      footer.appendChild(btnSave);
    }

    footer.style.display = 'flex';
    footer.style.flexDirection = 'column';
    footer.style.gap = '8px';
  }

  window.pwsCloseUse = function pwsCloseUse() {
    useStopMic(); if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }

    var hadSession = (_useStartTime !== null) || (_musicSaved === true) || (document.getElementById('pwsUseMarkDoneBtn') === null);
    if (hadSession && _useTool && _toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.configured = true; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });

      if (_useTool.isTalent === true) {
        if (!_dayData) _dayData = {};
        if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
        var slotObligation = _useTool.obligation || '';
        var alreadyExists = false;
        for (var dsi = 0; dsi < _dayData.finalSchedule.length; dsi++) {
          var slot = _dayData.finalSchedule[dsi];
          if (slot.isMastery && (slot.label === slotObligation + ' Practice' || slot.obligation === slotObligation)) {
            alreadyExists = true; break;
          }
        }
        if (!alreadyExists && slotObligation) {
          _dayData.finalSchedule.push({
            label:        slotObligation + ' Practice',
            activity:     slotObligation + ' Practice',
            obligation:   slotObligation,
            stage:        'Stage 1: Discovery',
            isTalent:     true,
            isMastery:    true,
            projectId:    _useTool.projectId || '',
            masteryStage: 1,
            type:         'obligation',
            ownsIt:       true
          });
          pwsSaveDaySchedule();
          pwsRenderDayTile();
        }
      }
    }

    if (_useStartTime && _useTool) {
      var elapsed = Math.round((Date.now() - _useStartTime) / 1000);
      post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId, date: new Date().toISOString().substring(0, 10), windowKey: 'tool_abandoned_' + oblKeyFromTool(), activityLabel: (_useTool.obligation || 'tool use'), completed: false, note: 'abandoned after ' + pwsFmtSeconds(elapsed), lawTag: pwsLawTag(_useTool) });
    }
    var ov = document.getElementById('pwsUseOverlay'); if (ov) ov.classList.remove('open');
    var footer = document.getElementById('pwsUseFooter'); if (footer) { footer.innerHTML = ''; footer.style.display = 'none'; }
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'none';
    if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) { pwsClearActivateSession(); }
    _useTool = null; _useHistory = []; _timerSeconds = 0; _timerStart = null; _useStartTime = null; _pbKey = null; _usePB = null; _musicSaved = false; _progShown = false; _useAwaitingDread = false; _useAwaitingReframe = false;
    if (typeof DocBCore !== 'undefined') { DocBCore.clearPending(); }
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); }
  };

  window.pwsSendUse = function pwsSendUse() {
    var inp = document.getElementById('pwsUseInput');
    var text = inp ? inp.value.trim() : '';
    var hasPending = (typeof DocBCore !== 'undefined') && !!DocBCore.getPending();
    if (!text && !hasPending) return;
    if (inp) inp.value = '';
    useStopMic();

    var displayText = (typeof DocBCore !== 'undefined') ? DocBCore.displayText(text, function(){ return _lang; }) : text;
    var userContent = (typeof DocBCore !== 'undefined') ? DocBCore.buildContent(text, function(){ return _lang; }) : text;

    useAppendBubble(displayText, 'member');
    _useHistory.push({ role: 'user', content: userContent });

    // -------------------------------------------------------
    // MENTAL FILTER INTERCEPTS
    // -------------------------------------------------------
    if (_useAwaitingDread && _useTool) {
      _useAwaitingDread = false;
      var dreadText = text.toLowerCase();
      var isDread = /dread|avoid|hate|hard|struggle|don't want|dont want|resist|not look|not forward|tempt|difficult|tough|not enjoy/i.test(dreadText);
      var isExcited = /look forward|excited|love|enjoy|can't wait|cant wait|like|happy|great|good|easy|want to/i.test(dreadText);

      if (isDread || (!isExcited && dreadText.length > 3)) {
        // They dread it — ask for the frame
        var frameAskEN = 'Got it. That honesty matters. What would make this feel more like YOUR choice instead of a burden \u2014 even one word or phrase?';
        var frameAskES = 'Entendido. Esa honestidad importa. \u00bfQu\u00e9 har\u00eda que esto se sintiera m\u00e1s como TU elecci\u00f3n en lugar de una carga \u2014 aunque sea una palabra o frase?';
        var frameAsk = _lang === 'es' ? frameAskES : frameAskEN;
        useAppendBubble(frameAsk, 'docb');
        _useHistory.push({ role: 'assistant', content: frameAsk });
        _useAwaitingReframe = true;
        return;
      } else {
        // They're excited — acknowledge and move on
        var excitedMsgEN = 'That energy is the fuel. Let\u2019s go \u2014 ' + (_useTool.en || 'this activity') + ' is ready for you.';
        var excitedMsgES = 'Esa energ\u00eda es el combustible. Vamos \u2014 ' + (_useTool.en || 'esta actividad') + ' te est\u00e1 esperando.';
        useAppendBubble(_lang === 'es' ? excitedMsgES : excitedMsgEN, 'docb');
        _useHistory.push({ role: 'assistant', content: _lang === 'es' ? excitedMsgES : excitedMsgEN });
        return;
      }
    }

    if (_useAwaitingReframe && _useTool) {
      _useAwaitingReframe = false;
      var theFrame = text.trim();
      if (theFrame.length > 1) {
        // Save the mental filter to the tool object
        _useTool.mentalFilter = theFrame;
        if (_toolsData && _toolsData.confirmedTools) {
          var mfIdx;
          for (mfIdx = 0; mfIdx < _toolsData.confirmedTools.length; mfIdx++) {
            var mfTool = _toolsData.confirmedTools[mfIdx];
            if (mfTool.en === _useTool.en && mfTool.obligation === _useTool.obligation) {
              _toolsData.confirmedTools[mfIdx].mentalFilter = theFrame;
              break;
            }
          }
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
            data: pwsToolsPayload()
          }).catch(function() {});
        }
        var savedFrameEN = '\u2728 Saved: \u201c' + theFrame + '\u201d \u2014 that\u2019s your frame. Every time you launch this, you\u2019ll see it first.';
        var savedFrameES = '\u2728 Guardado: \u201c' + theFrame + '\u201d \u2014 ese es tu marco. Cada vez que lances esto, lo ver\u00e1s primero.';
        useAppendBubble(_lang === 'es' ? savedFrameES : savedFrameEN, 'docb');
        _useHistory.push({ role: 'assistant', content: _lang === 'es' ? savedFrameES : savedFrameEN });
      }
      return;
    }
    // -------------------------------------------------------

    var typingId = 'pws-use-typing-' + Date.now();
    var feed = document.getElementById('pwsUseFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }
    var toolFullDesc = _useTool ? (_useTool.en || '') : '';
    var pbContext = _usePB ? ('Personal best: ' + pwsFmtSeconds(_usePB.best) + '. Last session: ' + (_usePB.lastSeconds ? pwsFmtSeconds(_usePB.lastSeconds) : 'n/a') + ' on ' + (_usePB.lastDate || 'unknown') + '. Total completions: ' + (_usePB.count || 1) + '.') : '';
    var forcedOpener, systemPrompt;
    var imgCapability = 'IMAGE CAPABILITY: You can receive and describe screenshots and photos. If the member shares an image, describe what you see and connect it to their work.\n\n';
    if (_useTool && (_useTool.isTalent === true || _useTool.type === 'talent')) {
      var projName = _useTool.obligation || 'your project';
      var allProjTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(function(ct) { return ct.obligation === _useTool.obligation && (ct.isTalent === true || ct.type === 'talent'); }) : [];
      var cfgCount = allProjTools.filter(function(ct) { return ct.configured === true; }).length;
      var totalCt = allProjTools.length;
      var toolNames = allProjTools.map(function(ct) { return ct.en || ''; }).filter(Boolean).join(', ');
      forcedOpener = _useTool.obligation + ' \u2014 ' + cfgCount + ' of ' + totalCt + ' tools configured.';
      systemPrompt = imgCapability + 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' + NL +
        'The member is working on their talent project: "' + projName + '".' + NL +
        'Available tools for this project: ' + toolNames + '.' + NL +
        'Configured so far: ' + cfgCount + ' of ' + totalCt + '.' + NL +
        'Your job: help them configure each tool specifically for this project. Ask what links, contacts, reminders, or timer settings they want for each one. One tool at a time.' + NL +
        'When they describe a setting, confirm it and tell them it is saved. Be warm, direct, brief. 2-3 sentences max.' + NL +
        'Do NOT ask generic coaching questions. This is a setup session, not a reflection session.' + NL +
        'Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    } else if (_useTool && _useTool._fromLaunch && !_useTool.configured) {
      forcedOpener = 'One final step. Your tools are below. I\u0027m here to help you as you execute your activity.';
      systemPrompt = imgCapability + 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' + NL +
        'The member\u0027s tool prescription is: ' + toolFullDesc + NL +
        'Use it as background context only. Do not quote it back. Do not summarize it. Ask one focused question at a time to help them execute their activity right now.' + NL +
        'Stay warm, present, and direct. 2\u20133 sentences max. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    } else {
      forcedOpener = 'We built this together:' + NL + NL + toolFullDesc;
      if (pbContext) forcedOpener += NL + NL + pbContext;
      systemPrompt = imgCapability + 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS. Coach this member through their tool. Stay warm, real, on their side. 2\u20133 sentences max. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    }
    var priorTurns = _useHistory.slice(1);
    var messages = [{ role: 'assistant', content: forcedOpener }].concat(priorTurns);
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: messages })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { useAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _useHistory.push({ role: 'assistant', content: reply }); useAppendBubble(reply, 'docb');
      if (typeof DocBCore !== 'undefined') { DocBCore.speak(reply, function(){ return _lang; }); }
      // FIX 2: Auto-resume mic after Doc B replies (hands-free conversation)
      if (_useMicActive === false) {
        var SR2 = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SR2) {
          setTimeout(function() {
            useStopMic();
            _useRecognizer = new SR2();
            _useRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
            _useRecognizer.continuous = true; _useRecognizer.interimResults = true;
            _useRecognizer.onresult = function(e) { var t = ''; for (var ri = 0; ri < e.results.length; ri++) { t += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsUseInput'); if (inp) inp.value = t.trim(); };
            _useRecognizer.onend = function() { _useMicActive = false; var btn = document.getElementById('pwsUseMic'); if (btn) btn.classList.remove('listening'); };
            _useRecognizer.start(); _useMicActive = true;
            var micBtn = document.getElementById('pwsUseMic'); if (micBtn) micBtn.classList.add('listening');
          }, 800);
        }
      }
      if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
        var allTalentTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(function(ct) { return ct.obligation === _useTool.obligation && (ct.isTalent || ct.type === 'talent'); }) : [];
        var cfgNow = allTalentTools.filter(function(ct) { return ct.configured === true; }).length;
        if (cfgNow === allTalentTools.length && allTalentTools.length > 0) {
          var historyText = _useHistory.map(function(m) { return m.content; }).join(' ');
          allTalentTools.forEach(function(ct) {
            var toolName = ct.en || '';
            var summaryMatch = historyText.match(new RegExp('([^\\n]+)' + toolName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '[^\\n]*configured[^\\n]*', 'i'));
            if (summaryMatch && summaryMatch[1] && summaryMatch[1].trim().length > toolName.length) {
              ct.en = summaryMatch[1].trim().substring(0, 120);
            }
          });
          post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId,
            data: pwsToolsPayload() });
          pwsClearActivateSession();
          pwsRenderToolsTile();
          var slotObl = _useTool.obligation || '';
          if (slotObl) {
            if (!_dayData) _dayData = {};
            if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
            var slotExists = false;
            for (var si = 0; si < _dayData.finalSchedule.length; si++) {
              var sl = _dayData.finalSchedule[si];
              if (sl.isMastery && (sl.obligation === slotObl || sl.label === slotObl + ' Practice')) { slotExists = true; break; }
            }
            if (!slotExists) {
              _dayData.finalSchedule.push({
                label:        slotObl + ' Practice',
                activity:     slotObl + ' Practice',
                obligation:   slotObl,
                stage:        'Stage 1: Discovery',
                isTalent:     true,
                isMastery:    true,
                projectId:    _useTool.projectId || '',
                masteryStage: 1,
                type:         'obligation',
                ownsIt:       true
              });
              pwsSaveDaySchedule();
              pwsRenderDayTile();
            }
          }
        }
        pwsSaveActivateSession();
      }
      var replyMentionsMusic = /music|playlist|song|spotify|youtube|track|link|paste/i.test(reply);
      var noLinkYet = !(_useTool && _useTool.link) && !_musicSaved;
      if (replyMentionsMusic && noLinkYet && !document.getElementById('pwsMusicPrompt')) {
        var mp = document.createElement('div'); mp.className = 'pws-music-prompt'; mp.id = 'pwsMusicPrompt';
        var mpInp = document.createElement('input'); mpInp.type = 'text'; mpInp.className = 'pws-music-input'; mpInp.id = 'pwsMusicLinkInput';
        mpInp.placeholder = _lang === 'es' ? 'Pega tu enlace de Spotify o YouTube...' : 'Paste your Spotify or YouTube link...';
        var mpSave = document.createElement('button'); mpSave.className = 'pws-music-save-btn'; mpSave.textContent = _lang === 'es' ? 'Guardar' : 'Save'; mpSave.onclick = pwsSaveMusicLink;
        mp.appendChild(mpInp); mp.appendChild(mpSave); useAppendNode(mp);
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      useAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  };

  var PWS_LAW_TIPS = {
    'Law of Limits': 'Law of Limits \u2014 Every person has the right to be safe. Enforced by boundaries. Obeyed by respecting them.',
    'Law of Responsibility': 'Law of Responsibility \u2014 Every person has the right to possess what belongs to them.',
    'Law of Respect': 'Law of Respect \u2014 Every person has the right to belong. Enforced by inclusion.',
    'Law of Talent': 'Law of Talent \u2014 Every person has the right to self-determination. Enforced by choice.'
  };

  function pwsStripMarkdown(text) {
    return (text || '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/^#{1,6}\s+/gm, '');
  }

  function pwsMarkupLaws(text) {
    var laws = ['Law of Limits', 'Law of Responsibility', 'Law of Respect', 'Law of Talent'];
    var result = escHtml(text);
    laws.forEach(function(law) {
      var tip = PWS_LAW_TIPS[law] || ''; var safeEn = escHtml(tip);
      var escapedLaw = law.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      result = result.replace(new RegExp(escapedLaw, 'g'), '<span class="pws-law-ref">' + escHtml(law) + '<span class="pws-law-tip">' + safeEn + '</span></span>');
    });
    return result;
  }

  function useAppendBubble(text, role) {
    var feed = document.getElementById('pwsUseFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.style.whiteSpace = 'pre-line';
    if (role === 'docb') div.innerHTML = pwsMarkupLaws(pwsStripMarkdown(text)); else div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  function useAppendNode(node) { var feed = document.getElementById('pwsUseFeed'); if (!feed || !node) return; feed.appendChild(node); feed.scrollTop = feed.scrollHeight; }

  function pwsFmtSeconds(s) { var m = Math.floor(s / 60); var sec = s % 60; return m + ':' + (sec < 10 ? '0' : '') + sec; }

  window.pwsStartTimer = function pwsStartTimer() {
    if (_timerInterval) return;
    _useStartTime = Date.now();
    var footer = document.getElementById('pwsUseFooter');
    if (footer) {
      var startBtn = document.getElementById('pwsUseStartTimerBtn'); if (startBtn) startBtn.parentNode.removeChild(startBtn);
      var stopBtn = document.createElement('button'); stopBtn.className = 'pws-use-footer-btn stop-timer'; stopBtn.id = 'pwsUseStopTimerBtn';
      stopBtn.textContent = _lang === 'es' ? '\u2713 Listo \u2014 Parar' : '\u2713 Done \u2014 Stop'; stopBtn.onclick = pwsStopTimer; footer.insertBefore(stopBtn, footer.firstChild);
    }
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'block';
    var pbLabelEl = document.getElementById('pwsTimerPbLabel');
    if (pbLabelEl) pbLabelEl.textContent = _usePB ? (_lang === 'es' ? 'Mejor: ' + pwsFmtSeconds(_usePB.best) : 'Best: ' + pwsFmtSeconds(_usePB.best)) : (_lang === 'es' ? 'Primer intento' : 'First attempt');
    _timerStart = Date.now(); _timerSeconds = 0;
    _timerInterval = setInterval(function() { _timerSeconds = Math.floor((Date.now() - _timerStart) / 1000); var el = document.getElementById('pwsTimerDisplay'); if (el) el.textContent = pwsFmtSeconds(_timerSeconds); }, 1000);
  };

  window.pwsStopTimer = function pwsStopTimer() {
    if (!_timerInterval) return; clearInterval(_timerInterval); _timerInterval = null;
    var elapsed = _timerSeconds;
    var timerBar = document.getElementById('pwsUseTimerBar'); if (timerBar) timerBar.style.display = 'none';
    var footer = document.getElementById('pwsUseFooter'); if (footer) { var stopBtn = document.getElementById('pwsUseStopTimerBtn'); if (stopBtn) stopBtn.parentNode.removeChild(stopBtn); }
    var prevBest = _usePB ? _usePB.best : null;
    var isNewBest = (prevBest === null || elapsed < prevBest);
    var newPB = { best: isNewBest ? elapsed : prevBest, lastSeconds: elapsed, lastDate: new Date().toLocaleDateString(), count: (_usePB ? (_usePB.count || 0) : 0) + 1 };
    _usePB = newPB; try { localStorage.setItem(_pbKey, JSON.stringify(newPB)); } catch(e) {}
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId, date: new Date().toISOString().substring(0, 10), windowKey: 'tool_use_' + oblKeyFromTool(), activityLabel: (_useTool && _useTool.obligation) || 'tool use', completed: true, note: 'timer: ' + pwsFmtSeconds(elapsed) + (isNewBest ? ' (new PB)' : ''), lawTag: pwsLawTag(_useTool) });
    if (isNewBest) {
      var cel = document.createElement('div'); cel.className = 'pws-pb-celebration';
      var headline = document.createElement('div'); headline.className = 'pws-pb-headline'; headline.textContent = _lang === 'es' ? '\u00a1Nuevo R\u00e9cord Personal!' : 'New Personal Best!';
      var pbTime = document.createElement('div'); pbTime.className = 'pws-pb-time'; pbTime.textContent = pwsFmtSeconds(elapsed);
      cel.appendChild(headline); cel.appendChild(pbTime);
      var zone3 = document.getElementById('pwsToolPanelZone');
      if (zone3) { zone3.innerHTML = ''; zone3.appendChild(cel); } else { useAppendNode(cel); }
      useAppendBubble(_lang === 'es' ? 'Lo lograste. ' + pwsFmtSeconds(elapsed) + '. Eso queda registrado.' : 'You did it. ' + pwsFmtSeconds(elapsed) + '. That\u0027s on the board now.', 'docb');
    } else {
      var zone3b = document.getElementById('pwsToolPanelZone');
      var resultMsg = _lang === 'es' ? pwsFmtSeconds(elapsed) + ' hoy. Tu mejor sigue siendo ' + pwsFmtSeconds(prevBest) + '.' : pwsFmtSeconds(elapsed) + ' today. Best: ' + pwsFmtSeconds(prevBest) + '.';
      if (zone3b) { zone3b.innerHTML = '<div style="font-family:\'Cinzel\',serif;font-size:22px !important;color:#c8a84b;text-align:center;padding:16px;">' + resultMsg + '</div>'; }
      useAppendBubble(_lang === 'es' ? pwsFmtSeconds(elapsed) + ' hoy. Tu mejor sigue siendo ' + pwsFmtSeconds(prevBest) + '. Ma\u00f1ana.' : pwsFmtSeconds(elapsed) + ' today. Your best is still ' + pwsFmtSeconds(prevBest) + '. Tomorrow.', 'docb');
    }
    _useStartTime = null;
  };

  function pwsLawTag(tool) {
    if (!tool) return 'responsibility';
    if (tool.isTalent === true || tool.type === 'talent') return 'talent';
    if (tool.lawTag) return tool.lawTag;
    return 'responsibility';
  }

  function pwsLawTagFromSlot(s) {
    if (!s) return 'responsibility';
    if (s.isProjectSlot === true) return 'talent';
    if (s.isMastery === true) return 'talent';
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    var sLabel = (s.label || '').toLowerCase().trim();
    for (var _ti = 0; _ti < validTools.length; _ti++) {
      var _ct = validTools[_ti];
      var _tObl = (_ct.obligation || _ct.label || '').toLowerCase().trim();
      if (_tObl && (_tObl === sLabel || sLabel.indexOf(_tObl.substring(0,8)) !== -1)) {
        return pwsLawTag(_ct);
      }
    }
    return 'responsibility';
  }

  function oblKeyFromTool() { if (!_useTool) return 'unknown'; return (_useTool.obligation || _useTool.en || 'tool').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').substring(0, 40); }

  window.pwsSaveMusicLink = function pwsSaveMusicLink() {
    var inp = document.getElementById('pwsMusicLinkInput'); if (!inp || !inp.value.trim()) return;
    var link = inp.value.trim();
    var savedLink = /^https?:\/\//i.test(link) ? link : 'https://www.youtube.com/results?search_query=' + encodeURIComponent(link);
    if (_useTool) {
      _useTool.link = savedLink;
      if (_toolsData && _toolsData.confirmedTools) {
        _toolsData.confirmedTools.forEach(function(t) { if (t.obligation === _useTool.obligation && t.en === _useTool.en) t.link = savedLink; });
        post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
      }
    }
    var prompt = document.getElementById('pwsMusicPrompt'); if (prompt) prompt.parentNode.removeChild(prompt);
    var footer = document.getElementById('pwsUseFooter');
    if (footer && !document.getElementById('pwsUsePlayBtn')) {
      var playBtn = document.createElement('button'); playBtn.className = 'pws-use-footer-btn open-music'; playBtn.id = 'pwsUsePlayBtn';
      playBtn.textContent = _lang === 'es' ? '\u25b6 Reproducir' : '\u25b6 Play'; playBtn.onclick = function() { pwsOpenDeparture(savedLink, (_useTool && _useTool.en) ? _useTool.en : savedLink); }; footer.insertBefore(playBtn, footer.firstChild);
    }
    pwsOpenDeparture(savedLink, (_useTool && _useTool.en) ? _useTool.en : savedLink); _musicSaved = true;
    useAppendBubble(_lang === 'es' ? 'Guardado. La pr\u00f3xima vez solo toca Reproducir.' : 'Saved. Next time just tap Play.', 'docb');
  };

  window.pwsMarkDone = function pwsMarkDone() {
    var footer = document.getElementById('pwsUseFooter'); if (footer) { var doneBtn = document.getElementById('pwsUseMarkDoneBtn'); if (doneBtn) doneBtn.parentNode.removeChild(doneBtn); }
    var oblLabel = (_useTool && !_useTool._oblDirty && _useTool.obligation) ? _useTool.obligation : '';
    var matched = false;
    if (_obsData && _obsData.confirmedObs && oblLabel) {
      _obsData.confirmedObs.forEach(function(o) { if (o.text && o.text.toLowerCase().trim() === oblLabel.toLowerCase().trim()) { o.state = 'crushing'; matched = true; } });
      if (matched) {
        post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId, data: { confirmedObs: _obsData.confirmedObs, hateList: _obsData.hateList || [], wishList: _obsData.wishList || [], whatMatters: _obsData.whatMatters || '' } });
        pwsRenderStationTile(); pwsRenderToolsTile();
      }
    }
    if (_dayData && _dayData.finalSchedule && oblLabel) {
      var sLabel = oblLabel.toLowerCase().trim();
      var dayMatched = false;
      _dayData.finalSchedule.forEach(function(s) {
        var slotLabel = (s.label || s.activity || '').toLowerCase().trim();
        if (slotLabel && (slotLabel === sLabel || slotLabel.indexOf(sLabel.substring(0,8)) !== -1)) {
          s._checkedIn = 'done'; dayMatched = true;
        }
      });
      if (dayMatched) { pwsSaveDaySchedule(); pwsRenderDayTile(); }
    }
    var durationSec = _useStartTime ? Math.round((Date.now() - _useStartTime) / 1000) : 0;
    post({ action: 'pwsLogAdherence', sessionId: _session, requestingMemberId: _memberId, date: new Date().toISOString().substring(0, 10), windowKey: 'tool_done_' + oblKeyFromTool(), activityLabel: oblLabel || 'tool use', completed: true, note: 'marked done via USE overlay', lawTag: pwsLawTag(_useTool), data: { date: new Date().toISOString(), obligationText: (_useTool && _useTool.obligation) || '', toolName: (_useTool && _useTool.en) ? _useTool.en.substring(0, 60) : '', durationSeconds: durationSec, outcome: 'completed' } });
    _useStartTime = null;

    if (_useTool && _toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.configured = true; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
      pwsRenderToolsTile();
    }

    var doneNode = document.createElement('div'); doneNode.className = 'pws-done-confirm';
    var doneText = document.createElement('div'); doneText.className = 'pws-done-confirm-text';
    doneText.textContent = matched ? (_lang === 'es' ? '\u2713 \u201c' + oblLabel + '\u201d \u2014 Lo lograste.' : '\u2713 \u201c' + oblLabel + '\u201d \u2014 Done.') : (_lang === 'es' ? '\u2713 Marcado como listo.' : '\u2713 Marked done.');
    doneNode.appendChild(doneText); useAppendNode(doneNode);
    setTimeout(function() { useAppendBubble(_lang === 'es' ? 'Bien hecho. Eso cuenta.' : 'Well done. That counts.', 'docb'); }, 400);
  };

  function unlockStopMic() {
    if (_unlockRecognizer) { try { _unlockRecognizer.stop(); _unlockRecognizer.onresult = null; _unlockRecognizer.onend = null; } catch(e) {} _unlockRecognizer = null; }
    _unlockMicActive = false; var btn = document.getElementById('pwsUnlockMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleUnlockMic = function pwsToggleUnlockMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
    if (_unlockMicActive) { unlockStopMic(); return; }
    unlockStopMic(); _unlockRecognizer = new SR(); _unlockRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US'; _unlockRecognizer.continuous = true; _unlockRecognizer.interimResults = true;
    _unlockRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsUnlockInput'); if (inp) inp.value = transcript.trim(); };
    _unlockRecognizer.onend = function() { _unlockMicActive = false; var btn = document.getElementById('pwsUnlockMic'); if (btn) btn.classList.remove('listening'); };
    _unlockRecognizer.start(); _unlockMicActive = true; var btn = document.getElementById('pwsUnlockMic'); if (btn) btn.classList.add('listening');
  };

  window.pwsOpenUnlock = function pwsOpenUnlock(toolIdx) {
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    var tool = validTools[toolIdx]; if (!tool) return;
    _unlockTool = tool; _unlockHistory = [];
    var titleEl = document.getElementById('pwsUnlockTitle'); if (titleEl) titleEl.textContent = _lang === 'es' ? 'Desbloquear Herramienta' : 'Unlock Tool';
    var feed = document.getElementById('pwsUnlockFeed'); if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsUnlockOverlay'); if (ov) ov.classList.add('open');
    var toolName = pwsShortTitle(tool.en || tool.obligation || 'this tool');
    var openingEN = 'You want to use \u201c' + toolName + '\u201d.' + NL + NL + 'Before I open it, I want to understand how you plan to use it responsibly.' + NL + NL + 'What does this tool help you with?';
    var openingES = 'Quieres usar \u201c' + toolName + '\u201d.' + NL + NL + 'Antes de abrirlo, quiero entender c\u00f3mo planeas usarlo de manera responsable.' + NL + NL + '\u00bfPara qu\u00e9 te ayuda esta herramienta?';
    var openingMsg = _lang === 'es' ? openingES : openingEN;
    unlockAppendBubble(openingMsg, 'docb'); _unlockHistory.push({ role: 'assistant', content: openingMsg });
    var inp = document.getElementById('pwsUnlockInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
  };

  window.pwsCloseUnlock = function pwsCloseUnlock() {
    unlockStopMic(); var ov = document.getElementById('pwsUnlockOverlay'); if (ov) ov.classList.remove('open'); _unlockTool = null; _unlockHistory = [];
  };

  window.pwsSendUnlock = function pwsSendUnlock() {
    var inp = document.getElementById('pwsUnlockInput'); if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim(); inp.value = ''; unlockStopMic();
    unlockAppendBubble(text, 'member'); _unlockHistory.push({ role: 'user', content: text });
    var typingId = 'pws-unlock-typing-' + Date.now();
    var feed = document.getElementById('pwsUnlockFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }
    var toolName = _unlockTool ? pwsShortTitle(_unlockTool.en || _unlockTool.obligation || 'this tool') : 'this tool';
    var systemPrompt = 'You are Doc B on the 4 LAWS Academy platform. A member wants to unlock a tool. Have a real conversation about responsible use. Ask one focused question at a time. When satisfied, end your response with UNLOCK_READY on its own line. Tool: \u201c' + toolName + '\u201d. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _unlockHistory })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { unlockAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _unlockHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('UNLOCK_READY');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        unlockAppendBubble(displayMsg || (_lang === 'es' ? 'Listo. Herramienta desbloqueada.' : 'You\u0027re ready. Tool unlocked.'), 'docb');
        if (_unlockTool) pwsMarkToolUnlocked(_unlockTool);
        setTimeout(function() { pwsCloseUnlock(); pwsRenderToolsTile(); }, 1800);
      } else { unlockAppendBubble(reply, 'docb'); }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      unlockAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  };

  function unlockAppendBubble(text, role) {
    var feed = document.getElementById('pwsUnlockFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.style.whiteSpace = 'pre-line'; div.textContent = text;
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  var _modifyTile = '', _modifyHistory = [], _modifyDraft = null;
  var _modifyMicActive = false, _modifyRecognizer = null;

  function modifyStopMic() {
    if (_modifyRecognizer) { try { _modifyRecognizer.stop(); _modifyRecognizer.onresult = null; _modifyRecognizer.onend = null; } catch(e) {} _modifyRecognizer = null; }
    _modifyMicActive = false; var btn = document.getElementById('pwsModifyMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleModifyMic = function pwsToggleModifyMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
    if (_modifyMicActive) { modifyStopMic(); return; }
    modifyStopMic(); _modifyRecognizer = new SR(); _modifyRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US'; _modifyRecognizer.continuous = true; _modifyRecognizer.interimResults = true;
    _modifyRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsModifyInput'); if (inp) inp.value = transcript.trim(); };
    _modifyRecognizer.onend = function() { _modifyMicActive = false; var btn = document.getElementById('pwsModifyMic'); if (btn) btn.classList.remove('listening'); };
    _modifyRecognizer.start(); _modifyMicActive = true; var btn = document.getElementById('pwsModifyMic'); if (btn) btn.classList.add('listening');
  };

  window.pwsOpenModify = function pwsOpenModify(tileKey) {
    _modifyTile = tileKey; _modifyHistory = []; _modifyDraft = null;
    var titleEl = document.getElementById('pwsModifyTitle');
    var titles = { station: { en: 'Update My Contributions', es: 'Actualizar Mis Contribuciones' }, tools: { en: 'Update My Tools', es: 'Actualizar Mis Herramientas' }, day: { en: 'Update My Day', es: 'Actualizar Mi D\u00eda' } };
    var t = titles[tileKey] || titles.station;
    if (titleEl) titleEl.innerHTML = '<span class="en">' + t.en + '</span><span class="es">' + t.es + '</span>';
    var feed = document.getElementById('pwsModifyFeed'); if (feed) feed.innerHTML = '';
    var actions = document.getElementById('pwsModifyActions'); if (actions) actions.style.display = 'none';
    var ov = document.getElementById('pwsModifyOverlay'); if (ov) ov.classList.add('open');
    var openingEN = '', openingES = '';
    if (tileKey === 'station') {
      var validCount = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs.filter(function(o){ return pwsIsValidObligation(o.text); }).length : 0;
      openingEN = 'You have ' + validCount + ' obligation' + (validCount !== 1 ? 's' : '') + ' on your list.' + NL + NL + 'What has changed?';
      openingES = 'Tienes ' + validCount + ' obligaci\u00f3n' + (validCount !== 1 ? 'es' : '') + ' en tu lista.' + NL + NL + '\u00bfQu\u00e9 ha cambiado?';
    } else if (tileKey === 'tools') {
      var toolCount = (_toolsData && _toolsData.confirmedTools) ? _toolsData.confirmedTools.filter(pwsIsValidTool).length : 0;
      openingEN = 'You have ' + toolCount + ' tool' + (toolCount !== 1 ? 's' : '') + ' built.' + NL + NL + 'What has changed?';
      openingES = 'Tienes ' + toolCount + ' herramienta' + (toolCount !== 1 ? 's' : '') + ' construida' + (toolCount !== 1 ? 's' : '') + '.' + NL + NL + '\u00bfQu\u00e9 ha cambiado?';
    } else if (tileKey === 'day') {
      var dayCount = (_dayData && _dayData.finalSchedule) ? _dayData.finalSchedule.filter(function(s){ return s.ownsIt !== false; }).length : 0;
      openingEN = 'Your day has ' + dayCount + ' window' + (dayCount !== 1 ? 's' : '') + '.' + NL + NL + 'What has changed?';
      openingES = 'Tu d\u00eda tiene ' + dayCount + ' ventana' + (dayCount !== 1 ? 's' : '') + '.' + NL + NL + '\u00bfQu\u00e9 ha cambiado?';
    }
    modifyAppendBubble(_lang === 'es' ? openingES : openingEN, 'docb');
    _modifyHistory.push({ role: 'assistant', content: _lang === 'es' ? openingES : openingEN });
    var inp = document.getElementById('pwsModifyInput'); if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
  };

  window.pwsCloseModify = function pwsCloseModify() {
    modifyStopMic(); var ov = document.getElementById('pwsModifyOverlay'); if (ov) ov.classList.remove('open');
    _modifyTile = ''; _modifyHistory = []; _modifyDraft = null;
  };

  window.pwsSendModify = function pwsSendModify() {
    var inp = document.getElementById('pwsModifyInput'); if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim(); inp.value = ''; modifyStopMic();
    modifyAppendBubble(text, 'member'); _modifyHistory.push({ role: 'user', content: text });
    var typingId = 'pws-modify-typing-' + Date.now();
    var feed = document.getElementById('pwsModifyFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }
    var tileContext = '';
    if (_modifyTile === 'station' && _obsData) { var obs = (_obsData.confirmedObs || []).filter(function(o){ return pwsIsValidObligation(o.text); }); tileContext = 'Current obligations: ' + obs.map(function(o){ return o.text + ' (' + (o.state || 'not-started') + ')'; }).join(', ') + '. whatMatters: ' + (_obsData.whatMatters || 'not set') + '.'; }
    else if (_modifyTile === 'tools' && _toolsData) { var tools = (_toolsData.confirmedTools || []).filter(pwsIsValidTool); tileContext = 'Current tools: ' + tools.map(function(t){ return t.obligation + ' -> ' + t.en; }).join(', ') + '.'; }
    else if (_modifyTile === 'day' && _dayData) { var sched = (_dayData.finalSchedule || []).filter(function(s){ return s.ownsIt !== false; }); tileContext = 'Current schedule: ' + sched.map(function(s){ return s.derivedTime + ' ' + s.label; }).join(', ') + '.'; }
    var systemPrompt = 'You are Doc B on the 4 LAWS Academy platform. Member wants to update their ' + _modifyTile + ' tile. ' + tileContext + ' Ask what changed, understand the reason, then propose the specific update. When ready, end with READY_TO_SAVE followed by a JSON block. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _modifyHistory })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { modifyAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _modifyHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('READY_TO_SAVE');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        var jsonStr = reply.substring(markerIdx + 'READY_TO_SAVE'.length).trim();
        try { _modifyDraft = JSON.parse(jsonStr); var actions = document.getElementById('pwsModifyActions'); if (actions) actions.style.display = 'flex'; } catch(e) { _modifyDraft = null; }
        modifyAppendBubble(displayMsg || (_lang === 'es' ? 'Cambios listos.' : 'Changes ready.'), 'docb');
      } else { modifyAppendBubble(reply, 'docb'); }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      modifyAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  };

  window.pwsSaveModify = function pwsSaveModify() {
    if (!_modifyDraft || !_modifyTile) return;
    var actionMap = { station: 'pwsSaveStation', tools: 'pwsSaveTools', day: 'pwsSaveDay' };
    var action = actionMap[_modifyTile]; if (!action) return;
    if (_modifyTile === 'station' && _obsData) { if (_modifyDraft.confirmedObs) _obsData.confirmedObs = _modifyDraft.confirmedObs; if (_modifyDraft.whatMatters !== undefined) _obsData.whatMatters = _modifyDraft.whatMatters; }
    else if (_modifyTile === 'tools' && _toolsData) { if (_modifyDraft.confirmedTools) _toolsData.confirmedTools = _modifyDraft.confirmedTools; }
    else if (_modifyTile === 'day' && _dayData) { if (_modifyDraft.finalSchedule) _dayData.finalSchedule = _modifyDraft.finalSchedule; }
    var saveData = {};
    if (_modifyTile === 'station') saveData = { confirmedObs: _obsData.confirmedObs, hateList: _obsData.hateList || [], wishList: _obsData.wishList || [], whatMatters: _obsData.whatMatters || '' };
    else if (_modifyTile === 'tools') saveData = pwsToolsPayload();
    else if (_modifyTile === 'day') saveData = { finalSchedule: _dayData.finalSchedule, wakeTime: _dayData.wakeTime || '', bedTime: _dayData.bedTime || '', rankedPriorities: _dayData.rankedPriorities || [], howGoodCould: _dayData.howGoodCould || '', howGoodWant: _dayData.howGoodWant || '' };
    post({ action: action, sessionId: _session, requestingMemberId: _memberId, data: saveData });
    if (_modifyTile === 'station') pwsRenderStationTile(); else if (_modifyTile === 'tools') pwsRenderToolsTile(); else if (_modifyTile === 'day') pwsRenderDayTile();
    modifyAppendBubble(_lang === 'es' ? 'Guardado. Tu ' + _modifyTile + ' ha sido actualizado.' : 'Saved. Your ' + _modifyTile + ' has been updated.', 'docb');
    var actions = document.getElementById('pwsModifyActions'); if (actions) actions.style.display = 'none';
    setTimeout(pwsCloseModify, 1800);
  };

  function modifyAppendBubble(text, role) {
    var feed = document.getElementById('pwsModifyFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.style.whiteSpace = 'pre-line'; div.textContent = text;
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  window.pwsSendDocB = function pwsSendDocB() {
    var inp = document.getElementById('pwsDocBInput');
    var hasPending = (typeof DocBCore !== 'undefined') && !!DocBCore.getPending();
    if (!inp || (!inp.value.trim() && !hasPending)) return;
    var text = inp.value.trim(); inp.value = ''; pwsStopMic();

    // BUILD 3: Fast nav keyword routing — no AI round trip needed
    if (text && pwsDocBCheckNavCmd(text)) return;

    // BUILD 3: DocBCore handles image content and display text
    var displayText = (typeof DocBCore !== 'undefined') ? DocBCore.displayText(text, function(){ return _lang; }) : text;
    var userContent = (typeof DocBCore !== 'undefined') ? DocBCore.buildContent(text, function(){ return _lang; }) : text;

    pwsAppendBubble(displayText, 'member');
    _docbHistory.push({ role: 'user', content: userContent });
    var typingId = 'pws-typing-' + Date.now();
    var feed = document.getElementById('pwsDocBFeed');
    if (feed) { var typing = document.createElement('div'); typing.className = 'pws-docb-bubble docb pws-typing'; typing.id = typingId; typing.textContent = '\u2026'; feed.appendChild(typing); feed.scrollTop = feed.scrollHeight; }

    var mn3 = localStorage.getItem('4laws-display-name') || 'Eduardo';
    var now3 = new Date();
    var cp = ['Member: '+mn3,'Time: '+now3.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})+', '+now3.toLocaleDateString([],{weekday:'long'})];
    if (_obsData && _obsData.confirmedObs && _obsData.confirmedObs.length) { cp.push('Obligations: '+_obsData.confirmedObs.map(function(o){return o.text+' ('+(o.state||'pending')+')';}).join(', ')); }
    if (_dayData && _dayData.finalSchedule && _dayData.finalSchedule.length) {
      var cw3 = pwsFindCurrentWindow(_dayData.finalSchedule.filter(function(s){return s.ownsIt!==false;}));
      if (cw3) cp.push('Current window: '+cw3.label);
      cp.push('Schedule: '+_dayData.finalSchedule.map(function(s){return s.label+(s.time?' @ '+s.time:'');}).join(' | '));
    }
    if (_twsProject && _twsProject.name) { cp.push('Project: '+_twsProject.name+' (Stage '+(_twsProject.masteryStage||1)+', '+(_twsProject.sessionCount||0)+' sessions)'); }
    var systemPrompt = 'You are Doc B, header co-pilot on '+mn3+'\'s PWS at 4 LAWS Academy. Voice of Dr. Eduardo Bustamante, creator of the 4 LAWS. '+
      'Context: '+cp.join('. ')+'. Be warm, direct, under 3 sentences. Respond in '+(_lang==='es'?'Spanish':'English')+'.';

    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _docbHistory.slice(-14) })
    .then(function(d) {
      var reply = ''; if (d && d.reply) reply = d.reply; else if (d && d.content && d.content[0]) reply = d.content[0].text || '';
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (reply) {
        _docbHistory.push({ role: 'assistant', content: reply });
        pwsAppendBubble(reply, 'docb');
        if (typeof DocBCore !== 'undefined') DocBCore.speak(reply, function(){ return _lang; });
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId); if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsAppendBubble(_lang === 'es' ? 'Intenta de nuevo en un momento.' : 'Try again in a moment.', 'docb');
    });
  };

  function pwsAppendBubble(text, role) {
    var feed = document.getElementById('pwsDocBFeed'); if (!feed) return;
    var div = document.createElement('div'); div.className = 'pws-docb-bubble ' + role; div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div); feed.scrollTop = feed.scrollHeight;
  }

  var _micActive = false, _recognition = null;
  function pwsStopMic() {
    if (_recognition) { try { _recognition.stop(); _recognition.onresult = null; _recognition.onend = null; } catch(e) {} _recognition = null; }
    _micActive = false; var btn = document.getElementById('pwsDocBMic'); if (btn) btn.classList.remove('listening');
  }
  window.pwsToggleMic = function pwsToggleMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) { pwsAppendBubble('Microphone not supported in this browser.', 'docb'); return; }
    if (_micActive) { pwsStopMic(); return; }
    pwsStopMic(); _recognition = new SR(); _recognition.lang = _lang === 'es' ? 'es-US' : 'en-US'; _recognition.continuous = true; _recognition.interimResults = true;
    _recognition.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsDocBInput'); if (inp) inp.value = transcript.trim(); };
    _recognition.onend = function() { _micActive = false; var btn = document.getElementById('pwsDocBMic'); if (btn) btn.classList.remove('listening'); };
    _recognition.start(); _micActive = true; var btn = document.getElementById('pwsDocBMic'); if (btn) btn.classList.add('listening');
  };

  function pwsApplyLang() {
    var root = document.getElementById('pwsRoot');
    if (root) root.setAttribute('data-lang', _lang);
  }

  window.pwsSetLang = function pwsSetLang(lang) {
    _lang = lang; var root = document.getElementById('pwsRoot'); if (root) root.setAttribute('data-lang', lang);
    var en = document.getElementById('pwsLangEn'); var es = document.getElementById('pwsLangEs');
    if (en) en.classList.toggle('active', lang === 'en'); if (es) es.classList.toggle('active', lang === 'es');
    pwsRenderAll();
  };

  window.pwsOpenPlanMyDay = function pwsOpenPlanMyDay() {
    window.location.href = '/todos';
  };

  window.pwsClosePlanMyDay    = function pwsClosePlanMyDay() {};
  window.pwsPmdSave           = function pwsPmdSave() {};
  window.pwsPmdStartAddMore   = function pwsPmdStartAddMore() { window.location.href = '/todos'; };
  window.pwsPmdSend           = function pwsPmdSend() {};
  window.pwsOpenAdultOnboard  = function pwsOpenAdultOnboard() { window.location.href = '/todos'; };
  window.pwsCloseAdultOnboard = function pwsCloseAdultOnboard() {};


  function pwsTWSPause() {
    twsStopMic();
    var snapshot = {
      history:     _twsHistory,
      phase:       _twsPhase,
      projType:    _twsProjectType,
      category:    _twsSelectedCategory,
      skill:       _twsSelectedSkill,
      savedAt:     new Date().toISOString()
    };
    try { localStorage.setItem(_TWS_PAUSE_KEY + '_' + (_memberId || 'guest'), JSON.stringify(snapshot)); } catch(e) {}
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.remove('open');
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) feed.innerHTML = '';
    _twsHistory = [];
    _twsPhase = 'entry';
    _twsProjectType = '';
    _twsSelectedCategory = '';
    _twsSelectedSkill = '';
    var tile = document.getElementById('pwsTalentTile');
    if (tile) {
      var note = document.createElement('div');
      note.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(200,168,75,0.7);padding:10px 16px;font-style:italic;";
      note.textContent = 'Conversation saved. Tap My Projects to continue where you left off.';
      tile.insertBefore(note, tile.firstChild);
      setTimeout(function() { if (note.parentNode) note.parentNode.removeChild(note); }, 5000);
    }
  }

  function pwsTWSRestorePause() {
    var key = _TWS_PAUSE_KEY + '_' + (_memberId || 'guest');
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return false;
      var snap = JSON.parse(raw);
      if (!snap || !snap.history || !snap.history.length) return false;
      _twsHistory          = snap.history;
      _twsPhase            = snap.phase || 'entry';
      _twsProjectType      = snap.projType || '';
      _twsSelectedCategory = snap.category || '';
      _twsSelectedSkill    = snap.skill || '';
      localStorage.removeItem(key);
      return true;
    } catch(e) { return false; }
  }

  window.pwsOpenTWSFromProject = function() {
    if (!_twsProject || !_twsProject.projectId) { pwsOpenTWS(); return; }
    _twsHistory = [];
    var hasActivities = _twsProject.activities && _twsProject.activities.length;
    _twsPhase = hasActivities ? 'work' : 'main_obstacle';
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.add('open');
    var titleEl = document.getElementById('pwsTWSTitle');
    if (titleEl) titleEl.textContent = _twsProject.title || 'My Project';
    var resumeMsg = hasActivities
      ? 'Welcome back. "' + (_twsProject.title || 'your project') + '" has ' + _twsProject.activities.length + ' workstreams ready. Which one are you working on today?'
      : 'Welcome back. Your project "' + (_twsProject.title || 'your project') + '" is live. What’s standing between you and launch right now?';
    pwsTWSAppendBubble(resumeMsg, 'docb');
    _twsHistory.push({ role: 'assistant', content: resumeMsg });
    var inputRow = document.getElementById('pwsTWSInputRow');
    if (inputRow) inputRow.style.display = 'flex';
  };

  function pwsOpenTWS() {
    var _twsResuming = pwsTWSRestorePause();
    if (!_twsResuming) {
      _twsHistory = [];
      _twsPhase = 'entry';
      _twsSelectedCategory = '';
      _twsSelectedSkill    = '';
      _twsProjectType      = '';
    }
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) feed.innerHTML = '';
    var inputRow = document.getElementById('pwsTWSInputRow');
    if (inputRow) inputRow.style.display = 'flex';
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.add('open');

    var closeBtn = document.getElementById('pwsTWSCloseBtn');
    if (closeBtn) {
      var newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      newClose.addEventListener('click', pwsCloseTWS);
    }
    var sendBtn = document.getElementById('pwsTWSSendBtn');
    if (sendBtn) {
      var newSend = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newSend, sendBtn);
      newSend.addEventListener('click', pwsSendTWS);
    }
    var micBtn = document.getElementById('pwsTWSMic');
    if (micBtn) {
      var micClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(micClone, micBtn);
      micClone.addEventListener('click', pwsToggleTWSMic);
    }
    var pauseBtn = document.getElementById('pwsTWSPauseBtn');
    if (pauseBtn) {
      var pauseClone = pauseBtn.cloneNode(true);
      pauseBtn.parentNode.replaceChild(pauseClone, pauseBtn);
      pauseClone.addEventListener('click', pwsTWSPause);
    }
    var inp = document.getElementById('pwsTWSInput');
    if (inp) {
      inp.value = '';
      var newInp = inp.cloneNode(true);
      inp.parentNode.replaceChild(newInp, inp);
      newInp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendTWS(); }
      });
      setTimeout(function() { newInp.focus(); }, 80);
    }

    if (_twsResuming && _twsHistory.length) {
      var resumeFeed = document.getElementById('pwsTWSFeed');
      if (resumeFeed) {
        for (var rhi = 0; rhi < _twsHistory.length; rhi++) {
          var rh = _twsHistory[rhi];
          pwsTWSAppendBubble(rh.content, rh.role === 'user' ? 'member' : 'docb');
        }
        var resumeNote = document.createElement('div');
        resumeNote.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(200,168,75,0.6);padding:6px 12px;font-style:italic;text-align:center;";
        resumeNote.textContent = 'Welcome back \u2014 your conversation is restored.';
        resumeFeed.appendChild(resumeNote);
        resumeFeed.scrollTop = resumeFeed.scrollHeight;
      }
      pwsTWSShowInput(true);
      return;
    }

    var forkEN = 'Is this something you want to get good at \u2014 a skill or craft you want to master?\n\nOr is this something you want to build and put into the world?';
    var forkES = '\u00bfEsto es algo en lo que quieres mejorar \u2014 una habilidad o arte que quieres dominar?\n\n\u00bfO es algo que quieres construir y lanzar al mundo?';
    var forkMsg = _lang === 'es' ? forkES : forkEN;
    pwsTWSAppendBubble(forkMsg, 'docb');
    pwsTWSShowInput(false);

    setTimeout(function() {
      var feedEl = document.getElementById('pwsTWSFeed');
      if (!feedEl) return;
      var forkRow = document.createElement('div');
      forkRow.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding:6px 0;';

      var getGoodBtn = document.createElement('button');
      getGoodBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:12px 10px;cursor:pointer;';
      getGoodBtn.innerHTML = '\uD83C\uDFAF <span class="en">Get Good \u2014 a skill I want to master</span><span class="es" style="display:none;">Mejorar \u2014 una habilidad que quiero dominar</span>';
      getGoodBtn.addEventListener('click', function() {
        if (forkRow.parentNode) forkRow.parentNode.removeChild(forkRow);
        pwsTWSForkGetGood();
        pwsTWSAskAlreadyInLove();
      });

      var buildBtn = document.createElement('button');
      buildBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:rgba(240,230,204,0.5);background:transparent;border:1px solid rgba(240,230,204,0.15);border-radius:3px;padding:12px 10px;cursor:pointer;';
      buildBtn.innerHTML = '\uD83D\uDE80 <span class="en">Build It \u2014 something I want to launch into the world</span><span class="es" style="display:none;">Construirlo \u2014 algo que quiero lanzar al mundo</span>';
      buildBtn.addEventListener('click', function() {
        if (forkRow.parentNode) forkRow.parentNode.removeChild(forkRow);
        pwsTWSForkMain();
      });

      forkRow.appendChild(getGoodBtn);
      forkRow.appendChild(buildBtn);
      feedEl.appendChild(forkRow);
      feedEl.scrollTop = feedEl.scrollHeight;
    }, 400);
  }

  function pwsCloseTWS() {
    twsStopMic();
    var ov = document.getElementById('pwsTWSOverlay');
    if (ov) ov.classList.remove('open');
    _twsHistory = [];
    _twsPhase = 'entry';
  }

  function pwsTWSForkGetGood() {
    _twsProjectType = 'get-good';
    _twsPhase = 'path_a';
    var msgEN = 'Perfect. A skill you want to master.\n\nTell me more — what specifically do you want to be able to do? What does getting good at this look like for you?';
    var msgES = 'Perfecto. Una habilidad que quieres dominar.\n\nCu\u00e9ntame m\u00e1s \u2014 \u00bfqu\u00e9 espec\u00edficamente quieres poder hacer? \u00bfC\u00f3mo se ver\u00eda dominar esto para ti?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory.push({ role: 'assistant', content: msg });
    pwsTWSShowInput(true);
  }

  function pwsTWSForkMain() {
    _twsProjectType = 'main';
    _twsPhase = 'path_a';
    pwsTWSAppendBubble('Build It.', 'member');
    var msgEN = 'A life project. That\'s different.\n\nTell me: what does the world look like when this is done? Who is changed by it?';
    var msgES = 'Un proyecto de vida. Eso es diferente.\n\nD\u00edme: \u00bfc\u00f3mo se ve el mundo cuando esto est\u00e1 terminado? \u00bfQui\u00e9n cambia gracias a ello?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Build It \u2014 a life project to launch' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSAskAlreadyInLove() {
    var msgEN = 'Are you already in love with a specific skill?\n\nOr do you want to explore what calls you?';
    var msgES = '\u00bfYa est\u00e1s enamorado de una habilidad espec\u00edfica?\n\n\u00bfO quieres explorar lo que te llama?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    pwsTWSShowInput(false);
    setTimeout(function() {
      var feedEl = document.getElementById('pwsTWSFeed');
      if (!feedEl) return;
      var btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:10px;padding:6px 0;';
      var yesBtn = document.createElement('button');
      yesBtn.style.cssText = 'flex:1;font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:#040608;background:#c8a84b;border:none;border-radius:3px;padding:12px 10px;cursor:pointer;';
      yesBtn.innerHTML = '<span class="en">YES \u2014 I know what I want</span><span class="es" style="display:none;">S\u00cd \u2014 Ya s\u00e9 lo que quiero</span>';
      yesBtn.addEventListener('click', function() {
        if (btnRow.parentNode) btnRow.parentNode.removeChild(btnRow);
        pwsTWSPathA();
      });
      var exploreBtn = document.createElement('button');
      exploreBtn.style.cssText = 'flex:1;font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.1em;text-transform:uppercase;color:rgba(240,230,204,0.5);background:transparent;border:1px solid rgba(240,230,204,0.15);border-radius:3px;padding:12px 10px;cursor:pointer;';
      exploreBtn.innerHTML = '<span class="en">Explore with me</span><span class="es" style="display:none;">Explorar conmigo</span>';
      exploreBtn.addEventListener('click', function() {
        if (btnRow.parentNode) btnRow.parentNode.removeChild(btnRow);
        pwsTWSPathB();
      });
      btnRow.appendChild(yesBtn);
      btnRow.appendChild(exploreBtn);
      feedEl.appendChild(btnRow);
      feedEl.scrollTop = feedEl.scrollHeight;
    }, 300);
  }

  function pwsTWSPathA() {
    _twsPhase = 'path_a';
    var msgEN = 'Tell me about it.\n\nWhat are you working on or wanting to create?';
    var msgES = 'Cu\u00e9ntame.\n\n\u00bfEn qu\u00e9 est\u00e1s trabajando o qu\u00e9 quieres crear?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'YES \u2014 I know what I want' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSPathB() {
    _twsProjectType = 'get-good';
    _twsPhase = 'path_b_category';
    var msgEN = 'No problem. Let\u2019s find it.\n\nWhich of these calls you?';
    var msgES = 'Sin problema. Vamos a encontrarlo.\n\n\u00bfCu\u00e1l de estas te llama?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Not sure yet' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(false);
    pwsTWSRenderCategories();
  }

  function pwsTWSRenderCategories() {
    var feed = document.getElementById('pwsTWSFeed');
    if (!feed) return;
    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 0;width:100%;';
    TWS_CATEGORIES.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.2);border-radius:6px;padding:14px 10px;cursor:pointer;font-family:\'Cinzel\',serif;font-size:13px !important;letter-spacing:0.1em;text-transform:uppercase;color:#f0e6cc;transition:border-color 0.2s,background 0.2s;';
      btn.innerHTML = '<span style="font-size:26px !important;line-height:1;">' + cat.emoji + '</span>' +
        '<span class="en">' + escHtml(cat.label) + '</span>' +
        '<span class="es" style="display:none;">' + escHtml(cat.labelEs) + '</span>';
      (function(c) {
        btn.addEventListener('click', function() {
          if (grid.parentNode) grid.parentNode.removeChild(grid);
          pwsTWSCategorySelected(c);
        });
      }(cat));
      grid.appendChild(btn);
    });
    feed.appendChild(grid);
    feed.scrollTop = feed.scrollHeight;
  }

  /* Submenu skill lists per category — 4-6 options + Something Else */
  var TWS_SUBMENUS = {
    'Move Your Body':      ['Dance', 'Fitness', 'Martial Arts', 'Yoga', 'Swimming', 'Running'],
    'Make Stuff':          ['Drawing & Art', 'Music', 'Writing', 'Photography', 'Cooking', 'Crafts'],
    'Build Things':        ['Woodworking', 'Coding', 'Electronics', 'Mechanics', 'Architecture', 'DIY Home'],
    'Play & Compete':      ['Chess', 'Card Games', 'Video Games', 'Sports Strategy', 'Puzzles', 'Trivia'],
    'Own the Outdoors':    ['Hiking', 'Gardening', 'Survival Skills', 'Fishing', 'Camping', 'Nature Study'],
    'Connect with People': ['Public Speaking', 'Singing', 'Comedy', 'Teaching', 'Podcasting', 'Storytelling'],
    'Weird & Awesome':     ['Magic Tricks', 'Knife Throwing', 'Juggling', 'Origami', 'Beatboxing', 'Yo-Yo']
  };

  function pwsTWSCategorySelected(cat) {
    _twsSelectedCategory = cat.key;
    pwsTWSAppendBubble(cat.emoji + ' ' + cat.label, 'member');
    var promptEN = 'Good. What specifically calls you?';
    var promptES = 'Bien. \u00bfQu\u00e9 especificamente te llama?';
    pwsTWSAppendBubble(_lang === 'es' ? promptES : promptEN, 'docb');
    pwsTWSShowInput(false);
    pwsTWSRenderSubmenu(cat);
  }

  function pwsTWSRenderSubmenu(cat) {
    var feed = document.getElementById('pwsTWSFeed');
    if (!feed) return;
    var skills = TWS_SUBMENUS[cat.key] || [];
    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 0;width:100%;';
    var btnStyle = 'display:flex;align-items:center;justify-content:center;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.2);border-radius:6px;padding:12px 10px;cursor:pointer;font-family:\'Cinzel\',serif;font-size:12px !important;letter-spacing:0.1em;text-transform:uppercase;color:#f0e6cc;transition:border-color 0.2s,background 0.2s;text-align:center;';
    skills.forEach(function(skill) {
      var btn = document.createElement('button');
      btn.style.cssText = btnStyle;
      btn.textContent = skill;
      (function(sk) {
        btn.addEventListener('click', function() {
          if (grid.parentNode) grid.parentNode.removeChild(grid);
          pwsTWSSkillSelected(cat, sk);
        });
      }(skill));
      grid.appendChild(btn);
    });
    var elseBtn = document.createElement('button');
    elseBtn.style.cssText = btnStyle + 'border-color:rgba(200,168,75,0.4);color:rgba(200,168,75,0.85);grid-column:1/-1;';
    elseBtn.textContent = '\u2728 Something Else';
    elseBtn.addEventListener('click', function() {
      if (grid.parentNode) grid.parentNode.removeChild(grid);
      pwsTWSSkillSomethingElse(cat);
    });
    grid.appendChild(elseBtn);
    feed.appendChild(grid);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsTWSSkillSelected(cat, skill) {
    _twsSelectedSkill = skill;
    _twsPhase = 'path_b_build';
    pwsTWSAppendBubble(skill, 'member');
    var msgEN = 'Let\'s build your ' + skill + ' project.\n\nWhat does mastery look like for you? What would you be able to do that you can\'t do today?';
    var msgES = 'Vamos a construir tu proyecto de ' + skill + '.\n\n\u00bfC\u00f3mo se ver\u00eda la maestr\u00eda para ti? \u00bfQu\u00e9 podr\u00edas hacer que hoy no puedes?';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Category: ' + cat.label + ', Skill: ' + skill },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSSkillSomethingElse(cat) {
    _twsSelectedSkill = '';
    _twsPhase = 'path_b_build';
    pwsTWSAppendBubble('\u2728 Something Else', 'member');
    var msgEN = 'What is it? Tell me what you want to get good at.';
    var msgES = '\u00bfQu\u00e9 es? Cu\u00e9ntame en qu\u00e9 quieres ser bueno.';
    var msg = _lang === 'es' ? msgES : msgEN;
    pwsTWSAppendBubble(msg, 'docb');
    _twsHistory = [
      { role: 'user', content: 'Category: ' + cat.label + ', Skill: Something Else' },
      { role: 'assistant', content: msg }
    ];
    pwsTWSShowInput(true);
  }

  function pwsTWSShowInput(show) {
    var row = document.getElementById('pwsTWSInputRow');
    if (row) row.style.display = show ? 'flex' : 'none';
    if (show) {
      var inp = document.getElementById('pwsTWSInput');
      if (inp) setTimeout(function() { inp.focus(); }, 80);
    }
  }

  function pwsSendTWS() {
    var inp = document.getElementById('pwsTWSInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    twsStopMic();
    pwsTWSAppendBubble(text, 'member');
    _twsHistory.push({ role: 'user', content: text });
    if (_twsPhase === 'work') {
      var workSys = 'You are Doc B, coaching ' + (_lang === 'es' ? 'en español' : 'in English') + ' on the project "' + (_twsProject && _twsProject.title || 'this project') + '". ' +
        'The member has these workstreams: ' + (_twsProject && _twsProject.activities ? _twsProject.activities.map(function(a) { return a.title || a; }).join(', ') : '') + '. ' +
        'Be brief, direct, and actionable. One focused question or suggestion at a time. Never create a new project or ask for a project name.';
      var typingId2 = 'pws-tws-typing-' + Date.now();
      var feed2 = document.getElementById('pwsTWSFeed');
      if (feed2) { var td2 = document.createElement('div'); td2.className = 'pws-docb-bubble docb'; td2.id = typingId2; td2.textContent = '\u2026'; feed2.appendChild(td2); feed2.scrollTop = feed2.scrollHeight; }
      pwsTWSShowInput(false);
      post({ action: 'cftConvTurn', systemPrompt: workSys, conversationHistory: _twsHistory.slice() }).then(function(d) {
        var t2 = document.getElementById(typingId2); if (t2) t2.parentNode.removeChild(t2);
        var reply = (d && d.reply) ? d.reply : (_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.');
        pwsTWSAppendBubble(reply, 'docb'); _twsHistory.push({ role: 'assistant', content: reply }); pwsTWSShowInput(true);
      }).catch(function() {
        var t2 = document.getElementById(typingId2); if (t2) t2.parentNode.removeChild(t2);
        pwsTWSAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); pwsTWSShowInput(true);
      });
      return;
    }

    if (_twsPhase === 'main_obstacle') {
      if (_twsProject) { _twsProject.obstacle = text; }
      pwsUpdateProject({ obstacle: text });
      var actIntro_EN = 'A project this size needs a plan. Let me suggest some steps to get you there \u2014 you tell me what fits.';
      var actIntro_ES = 'Un proyecto de este tama\u00f1o necesita un plan. D\u00e9jame sugerirte algunos pasos para llegar ah\u00ed \u2014 t\u00fa me dices qu\u00e9 encaja.';
      pwsTWSAppendBubble(_lang === 'es' ? actIntro_ES : actIntro_EN, 'docb');
      _twsPhase = 'activities_build';
      _twsActivities = [];
      pwsTWSProposeActivities();
      return;
    }
    if (_twsPhase === 'activities_build') {
      pwsTWSCallDocBActivities();
      return;
    }
    if (_twsPhase === 'mastery_1') {
      if (_twsProject) { _twsProject.masteryVision = text; }
      pwsUpdateProject({ masteryVision: text });
      var closeEN = 'Your project is saved and your tools are ready.\n\nHead to Tools & Entertainment and activate them \u2014 that\u2019s where we\u2019ll set up exactly how your sessions run.';
      var closeES = 'Tu proyecto est\u00e1 guardado y tus herramientas est\u00e1n listas.\n\nVe a Herramientas y Entretenimiento y act\u00edvalas \u2014 ah\u00ed configuraremos c\u00f3mo corren tus sesiones.';
      pwsTWSAppendBubble(_lang === 'es' ? closeES : closeEN, 'docb');
      _twsPhase = 'done';
      setTimeout(function() {
        pwsCloseTWS();
        pwsRenderProjectTile(null);
        pwsUpdateAccordionStatus();
      }, 2200);
      return;
    }
    if (_twsPhase === 'entry' || _twsPhase === 'path_a') {
      _twsPhase = 'path_a';
    }
    pwsTWSCallDocB();
  }

  function pwsTWSCallDocB() {
    var typingId = 'pws-tws-typing-' + Date.now();
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }
    var catContext = _twsSelectedCategory ? ' The member is working in the category: "' + _twsSelectedCategory + '".' : '';
    var skillContext = _twsSelectedSkill ? ' Their specific chosen skill is: "' + _twsSelectedSkill + '".' : '';
    var typeContext = _twsProjectType === 'main'
      ? ' This is a MAIN LIFE PROJECT — something they want to build and put into the world. Ask about impact, vision, what changes when it\'s done. Not mastery of a skill.'
      : ' This is a GET-GOOD project — a skill or practice they want to master.';
    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' You are having a real conversation with an adult member who is building a project in their Talent Work Station.' + catContext + skillContext + typeContext +
      ' Your goal: understand what they want to create, build, or become, then generate a project card.' +
      ' Ask ONE focused question at a time. Be warm, direct. Do NOT echo their words verbatim \u2014 rephrase, elevate, believe in them.' +
      ' Do NOT repeat any question you have already asked. Continue naturally from the conversation history.' +
      ' When you have a clear enough picture (title, what the project is), end with PROJECT_READY on its own line, then JSON: {"title":"2-5 vivid words","description":"One empowering sentence","photo":"","category":"' + (_twsSelectedCategory || '') + '","skill":"' + (_twsSelectedSkill || '') + '","type":"' + (_twsProjectType || 'main') + '"}.' +
      ' Keep each response to 2-3 sentences max. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _twsHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTWSAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _twsHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('PROJECT_READY');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        if (displayMsg) pwsTWSAppendBubble(displayMsg, 'docb');
        var jsonStart = reply.indexOf('{', markerIdx);
        var jsonEnd = reply.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            var projData = JSON.parse(reply.substring(jsonStart, jsonEnd + 1));
            pwsTWSFinalize(projData);
          } catch(e) {
            pwsTWSAppendBubble(_lang === 'es' ? 'Algo sali\u00f3 mal. Int\u00e9ntalo de nuevo.' : 'Something went wrong. Try again.', 'docb');
          }
        }
      } else {
        pwsTWSAppendBubble(reply, 'docb');
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTWSAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  }

  function pwsTWSFinalize(projData) {
    _twsPhase = 'done';
    var newProjId = 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    var resolvedType = _twsProjectType || projData.type || 'main';
    _twsProject = {
      projectId:          newProjId,
      title:              projData.title       || 'My Project',
      description:        projData.description || '',
      photo:              projData.photo        || '',
      category:           projData.category    || _twsSelectedCategory || '',
      skill:              projData.skill       || _twsSelectedSkill    || '',
      type:               resolvedType,
      tools:              'Music,CFT,Contacts,Doc B,Links,Timer,Reminders',
      masteryStage:       1,
      sessionCount:       0,
      lastPracticed:      '',
      streakDays:         0,
      entertainmentLinks: '[]',
      activities:         [],
      isMain:             resolvedType === 'main',
      isPublic:           false,
      studioWindowId:     '',
      fundingStatus:      'none',
      fundingLetter:      '',
      createdDate:        new Date().toISOString(),
      status:             'active'
    };
    if (!_twsProject.photo) {
      var imgIdx = Math.floor(Math.random() * PWS_WIN_IMGS.length);
      _twsProject.photo = PWS_WIN_IMGS[imgIdx];
    }
    post({
      action:             'projectCreate',
      sessionId:          _session,
      requestingMemberId: _memberId,
      name:               _twsProject.title,
      description:        _twsProject.description,
      lawTag:             'talent',
      category:           _twsProject.category,
      skill:              _twsProject.skill || '',
      photo:              _twsProject.photo,
      type:               _twsProject.type,
      tools:              _twsProject.tools,
      masteryStage:       _twsProject.masteryStage,
      sessionCount:       0,
      lastPracticed:      '',
      streakDays:         0,
      entertainmentLinks: '[]',
      isMain:             true,
      isPublic:           false,
      studioWindowId:     '',
      fundingStatus:      'none',
      fundingLetter:      '',
      activities:         JSON.stringify(_twsProject.activities || []),
      createdDate:        _twsProject.createdDate,
      status:             'active',
      projectData:        _twsProject
    }).catch(function() {});
    var doneEN = '\u2713 Your project is created.\n\n"' + _twsProject.title + '" is now live in My Projects with your tools ready.';
    var doneES = '\u2713 Tu proyecto est\u00e1 creado.\n\n"' + _twsProject.title + '" ya est\u00e1 en Mis Proyectos con tus herramientas listas.';
    pwsTWSAppendBubble(_lang === 'es' ? doneES : doneEN, 'docb');
    setTimeout(function() {
      pwsTWSShowInput(false);
      if (_twsProject.type === 'main') {
        var mainQ_EN = 'One last thing.\n\nWhat\u2019s standing between you and this right now? What\u2019s the biggest obstacle?';
        var mainQ_ES = 'Una \u00faltima cosa.\n\n\u00bfQu\u00e9 se interpone entre t\u00fa y esto ahora mismo? \u00bfCu\u00e1l es el mayor obst\u00e1culo?';
        pwsTWSAppendBubble(_lang === 'es' ? mainQ_ES : mainQ_EN, 'docb');
        pwsTWSShowInput(true);
        _twsPhase = 'main_obstacle';
      } else {
        var masteryEN = 'One more thing before we close.\n\nWhat does mastery look like for you in "' + _twsProject.title + '"? What would you be able to do that you can\u2019t do today?';
        var masteryES = 'Una cosa m\u00e1s antes de cerrar.\n\n\u00bfC\u00f3mo se ver\u00eda la maestr\u00eda para ti en "' + _twsProject.title + '"? \u00bfQu\u00e9 podr\u00edas hacer que hoy no puedes?';
        pwsTWSAppendBubble(_lang === 'es' ? masteryES : masteryEN, 'docb');
        pwsTWSShowInput(true);
        _twsPhase = 'mastery_1';
      }
    }, 1800);
  }

  function pwsTWSProposeActivities() {
    var typingId = 'pws-tws-act-' + Date.now();
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) {
      var dot = document.createElement('div');
      dot.className = 'pws-docb-bubble docb';
      dot.id = typingId;
      dot.textContent = '\u2026';
      feed.appendChild(dot);
      feed.scrollTop = feed.scrollHeight;
    }
    var projTitle = _twsProject ? _twsProject.title : 'this project';
    var projDesc  = _twsProject ? (_twsProject.description || '') : '';
    var obstacle  = _twsProject ? (_twsProject.obstacle || '') : '';
    var sys = 'You are Doc B helping plan a major life project called "' + projTitle + '".' +
      (projDesc ? ' Description: ' + projDesc + '.' : '') +
      (obstacle ? ' Main obstacle: ' + obstacle + '.' : '') +
      ' Propose 6-8 ordered, concrete workstreams needed to make this project real.' +
      ' Number them. Keep each title under 6 words.' +
      ' Then ask: "Does this feel right? Remove anything, add anything, or say GO to lock it in."' +
      ' When the member confirms or says GO, end your reply with ACTIVITIES_READY on its own line, then JSON array:' +
      ' [{"title":"Activity name","tools":"Music,Timer,Doc B"},...]' +
      ' Use only these tool names: Music, Timer, Links, Contacts, Doc B, Notes, Reminders, CFT, Camera, Video Links.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: _twsProject ? _twsProject.projectId : '', systemPrompt: sys, conversationHistory: _twsHistory.slice() })
    .then(function(d) {
      var reply = (d && d.reply) ? d.reply : '';
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTWSAppendBubble('Try again in a moment.', 'docb'); return; }
      _twsHistory.push({ role: 'assistant', content: reply });
      pwsHandleActivitiesReply(reply);
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTWSAppendBubble('Try again in a moment.', 'docb');
    });
  }

  function pwsTWSCallDocBActivities() {
    var typingId = 'pws-tws-act2-' + Date.now();
    var feed = document.getElementById('pwsTWSFeed');
    if (feed) {
      var dot = document.createElement('div');
      dot.className = 'pws-docb-bubble docb';
      dot.id = typingId;
      dot.textContent = '\u2026';
      feed.appendChild(dot);
      feed.scrollTop = feed.scrollHeight;
    }
    var sys = 'You are Doc B. The member is reviewing a proposed activity list for "' + (_twsProject ? _twsProject.title : 'their project') + '".' +
      ' Help them refine it. When they confirm or say GO, end with ACTIVITIES_READY on its own line, then JSON array:' +
      ' [{"title":"Activity name","tools":"Music,Timer,Doc B"},...]' +
      ' Use only these tool names: Music, Timer, Links, Contacts, Doc B, Notes, Reminders, CFT, Camera, Video Links.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: _twsProject ? _twsProject.projectId : '', systemPrompt: sys, conversationHistory: _twsHistory.slice() })
    .then(function(d) {
      var reply = (d && d.reply) ? d.reply : '';
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTWSAppendBubble('Try again in a moment.', 'docb'); return; }
      _twsHistory.push({ role: 'assistant', content: reply });
      pwsHandleActivitiesReply(reply);
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTWSAppendBubble('Try again in a moment.', 'docb');
    });
  }

  function pwsHandleActivitiesReply(reply) {
    if (reply.indexOf('ACTIVITIES_READY') !== -1) {
      var beforeAct = reply.substring(0, reply.indexOf('ACTIVITIES_READY')).trim();
      if (beforeAct) pwsTWSAppendBubble(beforeAct, 'docb');
      var js = reply.indexOf('[', reply.indexOf('ACTIVITIES_READY'));
      var je = reply.lastIndexOf(']');
      if (js !== -1 && je !== -1) {
        try {
          var parsed = JSON.parse(reply.substring(js, je + 1));
          var activitiesData = parsed.map(function(a, i) {
            return {
              id:     'act_' + Date.now() + '_' + i,
              title:  (typeof a === 'string') ? a : (a.title || ''),
              tools:  (typeof a === 'object' && a.tools) ? a.tools : 'Doc B,Timer',
              status: 'not-started'
            };
          });
          if (_twsProject) { _twsProject.activities = activitiesData; }
          pwsUpdateProject({ activities: JSON.stringify(activitiesData) });
          if (_toolsData && _toolsData.confirmedTools) {
            _toolsData.confirmedTools.forEach(function(ct) {
              if (ct.isTalent === true && ct.projectId === (_twsProject && _twsProject.projectId)) {
                ct._activities = activitiesData;
              }
            });
            if (_twsProject && _twsProject.projectId) {
              if (!_toolsData._projectActivities) _toolsData._projectActivities = {};
              _toolsData._projectActivities[_twsProject.projectId] = activitiesData;
            }
            post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() }).catch(function() {});
          }
          var count = activitiesData.length;
          var doneEN = '\u2713 Your plan is set. ' + count + ' workstreams saved \u2014 each gets its own tools when you activate it. Head to My Projects to begin.';
          var doneES = '\u2713 Tu plan est\u00e1 listo. ' + count + ' ejes guardados \u2014 cada uno tiene sus propias herramientas cuando lo actives. Ve a Mis Proyectos.';
          pwsTWSAppendBubble(_lang === 'es' ? doneES : doneEN, 'docb');
          _twsPhase = 'done';
          setTimeout(function() {
            pwsCloseTWS();
            pwsRenderProjectTile(null);
            pwsUpdateAccordionStatus();
          }, 2500);
        } catch(e) { pwsTWSAppendBubble(reply, 'docb'); }
      }
    } else {
      pwsTWSAppendBubble(reply, 'docb');
      pwsTWSShowInput(true);
    }
  }

  function pwsTWSAppendBubble(text, role) {
    var feed = document.getElementById('pwsTWSFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function twsStopMic() {
    if (_twsRecognizer) { try { _twsRecognizer.stop(); _twsRecognizer.onresult = null; _twsRecognizer.onend = null; } catch(e) {} _twsRecognizer = null; }
    _twsMicActive = false;
    var btn = document.getElementById('pwsTWSMic');
    if (btn) btn.classList.remove('listening');
  }

  function pwsToggleTWSMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_twsMicActive) { twsStopMic(); return; }
    twsStopMic();
    _twsRecognizer = new SR();
    _twsRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _twsRecognizer.continuous = true;
    _twsRecognizer.interimResults = true;
    _twsRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } var inp = document.getElementById('pwsTWSInput'); if (inp) inp.value = transcript.trim(); };
    _twsRecognizer.onend = function() {
      _twsMicActive = false;
      var btn = document.getElementById('pwsTWSMic');
      if (btn) btn.classList.remove('listening');
    };
    _twsRecognizer.start();
    _twsMicActive = true;
    var btn = document.getElementById('pwsTWSMic');
    if (btn) btn.classList.add('listening');
  }

  function pwsOpenTWSCFT() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'You need funds for your project. Tell me: what do you need and how much?';
      var msgES = 'Necesitas fondos para tu proyecto. D\u00edme: \u00bfqu\u00e9 necesitas y cu\u00e1nto?';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSContacts() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'Who do you need to reach out to for this project?';
      var msgES = '\u00bfA qui\u00e9n necesitas contactar para este proyecto?';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSLinks() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'What resource or link do you need for your project? Share it here.';
      var msgES = '\u00bfQu\u00e9 recurso o enlace necesitas? Comp\u00e1rtelo aqu\u00ed.';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSTimer() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'Let\u2019s time your work session. Tell me when you\u2019re ready and I\u2019ll start the clock.';
      var msgES = 'Vamos a cronometrar tu sesi\u00f3n. D\u00edme cuando est\u00e9s listo y empezamos.';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSRecord() {
    pwsOpenDocB();
    setTimeout(function() {
      var msgEN = 'Ready to record? Open your device camera or microphone app to capture your work.';
      var msgES = '\u00bfListo para grabar? Abre tu c\u00e1mara o micr\u00f3fono para capturar tu trabajo.';
      pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
    }, 300);
  }

  function pwsOpenTWSCamera() {
    var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      pwsOpenDocB();
      setTimeout(function() {
        var msgEN = 'Camera ready. Open your phone camera to capture your work and come back to share it.';
        var msgES = 'C\u00e1mara lista. Abre la c\u00e1mara de tu tel\u00e9fono y regresa a compartir.';
        pwsAppendBubble(_lang === 'es' ? msgES : msgEN, 'docb');
      }, 300);
    } else {
      var feed = pwsTWSGetFeed();
      if (!feed) return;
      var existing = document.getElementById('pwsTWSCameraPanel');
      if (existing) { existing.parentNode.removeChild(existing); return; }
      pwsTWSClosePanels('pwsTWSCameraPanel');
      var panel = document.createElement('div');
      panel.className = 'pws-links-panel';
      panel.id = 'pwsTWSCameraPanel';
      var label = document.createElement('div');
      label.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,168,75,0.6);margin-bottom:10px;';
      label.innerHTML = '<span class="en">Attach Image or Video</span><span class="es">Adjuntar Imagen o Video</span>';
      panel.appendChild(label);
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,video/*';
      fileInput.style.cssText = "display:block;width:100%;font-family:'Cormorant Garamond',serif;font-size:18px !important;color:#f0e6cc;background:rgba(240,230,204,0.04);border:1px solid rgba(200,168,75,0.25);border-radius:4px;padding:8px 10px;cursor:pointer;box-sizing:border-box;";
      fileInput.addEventListener('change', function() {
        if (!fileInput.files || !fileInput.files.length) return;
        var file = fileInput.files[0];
        var confirm = document.createElement('div');
        confirm.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:20px !important;font-style:italic;color:#4caf82;margin-top:10px;";
        confirm.textContent = '\u2713 ' + file.name + (_lang === 'es' ? ' adjuntado.' : ' attached.');
        panel.appendChild(confirm);
        if (_twsProject) {
          if (!_twsProject.attachments) _twsProject.attachments = [];
          _twsProject.attachments.push({ name: file.name, type: file.type, date: new Date().toISOString().substring(0,10) });
          post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId, name: _twsProject.title || 'Project', lawTag: 'talent', projectData: _twsProject }).catch(function() {});
        }
      });
      panel.appendChild(fileInput);
      feed.appendChild(panel);
      feed.scrollTop = feed.scrollHeight;
    }
  }

  function pwsOpenTWSNotes() {
    var ov = document.getElementById('pwsTWSNotesOverlay');
    if (ov) ov.classList.add('open');
    var area = document.getElementById('pwsTWSNotesArea');
    if (area) { area.value = _twsNotesDraft || ''; setTimeout(function() { area.focus(); }, 80); }
    var closeBtn = document.getElementById('pwsTWSNotesCloseBtn');
    if (closeBtn) {
      var clone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(clone, closeBtn);
      clone.addEventListener('click', function() {
        var areaEl = document.getElementById('pwsTWSNotesArea');
        if (areaEl) _twsNotesDraft = areaEl.value;
        var notesOv = document.getElementById('pwsTWSNotesOverlay');
        if (notesOv) notesOv.classList.remove('open');
      });
    }
    var saveBtn = document.getElementById('pwsTWSNotesSaveBtn');
    if (saveBtn) {
      var sClone = saveBtn.cloneNode(true);
      saveBtn.parentNode.replaceChild(sClone, saveBtn);
      sClone.addEventListener('click', function() {
        var areaEl = document.getElementById('pwsTWSNotesArea');
        if (areaEl) _twsNotesDraft = areaEl.value;
        if (_twsProject) {
          _twsProject.notes = _twsNotesDraft;
          post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId, name: _twsProject.title || 'Project', lawTag: 'talent', projectData: _twsProject }).catch(function() {});
        }
        var notesOv = document.getElementById('pwsTWSNotesOverlay');
        if (notesOv) notesOv.classList.remove('open');
      });
    }
  }

  /* TWS accordion auto-open hook: when MY PROJECTS accordion opens with no project */
  var _twsAccordionHooked = false;
  function pwsTWSHookAccordion() {
    if (_twsAccordionHooked) return;
    _twsAccordionHooked = true;
    var hdr = document.getElementById('pwsAccordionTalentHdr');
    if (!hdr) return;
    hdr.addEventListener('click', function() {
      setTimeout(function() {
        var card = document.getElementById('pwsAccordionTalent');
        if (!card || !card.classList.contains('open')) return;
        var hasProject = (_projectData && _projectData.projectId) || (_twsProject && _twsProject.title);
        if (!hasProject && _session) pwsOpenTWS();
      }, 600);
    });
  }

  function pwsToggleTalentMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_talentMicActive) {
      if (_talentRecognizer) { try { _talentRecognizer.stop(); } catch(e) {} _talentRecognizer = null; }
      _talentMicActive = false;
      var btn = document.getElementById('pwsTalentMic');
      if (btn) btn.classList.remove('listening');
      return;
    }
    _talentRecognizer = new SR();
    _talentRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _talentRecognizer.continuous = true;
    _talentRecognizer.interimResults = true;
    _talentRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } if (inp) inp.value = transcript.trim(); };
    _talentRecognizer.onend = function() {
      _talentMicActive = false;
      var btn = document.getElementById('pwsTalentMic');
      if (btn) btn.classList.remove('listening');
    };
    _talentRecognizer.start();
    _talentMicActive = true;
    var btn = document.getElementById('pwsTalentMic');
    if (btn) btn.classList.add('listening');
  }

  /* ADULT ONBOARDING -- builds station, tools, and day from scra */


  function pwsWireDrag(container) {
    var dragSrcIdx = null;
    container.addEventListener('dragstart', function(ev) { var row = ev.target.closest ? ev.target.closest('.pws-plan-seq-row') : null; if (!row) return; dragSrcIdx = parseInt(row.getAttribute('data-idx'), 10); row.classList.add('dragging'); ev.dataTransfer.effectAllowed = 'move'; });
    container.addEventListener('dragover', function(ev) { ev.preventDefault(); ev.dataTransfer.dropEffect = 'move'; var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) rows[i].classList.remove('drag-over'); var row = ev.target.closest ? ev.target.closest('.pws-plan-seq-row') : null; if (row) row.classList.add('drag-over'); });
    container.addEventListener('dragleave', function() { var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) rows[i].classList.remove('drag-over'); });
    container.addEventListener('drop', function(ev) {
      ev.preventDefault(); var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) { rows[i].classList.remove('drag-over'); rows[i].classList.remove('dragging'); }
      var row = ev.target.closest ? ev.target.closest('.pws-plan-seq-row') : null; if (!row || dragSrcIdx === null) return;
      var dropIdx = parseInt(row.getAttribute('data-idx'), 10); if (dragSrcIdx === dropIdx) return;
      var sched = _dayData.finalSchedule; var moved = sched.splice(dragSrcIdx, 1)[0]; sched.splice(dropIdx, 0, moved); dragSrcIdx = null;
      pwsSaveDaySchedule(); pwsRenderDayTile();
    });
    container.addEventListener('dragend', function() { var rows = container.querySelectorAll('.pws-plan-seq-row'); for (var i = 0; i < rows.length; i++) { rows[i].classList.remove('dragging'); rows[i].classList.remove('drag-over'); } dragSrcIdx = null; });
    container.addEventListener('focusout', function(ev) {
      var ta = ev.target; if (!ta || !ta.classList.contains('pws-item-note')) return;
      var id = ta.id || ''; var match = id.match(/^pwsNote(\d+)$/); if (!match) return; pwsSaveNote(parseInt(match[1], 10));
    });
    container.addEventListener('click', function(ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-gaming-play]') : null;
      if (btn) { ev.stopPropagation(); pwsOpenDeparture('https://4lawsacademy.com/games?unlock=' + btn.getAttribute('data-gaming-play'), 'Games'); return; }
      var mBtn = ev.target.closest ? ev.target.closest('[data-music-link]') : null;
      if (mBtn) { ev.stopPropagation(); pwsOpenDeparture('/music', _lang === 'es' ? 'Sala de Musica' : 'Music Room'); return; }
      var cBtn = ev.target.closest ? ev.target.closest('[data-mastery-checkin]') : null;
      if (cBtn) {
        ev.stopPropagation();
        var mStage = parseInt(cBtn.getAttribute('data-mastery-stage'), 10) || 1;
        var mProjId = cBtn.getAttribute('data-mastery-projid') || '';
        pwsOpenMasteryCheckIn(mProjId, mStage);
        return;
      }
      var lBtn = ev.target.closest ? ev.target.closest('[data-launch-tool]') : null;
      if (lBtn) {
        ev.stopPropagation();
        var tIdx = parseInt(lBtn.getAttribute('data-launch-tool'), 10);
        var btnObligation = lBtn.getAttribute('data-obligation') || '';
        var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
        var launchTool = validTools[tIdx];
        // Fix 4: If stored index points to wrong tool, find by obligation label
        if (!launchTool || (btnObligation && launchTool.obligation !== btnObligation && launchTool.en !== btnObligation)) {
          launchTool = null;
          if (btnObligation) {
            for (var fi = 0; fi < validTools.length; fi++) {
              if (validTools[fi].obligation === btnObligation || validTools[fi].en === btnObligation) {
                launchTool = validTools[fi];
                tIdx = fi;
                break;
              }
            }
          }
        }
        if (!launchTool) return;
        if (launchTool.configured) {
          pwsFireTool(launchTool);
        } else {
          pwsOpenPlanUse(tIdx);
        }
      }
      var wBtn = ev.target.closest ? ev.target.closest('[data-launch-window]') : null;
      if (wBtn) {
        ev.stopPropagation();
        var wLabel = wBtn.getAttribute('data-launch-window') || '';
        // PLUMBING FIX: always fetch fresh window config at launch time — never rely on stale cache
        post({ action: 'pwsGetWindowConfig', sessionId: _session, requestingMemberId: _memberId })
        .then(function(wd) {
          if (wd && wd.status === 'ok' && wd.data) _windowConfig = wd.data;
          var wCfg = (_windowConfig && wLabel && _windowConfig[wLabel]) ? _windowConfig[wLabel] : {};
          var synth = {
            obligation:  wLabel,
            en:          wLabel,
            es:          wLabel,
            label:       wLabel,
            configured:  true,
            hasAssist:   true,
            links:       wCfg.links    || [],
            contacts:    wCfg.contacts || [],
            notes:       wCfg.notes    || '',
            _presel: {
              timer:   !!(wCfg.tools && wCfg.tools.indexOf('timer')    !== -1),
              music:   !!(wCfg.tools && wCfg.tools.indexOf('music')    !== -1),
              links:   !!(wCfg.links   && wCfg.links.length),
              contact: !!(wCfg.contacts && wCfg.contacts.length),
              cash:    !!(wCfg.tools && wCfg.tools.indexOf('cash')     !== -1),
              remind:  !!(wCfg.tools && wCfg.tools.indexOf('reminders') !== -1),
              assist:  true
            },
            _isWindowLaunch: true,
            _windowLabel:    wLabel
          };
          _useTool = synth;
          pwsOpenUse(synth, false);
        }).catch(function() {
          // fallback to cached config if fetch fails
          var wCfg2 = (_windowConfig && wLabel && _windowConfig[wLabel]) ? _windowConfig[wLabel] : {};
          var synth2 = { obligation: wLabel, en: wLabel, es: wLabel, label: wLabel, configured: true, hasAssist: true,
            links: wCfg2.links || [], contacts: wCfg2.contacts || [], notes: wCfg2.notes || '',
            _presel: { timer: false, music: false, links: !!(wCfg2.links && wCfg2.links.length), contact: !!(wCfg2.contacts && wCfg2.contacts.length), cash: false, remind: false, assist: true },
            _isWindowLaunch: true, _windowLabel: wLabel };
          _useTool = synth2; pwsOpenUse(synth2, false);
        });
      }
    });
  }

  window.pwsToggleNote = function pwsToggleNote(idx) {
    var wrap = document.getElementById('pwsNoteWrap' + idx); if (!wrap) return;
    var isOpen = wrap.classList.contains('open'); wrap.classList.toggle('open', !isOpen);
    if (!isOpen) { var ta = document.getElementById('pwsNote' + idx); if (ta) setTimeout(function() { ta.focus(); }, 60); }
  };

  window.pwsSaveNote = function pwsSaveNote(idx) {
    var ta = document.getElementById('pwsNote' + idx); if (!ta || !_dayData || !_dayData.finalSchedule) return;
    var sched = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false; }); var item = sched[idx]; if (!item) return;
    item.note = ta.value; pwsSaveDaySchedule();
    var body = ta.closest ? ta.closest('.pws-plan-seq-body') : null; var labelEl = body ? body.querySelector('.pws-plan-seq-label') : null;
    if (labelEl) { var existingInd = labelEl.querySelector('.pws-note-indicator'); if (item.note.trim()) { if (!existingInd) { var ind = document.createElement('span'); ind.className = 'pws-note-indicator'; ind.title = 'Note'; ind.innerHTML = '&#x270E;'; labelEl.appendChild(ind); } } else { if (existingInd) existingInd.parentNode.removeChild(existingInd); } }
  };

  window.pwsShowTodoInput = function pwsShowTodoInput() {
    var addRow = document.getElementById('pwsAddTodoRow'); var inputRow = document.getElementById('pwsTodoInputRow'); var inp = document.getElementById('pwsTodoInput');
    if (addRow) addRow.style.display = 'none'; if (inputRow) inputRow.classList.add('open'); if (inp) setTimeout(function() { inp.focus(); }, 60);
  };

  window.pwsCancelTodo = function pwsCancelTodo() {
    var addRow = document.getElementById('pwsAddTodoRow'); var inputRow = document.getElementById('pwsTodoInputRow'); var inp = document.getElementById('pwsTodoInput');
    if (inputRow) inputRow.classList.remove('open'); if (addRow) addRow.style.display = 'flex'; if (inp) inp.value = '';
  };

  window.pwsCommitTodo = function pwsCommitTodo() {
    var inp = document.getElementById('pwsTodoInput'); if (!inp || !inp.value.trim()) { pwsCancelTodo(); return; }
    var text = inp.value.trim(); inp.value = '';
    if (!_dayData) _dayData = {}; if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
    _dayData.finalSchedule.push({ type: 'todo', label: text, isTodo: true, ownsIt: true, note: '', _checkedIn: '', seq: _dayData.finalSchedule.length + 1 });
    pwsSaveDaySchedule(); pwsRenderDayTile(); pwsCancelTodo();
  };

  window.pwsDeleteTodo = function pwsDeleteTodo(idx) {
    if (!_dayData || !_dayData.finalSchedule) return;
    var sched = _dayData.finalSchedule.filter(function(s) { return s.ownsIt !== false; }); var item = sched[idx];
    if (!item || !item.isTodo) return;
    var fullIdx = _dayData.finalSchedule.indexOf(item); if (fullIdx > -1) _dayData.finalSchedule.splice(fullIdx, 1);
    pwsSaveDaySchedule(); pwsRenderDayTile();
  };

  function pwsSaveDaySchedule() {
    if (!_dayData) return;
    var cleanSchedule = (_dayData.finalSchedule || []).map(function(slot) {
      var clean = {};
      var keys = Object.keys(slot);
      for (var k = 0; k < keys.length; k++) {
        if (keys[k] !== '_checkedIn') clean[keys[k]] = slot[keys[k]];
      }
      return clean;
    });
    post({ action: 'pwsSaveDay', sessionId: _session, requestingMemberId: _memberId, data: { finalSchedule: cleanSchedule, wakeTime: _dayData.wakeTime || '', bedTime: _dayData.bedTime || '', rankedPriorities: _dayData.rankedPriorities || [], howGoodCould: _dayData.howGoodCould || '', howGoodWant: _dayData.howGoodWant || '' } });
    pwsUpdateSavedLabel('pwsDaySaved', new Date().toISOString());
  }

  var _roleUrls = { 'kid': '4lawsacademy.com/youth', 'young_adult': '4lawsacademy.com/self', 'couple': '4lawsacademy.com/couples', 'family': '4lawsacademy.com/family' };
  var _roleLines = { 'kid': 'Your rights. Your fire. Your call.', 'young_adult': 'Your rights. Your fire. Your call.', 'couple': 'Have a Trust & Talent marriage.', 'family': 'Build a culture your kids will thank you for.' };

  function pwsBuildInviteMessage(name, shortUrl, role) {
    var displayName = name || 'Your family member';
    var roleUrl = _roleUrls[role] || '4lawsacademy.com/family';
    var roleLine = _roleLines[role] || '';
    return displayName + ' \u2014 your family just purchased a trust and talent system. Check out your portal: ' + shortUrl + '\n\n' + roleLine + ': ' + roleUrl;
  }

  window.pwsOpenInvite = function pwsOpenInvite() {
    var nameEl = document.getElementById('pwsInviteName'); var phone = document.getElementById('pwsInvitePhone'); var rel = document.getElementById('pwsInviteRelationship');
    if (nameEl) nameEl.value = ''; if (phone) phone.value = ''; if (rel) rel.value = '';
    var preview = document.getElementById('pwsInvitePreview'); if (preview) { preview.style.whiteSpace = 'pre-line'; preview.textContent = 'Enter a name, phone, and relationship to preview the message.'; }
    var status = document.getElementById('pwsInviteStatus'); if (status) { status.textContent = ''; status.className = 'pws-invite-status'; }
    var sendBtn = document.getElementById('pwsInviteSendBtn'); if (sendBtn) sendBtn.disabled = true;
    document.getElementById('pwsInviteOverlay').classList.add('open');
    var nameInp = document.getElementById('pwsInviteName'); var phoneInp = document.getElementById('pwsInvitePhone');
    if (nameInp) nameInp.addEventListener('input', pwsInviteUpdatePreview);
    if (phoneInp) phoneInp.addEventListener('input', pwsInviteUpdatePreview);
  };

  window.pwsCloseInvite = function pwsCloseInvite() { document.getElementById('pwsInviteOverlay').classList.remove('open'); };

  window.pwsInviteUpdatePreview = function pwsInviteUpdatePreview() {
    var nameEl = document.getElementById('pwsInviteName'); var phoneEl = document.getElementById('pwsInvitePhone'); var relEl = document.getElementById('pwsInviteRelationship');
    var inviteeName = nameEl ? nameEl.value.trim() : ''; var phone = phoneEl ? phoneEl.value.trim() : ''; var role = relEl ? relEl.value : '';
    var preview = document.getElementById('pwsInvitePreview'); var sendBtn = document.getElementById('pwsInviteSendBtn');
    if (!preview) return;
    if (!role || !phone) { preview.style.whiteSpace = 'normal'; preview.textContent = 'Enter a name, phone, and relationship to preview the message.'; if (sendBtn) sendBtn.disabled = true; return; }
    preview.style.whiteSpace = 'pre-line'; preview.textContent = pwsBuildInviteMessage(inviteeName, phone, role);
    if (sendBtn) sendBtn.disabled = false;
  };

  window.pwsSendInvite = function pwsSendInvite() {
    var nameEl = document.getElementById('pwsInviteName'); var phoneEl = document.getElementById('pwsInvitePhone'); var relEl = document.getElementById('pwsInviteRelationship');
    var inviteeName = nameEl ? nameEl.value.trim() : ''; var phone = phoneEl ? phoneEl.value.trim() : ''; var role = relEl ? relEl.value : '';
    if (!phone || !role) { pwsInviteSetStatus(_lang === 'es' ? 'Ingresa un n\u00famero y elige una relaci\u00f3n.' : 'Enter a phone number and select a relationship.', 'error'); return; }
    var sendBtn = document.getElementById('pwsInviteSendBtn'); if (sendBtn) sendBtn.disabled = true;
    pwsInviteSetStatus(_lang === 'es' ? 'Generando enlace...' : 'Generating link\u2026', '');
    post({ action: 'generateJoinCode', sessionId: _session, requestingMemberId: _memberId, toPhone: phone, role: role })
    .then(function(d) {
      if (!d || d.status !== 'ok') { pwsInviteSetStatus(_lang === 'es' ? 'No se pudo generar el enlace.' : 'Could not generate link.', 'error'); if (sendBtn) sendBtn.disabled = false; return; }
      var msg = pwsBuildInviteMessage(inviteeName, d.shortUrl, role);
      post({ action: 'handleTwilioSMS', sessionId: _session, requestingMemberId: _memberId, toPhone: phone, message: msg, relationship: role })
      .then(function(d2) {
        if (d2 && d2.status === 'ok') {
          var numDisplay = phone.replace(/\d(?=\d{4})/g, '*');
          pwsInviteSetStatus(_lang === 'es' ? 'Invitaci\u00f3n enviada a ' + numDisplay + ' \u2705' : 'Invitation sent to ' + numDisplay + ' \u2705', 'success');
        } else {
          pwsInviteSetStatus(_lang === 'es' ? 'No se pudo enviar \u2014 verifica el n\u00famero e intenta de nuevo.' : 'Couldn\u0027t send \u2014 check the number and try again.', 'error');
          if (sendBtn) sendBtn.disabled = false;
        }
      }).catch(function() { pwsInviteSetStatus(_lang === 'es' ? 'Error de conexi\u00f3n \u2014 intenta de nuevo.' : 'Connection error \u2014 try again.', 'error'); if (sendBtn) sendBtn.disabled = false; });
    }).catch(function() { pwsInviteSetStatus(_lang === 'es' ? 'Error de conexi\u00f3n \u2014 intenta de nuevo.' : 'Connection error \u2014 try again.', 'error'); if (sendBtn) sendBtn.disabled = false; });
  };

  function pwsInviteSetStatus(msg, cls) { var el = document.getElementById('pwsInviteStatus'); if (!el) return; el.textContent = msg; el.className = 'pws-invite-status' + (cls ? ' ' + cls : ''); }

  /* GAMES CONNECTION -- Build June 2026 */

  function pwsCountContributions() {
    var obs = (_obsData && _obsData.confirmedObs) ? _obsData.confirmedObs : [];
    var total = obs.length;
    var crushing = obs.filter(function(o) { return o.state === 'crushing'; }).length;
    return { total: total, crushing: crushing, partial: crushing > 0 && crushing < total };
  }

  function pwsRenderEntertainmentTile(container) {
    if (!container) return;
    var existing = container.querySelector('.pws-ec-tile');
    if (existing) existing.parentNode.removeChild(existing);
    var tile = document.createElement('div');
    tile.className = 'pws-ec-tile';
    tile.style.cssText = 'background:#8B0000;border:1px solid #c8a84b;cursor:pointer;padding:0;overflow:hidden;min-height:80px;';
    tile.addEventListener('click', function() { pwsOpenDeparture('/music', _lang === 'es' ? 'Centro de Entretenimiento' : 'Entertainment Center'); });

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 300 80');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '80');
    svg.innerHTML =
      '<rect x="0" y="0" width="300" height="80" fill="#8B0000"/>' +
      '<rect x="6" y="6" width="288" height="68" fill="none" stroke="#c8a84b" stroke-width="0.75"/>' +
      '<line x1="6" y1="6" x2="22" y2="6" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="6" y1="6" x2="6" y2="22" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="6" x2="278" y2="6" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="6" x2="294" y2="22" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="6" y1="74" x2="22" y2="74" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="6" y1="74" x2="6" y2="58" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="74" x2="278" y2="74" stroke="#c8a84b" stroke-width="1"/>' +
      '<line x1="294" y1="74" x2="294" y2="58" stroke="#c8a84b" stroke-width="1"/>' +
      '<polygon points="150,10 152,15 157,15 153,18 154.5,23 150,20 145.5,23 147,18 143,15 148,15" fill="#c8a84b" opacity="0.9"/>' +
      '<polygon points="150,70 152,65 157,65 153,62 154.5,57 150,60 145.5,57 147,62 143,65 148,65" fill="#c8a84b" opacity="0.9"/>' +
      '<text x="150" y="48" font-family="Cinzel,serif" font-size="22" font-weight="900" fill="#f0e6cc" text-anchor="middle" letter-spacing="6">ENTERTAINMENT CENTER</text>';
    tile.appendChild(svg);
    container.appendChild(tile);
  }

    /* PAUSE -- persistent in USE overlay header */
  var _timerPaused    = false;
  var _timerPausedAt  = 0;

  function pwsActivatePauseKey() {
    var obl = (_useTool && _useTool.obligation) ? _useTool.obligation.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'').substring(0,40) : 'project';
    return 'pws_activate_pause_' + (_memberId || 'guest') + '_' + obl;
  }

  function pwsSaveActivateSession() {
    if (!_useTool || !(_useTool.isTalent || _useTool.type === 'talent')) return;
    var snapshot = {
      obligation:     _useTool.obligation || '',
      toolIdx:        _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool).indexOf(_useTool) : -1,
      history:        _useHistory,
      timerSeconds:   _timerSeconds,
      savedAt:        new Date().toISOString()
    };
    try { localStorage.setItem(pwsActivatePauseKey(), JSON.stringify(snapshot)); } catch(e) {}
  }

  function pwsClearActivateSession() {
    try { localStorage.removeItem(pwsActivatePauseKey()); } catch(e) {}
  }

  function pwsTogglePause() {
    var btn = document.getElementById('pwsUsePauseBtn');
    if (_timerPaused) {
      _timerPaused = false;
      _timerStart = Date.now() - (_timerPausedAt * 1000);
      _timerInterval = setInterval(function() {
        _timerSeconds = Math.floor((Date.now() - _timerStart) / 1000);
        var el = document.getElementById('pwsTimerDisplay');
        if (el) el.textContent = pwsFmtSeconds(_timerSeconds);
      }, 1000);
      if (btn) { btn.classList.remove('paused'); btn.innerHTML = '<span class="en">&#9646;&#9646; Pause</span><span class="es">&#9646;&#9646; Pausa</span>'; }
    } else if (_timerInterval) {
      _timerPaused = true;
      _timerPausedAt = _timerSeconds;
      clearInterval(_timerInterval); _timerInterval = null;
      if (btn) { btn.classList.add('paused'); btn.innerHTML = '<span class="en">&#9654; Resume</span><span class="es">&#9654; Reanudar</span>'; }
      if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
        pwsSaveActivateSession();
      }
    } else if (_useTool && (_useTool.isTalent || _useTool.type === 'talent')) {
      pwsSaveActivateSession();
      useAppendBubble(_lang === 'es'
        ? 'Sesi\u00f3n pausada \u2014 tu progreso est\u00e1 guardado. Regresa cuando quieras y seguimos.'
        : 'Session paused \u2014 your progress is saved. Come back anytime and we\u2019ll pick up right where we left off.', 'docb');
      if (btn) { btn.classList.add('paused'); btn.innerHTML = '<span class="en">&#9654; Resume</span><span class="es">&#9654; Reanudar</span>'; }
      var newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', function() {
        newBtn.classList.remove('paused');
        newBtn.innerHTML = '<span class="en">&#9646;&#9646; Pause</span><span class="es">&#9646;&#9646; Pausa</span>';
        var resumeClone = newBtn.cloneNode(true);
        newBtn.parentNode.replaceChild(resumeClone, newBtn);
        resumeClone.addEventListener('click', pwsTogglePause);
        useAppendBubble(_lang === 'es' ? 'Bienvenido de vuelta. \u00bfSeguimos?' : 'Welcome back. Ready to continue?', 'docb');
      });
    } else {
      // No timer, not a talent tool — PAUSE becomes Save Chat
      if (_useHistory && _useHistory.length) {
        var winName2 = (_useTool && (_useTool.obligation || _useTool.en)) ? (_useTool.obligation || _useTool.en) : 'Session';
        var lines2 = [winName2 + ' \u2014 Doc B Chat', new Date().toLocaleString(), ''];
        _useHistory.forEach(function(m) {
          var role2 = m.role === 'user' ? 'You' : 'Doc B';
          var cnt2 = typeof m.content === 'string' ? m.content : '[image]';
          lines2.push(role2 + ': ' + cnt2);
          lines2.push('');
        });
        var blob3 = new Blob([lines2.join('\n')], { type: 'text/plain' });
        var url3 = URL.createObjectURL(blob3);
        var a3 = document.createElement('a');
        a3.href = url3; a3.target = '_blank';
        a3.download = winName2.replace(/\s+/g,'_') + '_chat_' + new Date().toISOString().substring(0,10) + '.txt';
        a3.click();
        URL.revokeObjectURL(url3);
        useAppendBubble(_lang === 'es' ? 'Chat guardado. \u00bfSeguimos?' : 'Chat saved. Ready to continue?', 'docb');
        if (btn) { btn.innerHTML = '<span class="en">&#10003; Saved</span><span class="es">&#10003; Guardado</span>'; }
        setTimeout(function() {
          if (btn) btn.innerHTML = '<span class="en">&#9646;&#9646; Pause</span><span class="es">&#9646;&#9646; Pausa</span>';
        }, 2000);
      } else {
        var inp = document.getElementById('pwsUseInput');
        if (inp) { inp.focus(); }
      }
    }
  }

  /* FIRE TOOL -- LAUNCH execution (configured tools only) */
  function pwsFireTool(tool) {
    // Always open the USE overlay first — links and media accessible from inside
    if (tool._isWindowLaunch) { pwsOpenUse(tool, false); return; }

    var desc = tool.en || '';
    var isTimer = /timer|sprint|personal best|beat|minutes|seconds|record|how fast|fastest|race|challenge/i.test(desc);

    // Open USE overlay for all tools — user accesses links from inside via Links button
    if (isTimer) {
      var tIdx = pwsToolToIdx(tool);
      if (tIdx > -1) {
        pwsOpenPlanUse(tIdx);
        setTimeout(pwsStartTimer, 600);
      }
      return;
    }

    post({
      action:             'pwsLogAdherence',
      sessionId:          _session,
      requestingMemberId: _memberId,
      date:               new Date().toISOString().substring(0, 10),
      windowKey:          'tool_launch_' + (tool.obligation || 'tool').replace(/\s+/g, '_').substring(0, 30),
      activityLabel:      tool.obligation || 'tool use',
      completed:          true,
      note:               'launched from My Day',
      lawTag:             pwsLawTag(tool)
    });

    var tIdx2 = pwsToolToIdx(tool);
    if (tIdx2 > -1) {
      pwsOpenUse(tIdx2, false);
    } else {
      pwsOpenUse(tool, false);
    }
  }

  function pwsToolToIdx(tool) {
    if (!_toolsData || !_toolsData.confirmedTools) return -1;
    var valid = _toolsData.confirmedTools.filter(pwsIsValidTool);
    for (var i = 0; i < valid.length; i++) {
      if (valid[i].obligation === tool.obligation && valid[i].en === tool.en) return i;
    }
    return -1;
  }

  var _depSeconds=0,_depSiteName='',_depUrl='',_depInterval=null;
  function pwsOpenDeparture(url,name) {
    var twsOv = document.getElementById('pwsTWSOverlay');
    if (twsOv && twsOv.classList.contains('open')) { window.open(url, '_blank'); return; }
    var useOv = document.getElementById('pwsUseOverlay');
    if (useOv && useOv.classList.contains('open')) { window.open(url, '_blank'); return; }
    var shortName = name || url;
    if (shortName.length > 40) { shortName = shortName.substring(0, shortName.indexOf(' ', 30) > 0 ? shortName.indexOf(' ', 30) : 40) + '...'; }
    var dep=document.getElementById('pwsDeparture'),nameEl=document.getElementById('pwsDepName'),launch=document.getElementById('pwsDepLaunch'),timerEl=document.getElementById('pwsDepTimer'),backBtn=document.getElementById('pwsDepBack');
    if (!dep) { window.open(url,'_blank'); return; }
    if (nameEl) nameEl.textContent=shortName;
    if (launch) launch.href=url;
    if (timerEl) timerEl.textContent='0:00';
    _depSeconds=0; _depSiteName=shortName; _depUrl=url;
    if (backBtn) backBtn.onclick=pwsCloseDeparture;
    if (_depInterval) clearInterval(_depInterval);
    _depInterval=setInterval(function(){
      _depSeconds++;
      var m=Math.floor(_depSeconds/60),s=_depSeconds%60,el=document.getElementById('pwsDepTimer');
      if (el) el.textContent=m+':'+(s<10?'0':'')+s;
    },1000);
    dep.classList.add('open'); document.body.style.overflow='hidden';
  }
  function pwsCloseDeparture() {
    if (_depInterval) { clearInterval(_depInterval); _depInterval=null; }
    var dep=document.getElementById('pwsDeparture');
    if (dep) dep.classList.remove('open');
    document.body.style.overflow='';
    if (_depSeconds>0) {
      pwsShowLaunchToast(_depSiteName+' \u2014 '+Math.floor(_depSeconds/60)+'m '+(_depSeconds%60)+'s');
      post({action:'handleECLogSession',memberId:_memberId,sessionId:_session,room:'tool',siteName:_depSiteName,url:_depUrl,durationSeconds:_depSeconds,sessionDate:new Date().toISOString().slice(0,10),sessionTime:new Date().toTimeString().slice(0,8)});
    }
    _depSeconds=0;
  }
  function pwsShowLaunchToast(msg) {
    var existing = document.getElementById('pwsLaunchToast');
    if (existing) existing.parentNode.removeChild(existing);
    var toast = document.createElement('div');
    toast.id = 'pwsLaunchToast';
    toast.textContent = msg || (_lang === 'es' ? 'Lanzado.' : 'Launched.');
    toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:#c8a84b;color:#040608;font-family:\'Cinzel\',serif;font-size:14px !important;letter-spacing:0.18em;padding:10px 24px;z-index:9999;pointer-events:none;border-radius:2px;max-width:90vw;text-align:center;';
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 2800);
  }

  /* DOC ASSIST -- inline chat within the overlay feed */

  function pwsHandleAssistYesNo(answer) {
    var btnRow = document.getElementById('pwsAssistYesNoRow');
    if (btnRow && btnRow.parentNode) btnRow.parentNode.removeChild(btnRow);
    useAppendBubble(answer === 'yes' ? (_lang === 'es' ? 'S\u00ed' : 'Yes') : (_lang === 'es' ? 'No \u2014 Yo puedo' : 'No \u2014 I\u0027ve got this'), 'member');
    pwsContinueAssistFlow(answer);
  }

  function pwsContinueAssistFlow(answer) {
    if (answer === 'yes') {
      if (_useTool) _useTool.hasAssist = true;
      if (_toolsData && _toolsData.confirmedTools && _useTool) {
        _toolsData.confirmedTools.forEach(function(t) {
          if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.hasAssist = true; }
        });
        post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
      }
      useAppendBubble(_lang === 'es' ? 'Listo. Estar\u00e9 aqu\u00ed.' : 'Got it. I\u0027ll be here.', 'docb');
      pwsRenderUseFooter(false, false, _useTool ? _useTool.link : null);
    } else {
      useAppendBubble(_lang === 'es' ? 'Entendido. Lanza cuando est\u00e9s listo.' : 'Got it. Launch when you\u0027re ready.', 'docb');
    }
  }
  function pwsToggleAssistChat() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsAssistChatWrap');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsAssistChatWrap');

    var wrap = document.createElement('div');
    wrap.id = 'pwsAssistChatWrap';
    wrap.className = 'pws-links-panel';
    wrap.style.gap = '8px';

    var heading = document.createElement('div');
    heading.style.cssText = 'font-family:\'Cinzel\',serif;font-size:12px !important;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,168,75,0.7);';
    heading.textContent = _lang === 'es' ? 'DOC ASISTENTE' : 'DOC ASSIST';
    wrap.appendChild(heading);

    var inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;gap:8px;';

    var inp = document.createElement('textarea');
    inp.id = 'pwsAssistInput';
    inp.className = 'pws-links-input';
    inp.rows = 2;
    inp.style.resize = 'none';
    inp.placeholder = _lang === 'es' ? '\u00bfEn qu\u00e9 necesitas ayuda?' : 'What do you need help with?';

    var sendBtn = document.createElement('button');
    sendBtn.className = 'pws-links-save-btn';
    sendBtn.style.alignSelf = 'flex-end';
    sendBtn.textContent = _lang === 'es' ? 'ENVIAR' : 'SEND';
    sendBtn.addEventListener('click', pwsSendAssist);

    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendAssist(); }
    });

    inputRow.appendChild(inp);
    inputRow.appendChild(sendBtn);

    var replyArea = document.createElement('div');
    replyArea.id = 'pwsAssistReply';
    replyArea.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:20px !important;color:rgba(240,230,204,0.85);line-height:1.5;min-height:32px;";

    wrap.appendChild(inputRow);
    wrap.appendChild(replyArea);
    feed.appendChild(wrap);
    feed.scrollTop = feed.scrollHeight;
    setTimeout(function() { inp.focus(); }, 60);
  }

  function pwsSendAssist() {
    var inp = document.getElementById('pwsAssistInput');
    var replyArea = document.getElementById('pwsAssistReply');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    if (replyArea) replyArea.textContent = _lang === 'es' ? '\u2026' : '\u2026';

    var toolContext = (_useTool && _useTool.en) ? _useTool.en : '';
    var systemPrompt = 'You are Doc B on 4 LAWS Academy. The member is currently working on: "' + toolContext + '". ' +
      'They need help right now. Answer directly and briefly \u2014 2 sentences max. ' +
      'If it\u0027s a math problem, solve it. If it\u0027s a writing question, answer it. If it\u0027s a search, summarize what they need. ' +
      'Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';

    post({
      action:              'cftConvTurn',
      sessionId:           _session,
      requestingMemberId:  _memberId,
      projectId:           '',
      systemPrompt:        systemPrompt,
      conversationHistory: [{ role: 'user', content: text }]
    })
    .then(function(d) {
      var reply = (d && d.reply) ? d.reply : ((d && d.content && d.content[0]) ? d.content[0].text : '');
      if (replyArea) replyArea.textContent = reply || (_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.');
      var feed = pwsTWSGetFeed();
      if (feed) feed.scrollTop = feed.scrollHeight;
    })
    .catch(function() {
      if (replyArea) replyArea.textContent = _lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.';
    });
  }

  /* LINKS PANEL -- toggled from launcher Links button */
  function pwsToggleLinksPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsLinksPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsLinksPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsLinksPanelInner';

    var listDiv = document.createElement('div');
    listDiv.id = 'pwsLinksList';
    pwsRenderLinksList(listDiv);
    panel.appendChild(listDiv);

    var isConfigured = _useTool && _useTool.configured;

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';
    form.id = 'pwsLinksForm';
    if (isConfigured) form.style.display = 'none';

    var urlInp = document.createElement('input');
    urlInp.type = 'text';
    urlInp.className = 'pws-links-input';
    urlInp.id = 'pwsLinksUrlInput';
    urlInp.placeholder = _lang === 'es' ? 'Pega un enlace...' : 'Paste a URL...';

    var labelInp = document.createElement('input');
    labelInp.type = 'text';
    labelInp.className = 'pws-links-input';
    labelInp.id = 'pwsLinksLabelInput';
    labelInp.placeholder = _lang === 'es' ? 'Etiqueta (opcional)' : 'Label (optional)';

    var saveBtn = document.createElement('button');
    saveBtn.className = 'pws-links-save-btn';
    saveBtn.textContent = _lang === 'es' ? 'GUARDAR' : 'SAVE';
    saveBtn.addEventListener('click', function() {
      pwsSaveLinkEntry();
      var f = document.getElementById('pwsLinksForm');
      if (f && isConfigured) f.style.display = 'none';
      var editBtn = document.getElementById('pwsLinksEditBtn');
      if (editBtn) editBtn.textContent = _lang === 'es' ? '+ Agregar enlace' : '+ Add link';
    });

    form.appendChild(urlInp);
    form.appendChild(labelInp);
    form.appendChild(saveBtn);
    panel.appendChild(form);

    if (isConfigured) {
      var editBtn = document.createElement('button');
      editBtn.id = 'pwsLinksEditBtn';
      editBtn.style.cssText = 'font-family:\'Cinzel\',serif;font-size:11px !important;letter-spacing:0.14em;text-transform:uppercase;color:rgba(200,168,75,0.6);background:transparent;border:none;cursor:pointer;padding:4px 0;text-align:left;';
      editBtn.textContent = _lang === 'es' ? '+ Agregar enlace' : '+ Add link';
      editBtn.addEventListener('click', function() {
        var f = document.getElementById('pwsLinksForm');
        if (!f) return;
        var isHidden = f.style.display === 'none';
        f.style.display = isHidden ? 'flex' : 'none';
        editBtn.textContent = isHidden ? (_lang === 'es' ? '\u2715 Cancelar' : '\u2715 Cancel') : (_lang === 'es' ? '+ Agregar enlace' : '+ Add link');
      });
      panel.appendChild(editBtn);
    }

    listDiv.addEventListener('click', function(ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-link-url]') : null;
      if (!btn) return;
      var url = btn.getAttribute('data-link-url');
      if (!url) return;
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsRenderLinksList(container) {
    if (!container) return;
    var links = (_useTool && _useTool.links) ? _useTool.links : [];
    if (!links.length) {
      container.innerHTML = '<div class="pws-links-empty">' +
        (_lang === 'es' ? 'No hay enlaces guardados a\u00fan.' : 'No links saved yet.') +
        '</div>';
      return;
    }
    container.innerHTML = links.map(function(entry, i) {
      var displayLabel = escHtml(entry.label || entry.url || 'Link ' + (i + 1));
      return '<div class="pws-links-row">' +
        '<span class="pws-links-label">' + displayLabel + '</span>' +
        '<button class="pws-links-open-btn" data-link-url="' + escHtml(entry.url || '') + '">' +
          (_lang === 'es' ? 'ABRIR' : 'OPEN') +
        '</button>' +
      '</div>';
    }).join('');
  }

  function pwsSaveLinkEntry() {
    var urlInp   = document.getElementById('pwsLinksUrlInput');
    var labelInp = document.getElementById('pwsLinksLabelInput');
    if (!urlInp || !urlInp.value.trim()) return;
    var url   = urlInp.value.trim();
    var label = labelInp ? labelInp.value.trim() : '';
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    if (!label) label = url;
    if (!_useTool.links) _useTool.links = [];
    _useTool.links.push({ url: url, label: label });
    if (_useTool._tws && _twsProject) {
      _twsProject.links = _useTool.links;
      post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId,
        name: _twsProject.title, description: _twsProject.description, lawTag: 'talent',
        category: _twsProject.category, photo: _twsProject.photo, projectData: _twsProject }).catch(function() {});
    } else if (_useTool._isWindowLaunch && _useTool._windowLabel) {
      var wl = _useTool._windowLabel;
      if (!_windowConfig[wl]) _windowConfig[wl] = {};
      _windowConfig[wl].links = _useTool.links;
      post({ action: 'pwsSaveWindowConfig', sessionId: _session, requestingMemberId: _memberId,
        windowLabel: wl, config: _windowConfig[wl] }).catch(function() {});
    } else if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.links = _useTool.links; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
    urlInp.value = '';
    if (labelInp) labelInp.value = '';
    var listDiv = document.getElementById('pwsLinksList');
    if (listDiv) pwsRenderLinksList(listDiv);
  }

  /* CASH REQUEST PANEL */
  function pwsToggleCashPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsCashPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsCashPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsCashPanelInner';

    var amountInp = document.createElement('input');
    amountInp.type = 'number'; amountInp.className = 'pws-links-input';
    amountInp.id = 'pwsCashAmount';
    amountInp.placeholder = _lang === 'es' ? '\u00bfCu\u00e1nto necesitas? ($)' : 'How much do you need? ($)';
    amountInp.min = '1';

    var reasonInp = document.createElement('input');
    reasonInp.type = 'text'; reasonInp.className = 'pws-links-input';
    reasonInp.id = 'pwsCashReason';
    reasonInp.placeholder = _lang === 'es' ? '\u00bfPara qu\u00e9 es? Una oraci\u00f3n.' : 'What\u0027s it for? One sentence.';

    var phoneInp = document.createElement('input');
    phoneInp.type = 'tel'; phoneInp.className = 'pws-links-input';
    phoneInp.id = 'pwsCashPhone';
    phoneInp.placeholder = _lang === 'es' ? 'Tel\u00e9fono del padre/madre' : 'Parent\u0027s phone number';
    if (_useTool && _useTool.parentPhone) phoneInp.value = _useTool.parentPhone;

    var sendBtn = document.createElement('button');
    sendBtn.className = 'pws-links-save-btn';
    sendBtn.textContent = _lang === 'es' ? 'ENVIAR SOLICITUD' : 'SEND REQUEST';
    sendBtn.addEventListener('click', pwsSendCashRequest);

    var confirmDiv = document.createElement('div');
    confirmDiv.className = 'pws-cash-confirm';
    confirmDiv.id = 'pwsCashConfirm';

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';
    form.appendChild(amountInp);
    form.appendChild(reasonInp);
    form.appendChild(phoneInp);
    form.appendChild(sendBtn);
    form.appendChild(confirmDiv);
    panel.appendChild(form);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSendCashRequest() {
    var amountEl = document.getElementById('pwsCashAmount');
    var reasonEl = document.getElementById('pwsCashReason');
    var phoneEl  = document.getElementById('pwsCashPhone');
    var confirmEl = document.getElementById('pwsCashConfirm');
    if (!amountEl || !reasonEl || !phoneEl) return;
    var amount = amountEl.value.trim();
    var reason = reasonEl.value.trim();
    var phone  = phoneEl.value.trim();
    if (!amount || !reason || !phone) {
      if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Completa todos los campos.' : 'Please fill in all fields.'; confirmEl.style.color = 'rgba(240,100,100,0.8)'; }
      return;
    }
    if (_useTool) { _useTool.parentPhone = phone; }
    if (_toolsData && _toolsData.confirmedTools && _useTool) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.parentPhone = phone; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
    var memberName = localStorage.getItem('4laws-display-name') || 'Your member';
    var msg = memberName + ' is requesting $' + amount + ' for ' + reason + '. Reply YES to approve or NO to decline.';
    post({ action: 'handleTwilioSMS', sessionId: _session, requestingMemberId: _memberId, toPhone: phone, message: msg, relationship: 'parent' });
    if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Solicitud enviada.' : 'Request sent.'; confirmEl.style.color = '#4caf82'; }
  }

  /* REMINDERS PANEL */
  function pwsToggleReminderPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsReminderPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsReminderPanelInner');

    var wLabel    = _useTool ? (_useTool.obligation || _useTool.en || '') : '';
    var wCfg      = (_windowConfig && wLabel && _windowConfig[wLabel]) ? _windowConfig[wLabel] : {};
    var savedRems = (wCfg.reminders && Array.isArray(wCfg.reminders)) ? wCfg.reminders : [];
    var savedPhone = wCfg.reminderPhone || (_useTool && _useTool.parentPhone) || '';

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsReminderPanelInner';

    var header = document.createElement('div');
    header.style.cssText = "font-family:'Cinzel',serif;font-size:12px !important;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,168,75,0.7);margin-bottom:10px;";
    header.textContent = (_lang === 'es' ? 'RECORDATORIOS \u2014 ' : 'REMINDERS \u2014 ') + (wLabel || (_lang === 'es' ? 'Esta Ventana' : 'This Window'));
    panel.appendChild(header);

    var listDiv = document.createElement('div');
    listDiv.id = 'pwsReminderList';
    listDiv.style.cssText = 'margin-bottom:10px;';

    function renderReminderList() {
      listDiv.innerHTML = '';
      if (!savedRems.length) {
        var empty = document.createElement('div');
        empty.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:18px !important;font-style:italic;color:rgba(240,230,204,0.3);padding:4px 0 8px;";
        empty.textContent = _lang === 'es' ? 'Sin recordatorios guardados.' : 'No saved reminders yet.';
        listDiv.appendChild(empty);
        return;
      }
      savedRems.forEach(function(rem, idx) {
        var row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(200,168,75,0.08);';
        var hh = parseInt((rem.time || '00:00').split(':')[0], 10);
        var mm2 = (rem.time || '00:00').split(':')[1] || '00';
        var ampm = hh >= 12 ? 'PM' : 'AM';
        var h12 = hh % 12 || 12;
        var displayTime = h12 + ':' + mm2 + ' ' + ampm;

        var timeLabel = document.createElement('div');
        timeLabel.style.cssText = "font-family:'Playfair Display',serif;font-size:22px !important;font-weight:700;color:#c8a84b;width:80px;flex-shrink:0;";
        timeLabel.textContent = displayTime;

        var noteLabel = document.createElement('div');
        noteLabel.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:18px !important;font-style:italic;color:rgba(240,230,204,0.55);flex:1;";
        noteLabel.textContent = rem.note || wLabel || '';

        var isActive = rem.activeToday !== false;
        var toggle = document.createElement('button');
        toggle.style.cssText = "font-family:'Cinzel',serif;font-size:11px !important;letter-spacing:0.1em;padding:4px 8px;border-radius:2px;cursor:pointer;border:1px solid;transition:all 0.2s;background:" +
          (isActive ? 'rgba(76,175,82,0.2)' : 'transparent') + ';border-color:' +
          (isActive ? '#4caf82' : 'rgba(200,168,75,0.25)') + ';color:' +
          (isActive ? '#4caf82' : 'rgba(200,168,75,0.45)') + ';';
        toggle.textContent = isActive ? 'TODAY \u2713' : 'SKIP';
        (function(i){ toggle.addEventListener('click', function() {
          savedRems[i].activeToday = !savedRems[i].activeToday;
          pwsSaveWindowReminders(wLabel, savedRems, savedPhone);
          renderReminderList();
        }); })(idx);

        var delBtn = document.createElement('button');
        delBtn.style.cssText = 'background:transparent;border:none;color:rgba(240,230,204,0.25);cursor:pointer;font-size:16px !important;padding:0 4px;line-height:1;flex-shrink:0;';
        delBtn.textContent = '\u2715';
        (function(i){ delBtn.addEventListener('click', function() {
          savedRems.splice(i, 1);
          pwsSaveWindowReminders(wLabel, savedRems, savedPhone);
          renderReminderList();
        }); })(idx);

        row.appendChild(timeLabel); row.appendChild(noteLabel); row.appendChild(toggle); row.appendChild(delBtn);
        listDiv.appendChild(row);
      });
    }
    renderReminderList();
    panel.appendChild(listDiv);

    var addLabel = document.createElement('div');
    addLabel.style.cssText = "font-family:'Cinzel',serif;font-size:11px !important;letter-spacing:0.16em;text-transform:uppercase;color:rgba(200,168,75,0.5);margin-bottom:6px;margin-top:4px;";
    addLabel.textContent = _lang === 'es' ? 'A\u00d1ADIR RECORDATORIO' : 'ADD REMINDER';
    panel.appendChild(addLabel);

    var addRow = document.createElement('div');
    addRow.style.cssText = 'display:flex;gap:6px;align-items:center;margin-bottom:8px;';
    var timeInp = document.createElement('input');
    timeInp.type = 'time'; timeInp.className = 'pws-links-input'; timeInp.id = 'pwsReminderTime';
    timeInp.style.cssText = 'flex:0 0 110px;';
    var noteInp = document.createElement('input');
    noteInp.type = 'text'; noteInp.className = 'pws-links-input'; noteInp.id = 'pwsReminderNote';
    noteInp.placeholder = _lang === 'es' ? 'Nota (opcional)' : 'Note (optional)';
    noteInp.style.cssText = 'flex:1;';
    var addBtn = document.createElement('button');
    addBtn.className = 'pws-links-save-btn';
    addBtn.textContent = '+';
    addBtn.style.cssText = 'flex:0 0 auto;padding:8px 14px;font-size:18px !important;';
    addBtn.addEventListener('click', function() {
      var t = timeInp.value; if (!t) return;
      savedRems.push({ time: t, note: noteInp.value.trim(), activeToday: true });
      pwsSaveWindowReminders(wLabel, savedRems, savedPhone);
      pwsFireSingleReminder(t, noteInp.value.trim() || wLabel || '', savedPhone);
      timeInp.value = ''; noteInp.value = '';
      renderReminderList();
    });
    addRow.appendChild(timeInp); addRow.appendChild(noteInp); addRow.appendChild(addBtn);
    panel.appendChild(addRow);

    var phoneLabel = document.createElement('div');
    phoneLabel.style.cssText = "font-family:'Cinzel',serif;font-size:11px !important;letter-spacing:0.16em;text-transform:uppercase;color:rgba(200,168,75,0.5);margin-bottom:6px;margin-top:8px;";
    phoneLabel.textContent = _lang === 'es' ? 'TEL\u00c9FONO PARA SMS' : 'PHONE FOR SMS';
    panel.appendChild(phoneLabel);

    var phoneRow = document.createElement('div');
    phoneRow.style.cssText = 'display:flex;gap:6px;align-items:center;';
    var phoneInp = document.createElement('input');
    phoneInp.type = 'tel'; phoneInp.className = 'pws-links-input'; phoneInp.id = 'pwsReminderPhone';
    phoneInp.placeholder = _lang === 'es' ? 'Tu n\u00famero' : 'Your number';
    phoneInp.value = savedPhone; phoneInp.style.cssText = 'flex:1;';
    var phoneSaveBtn = document.createElement('button');
    phoneSaveBtn.className = 'pws-links-save-btn';
    phoneSaveBtn.textContent = _lang === 'es' ? 'GUARDAR' : 'SAVE';
    phoneSaveBtn.addEventListener('click', function() {
      var ph = phoneInp.value.trim(); if (!ph) return;
      savedPhone = ph;
      pwsSaveWindowReminders(wLabel, savedRems, savedPhone);
      savedRems.forEach(function(rem) {
        if (rem.activeToday !== false) { pwsFireSingleReminder(rem.time, rem.note || wLabel || '', savedPhone); }
      });
      var conf = document.getElementById('pwsReminderConfirm');
      if (conf) { conf.textContent = _lang === 'es' ? 'Tel\u00e9fono guardado. Recordatorios activos enviados.' : 'Phone saved. Active reminders queued.'; conf.style.color = '#4caf82'; }
    });
    phoneRow.appendChild(phoneInp); phoneRow.appendChild(phoneSaveBtn);
    panel.appendChild(phoneRow);

    var confirmDiv = document.createElement('div');
    confirmDiv.className = 'pws-reminder-confirm';
    confirmDiv.id = 'pwsReminderConfirm';
    panel.appendChild(confirmDiv);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSaveWindowReminders(wLabel, rems, phone) {
    if (!wLabel) return;
    if (!_windowConfig) _windowConfig = {};
    if (!_windowConfig[wLabel]) _windowConfig[wLabel] = {};
    _windowConfig[wLabel].reminders     = rems;
    _windowConfig[wLabel].reminderPhone = phone;
    post({ action: 'pwsSaveWindowConfig', sessionId: _session, requestingMemberId: _memberId,
      windowLabel: wLabel, config: _windowConfig[wLabel] }).catch(function(){});
  }

  function pwsFireSingleReminder(time, note, phone) {
    if (!phone || !time) return;
    post({ action: 'pwsSaveReminder', sessionId: _session, requestingMemberId: _memberId,
      memberId: _memberId, toolObligation: (_useTool && _useTool.obligation) || '',
      reminderTime: time, reminderNote: note, phone: phone,
      date: new Date().toISOString().substring(0, 10) }).catch(function(){});
  }

  function pwsSaveReminder() {
    var timeEl = document.getElementById('pwsReminderTime');
    var noteEl = document.getElementById('pwsReminderNote');
    var phoneEl = document.getElementById('pwsReminderPhone');
    var confirmEl = document.getElementById('pwsReminderConfirm');
    if (!timeEl || !timeEl.value) {
      if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Elige una hora.' : 'Please set a time.'; confirmEl.style.color = 'rgba(240,100,100,0.8)'; }
      return;
    }
    pwsFireSingleReminder(timeEl.value, noteEl ? noteEl.value.trim() : '', phoneEl ? phoneEl.value.trim() : '');
    if (confirmEl) { confirmEl.textContent = _lang === 'es' ? 'Recordatorio guardado.' : 'Reminder set.'; confirmEl.style.color = '#4caf82'; }
  }


  /* CONTACTS PANEL */
  function pwsToggleContactsPanel() {
    var feed = pwsTWSGetFeed();
    if (!feed) return;
    var existing = document.getElementById('pwsContactsPanelInner');
    if (existing) { existing.parentNode.removeChild(existing); return; }
    pwsTWSClosePanels('pwsContactsPanelInner');

    var panel = document.createElement('div');
    panel.className = 'pws-links-panel';
    panel.id = 'pwsContactsPanelInner';

    var listDiv = document.createElement('div');
    listDiv.id = 'pwsContactsList';
    pwsRenderContactsList(listDiv);
    panel.appendChild(listDiv);

    listDiv.addEventListener('click', function(ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-contact-action]') : null;
      if (!btn) return;
      var action = btn.getAttribute('data-contact-action');
      var phone  = btn.getAttribute('data-contact-phone');
      if (!phone) return;
      var cleanPhone = phone.replace(/[^0-9+]/g, '');
      window.location.href = (action === 'call' ? 'tel:' : 'sms:') + cleanPhone;
    });

    var form = document.createElement('div');
    form.className = 'pws-links-add-form';

    var nameInp = document.createElement('input');
    nameInp.type = 'text'; nameInp.className = 'pws-links-input';
    nameInp.id = 'pwsContactName';
    nameInp.placeholder = _lang === 'es' ? 'Nombre' : 'Name';

    var phoneInp = document.createElement('input');
    phoneInp.type = 'tel'; phoneInp.className = 'pws-links-input';
    phoneInp.id = 'pwsContactPhone';
    phoneInp.placeholder = _lang === 'es' ? 'N\u00famero de tel\u00e9fono' : 'Phone number';

    var extraInp = document.createElement('input');
    extraInp.type = 'text'; extraInp.className = 'pws-links-input';
    extraInp.id = 'pwsContactExtra';
    extraInp.placeholder = _lang === 'es' ? 'Enlace extra (opcional: Zoom, Discord...)' : 'Extra link (optional: Zoom, Discord...)';

    var saveBtn = document.createElement('button');
    saveBtn.className = 'pws-links-save-btn';
    saveBtn.textContent = _lang === 'es' ? 'GUARDAR' : 'SAVE';
    saveBtn.addEventListener('click', pwsSaveContact);

    form.appendChild(nameInp);
    form.appendChild(phoneInp);
    form.appendChild(extraInp);
    form.appendChild(saveBtn);
    panel.appendChild(form);

    feed.appendChild(panel);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsRenderContactsList(container) {
    if (!container) return;
    var contacts = (_useTool && _useTool.contacts) ? _useTool.contacts : [];
    if (!contacts.length) {
      container.innerHTML = '<div class="pws-links-empty">' +
        (_lang === 'es' ? 'No hay contactos guardados a\u00fan.' : 'No contacts saved yet.') +
        '</div>';
      return;
    }
    container.innerHTML = contacts.map(function(c) {
      var nameHtml  = escHtml(c.name || 'Contact');
      var phoneAttr = escHtml(c.phone || '');
      var extraHtml = c.extraLink
        ? '<a href="' + escHtml(c.extraLink) + '" target="_blank" rel="noopener noreferrer" style="font-family:\'Cinzel\',serif;font-size:10px !important;letter-spacing:0.12em;color:rgba(200,168,75,0.6);margin-left:6px;">LINK</a>'
        : '';
      return '<div class="pws-links-row">' +
        '<span class="pws-links-label">' + nameHtml + extraHtml + '</span>' +
        '<div style="display:flex;gap:6px;flex-shrink:0;">' +
          '<button class="pws-contact-action-btn" data-contact-action="call" data-contact-phone="' + phoneAttr + '">' +
            (_lang === 'es' ? 'LLAMAR' : 'CALL') +
          '</button>' +
          '<button class="pws-contact-action-btn" data-contact-action="text" data-contact-phone="' + phoneAttr + '">' +
            (_lang === 'es' ? 'TEXTO' : 'TEXT') +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function pwsSaveContact() {
    var nameEl  = document.getElementById('pwsContactName');
    var phoneEl = document.getElementById('pwsContactPhone');
    var extraEl = document.getElementById('pwsContactExtra');
    if (!nameEl || !phoneEl) return;
    var name  = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var extra = extraEl ? extraEl.value.trim() : '';
    if (!name || !phone) return;
    if (!_useTool.contacts) _useTool.contacts = [];
    _useTool.contacts.push({ name: name, phone: phone, extraLink: extra || '' });
    if (_useTool._tws && _twsProject) {
      _twsProject.contacts = _useTool.contacts;
      post({ action: 'projectCreate', sessionId: _session, requestingMemberId: _memberId,
        name: _twsProject.title, description: _twsProject.description, lawTag: 'talent',
        category: _twsProject.category, photo: _twsProject.photo, projectData: _twsProject }).catch(function() {});
    } else if (_toolsData && _toolsData.confirmedTools) {
      _toolsData.confirmedTools.forEach(function(t) {
        if (t.obligation === _useTool.obligation && t.en === _useTool.en) { t.contacts = _useTool.contacts; }
      });
      post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() });
    }
    nameEl.value = ''; phoneEl.value = ''; if (extraEl) extraEl.value = '';
    var listDiv = document.getElementById('pwsContactsList');
    if (listDiv) pwsRenderContactsList(listDiv);
  }

  /* PENTAGON SIGN -- programming session opener */
  function pwsShowPentagonSign(callback) {
    var feed = document.getElementById('pwsUseFeed');
    if (!feed) { if (callback) callback(); return; }
    var wrap = document.createElement('div');
    wrap.className = 'pws-pentagon-wrap';
    var pent = document.createElement('div');
    pent.className = 'pws-pentagon';
    var txt = document.createElement('div');
    txt.className = 'pws-pentagon-text';
    txt.textContent = _lang === 'es' ? 'VAMOS A PROGRAMAR ESTO' : 'LET\u0027S TIME THE TOOLS';
    pent.appendChild(txt);
    wrap.appendChild(pent);
    feed.appendChild(wrap);
    feed.scrollTop = feed.scrollHeight;
    setTimeout(function() {
      wrap.style.transition = 'opacity 0.5s ease';
      wrap.style.opacity = '0';
      setTimeout(function() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
        if (callback) callback();
      }, 500);
    }, 1800);
  }

  /* TALENT BUILDER -- builds tool from strength/desire conversat */
  var _talentHistory = [];

  function pwsOpenTalentBuilder() {
    _talentHistory = [];
    var feed = document.getElementById('pwsTalentFeed');
    if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsTalentOverlay');
    if (ov) ov.classList.add('open');
    var opening = _lang === 'es'
      ? 'Cu\u00e9ntame \u2014 \u00bfen qu\u00e9 quieres convertirte o qu\u00e9 quieres dominar?'
      : 'Tell me \u2014 what do you want to become or master?';
    pwsTalentAppendBubble(opening, 'docb');
    _talentHistory.push({ role: 'assistant', content: opening });
    var inp = document.getElementById('pwsTalentInput');
    if (inp) setTimeout(function() { inp.value = ''; inp.focus(); }, 80);
    var closeBtn = document.getElementById('pwsTalentCloseBtn');
    if (closeBtn) {
      var newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      newClose.addEventListener('click', pwsCloseTalentBuilder);
    }
    var sendBtn = document.getElementById('pwsTalentSendBtn');
    if (sendBtn) {
      var newSend = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newSend, sendBtn);
      newSend.addEventListener('click', pwsSendTalent);
    }
    var micBtn = document.getElementById('pwsTalentMic');
    if (micBtn) {
      var micClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(micClone, micBtn);
      micClone.addEventListener('click', pwsToggleTalentMic);
    }
    var talentInp = document.getElementById('pwsTalentInput');
    if (talentInp) {
      talentInp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendTalent(); }
      });
    }
  }

  function pwsCloseTalentBuilder() {
    var ov = document.getElementById('pwsTalentOverlay');
    if (ov) ov.classList.remove('open');
    _talentHistory = [];
  }

  function pwsTalentAppendBubble(text, role) {
    var feed = document.getElementById('pwsTalentFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = text;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSendTalent() {
    var inp = document.getElementById('pwsTalentInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    pwsTalentAppendBubble(text, 'member');
    _talentHistory.push({ role: 'user', content: text });
    var typingId = 'pws-talent-typing-' + Date.now();
    var feed = document.getElementById('pwsTalentFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }
    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' A member wants to build a Talent Tool \u2014 something they want to become or master.' +
      ' Have a short focused conversation to understand their desire.' +
      ' When you build the prescription, naturally recommend relevant platform tools where they fit:' +
      ' mention a timer for timed practice sets, music for focus or energy, reminders for consistency, links for resources.' +
      ' Weave these recommendations into the prescription text naturally \u2014 do not list them separately.' +
      ' When you have enough to build a tool prescription, end your response with TALENT_READY on its own line,' +
      ' followed by a JSON block: {"label":"short tool name","prescription":"full tool description","subtitle":"one sentence about the member"}.' +
      ' The JSON fields must follow these rules:' +
      ' "label" = a vivid 2-4 word tool name ONLY \u2014 maximum four words \u2014 examples: "Inner World Shield", "Cuban Voice Awakening", "Vocal Legacy". Never a full sentence. Never more than four words.' +
      ' "subtitle" = one personal sentence about the member\u0027s specific situation \u2014 this is where the poetic empathy line goes, NOT in label.' +
      ' "prescription" = the full behavioral protocol.' +
      ' Use the subtitle field to personalize the tool card.' +
      ' Keep it warm, direct, 2\u20133 sentences max per turn. Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: '', systemPrompt: systemPrompt, conversationHistory: _talentHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsTalentAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb'); return; }
      _talentHistory.push({ role: 'assistant', content: reply });
      var markerIdx = reply.indexOf('TALENT_READY');
      if (markerIdx !== -1) {
        var displayMsg = reply.substring(0, markerIdx).trim();
        if (displayMsg) pwsTalentAppendBubble(displayMsg, 'docb');
        var jsonStart = reply.indexOf('{', markerIdx);
        var jsonEnd = reply.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            var toolData = JSON.parse(reply.substring(jsonStart, jsonEnd + 1));
            pwsSaveTalentTool(toolData);
          } catch(e) {
            pwsTalentAppendBubble(_lang === 'es' ? 'Algo sali\u00f3 mal. Int\u00e9ntalo de nuevo.' : 'Something went wrong. Try again.', 'docb');
          }
        }
      } else {
        pwsTalentAppendBubble(reply, 'docb');
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsTalentAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again in a moment.', 'docb');
    });
  }

  function pwsSaveTalentTool(toolData) {
    var label        = (toolData && toolData.label)        || 'Talent Tool';
    var prescription = (toolData && toolData.prescription) || '';
    var subtitle     = (toolData && toolData.subtitle)     || label;
    if (!_toolsData) _toolsData = { confirmedTools: [], addedToolNames: [], _items: [] };
    if (!_toolsData.confirmedTools) _toolsData.confirmedTools = [];
    var newTool = {
      label:        label,
      en:           prescription,
      obligation:   label,
      subtitle:     subtitle,
      type:         'talent',
      hasAssist:    true,
      configured:   false,
      link:         '',
      timerMinutes: 0
    };
    _toolsData.confirmedTools.push(newTool);
    post({ action: 'pwsSaveTools', sessionId: _session, requestingMemberId: _memberId, data: pwsToolsPayload() })
    .then(function() {
      pwsTalentAppendBubble(_lang === 'es' ? '\u2713 Herramienta de talento guardada. Aparece en Mis Herramientas.' : '\u2713 Talent tool saved. It\u0027s now in your Tools.', 'docb');
      pwsRenderToolsTile();
      var addRow = document.createElement('div');
      addRow.style.cssText = 'display:flex;gap:10px;padding:4px 0;';
      var btnYes = document.createElement('button');
      btnYes.className = 'pws-use-footer-btn';
      btnYes.textContent = _lang === 'es' ? 'S\u00ed, agregar' : 'YES \u2014 Add to My Day';
      btnYes.addEventListener('click', function() {
        addRow.parentNode.removeChild(addRow);
        pwsAddTalentToolToDay(newTool);
        pwsCloseTalentBuilder();
      });
      var btnLater = document.createElement('button');
      btnLater.className = 'pws-use-footer-btn';
      btnLater.textContent = _lang === 'es' ? 'Despu\u00e9s' : 'Maybe Later';
      btnLater.addEventListener('click', function() {
        addRow.parentNode.removeChild(addRow);
        pwsCloseTalentBuilder();
      });
      addRow.appendChild(btnYes);
      addRow.appendChild(btnLater);
      var feed = document.getElementById('pwsTalentFeed');
      if (feed) { feed.appendChild(addRow); feed.scrollTop = feed.scrollHeight; }
    });
  }

  function pwsAddTalentToolToDay(tool) {
    if (!_dayData) return;
    if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
    var validTools = _toolsData && _toolsData.confirmedTools ? _toolsData.confirmedTools.filter(pwsIsValidTool) : [];
    var tIdx = -1;
    var tLabel = tool.label || tool.obligation || '';
    for (var i = 0; i < validTools.length; i++) {
      if ((validTools[i].label || '').toLowerCase() === tLabel.toLowerCase() ||
          (validTools[i].obligation || '').toLowerCase() === tLabel.toLowerCase()) {
        tIdx = i; break;
      }
    }
    _dayData.finalSchedule.push({
      label:       tLabel,
      activity:    tLabel,
      derivedTime: '',
      ownsIt:      true,
      isTalent:    true,
      obligation:  tool.obligation || tLabel,
      toolIdx:     tIdx,
      type:        'obligation'
    });
    post({ action: 'pwsSaveDay', sessionId: _session, requestingMemberId: _memberId, data: _dayData })
    .then(function() { pwsRenderDayTile(); });
  }

  var _talentMicActive  = false;
  var _twsHistory  = [];
  var _twsProject  = null;
  var _twsMicActive   = false;
  var _twsRecognizer  = null;
  var _twsNotesDraft  = '';

  /* START FRESH -- clears all station data and reopens onboardin */
  function pwsStartFresh() {
    _obsData   = null;
    _toolsData = null;
    _dayData   = null;
    var emptyObs  = { confirmedObs: [], hateList: [], wishList: [], whatMatters: '' };
    var emptyTools = { confirmedTools: [], addedToolNames: [], _items: [] };
    var emptyDay  = { finalSchedule: [], wakeTime: '', bedTime: '', rankedPriorities: [], howGoodCould: '', howGoodWant: '' };
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId, data: emptyObs });
    post({ action: 'pwsSaveTools',   sessionId: _session, requestingMemberId: _memberId, data: emptyTools });
    post({ action: 'pwsSaveDay',     sessionId: _session, requestingMemberId: _memberId, data: emptyDay });
    pwsRenderStationTile();
    pwsRenderToolsTile();
    pwsRenderDayTile();
    setTimeout(function() { window.location.href = '/todos'; }, 500);
  }

  /* ACCORDION — toggle and live status lines */
  function pwsInitAccordion() {
    var headers = ['pwsAccordionLimitsHdr','pwsAccordionRespectHdr','pwsAccordionResponsibilityHdr','pwsAccordionTalentHdr'];
    var cards   = ['pwsAccordionLimits',   'pwsAccordionRespect',   'pwsAccordionResponsibility',   'pwsAccordionTalent'];
    for (var i = 0; i < headers.length; i++) {
      (function(idx) {
        var hdr = document.getElementById(headers[idx]);
        if (!hdr) return;
        hdr.addEventListener('click', function() {
          var card = document.getElementById(cards[idx]);
          if (!card) return;
          if (card.classList.contains('open')) { card.classList.remove('open'); } else { card.classList.add('open'); }
        });
      }(i));
    }
  }

  /* ADDITION 1 — updateProject helper */
  function pwsUpdateProject(fields) {
    if (!_twsProject || !_twsProject.projectId) return;
    var payload = { action: 'updateProject', sessionId: _session, requestingMemberId: _memberId, projectId: _twsProject.projectId, name: _twsProject.title || 'Project', lawTag: 'talent' };
    var keys = Object.keys(fields);
    for (var ki = 0; ki < keys.length; ki++) { payload[keys[ki]] = fields[keys[ki]]; }
    for (var li = 0; li < keys.length; li++) { _twsProject[keys[li]] = fields[keys[li]]; }
    post(payload).catch(function() {});
    post({ action: 'pwsSaveStation', sessionId: _session, requestingMemberId: _memberId,
      data: Object.assign({}, _obsData || {}, { _twsProject: _twsProject }) }).catch(function() {});
  }

  /* ADDITION 2 — MASTERY LEARNING LOOP */

  function pwsMasteryScheduleFirstSession(whenText) {
    if (!_twsProject || !_twsProject.projectId) return;
    var projId    = _twsProject.projectId;
    var projTitle = _twsProject.title || 'Project Practice';
    var label = projTitle + ' Practice';
    if (!_dayData) _dayData = {};
    if (!_dayData.finalSchedule) _dayData.finalSchedule = [];
    _dayData.finalSchedule.push({
      label:        label,
      activity:     label,
      derivedTime:  whenText || 'evening',
      ownsIt:       true,
      isTalent:     true,
      isMastery:    true,
      projectId:    projId,       // confirmed set — not empty string
      masteryStage: 1,
      type:         'obligation'
    });
    post({ action: 'pwsSaveDay', sessionId: _session, requestingMemberId: _memberId, data: _dayData }).catch(function() {});
    pwsUpdateProject({ masteryStage: 2 });
    var doneEN = '\u2713 Added to My Day.\n\nStage 2 is Practice. Each time you show up, I\'ll check in with you. Three sessions and we move to Stage 3.\n\nClose this and tap your project card to see your tools.';
    var doneES = '\u2713 Agregado a Mi D\u00eda.\n\nEtapa 2 es Pr\u00e1ctica. Cada vez que aparezcas, te har\u00e9 un reporte. Tres sesiones y avanzamos a Etapa 3.\n\nCierra esto y toca tu proyecto para ver tus herramientas.';
    pwsTWSAppendBubble(_lang === 'es' ? doneES : doneEN, 'docb');
    _twsPhase = 'done';
    setTimeout(function() {
      pwsCloseTWS();
      pwsRenderProjectTile(null);
      pwsRenderDayTile();
      pwsUpdateAccordionStatus();
    }, 2500);
  }

  var _masteryCheckHistory = [];

  function pwsOpenMasteryCheckIn(projectId, stage) {
    _masteryCheckHistory = [];
    var proj = _twsProject || {};
    var projTitle = proj.title || 'your project';
    var sessionNum = (proj.sessionCount || 0) + 1;
    var feed = document.getElementById('pwsMasteryFeed');
    if (feed) feed.innerHTML = '';
    var ov = document.getElementById('pwsMasteryOverlay');
    if (ov) ov.classList.add('open');
    var stageLabel = ['', 'Discovery', 'Practice', 'Competence', 'Automaticity'][stage] || 'Practice';
    var openEN = 'Session ' + sessionNum + ' of "' + projTitle + '" \u2014 Stage ' + stage + ': ' + stageLabel + '.\n\nHow did it go? What did you notice?';
    var openES = 'Sesi\u00f3n ' + sessionNum + ' de "' + projTitle + '" \u2014 Etapa ' + stage + ': ' + stageLabel + '.\n\n\u00bfC\u00f3mo te fue? \u00bfQu\u00e9 notaste?';
    var openMsg = _lang === 'es' ? openES : openEN;
    pwsMasteryAppendBubble(openMsg, 'docb');
    _masteryCheckHistory.push({ role: 'assistant', content: openMsg });
    var closeBtn = document.getElementById('pwsMasteryCloseBtn');
    if (closeBtn) {
      var cClone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(cClone, closeBtn);
      cClone.addEventListener('click', function() {
        var mo = document.getElementById('pwsMasteryOverlay');
        if (mo) mo.classList.remove('open');
      });
    }
    var sendBtn = document.getElementById('pwsMasterySendBtn');
    if (sendBtn) {
      var sClone = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(sClone, sendBtn);
      sClone.addEventListener('click', function() { pwsSendMasteryCheckIn(stage); });
    }
    var inp = document.getElementById('pwsMasteryInput');
    if (inp) {
      inp.value = '';
      var iClone = inp.cloneNode(true);
      inp.parentNode.replaceChild(iClone, inp);
      iClone.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendMasteryCheckIn(stage); }
      });
      setTimeout(function() { iClone.focus(); }, 80);
    }
    var micBtn = document.getElementById('pwsMasteryMic');
    if (micBtn) {
      var mClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(mClone, micBtn);
      mClone.addEventListener('click', function() { pwsToggleMasteryMic(); });
    }
  }

  var _masteryMicActive = false;
  var _masteryRecognizer = null;

  function pwsToggleMasteryMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_masteryMicActive) {
      if (_masteryRecognizer) { try { _masteryRecognizer.stop(); } catch(e) {} _masteryRecognizer = null; }
      _masteryMicActive = false;
      var btn = document.getElementById('pwsMasteryMic');
      if (btn) btn.classList.remove('listening');
      return;
    }
    _masteryRecognizer = new SR();
    _masteryRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _masteryRecognizer.continuous = true;
    _masteryRecognizer.interimResults = true;
    _masteryRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } if (inp) inp.value = transcript.trim(); };
    _masteryRecognizer.onend = function() {
      _masteryMicActive = false;
      var btn = document.getElementById('pwsMasteryMic');
      if (btn) btn.classList.remove('listening');
    };
    _masteryRecognizer.start();
    _masteryMicActive = true;
    var btn = document.getElementById('pwsMasteryMic');
    if (btn) btn.classList.add('listening');
  }

  function pwsMasteryAppendBubble(text, role) {
    var feed = document.getElementById('pwsMasteryFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function pwsSendMasteryCheckIn(stage) {
    var inp = document.getElementById('pwsMasteryInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    if (_masteryMicActive && _masteryRecognizer) { try { _masteryRecognizer.stop(); } catch(e) {} _masteryMicActive = false; }
    pwsMasteryAppendBubble(text, 'member');
    _masteryCheckHistory.push({ role: 'user', content: text });

    var newCount = ((_twsProject && _twsProject.sessionCount) || 0) + 1;
    var today = new Date().toISOString().substring(0, 10);
    var newStreak = ((_twsProject && _twsProject.streakDays) || 0) + 1;

    var newStage = stage;
    if (stage === 2 && newCount >= 3) newStage = 3;
    if (stage === 3 && newCount >= 10 && newStreak >= 5) newStage = 4;

    pwsUpdateProject({ sessionCount: newCount, lastPracticed: today, streakDays: newStreak, masteryStage: newStage });

    var typingId = 'pws-mastery-typing-' + Date.now();
    var feed = document.getElementById('pwsMasteryFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }
    var projTitle = (_twsProject && _twsProject.title) || 'the project';
    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' The member just completed a practice session for their project "' + projTitle + '", Stage ' + stage + '.' +
      ' Total sessions: ' + newCount + '. Streak: ' + newStreak + ' days.' +
      (newStage > stage ? ' They just advanced to Stage ' + newStage + '! Celebrate this genuinely.' : '') +
      ' Respond warmly to what they noticed. Ask one brief follow-up. 2-3 sentences max.' +
      ' Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';
    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: (_twsProject && _twsProject.projectId) || '', systemPrompt: systemPrompt, conversationHistory: _masteryCheckHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsMasteryAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb'); return; }
      _masteryCheckHistory.push({ role: 'assistant', content: reply });
      pwsMasteryAppendBubble(reply, 'docb');
      setTimeout(function() {
        var mo = document.getElementById('pwsMasteryOverlay');
        if (mo) mo.classList.remove('open');
        pwsRenderDayTile();
        pwsUpdateAccordionStatus();
      }, 3000);
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsMasteryAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb');
    });
  }

  function pwsMasteryRenderCheckIn(s, idx) {
    var stage = s.masteryStage || 1;
    var projId = s.projectId || '';
    return '<div class="pws-checkin-row" style="margin-top:4px !important;" onclick="event.stopPropagation();">' +
      '<button class="pws-day-launch-btn" data-mastery-checkin="1" data-mastery-idx="' + idx + '" data-mastery-stage="' + stage + '" data-mastery-projid="' + escHtml(projId) + '">' +
      '<span class="en">\u2713 Check In</span><span class="es">\u2713 Reportar</span></button></div>';
  }

  /* ADDITION 3 — ENTERTAINMENT CENTER BRIDGE */

  function pwsEntertainmentBridgeOutbound(linkType) {
    var label = linkType === 'music' ? (_lang === 'es' ? 'Sala de Musica' : 'Music Room') : 'Games';
    if (!_twsProject || !_twsProject.projectId) { pwsOpenDeparture(linkType === 'music' ? '/music' : '/games', label); return; }
    var base = linkType === 'music' ? '/music' : '/games';
    pwsOpenDeparture(base + '?returnTo=pws&projectId=' + encodeURIComponent(_twsProject.projectId) + '&linkType=' + encodeURIComponent(linkType), label);
  }

  function pwsEntertainmentBridgeInbound() {
    var params = window.location.search;
    if (!params || params.indexOf('returnTo=pws') === -1) return;
    var projectIdMatch = params.match(/projectId=([^&]+)/);
    if (!projectIdMatch) return;
    var projectId = decodeURIComponent(projectIdMatch[1]);
    var pending = null;
    try { var raw = localStorage.getItem('4laws-pending-entertainment-link'); if (raw) pending = JSON.parse(raw); } catch(e) {}
    if (!pending) return;
    try { localStorage.removeItem('4laws-pending-entertainment-link'); } catch(e) {}
    var existing = [];
    try { if (_twsProject && _twsProject.entertainmentLinks) existing = JSON.parse(_twsProject.entertainmentLinks); } catch(e) {}
    pending.linkedDate = new Date().toISOString().substring(0, 10);
    existing.push(pending);
    var updatedLinks = JSON.stringify(existing);
    pwsUpdateProject({ entertainmentLinks: updatedLinks });
    setTimeout(function() {
      var feed = document.getElementById('pwsTWSPanelFeed');
      if (!feed) return;
      var confirm = document.createElement('div');
      confirm.style.cssText = "font-family:'Cormorant Garamond',serif;font-size:22px !important;font-style:italic;color:#4caf82;padding:10px 0;";
      confirm.textContent = (pending.title || (pending.type === 'music' ? 'Playlist' : 'Game')) + (_lang === 'es' ? ' vinculado a tu proyecto.' : ' linked to your project.');
      feed.appendChild(confirm);
      feed.scrollTop = feed.scrollHeight;
    }, 600);
    try { window.history.replaceState({}, '', window.location.pathname); } catch(e) {}
  }

  /* ADDITION 4 — ADULT CFT CONVERSATION */

  var _fundingHistory  = [];
  var _fundingLayer    = 0;
  var _fundingLetter   = '';
  var _fundingMicActive   = false;
  var _fundingRecognizer  = null;

  function pwsOpenFunding() {
    _fundingHistory = [];
    _fundingLayer   = 1;
    _fundingLetter  = '';
    var feed = document.getElementById('pwsFundingFeed');
    if (feed) feed.innerHTML = '';
    var letterWrap = document.getElementById('pwsFundingLetterWrap');
    if (letterWrap) letterWrap.style.display = 'none';
    var ov = document.getElementById('pwsFundingOverlay');
    if (ov) ov.classList.add('open');

    var closeBtn = document.getElementById('pwsFundingCloseBtn');
    if (closeBtn) {
      var cClone = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(cClone, closeBtn);
      cClone.addEventListener('click', pwsCloseFunding);
    }
    var sendBtn = document.getElementById('pwsFundingSendBtn');
    if (sendBtn) {
      var sClone = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(sClone, sendBtn);
      sClone.addEventListener('click', pwsSendFunding);
    }
    var micBtn = document.getElementById('pwsFundingMic');
    if (micBtn) {
      var mClone = micBtn.cloneNode(true);
      micBtn.parentNode.replaceChild(mClone, micBtn);
      mClone.addEventListener('click', pwsToggleFundingMic);
    }
    var inp = document.getElementById('pwsFundingInput');
    if (inp) {
      inp.value = '';
      var iClone = inp.cloneNode(true);
      inp.parentNode.replaceChild(iClone, inp);
      iClone.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); pwsSendFunding(); }
      });
      setTimeout(function() { iClone.focus(); }, 80);
    }

    var projTitle = (_twsProject && _twsProject.title) || 'your project';
    var openEN = 'Let\'s talk about what "' + projTitle + '" needs to move forward.\n\nWhat can you allocate from your own budget right now? And what monthly commitment could you realistically make?';
    var openES = 'Hablemos de lo que "' + projTitle + '" necesita para avanzar.\n\n\u00bfQu\u00e9 puedes asignar de tu propio presupuesto ahora mismo? \u00bfY qu\u00e9 compromiso mensual podr\u00edas hacer de manera realista?';
    var openMsg = _lang === 'es' ? openES : openEN;
    pwsFundingAppendBubble(openMsg, 'docb');
    _fundingHistory.push({ role: 'assistant', content: openMsg });
  }

  function pwsCloseFunding() {
    fundingStopMic();
    var ov = document.getElementById('pwsFundingOverlay');
    if (ov) ov.classList.remove('open');
    _fundingHistory = [];
    _fundingLayer   = 0;
  }

  function pwsFundingAppendBubble(text, role) {
    var feed = document.getElementById('pwsFundingFeed');
    if (!feed) return;
    var div = document.createElement('div');
    div.className = 'pws-docb-bubble ' + role;
    div.style.whiteSpace = 'pre-line';
    div.textContent = pwsStripMarkdown(text);
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  function fundingStopMic() {
    if (_fundingRecognizer) { try { _fundingRecognizer.stop(); _fundingRecognizer.onresult = null; _fundingRecognizer.onend = null; } catch(e) {} _fundingRecognizer = null; }
    _fundingMicActive = false;
    var btn = document.getElementById('pwsFundingMic');
    if (btn) btn.classList.remove('listening');
  }

  function pwsToggleFundingMic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (_fundingMicActive) { fundingStopMic(); return; }
    fundingStopMic();
    _fundingRecognizer = new SR();
    _fundingRecognizer.lang = _lang === 'es' ? 'es-US' : 'en-US';
    _fundingRecognizer.continuous = true;
    _fundingRecognizer.interimResults = true;
    _fundingRecognizer.onresult = function(e) { var transcript = ''; for (var ri = 0; ri < e.results.length; ri++) { transcript += e.results[ri][0].transcript + ' '; } if (inp) inp.value = transcript.trim(); };
    _fundingRecognizer.onend = function() {
      _fundingMicActive = false;
      var btn = document.getElementById('pwsFundingMic');
      if (btn) btn.classList.remove('listening');
    };
    _fundingRecognizer.start();
    _fundingMicActive = true;
    var btn = document.getElementById('pwsFundingMic');
    if (btn) btn.classList.add('listening');
  }

  function pwsSendFunding() {
    var inp = document.getElementById('pwsFundingInput');
    if (!inp || !inp.value.trim()) return;
    var text = inp.value.trim();
    inp.value = '';
    fundingStopMic();
    pwsFundingAppendBubble(text, 'member');
    _fundingHistory.push({ role: 'user', content: text });

    var typingId = 'pws-funding-typing-' + Date.now();
    var feed = document.getElementById('pwsFundingFeed');
    if (feed) {
      var typing = document.createElement('div');
      typing.className = 'pws-docb-bubble docb';
      typing.id = typingId;
      typing.textContent = '\u2026';
      feed.appendChild(typing);
      feed.scrollTop = feed.scrollHeight;
    }

    var projTitle = (_twsProject && _twsProject.title) || 'the project';
    var category  = (_twsProject && _twsProject.category) || '';
    var layerGuide = [
      '',
      'Layer 1 \u2014 Personal Budget: Understand what they can allocate now and monthly. When you have a clear picture, naturally transition to Layer 2.',
      'Layer 2 \u2014 Personal Network: Ask who in their life believes in this project. Help them identify relatives, friends, mentors, faith community. Help them think about a dignified personal ask \u2014 an invitation to invest in someone they love. When done, transition to Layer 3.',
      'Layer 3 \u2014 Institutional Funding: Based on project category "' + category + '", identify 2-3 specific grants or funds that apply. Give names and next steps. For each, one sentence on what it is. Ask which institution they want to approach. Then go to Layer 4.',
      'Layer 4 \u2014 Grant Letter: The member has chosen an institution. Ask: "Want me to write your letter?" WAIT for yes. Then write a professional grant letter in their voice: name and background, project vision "' + projTitle + '", specific funding need, community impact. Output between LETTER_START and LETTER_END. Ask if they want edits.',
      'Layer 5 \u2014 Funding Plan: Assemble everything into a simple one-page summary: what is needed, where it comes from, and timeline. End with FUNDING_COMPLETE on its own line.'
    ][_fundingLayer] || '';

    var systemPrompt = 'You are Doc B \u2014 Dr. Eduardo Bustamante, licensed clinical psychologist, creator of the 4 LAWS.' +
      ' You are helping a member develop a complete funding strategy for their project "' + projTitle + '".' +
      ' Current layer: ' + _fundingLayer + ' of 5. ' + layerGuide +
      ' Be warm, direct, adult-appropriate. Ask one focused question at a time. 2-3 sentences max per turn.' +
      ' When you complete a layer and transition to the next, increment your internal layer count by telling the member what is next.' +
      ' Respond in ' + (_lang === 'es' ? 'Spanish' : 'English') + '.';

    post({ action: 'cftConvTurn', sessionId: _session, requestingMemberId: _memberId, projectId: (_twsProject && _twsProject.projectId) || '', systemPrompt: systemPrompt, conversationHistory: _fundingHistory })
    .then(function(d) {
      var reply = '';
      if (d && d.reply) reply = d.reply;
      else if (d && d.content) { try { reply = JSON.parse(d.content).reply || d.content; } catch(e) { reply = d.content; } }
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      if (!reply) { pwsFundingAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb'); return; }
      _fundingHistory.push({ role: 'assistant', content: reply });

      var letterStart = reply.indexOf('LETTER_START');
      var letterEnd   = reply.indexOf('LETTER_END');
      if (letterStart !== -1 && letterEnd !== -1) {
        var letterText = reply.substring(letterStart + 'LETTER_START'.length, letterEnd).trim();
        var beforeLetter = reply.substring(0, letterStart).trim();
        var afterLetter  = reply.substring(letterEnd + 'LETTER_END'.length).trim();
        if (beforeLetter) pwsFundingAppendBubble(beforeLetter, 'docb');
        var letterWrap = document.getElementById('pwsFundingLetterWrap');
        var letterDiv  = document.getElementById('pwsFundingLetterText');
        if (letterWrap) letterWrap.style.display = 'block';
        if (letterDiv)  letterDiv.textContent = letterText;
        _fundingLetter = letterText;
        if (afterLetter) pwsFundingAppendBubble(afterLetter, 'docb');
        _fundingLayer = 5;
        pwsUpdateProject({ fundingStatus: 'letter-generated', fundingLetter: letterText });
        return;
      }

      if (reply.indexOf('FUNDING_COMPLETE') !== -1) {
        var displayMsg = reply.substring(0, reply.indexOf('FUNDING_COMPLETE')).trim();
        if (displayMsg) pwsFundingAppendBubble(displayMsg, 'docb');
        pwsUpdateProject({ fundingStatus: 'completed' });
        var completedEN = '\u2713 Your funding plan is complete. It\u2019s saved to your project.';
        var completedES = '\u2713 Tu plan de financiamiento est\u00e1 completo. Est\u00e1 guardado en tu proyecto.';
        pwsFundingAppendBubble(_lang === 'es' ? completedES : completedEN, 'docb');
        var inputRow = document.getElementById('pwsFundingInputRow');
        if (inputRow) inputRow.style.display = 'none';
        return;
      }

      pwsFundingAppendBubble(reply, 'docb');
      if (_fundingLayer < 5) {
        var advanceSignals = ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 5', 'now let\'s talk about', 'moving to', 'next, let\'s', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5'];
        for (var ai = 0; ai < advanceSignals.length; ai++) {
          if (reply.toLowerCase().indexOf(advanceSignals[ai].toLowerCase()) !== -1) {
            _fundingLayer = Math.min(_fundingLayer + 1, 5);
            break;
          }
        }
      }
    }).catch(function() {
      var typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.parentNode.removeChild(typingEl);
      pwsFundingAppendBubble(_lang === 'es' ? 'Intenta de nuevo.' : 'Try again.', 'docb');
    });
  }

  function pwsUpdateAccordionStatus() {
    var limitsEl         = document.getElementById('pwsStatusLimits');
    var respectEl        = document.getElementById('pwsStatusRespect');
    var responsibilityEl = document.getElementById('pwsStatusResponsibility');
    var talentEl         = document.getElementById('pwsStatusTalent');

    if (limitsEl && _dayData && _dayData.finalSchedule) {
      var sched = _dayData.finalSchedule.filter(function(s) { return !s.isTodo; });
      var done  = sched.filter(function(s) { return s._checkedIn === 'done'; }).length;
      var total = sched.length;
      var next  = null;
      for (var i = 0; i < sched.length; i++) {
        if (!sched[i]._checkedIn) { next = sched[i].label || sched[i].activity; break; }
      }
      if (total === 0) {
        limitsEl.textContent = 'Plan your day to begin';
      } else if (done === total) {
        limitsEl.textContent = 'Day complete. You crushed it.';
      } else if (next) {
        limitsEl.textContent = done + ' of ' + total + ' complete \u2014 ' + next + ' is next';
      } else {
        limitsEl.textContent = done + ' of ' + total + ' complete';
      }
    }

    if (respectEl && _obsData && _obsData.confirmedObs) {
      var crushing = (_obsData.confirmedObs || []).filter(function(o) { return o.state === 'crushing'; }).length;
      var totalObl = (_obsData.confirmedObs || []).length;
      if (totalObl === 0) {
        respectEl.textContent = 'Build your station to begin';
      } else {
        respectEl.textContent = 'Crushing it on ' + crushing + ' of ' + totalObl;
      }
    }

    if (responsibilityEl && _toolsData && _toolsData.confirmedTools) {
      var tools    = _toolsData.confirmedTools.filter(pwsIsValidTool);
      var crushing2 = _obsData && _obsData.confirmedObs ? (_obsData.confirmedObs || []).filter(function(o) { return o.state === 'crushing'; }).length : 0;
      var needed   = 4;
      var gamesStatus = crushing2 >= needed ? 'Games unlocked' : (needed - crushing2) + ' more to unlock Games';
      responsibilityEl.textContent = tools.length + ' tools ready \u2014 ' + gamesStatus;
    }

    if (talentEl) {
      if (_twsProject && _twsProject.title) {
        var stage = _twsProject.masteryStage || 1;
        var stageLabels = ['', 'Discovery', 'Practice', 'Competence', 'Automaticity'];
        var sessions = _twsProject.sessionCount || 0;
        talentEl.textContent = _twsProject.title + ' \u2014 Stage ' + stage + ': ' + (stageLabels[stage] || '') + (sessions > 0 ? ' \u00b7 ' + sessions + ' sessions' : '');
      } else if (_projectData && _projectData.name) {
        talentEl.textContent = _projectData.name + ' \u2014 in progress';
      } else {
        talentEl.textContent = 'No projects yet';
      }
    }
  }

  window.pwsRestoreAll = pwsLoadAll;

  var _seQuotes=[],_seCurrentIdx=0,_sePinned=false,_seHistory=[];
  var SE_Q=['You were made for this. Not despite the difficulty — because of it.','The work you do in private is the person you become in public.','Every window you honor is a promise you keep to yourself.','Your talent is not a gift. It is a responsibility you choose every day.','Trust is built one window at a time.'];

  function pwsOpenSelfEncouragement(){
    var ov=document.getElementById('pwsSelfEncourOverlay');

    ov.classList.add('open');_seHistory=[];
    var stmtEl=document.getElementById('pwsSEStatement'),savedStmt=(_toolsData&&_toolsData.selfEncouragementStatement)||'';
    if(stmtEl)stmtEl.value=savedStmt;
    _sePinned=!!(_toolsData&&_toolsData.sePinned);
    var pb=document.getElementById('pwsSEPinnedBadge');if(pb)pb.style.display=_sePinned?'block':'none';
    pwsSELoadQuotes(function(){pwsSEShowQuote();});
    var feed=document.getElementById('pwsSEFeed');if(feed)feed.innerHTML='';
    var msg=_lang==='es'?(savedStmt?'Tu declaración está lista. Siéntate con ella.':'Construyamos tu declaración.'):(savedStmt?'Your statement is ready. Sit with the quote.':'Let’s build your statement.');
    setTimeout(function(){pwsSEAppend(msg,'docb');_seHistory.push({role:'assistant',content:msg});},300);
    ov.addEventListener('click',function(ev){
      var id=ev.target.id||'';
      if(id==='pwsSECloseBtn'){ov.classList.remove('open');}
      else if(id==='pwsSEPinBtn'){_sePinned=!_sePinned;if(_toolsData){_toolsData.sePinned=_sePinned;_toolsData.sePinnedIdx=_seCurrentIdx;}post({action:'pwsSaveTools',sessionId:_session,requestingMemberId:_memberId,data:pwsToolsPayload()}).catch(function(){});if(pb)pb.style.display=_sePinned?'block':'none';}
      else if(id==='pwsSERotateBtn'){_sePinned=false;if(_toolsData)_toolsData.sePinned=false;if(pb)pb.style.display='none';_seCurrentIdx=(_seCurrentIdx+1)%(_seQuotes.length||1);pwsSEShowQuote();}
      else if(id==='pwsSESaveStmt'){var v=(stmtEl?stmtEl.value:'').trim();if(!v)return;if(_toolsData)_toolsData.selfEncouragementStatement=v;post({action:'pwsSaveTools',sessionId:_session,requestingMemberId:_memberId,data:pwsToolsPayload()}).catch(function(){});pwsSEAppend(_lang==='es'?'✨ Guardado.':'✨ Saved.','docb');}
      else if(id==='pwsSESendBtn'){pwsSESend();}
    });
    var si=document.getElementById('pwsSEInput');if(si)si.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();pwsSESend();}};
  }
  function pwsSELoadQuotes(cb){
    if(!_seQuotes.length){_seQuotes=SE_Q;_seCurrentIdx=Math.floor(Math.random()*SE_Q.length);}
    cb();
  }
  function pwsSEShowQuote(){var el=document.getElementById('pwsSEQuoteText');if(!el)return;el.style.opacity='0';setTimeout(function(){el.textContent=_seQuotes[_seCurrentIdx]||SE_Q[0];el.style.transition='opacity 0.5s ease';el.style.opacity='1';},150);}
  function pwsSEAppend(text,role){var f=document.getElementById('pwsSEFeed');if(!f)return;var b=document.createElement('div');b.className='pws-docb-bubble '+role;b.textContent=text;f.appendChild(b);f.scrollTop=f.scrollHeight;}
  function pwsSESend(){
    var inp=document.getElementById('pwsSEInput'),text=inp?inp.value.trim():'';if(!text)return;if(inp)inp.value='';
    pwsSEAppend(text,'member');_seHistory.push({role:'user',content:text});
    var q=_seQuotes[_seCurrentIdx]||'',st=(_toolsData&&_toolsData.selfEncouragementStatement)||'';
    var sys='Doc B Self Encouragement.'+(q?' Quote: "'+q+'".':'')+(st?' Statement: "'+st+'".':'')+'Brief. Respond in '+(_lang==='es'?'Spanish':'English')+'.';
    var tid='se-'+Date.now(),tp=document.createElement('div');tp.className='pws-docb-bubble docb';tp.id=tid;tp.textContent='…';
    var f=document.getElementById('pwsSEFeed');if(f){f.appendChild(tp);f.scrollTop=f.scrollHeight;}
    post({action:'cftConvTurn',sessionId:_session,requestingMemberId:_memberId,projectId:'',systemPrompt:sys,conversationHistory:_seHistory.slice(-10)}).then(function(d){var r=(d&&d.reply)?d.reply:'';var t=document.getElementById(tid);if(t)t.parentNode.removeChild(t);if(!r){pwsSEAppend(_lang==='es'?'Intenta de nuevo.':'Try again.','docb');return;}_seHistory.push({role:'assistant',content:r});pwsSEAppend(r,'docb');}).catch(function(){var t=document.getElementById(tid);if(t)t.parentNode.removeChild(t);});
  }

  var _handoffHistory=[],_handoffFocusItem=null;
  function pwsOpenHandoff(schedule){
    var inc=(schedule||[]).filter(function(s){return s._checkedIn!=='done'&&!s.isTodo&&s.ownsIt!==false;});
    if(!inc.length){pwsOpenDocB();setTimeout(function(){pwsAppendBubble(_lang==='es'?'Día completo. Mañana empieza limpio.':'Day complete. Tomorrow starts clean.','docb');},300);return;}
    var ov=document.getElementById('pwsHandoffOverlay');if(!ov)return;
    ov.classList.add('open');_handoffHistory=[];_handoffFocusItem=null;
    var list=document.getElementById('pwsHandoffList');
    if(list){list.innerHTML='';inc.forEach(function(it){var r=pwsBuildHandoffRow(it);list.appendChild(r);});}
    var f=document.getElementById('pwsHandoffDocBFeed');if(f)f.innerHTML='';
    var msg=_lang==='es'?inc.length+' elemento'+(inc.length!==1?'s':'')+' necesitan decisión.':inc.length+' item'+(inc.length!==1?'s':'')+' need a decision.';
    setTimeout(function(){pwsHandoffDocBAppend(msg,'docb');_handoffHistory.push({role:'assistant',content:msg});},300);
    document.getElementById('pwsHandoffCloseBtn').onclick=function(){ov.classList.remove('open');};
    document.getElementById('pwsHandoffSendBtn').onclick=function(){pwsHandoffSend();};
    document.getElementById('pwsHandoffDoneBtn').onclick=function(){ov.classList.remove('open');pwsOpenDocB();setTimeout(function(){pwsAppendBubble(_lang==='es'?'Día cerrado. Mañana empieza ahora.':'Day closed. Tomorrow starts now.','docb');},300);};
    var hi=document.getElementById('pwsHandoffDocBInput');if(hi)hi.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();pwsHandoffSend();}};
  }
  function pwsBuildHandoffRow(it){
    var r=document.createElement('div');r.style.cssText='background:rgba(240,230,204,0.03);border:1px solid rgba(240,230,204,0.08);border-radius:6px;padding:12px 14px;';
    r.innerHTML='<b style=\"display:block;font-family:Cormorant Garamond,serif;font-size:22px;color:#f0e6cc;margin-bottom:6px;font-weight:400;\">'+escHtml(it.label||it.activity||'')+'</b>'+(it.time?'<small style=\"display:block;font-family:Cinzel,serif;font-size:11px;color:rgba(200,168,75,0.5);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;\">'+fmtTime(it.time)+'</small>':'')+'<div style=\"display:flex;gap:6px;flex-wrap:wrap;\"><button data-dec=\"carry\" class=\"pws-checkin-btn done\">Carry</button><button data-dec=\"done\" class=\"pws-checkin-btn done\">Done</button><button data-dec=\"drop\" class=\"pws-checkin-btn missed\">Drop</button><button data-dec=\"ask\" class=\"pws-modify-btn\">Ask Doc B</button></div>';
    r.addEventListener('click',function(ev){var btn=ev.target.closest?ev.target.closest('[data-dec]'):(ev.target.getAttribute&&ev.target.getAttribute('data-dec')?ev.target:null);if(!btn)return;var dec=btn.getAttribute('data-dec');if(dec==='carry'){it._handoffDecision='carry';r.style.opacity='0.45';pwsHandoffDocBAppend(_lang==='es'?'→ Llevar':'→ Carried.','docb');}else if(dec==='done'){it._checkedIn='done';it._handoffDecision='done';r.style.opacity='0.35';pwsSaveDaySchedule();pwsHandoffDocBAppend(_lang==='es'?'✓ Hecho':'✓ Logged.','docb');}else if(dec==='drop'){it._handoffDecision='drop';r.style.opacity='0.3';pwsHandoffDocBAppend(_lang==='es'?'Soltado.':'Dropped.','docb');}else if(dec==='ask'){_handoffFocusItem=it;var i2=document.getElementById('pwsHandoffDocBInput');if(i2){i2.placeholder=(_lang==='es'?'Sobre: ':'About: ')+(it.label||'');i2.focus();}}});
    pwsApplyLang();return r;
  }
  function pwsHandoffDocBAppend(text,role){var f=document.getElementById('pwsHandoffDocBFeed');if(!f)return;var b=document.createElement('div');b.className='pws-docb-bubble '+role;b.textContent=text;f.appendChild(b);f.scrollTop=f.scrollHeight;}
  function pwsHandoffSend(){
    var inp=document.getElementById('pwsHandoffDocBInput'),text=inp?inp.value.trim():'';if(!text)return;if(inp)inp.value='';
    pwsHandoffDocBAppend(text,'member');_handoffHistory.push({role:'user',content:text});
    var fc=_handoffFocusItem?'Item: "'+(_handoffFocusItem.label||'')+'" . ':'';
    var sys='Doc B end-of-day handoff. '+fc+'Brief. Respond in '+(_lang==='es'?'Spanish':'English')+'.';
    var tid='ho-'+Date.now(),tp=document.createElement('div');tp.className='pws-docb-bubble docb';tp.id=tid;tp.textContent='…';
    var f=document.getElementById('pwsHandoffDocBFeed');if(f){f.appendChild(tp);f.scrollTop=f.scrollHeight;}
    post({action:'cftConvTurn',sessionId:_session,requestingMemberId:_memberId,projectId:'',systemPrompt:sys,conversationHistory:_handoffHistory.slice(-10)}).then(function(d){var r=(d&&d.reply)?d.reply:'';var t=document.getElementById(tid);if(t)t.parentNode.removeChild(t);if(!r){pwsHandoffDocBAppend(_lang==='es'?'Intenta de nuevo.':'Try again.','docb');return;}_handoffHistory.push({role:'assistant',content:r});pwsHandoffDocBAppend(r,'docb');}).catch(function(){var t=document.getElementById(tid);if(t)t.parentNode.removeChild(t);});
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', pwsInit); } else { pwsInit(); }

})();
