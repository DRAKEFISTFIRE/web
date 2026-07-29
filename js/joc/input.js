// ═══════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════
const keysHeld = new Set();
// keydown is defined in config-screen.js (after CONFIG SCREEN section) to handle config first
document.addEventListener('keyup', e => keysHeld.delete(e.key));
document.getElementById('lane-bar').addEventListener('touchstart', function(e) {
  e.preventDefault();
  var rect = e.currentTarget.getBoundingClientRect();
  Array.from(e.changedTouches).forEach(function(t) {
    var x = t.clientX - rect.left;
    var lane = Math.min(3, Math.max(0, Math.floor(x / rect.width * 4)));
    tapLane(lane, null);
  });
}, { passive: false });