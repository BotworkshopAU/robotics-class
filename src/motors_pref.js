/** Motor + line-sensor prefs for Turtle sketches (persisted, baked into generated code). */
const MOTOR_FLIP_KEY = "bw-motor-flip";
const LINE_SENSE_KEY = "bw-line-sense";

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

/**
 * How “on the track” is read from the IR sensors.
 * @returns {1|0} 1 = pin HIGH means on track (kit default), 0 = pin LOW means on track
 */
export function getLineSense() {
  const n = Number(localStorage.getItem(LINE_SENSE_KEY) ?? "1");
  return n === 0 ? 0 : 1;
}

export function setLineSense(value) {
  const next = Number(value) === 0 ? 0 : 1;
  localStorage.setItem(LINE_SENSE_KEY, String(next));
  return next;
}
