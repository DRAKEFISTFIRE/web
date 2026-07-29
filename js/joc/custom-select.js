/* ═══════════════════════════════════════════════
   custom-select.js — Selects estilitzats (Santes Tiles)

   Substitueix visualment un <select> natiu per un menú
   desplegable amb l'estil del joc, mantenint el <select>
   real amagat i sincronitzat (.csel-native) perquè la
   resta de mòduls (song-select.js, etc.) que llegeixin
   el seu .value o escoltin l'event "change" continuïn
   funcionant sense cap canvi.

   Marca qualsevol contenidor amb data-csel i aquesta
   estructura interna:
     .csel-trigger  (botó que mostra el valor actual)
     .csel-options  (llista de <li role="option" data-value="...">)
     .csel-native   (select real, amagat)
   ═══════════════════════════════════════════════ */
(function () {

  function closeAll(except) {
    document.querySelectorAll('.csel.open').forEach(function (el) {
      if (el === except) return;
      el.classList.remove('open');
      var trig = el.querySelector('.csel-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    });
  }

  function syncFromNative(csel) {
    var native = csel.querySelector('.csel-native');
    var valueEl = csel.querySelector('.csel-value');
    if (!native) return;
    var options = csel.querySelectorAll('.csel-options [role="option"]');
    options.forEach(function (opt) {
      var match = opt.getAttribute('data-value') === native.value;
      opt.setAttribute('aria-selected', match ? 'true' : 'false');
      if (match && valueEl) valueEl.textContent = opt.textContent;
    });
  }

  function selectOption(csel, opt) {
    var native = csel.querySelector('.csel-native');
    var valueEl = csel.querySelector('.csel-value');
    var trigger = csel.querySelector('.csel-trigger');
    if (!native || !opt) return;

    native.value = opt.getAttribute('data-value');
    if (valueEl) valueEl.textContent = opt.textContent;

    csel.querySelectorAll('.csel-options [role="option"]').forEach(function (o) {
      o.setAttribute('aria-selected', o === opt ? 'true' : 'false');
    });

    native.dispatchEvent(new Event('change', { bubbles: true }));

    csel.classList.remove('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function initSelect(csel) {
    if (csel.dataset.cselReady) return;
    csel.dataset.cselReady = '1';

    var trigger = csel.querySelector('.csel-trigger');
    var list = csel.querySelector('.csel-options');
    var native = csel.querySelector('.csel-native');
    if (!trigger || !list || !native) return;

    syncFromNative(csel);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = csel.classList.contains('open');
      closeAll(csel);
      csel.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });

    list.addEventListener('click', function (e) {
      var opt = e.target.closest('[role="option"]');
      if (opt) selectOption(csel, opt);
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      } else if (e.key === 'Escape') {
        csel.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Si un altre mòdul canvia el select natiu directament (p.ex. per codi),
    // mantenir la interfície visual sincronitzada.
    native.addEventListener('change', function () { syncFromNative(csel); });
  }

  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  function init() {
    document.querySelectorAll('[data-csel]').forEach(initSelect);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposat per si nav-features.js crea/actualitza selects dinàmicament
  // (p.ex. la llista de cançons de la classificació).
  window.SantesCustomSelect = { init: initSelect, closeAll: closeAll, sync: syncFromNative };

})();