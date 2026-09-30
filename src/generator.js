import * as Blockly from "blockly";
import {
  PINS,
  MOTOR_RUNTIME,
  SENSOR_RUNTIME,
  MATRIX_RUNTIME,
  SETUP_BODY,
  SETUP_MOTORS,
  SETUP_SENSORS,
} from "./runtime.js";
import { faceListForSketch } from "./face_pad.js";
import { getMotorFlip, getLineSense } from "./motors_pref.js";

export const arduinoGenerator = new Blockly.Generator("Arduino");

arduinoGenerator.PRECEDENCE = 0;
arduinoGenerator.servoNeeded = false;
arduinoGenerator.matrixNeeded = false;

arduinoGenerator.scrub_ = function (block, code, thisOnly) {
  const next = block.nextConnection && block.nextConnection.targetBlock();
  const more = !thisOnly && next ? this.blockToCode(next) : "";
  return code + more;
};

function secs(block, name) {
  return Number(block.getFieldValue(name)).toFixed(1);
}

function hasType(workspace, type) {
  return workspace.getBlocksByType(type, false).length > 0;
}

function usesDrive(workspace) {
  return [
    "turtle_forward",
    "turtle_backward",
    "turtle_left",
    "turtle_right",
    "turtle_stop",
    "turtle_speed",
  ].some((type) => hasType(workspace, type));
}

function usesSensors(workspace) {
  return [
    "turtle_distance",
    "turtle_distance_lt",
    "turtle_line",
  ].some((type) => hasType(workspace, type));
}

arduinoGenerator.forBlock["turtle_start"] = function (block) {
  return arduinoGenerator.statementToCode(block, "DO");
};

arduinoGenerator.forBlock["turtle_forward"] = (block) =>
  `driveForward(${secs(block, "SECS")});\n`;
arduinoGenerator.forBlock["turtle_backward"] = (block) =>
  `driveBackward(${secs(block, "SECS")});\n`;
arduinoGenerator.forBlock["turtle_left"] = (block) =>
  `turnLeft(${secs(block, "SECS")});\n`;
arduinoGenerator.forBlock["turtle_right"] = (block) =>
  `turnRight(${secs(block, "SECS")});\n`;
arduinoGenerator.forBlock["turtle_stop"] = () => `driveStop();\n`;
arduinoGenerator.forBlock["turtle_speed"] = (block) =>
  `turtleSpeed = ${block.getFieldValue("SPEED")};\n`;
arduinoGenerator.forBlock["turtle_led"] = (block) =>
  `digitalWrite(LED_PIN, ${block.getFieldValue("STATE")});\n`;
arduinoGenerator.forBlock["turtle_wait"] = (block) =>
  `delay((unsigned long)(${secs(block, "SECS")} * 1000.0));\n`;

arduinoGenerator.forBlock["turtle_forever"] = function (block) {
  const inner = arduinoGenerator.statementToCode(block, "DO") || "  delay(10);\n";
  return `while (true) {\n${inner}}\n`;
};

arduinoGenerator.forBlock["turtle_repeat"] = function (block) {
  const n = block.getFieldValue("TIMES");
  const inner = arduinoGenerator.statementToCode(block, "DO") || "  delay(10);\n";
  return `for (int i = 0; i < ${n}; i++) {\n${inner}}\n`;
};

arduinoGenerator.forBlock["turtle_if"] = function (block) {
  const cond =
    arduinoGenerator.valueToCode(block, "COND", arduinoGenerator.PRECEDENCE) ||
    "false";
  const inner = arduinoGenerator.statementToCode(block, "DO") || "  ;\n";
  return `if (${cond}) {\n${inner}}\n`;
};

arduinoGenerator.forBlock["turtle_if_else"] = function (block) {
  const cond =
    arduinoGenerator.valueToCode(block, "COND", arduinoGenerator.PRECEDENCE) ||
    "false";
  const inner = arduinoGenerator.statementToCode(block, "DO") || "  ;\n";
  const other = arduinoGenerator.statementToCode(block, "ELSE") || "  ;\n";
  return `if (${cond}) {\n${inner}} else {\n${other}}\n`;
};

arduinoGenerator.forBlock["turtle_distance"] = () => [
  "distanceCm()",
  arduinoGenerator.PRECEDENCE,
];
arduinoGenerator.forBlock["turtle_distance_lt"] = (block) => [
  `(distanceCm() < ${block.getFieldValue("CM")})`,
  arduinoGenerator.PRECEDENCE,
];
arduinoGenerator.forBlock["turtle_line"] = (block) => [
  `onTheLine(${block.getFieldValue("PIN")})`,
  arduinoGenerator.PRECEDENCE,
];
arduinoGenerator.forBlock["turtle_servo"] = function (block) {
  arduinoGenerator.servoNeeded = true;
  return `turtleServo.write(${block.getFieldValue("DEG")});\n delay(200);\n`;
};

arduinoGenerator.forBlock["turtle_matrix"] = function () {
  arduinoGenerator.matrixNeeded = true;
  return `{ const uint8_t f[] = { ${faceListForSketch()} }; matrixShow(f); }\n`;
};

arduinoGenerator.forBlock["turtle_matrix_clear"] = function () {
  arduinoGenerator.matrixNeeded = true;
  return `matrixClear();\n`;
};

export function workspaceToSketch(workspace) {
  arduinoGenerator.servoNeeded = false;
  arduinoGenerator.matrixNeeded = false;
  const hats = workspace.getBlocksByType("turtle_start", false);
  let body = "";
  if (hats.length) {
    const first = hats[0].getNextBlock();
    body = first ? arduinoGenerator.blockToCode(first) : "";
  } else {
    body = arduinoGenerator.workspaceToCode(workspace);
  }

  const drive = usesDrive(workspace);
  const sense = usesSensors(workspace);
  const forever = hasType(workspace, "turtle_forever");

  const includeServo = arduinoGenerator.servoNeeded
    ? `#include <Servo.h>\nServo turtleServo;\n`
    : "";
  const includeMatrix = arduinoGenerator.matrixNeeded ? `#include <Wire.h>\n` : "";
  const motorFns = drive
    ? `\n${MOTOR_RUNTIME.replace("MOTOR_FLIP_VALUE", String(getMotorFlip()))}\n`
    : "";
  const sensorFns = sense
    ? `\n${SENSOR_RUNTIME.replace("LINE_ON_HIGH_VALUE", String(getLineSense()))}\n`
    : "";
  const matrixFns = arduinoGenerator.matrixNeeded ? `\n${MATRIX_RUNTIME}\n` : "";
  const servoSetup = arduinoGenerator.servoNeeded
    ? `  turtleServo.attach(SERVO_PIN);\n  turtleServo.write(90);\n`
    : "";
  const motorSetup = drive ? `${SETUP_MOTORS}\n  driveStop();\n` : "";
  const sensorSetup = sense ? `${SETUP_SENSORS}\n` : "";
  const matrixSetup = arduinoGenerator.matrixNeeded ? `  matrixBegin();\n` : "";

  const once = indent(body || "");
  const setupExtra = forever ? "" : once;
  const setupEnd = drive && !forever ? "  driveStop();\n" : "";
  const loopBody = forever ? indent(body || "  delay(1000);\n") : "";

  return `${includeMatrix}${includeServo}${PINS}
${motorFns}${sensorFns}${matrixFns}
void setup() {
${SETUP_BODY}
${motorSetup}${sensorSetup}${servoSetup}${matrixSetup}${setupExtra}${setupEnd}}

void loop() {
${loopBody}}
`;
}

function indent(code) {
  return code
    .split("\n")
    .map((line) => (line ? "  " + line : line))
    .join("\n");
}
