# 떡상 계좌 키우기 — PC(Steam) 빌드

`../game`에 있는 웹 빌드(KO `index.html`, EN `en/index.html`)를 Electron 창으로 포장해요. 게임 코드는 바꾸지 않아요.

- 광고·서비스워커·CrazyGames SDK는 켜지지 않아요(`app://game/` 주소라서 해당 조건이 모두 꺼짐).
- 저장: 웹판과 같은 localStorage → `%APPDATA%\Ddeoksang\Local Storage\` (Windows), `~/.config/Ddeoksang/` (Linux).
- 언어: 처음엔 OS 언어(한국어면 KO, 그 외 EN). `Ctrl+Shift+L`로 바꾸면 기억해요. `--lang=ko|en`으로 강제할 수 있어요.
- 키: `F11`·`Alt+Enter` 전체 화면 · `Ctrl +/-/0` 확대 · `F5`/`Ctrl+R` 새로고침 막음.
- 게임 밖 주소로는 이동하지 않아요. https 링크는 기본 브라우저로 열어요.

## 빌드
```
cd steam
npm ci            # electron 바이너리는 node node_modules/electron/install.js 로 받음
bash build.sh     # all | win32 | linux  → dist/Ddeoksang-<ver>-win64.zip, dist/Ddeoksang-<ver>-linux64.tar.gz
```
Windows exe의 아이콘·버전 정보는 wine 없이 `patch_exe.js`(resedit)로 넣어요.

## 테스트 (Linux 빌드로)
```
xvfb-run -a node test/smoke.cjs dist/Ddeoksang-linux-x64/Ddeoksang
```
확인하는 것: KO 첫 실행·저장 생성, 외부 이동·경로 밖 파일 막힘, 서비스워커 없음, F11·F5·확대 키,
판 도중 창 닫기 → 다시 열면 1번만 정산, 저장 유지, Ctrl+Shift+L 언어 전환과 기억, 콘솔 오류 0.

## 다음 단계 (Steam App ID 받은 뒤)
- steamworks.js로 업적·Steam 언어·클라우드 저장 연결
- SteamPipe 업로드 설정(depot: `dist/Ddeoksang-win32-x64`, 실행 파일 `Ddeoksang.exe`)
- 스토어 이미지·스크린샷
