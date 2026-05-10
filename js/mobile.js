// ═══════════════════════════════════════════════════════════════
// mobile.js — Fix touch per a mòbil
// ═══════════════════════════════════════════════════════════════

(function() {

  // ── CSS: elimina delay 300ms, highlight i zoom ───────────────
  const style = document.createElement('style');
  style.textContent = `
    #lane-bar, .lane-tap {
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      cursor: pointer !important;
    }
  `;
  document.head.appendChild(style);

  // ── Evita que el touch dispari tant touchstart com mousedown ──
  // (en mòbil sense aquest fix, tapLane es crida dues vegades)
  function setup() {
    const lts = [
      document.getElementById('lt0'),
      document.getElementById('lt1'),
      document.getElementById('lt2'),
      document.getElementById('lt3'),
    ];

    lts.forEach(function(el, i) {
      if (!el) return;

      // Quan hi ha touchstart, marquem que ja hem processat el toc
      // per evitar que el mousedown posterior el torni a cridar
      el.addEventListener('touchstart', function(e) {
        e.preventDefault();       // evita el mousedown sintètic i el zoom
        e.stopPropagation();      // evita que el lane-bar el capturi
        tapLane(i, null);
      }, { passive: false });

      // mousedown NOMÉS si no ve d'un toc (ratolí real)
      el.addEventListener('mousedown', function(e) {
        if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
        tapLane(i, null);
      });
    });

    // El lane-bar tenia un listener que feia preventDefault però NO cridava tapLane.
    // El sobreescrivim per no bloquejar res — els fills (lt0-lt3) ja gestionen tot.
    const laneBar = document.getElementById('lane-bar');
    if (laneBar) {
      laneBar.addEventListener('touchstart', function(e) {
        e.preventDefault(); // evita scroll/zoom sobre el lane-bar
      }, { passive: false });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // ── Viewport: evita zoom accidental (doble tap iOS) ──────────
  const meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
  }

})();