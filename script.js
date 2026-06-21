/* ═══════════════════════════════════════════════════
   AK's IDEAL TUTORIAL — PREMIUM JAVASCRIPT
   ═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────
   LOADING SCREEN
────────────────────────────────────── */
(function initLoader() {
  document.body.classList.add('loading');

  const loader      = document.getElementById('loader');
   const percentEl = document.getElementById('loader-percent');
const loaderBar = document.getElementById('loader-bar');
  let progress = 0;

  // Particle canvas inside loader
  const lCanvas = document.getElementById('loader-canvas');
  const lCtx    = lCanvas.getContext('2d');

  function resizeLoaderCanvas() {
    lCanvas.width  = window.innerWidth;
    lCanvas.height = window.innerHeight;
  }
  resizeLoaderCanvas();
  window.addEventListener('resize', resizeLoaderCanvas);

  const loaderParticles = [];
  for (let i = 0; i < 25; i++) {
    loaderParticles.push({
      x: Math.random() * lCanvas.width,
      y: Math.random() * lCanvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function animateLoaderParticles() {
    lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
    loaderParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = lCanvas.width;
      if (p.x > lCanvas.width) p.x = 0;
      if (p.y < 0) p.y = lCanvas.height;
      if (p.y > lCanvas.height) p.y = 0;
      lCtx.beginPath();
      lCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      lCtx.fillStyle = `rgba(139,92,246,${p.alpha})`;
      lCtx.fill();
    });
    if (!loader.classList.contains('hidden')) {
      requestAnimationFrame(animateLoaderParticles);
    }
  }
  animateLoaderParticles();

  const interval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(hideLoader, 300);
    }
   percentEl.textContent = Math.floor(progress) + '%';
loaderBar.style.width = progress + '%';
  }, 50);

  function hideLoader() {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    document.body.style.overflow = '';
    // Init AOS after loader
    if (window.AOS) {
      AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 80 });
    }
    // Start hero animations
    startHeroAnimations();
  }
})();

/* ──────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  if (window.innerWidth <= 768) return; // skip on mobile

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverEls = document.querySelectorAll('a, button, .tab-btn, .flip-card, .gallery-item, .social-card, .timing-card, .course-card, .ssc-topper');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
})();

/* ──────────────────────────────────────
   MOUSE GLOW EFFECT
────────────────────────────────────── */
(function initMouseGlow() {
  const glow = document.getElementById('mouse-glow');
  const hero = document.querySelector('.hero');
  if (!glow || !hero) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top  = (e.clientY - rect.top) + 'px';
  });
})();

/* ──────────────────────────────────────
   HERO CANVAS — STAR PARTICLES
────────────────────────────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const STAR_COUNT = 150;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1) { s.alpha = 1; s.twinkleDir = -1; }
      if (s.alpha <= 0.05) { s.alpha = 0.05; s.twinkleDir = 1; }
      s.y -= s.speed;
      if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${s.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(139,92,246,0.5)';
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
})();

/* ──────────────────────────────────────
   NAVBAR
────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  if (!navbar) return;

  // Scroll shrink
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    updateBackToTop();
  });

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('active');
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight) {
        links.forEach(l => l.classList.remove('active'));
        const active = navLinks.querySelector(`[data-section="${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ──────────────────────────────────────
   HERO TYPING EFFECT
────────────────────────────────────── */
const phrases = [
  '13+ Years of Educational Excellence',
  'Helping Students Achieve Academic Success',
  'Coaching for Intermediate MPC & IPE',
  'Expert Guidance for Diploma & SSC',
  'Transforming Students into Toppers',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function typeEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    el.textContent = current.slice(0, --charIndex);
  } else {
    el.textContent = current.slice(0, ++charIndex);
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }

  typingTimer = setTimeout(typeEffect, speed);
}

function startHeroAnimations() {
  setTimeout(typeEffect, 2600);
}

/* ──────────────────────────────────────
   ANIMATED COUNTERS
────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = +el.getAttribute('data-target');
        const duration = 1800;
        const step   = target / (duration / 16);
        let current  = 0;
        const timer  = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ──────────────────────────────────────
   RESULTS TABS
────────────────────────────────────── */
(function initTabs() {
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById('tab-content-' + tab);
      if (content) content.classList.add('active');
    });
  });
})();

/* ──────────────────────────────────────
   CONFETTI ON CLICK
────────────────────────────────────── */
function triggerConfetti(e) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#8b5cf6', '#06b6d4', '#fbbf24', '#10b981', '#f43f5e', '#a78bfa'];
  const particles = [];
  const x = e.clientX || window.innerWidth / 2;
  const y = e.clientY || window.innerHeight / 2;

  for (let i = 0; i < 80; i++) {
    const angle  = (Math.random() * Math.PI * 2);
    const speed  = Math.random() * 8 + 3;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    });
  }

  let animId;
  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.25; // gravity
      p.life -= p.decay;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (alive) {
      animId = requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  drawConfetti();
}

/* ──────────────────────────────────────
   GALLERY LIGHTBOX
────────────────────────────────────── */
const galleryImages = [
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHFoezM-ZLDpqGUGSzYo9Lg9ONUIeyVpqPJ0U6WnPkG4jeD6k9nFCs__XfJPvmvyrj5i3b9e7VNW25u4F8jeYh67PaoGIfLX7r95W8dsdS6jvOzIGcyj_1xn2mpIlc8qU_mmKUw=s1200',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEm04Oi74pF39STnwGMt_WRvG8zZfnFxDFLG6gfWMGUe0vA0C3DmoEGPVxoBpcofgRg-FVQExFdlqjqY5FTOOCgjRYMqCb8CvqpgAzFSmpd98nRr3p2RbWuzGVor8Q-ABYHkhoJ=s1200',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE54KOAsPeZDYLsiHtkPmgYYDQ7ty6hYFyfsIjLHKHLzceklSi9x6Y8onSi1r_xGMHPLDs7TCv7RE8zNOlQRVQiUdWlLvMOyat97gUcmUW8cK2gpINDBh-MfK9-gjR6TJ5dpPv2LusQg_R_=s1200',
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = galleryImages[index];
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function changeLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  if (img) img.src = galleryImages[currentLightboxIndex];
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeLightbox(-1);
  if (e.key === 'ArrowRight') changeLightbox(1);
});

document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target.id === 'lightbox') closeLightbox();
});

/* ──────────────────────────────────────
   REVIEWS CAROUSEL
────────────────────────────────────── */
(function initCarousel() {
  const track  = document.getElementById('reviews-track');
  const dotsEl = document.getElementById('carousel-dots');
  if (!track) return;

  const cards  = track.querySelectorAll('.review-card');
  const total  = cards.length;
  let current  = 0;
  let autoPlay;
  let cardsVisible = 3;

  function getCardsVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const pages = Math.ceil(total / cardsVisible);
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function goTo(index) {
    cardsVisible = getCardsVisible();
    const pages  = Math.ceil(total / cardsVisible);
    current      = Math.max(0, Math.min(index, pages - 1));
    const pct    = (100 / cardsVisible) * current * cardsVisible;
    track.style.transform = `translateX(-${pct}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsEl) return;
    const pages = Math.ceil(total / cardsVisible);
    dotsEl.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  window.moveCarousel = function(dir) {
    cardsVisible = getCardsVisible();
    const pages  = Math.ceil(total / cardsVisible);
    current      = (current + dir + pages) % pages;
    goTo(current);
    resetAutoPlay();
  };

  function startAutoPlay() {
    autoPlay = setInterval(() => moveCarousel(1), 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  function init() {
    cardsVisible = getCardsVisible();
    buildDots();
    goTo(0);
    startAutoPlay();
  }

  init();
  window.addEventListener('resize', () => {
    cardsVisible = getCardsVisible();
    buildDots();
    goTo(0);
  });
})();

/* ──────────────────────────────────────
   3D TILT EFFECT ON COURSE CARDS
────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width  / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const rotX   = -(y / rect.height) * 12;
      const rotY   =  (x / rect.width)  * 12;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });
})();

/* ──────────────────────────────────────
   MAGNETIC BUTTON EFFECT
────────────────────────────────────── */
(function initMagnetic() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect   = btn.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width  / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });
})();

/* ──────────────────────────────────────
   RIPPLE EFFECT ON BUTTONS
────────────────────────────────────── */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top  - size/2}px;
        background:rgba(255,255,255,0.25);
        transform:scale(0);
        animation:rippleAnim 0.6s linear;
        pointer-events:none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Add ripple keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ──────────────────────────────────────
   SOCIAL CARD RIPPLE
────────────────────────────────────── */
(function initSocialRipple() {
  document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect   = card.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top  - size/2}px;
        background:rgba(255,255,255,0.1);
        transform:scale(0);
        animation:rippleAnim 0.8s linear;
        pointer-events:none;
        z-index:1;
      `;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
    });
  });
})();

/* ──────────────────────────────────────
   BACK TO TOP
────────────────────────────────────── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}

/* ──────────────────────────────────────
   FOOTER PARTICLES
────────────────────────────────────── */
(function initFooterParticles() {
  const container = document.getElementById('footer-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(139,92,246,${Math.random() * 0.4 + 0.1});
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: footerParticleFloat ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite alternate;
    `;
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes footerParticleFloat {
      0% { transform: translateY(0) scale(1); opacity: 0.3; }
      100% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
})();

/* ──────────────────────────────────────
   SCROLL REVEAL FOR MARKS BARS
────────────────────────────────────── */
(function initMarksBars() {
  const bars = document.querySelectorAll('.marks-fill, .timing-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
    observer.observe(bar);
  });
})();

/* ──────────────────────────────────────
   SECTION PARALLAX
────────────────────────────────────── */
(function initParallax() {
  if (window.innerWidth <= 768) return; // skip on mobile
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed  = (i + 1) * 0.1;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
})();

/* ──────────────────────────────────────
   NAVBAR MOBILE OVERLAY CLOSE
────────────────────────────────────── */
document.addEventListener('click', e => {
  const navLinks  = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks || !hamburger) return;
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
  }
});

/* ──────────────────────────────────────
   AOS INIT (fallback if loader finishes fast)
────────────────────────────────────── */
window.addEventListener('load', () => {
  if (window.AOS && !window.aosInitialized) {
    window.aosInitialized = true;
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic', offset: 80 });
  }
});



document.addEventListener("DOMContentLoaded", () => {

    const today = new Date().getDay();

    const dayNames = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ];

    const currentDay = dayNames[today];

    document.querySelectorAll(".schedule-card").forEach(card => {

        const day = card.querySelector(".day-name").textContent.trim();

        if(day === currentDay){
            card.classList.add("active-day");
        }

    });

});


 

document.addEventListener("DOMContentLoaded", () => {

    const today = new Date().getDay();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const currentDay = days[today];

    const cards = document.querySelectorAll(".timing-card");

    cards.forEach(card => {

        const dayName = card.querySelector(".timing-day").textContent.trim();

        if(dayName === currentDay){
            card.classList.add("current-day");
        }

    });

});