#!/usr/bin/env python3
"""Process uploaded photos into brand-consistent web assets.

Two treatments:
  duotone(...) — maps the image onto the brand ink/cream ramp. Kills the
                 stock-photo green, keeps the texture. Used for bands.
  plain(...)   — straight resize + compress, for photos that stand on their own.
"""
from PIL import Image, ImageEnhance, ImageOps
import pathlib

SRC = pathlib.Path('/mnt/user-data/uploads')
OUT = pathlib.Path('/home/claude/site/images')
OUT.mkdir(parents=True, exist_ok=True)

INK = (20, 20, 20)
CREAM = (251, 246, 236)
LILAC = (199, 185, 255)


def ramp(dark, light):
    """256-entry RGB lookup ramp between two colours."""
    r, g, b = [], [], []
    for i in range(256):
        t = i / 255.0
        r.append(int(dark[0] + (light[0] - dark[0]) * t))
        g.append(int(dark[1] + (light[1] - dark[1]) * t))
        b.append(int(dark[2] + (light[2] - dark[2]) * t))
    return r + g + b


def duotone(src, dst, w, h, dark=INK, light=CREAM, contrast=1.05):
    """Map luminance onto a two-colour ramp via per-channel LUTs.
    Using Image.merge avoids the dithering that convert('P') introduces."""
    im = Image.open(src).convert('RGB')
    im = ImageOps.fit(im, (w, h), Image.LANCZOS, centering=(0.5, 0.5))
    g = ImageEnhance.Contrast(im.convert('L')).enhance(contrast)
    chans = []
    for i in range(3):
        lut = [int(dark[i] + (light[i] - dark[i]) * (v / 255.0)) for v in range(256)]
        chans.append(g.point(lut))
    im = Image.merge('RGB', chans)
    im.save(dst, 'JPEG', quality=84, optimize=True, progressive=True)
    return dst


def plain(src, dst, w, h, quality=80):
    im = Image.open(src).convert('RGB')
    im = ImageOps.fit(im, (w, h), Image.LANCZOS, centering=(0.5, 0.5))
    im.save(dst, 'JPEG', quality=quality, optimize=True, progressive=True)
    return dst


JOBS = [
    # the only genuinely on-topic use: an article literally about where cash sits
    ('giorgio-trovato-BRl69uNXr7g-unsplash.jpg', 'cash-texture.jpg', 'duotone', 1600, 620),
    # a narrow band texture, very low contrast, for behind dark sections
    ('mackenzie-marco-XG88BYDSDZA-unsplash.jpg', 'cash-band.jpg', 'duotone', 1600, 340),
]

for src, name, mode, w, h in JOBS:
    p = SRC / src
    if not p.exists():
        print('missing', src)
        continue
    dst = OUT / name
    if mode == 'duotone':
        duotone(p, dst, w, h)
    else:
        plain(p, dst, w, h)
    kb = round(dst.stat().st_size / 1024)
    print(f'{name:22} {w}x{h}  {kb} KB')
