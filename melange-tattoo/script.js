/* ============================================================
   MELANGE TATTOO — vanilla JS (no dependencies)
   - Mobile nav
   - Scroll header state
   - Gallery generation (data-driven) + lightbox
   - Guest spots (data-driven)
   - Booking form validation + mailto compose
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     Gallery — edit this array to add or swap in real photos.
     Leave `src` empty to show a placeholder tile for that slot.
     To add a real photo: drop the file in assets/gallery/ and
     set `src` to its path, e.g. "assets/gallery/dragon-01.jpg".
     Add more entries any time — the grid reflows automatically.
     ------------------------------------------------------------ */
  const GALLERY = [
    { tag: "Dragon", src: "assets/gallery/dragon-01.jpg" },
    { tag: "Snake", src: "assets/gallery/snake-01.jpg" },
    { tag: "Phoenix", src: "assets/gallery/phoenix-01.jpg" },
    { tag: "Koi", src: "" },
    { tag: "Whale", src: "" },
    { tag: "Flowers", src: "assets/gallery/flowers-01.jpg" },
    { tag: "Clouds", src: "" },
    { tag: "Lightning", src: "" },
    { tag: "Pattern", src: "assets/gallery/pattern-01.jpg" },
    { tag: "Dragon", src: "assets/gallery/dragon-02.jpg" },
    { tag: "Phoenix", src: "assets/gallery/phoenix-02.jpg" },
  ];

  /* ------------------------------------------------------------
     Guest spots — edit as travel dates are confirmed, e.g.
     { region: "Seoul, South Korea", status: "Mar 3–15 — DM to book" }
     ------------------------------------------------------------ */
  const GUEST_SPOTS = [
    { region: "South Korea", status: "Dates via Instagram" },
    { region: "Australia", status: "Dates via Instagram" },
    { region: "United States", status: "Dates via Instagram" },
    { region: "United Kingdom", status: "Dates via Instagram" },
    { region: "Europe", status: "Dates via Instagram" },
  ];

  const ANGLES = [30, 55, 80, 110, 135, 160, 20, 70, 100, 45, 95, 150];

  /* ------------------------------------------------------------
     Header scroll state
     ------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------
     Mobile nav
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
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

  /* ------------------------------------------------------------
     Gallery generation
     ------------------------------------------------------------ */
  const grid = document.getElementById("galleryGrid");

  function tileMedia(entry, angle) {
    if (entry.src) {
      const img = document.createElement("img");
      img.src = entry.src;
      img.alt = "Melange Tattoo — " + entry.tag + " tattoo";
      img.loading = "lazy";
      return img;
    }
    const ph = document.createElement("span");
    ph.className = "ph";
    ph.style.setProperty("--angle", angle + "deg");
    return ph;
  }

  GALLERY.forEach((entry, i) => {
    const angle = ANGLES[i % ANGLES.length];
    const item = document.createElement("button");
    item.type = "button";
    item.className = "gallery-item";
    item.setAttribute("data-index", String(i));
    item.setAttribute("aria-label", "Open " + entry.tag + " tattoo image");

    const plus = document.createElement("span");
    plus.className = "g-plus";
    plus.textContent = "＋";

    const label = document.createElement("span");
    label.className = "g-label";
    label.textContent = entry.tag;

    item.append(tileMedia(entry, angle), plus, label);
    grid.appendChild(item);
  });

  /* ------------------------------------------------------------
     Lightbox
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
    const entry = GALLERY[currentIndex];
    const angle = ANGLES[currentIndex % ANGLES.length];
    lbMedia.innerHTML = "";
    lbMedia.className = "lb-media";
    if (entry.src) {
      const img = document.createElement("img");
      img.src = entry.src;
      img.alt = "Melange Tattoo — " + entry.tag + " tattoo";
      lbMedia.appendChild(img);
    } else {
      const ph = document.createElement("span");
      ph.className = "ph";
      ph.style.setProperty("--angle", angle + "deg");
      lbMedia.appendChild(ph);
    }
    lbCaption.textContent = entry.tag + " · #" + String(currentIndex + 1).padStart(2, "0");
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
    currentIndex = (currentIndex + dir + GALLERY.length) % GALLERY.length;
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
     Guest spots
     ------------------------------------------------------------ */
  const spotsGrid = document.getElementById("spotsGrid");
  GUEST_SPOTS.forEach((spot) => {
    const card = document.createElement("div");
    card.className = "spot-card";

    const region = document.createElement("p");
    region.className = "spot-region";
    region.textContent = spot.region;

    const status = document.createElement("span");
    status.className = "spot-status";
    status.textContent = spot.status;

    card.append(region, status);
    spotsGrid.appendChild(card);
  });

  /* ------------------------------------------------------------
     Booking form
     ------------------------------------------------------------ */
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");
  const CONTACT_EMAIL = "melange.tattoo@gmail.com";

  function setFieldError(name, message) {
    const field = form.querySelector('[name="' + name + '"]').closest(".field");
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
    const required = ["name", "city", "idea"];
    let ok = true;

    required.forEach((n) => {
      if (!String(data[n] || "").trim()) {
        setFieldError(n, "This field is required.");
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
    const lines = [
      "Name: " + data.name,
      "City: " + data.city,
      "Instagram: " + (data.instagram || "-"),
      "Placement: " + (data.placement || "-"),
      "Approximate size (cm): " + (data.size || "-"),
      "Preferred date: " + (data.date || "-"),
      "",
      "Tattoo idea / reference:",
      data.idea,
      "",
      "(Remember to attach a clear photo of the placement area.)",
    ];

    const subject = "[Booking Inquiry] " + data.name + " — " + data.city;
    const href =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    status.textContent = "Opening your mail app…";
    window.location.href = href;
  });

  /* ------------------------------------------------------------
     Init
     ------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
