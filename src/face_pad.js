import {
  hexToRows,
  rowsToHex,
  rotateRows180,
  flipRowsHorizontal,
  flipRowsVertical,
} from "./field_matrix.js";

const FACE_KEY = "bw-face-hex";
const SMILE = "0066000018423c00";

let hex = localStorage.getItem(FACE_KEY) || SMILE;
let onChange = () => {};

function bitOn(rows, col, row) {
  return ((rows[row] >> (7 - col)) & 1) === 1;
}

function setBit(rows, col, row, on) {
  const bit = 1 << (7 - col);
  if (on) rows[row] |= bit;
  else rows[row] &= ~bit;
}

export function getFaceHex() {
  return hex;
}

export function setFaceHex(next) {
  hex = String(next || SMILE).padEnd(16, "0").slice(0, 16);
  localStorage.setItem(FACE_KEY, hex);
  paint();
  onChange();
}

export function faceBytesForRobot() {
  return hexToRows(hex);
}

export function faceListForSketch() {
  return faceBytesForRobot()
    .map((n) => `0x${n.toString(16).padStart(2, "0")}`)
    .join(", ");
}

function paint() {
  const root = document.getElementById("face-grid");
  if (!root) return;
  const rows = hexToRows(hex);
  [...root.children].forEach((btn, i) => {
    const c = i % 8;
    const r = Math.floor(i / 8);
    btn.classList.toggle("on", bitOn(rows, c, r));
  });
}

export function initFacePad(handler) {
  onChange = handler || (() => {});
  const root = document.getElementById("face-grid");
  const pad = document.getElementById("face-pad");
  if (!root || !pad) return;

  root.innerHTML = "";
  let dragging = false;
  let paintOn = true;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "face-led";
      btn.title = `${c + 1},${r + 1}`;
      const apply = () => {
        const current = hexToRows(hex);
        setBit(current, c, r, paintOn);
        setFaceHex(rowsToHex(current));
      };
      btn.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        dragging = true;
        const current = hexToRows(hex);
        paintOn = event.button === 2 ? false : !bitOn(current, c, r);
        if (event.button === 2) paintOn = false;
        apply();
      });
      btn.addEventListener("pointerenter", () => {
        if (dragging) apply();
      });
      root.append(btn);
    }
  }
  paint();

  window.addEventListener("pointerup", () => {
    dragging = false;
  });
  root.addEventListener("contextmenu", (event) => event.preventDefault());

  pad.querySelector("[data-face='clear']")?.addEventListener("click", () => {
    setFaceHex("0000000000000000");
  });
  pad.querySelector("[data-face='smile']")?.addEventListener("click", () => {
    setFaceHex(SMILE);
  });
  pad.querySelector("[data-face='flip180']")?.addEventListener("click", () => {
    setFaceHex(rowsToHex(rotateRows180(hexToRows(hex))));
  });
  pad.querySelector("[data-face='fliph']")?.addEventListener("click", () => {
    setFaceHex(rowsToHex(flipRowsHorizontal(hexToRows(hex))));
  });
  pad.querySelector("[data-face='flipv']")?.addEventListener("click", () => {
    setFaceHex(rowsToHex(flipRowsVertical(hexToRows(hex))));
  });
}

export { SMILE };
