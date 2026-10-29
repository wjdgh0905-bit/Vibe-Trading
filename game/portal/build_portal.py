# 영어판(en/index.html)으로 포털 업로드용 빌드 생성: python3 build_portal.py crazygames|crazygames-basic|itch
# crazygames-basic: 크레이지게임즈 Basic Launch용 (광고가 꺼진 단계 → 📺 버튼을 아예 안 그림). Full Launch 초대를 받으면 crazygames 빌드로 교체
import re,sys,os,shutil,zipfile
S='/tmp/claude-0/-home-user-Vibe-Trading/7aa73141-b6ff-5500-9c31-1a869009517d/scratchpad'
kind=sys.argv[1]
assert kind in ('crazygames','crazygames-basic','itch'),kind
cg=kind.startswith('crazygames') # 크레이지게임즈 규정(공유 주소·SDK·개인정보 문구)은 두 크레이지게임즈 빌드에 똑같이
s=open(S+'/en/index.html',encoding='utf-8').read()
# 출시 관문: 영어판·포털 빌드에 한글이 한 글자라도 남으면 실패 (예외 없음 → sanghanga.html이나 en/out*.json 번역을 고칠 것)
HG=re.compile('[\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff]')
def no_hangul(t,where):
  bad=[(i+1,l.strip()[:120]) for i,l in enumerate(t.split('\n')) if HG.search(l)]
  assert not bad,f'Hangul left in {where} ({len(bad)} lines): fix sanghanga.html or en/out*.json, then rebuild en. First: {bad[:5]}'
no_hangul(s,S+'/en/index.html')
def R(a,b,cnt=1):
  global s
  n=s.count(a)
  assert n==cnt,(n,a[:70]); s=s.replace(a,b)
# 1) 애드센스 고정 태그 제거 + 코드상 애드센스 끄기 (포털 규정: 외부 광고 금지)
s,n=re.subn(r'<script async[^>]*adsbygoogle\.js[^>]*></script>\n?','',s); assert n==1,n
R("const CFG={adClient:'ca-pub-2213068202184499',","const CFG={adClient:'',")
R("sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+CFG.adClient;","sc.src='';") # 실행되지 않는 코드지만 포털 심사 스캔에 외부 광고 주소가 안 걸리게 주소 문자열도 제거
assert 'googlesyndication' not in s and 'ca-pub-' not in s
# 1-2) 애드센스 로더 블록과 adsOn의 애드센스 분기도 제거 (CFG.adClient=''라 실행되지 않는 코드지만, 포털 심사 문자열 검사에 구글 광고 API(adsbygoogle)가 안 걸리게)
s,n=re.subn(r"if\(CFG\.adClient&&!onCG\)\{if\(!document\.querySelector\('script\[src\*=adsbygoogle\]'\)\).*?window\.adConfig\(\{preloadAdBreaks:'on',sound:SET\.sound\|\|SET\.bgm\?'on':'off'\}\);\}\n",'',s,flags=re.S); assert n==1,n
R("(!!CFG.adClient&&typeof window.adBreak==='function'&&!!(window.adsbygoogle&&window.adsbygoogle.loaded))","false")
assert 'adsbygoogle' not in s,'AdSense identifier left in a portal build'
# 1-1) 프리미엄 상점은 CFG.iap로만 켬 (주소 ?iap 미리보기 제거. ?devbuy는 iapDev가 false면 localhost 밖에서 안 켜짐)
R("const PREM_ON=!!CFG.iap||premQ('iap')&&PREM_DEVHOST;","const PREM_ON=!!CFG.iap;")
assert "iapDev:false}" in s,'CFG.iapDev must be false in portal builds (it would allow ?devbuy free grants)'
# 2) 서비스워커 등록 제거 (포털 iframe에서는 불필요)
s,n=re.subn(r"<script>\nif\('serviceWorker' in navigator\)[^\n]*\n</script>\n",'',s); assert n==1,n
# 3) 아이콘 경로를 빌드 폴더 안으로 + 그림 폴더(chars/·brand/)도 빌드 폴더 안이라 영어판의 '../'를 다시 ''로 (그림은 아래에서 복사)
R("const ASSET='../';","const ASSET='';")
n=s.count(' src="../ui/');assert n>=10,n;s=s.replace(' src="../ui/',' src="ui/') # HTML에 바로 쓴 첫 화면 아이콘도 빌드 폴더 안 ui/로
s=s.replace('href="../apple-touch-icon.png"','href="icon-192.png"').replace('href="../icon-192.png"','href="icon-192.png"')
# 4) 공유: 크레이지게임즈는 플레이 가능한 외부 사이트 링크 금지 → 주소 없이 텍스트만
if cg:
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
  "Fonts load from Google Fonts. Ads are provided by CrazyGames, and the ad provider may use cookies." if kind=='crazygames' else
  "Fonts load from Google Fonts. This version shows no ads in the game. CrazyGames may use cookies on its own site." if kind=='crazygames-basic' else "Fonts load from Google Fonts. This version has no ads.")
R("Your progress is saved only in this browser. Browsers can clear site data (e.g. Safari after long inactivity), so copy your backup code now and then and keep it somewhere safe. Also use it to move to another device.",
  "Your progress is saved in this browser. If you are logged in to CrazyGames, it may also be backed up to your CrazyGames account. Clearing site data can erase it, so save your backup code somewhere safe now and then. Also use it to move to another device." if cg else
  "Your progress is saved only in this browser. Clearing site data erases it, and it won’t carry over to another device, so save your backup code somewhere safe now and then.")
# 크레이지게임즈: 제출 때 Progress Save = APS(자동 localStorage 백업)로 고름 → 로그인 사용자는 계정에 백업될 수 있음 ("서버로 안 보냄" 문구를 맞춤). SDK.data는 안 씀. CFG.iap를 켜면 APS 불가 → Data module 연동 필요
if cg:
  R("No sign-up. Your progress is stored only in this browser and is never sent to a server.",
    "No sign-up. Your progress is stored in this browser. If you are logged in to CrazyGames, CrazyGames may back it up to your account.")
  assert re.search(r"const CFG=\{[^}]*\biap:false\b",s),'CrazyGames build relies on APS: with in-game purchases (CFG.iap) APS is not allowed, so add the SDK.data module first'
  assert 'never sent to a server' not in s,'stale CrazyGames privacy text'
  R("Progress is saved only in this device’s browser. Resetting erases ranks, skills and achievements.",
    "Resetting erases all progress in this browser, including ranks, skills and achievements.") # 설정 '데이터' 줄도 위 백업·개인정보 안내(계정 백업 가능)와 맞춤
  assert 'saved only in this' not in s,'stale CrazyGames save-location text'

assert "Copy it in Settings to keep playing on another device" in s and "on a new phone" not in s,'stale glossary backup text'
assert 'AdSense' not in s and 'Home Screen' not in s,'stale portal privacy/backup text'
R("(LANG==='en'?'':' · NASDAQ')","''") # 영어판에서 안 쓰는 한글판 분기 정리 (실제 거래소 이름 안 남게, 영어판 종목 코드는 티커만)
assert 'NASDAQ' not in s
# 6) 구글 폰트 CSS가 게임 스크립트(와 SDK 요청)를 막지 않게: print로 받아 두었다가 다 오면 적용 (폰트 서버가 느리거나 막혀도 첫 화면이 바로 뜸, 글꼴은 그대로)
GF='href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;700;900&family=JetBrains+Mono:wght@500;700;800&display=swap"'
R('<link rel="stylesheet" '+GF+'>','<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" media="print" onload="this.media=\'all\'" '+GF+'><noscript><link rel="stylesheet" '+GF+'></noscript>')
# 7) 크레이지게임즈 SDK를 HTML과 같이 미리 받기 (스크립트가 나중에 같은 주소로 붙일 때 그대로 씀. crossorigin 없이 = 동적 script와 같은 요청)
if cg:
  R('<html lang="en"><head><meta charset="utf-8">','<html lang="en"><head><meta charset="utf-8">\n<link rel="preload" as="script" href="https://sdk.crazygames.com/crazygames-sdk-v3.js">')
  assert "sc.src='https://sdk.crazygames.com/crazygames-sdk-v3.js'" in s,'SDK URL changed: update the preload link'
# 8) Basic Launch 빌드: 광고가 꺼진 단계라 adsOn()을 늘 false로 (보상 버튼·전면 광고 없음, 바닥 화면은 무료 복귀 지원금). SDK는 gameplayStart/Stop·설정·음소거용으로 그대로
if kind=='crazygames-basic':
  R("const adsOn=()=>onCG?CG.on&&!CG.noAds:","const adsOn=()=>onCG?false:")
  assert 'Ads are provided by CrazyGames' not in s,'stale ad privacy text in the Basic Launch build'
no_hangul(s,'build_'+kind)
assert '🎰' not in s,'casino emoji left (the daily reward is a 🎁 gift now)'
assert not re.search(r"label:'[^']*(Crypto|Coin)",s),'Crypto/Coin tier label left (EN tier is Meme Stocks)'
out=f'{S}/cg/build_{kind}'
shutil.rmtree(out,ignore_errors=True);os.makedirs(out)
open(out+'/index.html','w',encoding='utf-8').write(s)
IC=S+'/assets/icons/icon-192.png';shutil.copy(IC if os.path.exists(IC) else '/home/user/Vibe-Trading/game/icon-192.png',out+'/icon-192.png') # 새 아이콘(배포 전엔 game/에 아직 옛 아이콘)이 있으면 그것으로
for sub in ('chars','brand'): # 동물 친구 그림·타이틀 그림 (ASSET=''가 가리키는 곳)
  src=f'{S}/assets/{sub}';fs=sorted(f for f in os.listdir(src) if f.endswith('.webp') and f!='title_ko.webp');assert fs,'no assets in '+src # 포털 빌드는 늘 영어판이라 한글 제목 그림은 안 넣음
  os.makedirs(f'{out}/{sub}');[shutil.copy(f'{src}/{f}',f'{out}/{sub}/{f}') for f in fs]
UI=S+'/assets/ui';ui=sorted(f for f in os.listdir(UI) if f.endswith('.webp'));assert len(ui)>=200,'ui icons missing: run design/build_ui.py' # UI 아이콘 그림 (ASSET+'ui/<id>.webp')
os.makedirs(out+'/ui');[shutil.copy(f'{UI}/{f}',f'{out}/ui/{f}') for f in ui]
m=re.search(r"const ICM=\{([^}]*)\}",s);assert m,'icon map ICM missing in the page';need={i for i in re.findall(r":'([a-z0-9_]+)'",m.group(1))}|set(re.findall(r"'([a-z0-9_]+)'\]",s[s.index('const ICX='):s.index('\n',s.index('const ICX='))])) # 페이지가 쓰는 그림 id (기본 표 + 뜻에 따라 고르는 표)
assert need and need<={f[:-5] for f in ui},'icons used by the page but missing in ui/: %s'%sorted(need-{f[:-5] for f in ui})
assert os.path.exists(out+'/chars/hamster_happy.webp') and os.path.exists(out+'/brand/title_en.webp') and os.path.exists(out+'/ui/chart_up.webp') and len(os.listdir(out+'/ui'))==len(ui),'asset copy failed'
z=f'{S}/cg/stonks-tycoon-{kind}.zip'
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as f:
  for root,dirs,files in os.walk(out): # 하위 폴더(chars/·brand/·ui/)까지
    dirs.sort()
    for fn in sorted(files):p=os.path.join(root,fn);f.write(p,os.path.relpath(p,out),compress_type=zipfile.ZIP_STORED if fn.endswith(('.webp','.png')) else zipfile.ZIP_DEFLATED)
with zipfile.ZipFile(z) as f:assert 'index.html' in f.namelist() and 'ui/chart_up.webp' in f.namelist() and sum(n.startswith('ui/') for n in f.namelist())==len(ui) and 'chars/lion_shock.webp' in f.namelist() and 'brand/intro_portrait.webp' in f.namelist() and 'brand/title_ko.webp' not in f.namelist(),'zip is missing files (or has the Korean title art)'
print(kind,'ok',os.path.getsize(out+'/index.html'),'bytes ->',z,os.path.getsize(z))
# 9) 출시 키트(launch-kit 폴더 + stonks-tycoon-launch-kit.zip)도 방금 만든 빌드 zip·listing.md로 갱신 (예전엔 손으로 묶어서 낡은 빌드가 남았음)
K=f'{S}/cg/launch-kit'
if os.path.isdir(K):
  KZ=('stonks-tycoon-crazygames.zip','stonks-tycoon-crazygames-basic.zip') # 크레이지게임즈 단독 출시: Basic Launch(광고 없음)·Full Launch(광고) zip만 (itch zip은 키트에 안 넣음)
  for nm in KZ:
    if os.path.exists(f'{S}/cg/{nm}'):shutil.copy(f'{S}/cg/{nm}',K+'/'+nm) # 두 zip 다 (방금 만든 것 + 지난번 것)
  if os.path.exists(K+'/stonks-tycoon-itch.zip'):os.remove(K+'/stonks-tycoon-itch.zip') # 예전 키트에 남은 itch zip 제거
  if os.path.isdir(f'{S}/cg/cover'): # 표지도 최신 cg/cover로 (listing.md가 가리키는 그림)
    os.makedirs(K+'/covers',exist_ok=True)
    for fn in os.listdir(f'{S}/cg/cover'):
      if fn.endswith('.png'):shutil.copy(f'{S}/cg/cover/{fn}',K+'/covers/'+fn)
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
    for nm in KZ:
      src=f'{S}/cg/{nm}'
      if os.path.exists(src):assert f.read(nm)==open(src,'rb').read(),'launch kit has a stale '+nm
    assert 'stonks-tycoon-itch.zip' not in f.namelist() and 'listing.md' in f.namelist(),'launch kit must hold listing.md and no itch zip'
  print('launch kit ok ->',kz,os.path.getsize(kz))
