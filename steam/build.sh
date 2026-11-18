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
rm -f "$ST/game/brand/intro_landscape.webp" "$ST/game/brand/intro_portrait.webp"   # 게임이 쓰지 않는 첫 화면 그림 (쓰는 건 _ko·_v3)
cp "$GAME/icon-192.png" "$GAME/icon-512.png" "$GAME/apple-touch-icon.png" "$ST/game/"
python3 -c "
from PIL import Image
im=Image.open('$GAME/icon-512.png').convert('RGBA')
im.save('$HERE/stage/icon.ico',sizes=[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)])"
if [ -n "${HTTPS_PROXY:-}" ]; then export ELECTRON_GET_USE_PROXY=1 GLOBAL_AGENT_HTTPS_PROXY="$HTTPS_PROXY"; fi   # 프록시 뒤에서만
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt || true
pack(){ npx --no-install electron-packager "$ST" Ddeoksang --platform=$1 --arch=x64 --out "$OUT" --overwrite --asar \
  --electron-version="$EV" --app-version="$VER" --executable-name=Ddeoksang --quiet
  find "$OUT/Ddeoksang-$1-x64/locales" -type f ! -name 'en-US.pak' ! -name 'ko.pak' -delete   # 한국어·영어 외 크롬 언어팩 빼기
  ffswap "$1"; notices "$OUT/Ddeoksang-$1-x64"; }
CA=(); [ -f /root/.ccr/ca-bundle.crt ] && CA=(--cacert /root/.ccr/ca-bundle.crt)
ffswap(){   # ffmpeg를 Electron의 '특허 코덱 없는' 빌드로 바꿈 (게임은 영상·AAC/H.264를 안 씀) · Electron 공식 SHASUMS256으로 확인
  local Z="ffmpeg-v$EV-$1-x64.zip" U="https://github.com/electron/electron/releases/download/v$EV" F="$HERE/stage/ffmpeg-$1"
  mkdir -p "$F"; curl -fsSL "${CA[@]}" -o "$F/$Z" "$U/$Z"; curl -fsSL "${CA[@]}" -o "$F/SHASUMS256.txt" "$U/SHASUMS256.txt"
  python3 - "$F/$Z" "$F/SHASUMS256.txt" <<'PY'
import hashlib,sys,os
z,sums=sys.argv[1:];h=hashlib.sha256(open(z,'rb').read()).hexdigest();n=os.path.basename(z)
want=[l.split()[0] for l in open(sums) if l.strip().endswith(n)]
assert want and want[0]==h,'ffmpeg zip checksum mismatch: %s'%n
PY
  rm -rf "$F/x"; unzip -q -o "$F/$Z" -d "$F/x"
  local L; [ "$1" = win32 ] && L=ffmpeg.dll || L=libffmpeg.so
  cp "$F/x/$L" "$OUT/Ddeoksang-$1-x64/$L"; }
notices(){   # 오픈소스 고지 + 소스 제공 안내 + 글꼴 라이선스 (asar 안의 OFL.txt는 플레이어가 열 수 없어서 밖에도 둠)
  local V; V=$(ELECTRON_RUN_AS_NODE=1 "$HERE/node_modules/electron/dist/electron" -p "process.versions.chrome+' '+process.versions.node" 2>/dev/null || echo "? ?")
  local CH=${V%% *} ND=${V##* }
  { echo "Peakopia (떡상 계좌 키우기) $VER — third-party software notices"
    echo "Game code, text and art: (c) melange lab. All rights reserved."
    echo
    echo "This program is built on Electron $EV (MIT License, see LICENSE in this folder),"
    echo "which includes Chromium $CH and Node.js $ND. The licenses of all Chromium"
    echo "components are in LICENSES.chromium.html in this folder."
    echo
    echo "Components under the GNU Lesser General Public License (LGPL):"
    echo " - FFmpeg, shipped as the separate library ffmpeg.dll (Windows) / libffmpeg.so (Linux)."
    echo "   This is Electron's FFmpeg build without proprietary codecs. You may replace this file"
    echo "   with your own build of a compatible FFmpeg version."
    echo " - The Blink/WebKit rendering engine, part of the main executable."
    echo "Components under the Mozilla Public License 2.0 (MPL-2.0), e.g. the Symphonia audio"
    echo "decoders, are part of the main executable."
    echo
    echo "Source code of these components:"
    echo " - Electron $EV (with its patches): https://github.com/electron/electron/tree/v$EV"
    echo " - Chromium $CH: https://chromium.googlesource.com/chromium/src/+/refs/tags/$CH"
    echo " - FFmpeg as used by Chromium: https://chromium.googlesource.com/chromium/third_party/ffmpeg"
    echo "Written offer: for at least three years after you received this program, we will provide"
    echo "the complete corresponding source code of the LGPL and MPL components, for no more than"
    echo "the cost of providing it, to anyone who asks on this game's Steam Community page."
    echo
    echo "Fonts: Noto Sans KR, Inter and Gasoek One, under the SIL Open Font License 1.1:"
    echo
    cat "$GAME/fonts/OFL.txt"; } > "$1/THIRD_PARTY_NOTICES.txt"; }
mkdir -p "$OUT"
if [ "$WHICH" = all ] || [ "$WHICH" = win32 ]; then
  pack win32; rm -f "$OUT/Ddeoksang-win32-x64/dxcompiler.dll" "$OUT/Ddeoksang-win32-x64/dxil.dll"   # WebGPU용 셰이더 컴파일러(게임은 2D 캔버스만 씀) · 25MB 절약
  node "$HERE/patch_exe.js" "$OUT/Ddeoksang-win32-x64/Ddeoksang.exe" "$HERE/stage/icon.ico" "$VER"
  (cd "$OUT" && rm -f "Ddeoksang-$VER-win64.zip" && zip -qr9 "Ddeoksang-$VER-win64.zip" Ddeoksang-win32-x64)
  if command -v 7z >/dev/null; then (cd "$OUT" && rm -f "Ddeoksang-$VER-win64.7z" && 7z a -t7z -mx=9 -m0=lzma2 -md=256m -ms=on "Ddeoksang-$VER-win64.7z" Ddeoksang-win32-x64 >/dev/null); fi   # 테스트 전달용(더 작음)
fi
if [ "$WHICH" = all ] || [ "$WHICH" = linux ]; then
  pack linux; (cd "$OUT" && rm -f "Ddeoksang-$VER-linux64.tar.gz" && tar czf "Ddeoksang-$VER-linux64.tar.gz" Ddeoksang-linux-x64)
fi
ls -la "$OUT"
