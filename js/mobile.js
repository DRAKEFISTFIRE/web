/* mobile.js — fix touch definitiu */

(function () {

  /* CSS mínim — només el necessari */
  var s = document.createElement('style');
  s.textContent = `
    .lane-tap {
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      -webkit-user-select: none !important;
    }
  `;
  document.head.appendChild(s);

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

        /* Elimina atributs inline que passen event i causen problemes */
        el.removeAttribute('ontouchstart');
        el.removeAttribute('onmousedown');

        /* Touch directe — sense passar event a tapLane */
        el.addEventListener('touchstart', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof tapLane === 'function') tapLane(lane, null);
        }, { passive: false });

        /* Mouse — desktop */
        el.addEventListener('mousedown', function(e) {
          if (typeof tapLane === 'function') tapLane(lane, null);
        });

      })(i);
    }

    /* Lane-bar: només prevenim scroll, no bloquegem fills */
    var lb = document.getElementById('lane-bar');
    if (lb) {
      /* Elimina el listener original que bloquejava tot */
      var newLb = lb.cloneNode(true);
      lb.parentNode.replaceChild(newLb, lb);

      /* Tornem a posar listeners als fills perquè cloneNode els perd */
      for (var i = 0; i < 4; i++) {
        (function(lane) {
          var el = document.getElementById('lt' + lane);
          if (!el) return;
          el.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof tapLane === 'function') tapLane(lane, null);
          }, { passive: false });
          el.addEventListener('mousedown', function(e) {
            if (typeof tapLane === 'function') tapLane(lane, null);
          });
        })(i);
      }
    }
  }

  /* Esperem que joc.js hagi carregat i el DOM estigui llest */
  window.addEventListener('load', setup);

})();