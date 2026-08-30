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
const petTotal = document.getElementById("pet-total");
const mobileTotal = document.getElementById("mobile-total");
const total = document.getElementById("total");
const sideTotal = document.getElementById("side-total");

const hiddenTotal = document.getElementById("hidden-total");
const hiddenBase = document.getElementById("hidden-base");

function updateEstimate() {
  const base = prices[service.value][size.value];

  const petFee = pet.value.startsWith("Yes") ? 25 : 0;
  const mobileFee = mobile.value.startsWith("Yes") ? 10 : 0;

  // $20 promotional discount applies to the service price.
  const discount = Math.min(DISCOUNT, base);

  // Fees are added after the $20 discount.
  const final = base - discount + petFee + mobileFee;

  baseTotal.textContent = `$${base}`;

  petTotal.textContent = petFee
    ? `+$${petFee}`
    : "$0";

  mobileTotal.textContent = mobileFee
    ? `+$${mobileFee}`
    : "$0";

  total.textContent = `$${final}`;
  sideTotal.textContent = `$${final}`;

  hiddenTotal.value = `$${final}`;
  hiddenBase.value = `$${base}`;

  // Add discount information to the form submission.
  let discountInput = document.getElementById("hidden-discount");

  if (!discountInput) {
    discountInput = document.createElement("input");
    discountInput.type = "hidden";
    discountInput.name = "Promotion Discount";
    discountInput.id = "hidden-discount";
    document.getElementById("quote-form").appendChild(discountInput);
  }

  discountInput.value = `-$${discount}`;
}

[service, size, pet, mobile].forEach(element => {
  element.addEventListener("change", updateEstimate);
});

document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => {
    service.value = button.dataset.service;
    updateEstimate();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

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

document.getElementById("year").textContent =
  new Date().getFullYear();

const params = new URLSearchParams(window.location.search);

if (params.get("quote") === "sent") {
  const toast = document.getElementById("toast");

  toast.textContent =
    "Thanks! Your quote request was sent.";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);

  history.replaceState(
    {},
    "",
    window.location.pathname + "#quote"
  );
}

document.getElementById("quote-form").addEventListener("submit", () => {
  const toast = document.getElementById("toast");

  toast.textContent =
    "Sending your quote request...";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
});

updateEstimate();
