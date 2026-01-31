const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((section) => observer.observe(section));

const form = document.getElementById('waitlistForm');
const emailInput = document.getElementById('emailInput');
const formNote = document.getElementById('formNote');
const previewBtn = document.getElementById('previewBtn');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  if (!email) return;

  formNote.textContent = `Thanks! ${email} is on the list. We will be in touch.`;
  formNote.style.color = '#1e1b1a';
  emailInput.value = '';
});

previewBtn.addEventListener('click', () => {
  previewBtn.textContent = 'Preview loading...';
  previewBtn.disabled = true;
  setTimeout(() => {
    previewBtn.textContent = 'Preview queued. Check your inbox.';
  }, 900);
});
