import json,glob,sys,re;sys.path.insert(0,'.');from lib import *
d={}
for f in sorted(glob.glob('out*.json')):d.update(json.load(open(f)))
s,miss=apply(open('../sanghanga.html').read(),d)
s=s.replace("const LANG='ko';","const LANG='en';",1)
assert s.count("const ASSET='';")==1,'ASSET const missing in sanghanga.html'
s=s.replace("const ASSET='';","const ASSET='../';",1) # 영어판은 /en/ 안이라 그림 폴더(chars/·brand/)가 한 단계 위
for o in ('portrait','landscape'): # 첫 화면 그림 미리 받기: 영어판은 동전 없는 _v3 그림 (한 단계 위 brand/)
  a='href="brand/intro_'+o+'_ko.webp"';assert s.count(a)==1,'title art preload missing: '+a;s=s.replace(a,'href="../brand/intro_'+o+'_v3.webp"')
assert s.count(' src="ui/')>=10,'first-screen icons missing in markup';s=s.replace(' src="ui/',' src="../ui/') # HTML에 바로 쓴 첫 화면 아이콘(탭·선물·SP)도 한 단계 위 ui/
assert s.count('--up:#f2313f;--down:#2f7bff')==1,'KO market colour tokens changed: update this swap (EN must be green up / red down)'
s=s.replace('--up:#f2313f;--down:#2f7bff','--up:#16c784;--down:#f2313f',1) # 영어판: 초록 상승·빨강 하락 (작은 숫자용 --up-t/--down-t·큰 버튼 색은 html[lang=en] 규칙이 바꿈)
assert s.count('<link rel="stylesheet" href="fonts/fonts.css">')==1,'self-hosted font link missing in sanghanga.html'
s=s.replace('<link rel="stylesheet" href="fonts/fonts.css">','<link rel="stylesheet" href="../fonts/fonts.css">') # 글꼴 폴더도 한 단계 위 (fonts/fonts.css 안의 url()은 그 파일 기준 상대 경로라 그대로)
assert 'fonts.googleapis' not in s and 'fonts.gstatic' not in s,'Google Fonts left (fonts are self-hosted)'
s=s.replace("'ko-KR'","'en-US'")
s=s.replace("const GAME_URL='https://melange-lab.github.io/'","const GAME_URL='https://melange-lab.github.io/en/'")
bad=[k for k,v in d.items() if re.search(r"['\"`<>\\\n]|\$\{",v)]
open('game_en.html','w').write(s)
print('missing',len(miss),list(miss)[:20]);print('bad',bad[:10])
import re as _re
K=open('/home/user/Vibe-Trading/game/index.html').read().split('\n')[:22]
H='\n'.join(K)+'\n'
H=H.replace(',user-scalable=no','') # 확대 허용 (접근성)
H,n=_re.subn(r'og\.png\?v=\d+"','og.png?v=60"',H);assert n==1,'og:image line missing in the deploy head' # mk.sh와 같은 OG 주소 꼬리표
H=_re.sub(r'<meta property="og:image:alt" content="[^"]*">','',H);H=H.replace('og.png?v=60">','og.png?v=60"><meta property="og:image:alt" content="Stonks Tycoon · free stock-timing game · virtual money">',1)
assert 'user-scalable=no' not in H
for a,b in [('lang="ko"','lang="en"'),('content="떡상계좌"','content="Stonks"'),
 ('<link rel="manifest" href="manifest.webmanifest">\n',''),('href="apple-touch-icon.png"','href="../apple-touch-icon.png"'),('href="icon-192.png"','href="../icon-192.png"')]:H=H.replace(a,b)
H=_re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="Sell before the crash. Grow your account from a tiny room to a moon base. Free stock-timing game with virtual money.">',H)
H=_re.sub(r'<meta property="og:title" content="[^"]*">','<meta property="og:title" content="Stonks Tycoon 📈 Sell before the crash">',H)
H=_re.sub(r'<meta property="og:description" content="[^"]*">','<meta property="og:description" content="Sell before the crash and grow your account. Free · No install · Virtual money">',H)
H=H.replace('<meta property="og:url" content="https://melange-lab.github.io/">','<meta property="og:url" content="https://melange-lab.github.io/en/">')
assert not _re.search('[가-힣]',H),'korean left in head'
open('index.html','w').write(H+s+"\n<script>\nif('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('../sw.js').catch(()=>{}));\n</script>\n</body></html>\n")
