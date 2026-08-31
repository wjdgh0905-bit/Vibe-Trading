/* ============================================================
   MELANGE TATTOO — vanilla JS (no dependencies)
   - Bilingual KO/EN toggle (localStorage)
   - Mobile nav
   - Scroll header state
   - Gallery generation (data-driven) + lightbox
   - Guest spots (data-driven)
   - Booking form validation + Formspree submit
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     Gallery — edit this array to add or swap in real photos.
     Leave `src` empty to show a placeholder tile for that slot.
     To add a real photo: drop the file in assets/gallery/ and
     set `src` to its path, e.g. "assets/gallery/dragon-01.jpg".
     Add more entries any time — the grid reflows automatically.
     `tagKey` looks up a translated label in TAGS below.
     ------------------------------------------------------------ */
  const GALLERY = [
    { tagKey: "Dragon", src: "assets/gallery/dragon-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Snake", src: "assets/gallery/snake-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Phoenix", src: "assets/gallery/phoenix-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Flowers", src: "assets/gallery/flowers-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Clouds", src: "assets/gallery/clouds-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Lightning", src: "assets/gallery/lightning-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Pattern", src: "assets/gallery/pattern-01.jpg", w: 1600, h: 2131 },
    { tagKey: "Dragon", src: "assets/gallery/dragon-02.jpg", w: 1600, h: 2131 },
    { tagKey: "Phoenix", src: "assets/gallery/phoenix-02.jpg", w: 1600, h: 2131 },
    { tagKey: "Pattern", src: "assets/gallery/pattern-02.jpg", w: 1600, h: 2131 },
    { tagKey: "Pattern", src: "assets/gallery/pattern-03.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-001.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-002.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-003.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-004.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-005.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-006.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-007.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-008.jpg", w: 1600, h: 2844 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-009.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-010.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-011.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-012.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-013.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-014.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-015.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-016.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-017.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-018.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-019.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-020.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-021.jpg", w: 1600, h: 2844 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-022.jpg", w: 1600, h: 2400 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-023.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-024.jpg", w: 1600, h: 1066 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-025.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-026.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-027.jpg", w: 1600, h: 2400 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-028.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-029.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-030.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-031.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-032.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-033.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-034.jpg", w: 1600, h: 1066 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-035.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-036.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-037.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-038.jpg", w: 1600, h: 2133 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-039.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-040.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-041.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-042.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-043.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-044.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-045.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-046.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-047.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-048.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-049.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-050.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-051.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-052.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-053.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-054.jpg", w: 1600, h: 2844 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-055.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-056.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-057.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-058.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-059.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-060.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-061.jpg", w: 1600, h: 2844 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-062.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-063.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-064.jpg", w: 1600, h: 2239 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-065.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-066.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-067.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-068.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-069.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-070.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-071.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-072.jpg", w: 1600, h: 2844 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-073.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-074.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-075.jpg", w: 1600, h: 2400 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-076.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-077.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-078.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-079.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-080.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-081.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-082.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-083.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-084.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-085.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-086.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-087.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-088.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-089.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-090.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-091.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-092.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-093.jpg", w: 1600, h: 2400 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-094.jpg", w: 1600, h: 2400 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-095.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-096.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-097.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-098.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-099.jpg", w: 1600, h: 998 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-100.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-101.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-102.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-103.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-104.jpg", w: 1600, h: 2131 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-105.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-106.jpg", w: 1600, h: 1997 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-107.jpg", w: 1600, h: 2000 },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-108.jpg", w: 1600, h: 1998 },
    { tagKey: "Flash", src: "assets/gallery/flash-01.jpg", w: 1400, h: 1750 },
  ];

  /* ------------------------------------------------------------
     Guest spots — empty until a trip is actually confirmed. Add an
     entry only once real dates exist, e.g.
     { regionKey: "SouthKorea", city: "Seoul", status: "Mar 3–15 — DM to book" }
     `status` overrides the default "Dates via Instagram" text when set.
     With no entries, the section shows an Instagram-follow note instead.
     ------------------------------------------------------------ */
  const GUEST_SPOTS = [];

  /* ------------------------------------------------------------
     Instagram Reels — process/behind-the-scenes clips shown in the
     "Style & Process" section. Paste the reel's permalink URL, e.g.
     { url: "https://www.instagram.com/reel/AbCdefGHij/" }
     Leave empty and the whole block stays hidden.
     ------------------------------------------------------------ */
  const REELS = [
    { url: "https://www.instagram.com/reel/DcTcZrzJQsM/" },
    { url: "https://www.instagram.com/reel/DbxcYgdRaYe/" },
    { url: "https://www.instagram.com/reel/Dbf9KsRvB7z/" },
    { url: "https://www.instagram.com/reel/DbVrTi3pJMN/" },
    { url: "https://www.instagram.com/reel/DbG0j2Tzxmr/" },
    { url: "https://www.instagram.com/reel/DaKrIHZNAUS/" },
    { url: "https://www.instagram.com/reel/DUvEPM_EabA/" },
  ];

  const ANGLES = [30, 55, 80, 110, 135, 160, 20, 70, 100, 45, 95, 150];

  /* ------------------------------------------------------------
     Formspree endpoint — the "Booking Inquiries" form at
     formspree.io. If this ever needs resetting, set it back to a
     string containing "YOUR_FORM_ID" and the form will show a
     friendly error pointing at direct email instead of failing
     silently.
     ------------------------------------------------------------ */
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlkpjyw";

  /* ------------------------------------------------------------
     Translations
     ------------------------------------------------------------ */
  const TAGS = {
    en: {
      Dragon: "Dragon",
      Snake: "Snake",
      Phoenix: "Phoenix",
      Flowers: "Flowers",
      Clouds: "Clouds",
      Lightning: "Lightning",
      Pattern: "Pattern",
      MelangeStyle: "Melange Style",
      Flash: "Flash",
    },
    ko: {
      Dragon: "드래곤",
      Snake: "뱀",
      Phoenix: "불사조",
      Flowers: "꽃",
      Clouds: "구름",
      Lightning: "번개",
      Pattern: "패턴",
      MelangeStyle: "멜란지 스타일",
      Flash: "플래시",
    },
  };

  const REGIONS = {
    en: {
      SouthKorea: "South Korea",
      Australia: "Australia",
      UnitedStates: "United States",
      UnitedKingdom: "United Kingdom",
      Europe: "Europe",
    },
    ko: {
      SouthKorea: "대한민국",
      Australia: "호주",
      UnitedStates: "미국",
      UnitedKingdom: "영국",
      Europe: "유럽",
    },
  };

  const I18N = {
    en: {
      "meta.description":
        "Melange Tattoo: guest tattoo artist working across South Korea, Australia, the United States, the United Kingdom, and Europe. Custom work built around wave motion and blue color.",
      "a11y.skip": "Skip to content",
      "nav.work": "Work",
      "nav.about": "About",
      "nav.guestSpots": "Guest Spots",
      "nav.booking": "Booking",
      "nav.faq": "FAQ",
      "nav.book": "Inquire",
      "hero.title1": "Tattoo work built on",
      "hero.title2": "wave motion and blue.",
      "hero.sub":
        "Dragon, snake, phoenix, koi, whale, flowers, clouds, lightning, pattern, each redrawn into Melange's own line and color, shaped to fit the body.",
      "hero.ctaWork": "View Work",
      "hero.ctaBooking": "Booking Info",
      "hero.meta":
        "South Korea  ·  Australia  ·  United States  ·  United Kingdom  ·  Europe",
      "work.eyebrow": "Selected Work",
      "work.title": "Recent tattoos",
      "work.desc": "Finished pieces, updated as new work comes in. Tap any photo to enlarge.",
      "work.filterAll": "All",
      "work.filterLabel": "Filter by style",
      "about.eyebrow": "About",
      "about.title": "About Melange",
      "about.lead":
        "Melange works across dragon, snake, phoenix, koi, whale, flower, cloud, lightning, and pattern designs, all built around the same wave motion and blue color palette.",
      "about.body":
        "Every design is drawn to fit the shape and movement of its placement rather than a fixed template. Reference images are a starting point, not something to copy. Each piece is redrawn in Melange's own line work and color.",
      "process.eyebrow": "Style & Process",
      "process.title": "How each piece is made",
      "process.styleH": "Style",
      "process.style.1": "Recurring subjects: dragon, snake, phoenix, koi, whale, flowers, clouds, lightning, pattern",
      "process.style.2": "Built around wave motion and a blue color palette",
      "process.style.3": "Adapted to the shape and movement of the placement",
      "process.style.4": "Reference is reworked, not copied",
      "process.processH": "Process",
      "process.process.1": "Stencil and freehand are both used, depending on the piece",
      "process.process.2": "Base elements are prepared ahead of time",
      "process.process.3": "Sections that follow the body's flow are drawn freehand on the day",
      "process.process.4": "Final design and any changes are confirmed together before starting",
      "process.reelsH": "Recent process, on Instagram",
      "process.reelsFallback": "View on Instagram",
      "guestSpots.eyebrow": "Upcoming Guest Spots",
      "guestSpots.title": "Where Melange is working",
      "guestSpots.desc":
        "Melange travels as a guest artist. Exact cities and dates go up on Instagram as they're confirmed. The studio address is shared directly once a booking is confirmed.",
      "guestSpots.status": "Dates via Instagram",
      "guestSpots.empty": "No confirmed guest dates right now.",
      "guestSpots.followLink": "Follow on Instagram",
      "booking.eyebrow": "Booking",
      "booking.title": "Booking Information",
      "booking.lead": "By appointment only. Every booking starts with a short consultation.",
      "booking.directContact": "Prefer to reach out directly?",
      "booking.whatToInclude": "What to include in your first message",
      "booking.checklist.1": "Name",
      "booking.checklist.2": "City",
      "booking.checklist.3": "Tattoo idea or preferred design",
      "booking.checklist.4": "Placement",
      "booking.checklist.5": "Approximate size in cm",
      "booking.checklist.6": "Preferred date",
      "booking.checklist.7": "A clear photo of the placement area",
      "booking.howItWorks": "How it works",
      "booking.steps.1": "Send the details above via Instagram DM or email.",
      "booking.steps.2": "Melange reviews your message and replies with size, difficulty, estimated time, and price.",
      "booking.steps.3": "A deposit secures your date. Spots are confirmed in the order deposits come in.",
      "booking.steps.4": "The deposit is deducted from the final price and is non-refundable.",
      "booking.steps.5": "Your design is created after the booking is confirmed, not before.",
      "booking.steps.6": "Final design and any changes are reviewed together in person before the tattoo starts.",
      "booking.openForm": "Open Inquiry Form",
      "modal.title": "Send an Inquiry",
      "modal.instaNote": "Prefer Instagram? DM @melange.tattoo directly. No form needed.",
      "form.name": "Name",
      "form.city": "City",
      "form.cityPh": "e.g. Seoul",
      "form.instagram": "Instagram (optional)",
      "form.idea": "Tattoo idea or preferred design",
      "form.ideaPh": "Subject, style references, mood...",
      "form.placement": "Placement",
      "form.placementPh": "e.g. forearm",
      "form.size": "Approximate size (cm)",
      "form.sizePh": "e.g. 15",
      "form.date": "Preferred date",
      "form.photo": "Photo of the placement area (optional)",
      "form.submit": "Send Inquiry",
      "form.note": "Submitted directly. No email app needed.",
      "form.sending": "Sending…",
      "form.success": "Thanks, I'll be in touch soon.",
      "form.error": "Something went wrong. Please email me directly at melange.tattoo@gmail.com.",
      "faq.eyebrow": "FAQ",
      "faq.title": "Common Questions",
      "faq.q1": "Where are you based?",
      "faq.a1":
        "Melange travels as a guest artist across South Korea, Australia, the United States, the United Kingdom, and Europe. Exact cities and dates are posted on Instagram.",
      "faq.q2": "How do I get the exact studio address?",
      "faq.a2": "It's sent directly once your booking is confirmed.",
      "faq.q3": "What should I include in my first message?",
      "faq.a3":
        "Your name, city, tattoo idea or reference, placement, approximate size in cm, preferred date, and a clear photo of the placement area.",
      "faq.q4": "How much does it cost?",
      "faq.a4": "Price depends on size, placement, and difficulty. You'll get an estimate after sending your inquiry.",
      "faq.q5": "Is the deposit refundable?",
      "faq.a5": "No. The deposit secures your date and is deducted from the final price.",
      "faq.q6": "Can I see the design before the appointment?",
      "faq.a6":
        "Designs are made after booking is confirmed. Base elements may be prepared ahead of time, and parts that follow the body's flow are drawn freehand on the day. The final design is confirmed with you in person before starting.",
      "contact.title": "Let's talk about your tattoo.",
      "contact.text": "For all booking inquiries, please contact me via Instagram DM or email.",
      "footer.backToTop": "Back to top",
      "err.required": "This field is required.",
    },
    ko: {
      "meta.description":
        "멜란지 타투. 대한민국, 호주, 미국, 영국, 유럽에서 활동하는 게스트 타투이스트로, 파도의 흐름과 블루 컬러를 중심으로 한 커스텀 작업을 합니다.",
      "a11y.skip": "본문 바로가기",
      "nav.work": "작업",
      "nav.about": "소개",
      "nav.guestSpots": "게스트 일정",
      "nav.booking": "예약",
      "nav.faq": "FAQ",
      "nav.book": "문의하기",
      "hero.title1": "파도와 블루로",
      "hero.title2": "완성하는 타투.",
      "hero.sub":
        "용, 뱀, 불사조, 잉어, 고래, 꽃, 구름, 번개, 패턴을 각각 멜란지만의 선과 색으로 다시 그려 몸의 형태에 맞춥니다.",
      "hero.ctaWork": "작업 보기",
      "hero.ctaBooking": "예약 안내",
      "hero.meta": "대한민국  ·  호주  ·  미국  ·  영국  ·  유럽",
      "work.eyebrow": "작업",
      "work.title": "최근 작업",
      "work.desc": "완성작 모음입니다. 새 작업이 생기면 계속 추가돼요. 사진을 누르면 크게 볼 수 있어요.",
      "work.filterAll": "전체",
      "work.filterLabel": "스타일로 필터링",
      "about.eyebrow": "소개",
      "about.title": "멜란지 소개",
      "about.lead":
        "멜란지는 용, 뱀, 불사조, 잉어, 고래, 꽃, 구름, 번개, 패턴 등 다양한 소재를 다룹니다. 모두 같은 파도의 흐름과 블루 컬러를 중심으로 재구성됩니다.",
      "about.body":
        "모든 디자인은 정해진 틀이 아니라 시술 부위의 형태와 움직임에 맞춰 그려집니다. 레퍼런스 이미지는 시작점일 뿐 그대로 베끼지 않으며, 모든 작업은 멜란지만의 선과 색으로 다시 그려집니다.",
      "process.eyebrow": "스타일 & 작업 방식",
      "process.title": "작업은 이렇게 진행됩니다",
      "process.styleH": "스타일",
      "process.style.1": "반복되는 소재: 용, 뱀, 불사조, 잉어, 고래, 꽃, 구름, 번개, 패턴",
      "process.style.2": "파도의 흐름과 블루 컬러를 중심으로 구성",
      "process.style.3": "시술 부위의 형태와 움직임에 맞게 조정",
      "process.style.4": "레퍼런스는 그대로 베끼지 않고 재해석",
      "process.processH": "작업 방식",
      "process.process.1": "작업에 따라 스텐실과 프리핸드를 함께 사용",
      "process.process.2": "기본 요소는 사전에 준비",
      "process.process.3": "몸의 흐름을 따르는 부분은 당일 프리핸드로 진행",
      "process.process.4": "최종 디자인과 수정 사항은 시작 전 함께 확인",
      "process.reelsH": "인스타그램 작업 영상",
      "process.reelsFallback": "인스타그램에서 보기",
      "guestSpots.eyebrow": "게스트 일정",
      "guestSpots.title": "멜란지가 작업하는 지역",
      "guestSpots.desc":
        "멜란지는 게스트 아티스트로 여러 지역에서 작업합니다. 정확한 도시와 일정은 확정되는 대로 인스타그램에 공지되며, 스튜디오 주소는 예약이 확정된 분께 직접 안내드립니다.",
      "guestSpots.status": "일정은 인스타그램 공지",
      "guestSpots.empty": "현재 확정된 게스트 일정이 없습니다.",
      "guestSpots.followLink": "인스타그램 팔로우",
      "booking.eyebrow": "예약",
      "booking.title": "예약 안내",
      "booking.lead": "예약제로만 운영됩니다. 모든 예약은 간단한 상담으로 시작됩니다.",
      "booking.directContact": "직접 연락하고 싶으신가요?",
      "booking.whatToInclude": "첫 메시지에 포함할 내용",
      "booking.checklist.1": "이름",
      "booking.checklist.2": "도시",
      "booking.checklist.3": "원하는 타투 아이디어 또는 디자인",
      "booking.checklist.4": "시술 부위",
      "booking.checklist.5": "예상 사이즈(cm)",
      "booking.checklist.6": "희망 날짜",
      "booking.checklist.7": "시술 부위가 잘 보이는 사진",
      "booking.howItWorks": "진행 방식",
      "booking.steps.1": "위 내용을 인스타그램 DM이나 이메일로 보내주세요.",
      "booking.steps.2": "멜란지가 메시지를 확인한 후 사이즈, 난이도, 예상 소요 시간과 금액을 안내드립니다.",
      "booking.steps.3": "예약금 입금 순서대로 일정이 확정됩니다.",
      "booking.steps.4": "예약금은 최종 금액에서 차감되며 환불되지 않습니다.",
      "booking.steps.5": "디자인은 예약이 확정된 후에 제작됩니다.",
      "booking.steps.6": "최종 디자인과 수정 사항은 작업 시작 전 현장에서 함께 확인합니다.",
      "booking.openForm": "문의 폼 열기",
      "modal.title": "문의 보내기",
      "modal.instaNote": "인스타그램이 편하시면 @melange.tattoo로 바로 DM 주세요. 폼 작성 없이도 괜찮아요.",
      "form.name": "이름",
      "form.city": "도시",
      "form.cityPh": "예: 서울",
      "form.instagram": "인스타그램 (선택)",
      "form.idea": "원하는 타투 아이디어 또는 디자인",
      "form.ideaPh": "소재, 스타일 레퍼런스, 분위기 등...",
      "form.placement": "시술 부위",
      "form.placementPh": "예: 팔뚝",
      "form.size": "예상 사이즈 (cm)",
      "form.sizePh": "예: 15",
      "form.date": "희망 날짜",
      "form.photo": "시술 부위 사진 (선택)",
      "form.submit": "문의 보내기",
      "form.note": "제출하면 바로 접수돼요. 메일 앱은 필요 없습니다.",
      "form.sending": "전송 중…",
      "form.success": "감사합니다. 곧 연락드릴게요.",
      "form.error": "전송에 실패했어요. melange.tattoo@gmail.com으로 직접 메일 부탁드려요.",
      "faq.eyebrow": "FAQ",
      "faq.title": "자주 묻는 질문",
      "faq.q1": "어디서 활동하나요?",
      "faq.a1": "멜란지는 게스트 아티스트로 대한민국, 호주, 미국, 영국, 유럽에서 활동합니다. 정확한 도시와 일정은 인스타그램에 공지됩니다.",
      "faq.q2": "정확한 스튜디오 주소는 어떻게 알 수 있나요?",
      "faq.a2": "예약이 확정되면 직접 안내드립니다.",
      "faq.q3": "첫 메시지에는 뭘 포함해야 하나요?",
      "faq.a3": "이름, 도시, 타투 아이디어 또는 레퍼런스, 시술 부위, 예상 사이즈(cm), 희망 날짜, 시술 부위가 잘 보이는 사진을 보내주세요.",
      "faq.q4": "가격은 어떻게 되나요?",
      "faq.a4": "가격은 사이즈, 부위, 난이도에 따라 달라집니다. 문의 주시면 견적을 안내드려요.",
      "faq.q5": "예약금은 환불되나요?",
      "faq.a5": "환불되지 않습니다. 예약금은 일정을 확정하는 용도이며 최종 금액에서 차감됩니다.",
      "faq.q6": "예약 전에 디자인을 미리 볼 수 있나요?",
      "faq.a6":
        "디자인은 예약이 확정된 후에 제작됩니다. 기본 요소는 미리 준비될 수 있고, 몸의 흐름을 따르는 부분은 당일 프리핸드로 그려집니다. 최종 디자인은 작업 시작 전 현장에서 함께 확인합니다.",
      "contact.title": "타투에 대해 이야기해요.",
      "contact.text": "예약 문의는 인스타그램 DM이나 이메일로 연락해주세요.",
      "footer.backToTop": "맨 위로",
      "err.required": "필수 입력 항목입니다.",
    },
  };

  const STORAGE_KEY = "melange.lang";
  let lang = localStorage.getItem(STORAGE_KEY) || "en";
  if (!I18N[lang]) lang = "en";

  const t = (key) => (I18N[lang] && I18N[lang][key]) || key;
  const tTag = (key) => (TAGS[lang] && TAGS[lang][key]) || key;
  const tRegion = (key) => (REGIONS[lang] && REGIONS[lang][key]) || key;

  /* ------------------------------------------------------------
     Apply translations to static markup
     ------------------------------------------------------------ */
  function applyLang() {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      el.setAttribute("content", t(el.getAttribute("data-i18n-content")));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });

    document.querySelectorAll(".lang-opt").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });

    renderGallery();
    renderSpots();

    document.documentElement.removeAttribute("data-lang-loading");
  }

  function setLang(next) {
    lang = I18N[next] ? next : "en";
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang();
  }

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
     Language toggle button
     ------------------------------------------------------------ */
  document.getElementById("langToggle").addEventListener("click", () => {
    setLang(lang === "en" ? "ko" : "en");
  });

  /* ------------------------------------------------------------
     Gallery generation
     ------------------------------------------------------------ */
  const grid = document.getElementById("galleryGrid");
  const filtersBar = document.getElementById("galleryFilters");
  let activeFilter = "all";

  function tileMedia(entry, angle) {
    if (entry.src) {
      const img = document.createElement("img");
      img.src = entry.src;
      img.alt = "Melange Tattoo " + tTag(entry.tagKey) + " tattoo";
      img.loading = "lazy";
      img.decoding = "async";
      if (entry.w && entry.h) {
        img.width = entry.w;
        img.height = entry.h;
      }
      return img;
    }
    const ph = document.createElement("span");
    ph.className = "ph";
    ph.style.setProperty("--angle", angle + "deg");
    return ph;
  }

  function galleryTagsInUse() {
    const seen = [];
    GALLERY.forEach((entry) => {
      if (entry.tagKey && !seen.includes(entry.tagKey)) seen.push(entry.tagKey);
    });
    return seen;
  }

  function applyGalleryFilter() {
    grid.querySelectorAll(".gallery-item").forEach((item) => {
      item.hidden = activeFilter !== "all" && item.getAttribute("data-tag") !== activeFilter;
    });
  }

  function renderGalleryFilters() {
    filtersBar.innerHTML = "";
    filtersBar.setAttribute("aria-label", t("work.filterLabel"));

    const options = ["all", ...galleryTagsInUse()];
    options.forEach((key) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip" + (key === activeFilter ? " active" : "");
      chip.setAttribute("aria-pressed", String(key === activeFilter));
      chip.textContent = key === "all" ? t("work.filterAll") : tTag(key);
      chip.addEventListener("click", () => {
        activeFilter = key;
        renderGalleryFilters();
        applyGalleryFilter();
      });
      filtersBar.appendChild(chip);
    });
  }

  function renderGallery() {
    grid.innerHTML = "";
    GALLERY.forEach((entry, i) => {
      const angle = ANGLES[i % ANGLES.length];
      const item = document.createElement("button");
      item.type = "button";
      item.className = "gallery-item";
      item.setAttribute("data-index", String(i));
      item.setAttribute("data-tag", entry.tagKey);
      item.setAttribute("aria-label", "Open " + tTag(entry.tagKey) + " tattoo image");

      const plus = document.createElement("span");
      plus.className = "g-plus";
      plus.textContent = "＋";

      const label = document.createElement("span");
      label.className = "g-label";
      label.textContent = tTag(entry.tagKey);

      item.append(tileMedia(entry, angle), plus, label);
      grid.appendChild(item);
    });
    renderGalleryFilters();
    applyGalleryFilter();
  }

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
      img.alt = "Melange Tattoo " + tTag(entry.tagKey) + " tattoo";
      lbMedia.appendChild(img);
    } else {
      const ph = document.createElement("span");
      ph.className = "ph";
      ph.style.setProperty("--angle", angle + "deg");
      lbMedia.appendChild(ph);
    }
    lbCaption.textContent = tTag(entry.tagKey) + " · #" + String(currentIndex + 1).padStart(2, "0");
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
  function visibleGalleryIndices() {
    if (activeFilter === "all") return GALLERY.map((_, i) => i);
    const indices = [];
    GALLERY.forEach((entry, i) => {
      if (entry.tagKey === activeFilter) indices.push(i);
    });
    return indices;
  }
  function step(dir) {
    const indices = visibleGalleryIndices();
    const pos = indices.indexOf(currentIndex);
    currentIndex = indices[(pos + dir + indices.length) % indices.length];
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
     Inquiry modal — every "Inquire" entry point (header, sticky
     mobile bar, the booking section's own button) opens this
     instead of scrolling, so the form is always one tap away.
     ------------------------------------------------------------ */
  const modal = document.getElementById("inquiryModal");
  const modalClose = document.getElementById("modalClose");
  let modalLastFocused = null;

  function openModal() {
    modalLastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("f-name").focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (modalLastFocused) modalLastFocused.focus();
  }
  document.querySelectorAll(".js-open-inquiry").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeNav();
      openModal();
    });
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("open") && e.key === "Escape") closeModal();
  });

  /* ------------------------------------------------------------
     Guest spots
     ------------------------------------------------------------ */
  const spotsGrid = document.getElementById("spotsGrid");
  const spotsEmptyNote = document.getElementById("spotsEmptyNote");
  function renderSpots() {
    spotsGrid.innerHTML = "";
    spotsGrid.hidden = GUEST_SPOTS.length === 0;
    spotsEmptyNote.hidden = GUEST_SPOTS.length > 0;
    GUEST_SPOTS.forEach((spot) => {
      const card = document.createElement("div");
      card.className = "spot-card";

      const region = document.createElement("p");
      region.className = "spot-region";
      region.textContent = spot.city ? spot.city + ", " + tRegion(spot.regionKey) : tRegion(spot.regionKey);

      const status = document.createElement("span");
      status.className = "spot-status";
      status.textContent = spot.status || t("guestSpots.status");

      card.append(region, status);
      spotsGrid.appendChild(card);
    });
  }

  /* ------------------------------------------------------------
     Instagram Reels — official oEmbed blockquotes, processed by
     Instagram's own embed.js. Not language-dependent, so this runs
     once at init rather than on every language switch.
     ------------------------------------------------------------ */
  function renderReels() {
    const block = document.getElementById("reelsBlock");
    const row = document.getElementById("reelsRow");
    const prevBtn = document.getElementById("reelPrev");
    const nextBtn = document.getElementById("reelNext");
    if (!REELS.length) {
      block.hidden = true;
      return;
    }
    block.hidden = false;
    row.innerHTML = "";
    const items = REELS.map((reel) => {
      const bq = document.createElement("blockquote");
      bq.className = "instagram-media";
      bq.setAttribute("data-instgrm-permalink", reel.url);
      bq.setAttribute("data-instgrm-version", "14");

      // Fallback shown briefly while embed.js loads, and permanently if
      // it fails — never a blank box.
      const fallback = document.createElement("a");
      fallback.href = reel.url;
      fallback.target = "_blank";
      fallback.rel = "noopener";
      fallback.textContent = t("process.reelsFallback");
      bq.appendChild(fallback);

      row.appendChild(bq);
      return bq;
    });

    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(script);
    }

    // Carousel: whichever card sits over the row's exact horizontal
    // center gets the "in focus" look; neighbors stay dimmed/scaled
    // down. rootMargin collapses the row's box to a 0-width vertical
    // line at its center, so only the centered card ever intersects.
    if ("IntersectionObserver" in window) {
      const centerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-active", entry.isIntersecting);
          });
        },
        { root: row, threshold: 0, rootMargin: "0px -50% 0px -50%" }
      );
      items.forEach((el) => centerObserver.observe(el));
    } else {
      items[0].classList.add("is-active");
    }

    function scrollByOne(dir) {
      const step = items[0].getBoundingClientRect().width + 20; // item width + gap
      row.scrollBy({ left: dir * step, behavior: "smooth" });
    }
    prevBtn.addEventListener("click", () => scrollByOne(-1));
    nextBtn.addEventListener("click", () => scrollByOne(1));
  }

  /* ------------------------------------------------------------
     Booking form — submits to Formspree (see FORMSPREE_ENDPOINT
     above). Falls back to an inline error pointing at direct
     email if the endpoint isn't configured yet or the request
     fails.
     ------------------------------------------------------------ */
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");

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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const required = ["name", "city", "idea"];
    let ok = true;

    required.forEach((n) => {
      const val = form.querySelector('[name="' + n + '"]').value;
      if (!val.trim()) {
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

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      status.textContent = t("form.error");
      return;
    }

    status.textContent = t("form.sending");
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.textContent = t("form.success");
        form.reset();
      } else {
        status.textContent = t("form.error");
      }
    } catch (err) {
      status.textContent = t("form.error");
    } finally {
      submitBtn.disabled = false;
    }
  });

  /* ------------------------------------------------------------
     Scroll reveal — subtle one-time fade/rise for .reveal elements
     as they enter the viewport. Skipped for prefers-reduced-motion
     (the global CSS override already kills the transition, but this
     also avoids leaving anything permanently at opacity: 0).
     ------------------------------------------------------------ */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------
     Init
     ------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  applyLang();
  renderReels();
})();
