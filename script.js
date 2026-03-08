const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const hamburger = document.querySelector('.hamburger');
const drawer = document.getElementById('drawer');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => observer.observe(el));
}

const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (sections.length) {
  const setActive = () => {
    let currentId = '#home';
    const offset = window.scrollY + 180;

    sections.forEach((section) => {
      if (offset >= section.offsetTop) {
        currentId = `#${section.id}`;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === currentId);
    });
  };

  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
}

const roleEl = document.getElementById('rotating-skill');
const roles = [
  'ASP.NET Core Developer',
  'C Sharp Developer',
  'Full Stack Developer',
  'AI Research Enthusiast',
  'Problem Solver'
];

function renderWaveText(text) {
  if (!roleEl) return;

  roleEl.innerHTML = '';

  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.className = char === ' ' ? 'wave-char space' : 'wave-char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${index * 0.045}s`;
    roleEl.appendChild(span);
  });
}

if (roleEl) {
  let index = 0;
  renderWaveText(roles[index]);

  setInterval(() => {
    index = (index + 1) % roles.length;
    renderWaveText(roles[index]);
  }, 2800);
}
