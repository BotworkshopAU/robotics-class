export const LANG_KEY = "bw-lang";

export function getLang() {
  return localStorage.getItem(LANG_KEY) === "ar" ? "ar" : "en";
}

export function setLang(lang) {
  const next = lang === "ar" ? "ar" : "en";
  localStorage.setItem(LANG_KEY, next);
  return next;
}

const en = {
  classHub: "Class hub",
  home: "BotWorkshop",
  robot: "Robot",
  robotTurtle: "Turtle robot",
  robotTello: "Tello drone",
  newBtn: "New",
  demo: "Demo",
  language: "Language",
  downloadArduino: "Download for Arduino",
  downloadTello: "Download Tello program",
  downloadTelloController: "Download sample controller",
  copyCode: "Copy code",
  hintDefault: "Pick Turtle or Tello, then snap blocks.",
  hintTurtle:
    "Draw on the 8×8 face pad, then use Lights → show 8×8 drawing. Use Upside down on the pad if the face is mounted the wrong way.",
  hintTello:
    "Block missions download as Python. For keys + camera, download the sample Tello controller (tello_pc.py). Camera needs FFmpeg: winget install --id Gyan.FFmpeg -e",
  setup: "Setup",
  codeArduino: "Arduino sketch",
  codeTello: "Tello program (Python)",
  ready: "Ready.",
  statusTurtle: "Turtle sketch.",
  statusTello: "Tello mission.",
  statusNew: "New program.",
  statusCopyArduino: "Arduino copied.",
  statusCopyTello: "Python copied.",
  statusDownloadArduino: "Saved turtle.ino — open it in Arduino IDE.",
  statusDownloadTello:
    "Saved tello_mission.py — on Tello Wi-Fi run: py -3 tello_mission.py",
  statusTelloController: "Downloading tello_pc.py — camera needs: winget install --id Gyan.FFmpeg -e",
  statusDemoFail: "Could not load that demo.",
  confirmNew: "Clear this program?",
  faceTitle: "8×8 face",
  faceHelp:
    "Draw here. Then use the show 8×8 drawing block.",
  faceSmile: "Smile",
  faceClear: "Clear",
  faceFlip180: "Upside down",
  faceFlipH: "Flip L/R",
  faceFlipV: "Flip U/D",
  turtleStepsHtml: `
    <li>
      Install Arduino IDE from
      <a href="https://academy.arduino.cc/pages/download-software" target="_blank" rel="noreferrer"
        >academy.arduino.cc/pages/download-software</a
      >
      (desktop app, not the Microsoft Store).
    </li>
    <li>
      Install the CP210x UART driver for Windows <strong>and</strong> Mac from
      <a
        href="https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads"
        target="_blank"
        rel="noreferrer"
        >Silicon Labs USB to UART downloads</a
      >.
    </li>
    <li>Open <code>turtle.ino</code> in Arduino IDE.</li>
    <li>Tools → Board → <strong>Arduino Uno</strong>.</li>
    <li>Tools → Port → CP210x COM or <code>cu.SLAB_USBtoUART</code>. Not COM1.</li>
    <li>Unplug the Bluetooth module, then <strong>Upload</strong>.</li>
  `,
  telloStepsHtml: `
    <li>
      Python 3: <code>py -3 --version</code>. For the camera, install a decoder
      <em>before</em> joining Tello Wi-Fi:
      <code>winget install --id Gyan.FFmpeg -e</code>
      (restart the terminal after install).
    </li>
    <li>
      <strong>Sample controller</strong> (keys + camera):
      <a href="tello_pc.py" download="tello_pc.py">Download tello_pc.py</a>
      → join <code>TELLO-xxxxxx</code> → <code>py -3 tello_pc.py</code>.
    </li>
    <li>
      Snap blocks here, then <strong>Download Tello program</strong> →
      <code>py -3 tello_mission.py</code> while on Tello Wi-Fi.
    </li>
  `,
  turtleDemos: [
    ["", "Choose a demo"],
    ["blink", "LED then roll"],
    ["blinkloop", "Blink forever"],
    ["waitgo", "Wait 3s then go"],
    ["square", "Drive a square"],
    ["dance", "Dance"],
    ["look", "Servo look left/right"],
    ["face", "Draw on 8×8 face"],
    ["avoid", "Avoid — look for space"],
    ["follow", "Follow — scan & chase"],
    ["line", "Line follow"],
  ],
  telloDemos: [
    ["", "Choose a demo"],
    ["takeoff", "Takeoff and land"],
    ["hover", "Hover (lift = weight)"],
    ["forward", "Forward and back"],
    ["climb", "Climb then descend"],
    ["square", "Air square (thrust + yaw)"],
    ["yaw", "Yaw left and right"],
  ],
  cat: {
    start: "Start",
    drive: "Drive",
    lights: "Lights",
    control: "Control",
    sensing: "Sensing",
    servo: "Servo",
    lift: "Lift & weight",
    thrust: "Thrust & drag",
    yaw: "Yaw",
  },
  turtle: {
    start: "when turtle starts",
    startTip: "Runs once after the program is uploaded and the board resets.",
    forward: "forward %1 seconds",
    backward: "backward %1 seconds",
    left: "spin left %1 seconds",
    right: "spin right %1 seconds",
    stop: "stop motors",
    speed: "set speed %1",
    led: "LED %1",
    ledOn: "on",
    ledOff: "off",
    wait: "wait %1 seconds",
    forever: "forever %1 %2",
    repeat: "repeat %1 times %2 %3",
    if: "if %1 then %2 %3",
    ifElse: "if %1 then",
    else: "else %1",
    distance: "distance (cm)",
    distanceLt: "distance < %1 cm",
    line: "line %1 is black",
    lineL: "left",
    lineM: "middle",
    lineR: "right",
    servo: "servo to %1 degrees",
    matrix: "show 8×8 drawing",
    matrixTip: "Shows whatever you drew on the 8×8 face pad.",
    matrixClear: "clear 8×8 face",
  },
  tello: {
    start: "when mission starts",
    startTip:
      "Runs after the laptop is on Tello Wi-Fi. Always ends with land in the generated script.",
    takeoff: "takeoff (lift > weight)",
    takeoffTip:
      "Motors speed up until lift is greater than the 80 g weight, then Tello climbs.",
    land: "land (lift < weight)",
    landTip: "Thrust drops so weight wins and Tello descends onto the floor.",
    hover: "hover %1 seconds (lift = weight)",
    hoverTip: "Vision positioning helps it stay still indoors. Lift matches weight.",
    up: "climb %1 cm",
    upTip:
      "More lift than weight. Potential energy goes up. Indoor: keep under the 30 m max, stay low.",
    down: "descend %1 cm",
    downTip: "Less lift than weight. Potential energy goes down.",
    forward: "fly forward %1 cm (thrust vs drag)",
    forwardTip: "Tello tilts. Part of the thrust pushes it forward; drag from air resists.",
    back: "fly back %1 cm",
    left: "fly left %1 cm",
    right: "fly right %1 cm",
    cw: "yaw right %1 degrees",
    cwTip: "Opposite rotors speed up/slow down so torque yaws the drone without much tilt.",
    ccw: "yaw left %1 degrees",
    speed: "set speed %1 cm/s",
    speedTip: "Tello max is 8 m/s. Class missions stay slow (about 10–50 cm/s).",
    wait: "wait %1 seconds",
    repeat: "repeat %1 times %2 %3",
  },
};

const ar = {
  classHub: "مركز الصف",
  home: "BotWorkshop",
  robot: "الروبوت",
  robotTurtle: "روبوت السلحفاة",
  robotTello: "طائرة تيلو",
  newBtn: "جديد",
  demo: "تجربة",
  language: "اللغة",
  downloadArduino: "تنزيل لأردوينو",
  downloadTello: "تنزيل برنامج تيلو",
  downloadTelloController: "تنزيل متحكّم تجريبي",
  copyCode: "نسخ الكود",
  hintDefault: "اختر السلحفاة أو تيلو، ثم ركّب البلوكات.",
  hintTurtle:
    "ارسم على لوحة الوجه 8×8، ثم استخدم أضواء ← عرض رسم 8×8. استخدم «مقلوب» إذا كان الوجه مركّباً بالعكس.",
  hintTello:
    "مهام البلوكات تُنزَّل كبايثون. للمفاتيح والكاميرا نزّل متحكّم تيلو (tello_pc.py). الكاميرا تحتاج FFmpeg: winget install --id Gyan.FFmpeg -e",
  setup: "الإعداد",
  codeArduino: "كود أردوينو",
  codeTello: "برنامج تيلو (بايثون)",
  ready: "جاهز.",
  statusTurtle: "برنامج السلحفاة.",
  statusTello: "مهمة تيلو.",
  statusNew: "برنامج جديد.",
  statusCopyArduino: "تم نسخ كود أردوينو.",
  statusCopyTello: "تم نسخ بايثون.",
  statusDownloadArduino: "تم حفظ turtle.ino — افتحه في Arduino IDE.",
  statusDownloadTello:
    "تم حفظ tello_mission.py — على شبكة تيلو نفّذ: py -3 tello_mission.py",
  statusTelloController: "جاري تنزيل tello_pc.py — للكاميرا: winget install --id Gyan.FFmpeg -e",
  statusDemoFail: "تعذّر تحميل هذه التجربة.",
  confirmNew: "مسح هذا البرنامج؟",
  faceTitle: "وجه 8×8",
  faceHelp:
    "ارسم هنا. ثم استخدم بلوك عرض رسم 8×8.",
  faceSmile: "ابتسامة",
  faceClear: "مسح",
  faceFlip180: "مقلوب",
  faceFlipH: "قلب ي/ش",
  faceFlipV: "قلب أ/س",
  turtleStepsHtml: `
    <li>
      ثبّت Arduino IDE من
      <a href="https://academy.arduino.cc/pages/download-software" target="_blank" rel="noreferrer"
        >academy.arduino.cc/pages/download-software</a
      >
      (تطبيق سطح المكتب، وليس متجر Microsoft).
    </li>
    <li>
      ثبّت تعريف CP210x لويندوز <strong>وماك</strong> من
      <a
        href="https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads"
        target="_blank"
        rel="noreferrer"
        >تحميلات Silicon Labs USB to UART</a
      >.
    </li>
    <li>افتح <code>turtle.ino</code> في Arduino IDE.</li>
    <li>Tools → Board → <strong>Arduino Uno</strong>.</li>
    <li>Tools → Port → منفذ CP210x أو <code>cu.SLAB_USBtoUART</code>. ليس COM1.</li>
    <li>افصل وحدة البلوتوث، ثم <strong>Upload</strong>.</li>
  `,
  telloStepsHtml: `
    <li>
      بايثون 3: <code>py -3 --version</code>. للكاميرا ثبّت مفكّك الترميز
      <em>قبل</em> الاتصال بشبكة تيلو:
      <code>winget install --id Gyan.FFmpeg -e</code>
      (أعد تشغيل الطرفية بعد التثبيت).
    </li>
    <li>
      <strong>متحكّم تجريبي</strong> (مفاتيح + كاميرا):
      <a href="tello_pc.py" download="tello_pc.py">تنزيل tello_pc.py</a>
      → اتصل بـ <code>TELLO-xxxxxx</code> → <code>py -3 tello_pc.py</code>.
    </li>
    <li>
      ركّب البلوكات، ثم <strong>تنزيل برنامج تيلو</strong> →
      <code>py -3 tello_mission.py</code> وأنت على شبكة تيلو.
    </li>
  `,
  turtleDemos: [
    ["", "اختر تجربة"],
    ["blink", "LED ثم حركة"],
    ["blinkloop", "وميض مستمر"],
    ["waitgo", "انتظر 3 ث ثم انطلق"],
    ["square", "مربع"],
    ["dance", "رقصة"],
    ["look", "سيرفو ينظر يمين/يسار"],
    ["face", "رسم على وجه 8×8"],
    ["avoid", "تفادي — ابحث عن فراغ"],
    ["follow", "تتبع — امسح وطارد"],
    ["line", "تتبع الخط"],
  ],
  telloDemos: [
    ["", "اختر تجربة"],
    ["takeoff", "إقلاع وهبوط"],
    ["hover", "تحليق ثابت (رفع = وزن)"],
    ["forward", "أمام وخلف"],
    ["climb", "صعود ثم هبوط"],
    ["square", "مربع في الهواء"],
    ["yaw", "دوران يمين ويسار"],
  ],
  cat: {
    start: "البداية",
    drive: "القيادة",
    lights: "الأضواء",
    control: "التحكم",
    sensing: "الاستشعار",
    servo: "السيرفو",
    lift: "الرفع والوزن",
    thrust: "الدفع والمقاومة",
    yaw: "الدوران",
  },
  turtle: {
    start: "عند بدء السلحفاة",
    startTip: "يعمل مرة واحدة بعد رفع البرنامج وإعادة تشغيل اللوحة.",
    forward: "أمام %1 ثانية",
    backward: "خلف %1 ثانية",
    left: "دوران يسار %1 ثانية",
    right: "دوران يمين %1 ثانية",
    stop: "إيقاف المحركات",
    speed: "ضبط السرعة %1",
    led: "LED %1",
    ledOn: "تشغيل",
    ledOff: "إيقاف",
    wait: "انتظر %1 ثانية",
    forever: "للأبد %1 %2",
    repeat: "كرّر %1 مرات %2 %3",
    if: "إذا %1 إذن %2 %3",
    ifElse: "إذا %1 إذن",
    else: "وإلا %1",
    distance: "المسافة (سم)",
    distanceLt: "المسافة < %1 سم",
    line: "الخط %1 أسود",
    lineL: "يسار",
    lineM: "وسط",
    lineR: "يمين",
    servo: "سيرفو إلى %1 درجة",
    matrix: "عرض رسم 8×8",
    matrixTip: "يعرض ما رسمته على لوحة الوجه 8×8.",
    matrixClear: "مسح وجه 8×8",
  },
  tello: {
    start: "عند بدء المهمة",
    startTip: "يعمل بعد اتصال اللابتوب بشبكة تيلو. السكربت ينتهي دائماً بالهبوط.",
    takeoff: "إقلاع (رفع > وزن)",
    takeoffTip: "المحركات تسرع حتى يصبح الرفع أكبر من وزن 80 غ، ثم تصعد تيلو.",
    land: "هبوط (رفع < وزن)",
    landTip: "ينخفض الدفع فيغلب الوزن وتهبط تيلو على الأرض.",
    hover: "تحليق ثابت %1 ثانية (رفع = وزن)",
    hoverTip: "التثبيت بالرؤية يساعد على البقاء ثابتاً داخلياً. الرفع يساوي الوزن.",
    up: "صعود %1 سم",
    upTip: "رفع أكبر من الوزن. الطاقة الكامنة ترتفع. داخلياً: ابقَ منخفضاً تحت حد 30 م.",
    down: "هبوط %1 سم",
    downTip: "رفع أقل من الوزن. الطاقة الكامنة تنخفض.",
    forward: "طيران أمام %1 سم (دفع مقابل مقاومة)",
    forwardTip: "تيلو تميل. جزء من الدفع يدفعها للأمام؛ الهواء يقاوم.",
    back: "طيران خلف %1 سم",
    left: "طيران يسار %1 سم",
    right: "طيران يمين %1 سم",
    cw: "دوران يمين %1 درجة",
    cwTip: "مراوح متقابلة تسرع/تبطئ فينتج عزم دوران دون ميل كبير.",
    ccw: "دوران يسار %1 درجة",
    speed: "ضبط السرعة %1 سم/ث",
    speedTip: "أقصى سرعة لتيلو 8 م/ث. مهام الصف تبقى بطيئة (حوالي 10–50 سم/ث).",
    wait: "انتظر %1 ثانية",
    repeat: "كرّر %1 مرات %2 %3",
  },
};

export const strings = { en, ar };

export function ui(lang = getLang()) {
  return strings[lang] || en;
}
