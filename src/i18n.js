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
  downloadArduino: "Download .ino",
  downloadTello: "Download Tello program",
  downloadTelloController: "Download sample controller",
  uploadTurtle: "Upload to Turtle",
  copyCode: "Copy code",
  hintDefault: "Pick Turtle or Tello, then snap blocks.",
  hintTurtle:
    "Snap blocks, then Download .ino (or Upload to Turtle when running locally). Draw on the 8×8 pad for face lights.",
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
  statusDownloadArduino: "Saved turtle.ino — open it in Arduino IDE if you need the old path.",
  statusDownloadTello:
    "Saved tello_mission.py — on Tello Wi-Fi run: py -3 tello_mission.py",
  statusTelloController: "Downloading tello_pc.py — camera needs: winget install --id Gyan.FFmpeg -e",
  statusUploadingCompile: "Compiling…",
  statusUploadingPort: "Pick the Turtle USB port…",
  statusUploadingOpen: "Connecting…",
  statusUploadingFlash: "Uploading…",
  statusUploadingFlashPct: "Uploading… {pct}%",
  statusUploadDone: "Done! Turtle is programmed.",
  statusUploadBusy: "Upload already running…",
  statusUploadNoSerial: "Use Chrome or Edge on a laptop (Web Serial).",
  statusUploadNoApi:
    "Upload needs this PC: npm run setup:cli once, then npm run dev, open http://localhost:5173/code.html",
  statusUploadNotLocal:
    "Upload only works on this PC via localhost (npm run dev). The public site cannot flash the Turtle.",
  uploadHelpAria: "How to enable Upload",
  uploadHelpTitle: "Enable Upload to Turtle",
  uploadHelpClose: "Close",
  uploadHelpOk: "Got it",
  uploadHelpNotLocal:
    "<p>Upload only works when Coding runs on <strong>this PC</strong> (not the public website).</p><ol><li>Download or clone this project onto the laptop.</li><li>In a terminal in the project folder, run once:<br><code>npm install</code><br><code>npm run setup:cli</code></li><li>Every class session, start the local site:<br><code>npm run dev</code></li><li>Open Chrome/Edge at<br><code>http://localhost:5173/code.html</code></li><li>Plug USB, unplug Bluetooth, then press <strong>Upload to Turtle</strong>.</li></ol>",
  uploadHelpNoApi:
    "<p>The local compile server is not running on this PC.</p><ol><li>In the project folder run once if needed:<br><code>npm run setup:cli</code></li><li>Start the site:<br><code>npm run dev</code></li><li>Stay on<br><code>http://localhost:5173/code.html</code></li></ol>",
  uploadHelpNoCli:
    "<p>Arduino CLI is missing on this PC.</p><ol><li>In the project folder run:<br><code>npm run setup:cli</code></li><li>Restart the site:<br><code>npm run dev</code></li><li>Open<br><code>http://localhost:5173/code.html</code></li></ol>",
  uploadHelpNoSerial:
    "<p>Upload needs <strong>Chrome</strong> or <strong>Edge</strong> on a laptop.</p><ol><li>Do not use a phone or Safari-only setup.</li><li>Open Coding on this computer, then try again.</li></ol>",
  statusUploadNoCli: "Arduino CLI missing on this PC — run npm run setup:cli once.",
  statusUploadCancelled: "Upload cancelled.",
  statusUploadFail: "Upload failed.",
  statusDemoFail: "Could not load that demo.",
  confirmNew: "Clear this program?",
  faceTitle: "8×8 face",
  faceHelp:
    "Draw upright here. The kit face is mounted upside down — Upload flips it for you.",
  faceSmile: "Smile",
  faceClear: "Clear",
  faceFlip180: "Upside down",
  faceFlipH: "Flip L/R",
  faceFlipV: "Flip U/D",
  motorTitle: "Motors",
  motorHelp:
    "If motors are on the other side or the robot drives the wrong way, change this then Upload again.",
  motorFlip: "Wiring",
  motorFlip0: "Normal",
  motorFlip1: "Reverse direction",
  motorFlip2: "Swap left / right",
  motorFlip3: "Reverse + swap L/R",
  turtleStepsHtml: `
    <li>Use <strong>Chrome</strong> or Edge on a laptop (not a phone).</li>
    <li>
      Once per laptop: install the CP210x USB driver from
      <a
        href="https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads"
        target="_blank"
        rel="noreferrer"
        >Silicon Labs</a
      >.
    </li>
    <li>Plug in the Turtle USB cable. <strong>Unplug Bluetooth</strong> on the robot.</li>
    <li>
      On the public site use <strong>Download .ino</strong> and upload with Arduino IDE.
      <strong>Upload to Turtle</strong> appears only when you run this project locally
      (<code>npm run setup:cli</code> then <code>npm run dev</code> →
      <code>http://localhost:5173/code.html</code>).
    </li>
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
    ["scan", "Ultrasonic scan & move"],
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
  downloadArduino: "تنزيل .ino",
  downloadTello: "تنزيل برنامج تيلو",
  downloadTelloController: "تنزيل متحكّم تجريبي",
  uploadTurtle: "رفع إلى السلحفاة",
  copyCode: "نسخ الكود",
  hintDefault: "اختر السلحفاة أو تيلو، ثم ركّب البلوكات.",
  hintTurtle:
    "ركّب البلوكات، ثم نزّل .ino (أو ارفع إلى السلحفاة عند التشغيل محلياً). ارسم على لوحة 8×8 لأضواء الوجه.",
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
  statusDownloadArduino: "تم حفظ turtle.ino — افتحه في Arduino IDE إذا احتجت الطريقة القديمة.",
  statusDownloadTello:
    "تم حفظ tello_mission.py — على شبكة تيلو نفّذ: py -3 tello_mission.py",
  statusTelloController: "جاري تنزيل tello_pc.py — للكاميرا: winget install --id Gyan.FFmpeg -e",
  statusUploadingCompile: "جاري الترجمة…",
  statusUploadingPort: "اختر منفذ USB للسلحفاة…",
  statusUploadingOpen: "جاري الاتصال…",
  statusUploadingFlash: "جاري الرفع…",
  statusUploadingFlashPct: "جاري الرفع… {pct}%",
  statusUploadDone: "تم! السلحفاة مبرمجة.",
  statusUploadBusy: "الرفع قيد التنفيذ…",
  statusUploadNoSerial: "استخدم Chrome أو Edge على حاسوب (Web Serial).",
  statusUploadNoApi:
    "الرفع يحتاج هذا الحاسوب: npm run setup:cli مرة، ثم npm run dev، وافتح http://localhost:5173/code.html",
  statusUploadNotLocal:
    "الرفع يعمل فقط على هذا الحاسوب عبر localhost (npm run dev). الموقع العام لا يبرمج السلحفاة.",
  uploadHelpAria: "كيف تفعّل الرفع",
  uploadHelpTitle: "تفعيل رفع إلى السلحفاة",
  uploadHelpClose: "إغلاق",
  uploadHelpOk: "حسناً",
  uploadHelpNotLocal:
    "<p>الرفع يعمل فقط عندما تعمل البرمجة على <strong>هذا الحاسوب</strong> (وليس الموقع العام).</p><ol><li>نزّل أو انسخ المشروع إلى الحاسوب المحمول.</li><li>في الطرفية داخل مجلد المشروع نفّذ مرة:<br><code>npm install</code><br><code>npm run setup:cli</code></li><li>في كل حصة شغّل الموقع محلياً:<br><code>npm run dev</code></li><li>افتح Chrome/Edge على<br><code>http://localhost:5173/code.html</code></li><li>وصّل USB، افصل البلوتوث، ثم اضغط <strong>رفع إلى السلحفاة</strong>.</li></ol>",
  uploadHelpNoApi:
    "<p>خادم الترجمة المحلي غير شغّال على هذا الحاسوب.</p><ol><li>في مجلد المشروع نفّذ إن لزم:<br><code>npm run setup:cli</code></li><li>شغّل الموقع:<br><code>npm run dev</code></li><li>ابقَ على<br><code>http://localhost:5173/code.html</code></li></ol>",
  uploadHelpNoCli:
    "<p>Arduino CLI غير موجود على هذا الحاسوب.</p><ol><li>في مجلد المشروع نفّذ:<br><code>npm run setup:cli</code></li><li>أعد تشغيل الموقع:<br><code>npm run dev</code></li><li>افتح<br><code>http://localhost:5173/code.html</code></li></ol>",
  uploadHelpNoSerial:
    "<p>الرفع يحتاج <strong>Chrome</strong> أو <strong>Edge</strong> على حاسوب محمول.</p><ol><li>لا تستخدم هاتفاً أو إعداد Safari فقط.</li><li>افتح البرمجة على هذا الحاسوب ثم أعد المحاولة.</li></ol>",
  statusUploadNoCli: "Arduino CLI غير موجود على هذا الحاسوب — نفّذ npm run setup:cli مرة واحدة.",
  statusUploadCancelled: "تم إلغاء الرفع.",
  statusUploadFail: "فشل الرفع.",
  statusDemoFail: "تعذّر تحميل هذه التجربة.",
  confirmNew: "مسح هذا البرنامج؟",
  faceTitle: "وجه 8×8",
  faceHelp:
    "ارسم بشكل مستقيم هنا. الوجه في المجموعة مثبت مقلوباً — الرفع يقلبه تلقائياً.",
  faceSmile: "ابتسامة",
  faceClear: "مسح",
  faceFlip180: "مقلوب",
  faceFlipH: "قلب ي/ش",
  faceFlipV: "قلب أ/س",
  motorTitle: "المحركات",
  motorHelp:
    "إذا كانت المحركات على الجهة الأخرى أو الروبوت يسير بالاتجاه الخطأ، غيّر هذا ثم ارفع البرنامج مرة أخرى.",
  motorFlip: "التوصيل",
  motorFlip0: "عادي",
  motorFlip1: "عكس الاتجاه",
  motorFlip2: "تبديل يسار / يمين",
  motorFlip3: "عكس + تبديل ي/ش",
  turtleStepsHtml: `
    <li>استخدم <strong>Chrome</strong> أو Edge على حاسوب محمول (وليس هاتف).</li>
    <li>
      مرة لكل حاسوب: ثبّت تعريف CP210x من
      <a
        href="https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads"
        target="_blank"
        rel="noreferrer"
        >Silicon Labs</a
      >.
    </li>
    <li>وصّل كابل USB للسلحفاة. <strong>افصل البلوتوث</strong> على الروبوت.</li>
    <li>
      على الموقع العام استخدم <strong>تنزيل .ino</strong> وارفعه بـ Arduino IDE.
      زر <strong>رفع إلى السلحفاة</strong> يظهر فقط عند تشغيل المشروع محلياً
      (<code>npm run setup:cli</code> ثم <code>npm run dev</code> →
      <code>http://localhost:5173/code.html</code>).
    </li>
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
    ["scan", "مسح فوق صوتي وحركة"],
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
