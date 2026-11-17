#!/bin/bash
# PC(Steam) 빌드: game/ 웹 빌드를 Electron 창으로 포장 → dist/Ddeoksang-win32-x64, dist/Ddeoksang-linux-x64 (+ zip)
# 사용: bash build.sh [win32|linux|all]   (기본 all)
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; GAME="$HERE/../game"; ST="$HERE/stage/app"; OUT="$HERE/dist"
VER=$(node -p "require('$HERE/package.json').version"); EV=$(node -p "require('$HERE/package.json').devDependencies.electron")
WHICH=${1:-all}
cd "$HERE"; [ -d node_modules/electron ] || npm ci --no-audit --no-fund
rm -rf "$HERE/stage"; mkdir -p "$ST/game/en"
cp "$HERE/main.js" "$ST/"; cp "$GAME/icon-512.png" "$ST/icon.png"
node -e "const p=require('$HERE/package.json');delete p.devDependencies;delete p.scripts;require('fs').writeFileSync('$ST/package.json',JSON.stringify(p,null,1))"
cp "$GAME/index.html" "$ST/game/"; cp "$GAME/en/index.html" "$ST/game/en/"
cp -r "$GAME/fonts" "$GAME/ui" "$GAME/brand" "$GAME/chars" "$ST/game/"
cp "$GAME/icon-192.png" "$GAME/icon-512.png" "$GAME/apple-touch-icon.png" "$ST/game/"
python3 -c "
from PIL import Image
im=Image.open('$GAME/icon-512.png').convert('RGBA')
im.save('$HERE/stage/icon.ico',sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)])"
if [ -n "${HTTPS_PROXY:-}" ]; then export ELECTRON_GET_USE_PROXY=1 GLOBAL_AGENT_HTTPS_PROXY="$HTTPS_PROXY"; fi   # 프록시 뒤에서만
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt || true
pack(){ npx --no-install electron-packager "$ST" Ddeoksang --platform=$1 --arch=x64 --out "$OUT" --overwrite --asar \
  --electron-version="$EV" --app-version="$VER" --executable-name=Ddeoksang --quiet
  find "$OUT/Ddeoksang-$1-x64/locales" -type f ! -name 'en-US.pak' ! -name 'ko.pak' -delete; }   # 한국어·영어 외 크롬 언어팩 빼기
mkdir -p "$OUT"
if [ "$WHICH" = all ] || [ "$WHICH" = win32 ]; then
  pack win32; node "$HERE/patch_exe.js" "$OUT/Ddeoksang-win32-x64/Ddeoksang.exe" "$HERE/stage/icon.ico" "$VER"
  (cd "$OUT" && rm -f "Ddeoksang-$VER-win64.zip" && zip -qr9 "Ddeoksang-$VER-win64.zip" Ddeoksang-win32-x64)
fi
if [ "$WHICH" = all ] || [ "$WHICH" = linux ]; then
  pack linux; (cd "$OUT" && rm -f "Ddeoksang-$VER-linux64.tar.gz" && tar czf "Ddeoksang-$VER-linux64.tar.gz" Ddeoksang-linux-x64)
fi
ls -la "$OUT"
