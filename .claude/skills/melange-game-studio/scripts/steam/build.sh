#!/bin/bash
# PC(Steam) 빌드 템플릿: package.json의 gameDir 웹 빌드를 Electron 창으로 포장
#   → dist/<productName>-win32-x64 (+ .zip, .7z), dist/<productName>-linux-x64 (+ .tar.gz)
# 사용: bash build.sh [win32|linux|all]   (기본 all)
# 게임마다 바꿀 것: package.json (productName · titles · gameDir · gameFiles · version)
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/stage/app"; OUT="$HERE/dist"
P() { node -p "const p=require('$HERE/package.json');$1"; }
NAME=$(P "p.productName"); VER=$(P "p.version"); EV=$(P "p.devDependencies.electron")
GAME="$(cd "$HERE/$(P "p.gameDir||'../game'")" && pwd)"
WHICH=${1:-all}
cd "$HERE"; if [ ! -d node_modules/electron ]; then if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi; fi
[ -f node_modules/electron/dist/electron ] || [ -f node_modules/electron/path.txt ] || node node_modules/electron/install.js
rm -rf "$HERE/stage"; mkdir -p "$ST/game"
cp "$HERE/main.js" "$ST/"; cp "$GAME/icon-512.png" "$ST/icon.png"
node -e "const p=require('$HERE/package.json');delete p.devDependencies;delete p.scripts;delete p.test;require('fs').writeFileSync('$ST/package.json',JSON.stringify(p,null,1))"
# 게임 파일 복사 (gameFiles 목록 · 없는 항목은 건너뜀)
for f in $(P "(p.gameFiles||['index.html','en/index.html']).join(' ')"); do
  if [ -e "$GAME/$f" ]; then mkdir -p "$ST/game/$(dirname "$f")"; cp -r "$GAME/$f" "$ST/game/$f"; else echo "  (skip missing $f)"; fi
done
[ -f "$ST/game/index.html" ] || { echo "FAIL: $GAME/index.html not copied"; exit 1; }
python3 -c "
from PIL import Image
im=Image.open('$GAME/icon-512.png').convert('RGBA')
im.save('$HERE/stage/icon.ico',sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)])"
if [ -n "${HTTPS_PROXY:-}" ]; then export ELECTRON_GET_USE_PROXY=1 GLOBAL_AGENT_HTTPS_PROXY="$HTTPS_PROXY"; fi   # 프록시 뒤에서만
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt || true
pack(){ npx --no-install electron-packager "$ST" "$NAME" --platform=$1 --arch=x64 --out "$OUT" --overwrite --asar \
  --electron-version="$EV" --app-version="$VER" --executable-name="$NAME" --quiet
  find "$OUT/$NAME-$1-x64/locales" -type f ! -name 'en-US.pak' ! -name 'ko.pak' -delete; }   # 한국어·영어 외 크롬 언어팩 빼기
mkdir -p "$OUT"
if [ "$WHICH" = all ] || [ "$WHICH" = win32 ]; then
  pack win32; rm -f "$OUT/$NAME-win32-x64/dxcompiler.dll" "$OUT/$NAME-win32-x64/dxil.dll"   # WebGPU 셰이더 컴파일러(2D 캔버스 게임엔 불필요) · 25MB 절약
  node "$HERE/patch_exe.js" "$OUT/$NAME-win32-x64/$NAME.exe" "$HERE/stage/icon.ico" "$VER" "$NAME"
  (cd "$OUT" && rm -f "$NAME-$VER-win64.zip" && zip -qr9 "$NAME-$VER-win64.zip" "$NAME-win32-x64")
  if command -v 7z >/dev/null; then (cd "$OUT" && rm -f "$NAME-$VER-win64.7z" && 7z a -t7z -mx=9 -m0=lzma2 -md=256m -ms=on "$NAME-$VER-win64.7z" "$NAME-win32-x64" >/dev/null); fi   # 테스트 전달용(더 작음)
fi
if [ "$WHICH" = all ] || [ "$WHICH" = linux ]; then
  pack linux; (cd "$OUT" && rm -f "$NAME-$VER-linux64.tar.gz" && tar czf "$NAME-$VER-linux64.tar.gz" "$NAME-linux-x64")
fi
ls -la "$OUT"
