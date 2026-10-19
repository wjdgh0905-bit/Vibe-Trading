import json,glob,sys,re;sys.path.insert(0,'.');from lib import *
d={}
for f in sorted(glob.glob('out*.json')):d.update(json.load(open(f)))
s,miss=apply(open('../sanghanga.html').read(),d)
s=s.replace("const LANG='ko';","const LANG='en';",1)
s=s.replace('--up:#f2313f;--down:#2f7bff','--up:#16c784;--down:#f2313f',1)
s=s.replace("'ko-KR'","'en-US'")
s=s.replace("const GAME_URL='https://melange-lab.github.io/'","const GAME_URL='https://melange-lab.github.io/en/'")
bad=[k for k,v in d.items() if re.search(r"['\"`<>\\\n]|\$\{",v)]
open('game_en.html','w').write(s)
print('missing',len(miss),list(miss)[:20]);print('bad',bad[:10])
H=r'''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="theme-color" content="#080a0f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Stonks">
<link rel="apple-touch-icon" href="../apple-touch-icon.png">
<link rel="icon" href="../icon-192.png">
<meta name="description" content="Sell before the crash. Grow your account from a tiny room to a moon base. Free stock-timing game with virtual money.">
<meta property="og:type" content="website">
<meta property="og:title" content="Stonks Tycoon 📈 Sell before the crash">
<meta property="og:description" content="Sell before the crash and grow your account. Free · No install · Virtual money">
<meta property="og:image" content="https://melange-lab.github.io/og.png">
<meta property="og:url" content="https://melange-lab.github.io/en/">
<meta name="twitter:card" content="summary_large_image">
'''
open('index.html','w').write(H+s+'\n</body></html>\n')
