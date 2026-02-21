const baseWaitlistCount = 1248;
const storageKey = 'silly_time_waitlist';

function readWaitlist() {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWaitlist(entries) {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

function updateCount() {
  const el = document.getElementById('waitlist-count');
  if (!el) return;
  const total = baseWaitlistCount + readWaitlist().length;
  el.textContent = String(total);
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay;
        if (delay) entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item) => observer.observe(item));
}

function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const note = document.getElementById('form-note');
  if (!form || !note) return;

  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();

    if (!name || !email || !email.includes('@')) {
      note.textContent = 'Add a valid name and email to join the waitlist.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Saving...';
    note.textContent = 'Claiming your spot...';

    window.setTimeout(() => {
      const current = readWaitlist();
      current.push({ name, email, at: new Date().toISOString() });
      writeWaitlist(current);
      updateCount();

      note.textContent = `You are in, ${name}. We will email ${email} soon.`;
      form.reset();
      button.disabled = false;
      button.textContent = 'Reserve My Spot';
    }, 700);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCount();
  initReveal();
  initWaitlistForm();
});
