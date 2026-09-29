import { applySiteI18n, wireLangSwitcher } from "./site-i18n.js";

const buttons = document.querySelectorAll("nav button");
const panels = document.querySelectorAll(".panel");
const agendaOverview = document.getElementById("agenda-overview");
const agendaDetail = document.getElementById("agenda-detail");
const agendaBack = document.getElementById("agenda-back");
const openTurtleAgenda = document.getElementById("open-turtle-agenda");

function showPanel(id) {
  if (id === "coding") {
    window.open("code.html", "_blank", "noopener");
    return;
  }
  if (id === "timeline") {
    showPanel("agenda");
    openTurtleDetail();
    return;
  }
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === id);
  });
  buttons.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.panel === id));
  });
  if (id !== "agenda") closeTurtleDetail();
  history.replaceState(null, "", `${location.pathname}${location.search}#${id}`);
}

function openTurtleDetail() {
  if (!agendaOverview || !agendaDetail) return;
  agendaOverview.hidden = true;
  agendaDetail.hidden = false;
  history.replaceState(
    null,
    "",
    `${location.pathname}${location.search}#agenda/turtle`,
  );
  agendaBack?.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeTurtleDetail() {
  if (!agendaOverview || !agendaDetail) return;
  agendaDetail.hidden = true;
  agendaOverview.hidden = false;
  if (location.hash.startsWith("#agenda")) {
    history.replaceState(null, "", `${location.pathname}${location.search}#agenda`);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panel));
});

openTurtleAgenda?.addEventListener("click", () => {
  showPanel("agenda");
  openTurtleDetail();
});

agendaBack?.addEventListener("click", () => {
  closeTurtleDetail();
  history.replaceState(null, "", `${location.pathname}${location.search}#agenda`);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute("href").slice(1);
  if (!id || id.includes("/")) return;
  if (document.getElementById(id)?.classList.contains("panel")) {
    event.preventDefault();
    showPanel(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

wireLangSwitcher();
applySiteI18n();

const telloDemo = new URLSearchParams(location.search).get("tello");
if (telloDemo) {
  window.location.replace(
    `code.html?robot=tello&demo=${encodeURIComponent(telloDemo)}`,
  );
}

const rawHash = (location.hash || "#home").replace(/^#/, "");
const [panelId, agendaSlot] = rawHash.split("/");

if (panelId === "coding") {
  window.location.replace("code.html");
} else if (panelId === "timeline") {
  showPanel("agenda");
  openTurtleDetail();
} else if (panelId === "agenda" && agendaSlot === "turtle") {
  showPanel("agenda");
  openTurtleDetail();
} else {
  showPanel(document.getElementById(panelId) ? panelId : "home");
}
