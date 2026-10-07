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
import { initFacePad, showFaceHex, SMILE } from "./face_pad.js";
import { getMotorFlip, setMotorFlip, getLineSense, setLineSense } from "./motors_pref.js";
import { getLang, setLang, ui } from "./i18n.js";
import { uploadTurtleSketch, webSerialSupported, compileApiAvailable, isLocalCodingHost } from "./upload.js";
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
} else if (pageParams.get("robot") === "turtle") {
  localStorage.setItem("bw-robot", "turtle");
  robot = "turtle";
}

const blocklyDiv = document.getElementById("blockly");
const codeEl = document.getElementById("arduino-code");
const statusEl = document.getElementById("status");
const statusBar = document.getElementById("status-bar");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const progressTrack = document.getElementById("progress-track");
const progressFill = document.getElementById("progress-fill");
const robotSelect = document.getElementById("robot-select");
const demoSelect = document.getElementById("demo-select");
const langSelect = document.getElementById("lang-select");
const downloadBtn = document.getElementById("download-btn");
const uploadBtn = document.getElementById("upload-btn");
const telloControllerBtn = document.getElementById("tello-controller-btn");
const copyBtn = document.getElementById("copy-btn");
const newBtn = document.getElementById("new-btn");
const codeTitle = document.getElementById("code-title");
const turtleSteps = document.getElementById("turtle-steps");
const telloSteps = document.getElementById("tello-steps");
const setupHeader = document.getElementById("setup");
const facePad = document.getElementById("face-pad");

let workspace = null;

function hideStatusBar() {
  if (statusBar) statusBar.hidden = true;
  if (statusEl) statusEl.textContent = "";
  if (progressBar) progressBar.hidden = true;
  if (progressText) progressText.textContent = "";
  if (progressTrack) progressTrack.hidden = true;
  if (progressFill) progressFill.style.width = "0%";
}

function showFailBar(message) {
  if (progressBar) progressBar.hidden = true;
  if (statusEl) statusEl.textContent = message;
  if (statusBar) statusBar.hidden = false;
}

function showProgressBar(message, pct) {
  if (statusBar) statusBar.hidden = true;
  if (progressText) progressText.textContent = message;
  if (progressBar) progressBar.hidden = false;
  if (typeof pct === "number" && Number.isFinite(pct)) {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (progressTrack) progressTrack.hidden = false;
    if (progressFill) progressFill.style.width = `${clamped}%`;
  } else {
    if (progressTrack) progressTrack.hidden = true;
    if (progressFill) progressFill.style.width = "0%";
  }
}

function currentToolbox() {
  return robot === "tello" ? getTelloToolbox(lang) : getTurtleToolbox(lang);
}

let editingMatrixId = null;

function editingMatrixBlock() {
  if (!workspace || !editingMatrixId) return null;
  const block = workspace.getBlockById(editingMatrixId);
  if (!block || block.type !== "turtle_matrix" || block.isInFlyout) return null;
  return block;
}

function bindPadToBlock(block) {
  if (!block || block.type !== "turtle_matrix" || block.isInFlyout) return;
  editingMatrixId = block.id;
  showFaceHex(block.getFieldValue("FACE") || SMILE);
}

function applyPadToEditingBlock(hex) {
  let target = editingMatrixBlock();
  if (!target && workspace) {
    const only = workspace
      .getBlocksByType("turtle_matrix", false)
      .filter((item) => !item.isInFlyout);
    if (only.length === 1) {
      editingMatrixId = only[0].id;
      target = only[0];
    }
  }
  if (!target) return;
  const field = target.getField("FACE");
  if (!field || field.getValue() === hex) return;
  Blockly.Events.disable();
  try {
    field.setValue(hex);
  } finally {
    Blockly.Events.enable();
  }
}

function onMatrixBlockEdit(event) {
  if (!workspace || event.workspaceId !== workspace.id) return;
  if (event.type === Blockly.Events.SELECTED) {
    const block = event.newElementId ? workspace.getBlockById(event.newElementId) : null;
    if (block) bindPadToBlock(block);
    return;
  }
  if (event.type !== Blockly.Events.BLOCK_CHANGE || event.name !== "FACE") return;
  if (event.blockId === editingMatrixId && event.newValue != null) showFaceHex(event.newValue);
}

function migrateMatrixState(state) {
  const walk = (block) => {
    if (!block || typeof block !== "object") return;
    if (block.type === "turtle_matrix" || /^turtle_matrix_\d+$/.test(block.type || "")) {
      const face = block.fields?.FACE || SMILE;
      block.type = "turtle_matrix";
      block.fields = { ...(block.fields || {}), FACE: face };
    }
    if (block.next?.block) walk(block.next.block);
    if (block.inputs) {
      for (const input of Object.values(block.inputs)) walk(input?.block);
    }
  };
  const roots = state?.blocks?.blocks;
  if (Array.isArray(roots)) roots.forEach(walk);
  return state;
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
  workspace.addChangeListener(onMatrixBlockEdit);
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
      Blockly.serialization.workspaces.load(migrateMatrixState(JSON.parse(saved)), workspace);
      return;
    } catch {
      /* broken save */
    }
  }
  Blockly.serialization.workspaces.load(migrateMatrixState(fallback), workspace);
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
  const help = facePad.querySelector(":scope > .face-help");
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
  const presetTitle = facePad.querySelector(".face-presets-label");
  if (presetTitle) presetTitle.textContent = t.facePresetTitle;
  facePad.querySelectorAll("[data-preset]").forEach((btn) => {
    const name = btn.querySelector(".face-preset-name");
    const label = t.facePresets?.[btn.dataset.preset];
    if (name && label) name.textContent = label;
    if (label) btn.title = label;
  });
  const motorPrefs = document.getElementById("motor-prefs");
  if (motorPrefs) {
    const mHeader = motorPrefs.querySelector("header");
    const helps = motorPrefs.querySelectorAll(".face-help");
    const labels = motorPrefs.querySelectorAll(".motor-flip-label > span");
    const sel = document.getElementById("motor-flip");
    const lineSel = document.getElementById("line-sense");
    const lineHeader = motorPrefs.querySelector(".prefs-subhead");
    if (mHeader) mHeader.textContent = t.motorTitle;
    if (helps[0]) helps[0].textContent = t.motorHelp;
    if (labels[0]) labels[0].textContent = t.motorFlip;
    if (sel) {
      const opts = [t.motorFlip0, t.motorFlip1, t.motorFlip2, t.motorFlip3];
      [...sel.options].forEach((opt, i) => {
        if (opts[i]) opt.textContent = opts[i];
      });
      sel.setAttribute("aria-label", t.motorFlip);
    }
    if (lineHeader) lineHeader.textContent = t.lineTitle;
    if (helps[1]) helps[1].textContent = t.lineHelp;
    if (labels[1]) labels[1].textContent = t.lineSense;
    if (lineSel) {
      const byVal = { 1: t.lineSenseStandard, 0: t.lineSenseFlipped };
      [...lineSel.options].forEach((opt) => {
        if (byVal[opt.value] != null) opt.textContent = byVal[opt.value];
      });
      lineSel.setAttribute("aria-label", t.lineSense);
    }
  }
}

let uploadReady = false;

/** Upload is only offered on localhost when the local compile API is ready. */
function syncUploadButton() {
  if (!uploadBtn) return;
  const show = robot === "turtle" && uploadReady;
  uploadBtn.hidden = !show;
  uploadBtn.disabled = !show;
  uploadBtn.classList.toggle("primary", show);
  if (show) {
    uploadBtn.textContent = ui(lang).uploadTurtle;
    downloadBtn.classList.remove("primary");
  } else if (robot === "turtle") {
    downloadBtn.classList.add("primary");
  }
}

async function refreshUploadAvailability() {
  if (!uploadBtn) return;
  if (robot !== "turtle") {
    uploadReady = false;
    syncUploadButton();
    return;
  }
  // Public / non-local hosts never expose Upload (no discovery, no flash path).
  if (!isLocalCodingHost() || !webSerialSupported()) {
    uploadReady = false;
    syncUploadButton();
    return;
  }
  const health = await compileApiAvailable();
  uploadReady = Boolean(health.ok && health.cli);
  syncUploadButton();
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
    downloadBtn.textContent = t.downloadTello;
    downloadBtn.classList.add("primary");
    if (uploadBtn) {
      uploadBtn.hidden = true;
      uploadBtn.classList.remove("primary");
    }
    codeTitle.textContent = t.codeTello;
    turtleSteps.hidden = true;
    telloSteps.hidden = false;
    telloSteps.innerHTML = t.telloStepsHtml;
    if (telloControllerBtn) {
      telloControllerBtn.hidden = false;
      telloControllerBtn.textContent = t.downloadTelloController;
    }
    fillDemos(t.telloDemos, localStorage.getItem("bw-tello-demo"));
  } else {
    downloadBtn.textContent = t.downloadArduino;
    downloadBtn.classList.add("primary");
    if (uploadBtn) {
      uploadBtn.hidden = true;
      uploadBtn.textContent = t.uploadTurtle;
    }
    codeTitle.textContent = t.codeArduino;
    turtleSteps.hidden = false;
    telloSteps.hidden = true;
    turtleSteps.innerHTML = t.turtleStepsHtml;
    if (telloControllerBtn) telloControllerBtn.hidden = true;
    fillDemos(t.turtleDemos, localStorage.getItem("bw-turtle-demo"));
    void refreshUploadAvailability();
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
  hideStatusBar();
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
      Blockly.serialization.workspaces.load(migrateMatrixState(saved), workspace);
    } catch {
      loadWorkspace();
    }
  } else {
    loadWorkspace();
  }
  applyChrome();
  refreshCode();
  hideStatusBar();
}

injectWorkspace();
applyChrome();
initFacePad((hex) => {
  applyPadToEditingBlock(hex);
  refreshCode();
  saveWorkspace();
});
applyFacePadLabels(ui(lang));

const motorFlipSelect = document.getElementById("motor-flip");
if (motorFlipSelect) {
  motorFlipSelect.value = String(getMotorFlip());
  motorFlipSelect.addEventListener("change", () => {
    setMotorFlip(motorFlipSelect.value);
    refreshCode();
  });
}

const lineSenseSelect = document.getElementById("line-sense");
if (lineSenseSelect) {
  lineSenseSelect.value = String(getLineSense());
  lineSenseSelect.addEventListener("change", () => {
    setLineSense(lineSenseSelect.value);
    refreshCode();
  });
}

const demoParam = new URLSearchParams(location.search).get("demo");
if (robot === "tello" && demoParam && telloDemos[demoParam]) {
  Blockly.serialization.workspaces.load(migrateMatrixState(telloDemos[demoParam]), workspace);
  localStorage.setItem("bw-tello-demo", demoParam);
  demoSelect.value = demoParam;
} else if (robot === "turtle" && demoParam && demos[demoParam]) {
  Blockly.serialization.workspaces.load(migrateMatrixState(demos[demoParam]), workspace);
  localStorage.setItem("bw-turtle-demo", demoParam);
  demoSelect.value = demoParam;
  if (demoParam === "face") {
    const drawn = workspace.getBlocksByType("turtle_matrix", false)[0];
    if (drawn) bindPadToBlock(drawn);
  }
} else {
  loadWorkspace();
}
refreshCode();
hideStatusBar();

robotSelect.addEventListener("change", () => setRobot(robotSelect.value));
langSelect?.addEventListener("change", () => setLanguage(langSelect.value));

newBtn.addEventListener("click", () => {
  if (!confirm(ui(lang).confirmNew)) return;
  const starter = robot === "tello" ? telloStarterWorkspace() : starterWorkspace();
  workspace.clear();
  Blockly.serialization.workspaces.load(migrateMatrixState(starter), workspace);
  demoSelect.value = "";
  localStorage.removeItem(robot === "tello" ? "bw-tello-demo" : "bw-turtle-demo");
  hideStatusBar();
});

demoSelect.addEventListener("change", () => {
  const id = demoSelect.value;
  const pack = robot === "tello" ? telloDemos : demos;
  if (!id || !pack[id]) return;
  try {
    workspace.clear();
    Blockly.serialization.workspaces.load(migrateMatrixState(pack[id]), workspace);
    if (robot === "turtle" && id === "face") {
      const drawn = workspace.getBlocksByType("turtle_matrix", false)[0];
      if (drawn) bindPadToBlock(drawn);
    }
    localStorage.setItem(robot === "tello" ? "bw-tello-demo" : "bw-turtle-demo", id);
    hideStatusBar();
  } catch (err) {
    console.error(err);
    showFailBar(ui(lang).statusDemoFail);
  }
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(codeEl.textContent);
  hideStatusBar();
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([codeEl.textContent], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = robot === "tello" ? "tello_mission.py" : "turtle.ino";
  a.click();
  URL.revokeObjectURL(a.href);
  hideStatusBar();
});

let uploading = false;
uploadBtn?.addEventListener("click", async () => {
  if (robot !== "turtle") return;
  if (uploading) return;
  await refreshUploadAvailability();
  if (!uploadReady) return;
  const t = ui(lang);
  uploading = true;
  uploadBtn.disabled = true;
  hideStatusBar();
  try {
    await uploadTurtleSketch(codeEl.textContent, (phase, pct) => {
      if (phase === "compiling") showProgressBar(t.statusUploadingCompile);
      else if (phase === "pick-port") showProgressBar(t.statusUploadingPort);
      else if (phase === "opening") showProgressBar(t.statusUploadingOpen);
      else if (phase === "flashing") {
        if (typeof pct === "number") {
          showProgressBar(
            t.statusUploadingFlashPct.replace("{pct}", String(Math.round(pct))),
            pct,
          );
        } else {
          showProgressBar(t.statusUploadingFlash);
        }
      } else if (phase === "done") {
        showProgressBar(t.statusUploadDone, 100);
      }
    });
    hideStatusBar();
  } catch (err) {
    console.error(err);
    const code = err?.code;
    if (code === "no-serial") showFailBar(t.statusUploadNoSerial);
    else if (code === "not-local") showFailBar(t.statusUploadNotLocal);
    else if (code === "no-api") showFailBar(t.statusUploadNoApi);
    else if (code === "no-cli") showFailBar(t.statusUploadNoCli);
    else if (code === "cancelled" || err?.name === "NotFoundError") {
      showFailBar(t.statusUploadCancelled);
    } else {
      showFailBar(`${t.statusUploadFail} ${String(err?.message || err).slice(0, 160)}`);
    }
  } finally {
    uploading = false;
    await refreshUploadAvailability();
  }
});

telloControllerBtn?.addEventListener("click", () => {
  hideStatusBar();
});

window.addEventListener("resize", () => Blockly.svgResize(workspace));
window.addEventListener("message", (event) => {
  if (event.data?.type === "bw-resize") Blockly.svgResize(workspace);
});

if (new URLSearchParams(location.search).has("embed")) {
  document.body.classList.add("embed");
}

requestAnimationFrame(() => Blockly.svgResize(workspace));
