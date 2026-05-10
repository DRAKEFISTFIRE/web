// ═══════════════════════════════════════════════════════════════
// TUTORIAL.JS — Santes Tiles · Tutorial interactiu pas a pas
// Usa el joc real però amb superposicions explicatives
// ═══════════════════════════════════════════════════════════════

// ── Cançó de tutorial (Gegant del Pi, easy, notes manuals) ──
const TUTORIAL_SONG = {
  id: 'tutorial',
  title: 'Tutorial',
  artist: 'Gegant del Pi',
  audioSrc: '/../../../audio/Gener.mp3',
  audioSrcEx: null,
  videoSrc: "/../../../video/Gener.mp4",
  bgColor: '#0d1a2e',
  bgGradient: 'linear-gradient(135deg,#0d1a2e,#1a0a2e)',
  bgImage: '/../../../public/Gener.jpeg',
  duration: 64.04,
  dificultad: 'Fàcil',
  categoria: 'Tutorial',
  vidas: 99,
  notesEasy: [[0.813,0],[1.324,1],[1.788,2],[2.299,3],[2.81,0],[3.274,2],[3.738,1],[4.18,3],[4.667,2],[5.108,1],[5.573,2],[6.037,0],[6.502,1],[6.966,3],[7.43,1],[7.895,2],[8.359,1],[8.87,0],[9.358,3],[9.799,1],[10.263,3],[10.728,0],[11.192,2],[11.633,3],[12.121,0],[12.585,1],[13.05,2],[13.514,3],[13.978,0],[14.443,2],[14.907,1],[15.372,3],[15.836,2],[16.347,1],[16.834,2],[17.299,0],[17.763,1],[18.228,3],[18.669,1],[19.133,2],[19.598,1],[20.085,0],[20.55,3],[21.014,1],[21.478,3],[21.966,0],[22.43,2],[22.895,3],[23.359,0],[23.87,1],[24.358,2],[24.822,3],[25.263,0],[25.728,2],[26.192,1],[26.657,3],[27.121,2],[27.585,1],[28.05,2],[28.514,0],[28.979,1],[29.443,3],[29.884,1],[30.325,2],[30.836,1],[31.324,0],[31.811,3],[32.276,1],[32.74,3],[33.228,0],[33.692,2],[34.133,3],[34.598,0],[35.062,1],[35.527,2],[35.991,3],[36.455,0],[36.92,2],[37.384,1],[37.849,3],[38.313,2],[38.801,1],[39.288,2],[39.729,0],[40.194,1],[40.681,3],[41.123,1],[41.587,2],[42.051,1],[42.516,0],[42.98,3],[43.445,1],[43.909,3],[44.373,0],[44.838,2],[45.302,3],[45.767,0],[46.254,1],[46.742,2],[47.183,3],[47.671,0],[48.112,2],[48.576,1],[49.041,3],[49.505,2],[49.969,1],[50.457,2],[50.898,0],[51.363,1],[51.827,3],[52.291,1],[52.756,2],[53.22,1],[53.731,0],[54.195,3],[54.683,1],[55.147,3],[55.612,0],[56.076,2],[56.541,3],[57.005,0],[57.493,1],[57.957,2],[58.421,3],[58.886,0],[59.35,2],[59.815,1],[60.256,3]],
  notesHard: []
};

// ═══════════════════════════════════════════════════════════════
// DEFINICIÓ DELS PASSOS
// ═══════════════════════════════════════════════════════════════
const TUTORIAL_STEPS = [
  {
    id: 'welcome',
    gameTime: null,
    pauseAt: null,
    title: '👋 Benvingut al Tutorial!',
    body: `Aprendràs a jugar a <b>Santes Tiles</b> en menys de 2 minuts.<br><br>
           El joc és com un Piano Tiles: <b>prem la tecla correcta</b> quan la rajola arribi a la zona de cops.<br><br>
           Clica <b>Continua</b> per começar!`,
    highlight: null,
    btnText: 'Continua →',
    autoAt: null,
  },
  {
    id: 'lanes',
    gameTime: null,
    pauseAt: null,
    title: '🎯 Els 4 Carrils',
    body: `Hi ha <b>4 carrils de colors</b>. Cada carril té una tecla assignada, pero al final son les tecles que tu configuris, les tecles predeterminades son les seguents. Pero tu les pots modificar a com mes comode s'et senti.<br><br>
           <div class="tut-keys-grid">
             <div class="tut-key-item" style="color:#e8002d"><span class="tut-key-pill">A / ←</span> Carril esquerra</div>
             <div class="tut-key-item" style="color:#1a8fff"><span class="tut-key-pill">S / ↓</span> Carril centre-esq.</div>
             <div class="tut-key-item" style="color:#00cc55"><span class="tut-key-pill">D / →</span> Carril centre-dret.</div>
             <div class="tut-key-item" style="color:#ff8800"><span class="tut-key-pill">W / ↑</span> Carril dreta</div>
           </div><br>
           En mòbil, <b>toca el carril</b> directament!`,
    highlight: 'lane-bar',
    btnText: 'Entès →',
    autoAt: null,
  },
  {
    id: 'hitzone',
    gameTime: null,
    pauseAt: null,
    title: '🎵 La Zona de Cop',
    body: `La <b>línia daurada</b> és la zona de cop.<br><br>
           Prem la tecla exactament quan la rajola arribi a la línia per obtenir:<br><br>
           <div class="tut-score-list">
             <div><span style="color:#f5e0a0">✦ PERFECT</span> &nbsp;+300 × combo</div>
             <div><span style="color:#6ae0ff">✦ GREAT</span> &nbsp;&nbsp;&nbsp;+200 × combo</div>
             <div><span style="color:#ffffff">✦ OK</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+100 × combo</div>
           </div>`,
    highlight: 'hitzone-line',
    btnText: 'Provem-ho! →',
    autoAt: null,
  },
  {
    id: 'play1',
    gameTime: 0,
    pauseAt: 8.5,
    title: '▶ Prem les primeres 4 notes',
    body: `Arriben 4 rajoles, una per carril.<br>Prem <b>A → S → D → W</b> quan arribin a la línia daurada.`,
    highlight: null,
    btnText: null,
    autoAt: 8.5,
    nextStep: 'pause1',
  },
  {
    id: 'pause1',
    gameTime: null,
    pauseAt: null,
    title: '⭐ Com ha anat?',
    body: `Has vist el <b>feedback de cop</b> sobre cada carril?<br><br>
           Com més cops perfectes, més gran el teu <b>combo</b> i més punts!<br><br>
           Si falles una nota <span style="color:#e8002d">perds una vida ♥</span>.<br>En el tutorial tens vides infinites, però a les cançons reals en tens poques!`,
    highlight: 'hud-lives',
    btnText: 'Seguim →',
    autoAt: null,
  },
  {
    id: 'combo',
    gameTime: null,
    pauseAt: null,
    title: '🔥 El Sistema de Combo',
    body: `Cada cop seguiti augmenta el teu <b>combo</b>.<br><br>
           La puntuació és: <code>punts × combo (màx ×10)</code><br><br>
           Si falles una nota, el combo es reinicia a 0.<br>
           <b>Mantén el ritme constant</b> per aconseguir la puntuació màxima!`,
    highlight: 'hud-combo',
    btnText: 'Seguim →',
    autoAt: null,
  },
  {
    id: 'play2',
    gameTime: 8.5,
    pauseAt: 21.5,
    title: '🎶 Ara prova el ritme ràpid',
    body: `Ara vénen notes <b>més ràpides i seguides</b>.<br>Mantén el ritme i no perdis el combo!`,
    highlight: null,
    btnText: null,
    autoAt: 21.5,
    nextStep: 'pause2',
  },
  {
    id: 'pause2',
    gameTime: null,
    pauseAt: null,
    title: '🌟 Gairebé ho tens!',
    body: `Has vist la <b>barra de progrés</b> a la part superior? Indica quant queda de cançó.<br><br>
           Quan acabes una cançó i aconsegueixes <span style="color:#c8a84b">⭐⭐⭐</span>, desbloques el <b>Mode EX 2×</b>: la mateixa cançó al doble de velocitat!`,
    highlight: 'progress-bar',
    btnText: 'Una última prova →',
    autoAt: null,
  },
  {
    id: 'play3',
    gameTime: 21.5,
    pauseAt: null,
    title: '🏁 Últimes notes!',
    body: `Ara ho saps tot. Acaba les últimes notes i completa el tutorial!`,
    highlight: null,
    btnText: null,
    autoAt: null,
  },
];

// ═══════════════════════════════════════════════════════════════
// ESTAT DEL TUTORIAL
// ═══════════════════════════════════════════════════════════════
let TUT = {
  active: false,
  stepIdx: 0,
  overlayVisible: false,
  pausedTime: 0,
  pausedByStep: false,
  audioOffset: 0,
};

// ═══════════════════════════════════════════════════════════════
// INJECCIÓ CSS DEL TUTORIAL
// ═══════════════════════════════════════════════════════════════
(function injectTutorialCSS() {
  const style = document.createElement('style');
  style.textContent = `
    #tut-overlay {
      display: none;
      position: absolute;
      inset: 0;
      background: rgba(5,8,20,0.82);
      z-index: 200;
      pointer-events: all;
      backdrop-filter: blur(2px);
    }
    #tut-overlay.visible { display: flex; align-items: center; justify-content: center; }

    .tut-box {
      background: linear-gradient(145deg, #0f1b2e, #1a0d2e);
      border: 1.5px solid rgba(200,168,75,0.45);
      border-radius: 16px;
      padding: 28px 32px 24px;
      max-width: 420px;
      width: 90%;
      box-shadow: 0 0 60px rgba(200,168,75,0.12), 0 20px 60px rgba(0,0,0,0.6);
      animation: tutBoxIn .3s cubic-bezier(.22,1,.36,1);
      position: relative;
    }
    @keyframes tutBoxIn {
      from { opacity:0; transform: translateY(24px) scale(.97); }
      to   { opacity:1; transform: none; }
    }

    .tut-step-dots {
      display: flex; gap: 6px; justify-content: center; margin-bottom: 16px;
    }
    .tut-step-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: rgba(200,168,75,0.2);
      transition: background .25s;
    }
    .tut-step-dot.active { background: #c8a84b; }
    .tut-step-dot.done   { background: rgba(200,168,75,0.55); }

    .tut-title {
      font-family: 'Titillium Web', sans-serif;
      font-size: 1.15rem; font-weight: 700;
      color: #c8a84b; margin-bottom: 12px; letter-spacing: .03em;
    }
    .tut-body {
      font-family: 'Titillium Web', sans-serif;
      font-size: .93rem; color: rgba(255,255,255,0.85);
      line-height: 1.6;
    }
    .tut-body b { color: #fff; }
    .tut-body code {
      background: rgba(200,168,75,0.12); padding: 2px 6px;
      border-radius: 4px; font-size:.88rem; color:#c8a84b;
    }

    .tut-keys-grid { display:flex; flex-direction:column; gap:6px; margin-top:4px; }
    .tut-key-item  { display:flex; align-items:center; gap:10px; font-size:.88rem; }
    .tut-key-pill  {
      display:inline-block; background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.2); border-radius:6px;
      padding:2px 10px; font-size:.82rem; color:#fff; font-weight:600;
      white-space:nowrap;
    }

    .tut-score-list { display:flex; flex-direction:column; gap:5px; font-size:.9rem; }

    .tut-btn {
      display: block; width: 100%; margin-top: 22px;
      padding: 11px 0; border-radius: 8px;
      background: linear-gradient(90deg,#c8a84b,#e8c96a);
      color: #0a0a14; font-family:'Titillium Web',sans-serif;
      font-size:.95rem; font-weight:700; letter-spacing:.08em;
      border: none; cursor: pointer;
      transition: transform .12s, box-shadow .12s;
      box-shadow: 0 4px 20px rgba(200,168,75,0.3);
    }
    .tut-btn:hover { transform:translateY(-2px); box-shadow:0 6px 28px rgba(200,168,75,0.45); }
    .tut-btn:active { transform:translateY(0); }

    .tut-playing-hint {
      position: absolute; bottom: 14px; left: 50%;
      transform: translateX(-50%);
      background: rgba(200,168,75,0.13);
      border: 1px solid rgba(200,168,75,0.3);
      border-radius: 20px; padding: 5px 16px;
      font-family:'Titillium Web',sans-serif;
      font-size:.78rem; color:rgba(200,168,75,0.8);
      pointer-events:none; white-space:nowrap;
      animation: tutPulse 1.5s infinite;
    }
    @keyframes tutPulse {
      0%,100%{opacity:.6} 50%{opacity:1}
    }

    .tut-highlight-ring {
      position: absolute;
      border: 2.5px solid #c8a84b;
      border-radius: 10px;
      box-shadow: 0 0 24px rgba(200,168,75,0.5);
      pointer-events: none;
      z-index: 195;
      animation: tutRing 1.2s ease-in-out infinite;
      transition: all .3s;
    }
    @keyframes tutRing {
      0%,100%{box-shadow:0 0 16px rgba(200,168,75,0.4)}
      50%{box-shadow:0 0 32px rgba(200,168,75,0.8)}
    }

    #tut-live-hint {
      display: none;
      position: absolute;
      top: 10px; left: 50%; transform: translateX(-50%);
      background: rgba(200,168,75,0.15);
      border: 1px solid rgba(200,168,75,0.35);
      border-radius: 20px; padding: 4px 18px;
      font-family: 'Titillium Web',sans-serif;
      font-size: .78rem; color: rgba(200,168,75,.9);
      z-index: 190; pointer-events: none; white-space: nowrap;
    }
    #tut-live-hint.visible { display: block; }

    #tut-exit-btn {
      position: absolute;
      top: 12px; right: 12px;
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(200,168,75,0.08);
      border: 1px solid rgba(200,168,75,0.25);
      border-radius: 4px;
      color: rgba(200,168,75,0.6);
      font-family: 'Cinzel', serif;
      font-size: 14px;
      cursor: pointer;
      z-index: 210;
      transition: all 0.15s;
      line-height: 1;
    }
    #tut-exit-btn:hover {
      background: rgba(200,168,75,0.18);
      border-color: #c8a84b;
      color: #c8a84b;
      transform: scale(1.08);
    }
    #tut-exit-btn:active { transform: scale(0.95); }

    #tut-exit-confirm {
      display: none;
      position: absolute;
      inset: 0;
      background: rgba(5,8,20,0.88);
      z-index: 220;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(3px);
    }
    #tut-exit-confirm.visible { display: flex; }
    .tut-exit-box {
      background: linear-gradient(145deg, #0f1b2e, #1a0d2e);
      border: 1.5px solid rgba(200,168,75,0.4);
      border-radius: 12px;
      padding: 28px 32px 22px;
      text-align: center;
      max-width: 300px; width: 85%;
      box-shadow: 0 0 50px rgba(0,0,0,0.7);
      animation: tutBoxIn .25s cubic-bezier(.22,1,.36,1);
    }
    .tut-exit-title {
      font-family: 'Cinzel Decorative', cursive;
      font-size: 1rem; color: #c8a84b;
      margin-bottom: 10px; letter-spacing: .05em;
    }
    .tut-exit-body {
      font-family: 'Titillium Web', sans-serif;
      font-size: .88rem; color: rgba(255,255,255,0.75);
      line-height: 1.55; margin-bottom: 20px;
    }
    .tut-exit-btns { display: flex; gap: 10px; justify-content: center; }
    .tut-exit-cancel {
      flex: 1; padding: 9px 0; border-radius: 6px;
      background: rgba(200,168,75,0.08);
      border: 1px solid rgba(200,168,75,0.25);
      color: rgba(200,168,75,0.8);
      font-family: 'Cinzel', serif; font-size: .78rem;
      letter-spacing: .08em; cursor: pointer;
      transition: all .15s;
    }
    .tut-exit-cancel:hover { border-color:#c8a84b; color:#c8a84b; background:rgba(200,168,75,0.14); }
    .tut-exit-ok {
      flex: 1; padding: 9px 0; border-radius: 6px;
      background: linear-gradient(90deg,#8b0000,#c8302d);
      border: none; color: #fff;
      font-family: 'Cinzel', serif; font-size: .78rem;
      letter-spacing: .08em; cursor: pointer;
      transition: all .15s;
      box-shadow: 0 4px 16px rgba(139,0,0,0.35);
    }
    .tut-exit-ok:hover { filter: brightness(1.15); transform: translateY(-1px); }
    .tut-exit-ok:active { transform: none; }
  `;
  document.head.appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════
// CONSTRUCCIÓ DEL DOM DEL TUTORIAL
// ═══════════════════════════════════════════════════════════════
(function buildTutorialDOM() {
  const overlay = document.createElement('div');
  overlay.id = 'tut-overlay';
  overlay.innerHTML = `
    <div class="tut-box" id="tut-box">
      <div class="tut-step-dots" id="tut-dots"></div>
      <div class="tut-title" id="tut-title"></div>
      <div class="tut-body"  id="tut-body"></div>
      <button class="tut-btn" id="tut-btn">Continua →</button>
    </div>
  `;

  const exitBtn = document.createElement('button');
  exitBtn.id = 'tut-exit-btn';
  exitBtn.title = 'Sortir del tutorial';
  exitBtn.innerHTML = '✕';
  exitBtn.style.display = 'none';
  exitBtn.addEventListener('click', showExitConfirm);

  const exitConfirm = document.createElement('div');
  exitConfirm.id = 'tut-exit-confirm';
  exitConfirm.innerHTML = `
    <div class="tut-exit-box">
      <div class="tut-exit-title">Sortir del Tutorial?</div>
      <div class="tut-exit-body">Perdràs el progrés del tutorial.<br>Podràs tornar-lo a fer quan vulguis.</div>
      <div class="tut-exit-btns">
        <button class="tut-exit-cancel" id="tut-exit-cancel">Continuar</button>
        <button class="tut-exit-ok"    id="tut-exit-ok">Sortir</button>
      </div>
    </div>
  `;

  const ring = document.createElement('div');
  ring.className = 'tut-highlight-ring';
  ring.id = 'tut-ring';
  ring.style.display = 'none';

  const liveHint = document.createElement('div');
  liveHint.id = 'tut-live-hint';
  liveHint.textContent = '🎵 Tutorial en curs — prem les tecles al ritme!';

  const gameScreen = document.getElementById('screen-game');
  if (gameScreen) {
    gameScreen.appendChild(overlay);
    gameScreen.appendChild(ring);
    gameScreen.appendChild(liveHint);
    gameScreen.appendChild(exitBtn);
    gameScreen.appendChild(exitConfirm);
  }

  setTimeout(() => {
    const cancelEl = document.getElementById('tut-exit-cancel');
    const okEl     = document.getElementById('tut-exit-ok');
    if (cancelEl) cancelEl.addEventListener('click', hideExitConfirm);
    if (okEl)     okEl.addEventListener('click', forceTutorialExit);
  }, 100);

  const btnTut = document.getElementById('btn-tutorial');
  if (btnTut) {
    btnTut.addEventListener('click', startTutorial);
  }
})();

// ═══════════════════════════════════════════════════════════════
// HOOK endGame — s'instal·la quan el fitxer principal ja ha
// definit la funció (600 ms de marge)
// ═══════════════════════════════════════════════════════════════
setTimeout(() => {
  const _origEndGame = window.endGame;

  if (typeof _origEndGame === 'function' && !window._tutEndGamePatched) {
    window._tutEndGamePatched = true;

    window.endGame = function () {
      // ── Tutorial actiu → interceptem ──
      if (TUT.active) {
        TUT.active = false;

        const liveHint = document.getElementById('tut-live-hint');
        if (liveHint) liveHint.classList.remove('visible');
        hidePlayHint();
        hideHighlight();
        showTutorialComplete();
        return;
      }

      // ── Tutorial NO actiu → comportament 100 % original ──
      return _origEndGame.apply(this, arguments);
    };
  }
}, 600);

// ═══════════════════════════════════════════════════════════════
// FUNCIONS PRINCIPALS
// ═══════════════════════════════════════════════════════════════

function startTutorial() {
  TUT.active      = true;
  TUT.stepIdx     = 0;
  TUT.pausedTime  = 0;
  TUT.audioOffset = 0;

  const exitBtn = document.getElementById('tut-exit-btn');
  if (exitBtn) exitBtn.style.display = 'flex';

  if (typeof startSong === 'function') {
    startSong(TUTORIAL_SONG, false);
  }

  // Esperem que startSong hagi iniciat l'àudio i llavors pausem
  setTimeout(() => {
    if (typeof G !== 'undefined') {
      G.running = false;
      if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
      if (G.audio) {
        try { G.audio.pause(); G.audio.currentTime = 0; } catch(e) {}
      }
    }
    showTutorialStep(0);
  }, 400);
}

function showTutorialStep(idx) {
  const steps = TUTORIAL_STEPS;
  if (idx >= steps.length) {
    endTutorial();
    return;
  }

  TUT.stepIdx = idx;
  const step  = steps[idx];

  buildDots(idx);

  document.getElementById('tut-title').textContent = step.title;
  document.getElementById('tut-body').innerHTML    = step.body;

  const btn = document.getElementById('tut-btn');
  if (step.btnText) {
    btn.textContent = step.btnText;
    btn.style.display = 'block';
    btn.onclick = () => onTutorialBtn(idx);
  } else {
    btn.style.display = 'none';
  }

  const overlay = document.getElementById('tut-overlay');
  overlay.classList.add('visible');
  TUT.overlayVisible = true;

  if (step.highlight) {
    showHighlight(step.highlight);
  } else {
    hideHighlight();
  }
}

function onTutorialBtn(idx) {
  const step    = TUTORIAL_STEPS[idx];
  const nextIdx = idx + 1;
  const nextStep = TUTORIAL_STEPS[nextIdx];

  hideOverlay();
  hideHighlight();

  if (!nextStep) { endTutorial(); return; }

  if (nextStep.gameTime !== null) {
    startTutorialPlay(nextIdx);
  } else {
    showTutorialStep(nextIdx);
  }
}

// ── Inicia o reprèn el joc per a un pas de gameplay ──
function startTutorialPlay(idx) {
  const step = TUTORIAL_STEPS[idx];

  TUT.pauseAt         = (step.pauseAt !== undefined && step.pauseAt !== null) ? step.pauseAt : null;
  TUT.currentPlayStep = idx;

  const liveHint = document.getElementById('tut-live-hint');
  if (liveHint) liveHint.classList.add('visible');
  if (step.body && step.btnText === null) showPlayHint(step.title, step.body);

  if (typeof G === 'undefined') return;

  const allNotes = TUTORIAL_SONG.notesEasy;
  const startT   = (step.gameTime !== null && step.gameTime !== undefined) ? step.gameTime : 0;

  G.notes = allNotes
    .filter(n => n[0] >= startT - 0.1)
    .map(n => ({ time: n[0], lane: n[1], hit: false, missed: false, _y: -999 }));
  G.noteIdx     = 0;
  G.activeNotes = [];

  const t0 = performance.now() - startT * 1000;
  G.timerMode = true;
  G.getTime   = () => (performance.now() - t0) / 1000;

  if (G.audio) {
    try {
      G.audio.currentTime = startT;
      G.audio.play().catch(() => {});
    } catch(e) {}
  }

  G.running = true;
  if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }

  G.animId = requestAnimationFrame(function tutLoop() {
    if (!G || !G.running || !TUT.active) return;

    const t = G.getTime();

    // Comprovació de pausa automàtica
    if (TUT.pauseAt !== null && t >= TUT.pauseAt) {
      G.running = false;
      cancelAnimationFrame(G.animId);
      G.animId = null;
      if (G.audio) { try { G.audio.pause(); } catch(e) {} }

      const lh = document.getElementById('tut-live-hint');
      if (lh) lh.classList.remove('visible');
      hidePlayHint();

      const nextIdx = TUT.currentPlayStep + 1;
      TUT.pauseAt = null;
      setTimeout(() => showTutorialStep(nextIdx), 400);
      return;
    }

    if (typeof spawnNotes === 'function') spawnNotes(t);
    if (typeof drawGame   === 'function') drawGame(t);
    if (!G.running) return;

    const pf = document.getElementById('progress-fill');
    if (pf) {
      const dur = G.song ? G.song.duration : 64.04;
      pf.style.width = Math.min(t / dur * 100, 100) + '%';
    }

    // Fi de les notes d'aquest segment
    if (G.noteIdx >= G.notes.length && G.activeNotes.every(n => n.hit || n.missed)) {
      G.running = false;
      cancelAnimationFrame(G.animId);
      G.animId = null;
      if (G.audio) { try { G.audio.pause(); } catch(e) {} }
      const lh2 = document.getElementById('tut-live-hint');
      if (lh2) lh2.classList.remove('visible');
      hidePlayHint();
      setTimeout(() => {
        if (TUT.active) showTutorialComplete();
      }, 400);
      return;
    }

    G.animId = requestAnimationFrame(tutLoop);
  });
}

// tutGameLoop conservat com a no-op per compatibilitat
function tutGameLoop() {}

// ── Pantalla de fi del tutorial ──
function showTutorialComplete() {
  const exitBtnEl = document.getElementById('tut-exit-btn');
  if (exitBtnEl) exitBtnEl.style.display = 'none';

  const overlay = document.getElementById('tut-overlay');
  document.getElementById('tut-title').textContent = '🎉 Tutorial completat!';
  document.getElementById('tut-body').innerHTML = `
    Ja saps tot el necessari per jugar a <b>Santes Tiles</b>!<br><br>
    <div class="tut-score-list">
      <div>🎵 Prem la tecla al ritme de les notes</div>
      <div>🔥 Mantén el combo per més punts</div>
      <div>⭐ Aconsegueix 3 estrelles per desbloquar el Mode EX</div>
      <div>❤️ Vigila les vides — si les perdes totes, game over!</div>
    </div><br>
    Ara tria una cançó i <b>demostra el teu talent!</b>
  `;
  const btn = document.getElementById('tut-btn');
  btn.textContent = '🎵 Escull una cançó';
  btn.style.display = 'block';
  btn.onclick = () => {
    TUT.active = false;   // ← assegura que el flag queda net
    hideOverlay();
    if (typeof buildSongGrid === 'function') buildSongGrid();
    if (typeof showScreen    === 'function') showScreen('select');
  };
  buildDots(TUTORIAL_STEPS.length);
  overlay.classList.add('visible');
  TUT.overlayVisible = true;
}

// ═══════════════════════════════════════════════════════════════
// SORTIR DEL TUTORIAL
// ═══════════════════════════════════════════════════════════════

function showExitConfirm() {
  const c = document.getElementById('tut-exit-confirm');
  if (c) c.classList.add('visible');
}

function hideExitConfirm() {
  const c = document.getElementById('tut-exit-confirm');
  if (c) c.classList.remove('visible');
}

function forceTutorialExit() {
  hideExitConfirm();
  TUT.active = false;

  if (typeof G !== 'undefined') {
    G.running = false;
    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
    if (G.audio)  { try { G.audio.pause(); G.audio.currentTime = 0; } catch(e) {} G.audio = null; }
  }

  hideOverlay();
  hideHighlight();
  hidePlayHint();

  const liveHint = document.getElementById('tut-live-hint');
  if (liveHint) liveHint.classList.remove('visible');

  const exitBtn = document.getElementById('tut-exit-btn');
  if (exitBtn) exitBtn.style.display = 'none';

  if (typeof showScreen === 'function') showScreen('title');
}

function endTutorial() {
  TUT.active = false;
  hideOverlay();
  hideHighlight();
  const liveHint = document.getElementById('tut-live-hint');
  if (liveHint) liveHint.classList.remove('visible');
  showTutorialComplete();
}

// ═══════════════════════════════════════════════════════════════
// UTILITATS UI
// ═══════════════════════════════════════════════════════════════

function hideOverlay() {
  const overlay = document.getElementById('tut-overlay');
  if (overlay) overlay.classList.remove('visible');
  TUT.overlayVisible = false;
}

function buildDots(currentIdx) {
  const dotsEl = document.getElementById('tut-dots');
  if (!dotsEl) return;
  const total = TUTORIAL_STEPS.filter(s => s.id !== 'play1' && s.id !== 'play2' && s.id !== 'play3').length;
  dotsEl.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'tut-step-dot' + (i === currentIdx ? ' active' : i < currentIdx ? ' done' : '');
    dotsEl.appendChild(d);
  }
}

function showHighlight(targetId) {
  const ring = document.getElementById('tut-ring');
  if (!ring) return;

  let el = null;
  if (targetId === 'lane-bar')     el = document.getElementById('lane-bar');
  if (targetId === 'hud-lives')    el = document.getElementById('hud-lives');
  if (targetId === 'hud-combo')    el = document.getElementById('hud-combo');
  if (targetId === 'progress-bar') el = document.getElementById('progress-bar');
  if (targetId === 'hitzone-line') el = document.getElementById('canvas-area');

  if (!el) { ring.style.display = 'none'; return; }

  const rect   = el.getBoundingClientRect();
  const parent = document.getElementById('screen-game').getBoundingClientRect();

  ring.style.display = 'block';
  ring.style.left    = (rect.left   - parent.left - 4)  + 'px';
  ring.style.top     = (rect.top    - parent.top  - 4)  + 'px';
  ring.style.width   = (rect.width  + 8) + 'px';
  ring.style.height  = (rect.height + 8) + 'px';
}

function hideHighlight() {
  const ring = document.getElementById('tut-ring');
  if (ring) ring.style.display = 'none';
}

// ── Caixa petita durant gameplay (cantonada inferior) ──
let _playHintEl = null;
function showPlayHint(title, body) {
  if (_playHintEl) _playHintEl.remove();

  const box = document.createElement('div');
  box.id = 'tut-play-hint';
  box.style.cssText = `
    position:absolute; bottom:90px; right:12px;
    background:rgba(5,8,20,0.88);
    border:1px solid rgba(200,168,75,0.4);
    border-radius:12px; padding:12px 16px;
    max-width:210px; z-index:180; pointer-events:none;
    font-family:'Titillium Web',sans-serif;
    animation: tutBoxIn .3s cubic-bezier(.22,1,.36,1);
  `;
  box.innerHTML = `
    <div style="color:#c8a84b;font-weight:700;font-size:.82rem;margin-bottom:6px">${title}</div>
    <div style="color:rgba(255,255,255,.8);font-size:.78rem;line-height:1.5">${body}</div>
  `;

  const gameScreen = document.getElementById('screen-game');
  if (gameScreen) gameScreen.appendChild(box);
  _playHintEl = box;
}

function hidePlayHint() {
  if (_playHintEl) { _playHintEl.remove(); _playHintEl = null; }
}

// ── Reposiciona el ring en resize ──
window.addEventListener('resize', () => {
  if (TUT.active && TUTORIAL_STEPS[TUT.stepIdx]) {
    const h = TUTORIAL_STEPS[TUT.stepIdx].highlight;
    if (h) showHighlight(h);
  }
});

console.log('[Tutorial] tutorial.js carregat correctament ✓');