#!/usr/bin/env python3
"""Generate branded SVG header art for articles.

These are real assets, not grey boxes — they can ship as-is. Where a photograph
would genuinely do better, images/README-UPLOAD-HERE.md lists the swap.
"""
import pathlib

OUT = pathlib.Path(__file__).parent / 'images'
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1200, 330

HEAD = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{alt}">
<defs>
  <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
    <circle cx="4" cy="4" r="2.6" fill="#141414" opacity=".2"/>
  </pattern>
</defs>
<rect width="{w}" height="{h}" fill="{bg}"/>
<rect width="{w}" height="{h}" fill="url(#dots)"/>
'''
FOOT = '</svg>\n'

def st(w=5):
    return (f'stroke="#141414" stroke-width="{w}" '
            'stroke-linecap="round" stroke-linejoin="round"')

S = st(5)
SH = 'fill="#141414"'   # shadow fill


def card(x, y, w, h, fill, rot=0, r=18):
    """A brand card with hard offset shadow."""
    g = f'<g transform="rotate({rot} {x + w/2} {y + h/2})">' if rot else '<g>'
    return (g +
            f'<rect x="{x+9}" y="{y+9}" width="{w}" height="{h}" rx="{r}" {SH}/>' +
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" {S}/>' +
            '</g>')


def txt(x, y, s, size=34, anchor='start', op=1, weight='800'):
    return (f'<text x="{x}" y="{y}" text-anchor="{anchor}" fill="#141414" opacity="{op}" '
            f'font-family="Archivo Black, Arial Black, sans-serif" font-weight="{weight}" '
            f'font-size="{size}">{s}</text>')


ART = {}

# ---- the table (about / mission) -------------------------------------------
def art_table():
    b = []
    b.append(card(60, 40, 1080, 250, '#FBF6EC'))
    for cx in (250, 420, 590, 760):
        b.append(f'<circle cx="{cx}" cy="118" r="30" fill="none" {S} opacity=".45"/>')
        b.append(f'<path d="M{cx-46} 186c0-25 21-46 46-46s46 21 46 46" fill="none" {S} opacity=".45"/>')
    b.append(f'<path d="M140 198h700" {st(9)}/>')
    b.append(f'<path d="M212 198v58M768 198v58" {S}/>')
    # the empty chair, in coral
    b.append('<g stroke="#FF8A5C" stroke-width="8" stroke-linecap="round" fill="none">'
             '<path d="M900 84v114"/><path d="M900 198h104"/>'
             '<path d="M908 198v50M996 198v50"/></g>')
    b.append(txt(952, 278, 'yours', 26, anchor='middle', op=.85))
    return ''.join(b), '#C7B9FF', 'An illustration of four people seated at a table with one empty chair.'

# ---- taxes / paperwork ------------------------------------------------------
def art_taxes():
    b = []
    b.append(card(120, 46, 260, 240, '#FBF6EC', rot=-4))
    b.append(card(470, 36, 260, 240, '#E4FF54', rot=2))
    b.append(card(820, 52, 260, 240, '#FF8A5C', rot=-3))
    for x, rot in ((120, -4), (470, 2), (820, -3)):
        cx = x + 130
        b.append(f'<g transform="rotate({rot} {cx} 166)" opacity=".8">')
        for i, y in enumerate((104, 142, 180, 218)):
            wdt = 170 if i < 3 else 100
            b.append(f'<path d="M{x+44} {y}h{wdt}" {st(7)}/>')
        b.append('</g>')
    return ''.join(b), '#9DB8FF', 'Three stylised tax forms.'

# ---- the two accounts (spousal IRA) ----------------------------------------
def art_two():
    b = []
    b.append(card(130, 52, 380, 190, '#7DDCA4'))
    b.append(card(690, 52, 380, 190, '#FBF6EC'))
    b.append(txt(320, 172, 'hers', 54, anchor='middle'))
    b.append(txt(880, 172, 'hers', 54, anchor='middle'))
    b.append(f'<path d="M556 148h84" {st(8)}/>')
    b.append(f'<path d="M618 126l24 22-24 22" {st(8)} fill="none"/>')
    b.append(txt(600, 296, 'two accounts, one household', 26, anchor='middle', op=.75))
    return ''.join(b), '#FF8A5C', 'Two account cards side by side, both labelled hers.'

# ---- growth / compounding --------------------------------------------------
def art_grow():
    b = []
    b.append(card(70, 36, 1060, 258, '#FBF6EC'))
    bars = [(190, 74), (330, 108), (470, 142), (610, 172), (750, 198), (890, 218)]
    cols = ['#9DB8FF', '#C7B9FF', '#E4FF54', '#7DDCA4', '#FF8A5C', '#9DB8FF']
    for i, (x, h) in enumerate(bars):
        y = 262 - h
        b.append(f'<rect x="{x+7}" y="{y+7}" width="90" height="{h}" rx="12" {SH}/>')
        b.append(f'<rect x="{x}" y="{y}" width="90" height="{h}" rx="12" fill="{cols[i]}" {S}/>')
    b.append(f'<path d="M140 262h880" {st(8)}/>')
    return ''.join(b), '#C7B9FF', 'A rising bar chart in brand colours.'

# ---- the ladder / order of operations --------------------------------------
def art_ladder():
    b = [card(70, 34, 1060, 262, '#FBF6EC')]
    cols = ['#9DB8FF', '#E4FF54', '#FF8A5C', '#C7B9FF', '#7DDCA4']
    for i, c in enumerate(cols):
        w = 320 + i * 148
        y = 60 + i * 46
        b.append(f'<rect x="{137}" y="{y+7}" width="{w}" height="34" rx="11" {SH}/>')
        b.append(f'<rect x="{128}" y="{y}" width="{w}" height="34" rx="11" fill="{c}" {S}/>')
        b.append(txt(160, y + 25, str(i + 1), 20))
    return ''.join(b), '#C7B9FF', 'Five stacked bars of increasing length, numbered one to five.'

# ---- herstory / the record -------------------------------------------------
def art_record():
    b = []
    b.append(card(70, 44, 1060, 242, '#FBF6EC'))
    b.append(f'<path d="M160 208h880" {st(8)}/>')
    marks = [(280, '1963', '#9DB8FF', 22), (500, '1974', '#E4FF54', 30),
             (720, '1988', '#FF8A5C', 30), (930, '2026', '#7DDCA4', 22)]
    for x, label, col, r in marks:
        b.append(f'<circle cx="{x+5}" cy="{213}" r="{r}" {SH}/>')
        b.append(f'<circle cx="{x}" cy="208" r="{r}" fill="{col}" {S}/>')
        b.append(txt(x, 148, label, 36, anchor='middle'))
    return ''.join(b), '#C7B9FF', 'A timeline marked 1963, 1974, 1988 and 2026.'


ART = {
    'art-table.svg':  art_table,
    'art-taxes.svg':  art_taxes,
    'art-two.svg':    art_two,
    'art-grow.svg':   art_grow,
    'art-ladder.svg': art_ladder,
    'art-record.svg': art_record,
}

for name, fn in ART.items():
    body, bg, alt = fn()
    svg = HEAD.format(w=W, h=H, bg=bg, alt=alt) + body + FOOT
    (OUT / name).write_text(svg)
    print(f'{name:18} {round(len(svg)/1024, 1)} KB')
