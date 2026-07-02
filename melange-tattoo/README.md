# melange.tattoo — 홈페이지

타투 스튜디오 **melange.tattoo**를 위한 독립 정적 홈페이지입니다.
빌드 도구·프레임워크·의존성이 전혀 없는 순수 **HTML / CSS / JS** 로 만들어져,
파일만 열면 어디서든 동작하고 어떤 정적 호스팅에도 그대로 배포할 수 있습니다.

이 폴더는 저장소의 나머지 코드(트레이딩 앱)와 완전히 분리되어 있습니다.

## 구성

```
melange-tattoo/
├── index.html        # 단일 페이지 (헤더 · 히어로 · 소개 · 갤러리 · 예약/문의 · 푸터)
├── styles.css        # 다크 에디토리얼 테마, 디자인 토큰(CSS 변수), 반응형
├── script.js         # KO/EN 토글 · 모바일 메뉴 · 갤러리 라이트박스 · 예약 폼
├── assets/
│   └── favicon.svg
└── README.md
```

## 로컬에서 보기

가장 간단한 방법 — `index.html`을 브라우저로 바로 엽니다.

로컬 서버로 보고 싶다면:

```bash
python3 -m http.server 8000 -d melange-tattoo
# → http://localhost:8000
```

## 언어 (한국어 / 영어)

- 헤더 우측의 **KO / EN** 버튼으로 전환합니다. 선택은 브라우저에 저장(localStorage)되어
  다음 방문에도 유지됩니다. 기본값은 한국어입니다.
- 모든 문구는 `script.js` 상단의 `I18N` 객체(`ko`, `en`)에 있습니다.
  텍스트를 바꾸려면 이 객체의 값만 수정하면 됩니다. HTML의 `data-i18n="키"` 속성이
  해당 키와 연결됩니다.

## 갤러리 이미지 교체

현재 갤러리는 **플레이스홀더 타일**(CSS 패턴)로 채워져 있습니다.
실제 타투 작업 사진으로 바꾸는 방법:

1. 사진을 `assets/gallery/` 폴더에 넣습니다 (예: `work-01.jpg` … 정사각형 권장, 1000×1000px 내외).
2. `script.js`의 **6. Gallery generation** 블록에서 플레이스홀더 `<span class="ph">` 대신
   `<img src="assets/gallery/work-01.jpg" alt="...">`를 넣도록 수정합니다.
   (라이트박스의 `renderLb()`도 같은 이미지 경로를 쓰도록 함께 바꾸면 확대 보기까지 연결됩니다.)

## 예약 폼 연결

폼은 기본적으로 입력 내용을 정리해 **메일 앱(`mailto:`)** 을 여는 방식입니다.
받는 주소는 `script.js`의 `CONTACT_EMAIL` 상수(`hello@melange.tattoo`)에서 바꿉니다.

실제 서버 없이 폼 데이터를 받고 싶다면 [Formspree](https://formspree.io) 같은 서비스를 연결하세요.
`script.js`의 `form.addEventListener("submit", ...)` 안에서 `mailto` 조립 블록을 아래처럼 교체하면 됩니다:

```js
fetch("https://formspree.io/f/여러분의_ID", {
  method: "POST",
  headers: { Accept: "application/json" },
  body: new FormData(form),
}).then(() => {
  status.textContent = lang === "ko" ? "문의가 전송되었습니다. 감사합니다!" : "Sent — thank you!";
  form.reset();
});
```

## 연락처·문구 커스터마이즈

- 인스타그램/카카오/이메일/운영시간: `index.html`의 **Booking** 섹션과 푸터에서 수정.
- 색상·폰트·간격: `styles.css` 최상단 `:root` 의 CSS 변수(`--accent`, `--bg`, `--font-serif` 등)에서 한 번에 조정.

## 배포

정적 파일이므로 다음 어디에나 이 폴더를 올리면 됩니다:
GitHub Pages · Cloudflare Pages · Netlify · Vercel · 일반 웹호스팅.
빌드 명령은 필요 없습니다.
