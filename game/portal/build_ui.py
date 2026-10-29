# UI 아이콘 그림: design/icons/<id>.png(투명 배경·여백 없음, 최대 512px) → assets/ui/<id>.webp
# 크기 등급(icon_catalog.json size)별로 폰 화면(DPR 2~3)에서 또렷한 해상도: small·medium 128px, large 256px (긴 변 기준, 비율 유지)
# 게임은 ASSET+'ui/<id>.webp'로 불러옴 (mk.sh가 srv/ui로, cg/build_portal.py가 포털 빌드 안으로 복사)
# 사용: python3 build_ui.py [--check]  · --check: 그림·카탈로그가 서로 빠짐없이 맞는지만 확인
import json,os,sys,io
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__));S=os.path.dirname(D)
SRC=D+'/icons';OUT=S+'/assets/ui';CAT=json.load(open(D+'/icon_catalog.json',encoding='utf-8'))
PX={'small':128,'medium':128,'large':256};Q={'small':(82,90),'medium':(82,90),'large':(78,85)} # (색 품질, 투명도 품질)
LIMIT=1.6*1024*1024 # 전체 용량 목표
ids={i['id']:i['size'] for i in CAT['icons']}
pngs={f[:-4] for f in os.listdir(SRC) if f.endswith('.png')}
miss=sorted(set(ids)-pngs);extra=sorted(pngs-set(ids))
assert not miss,'catalog icons without a PNG: %s'%miss
if extra:print('note: PNGs not in the catalog (skipped):',extra)
if '--check' in sys.argv:print('ok',len(ids),'icons');sys.exit(0)
os.makedirs(OUT,exist_ok=True)
for f in os.listdir(OUT): # 카탈로그에서 빠진 옛 그림은 지움
  if f.endswith('.webp') and f[:-5] not in ids:os.remove(OUT+'/'+f)
tot={};n={};big=[]
for id,sz in sorted(ids.items()):
  im=Image.open(f'{SRC}/{id}.png').convert('RGBA')
  bb=im.getchannel('A').point(lambda a:255 if a>8 else 0).getbbox() # 거의 투명한 가장자리는 잘라 냄 (상자 안에서 그림이 작아 보이지 않게)
  if bb:im=im.crop(bb)
  im.thumbnail((PX[sz],PX[sz]),Image.LANCZOS)
  q,aq=Q[sz];b=io.BytesIO();im.save(b,'WEBP',quality=q,alpha_quality=aq,method=6);data=b.getvalue()
  open(f'{OUT}/{id}.webp','wb').write(data)
  tot[sz]=tot.get(sz,0)+len(data);n[sz]=n.get(sz,0)+1
  if len(data)>24*1024:big.append((id,len(data)))
T=sum(tot.values())
for sz in ('small','medium','large'):print(f'{sz:6} {n.get(sz,0):3} icons {PX[sz]}px  {tot.get(sz,0)/1024:7.1f} KB')
print(f'total  {sum(n.values()):3} icons        {T/1024:7.1f} KB ({T/1024/1024:.2f} MB) -> {OUT}')
if big:print('largest:',sorted(big,key=lambda x:-x[1])[:5])
assert T<=LIMIT,'ui payload over budget: %.2f MB'%(T/1024/1024)
