import {
  getLang,
  siteUi,
  applySiteI18n,
  wireLangSwitcher,
} from "./site-i18n.js";

const DEFAULTS = {
  enabled: false,
  level: "",
  dateLabel: "",
  title: "",
  titleAr: "",
  blurb: "",
  blurbAr: "",
  hubUrl: "class-foundation.html",
  email: "botworkshopau@gmail.com",
  instagramChat: "https://ig.me/m/botworkshop_au",
  instagramProfile: "https://www.instagram.com/botworkshop_au/",
};

document.querySelector(".menu-btn")?.addEventListener("click", () => {
  document.querySelector("nav.primary")?.classList.toggle("open");
});

async function loadWorkshop() {
  try {
    const res = await fetch(`workshop.json?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("missing workshop.json");
    return { ...DEFAULTS, ...(await res.json()) };
  } catch {
    return DEFAULTS;
  }
}

function fillHome(config, lang = getLang()) {
  const t = siteUi(lang);
  const title = document.getElementById("upcoming-title");
  const blurb = document.getElementById("upcoming-blurb");
  const hub = document.getElementById("upcoming-hub");
  const actions = document.getElementById("upcoming-actions");

  if (title && blurb) {
    const register = actions?.querySelector("a[href='#register'], a[data-i18n='upcomingRegister']");
    if (config.enabled) {
      title.textContent =
        lang === "ar" && config.titleAr
          ? config.titleAr
          : config.title || `${config.level} · ${config.dateLabel}`;
      blurb.textContent =
        lang === "ar" && config.blurbAr ? config.blurbAr : config.blurb || "";
      if (actions) actions.hidden = false;
      if (register) {
        register.href = "#register";
        register.textContent = t.upcomingRegister;
        register.removeAttribute("target");
        register.removeAttribute("rel");
      }
      if (hub) {
        hub.href = config.hubUrl || "class-foundation.html";
        hub.textContent = `${config.level || "Class"} · ${t.classHub}`;
        hub.hidden = false;
      }
    } else {
      title.textContent = t.upcomingNoneTitle;
      blurb.textContent = t.upcomingNoneBlurb;
      if (hub) hub.hidden = true;
      if (actions) actions.hidden = false;
      if (register) {
        register.href = config.instagramProfile || config.instagramChat;
        register.textContent = t.upcomingInstagram;
        register.target = "_blank";
        register.rel = "noreferrer";
      }
    }
  }

  const emailLabel = document.getElementById("register-email-label");
  if (emailLabel) emailLabel.textContent = config.email;

  const ig = document.getElementById("register-instagram");
  if (ig) ig.href = config.instagramChat;

  const profile = document.getElementById("home-ig-profile");
  if (profile) profile.href = config.instagramProfile;

  const course = document.getElementById("register-course");
  if (course && config.enabled && config.level) {
    const match = [...course.options].find((o) => o.value === config.level);
    if (match) course.value = config.level;
  }
}

function wireRegister(config) {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const course = String(data.get("course") || "Interest").trim();
    const message = String(data.get("message") || "").trim();
    const dateLine =
      config.enabled && config.dateLabel
        ? `Upcoming date: ${config.dateLabel}\n`
        : "";
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCourse: ${course}\n${dateLine}\n${message}`,
    );
    const subject = encodeURIComponent(`BotWorkshop registration · ${course}`);
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
  });
}

function wirePartnerForm() {
  const form = document.getElementById("partner-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const venue = String(data.get("venue") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = encodeURIComponent(
      `Name / organisation: ${name}\nEmail: ${email}\nVenue: ${venue}\n\n${message}`,
    );
    const subject = encodeURIComponent("BotWorkshop partnership");
    window.location.href = `mailto:botworkshopau@gmail.com?subject=${subject}&body=${body}`;
  });
}

const config = await loadWorkshop();

function refreshUi(lang = getLang()) {
  applySiteI18n(lang);
  fillHome(config, lang);
}

wireLangSwitcher((lang) => {
  refreshUi(lang);
});
refreshUi(getLang());
wireRegister(config);
wirePartnerForm();
