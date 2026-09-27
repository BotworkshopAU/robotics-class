const DEFAULTS = {
  enabled: true,
  level: "Foundation",
  dateLabel: "Saturday 3 October 2026",
  title: "Foundation · Saturday 3 October 2026",
  blurb:
    "A day to meet robots: what they are, program the turtle car, fly a Tello drone, and see a 3D printer plus other robot types in person.",
  hubUrl: "/class.html",
  email: "botworkshopau@gmail.com",
  instagramChat: "https://ig.me/m/botworkshop_au",
  instagramProfile: "https://www.instagram.com/botworkshop_au/",
};

document.querySelector(".menu-btn")?.addEventListener("click", () => {
  document.querySelector("nav.primary")?.classList.toggle("open");
});

async function loadWorkshop() {
  try {
    const res = await fetch(`/workshop.json?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("missing workshop.json");
    return { ...DEFAULTS, ...(await res.json()) };
  } catch {
    return DEFAULTS;
  }
}

function fillHome(config) {
  const upcoming = document.getElementById("upcoming");
  const empty = document.getElementById("upcoming-empty");
  if (!upcoming) return;

  if (config.enabled) {
    upcoming.hidden = false;
    if (empty) empty.hidden = true;
    const title = document.getElementById("upcoming-title");
    const blurb = document.getElementById("upcoming-blurb");
    const hub = document.getElementById("upcoming-hub");
    if (title) title.textContent = config.title || `${config.level} · ${config.dateLabel}`;
    if (blurb) blurb.textContent = config.blurb || "";
    if (hub) {
      hub.href = config.hubUrl || "/class.html";
      hub.textContent = `${config.level || "Class"} hub`;
    }
    const course = document.getElementById("register-course");
    if (course && config.level) {
      const match = [...course.options].find((o) => o.value === config.level);
      if (match) course.value = config.level;
    }
  } else {
    upcoming.hidden = true;
    if (empty) empty.hidden = false;
  }

  const emailLabel = document.getElementById("register-email-label");
  if (emailLabel) emailLabel.textContent = config.email;

  const ig = document.getElementById("register-instagram");
  if (ig) ig.href = config.instagramChat;

  const profile = document.getElementById("home-ig-profile");
  if (profile) profile.href = config.instagramProfile;
}

function fillCourses(config) {
  const next = document.getElementById("courses-next-date");
  if (!next) return;
  next.textContent =
    config.enabled && config.dateLabel
      ? config.dateLabel
      : "see Home when announced";
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
      `Name: ${name}\nEmail: ${email}\nCourse: ${course}\n${dateLine}\n${message}`
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
      `Name / organisation: ${name}\nEmail: ${email}\nVenue: ${venue}\n\n${message}`
    );
    const subject = encodeURIComponent("BotWorkshop partnership");
    window.location.href = `mailto:botworkshopau@gmail.com?subject=${subject}&body=${body}`;
  });
}

const config = await loadWorkshop();
fillHome(config);
fillCourses(config);
wireRegister(config);
wirePartnerForm();
