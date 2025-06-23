// Redirige al hacer clic en cualquier parte
window.addEventListener('click', () => {
  window.location.href = 'portfolio.html';
});

// Generar partículas estilo orbes con más cantidad y variedad
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  // A veces hacemos la estrella "brillante"
  if (Math.random() > 0.8) {
    star.classList.add('bright');
  }

  // Posición aleatoria dentro de la pantalla
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';

  // Tamaño aleatorio para profundidad (entre 1 y 4 px)
  const size = Math.random() * 3 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';

  // Duración animación entre 5 y 15 segundos
  star.style.animationDuration = (Math.random() * 10 + 5) + 's';

  // Añadir a contenedor de estrellas
  document.getElementById('stars').appendChild(star);

  // Eliminar la estrella tras la animación para no acumular
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

// Generar muchas partículas cada 100ms para más estrellas
setInterval(createStar, 100);
