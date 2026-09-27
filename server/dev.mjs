import { spawn } from "node:child_process";
import { createApp } from "./compile.mjs";

const api = createApp();
api.listen(8787, () => {
  console.log("Compile API http://127.0.0.1:8787");
});

const vite = spawn("npx", ["vite", "--host"], {
  stdio: "inherit",
  shell: true,
});

vite.on("exit", (code) => process.exit(code ?? 0));
