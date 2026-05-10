/* mobile.js — versió amb buttons, la més compatible */

(function () {

  var style = document.createElement('style');
  style.textContent = `
    #lane-bar {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 2px !important;
      padding: 2px !important;
      background: rgba(0,0,0,0.92) !important;
      border-top: 1px solid rgba(200,168,75,0.15) !important;
      position: relative !important;
      z-index: 999 !important;
    }
    .lane-tap {
      height: 90px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 3px !important;
      background: rgba(200,168,75,0.04) !important;
      border: 1px solid rgba(200,168,75,0.06) !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      cursor: pointer !important;
      padding: 0 !important;
      margin: 0 !important;
      width: 100% !important;
      box-sizing: border-box !important;
      -webkit-appearance: none !important;
      appearance: none !important;
      outline: none !important;
    }
    .lane-tap .kt {
      font-family: 'Cinzel', serif;
      font-size: 10px;
      color: rgba(200,168,75,0.3);
      letter-spacing: 1px;
      pointer-events: none;
    }
    .lane-tap.hit {
      background: rgba(200,168,75,0.3) !important;
      border-color: rgba(200,168,75,0.5) !important;
    }
    .lane-tap.miss-flash {
      background: rgba(180,20,20,0.25) !important;
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