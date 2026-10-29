import json,glob,sys,re;sys.path.insert(0,'.');from lib import *
d={}
for f in sorted(glob.glob('out*.json')):d.update(json.load(open(f)))
s,miss=apply(open('../sanghanga.html').read(),d)
s=s.replace("const LANG='ko';","const LANG='en';",1)
assert s.count("const ASSET='';")==1,'ASSET const missing in sanghanga.html'
s=s.replace("const ASSET='';","const ASSET='../';",1) # 영어판은 /en/ 안이라 그림 폴더(chars/·brand/)가 한 단계 위
s=s.replace('--up:#f2313f;--down:#2f7bff','--up:#16c784;--down:#f2313f',1)
s=s.replace("'ko-KR'","'en-US'")
s=s.replace("const GAME_URL='https://melange-lab.github.io/'","const GAME_URL='https://melange-lab.github.io/en/'")
bad=[k for k,v in d.items() if re.search(r"['\"`<>\\\n]|\$\{",v)]
open('game_en.html','w').write(s)
print('missing',len(miss),list(miss)[:20]);print('bad',bad[:10])
import re as _re
K=open('/home/user/Vibe-Trading/game/index.html').read().split('\n')[:22]
H='\n'.join(K)+'\n'
for a,b in [('lang="ko"','lang="en"'),('content="떡상계좌"','content="Stonks"'),
 ('<link rel="manifest" href="manifest.webmanifest">\n',''),('href="apple-touch-icon.png"','href="../apple-touch-icon.png"'),('href="icon-192.png"','href="../icon-192.png"')]:H=H.replace(a,b)
H=_re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="Sell before the crash. Grow your account from a tiny room to a moon base. Free stock-timing game with virtual money.">',H)
H=_re.sub(r'<meta property="og:title" content="[^"]*">','<meta property="og:title" content="Stonks Tycoon 📈 Sell before the crash">',H)
H=_re.sub(r'<meta property="og:description" content="[^"]*">','<meta property="og:description" content="Sell before the crash and grow your account. Free · No install · Virtual money">',H)
H=H.replace('<meta property="og:url" content="https://melange-lab.github.io/">','<meta property="og:url" content="https://melange-lab.github.io/en/">')
assert not _re.search('[가-힣]',H),'korean left in head'
open('index.html','w').write(H+s+"\n<script>\nif('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('../sw.js').catch(()=>{}));\n</script>\n</body></html>\n")
