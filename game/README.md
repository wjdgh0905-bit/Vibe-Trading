# 떡상 계좌 키우기

버튼을 한 번 눌러 매수하고, 폭락 전에 다시 눌러 매도하는 타이밍 게임입니다. 가상 머니만 쓰고 실제 돈은 오가지 않습니다. 설치 없이 브라우저에서 돌아가고, 홈 화면에 추가하면 오프라인에서도 실행됩니다.

- `index.html`: 게임 전체 (외부 라이브러리 없음)
- `sw.js`: 오프라인 캐시
- `manifest.webmanifest`, `*.png`: 홈 화면 앱 설정과 아이콘
- `og.png`: 링크 공유 미리보기 이미지
- `fonts/`: 게임에 포함한 글꼴 (Noto Sans KR, Inter, Gasoek One · 외부 글꼴 서버 없음)
- `chars/`, `brand/`, `ui/`: 캐릭터·첫 화면·아이콘 그림

플레이 주소: https://melange-lab.github.io/

`main`에 푸시하면 `.github/workflows/game-pages.yml`이 GitHub Pages로 배포합니다.

## 크레딧 · 라이선스

- 캐릭터·아이콘·배경 그림: 제작자가 Higgsfield(Nano Banana Pro, Seedance)로 생성
- 글꼴: Noto Sans KR, Inter, Gasoek One (모두 SIL Open Font License 1.1, 게임 파일에 포함 · `fonts/OFL.txt`)
- 효과음·배경음악: 게임 안에서 직접 합성 (외부 음원 없음)
- 게임 속 회사·종목·뉴스·채팅은 모두 가상이며 실제와 관계없습니다.
