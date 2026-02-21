(() => {
  const revealEls = document.querySelectorAll('.reveal');

  const revealAll = () => revealEls.forEach((el) => el.classList.add('is-visible'));

  if (!('IntersectionObserver' in window)) {
    revealAll();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  const STORAGE_KEY = 'silly_time_waitlist_v1';
  const BASE_WAITLIST = 1247;

  const form = document.getElementById('waitlistForm');
  const emailInput = document.getElementById('email');
  const note = document.getElementById('formNote');
  const countEl = document.getElementById('waitlistCount');
  const submitButton = form ? form.querySelector("button[type='submit']") : null;

  const loadEmails = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveEmails = (emails) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
    } catch {
      // Ignore storage errors in restricted environments.
    }
  };

  const updateCount = (emails) => {
    if (countEl) {
      countEl.textContent = String(BASE_WAITLIST + emails.length);
    }
  };

  const setNote = (message, state) => {
    if (!note) return;
    note.textContent = message;
    note.dataset.state = state;
  };

  const emails = loadEmails();
  updateCount(emails);

  if (!form || !emailInput || !submitButton) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const isValid = /^\S+@\S+\.\S+$/.test(email);

    if (!isValid) {
      setNote('Enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    if (emails.includes(email)) {
      setNote('You are already on the list with this email.', 'ok');
      return;
    }

    submitButton.disabled = true;
    const previousText = submitButton.textContent;
    submitButton.textContent = 'Saving...';

    setTimeout(() => {
      emails.push(email);
      saveEmails(emails);
      updateCount(emails);
      setNote('Spot saved. Launch updates are on the way.', 'ok');
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = previousText;
    }, 550);
  });
})();
