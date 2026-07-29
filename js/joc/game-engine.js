// ═══════════════════════════════════
// GAME ENGINE — amb notes llargues (hold notes)
// Format nota: [time, lane]  o bé  [time, lane, duration]
//   duration > 0 → nota llarga (hold note)
// ═══════════════════════════════════
let G = {};
const canvas = document.getElementById('game-canvas');
const ctx2   = canvas.getContext('2d');

function resizeCanvas() {
  const area = document.getElementById('canvas-area');
  canvas.width = area.clientWidth; canvas.height = area.clientHeight;
}

function startSong(song, exMode) {
  // --- Clean up any running game first ---
  if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
  if (G.audio) { stopAudio(G.audio, 0); G.audio = null; }
  G.running = false;

  exMode = exMode || false;
  const sd   = getSongData(song.id);
  const isEx = exMode && sd.exUnlocked;

  G = {
    song, isEx,

    loops: 0,
    maxLoops: 1,

    notes: (isEx ? song.notesHard : song.notesEasy).map(n => ({
      time:     n[0],
      lane:     n[1],
      duration: n[2] || 0,   // 0 = nota normal, >0 = hold note (en segons)
      hit:      false,
      missed:   false,
      // hold-note state
      holdActive:   false,   // l'usuari la manté premuda
      holdProgress: 0,       // 0..1 — quant s'ha completat
      holdReleased: false,   // si la va soltar massa aviat
      _y: -999,
      _tailY: -999,          // y de la cua (top del rectangle llarg)
    })),

    noteIdx: 0, activeNotes: [],
    score: 0, combo: 0, maxCombo: 0, lives: song.vidas,
    totalNotes: 0, hitCount: 0, perfectCount: 0, greatCount: 0, missCount: 0,
    running: false, audio: null, animId: null, t0: null,
    gameOverPending: false,

    // quines lanes té l'usuari premudes ara mateix
    heldLanes: { 0: false, 1: false, 2: false, 3: false },
  };

  // 🔥 SPEED SEGONS DIFICULTAT + LOCALSTORAGE
  const difficulty = document.getElementById('difficulty')?.value || 'normal';
  G.speed = SPEEDS?.[difficulty] || 340;
  console.log('[START SONG] dificultad:', difficulty, 'speed:', G.speed);

  G.totalNotes = G.notes.length;

  document.getElementById('hud-song-name').textContent = song.title.toUpperCase() + (isEx ? ' · EX' : '');
  document.getElementById('hud-score').textContent     = '0';
  document.getElementById('hud-combo').textContent     = '';
  document.getElementById('hud-lives').textContent = '♥'.repeat(song.vidas);
  document.getElementById('hud-acc').textContent       = '';
  document.getElementById('progress-fill').style.width = '0%';

  updateLaneBarLabels();

  // ── VÍDEO DE FONS ──────────────────────────────────────────
  const vid = document.getElementById('game-video-bg');
  if (vid) {
    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    if (song.videoSrc) {
      vid.src = song.videoSrc;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.playbackRate = 1.0;
      vid.load();
      vid.play().catch(() => {});
    }
  }

  showScreen('game');
  resizeCanvas();

  if (song.audioSrc) {
    const src = isEx && song.audioSrcEx ? song.audioSrcEx : song.audioSrc;
    const aud = new Audio(src);
    aud.preload = 'auto';
    aud.volume  = 1.0;
    G.audio     = aud;

    const maxLoops = song.id === 'amigo' ? 1 : 0;
    G.loops = 0;

    function playAudio() {
      const p = aud.play();
      if (p) p.catch(err => console.warn('play blocked', err));
    }

    aud.onended = () => {
      // Audio acabat — el gameLoop detecta el fi per temps/notes
    };

    playAudio();

    const startGame = () => {
      G.running = true;
      G.animId  = requestAnimationFrame(gameLoop);
    };

    if (aud.readyState >= 2) {
      startGame();
    } else {
      aud.oncanplay = startGame;
    }
  } else {
    _startTimer(isEx);
  }
}

function updateLaneBarLabels() {
  for (let lane = 0; lane < 4; lane++) {
    const el = document.getElementById('lt' + lane);
    if (!el) continue;
    const kt = el.querySelector('.kt');
    if (!kt) continue;
    const keys = keyConfig['lane' + lane];
    const parts = (keys || []).filter(Boolean).map(k => formatKeyLabel(k));
    kt.textContent = parts.join(' / ');
  }
}

function _startTimer(isEx) {
  G.t0 = performance.now();
  G.timerMode = true;
  G.getTime   = () => (performance.now() - G.t0) / 1000;
  G.running   = true;
  G.animId    = requestAnimationFrame(gameLoop);
}


// ═══════════════════════════════════
// CONSTANTS DE DIBUIX
// ═══════════════════════════════════
function getHitY() { return canvas.height - 40; }
const HIT_ZONE_HALF = window.innerWidth <= 768 ? 75 : 55;

// Colors amb alfa per a la cua de les hold notes
const HOLD_TAIL_ALPHA = 'b3';   // ~70% opacity sobre el color de lane

// ═══════════════════════════════════
// SPAWN
// ═══════════════════════════════════
function spawnNotes(t) {
  const hitY = getHitY();
  const speed = G.speed || 340;

  while (G.noteIdx < G.notes.length) {
    const n = G.notes[G.noteIdx];
    // Per a holds, la cua comença dalt; necessitem spawn quan la capçalera
    // (o la cua, el que vingui primer) ha d'entrar en pantalla
    if (n.time - hitY / speed <= t) {
      G.activeNotes.push(n);
      G.noteIdx++;
    } else break;
  }
}

// ═══════════════════════════════════
// DRAW
// ═══════════════════════════════════
function drawGame(t) {
  if (!G || !G.activeNotes) return;

  const W    = canvas.width  || 800;
  const H    = canvas.height || 600;
  const hitY = getHitY();
  const isMobile = window.innerWidth <= 768;
  const GAP    = 8;
  const LANE_W = (W - GAP * 3) / 4;
  const NOTE_H = isMobile ? 180 : 50;
  const padding = 0;
  const speed   = Number(G.speed) || 340;

  ctx2.clearRect(0, 0, W, H);

  // LANES BACKGROUND
  for (let i = 0; i < 4; i++) {
    const lx = i * (LANE_W + GAP);
    ctx2.fillStyle = LANE_COLORS_A[i];
    ctx2.fillRect(lx, 0, LANE_W, H);
  }

  // HIT ZONE
  for (let i = 0; i < 4; i++) {
    const lx = i * (LANE_W + GAP);
    ctx2.fillStyle = 'rgba(255,255,255,0.04)';
    roundRect(ctx2, lx + padding, hitY - HIT_ZONE_HALF, LANE_W - padding * 2, HIT_ZONE_HALF * 2, 6);
    ctx2.fill();
    ctx2.strokeStyle = 'rgba(200,168,75,0.18)';
    ctx2.lineWidth = 1;
    roundRect(ctx2, lx + padding, hitY - HIT_ZONE_HALF, LANE_W - padding * 2, HIT_ZONE_HALF * 2, 6);
    ctx2.stroke();
  }

  ctx2.fillStyle = 'rgba(200,168,75,0.25)';
  ctx2.fillRect(0, hitY - 1, W, 2);

  // ── NOTES (normals i hold) ──
  const notes = G.activeNotes;
  for (let i = 0; i < notes.length; i++) {
    const n = notes[i];
    if (!n || n.hit || n.missed) continue;

    const lane = n.lane ?? 0;
    const lx   = lane * (LANE_W + GAP);
    const nx   = lx + padding;
    const nW   = LANE_W - padding * 2;

    // y de la CAPÇALERA (head) — igual que una nota normal
    const headY = hitY - (n.time - t) * speed - NOTE_H / 2;
    n._y = headY + NOTE_H / 2;   // centre de la capçalera (per hit detection)

    if (n.duration > 0) {
      // ── HOLD NOTE ──────────────────────────────────────────────
      const tailH  = n.duration * speed;                    // alçada de la cua en px
      const tailTop = headY - tailH;                        // top del rectangle de cua
      n._tailY = tailTop;

      // 1) CUA (rectangle llarg, darrere de la capçalera)
      const baseColor = LANE_COLORS[lane];
      ctx2.save();

      if (n.holdActive) {
        // La cua es va "consumint": la part consumida desapareix per baix
        const consumed    = n.holdProgress * tailH;
        const remainTop   = tailTop;
        const remainH     = tailH - consumed;

        // Fons de la cua (semitransparent)
        ctx2.fillStyle = baseColor + '55';
        roundRect(ctx2, nx + nW * 0.2, remainTop, nW * 0.6, remainH, 4);
        ctx2.fill();

        // Barra de progrés sobre la cua (color pur, s'omple cap amunt)
        ctx2.fillStyle = baseColor + 'cc';
        const progH = consumed > 0 ? Math.min(consumed, remainH) : 0;
        if (progH > 0) {
          roundRect(ctx2, nx + nW * 0.2, remainTop + remainH - progH, nW * 0.6, progH, 4);
          ctx2.fill();
        }

        // Brillantor als laterals mentre s'aguanta
        ctx2.strokeStyle = baseColor;
        ctx2.lineWidth   = 2;
        ctx2.globalAlpha = 0.6 + 0.4 * Math.abs(Math.sin(t * 6));
        roundRect(ctx2, nx + nW * 0.2, remainTop, nW * 0.6, remainH, 4);
        ctx2.stroke();
        ctx2.globalAlpha = 1;

      } else {
        // No premuda encara: dibuixa la cua completa
        ctx2.fillStyle = baseColor + '55';
        roundRect(ctx2, nx + nW * 0.2, tailTop, nW * 0.6, tailH, 4);
        ctx2.fill();

        ctx2.strokeStyle = baseColor + '99';
        ctx2.lineWidth   = 1.5;
        roundRect(ctx2, nx + nW * 0.2, tailTop, nW * 0.6, tailH, 4);
        ctx2.stroke();
      }

      ctx2.restore();

      // 2) CAPÇALERA (rectangle gruixut al top de la cua)
      ctx2.shadowColor = baseColor;
      ctx2.shadowBlur  = n.holdActive ? 22 : 14;
      ctx2.fillStyle   = baseColor;
      roundRect(ctx2, nx, headY, nW, NOTE_H, 6);
      ctx2.fill();
      ctx2.shadowBlur  = 0;

      // Indicador visual "∞" o "▼" dins la capçalera per indicar hold
      ctx2.fillStyle   = 'rgba(255,255,255,0.55)';
      ctx2.font        = `bold ${Math.round(NOTE_H * 0.45)}px sans-serif`;
      ctx2.textAlign   = 'center';
      ctx2.textBaseline = 'middle';
      ctx2.fillText('▼', nx + nW / 2, headY + NOTE_H / 2);
      ctx2.textAlign   = 'left';
      ctx2.textBaseline = 'alphabetic';

    } else {
      // ── NOTA NORMAL ────────────────────────────────────────────
      ctx2.shadowColor = LANE_COLORS[lane];
      ctx2.shadowBlur  = 14;
      ctx2.fillStyle   = LANE_COLORS[lane];
      roundRect(ctx2, nx, headY, nW, NOTE_H, 6);
      ctx2.fill();
      ctx2.shadowBlur  = 0;
    }
  }

  // ── HOLD NOTES ACTIVES: actualitza progrés i detecta fi ──
  _updateHoldNotes(t, speed, hitY, NOTE_H);

  // ── AUTO MISS ───────────────────────────────────────────────
  _checkAutoMiss(hitY);
}

// ═══════════════════════════════════
// HOLD NOTE UPDATE (cridat dins drawGame)
// ═══════════════════════════════════
function _updateHoldNotes(t, speed, hitY, NOTE_H) {
  for (const n of G.activeNotes) {
    if (!n || n.hit || n.missed || n.duration <= 0) continue;

    const holdEnd = n.time + n.duration;

    if (n.holdActive) {
      // L'usuari aguanta: actualitzem progrés
      const elapsed = t - n._holdStartTime;
      n.holdProgress = Math.min(elapsed / n.duration, 1);

      if (t >= holdEnd) {
        // ✅ COMPLETADA
        _completeHold(n);
      } else if (!G.heldLanes[n.lane]) {
        // ❌ L'usuari va soltar massa aviat → penalitzar
        n.holdReleased = true;
        n.missed       = true;
        G.missCount    = (G.missCount || 0) + 1;
        G.combo        = 0;
        G.lives        = Math.max(0, (G.lives || 0) - 1);
        updateHUD?.();
        flashLane?.(n.lane, 'miss');
        _checkGameOver();
      }
    } else {
      // No ha comencat: la capçalera ha passat la hit zone i no s'ha polsat?
      // → auto-miss si la capçalera ja és massa avall (mateix criteri que nota normal)
      // (gestionat a _checkAutoMiss)
    }
  }
}

function _completeHold(n) {
  n.hit         = true;
  n.holdActive  = false;
  G.hitCount++;
  G.combo++;
  if (G.combo > G.maxCombo) G.maxCombo = G.combo;
  // Les hold notes valen més punts (base 400 × combo)
  const pts = 400;
  G.perfectCount++;
  G.score += pts * Math.min(G.combo, 10);
  showFeedback?.(n.lane, 'HOLD!', '#a0f5c0');
  flashLane?.(n.lane, 'hit');
  updateHUD?.();
}

// ═══════════════════════════════════
// AUTO MISS (notes normals + heads de hold no premudes a temps)
// ═══════════════════════════════════
function _checkAutoMiss(hitY) {
  const notes = G.activeNotes;
  for (let i = 0; i < notes.length; i++) {
    const n = notes[i];
    if (!n || n.hit || n.missed) continue;

    if (n._y > hitY + HIT_ZONE_HALF + 30) {
      n.missed    = true;
      G.missCount = (G.missCount || 0) + 1;
      G.combo     = 0;
      G.lives     = Math.max(0, (G.lives || 0) - 1);

      updateHUD?.();
      flashLane?.(n.lane, 'miss');
      _checkGameOver();
    }
  }
}

function _checkGameOver() {
  if (G.lives <= 0 && !G.gameOverPending) {
    G.gameOverPending = true;
    G.running = false;

    if (G.animId) cancelAnimationFrame(G.animId);
    G.animId = null;

    const audRef = G.audio;
    G.audio = null;
    stopAudio?.(audRef, 0);

    const vid = document.getElementById('game-video-bg');
    if (vid) { try { vid.pause(); } catch (e) {} }

    setTimeout(() => endGame?.(), 400);
  }
}

// ═══════════════════════════════════
// INPUT — TAP / PRESS
// ═══════════════════════════════════
function tapLane(lane, e) {
  if (e) e.preventDefault();
  if (!G.running) return;

  // Marca la lane com a premuda
  G.heldLanes[lane] = true;

  const hitY = getHitY();
  let best = null, bestDist = Infinity;

  for (const n of G.activeNotes) {
    if (n.hit || n.missed || n.lane !== lane) continue;
    const dist = Math.abs(n._y - hitY);
    if (dist < bestDist) { bestDist = dist; best = n; }
  }

  if (best && bestDist <= HIT_ZONE_HALF + 20) {
    if (best.duration > 0) {
      // ── INICI D'UNA HOLD NOTE ──
      if (!best.holdActive) {
        best.holdActive    = true;
        best._holdStartTime = G.audio ? G.audio.currentTime : G.getTime?.() ?? 0;
        // Feedback visual inicial
        const col = bestDist < HIT_ZONE_HALF * 0.35 ? '#a0f5c0' : '#6ae0ff';
        showFeedback?.(lane, 'HOLD...', col);
        flashLane?.(lane, 'hit');
      }
    } else {
      // ── NOTA NORMAL ──
      best.hit = true;
      G.hitCount++;
      G.combo++;
      if (G.combo > G.maxCombo) G.maxCombo = G.combo;
      const pts = bestDist < HIT_ZONE_HALF * 0.35 ? 300 : bestDist < HIT_ZONE_HALF * 0.7 ? 200 : 100;
      if (pts === 300) G.perfectCount++; else if (pts >= 200) G.greatCount++;
      G.score += pts * Math.min(G.combo, 10);
      const label = pts === 300 ? 'PERFECT' : pts === 200 ? 'GREAT' : 'OK';
      const col   = pts === 300 ? '#f5e0a0' : pts === 200 ? '#6ae0ff' : '#ffffff';
      showFeedback?.(lane, label, col);
      flashLane?.(lane, 'hit');
      updateHUD?.();
    }
  } else {
    flashLane?.(lane, 'miss');
  }
}

// ── RELEASE de lane (teclat o touch up) ──
function releaseLane(lane) {
  G.heldLanes[lane] = false;
  // El check de release prematur es fa dins _updateHoldNotes
}

// ═══════════════════════════════════
// PAUSE / EXIT
// ═══════════════════════════════════
function togglePause() {
  if (!G.running && !G.paused) return;

  G.paused = !G.paused;
  const overlay = document.getElementById('pause-overlay');
  const btn     = document.getElementById('btn-pause');

  if (G.paused) {
    G.running = false;
    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
    if (G.audio) {
      G._pauseTime = G.audio.currentTime;
      G.audio.pause();
    }
    if (G.timerMode) G._pausedAt = performance.now();
    const vid = document.getElementById('game-video-bg');
    if (vid) vid.pause();
    overlay.classList.add('active');
    if (btn) btn.textContent = '▶';

    // Allibera totes les lanes en pausa
    G.heldLanes = { 0: false, 1: false, 2: false, 3: false };
  } else {
    overlay.classList.remove('active');
    if (btn) btn.textContent = '⏸';
    if (G.audio) G.audio.play().catch(() => {});
    if (G.timerMode && G._pausedAt) {
      G.t0 += performance.now() - G._pausedAt;
      G._pausedAt = null;
    }
    const vid = document.getElementById('game-video-bg');
    if (vid) vid.play().catch(() => {});
    G.running = true;
    G.animId  = requestAnimationFrame(gameLoop);
  }
}

function exitGame() {
  G.running = false;
  G.paused  = false;
  if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
  if (G.audio) { stopAudio(G.audio, 0); G.audio = null; }
  const vid = document.getElementById('game-video-bg');
  if (vid) { try { vid.pause(); vid.src = ''; } catch (e) {} }
  document.getElementById('pause-overlay').classList.remove('active');
  G.heldLanes = { 0: false, 1: false, 2: false, 3: false };
  buildSongGrid();
  showScreen('select');
}

// ═══════════════════════════════════
// KEYBOARD INPUT (afegeix release)
// ═══════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.repeat) return;

  if (e.code === 'Space') { e.preventDefault(); togglePause(); return; }
  if (e.code === 'Escape') { e.preventDefault(); exitGame(); return; }

  // Comprovem si la tecla correspon a alguna lane
  if (G.running) {
    for (let lane = 0; lane < 4; lane++) {
      const keys = keyConfig?.['lane' + lane] || [];
      if (keys.includes(e.code) || keys.includes(e.key)) {
        e.preventDefault();
        tapLane(lane, null);
        return;
      }
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (!G.running) return;
  for (let lane = 0; lane < 4; lane++) {
    const keys = keyConfig?.['lane' + lane] || [];
    if (keys.includes(e.code) || keys.includes(e.key)) {
      releaseLane(lane);
      return;
    }
  }
});

// ── Touch release (afegit als lane buttons en el HTML) ──
// Cridar releaseLane(lane) al touchend / mouseup dels botons de lane
// Exemple al HTML:
//   ontouchend="releaseLane(0)" onmouseup="releaseLane(0)"


// ═══════════════════════════════════
// UTILS
// ═══════════════════════════════════
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

// ═══════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════
function gameLoop() {
  if (!G.running) return;
  const t = G.timerMode ? G.getTime() : (G.audio ? G.audio.currentTime : 0);

  spawnNotes(t);
  drawGame(t);

  if (!G.running) return; // drawGame pot haver aturat el joc (game over)

  // Barra de progrés
  const dur = G.song.duration;
  document.getElementById('progress-fill').style.width = Math.min(t / dur * 100, 100) + '%';

  // ✅ Fi de nivell — per temps, per notes o per fi d'àudio
  const allSpawned  = G.noteIdx >= G.notes.length;
  const allResolved = G.activeNotes.every(n => n.hit || n.missed);
  const lastNote    = G.notes.length > 0 ? G.notes[G.notes.length - 1].time : 0;

  if (t >= dur || (allSpawned && allResolved) || t > lastNote + 1.0) {
    G.running = false;
    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
    const audRef = G.audio; G.audio = null;
    stopAudio(audRef, 0);
    const vid = document.getElementById('game-video-bg');
    if (vid) { try { vid.pause(); } catch (e) {} }
    setTimeout(() => endGame(), 300);
    return;
  }

  G.animId = requestAnimationFrame(gameLoop);
}

// ═══════════════════════════════════
// HUD
// ═══════════════════════════════════
function flashLane(lane, type) {
  const el = document.getElementById('lt' + lane);
  el.classList.add(type === 'hit' ? 'hit' : 'miss-flash');
  setTimeout(() => el.classList.remove('hit', 'miss-flash'), 130);
}

function showFeedback(lane, text, color) {
  const area     = document.getElementById('canvas-area');
  const isMobile = window.innerWidth <= 768;
  const GAP      = 8;
  const LANE_W   = (canvas.width - GAP * 3) / 4;
  const lx       = lane * (LANE_W + GAP);
  const el       = document.createElement('div');
  el.className   = 'feedback';
  el.style.color = color;
  el.style.left  = (lx + LANE_W / 2 - 40) + 'px';
  el.style.top   = (getHitY() - 70) + 'px';
  el.textContent = text;
  area.appendChild(el);
  setTimeout(() => el.remove(), 560);
}

function updateHUD() {
  document.getElementById('hud-score').textContent = G.score.toLocaleString();
  const c = document.getElementById('hud-combo');
  c.textContent = G.combo > 1 ? '×' + G.combo : '';
  c.classList.remove('pop'); void c.offsetWidth; if (G.combo > 1) c.classList.add('pop');
  document.getElementById('hud-lives').textContent = '♥'.repeat(Math.max(0, G.lives));
  const acc = G.hitCount > 0 ? Math.round(G.hitCount / (G.hitCount + G.missCount) * 100) : 100;
  document.getElementById('hud-acc').textContent = acc + '%';
}

// ═══════════════════════════════════
// END GAME
// ═══════════════════════════════════
function endGame() {
  G.running = false;
  if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
  if (G.audio)  { stopAudio(G.audio, 0); G.audio = null; }

  const hitPct   = G.totalNotes > 0 ? G.hitCount / G.totalNotes : 0;
  const stars    = hitPct >= 0.95 ? 3 : hitPct >= 0.75 ? 2 : hitPct >= 0.5 ? 1 : 0;
  const sd       = getSongData(G.song.id);
  const unlockEx = !G.isEx && stars === 3 && !sd.exUnlocked;

  setSongData(G.song.id, {
    stars:      Math.max(sd.stars, stars),
    bestScore:  Math.max(sd.bestScore, G.score),
    exUnlocked: sd.exUnlocked || unlockEx,
  });

  document.getElementById('res-song').textContent    = G.song.title.toUpperCase() + (G.isEx ? ' · EX 2×' : '');
  document.getElementById('res-score').textContent   = G.score.toLocaleString();
  document.getElementById('res-perfect').textContent = G.perfectCount;
  document.getElementById('res-great').textContent   = G.greatCount;
  document.getElementById('res-miss').textContent    = G.missCount;

  const starsEl = document.getElementById('res-stars');
  starsEl.textContent = '';
  for (let i = 1; i <= 3; i++) {
    const s = document.createElement('span');
    s.style.color = stars >= i ? '#c8a84b' : '#2a2a2a';
    s.textContent = '★';
    starsEl.appendChild(s);
  }

  const banner = document.getElementById('unlock-banner');
  if (unlockEx) {
    banner.textContent = '✦ Has desbloquejat el MODE EX 2×!';
    banner.classList.add('show');
  } else {
    banner.classList.remove('show');
  }

  // ── Banner MODE EX ──────────────────────────────────────────
  let exBanner = document.getElementById('ex-clear-banner');
  if (!exBanner) {
    exBanner = document.createElement('div');
    exBanner.id = 'ex-clear-banner';

    if (!document.getElementById('ex-banner-style')) {
      const style = document.createElement('style');
      style.id = 'ex-banner-style';
      style.textContent = `
        #ex-clear-banner {
          display: none;
          margin: 14px auto 0;
          max-width: 360px;
          padding: 14px 20px 12px;
          background: linear-gradient(135deg, rgba(200,168,75,0.12), rgba(255,200,50,0.06));
          border: 1.5px solid rgba(200,168,75,0.55);
          border-radius: 12px;
          text-align: center;
          animation: exBannerIn .45s cubic-bezier(.22,1,.36,1);
        }
        #ex-clear-banner.show { display: block; }
        @keyframes exBannerIn {
          from { opacity:0; transform: scale(.92) translateY(10px); }
          to   { opacity:1; transform: none; }
        }
        #ex-clear-banner .ex-label {
          font-family: 'Cinzel Decorative', 'Cinzel', serif;
          font-size: .72rem;
          letter-spacing: .18em;
          color: #c8a84b;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        #ex-clear-banner .ex-score-line {
          font-family: 'Titillium Web', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: .04em;
          line-height: 1.15;
        }
        #ex-clear-banner .ex-score-line span { color: #f5d06a; }
        #ex-clear-banner .ex-sub {
          font-family: 'Titillium Web', sans-serif;
          font-size: .78rem;
          color: rgba(255,255,255,0.55);
          margin-top: 5px;
        }
        #ex-clear-banner .ex-acc {
          display: inline-block;
          margin-top: 8px;
          padding: 3px 12px;
          background: rgba(200,168,75,0.15);
          border: 1px solid rgba(200,168,75,0.3);
          border-radius: 20px;
          font-family: 'Titillium Web', sans-serif;
          font-size: .8rem;
          color: #c8a84b;
          letter-spacing: .06em;
        }
        #ex-clear-banner .ex-stars {
          font-size: 1.1rem;
          margin-bottom: 4px;
          animation: exStarsPulse 1.8s ease-in-out infinite;
        }
        @keyframes exStarsPulse {
          0%,100% { text-shadow: 0 0 8px rgba(200,168,75,0.4); }
          50%      { text-shadow: 0 0 20px rgba(200,168,75,0.9); }
        }
      `;
      document.head.appendChild(style);
    }

    const unlockBanner = document.getElementById('unlock-banner');
    if (unlockBanner && unlockBanner.parentNode) {
      unlockBanner.parentNode.insertBefore(exBanner, unlockBanner.nextSibling);
    } else {
      const resScreen = document.getElementById('screen-result');
      if (resScreen) resScreen.appendChild(exBanner);
    }
  }

  if (G.isEx) {
    const acc      = G.hitCount > 0 ? Math.round(G.hitCount / (G.hitCount + G.missCount) * 100) : 100;
    const starsStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    const isRecord = G.score > (sd.bestScore || 0);

    let headline, sub;
    if (acc === 100) {
      headline = '⚡ FULL COMBO EX!';
      sub      = 'Perfecció absoluta al doble de velocitat. Increïble.';
    } else if (stars === 3) {
      headline = '⚡ EX CLEARED — 3 ESTRELLES!';
      sub      = isRecord ? '🏆 Nova puntuació rècord!' : 'Excel·lent execució en mode EX 2×.';
    } else if (stars >= 1) {
      headline = '⚡ EX COMPLETAT';
      sub      = 'Has superat el mode al doble de velocitat. Bona feina!';
    } else {
      headline = '⚡ MODE EX 2× INTENTAT';
      sub      = 'El doble de velocitat no perdona. Torna-ho a intentar!';
    }

    exBanner.innerHTML = `
      <div class="ex-stars">${starsStr}</div>
      <div class="ex-label">Mode EX · 2× Velocitat</div>
      <div class="ex-score-line">${headline}</div>
      <div class="ex-sub">${sub}</div>
      <div class="ex-acc">Precisió: ${acc}% · ${G.hitCount}/${G.totalNotes} notes</div>
    `;
    exBanner.classList.add('show');
  } else {
    exBanner.classList.remove('show');
  }

  const retryBtn = document.getElementById('btn-res-retry');
  const newSd    = getSongData(G.song.id);
  if (newSd.exUnlocked && !G.isEx) {
    retryBtn.textContent = 'MODE EX 2× ▶';
    retryBtn.onclick     = () => startSong(G.song, true);
  } else {
    retryBtn.textContent = 'TORNAR A JUGAR';
    retryBtn.onclick     = () => startSong(G.song, G.isEx);
  }

  showScreen('result');
}