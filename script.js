const modal = document.getElementById("contactModal");
const contactNavLink = document.getElementById("contactNavLink");
const contactFab = document.getElementById("contactFab");
const modalCloseBtn = modal.querySelector(".modal-close");
const modalForm = document.getElementById("contactModalForm");
const pageForm = document.getElementById("contactForm");

const toggleBodyScroll = (disable) => {
  document.body.style.overflow = disable ? "hidden" : "";
};

const openModal = (event) => {
  if (event) event.preventDefault();
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  toggleBodyScroll(true);
};

const closeModal = () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  toggleBodyScroll(false);
};

contactNavLink.addEventListener("click", openModal);
contactFab.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

const handleFormSubmit = function (e) {
  e.preventDefault();
  const btn = this.querySelector("button");
  btn.disabled = true;
  btn.textContent = "Submitting...";
  setTimeout(() => {
    alert("Message submitted!");
    btn.disabled = false;
    btn.textContent = "Submit";
    this.reset();
  }, 1000);
};

pageForm.addEventListener("submit", handleFormSubmit);
modalForm.addEventListener("submit", handleFormSubmit);