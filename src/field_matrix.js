import * as Blockly from "blockly";

const EMPTY = "0000000000000000";
const CELL = 8;
const GAP = 1;
const PAD = 3;

function cleanHex(value) {
  return String(value || EMPTY)
    .replace(/[^0-9a-fA-F]/g, "")
    .padEnd(16, "0")
    .slice(0, 16)
    .toLowerCase();
}

export function hexToRows(hex) {
  const h = cleanHex(hex);
  const rows = [];
  for (let r = 0; r < 8; r++) {
    rows.push(parseInt(h.slice(r * 2, r * 2 + 2), 16));
  }
  return rows;
}

export function rowsToHex(rows) {
  return rows.map((n) => (n & 255).toString(16).padStart(2, "0")).join("");
}

function reverseBits(byte) {
  let out = 0;
  for (let i = 0; i < 8; i++) {
    if (byte & (1 << i)) out |= 1 << (7 - i);
  }
  return out;
}

export function rotateRows180(rows) {
  return rows
    .slice()
    .reverse()
    .map((row) => reverseBits(row));
}

export function flipRowsVertical(rows) {
  return rows.slice().reverse();
}

export function flipRowsHorizontal(rows) {
  return rows.map((row) => reverseBits(row));
}

function bitOn(rows, col, row) {
  return ((rows[row] >> (7 - col)) & 1) === 1;
}

function setBit(rows, col, row, on) {
  const bit = 1 << (7 - col);
  if (on) rows[row] |= bit;
  else rows[row] &= ~bit;
}

function svgEl(name, attrs, parent) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, String(val));
  }
  parent.appendChild(el);
  return el;
}

export class FieldLedMatrix extends Blockly.Field {
  constructor(value) {
    super(cleanHex(value));
    this.SERIALIZABLE = true;
    this.CURSOR = "pointer";
    this.cells_ = [];
  }

  static fromJson(options) {
    return new FieldLedMatrix(options["value"] || EMPTY);
  }

  doClassValidation_(newValue) {
    return cleanHex(newValue);
  }

  saveState() {
    return this.getValue();
  }

  loadState(state) {
    this.setValue(typeof state === "string" ? state : state?.value);
  }

  applyRows_(rows) {
    this.setValue(rowsToHex(rows));
    this.renderPreview_();
  }

  initView() {
    this.createBorderRect_();
    this.previewGroup_ = svgEl("g", { class: "blocklyLedMatrix" }, this.fieldGroup_);
    this.cells_ = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        this.cells_.push(
          svgEl(
            "rect",
            {
              x: PAD + c * (CELL + GAP),
              y: PAD + r * (CELL + GAP),
              width: CELL,
              height: CELL,
              rx: 1,
            },
            this.previewGroup_
          )
        );
      }
    }
    const size = PAD * 2 + 8 * CELL + 7 * GAP;
    this.updateSize_();
    this.renderPreview_();
  }

  updateSize_() {
    const size = PAD * 2 + 8 * CELL + 7 * GAP;
    this.size_ = new Blockly.utils.Size(size, size);
    if (this.borderRect_) {
      this.borderRect_.setAttribute("width", String(size));
      this.borderRect_.setAttribute("height", String(size));
    }
  }

  render_() {
    this.renderPreview_();
  }

  renderPreview_() {
    if (!this.cells_?.length) return;
    const rows = hexToRows(this.getValue());
    this.cells_.forEach((rect, i) => {
      const c = i % 8;
      const r = Math.floor(i / 8);
      rect.setAttribute("fill", bitOn(rows, c, r) ? "#f4b942" : "#2a2a2a");
    });
  }

  getText() {
    return "8×8";
  }

  showEditor_() {
    const editor = document.createElement("div");
    editor.className = "matrix-editor";
    const grid = document.createElement("div");
    grid.className = "matrix-grid";
    const rows = hexToRows(this.getValue());
    let paintOn = true;
    let dragging = false;

    const paint = (btn, col, row) => {
      setBit(rows, col, row, paintOn);
      btn.classList.toggle("on", paintOn);
      this.applyRows_(rows);
    };

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "matrix-cell" + (bitOn(rows, c, r) ? " on" : "");
        btn.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          dragging = true;
          paintOn = event.button === 2 ? false : !bitOn(rows, c, r);
          if (event.button === 2) paintOn = false;
          paint(btn, c, r);
        });
        btn.addEventListener("pointerenter", () => {
          if (dragging) paint(btn, c, r);
        });
        grid.append(btn);
      }
    }

    const stop = () => {
      dragging = false;
    };
    window.addEventListener("pointerup", stop);
    grid.addEventListener("contextmenu", (event) => event.preventDefault());

    const tools = document.createElement("div");
    tools.className = "matrix-tools";

    const addTool = (label, fn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", () => {
        const next = fn(rows.slice());
        for (let i = 0; i < 8; i++) rows[i] = next[i];
        this.applyRows_(rows);
        grid.querySelectorAll(".matrix-cell").forEach((el, i) => {
          el.classList.toggle("on", bitOn(rows, i % 8, Math.floor(i / 8)));
        });
      });
      tools.append(b);
    };

    addTool("Clear", () => [0, 0, 0, 0, 0, 0, 0, 0]);
    addTool("Upside down", rotateRows180);
    addTool("Flip L/R", flipRowsHorizontal);
    addTool("Flip U/D", flipRowsVertical);

    const hint = document.createElement("p");
    hint.className = "matrix-hint";
    hint.textContent = "Click or drag to draw. Right-click erases.";

    editor.append(hint, grid, tools);
    Blockly.DropDownDiv.getContentDiv().append(editor);
    Blockly.DropDownDiv.setColour("#1b1b1b", "#f4b942");
    Blockly.DropDownDiv.showPositionedByField(this, () => {
      window.removeEventListener("pointerup", stop);
    });
  }
}

FieldLedMatrix.prototype.EDITABLE = true;
FieldLedMatrix.prototype.SERIALIZABLE = true;
FieldLedMatrix.prototype.DEFAULT_VALUE = EMPTY;

try {
  Blockly.fieldRegistry.unregister("field_led_matrix");
} catch {
  /* not registered yet */
}
Blockly.fieldRegistry.register("field_led_matrix", FieldLedMatrix);
