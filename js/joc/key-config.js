// ═══════════════════════════════════
// KEY CONFIG — persistent via localStorage
// ═══════════════════════════════════
const DEFAULT_KEYS = {
  lane0: ['a', 'ArrowLeft'],
  lane1: ['s', 'ArrowDown'],
  lane2: ['d', 'ArrowRight'],
  lane3: ['w', 'ArrowUp'],
};


const DEFAULT_SPEEDS = {
  easy: 260,
  normal: 340,
  hard: 420
};

function loadSpeed() {
  try {
    return JSON.parse(localStorage.getItem('santes_speed') || 'null') || DEFAULT_SPEEDS;
  } catch (e) {
    return DEFAULT_SPEEDS;
  }
}

function saveSpeed(cfg) {
  try {
    localStorage.setItem('santes_speed', JSON.stringify(cfg));
  } catch (e) {}
}

let SPEEDS = loadSpeed();

function loadKeyConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem('santes_keys') || 'null');
    if (saved && saved.lane0 && saved.lane1 && saved.lane2 && saved.lane3) return saved;
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_KEYS));
}

function saveKeyConfig(cfg) {
  try { localStorage.setItem('santes_keys', JSON.stringify(cfg)); } catch(e) {}
}

let keyConfig = loadKeyConfig();

// Build dynamic KEY_MAP from keyConfig
function buildKeyMap() {
  const map = {};
  for (let lane = 0; lane < 4; lane++) {
    const keys = keyConfig['lane' + lane];
    if (Array.isArray(keys)) {
      keys.forEach(k => { if (k) map[k] = lane; });
    }
  }
  return map;
}
let KEY_MAP = buildKeyMap();