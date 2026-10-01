import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

function whichCli() {
  if (process.env.ARDUINO_CLI) return process.env.ARDUINO_CLI;
  const windows = "C:\\Program Files\\Arduino CLI\\arduino-cli.exe";
  if (process.platform === "win32" && existsSync(windows)) return windows;
  return process.platform === "win32" ? "arduino-cli.exe" : "arduino-cli";
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", windowsHide: true });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${code}`))));
  });
}

const cli = whichCli();

console.log("Installing Arduino CLI core for Uno (arduino:avr)…");
console.log("If arduino-cli is missing, install it first: https://arduino.github.io/arduino-cli/latest/installation/");

await run(cli, ["core", "update-index"]);
await run(cli, ["core", "install", "arduino:avr"]);
await run(cli, ["lib", "update-index"]);
await run(cli, ["lib", "install", "Servo"]);
// 2.x API (decode_results) matches Keyestudio Turtle IR examples.
await run(cli, ["lib", "install", "IRremote@2.6.1"]);
console.log("Ready. npm run setup:cli (done) → npm run dev → open http://localhost:5173/code.html");
