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

reveals.forEach((el) => observer.observe(el));

const form = document.getElementById('waitlist-form');
const message = document.getElementById('waitlist-message');

if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    const email = form.querySelector('input');

    if (button) button.disabled = true;
    if (email) email.value = '';

    message.textContent = 'You are in. We will send early access details soon.';
    message.classList.add('pulse');

    setTimeout(() => {
      if (button) button.disabled = false;
      message.classList.remove('pulse');
    }, 2000);
  });
}
