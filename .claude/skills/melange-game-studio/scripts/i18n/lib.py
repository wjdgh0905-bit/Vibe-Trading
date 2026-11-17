import re
H=re.compile('[가-힣]')
DELIM=re.compile(r"""(['"`<>\n]|\$\{|\})""")
def prep(s):
  s=re.sub(r'/\*(?:(?!\*/).)*?[가-힣](?:(?!\*/).)*?\*/','',s,flags=re.S)
  s=re.sub(r'(?m)^[ \t]*//[^\n]*[가-힣][^\n]*\n','',s)
  s=re.sub(r'[ \t]+//[ \t][^\n]*[가-힣][^\n]*','',s)
  return s
def frags(s):
  out=set()
  for p in DELIM.split(prep(s)):
    if H.search(p):out.add(p.strip())
  return out
def apply(s,d):
  s=prep(s);res=[];miss=set()
  for p in DELIM.split(s):
    if H.search(p):
      k=p.strip()
      if k in d:
        lead=p[:len(p)-len(p.lstrip())];trail=p[len(p.rstrip()):]
        p=lead+d[k]+trail
      else:miss.add(k)
    res.append(p)
  return ''.join(res),miss
