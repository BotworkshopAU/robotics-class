const buttons = document.querySelectorAll("nav button");
const panels = document.querySelectorAll(".panel");

function showPanel(id) {
  if (id === "coding") {
    window.open("code.html", "_blank", "noopener");
    return;
  }
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === id);
  });
  buttons.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.panel === id));
  });
  history.replaceState(null, "", `${location.pathname}${location.search}#${id}`);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panel));
});

const telloDemo = new URLSearchParams(location.search).get("tello");
if (telloDemo) {
  window.location.replace(
    `code.html?robot=tello&demo=${encodeURIComponent(telloDemo)}`
  );
}

const start = (location.hash || "#home").replace("#", "");
if (start === "coding") {
  window.location.replace("code.html");
} else {
  showPanel(document.getElementById(start) ? start : "home");
}
