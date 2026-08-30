const prices = {
  "Premium Exterior Wash": {
    "Sedan": 65,
    "SUV": 75,
    "Large SUV / Truck": 90
  },

  "Interior Detail": {
    "Sedan": 95,
    "SUV": 105,
    "Large SUV / Truck": 115
  },

  "Full Detail": {
    "Sedan": 150,
    "SUV": 160,
    "Large SUV / Truck": 185
  }
};

const DISCOUNT = 20;

const service = document.getElementById("service");
const size = document.getElementById("vehicle-size");
const pet = document.getElementById("pet-hair");
const mobile = document.getElementById("mobile");

const baseTotal = document.getElementById("base-total");
const discountTotal = document.getElementById("discount-total");
const petTotal = document.getElementById("pet-total");
const mobileTotal = document.getElementById("mobile-total");
const total = document.getElementById("total");
const sideTotal = document.getElementById("side-total");

const hiddenTotal = document.getElementById("hidden-total");
const hiddenBase = document.getElementById("hidden-base");
const hiddenDiscount = document.getElementById("hidden-discount");

function updateEstimate() {
  const base = prices[service.value][size.value];

  const petFee = pet.value.startsWith("Yes") ? 25 : 0;
  const mobileFee = mobile.value.startsWith("Yes") ? 10 : 0;

  const discount = Math.min(DISCOUNT, base);
  const final = base - discount + petFee + mobileFee;

  baseTotal.textContent = `$${base}`;
  discountTotal.textContent = `-$${discount}`;
  petTotal.textContent = petFee ? `+$${petFee}` : "$0";
  mobileTotal.textContent = mobileFee ? `+$${mobileFee}` : "$0";

  total.textContent = `$${final}`;
  sideTotal.textContent = `$${final}`;

  hiddenTotal.value = `$${final}`;
  hiddenBase.value = `$${base}`;
  hiddenDiscount.value = `-$${discount}`;
}

[service, size, pet, mobile].forEach(element => {
  if (element) {
    element.addEventListener("change", updateEstimate);
  }
});

document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => {
    service.value = button.dataset.service;
    updateEstimate();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const params = new URLSearchParams(window.location.search);

if (params.get("quote") === "sent") {
  const toast = document.getElementById("toast");

  if (toast) {
    toast.textContent = "Thanks! Your quote request was sent.";
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  history.replaceState(
    {},
    "",
    window.location.pathname + "#quote"
  );
}

const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
  quoteForm.addEventListener("submit", () => {
    const toast = document.getElementById("toast");

    if (toast) {
      toast.textContent = "Sending your quote request...";
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3500);
    }
  });
}

if (service && size && pet && mobile) {
  updateEstimate();
}
