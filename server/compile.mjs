import { createHash } from "node:crypto";
import express from "express";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const serveDist = process.argv.includes("--serve-dist");
const PORT = Number(process.env.PORT || 8787);

function whichCli() {
  if (process.env.ARDUINO_CLI) return process.env.ARDUINO_CLI;
  const windows = "C:\\Program Files\\Arduino CLI\\arduino-cli.exe";
  if (process.platform === "win32" && existsSync(windows)) return windows;
  return process.platform === "win32" ? "arduino-cli.exe" : "arduino-cli";
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { ...opts, windowsHide: true });
    let out = "";
    let err = "";
    child.stdout?.on("data", (d) => {
      out += d.toString();
    });
    child.stderr?.on("data", (d) => {
      err += d.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ out, err });
      else reject(new Error(err || out || `${cmd} exited ${code}`));
    });
  });
}

const cacheRoot = path.join(root, ".cache", "arduino");
const sketchDir = path.join(cacheRoot, "turtle");
const sketchFile = path.join(sketchDir, "turtle.ino");
const buildPath = path.join(cacheRoot, "build");
const buildCache = path.join(cacheRoot, "core-cache");
const hexCacheDir = path.join(cacheRoot, "hex");
const fqbn = "arduino:avr:uno";

let compileLock = Promise.resolve();

function sketchHash(sketch) {
  return createHash("sha256").update(sketch).digest("hex");
}

async function compileSketch(sketch) {
  await mkdir(sketchDir, { recursive: true });
  await mkdir(buildPath, { recursive: true });
  await mkdir(buildCache, { recursive: true });
  await mkdir(hexCacheDir, { recursive: true });

  const hash = sketchHash(sketch);
  const cachedHex = path.join(hexCacheDir, `${hash}.hex`);
  if (existsSync(cachedHex)) {
    return { hex: await readFile(cachedHex, "utf8"), cached: true };
  }

  const runThis = compileLock.then(async () => {
    if (existsSync(cachedHex)) {
      return { hex: await readFile(cachedHex, "utf8"), cached: true };
    }
    await writeFile(sketchFile, sketch, "utf8");
    const cli = whichCli();
    await run(cli, [
      "compile",
      "--fqbn",
      fqbn,
      "--warnings",
      "none",
      "--build-path",
      buildPath,
      "--build-cache-path",
      buildCache,
      "--output-dir",
      buildPath,
      sketchDir,
    ]);
    const hexFile = path.join(buildPath, "turtle.ino.hex");
    const hex = await readFile(hexFile, "utf8");
    await writeFile(cachedHex, hex, "utf8");
    return { hex, cached: false };
  });
  compileLock = runThis.then(
    () => {},
    () => {},
  );
  return runThis;
}

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "400kb" }));

  app.post("/api/compile", async (req, res) => {
    const sketch = req.body?.sketch;
    if (!sketch || typeof sketch !== "string") {
      res.status(400).json({ error: "Missing sketch" });
      return;
    }
    try {
      const started = Date.now();
      const { hex, cached } = await compileSketch(sketch);
      res.json({ hex, cached, ms: Date.now() - started });
    } catch (err) {
      const message = String(err.message || err);
      const missing = /ENOENT|not recognized|not found/i.test(message);
      res.status(missing ? 503 : 400).json({
        error: missing
          ? "Arduino CLI is not installed on this server. Run npm run setup:cli (or install arduino-cli and `arduino-cli core install arduino:avr`)."
          : message.slice(0, 2000),
      });
    }
  });

  app.get("/api/health", async (_req, res) => {
    try {
      await run(process.env.ARDUINO_CLI || whichCli(), ["version"]);
      res.json({ ok: true, cli: true });
    } catch {
      res.json({ ok: true, cli: false });
    }
  });

  if (serveDist) {
    app.use(express.static(path.join(root, "dist")));
  }

  return app;
}

if (process.argv[1] && path.normalize(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createApp().listen(PORT, () => {
    console.log(`Compile API on http://127.0.0.1:${PORT}`);
  });
}
