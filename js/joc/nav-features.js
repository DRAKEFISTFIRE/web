/* ═══════════════════════════════════════════════
   nav-features.js — Navegació, Classificació i Perfil
   Santes Tiles

   No toca cap dels mòduls existents del joc: només
   escolta canvis del DOM (pantalla de resultat) i
   gestiona les pestanyes noves de screen-select.
   Les dades es guarden al localStorage del navegador,
   així que la classificació és local a cada dispositiu.
   ═══════════════════════════════════════════════ */
(function () {

  var LB_KEY = 'santesTiles.leaderboard';
  var PROFILE_KEY = 'santesTiles.profile';
  var MAX_ENTRIES = 200;

  /* ── Navegació per pestanyes (píndola lliscant) ── */
  function positionNavPill(tab) {
    var pill = document.getElementById('nav-pill');
    var nav = document.getElementById('nav-item');
    if (!pill || !nav || !tab) return;
    var navRect = nav.getBoundingClientRect();
    var tabRect = tab.getBoundingClientRect();
    pill.style.left = (tabRect.left - navRect.left) + 'px';
    pill.style.width = tabRect.width + 'px';
  }

function initTabs() {

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            // Botón activo
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Config abre otra pantalla
            if(btn.dataset.panel === "config"){
                showScreen("config");
                return;
            }

            // Ocultar todos los paneles
            document.querySelectorAll(".app-panel").forEach(panel=>{
                panel.classList.remove("active");
            });

            // Mostrar el panel correcto
            const panel = document.getElementById("panel-" + btn.dataset.panel);

            if(panel){
                panel.classList.add("active");
            }

            if(btn.dataset.panel==="leaderboard"){
                renderLeaderboard();
            }

            if(btn.dataset.panel==="profile"){
                renderProfile();
            }

        });

    });

}
  /* ── Filtres de Colla / Figura (a sobre del que ja fa la selecció de categoria) ── */
  function uniqueValues(list) {
    var seen = [], out = [];
    list.forEach(function (v) {
      if (v && seen.indexOf(v) === -1) { seen.push(v); out.push(v); }
    });
    return out;
  }

  function fillCselList(selectId, listId, allLabel, values) {
    var select = document.getElementById(selectId);
    var list = document.getElementById(listId);
    if (!select || !list) return;

    var current = select.value || 'ALL';
    select.innerHTML = '<option value="ALL">' + allLabel + '</option>';
    list.innerHTML = '<li role="option" data-value="ALL"' +
      (current === 'ALL' ? ' aria-selected="true"' : '') + '>' + allLabel + '</li>';

    values.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v; opt.textContent = v;
      select.appendChild(opt);

      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-value', v);
      if (current === v) li.setAttribute('aria-selected', 'true');
      li.textContent = v;
      list.appendChild(li);
    });

    select.value = values.indexOf(current) !== -1 ? current : 'ALL';

    var csel = select.closest('.csel');
    if (csel && window.SantesCustomSelect) window.SantesCustomSelect.sync(csel);
  }

  function songTitleMap() {
    var map = {};
    if (typeof SONGS === 'undefined') return map;
    SONGS.forEach(function (s) { map[(s.title || '').trim()] = s; });
    return map;
  }

  function getActiveCategory() {
    var btn = document.querySelector('.cat-btn.active');
    return btn ? btn.getAttribute('data-cat') : 'ALL';
  }

  function decorateCard(card, song) {
    if (!song || card.dataset.collaTagged) return;
    card.dataset.collaTagged = '1';
    var info = card.querySelector('.song-card-info');
    if (!info) return;
    var tag = document.createElement('span');
    tag.className = 'song-card-colla';
    tag.textContent = song.artist || '';
    info.appendChild(tag);
  }

  function applyCombinedSongFilters() {
    var grid = document.getElementById('songs-grid');
    if (!grid) return;

    var titleMap = songTitleMap();
    var cat = getActiveCategory();
    var collaSel = document.getElementById('colla-filter');
    var figuraSel = document.getElementById('figura-filter');
    var colla = collaSel ? collaSel.value : 'ALL';
    var figura = figuraSel ? figuraSel.value : 'ALL';

    grid.querySelectorAll('.song-card').forEach(function (card) {
      var titleEl = card.querySelector('.song-card-title');
      var title = titleEl ? titleEl.textContent.trim() : '';
      var song = titleMap[title];

      decorateCard(card, song);

      var visible = true;
      if (song) {
        if (cat !== 'ALL' && song.categoria !== cat) visible = false;
        if (colla !== 'ALL' && song.artist !== colla) visible = false;
        if (figura !== 'ALL' && title !== figura) visible = false;
      }
      card.classList.toggle('filtered-out-extra', !visible);
    });
  }

  function initSongFilters() {
    if (typeof SONGS === 'undefined') return;
    var colles = uniqueValues(SONGS.map(function (s) { return s.artist; }));
    var figures = SONGS.map(function (s) { return s.title; });
    fillCselList('colla-filter', 'colla-options', 'Totes les colles', colles);
    fillCselList('figura-filter', 'figura-options', 'Totes les figures', figures);
    applyCombinedSongFilters();
  }

  function initSongFilterEvents() {
    var colla = document.getElementById('colla-filter');
    var figura = document.getElementById('figura-filter');
    if (colla) colla.addEventListener('change', applyCombinedSongFilters);
    if (figura) figura.addEventListener('change', applyCombinedSongFilters);

    var catSelector = document.getElementById('category-selector');
    if (catSelector) {
      catSelector.addEventListener('click', function (e) {
        if (e.target.closest('.cat-btn')) setTimeout(applyCombinedSongFilters, 0);
      });
    }

    var grid = document.getElementById('songs-grid');
    if (grid && window.MutationObserver) {
      var obs = new MutationObserver(function () { applyCombinedSongFilters(); });
      obs.observe(grid, { childList: true });
    }
  }

  /* ── Emmagatzematge local ── */
  function loadLB() {
    try { return JSON.parse(localStorage.getItem(LB_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveLB(list) {
    try { localStorage.setItem(LB_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES))); }
    catch (e) { /* localStorage no disponible */ }
  }
  function loadProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || { name: 'Jugador', since: null }; }
    catch (e) { return { name: 'Jugador', since: null }; }
  }
  function saveProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }
    catch (e) { /* ignore */ }
  }

  /* ── Captura de resultats: observa la pantalla de resultat ── */
  function countStars(container) {
    if (!container) return 0;
    var filled = container.querySelectorAll('.star.filled');
    if (filled.length) return filled.length;
    var text = container.textContent || '';
    var m = text.match(/★/g);
    return m ? m.length : 0;
  }

  function captureResult() {
    var songEl = document.getElementById('res-song');
    var scoreEl = document.getElementById('res-score');
    var starsEl = document.getElementById('res-stars');
    if (!songEl || !scoreEl) return;

    var song = (songEl.textContent || '').trim();
    var score = parseInt((scoreEl.textContent || '0').replace(/[^\d-]/g, ''), 10) || 0;
    if (!song) return;

    var entry = {
      song: song,
      score: score,
      stars: countStars(starsEl),
      date: new Date().toISOString()
    };

    var list = loadLB();
    list.unshift(entry);
    saveLB(list);

    var profile = loadProfile();
    if (!profile.since) {
      profile.since = entry.date;
      saveProfile(profile);
    }
  }

  function watchResultScreen() {
    var screen = document.getElementById('screen-result');
    if (!screen || !window.MutationObserver) return;
    var wasActive = screen.classList.contains('active');
    var observer = new MutationObserver(function () {
      var isActive = screen.classList.contains('active');
      if (isActive && !wasActive) {
        // petit retard perquè el mòdul del joc acabi d'omplir els valors
        setTimeout(captureResult, 60);
      }
      wasActive = isActive;
    });
    observer.observe(screen, { attributes: true, attributeFilter: ['class'] });
  }

  /* ── Renderitzat de la classificació ── */
  function formatDate(iso) {
    try {
      var d = new Date(iso);
      return d.toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
    } catch (e) { return ''; }
  }

  function starsToText(n) {
    var s = '';
    for (var i = 0; i < 3; i++) s += (i < n ? '★' : '☆');
    return s;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function populateSongFilter(list) {
    var select = document.getElementById('lb-song-filter');
    var options = document.getElementById('lb-song-options');
    if (!select || !options) return;

    var songs = [];
    list.forEach(function (e) { if (songs.indexOf(e.song) === -1) songs.push(e.song); });

    var current = select.value || 'ALL';
    if (songs.indexOf(current) === -1 && current !== 'ALL') current = 'ALL';

    select.innerHTML = '<option value="ALL">Totes les cançons</option>';
    options.innerHTML = '<li role="option" data-value="ALL"' +
      (current === 'ALL' ? ' aria-selected="true"' : '') + '>Totes les cançons</li>';

    songs.forEach(function (song) {
      var opt = document.createElement('option');
      opt.value = song;
      opt.textContent = song;
      select.appendChild(opt);

      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-value', song);
      if (current === song) li.setAttribute('aria-selected', 'true');
      li.textContent = song;
      options.appendChild(li);
    });

    select.value = current;

    var csel = document.getElementById('csel-lb-song');
    if (csel && window.SantesCustomSelect) window.SantesCustomSelect.sync(csel);
  }

  function renderLeaderboard() {
    var listEl = document.getElementById('leaderboard-list');
    var emptyEl = document.getElementById('leaderboard-empty');
    var filterEl = document.getElementById('lb-song-filter');
    if (!listEl) return;

    var all = loadLB();
    populateSongFilter(all);

    var filter = filterEl ? filterEl.value : 'ALL';
    var data = filter === 'ALL' ? all.slice() : all.filter(function (e) { return e.song === filter; });
    data.sort(function (a, b) { return b.score - a.score; });
    data = data.slice(0, 50);

    listEl.innerHTML = '';
    if (!data.length) {
      if (emptyEl) emptyEl.style.display = 'flex';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    data.forEach(function (entry, i) {
      var row = document.createElement('div');
      row.className = 'lb-row rank-' + (i < 3 ? (i + 1) : 'other');
      row.innerHTML =
        '<span class="lb-rank">' + (i + 1) + '</span>' +
        '<span class="lb-song">' + escapeHtml(entry.song) + '</span>' +
        '<span class="lb-score">' + entry.score.toLocaleString('ca-ES') + '</span>' +
        '<span class="lb-stars">' + starsToText(entry.stars) + '</span>' +
        '<span class="lb-date">' + formatDate(entry.date) + '</span>';
      listEl.appendChild(row);
    });
  }

  /* ── Perfil ── */
  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function renderProfile() {
    var profile = loadProfile();
    var nameInput = document.getElementById('profile-name');
    var sealEl = document.getElementById('profile-seal');
    var sinceEl = document.getElementById('profile-since');

    if (nameInput && document.activeElement !== nameInput) nameInput.value = profile.name || 'Jugador';
    if (sealEl) sealEl.textContent = (profile.name || 'J').trim().charAt(0).toUpperCase() || 'J';
    if (sinceEl) {
      sinceEl.textContent = profile.since ? 'Membre des del ' + formatDate(profile.since) : 'Membre des d\'avui';
    }

    var list = loadLB();
    var plays = list.length;
    var best = list.reduce(function (m, e) { return Math.max(m, e.score); }, 0);
    var total = list.reduce(function (s, e) { return s + e.score; }, 0);
    var stars = list.reduce(function (s, e) { return s + (e.stars || 0); }, 0);

    setText('pstat-plays', plays);
    setText('pstat-best', best.toLocaleString('ca-ES'));
    setText('pstat-total', total.toLocaleString('ca-ES'));
    setText('pstat-stars', stars);

    var favorite = null, favCount = {};
    list.forEach(function (e) {
      favCount[e.song] = (favCount[e.song] || 0) + 1;
      if (!favorite || favCount[e.song] > favCount[favorite]) favorite = e.song;
    });
    setText('pfav-val', favorite || '—');
  }

  function initProfileForm() {
    var nameInput = document.getElementById('profile-name');
    var sealEl = document.getElementById('profile-seal');
    var resetBtn = document.getElementById('btn-reset-profile');

    if (nameInput) {
      nameInput.addEventListener('input', function () {
        var profile = loadProfile();
        profile.name = nameInput.value.trim() || 'Jugador';
        saveProfile(profile);
        if (sealEl) sealEl.textContent = profile.name.charAt(0).toUpperCase();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (!confirm('Vols esborrar les teves dades locals (classificació i perfil)? Aquesta acció no es pot desfer.')) return;
        localStorage.removeItem(LB_KEY);
        localStorage.removeItem(PROFILE_KEY);
        renderLeaderboard();
        renderProfile();
      });
    }
  }

  function initLeaderboardFilter() {
    var select = document.getElementById('lb-song-filter');
    if (select) select.addEventListener('change', renderLeaderboard);
  }

  function init() {
    initTabs();
    initProfileForm();
    initLeaderboardFilter();
    initSongFilterEvents();
    initSongFilters();
    watchResultScreen();
    renderProfile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();