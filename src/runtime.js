export const PINS = `
#define ML_Ctrl 4
#define ML_PWM 6
#define MR_Ctrl 2
#define MR_PWM 5
#define LED_PIN 9
#define SERVO_PIN 10
#define LINE_L 11
#define LINE_M 7
#define LINE_R 8
#define TRIG_PIN 12
#define ECHO_PIN 13
`.trim();

export const MOTOR_RUNTIME = `
int turtleSpeed = 160;

void motors(int leftDir, int leftPwm, int rightDir, int rightPwm) {
  digitalWrite(ML_Ctrl, leftDir);
  analogWrite(ML_PWM, leftPwm);
  digitalWrite(MR_Ctrl, rightDir);
  analogWrite(MR_PWM, rightPwm);
}

void driveStop() {
  // LOW + PWM 0 coasts the DRV8833; HIGH + 0 can still creep forward on some kits.
  motors(LOW, 0, LOW, 0);
}

void driveForward(float seconds) {
  motors(HIGH, turtleSpeed, HIGH, turtleSpeed);
  delay((unsigned long)(seconds * 1000.0));
  driveStop();
}

void driveBackward(float seconds) {
  motors(LOW, turtleSpeed, LOW, turtleSpeed);
  delay((unsigned long)(seconds * 1000.0));
  driveStop();
}

void turnLeft(float seconds) {
  motors(LOW, turtleSpeed, HIGH, turtleSpeed);
  delay((unsigned long)(seconds * 1000.0));
  driveStop();
}

void turnRight(float seconds) {
  motors(HIGH, turtleSpeed, LOW, turtleSpeed);
  delay((unsigned long)(seconds * 1000.0));
  driveStop();
}
`.trim();

export const SENSOR_RUNTIME = `
int distanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  unsigned long us = pulseIn(ECHO_PIN, HIGH, 30000);
  if (us == 0) return 400;
  return (int)(us * 0.034 / 2);
}

int lineIsBlack(int pin) {
  return digitalRead(pin) == HIGH;
}
`.trim();

export const MATRIX_RUNTIME = `
#define MATRIX_ADDR 0x70

void matrixBegin() {
  Wire.begin();
  Wire.beginTransmission(MATRIX_ADDR);
  Wire.write(0x21);
  Wire.endTransmission();
  Wire.beginTransmission(MATRIX_ADDR);
  Wire.write(0x81);
  Wire.endTransmission();
  Wire.beginTransmission(MATRIX_ADDR);
  Wire.write(0xEF);
  Wire.endTransmission();
}

void matrixShow(const uint8_t *rows) {
  Wire.beginTransmission(MATRIX_ADDR);
  Wire.write((uint8_t)0x00);
  for (uint8_t i = 0; i < 8; i++) {
    Wire.write(rows[i]);
    Wire.write((uint8_t)0x00);
  }
  Wire.endTransmission();
}

void matrixClear() {
  uint8_t z[8] = {0, 0, 0, 0, 0, 0, 0, 0};
  matrixShow(z);
}
`.trim();

export const SETUP_BODY = `
  pinMode(LED_PIN, OUTPUT);
`.trim();

export const SETUP_MOTORS = `
  pinMode(ML_Ctrl, OUTPUT);
  pinMode(ML_PWM, OUTPUT);
  pinMode(MR_Ctrl, OUTPUT);
  pinMode(MR_PWM, OUTPUT);
`.trim();

export const SETUP_SENSORS = `
  pinMode(LINE_L, INPUT);
  pinMode(LINE_M, INPUT);
  pinMode(LINE_R, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
`.trim();
