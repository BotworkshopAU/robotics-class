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
#define IR_PIN 3
`.trim();

export const MOTOR_RUNTIME = `
int turtleSpeed = 160;
// 0 = normal, 1 = reverse dirs, 2 = swap L/R, 3 = reverse + swap
int motorFlip = MOTOR_FLIP_VALUE;

void motors(int leftDir, int leftPwm, int rightDir, int rightPwm) {
  if (motorFlip == 1 || motorFlip == 3) {
    leftDir = leftDir == HIGH ? LOW : HIGH;
    rightDir = rightDir == HIGH ? LOW : HIGH;
  }
  if (motorFlip == 2 || motorFlip == 3) {
    int d = leftDir;
    int p = leftPwm;
    leftDir = rightDir;
    leftPwm = rightPwm;
    rightDir = d;
    rightPwm = p;
  }
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

int lineOnHigh = LINE_ON_HIGH_VALUE;

int onTheLine(int pin) {
  int v = digitalRead(pin);
  return lineOnHigh ? (v == HIGH) : (v == LOW);
}
`.trim();

/** Classic IRremote 2.x API (matches Keyestudio sketches). Pin D3 on the 8833 board. */
export const IR_RUNTIME = `
IRrecv turtleIr(IR_PIN);
decode_results turtleIrResult;
unsigned long turtleIrCode = 0;

void irBegin() {
  turtleIr.enableIRIn();
}

void irFresh() {
  turtleIrCode = 0;
  if (turtleIr.decode(&turtleIrResult)) {
    unsigned long v = turtleIrResult.value;
    turtleIr.resume();
    if (v != 0xFFFFFFFFUL) turtleIrCode = v;
  }
}

int irButton(unsigned long code) {
  return turtleIrCode == code;
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
  // Kit face is mounted upside down — rotate 180 so pad drawings look right on the robot.
  Wire.beginTransmission(MATRIX_ADDR);
  Wire.write((uint8_t)0x00);
  for (uint8_t i = 0; i < 8; i++) {
    uint8_t r = rows[7 - i];
    uint8_t rev = 0;
    for (uint8_t b = 0; b < 8; b++) {
      if (r & (1 << b)) rev |= (uint8_t)(1 << (7 - b));
    }
    Wire.write(rev);
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
