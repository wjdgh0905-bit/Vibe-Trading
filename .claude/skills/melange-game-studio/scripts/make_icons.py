#!/usr/bin/env python3
"""Make the icon set from one 512x512 PNG (the owner's art).

Usage:  python3 make_icons.py <game-dir>/icon-512.png [background #rrggbb]

Writes next to it:
  icon-192.png            192x192 (web icon, manifest)
  apple-touch-icon.png    180x180 (iPhone home screen; no transparency)
  icon-512-maskable.png   512x512 art scaled to 80% on the background colour
                          (Android adaptive icon safe zone; without it Android shows the icon in a white circle)
Background default: the top-left pixel of the art.
"""
import os
import sys
from PIL import Image


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    src = os.path.abspath(sys.argv[1])
    d = os.path.dirname(src)
    im = Image.open(src).convert('RGBA')
    if im.size != (512, 512):
        im = im.resize((512, 512), Image.LANCZOS)
    if len(sys.argv) > 2:
        h = sys.argv[2].lstrip('#')
        bg = tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (255,)
    else:
        bg = im.getpixel((0, 0))[:3] + (255,)
    im.resize((192, 192), Image.LANCZOS).save(os.path.join(d, 'icon-192.png'))
    flat = Image.new('RGBA', im.size, bg)
    flat.alpha_composite(im)
    flat.convert('RGB').resize((180, 180), Image.LANCZOS).save(os.path.join(d, 'apple-touch-icon.png'))
    m = Image.new('RGBA', (512, 512), bg)
    s = im.resize((410, 410), Image.LANCZOS)
    m.alpha_composite(s, (51, 51))
    m.save(os.path.join(d, 'icon-512-maskable.png'))
    print('wrote icon-192.png, apple-touch-icon.png, icon-512-maskable.png in', d, 'bg', '#%02x%02x%02x' % bg[:3])


if __name__ == '__main__':
    main()
