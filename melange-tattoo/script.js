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
    { tagKey: "Dragon", src: "assets/gallery/dragon-01.jpg" },
    { tagKey: "Snake", src: "assets/gallery/snake-01.jpg" },
    { tagKey: "Phoenix", src: "assets/gallery/phoenix-01.jpg" },
    { tagKey: "Flowers", src: "assets/gallery/flowers-01.jpg" },
    { tagKey: "Clouds", src: "assets/gallery/clouds-01.jpg" },
    { tagKey: "Lightning", src: "assets/gallery/lightning-01.jpg" },
    { tagKey: "Pattern", src: "assets/gallery/pattern-01.jpg" },
    { tagKey: "Dragon", src: "assets/gallery/dragon-02.jpg" },
    { tagKey: "Phoenix", src: "assets/gallery/phoenix-02.jpg" },
    { tagKey: "Pattern", src: "assets/gallery/pattern-02.jpg" },
    { tagKey: "Pattern", src: "assets/gallery/pattern-03.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-001.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-002.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-003.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-004.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-005.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-006.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-007.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-008.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-009.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-010.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-011.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-012.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-013.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-014.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-015.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-016.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-017.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-018.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-019.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-020.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-021.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-022.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-023.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-024.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-025.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-026.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-027.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-028.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-029.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-030.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-031.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-032.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-033.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-034.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-035.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-036.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-037.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-038.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-039.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-040.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-041.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-042.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-043.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-044.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-045.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-046.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-047.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-048.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-049.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-050.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-051.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-052.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-053.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-054.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-055.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-056.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-057.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-058.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-059.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-060.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-061.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-062.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-063.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-064.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-065.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-066.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-067.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-068.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-069.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-070.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-071.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-072.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-073.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-074.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-075.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-076.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-077.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-078.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-079.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-080.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-081.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-082.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-083.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-084.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-085.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-086.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-087.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-088.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-089.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-090.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-091.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-092.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-093.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-094.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-095.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-096.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-097.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-098.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-099.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-100.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-101.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-102.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-103.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-104.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-105.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-106.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-107.jpg" },
    { tagKey: "MelangeStyle", src: "assets/gallery/custom-108.jpg" },
    { tagKey: "Flash", src: "assets/gallery/flash-01.jpg" },
  ];

  /* ------------------------------------------------------------
     Guest spots — edit as travel dates are confirmed, e.g.
     { regionKey: "SouthKorea", city: "Seoul", status: "Mar 3–15 — DM to book" }
     `status` overrides the default "Dates via Instagram" text when set.
     ------------------------------------------------------------ */
  const GUEST_SPOTS = [
    { regionKey: "SouthKorea" },
    { regionKey: "Australia" },
    { regionKey: "UnitedStates" },
    { regionKey: "UnitedKingdom" },
    { regionKey: "Europe" },
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
        "Dragon, snake, phoenix, koi, whale, flowers, clouds, lightning, pattern — each redrawn into Melange's own line and color, shaped to fit the body.",
      "hero.ctaWork": "View Work",
      "hero.ctaBooking": "Booking Info",
      "hero.meta":
        "South Korea  ·  Australia  ·  United States  ·  United Kingdom  ·  Europe",
      "work.eyebrow": "Selected Work",
      "work.title": "Recent tattoos",
      "work.desc": "Finished pieces, updated as new work comes in. Tap any photo to enlarge.",
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
      "guestSpots.eyebrow": "Upcoming Guest Spots",
      "guestSpots.title": "Where Melange is working",
      "guestSpots.desc":
        "Melange travels as a guest artist. Exact cities and dates go up on Instagram as they're confirmed. The studio address is shared directly once a booking is confirmed.",
      "guestSpots.status": "Dates via Instagram",
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
      "guestSpots.eyebrow": "게스트 일정",
      "guestSpots.title": "멜란지가 작업하는 지역",
      "guestSpots.desc":
        "멜란지는 게스트 아티스트로 여러 지역에서 작업합니다. 정확한 도시와 일정은 확정되는 대로 인스타그램에 공지되며, 스튜디오 주소는 예약이 확정된 분께 직접 안내드립니다.",
      "guestSpots.status": "일정은 인스타그램 공지",
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

  function tileMedia(entry, angle) {
    if (entry.src) {
      const img = document.createElement("img");
      img.src = entry.src;
      img.alt = "Melange Tattoo " + tTag(entry.tagKey) + " tattoo";
      img.loading = "lazy";
      return img;
    }
    const ph = document.createElement("span");
    ph.className = "ph";
    ph.style.setProperty("--angle", angle + "deg");
    return ph;
  }

  function renderGallery() {
    grid.innerHTML = "";
    GALLERY.forEach((entry, i) => {
      const angle = ANGLES[i % ANGLES.length];
      const item = document.createElement("button");
      item.type = "button";
      item.className = "gallery-item";
      item.setAttribute("data-index", String(i));
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
  function renderSpots() {
    spotsGrid.innerHTML = "";
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
     Init
     ------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  applyLang();
})();
