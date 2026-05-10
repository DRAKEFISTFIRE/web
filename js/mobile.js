/* mobile.js — versió mínima i directa */

(function () {

  var style = document.createElement('style');
  style.textContent = `
    /* Assegura que res bloqueja el lane-bar */
    #screen-game {
      position: relative;
    }
    #game-video-bg {
      pointer-events: none !important;
      z-index: 0 !important;
    }
    #game-overlay {
      pointer-events: none !important;
      z-index: 1 !important;
    }
    .game-ui {
      position: relative;
      z-index: 10 !important;
      pointer-events: none;
    }
    #game-hud {
      pointer-events: none;
    }
    #progress-bar {
      pointer-events: none;
    }
    #canvas-area {
      pointer-events: none !important;
    }
    #lane-bar {
      pointer-events: auto !important;
      position: relative !important;
      z-index: 100 !important;
    }
    .lane-tap {
      pointer-events: auto !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      cursor: pointer !important;
      user-select: none !important;
      -webkit-user-select: none !important;
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
    /* Eliminem els atributs inline antics */
    for (var i = 0; i < 4; i++) {
      var el = document.getElementById('lt' + i);
      if (!el) continue;
      el.removeAttribute('ontouchstart');
      el.removeAttribute('onmousedown');
      el.removeAttribute('onclick');
    }

    /* Listener únic al lane-bar que detecta quin carril s'ha tocat */
    var lb = document.getElementById('lane-bar');
    if (!lb) return;

    function handleTap(clientX) {
      var rect = lb.getBoundingClientRect();
      var x = clientX - rect.left;
      var lane = Math.min(3, Math.max(0, Math.floor(x / rect.width * 4)));
      if (typeof tapLane === 'function') tapLane(lane, null);
    }

    lb.addEventListener('touchstart', function (e) {
      e.preventDefault();
      for (var i = 0; i < e.changedTouches.length; i++) {
        handleTap(e.changedTouches[i].clientX);
      }
    }, { passive: false });

    lb.addEventListener('mousedown', function (e) {
      handleTap(e.clientX);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

})();