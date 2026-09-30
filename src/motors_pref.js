/** Motor wiring prefs for Turtle sketches (persisted, baked into generated code). */
const MOTOR_FLIP_KEY = "bw-motor-flip";

/** @returns {0|1|2|3} 0 normal, 1 reverse, 2 swap L/R, 3 reverse+swap */
export function getMotorFlip() {
  const n = Number(localStorage.getItem(MOTOR_FLIP_KEY) || "0");
  return n === 1 || n === 2 || n === 3 ? n : 0;
}

export function setMotorFlip(value) {
  const n = Number(value);
  const next = n === 1 || n === 2 || n === 3 ? n : 0;
  localStorage.setItem(MOTOR_FLIP_KEY, String(next));
  return next;
}
