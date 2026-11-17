#!/usr/bin/env python3
"""Build a melange single-file game: KO source -> index.html (KO) + en/index.html (EN).

Usage:  python3 build_game.py <game-dir> [--check-only]

Expected layout (see SKILL.md):
  <game-dir>/src/<slug>.html        Korean source, starts at <title> (no <head>), Korean comments OK
  <game-dir>/src/head_ko.html       deploy head for KO, ends with </head><body>
  <game-dir>/src/head_en.html       deploy head for EN, ends with </head><body>
  <game-dir>/src/en/out*.json       KO fragment -> EN text maps (later files win)
  <game-dir>/src/en/swaps.json      optional [[from, to, expected_count], ...] applied to EN after mapping
  <game-dir>/sw.js                  optional; if present both pages get a service-worker register tail

Checks (exit 1 on failure): every Korean fragment mapped (missing ones are written to
src/en/_todo.json for translation), no Hangul left in EN, LANG/ASSET constants present once,
every inline <script> parses (needs node).
"""
import glob, json, os, re, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, 'i18n'))
from lib import prep, apply  # noqa: E402

HANGUL = re.compile('[가-힣]')


def fail(msg):
    print('FAIL', msg)
    sys.exit(1)


def find_source(src_dir):
    c = [f for f in glob.glob(os.path.join(src_dir, '*.html')) if not os.path.basename(f).startswith('head_')]
    if len(c) != 1:
        fail('src/ must hold exactly one game source .html (besides head_*.html), found: %s' % c)
    return c[0]


def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def write(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)


def sw_tail(path):
    # http(s) only (never app:// PC builds) and never on CrazyGames
    return ("<script>\nif('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)&&!/crazygames/.test(location.hostname))"
            "addEventListener('load',()=>navigator.serviceWorker.register('%s').catch(()=>{}));\n</script>\n</body></html>\n" % path)


def local_refs(head, base, label):
    # every relative href/src in a deploy head must exist (manifest, icons, fonts…)
    miss = []
    for u in re.findall(r'''(?:href|src)="([^"#?]+)''', head):
        if re.match(r'(https?:|//|data:|mailto:)', u):
            continue
        if not os.path.exists(os.path.normpath(os.path.join(base, u))):
            miss.append(u)
    if miss:
        fail('%s links files that do not exist: %s (see SKILL.md step 2: make_icons.py, manifest, fonts)' % (label, miss))


def js_check(html, label):
    if not shutil.which('node'):
        print('  (node not found: JS parse check skipped)')
        return
    blocks = re.findall(r'<script>([\s\S]*?)</script>', html)
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf-8') as t:
        json.dump(blocks, t)
    code = ("const b=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));"
            "b.forEach((s,i)=>{try{new Function(s)}catch(e){console.log('script '+i+': '+e.message);process.exitCode=1}})")
    r = subprocess.run(['node', '-e', code, t.name], capture_output=True, text=True)
    os.unlink(t.name)
    if r.returncode:
        fail('%s: JS does not parse: %s' % (label, r.stdout.strip()))
    print('  js ok (%d scripts) %s' % (len(blocks), label))


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    gd = os.path.abspath(sys.argv[1])
    check_only = '--check-only' in sys.argv
    src_dir = os.path.join(gd, 'src')
    src_path = find_source(src_dir)
    src = read(src_path)
    for h in ('head_ko.html', 'head_en.html'):
        if not os.path.exists(os.path.join(src_dir, h)):
            fail('src/%s missing — copy it from the skill assets/ (the original 떡상 game/ uses game/tools/build.sh instead)' % h)
    head_ko, head_en = read(os.path.join(src_dir, 'head_ko.html')), read(os.path.join(src_dir, 'head_en.html'))
    for n, h in (('head_ko', head_ko), ('head_en', head_en)):
        if not h.rstrip().endswith('</head><body>'):
            fail(n + '.html must end with </head><body>')
    if HANGUL.search(head_en):
        fail('head_en.html contains Korean')
    local_refs(head_ko, gd, 'head_ko.html')
    local_refs(head_en, os.path.join(gd, 'en'), 'head_en.html')
    has_sw = os.path.exists(os.path.join(gd, 'sw.js'))

    # KO
    ko = head_ko + prep(src) + (sw_tail('sw.js') if has_sw else '</body></html>\n')

    # EN
    maps = {}
    for f in sorted(glob.glob(os.path.join(src_dir, 'en', 'out*.json'))):
        maps.update(json.loads(read(f)))
    bad = [k for k, v in maps.items() if re.search(r"['\"`<>\n]|\$\{", v)]
    if bad:
        fail('EN values must not contain quote/bracket characters (use ’ “ ” instead): %r' % bad[:10])
    en, missing = apply(src, maps)
    todo = os.path.join(src_dir, 'en', '_todo.json')
    if missing:
        write(todo, json.dumps({k: '' for k in sorted(missing)}, ensure_ascii=False, indent=1))
        fail('%d Korean fragments have no English entry -> translate them in %s and save as a new src/en/outX.json' % (len(missing), todo))
    elif os.path.exists(todo):
        os.unlink(todo)
    for a, b in (("const LANG='ko';", "const LANG='en';"), ("const ASSET='';", "const ASSET='../';")):
        if en.count(a) != 1:
            fail('source must contain %s exactly once' % a)
        en = en.replace(a, b, 1)
    # relative asset paths written directly in markup (src="ui/x.webp", href="fonts/x.css") move one folder up
    en = re.sub(r'''\b(src|href)="(?!https?:|/|#|data:|\.\./|mailto:|javascript:)(?=[A-Za-z0-9_])''', r'\1="../', en)
    en = en.replace("'ko-KR'", "'en-US'")
    sw = os.path.join(src_dir, 'en', 'swaps.json')
    if os.path.exists(sw):
        for a, b, n in json.loads(read(sw)):
            if en.count(a) != n:
                fail('swaps.json: expected %d x %r, found %d' % (n, a, en.count(a)))
            en = en.replace(a, b)
    en = head_en + en + (sw_tail('../sw.js') if has_sw else '</body></html>\n')
    left = HANGUL.findall(en)
    if left:
        i = HANGUL.search(en).start()
        fail('Hangul left in EN (%d chars), first near: %r' % (len(left), en[max(0, i - 60):i + 40]))

    js_check(ko, 'KO')
    js_check(en, 'EN')
    if check_only:
        print('PASS (check only, nothing written)')
        return
    write(os.path.join(gd, 'index.html'), ko)
    write(os.path.join(gd, 'en', 'index.html'), en)
    print('PASS built %s (%d bytes) and en/index.html (%d bytes), %d map entries' % (
        os.path.relpath(os.path.join(gd, 'index.html')), len(ko.encode()), len(en.encode()), len(maps)))


if __name__ == '__main__':
    main()
