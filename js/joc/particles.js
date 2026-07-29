// ═══════════════════════════════════
// TITLE SCREEN — PARTICLES + CONFETTI
// ═══════════════════════════════════
(function initParticles() {
  const c = document.getElementById('title-particles');
  const ctx = c.getContext('2d');
  let W, H, pts = [], confetti = [];
  const CONFETTI_COLORS = ['#c8a84b','#e8002d','#1a3a6e','#006633','#fff','#ff8800'];

  function resize() {
    W = c.width  = c.offsetWidth  || 680;
    H = c.height = c.offsetHeight || 620;
    pts = Array.from({length: 50}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
      r: Math.random()*1.5+0.5, a: Math.random()*0.6+0.1
    }));
    confetti = Array.from({length: 35}, () => ({
      x: Math.random()*W, y: Math.random()*H - H,
      vx: (Math.random()-0.5)*1.2, vy: Math.random()*1.8+0.8,
      rot: Math.random()*360, drot: (Math.random()-0.5)*4,
      col: CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)],
      w: 5 + Math.random()*8, h: 3 + Math.random()*5
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,168,75,${p.a})`; ctx.fill();
    }
    for (const piece of confetti) {
      piece.x += piece.vx; piece.y += piece.vy; piece.rot += piece.drot;
      if (piece.y > H + 20) { piece.y = -20; piece.x = Math.random() * W; }
      ctx.save(); ctx.translate(piece.x, piece.y); ctx.rotate(piece.rot * Math.PI / 180);
      ctx.fillStyle = piece.col + 'bb';
      ctx.fillRect(-piece.w/2, -piece.h/2, piece.w, piece.h); ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();