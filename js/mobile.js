/* mobile.js — versió amb buttons, la més compatible */

(function () {

  var style = document.createElement('style');
style.textContent = `
#lane-bar {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 6px !important;
  padding: 8px !important;

  background: #0d0d0d !important;
  border-top: 3px solid #ffd54a !important;

  position: relative !important;
  z-index: 999 !important;
}

/* ══════════════════════════════════════
   BOTONS MÒBIL — MOLT VISIBLES
══════════════════════════════════════ */

.lane-tap {
  height: 92px !important;

  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;

  border-radius: 12px !important;

  /* 🔥 ALTA VISIBILITAT */
  background: #ffffff !important;
  border: 3px solid #ffd54a !important;

  box-shadow:
    0 6px 16px rgba(0,0,0,0.35),
    inset 0 0 0 2px rgba(255, 213, 74, 0.25);

  touch-action: manipulation !important;
  -webkit-tap-highlight-color: transparent !important;

  user-select: none !important;
  -webkit-user-select: none !important;

  cursor: pointer !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

/* TEXT CLAR I LLEGIBLE */
.lane-tap .kt {
  font-family: 'Arial', sans-serif !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  color: #111 !important;
  letter-spacing: 1px;
  opacity: 1 !important;
}

/* EFECTE TOC */
.lane-tap:active {
  transform: scale(0.94);
  background: #ffe27a !important;
}

/* HIT FEEDBACK */
.lane-tap.hit {
  background: #ffd54a !important;
  border-color: #ffcc00 !important;
  transform: scale(0.95);
}

/* MISS FEEDBACK */
.lane-tap.miss-flash {
  background: #ff4d4d !important;
  border-color: #ff1a1a !important;
}
`;
  document.head.appendChild(style);

  /* Fix viewport */
  var meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute('content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  }

  function setup() {
    for (var i = 0; i < 4; i++) {
      (function(lane) {
        var el = document.getElementById('lt' + lane);
        if (!el) return;

        /* Si és un div, convertim-lo en button */
        if (el.tagName.toLowerCase() === 'div') {
          var btn = document.createElement('button');
          btn.id = 'lt' + lane;
          btn.type = 'button';
          btn.className = el.className;
          btn.innerHTML = el.innerHTML;
          el.parentNode.replaceChild(btn, el);
          el = btn;
        }

        /* Elimina atributs inline */
        el.removeAttribute('ontouchstart');
        el.removeAttribute('onmousedown');
        el.removeAttribute('onclick');

        /* Un únic listener de click — funciona en TOTS els dispositius */
        el.addEventListener('click', function(e) {
          e.preventDefault();
          if (typeof tapLane === 'function') tapLane(lane, null);
        });

        /* Touch addicional per resposta immediata */
        el.addEventListener('touchstart', function(e) {
          e.preventDefault();
          if (typeof tapLane === 'function') tapLane(lane, null);
        }, { passive: false });

      })(i);
    }
  }

  window.addEventListener('load', setup);

})();