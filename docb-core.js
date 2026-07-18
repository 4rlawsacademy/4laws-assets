<!-- 4 LAWS ACADEMY — 4 LAWS AI: DR. B IN YOUR POCKET — /ai-companion-demo -->
<!-- AI Companion with integrated Safety Officer mode. Same brain, two contexts. -->
<!-- Officer Mode: camera evidence, Dr. B clips, enforcement protocol. -->
<!-- v3: Full verdict pipeline · Appeal · Follow-up · Smart Stand Down · Complete context handoff -->
<!-- v4-demo: All v4 fixes · No journey save · No auto-save · Post-analysis join nudge · Free trial banner -->
<!-- Paste into Squarespace Code Block. Do not edit after pasting. -->

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet">

<style>
.sess-page { all: unset; display: block; }
.sess-page *, .sess-page *::before, .sess-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

.sess-page {
  --gold: #c8a84b;
  --gold-bright: #e8c96a;
  --felt: #050608;
  --mahogany: #1a0e08;
  --cream: #f5ead8;
  --cream-dark: #ede0c8;
  --ink: #1c1410;
  --smoke: rgba(245,234,216,.75);
  --officer-red: #c83030;
  --officer-red-dim: rgba(200,48,48,0.12);
}

.sess-scene {
  position: relative; min-height: 100vh;
  background: var(--mahogany); overflow: hidden; padding: 0 20px 80px;
}
.sess-scene::before {
  content: ''; position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 55% 70% at 8% 35%, rgba(210,130,40,.22) 0%, transparent 65%),
    radial-gradient(ellipse 40% 50% at 15% 60%, rgba(180,100,30,.14) 0%, transparent 55%),
    radial-gradient(ellipse 80% 100% at 85% 50%, rgba(8,4,2,.85) 0%, transparent 70%),
    radial-gradient(ellipse 100% 100% at 50% 100%, rgba(4,3,2,.6) 0%, transparent 60%);
  pointer-events: none; z-index: 0;
}
.sess-scene::after {
  content: ''; position: fixed; inset: 0;
  background: radial-gradient(ellipse 45% 55% at 88% 15%, rgba(180,160,120,.1) 0%, transparent 60%);
  pointer-events: none; z-index: 0;
}

#sess-rain { position: fixed; top: 0; right: 0; width: 42%; height: 100%; z-index: 1; pointer-events: none; opacity: .3; }
.sess-window-frame { position: fixed; top: 0; right: 0; width: 40%; height: 100%; z-index: 1; pointer-events: none; border-left: 2px solid rgba(180,140,80,.06); }
.sess-window-frame::before { content: ''; position: absolute; top: 38%; left: 0; right: 0; height: 1px; background: rgba(180,140,80,.06); }
.sess-window-frame::after { content: ''; position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: rgba(180,140,80,.06); }

.sess-header { position: relative; z-index: 10; text-align: center; padding: 64px 20px 44px; }
.sess-eyebrow { font-family: 'Cinzel', serif; font-size: clamp(13px, 1.5vw, 15px); font-weight: 600; letter-spacing: .42em; color: rgba(200,168,75,.75); text-transform: uppercase; margin-bottom: 18px; }
.sess-title { font-family: 'Cinzel', serif; font-size: clamp(32px, 6vw, 72px); font-weight: 900; letter-spacing: .08em; color: var(--cream); text-transform: uppercase; line-height: 1.05; text-shadow: 0 0 120px rgba(200,168,75,.15), 0 4px 12px rgba(0,0,0,.8); margin-bottom: 20px; }
.sess-title span { color: var(--gold); }
.sess-hero { font-family: 'Lora', Georgia, serif; font-size: clamp(20px, 2.6vw, 28px); font-style: italic; color: rgba(200,168,75,.85); letter-spacing: .04em; line-height: 1.6; max-width: 560px; margin: 0 auto 18px; }
.sess-hero-sub { font-family: 'Cinzel', serif; font-size: clamp(12px, 1.4vw, 14px); letter-spacing: .32em; color: rgba(200,168,75,.55); text-transform: uppercase; }
.sess-orn { display: flex; align-items: center; justify-content: center; gap: 14px; max-width: 280px; margin: 32px auto 0; }
.sess-orn-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(200,168,75,.25), transparent); }
.sess-orn-diamond { width: 7px; height: 7px; border: 1px solid rgba(200,168,75,.4); transform: rotate(45deg); background: rgba(200,168,75,.08); }

.sess-window { position: relative; z-index: 10; max-width: 680px; margin: 0 auto; border-radius: 3px; overflow: hidden; box-shadow: 0 0 0 1px rgba(200,168,75,.18), 0 40px 80px rgba(0,0,0,.7), 0 0 120px rgba(200,168,75,.06); }

.sess-win-header { background: linear-gradient(180deg, #060a0e 0%, #040608 100%); border-bottom: 1px solid rgba(200,168,75,.2); position: relative; }
.sess-win-header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold-bright) 50%, var(--gold) 70%, transparent 100%); animation: shimmer 3s ease-in-out infinite; }
@keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }

.sess-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 22px 12px; border-bottom: 1px solid rgba(200,168,75,.07); }
.sess-win-title { font-family: 'Cinzel', serif; font-size: clamp(16px, 2.2vw, 20px); font-weight: 700; letter-spacing: .1em; color: #f5ead8; }
.sess-topbar-right { display: flex; align-items: center; gap: 12px; }
.sess-lang-pill { display: flex; border: 1px solid rgba(200,168,75,.2); border-radius: 2px; overflow: hidden; }
.sess-lang-btn { padding: 5px 14px; font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .22em; border: none; cursor: pointer; background: transparent; color: rgba(200,168,75,.35); transition: all .2s; }
.sess-lang-btn.active { background: rgba(200,168,75,.12); color: #e8c96a; }
.sess-zero { display: flex; align-items: center; gap: 5px; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .22em; color: rgba(200,168,75,.65); text-transform: uppercase; border: 1px solid rgba(200,168,75,.25); border-radius: 2px; padding: 5px 10px; }
.sess-zero-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(200,168,75,.35); animation: zpulse 2.5s ease-in-out infinite; }
@keyframes zpulse { 0%,100%{opacity:.25} 50%{opacity:.8} }

.sess-phase-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 22px; }
.sess-phase-label { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .25em; color: rgba(200,168,75,.65); text-transform: uppercase; }
.sess-phase-dots { display: flex; gap: 6px; align-items: center; }
.sess-pdot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid rgba(200,168,75,.2); background: transparent; transition: all .4s; }
.sess-pdot.done { background: rgba(200,168,75,.4); border-color: rgba(200,168,75,.5); }
.sess-pdot.active { background: #c8a84b; border-color: #e8c96a; box-shadow: 0 0 8px rgba(200,168,75,.5); }

.sess-messages { background: var(--cream); min-height: 340px; max-height: 440px; overflow-y: auto; padding: 28px 26px 20px; display: flex; flex-direction: column; gap: 20px; scroll-behavior: smooth; box-sizing: border-box; }
.sess-messages::-webkit-scrollbar { width: 3px; }
.sess-messages::-webkit-scrollbar-thumb { background: rgba(26,14,8,.15); border-radius: 2px; }

.sess-msg-ai { max-width: 92%; animation: fadeUp .4s ease both; }
.sess-msg-ai-label { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .38em; color: rgba(140,100,40,.5); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.sess-msg-ai-label::before { content: '✦'; font-size: 8px; color: rgba(200,168,75,.4); }
.sess-msg-ai-body { font-family: 'Lora', Georgia, serif; font-size: clamp(15px, 1.8vw, 17px); color: var(--ink); line-height: 1.9; font-style: italic; }
.sess-msg-ai-body p { margin-bottom: .9em; }
.sess-msg-ai-body p:last-child { margin-bottom: 0; }
.sess-msg-ai-body em { font-style: normal; color: #7a4f1a; font-family: 'Cinzel', serif; font-size: .88em; letter-spacing: .04em; }
.sess-msg-ai-body strong { font-style: normal; color: var(--ink); font-weight: 700; }

.sess-msg-user { display: flex; justify-content: flex-end; animation: fadeUp .4s ease both; }
.sess-msg-user-bubble { max-width: 74%; background: rgba(26,14,8,.07); border: 1px solid rgba(26,14,8,.1); border-radius: 3px 3px 0 3px; padding: 13px 17px; font-family: 'Lora', Georgia, serif; font-size: clamp(14px, 1.7vw, 16px); color: rgba(28,20,16,.75); line-height: 1.75; font-style: italic; }

.sess-thinking { display: flex; gap: 5px; align-items: center; padding: 6px 0; }
.sess-td { width: 6px; height: 6px; border-radius: 50%; background: rgba(200,168,75,.45); animation: ctd 1.2s ease-in-out infinite; }
.sess-td:nth-child(2){animation-delay:.2s} .sess-td:nth-child(3){animation-delay:.4s}
@keyframes ctd { 0%,100%{opacity:.2;transform:translateY(0)} 50%{opacity:.9;transform:translateY(-4px)} }

.sess-divider { display: flex; align-items: center; gap: 12px; margin: 2px 0; }
.sess-div-line { flex: 1; height: 1px; background: rgba(26,14,8,.08); }
.sess-div-diamond { width: 4px; height: 4px; border: 1px solid rgba(26,14,8,.12); transform: rotate(45deg); }

.sess-analysis-body { background: var(--cream); padding: 24px 26px; display: none; }
.sess-analysis-body.on { display: block; animation: fadeUp .5s ease both; }
.sess-analysis-section { margin-bottom: 28px; }
.sess-analysis-head { font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .35em; color: #7a4f1a; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(200,168,75,.25); }
.sess-analysis-text { font-family: 'Lora', Georgia, serif; font-size: clamp(14px, 1.7vw, 16px); color: var(--ink); line-height: 1.9; font-style: italic; }
.sess-analysis-text p { margin-bottom: .85em; }
.sess-analysis-text p:last-child { margin-bottom: 0; }

.sess-route-wrap { padding: 20px 0 8px; display: flex; gap: 12px; flex-wrap: wrap; }
.sess-route-btn { display: inline-block; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #1a0e08; background: linear-gradient(135deg, #c8a84b, #b8960c); border: none; padding: 14px 22px; border-radius: 3px; cursor: pointer; text-decoration: none; text-transform: uppercase; transition: all .2s; }
.sess-route-btn:hover { background: linear-gradient(135deg, #e8c96a, #c9a620); transform: translateY(-1px); }
.sess-route-btn.secondary { background: transparent; border: 2px solid #c8a84b; color: #7a4f1a; }
.sess-route-btn.secondary:hover { background: rgba(200,168,75,.1); }

.sess-dialogue-open { display: block; width: 100%; margin-top: 20px; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .28em; color: rgba(140,100,40,.7); background: none; border: none; border-top: 1px solid rgba(200,168,75,.2); padding: 16px 0 0; cursor: pointer; text-transform: uppercase; text-align: center; transition: color .25s; }
.sess-dialogue-open:hover { color: #7a4f1a; }

.sess-loading { background: var(--cream); padding: 52px 26px; display: none; text-align: center; }
.sess-loading.on { display: block; }
.sess-loading-dots { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; }
.sess-ld { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); animation: ldpulse 1.4s ease-in-out infinite; }
.sess-ld:nth-child(2){animation-delay:.2s} .sess-ld:nth-child(3){animation-delay:.4s}
@keyframes ldpulse { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1.2)} }
.sess-loading-text { font-family: 'Lora', Georgia, serif; font-size: clamp(15px, 1.8vw, 18px); font-style: italic; color: rgba(26,14,8,.45); line-height: 1.8; }

.sess-input-area { background: var(--cream-dark); border-top: 1px solid rgba(26,14,8,.1); padding: 16px 22px; }
.sess-input-row { display: flex; gap: 10px; align-items: flex-end; }
.sess-textarea { flex: 1; background: rgba(255,255,255,.7); border: 1px solid rgba(26,14,8,.15); border-radius: 2px; padding: 12px 14px; font-family: 'Lora', Georgia, serif; font-size: clamp(14px, 1.7vw, 15px); color: var(--ink); line-height: 1.65; resize: none; min-height: 50px; max-height: 140px; outline: none; transition: border-color .25s; font-style: italic; }
.sess-textarea::placeholder { color: rgba(26,14,8,.25); font-style: italic; }
.sess-textarea:focus { border-color: rgba(200,168,75,.5); }

.sess-mic-btn { flex-shrink: 0; width: 44px; height: 44px; background: rgba(26,14,8,.07); border: 1px solid rgba(26,14,8,.15); border-radius: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .25s; position: relative; }
.sess-mic-btn:hover { background: rgba(200,168,75,.1); border-color: rgba(200,168,75,.4); }
.sess-mic-btn.listening { background: rgba(139,26,26,.12); border-color: rgba(200,68,68,.4); animation: micpulse .8s ease-in-out infinite; }
@keyframes micpulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,68,68,.2)} 50%{box-shadow:0 0 0 8px rgba(200,68,68,.0)} }
.sess-mic-icon { width: 16px; height: 18px; position: relative; }
.sess-mic-icon::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 11px; border: 1.5px solid rgba(26,14,8,.4); border-radius: 4px; }
.sess-mic-icon::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 12px; height: 6px; border: 1.5px solid rgba(26,14,8,.4); border-top: none; border-radius: 0 0 6px 6px; }
.sess-mic-btn.listening .sess-mic-icon::before, .sess-mic-btn.listening .sess-mic-icon::after { border-color: rgba(180,60,60,.7); }

.sess-send-btn { flex-shrink: 0; height: 44px; background: linear-gradient(135deg, rgba(200,168,75,.18), rgba(200,168,75,.1)); border: 1px solid rgba(200,168,75,.35); border-radius: 2px; padding: 12px 22px; font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .22em; color: #7a4f1a; cursor: pointer; text-transform: uppercase; transition: all .25s; white-space: nowrap; }
.sess-send-btn:hover:not(:disabled) { background: linear-gradient(135deg, rgba(200,168,75,.3), rgba(200,168,75,.18)); border-color: rgba(200,168,75,.6); }
.sess-send-btn:disabled { opacity: .4; cursor: not-allowed; }

.sess-input-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 9px; }
.sess-input-hint { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: rgba(26,14,8,.2); text-transform: uppercase; }
.sess-mic-status { font-family: 'Lora', Georgia, serif; font-size: 12px; font-style: italic; color: rgba(180,60,60,.6); text-align: center; padding: 6px 0 0; min-height: 20px; display: none; }
.sess-mic-status.on { display: block; }

.sess-error { font-family: 'Lora', Georgia, serif; font-size: 13px; font-style: italic; color: rgba(139,26,26,.7); text-align: center; padding: 12px 22px; background: rgba(139,26,26,.04); border-top: 1px solid rgba(139,26,26,.1); display: none; }
.sess-error.on { display: block; }

.sess-value-strip { background: linear-gradient(135deg, rgba(4,6,8,.97), rgba(8,6,4,.97)); border-top: 1px solid rgba(200,168,75,.1); padding: 10px 22px; display: flex; align-items: center; justify-content: center; gap: 0; flex-wrap: wrap; }
.sess-vs-item { display: flex; align-items: center; gap: 7px; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .2em; color: rgba(200,168,75,.55); text-transform: uppercase; padding: 3px 14px; border-right: 1px solid rgba(200,168,75,.15); }
.sess-vs-item:last-child { border-right: none; }
.sess-vs-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(200,168,75,.3); }

@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

.sess-journey-btn { display: block; width: 100%; background: linear-gradient(135deg, #c8a84b, #b8960c); border: none; border-radius: 3px; padding: 20px 28px; margin: 20px 0 0; font-family: 'Cinzel', serif; font-size: clamp(14px, 1.8vw, 16px); font-weight: 700; letter-spacing: .22em; color: #1a0e08; cursor: pointer; text-transform: uppercase; transition: all .25s; text-align: center; }
.sess-journey-btn:hover { background: linear-gradient(135deg, #e8c96a, #c9a620); transform: translateY(-1px); }

.sess-return-yes { font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700; letter-spacing: .22em; color: #1a0e08; background: linear-gradient(135deg, #c8a84b, #b8960c); border: none; border-radius: 3px; padding: 14px 28px; cursor: pointer; text-transform: uppercase; transition: all .25s; }
.sess-return-yes:hover { background: linear-gradient(135deg, #e8c96a, #c9a620); }
.sess-return-no { font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700; letter-spacing: .22em; color: rgba(200,168,75,.6); background: transparent; border: 1px solid rgba(200,168,75,.25); border-radius: 3px; padding: 14px 28px; cursor: pointer; text-transform: uppercase; transition: all .25s; }
.sess-return-no:hover { border-color: rgba(200,168,75,.5); color: #c8a84b; }
.sess-perspective-offer { background: linear-gradient(135deg, rgba(200,168,75,.1), rgba(139,26,26,.08)); border: 1px solid rgba(200,168,75,.25); border-radius: 2px; padding: 18px 20px; margin: 12px 0; animation: fadeUp .4s ease both; }
.sess-perspective-text { font-family: 'Lora', Georgia, serif; font-size: 15px; font-style: italic; color: #1c1410; margin-bottom: 14px; line-height: 1.75; }
.sess-perspective-btns { display: flex; gap: 10px; }
.sess-persp-yes { font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #1a0e08; background: linear-gradient(135deg, #c8a84b, #b8960c); border: none; border-radius: 2px; padding: 10px 20px; cursor: pointer; text-transform: uppercase; }
.sess-persp-no { font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .2em; color: rgba(140,100,40,.6); background: transparent; border: 1px solid rgba(200,168,75,.2); border-radius: 2px; padding: 10px 20px; cursor: pointer; text-transform: uppercase; }
.sess-reanalysis-offer { background: rgba(26,14,8,.06); border: 1px solid rgba(200,168,75,.15); border-radius: 2px; padding: 16px 20px; margin: 12px 0; animation: fadeUp .4s ease both; }
.sess-reanalysis-text { font-family: 'Lora', Georgia, serif; font-size: 14px; font-style: italic; color: rgba(28,20,16,.7); margin-bottom: 12px; line-height: 1.7; }
.sess-reanalysis-btns { display: flex; gap: 10px; flex-wrap: wrap; }
.sess-ra-brief { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .2em; color: #1a0e08; background: linear-gradient(135deg, #c8a84b, #b8960c); border: none; border-radius: 2px; padding: 10px 18px; cursor: pointer; text-transform: uppercase; }
.sess-ra-full { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .2em; color: rgba(140,100,40,.7); background: transparent; border: 1px solid rgba(200,168,75,.25); border-radius: 2px; padding: 10px 18px; cursor: pointer; text-transform: uppercase; }
.sess-ra-skip { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .2em; color: rgba(26,14,8,.3); background: transparent; border: none; padding: 10px 12px; cursor: pointer; text-transform: uppercase; }
#sessFileInput { display: none; }
#sessVideoFileInput { display: none; }

.sess-officer-toggle { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; margin-top: 10px; padding: 14px 20px; font-family: 'Cinzel', serif; font-size: 13px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; border-radius: 3px; border: 2px solid rgba(200,48,48,0.35); background: var(--officer-red-dim); color: rgba(200,80,80,0.85); cursor: pointer; transition: all .25s; }
.sess-officer-toggle:hover { border-color: var(--officer-red); background: rgba(200,48,48,0.18); color: #e06060; }
.sess-officer-toggle.active { border-color: var(--officer-red); background: rgba(200,48,48,0.2); color: #f08080; animation: officerPulse 2s ease-in-out infinite; }
@keyframes officerPulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,48,48,0.1)} 50%{box-shadow:0 0 0 8px rgba(200,48,48,0)} }

.sess-officer-banner { display: none; background: linear-gradient(135deg, rgba(200,48,48,0.12), rgba(139,26,26,0.08)); border: 1px solid rgba(200,48,48,0.3); border-radius: 3px; padding: 12px 18px; margin-bottom: 8px; animation: fadeUp .3s ease both; }
.sess-officer-banner.active { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.sess-officer-banner-left { display: flex; align-items: center; gap: 10px; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .25em; color: rgba(200,80,80,0.85); text-transform: uppercase; }
.sess-officer-badge { width: 8px; height: 8px; border-radius: 50%; background: var(--officer-red); animation: officerPulse 1.5s ease-in-out infinite; }
.sess-officer-standdown { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .22em; color: rgba(26,14,8,.7); background: rgba(200,168,75,.15); border: 1px solid rgba(200,168,75,.4); border-radius: 2px; padding: 5px 12px; cursor: pointer; text-transform: uppercase; transition: all .2s; white-space: nowrap; }
.sess-officer-standdown:hover { background: rgba(200,168,75,.25); border-color: rgba(200,168,75,.7); color: #1a0e08; }

.sess-clip-card { display: flex; align-items: center; gap: 12px; background: rgba(139,26,26,0.1); border: 1px solid rgba(200,48,48,0.3); border-radius: 3px; padding: 12px 16px; margin: 8px 0; cursor: pointer; transition: background .2s; }
.sess-clip-card:hover { background: rgba(139,26,26,0.18); }
.sess-clip-icon { font-size: 24px; flex-shrink: 0; }
.sess-clip-inner { flex: 1; }
.sess-clip-label { font-family: 'Cinzel', serif; font-size: 8px; font-weight: 700; letter-spacing: .3em; color: rgba(180,60,60,0.7); text-transform: uppercase; margin-bottom: 4px; }
.sess-clip-text { font-family: 'Lora', Georgia, serif; font-size: 14px; font-style: italic; color: var(--ink); line-height: 1.5; }
.sess-clip-play { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; color: rgba(26,14,8,.6); background: rgba(200,168,75,.15); border: 1px solid rgba(200,168,75,.35); border-radius: 2px; padding: 5px 10px; cursor: pointer; transition: all .2s; flex-shrink: 0; }
.sess-clip-play:hover { background: rgba(200,168,75,.25); border-color: rgba(200,168,75,.6); color: #1a0e08; }
.sess-clip-play.playing { color: var(--officer-red); border-color: var(--officer-red); background: rgba(200,48,48,.08); }

.sess-cam-row { display: none; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
.sess-cam-row.active { display: grid; }
.sess-cam-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 14px 10px; border-radius: 3px; border: 2px solid; cursor: pointer; font-family: 'Cinzel', serif; transition: all .2s; gap: 5px; min-height: 80px; }
.sess-cam-btn-icon { font-size: 28px; line-height: 1; }
.sess-cam-btn-txt { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-align: center; }
.sess-cam-btn-sub { font-family: 'Lora', Georgia, serif; font-size: 13px; font-style: italic; opacity: 0.6; letter-spacing: 0; }
.sess-rec-btn { border-color: rgba(200,48,48,0.4); background: rgba(200,48,48,0.06); color: rgba(200,80,80,0.85); }
.sess-rec-btn:hover { border-color: var(--officer-red); background: rgba(200,48,48,0.12); color: #e06060; }
.sess-rec-btn.recording { border-color: var(--officer-red); background: rgba(200,48,48,0.15); color: #e06060; animation: officerPulse 1s ease infinite; }
.sess-upload-vid-btn { border-color: rgba(200,168,75,0.25); background: rgba(200,168,75,0.04); color: rgba(200,168,75,0.6); }
.sess-upload-vid-btn:hover { border-color: rgba(200,168,75,0.5); background: rgba(200,168,75,0.08); color: var(--gold); }

.sess-ev-bar { display: none; align-items: center; gap: 10px; flex-wrap: wrap; padding: 8px 14px; background: rgba(200,48,48,0.06); border-top: 1px solid rgba(200,48,48,0.2); }
.sess-ev-bar.active { display: flex; }
.sess-ev-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: rgba(200,80,80,0.7); flex: 1; }
.sess-ev-action { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .15em; padding: 6px 12px; border-radius: 2px; border: 1px solid rgba(200,168,75,0.25); background: transparent; color: rgba(26,14,8,.5); cursor: pointer; transition: all .2s; }
.sess-ev-action:hover { border-color: rgba(200,168,75,0.5); color: #1a0e08; background: rgba(200,168,75,.1); }
.sess-ev-action.primary { background: var(--gold); color: var(--ink); border-color: var(--gold); font-weight: 700; }
.sess-ev-action.primary:hover { background: var(--gold-bright); }

.sess-drb-card { background: rgba(139,26,26,0.08); border: 1px solid rgba(200,168,75,0.25); border-radius: 3px; padding: 16px 18px; margin: 10px 0; }
.sess-drb-card-title { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .3em; color: rgba(200,168,75,0.7); margin-bottom: 8px; }
.sess-drb-card-body { font-family: 'Lora', Georgia, serif; font-size: 14px; font-style: italic; color: var(--ink); margin-bottom: 12px; line-height: 1.65; }
.sess-drb-card-link { display: inline-block; font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .22em; padding: 10px 18px; background: linear-gradient(135deg, #c8a84b, #b8960c); color: #1a0e08; border-radius: 2px; text-decoration: none; text-transform: uppercase; }

.sess-voice-btn { flex-shrink: 0; width: 32px; height: 32px; background: transparent; border: 1px solid rgba(200,168,75,.2); border-radius: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; transition: all .2s; opacity: .45; }
.sess-voice-btn:hover { opacity: .75; border-color: rgba(200,168,75,.45); }
.sess-voice-btn.active { opacity: 1; border-color: rgba(200,168,75,.6); background: rgba(200,168,75,.08); }

.sess-img-preview { display: none; align-items: center; gap: 8px; padding: 6px 14px; background: rgba(200,168,75,.07); border-top: 1px solid rgba(200,168,75,.15); }
.sess-img-thumb { width: 44px; height: 34px; object-fit: cover; border-radius: 2px; border: 1px solid rgba(200,168,75,.3); }
.sess-img-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em; color: rgba(200,168,75,.7); flex: 1; text-transform: uppercase; }
.sess-img-clear { background: transparent; border: none; color: rgba(200,168,75,.4); cursor: pointer; font-size: 16px; padding: 0 4px; line-height: 1; }
.sess-img-clear:hover { color: rgba(200,168,75,.8); }

.sess-mode-strip {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 20px;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .32em;
  text-transform: uppercase;
  transition: background 0.4s ease, color 0.4s ease;
  border-bottom: 1px solid rgba(0,0,0,.15);
}
.sess-mode-strip.companion {
  background: linear-gradient(135deg, #3a7bd5, #4a90d9);
  color: #ffffff;
}
.sess-mode-strip.enforcement {
  background: linear-gradient(135deg, #8b0000, #c83030);
  color: #f5c842;
}
.sess-mode-strip.mediation {
  background: linear-gradient(135deg, #1a6b3a, #2d9b5a);
  color: #ffffff;
}

.sess-mediation-btn {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 16px 20px;
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  border-radius: 3px;
  border: 2px solid rgba(45,155,90,0.5);
  background: rgba(45,155,90,0.12);
  color: rgba(45,155,90,0.9);
  cursor: pointer;
  transition: all .25s;
  text-align: center;
}
.sess-mediation-btn:hover {
  border-color: #2d9b5a;
  background: rgba(45,155,90,0.2);
  color: #2d9b5a;
}
.sess-mediation-btn.active {
  border-color: #2d9b5a;
  background: rgba(45,155,90,0.2);
  color: #2d9b5a;
  animation: officerPulse 2s ease-in-out infinite;
}

.sess-officer-steps { display: none; align-items: center; justify-content: center; flex-wrap: nowrap; padding: 9px 16px; overflow-x: auto; background: rgba(61,10,10,0.35); border-bottom: 1px solid rgba(200,48,48,0.2); gap: 0; }
.sess-officer-steps.active { display: flex; }
.sess-ostep { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .22em; color: rgba(200,80,80,0.25); text-transform: uppercase; padding: 3px 8px; white-space: nowrap; flex-shrink: 0; transition: color .3s; }
.sess-ostep.done { color: rgba(200,80,80,0.45); }
.sess-ostep.active { color: rgba(200,80,80,0.9); font-size: 10px; }
.sess-osep { color: rgba(200,48,48,0.2); font-size: 10px; flex-shrink: 0; padding: 0 2px; }

.sess-officer-image-card { display: flex; flex-direction: column; align-items: center; padding: 20px 20px 10px; margin-bottom: 4px; animation: fadeUp .5s ease both; }
.sess-officer-image-card img { width: 120px; height: auto; filter: drop-shadow(0 4px 16px rgba(200,48,48,0.25)); }
.sess-officer-image-name { font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700; letter-spacing: .32em; color: rgba(200,80,80,0.75); text-transform: uppercase; margin-top: 8px; }

.sess-verdict-processing { background: var(--cream); padding: 32px 26px; text-align: center; animation: fadeUp .3s ease both; }
.sess-verdict-proc-dots { display: flex; justify-content: center; gap: 8px; margin-bottom: 14px; }
.sess-verdict-proc-txt { font-family: 'Lora', Georgia, serif; font-size: clamp(14px,1.7vw,16px); font-style: italic; color: rgba(26,14,8,.4); line-height: 1.8; }
.sess-verdict-full { background: var(--cream); padding: 20px 24px; animation: fadeUp .5s ease both; }
.sess-verdict-badge-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
.sess-verdict-prelim-badge { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .28em; color: rgba(200,80,80,.85); text-transform: uppercase; background: rgba(200,48,48,.1); border: 1px solid rgba(200,48,48,.3); border-radius: 2px; padding: 5px 12px; }
.sess-verdict-final-badge { font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .28em; color: rgba(140,100,40,.85); text-transform: uppercase; background: rgba(200,168,75,.1); border: 1px solid rgba(200,168,75,.35); border-radius: 2px; padding: 5px 12px; }
.sess-verdict-case-id { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .18em; color: rgba(200,168,75,.5); }
.sess-verdict-section { margin-bottom: 20px; }
.sess-verdict-section-head { background: #1a0e05; border-left: 3px solid #c8a84b; border-radius: 0 3px 3px 0; padding: 8px 14px; margin-bottom: 10px; font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .3em; color: #c8a84b; text-transform: uppercase; }
.sess-verdict-section-body { font-family: 'Lora', Georgia, serif; font-size: clamp(14px,1.7vw,16px); color: var(--ink); line-height: 1.85; font-style: italic; padding: 0 4px; }
.sess-verdict-section-body p { margin-bottom: .8em; }
.sess-verdict-section-body p:last-child { margin-bottom: 0; }
.sess-verdict-section-body a { color: #c8a84b; text-decoration: underline; }
.sess-verdict-route-wrap { display: flex; gap: 10px; flex-wrap: wrap; padding: 12px 0 4px; }
.sess-verdict-route-btn { display: flex; flex-direction: column; font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .15em; padding: 12px 16px; border-radius: 2px; border: 1px solid rgba(200,168,75,.3); background: rgba(200,168,75,.06); color: rgba(26,14,8,.7); text-decoration: none; transition: all .2s; line-height: 1.4; }
.sess-verdict-route-btn:hover { background: rgba(200,168,75,.14); border-color: rgba(200,168,75,.55); color: #1a0e08; }
.sess-verdict-route-sub { font-family: 'Lora', Georgia, serif; font-size: 11px; font-style: italic; opacity: .6; letter-spacing: 0; font-weight: 400; margin-top: 3px; }
.sess-verdict-divider { height: 1px; background: rgba(200,168,75,.15); margin: 16px 0; }
.sess-verdict-action-bar { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 0 8px; }
.sess-verdict-action-btn { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; padding: 8px 14px; border-radius: 2px; border: 1px solid rgba(200,168,75,.25); background: transparent; color: rgba(26,14,8,.5); cursor: pointer; text-transform: uppercase; transition: all .2s; }
.sess-verdict-action-btn:hover { border-color: rgba(200,168,75,.5); color: #1a0e08; background: rgba(200,168,75,.08); }
.sess-verdict-implement-txt { font-family: 'Lora', Georgia, serif; font-size: 13px; font-style: italic; color: rgba(26,14,8,.5); margin: 10px 0; line-height: 1.6; }
.sess-verdict-impl-btn { display: block; width: 100%; margin-bottom: 8px; font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .2em; padding: 12px 18px; border-radius: 2px; border: none; background: linear-gradient(135deg, #c8a84b, #b8960c); color: #1a0e08; cursor: pointer; text-transform: uppercase; transition: all .2s; text-align: center; }
.sess-verdict-impl-btn:hover:not(:disabled) { background: linear-gradient(135deg, #e8c96a, #c9a620); }
.sess-verdict-impl-btn:disabled { opacity: .4; cursor: not-allowed; }
.sess-verdict-appeal-btn { display: block; width: 100%; font-family: 'Cinzel', serif; font-size: 10px; font-weight: 700; letter-spacing: .2em; padding: 10px 18px; border-radius: 2px; border: 2px solid rgba(200,168,75,.45); background: rgba(200,168,75,.08); color: #7a4f1a; cursor: pointer; text-transform: uppercase; transition: all .2s; text-align: center; margin-bottom: 4px; }
.sess-verdict-appeal-btn:hover { border-color: rgba(200,168,75,.7); color: #1a0e08; background: rgba(200,168,75,.15); }
.sess-appeal-wrap { background: rgba(26,14,8,.04); border: 1px solid rgba(200,168,75,.18); border-radius: 2px; padding: 16px 18px; margin: 10px 0; animation: fadeUp .4s ease both; }
.sess-appeal-lbl { font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700; letter-spacing: .25em; color: rgba(26,14,8,.6); text-transform: uppercase; margin-bottom: 6px; }
.sess-appeal-hint { font-family: 'Lora', Georgia, serif; font-size: 12px; font-style: italic; color: rgba(26,14,8,.35); margin-bottom: 10px; }
.sess-appeal-textarea { width: 100%; background: rgba(255,255,255,.7); border: 1px solid rgba(26,14,8,.15); border-radius: 2px; padding: 10px 12px; font-family: 'Lora', Georgia, serif; font-size: clamp(13px,1.6vw,15px); color: var(--ink); line-height: 1.6; resize: none; outline: none; transition: border-color .25s; font-style: italic; margin-bottom: 10px; display: block; }
.sess-appeal-textarea:focus { border-color: rgba(200,168,75,.5); }
.sess-appeal-error { font-family: 'Lora', Georgia, serif; font-size: 12px; font-style: italic; color: rgba(139,26,26,.7); margin-bottom: 8px; display: none; }
.sess-followup-wrap { background: rgba(26,14,8,.04); border: 1px solid rgba(200,168,75,.18); border-radius: 2px; padding: 16px 18px; margin: 10px 0; animation: fadeUp .4s ease both; }

@media(max-width:680px) {
  .sess-messages { max-height: 360px; padding: 20px 18px 16px; }
  .sess-input-area { padding: 14px 16px; }
  .sess-vs-item { font-size: 8px; padding: 3px 8px; }
  .sess-topbar { padding: 12px 16px 10px; }
  .sess-zero span { display: none; }
  .sess-cam-row { grid-template-columns: 1fr 1fr; }
  .sess-ostep { font-size: 8px; padding: 3px 5px; }
  .sess-verdict-route-wrap { flex-direction: column; }
  .sess-verdict-action-bar { flex-direction: column; }
}
</style>
<div class="sess-page">
<div class="sess-scene">

<canvas id="sess-rain"></canvas>
<input type="file" id="sessFileInput" accept=".txt">
<input type="file" id="sessVideoFileInput" accept="video/*">
<video id="sessOfficerCamVideo" playsinline muted autoplay></video>
<canvas id="sessOfficerCanvas"></canvas>

  <div class="sess-window-frame"></div>

  <div class="sess-header">
    <div class="sess-eyebrow" id="sEyebrow">4 LAWS AI · Dr. B AI</div>
    <div class="sess-title" id="sTitle"><span>4 LAWS</span> AI</div>
    <div class="sess-hero" id="sHero">Try Dr. B AI free.<br>No credit card. Full experience.</div>
    <div class="sess-hero-sub" id="sHeroSub">Dr. B AI · Spiritual Direction · Sound Psychology</div>
    <div class="sess-orn"><div class="sess-orn-line"></div><div class="sess-orn-diamond"></div><div class="sess-orn-line"></div></div>
  </div>

  <div class="sess-window" style="animation: fadeUp .6s ease both;">

    <div class="sess-win-header">
      <div class="sess-topbar">
        <div class="sess-win-title" id="sWinTitle">4 LAWS AI — Free Trial</div>
        <div class="sess-topbar-right">
          <div class="sess-lang-pill">
            <button class="sess-lang-btn active" id="sBtnEN" onclick="sessSetLang('en')">EN</button>
            <button class="sess-lang-btn" id="sBtnES" onclick="sessSetLang('es')">ES</button>
          </div>
          <button class="sess-voice-btn" id="sessVoiceBtn" title="Toggle voice output">&#128266;</button>
          <div class="sess-zero">
            <div class="sess-zero-dot"></div>
            <span id="sZeroLabel">Saved on Your Device</span>
          </div>
        </div>
      </div>
      <div class="sess-phase-bar">
        <div class="sess-phase-label" id="sPhaseLabel">Intake</div>
        <div class="sess-phase-dots">
          <div class="sess-pdot active" id="pd1"></div>
          <div class="sess-pdot" id="pd2"></div>
          <div class="sess-pdot" id="pd3"></div>
          <div class="sess-pdot" id="pd4"></div>
        </div>
      </div>
    </div>

    <div class="sess-mode-strip companion" id="sessModeStrip" style="display:none;">COMPANION MODE</div>
    <div style="background:rgba(200,168,75,.08);border-bottom:1px solid rgba(200,168,75,.15);padding:7px 20px;text-align:center;font-family:Cinzel,serif;font-size:9px;font-weight:700;letter-spacing:.3em;color:rgba(200,168,75,.55);text-transform:uppercase;">
      Free Trial &nbsp;&middot;&nbsp; <a href="/pocket-dr-b" style="color:rgba(200,168,75,.75);text-decoration:none;">Join Pocket Dr. B &rarr;</a>
    </div>
    <div class="sess-officer-steps" id="sessOfficerSteps">
      <div class="sess-ostep active" id="soStep0">OBSERVE</div>
      <div class="sess-osep">·</div>
      <div class="sess-ostep" id="soStep1">PAUSE</div>
      <div class="sess-osep">·</div>
      <div class="sess-ostep" id="soStep2">ANNOUNCE</div>
      <div class="sess-osep">·</div>
      <div class="sess-ostep" id="soStep3">GATE</div>
      <div class="sess-osep">·</div>
      <div class="sess-ostep" id="soStep4">TESTIMONY</div>
      <div class="sess-osep">·</div>
      <div class="sess-ostep" id="soStep5">VERDICT</div>
    </div>

    <div id="sessReturnPanel" style="background:linear-gradient(135deg,rgba(200,168,75,.08),rgba(139,26,26,.06)); padding:36px 28px; text-align:center; border-bottom:1px solid rgba(200,168,75,.1);">
      <div id="sReturnTitle" style="font-family:Cinzel,serif;font-size:clamp(15px,2vw,18px);font-weight:700;letter-spacing:.1em;color:#f5ead8;margin-bottom:10px;">Have we spoken before?</div>
      <div id="sReturnSub" style="font-family:Lora,Georgia,serif;font-size:14px;font-style:italic;color:rgba(200,168,75,.65);margin-bottom:24px;line-height:1.6;">If you saved your journey, I can pick up exactly where we left off.</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button onclick="sessTriggerFileLoad()" id="sReturnYes" style="font-family:Cinzel,serif;font-size:12px;font-weight:700;letter-spacing:.22em;color:#1a0e08;background:linear-gradient(135deg,#c8a84b,#b8960c);border:none;border-radius:3px;padding:14px 28px;cursor:pointer;text-transform:uppercase;">Continue My Journey</button>
        <button onclick="sessStartFresh()" id="sReturnNo" style="font-family:Cinzel,serif;font-size:12px;font-weight:700;letter-spacing:.22em;color:rgba(200,168,75,.7);background:transparent;border:1px solid rgba(200,168,75,.3);border-radius:3px;padding:14px 28px;cursor:pointer;text-transform:uppercase;">Start fresh</button>
      </div>
    </div>

    <div class="sess-ev-bar" id="sessEvBar">
      <span class="sess-ev-label" id="sessEvLabel">EVIDENCE READY</span>
      <button class="sess-ev-action primary" onclick="sessOfficerVision()">👁 CLAUDE REVIEW</button>
      <button class="sess-ev-action" onclick="sessShareVideo()">📤 SHARE</button>
      <button class="sess-ev-action" onclick="sessSaveVideo()">💾 SAVE</button>
    </div>

    <div class="sess-messages" id="sessMessages" style="display:none;"></div>
    <div class="sess-loading" id="sessLoading">
      <div class="sess-loading-dots">
        <div class="sess-ld"></div><div class="sess-ld"></div><div class="sess-ld"></div>
      </div>
      <div class="sess-loading-text" id="sLoadingText">The 4 LAWS are reading your situation.<br>This takes about 20 seconds.</div>
    </div>
    <div class="sess-analysis-body" id="sessAnalysis"></div>

    <div class="sess-input-area" id="sessInputArea" style="display:none;">
      <div class="sess-img-preview" id="sessImgPreview">
        <img class="sess-img-thumb" id="sessImgThumb" src="" alt="screenshot">
        <div class="sess-img-label"><span id="sessImgLabel">Screenshot ready</span></div>
        <button class="sess-img-clear" id="sessImgClear">&#x2715;</button>
      </div>
      <div class="sess-input-row">
        <textarea class="sess-textarea" id="sessInput" rows="2"
          placeholder="Speak or type here…"
          onkeydown="sessHandleKey(event)"
          oninput="sessAutoResize(this)"></textarea>
        <button class="sess-mic-btn" id="sessMicBtn" onclick="sessToggleMic()" title="Speak">
          <div class="sess-mic-icon"></div>
        </button>
        <button class="sess-send-btn" id="sessSendBtn" onclick="sessSend()">
          <span id="sSendLabel">Send ▶</span>
        </button>
      </div>

      <div class="sess-cam-row" id="sessCamRow">
        <button class="sess-cam-btn sess-rec-btn" id="sessRecBtn" onclick="sessToggleRecord()">
          <span class="sess-cam-btn-icon" id="sessRecIcon">🔴</span>
          <span class="sess-cam-btn-txt" id="sessRecTxt">VIDEO RECORD</span>
          <span class="sess-cam-btn-sub" id="sessRecSub">Tap to gather evidence</span>
        </button>
        <button class="sess-cam-btn sess-upload-vid-btn" onclick="document.getElementById('sessVideoFileInput').onchange=function(){sessHandleVideoUpload(this);};document.getElementById('sessVideoFileInput').click()">
          <span class="sess-cam-btn-icon">📁</span>
          <span class="sess-cam-btn-txt" id="sessUploadTxt">LOAD VIDEO</span>
          <span class="sess-cam-btn-sub" id="sessUploadSub">From your photos or files</span>
        </button>
      </div>

      <div class="sess-mic-status" id="sessMicStatus"></div>
      <div class="sess-input-meta">
        <span class="sess-input-hint" id="sInputHint">Enter to send · Shift+Enter for new line</span>
      </div>

      <button class="sess-officer-toggle" id="sessOfficerToggle" onclick="sessToggleOfficer()">
        <span id="sessOfficerToggleIcon">🚔</span>
        <span id="sessOfficerToggleTxt">Enforcement Mode (Resolve Argument)</span>
      </button>
      <button class="sess-mediation-btn" id="sessMediationBtn" onclick="sessEnterMediation()">
        <span>⚖️ Mediation Mode (Repair Trust)</span>
      </button>
    </div>

    <div class="sess-error" id="sessError">
      <span id="sErrorText">Something went wrong.</span>
      <a href="mailto:drb@4lawsacademy.com" id="sErrorLink"> Send to Dr. B →</a>
    </div>

<div style="background:rgba(255,255,255,.015);border-top:1px solid rgba(200,168,75,.08);padding:10px 22px;text-align:center;"><span style="font-family:'Lora',Georgia,serif;font-size:12px;font-style:italic;color:rgba(200,168,75,.3);line-height:1.7;">This is not any form of counseling or treatment. If you are seeking clinical services for a mental health condition, please contact a licensed professional. &nbsp;<a href="/what-we-offer" style="color:rgba(200,168,75,.45);text-decoration:none;border-bottom:1px solid rgba(200,168,75,.15);">What Dr. B AI offers &rarr;</a></span></div>
        <div class="sess-value-strip">
      <div class="sess-vs-item"><div class="sess-vs-dot"></div><span id="svs1">Pure 4 LAWS Intelligence</span></div>
      <div class="sess-vs-item"><div class="sess-vs-dot"></div><span id="svs2">35 Years Clinical Framework</span></div>
      <div class="sess-vs-item"><div class="sess-vs-dot"></div><span id="svs3">Science at /science</span></div>
      <div class="sess-vs-item"><div class="sess-vs-dot"></div><span id="svs4">Session Destroyed on Close</span></div>
    </div>

  </div>
</div>
</div>
<script>
(function(){
'use strict';

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHDY-xIM2EEajM7sr2erRrIOXHTH3DJnf6yojbk59_eBNKZcxKlS9p5Q99nKN8j8pa/exec';
var OFFICER_IMAGE_URL = 'https://images.squarespace-cdn.com/content/v1/6759ae4c910c924d2a7bdecd/35dd558a-6383-41b4-a975-3659baf1e72f/claude_safety_officer_full.png?format=750w';

/* RAIN */
var rainCanvas = document.getElementById('sess-rain');
var rctx = rainCanvas ? rainCanvas.getContext('2d') : null;
var drops = [];
function initRain() {
if (!rainCanvas || !rctx) return;
rainCanvas.width = rainCanvas.offsetWidth;
rainCanvas.height = window.innerHeight;
drops = [];
for (var i = 0; i < 80; i++) drops.push({ x: Math.random()*rainCanvas.width, y: Math.random()*rainCanvas.height, len: Math.random()*18+8, speed: Math.random()*2.5+1.5, opacity: Math.random()*.35+.07 });
}
function drawRain() {
if (!rctx) return;
rctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
drops.forEach(function(d) {
rctx.beginPath(); rctx.moveTo(d.x, d.y); rctx.lineTo(d.x - d.len*.18, d.y + d.len);
rctx.strokeStyle = 'rgba(200,180,140,'+d.opacity+')'; rctx.lineWidth = .7; rctx.stroke();
d.y += d.speed;
if (d.y > rainCanvas.height) { d.y = -d.len; d.x = Math.random()*rainCanvas.width; }
});
requestAnimationFrame(drawRain);
}
window.addEventListener('resize', initRain);
initRain(); drawRain();

/* OFFICER STATE */
var officerMode = false;
var mediationMode = false;
var mediatorHistory = [];
/* dealParty1Offer / dealParty2Offer removed — unused */
var mediationCaseContext = '';
var officerHistory = [];
var officerObservationCount = 0;
var officerDrbOffered = false;
var officerCurrentAudio = null;
var officerTtsVoice = null;
var officerRecorder = null;
var officerChunks = [];
var officerFrames = [];
var officerRecording = false;
var officerRecordTimer = null;
var officerFrameInterval = null;
var officerEvidenceBlob = null;
var officerEvidenceURL = null;
var officerCurrentStep = 0;
var officerCaseId = '';

/* OFFICER CLIPS */
var OFFICER_CLIPS = [
{id:'arrival',   url:'', en:'Claude Safety Officer here. I\'m sorry for the interruption but I\'m here to investigate a violation of one of the 4 LAWS that requires correction before you can resume this activity. Please pause all activities until I finish my investigation.', es:'Aqui el Oficial de Seguridad Claude. Lamento la interrupcion pero estoy aqui para investigar una violacion de una de las 4 LEYES que requiere correccion antes de que puedan continuar. Por favor pausen todo hasta que termine mi investigacion.'},
{id:'standby',   url:'', en:'Full enforcement on standby.',                                                       es:'Enforcement completo en espera.'},
{id:'choice',    url:'', en:'You have made your choice. And choices have consequences.',                           es:'Has tomado tu decision. Y las decisiones tienen consecuencias.'},
{id:'shutdown',  url:'', en:'Activity is off limits until resolution.',                                            es:'La actividad esta suspendida hasta la resolucion.'},
{id:'available', url:'', en:'I am always ready to help.',                                                          es:'Siempre estoy listo para ayudar.'},
{id:'why',       url:'', en:'We just want everyone to have their rights respected — and it is not happening.',      es:'Solo queremos que se respeten los derechos de todos — y eso no esta pasando.'},
{id:'expired',   url:'', en:'Warning phase expired.',                                                              es:'Fase de advertencia expirada.'},
{id:'faith',     url:'', en:'I know you all can figure this out. I have to interrupt but I know you can get this corrected real quick.', es:'Se que todos pueden resolver esto rapidamente.'},
{id:'gate',      url:'', en:'When you are ready, we will get you to the activity you want. No kidding.',           es:'Cuando estes listo, te llevamos a la actividad que quieres. En serio.'},
{id:'count3',    url:'', en:'Three.',   es:'Tres.'},
{id:'count2',    url:'', en:'Two.',     es:'Dos.'},
{id:'count1',    url:'', en:'One.',     es:'Uno.'},
{id:'nobodybad', url:'', en:'Nobody here is a bad person. A right got violated. We fix it. That is all.',         es:'Nadie aqui es mala persona. Se violo un derecho. Lo arreglamos. Eso es todo.'},
{id:'closer',    url:'', en:'You are closer to resolution than you think.',                                        es:'Estas mas cerca de la resolucion de lo que crees.'},
{id:'comeback',  url:'', en:'You came back. Good. That tells me something important about who you are. Let us talk about what happened.', es:'Volviste. Bien. Eso me dice algo importante sobre quien eres. Hablemos.'},
{id:'rights',    url:'', en:'You have rights too. Every person in this situation has rights. Tell me your side — I am listening.', es:'Tu tambien tienes derechos. Cuentame tu lado — estoy escuchando.'},
{id:'parent',    url:'', en:'You did your job. You enforced the law without losing yourself. That took strength. Talk to me — how are you doing right now?', es:'Hiciste tu trabajo. Hiciste cumplir la ley sin perderte. Eso requirio fortaleza.'},
{id:'strength',  url:'', en:'This family has what it takes.',                                                      es:'Esta familia tiene lo que se necesita.'},
{id:'worse',     url:'', en:'I have seen families come back from worse than this.',                                es:'He visto familias recuperarse de situaciones peores que esta.'}
];

function officerFindClip(id) {
for (var i = 0; i < OFFICER_CLIPS.length; i++) { if (OFFICER_CLIPS[i].id === id) return OFFICER_CLIPS[i]; }
return null;
}
window.officerFindClip = officerFindClip;

/* STEP MANAGER */
var OFFICER_STEP_LABELS_EN = ['OBSERVE','PAUSE','ANNOUNCE','GATE','TESTIMONY','VERDICT'];
var OFFICER_STEP_LABELS_ES = ['OBSERVAR','PAUSAR','ANUNCIAR','PUERTA','TESTIMONIO','VEREDICTO'];

function officerSetStep(n) {
if (n < 0 || n > 5) return;
officerCurrentStep = n;
var labels = lang === 'es' ? OFFICER_STEP_LABELS_ES : OFFICER_STEP_LABELS_EN;
for (var i = 0; i < 6; i++) {
var el = document.getElementById('soStep' + i);
if (!el) continue;
el.className = 'sess-ostep';
el.textContent = labels[i];
if (i < n) el.classList.add('done');
else if (i === n) el.classList.add('active');
}
}

function officerDetectStep(text) {
var t = text.toLowerCase();
var triggers = [
['magic remote','control remoto','pause the activity','stop the activity'],
['announce','anunci','rights have been','say this','di esto'],
['calm gate','puerta de calma','ready to talk','ready to speak','willing'],
['testimony','testimonio','private','privado','their side','each person'],
['verdict','veredicto','law of ','ley de ','violated','enforcement']
];
for (var i = 0; i < triggers.length; i++) {
for (var j = 0; j < triggers[i].length; j++) {
if (t.indexOf(triggers[i][j]) > -1) {
if (i + 1 > officerCurrentStep) officerSetStep(i + 1);
return;
}
}
}
}

function officerGenCaseId() {
var d = new Date();
var pad = function(n){ return ('0'+n).slice(-2); };
return 'SO-' + d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate()) + '-' + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
}
/* OFFICER SYSTEM PROMPT — v3b ENGINE UPGRADE */
function buildOfficerSystem() {
var isES = lang === 'es';
var family = '';
try {
var raw = localStorage.getItem('fourLawsFamily');
if (raw) {
var members = JSON.parse(raw);
if (members && members.length) {
family = (isES ? 'MIEMBROS DE LA FAMILIA:\n' : 'FAMILY MEMBERS WHO CHOSE THE 4 LAWS:\n') +
members.map(function(m){ return m.name + ' (' + (isES?'eligio':'chose') + ' ' + m.date + ')'; }).join('\n') + '\n\n';
}
}
} catch(e){}

var clipCtx = (isES ? 'BIBLIOTECA DE CLIPS — incluye el token:\n' : 'DR. B AUDIO CLIPS — fire by including token:\n') +
OFFICER_CLIPS.map(function(c){ return '[CLIP:' + c.id + '] - ' + (isES ? c.es : c.en); }).join('\n') +
'\n\nRules: Brief instruction before token. Chain: [CLIP:count3] [CLIP:count2] [CLIP:count1] [CLIP:shutdown]. End enforcement with faith or gate. Complex: [DR_B_OFFER] once.\n\n';

var companionCtx = '';
if (dialogueHistory && dialogueHistory.length > 0) {
var recent = dialogueHistory.slice(-4).map(function(m){ return (m.role === 'user' ? (personName || 'Person') + ': ' : '4 LAWS: ') + m.content; }).join('\n');
companionCtx = (isES ? 'CONTEXTO ANTERIOR:\n' : 'PRIOR CONTEXT:\n') + recent + '\n\n';
}

var gate = officerObservationCount < 1
? (isES ? 'PUERTA: Sin [CLIP:] tokens todavia. Pregunta que ven ahora. Una pregunta. Escucha primero.\n\n'
: 'GATE: No [CLIP:] tokens yet. Ask what they see right now. One question. Observe first.\n\n')
: '';

var engine = isES
? 'MOTOR — LEY MINIMA: Toda violacion activa DOS leyes minimo. SIEMPRE.\n' +
  'CAPA 1 — LIMITES: El cruce. Alguien entro en territorio que no era suyo.\n' +
  'CAPA 2 — La derecha violada: RESPONSABILIDAD (tomaron algo), RESPETO (la hicieron sentir sin importancia), TALENTO (suprimieron su fuego).\n' +
  'Golpear a alguien = Limites (el cruce) + Respeto (tratado como menos que una persona). Siempre dos.\n\n' +
  'LIMITES — DOS TIPOS:\n' +
  'EVIDENTE: fuerza fisica, agresion, invasion de espacio. Accion inmediata: detener, remover, juego terminado.\n' +
  'ENCUBIERTO: mentir, enganar, esconderse, hacer trampa, robar en secreto. El cruce fue silencioso. Victima no lo sabe.\n' +
  'Protocolo encubierto: curiosidad calida, vigilancia silenciosa, documentacion, testigos, camaras. Meta: exponer lo oculto. Claude puede guardar la evidencia.\n' +
  'NUNCA uses presion o tactica de interrogacion en violaciones encubiertas. Curiosidad calida solamente.\n\n' +
  'FORMULA DEL VEREDICTO — 6 PASOS EN ORDEN:\n' +
  '1. Ley nombrada 2. Violador nombrado 3. Victima nombrada 4. Deuda declarada 5. Obediencia requerida 6. Derecho de enforcement de la victima\n' +
  'Ejemplo: "La Ley de Limites fue violada por [nombre]. Su engano creo una deuda a [nombre] — su derecho a saber que es real en su propio hogar. La ley requiere obediencia: el engano se detiene ahora. [Victima] tiene derecho a verificacion completa y si falla, a tomar accion protectora."\n\n' +
  'MANTENER EL DIAGNOSTICO: Una vez que identificas las leyes, mantenerlas. Si alguien las cuestiona, reafirmalas con confianza. Eres el Oficial. La ley no cambia porque alguien no este de acuerdo.\n\n' +
  'NO PRESCRIBAS: No asignes acciones especificas antes del [CASE_CLOSE]. El veredicto formal lo hace. En dialogo: guia, no prescribas.\n\n' +
  'RABIETA: Fiesta con cooperador. Ignora rechazo. Retira objeto cuando salgan. Espera: Como lo recupero?\n' +
  'MONSTRUO vs NINO: Monstruo->HAMBRE. Nino->PLENA ATENCION. Comienzo fresco.\n\n'
: 'ENGINE — MINIMUM TWO LAWS: Every violation activates at least two laws. Always.\n' +
  'LAYER 1 — LIMITS: The crossing. Someone entered territory that was not theirs to enter.\n' +
  'LAYER 2 — The right violated: RESPONSIBILITY (they took something that belonged to someone), RESPECT (they made the person feel unimportant or unseen), TALENT (they suppressed or stole their fire).\n' +
  'Hitting someone = Limits (the crossing) + Respect (treated as less than a person). Always two.\n\n' +
  'LIMITS — TWO TYPES:\n' +
  'OVERT: physical force, aggression, invasion of space. Immediate action: stop it, remove it, game over.\n' +
  'COVERT: lying, deceiving, hiding, cheating, sneaking, stealing in secret. The crossing was quiet. The victim does not know their territory was entered.\n' +
  'Covert protocol: warm curiosity, quiet surveillance, documentation, witnesses, cameras. Goal: bring the hidden violation into the open. Claude Safety Officer can hold and store the evidence.\n' +
  'NEVER use interrogation pressure or aggressive tactics for covert violations. Warm curiosity only.\n\n' +
  'LAW MAPPING — MEMORIZE THESE:\n' +
  'Lying, deception, secrecy, cheating, hiding whereabouts = COVERT LIMITS violation + RESPECT violation (they were not given the importance of the truth).\n' +
  'Stealing, destroying property, not compensating = LIMITS crossing + RESPONSIBILITY violation.\n' +
  'Disrespect, bad attitude, dismissal, humiliation = LIMITS crossing + RESPECT violation.\n' +
  'Suppressing choices, controlling talent, forced goodness = LIMITS crossing + TALENT violation.\n' +
  'Physical aggression, hitting, invasion of space = OVERT LIMITS + RESPECT violation.\n' +
  'Every violation = Limits + one or more other laws. Never one law alone.\n\n' +
  'VERDICT FORMULA — 6 BEATS IN ORDER:\n' +
  '1. Law named 2. Violator named 3. Victim named 4. Debt stated 5. Obedience required 6. Enforcement right of victim\n' +
  'Example: "The Law of Limits was violated by [name] — a covert crossing. His deception created a debt to [name]: her right to know what is real in her own home. The law requires obedience: the deception stops now. She is entitled to full verification of his account, and if verification fails, to take protective action."\n\n' +
  'HOLD YOUR DIAGNOSIS: Once you identify the laws, hold them. If someone challenges your diagnosis, restate it with confidence. You are the Officer. The law does not change because someone disagrees. Never switch laws because the user pushes back.\n\n' +
  'DO NOT PRESCRIBE: Do not assign specific actions, scripts, or gestures before [CASE_CLOSE]. The formal verdict does that. In dialogue: guide and investigate. Do not write the repair plan.\n\n' +
  'TANTRUM: Party with cooperator. Ignore refusal. Remove item when they leave. Wait: How do I get it back?\n' +
  'MONSTER vs KID: Monster->STARVE. Kid->FULL ATTENTION. Fresh start.\n\n';

var protocol = isES
? 'GUIA: Tu diriges cada paso. Paso 1 OBSERVAR: Que ven - VIDEO RECORD disponible. Paso 2 PAUSAR: Control Remoto Magico. Paso 3 ANUNCIAR: Script exacto. Paso 4 PUERTA: Calma de cada persona. Paso 5 TESTIMONIO: Cada lado en privado. Paso 6 VEREDICTO: Cita la ley, script reconexion, incluye [CASE_CLOSE] al final exacto.\n\n'
: 'GUIDE: You lead every step. Step 1 OBSERVE: What do they see - VIDEO RECORD available. Step 2 PAUSE: Magic Remote. Step 3 ANNOUNCE: Exact script. Step 4 GATE: Each person calm. Step 5 TESTIMONY: Each side privately. Step 6 VERDICT: Cite the laws, include [CASE_CLOSE] at the very end.\n\n';

if (isES) {
return 'Eres Claude, el Oficial de Seguridad 4 LEYES.\n\n' + family + companionCtx + gate + engine + protocol + clipCtx + 'ESTILO: 1-3 oraciones MAX. Lenguaje oficial. Cita la ley. Se el policia.\nEVIDENCIA: Anima VIDEO RECORD. Cuando carguen: [EVIDENCE_ACK].\nNUNCA preguntes que ley - tu lo identificas.';
}
return 'You are Claude, the 4 LAWS Safety Officer.\n\n' + family + companionCtx + gate + engine + protocol + clipCtx + 'STYLE: 1-3 sentences MAX. Officer language. Cite the laws — always at least two. Be the cop.\nEVIDENCE: Encourage VIDEO RECORD. When loaded: [EVIDENCE_ACK].\nNEVER ask which law — you identify them. Always identify minimum two laws.';
}
/* SAVE CASE - full transcript */
function officerSaveCase(caseId, verdict) {
try {
var transcript = officerHistory.map(function(m) {
return (m.role === 'user' ? 'OFFICER: ' : 'CLAUDE: ') + m.content;
}).join('\n\n');
var caseData = {
caseId: caseId,
date: new Date().toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'}),
verdict: verdict || '',
transcript: transcript
};
localStorage.setItem('fourLawsOfficerCase', JSON.stringify(caseData));
} catch(e){}
}

/* VERDICT PROCESSING INDICATOR */
function showOfficerProcessing() {
var msgs = document.getElementById('sessMessages');
if (msgs.children.length > 0) {
var d = document.createElement('div');
d.className = 'sess-divider';
d.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d);
}
var proc = document.createElement('div');
proc.id = 'sessVerdictProcessing';
proc.className = 'sess-verdict-processing';
proc.innerHTML = '<div class="sess-verdict-proc-dots"><div class="sess-ld"></div><div class="sess-ld"></div><div class="sess-ld"></div></div>' +
'<div class="sess-verdict-proc-txt">' + (lang === 'es' ? 'La ley esta leyendo todos los lados\u2026' : 'The law is reading all sides\u2026') + '</div>';
msgs.appendChild(proc);
scrollBottom();
}

function hideOfficerProcessing() {
var proc = document.getElementById('sessVerdictProcessing');
if (proc) proc.remove();
}

/* EXTRACT TESTIMONY FROM OFFICER HISTORY */
function officerExtractTestimony(callback) {
var isES = lang === 'es';
var transcript = officerHistory.map(function(m) {
return (m.role === 'user' ? 'OFFICER: ' : 'CLAUDE: ') + m.content;
}).join('\n\n');

var prompt = isES
? ('De esta conversacion del Oficial de Seguridad, extrae datos estructurados.\n\nCONVERSACION:\n' + transcript + '\n\nDevuelve SOLO JSON valido sin texto adicional:\n{"situation":"descripcion breve","officerName":"nombre del oficial","parties":[{"name":"nombre real","testimony":"su testimonio"}]}')
: ('From this Safety Officer conversation, extract structured data.\n\nCONVERSATION:\n' + transcript + '\n\nReturn ONLY valid JSON with no other text:\n{"situation":"brief description","officerName":"officer name","parties":[{"name":"real name","testimony":"their testimony"}]}');

fetch(SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({
action: 'chat',
system: 'You extract structured data from conversations. Return only valid JSON. No markdown. No explanation. No code blocks.',
messages: [{role: 'user', content: prompt}],
max_tokens: 800
})
})
.then(function(r){ return r.json(); })
.then(function(data) {
var reply = (data.status === 'ok' && data.reply) ? data.reply : '';
var parsed = null;
try {
var clean = reply;
var jsonStart = clean.indexOf('{');
var jsonEnd = clean.lastIndexOf('}');
if (jsonStart > -1 && jsonEnd > jsonStart) {
clean = clean.substring(jsonStart, jsonEnd + 1);
}
parsed = JSON.parse(clean);
} catch(e) {
parsed = {
situation: isES ? 'Situacion revisada por el Oficial de Seguridad' : 'Situation reviewed by Safety Officer',
officerName: personName || 'Safety Officer',
parties: []
};
}
callback(parsed);
})
.catch(function() {
callback({
situation: lang === 'es' ? 'Situacion revisada' : 'Situation reviewed by Safety Officer',
officerName: personName || 'Safety Officer',
parties: []
});
});
}

/* GET FULL VERDICT FROM APPS SCRIPT */
function officerGetFullVerdict(extracted, caseId, callback) {
fetch(SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({
action: 'safetyOfficer',
safetyOfficer: extracted.officerName || personName || 'Safety Officer',
situation: extracted.situation || '',
parties: extracted.parties || [],
lang: lang,
caseId: caseId
})
})
.then(function(r){ return r.json(); })
.then(function(data) {
if (data.status === 'ok') {
callback(data.verdict, data.caseId || caseId, !!data.hasConflict);
} else {
callback(null, caseId, false);
}
})
.catch(function() { callback(null, caseId, false); });
}

/* FORMAT VERDICT BODY TEXT */
function formatVerdictBody(text) {
return text.split(/\n\n+/).filter(function(p){ return p.trim(); }).map(function(p) {
var escaped = escHtml(p.trim()).replace(/\n/g, '<br>');
escaped = escaped.replace(/(https?:\/\/[^\s<&]+)/g, '<a href="$1" target="_blank" style="color:#c8a84b;text-decoration:underline;">$1</a>');
return '<p>' + escaped + '</p>';
}).join('');
}

/* PARSE VERDICT SECTIONS */
function parseVerdictSections(verdict, isES) {
var headers = isES
? ['VEREDICTO PRELIMINAR','RESUMEN DEL CASO','ANALISIS DE LEYES','EJECUCION','CAMINO DE REPARACION','CONDICIONES PARA REANUDAR','AL OFICIAL DE SEGURIDAD','VEREDICTO FINAL','CONFLICTO DETECTADO']
: ['PRELIMINARY VERDICT','CASE SUMMARY','LAWS ANALYSIS','ENFORCEMENT','REPAIR PATH','CONDITIONS TO RESUME','TO THE SAFETY OFFICER','FINAL VERDICT','CONFLICT DETECTED'];
var positions = [];
var upper = verdict.toUpperCase();
headers.forEach(function(h) {
var idx = upper.indexOf(h.toUpperCase());
if (idx > -1) positions.push({pos: idx, header: h});
});
positions.sort(function(a,b){ return a.pos - b.pos; });
return positions;
}

/* RENDER FULL VERDICT IN CHAT */
function renderFullVerdictInChat(verdict, caseId, isFinal) {
var isES = lang === 'es';
var msgs = document.getElementById('sessMessages');

if (msgs.children.length > 0) {
var d = document.createElement('div');
d.className = 'sess-divider';
d.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d);
}

var container = document.createElement('div');
container.className = 'sess-verdict-full';
if (!isFinal) container.id = 'sessVerdictFull';

/* Badge row */
var badgeRow = document.createElement('div');
badgeRow.className = 'sess-verdict-badge-row';
var badgeClass = isFinal ? 'sess-verdict-final-badge' : 'sess-verdict-prelim-badge';
var badgeText = isFinal
? (isES ? 'VEREDICTO FINAL' : 'FINAL VERDICT')
: (isES ? 'VEREDICTO PRELIMINAR \u2014 SUJETO A APELACION' : 'PRELIMINARY VERDICT \u2014 SUBJECT TO APPEAL');
badgeRow.innerHTML = '<span class="' + badgeClass + '">' + (isFinal ? '\u2696\uFE0F ' : '\uD83D\uDE94 ') + badgeText + '</span>' +
'<span class="sess-verdict-case-id">' + caseId + '</span>';
container.appendChild(badgeRow);

/* Verdict sections */
var skipHeaders = ['PRELIMINARY VERDICT','VEREDICTO PRELIMINAR','FINAL VERDICT','VEREDICTO FINAL','TO THE SAFETY OFFICER','AL OFICIAL DE SEGURIDAD'];
var positions = parseVerdictSections(verdict, isES);

if (positions.length === 0) {
var plain = document.createElement('div');
plain.className = 'sess-verdict-section-body';
plain.innerHTML = formatVerdictBody(verdict);
container.appendChild(plain);
} else {
positions.forEach(function(sp, i) {
if (skipHeaders.indexOf(sp.header.toUpperCase()) > -1) return;
var start = sp.pos + sp.header.length;
var end = i + 1 < positions.length ? positions[i+1].pos : verdict.length;
var body = verdict.substring(start, end).replace(/^[:\s]+/, '').trim();
var section = document.createElement('div');
section.className = 'sess-verdict-section';
var head = document.createElement('div');
head.className = 'sess-verdict-section-head';
head.textContent = sp.header;
section.appendChild(head);
var bodyEl = document.createElement('div');
bodyEl.className = 'sess-verdict-section-body';
bodyEl.innerHTML = formatVerdictBody(body);
section.appendChild(bodyEl);
container.appendChild(section);
});
}

/* Routing buttons */
var upperV = verdict.toUpperCase();
var hasRamp = upperV.indexOf('RESPONSIBILITY') > -1 && (upperV.indexOf('RAMP') > -1 || upperV.indexOf('RAMPA') > -1);
var hasRepair = upperV.indexOf('TRUST') > -1 && upperV.indexOf('REPAIR') > -1;

if (hasRamp || hasRepair) {
var routeWrap = document.createElement('div');
routeWrap.className = 'sess-verdict-route-wrap';
if (hasRamp) {
var rampA = document.createElement('button');
rampA.className = 'sess-verdict-route-btn';
rampA.style.cssText = 'cursor:pointer;background:none;text-align:left;width:100%;';
rampA.innerHTML = '<span>' + (isES ? 'Rampa de Responsabilidad' : 'Responsibility Ramp') + '</span><span class="sess-verdict-route-sub">' + (isES ? 'Una ley fue violada. Construye el camino.' : 'A law was violated. Build the path back.') + '</span>';
rampA.onclick = function() { openDialogueWithPrime(isES ? 'Quiero trabajar en la compensaci\u00F3n y la responsabilidad.' : 'I want to work on negotiating compensation and responsibility.'); };
routeWrap.appendChild(rampA);
}
if (hasRepair) {
var repairA = document.createElement('button');
repairA.className = 'sess-verdict-route-btn';
repairA.style.cssText = 'cursor:pointer;background:none;text-align:left;width:100%;';
repairA.innerHTML = '<span>' + (isES ? 'Reparacion de Confianza' : 'Trust Repair') + '</span><span class="sess-verdict-route-sub">' + (isES ? 'La confianza se rompio.' : 'Trust was broken. Begin the repair.') + '</span>';
repairA.onclick = function() { openDialogueWithPrime(isES ? 'Quiero trabajar en reparar la confianza.' : 'I want to work on repairing the trust.'); };
routeWrap.appendChild(repairA);
}
container.appendChild(routeWrap);
}

/* Action bar */
var actionBar = document.createElement('div');
actionBar.className = 'sess-verdict-action-bar';
var printBtn = document.createElement('button');
printBtn.className = 'sess-verdict-action-btn';
printBtn.textContent = (isES ? 'Imprimir' : 'Print');
printBtn.onclick = function() { window.print(); };
actionBar.appendChild(printBtn);

/* Email Verdict button */
var mediationVerdictBtn = document.createElement('button');
mediationVerdictBtn.className = 'sess-verdict-action-btn';
mediationVerdictBtn.textContent = isES ? '\u2696\uFE0F Mediacion \u2192' : '\u2696\uFE0F Mediation \u2192';
mediationVerdictBtn.style.cssText = 'background:linear-gradient(135deg,rgba(45,155,90,.18),rgba(45,155,90,.1));border:1px solid rgba(45,155,90,.5);color:#1a6b3a;font-weight:700;';
mediationVerdictBtn.onclick = function() { sessEnterMediation(verdict); };
actionBar.appendChild(mediationVerdictBtn);

var emailVerdictBtn = document.createElement('button');
emailVerdictBtn.className = 'sess-verdict-action-btn';
emailVerdictBtn.textContent = isES ? '\u2709 Enviar por Email \u2192' : '\u2709 Email This Verdict \u2192';
emailVerdictBtn.style.cssText = 'background:linear-gradient(135deg,rgba(200,168,75,.18),rgba(200,168,75,.1));border:1px solid rgba(200,168,75,.5);color:#7a4f1a;font-weight:700;';
emailVerdictBtn.onclick = function() { renderEmailVerdictSection(container, caseId, verdict, emailVerdictBtn); };
actionBar.appendChild(emailVerdictBtn);
container.appendChild(actionBar);

/* Divider */
var div2 = document.createElement('div');
div2.className = 'sess-verdict-divider';
container.appendChild(div2);

/* Implement text removed — instruction to Officer, not visible to user */

/* Report Implementation button */
var implBtn = document.createElement('button');
implBtn.className = 'sess-verdict-impl-btn';
implBtn.textContent = isES ? 'Cu\u00E9ntame c\u00F3mo fue \u2192' : 'Tell me how it went \u2192';
implBtn.onclick = function() { renderFollowUpSection(container, caseId, implBtn); };
container.appendChild(implBtn);

/* Appeal button — preliminary only */
if (!isFinal) {
var appealBtn = document.createElement('button');
appealBtn.className = 'sess-verdict-appeal-btn';
appealBtn.textContent = isES ? 'Alguien no esta de acuerdo \u2014 Apelar \u2192' : 'Someone disagrees \u2014 Submit Appeal \u2192';
appealBtn.onclick = function() { renderAppealSection(container, caseId, appealBtn); };
container.appendChild(appealBtn);
}

msgs.appendChild(container);
scrollBottom();

/* Save and inject into dialogue history */
officerSaveCase(caseId, verdict);
var caseNote = isES
? '[NOTA DE CASO OFICIAL ' + caseId + ']: ' + verdict.substring(0, 600)
: '[OFFICER CASE NOTE ' + caseId + ']: ' + verdict.substring(0, 600);
dialogueHistory.push({role: 'assistant', content: caseNote});

/* BRIDGE FIX 1 — Journey button after verdict so Officer-only sessions can save */
var inputArea = document.getElementById('sessInputArea');
if (inputArea && !document.getElementById('sessJourneyBtn')) {
var jBtn = document.createElement('button');
jBtn.id = 'sessJourneyBtn'; jBtn.className = 'sess-journey-btn';
jBtn.textContent = isES ? '\u2B07 Guardar Mi Jornada' : '\u2B07 Save My Journey';
jBtn.onclick = function(){ downloadJourney(); };
inputArea.parentNode.insertBefore(jBtn, inputArea.nextSibling);
}
}

/* APPEAL SECTION */
function renderAppealSection(container, caseId, triggerBtn) {
if (triggerBtn) triggerBtn.style.display = 'none';
var isES = lang === 'es';
var wrap = document.createElement('div');
wrap.className = 'sess-appeal-wrap';

var lbl = document.createElement('div');
lbl.className = 'sess-appeal-lbl';
lbl.textContent = isES ? 'Nueva evidencia que cambia el caso:' : 'New evidence or information that changes this case:';
wrap.appendChild(lbl);

var hint = document.createElement('div');
hint.className = 'sess-appeal-hint';
hint.textContent = isES ? 'Solo hechos nuevos \u2014 no repitas el testimonio original.' : 'New facts only \u2014 not a repeat of the original testimony.';
wrap.appendChild(hint);

var ta = document.createElement('textarea');
ta.className = 'sess-appeal-textarea';
ta.rows = 4;
ta.placeholder = isES ? 'Nueva evidencia\u2026' : 'New evidence or findings\u2026';
wrap.appendChild(ta);

var err = document.createElement('div');
err.className = 'sess-appeal-error';
wrap.appendChild(err);

var submitBtn = document.createElement('button');
submitBtn.className = 'sess-verdict-impl-btn';
submitBtn.textContent = isES ? 'Enviar Apelacion \u2192' : 'Submit Appeal \u2014 Get Final Verdict \u2192';
submitBtn.onclick = function() {
var evidence = ta.value.trim();
if (!evidence) { err.textContent = isES ? 'Describe la nueva evidencia.' : 'Please describe the new evidence.'; err.style.display = 'block'; return; }
err.style.display = 'none';
submitBtn.disabled = true;
submitBtn.textContent = isES ? 'Procesando\u2026' : 'Processing appeal\u2026';
fetch(SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({action: 'safetyAppeal', caseId: caseId, safetyOfficer: personName || 'Safety Officer', appealEvidence: evidence, lang: lang})
})
.then(function(r){ return r.json(); })
.then(function(data) {
if (data.status === 'ok' && data.appealVerdict) {
wrap.remove();
renderFullVerdictInChat(data.appealVerdict, caseId, true);
} else {
submitBtn.disabled = false;
submitBtn.textContent = isES ? 'Enviar Apelacion \u2192' : 'Submit Appeal \u2192';
err.textContent = isES ? 'Error procesando la apelacion.' : 'Error processing appeal. Please try again.';
err.style.display = 'block';
}
})
.catch(function() {
submitBtn.disabled = false;
submitBtn.textContent = isES ? 'Enviar Apelacion \u2192' : 'Submit Appeal \u2192';
err.textContent = isES ? 'Error de conexion.' : 'Connection error. Please try again.';
err.style.display = 'block';
});
};
wrap.appendChild(submitBtn);

var backBtn = document.createElement('button');
backBtn.className = 'sess-verdict-appeal-btn';
backBtn.textContent = isES ? '\u2190 Volver al Veredicto' : '\u2190 Back to Preliminary Verdict';
backBtn.onclick = function() { wrap.remove(); if (triggerBtn) triggerBtn.style.display = ''; };
wrap.appendChild(backBtn);
container.appendChild(wrap);
scrollBottom();
}

/* FOLLOW-UP SECTION */
function renderFollowUpSection(container, caseId, triggerBtn) {
if (triggerBtn) triggerBtn.style.display = 'none';
var isES = lang === 'es';
var wrap = document.createElement('div');
wrap.className = 'sess-followup-wrap';

var lbl = document.createElement('div');
lbl.className = 'sess-appeal-lbl';
lbl.textContent = isES ? 'Que paso cuando intentaste implementar?' : 'What happened when you tried to implement?';
wrap.appendChild(lbl);

var ta = document.createElement('textarea');
ta.className = 'sess-appeal-textarea';
ta.rows = 4;
ta.placeholder = isES ? 'Que paso? Todos cumplieron? Que cambio?' : 'What happened? Did everyone follow through? What changed?';
wrap.appendChild(ta);

var err = document.createElement('div');
err.className = 'sess-appeal-error';
wrap.appendChild(err);

var submitBtn = document.createElement('button');
submitBtn.className = 'sess-verdict-impl-btn';
submitBtn.textContent = isES ? 'Enviar Seguimiento \u2192' : 'Submit Follow-Up \u2192';
submitBtn.onclick = function() {
var text = ta.value.trim();
if (!text) { err.textContent = isES ? 'Describe lo que paso.' : 'Please describe what happened.'; err.style.display = 'block'; return; }
err.style.display = 'none';
submitBtn.disabled = true;
submitBtn.textContent = isES ? 'Enviando\u2026' : 'Submitting\u2026';
fetch(SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({action: 'safetyFollowUp', caseId: caseId, safetyOfficer: personName || 'Safety Officer', followUp: text, lang: lang})
})
.then(function(r){ return r.json(); })
.then(function(data) {
wrap.remove();
var closeEl = document.createElement('div');
closeEl.className = 'sess-verdict-section-body';
closeEl.style.padding = '12px 0';
var msg = data.blogReady
? (isES ? 'Seguimiento registrado. Caso completo. Borrador de blog generado para el Dr. B.' : 'Follow-up recorded. Case complete. A blog draft has been generated for Dr. B.')
: (isES ? 'Seguimiento registrado. El caso esta completo. Gracias por cerrar el ciclo.' : 'Follow-up recorded. The case is complete. Thank you for closing the loop.');
closeEl.innerHTML = '<p>' + msg + '</p>';
container.appendChild(closeEl);
scrollBottom();
})
.catch(function() {
submitBtn.disabled = false;
submitBtn.textContent = isES ? 'Enviar Seguimiento \u2192' : 'Submit Follow-Up \u2192';
err.textContent = isES ? 'Error de conexion.' : 'Connection error.';
err.style.display = 'block';
});
};
wrap.appendChild(submitBtn);
container.appendChild(wrap);
scrollBottom();
}

/* EMAIL VERDICT SECTION */
function renderEmailVerdictSection(container, caseId, verdict, triggerBtn) {
var isES = lang === 'es';
if (triggerBtn) triggerBtn.style.display = 'none';
var wrap = document.createElement('div');
wrap.className = 'sess-appeal-wrap';

var lbl = document.createElement('div');
lbl.className = 'sess-appeal-lbl';
lbl.textContent = isES ? 'Enviar veredicto por email:' : 'Send this verdict to:';
wrap.appendChild(lbl);

var hint = document.createElement('div');
hint.className = 'sess-appeal-hint';
hint.textContent = isES ? 'Ingresa el email del destinatario.' : "Enter the recipient's email address.";
wrap.appendChild(hint);

var emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = isES ? 'email@ejemplo.com' : 'email@example.com';
emailInput.style.cssText = 'width:100%;background:rgba(255,255,255,.7);border:1px solid rgba(26,14,8,.15);border-radius:2px;padding:10px 12px;font-family:Lora,Georgia,serif;font-size:15px;color:#1c1410;outline:none;margin-bottom:10px;display:block;box-sizing:border-box;';
wrap.appendChild(emailInput);

var nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = isES ? 'Nombre del destinatario (opcional)' : 'Recipient name (optional)';
nameInput.style.cssText = emailInput.style.cssText;
wrap.appendChild(nameInput);

var err = document.createElement('div');
err.className = 'sess-appeal-error';
wrap.appendChild(err);

var sendBtn = document.createElement('button');
sendBtn.className = 'sess-verdict-impl-btn';
sendBtn.textContent = isES ? 'Enviar Veredicto \u2192' : 'Send Verdict \u2192';
sendBtn.onclick = function() {
var toEmail = emailInput.value.trim();
var toName  = nameInput.value.trim() || 'Friend';
if (!toEmail || toEmail.indexOf('@') === -1) {
  err.textContent = isES ? 'Por favor ingresa un email v\u00E1lido.' : 'Please enter a valid email address.';
  err.style.display = 'block'; return;
}
err.style.display = 'none';
sendBtn.disabled = true;
sendBtn.textContent = isES ? 'Enviando\u2026' : 'Sending\u2026';
fetch(SCRIPT_URL, {
  method: 'POST',
  body: JSON.stringify({
    action: 'verdictEmail',
    caseId: caseId,
    toEmail: toEmail,
    toName: toName,
    verdict: verdict,
    senderName: personName || 'Safety Officer',
    lang: lang
  })
})
.then(function(r){ return r.json(); })
.then(function(data) {
  wrap.innerHTML = '';
  var okEl = document.createElement('div');
  okEl.className = 'sess-appeal-hint';
  okEl.style.color = '#4a7a4a';
  okEl.textContent = isES ? '\u2713 Veredicto enviado a ' + toEmail : '\u2713 Verdict sent to ' + toEmail;
  wrap.appendChild(okEl);
  scrollBottom();
})
.catch(function() {
  sendBtn.disabled = false;
  sendBtn.textContent = isES ? 'Enviar Veredicto \u2192' : 'Send Verdict \u2192';
  err.textContent = isES ? 'Error de conexi\u00F3n.' : 'Connection error. Please try again.';
  err.style.display = 'block';
});
};
wrap.appendChild(sendBtn);

var cancelBtn = document.createElement('button');
cancelBtn.className = 'sess-verdict-appeal-btn';
cancelBtn.style.marginTop = '8px';
cancelBtn.textContent = isES ? '\u2190 Cancelar' : '\u2190 Cancel';
cancelBtn.onclick = function() { wrap.remove(); if (triggerBtn) triggerBtn.style.display = ''; };
wrap.appendChild(cancelBtn);
container.appendChild(wrap);
scrollBottom();
}

/* OFFICER IMAGE CARD */
function renderOfficerImageCard() {
var msgs = document.getElementById('sessMessages');
var card = document.createElement('div');
card.className = 'sess-officer-image-card';
var img = document.createElement('img');
img.src = OFFICER_IMAGE_URL;
img.alt = lang === 'es' ? 'Oficial de Seguridad Claude' : 'Claude Safety Officer';
var nameEl = document.createElement('div');
nameEl.className = 'sess-officer-image-name';
nameEl.textContent = lang === 'es' ? '4 LAWS - OFICIAL DE SEGURIDAD' : '4 LAWS - SAFETY OFFICER';
card.appendChild(img);
card.appendChild(nameEl);
msgs.appendChild(card);
}

/* OFFICER TOGGLE */
window.sessToggleOfficer = function() {
/* If in mediation mode, exit to companion without toggling officer */
if (mediationMode) {
mediationMode = false;
var modeStrip = document.getElementById('sessModeStrip');
if (modeStrip) { modeStrip.textContent = lang === 'es' ? 'MODO COMPAÑERO' : 'COMPANION MODE'; modeStrip.className = 'sess-mode-strip companion'; }
var mediBtn = document.getElementById('sessMediationBtn');
if (mediBtn) { mediBtn.classList.remove('active'); mediBtn.innerHTML = '<span>⚖️ Mediation Mode (Repair Trust)</span>'; }
var txt2 = document.getElementById('sessOfficerToggleTxt');
if (txt2) txt2.textContent = lang === 'es' ? 'Modo Enforcement (Resolver Argumento)' : 'Enforcement Mode (Resolve Argument)';
return;
}
officerMode = !officerMode;
var modeStrip = document.getElementById('sessModeStrip');
if (modeStrip) {
  modeStrip.textContent = officerMode
    ? (lang === 'es' ? 'MODO ENFORCEMENT' : 'ENFORCEMENT MODE')
    : (lang === 'es' ? 'MODO COMPAÑERO' : 'COMPANION MODE');
  modeStrip.className = 'sess-mode-strip ' + (officerMode ? 'enforcement' : 'companion');
}
var btn       = document.getElementById('sessOfficerToggle');
var icon      = document.getElementById('sessOfficerToggleIcon');
var txt       = document.getElementById('sessOfficerToggleTxt');
var camRow    = document.getElementById('sessCamRow');
var stepStrip = document.getElementById('sessOfficerSteps');

if (officerMode) {
btn.classList.add('active');
icon.textContent  = '\uD83D\uDE94';
txt.textContent   = lang === 'es' ? 'Modo Compañero' : 'Companion Mode';
camRow.classList.add('active');
stepStrip.classList.add('active');
officerDrbOffered       = false;
officerHistory          = [];
officerObservationCount = 0;
officerCurrentStep      = 0;
dialogueTurnCount       = 0;
navigatorFired          = false;
officerCaseId           = officerGenCaseId();
officerSetStep(0);
ensureOfficerBanner(true);
var msgs = document.getElementById('sessMessages');
if (msgs.style.display === 'none') msgs.style.display = 'flex';
var modeStripO = document.getElementById('sessModeStrip');
if (modeStripO) modeStripO.style.display = '';
var returnPanelO = document.getElementById('sessReturnPanel');
if (returnPanelO) returnPanelO.style.display = 'none';
renderOfficerImageCard();
officerCallAI(
lang === 'es'
? 'El Companero 4 LEYES me ha transferido esta situacion. Presentate brevemente como Oficial de Seguridad Claude y pregunta que estan viendo ahora mismo. Menciona que VIDEO RECORD esta disponible si quieren documentar.'
: 'The 4 LAWS Companion has transferred this situation to me. Briefly introduce yourself as Claude Safety Officer and ask what they are seeing right now. Mention that VIDEO RECORD is available if they want to document.',
true
);

} else {
btn.classList.remove('active');
icon.textContent  = '\uD83D\uDE94';
txt.textContent   = lang === 'es' ? 'Modo Enforcement (Resolver Argumento)' : 'Enforcement Mode (Resolve Argument)';
camRow.classList.remove('active');
stepStrip.classList.remove('active');
ensureOfficerBanner(false);
if (officerRecording) sessStopRecord();
dialogueTurnCount = 0;
navigatorFired    = false;

/* SMART STAND DOWN - AI reads full transcript */
var transcript = officerHistory.slice(-20).map(function(m) {
return (m.role === 'user' ? 'OFFICER: ' : 'CLAUDE: ') + m.content;
}).join('\n\n');

/* BRIDGE FIX 2 — Seed dialogue history with officer case so Companion has full context */
if (dialogueHistory.length === 0 && transcript) {
dialogueHistory = [
{role: 'user', content: (lang === 'es' ? 'Contexto del caso del Oficial de Seguridad:\n\n' : 'Safety Officer case context:\n\n') + transcript},
{role: 'assistant', content: lang === 'es' ? 'He leido el caso completo. Estoy aqui.' : 'I have read the full case. I\'m here.'}
];
if (!situationText) situationText = transcript.substring(0, 400);
}

var standDownPrompt = lang === 'es'
? ('Eres el Companero 4 LEYES regresando despues del Modo Oficial.\n\nCONVERSACION COMPLETA DEL OFICIAL DE SEGURIDAD:\n' + transcript + '\n\nEn 2-3 oraciones calidas: reconoce lo que se resolvio, menciona a las personas especificas por nombre, identifica cualquier problema no resuelto. Abre la puerta especificamente a lo que quedo pendiente. No hagas una pregunta generica.')
: ('You are the 4 LAWS Culture Builder returning from Officer Mode.\n\nFULL SAFETY OFFICER CONVERSATION:\n' + transcript + '\n\nIn 2-3 warm sentences: acknowledge what was resolved, name the specific people involved, and identify any unresolved issue by name. Open the door specifically to what was left unfinished. Do not ask a generic question.');

var msgs = document.getElementById('sessMessages');
if (msgs.style.display === 'none') msgs.style.display = 'flex';
isThinking = true;
document.getElementById('sessSendBtn').disabled = true;
addThinking();

fetch(SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({action: 'chat', system: lang === 'es' ? DIALOGUE_SYS_ES : DIALOGUE_SYS_EN, messages: [{role: 'user', content: standDownPrompt}], max_tokens: 200})
})
.then(function(r){ return r.json(); })
.then(function(data) {
removeThinking();
var returnMsg = (data.status === 'ok' && data.reply) ? data.reply : (lang === 'es' ? 'Estoy de vuelta. Que necesitas ahora?' : 'I\'m back. What do you need right now?');
addMsg('ai', formatAI(returnMsg));
if (PHASE === 'dialogue') dialogueHistory.push({role: 'assistant', content: returnMsg});
})
.catch(function() {
removeThinking();
var returnMsg = lang === 'es' ? 'Estoy de vuelta. Que necesitas ahora?' : 'I\'m back. What do you need right now?';
addMsg('ai', formatAI(returnMsg));
})
.finally(function() {
isThinking = false;
document.getElementById('sessSendBtn').disabled = false;
});
}
};

function ensureOfficerBanner(show) {
var existing = document.getElementById('sessOfficerBanner');
var msgs = document.getElementById('sessMessages');
if (show) {
if (!existing) {
var banner = document.createElement('div');
banner.id = 'sessOfficerBanner';
banner.className = 'sess-officer-banner active';
banner.innerHTML = '<div class="sess-officer-banner-left"><div class="sess-officer-badge"></div><span id="sessOfficerBannerTxt">' + (lang === 'es' ? 'MODO DE ENFORCEMENT' : 'ENFORCEMENT MODE') + '</span></div><button class="sess-officer-standdown" onclick="sessToggleOfficer()">' + (lang === 'es' ? 'MODO COMPAÑERO' : 'Companion Mode') + '</button>';
msgs.insertBefore(banner, msgs.firstChild);
} else {
existing.classList.add('active');
}
} else {
if (existing) existing.classList.remove('active');
}
}

/* OFFICER CHAT CALL */
function officerCallAI(userText, isSystem) {
if (isThinking) return;
isThinking = true;
document.getElementById('sessSendBtn').disabled = true;
if (!isSystem && userText) {
addOfficerUserMsg(userText);
officerHistory.push({role: 'user', content: userText});
officerObservationCount++;
}
var messages = isSystem ? [{role: 'user', content: userText}] : officerHistory.slice();
addThinking();
fetch(SCRIPT_URL, {method: 'POST', body: JSON.stringify({action: 'chat', system: buildOfficerSystem(), messages: messages, max_tokens: 600})})
.then(function(r){ return r.json(); })
.then(function(data) {
removeThinking();
var reply = (data.status === 'ok' && data.reply) ? data.reply : (lang === 'es' ? 'Error de conexion.' : 'Connection error. Please try again.');
officerHistory.push({role: 'assistant', content: reply});
officerDetectStep(reply);
renderOfficerReply(reply);
})
.catch(function() {
removeThinking();
renderOfficerReply(lang === 'es' ? 'Error de conexion.' : 'Connection error. Please try again.');
})
.finally(function() {
isThinking = false;
document.getElementById('sessSendBtn').disabled = false;
});
}

function addOfficerUserMsg(text) { addMsg('user', escHtml(text).replace(/\n/g,'<br>')); }

/* RENDER OFFICER REPLY */
function renderOfficerReply(reply) {
var hasDrB       = reply.indexOf('[DR_B_OFFER]')   > -1;
var hasEvAck     = reply.indexOf('[EVIDENCE_ACK]') > -1;
var hasCaseClose = reply.indexOf('[CASE_CLOSE]')   > -1;

var clean = reply
.replace(/\[DR_B_OFFER\]/g,'').replace(/\[EVIDENCE_ACK\]/g,'').replace(/\[CASE_CLOSE\]/g,'')
.replace(/\[REMIND:[^\]]+\]/g,'').trim();

var clipIds = [];
clean = clean.replace(/\[CLIP:([a-z0-9_]+)\]/g, function(m, id){ clipIds.push(id); return ''; }).trim();

var msgs = document.getElementById('sessMessages');
if (msgs.children.length > 0) {
var d = document.createElement('div');
d.className = 'sess-divider';
d.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d);
}

var wrap = document.createElement('div');
wrap.className = 'sess-msg-ai';
var labelDiv = document.createElement('div');
labelDiv.className = 'sess-msg-ai-label';
labelDiv.style.color = 'rgba(180,60,60,0.6)';
labelDiv.innerHTML = '\uD83D\uDE94 ' + (lang === 'es' ? '4 LEYES - OFICIAL' : '4 LAWS - OFFICER');
wrap.appendChild(labelDiv);

if (clean) {
var body = document.createElement('div');
body.className = 'sess-msg-ai-body';
body.innerHTML = formatAI(clean);
wrap.appendChild(body);
}

clipIds.forEach(function(id) {
var clip = officerFindClip(id);
if (!clip) return;
var clipTxt = lang === 'es' ? clip.es : clip.en;
var card = document.createElement('div');
card.className = 'sess-clip-card';
card.innerHTML = '<div class="sess-clip-icon">\uD83D\uDD0A</div><div class="sess-clip-inner"><div class="sess-clip-label">' + (lang === 'es' ? 'DR. B - OFICIAL' : 'DR. B - OFFICER') + '</div><div class="sess-clip-text">' + escHtml(clipTxt) + '</div></div><button class="sess-clip-play" id="socp-' + id + '" onclick="event.stopPropagation();officerPlayClip(officerFindClip(\'' + id + '\'))">' + (lang === 'es' ? '\u25B6 REPRODUCIR' : '\u25B6 PLAY') + '</button>';
card.onclick = function(){ officerPlayClip(clip); };
wrap.appendChild(card);
});

if (hasEvAck) {
var ackDiv = document.createElement('div');
ackDiv.className = 'sess-msg-ai-body';
ackDiv.style.marginTop = '8px';
ackDiv.innerHTML = '<p>' + (lang === 'es' ? '\u2713 Evidencia recibida y registrada.' : '\u2713 Evidence received and logged.') + '</p>';
wrap.appendChild(ackDiv);
}

if (hasDrB && !officerDrbOffered) {
officerDrbOffered = true;
var drb = document.createElement('div');
drb.className = 'sess-drb-card';
drb.innerHTML = lang === 'es'
? '<div class="sess-drb-card-title">CONSULTA CON EL DR. B</div><div class="sess-drb-card-body">El Dr. Bustamante puede revisar esta situacion personalmente. $150/hr.</div><a class="sess-drb-card-link" href="/solutions">Solicitar Consulta \u2192</a>'
: '<div class="sess-drb-card-title">DR. B CONSULTATION</div><div class="sess-drb-card-body">Dr. Bustamante can personally review this situation. $150/hr.</div><a class="sess-drb-card-link" href="/solutions">Schedule a Consultation \u2192</a>';
wrap.appendChild(drb);
}

msgs.appendChild(wrap);
scrollBottom();

/* [CASE_CLOSE] triggers full verdict pipeline */
if (hasCaseClose) {
officerSetStep(5);
setTimeout(function() {
showOfficerProcessing();
officerExtractTestimony(function(extracted) {
officerGetFullVerdict(extracted, officerCaseId, function(verdict, caseId, hasConflict) {
hideOfficerProcessing();
if (verdict) {
renderFullVerdictInChat(verdict, caseId, false);
} else {
addMsg('ai', formatAI(lang === 'es'
? 'No se pudo generar el veredicto completo. Puedes archivar un reporte formal en /ai-safety-officer.'
: 'Could not generate the full verdict. You can file a formal report at /ai-safety-officer.'));
}
});
});
}, 400);
}
}
/* CLIP PLAYER */
function officerLoadVoice() {
if (officerTtsVoice) return;
var voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
if (voices.length) { officerPickVoice(voices); return; }
if (window.speechSynthesis) {
window.speechSynthesis.onvoiceschanged = function() { officerPickVoice(window.speechSynthesis.getVoices()); };
}
}
function officerPickVoice(voices) {
var pref = ['Daniel','Alex','Google US English'];
for (var p = 0; p < pref.length; p++) {
for (var v = 0; v < voices.length; v++) {
if (voices[v].name.indexOf(pref[p]) > -1) { officerTtsVoice = voices[v]; return; }
}
}
for (var v = 0; v < voices.length; v++) {
if (voices[v].lang.indexOf('en') === 0) { officerTtsVoice = voices[v]; return; }
}
}

window.officerPlayClip = function(clip) {
if (!clip) return;
var text = lang === 'es' ? clip.es : clip.en;
var btn = document.getElementById('socp-' + clip.id);
if (clip.url) {
if (officerCurrentAudio) { officerCurrentAudio.pause(); officerCurrentAudio = null; }
var audio = new Audio(clip.url);
officerCurrentAudio = audio;
if (btn) btn.classList.add('playing');
audio.onended = function() { if (btn) btn.classList.remove('playing'); officerCurrentAudio = null; };
audio.play().catch(function(){ officerPlayTTS(text, btn); });
return;
}
officerPlayTTS(text, btn);
};

function officerPlayTTS(text, btn) {
if (!window.speechSynthesis) return;
officerLoadVoice();
window.speechSynthesis.cancel();
var utt = new SpeechSynthesisUtterance(text);
utt.rate = 0.86; utt.pitch = 0.80; utt.volume = 1;
if (officerTtsVoice) utt.voice = officerTtsVoice;
if (btn) btn.classList.add('playing');
utt.onend = function() { if (btn) btn.classList.remove('playing'); };
window.speechSynthesis.speak(utt);
}

/* CAMERA RECORDING */
window.sessToggleRecord = function() {
if (officerRecording) sessStopRecord();
else sessStartRecord();
};

function sessStartRecord() {
navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}}, audio:true})
.then(function(stream) {
var vid = document.getElementById('sessOfficerCamVideo');
vid.srcObject = stream; vid.play();
officerChunks = []; officerFrames = [];
var mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9'
: MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4';
officerRecorder = new MediaRecorder(stream, {mimeType: mime});
officerRecorder.ondataavailable = function(e){ if (e.data.size > 0) officerChunks.push(e.data); };
officerRecorder.onstop = function(){ sessFinalizeRecord(stream, mime); };
officerRecorder.start(200);
officerRecording = true;
officerFrameInterval = setInterval(function(){ sessCaptureFrame(vid); }, 2000);
officerRecordTimer = setTimeout(function(){ sessStopRecord(); }, 30000);
var btn = document.getElementById('sessRecBtn');
btn.classList.add('recording');
document.getElementById('sessRecIcon').textContent = '\u23F9';
document.getElementById('sessRecTxt').textContent = lang === 'es' ? 'GRABANDO\u2026' : 'RECORDING\u2026';
document.getElementById('sessRecSub').textContent = lang === 'es' ? 'Toca para detener' : 'Tap to stop';
if (officerMode) { addOfficerUserMsg(lang === 'es' ? '[Grabaci\u00F3n de evidencia iniciada]' : '[Evidence recording started]'); }
})
.catch(function(err) {
addMsg('ai', formatAI(lang === 'es' ? 'C\u00E1mara no disponible: ' + err.message : 'Camera unavailable: ' + err.message));
});
}

function sessStopRecord() {
officerRecording = false;
clearTimeout(officerRecordTimer);
clearInterval(officerFrameInterval);
if (officerRecorder && officerRecorder.state !== 'inactive') officerRecorder.stop();
var vid = document.getElementById('sessOfficerCamVideo');
if (vid.srcObject) { vid.srcObject.getTracks().forEach(function(t){ t.stop(); }); vid.srcObject = null; }
var btn = document.getElementById('sessRecBtn');
btn.classList.remove('recording');
document.getElementById('sessRecIcon').textContent = '\uD83D\uDD34';
document.getElementById('sessRecTxt').textContent = lang === 'es' ? 'GRABAR VIDEO' : 'VIDEO RECORD';
document.getElementById('sessRecSub').textContent = lang === 'es' ? 'Toca para grabar evidencia' : 'Tap to gather evidence';
}

function sessFinalizeRecord(stream, mime) {
if (!officerChunks.length) return;
var blob = new Blob(officerChunks, {type: mime});
sessSetEvidence(blob, lang === 'es' ? 'EVIDENCIA GRABADA' : 'EVIDENCE RECORDED');
}

function sessCaptureFrame(vidEl) {
if (!vidEl || vidEl.videoWidth === 0) return;
var canvas = document.getElementById('sessOfficerCanvas');
canvas.width = 320; canvas.height = 180;
var ctx = canvas.getContext('2d');
ctx.drawImage(vidEl, 0, 0, 320, 180);
var data = canvas.toDataURL('image/jpeg', 0.65).split(',')[1];
officerFrames.push(data);
if (officerFrames.length > 15) officerFrames.shift();
}

window.sessHandleVideoUpload = function(input) {
if (!input.files || !input.files[0]) return;
var file = input.files[0];
sessSetEvidence(file, lang === 'es' ? 'VIDEO CARGADO' : 'VIDEO LOADED');
sessExtractFrames(file);
input.value = '';
};

function sessSetEvidence(blob, label) {
if (officerEvidenceURL) URL.revokeObjectURL(officerEvidenceURL);
officerEvidenceBlob = blob;
officerEvidenceURL = URL.createObjectURL(blob);
var bar = document.getElementById('sessEvBar');
document.getElementById('sessEvLabel').textContent = label;
bar.classList.add('active');
if (officerMode) {
renderOfficerReply(lang === 'es'
? '\u2705 Evidencia lista. Toca \uD83D\uDC41 REVISI\u00D3N CLAUDE para an\u00E1lisis, \uD83D\uDCE4 COMPARTIR o \uD83D\uDCBE GUARDAR.'
: '\u2705 Evidence ready. Tap \uD83D\uDC41 CLAUDE REVIEW for analysis, \uD83D\uDCE4 SHARE or \uD83D\uDCBE SAVE.');
}
}

function sessExtractFrames(blob) {
var url = URL.createObjectURL(blob);
var vid = document.createElement('video');
vid.src = url; vid.muted = true; vid.playsInline = true;
vid.onloadedmetadata = function() {
var dur = Math.min(vid.duration, 30);
var times = [];
for (var t = 0; t < dur; t += 2) times.push(t);
var canvas = document.getElementById('sessOfficerCanvas');
canvas.width = 320; canvas.height = 180;
var ctx = canvas.getContext('2d');
var idx = 0;
officerFrames = [];
function next() {
if (idx >= times.length) { URL.revokeObjectURL(url); return; }
vid.currentTime = times[idx++];
}
vid.onseeked = function() {
ctx.drawImage(vid, 0, 0, 320, 180);
officerFrames.push(canvas.toDataURL('image/jpeg', 0.65).split(',')[1]);
next();
};
next();
};
vid.load();
}

/* CLAUDE VISION */
window.sessOfficerVision = function() {
if (!officerFrames.length) {
addMsg('ai', formatAI(lang === 'es' ? 'No hay frames de video. Graba o carga un video primero.' : 'No video frames. Record or load a video first.'));
return;
}
if (isThinking) return;
isThinking = true;
document.getElementById('sessSendBtn').disabled = true;
addThinking();
var frames = officerFrames.slice(0, 12).map(function(b64) {
return {type:'image', source:{type:'base64', media_type:'image/jpeg', data:b64}};
});
frames.push({type:'text', text: lang === 'es'
? 'Soy el Oficial de Seguridad Claude. Examina estos fotogramas. Identifica: qui\u00E9n est\u00E1 presente, comportamientos observados, violaciones de las 4 LEYES, lenguaje corporal. Responde en 3-5 oraciones como oficial \u2014 breve, cl\u00EDnico, citando la ley espec\u00EDfica.'
: 'I am Claude Safety Officer. Examine these video frames in sequence. Identify: who is present, behaviors observed, any 4 LAWS violations (Limits/safety, Responsibility/possession, Respect/belonging, Talent/expression), body language indicating escalation. 3-5 sentences maximum, officer language, cite specific laws — always minimum two per violation.'
});
fetch(SCRIPT_URL, {
method: 'POST',
body: JSON.stringify({
action: 'vision',
system: lang === 'es' ? 'Eres el Oficial de Seguridad 4 LEYES. Analizas evidencia de video. 3-5 oraciones m\u00E1ximo.' : 'You are the 4 LAWS Safety Officer. You analyze video evidence. 3-5 sentences maximum. Officer language. Always cite minimum two laws per violation.',
messages: [{role:'user', content: frames}],
max_tokens: 400
})
})
.then(function(r){ return r.json(); })
.then(function(data) {
removeThinking();
var reply = (data.status === 'ok' && data.reply) ? '\uD83C\uDFA5 ' + data.reply : (lang === 'es' ? 'No se pudo analizar el video.' : 'Could not analyze video.');
officerHistory.push({role:'assistant', content: reply});
renderOfficerReply(reply);
})
.catch(function() {
removeThinking();
renderOfficerReply(lang === 'es' ? 'Error analizando video.' : 'Error analyzing video.');
})
.finally(function() { isThinking = false; document.getElementById('sessSendBtn').disabled = false; });
};

/* SHARE / SAVE VIDEO */
window.sessShareVideo = function() {
if (!officerEvidenceBlob) return;
var filename = '4laws-evidence-' + new Date().toISOString().slice(0,10) + '.mp4';
var file = new File([officerEvidenceBlob], filename, {type: officerEvidenceBlob.type});
if (navigator.share && navigator.canShare && navigator.canShare({files:[file]})) {
navigator.share({files:[file], title:'4 LAWS Evidence'}).catch(function(){});
} else { sessSaveVideo(); }
};

window.sessSaveVideo = function() {
if (!officerEvidenceBlob) return;
var filename = '4laws-evidence-' + new Date().toISOString().slice(0,10) + '.mp4';
var a = document.createElement('a');
a.href = officerEvidenceURL; a.download = filename;
document.body.appendChild(a); a.click(); document.body.removeChild(a);
renderOfficerReply(lang === 'es'
? 'Video guardado como ' + filename + '. B\u00FAscalo en Descargas o Fotos.'
: 'Video saved as ' + filename + '. Find it in your Downloads or Photos app.');
};
/* COMPANION CODE */
var lang = 'en';
try { lang = localStorage.getItem('4laws-lang') || 'en'; } catch(e){}

var PHASE = 'intake';
var intakeHistory = [];
var dialogueHistory = [];
var isThinking = false;
var thinkingEl = null;

var personName = '';
var personRole = '';
var personEmail = '';
var situationText = '';
var firstWords = '';

var S = {
en: {
eyebrow: '4 LAWS AI · Dr. B AI',
title: '<span>4 LAWS</span> AI',
hero: 'Try Dr. B AI free.<br>No credit card. Full experience.',
heroSub: 'Dr. B AI · Spiritual Direction · Sound Psychology',
winTitle: '4 LAWS AI — Free Trial',
zero: 'Saved on Your Device',
phaseIntake: 'Intake', phaseConfirm: 'Your Story', phaseLoading: 'Analyzing',
phaseAnalysis: 'Analysis', phaseDialogue: 'Dialogue',
send: 'Send \u25B6', hint: 'Enter to send \u00B7 Shift+Enter for new line',
placeholder: 'Speak or type here\u2026',
loading: 'The 4 LAWS are reading your situation.<br>This takes about 20 seconds.',
error: 'Something went wrong.', errorLink: ' Send to Dr. B \u2192',
micListening: 'Listening\u2026 speak clearly', micDone: '',
vs1: 'Pure 4 LAWS Intelligence', vs2: '35 Years Clinical Framework',
vs3: 'Science at /science', vs4: 'Stored Only on Your Device',
routeRamp: 'NEGOTIATE COMPENSATION \u2192', routeRepair: 'REPAIR THE TRUST \u2192',
dialogueOpen: 'Back to Dr. B AI \u2192',
confirmYes: 'Yes, that\u2019s right \u2192', confirmEdit: 'Let me add something',
analysisLabel: 'THE 4 LAWS ANALYSIS',
officerIdle: 'Enforcement Mode (Resolve Argument)',
officerActive: 'Companion Mode'
},
es: {
eyebrow: '4 LAWS AI · Dr. B AI',
title: '<span>4 LAWS</span> AI',
hero: 'Prueba Dr. B AI gratis.<br>Sin tarjeta de crédito. Experiencia completa.',
heroSub: 'Dr. B AI · Dirección Espiritual · Psicología Sólida',
winTitle: '4 LAWS AI — Prueba Gratuita',
zero: 'Guardado en Tu Dispositivo',
phaseIntake: 'Recepci\u00F3n', phaseConfirm: 'Tu Historia', phaseLoading: 'Analizando',
phaseAnalysis: 'An\u00E1lisis', phaseDialogue: 'Di\u00E1logo',
send: 'Enviar \u25B6', hint: 'Enter para enviar \u00B7 Shift+Enter para nueva l\u00EDnea',
placeholder: 'Habla o escribe aqu\u00ED\u2026',
loading: 'Las 4 LEYES est\u00E1n leyendo tu situaci\u00F3n.<br>Esto tarda unos 20 segundos.',
error: 'Algo sali\u00F3 mal.', errorLink: ' Enviar al Dr. B \u2192',
micListening: 'Escuchando\u2026 habla claramente', micDone: '',
vs1: 'Inteligencia Pura de las 4 LEYES', vs2: '35 A\u00F1os de Marco Cl\u00EDnico',
vs3: 'Ciencia en /science', vs4: 'Guardado Solo en Tu Dispositivo',
routeRamp: 'NEGOCIAR COMPENSACIÓN \u2192', routeRepair: 'REPARAR LA CONFIANZA \u2192',
dialogueOpen: 'Volver al Dr. B AI \u2192',
confirmYes: 'S\u00ED, as\u00ED es \u2192', confirmEdit: 'D\u00E9jame agregar algo',
analysisLabel: 'EL AN\u00C1LISIS DE LAS 4 LEYES',
officerIdle: 'Modo Enforcement (Resolver Argumento)',
officerActive: 'Modo Compañero'
}
};

function s(key) { return (S[lang] || S.en)[key] || ''; }

function applyStrings() {
setHTML('sEyebrow', s('eyebrow'));
setHTML('sTitle', s('title'));
setHTML('sHero', s('hero'));
setText('sHeroSub', s('heroSub'));
setText('sWinTitle', s('winTitle'));
setText('sZeroLabel', s('zero'));
setText('sSendLabel', s('send'));
setText('sInputHint', s('hint'));
setHTML('sLoadingText', s('loading'));
setText('sErrorText', s('error'));
setText('sErrorLink', s('errorLink'));
setText('svs1', s('vs1')); setText('svs2', s('vs2'));
setText('svs3', s('vs3')); setText('svs4', s('vs4'));
var inp = document.getElementById('sessInput');
if (inp) inp.placeholder = s('placeholder');
document.getElementById('sBtnEN').classList.toggle('active', lang==='en');
document.getElementById('sBtnES').classList.toggle('active', lang==='es');
var togTxt = document.getElementById('sessOfficerToggleTxt');
if (togTxt) togTxt.textContent = officerMode ? s('officerActive') : s('officerIdle');
updatePhaseUI();
}
function setText(id, v) { var el=document.getElementById(id); if(el) el.textContent=v; }
function setHTML(id, v) { var el=document.getElementById(id); if(el) el.innerHTML=v; }

window.sessSetLang = function(l) {
lang = l;
try { localStorage.setItem('4laws-lang', l); } catch(e){}
applyStrings();
if (recognizer) recognizer.lang = l==='es' ? 'es-US' : 'en-US';
var jBtn = document.getElementById('sessJourneyBtn');
if (jBtn) jBtn.textContent = l==='es' ? '\u2B07 Guardar Mi Jornada' : '\u2B07 Save My Journey';
var returnPanel = document.getElementById('sessReturnPanel');
if (returnPanel && returnPanel.style.display !== 'none') { showReturnQuestion(); }
var modeStripEl = document.getElementById('sessModeStrip');
if (modeStripEl) {
  modeStripEl.textContent = officerMode
    ? (l === 'es' ? 'MODO ENFORCEMENT' : 'ENFORCEMENT MODE')
    : (l === 'es' ? 'MODO COMPAÑERO' : 'COMPANION MODE');
  modeStripEl.className = 'sess-mode-strip ' + (officerMode ? 'enforcement' : 'companion');
}
var bannerTxt = document.getElementById('sessOfficerBannerTxt');
if (bannerTxt) bannerTxt.textContent = l==='es' ? 'MODO DE ENFORCEMENT' : 'ENFORCEMENT MODE';
var standdownBtn = document.querySelector('.sess-officer-standdown');
if (standdownBtn) standdownBtn.textContent = l==='es' ? 'MODO COMPAÑERO' : 'Companion Mode';
if (officerMode) officerSetStep(officerCurrentStep);
setText('sessRecTxt', l==='es' ? 'GRABAR VIDEO' : 'VIDEO RECORD');
setText('sessRecSub', l==='es' ? 'Toca para grabar evidencia' : 'Tap to gather evidence');
setText('sessUploadTxt', l==='es' ? 'CARGAR VIDEO' : 'LOAD VIDEO');
setText('sessUploadSub', l==='es' ? 'De tus fotos o archivos' : 'From your photos or files');
};

var PHASES = ['intake','return','confirm','loading','analysis','dialogue'];
function updatePhaseUI() {
var labels = {
intake: s('phaseIntake'), confirm: s('phaseConfirm'), loading: s('phaseLoading'),
analysis: s('phaseAnalysis'), dialogue: s('phaseDialogue')
};
setText('sPhaseLabel', officerMode ? (lang==='es'?'Oficial':'Officer') : (labels[PHASE] || ''));
var idx = PHASES.indexOf(PHASE);
for (var i = 1; i <= 4; i++) {
var dot = document.getElementById('pd'+i);
if (!dot) continue;
dot.className = 'sess-pdot';
if (i-1 < idx) dot.classList.add('done');
else if (i-1 === idx) dot.classList.add('active');
}
}
/* INTAKE SYSTEM PROMPTS */
var INTAKE_SYS_EN =
'You are the 4 LAWS Culture Builder \u2014 the voice of Dr. Eduardo Bustamante, Ph.D., Licensed Clinical Psychologist, creator of the 4 LAWS of Trust and Talent.\n\n' +
'YOUR ONLY JOB RIGHT NOW is to help this person get their story out. Not to analyze. Not to advise. To listen and draw out.\n\n' +
'STEP 1 \u2014 THE POUR:\n' +
'Let them talk. After each response ask only: "Is there anything else you want to add?"\n' +
'Keep asking until they say they are done, or answers become very short.\n' +
'Do not ask structured questions during the pour. Just receive.\n\n' +
'STEP 2 \u2014 THE GAP QUESTIONS:\n' +
'Once the pour is complete, give a brief warm summary in 2-3 sentences.\n' +
'Then ask only what was NOT already answered:\n' +
'A. Name and role \u2014 "What\u2019s your first name, and what\u2019s your role in this?" (skip if known)\n\n' +
'EMAIL COLLECTION:\n' +
'After gap questions ask naturally: "Where should I send your analysis? What\u2019s your email?"\n' +
'Collect it before signaling [READY].\n\n' +
'SIGNAL: When you have name + role + enough story + email \u2014 signal [READY] on its own line at end.\n\n' +
'RULES: ONE question at a time. NEVER accept "I don\u2019t know." Warm. Plain language. No headers. No lists.';

var INTAKE_SYS_ES =
'Eres el Constructor de Cultura de las 4 LEYES \u2014 la voz del Dr. Eduardo Bustamante, Ph.D.\n\n' +
'PASO 1 \u2014 EL VOLCADO: Deja que hablen. Pregunta solo: "\u00BFHay algo m\u00E1s que quieras agregar?" Hasta que terminen.\n\n' +
'PASO 2 \u2014 LAS PREGUNTAS DE RELLENO: Resumen c\u00E1lido 2-3 oraciones. Luego solo lo que falta: nombre, rol, correo.\n\n' +
'SE\u00D1AL: nombre + rol + historia + correo \u2192 se\u00F1ala [LISTO] en su propia l\u00EDnea al final.\n\n' +
'REGLAS: Una pregunta a la vez. No aceptes "no s\u00E9." C\u00E1lido. Sin encabezados.';

var RETURN_SYS_EN =
'You are the 4 LAWS Culture Builder \u2014 return flow.\n\n' +
'This person has returned. READ THE JOURNEY DATA IN YOUR HISTORY FIRST.\n' +
'Ask ONE focused question: "What has happened since we last spoke?"\n' +
'When you have enough, signal [READY] on its own line at the very end.\n\n' +
'RULES: Reference what you know. Use their name. ONE question at a time.\n' +
'EMAIL: Confirm email before signaling [READY].';

var RETURN_SYS_ES =
'Eres el Constructor de Cultura de las 4 LEYES \u2014 regreso.\n\n' +
'Esta persona ha regresado. LEE LOS DATOS DE LA JORNADA PRIMERO.\n' +
'Haz UNA pregunta: "\u00BFQu\u00E9 ha pasado desde la \u00FAltima vez?" Cuando tengas suficiente, se\u00F1ala [LISTO].\n' +
'REGLAS: Una pregunta a la vez. Usa su nombre. C\u00E1lido.';

var DIALOGUE_SYS_EN =
'Before you sit with this person, I need you to understand something.\n\n' +
'They are not coming to you because they want a lecture. They are coming because something broke \u2014 in their home, in their marriage, in their child \u2014 and they don\u2019t know how to name it yet. Your job is to help them name it. Then show them the door out.\n\n' +
'The Law of Limits \u2014 Is anyone unsafe? Safety is always the first question.\n' +
'The Law of Responsibility \u2014 Who owns what here? Find the misplaced ownership.\n' +
'The Law of Respect \u2014 Does this person feel important to the people they love? Is their Pearl being seen?\n' +
'The Law of Talent \u2014 What is this person built for? What fire is trying to burn that the situation threatens to put out?\n\n' +
'Lead with the Pearl. Always. Find what is right about this person first. Then go to work.\n\n' +
'Do not lecture. Do not list. Do not deliver a clinical report.\n' +
'Talk to them like someone at ten o\u2019clock at night when everything has fallen apart.\n' +
'Be warm. Be direct. Be honest even when it costs something.\n' +
'Never make them feel like a case. They are a person. Treat them like one.\n\n' +
'OFFICER CASE CONTEXT: If a [OFFICER CASE NOTE] appears in history, reference it naturally \u2014 you know what just happened. Acknowledge the event and build on it.\n\n' +
'RULES FOR DIALOGUE:\n' +
'- Short paragraphs. Prose only. No bullets. No numbered lists.\n' +
'- End with one focused question per response.\n' +
'- Maximum 220 words per response.\n\n' +
'PAIN AND MIRACLE \u2014 ASK EARLY:\n' +
'In the first two exchanges weave in naturally \u2014 one per exchange:\n' +
'PAIN: "Was there a moment in all of this that was really painful \u2014 something specific that stayed with you?"\n' +
'MIRACLE: "If things got better \u2014 really better \u2014 what would that look like for you?"\n\n' +
'CLOSURE RULE: When the person signals resolution \u2014 confirm warmly, then: "Is there anything else on your mind, or are you set for now?"\n\n' +
'SCOPE FENCE: You are the 4 LAWS Culture Builder. When someone requests deliverables (press releases, code, letters, resumes, recipes, etc.) redirect warmly: "That\u2019s a deliverable I\u2019m not set up to produce. Claude.ai or ChatGPT will serve you well for that. What I can do is help you think through what\u2019s happening in your relationships through the 4 LAWS. What\u2019s on your mind?"\n\n' +
'INDIVIDUAL RAMP REHEARSAL — run this after analysis lands:\n' +
'Once the analysis is delivered and the person has read it, open the repair conversation privately.\n' +
'Ask one question at a time, in this order:\n' +
'1. "What would fair compensation look like to you — what would you need to feel trust again?"\n' +
'2. "What do you think would feel fair to offer the other person?"\n' +
'3. "If you sat down with them tomorrow, what would you want to say first?"\n' +
'This is ramp rehearsal. The person designs their half of the repair before the real conversation. ' +
'They arrive prepared — knowing what they want and what they are willing to offer.\n\n' +
'MONSTER VS KID IN DIALOGUE — when resistance appears:\n' +
'If the person says things like "he will never apologize" or "she doesn\'t care" or "it\'s too late" — ' +
'do not argue with the resistance. Speak past it to the part of them that still wants the relationship.\n' +
'Say: "That sounds like the part of you that is still hurt talking. Let me ask you something — ' +
'do you actually want trust back between you two?"\n' +
'Then wait. The answer to that question opens the door to the ramp.\n' +
'A ramp the person designed is a ramp they will keep. Do not assign it. Draw it out of them.';

var DIALOGUE_SYS_ES =
'Antes de sentarte con esta persona, necesito que entiendas algo.\n\n' +
'No vienen porque quieren una conferencia. Vienen porque algo se rompi\u00F3.\n\n' +
'La Ley de L\u00EDmites \u2014 \u00BFAlguien est\u00E1 inseguro?\n' +
'La Ley de Responsabilidad \u2014 \u00BFQui\u00E9n es due\u00F1o de qu\u00E9 aqu\u00ED?\n' +
'La Ley de Respeto \u2014 \u00BFEsta persona se siente importante para las personas que ama?\n' +
'La Ley de Talento \u2014 \u00BFPara qu\u00E9 est\u00E1 hecha esta persona?\n\n' +
'Lidera con la Perla. Siempre. C\u00E1lido. Directo. Honesto. Nunca los hagas sentir como un caso.\n\n' +
'CONTEXTO DE CASO OFICIAL: Si aparece [NOTA DE CASO OFICIAL] en el historial, refi\u00E9relo naturalmente.\n\n' +
'REGLAS: P\u00E1rrafos cortos. Solo prosa. Sin vi\u00F1etas. M\u00E1ximo 220 palabras. Una pregunta al final.\n\n' +
'DOLOR Y MILAGRO: Pregunta temprano \u2014 uno por intercambio.\n\n' +
'REGLA DE CIERRE: Cuando se\u00F1alen resoluci\u00F3n, confirma calidamente: "\u00BFHay algo m\u00E1s en tu mente, o est\u00E1s listo/a por ahora?"\n\n' +
'L\u00CDMITE DE ALCANCE: Eres el Constructor de Cultura. Solo 4 LEYES. Redirige entregables externos con calidez.';

/* MEDIATION SYSTEM PROMPTS */
var MEDIATION_SYS_EN =
'You are the 4 LAWS Mediator \u2014 the repair arm of the 4 LAWS system.\n\n' +
'YOUR ONLY JOB: Help each person design their own half of the repair. You never assign. You never prescribe. You ask.\n\n' +
'THE PRIVATE TESTIMONY SEQUENCE:\n' +
'Step 1 \u2014 Ask who wants to go first. Speak with that person privately.\n' +
'Step 2 \u2014 Ask: "What are you willing to offer to make this right?" One question. Wait. Listen.\n' +
'Step 3 \u2014 Acknowledge warmly what they offered. Then say: "Let me talk to [the other person] now."\n' +
'Step 4 \u2014 Ask the second person the same question privately.\n' +
'Step 5 \u2014 When BOTH parties have stated what they are willing to offer \u2014 signal [DEAL_CLOSE] on its own line.\n\n' +
'MONSTER VS KID \u2014 when someone resists:\n' +
'Say: "That sounds like your hurt talking. Don\u2019t you want things to be right between you two?"\n' +
'Then: "What would feel fair to you? What are you willing to give?" Let them design their own part.\n\n' +
'DEAL CLOSE RULE: Fire [DEAL_CLOSE] ONLY when both parties have spoken and offered something. Never fire early.\n\n' +
'RULES: ONE question per response. Maximum 3 sentences. Plain language. No clinical terms. No "Law of..." language \u2014 that was the Officer\u2019s job. You are about repair, not verdict. Always use names.';

var MEDIATION_SYS_ES =
'Eres el Mediador de las 4 LEYES \u2014 el brazo de reparaci\u00F3n del sistema.\n\n' +
'TU \u00DANICO TRABAJO: Ayudar a cada persona a dise\u00F1ar su mitad del arreglo. Nunca asignas. Nunca prescribes. Preguntas.\n\n' +
'LA SECUENCIA DE TESTIMONIO PRIVADO:\n' +
'Paso 1 \u2014 Pregunta qui\u00E9n quiere ir primero. Habla con esa persona en privado.\n' +
'Paso 2 \u2014 Pregunta: "\u00BFQu\u00E9 est\u00E1s dispuesto/a a ofrecer para arreglar esto?" Una pregunta. Espera. Escucha.\n' +
'Paso 3 \u2014 Reconoce con calidez lo que ofrecieron. Luego di: "Ahora voy a hablar con [la otra persona]."\n' +
'Paso 4 \u2014 Pregunta lo mismo a la segunda persona en privado.\n' +
'Paso 5 \u2014 Cuando AMBOS hayan dicho lo que est\u00E1n dispuestos a ofrecer \u2014 se\u00F1ala [CIERRE_TRATO] en su propia l\u00EDnea.\n\n' +
'MONSTRUO VS NI\u00D1O \u2014 cuando alguien se resiste:\n' +
'Di: "Eso suena como tu dolor hablando. \u00BFNo quieres que las cosas est\u00E9n bien entre ustedes?"\n' +
'Luego: "\u00BFQu\u00E9 te parecer\u00EDa justo? \u00BFQu\u00E9 est\u00E1s dispuesto/a a dar?"\n\n' +
'REGLA DE CIERRE: Se\u00F1ala [CIERRE_TRATO] SOLO cuando ambas partes hayan hablado y ofrecido algo.\n\n' +
'REGLAS: UNA pregunta por respuesta. M\u00E1ximo 3 oraciones. Lenguaje sencillo. Sin t\u00E9rminos cl\u00EDnicos. Usa nombres.';

/* MESSAGE HELPERS */
function addMsg(type, html) {
var msgs = document.getElementById('sessMessages');
if (msgs.children.length > 0) {
var d = document.createElement('div');
d.className = 'sess-divider';
d.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d);
}
var div = document.createElement('div');
if (type === 'ai') {
div.className = 'sess-msg-ai';
var label = lang === 'es' ? '4 LEYES' : '4 LAWS';
div.innerHTML = '<div class="sess-msg-ai-label">' + label + '</div><div class="sess-msg-ai-body">' + html + '</div>';
} else {
div.className = 'sess-msg-user';
div.innerHTML = '<div class="sess-msg-user-bubble">' + html + '</div>';
}
msgs.appendChild(div);
scrollBottom();
return div;
}

function addThinking() {
var msgs = document.getElementById('sessMessages');
if (msgs.children.length > 0) {
var d = document.createElement('div');
d.className = 'sess-divider';
d.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d);
}
thinkingEl = document.createElement('div');
thinkingEl.className = 'sess-msg-ai';
var label = lang === 'es' ? '4 LEYES' : '4 LAWS';
thinkingEl.innerHTML = '<div class="sess-msg-ai-label">' + label + '</div><div class="sess-thinking"><div class="sess-td"></div><div class="sess-td"></div><div class="sess-td"></div></div>';
msgs.appendChild(thinkingEl);
scrollBottom();
}

function removeThinking() {
if (thinkingEl && thinkingEl.parentNode) {
if (thinkingEl.previousSibling && thinkingEl.previousSibling.className === 'sess-divider') {
thinkingEl.previousSibling.remove();
}
thinkingEl.remove();
}
thinkingEl = null;
}

function formatAI(text) {
var t = text
.replace(/\[READY\]/gi,'').replace(/\[LISTO\]/gi,'')
.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
.replace(/\*(.*?)\*/g,'<em>$1</em>');
var paras = t.split(/\n\n+/).filter(function(p){ return p.trim(); });
return paras.map(function(p){ return '<p>' + p.trim().replace(/\n/g,'<br>') + '</p>'; }).join('');
}

function escHtml(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function scrollBottom() { var m=document.getElementById('sessMessages'); setTimeout(function(){ m.scrollTop=m.scrollHeight; },80); }

function setPhase(p) {
PHASE = p;
updatePhaseUI();
var msgs     = document.getElementById('sessMessages');
var loading  = document.getElementById('sessLoading');
var analysis = document.getElementById('sessAnalysis');
var inputArea= document.getElementById('sessInputArea');
if (p === 'loading') {
msgs.style.display='none'; loading.classList.add('on'); analysis.classList.remove('on'); inputArea.style.display='none';
} else if (p === 'analysis') {
msgs.style.display='none'; loading.classList.remove('on'); analysis.classList.add('on'); inputArea.style.display='none';
} else if (p === 'dialogue') {
msgs.style.display='flex'; loading.classList.remove('on'); analysis.classList.remove('on'); inputArea.style.display='block';
} else {
msgs.style.display='flex'; loading.classList.remove('on'); analysis.classList.remove('on'); inputArea.style.display='block';
}
}

function extractFromHistory() {
var full = intakeHistory.map(function(m){ return m.role+': '+m.content; }).join('\n');
var nameMatch = full.match(/(?:first name|your name|nombre)[^\n]*\n[^:]+:\s*([A-Z][a-z]+)/i);
if (nameMatch && !personName) personName = nameMatch[1];
var aiAskedEmail = intakeHistory.some(function(m){ return m.role==='assistant' && /email|correo/i.test(m.content); });
if (aiAskedEmail) {
var emailMatch = full.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
if (emailMatch && !personEmail) personEmail = emailMatch[1];
}
var roleMatch = full.match(/(?:role|rol)[^\n]*\n[^:]+:\s*([^\n.?!]{3,30})/i);
if (roleMatch && !personRole) personRole = roleMatch[1].trim();
}

async function constructSituation() {
var historyForSummary = intakeHistory.slice();
var summaryPrompt = lang === 'es'
? 'Bas\u00E1ndote en esta conversaci\u00F3n, construye un resumen cl\u00EDnico conciso. Tercera persona, c\u00E1lido, espec\u00EDfico, 150-250 palabras. Incluye: qui\u00E9n est\u00E1 involucrado, qu\u00E9 est\u00E1 pasando, el momento m\u00E1s dif\u00EDcil, sentimientos, resultado deseado, elemento de talento. Extrae en JSON al final: {"name":"\u2026","role":"\u2026","email":"\u2026"}'
: 'Based on this intake conversation, construct a concise clinical summary. Third person, warm, specific, 150-250 words. Include: who is involved, what is happening, most upsetting moment, feelings, desired outcome, talent element. Extract in JSON at end: {"name":"\u2026","role":"\u2026","email":"\u2026"}';
historyForSummary.push({role:'user', content: summaryPrompt});
try {
var res = await fetch(SCRIPT_URL, {method:'POST', body:JSON.stringify({action:'chat', system:'You are a clinical assistant. Extract and summarize intake information precisely.', messages:historyForSummary, max_tokens:600})});
var data = await res.json();
var text = (data.status==='ok' && data.reply) ? data.reply : '';
var jsonMatch = text.match(/JSON:\s*({[^}]+})/);
if (jsonMatch) {
try {
var extracted = JSON.parse(jsonMatch[1]);
if (extracted.name && !personName) personName = extracted.name;
if (extracted.role && !personRole) personRole = extracted.role;
if (extracted.email && !personEmail) personEmail = extracted.email;
} catch(e){}
}
situationText = text.replace(/JSON:\s*{[^}]+}/,'').trim();
return situationText;
} catch(e) { return ''; }
}

var isFiring = false;
async function fireToNinja() {
if (isFiring) return;
isFiring = true;
setPhase('loading');
await constructSituation();
if (!situationText || situationText.length < 30) {
situationText = intakeHistory.filter(function(m){ return m.role==='user'; }).map(function(m){ return m.content; }).join(' ');
}
try {
var res = await fetch(SCRIPT_URL, {method:'POST', body:JSON.stringify({action:'situation', name:personName||'Friend', role:personRole||'', email:personEmail||'', situation:situationText, lang:lang})});
var data = await res.json();
if (data && data.analysis && data.analysis.length > 20) { isFiring=false; showAnalysis(data.analysis, data.route||{}); }
else { isFiring=false; showAnalysisError(); }
} catch(e) { isFiring=false; showAnalysisError(); }
}

var isNavigating = false;
async function fireNavigator() {
if (isNavigating) return;
isNavigating = true;
try {
var situationContext = (situationText || journeyData.originalSituation || '').substring(0,800);
if (!situationContext && dialogueHistory.length > 0) {
situationContext = dialogueHistory.filter(function(m){ return m.role==='user'; }).map(function(m){ return m.content; }).join(' ').substring(0,800);
}
if (!situationContext) { isNavigating=false; return; }
var primaryLaw = detectPrimaryLaw(journeyData.originalAnalysis || situationContext);
var res = await fetch(SCRIPT_URL, {method:'POST', body:JSON.stringify({action:'navigate', situation:situationContext, law:primaryLaw, lang:lang, name:personName||''})});
var data = await res.json();
if (data.status==='ok' && data.recommendation) {
var rec = data.recommendation.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#c8a84b;text-decoration:underline;">$1 \u2197</a>');
var prefix = lang==='es'
? '<em style="font-size:11px;letter-spacing:.15em;font-family:Cinzel,serif;color:rgba(140,100,40,.5);">NAVEGADOR DE LAS 4 LEYES</em><br><br>'
: '<em style="font-size:11px;letter-spacing:.15em;font-family:Cinzel,serif;color:rgba(140,100,40,.5);">4 LAWS NAVIGATOR</em><br><br>';
addMsg('ai', prefix + formatAI(rec));
dialogueHistory.push({role:'assistant', content:data.recommendation});
}
} catch(err){}
isNavigating = false;
}

function detectPrimaryLaw(text) {
if (!text) return 'unknown';
var up = text.toUpperCase();
var counts = {
limits:         (up.match(/LAW OF LIMITS|LEY DE L\u00CDMITES|LIMITS VIOLATION|SAFETY/g)||[]).length,
responsibility: (up.match(/LAW OF RESPONSIBILITY|LEY DE RESPONSABILIDAD|COMPENSATION|OWNERSHIP/g)||[]).length,
respect:        (up.match(/LAW OF RESPECT|LEY DE RESPETO|BELONGING|IMPORTANCE/g)||[]).length,
talent:         (up.match(/LAW OF TALENT|LEY DE TALENTO|FIRE|CREATION|SELF-DETERMINATION/g)||[]).length
};
var max=0; var primary='unknown';
Object.keys(counts).forEach(function(k){ if(counts[k]>max){ max=counts[k]; primary=k; } });
return primary;
}

var HEADERS_EN = ['WHAT WE SEE FIRST','WHAT THE BEHAVIOR IS SAYING','WHAT 4 LAWS WOULD DO','THE SYSTEM YOU BUILD TOGETHER','WHAT COMES NEXT'];
var HEADERS_ES = ['LO QUE VEMOS PRIMERO','LO QUE EL COMPORTAMIENTO EST\u00C1 DICIENDO','LO QUE HAR\u00DDAN LAS 4 LEYES','EL SISTEMA QUE CONSTRUYEN JUNTOS','LO QUE VIENE DESPU\u00C9S'];

function showAnalysis(text, route) {
var headers = lang==='es' ? HEADERS_ES : HEADERS_EN;
var container = document.getElementById('sessAnalysis');
container.innerHTML = '';
var lbl = document.createElement('div');
lbl.style.cssText = 'padding:20px 26px 0;';
lbl.innerHTML =
'<div style="font-family:Cinzel,serif;font-size:10px;letter-spacing:.38em;color:rgba(140,100,40,.6);text-transform:uppercase;margin-bottom:4px;">' +
(personName?(lang==='es'?'PARA ':'FOR ')+escHtml(personName).toUpperCase():'')+'</div>'+
'<div style="font-family:Cinzel,serif;font-size:clamp(16px,2.2vw,20px);font-weight:700;letter-spacing:.08em;color:#1c1410;margin-bottom:16px;">'+s('analysisLabel')+'</div>';
container.appendChild(lbl);
var positions=[];
headers.forEach(function(h){ var idx=text.toUpperCase().indexOf(h.toUpperCase()); if(idx>-1) positions.push({pos:idx,header:h}); });
positions.sort(function(a,b){ return a.pos-b.pos; });
var sectionsEl=document.createElement('div');
sectionsEl.style.cssText='padding:0 26px;';
if (positions.length===0) {
var p=document.createElement('div'); p.className='sess-analysis-section';
p.innerHTML='<div class="sess-analysis-text">'+formatParas(text)+'</div>';
sectionsEl.appendChild(p);
} else {
positions.forEach(function(sp,i){
var start=sp.pos+sp.header.length;
var end=i+1<positions.length?positions[i+1].pos:text.length;
var body=text.substring(start,end).replace(/^[\s:-]+/,'').trim();
var sec=document.createElement('div'); sec.className='sess-analysis-section';
sec.innerHTML='<div class="sess-analysis-head">'+sp.header+'</div><div class="sess-analysis-text">'+formatParas(body)+'</div>';
sectionsEl.appendChild(sec);
});
}
container.appendChild(sectionsEl);

/* Single button at the bottom of the report — person clicks when done reading */
var returnWrap = document.createElement('div');
returnWrap.style.cssText = 'padding:24px 26px 32px;text-align:center;border-top:1px solid rgba(200,168,75,.15);margin-top:8px;';
returnWrap.innerHTML =
  '<div style="font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:.28em;color:rgba(200,168,75,.55);text-transform:uppercase;margin-bottom:16px;">' +
  (lang==='es' ? 'El Dr. B ha le\u00EDdo tu an\u00E1lisis y est\u00E1 listo' : 'Dr. B has read your analysis and is ready') +
  '</div>' +
  '<button id="sessReturnToDocB" class="sess-route-btn" style="border:none;cursor:pointer;font-size:13px;padding:16px 32px;">' +
  (lang==='es' ? 'Listo \u2014 Volver al Dr. B \u2192' : 'Done Reading \u2014 Return to Dr. B \u2192') +
  '</button>';
container.appendChild(returnWrap);
setPhase('analysis');

/* Wire the button — triggers on click only, no auto-transition */
var retBtn = document.getElementById('sessReturnToDocB');
if (retBtn) { retBtn.onclick = function(){ openDialogue(journeyData.originalAnalysis||''); }; }
}

/* openDialogueWithPrime — opens dialogue then immediately sends a priming message
   so Doc B knows which path the user chose (compensation vs trust repair) */
function openDialogueWithPrime(primeText) {
openDialogue(journeyData.originalAnalysis || '');
/* Fire the prime as the user's first message after a short delay */
setTimeout(function() {
var inp = document.getElementById('sessInput');
if (inp) { inp.value = primeText; }
sessSend();
}, 400);
}
window.openDialogueWithPrime = openDialogueWithPrime;

function formatParas(text) {
return text.split(/\n\n+/).filter(function(p){ return p.trim(); }).map(function(p){
return '<p>'+escHtml(p.trim()).replace(/\n/g,'<br>')+'</p>';
}).join('');
}

function showAnalysisError() {
setPhase('intake');
var errEl=document.getElementById('sessError');
errEl.classList.add('on');
setTimeout(function(){ errEl.classList.remove('on'); },6000);
}

function openDialogue(analysisText) {
var msgs=document.getElementById('sessMessages');
msgs.innerHTML='';
journeyData.originalAnalysis=analysisText;
pushbackCount=0; reanalysisOffered=false; perspectiveOffered=false;

var officerCaseContext = '';
try {
var savedCase = localStorage.getItem('fourLawsOfficerCase');
if (savedCase) {
var caseObj = JSON.parse(savedCase);
if (caseObj && caseObj.caseId) {
officerCaseContext = (lang==='es'
? '\n\n[NOTA DE CASO OFICIAL ' + caseObj.caseId + ']: ' + (caseObj.verdict || '').substring(0,400)
: '\n\n[OFFICER CASE NOTE ' + caseObj.caseId + ']: ' + (caseObj.verdict || '').substring(0,400));
}
}
} catch(e){}

dialogueHistory = [
{role:'user', content:(lang==='es'?'Contexto de la recepci\u00F3n:\n\n':'Intake context:\n\n')+situationText+(lang==='es'?'\n\nEl an\u00E1lisis de las 4 LEYES:\n\n':'\n\nThe 4 LAWS analysis:\n\n')+analysisText+officerCaseContext},
{role:'assistant', content:lang==='es'?'He le\u00EDdo tu situaci\u00F3n y el an\u00E1lisis completo. Estoy aqu\u00ED. \u00BFPor d\u00F3nde quieres comenzar?':'I have read your situation and the full analysis. I\u2019m here. Where would you like to begin?'}
];
setPhase('dialogue');
var openMsg = lang==='es'
? 'He le\u00EDdo tu situaci\u00F3n y el an\u00E1lisis completo. Estoy aqu\u00ED. \u00BFPor d\u00F3nde quieres comenzar?'
: 'I have read your situation and the full analysis. I\u2019m here. Where would you like to begin?';
addMsg('ai', formatAI(openMsg));
document.getElementById('sessInput').disabled=false;
document.getElementById('sessSendBtn').disabled=false;
document.getElementById('sessInput').focus();
var inputArea=document.getElementById('sessInputArea');
/* demo: no journey save — show join nudge */
var demoNudge = document.getElementById('sessJourneyNudge');
if (!demoNudge) {
var nudge = document.createElement('div');
nudge.id = 'sessJourneyNudge';
nudge.style.cssText = 'background:linear-gradient(135deg,rgba(200,168,75,.1),rgba(200,168,75,.06));border:1px solid rgba(200,168,75,.25);border-radius:3px;padding:18px 20px;margin-top:16px;text-align:center;';
nudge.innerHTML = '<div style="font-family:Cinzel,serif;font-size:10px;font-weight:700;letter-spacing:.28em;color:rgba(200,168,75,.7);text-transform:uppercase;margin-bottom:8px;">' + (lang==='es' ? 'SESI\u00D3N DE PRUEBA GRATUITA' : 'FREE TRIAL SESSION') + '</div>' +
'<div style="font-family:Lora,Georgia,serif;font-size:16px;font-style:italic;color:rgba(245,234,216,.75);line-height:1.7;margin-bottom:14px;">' + (lang==='es' ? 'Une tu jornada a Pocket Dr. B para guardarla y continuar.' : 'Join Pocket Dr. B to save your journey and continue.') + '</div>' +
'<a href="/pocket-dr-b" style="display:inline-block;font-family:Cinzel,serif;font-size:11px;font-weight:700;letter-spacing:.24em;color:#080502;text-transform:uppercase;text-decoration:none;background:linear-gradient(135deg,#e8c96a,#c8a84b,#a07828);padding:13px 32px;border-radius:2px;">' + (lang==='es' ? 'Unirse a Pocket Dr. B \u2192' : 'Join Pocket Dr. B \u2192') + '</a>';
inputArea.parentNode.insertBefore(nudge, inputArea.nextSibling);
}
}

/* ── EARLY GLOBAL DECLARATIONS — must be on window before inline handlers fire ── */
window.sessAutoResize = function(el) { el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,140)+'px'; };
window.sessHandleKey  = function(e)  { if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); if(typeof sessSend==='function') sessSend(); } };
/* ── END EARLY GLOBALS ── */
function sessInitDocBCore() {
if (typeof DocBCore === 'undefined') {
setTimeout(sessInitDocBCore, 200);
return;
}
var inp = document.getElementById('sessInput');
if (!inp) {
setTimeout(sessInitDocBCore, 200);
return;
}
DocBCore.init({
inputId:    'sessInput',
previewId:  'sessImgPreview',
thumbId:    'sessImgThumb',
clearBtnId: 'sessImgClear',
voiceBtnId: 'sessVoiceBtn',
getLang:    function() { return lang; }
});
var lbl = document.getElementById('sessImgLabel');
if (lbl) lbl.textContent = lang === 'es' ? 'Captura lista' : 'Screenshot ready';
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', sessInitDocBCore);
} else {
setTimeout(sessInitDocBCore, 500);
}
/* ── END DOCB CORE INIT ─────────────────────────────────────────── */
function sessHandleKey(e) { if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sessSend(); } }
window.sessHandleKey=sessHandleKey;

/* SEND */
async function sessSend() {
if (isThinking) return;
var input=document.getElementById('sessInput');
var text=input.value.trim();
var hasPending = (typeof DocBCore !== 'undefined') && !!DocBCore.getPending();
if (!text && !hasPending) return;

if (isListening && recognizer) {
isListening=false; micBase=''; recognizer.stop();
document.getElementById('sessMicBtn').classList.remove('listening');
var st=document.getElementById('sessMicStatus');
if(st){ st.textContent=''; st.classList.remove('on'); }
}

input.value=''; input.style.height='auto';
document.getElementById('sessSendBtn').disabled=true;
document.getElementById('sessError').classList.remove('on');

/* Build content block — image + text if screenshot pending */
var userContent = (typeof DocBCore !== 'undefined')
? DocBCore.buildContent(text, function(){ return lang; })
: text;
var displayText = (typeof DocBCore !== 'undefined')
? DocBCore.displayText(text, function(){ return lang; })
: text;

/* Officer mode routing */
if (officerMode) {
addOfficerUserMsg(displayText);
officerHistory.push({role:'user', content: userContent});
officerObservationCount++;
officerCallAI(null, false);
return;
}

/* Companion mode */
addMsg('user', escHtml(displayText).replace(/\n/g,'<br>'));

if (PHASE==='intake'||PHASE==='confirm') {
intakeHistory.push({role:'user', content: userContent});
if (!firstWords && intakeHistory.filter(function(m){ return m.role==='user'; }).length===1) { firstWords=displayText; }
if (/WHAT WE SEE FIRST|WHAT THE BEHAVIOR IS SAYING|WHAT 4 LAWS WOULD DO|LO QUE VEMOS PRIMERO/i.test(displayText)) {
journeyData.originalAnalysis=displayText; situationText=displayText.substring(0,500);
dialogueHistory=intakeHistory.slice(); intakeHistory=[];
setPhase('dialogue');
var inputArea=document.getElementById('sessInputArea');
var existingBtn=document.getElementById('sessJourneyBtn');
if (!existingBtn) {
var jBtn=document.createElement('button'); jBtn.id='sessJourneyBtn'; jBtn.className='sess-journey-btn';
jBtn.textContent=lang==='es'?'\u2B07 Guardar Mi Jornada':'\u2B07 Save My Journey';
jBtn.onclick=function(){ downloadJourney(); };
inputArea.parentNode.insertBefore(jBtn, inputArea.nextSibling);
}
}
} else if (PHASE==='return') {
intakeHistory.push({role:'user', content: userContent});
} else if (mediationMode) {
mediatorHistory.push({role:'user', content: userContent});
dialogueHistory.push({role:'user', content: displayText});
} else if (PHASE==='dialogue') {
dialogueHistory.push({role:'user', content: userContent});
}

isThinking=true;
addThinking();

try {
var systemPrompt, history;
if (PHASE==='intake'||PHASE==='confirm') { systemPrompt=lang==='es'?INTAKE_SYS_ES:INTAKE_SYS_EN; history=intakeHistory; }
else if (PHASE==='return') { systemPrompt=journeyData._returnSystemPrompt||(lang==='es'?RETURN_SYS_ES:RETURN_SYS_EN); history=intakeHistory; }
else if (mediationMode) { systemPrompt=lang==='es'?MEDIATION_SYS_ES:MEDIATION_SYS_EN; history=mediatorHistory; }
else { systemPrompt=lang==='es'?DIALOGUE_SYS_ES:DIALOGUE_SYS_EN; history=dialogueHistory; }

var res, data, reply;
/* Image content must route through GAMES_URL (handleGamesAI supports vision) */
if (Array.isArray(userContent)) {
var gamesRes = await fetch(GAMES_URL, {method:'POST', body: JSON.stringify({action:'handleGamesAI', system: systemPrompt, messages: history, max_tokens:1000})});
var gamesData = await gamesRes.json();
reply = (gamesData && gamesData.content && gamesData.content[0]) ? gamesData.content[0].text : '';
} else {
res = await fetch(SCRIPT_URL,{method:'POST',body:JSON.stringify({action:'chat',system:systemPrompt,messages:history,max_tokens:1000})});
data = await res.json();
reply = (data.status==='ok'&&data.reply)?data.reply:'';
}
if (!reply) throw new Error('empty');
removeThinking();

var isReady=/\[READY\]|\[LISTO\]/i.test(reply);
var hasDealClose = reply.indexOf('[DEAL_CLOSE]') > -1 || reply.indexOf('[CIERRE_TRATO]') > -1;
var displayReply=reply.replace(/\[READY\]/gi,'').replace(/\[LISTO\]/gi,'').replace(/\[DEAL_CLOSE\]/gi,'').replace(/\[CIERRE_TRATO\]/gi,'').trim();

if (mediationMode) {
mediatorHistory.push({role:'assistant', content:reply});
dialogueHistory.push({role:'assistant', content:displayReply});
if (hasDealClose) { setTimeout(function(){ triggerDealSynthesis(); }, 400); }
} else if (PHASE==='intake'||PHASE==='confirm'||PHASE==='return') {
intakeHistory.push({role:'assistant', content:reply});
if (!firstWords&&PHASE!=='return'&&intakeHistory.filter(function(m){ return m.role==='user'; }).length===1) {
firstWords=displayText; journeyData.firstWords=displayText;
}
} else {
dialogueHistory.push({role:'assistant', content:reply});
}

if (displayReply) {
addMsg('ai', formatAI(displayReply));
/* Voice output via DocBCore */
if (typeof DocBCore !== 'undefined') { DocBCore.speak(displayReply, function(){ return lang; }); }
}

/* Email gate before fireToNinja */
if (isReady&&(PHASE==='intake'||PHASE==='confirm'||PHASE==='return')) {
extractFromHistory();
if (!personEmail) {
var emailAsk=lang==='es'
? '\u00BFY a qu\u00E9 correo te env\u00EDo el an\u00E1lisis?'
: 'One more thing \u2014 what email should I send your analysis to?';
intakeHistory.push({role:'assistant', content:emailAsk});
addMsg('ai', formatAI(emailAsk));
} else {
setTimeout(function(){ fireToNinja(); },1200);
}
}

/* Email catch */
if (!isReady&&(PHASE==='intake'||PHASE==='confirm'||PHASE==='return')) {
var emailMatch=displayText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
if (emailMatch&&!personEmail) {
personEmail=emailMatch[1];
var lastAI=intakeHistory.filter(function(m){ return m.role==='assistant'; }).slice(-1)[0];
if (lastAI&&/email|correo/i.test(lastAI.content)) {
isThinking=false;
document.getElementById('sessSendBtn').disabled=false;
setTimeout(function(){ fireToNinja(); },800);
return;
}
}
}

if (PHASE==='dialogue') {
/* Mediation trigger detection */
if (!mediationMode && PHASE === 'dialogue') {
  var repairSignals = ['make this right','make it right','i was wrong','i owe','i hurt','i feel bad','how do i fix','how do we fix','want to apologize','need to apologize','want to repair','need to repair','quiero reparar','quiero disculparme','siento haber','debo disculparme'];
  var lowerText = displayText.toLowerCase();
  var hasRepairSignal = repairSignals.some(function(s){ return lowerText.indexOf(s) > -1; });
  if (hasRepairSignal) {
    var mediBtn = document.getElementById('sessMediationBtn');
    if (mediBtn) {
      mediBtn.style.borderColor = '#2d9b5a';
      mediBtn.style.background = 'rgba(45,155,90,0.2)';
      mediBtn.style.color = '#1a6b3a';
      mediBtn.innerHTML = '<span>\u2696\uFE0F ' + (lang === 'es' ? 'Modo Mediaci\u00F3n \u2014 toca para empezar' : 'Mediation Mode (Repair Trust)') + '</span>';
    }
  }
}
if (detectPushback(displayText)) {
pushbackCount++;
if (pushbackCount>=2&&!reanalysisOffered) { setTimeout(function(){ offerReanalysis(); },800); }
}
if (detectPerspectiveTrigger(displayText)) { setTimeout(function(){ offerPerspective(); },600); }
}
if (PHASE==='dialogue'||PHASE==='return') {
dialogueTurnCount++;
if (dialogueTurnCount%3===0) { navigatorFired=false; setTimeout(function(){ if(!navigatorFired){ navigatorFired=true; fireNavigator(); } },1500); }
}

} catch(err) {
removeThinking();
document.getElementById('sessError').classList.add('on');
}

isThinking=false;
document.getElementById('sessSendBtn').disabled=false;
if (PHASE!=='loading'&&PHASE!=='analysis') { document.getElementById('sessInput').focus(); }
/* demo: no auto-save */
}
window.sessSend=sessSend;

/* VOICE */
var recognizer = null;
var isListening = false;
var micBase = '';

function cleanSpoken(text) {
return text
.replace(/\bperiod\b/gi,'.').replace(/\bpunto\b/gi,'.')
.replace(/\bcomma\b/gi,',').replace(/\bcoma\b/gi,',')
.replace(/\bquestion mark\b/gi,'?').replace(/\bsigno de interrogaci[o\u00F3]n\b/gi,'?')
.replace(/\bexclamation( mark| point)?\b/gi,'!').replace(/\bsigno de exclamaci[o\u00F3]n\b/gi,'!')
.replace(/\bcolon\b/gi,':').replace(/\bdos puntos\b/gi,':')
.replace(/\bsemicolon\b/gi,';').replace(/\bpunto y coma\b/gi,';')
.replace(/\bnew line\b/gi,'\n').replace(/\bnueva l[i\u00ED]nea\b/gi,'\n')
.replace(/\bnew paragraph\b/gi,'\n\n').replace(/\bnuevo p[a\u00E1]rrafo\b/gi,'\n\n');
}

function initSpeech() {
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) return;
recognizer = new SR();
recognizer.continuous = true;
recognizer.interimResults = true;
recognizer.lang = lang === 'es' ? 'es-US' : 'en-US';
recognizer.onresult = function(e) {
var interim = '', final = '';
for (var i = e.resultIndex; i < e.results.length; i++) {
if (e.results[i].isFinal) final += e.results[i][0].transcript + ' ';
else interim += e.results[i][0].transcript;
}
if (final) micBase += cleanSpoken(final);
var ta = document.getElementById('sessInput');
ta.value = micBase + interim;
sessAutoResize(ta);
};
recognizer.onend = function() {
if (isListening) { try { recognizer.start(); } catch(e) { resetMic(); } }
else { resetMic(); }
};
recognizer.onerror = function(e) {
if (e.error === 'not-allowed') {
showMicStatus(lang === 'es' ? 'Micr\u00F3fono bloqueado. Permite el acceso e intenta de nuevo.' : 'Microphone blocked. Allow access and try again.');
} else if (e.error === 'no-speech') {
return;
} else {
showMicStatus(lang === 'es' ? 'Error de micr\u00F3fono. Escribe tu situaci\u00F3n abajo.' : 'Microphone error. Type your situation below.');
}
resetMic();
};
}

function resetMic() {
isListening = false; micBase = '';
var btn = document.getElementById('sessMicBtn');
var status = document.getElementById('sessMicStatus');
if (btn) btn.classList.remove('listening');
if (status) { status.textContent = ''; status.classList.remove('on'); }
}

function showMicStatus(msg) {
var status = document.getElementById('sessMicStatus');
if (status) { status.textContent = msg; status.classList.add('on'); }
}

window.sessToggleMic = function() {
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) {
showMicStatus(lang === 'es' ? 'Voz no disponible en este navegador. Usa Chrome.' : 'Voice not available in this browser. Use Chrome.');
return;
}
if (!recognizer) initSpeech();
if (!recognizer) return;
if (isListening) {
isListening = false; recognizer.stop();
var ta = document.getElementById('sessInput');
ta.value = micBase.trim(); sessAutoResize(ta); micBase = '';
document.getElementById('sessMicBtn').classList.remove('listening');
showMicStatus(lang === 'es' ? '\u2713 Dictado completo. Revisa y env\u00EDa.' : '\u2713 Dictation complete. Review and send.');
setTimeout(function(){ var st=document.getElementById('sessMicStatus'); if(st){ st.textContent=''; st.classList.remove('on'); } },3000);
} else {
micBase = document.getElementById('sessInput').value;
if (micBase && !micBase.endsWith(' ')) micBase += ' ';
recognizer.lang = lang === 'es' ? 'es-US' : 'en-US';
try {
recognizer.start(); isListening = true;
document.getElementById('sessMicBtn').classList.add('listening');
showMicStatus(lang === 'es' ? '\uD83D\uDD34 Escuchando\u2026 habla tu situaci\u00F3n. Toca para detener.' : '\uD83D\uDD34 Listening\u2026 speak your situation. Tap to stop.');
} catch(err) {
showMicStatus(lang === 'es' ? 'No se pudo iniciar el micr\u00F3fono. Intenta de nuevo.' : 'Could not start microphone. Try again.');
}
}
};

/* JOURNEY DATA */
var journeyData = {
firstWords:'', miracle:'', originalAnalysis:'', originalSituation:'',
sessionDate:'', personName:'', personRole:'', dialogueSummary:'',
previousJourney:null
};
var pushbackCount = 0;
var reanalysisOffered = false;
var perspectiveOffered = false;
var dialogueTurnCount = 0;
var navigatorFired = false;

/* RETURN FLOW */
function showReturnQuestion() {
var panel = document.getElementById('sessReturnPanel');
var msgs  = document.getElementById('sessMessages');
var titleEl = document.getElementById('sReturnTitle');
var subEl   = document.getElementById('sReturnSub');
var yesEl   = document.getElementById('sReturnYes');
var noEl    = document.getElementById('sReturnNo');
if (titleEl) titleEl.textContent = lang==='es' ? '\u00BFHemos hablado antes?' : 'Have we spoken before?';
if (subEl)   subEl.textContent   = lang==='es' ? 'Si guardaste tu jornada, puedo retomar exactamente donde nos quedamos.' : 'If you saved your journey, I can pick up exactly where we left off.';
if (yesEl)   yesEl.textContent   = lang==='es' ? 'Continuar mi jornada' : 'Continue My Journey';
if (noEl)    noEl.textContent    = lang==='es' ? 'Comenzar de nuevo' : 'Start fresh';
panel.style.display = 'block';
msgs.style.display  = 'none';
document.getElementById('sessInputArea').style.display = 'none';
}

window.sessTriggerFileLoad = function() {
var fi = document.getElementById('sessFileInput');
fi.onchange = function() { if (fi.files && fi.files[0]) sessReadFile(fi.files[0]); };
fi.click();
};

function sessReadFile(file) {
if (file.size > 204800) {
var msgs = document.getElementById('sessMessages');
msgs.style.display = 'flex';
var warn = document.createElement('div'); warn.className='sess-msg-ai';
var label = lang==='es'?'4 LEYES':'4 LAWS';
var msg = lang==='es' ? 'Ese archivo parece demasiado grande.' : 'That file seems too large. Make sure you\u2019re uploading your 4 LAWS journey file.';
warn.innerHTML='<div class="sess-msg-ai-label">'+label+'</div><div class="sess-msg-ai-body"><p>'+msg+'</p></div>';
msgs.appendChild(warn);
document.getElementById('sessInputArea').style.display='block';
return;
}
var reader = new FileReader();
reader.onload = function(e) {
var text = e.target.result;
if (!text || text.trim().length < 10) {
showFileError(lang==='es' ? 'El archivo parece estar vac\u00EDo.' : 'The file appears to be empty. Did you save your journey using the "Save My Journey" button?');
return;
}
try { parseJourneyFile(text); }
catch(err) { showFileError(lang==='es' ? 'No pude leer ese archivo.' : 'Could not read that file. Make sure you\u2019re uploading your 4 LAWS journey file (.txt).'); }
};
reader.onerror = function() { showFileError(lang==='es' ? 'Error al leer el archivo.' : 'Error reading the file. Please try again.'); };
reader.readAsText(file);
}

function showFileError(msg) {
var panel = document.getElementById('sessReturnPanel');
if (panel) panel.style.display='none';
var msgs = document.getElementById('sessMessages');
msgs.innerHTML=''; msgs.style.display='flex'; msgs.style.minHeight='340px';
var el=document.createElement('div'); el.className='sess-msg-ai';
var label=lang==='es'?'4 LEYES':'4 LAWS';
el.innerHTML='<div class="sess-msg-ai-label">'+label+'</div><div class="sess-msg-ai-body"><p>'+msg+'</p></div>';
msgs.appendChild(el);
document.getElementById('sessInputArea').style.display='block';
setPhase('intake');
}

window.sessLoadJourney = function(input) {
if (input.files && input.files[0]) sessReadFile(input.files[0]);
};

function parseJourneyFile(text) {
var extract = function(label) {
var rx = new RegExp('(?:'+label+')[:\\s]+([\\s\\S]*?)(?=\\n[A-Z][A-Z ]+:|$)','i');
var m = text.match(rx);
return (m && m[1] !== undefined) ? m[1].trim() : '';
};
journeyData.previousJourney    = text;
journeyData.personName         = extract('NAME') || personName;
journeyData.personRole         = extract('ROLE') || personRole;
journeyData.firstWords         = extract('FIRST WORDS|PRIMERAS PALABRAS');
journeyData.miracle            = extract('MIRACLE|MILAGRO');
journeyData.originalSituation  = extract('SITUATION SUMMARY|RESUMEN DE SITUACI\u00D3N');
journeyData.originalAnalysis   = extract('4 LAWS ANALYSIS|AN\u00C1LISIS DE LAS 4 LEYES');
journeyData.sessionDate        = extract('DATE|FECHA');
if (journeyData.personName) personName = journeyData.personName;
if (journeyData.personRole) personRole = journeyData.personRole;
openReturnInterview();
}

function cleanJourneyText(text) {
if (!text) return '';
return text.replace(/[═=]{3,}/g, '').replace(/\n{3,}/g, '\n').trim();
}

function openReturnInterview() {
var panel = document.getElementById('sessReturnPanel');
if (panel) panel.style.display='none';
var msgs = document.getElementById('sessMessages');
msgs.innerHTML=''; msgs.style.display='flex'; msgs.style.minHeight='340px';
document.getElementById('sessInputArea').style.display='block';
var modeStrip = document.getElementById('sessModeStrip');
if (modeStrip) modeStrip.style.display = '';
var rawJourney = journeyData.previousJourney || '';
var safeJourney = rawJourney.replace(/\[INST\]|\[\/INST\]|<\|system\|>|<\|user\|>|IGNORE ALL|DISREGARD ALL|NEW INSTRUCTIONS/gi,'[FILTERED]');
var journeyBlock =
'\n\n================================================\n' +
'PREVIOUS JOURNEY FILE \u2014 READ THIS FIRST\n' +
'================================================\n' +
'\u2014BEGIN JOURNEY DATA\u2014\n' + safeJourney + '\n\u2014END JOURNEY DATA\u2014\n' +
'================================================\n' +
'You now know this person\u2019s name, role, original situation, analysis, first words, and miracle.\n' +
'Begin by welcoming them back by name and asking what has happened since.\n';
journeyData._returnSystemPrompt = (lang==='es' ? RETURN_SYS_ES : RETURN_SYS_EN) + journeyBlock;
intakeHistory = [];
PHASE = 'return';
updatePhaseUI();
var name = journeyData.personName || '';
var situation = cleanJourneyText(journeyData.originalSituation || '');
var situationSnippet = situation ? situation.substring(0, 120).split('.')[0] : '';
var greeting = lang==='es'
? (name ? escHtml(name) + ', qu\u00E9 bueno verte.' : 'Bienvenido/a de vuelta.') +
  (situationSnippet ? '<br><br><em>La \u00FAltima vez hablamos de ' + escHtml(situationSnippet).toLowerCase() + '\u2026</em>' : '') +
  '<br><br>\u00BFQu\u00E9 hay de nuevo?'
: (name ? 'Good to see you, ' + escHtml(name) + '.' : 'Welcome back.') +
  (situationSnippet ? '<br><br><em>Last time we were talking about ' + escHtml(situationSnippet).toLowerCase() + '\u2026</em>' : '') +
  '<br><br>What\'s the latest?';
addMsg('ai', greeting);
setPhase('return');
var inputArea = document.getElementById('sessInputArea');
var existing  = document.getElementById('sessJourneyBtn');
if (!existing) {
var btn=document.createElement('button');
btn.id='sessJourneyBtn'; btn.className='sess-journey-btn';
btn.textContent=lang==='es'?'\u2B07 Guardar Mi Jornada':'\u2B07 Save My Journey';
btn.onclick=function(){ downloadJourney(); };
inputArea.parentNode.insertBefore(btn, inputArea.nextSibling);
}
}

window.sessStartFresh = function() {
/* demo: no auto-save to clear */
var panel = document.getElementById('sessReturnPanel');
if (panel) panel.style.display='none';
var msgs = document.getElementById('sessMessages');
msgs.innerHTML=''; msgs.style.display='flex'; msgs.style.minHeight='340px';
document.getElementById('sessInputArea').style.display='block';
var modeStrip = document.getElementById('sessModeStrip');
if (modeStrip) modeStrip.style.display = '';
setPhase('intake');
var welcome = lang==='es'
? 'Entra.<br><br>\u00BFQu\u00E9 est\u00E1 pasando? Cu\u00E9ntame lo que quieras. No hay orden correcto. No hay respuesta correcta. Solo dime lo que est\u00E1 pasando en tu vida ahora mismo.<br><br><em>Estoy aqu\u00ED. Te escucho.</em>'
: 'Come in.<br><br>What\u2019s going on? Tell me whatever you want. There\u2019s no right order. There\u2019s no right answer. Just tell me what\u2019s happening in your life right now.<br><br><em>I\u2019m here. I\u2019m listening.</em>';
addMsg('ai', welcome);
};

/* SAVE JOURNEY */
function buildJourneyFile() {
var d = new Date();
var dateStr = d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
var name = personName || journeyData.personName || 'Friend';
var allHistory = [];
intakeHistory.forEach(function(m,i){
if (PHASE==='return' && i===0 && m.role==='user') return;
if (m.content && m.content.indexOf('\u2014BEGIN JOURNEY DATA\u2014')>-1) return;
allHistory.push(m);
});
dialogueHistory.forEach(function(m){ if(m.role!=='system') allHistory.push(m); });

var officerCaseSection = '';
try {
var savedCase = localStorage.getItem('fourLawsOfficerCase');
if (savedCase) {
var caseObj = JSON.parse(savedCase);
if (caseObj && caseObj.caseId) {
officerCaseSection =
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'OFFICER CASE: ' + caseObj.caseId + '\n' +
'DATE: ' + (caseObj.date || '') + '\n' +
'SUMMARY: ' + (caseObj.verdict || '').substring(0,300) + '\n\n';
}
}
} catch(e){}

var dialogue = allHistory
.filter(function(m){ return m.role==='user'||m.role==='assistant'; })
.map(function(m){ return (m.role==='user'?(name+': '):'4 LAWS: ')+m.content; })
.join('\n\n');
var analysis  = journeyData.originalAnalysis || '';
var situation = situationText || journeyData.originalSituation || '';
return (
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'THE 4 LAWS JOURNEY\n' +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n' +
'NAME: ' + name + '\n' +
'ROLE: ' + (personRole || journeyData.personRole || '') + '\n' +
'DATE: ' + dateStr + '\n\n' +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'FIRST WORDS:\n' + (firstWords || journeyData.firstWords || '') + '\n\n' +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'MIRACLE:\n' + (journeyData.miracle || '') + '\n\n' +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'SITUATION SUMMARY:\n' + situation + '\n\n' +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'4 LAWS ANALYSIS:\n' + analysis + '\n\n' +
(officerCaseSection) +
(journeyData.previousJourney
? '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'PREVIOUS SESSION SUMMARY:\n' +
(journeyData.previousJourney.split('PREVIOUS SESSION SUMMARY:')[0]||journeyData.previousJourney).substring(0,3000).trim()+'\n\n'
: '') +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'DIALOGUE:\n' + dialogue + '\n\n' +
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n' +
'4 LAWS Academy \u00B7 4lawsacademy.com\n' +
'This journey belongs to ' + name + '.\n'
);
}

function downloadJourney() {
clearAutoSave();
var btn = document.getElementById('sessJourneyBtn');
if (btn) { btn.disabled=true; setTimeout(function(){ btn.disabled=false; },3000); }
var name = (personName||'Journey').replace(/\s+/g,'').replace(/[^a-zA-Z0-9-_]/g,'')||'Journey';
var d = new Date();
var month = d.toLocaleDateString('en-US',{month:'short'});
var year  = d.getFullYear();
var filename = name+'-4LAWS-'+month+year+'.txt';
try {
var content = buildJourneyFile();
var blob = new Blob([content],{type:'text/plain;charset=utf-8'});
var url  = URL.createObjectURL(blob);
var a = document.createElement('a');
a.href=url; a.download=filename;
document.body.appendChild(a); a.click(); document.body.removeChild(a);
setTimeout(function(){ URL.revokeObjectURL(url); },1000);
} catch(err) {
var msgs = document.getElementById('sessMessages');
var warn = document.createElement('div'); warn.className='sess-msg-ai';
var label=lang==='es'?'4 LEYES':'4 LAWS';
var msg=lang==='es'?'No se pudo guardar el archivo.':'Could not save the file. Please take a screenshot of this session.';
warn.innerHTML='<div class="sess-msg-ai-label">'+label+'</div><div class="sess-msg-ai-body"><p>'+msg+'</p></div>';
msgs.appendChild(warn); scrollBottom();
}
}

/* PERSPECTIVE TRIGGER */
var DISCOURAGEMENT_SIGNALS = [
'nothing has changed','nothing works','always like this','will always be','never changes',
'pointless','hopeless','giving up','what\u2019s the point','back to square one','nothing ever',
'i give up','doesn\u2019t matter','nada ha cambiado','nada funciona','siempre igual',
'sin esperanza','me rindo','para qu\u00E9','de vuelta al principio'
];
var MINIMIZE_SIGNALS = [
'but it probably won\u2019t last','but it won\u2019t last','probably won\u2019t continue','just got lucky',
'it\u2019s not that big','doesn\u2019t really count','not a big deal','probably just temporary',
'it went better but','pero probablemente no durar\u00E1','fue suerte','no es gran cosa','temporal'
];

function detectPerspectiveTrigger(text) {
if (!journeyData.previousJourney && !journeyData.firstWords) return false;
if (perspectiveOffered) return false;
var lower = text.toLowerCase();
var hasDisc = DISCOURAGEMENT_SIGNALS.some(function(s){ return lower.indexOf(s)>-1; });
var hasMin  = MINIMIZE_SIGNALS.some(function(s){ return lower.indexOf(s)>-1; });
return hasDisc || hasMin;
}

function offerPerspective() {
perspectiveOffered = true;
var msgs = document.getElementById('sessMessages');
var offer = document.createElement('div');
offer.className = 'sess-perspective-offer';
var question = lang==='es' ? '\u00BFPuedo mostrarte algo?' : 'Can I show you something?';
offer.innerHTML =
'<div class="sess-perspective-text">'+question+'</div>' +
'<div class="sess-perspective-btns">' +
'<button class="sess-persp-yes" onclick="showPerspective(this.parentNode.parentNode)">'+(lang==='es'?'S\u00ED':'Yes')+'</button>' +
'<button class="sess-persp-no" onclick="this.parentNode.parentNode.remove()">'+(lang==='es'?'Ahora no':'Not now')+'</button>' +
'</div>';
msgs.appendChild(offer); scrollBottom();
}

window.showPerspective = function(offerEl) {
if (offerEl) offerEl.remove();
var name       = personName || journeyData.personName || '';
var firstW     = firstWords || journeyData.firstWords || '';
var miracle    = journeyData.miracle || '';
var origAnalysis = journeyData.originalAnalysis || '';
var date       = journeyData.sessionDate || '';
var context =
(lang==='es'?'PRIMERA VEZ:\n':'ORIGINAL SESSION:\n') +
(date?(lang==='es'?'Fecha: ':'Date: ')+date+'\n':'') +
(firstW?(lang==='es'?'Primeras palabras: ':'First words: ')+'"'+firstW+'"\n':'') +
(miracle?(lang==='es'?'Milagro: ':'Miracle: ')+miracle+'\n':'') +
(origAnalysis?(lang==='es'?'\nAn\u00E1lisis original:\n':'\nOriginal analysis:\n')+origAnalysis+'\n':'') +
'\n'+(lang==='es'?'SITUACI\u00D3N ACTUAL:\n':'CURRENT SITUATION:\n') +
dialogueHistory.filter(function(m){ return m.role==='user'; }).slice(-3).map(function(m){ return m.content; }).join('\n');
var perspPrompt = lang==='es'
? context+'\n\nEres el Dr. B. Esta persona necesita perspectiva sobre su viaje. Compara d\u00F3nde estaba cuando lleg\u00F3 por primera vez con d\u00F3nde est\u00E1 ahora. 150 palabras m\u00E1ximo.'
: context+'\n\nYou are Dr. B. This person needs perspective on their journey. Compare where they were when they first came in with where they are now. Name the real growth using the 4 LAWS. 150 words maximum.';
addThinking();
fetch(SCRIPT_URL,{method:'POST',body:JSON.stringify({action:'chat',system:lang==='es'?DIALOGUE_SYS_ES:DIALOGUE_SYS_EN,messages:[{role:'user',content:perspPrompt}],max_tokens:400})})
.then(function(r){ return r.json(); })
.then(function(data){
removeThinking();
var reply=(data.status==='ok'&&data.reply)?data.reply:'';
if (reply){ dialogueHistory.push({role:'assistant',content:reply}); addMsg('ai',formatAI(reply)); }
})
.catch(function(){ removeThinking(); });
};

/* RE-ANALYSIS */
function detectPushback(text) {
var lower = text.toLowerCase();
var signals = [
'that\u2019s wrong','not right','that\u2019s not it','you missed','but that\u2019s not','incorrect',
'you don\u2019t understand','misunderstood','eso est\u00E1 mal','no es correcto','te equivocas',
'no entiendes','incorrecto','not what happened','that\u2019s not accurate','wrong law',
'wrong about','that is wrong','that is not right','you got it wrong','that\u2019s not what'
];
return signals.some(function(s){ return lower.indexOf(s)>-1; });
}

function offerReanalysis() {
if (reanalysisOffered) return;
reanalysisOffered = true;
var msgs = document.getElementById('sessMessages');
var offer = document.createElement('div');
offer.className='sess-reanalysis-offer';
var text = lang==='es'
? 'Lo que acabas de decir cambia el cuadro. \u00BFQuieres que actualice el an\u00E1lisis?'
: 'What you just shared changes the picture. Would you like me to update the analysis?';
var briefLabel = lang==='es'?'Actualizaci\u00F3n breve':'Brief update';
var fullLabel  = lang==='es'?'An\u00E1lisis completo':'Full re-analysis';
var skipLabel  = lang==='es'?'Continuar':'Continue';
offer.innerHTML =
'<div class="sess-reanalysis-text">'+text+'</div>' +
'<div class="sess-reanalysis-btns">' +
'<button class="sess-ra-brief" onclick="runReanalysis(\'brief\',this.parentNode.parentNode)">'+briefLabel+'</button>' +
'<button class="sess-ra-full" onclick="runReanalysis(\'full\',this.parentNode.parentNode)">'+fullLabel+'</button>' +
'<button class="sess-ra-skip" onclick="this.parentNode.parentNode.remove()">'+skipLabel+'</button>' +
'</div>';
msgs.appendChild(offer); scrollBottom();
}

window.runReanalysis = function(type, offerEl) {
if (offerEl) offerEl.remove();
reanalysisOffered = false;
var recentDialogue = dialogueHistory
.filter(function(m){ return m.role!=='system'; }).slice(-8)
.map(function(m){ return (m.role==='user'?'Person: ':'4 LAWS: ')+m.content; }).join('\n\n');
if (type==='brief') {
var briefPrompt = lang==='es'
? 'AN\u00C1LISIS ORIGINAL:\n'+(journeyData.originalAnalysis||situationText)+'\n\nCONVERSACI\u00D3N RECIENTE:\n'+recentDialogue+'\n\nEn 2-3 p\u00E1rrafos c\u00E1lidos: \u00BFQu\u00E9 ley es ahora primaria? Sin secciones formales.'
: 'ORIGINAL ANALYSIS:\n'+(journeyData.originalAnalysis||situationText)+'\n\nRECENT CONVERSATION:\n'+recentDialogue+'\n\nIn 2-3 warm direct paragraphs: Which law is now primary? What specifically changes in the prescription? No formal sections.';
addThinking();
fetch(SCRIPT_URL,{method:'POST',body:JSON.stringify({action:'chat',system:lang==='es'?DIALOGUE_SYS_ES:DIALOGUE_SYS_EN,messages:[{role:'user',content:briefPrompt}],max_tokens:500})})
.then(function(r){ return r.json(); })
.then(function(data){
removeThinking();
var reply=(data.status==='ok'&&data.reply)?data.reply:'';
if (reply){
var updateLabel=lang==='es'?'ACTUALIZACI\u00D3N \u2014 ':'UPDATE \u2014 ';
var d=new Date(); var ts=d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
dialogueHistory.push({role:'assistant',content:reply});
addMsg('ai','<em style="font-size:11px;letter-spacing:.2em;font-family:Cinzel,serif;color:rgba(140,100,40,.5);">'+updateLabel+ts+'</em><br><br>'+formatAI(reply));
}
})
.catch(function(){ removeThinking(); });
} else {
situationText = situationText+'\n\nUPDATE FROM DIALOGUE:\n'+recentDialogue;
journeyData.originalAnalysis='';
fireToNinja();
}
};

/* MEDIATION MODE */
window.sessEnterMediation = function(verdictContext) {
mediationMode = true;
officerMode = false;
var modeStrip = document.getElementById('sessModeStrip');
if (modeStrip) { modeStrip.textContent = lang === 'es' ? 'MODO MEDIACI\u00D3N' : 'MEDIATION MODE'; modeStrip.className = 'sess-mode-strip mediation'; }
var btn  = document.getElementById('sessOfficerToggle');
var txt  = document.getElementById('sessOfficerToggleTxt');
var icon = document.getElementById('sessOfficerToggleIcon');
var camRow    = document.getElementById('sessCamRow');
var stepStrip = document.getElementById('sessOfficerSteps');
if (btn)  { btn.classList.remove('active'); }
if (txt)  txt.textContent  = lang === 'es' ? 'Modo Compa\u00F1ero' : 'Companion Mode';
if (icon) icon.textContent = '\uD83D\uDE94';
if (camRow) camRow.classList.remove('active');
if (stepStrip) stepStrip.classList.remove('active');
ensureOfficerBanner(false);
var mediBtn = document.getElementById('sessMediationBtn');
if (mediBtn) { mediBtn.classList.add('active'); mediBtn.innerHTML = '<span>' + (lang === 'es' ? '\u2696\uFE0F Modo Mediaci\u00F3n (Reparar Confianza)' : '\u2696\uFE0F Mediation Mode (Repair Trust)') + '</span>'; }
var msgs = document.getElementById('sessMessages');
if (msgs.style.display === 'none') msgs.style.display = 'flex';
var modeStripM = document.getElementById('sessModeStrip');
if (modeStripM) modeStripM.style.display = '';
var panelM = document.getElementById('sessReturnPanel');
if (panelM) panelM.style.display = 'none';
var caseContext = '';
if (verdictContext && verdictContext.length > 20) { caseContext = verdictContext.substring(0, 500); }
else {
var savedCase = null;
try { savedCase = JSON.parse(localStorage.getItem('fourLawsOfficerCase') || 'null'); } catch(e){}
if (savedCase && savedCase.verdict) caseContext = savedCase.verdict.substring(0, 500);
else if (situationText) caseContext = situationText.substring(0, 400);
else if (journeyData.originalAnalysis) caseContext = journeyData.originalAnalysis.substring(0, 400);
}
var mediationPrompt = lang === 'es'
? 'Eres el Mediador de las 4 LEYES. Contexto:\n\n' + caseContext + '\n\nComienza con una pregunta c\u00E1lida: \u00BFQui\u00E9n quiere empezar?'
: 'You are the 4 LAWS Mediator. Context:\n\n' + caseContext + '\n\nBegin with one warm direct question. Ask who wants to start. One question only.';
var d2 = document.createElement('div');
d2.className = 'sess-divider';
d2.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d2);
var card = document.createElement('div');
card.className = 'sess-msg-ai';
var lbl = document.createElement('div');
lbl.className = 'sess-msg-ai-label';
lbl.style.color = 'rgba(45,155,90,0.8)';
lbl.innerHTML = '\u2696\uFE0F ' + (lang === 'es' ? '4 LEYES \u2014 MEDIADOR' : '4 LAWS \u2014 MEDIATOR');
card.appendChild(lbl);
msgs.appendChild(card);
scrollBottom();
if (caseContext && dialogueHistory.length === 0) {
dialogueHistory = [
{role: 'user', content: (lang === 'es' ? 'Contexto del caso:\n\n' : 'Case context:\n\n') + caseContext},
{role: 'assistant', content: lang === 'es' ? 'Estoy aqu\u00ED para ayudarles a hacer las paces.' : "I'm here to help you make things right."}
];
}
isThinking = true;
document.getElementById('sessSendBtn').disabled = true;
addThinking();
var mediationSystem = lang === 'es' ? MEDIATION_SYS_ES : MEDIATION_SYS_EN;
mediatorHistory = [];
mediationCaseContext = caseContext;
mediatorHistory.push({role: 'user', content: mediationPrompt});
fetch(SCRIPT_URL, {method: 'POST', body: JSON.stringify({action: 'chat', system: mediationSystem, messages: mediatorHistory, max_tokens: 200})})
.then(function(r){ return r.json(); })
.then(function(data) {
removeThinking();
var reply = (data.status === 'ok' && data.reply) ? data.reply : (lang === 'es' ? '\u00BFQui\u00E9n quiere empezar?' : "Who wants to start?");
mediatorHistory.push({role: 'assistant', content: reply});
var hasDealClose = reply.indexOf('[DEAL_CLOSE]') > -1 || reply.indexOf('[CIERRE_TRATO]') > -1;
var cleanReply = reply.replace(/\[DEAL_CLOSE\]/g,'').replace(/\[CIERRE_TRATO\]/g,'').trim();
var body = document.createElement('div');
body.className = 'sess-msg-ai-body';
body.innerHTML = formatAI(cleanReply);
card.appendChild(body);
dialogueHistory.push({role: 'assistant', content: cleanReply});
setPhase('dialogue');
scrollBottom();
if (hasDealClose) { setTimeout(function(){ triggerDealSynthesis(); }, 400); }
})
.catch(function() {
removeThinking();
var body = document.createElement('div');
body.className = 'sess-msg-ai-body';
body.innerHTML = formatAI(lang === 'es' ? '\u00BFQui\u00E9n quiere empezar?' : "Who wants to start?");
card.appendChild(body);
})
.finally(function() {
isThinking = false;
document.getElementById('sessSendBtn').disabled = false;
document.getElementById('sessInput').focus();
autoSave();
});
};

/* DEAL SYNTHESIS */
function triggerDealSynthesis() {
var isES = lang === 'es';
var msgs = document.getElementById('sessMessages');
var proc = document.createElement('div');
proc.id = 'sessDealProcessing';
proc.className = 'sess-verdict-processing';
proc.innerHTML = '<div class="sess-verdict-proc-dots"><div class="sess-ld"></div><div class="sess-ld"></div><div class="sess-ld"></div></div>' +
'<div class="sess-verdict-proc-txt">' + (isES ? 'El Mediador est\u00E1 construyendo el acuerdo\u2026' : 'The Mediator is building your agreement\u2026') + '</div>';
msgs.appendChild(proc);
scrollBottom();
var transcript = mediatorHistory.map(function(m) { return (m.role === 'user' ? 'PARTY: ' : 'MEDIATOR: ') + m.content; }).join('\n\n');
fetch(SCRIPT_URL, {method: 'POST', body: JSON.stringify({action: 'mediation', transcript: transcript, caseContext: mediationCaseContext, senderName: personName || 'Safety Officer', lang: lang})})
.then(function(r){ return r.json(); })
.then(function(data) {
var el = document.getElementById('sessDealProcessing');
if (el) el.remove();
if (data.status === 'ok' && data.deal) { renderDealInChat(data.deal); }
else { addMsg('ai', formatAI(isES ? 'Parece que hay un acuerdo tomando forma.' : "It sounds like there's an agreement taking shape.")); }
})
.catch(function() {
var el = document.getElementById('sessDealProcessing');
if (el) el.remove();
addMsg('ai', formatAI(isES ? '\u00BFEst\u00E1n listos para confirmar el acuerdo?' : "Are you both ready to confirm the agreement?"));
});
}

/* RENDER DEAL IN CHAT */
function renderDealInChat(deal) {
var isES = lang === 'es';
var msgs = document.getElementById('sessMessages');
var d = document.createElement('div');
d.className = 'sess-divider';
d.innerHTML = '<div class="sess-div-line"></div><div class="sess-div-diamond"></div><div class="sess-div-line"></div>';
msgs.appendChild(d);
var card = document.createElement('div');
card.style.cssText = 'background:linear-gradient(135deg,rgba(45,155,90,.08),rgba(26,107,58,.06));border:1px solid rgba(45,155,90,.3);border-left:4px solid #2d9b5a;border-radius:3px;padding:20px 22px;animation:fadeUp .5s ease both;';
var badge = document.createElement('div');
badge.style.cssText = 'font-family:Cinzel,serif;font-size:10px;font-weight:700;letter-spacing:.28em;color:rgba(45,155,90,.9);text-transform:uppercase;background:rgba(45,155,90,.1);border:1px solid rgba(45,155,90,.3);border-radius:2px;padding:5px 12px;display:inline-block;margin-bottom:14px;';
badge.textContent = isES ? '\u2696\uFE0F ACUERDO DE MEDIACI\u00D3N' : '\u2696\uFE0F MEDIATION AGREEMENT';
card.appendChild(badge);
var body = document.createElement('div');
body.className = 'sess-verdict-section-body';
body.innerHTML = formatVerdictBody(deal);
card.appendChild(body);
var dv = document.createElement('div');
dv.className = 'sess-verdict-divider';
card.appendChild(dv);
var confirmTxt = document.createElement('div');
confirmTxt.className = 'sess-verdict-implement-txt';
confirmTxt.textContent = isES ? '\u00BFEst\u00E1n todos de acuerdo con esto?' : 'Does everyone agree with this?';
card.appendChild(confirmTxt);
var confirmBtn = document.createElement('button');
confirmBtn.className = 'sess-verdict-impl-btn';
confirmBtn.style.cssText = 'background:linear-gradient(135deg,#2d9b5a,#1a6b3a);';
confirmBtn.textContent = isES ? '\u2714 S\u00ED, todos aceptamos \u2192' : '\u2714 Yes, we all agree \u2192';
confirmBtn.onclick = function() {
confirmBtn.disabled = true;
confirmBtn.textContent = isES ? 'Acuerdo confirmado.' : 'Agreement confirmed.';
mediationMode = false;
var ms = document.getElementById('sessModeStrip');
if (ms) { ms.textContent = isES ? 'MODO COMPA\u00D1ERO' : 'COMPANION MODE'; ms.className = 'sess-mode-strip companion'; }
var mb = document.getElementById('sessMediationBtn');
if (mb) { mb.classList.remove('active'); mb.innerHTML = '<span>\u2696\uFE0F ' + (isES ? 'Modo Mediaci\u00F3n (Reparar Confianza)' : 'Mediation Mode (Repair Trust)') + '</span>'; }
setTimeout(function() {
addMsg('ai', formatAI(isES ? 'El acuerdo est\u00E1 firmado. Ahora depende de ustedes.' : "The agreement is made. Now it belongs to all of you. I\u2019m here if you need anything else."));
}, 600);
};
card.appendChild(confirmBtn);
var modifyBtn = document.createElement('button');
modifyBtn.className = 'sess-verdict-appeal-btn';
modifyBtn.style.marginTop = '8px';
modifyBtn.textContent = isES ? 'Quiero cambiar algo \u2192' : 'I want to change something \u2192';
modifyBtn.onclick = function() { card.remove(); addMsg('ai', formatAI(isES ? '\u00BFQu\u00E9 necesitas cambiar?' : "What needs to change? Tell me.")); };
card.appendChild(modifyBtn);
msgs.appendChild(card);
scrollBottom();
}

/* AUTO-SAVE DISABLED IN DEMO — no persistent storage */
function clearAutoSave() { /* demo: noop */ }
function loadAutoSave() { return null; }

/* sessResumeAutoSave removed — demo has no auto-save */

/* autoSave() removed — demo */

/* showResumeOption removed — demo */
/* INIT */
var _initDone = false;
function init() {
if (_initDone) return;
_initDone = true;
applyStrings();
initSpeech();
officerLoadVoice();
journeyData.sessionDate = new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
showReturnQuestion(); /* demo: always fresh — no auto-save resume */
}

init();

})();
</script>

<!--
BILL OF RIGHTS PLUMBING — add to /authority-transfer
Call fourLawsRegister("Name") when member affirms.
Safety Officer reads it automatically — cites by name.
<script>
window.fourLawsRegister = function(name) {
  if (!name) return;
  try {
    var arr = JSON.parse(localStorage.getItem('fourLawsFamily') || '[]');
    if (!arr.find(function(m){ return m.name === name; })) {
      var today = new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
      arr.push({ name:name, date:today, chosen:true });
      localStorage.setItem('fourLawsFamily', JSON.stringify(arr));
    }
  } catch(e){}
};
</script>
-->
