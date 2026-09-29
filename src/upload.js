/**
 * Compile Turtle sketch on THIS PC, then flash Uno via Chrome Web Serial.
 * Upload only works when Coding is opened from a local `npm run dev` (compile API
 * on the same machine). The public GitHub Pages site cannot upload.
 */

import { STK500, WebSerialTransport, BOARDS } from "webserial-flasher";

/** Silicon Labs CP210x (Keyestudio Turtle USB-UART). */
const CP210X = { usbVendorId: 0x10c4 };

/**
 * webserial-flasher passes `{ dtr, rts }`, but Chrome Web Serial requires
 * `{ dataTerminalReady, requestToSend }` — empty recognized keys throws:
 * "Signals dictionary must contain at least one member."
 */
function patchBrowserSignals(transport) {
  const port = transport.port;
  if (!port?.setSignals) return transport;
  transport.setSignals = async (opts = {}) => {
    const signals = {};
    if (typeof opts.dtr === "boolean") signals.dataTerminalReady = opts.dtr;
    if (typeof opts.rts === "boolean") signals.requestToSend = opts.rts;
    if (typeof opts.dataTerminalReady === "boolean") {
      signals.dataTerminalReady = opts.dataTerminalReady;
    }
    if (typeof opts.requestToSend === "boolean") {
      signals.requestToSend = opts.requestToSend;
    }
    if (typeof opts.break === "boolean") signals.break = opts.break;
    if (!Object.keys(signals).length) return;
    await port.setSignals(signals);
  };
  return transport;
}

/** Same-origin only — no remote compile URL (keeps upload on the programming PC). */
export function compileApiBase() {
  return "";
}

export function isLocalCodingHost() {
  const h = location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]" || h === "::1";
}

export function webSerialSupported() {
  return typeof navigator !== "undefined" && WebSerialTransport.isSupported();
}

export async function compileApiAvailable() {
  if (!isLocalCodingHost()) {
    return { ok: false, cli: false, reason: "not-local" };
  }
  try {
    const res = await fetch(`/api/health`, { cache: "no-store" });
    if (!res.ok) return { ok: false, cli: false, reason: "no-api" };
    const data = await res.json();
    return { ok: true, cli: Boolean(data.cli), reason: data.cli ? "ok" : "no-cli" };
  } catch {
    return { ok: false, cli: false, reason: "no-api" };
  }
}

async function compileSketch(sketch, onStatus) {
  onStatus?.("compiling");
  const res = await fetch(`/api/compile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sketch }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Compile failed (${res.status})`);
    err.code = res.status === 503 ? "no-cli" : "compile";
    throw err;
  }
  if (!data.hex || typeof data.hex !== "string") {
    const err = new Error("Compile returned no hex");
    err.code = "compile";
    throw err;
  }
  return data.hex;
}

/**
 * @param {string} sketch Arduino .ino source
 * @param {(phase: string, pct?: number) => void} [onStatus]
 */
export async function uploadTurtleSketch(sketch, onStatus) {
  if (!webSerialSupported()) {
    const err = new Error("Web Serial needs Chrome or Edge on a computer (not phone).");
    err.code = "no-serial";
    throw err;
  }

  const health = await compileApiAvailable();
  if (!health.ok) {
    const err = new Error(
      health.reason === "not-local"
        ? "Upload only works when Coding runs on this PC (npm run dev → localhost)."
        : "Compile API not running. On this PC: npm run setup:cli once, then npm run dev.",
    );
    err.code = health.reason === "not-local" ? "not-local" : "no-api";
    throw err;
  }
  if (!health.cli) {
    const err = new Error("Arduino CLI missing. On this PC run: npm run setup:cli");
    err.code = "no-cli";
    throw err;
  }

  const hex = await compileSketch(sketch, onStatus);

  onStatus?.("pick-port");
  const board = BOARDS["arduino-uno"];
  let transport;
  try {
    transport = patchBrowserSignals(await WebSerialTransport.requestPort([CP210X]));
  } catch (first) {
    if (first?.name === "NotFoundError") {
      try {
        transport = patchBrowserSignals(await WebSerialTransport.requestPort());
      } catch (second) {
        const err = new Error(second?.message || "No USB port selected");
        err.code = "cancelled";
        throw err;
      }
    } else {
      const err = new Error(first?.message || "No USB port selected");
      err.code = "cancelled";
      throw err;
    }
  }

  try {
    onStatus?.("opening");
    await transport.open(board.baudRate);
    const stk = new STK500(transport, board);
    onStatus?.("flashing", 0);
    await stk.bootload(hex, (_status, pct) => {
      onStatus?.("flashing", typeof pct === "number" ? pct : undefined);
    });
    onStatus?.("done", 100);
  } finally {
    try {
      await transport.close();
    } catch {
      /* ignore */
    }
  }
}
