import { spawn } from "node:child_process";
import { createApp } from "./compile.mjs";

const host = "127.0.0.1";
const api = createApp();
api.listen(8787, host, () => {
  console.log(`Compile API http://${host}:8787 (this PC only — Upload needs localhost)`);
});

const viteArgs = ["vite"];
// Keep Vite on localhost by default; use `npm run vite -- --host` only if you know you need LAN.
if (process.argv.includes("--host")) viteArgs.push("--host");

const vite = spawn("npx", viteArgs, {
  stdio: "inherit",
  shell: true,
});

vite.on("exit", (code) => process.exit(code ?? 0));
