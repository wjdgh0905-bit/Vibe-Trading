/* ============================================================
   melange.tattoo — vanilla JS (no dependencies)
   - Bilingual KO/EN toggle (localStorage)
   - Mobile nav
   - Scroll header state
   - Gallery generation + lightbox
   - Booking form validation + mailto compose
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     1. Translations
     ------------------------------------------------------------ */
  const I18N = {
    ko: {
      "meta.description":
        "melange.tattoo — 파인라인과 블랙워크를 블렌딩하는 타투 스튜디오. 포트폴리오 감상과 예약 문의.",
      "a11y.skip": "본문 바로가기",
      "nav.about": "소개",
      "nav.gallery": "갤러리",
      "nav.booking": "예약",
      "hero.eyebrow": "Seoul · Tattoo Studio",
      "hero.title1": "경계를 흐리는",
      "hero.title2": "한 점의 블렌드",
      "hero.sub": "파인라인과 블랙워크 사이, 당신의 이야기를 피부 위에 조율합니다.",
      "hero.cta": "예약 문의",
      "hero.cta2": "작업 보기",
      "hero.scroll": "아래로",
      "about.eyebrow": "About",
      "about.title": "멜란지, 섞이는 것들의 미학",
      "about.lead":
        "melange는 ‘혼합’이라는 뜻입니다. 서로 다른 결의 선과 면, 빛과 어둠을 한 사람의 피부 위에서 조율해 온전한 하나의 이야기를 새깁니다.",
      "about.body":
        "작은 파인라인부터 깊이 있는 블랙워크까지, 도안은 상담에서 시작됩니다. 유행이 아니라 당신에게 오래 남을 그림을 함께 찾습니다. 위생과 안전을 최우선으로, 1:1 예약제로 운영합니다.",
      "about.f1k": "스타일",
      "about.f1v": "파인라인 · 블랙워크 · 레터링",
      "about.f2k": "방식",
      "about.f2v": "1:1 완전 예약제 · 커스텀 도안",
      "about.f3k": "위치",
      "about.f3v": "서울 · 예약 시 상세 안내",
      "gallery.eyebrow": "Portfolio",
      "gallery.title": "작업 갤러리",
      "gallery.desc":
        "이미지를 눌러 크게 볼 수 있습니다. 실제 작업물로 교체하려면 README를 참고하세요.",
      "booking.eyebrow": "Booking",
      "booking.title": "예약 & 문의",
      "booking.lead":
        "원하는 위치, 크기, 레퍼런스를 알려주시면 24시간 이내에 답변드립니다.",
      "booking.c1k": "인스타그램",
      "booking.c2k": "카카오톡",
      "booking.c2v": "채널 아이디: melange",
      "booking.c3k": "이메일",
      "booking.c4k": "운영",
      "booking.c4v": "화–일 12:00–20:00 · 완전 예약제",
      "form.name": "이름 / 활동명",
      "form.contact": "연락처 (인스타 / 이메일 / 전화)",
      "form.part": "부위",
      "form.part_ph": "예: 팔 안쪽",
      "form.size": "대략 크기",
      "form.size_ph": "예: 10cm",
      "form.date": "희망 날짜",
      "form.desc": "시안 설명 / 레퍼런스",
      "form.desc_ph": "원하는 그림, 분위기, 레퍼런스 링크 등을 자유롭게 적어주세요.",
      "form.submit": "문의 보내기",
      "form.note": "전송 버튼을 누르면 메일 앱으로 내용이 정리되어 열립니다.",
      "footer.top": "맨 위로",
      // dynamic / status strings
      "err.required": "필수 입력 항목입니다.",
      "status.opening": "메일 앱을 여는 중입니다…",
      "gallery.tags": [
        "Fine line",
        "Blackwork",
        "Lettering",
        "Botanical",
        "Ornamental",
        "Minimal",
        "Illustrative",
        "Micro",
        "Abstract",
      ],
    },
    en: {
      "meta.description":
        "melange.tattoo — a studio blending fine line and blackwork. Browse the portfolio and book a session.",
      "a11y.skip": "Skip to content",
      "nav.about": "About",
      "nav.gallery": "Gallery",
      "nav.booking": "Booking",
      "hero.eyebrow": "Seoul · Tattoo Studio",
      "hero.title1": "Blurring the line",
      "hero.title2": "into a single blend",
      "hero.sub":
        "Somewhere between fine line and blackwork, we tune your story onto skin.",
      "hero.cta": "Book now",
      "hero.cta2": "View work",
      "hero.scroll": "Scroll",
      "about.eyebrow": "About",
      "about.title": "Melange — the art of blending",
      "about.lead":
        "‘Melange’ means a mixture. We tune different textures of line and shade, light and dark, into one story on a single skin.",
      "about.body":
        "From delicate fine line to deep blackwork, every design starts with a conversation. We look for a piece that lasts — not a trend. Hygiene and safety come first, by private appointment only.",
      "about.f1k": "Style",
      "about.f1v": "Fine line · Blackwork · Lettering",
      "about.f2k": "How",
      "about.f2v": "Private, by appointment · Custom design",
      "about.f3k": "Where",
      "about.f3v": "Seoul · Details shared on booking",
      "gallery.eyebrow": "Portfolio",
      "gallery.title": "Selected work",
      "gallery.desc":
        "Tap an image to enlarge. See the README to swap in your own photos.",
      "booking.eyebrow": "Booking",
      "booking.title": "Book & inquire",
      "booking.lead":
        "Tell us the placement, size and any references — we reply within 24 hours.",
      "booking.c1k": "Instagram",
      "booking.c2k": "KakaoTalk",
      "booking.c2v": "Channel ID: melange",
      "booking.c3k": "Email",
      "booking.c4k": "Hours",
      "booking.c4v": "Tue–Sun 12:00–20:00 · By appointment",
      "form.name": "Name / handle",
      "form.contact": "Contact (Instagram / email / phone)",
      "form.part": "Placement",
      "form.part_ph": "e.g. inner arm",
      "form.size": "Approx. size",
      "form.size_ph": "e.g. 10cm",
      "form.date": "Preferred date",
      "form.desc": "Design notes / references",
      "form.desc_ph": "Describe the piece, the mood, any reference links.",
      "form.submit": "Send inquiry",
      "form.note": "Submitting opens your mail app with the details prefilled.",
      "footer.top": "Back to top",
      "err.required": "This field is required.",
      "status.opening": "Opening your mail app…",
      "gallery.tags": [
        "Fine line",
        "Blackwork",
        "Lettering",
        "Botanical",
        "Ornamental",
        "Minimal",
        "Illustrative",
        "Micro",
        "Abstract",
      ],
    },
  };

  const STORAGE_KEY = "melange.lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "ko";
  if (!I18N[lang]) lang = "ko";

  const t = (key) => (I18N[lang] && I18N[lang][key]) || key;

  /* ------------------------------------------------------------
     2. Apply translations
     ------------------------------------------------------------ */
  function applyLang() {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (el.tagName === "META") {
        el.setAttribute("content", val);
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });

    // active state on toggle
    document.querySelectorAll(".lang-opt").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });

    // refresh gallery labels for current language
    document.querySelectorAll(".gallery-item .g-label").forEach((el, i) => {
      el.textContent = t("gallery.tags")[i % t("gallery.tags").length];
    });
  }

  function setLang(next) {
    lang = I18N[next] ? next : "ko";
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang();
  }

  /* ------------------------------------------------------------
     3. Header scroll state
     ------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------
     4. Mobile nav
     ------------------------------------------------------------ */
  const nav = document.getElementById("primaryNav");
  const navToggle = document.getElementById("navToggle");
  function closeNav() {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav-link").forEach((a) =>
    a.addEventListener("click", closeNav)
  );

  /* ------------------------------------------------------------
     5. Language toggle button
     ------------------------------------------------------------ */
  document.getElementById("langToggle").addEventListener("click", () => {
    setLang(lang === "ko" ? "en" : "ko");
  });

  /* ------------------------------------------------------------
     6. Gallery generation
     ------------------------------------------------------------ */
  const GALLERY_COUNT = 9;
  const grid = document.getElementById("galleryGrid");
  const angles = [30, 55, 80, 110, 135, 160, 20, 70, 100];

  for (let i = 0; i < GALLERY_COUNT; i++) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "gallery-item";
    item.setAttribute("data-index", String(i));
    item.setAttribute("aria-label", "Open gallery image " + (i + 1));

    const ph = document.createElement("span");
    ph.className = "ph";
    ph.style.setProperty("--angle", angles[i % angles.length] + "deg");

    const plus = document.createElement("span");
    plus.className = "g-plus";
    plus.textContent = "＋";

    const label = document.createElement("span");
    label.className = "g-label";

    item.append(ph, plus, label);
    grid.appendChild(item);
  }

  /* ------------------------------------------------------------
     7. Lightbox
     ------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lbMedia");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let currentIndex = 0;
  let lastFocused = null;

  function renderLb() {
    const tags = t("gallery.tags");
    lbMedia.className = "lb-media ph";
    lbMedia.style.setProperty("--angle", angles[currentIndex % angles.length] + "deg");
    lbCaption.textContent =
      tags[currentIndex % tags.length] + " · #" + String(currentIndex + 1).padStart(2, "0");
  }
  function openLb(index) {
    currentIndex = index;
    lastFocused = document.activeElement;
    renderLb();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLb() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  function step(dir) {
    currentIndex = (currentIndex + dir + GALLERY_COUNT) % GALLERY_COUNT;
    renderLb();
  }

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) openLb(Number(item.getAttribute("data-index")));
  });
  lbClose.addEventListener("click", closeLb);
  lbPrev.addEventListener("click", () => step(-1));
  lbNext.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* ------------------------------------------------------------
     8. Booking form
     ------------------------------------------------------------ */
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");
  const CONTACT_EMAIL = "hello@melange.tattoo";

  function setFieldError(name, message) {
    const field = form
      .querySelector('[name="' + name + '"]')
      .closest(".field");
    const err = form.querySelector('[data-err-for="' + name + '"]');
    if (message) {
      field.classList.add("invalid");
      if (err) err.textContent = message;
    } else {
      field.classList.remove("invalid");
      if (err) err.textContent = "";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const required = ["name", "contact", "desc"];
    let ok = true;

    required.forEach((n) => {
      if (!String(data[n] || "").trim()) {
        setFieldError(n, t("err.required"));
        ok = false;
      } else {
        setFieldError(n, "");
      }
    });

    if (!ok) {
      const firstInvalid = form.querySelector(".field.invalid input, .field.invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Compose a mailto with the collected details.
    // To use a real backend instead (e.g. Formspree), replace this block
    // with a fetch() POST to your endpoint — see README.md.
    const L = {
      ko: { name: "이름", contact: "연락처", part: "부위", size: "크기", date: "희망일", desc: "설명" },
      en: { name: "Name", contact: "Contact", part: "Placement", size: "Size", date: "Date", desc: "Notes" },
    }[lang];

    const lines = [
      L.name + ": " + data.name,
      L.contact + ": " + data.contact,
      L.part + ": " + (data.part || "-"),
      L.size + ": " + (data.size || "-"),
      L.date + ": " + (data.date || "-"),
      "",
      L.desc + ":",
      data.desc,
    ];

    const subject =
      (lang === "ko" ? "[예약 문의] " : "[Booking] ") + data.name;
    const href =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    status.textContent = t("status.opening");
    window.location.href = href;
  });

  /* ------------------------------------------------------------
     9. Init
     ------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  applyLang();
})();
