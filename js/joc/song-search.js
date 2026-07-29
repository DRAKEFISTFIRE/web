/* ══════════════════════════════════════════════════════════════
   song-search.js
   Cercador de cançons — independent de la resta de mòduls.
   Filtra les .song-card ja renderitzades pel seu títol visible,
   així que funciona sense tocar songs-data.js ni song-select.js.
   Es torna a aplicar automàticament cada cop que el grid es
   torna a pintar (per exemple, en canviar de categoria).
══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var grid = document.getElementById('songs-grid');
    var input = document.getElementById('song-search-input');
    var clearBtn = document.getElementById('song-search-clear');
    var searchBar = document.getElementById('song-search-bar');

    if (!grid || !input) return;

    // Injectem el CSS necessari sense dependre de joc.css
    var style = document.createElement('style');
    style.textContent =
        '.song-card.search-hidden { display: none !important; }' +
        '#songs-search-empty { display: none; }' +
        '#songs-search-empty.show { display: flex; }';
    document.head.appendChild(style);

    function normalize(str) {
        return (str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // treu accents per cercar "cançó" escrivint "canco"
    }

    function ensureEmptyState() {
        var empty = document.getElementById('songs-search-empty');
        if (!empty) {
            empty = document.createElement('div');
            empty.id = 'songs-search-empty';
            empty.className = 'songs-empty';
            empty.innerHTML =
                '<div class="songs-empty-mark">✦</div>' +
                '<p>Cap cançó coincideix amb la cerca.</p>';
            grid.parentNode.insertBefore(empty, grid.nextSibling);
        }
        return empty;
    }

    function applyFilter() {
        var query = normalize(input.value.trim());
        var cards = grid.querySelectorAll('.song-card');
        var visibleCount = 0;

        cards.forEach(function (card) {
            var titleEl = card.querySelector('.song-card-title');
            var title = normalize(titleEl ? titleEl.textContent : '');
            var matches = query === '' || title.indexOf(query) !== -1;

            card.classList.toggle('search-hidden', !matches);
            if (matches) visibleCount++;
        });

        var empty = ensureEmptyState();
        empty.classList.toggle('show', cards.length > 0 && visibleCount === 0 && query !== '');

        if (searchBar) {
            searchBar.classList.toggle('has-value', query !== '');
        }
    }

    input.addEventListener('input', applyFilter);

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            input.value = '';
            input.focus();
            applyFilter();
        });
    }

    // Reaplica el filtre cada vegada que el grid es torna a renderitzar
    // (per exemple, quan es canvia de categoria a song-select.js)
    var observer = new MutationObserver(function () {
        if (input.value.trim() !== '') applyFilter();
    });
    observer.observe(grid, { childList: true });

    applyFilter();
})();