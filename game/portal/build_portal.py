# 영어판(en/index.html)으로 포털 업로드용 빌드 생성: python3 build_portal.py crazygames|itch
import re,sys,os,shutil,zipfile
S='/tmp/claude-0/-home-user-Vibe-Trading/7aa73141-b6ff-5500-9c31-1a869009517d/scratchpad'
kind=sys.argv[1]
s=open(S+'/en/index.html',encoding='utf-8').read()
def R(a,b,cnt=1):
  global s
  n=s.count(a)
  assert n==cnt,(n,a[:70]); s=s.replace(a,b)
# 1) 애드센스 고정 태그 제거 + 코드상 애드센스 끄기 (포털 규정: 외부 광고 금지)
s,n=re.subn(r'<script async[^>]*adsbygoogle\.js[^>]*></script>\n?','',s); assert n==1,n
R("const CFG={adClient:'ca-pub-2213068202184499',","const CFG={adClient:'',")
# 1-1) 프리미엄 상점은 CFG.iap로만 켬 (주소 ?iap 미리보기 제거. ?devbuy는 iapDev가 false면 localhost 밖에서 안 켜짐)
R("const PREM_ON=!!CFG.iap||premQ('iap')&&PREM_DEVHOST;","const PREM_ON=!!CFG.iap;")
assert "iapDev:false}" in s,'CFG.iapDev must be false in portal builds (it would allow ?devbuy free grants)'
# 2) 서비스워커 등록 제거 (포털 iframe에서는 불필요)
s,n=re.subn(r"<script>\nif\('serviceWorker' in navigator\)[^\n]*\n</script>\n",'',s); assert n==1,n
# 3) 아이콘 경로를 빌드 폴더 안으로
s=s.replace('href="../apple-touch-icon.png"','href="icon-192.png"').replace('href="../icon-192.png"','href="icon-192.png"')
# 4) 공유: 크레이지게임즈는 플레이 가능한 외부 사이트 링크 금지 → 주소 없이 텍스트만
if kind=='crazygames':
  R("const GAME_URL='https://melange-lab.github.io/en/';","const GAME_URL='';")
  R("function shareOut(text){const full=text+'\\n👉 '+GAME_URL;","function shareOut(text){const full=GAME_URL?text+'\\n👉 '+GAME_URL:text;")
  R("navigator.share({title:'Stonks Tycoon',text,url:GAME_URL})","navigator.share(GAME_URL?{title:'Stonks Tycoon',text,url:GAME_URL}:{title:'Stonks Tycoon',text})")
  R("toast('Copied with link. Paste it to your friends!')","toast('Copied! Paste it to your friends!')")
  # 항상 크레이지게임즈 SDK 사용 (게임 파일이 어느 도메인에서 서비스되든)
  s,n=re.subn(r"onCG=/crazygames/\.test\(location\.hostname\)\|\|[^;]*;","onCG=true;",s); assert n==1,n
  s=re.sub(r'<meta property="og:[^>]*>\n?','',s); s=re.sub(r'<meta name="twitter:card"[^>]*>\n?','',s)
out=f'{S}/cg/build_{kind}'
shutil.rmtree(out,ignore_errors=True);os.makedirs(out)
open(out+'/index.html','w',encoding='utf-8').write(s)
shutil.copy('/home/user/Vibe-Trading/game/icon-192.png',out+'/icon-192.png')
z=f'{S}/cg/stonks-tycoon-{kind}.zip'
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as f:
  for fn in os.listdir(out):f.write(os.path.join(out,fn),fn)
print(kind,'ok',os.path.getsize(out+'/index.html'),'bytes ->',z,os.path.getsize(z))
