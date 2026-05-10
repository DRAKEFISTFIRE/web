/* ═══════════════════════════════════════════════════════════════
   mobile.js — Touch fix definitiu
   Es carrega ABANS de joc.js, per això usem DOMContentLoaded
   i un wrapper que espera que tapLane existeixi
═══════════════════════════════════════════════════════════════ */

(function () {

  /* ── 1. Injecta CSS crític ────────────────────────────────── */
  var s = document.createElement('style');
  s.textContent = [
    '#lane-bar    { pointer-events: auto !important; z-index: 50 !important; position: relative !important; }',
    '.lane-tap    { pointer-events: auto !important; cursor: pointer !important;',
    '              touch-action: manipulation !important;',
    '              -webkit-tap-highlight-color: transparent !important;',
    '              user-select: none !important; -webkit-user-select: none !important; }',
    '#canvas-area  { pointer-events: none !important; }',
    '#game-overlay { pointer-events: none !important; }',
    '#game-video-bg{ pointer-events: none !important; }'
  ].join('\n');
  document.head.appendChild(s);

  /* ── 2. Wrapper segur per cridar tapLane ──────────────────── */
  function safeTap(lane, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof tapLane === 'function') {
      tapLane(lane, null);
    }
  }

  /* ── 3. Afegeix listeners als 4 carrils ───────────────────── */
  function setup() {
    for (var i = 0; i < 4; i++) {
      (function (lane) {
        var el = document.getElementById('lt' + lane);
        if (!el) return;

        /* Eliminem els atributs inline per evitar doble crida */
        el.removeAttribute('ontouchstart');
        el.removeAttribute('onmousedown');

        /* touchstart — immediat, sense delay */
        el.addEventListener('touchstart', function (e) {
          safeTap(lane, e);
        }, { passive: false });

        /* mousedown — per ratolí (desktop) */
        el.addEventListener('mousedown', function (e) {
          safeTap(lane, e);
        });

      })(i);
    }

    /* Lane-bar: evita scroll/zoom però no bloqueja fills */
    var lb = document.getElementById('lane-bar');
    if (lb) {
      lb.addEventListener('touchstart', function (e) {
        e.preventDefault();
      }, { passive: false });
    }
  }

  /* Esperem que el DOM estigui llest */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  /* ── 4. Fix viewport (evita zoom doble-tap iOS) ───────────── */
  var meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute('content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  }

})();