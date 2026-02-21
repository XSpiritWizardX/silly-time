const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const form = document.getElementById('waitlistForm');
const emailInput = document.getElementById('email');
const note = document.getElementById('formNote');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  note.className = 'form-note';

  if (!valid) {
    note.textContent = 'Enter a valid email address to join the waitlist.';
    note.classList.add('form-note--error');
    emailInput.focus();
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Saving your spot...';

  setTimeout(() => {
    const queueNumber = Math.floor(Math.random() * 260) + 2400;
    note.textContent = `You are in. Your waitlist number is #${queueNumber}.`;
    note.classList.add('form-note--ok');
    form.reset();
    button.disabled = false;
    button.textContent = originalText;
  }, 700);
});
