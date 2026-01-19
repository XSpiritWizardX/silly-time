const waitlistForm = document.getElementById('waitlist-form');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = waitlistForm.email.value;
    console.log(`User joined the waitlist with email: ${email}`);
  });
}
