/* mobile.js — versió amb buttons, la més compatible */

(function () {

  var style = document.createElement('style');
style.textContent = `
/* ══════════════════════════════════════
   LANE BAR (COHERENTE CON EL TEMA)
══════════════════════════════════════ */

#lane-bar {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 6px !important;
  padding: 10px !important;

  background: rgba(0,0,0,0.95) !important;
  border-top: 2px solid #c8a84b !important;

  position: relative !important;
  z-index: 9999 !important;
}

/* BOTONES DE CARRIL */
.lane-tap {
  height: 86px !important;
  width: 100% !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;

  border-radius: 10px !important;

  /* estilo oscuro elegante */
  background: linear-gradient(145deg, #0e0c0a, #060504) !important;
  border: 1px solid rgba(200,168,75,0.25) !important;

  box-shadow:
    inset 0 0 10px rgba(0,0,0,0.6),
    0 6px 20px rgba(0,0,0,0.4);

  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
  touch-action: manipulation !important;

  transition: all 0.15s ease !important;
}

/* TEXTO TECLA */
.lane-tap .kt {
  font-family: 'Cinzel', serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;

  color: rgba(200,168,75,0.6) !important;
}

/* HOVER SUAVE */
.lane-tap:hover {
  transform: translateY(-2px);
  border-color: #c8a84b !important;
  box-shadow:
    0 10px 25px rgba(0,0,0,0.5),
    0 0 12px rgba(200,168,75,0.15);
}

/* CLICK */
.lane-tap:active {
  transform: scale(0.96);
  background: rgba(200,168,75,0.12) !important;
}

/* HIT */
.lane-tap.hit {
  background: rgba(200,168,75,0.25) !important;
  border-color: #c8a84b !important;
  box-shadow: 0 0 18px rgba(200,168,75,0.4);
}

/* MISS */
.lane-tap.miss-flash {
  background: rgba(180,20,20,0.25) !important;
  border-color: rgba(255,80,80,0.6) !important;
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