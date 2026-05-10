/* mobile.js — versió amb buttons, la més compatible */

(function () {

  var style = document.createElement('style');
style.textContent = `
#lane-bar {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 6px !important;
  padding: 10px !important;

  background: rgba(10,10,10,0.98) !important;
  border-top: 3px solid #ffd54a !important;

  position: relative !important;
  z-index: 9999 !important;
}

/* ══════════════════════════════════════
   BOTONS ULTRA VISIBLES
══════════════════════════════════════ */

.lane-tap {
  height: 88px !important;
  width: 100% !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;

  border-radius: 14px !important;

  /* 🔥 CONTRAST ALT */
  background: #ffffff !important;
  border: 3px solid #ffd54a !important;

  box-shadow:
    0 6px 18px rgba(0,0,0,0.4),
    inset 0 0 0 2px rgba(255, 213, 74, 0.25);

  user-select: none !important;
  -webkit-user-select: none !important;

  -webkit-tap-highlight-color: transparent !important;
  touch-action: manipulation !important;

  cursor: pointer !important;
}

/* 🔥 TEXT MOLT LLEGIBLE */
.lane-tap .kt {
  font-family: Arial, sans-serif !important;
  font-size: 18px !important;
  font-weight: 900 !important;

  color: #000 !important;
  opacity: 1 !important;

  text-shadow: none !important;
}

/* 🔥 QUAN TOQUES */
.lane-tap:active {
  transform: scale(0.95);
  background: #ffe27a !important;
}

/* HIT */
.lane-tap.hit {
  background: #ffd54a !important;
  color: #000 !important;
}

/* MISS */
.lane-tap.miss-flash {
  background: #ff3b3b !important;
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