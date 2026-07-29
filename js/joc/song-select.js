// ═══════════════════════════════════
// SONG SELECT
// ═══════════════════════════════════
function buildSongGrid() {
  const grid = document.getElementById('songs-grid');
  grid.innerHTML = '';

  const filteredSongs = SONGS.filter(song => {
    return currentCategory === 'ALL' || song.categoria === currentCategory;
  });

  for (const song of filteredSongs) {
    const sd = getSongData(song.id);
    const card = document.createElement('div');
    card.className = 'song-card';

    const bgDiv = document.createElement('div');
    bgDiv.className = 'song-card-bg';
    bgDiv.style.backgroundImage = `url(${song.bgImage})`;

    const overlay = document.createElement('div'); 
    overlay.className = 'song-card-overlay';

    const info = document.createElement('div'); 
    info.className = 'song-card-info';
    info.innerHTML = `
      <div class="song-card-title">${song.title}</div>
      <div class="song-card-meta">
        ${song.artist} · ${Math.floor(song.duration/60)}:${String(Math.floor(song.duration%60)).padStart(2,'0')}
      </div>
      <div class="song-card-difficulty">
        ${song.dificultad}
      </div>
      <div class="song-card-category">
        ${song.categoria}
      </div>
    `;

    const stars = document.createElement('div'); 
    stars.className = 'song-stars';
    for (let i=1; i<=3; i++) {
      const s = document.createElement('span');
      s.className = 'star ' + (sd.stars >= i ? 'filled' : 'empty');
      s.textContent = '★'; 
      stars.appendChild(s);
    }

    card.appendChild(bgDiv); 
    card.appendChild(overlay); 
    card.appendChild(info); 
    card.appendChild(stars);

    if (sd.exUnlocked) {
      const b = document.createElement('div'); 
      b.className = 'badge-ex'; 
      b.textContent = '2× EX'; 
      card.appendChild(b);
    }

    if (song.locked) {
      const lock = document.createElement('div'); 
      lock.className = 'badge-locked'; 
      lock.textContent = '⚔'; 
      card.appendChild(lock);
    } else {
      card.addEventListener('click', () => {
        if (sd.exUnlocked) {
          openModeSelector(song);
        } else {
          startSong(song, false);
        }
      });
    }

    grid.appendChild(card);
  }
}




function openModeSelector(song) {
  const overlay = document.createElement('div');
  overlay.className = 'mode-overlay';

  overlay.innerHTML = `
    <div class="mode-box">
      <div class="mode-title">${song.title}</div>

      <button class="mode-btn normal">▶ Modo Normal</button>
      <button class="mode-btn ex">⚡ Modo 2× EX</button>

      <button class="mode-cancel">Cancelar</button>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('.normal').onclick = () => {
    overlay.remove();
    startSong(song, false);
  };

  overlay.querySelector('.ex').onclick = () => {
    overlay.remove();
    startSong(song, true);
  };

  overlay.querySelector('.mode-cancel').onclick = () => {
    overlay.remove();
  };
}