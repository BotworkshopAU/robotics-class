/** Shared with Coding page (`src/i18n.js`) so language preference sticks. */
import { foundationAr, foundationEn } from "./foundation-i18n.js";

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
  menu: "Menu",
  language: "Language",
  navHome: "Home",
  navCourses: "Courses",
  navProducts: "Products",
  navExplore: "Explore",
  navPartner: "Become a partner",
  footerIg: "Instagram chat",

  homeKicker: "Since 2025 · Australia",
  homeTitle: "Build robots. Write programs. Take the skills with you.",
  homeLead:
    "One-day workshops in electronics, mechanics, and programming — usually on public holidays. Register below by email or Instagram.",
  homeRegister: "Register",
  homeSeeCourses: "See courses",
  upcomingWhen: "Upcoming workshop",
  upcomingNoneTitle: "Coming soon",
  upcomingNoneBlurb: "The next workshop date will be announced on Instagram.",
  upcomingInstagram: "Instagram",
  upcomingRegister: "Register",
  classHub: "Class hub",

  registerTitle: "Register",
  registerLead:
    "Sign up for the upcoming workshop (or register interest). Choose email or Instagram chat — both go to BotWorkshop.",
  registerByEmail: "By email",
  registerEmailHint: "Sends a message to",
  registerName: "Name",
  registerYourEmail: "Your email",
  registerCourse: "Course",
  registerOptFoundation: "Foundation",
  registerOptIntermediate: "Intermediate",
  registerOptAdvanced: "Advanced",
  registerOptInterest: "General interest",
  registerMessage: "Message (optional)",
  registerMessagePh: "How many people, age group, questions…",
  registerSend: "Send email",
  registerByIg: "By Instagram",
  registerIgHint: "Message us in Instagram chat to register for the next day workshop.",
  registerOpenIg: "Open Instagram chat",

  levelsTitle: "Three levels, one day each",
  levelsLead:
    "Foundation, Intermediate, and Advanced are full-day workshops. Dates are shown in the upcoming box and on",
  levelFoundationTitle: "Foundation",
  levelFoundationBody:
    "Meet robots, program the turtle, fly Tello — sensors, motors, and code for first-timers.",
  levelIntermediateTitle: "Intermediate",
  levelIntermediateBody:
    "Design bigger builds, go deeper on electronics and mechanics, meet 3D printing, and write smarter programs.",
  levelAdvancedTitle: "Advanced",
  levelAdvancedBody:
    "Polish, test, and deploy robots — skills closer to real products and the market.",
  coursesAllLink: "Course details — all levels",

  coursesKicker: "Day workshops",
  coursesTitle: "Courses",
  coursesLead:
    "Each level is a one-day workshop, usually on a public holiday. Register on the Home page by email or Instagram.",
  coursesHomeLink: "Home page",
  courseFoundationKicker: "Foundation",
  courseFoundationTitle: "Start with how robots work",
  courseFoundationBody:
    "Meet real robots, build simple programs for the turtle car, fly a Tello drone, and see how sensors, motors, and code fit together — perfect for first-timers and curious makers.",
  courseIntermediateKicker: "Intermediate",
  courseIntermediateTitle: "Design bigger builds",
  courseIntermediateBody:
    "Go deeper into electronics and mechanics, design your own robot ideas, try 3D printing for parts, and link sensors into smarter programs that solve real challenges.",
  courseAdvancedKicker: "Advanced",
  courseAdvancedTitle: "Ship it like a product",
  courseAdvancedBody:
    "Polish, test, and deploy robots that feel closer to real products — reliability, performance, and the skills teams use when taking ideas toward market.",

  productsKicker: "Shop",
  productsTitle: "Products",
  productsLead:
    "Kits we use in class. To buy, message Instagram chat or email.",
  productsCourses:
    "See them in upcoming courses — Courses and Instagram chat for dates.",
  productTurtleTitle: "Turtle robot",
  productTurtleBody:
    "Keyestudio Smart Turtle Car V3.0 (KS0558). Arduino-compatible car with motors, ultrasonic “eyes”, line sensors, and block coding in class.",
  productTelloTitle: "Tello",
  productTelloBody:
    "DJI Tello drone. Used in Foundation days for a first flight and a taste of aerial robots alongside the turtle on the floor.",
  exploreKicker: "For the curious",
  exploreJoinLink: "Join our upcoming classes",
  exploreTitle: "Explore",
  exploreLead:
    "Extra videos if you want to dig deeper — not tied to a specific course. Handy after Foundation if you’re into Arduino and electronics.",
  exploreArduinoHeading: "Arduino & electronics",

  partnerKicker: "Collaboration",
  partnerTitle: "Become a partner",
  partnerLead:
    "Run robotics day workshops at your venue. You look after the facility and bringing students. BotWorkshop handles the rest — curriculum, robots, and facilitating the event.",
  partnerYouTitle: "You (partner)",
  partnerYouBody:
    "Provide a suitable space (room, tables, power, Wi‑Fi where needed) and bring the students — schools, clubs, community groups, or your own audience.",
  partnerUsTitle: "BotWorkshop",
  partnerUsBody:
    "Prepare the content, supply and set up the robots, and facilitate the workshop day so the session runs smoothly end to end.",
  partnerShareTitle: "How we share",
  partnerShareBody:
    "We agree a clear percentage split of workshop fees before the day — written down so both sides know the deal. The split reflects what each of us brings (venue & students vs program, robots & teaching). No surprise deductions; we’ll settle the numbers together when we meet.",
  partnerTermsTitle: "Simple partnership terms",
  partnerAgreeTitle: "Agree the %",
  partnerAgreeBody:
    "One split for the workshop (or a short season). We propose a fair range based on your role; you confirm before anything is booked.",
  partnerDealTitle: "Short written deal",
  partnerDealBody:
    "Who does what, the percentage, payment timing, and cancelation — a short agreement after our first chat. Easy to renew for the next date.",
  partnerGrowTitle: "Grow together",
  partnerGrowBody:
    "Happy with the day? Lock in follow-up workshops on the same terms, or tweak the split if the setup changes.",
  partnerContactTitle: "Contact us",
  partnerContactLead:
    "Interested? Get in touch — we’ll meet, agree the percentage and roles, then put it in a short agreement.",
  partnerEmailTitle: "Email",
  partnerEmailHint: "Tell us who you are, your venue, and who you’d bring.",
  partnerName: "Name / organisation",
  partnerVenue: "Venue / location (optional)",
  partnerMessage: "Message",
  partnerMessagePh: "Facility, student group size, preferred dates…",
  partnerSend: "Send email",
  partnerIgTitle: "Instagram",
  partnerIgHint: "Prefer chat? Message us and ask to talk about partnership.",
  partnerOrEmail: "Or email directly:",

  hubIntermediateKicker: "Intermediate",
  hubIntermediateTitle: "Class hub",
  hubIntermediateBody:
    "Design and complex electronics, mechanics, and programming — including 3D printing for parts. This hub will fill when the next Intermediate day is announced on Instagram.",
  hubAdvancedKicker: "Advanced",
  hubAdvancedTitle: "Class hub",
  hubAdvancedBody:
    "Deploy, optimise, and take robots toward the market. This hub will fill when the next Advanced day is announced on Instagram.",
  hubAskIg: "Ask on Instagram",
  hubBackCourses: "Back to courses",
};

const ar = {
  menu: "القائمة",
  language: "اللغة",
  navHome: "الرئيسية",
  navCourses: "الدورات",
  navProducts: "المنتجات",
  navExplore: "استكشف",
  navPartner: "كن شريكاً",
  footerIg: "دردشة إنستغرام",

  homeKicker: "منذ 2025 · أستراليا",
  homeTitle: "ابنِ روبوتات. اكتب برامجاً. خذ المهارات معك.",
  homeLead:
    "ورش عمل ليوم واحد في الإلكترونيات والميكانيكا والبرمجة — غالباً في العطل الرسمية. سجّل أدناه بالبريد أو إنستغرام.",
  homeRegister: "سجّل",
  homeSeeCourses: "عرض الدورات",
  upcomingWhen: "ورشة قادمة",
  upcomingNoneTitle: "قريباً",
  upcomingNoneBlurb: "سيُعلَن موعد الورشة القادمة على إنستغرام.",
  upcomingInstagram: "إنستغرام",
  upcomingRegister: "سجّل",
  classHub: "مركز الصف",

  registerTitle: "التسجيل",
  registerLead:
    "سجّل في الورشة القادمة (أو سجّل اهتمامك). اختر البريد أو دردشة إنستغرام — كلاهما يصل إلى BotWorkshop.",
  registerByEmail: "بالبريد",
  registerEmailHint: "يرسل رسالة إلى",
  registerName: "الاسم",
  registerYourEmail: "بريدك الإلكتروني",
  registerCourse: "الدورة",
  registerOptFoundation: "تأسيسي",
  registerOptIntermediate: "متوسط",
  registerOptAdvanced: "متقدم",
  registerOptInterest: "اهتمام عام",
  registerMessage: "رسالة (اختياري)",
  registerMessagePh: "عدد الأشخاص، الفئة العمرية، أسئلة…",
  registerSend: "إرسال بريد",
  registerByIg: "عبر إنستغرام",
  registerIgHint: "راسلنا في دردشة إنستغرام للتسجيل في ورشة اليوم القادمة.",
  registerOpenIg: "فتح دردشة إنستغرام",

  levelsTitle: "ثلاثة مستويات، يوم لكل مستوى",
  levelsLead:
    "التأسيسي والمتوسط والمتقدم ورش ليوم كامل. التواريخ تظهر في صندوق الورشة القادمة وعلى",
  levelFoundationTitle: "تأسيسي",
  levelFoundationBody:
    "تعرّف على الروبوتات، برمج السلحفاة، طِر بتيلو — حساسات ومحركات وبرمجة للمبتدئين.",
  levelIntermediateTitle: "متوسط",
  levelIntermediateBody:
    "صمّم مشاريع أكبر، تعمّق في الإلكترونيات والميكانيكا، تعرّف على الطباعة ثلاثية الأبعاد، واكتب برامجاً أذكى.",
  levelAdvancedTitle: "متقدم",
  levelAdvancedBody:
    "حسّن واختبر وانشر روبوتات — مهارات أقرب للمنتجات الحقيقية والسوق.",
  coursesAllLink: "تفاصيل الدورات — كل المستويات",

  coursesKicker: "ورش ليوم واحد",
  coursesTitle: "الدورات",
  coursesLead:
    "كل مستوى ورشة ليوم واحد، غالباً في عطلة رسمية. سجّل من الصفحة الرئيسية بالبريد أو إنستغرام.",
  coursesHomeLink: "الصفحة الرئيسية",
  courseFoundationKicker: "تأسيسي",
  courseFoundationTitle: "ابدأ بفهم الروبوتات",
  courseFoundationBody:
    "قابل روبوتات حقيقية، ابنِ برامج بسيطة لسيارة السلحفاة، طِر بطائرة تيلو، واكتشف كيف تتصل الحساسات والمحركات والكود — مثالي للمبتدئين وصنّاع الفضول.",
  courseIntermediateKicker: "متوسط",
  courseIntermediateTitle: "صمّم مشاريع أكبر",
  courseIntermediateBody:
    "تعمّق في الإلكترونيات والميكانيكا، صمّم أفكار روبوتك، جرّب الطباعة ثلاثية الأبعاد للأجزاء، واربط الحساسات ببرامج أذكى تحل تحديات حقيقية.",
  courseAdvancedKicker: "متقدم",
  courseAdvancedTitle: "أنجزه كمنتج",
  courseAdvancedBody:
    "حسّن واختبر وانشر روبوتات أقرب للمنتجات الحقيقية — موثوقية وأداء ومهارات الفرق عند الاقتراب من السوق.",

  productsKicker: "المتجر",
  productsTitle: "المنتجات",
  productsLead: "أطقم نستخدمها في الصف. للشراء راسل إنستغرام أو البريد.",
  productsCourses: "شاهدها في الدورات القادمة — الدورات ودردشة إنستغرام للمواعيد.",
  productTurtleTitle: "روبوت السلحفاة",
  productTurtleBody:
    "Keyestudio Smart Turtle Car V3.0 (KS0558). سيارة متوافقة مع أردوينو للبرمجة بالبلوكات والحساسات.",
  productTelloTitle: "طائرة تيلو",
  productTelloBody:
    "طائرة DJI Tello. تُستخدم في أيام التأسيسي لأول طيران ولمسة من الروبوتات الجوية بجانب السلحفاة على الأرض.",
  exploreKicker: "لفضوليين",
  exploreJoinLink: "انضم لصفوفنا القادمة",
  exploreTitle: "استكشف",
  exploreLead:
    "فيديوهات إضافية إن أردت التعمق — غير مرتبطة بدورة معينة. مفيدة بعد التأسيسي إن أحببت أردوينو والإلكترونيات.",
  exploreArduinoHeading: "أردوينو والإلكترونيات",

  partnerKicker: "تعاون",
  partnerTitle: "كن شريكاً",
  partnerLead:
    "شغّل ورش روبوتات ليوم واحد في مكانك. أنت تهتم بالمكان وجلب الطلاب. BotWorkshop يتولى الباقي — المنهج والروبوتات وإدارة اليوم.",
  partnerYouTitle: "أنت (الشريك)",
  partnerYouBody:
    "وفّر مكاناً مناسباً (قاعة، طاولات، كهرباء، واي فاي عند الحاجة) واجلب الطلاب — مدارس أو نوادٍ أو مجموعات مجتمع أو جمهورك.",
  partnerUsTitle: "BotWorkshop",
  partnerUsBody:
    "نحضّر المحتوى، نوفّر الروبوتات ونركّبها، وندير يوم الورشة بسلاسة من البداية للنهاية.",
  partnerShareTitle: "كيف نقتسم",
  partnerShareBody:
    "نتفق على نسبة واضحة من رسوم الورشة قبل اليوم — مكتوبة حتى يعرف الطرفان الاتفاق. النسبة تعكس ما يقدّمه كل طرف (المكان والطلاب مقابل البرنامج والروبوتات والتدريس). بلا خصومات مفاجئة؛ نثبت الأرقام معاً عند اللقاء.",
  partnerTermsTitle: "شروط شراكة بسيطة",
  partnerAgreeTitle: "الاتفاق على النسبة",
  partnerAgreeBody:
    "نسبة واحدة للورشة (أو موسم قصير). نقترح نطاقاً عادلاً حسب دورك؛ تؤكد قبل أي حجز.",
  partnerDealTitle: "اتفاق مكتوب قصير",
  partnerDealBody:
    "من يفعل ماذا، النسبة، موعد الدفع، والإلغاء — اتفاق قصير بعد أول محادثة. سهل التجديد للموعد التالي.",
  partnerGrowTitle: "ننمو معاً",
  partnerGrowBody:
    "أعجبك اليوم؟ ثبّت ورشاً لاحقة بنفس الشروط، أو عدّل النسبة إن تغيّر الإعداد.",
  partnerContactTitle: "تواصل معنا",
  partnerContactLead:
    "مهتم؟ تواصل معنا — نلتقي، نتفق على النسبة والأدوار، ثم نضعها في اتفاق قصير.",
  partnerEmailTitle: "البريد",
  partnerEmailHint: "أخبرنا من أنت، ومكانك، ومن ستجلب.",
  partnerName: "الاسم / الجهة",
  partnerVenue: "المكان / الموقع (اختياري)",
  partnerMessage: "الرسالة",
  partnerMessagePh: "المكان، عدد الطلاب، التواريخ المفضلة…",
  partnerSend: "إرسال بريد",
  partnerIgTitle: "إنستغرام",
  partnerIgHint: "تفضل الدردشة؟ راسلنا واطلب الحديث عن الشراكة.",
  partnerOrEmail: "أو راسل مباشرة:",

  hubIntermediateKicker: "متوسط",
  hubIntermediateTitle: "مركز الصف",
  hubIntermediateBody:
    "تصميم وإلكترونيات وميكانيكا وبرمجة أعمق — بما فيها الطباعة ثلاثية الأبعاد للأجزاء. يمتلئ هذا المركز عند إعلان يوم المتوسط القادم على إنستغرام.",
  hubAdvancedKicker: "متقدم",
  hubAdvancedTitle: "مركز الصف",
  hubAdvancedBody:
    "نشر وتحسين الروبوتات والاقتراب من السوق. يمتلئ هذا المركز عند إعلان يوم المتقدم القادم على إنستغرام.",
  hubAskIg: "اسأل على إنستغرام",
  hubBackCourses: "العودة للدورات",
};

const catalogs = {
  en: { ...en, ...foundationEn },
  ar: { ...ar, ...foundationAr },
};

export function siteUi(lang = getLang()) {
  return catalogs[lang] || en;
}

export function applySiteI18n(lang = getLang()) {
  const t = siteUi(lang);
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && t[key] != null) el.textContent = t[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (key && t[key] != null) el.innerHTML = t[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key && t[key] != null) el.setAttribute("placeholder", t[key]);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key && t[key] != null) el.setAttribute("aria-label", t[key]);
  });

  document.querySelectorAll("#site-lang, #lang-select").forEach((sel) => {
    if (sel instanceof HTMLSelectElement) sel.value = lang;
  });
}

export function wireLangSwitcher(onChange) {
  const selects = document.querySelectorAll("#site-lang, .site-lang-select");
  selects.forEach((sel) => {
    if (!(sel instanceof HTMLSelectElement)) return;
    sel.value = getLang();
    sel.addEventListener("change", () => {
      const next = setLang(sel.value);
      applySiteI18n(next);
      onChange?.(next);
    });
  });
}

/** Markup for the top-right language control (insert once per page header). */
export const LANG_SWITCHER_HTML = `
<label class="site-lang">
  <span class="visually-hidden" data-i18n="language">Language</span>
  <select id="site-lang" class="site-lang-select" data-i18n-aria="language" aria-label="Language">
    <option value="en">English</option>
    <option value="ar">العربية</option>
  </select>
</label>
`.trim();
