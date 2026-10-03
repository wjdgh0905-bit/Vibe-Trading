/* Melange Tattoo — site behaviour (shared by / and /ko/). No build step. */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     Schedule — add a trip once it's confirmed. The Guest spots table
     and the bar at the top of both pages update from this list.
       region: KR | AU | US | UK | EU (matches the table rows)
       where:  shown in the banner       cities: shown in the table
       when:   shown as written (use months when exact dates aren't fixed)
       start/end: only used to sort and to hide the entry once it's over
     ------------------------------------------------------------ */
  var GUEST_SPOTS = [
    { region: "US", where: { en: "United States", ko: "미국" },
      cities: { en: "Seattle → San Jose → LA → Denver", ko: "시애틀 → 산호세 → LA → 덴버" },
      when: { en: "Oct – early Nov", ko: "10월 ~ 11월 초" }, start: "2026-10-01", end: "2026-11-15" },
    { region: "KR", where: { en: "Korea", ko: "한국" },
      cities: { en: "Home studio", ko: "홈 스튜디오" },
      when: { en: "November", ko: "11월" }, start: "2026-11-01", end: "2026-11-30" },
    { region: "AU", where: { en: "Melbourne", ko: "멜버른" },
      cities: { en: "Melbourne", ko: "멜버른" },
      when: { en: "Dec 1 – 9", ko: "12월 1일 ~ 9일" }, start: "2026-12-01", end: "2026-12-09" }
  ];

  var FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlkpjyw";


  var L = document.documentElement.lang === "ko" ? "ko" : "en";
  var TXT = {
    en: {
      cats: { all: "All", dragon: "Dragon", snake: "Snake", koi: "Koi", animal: "Animals", floral: "Flowers", pattern: "Pattern (wave etc.)", character: "Character", more: "More" },
      custom: "Custom",
      count: function (n, total) { return "Showing " + n + " of " + total; },
      more: "See more",
      required: "Please fill this in.",
      emailBad: "That email doesn't look right.",
      contact: "Add an email or Instagram handle so we can reply.",
      sending: "Sending…",
      ok: "Thanks — your inquiry is in. We usually reply within 1–2 days.",
      fail: "It didn't send. Try again, or DM @melange.tattoo on Instagram.",
      announce: { label: "Now booking", go: "See dates" }
    },
    ko: {
      cats: { all: "전체", dragon: "용", snake: "뱀", koi: "잉어", animal: "동물", floral: "꽃", pattern: "패턴(파도 등)", character: "캐릭터", more: "기타" },
      custom: "커스텀",
      count: function (n, total) { return "전체 " + total + "개 중 " + n + "개"; },
      more: "더 보기",
      required: "이 항목을 입력해주세요.",
      emailBad: "이메일 주소를 다시 확인해주세요.",
      contact: "답장을 받을 이메일이나 인스타그램 아이디를 적어주세요.",
      sending: "보내는 중…",
      ok: "문의가 접수됐어요. 보통 1~2일 안에 답장드려요.",
      fail: "전송되지 않았어요. 다시 시도하시거나 인스타그램 @melange.tattoo로 DM 주세요.",
      announce: { label: "예약 중", go: "일정 보기" }
    }
  }[L];

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- headline word splits ---------- */
  function split(el, cls) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (w, i) {
      var sp = document.createElement("span");
      sp.className = cls; sp.style.setProperty("--i", i); sp.textContent = w;
      el.appendChild(sp);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }
  $$(".h1").forEach(function (h) { split(h, "w"); });
  $$(".h1 .w").forEach(function (w) { if (/^(blue|ink,|푸른)$/i.test(w.textContent)) w.classList.add("hl"); });
  $$(".h2").forEach(function (h) { split(h, "w2"); });

  /* ---------- gallery ---------- */
  // A fresh random order on every visit; the flash sheet always sits at the end.
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var ALL = shuffle((window.MELANGE_GALLERY || []).filter(function (d) { return d.id !== "flash-01"; }))
    .concat((window.MELANGE_GALLERY || []).filter(function (d) { return d.id === "flash-01"; }));

  // "All" deals one photo per subject in turn, so the same subject never runs back to back
  // until the smaller subjects run out.
  var MIX_ORDER = ["pattern", "dragon", "floral", "animal", "character", "snake", "koi", "more"];
  var MIXED = (function () {
    var piles = MIX_ORDER.map(function (c) { return ALL.filter(function (d) { return d.cat === c; }); });
    var extra = ALL.filter(function (d) { return MIX_ORDER.indexOf(d.cat) < 0; });
    var out = [];
    while (piles.some(function (p) { return p.length; })) piles.forEach(function (p) { if (p.length) out.push(p.shift()); });
    return out.concat(extra);
  })();

  var grid = $("#grid"), chips = $(".chips"), moreBtn = $("#more"), countEl = $(".count");
  var PAGE = 8, filter = "all", shown = 0, list = [];

  function place(d) { return L === "ko" ? d.placeKo : d.placeEn; }
  function alt(d) {
    var desc = L === "ko" ? d.ko : d.en;
    return desc || shortTitle(d) + (L === "ko" ? " 타투, 멜란지 작업" : " tattoo by Melange");
  }
  function shortTitle(d) {
    if (d.cat === "character") return (L === "ko" && d.ko ? d.ko : d.en).split(",")[0];
    if (d.cat === "more") return TXT.custom;
    if (d.cat === "animal") return L === "ko" ? "동물" : "Animal";
    if (d.cat === "floral") return L === "ko" ? "꽃" : "Flower";
    if (d.cat === "pattern") return L === "ko" ? "패턴" : "Pattern";
    return TXT.cats[d.cat] || TXT.custom;
  }

  function card(d, k) {
    var fig = document.createElement("figure");
    fig.className = "card enter";
    fig.style.setProperty("--k", k);
    var h = Math.round(d.h * 480 / d.w);
    fig.innerHTML =
      '<button type="button" data-id="' + d.id + '"><div class="ph"><img src="/assets/work/' + d.id + '-480.webp" ' +
      'srcset="/assets/work/' + d.id + '-480.webp 480w, /assets/work/' + d.id + '-1080.webp 1080w" ' +
      'sizes="(max-width: 960px) 68vw, 24vw" width="480" height="' + h + '" loading="lazy" decoding="async" alt=""></div>' +
      '<span class="cap"><span></span><span></span></span></button>';
    fig.querySelector("img").alt = alt(d);
    var caps = fig.querySelectorAll(".cap span");
    caps[0].textContent = shortTitle(d);
    caps[1].textContent = place(d);
    return fig;
  }

  function renderMore() {
    var next = list.slice(shown, shown + PAGE);
    next.forEach(function (d, k) { grid.appendChild(card(d, k)); });
    shown += next.length;
    countEl.textContent = TXT.count(shown, list.length);
    moreBtn.hidden = shown >= list.length;
  }
  function setFilter(cat) {
    filter = cat;
    list = cat === "all" ? MIXED : ALL.filter(function (d) { return d.cat === cat; });
    grid.textContent = ""; shown = 0;
    grid.scrollLeft = 0;
    renderMore();
    $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.cat === cat)); });
  }

  if (grid && ALL.length) {
    var counts = { all: ALL.length };
    ALL.forEach(function (d) { counts[d.cat] = (counts[d.cat] || 0) + 1; });
    ["all", "pattern", "dragon", "snake", "koi", "animal", "floral", "character", "more"].forEach(function (c) {
      if (!counts[c]) return;
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.dataset.cat = c;
      b.innerHTML = "<span></span><small></small>";
      b.firstChild.textContent = TXT.cats[c]; b.lastChild.textContent = counts[c];
      b.addEventListener("click", function () { setFilter(c); });
      chips.appendChild(b);
    });
    moreBtn.innerHTML = TXT.more + ' <span class="arr">↓</span>';
    moreBtn.addEventListener("click", renderMore);
    setFilter("all");
  }

  /* ---------- lightbox ---------- */
  var lb = $("#lb"), lbImg = lb && $("img", lb), lbCap = lb && $("figcaption", lb), lbIdx = 0, lbReturn = null;
  function lbShow(i) {
    lbIdx = (i + list.length) % list.length;
    var d = list[lbIdx];
    lbImg.src = "/assets/work/" + d.id + "-1080.webp";
    lbImg.alt = alt(d);
    lbCap.textContent = [shortTitle(d), place(d)].filter(Boolean).join(" — ") + "  ·  " + (lbIdx + 1) + " / " + list.length;
    // warm the neighbours so arrowing feels instant
    [lbIdx + 1, lbIdx - 1].forEach(function (j) { var n = list[(j + list.length) % list.length]; (new Image()).src = "/assets/work/" + n.id + "-1080.webp"; });
  }
  function lbOpen(i) {
    lbReturn = document.activeElement;
    lbShow(i);
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".lb-close", lb).focus();
  }
  function lbClose() {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lbReturn) lbReturn.focus({ preventScroll: true });
  }
  if (lb) {
    grid.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-id]");
      if (!b) return;
      for (var i = 0; i < list.length; i++) if (list[i].id === b.dataset.id) return lbOpen(i);
    });
    $(".lb-close", lb).addEventListener("click", lbClose);
    $(".lb-prev", lb).addEventListener("click", function () { lbShow(lbIdx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { lbShow(lbIdx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") lbClose();
      else if (e.key === "ArrowRight") lbShow(lbIdx + 1);
      else if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
      else if (e.key === "Tab") { // keep focus inside the viewer
        var f = $$(".lb-btn", lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- guest spots: table + announcement ---------- */
  (function () {
    var today = new Date().toISOString().slice(0, 10);
    var upcoming = GUEST_SPOTS.filter(function (s) { return s.end >= today; })
      .sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    upcoming.forEach(function (s) {
      var row = $('.tbl tr[data-region="' + s.region + '"]');
      if (!row || row.dataset.filled) return; // first (soonest) trip per region wins
      row.dataset.filled = "1";
      $(".d", row).textContent = s.cities[L];
      $(".st", row).innerHTML = '<span class="pill"></span>';
      $(".pill", row).textContent = s.when[L];
    });
    // scheduled trips first, in date order; regions without dates keep their place below
    var tbody = $(".tbl tbody");
    if (tbody) {
      var rows = $$("tr", tbody), dated = rows.filter(function (r) { return r.dataset.filled; });
      dated.sort(function (a, b) {
        var ia = upcoming.findIndex(function (s) { return s.region === a.dataset.region; });
        var ib = upcoming.findIndex(function (s) { return s.region === b.dataset.region; });
        return ia - ib;
      });
      dated.concat(rows.filter(function (r) { return !r.dataset.filled; })).forEach(function (r) { tbody.appendChild(r); });
    }
    var bar = $("#announce");
    if (bar && upcoming.length) {
      var el = function (tag, cls, text) { var n = document.createElement(tag); n.className = cls; if (text) n.textContent = text; return n; };
      bar.appendChild(el("span", "an-lbl", TXT.announce.label));
      var items = el("span", "an-items");
      upcoming.forEach(function (s) {
        var it = el("span", "an-item");
        it.appendChild(el("b", "", s.where[L]));
        it.appendChild(document.createTextNode(" " + s.when[L]));
        items.appendChild(it);
      });
      bar.appendChild(items);
      bar.appendChild(el("span", "an-go", TXT.announce.go + " →"));
      bar.hidden = false;
    }
  })();

  /* ---------- booking form ---------- */
  var form = $("#form"), statusEl = $("#status");
  function setErr(name, msg) {
    var input = form.elements[name], err = $("#err-" + name);
    input.closest(".field").classList.toggle("bad", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) input.setAttribute("aria-describedby", "err-" + name); else input.removeAttribute("aria-describedby");
    err.textContent = msg || "";
    return !msg;
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (n) { return form.elements[n].value.trim(); };
      var ok = true;
      ["name", "city", "idea"].forEach(function (n) { ok = setErr(n, v(n) ? "" : TXT.required) && ok; });
      var email = v("email"), ig = v("instagram");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ok = setErr("email", TXT.emailBad) && ok;
      else if (!email && !ig) { setErr("email", TXT.contact); ok = false; }
      else setErr("email", "");
      if (!ok) {
        var first = $(".field.bad input, .field.bad textarea", form);
        if (first) first.focus();
        return;
      }
      var btn = $('button[type="submit"]', form);
      btn.disabled = true;
      statusEl.className = "status"; statusEl.textContent = TXT.sending;
      fetch(FORMSPREE_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          statusEl.className = "status ok"; statusEl.textContent = TXT.ok; form.reset();
          if (typeof window.fbq === "function") window.fbq("track", "Lead"); // Meta Pixel: inquiry sent
        })
        .catch(function () { statusEl.className = "status fail"; statusEl.textContent = TXT.fail; })
        .then(function () { btn.disabled = false; });
    });
    form.addEventListener("input", function (e) { if (e.target.closest(".field.bad")) setErr(e.target.name === "instagram" ? "email" : e.target.name, ""); });
  }

  /* ---------- hero slideshow ---------- */
  $$(".show").forEach(function (sh) {
    var imgs = $$(".show-frame img", sh), i = 0, dur = 3800, bar = $(".show-bar i", sh);
    var tt = $(".show-t", sh), pl = $(".show-p", sh), num = $(".show-num", sh);
    // Pick a different set of pieces on every visit (only ones with a known placement,
    // so the caption always reads "subject — placement").
    var pool = ALL.filter(function (d) { return d.id !== "flash-01" && place(d); });
    shuffle(pool.slice()).slice(0, imgs.length).forEach(function (d, k) {
      var im = imgs[k];
      im.srcset = "/assets/work/" + d.id + "-480.webp 480w, /assets/work/" + d.id + "-1080.webp 1080w";
      im.src = "/assets/work/" + d.id + "-1080.webp";
      im.width = 1080; im.height = Math.round(d.h * 1080 / d.w);
      im.dataset.cap = shortTitle(d); im.dataset.pl = place(d);
      im.alt = shortTitle(d) + ", " + place(d);
    });
    tt.textContent = imgs[0].dataset.cap; pl.textContent = imgs[0].dataset.pl;
    function run() { bar.classList.remove("run"); void bar.offsetWidth; bar.style.setProperty("--dur", dur + "ms"); bar.classList.add("run"); }
    function next() {
      var prev = imgs[i]; i = (i + 1) % imgs.length; var cur = imgs[i];
      imgs.forEach(function (im) { im.classList.remove("off"); im.loading = "eager"; });
      prev.classList.remove("on"); prev.classList.add("off"); cur.classList.add("on");
      tt.textContent = cur.dataset.cap; pl.textContent = cur.dataset.pl;
      num.textContent = String(i + 1).padStart(2, "0") + " / " + String(imgs.length).padStart(2, "0");
      run();
    }
    if (reduce || imgs.length < 2) return;
    run();
    setInterval(function () { if (!document.hidden) next(); }, dur);
  });

  /* ---------- pointer effects (desktop only) ---------- */
  if (fine && !reduce) {
    var hero = $(".hero");
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
      hero.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    $$(".hero .ctas .btn, .foot-cta").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * .22) + "px," + ((e.clientY - r.top - r.height / 2) * .3) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
    grid.addEventListener("pointermove", function (e) {
      var f = e.target.closest(".card"); if (!f) return;
      var ph = $(".ph", f), r = ph.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      ph.style.transform = "rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg)";
    });
    grid.addEventListener("pointerout", function (e) {
      var f = e.target.closest(".card"); if (f && !f.contains(e.relatedTarget)) $(".ph", f).style.transform = "";
    });
  }

  var cur = $(".cursor");
  if (fine && cur && grid) {
    var cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    var loop = function () {
      cx += (tx - cx) * .22; cy += (ty - cy) * .22;
      cur.style.setProperty("--cx", cx + "px"); cur.style.setProperty("--cy", cy + "px");
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > .5 ? requestAnimationFrame(loop) : 0;
    };
    document.addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
    grid.addEventListener("pointerover", function (e) { cur.classList.toggle("on", !!e.target.closest(".card")); });
    grid.addEventListener("pointerleave", function () { cur.classList.remove("on"); });
  }

  /* ---------- scroll: progress, pinned nav, back-to-top, hero parallax ---------- */
  var progress = $(".progress"), mini = $(".mini"), heroEl = $(".hero"), heroGrid = $(".hero-grid"), ghost = $(".ghost");
  var heroNav = $(".hero .nav"), toTop = $(".totop");
  var ticking = false, miniOn = null;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight, hh = heroEl.offsetHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    // the pinned bar takes over as soon as the page's own nav scrolls out of view
    var on = heroNav.getBoundingClientRect().bottom < 0;
    if (on !== miniOn) {
      miniOn = on;
      mini.classList.toggle("is-on", on);
      mini.inert = !on;
      mini.setAttribute("aria-hidden", String(!on));
    }
    toTop.classList.toggle("is-on", y > innerHeight * .8);
    if (!reduce && y <= hh) {
      heroGrid.style.transform = "translateY(" + (y * .18) + "px)";
      heroGrid.style.opacity = String(Math.max(0, 1 - y / (hh * .85)));
      ghost.style.translate = "0 " + (y * -.12) + "px";
    }
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    var brand = $(".hero .brand"); if (brand) brand.focus({ preventScroll: true });
  });

  /* ---------- reveals (only below the first screen, so the page is complete at rest) ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    $$(".s-head, .about-body p, .subjects, .steps, .tbl tr, .book-info, .form, .faq details, .foot-cta, .foot .word").forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight * .92) return;
      el.classList.add("rv");
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--d", Math.min(sib, 5) * 70 + "ms");
      io.observe(el);
    });
  }

  /* ---------- mobile menu ---------- */
  // opened from the page's own nav or from the pinned bar
  var menu = $("#menu"), burgers = $$('.burger[aria-controls="menu"]'), opener = null;
  function closeMenu() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    burgers.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    document.body.style.overflow = "";
    if (opener) opener.focus({ preventScroll: true });
  }
  burgers.forEach(function (b) {
    b.addEventListener("click", function () {
      opener = b;
      menu.classList.add("open");
      b.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = $(".menu-links a", menu);
      if (first) first.focus({ preventScroll: true });
    });
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a, [data-close]")) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- KST clock, year ---------- */
  var kst = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  var clocks = $$("[data-kst]");
  function tick() { var s = "KST " + kst.format(new Date()); clocks.forEach(function (c) { c.textContent = s; }); }
  tick(); setInterval(tick, 1000);
  $$("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
