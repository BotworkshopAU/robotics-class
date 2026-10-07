import { hexToRows } from "./field_matrix.js";

const EMPTY = "0000000000000000";
export const SMILE = "0066000018423c00";

/** Ready-made pictures. Click one to load it into the selected drawing block. */
export const FACE_PRESETS = [
  { id: "smile", hex: SMILE },
  { id: "blink", hex: "0000660018423c00" },
  { id: "wink", hex: "0060060018423c00" },
  { id: "sad", hex: "006600003c421800" },
  { id: "oh", hex: "0066000018241800" },
  { id: "flat", hex: "00660000007e0000" },
  { id: "heart", hex: "66ffff7e3c180000" },
  { id: "up", hex: "183c7e1818181800" },
  { id: "down", hex: "00181818187e3c18" },
  { id: "left", hex: "081838ffff383808" },
  { id: "right", hex: "10181cffff1c1810" },
  { id: "yes", hex: "0103068cd8702000" },
  { id: "no", hex: "c3663c18183c66c3" },
];

let hex = SMILE;
let onChange = () => {};

function cleanHex(value, fallback = EMPTY) {
  const raw = String(value || "")
    .replace(/[^0-9a-fA-F]/g, "")
    .toLowerCase();
  if (raw.length < 16) return fallback;
  return raw.slice(0, 16);
}

function bitOn(rows, col, row) {
  return ((rows[row] >> (7 - col)) & 1) === 1;
}

/** Remember the selected block's picture so the next preset click can replace it. */
export function showFaceHex(next) {
  hex = cleanHex(next, SMILE);
}

function commit(next) {
  hex = cleanHex(next, EMPTY);
  onChange(hex);
}

export function initFacePad(handler) {
  onChange = handler || (() => {});
  const presets = document.getElementById("face-presets");
  if (!presets) return;

  presets.innerHTML = "";
  for (const preset of FACE_PRESETS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.preset = preset.id;
    const grid = document.createElement("span");
    grid.className = "face-preset-grid";
    const rows = hexToRows(preset.hex);
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const dot = document.createElement("i");
        if (bitOn(rows, c, r)) dot.className = "on";
        grid.append(dot);
      }
    }
    const caption = document.createElement("span");
    caption.className = "face-preset-name";
    caption.textContent = preset.id;
    btn.append(grid, caption);
    btn.addEventListener("click", () => commit(preset.hex));
    presets.append(btn);
  }
}
