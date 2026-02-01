const statusMessage = (text, isError = false) => {
  const status = document.querySelector(".form-status");
  if (!status) return;
  status.textContent = text;
  status.style.color = isError ? "#d62828" : "#1f1a17";
};

const handleWaitlist = () => {
  const form = document.querySelector("#waitlist-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");
    if (!email) {
      statusMessage("Add an email to join the ritual.", true);
      return;
    }
    statusMessage("You are on the list. We will ping you soon!");
    form.reset();
  });
};

const handleReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", () => {
  handleWaitlist();
  handleReveal();
});
