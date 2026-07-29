// ═══════════════════════════════════
// CONFIG SCREEN — KEY BINDING
// ═══════════════════════════════════
const LANE_LABELS = ['← (Esquerra)', '↓ (Centre)', '→ (Centre)', '↑ (Dreta)'];
let listeningLane = null;
let listeningSlot = null; // 0 or 1 (primary / secondary)

function buildConfigScreen() {
  const container = document.getElementById('config-keys-container');
  container.innerHTML = '';
  for (let lane = 0; lane < 4; lane++) {
    const keys = keyConfig['lane' + lane];
    const row = document.createElement('div');
    row.className = 'config-row';
    row.style.borderLeft = `3px solid ${LANE_COLORS[lane]}`;

    const label = document.createElement('div');
    label.className = 'config-lane-label';
    label.textContent = LANE_LABELS[lane];

    const keysDiv = document.createElement('div');
    keysDiv.className = 'config-keys';

    for (let slot = 0; slot < 2; slot++) {
      const btn = document.createElement('button');
      btn.className = 'config-key-btn';
      btn.id = `cfg-btn-${lane}-${slot}`;
      btn.textContent = formatKeyLabel(keys[slot] || '—');
      btn.addEventListener('click', () => startListening(lane, slot));
      keysDiv.appendChild(btn);
    }

    row.appendChild(label);
    row.appendChild(keysDiv);
    container.appendChild(row);
  }
  updateConfigLaneBar();
}

function formatKeyLabel(key) {
  if (!key) return '—';
  const map = {
    'ArrowLeft': '← Fletxa', 'ArrowRight': '→ Fletxa',
    'ArrowUp': '↑ Fletxa', 'ArrowDown': '↓ Fletxa',
    ' ': 'Espai'
  };
  return map[key] || key.toUpperCase();
}

function updateConfigLaneBar() {
  for (let lane = 0; lane < 4; lane++) {
    const el = document.getElementById(`cfg-lane-label-${lane}`);
    if (el) {
      const keys = keyConfig['lane' + lane];
      const parts = keys.filter(Boolean).map(k => formatKeyLabel(k));
      el.textContent = parts.join(' / ');
    }
  }
}

function startListening(lane, slot) {
  if (listeningLane !== null) {
    // cancel previous
    const prevBtn = document.getElementById(`cfg-btn-${listeningLane}-${listeningSlot}`);
    if (prevBtn) { prevBtn.classList.remove('listening'); prevBtn.textContent = formatKeyLabel(keyConfig['lane'+listeningLane][listeningSlot] || '—'); }
  }
  listeningLane = lane;
  listeningSlot = slot;
  const btn = document.getElementById(`cfg-btn-${lane}-${slot}`);
  btn.classList.add('listening');
  btn.textContent = '...';
}

function handleConfigKey(e) {
  if (listeningLane === null) return;
  e.preventDefault();
  e.stopPropagation();

  const key = e.key;
  // Escape cancels
  if (key === 'Escape') {
    const btn = document.getElementById(`cfg-btn-${listeningLane}-${listeningSlot}`);
    if (btn) { btn.classList.remove('listening'); btn.textContent = formatKeyLabel(keyConfig['lane'+listeningLane][listeningSlot] || '—'); }
    listeningLane = null; listeningSlot = null;
    return;
  }

  // Remove this key from any other lane/slot to avoid conflicts
  for (let l = 0; l < 4; l++) {
    keyConfig['lane' + l] = keyConfig['lane' + l].map(k => (k === key && !(l === listeningLane && keyConfig['lane'+l].indexOf(k) === listeningSlot)) ? '' : k);
  }

  keyConfig['lane' + listeningLane][listeningSlot] = key;
  saveKeyConfig(keyConfig);
  KEY_MAP = buildKeyMap();

  const btn = document.getElementById(`cfg-btn-${listeningLane}-${listeningSlot}`);
  if (btn) { btn.classList.remove('listening'); btn.textContent = formatKeyLabel(key); }

  // Refresh all buttons to reflect cleared conflicts
  buildConfigScreen();
  listeningLane = null; listeningSlot = null;
}

document.addEventListener('keydown', e => {
  if (document.getElementById('screen-config').classList.contains('active')) {
    handleConfigKey(e);
    return;
  }
  if (keysHeld.has(e.key)) return; keysHeld.add(e.key);
  const lane = KEY_MAP[e.key];
  if (lane !== undefined) { e.preventDefault(); tapLane(lane, null); }
});