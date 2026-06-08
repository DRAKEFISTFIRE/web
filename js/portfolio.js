// ─────────────────────────────
// CURSOR (ULTRA SMOOTH + LIGHT)
// ─────────────────────────────
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileNav = document.getElementById("mobileNav");
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0;
let cx = 0, cy = 0;
let rx = 0, ry = 0;

// solo lectura de input (barato)
window.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
}, { passive: true });

// loop optimizado único
function cursorLoop() {
  cx += (mx - cx) * 0.25;
  cy += (my - cy) * 0.25;

  rx += (mx - rx) * 0.10;
  ry += (my - ry) * 0.10;

  cursor.style.transform = `translate3d(${cx - 6}px, ${cy - 6}px, 0)`;
  ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;

  requestAnimationFrame(cursorLoop);
}
requestAnimationFrame(cursorLoop);

// ─────────────────────────────
// STANDARDS MARQUEE
// ─────────────────────────────

(function () {
  const track = document.getElementById('stdMarqueeTrack');
  if (!track) return;

  const tags = [
    'Clean Code', 'DRY', 'SOLID', 'REST API', 'Semantic HTML',
    'Conventional Commits', 'Code Review', 'Zero Bugs Shipped',
    'Lazy Loading', 'WCAG AA', 'Feature Branches', 'Atomic PRs',
    'JWT Auth', 'Input Sanitisation', 'CSS Custom Properties',
    'Composable Architecture', 'SQL Injection Prevention',
    'Mobile First', 'Performance Budgets', 'Type Safety',
    'Single Responsibility', 'Open/Closed', 'Dependency Injection',
    'No Side Effects', 'Self-Documenting'
  ];

  const full = [...tags, ...tags];
  track.innerHTML = full
    .map(t => `<span class="mq-item"><span class="mq-dot"></span>${t}</span>`)
    .join('');
})();


// ─────────────────────────────
// STANDARDS COUNTERS
// ─────────────────────────────

(function () {
  const counters = document.querySelectorAll('[data-std-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = +el.dataset.stdTarget;
    const display = el.dataset.stdDisplay;

    if (display) {
      el.textContent = display;
      return;
    }

    let current = 0;
    const duration = 1200;
    const steps = 50;
    const increment = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, interval);
  };

  const obs = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.4 });

  counters.forEach(c => obs.observe(c));
})();


// ─────────────────────────────
// STARS (LIMITADAS + LIGERAS)
// ─────────────────────────────

const starsContainer = document.getElementById('stars');
const MAX_STARS = 50;

function createStar() {
  // control de memoria DOM
  if (starsContainer.childElementCount > MAX_STARS) {
    starsContainer.removeChild(starsContainer.firstChild);
  }

  const s = document.createElement('div');
  s.className = 'star';

  if (Math.random() > 0.85) s.classList.add('bright');

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = 1 + Math.random() * 2.5;

  s.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  s.style.width = size + 'px';
  s.style.height = size + 'px';

  starsContainer.appendChild(s);

  // cleanup seguro sin eventos pesados
  setTimeout(() => {
    s.remove();
  }, 15000);
}

setInterval(createStar, 350);


// ─────────────────────────────
// NAV SCROLL (THROTTLE LIGHT)
// ─────────────────────────────

const nav = document.getElementById('nav');

let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  lastScroll = window.scrollY;

  if (!ticking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', lastScroll > 80);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });


// ─────────────────────────────
// REVEAL ON SCROLL (ONE SHOT)
// ─────────────────────────────

const observer = new IntersectionObserver((entries, obs) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    const el = entry.target;
    el.classList.add('visible');

    const bars = el.querySelectorAll('.skill-fill');
    for (const bar of bars) {
      bar.style.width = bar.dataset.w + '%';
    }

    // 🔥 evita re-ejecución = más FPS
    obs.unobserve(el);
  }
}, {
  threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ─────────────────────────────
// TABS (CERO GLITCH + LIGHT)
// ─────────────────────────────

function showTab(id, btn) {
  document.querySelectorAll('.skills-panel')
    .forEach(p => p.classList.remove('active'));

  document.querySelectorAll('.tab-btn')
    .forEach(b => b.classList.remove('active'));

  const panel = document.getElementById('tab-' + id);
  panel.classList.add('active');
  btn.classList.add('active');

  const bars = panel.querySelectorAll('.skill-fill');

  // reset rápido
  for (const bar of bars) {
    bar.style.width = '0%';
  }

  // reflow suave
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      for (const bar of bars) {
        bar.style.width = bar.dataset.w + '%';
      }
    });
  });
}

hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("open");
    mobileNav.classList.toggle("open");

    const isOpen = mobileNav.classList.contains("open");

    hamburgerBtn.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
});