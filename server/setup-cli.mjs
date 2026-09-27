import { spawn } from "node:child_process";

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: true, windowsHide: true });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${code}`))));
  });
}

console.log("Installing Arduino CLI core for Uno (arduino:avr)…");
console.log("If arduino-cli is missing, install it first: https://arduino.github.io/arduino-cli/latest/installation/");

await run("arduino-cli", ["core", "update-index"]);
await run("arduino-cli", ["core", "install", "arduino:avr"]);
console.log("Ready. npm run dev  →  open /code.html");
