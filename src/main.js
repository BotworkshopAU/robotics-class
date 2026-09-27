import * as Blockly from "blockly";
import "blockly/blocks";
import * as enLocale from "blockly/msg/en";
import * as arLocale from "blockly/msg/ar";
import {
  defineTurtleBlocks,
  getTurtleToolbox,
  starterWorkspace,
  demos,
} from "./blocks.js";
import { workspaceToSketch } from "./generator.js";
import {
  defineTelloBlocks,
  getTelloToolbox,
  telloStarterWorkspace,
  telloDemos,
  workspaceToTelloPython,
} from "./tello.js";
import { initFacePad, setFaceHex, SMILE } from "./face_pad.js";
import { getLang, setLang, ui } from "./i18n.js";
import "./code.css";

let lang = getLang();
Blockly.setLocale(lang === "ar" ? arLocale : enLocale);
defineTurtleBlocks(lang);
defineTelloBlocks(lang);

const pageParams = new URLSearchParams(location.search);
let robot =
  pageParams.get("robot") === "tello" || localStorage.getItem("bw-robot") === "tello"
    ? "tello"
    : "turtle";
if (pageParams.get("robot") === "tello") {
  localStorage.setItem("bw-robot", "tello");
}

const blocklyDiv = document.getElementById("blockly");
const codeEl = document.getElementById("arduino-code");
const statusEl = document.getElementById("status");
const hintEl = document.getElementById("hint-static");
const robotSelect = document.getElementById("robot-select");
const demoSelect = document.getElementById("demo-select");
const langSelect = document.getElementById("lang-select");
const downloadBtn = document.getElementById("download-btn");
const copyBtn = document.getElementById("copy-btn");
const newBtn = document.getElementById("new-btn");
const codeTitle = document.getElementById("code-title");
const turtleSteps = document.getElementById("turtle-steps");
const telloSteps = document.getElementById("tello-steps");
const setupHeader = document.getElementById("setup");
const facePad = document.getElementById("face-pad");

let workspace = null;

function currentToolbox() {
  return robot === "tello" ? getTelloToolbox(lang) : getTurtleToolbox(lang);
}

function injectWorkspace() {
  if (workspace) {
    workspace.dispose();
    workspace = null;
  }
  workspace = Blockly.inject(blocklyDiv, {
    toolbox: currentToolbox(),
    renderer: "zelos",
    theme: Blockly.Themes.Classic,
    rtl: lang === "ar",
    zoom: { controls: true, wheel: true, startScale: 0.9 },
    trashcan: true,
    move: { scrollbars: true, drag: true, wheel: true },
  });
  workspace.addChangeListener(onWorkspaceChange);
}

function onWorkspaceChange() {
  refreshCode();
  saveWorkspace();
}

function saveWorkspace() {
  if (!workspace) return;
  const key = robot === "tello" ? "bw-tello-workspace" : "bw-turtle-workspace";
  localStorage.setItem(key, JSON.stringify(Blockly.serialization.workspaces.save(workspace)));
}

function loadWorkspace() {
  const key = robot === "tello" ? "bw-tello-workspace" : "bw-turtle-workspace";
  const fallback = robot === "tello" ? telloStarterWorkspace() : starterWorkspace();
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      Blockly.serialization.workspaces.load(JSON.parse(saved), workspace);
      return;
    } catch {
      /* broken save */
    }
  }
  Blockly.serialization.workspaces.load(fallback, workspace);
}

function fillDemos(options, selected) {
  demoSelect.innerHTML = "";
  for (const [value, label] of options) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    demoSelect.append(opt);
  }
  demoSelect.value = selected && [...demoSelect.options].some((o) => o.value === selected)
    ? selected
    : "";
}

function applyFacePadLabels(t) {
  if (!facePad) return;
  const header = facePad.querySelector(":scope > header");
  const help = facePad.querySelector(".face-help");
  if (header) header.textContent = t.faceTitle;
  if (help) help.textContent = t.faceHelp;
  const map = {
    smile: t.faceSmile,
    clear: t.faceClear,
    flip180: t.faceFlip180,
    fliph: t.faceFlipH,
    flipv: t.faceFlipV,
  };
  for (const [key, label] of Object.entries(map)) {
    const btn = facePad.querySelector(`[data-face='${key}']`);
    if (btn) btn.textContent = label;
  }
}

function applyChrome() {
  const t = ui(lang);
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("tello-mode", robot === "tello");
  document.body.classList.toggle("lang-ar", lang === "ar");

  const hub = document.querySelector(".brand.hub");
  const home = document.querySelector(".brand.home");
  if (hub) hub.textContent = t.classHub;
  if (home) home.textContent = t.home;

  const robotLabel = document.querySelector('[data-i18n="robot"]');
  const demoLabel = document.querySelector('[data-i18n="demo"]');
  if (robotLabel) robotLabel.textContent = t.robot;
  if (demoLabel) demoLabel.textContent = t.demo;

  robotSelect.options[0].textContent = t.robotTurtle;
  robotSelect.options[1].textContent = t.robotTello;
  robotSelect.value = robot;
  newBtn.textContent = t.newBtn;
  copyBtn.textContent = t.copyCode;
  if (setupHeader) setupHeader.textContent = t.setup;
  applyFacePadLabels(t);

  if (langSelect) langSelect.value = lang;

  if (robot === "tello") {
    hintEl.textContent = t.hintTello;
    downloadBtn.textContent = t.downloadTello;
    codeTitle.textContent = t.codeTello;
    turtleSteps.hidden = true;
    telloSteps.hidden = false;
    telloSteps.innerHTML = t.telloStepsHtml;
    fillDemos(t.telloDemos, localStorage.getItem("bw-tello-demo"));
  } else {
    hintEl.textContent = t.hintTurtle;
    downloadBtn.textContent = t.downloadArduino;
    codeTitle.textContent = t.codeArduino;
    turtleSteps.hidden = false;
    telloSteps.hidden = true;
    turtleSteps.innerHTML = t.turtleStepsHtml;
    fillDemos(t.turtleDemos, localStorage.getItem("bw-turtle-demo"));
  }
}

function refreshCode() {
  if (!workspace) return;
  codeEl.textContent =
    robot === "tello"
      ? workspaceToTelloPython(workspace)
      : workspaceToSketch(workspace);
}

function setRobot(next) {
  if (next === robot) return;
  saveWorkspace();
  robot = next;
  localStorage.setItem("bw-robot", robot);
  workspace.updateToolbox(currentToolbox());
  applyChrome();
  loadWorkspace();
  refreshCode();
  Blockly.svgResize(workspace);
  statusEl.textContent = robot === "tello" ? ui(lang).statusTello : ui(lang).statusTurtle;
}

function setLanguage(next) {
  const nextLang = setLang(next);
  if (nextLang === lang && workspace) {
    applyChrome();
    return;
  }
  const saved = workspace
    ? Blockly.serialization.workspaces.save(workspace)
    : null;
  lang = nextLang;
  Blockly.setLocale(lang === "ar" ? arLocale : enLocale);
  defineTurtleBlocks(lang);
  defineTelloBlocks(lang);
  injectWorkspace();
  if (saved) {
    try {
      Blockly.serialization.workspaces.load(saved, workspace);
    } catch {
      loadWorkspace();
    }
  } else {
    loadWorkspace();
  }
  applyChrome();
  refreshCode();
  statusEl.textContent = ui(lang).ready;
}

injectWorkspace();
applyChrome();
initFacePad(() => refreshCode());

const demoParam = new URLSearchParams(location.search).get("demo");
if (robot === "tello" && demoParam && telloDemos[demoParam]) {
  Blockly.serialization.workspaces.load(telloDemos[demoParam], workspace);
  localStorage.setItem("bw-tello-demo", demoParam);
  demoSelect.value = demoParam;
  statusEl.textContent = `Demo: ${demoSelect.options[demoSelect.selectedIndex]?.text || demoParam}`;
} else {
  loadWorkspace();
}
refreshCode();

robotSelect.addEventListener("change", () => setRobot(robotSelect.value));
langSelect?.addEventListener("change", () => setLanguage(langSelect.value));

newBtn.addEventListener("click", () => {
  if (!confirm(ui(lang).confirmNew)) return;
  const starter = robot === "tello" ? telloStarterWorkspace() : starterWorkspace();
  workspace.clear();
  Blockly.serialization.workspaces.load(starter, workspace);
  demoSelect.value = "";
  localStorage.removeItem(robot === "tello" ? "bw-tello-demo" : "bw-turtle-demo");
  statusEl.textContent = ui(lang).statusNew;
});

demoSelect.addEventListener("change", () => {
  const id = demoSelect.value;
  const pack = robot === "tello" ? telloDemos : demos;
  if (!id || !pack[id]) return;
  try {
    workspace.clear();
    Blockly.serialization.workspaces.load(pack[id], workspace);
    if (robot === "turtle" && id === "face") setFaceHex(SMILE);
    localStorage.setItem(robot === "tello" ? "bw-tello-demo" : "bw-turtle-demo", id);
    const name = demoSelect.options[demoSelect.selectedIndex].text;
    statusEl.textContent = `Demo: ${name}`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = ui(lang).statusDemoFail;
  }
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(codeEl.textContent);
  statusEl.textContent =
    robot === "tello" ? ui(lang).statusCopyTello : ui(lang).statusCopyArduino;
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([codeEl.textContent], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = robot === "tello" ? "tello_mission.py" : "turtle.ino";
  a.click();
  URL.revokeObjectURL(a.href);
  statusEl.textContent =
    robot === "tello" ? ui(lang).statusDownloadTello : ui(lang).statusDownloadArduino;
});

window.addEventListener("resize", () => Blockly.svgResize(workspace));
window.addEventListener("message", (event) => {
  if (event.data?.type === "bw-resize") Blockly.svgResize(workspace);
});

if (new URLSearchParams(location.search).has("embed")) {
  document.body.classList.add("embed");
}

requestAnimationFrame(() => Blockly.svgResize(workspace));
