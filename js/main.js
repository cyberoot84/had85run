'use strict';

/* ---- Mobile nav ---- */
const burger = document.getElementById('burger-btn');
const nav    = document.getElementById('main-nav');
const backdrop = document.getElementById('nav-backdrop');

function closeNav() {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}
burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
backdrop?.addEventListener('click', closeNav);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));

/* ---- Scroll-top ---- */
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollBtn?.toggleAttribute('hidden', window.scrollY < 400);
}, { passive: true });
scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- AOS ---- */
const aosObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); aosObserver.unobserve(e.target); } });
}, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

/* ---- FAQ ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const id = b.getAttribute('aria-controls');
      document.getElementById(id)?.classList.remove('open');
    });

    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer?.classList.add('open');
    }
  });
});

/* ---- Counter animation ---- */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1600;
  const start = performance.now();
  const step = ts => {
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ---- Contact form ---- */
const form     = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('submit-btn');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
    });
    if (res.ok) {
      feedback.textContent = 'Votre message a bien été envoyé. Nous vous répondrons sous 48 h.';
      feedback.className = 'form-feedback success';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    feedback.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.';
    feedback.className = 'form-feedback error';
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

/* ---- Sticky header shadow ---- */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });
