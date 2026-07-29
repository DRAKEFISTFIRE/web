// ═══════════════════════════════════
// PROGRESS
// ═══════════════════════════════════
let _memProgress = {};
function getProgress() {
  try { return JSON.parse(localStorage.getItem('santes_progress') || '{}'); } catch(e) { return _memProgress; }
}
function saveProgress(data) {
  _memProgress = data;
  try { localStorage.setItem('santes_progress', JSON.stringify(data)); } catch(e) {}
}

function getSongData(id) {
  const p = getProgress();
  return p[id] || { stars: 0, bestScore: 0, exUnlocked: false };
}
function setSongData(id, data) {
  const p = getProgress();
  p[id] = { ...getSongData(id), ...data };
  saveProgress(p);
}