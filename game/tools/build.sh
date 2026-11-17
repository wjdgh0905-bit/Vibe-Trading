#!/bin/bash
# game/src → game/index.html (KO) + game/en/index.html (EN)
# KO = 배포 머리(index.html 첫 22줄) + 한글 주석을 뺀 원본 + 서비스워커 등록
# EN = i18n/build.py (src/en/out*.json 지도로 한글 문구를 영어로) · KO를 먼저 만들고 EN 머리는 새 KO 빌드에서 읽음
set -e
G="$(cd "$(dirname "$0")/.." && pwd)"; T="$(mktemp -d)"
mkdir -p "$T/en"; cp "$G/src/sanghanga.html" "$T/"; cp "$G/i18n/lib.py" "$T/en/"; cp "$G"/src/en/out*.json "$T/en/"
sed "s#/home/user/Vibe-Trading/game/index.html#$G/index.html#" "$G/i18n/build.py" > "$T/en/build.py"
python3 - "$G" "$T" <<'PY'
import sys;G,T=sys.argv[1:];sys.path.insert(0,T+'/en');from lib import prep
K=open(G+'/index.html',encoding='utf-8').read()
H='\n'.join(K.split('\n')[:22])+'\n'
assert H.rstrip().endswith('</head><body>'),'deploy head must end with </head><body>'
tail="<script>\nif('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));\n</script>\n</body></html>\n"
open(G+'/index.html','w',encoding='utf-8').write(H+prep(open(T+'/sanghanga.html',encoding='utf-8').read())+tail)
PY
(cd "$T/en" && python3 build.py | tee "$T/en.log")
grep -q "^missing 0 " "$T/en.log" || { echo "EN: Korean strings without an English map entry (see above)"; exit 1; }
cp "$T/en/index.html" "$G/en/index.html"
python3 -c "
import re,sys;e=open('$G/en/index.html',encoding='utf-8').read();h=re.findall('[가-힣]',e);print('EN hangul',len(h))
sys.exit(1 if h else 0)"
for f in "$G/index.html" "$G/en/index.html"; do node -e "
const s=require('fs').readFileSync('$f','utf8');const re=/<script>([\s\S]*?)<\/script>/g;let m,n=0;while((m=re.exec(s))){new Function(m[1]);n++}console.log('js ok',n,'$f'.split('/game/')[1])"; done
rm -rf "$T"
