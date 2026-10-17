# 상한가 따라잡기

버튼을 누르는 동안 보유하고, 손을 떼면 매도하는 폭락 타이밍 게임입니다. 설치 없이 브라우저에서 돌아가고, 홈 화면에 추가하면 오프라인에서도 실행됩니다.

- `index.html`: 게임 전체 (외부 라이브러리 없음)
- `sw.js`: 오프라인 캐시
- `manifest.webmanifest`, `*.png`: 홈 화면 앱 설정과 아이콘

`main`에 푸시하면 `.github/workflows/game-pages.yml`이 GitHub Pages로 배포합니다.
