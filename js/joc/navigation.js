// ═══════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════
document.getElementById('btn-play').addEventListener('click', ()=>{ buildSongGrid(); showScreen('select'); });
document.getElementById('btn-config').addEventListener('click', ()=>{ buildConfigScreen(); showScreen('config'); });
document.getElementById('btn-back-select').addEventListener('click', ()=>showScreen('title'));
document.getElementById('btn-back-config').addEventListener('click', ()=>showScreen('title'));
document.getElementById('btn-reset-keys').addEventListener('click', ()=>{
  keyConfig = JSON.parse(JSON.stringify(DEFAULT_KEYS));
  saveKeyConfig(keyConfig);
  KEY_MAP = buildKeyMap();
  buildConfigScreen();
});
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.cat;

    // UI active state
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // rebuild grid
    buildSongGrid();
  });
});
document.getElementById('btn-res-menu').addEventListener('click', ()=>{ buildSongGrid(); showScreen('select'); });
document.getElementById('btn-res-retry').addEventListener('click', ()=>startSong(G.song,G.isEx));
window.addEventListener('resize', ()=>{ if(document.getElementById('screen-game').classList.contains('active')) resizeCanvas(); });

// Initialize lane bar labels on load
updateLaneBarLabels();