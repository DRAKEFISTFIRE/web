// Mismo efecto de estrellas que en index.js para continuidad visual

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  if (Math.random() > 0.8) {
    star.classList.add('bright');
  }
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';
  const size = Math.random() * 3 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.animationDuration = (Math.random() * 10 + 5) + 's';
  document.getElementById('stars').appendChild(star);
  star.addEventListener('animationend', () => star.remove());
}

setInterval(createStar, 100);
