const slider = document.querySelector("#slider");
const before = document.querySelector(".before");
const divider = document.querySelector(".divider");
const handle = document.querySelector(".handle");
let dragging = false;
let position = 50;
function update(value) {
  position = Math.max(0, Math.min(100, value));
  before.style.clipPath =
    `inset(0 ${100 - position}% 0 0)`;
  divider.style.left = position + "%";
  handle.style.left = position + "%";
  slider.setAttribute("aria-valuenow", Math.round(position));
}
function move(e) {
  const rect = slider.getBoundingClientRect();
  update((e.clientX - rect.left) / rect.width * 100);
}
slider.addEventListener("pointerdown", e => {
  dragging = true;
  slider.setPointerCapture(e.pointerId);
  move(e);
});
slider.addEventListener("pointermove", e => {
  if (dragging) move(e);
});
slider.addEventListener("pointerup", () => dragging = false);
slider.addEventListener("pointercancel", () => dragging = false);
slider.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    update(position + (e.key === "ArrowRight" ? 5 : -5));
  }
});