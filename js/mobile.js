// ═══════════════════════════════════════════════════════════════
// MOBILE TOUCH PATCH
// Afegeix suport complet de touch/click als 4 carrils del joc.
// Inclou al final del fitxer principal (o en un script separat
// carregat DESPRÉS del fitxer principal).
// ═══════════════════════════════════════════════════════════════

(function initMobileTouch() {

  // ── 1. Elimina el delay de 300ms del navegador ──────────────
  // El meta viewport amb touch-action ja ho sol fer, però forcem
  // el fast-tap afegint touch-action:manipulation als carrils.
  const style = document.createElement('style');
  style.textContent = `
    #lane-bar,
    #lt0, #lt1, #lt2, #lt3 {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      -webkit-user-select: none;
    }
  `;
  document.head.appendChild(style);

  // ── 2. Registra listeners per a cada carril ─────────────────
  // Usem touchstart (no touchend) per màxima resposta.
  // preventDefault() evita que el navegador generi el click
  // sintètic (i el doble-tap zoom) sense bloquejar el scroll.
  function attachLane(laneEl, laneIdx) {
    if (!laneEl) return;

    // TOUCH — resposta immediata sense esperar touchend
    laneEl.addEventListener('touchstart', function(e) {
      e.preventDefault();          // evita el click sintètic de 300ms
      tapLane(laneIdx, null);
    }, { passive: false });

    // POINTER (pen/stylus en tauletes amb llapis)
    laneEl.addEventListener('pointerdown', function(e) {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        e.preventDefault();
        tapLane(laneIdx, null);
      }
    }, { passive: false });

    // CLICK — fallback per a ratolí i navegadors sense touch
    laneEl.addEventListener('click', function(e) {
      tapLane(laneIdx, null);
    });
  }

  // Esperem que el DOM estigui llest (per si s'inclou al <head>)
  function setup() {
    attachLane(document.getElementById('lt0'), 0);
    attachLane(document.getElementById('lt1'), 1);
    attachLane(document.getElementById('lt2'), 2);
    attachLane(document.getElementById('lt3'), 3);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // ── 3. Elimina el listener de touchstart del lane-bar ────────
  // El fitxer principal tenia: lane-bar.touchstart → preventDefault
  // Això és correcte però aquí fem el mateix per cada carril
  // individualment, que és més precís. No cal canviar res més.

  // ── 4. Prevenció de zoom accidental en doble tap ─────────────
  // En iOS Safari el doble tap pot fer zoom; touch-action:manipulation
  // ja ho evita, però afegim meta si no existeix.
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name    = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(meta);
  }

})();