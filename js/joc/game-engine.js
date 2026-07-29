// ═══════════════════════════════════
// GAME ENGINE — hold notes fixes definitius
// ═══════════════════════════════════
let G = {};
const canvas = document.getElementById('game-canvas');
const ctx2   = canvas.getContext('2d');

function resizeCanvas() {
  const area = document.getElementById('canvas-area');
  canvas.width = area.clientWidth; canvas.height = area.clientHeight;
}

function startSong(song, exMode) {
  if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
  if (G.audio)  { stopAudio(G.audio, 0); G.audio = null; }
  G.running = false;

  exMode = exMode || false;
  const sd   = getSongData(song.id);
  const isEx = exMode && sd.exUnlocked;

  G = {
    song, isEx,
    notes: (isEx ? song.notesHard : song.notesEasy).map(n => ({
      time:         n[0],
      lane:         n[1],
      duration:     n[2] || 0,
      hit:          false,
      missed:       false,
      holdActive:   false,
      holdProgress: 0,
      _holdStartT:  0,
      _y:           -9999,   // valor sentinel: MOLT negatiu = no visible encara
    })),
    noteIdx: 0, activeNotes: [],
    score: 0, combo: 0, maxCombo: 0, lives: song.vidas,
    totalNotes: 0, hitCount: 0, perfectCount: 0, greatCount: 0, missCount: 0,
    running: false, audio: null, animId: null, t0: null,
    gameOverPending: false,
    heldLanes: { 0: false, 1: false, 2: false, 3: false },
  };

  const difficulty = document.getElementById('difficulty')?.value || 'normal';
  G.speed = SPEEDS?.[difficulty] || 340;
  G.totalNotes = G.notes.length;

  document.getElementById('hud-song-name').textContent = song.title.toUpperCase() + (isEx ? ' · EX' : '');
  document.getElementById('hud-score').textContent     = '0';
  document.getElementById('hud-combo').textContent     = '';
  document.getElementById('hud-lives').textContent     = '♥'.repeat(song.vidas);
  document.getElementById('hud-acc').textContent       = '';
  document.getElementById('progress-fill').style.width = '0%';

  updateLaneBarLabels();

  const vid = document.getElementById('game-video-bg');
  if (vid) {
    vid.pause(); vid.removeAttribute('src'); vid.load();
    if (song.videoSrc) {
      vid.src = song.videoSrc; vid.muted = true; vid.loop = true;
      vid.playsInline = true; vid.load(); vid.play().catch(() => {});
    }
  }

  showScreen('game');
  resizeCanvas();

  if (song.audioSrc) {
    const src = isEx && song.audioSrcEx ? song.audioSrcEx : song.audioSrc;
    const aud = new Audio(src);
    aud.preload = 'auto'; aud.volume = 1.0;
    G.audio = aud;
    aud.onended = () => {};
    aud.play().catch(err => console.warn('play blocked', err));
    const startGame = () => { G.running = true; G.animId = requestAnimationFrame(gameLoop); };
    if (aud.readyState >= 2) startGame(); else aud.oncanplay = startGame;
  } else {
    _startTimer();
  }
}

function updateLaneBarLabels() {
  for (let lane = 0; lane < 4; lane++) {
    const el = document.getElementById('lt' + lane);
    if (!el) continue;
    const kt = el.querySelector('.kt');
    if (!kt) continue;
    const keys = keyConfig['lane' + lane];
    kt.textContent = (keys || []).filter(Boolean).map(k => formatKeyLabel(k)).join(' / ');
  }
}

function _startTimer() {
  G.t0 = performance.now();
  G.timerMode = true;
  G.getTime   = () => (performance.now() - G.t0) / 1000;
  G.running   = true;
  G.animId    = requestAnimationFrame(gameLoop);
}

function _now() {
  return G.timerMode ? G.getTime() : (G.audio ? G.audio.currentTime : 0);
}

// ═══════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════
function getHitY() { return canvas.height - 40; }
const HIT_ZONE_HALF = window.innerWidth <= 768 ? 75 : 55;

// ═══════════════════════════════════
// SPAWN — mateixa fòrmula per normals i holds
// ═══════════════════════════════════
function spawnNotes(t) {
  const hitY  = getHitY();
  const speed = G.speed || 340;
  while (G.noteIdx < G.notes.length) {
    const n = G.notes[G.noteIdx];
    // Spawn quan la CAPÇALERA ha d'entrar per dalt de pantalla
    // Per holds llargues, la cua ja és visible des que la capçalera és visible
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

  const W      = canvas.width  || 800;
  const H      = canvas.height || 600;
  const hitY   = getHitY();
  const isMob  = window.innerWidth <= 768;
  const GAP    = 8;
  const LANE_W = (W - GAP * 3) / 4;
  const NOTE_H = isMob ? 180 : 50;
  const speed  = Number(G.speed) || 340;

  ctx2.clearRect(0, 0, W, H);

  // Fons de lanes
  for (let i = 0; i < 4; i++) {
    ctx2.fillStyle = LANE_COLORS_A[i];
    ctx2.fillRect(i * (LANE_W + GAP), 0, LANE_W, H);
  }

  // Hit zone
  for (let i = 0; i < 4; i++) {
    const lx = i * (LANE_W + GAP);
    ctx2.fillStyle = 'rgba(255,255,255,0.04)';
    roundRect(ctx2, lx, hitY - HIT_ZONE_HALF, LANE_W, HIT_ZONE_HALF * 2, 6); ctx2.fill();
    ctx2.strokeStyle = 'rgba(200,168,75,0.18)'; ctx2.lineWidth = 1;
    roundRect(ctx2, lx, hitY - HIT_ZONE_HALF, LANE_W, HIT_ZONE_HALF * 2, 6); ctx2.stroke();
  }
  ctx2.fillStyle = 'rgba(200,168,75,0.25)';
  ctx2.fillRect(0, hitY - 1, W, 2);

  // ── NOTES ──
  for (let i = 0; i < G.activeNotes.length; i++) {
    const n = G.activeNotes[i];
    if (!n) continue;

    const lane  = n.lane ?? 0;
    const lx    = lane * (LANE_W + GAP);
    const color = LANE_COLORS[lane];

    // SEMPRE calculem _y, fins i tot per notes hit/missed que poden ser holds actives
    const headTop = hitY - (n.time - t) * speed - NOTE_H / 2;
    n._y = headTop + NOTE_H / 2;

    // Notes ja resoltes (no hold activa): saltem el dibuix
    if ((n.hit || n.missed) && !n.holdActive) continue;

    if (n.duration > 0) {
      // ─── HOLD NOTE ────────────────────────────────────────────

      const tailFullH = n.duration * speed;
      // La cua va DES DE la part inferior de la capçalera CAP AMUNT
      // headTop + NOTE_H = bottom de la capçalera
      // bottom - tailFullH = top de la cua
      const tailTop    = headTop + NOTE_H - tailFullH;  // top de la cua
      const tailBottom = headTop + NOTE_H;               // bottom de la cua = bottom capçalera

      if (n.hit) continue; // completada, no dibuixem

      if (n.holdActive) {
        // ── AGUANTANT ─────────────────────────────────────
        // Actualitzem progrés
        const elapsed = t - n._holdStartT;
        n.holdProgress = Math.min(elapsed / n.duration, 1);

        // Check fi
        if (n.holdProgress >= 1) { _completeHold(n); continue; }

        // Check solta prematur
        if (!G.heldLanes[lane]) { _breakHold(n); continue; }

        // Dibuix: la cua es "menja" de baix cap amunt
        // La part consumida desapareix; el que queda és des de tailTop fins a
        // (tailBottom - consumed)
        const consumed   = n.holdProgress * tailFullH;
        const remainTop  = tailTop;
        const remainH    = tailFullH - consumed;

        if (remainH > 2) {
          // Fons cua restant
          ctx2.fillStyle = color + '44';
          roundRect(ctx2, lx + LANE_W*0.25, remainTop, LANE_W*0.5, remainH, 4);
          ctx2.fill();

          // Progrés (color ple, puja des de baix)
          const progH = Math.min(consumed * 0.6, remainH * 0.5);
          if (progH > 0) {
            ctx2.fillStyle = color + 'aa';
            roundRect(ctx2, lx + LANE_W*0.25, remainTop + remainH - progH, LANE_W*0.5, progH, 4);
            ctx2.fill();
          }

          // Vora pulsant
          ctx2.strokeStyle  = color;
          ctx2.lineWidth    = 2;
          ctx2.globalAlpha  = 0.4 + 0.6 * Math.abs(Math.sin(t * 7));
          roundRect(ctx2, lx + LANE_W*0.25, remainTop, LANE_W*0.5, remainH, 4);
          ctx2.stroke();
          ctx2.globalAlpha  = 1;
        }

        // Capçalera brillant
        ctx2.shadowColor = color; ctx2.shadowBlur = 24;
        ctx2.fillStyle   = color;
        roundRect(ctx2, lx, headTop, LANE_W, NOTE_H, 6); ctx2.fill();
        ctx2.shadowBlur  = 0;

        // Indicador ●
        ctx2.fillStyle    = 'rgba(255,255,255,0.85)';
        ctx2.font         = `bold ${Math.round(NOTE_H * 0.38)}px sans-serif`;
        ctx2.textAlign    = 'center'; ctx2.textBaseline = 'middle';
        ctx2.fillText('●', lx + LANE_W/2, headTop + NOTE_H/2);
        ctx2.textAlign = 'left'; ctx2.textBaseline = 'alphabetic';

      } else if (!n.missed) {
        // ── ESPERANT SER PREMUDA ──────────────────────────
        // Dibuix cua completa (cap amunt des del bottom de la capçalera)
        if (tailFullH > 0) {
          ctx2.fillStyle = color + '33';
          roundRect(ctx2, lx + LANE_W*0.25, tailTop, LANE_W*0.5, tailFullH, 4);
          ctx2.fill();
          ctx2.strokeStyle = color + '77'; ctx2.lineWidth = 1.5;
          roundRect(ctx2, lx + LANE_W*0.25, tailTop, LANE_W*0.5, tailFullH, 4);
          ctx2.stroke();
        }

        // Capçalera
        ctx2.shadowColor = color; ctx2.shadowBlur = 14;
        ctx2.fillStyle   = color;
        roundRect(ctx2, lx, headTop, LANE_W, NOTE_H, 6); ctx2.fill();
        ctx2.shadowBlur  = 0;

        // Indicador ▼
        ctx2.fillStyle    = 'rgba(255,255,255,0.65)';
        ctx2.font         = `bold ${Math.round(NOTE_H * 0.38)}px sans-serif`;
        ctx2.textAlign    = 'center'; ctx2.textBaseline = 'middle';
        ctx2.fillText('▼', lx + LANE_W/2, headTop + NOTE_H/2);
        ctx2.textAlign = 'left'; ctx2.textBaseline = 'alphabetic';
      }

    } else {
      // ─── NOTA NORMAL ──────────────────────────────────────
      if (n.hit || n.missed) continue;
      ctx2.shadowColor = color; ctx2.shadowBlur = 14;
      ctx2.fillStyle   = color;
      roundRect(ctx2, lx, headTop, LANE_W, NOTE_H, 6); ctx2.fill();
      ctx2.shadowBlur  = 0;
    }
  }

  // ── AUTO MISS (SOLO per notes que no son hold actives) ──
  _checkAutoMiss(hitY);
}

// ═══════════════════════════════════
// HOLD HELPERS
// ═══════════════════════════════════
function _completeHold(n) {
  n.hit = true; n.holdActive = false;
  G.hitCount++; G.combo++;
  if (G.combo > G.maxCombo) G.maxCombo = G.combo;
  G.perfectCount++;
  G.score += 400 * Math.min(G.combo, 10);
  showFeedback?.(n.lane, 'HOLD!', '#a0f5c0');
  flashLane?.(n.lane, 'hit');
  updateHUD?.();
}

function _breakHold(n) {
  n.missed = true; n.holdActive = false;
  G.missCount++; G.combo = 0;
  G.lives = Math.max(0, G.lives - 1);
  showFeedback?.(n.lane, 'BREAK', '#ff6b6b');
  flashLane?.(n.lane, 'miss');
  updateHUD?.();
  _checkGameOver();
}

// ═══════════════════════════════════
// AUTO MISS — MAI per holds actives o per _y molt negatiu (no visible)
// ═══════════════════════════════════
function _checkAutoMiss(hitY) {
  for (const n of G.activeNotes) {
    if (!n || n.hit || n.missed || n.holdActive) continue;
    // Només miss si la nota és visible i ha baixat prou per sota de la hit zone
    if (n._y > hitY + HIT_ZONE_HALF + 30 && n._y < 9000) {
      n.missed = true;
      G.missCount++; G.combo = 0;
      G.lives = Math.max(0, G.lives - 1);
      updateHUD?.(); flashLane?.(n.lane, 'miss');
      _checkGameOver();
    }
  }
}

function _checkGameOver() {
  if (G.lives <= 0 && !G.gameOverPending) {
    G.gameOverPending = true; G.running = false;
    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
    const audRef = G.audio; G.audio = null; stopAudio?.(audRef, 0);
    const vid = document.getElementById('game-video-bg');
    if (vid) { try { vid.pause(); } catch (e) {} }
    setTimeout(() => endGame?.(), 400);
  }
}

// ═══════════════════════════════════
// INPUT
// ═══════════════════════════════════
function tapLane(lane, e) {
  if (e) e.preventDefault();
  if (!G.running) return;
  G.heldLanes[lane] = true;

  const hitY = getHitY();
  let best = null, bestDist = Infinity;
  for (const n of G.activeNotes) {
    if (n.hit || n.missed || n.lane !== lane) continue;
    if (n._y < -500) continue; // no visible encara
    const dist = Math.abs(n._y - hitY);
    if (dist < bestDist) { bestDist = dist; best = n; }
  }

  if (best && bestDist <= HIT_ZONE_HALF + 20) {
    if (best.duration > 0) {
      if (!best.holdActive) {
        best.holdActive  = true;
        best._holdStartT = _now();
        best.holdProgress = 0;
        const col = bestDist < HIT_ZONE_HALF * 0.35 ? '#a0f5c0' : '#6ae0ff';
        showFeedback?.(lane, 'HOLD...', col);
        flashLane?.(lane, 'hit');
      }
    } else {
      best.hit = true;
      G.hitCount++; G.combo++;
      if (G.combo > G.maxCombo) G.maxCombo = G.combo;
      const pts = bestDist < HIT_ZONE_HALF * 0.35 ? 300 : bestDist < HIT_ZONE_HALF * 0.7 ? 200 : 100;
      if (pts === 300) G.perfectCount++; else if (pts >= 200) G.greatCount++;
      G.score += pts * Math.min(G.combo, 10);
      showFeedback?.(lane, pts===300?'PERFECT':pts===200?'GREAT':'OK',
                     pts===300?'#f5e0a0':pts===200?'#6ae0ff':'#ffffff');
      flashLane?.(lane, 'hit');
      updateHUD?.();
    }
  } else {
    flashLane?.(lane, 'miss');
  }
}

function releaseLane(lane) {
  G.heldLanes[lane] = false;
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
    if (G.audio) { G._pauseTime = G.audio.currentTime; G.audio.pause(); }
    if (G.timerMode) G._pausedAt = performance.now();
    document.getElementById('game-video-bg')?.pause?.();
    overlay.classList.add('active');
    if (btn) btn.textContent = '▶';
    G.heldLanes = { 0: false, 1: false, 2: false, 3: false };
  } else {
    overlay.classList.remove('active');
    if (btn) btn.textContent = '⏸';
    G.audio?.play().catch(() => {});
    if (G.timerMode && G._pausedAt) { G.t0 += performance.now() - G._pausedAt; G._pausedAt = null; }
    const vid = document.getElementById('game-video-bg');
    if (vid) vid.play?.().catch(() => {});
    G.running = true;
    G.animId  = requestAnimationFrame(gameLoop);
  }
}

function exitGame() {
  G.running = false; G.paused = false;
  if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
  if (G.audio)  { stopAudio(G.audio, 0); G.audio = null; }
  const vid = document.getElementById('game-video-bg');
  if (vid) { try { vid.pause(); vid.src = ''; } catch (e) {} }
  document.getElementById('pause-overlay').classList.remove('active');
  G.heldLanes = { 0: false, 1: false, 2: false, 3: false };
  buildSongGrid(); showScreen('select');
}

// ═══════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════
document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (e.code === 'Space')  { e.preventDefault(); togglePause(); return; }
  if (e.code === 'Escape') { e.preventDefault(); exitGame(); return; }
  if (!G.running) return;
  for (let lane = 0; lane < 4; lane++) {
    const keys = keyConfig?.['lane' + lane] || [];
    if (keys.includes(e.code) || keys.includes(e.key)) {
      e.preventDefault(); tapLane(lane, null); return;
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (!G.running) return;
  for (let lane = 0; lane < 4; lane++) {
    const keys = keyConfig?.['lane' + lane] || [];
    if (keys.includes(e.code) || keys.includes(e.key)) { releaseLane(lane); return; }
  }
});

// ═══════════════════════════════════
// UTILS
// ═══════════════════════════════════
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

// ═══════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════
function gameLoop() {
  if (!G.running) return;
  const t = _now();

  spawnNotes(t);
  drawGame(t);

  if (!G.running) return;

  const dur = G.song.duration;
  document.getElementById('progress-fill').style.width = Math.min(t / dur * 100, 100) + '%';

  const allSpawned  = G.noteIdx >= G.notes.length;
  const allResolved = G.activeNotes.every(n => n.hit || n.missed);
  const lastNote    = G.notes.length > 0 ? G.notes[G.notes.length - 1].time : 0;

  if (t >= dur || (allSpawned && allResolved) || t > lastNote + 1.5) {
    G.running = false;
    if (G.animId) { cancelAnimationFrame(G.animId); G.animId = null; }
    const audRef = G.audio; G.audio = null; stopAudio(audRef, 0);
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
  if (!el) return;
  el.classList.add(type === 'hit' ? 'hit' : 'miss-flash');
  setTimeout(() => el.classList.remove('hit', 'miss-flash'), 130);
}

function showFeedback(lane, text, color) {
  const GAP    = 8;
  const LANE_W = (canvas.width - GAP * 3) / 4;
  const el     = document.createElement('div');
  el.className = 'feedback'; el.style.color = color;
  el.style.left = (lane * (LANE_W + GAP) + LANE_W/2 - 40) + 'px';
  el.style.top  = (getHitY() - 70) + 'px';
  el.textContent = text;
  document.getElementById('canvas-area').appendChild(el);
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
    s.textContent = '★'; starsEl.appendChild(s);
  }

  const banner = document.getElementById('unlock-banner');
  if (unlockEx) { banner.textContent = '✦ Has desbloquejat el MODE EX 2×!'; banner.classList.add('show'); }
  else banner.classList.remove('show');

  let exBanner = document.getElementById('ex-clear-banner');
  if (!exBanner) {
    exBanner = document.createElement('div');
    exBanner.id = 'ex-clear-banner';
    if (!document.getElementById('ex-banner-style')) {
      const style = document.createElement('style');
      style.id = 'ex-banner-style';
      style.textContent = `
        #ex-clear-banner{display:none;margin:14px auto 0;max-width:360px;padding:14px 20px 12px;
          background:linear-gradient(135deg,rgba(200,168,75,0.12),rgba(255,200,50,0.06));
          border:1.5px solid rgba(200,168,75,0.55);border-radius:12px;text-align:center;
          animation:exBannerIn .45s cubic-bezier(.22,1,.36,1)}
        #ex-clear-banner.show{display:block}
        @keyframes exBannerIn{from{opacity:0;transform:scale(.92) translateY(10px)}to{opacity:1;transform:none}}
        #ex-clear-banner .ex-label{font-family:'Cinzel Decorative','Cinzel',serif;font-size:.72rem;
          letter-spacing:.18em;color:#c8a84b;text-transform:uppercase;margin-bottom:5px}
        #ex-clear-banner .ex-score-line{font-family:'Titillium Web',sans-serif;font-size:1.45rem;
          font-weight:700;color:#fff;letter-spacing:.04em;line-height:1.15}
        #ex-clear-banner .ex-score-line span{color:#f5d06a}
        #ex-clear-banner .ex-sub{font-family:'Titillium Web',sans-serif;font-size:.78rem;
          color:rgba(255,255,255,0.55);margin-top:5px}
        #ex-clear-banner .ex-acc{display:inline-block;margin-top:8px;padding:3px 12px;
          background:rgba(200,168,75,0.15);border:1px solid rgba(200,168,75,0.3);border-radius:20px;
          font-family:'Titillium Web',sans-serif;font-size:.8rem;color:#c8a84b;letter-spacing:.06em}
        #ex-clear-banner .ex-stars{font-size:1.1rem;margin-bottom:4px;
          animation:exStarsPulse 1.8s ease-in-out infinite}
        @keyframes exStarsPulse{0%,100%{text-shadow:0 0 8px rgba(200,168,75,0.4)}
          50%{text-shadow:0 0 20px rgba(200,168,75,0.9)}}`;
      document.head.appendChild(style);
    }
    const unlockBanner = document.getElementById('unlock-banner');
    if (unlockBanner?.parentNode) unlockBanner.parentNode.insertBefore(exBanner, unlockBanner.nextSibling);
    else document.getElementById('screen-result')?.appendChild(exBanner);
  }

  if (G.isEx) {
    const acc      = G.hitCount > 0 ? Math.round(G.hitCount / (G.hitCount + G.missCount) * 100) : 100;
    const starsStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    const isRecord = G.score > (sd.bestScore || 0);
    const headline = acc===100?'⚡ FULL COMBO EX!':stars===3?'⚡ EX CLEARED — 3 ESTRELLES!':stars>=1?'⚡ EX COMPLETAT':'⚡ MODE EX 2× INTENTAT';
    const sub      = acc===100?'Perfecció absoluta al doble de velocitat. Increïble.':stars===3?(isRecord?'🏆 Nova puntuació rècord!':'Excel·lent execució en mode EX 2×.'):stars>=1?'Has superat el mode al doble de velocitat. Bona feina!':'El doble de velocitat no perdona. Torna-ho a intentar!';
    exBanner.innerHTML = `<div class="ex-stars">${starsStr}</div><div class="ex-label">Mode EX · 2× Velocitat</div><div class="ex-score-line">${headline}</div><div class="ex-sub">${sub}</div><div class="ex-acc">Precisió: ${acc}% · ${G.hitCount}/${G.totalNotes} notes</div>`;
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