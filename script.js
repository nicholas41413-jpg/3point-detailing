document.addEventListener("DOMContentLoaded", () => {

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // Add a small visual effect when the quote form is submitted
  const form = document.querySelector(".contact-form");

  if (form) {

    form.addEventListener("submit", () => {

      const button = form.querySelector("button");

      if (button) {
        button.textContent = "Sending...";
        button.disabled = true;
      }

    });

  }

});
