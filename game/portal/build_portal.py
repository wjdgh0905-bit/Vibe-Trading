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
R("sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+CFG.adClient;","sc.src='';") # 실행되지 않는 코드지만 포털 심사 스캔에 외부 광고 주소가 안 걸리게 주소 문자열도 제거
assert 'googlesyndication' not in s and 'ca-pub-' not in s
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
  # 설정의 '친구 초대' 버튼은 주소 없이는 게임을 찾을 길이 없음 → 크레이지게임즈판에서는 숨김 (게임 화면 밖 공유는 크레이지게임즈가 제공. 결과 공유 버튼은 그대로)
  R("'<h3>Invite Friends</h3><button class=\"setbtn\" type=\"button\" id=\"invite\" style=\"width:100%\">📤 Share Game with Friends</button>'","''")
  assert 'id="invite"' not in s and "if(iv)iv.onclick" in s,'invite button must be gone on CrazyGames (the if(iv) guard handles the missing button)'
  # 항상 크레이지게임즈 SDK 사용 (게임 파일이 어느 도메인에서 서비스되든)
  s,n=re.subn(r"onCG=/crazygames/\.test\(location\.hostname\)\|\|[^;]*;","onCG=true;",s); assert n==1,n
  s=re.sub(r'<meta property="og:[^>]*>\n?','',s); s=re.sub(r'<meta name="twitter:card"[^>]*>\n?','',s)
# 5) 설정의 개인정보·백업 안내를 포털 빌드에 맞게 (애드센스 없음 · 서비스워커/홈 화면 추가 없음 · PC 플레이어도 많음)
R("Fonts load from Google Fonts and ads from Google AdSense (the CrazyGames SDK on CrazyGames), and the ad provider may use cookies.",
  "Fonts load from Google Fonts. Ads are provided by CrazyGames, and the ad provider may use cookies." if kind=='crazygames' else "Fonts load from Google Fonts. This version has no ads.")
R("Your progress is saved only in this browser. Browsers can clear site data (e.g. Safari after long inactivity), so copy your backup code now and then and keep it somewhere safe. Also use it to move to another device.",
  "Your progress is saved in this browser. If you are logged in to CrazyGames, it may also be backed up to your CrazyGames account. Clearing site data can erase it, so save your backup code somewhere safe now and then. Also use it to move to another device." if kind=='crazygames' else
  "Your progress is saved only in this browser. Clearing site data erases it, and it won’t carry over to another device, so save your backup code somewhere safe now and then.")
# 크레이지게임즈: 제출 때 Progress Save = APS(자동 localStorage 백업)로 고름 → 로그인 사용자는 계정에 백업될 수 있음 ("서버로 안 보냄" 문구를 맞춤). SDK.data는 안 씀. CFG.iap를 켜면 APS 불가 → Data module 연동 필요
if kind=='crazygames':
  R("No sign-up. Your progress is stored only in this browser and is never sent to a server.",
    "No sign-up. Your progress is stored in this browser. If you are logged in to CrazyGames, CrazyGames may back it up to your account.")
  assert re.search(r"const CFG=\{[^}]*\biap:false\b",s),'CrazyGames build relies on APS: with in-game purchases (CFG.iap) APS is not allowed, so add the SDK.data module first'
  assert 'never sent to a server' not in s,'stale CrazyGames privacy text'
  R("Progress is saved only in this device’s browser. Resetting erases ranks, skills and achievements.",
    "Resetting erases all progress in this browser, including ranks, skills and achievements.") # 설정 '데이터' 줄도 위 백업·개인정보 안내(계정 백업 가능)와 맞춤
  assert 'saved only in this' not in s,'stale CrazyGames save-location text'

assert "Copy it in Settings to keep playing on another device" in s and "on a new phone" not in s,'stale glossary backup text'
assert 'AdSense' not in s and 'Home Screen' not in s,'stale portal privacy/backup text'
R("(LANG==='en'?' · US':' · NASDAQ')","' · US'") # 영어판에서 안 쓰는 한글판 분기 정리 (실제 거래소 이름 안 남게)
# 6) 구글 폰트 CSS가 게임 스크립트(와 SDK 요청)를 막지 않게: print로 받아 두었다가 다 오면 적용 (폰트 서버가 느리거나 막혀도 첫 화면이 바로 뜸, 글꼴은 그대로)
GF='href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;700;900&family=JetBrains+Mono:wght@500;700;800&display=swap"'
R('<link rel="stylesheet" '+GF+'>','<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" media="print" onload="this.media=\'all\'" '+GF+'><noscript><link rel="stylesheet" '+GF+'></noscript>')
# 7) 크레이지게임즈 SDK를 HTML과 같이 미리 받기 (스크립트가 나중에 같은 주소로 붙일 때 그대로 씀. crossorigin 없이 = 동적 script와 같은 요청)
if kind=='crazygames':
  R('<html lang="en"><head><meta charset="utf-8">','<html lang="en"><head><meta charset="utf-8">\n<link rel="preload" as="script" href="https://sdk.crazygames.com/crazygames-sdk-v3.js">')
  assert "sc.src='https://sdk.crazygames.com/crazygames-sdk-v3.js'" in s,'SDK URL changed: update the preload link'
out=f'{S}/cg/build_{kind}'
shutil.rmtree(out,ignore_errors=True);os.makedirs(out)
open(out+'/index.html','w',encoding='utf-8').write(s)
shutil.copy('/home/user/Vibe-Trading/game/icon-192.png',out+'/icon-192.png')
z=f'{S}/cg/stonks-tycoon-{kind}.zip'
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as f:
  for fn in os.listdir(out):f.write(os.path.join(out,fn),fn)
print(kind,'ok',os.path.getsize(out+'/index.html'),'bytes ->',z,os.path.getsize(z))
# 8) 출시 키트(launch-kit 폴더 + stonks-tycoon-launch-kit.zip)도 방금 만든 빌드 zip·listing.md로 갱신 (예전엔 손으로 묶어서 낡은 빌드가 남았음)
K=f'{S}/cg/launch-kit'
if os.path.isdir(K):
  for nm in ('stonks-tycoon-crazygames.zip','stonks-tycoon-itch.zip'):
    if os.path.exists(f'{S}/cg/{nm}'):shutil.copy(f'{S}/cg/{nm}',K+'/'+nm) # 두 포털 zip 다 (방금 만든 것 + 지난번 것)
  if os.path.exists(f'{S}/cg/listing.md'):shutil.copy(f'{S}/cg/listing.md',K+'/listing.md')
  kz=f'{S}/cg/stonks-tycoon-launch-kit.zip';tmp=kz+'.tmp'
  with zipfile.ZipFile(tmp,'w',zipfile.ZIP_DEFLATED) as f:
    for root,dirs,files in os.walk(K):
      dirs.sort();rel=os.path.relpath(root,K)
      if rel!='.':f.write(root,rel+'/')
      for fn in sorted(files):
        p=os.path.join(root,fn);a=os.path.relpath(p,K)
        f.write(p,a,compress_type=zipfile.ZIP_STORED if fn.endswith(('.mp4','.png','.zip')) else zipfile.ZIP_DEFLATED)
  os.replace(tmp,kz)
  with zipfile.ZipFile(kz) as f:
    for nm in ('stonks-tycoon-crazygames.zip','stonks-tycoon-itch.zip'):
      src=f'{S}/cg/{nm}'
      if os.path.exists(src):assert f.read(nm)==open(src,'rb').read(),'launch kit has a stale '+nm
  print('launch kit ok ->',kz,os.path.getsize(kz))
