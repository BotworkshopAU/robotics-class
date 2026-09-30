import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./compile.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = "127.0.0.1";
const api = createApp();
api.listen(8787, host, () => {
  console.log(`Compile API http://${host}:8787 (this PC only — Upload needs localhost)`);
});

const viteArgs = [];
if (process.argv.includes("--host")) viteArgs.push("--host");

// Run Vite via node (no shell) to avoid DEP0190 and Windows arg-concatenation risks.
const viteEntry = path.join(root, "node_modules", "vite", "bin", "vite.js");
const vite = spawn(process.execPath, [viteEntry, ...viteArgs], {
  stdio: "inherit",
  cwd: root,
  windowsHide: true,
  env: process.env,
});

vite.on("error", (err) => {
  console.error("Failed to start Vite:", err.message);
  process.exit(1);
});
vite.on("exit", (code) => process.exit(code ?? 0));
