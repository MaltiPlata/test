#!/usr/bin/env python3
"""Generate maltiplata share images (OG + Pinterest) with embedded brand fonts."""
import sys, pathlib
sys.path.insert(0, '/home/claude')
from fontb64 import F
from playwright.sync_api import sync_playwright

BASE = """
@font-face{font-family:AB;src:url(data:font/ttf;base64,__AB__)}
@font-face{font-family:SG;font-weight:400;src:url(data:font/ttf;base64,__SG4__)}
@font-face{font-family:SG;font-weight:700;src:url(data:font/ttf;base64,__SG7__)}
:root{--ink:#141414;--cream:#FBF6EC;--yellow:#E4FF54;--pink:#9DB8FF;--lilac:#C7B9FF;--leaf:#7DDCA4;--coral:#FF8A5C}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--cream);color:var(--ink);font-family:SG,sans-serif;overflow:hidden}
.disp{font-family:AB,sans-serif;letter-spacing:-.02em;line-height:1}
.dots{position:absolute;inset:0;opacity:.13;
  background-image:radial-gradient(var(--ink) 2.5px,transparent 2.5px);background-size:34px 34px}
.hl{background:var(--yellow);border:4px solid var(--ink);border-radius:16px;
  padding:.02em .16em .08em;display:inline-block;transform:rotate(-3.5deg);
  box-shadow:8px 8px 0 var(--ink)}
.logo{font-family:AB;letter-spacing:-.02em}
.logo i{font-style:normal;color:#8a7bd8}
"""

OG = """<!doctype html><html><head><meta charset="utf-8"><style>""" + BASE + """
body{width:1200px;height:630px;position:relative;padding:62px 66px;display:flex;
  flex-direction:column;justify-content:space-between}
h1{font-family:AB;font-size:104px;line-height:1.06;letter-spacing:-.025em;position:relative;z-index:2}
.sub{font-size:29px;line-height:1.45;max-width:830px;position:relative;z-index:2;margin-top:26px}
.sub b{font-weight:700}
.top{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2}
.top .logo{font-size:36px}
.tag{background:var(--ink);color:var(--cream);font-weight:700;font-size:19px;
  letter-spacing:.14em;text-transform:uppercase;padding:11px 20px;border-radius:999px}
.bar{display:flex;gap:14px;position:relative;z-index:2}
.pill{border:4px solid var(--ink);border-radius:14px;padding:14px 22px;
  font-family:AB;font-size:25px;box-shadow:6px 6px 0 var(--ink)}
</style></head><body>
<div class="dots"></div>
<div class="top"><div class="logo">malti<i>/</i>plata</div><div class="tag">money + legal 101</div></div>
<div>
  <h1>the stuff <span class="hl">they</span> skipped.</h1>
  <p class="sub">a free, plain-language library for women: <b>money, legal stuff, and independence</b> &mdash; at any stage.</p>
</div>
<div class="bar">
  <div class="pill" style="background:var(--pink)">every word decoded</div>
  <div class="pill" style="background:var(--yellow)">every decision walked through</div>
  <div class="pill" style="background:var(--lilac)">free, always</div>
</div>
</body></html>"""

PIN = """<!doctype html><html><head><meta charset="utf-8"><style>""" + BASE + """
body{width:1000px;height:1500px;position:relative;padding:78px 66px 70px;display:flex;
  flex-direction:column;justify-content:space-between;gap:52px;text-align:center;align-items:center}
h1{font-family:AB;font-size:112px;line-height:1.02;letter-spacing:-.025em;position:relative;z-index:2}
.kick{font-weight:700;font-size:24px;letter-spacing:.16em;text-transform:uppercase;
  opacity:.7;position:relative;z-index:2}
.sub{font-size:31px;line-height:1.42;position:relative;z-index:2;margin:26px auto 0;max-width:740px}
.steps{position:relative;z-index:2;width:100%;display:flex;flex-direction:column;gap:15px}
.step{border:4px solid var(--ink);border-radius:20px;padding:25px 28px;text-align:left;
  box-shadow:8px 8px 0 var(--ink);display:flex;align-items:center;gap:22px}
.step .n{font-family:AB;font-size:44px;line-height:1;min-width:56px}
.step .t{font-family:AB;font-size:31px;line-height:1.1}
.foot{position:relative;z-index:2}
.foot .logo{font-size:44px}
.foot p{font-size:23px;opacity:.72;margin-top:10px}
</style></head><body>
<div class="dots"></div>
<div>
  <p class="kick">the money map &middot; free</p>
  <h1>do these <span class="hl">in order.</span></h1>
  <p class="sub">every money move, in the order you're supposed to make them.</p>
</div>
<div class="steps">
  <div class="step" style="background:var(--pink)"><div class="n">1</div><div class="t">a $500 cushion</div></div>
  <div class="step" style="background:var(--yellow)"><div class="n">2</div><div class="t">the full employer match</div></div>
  <div class="step" style="background:var(--coral)"><div class="n">3</div><div class="t">high-interest debt</div></div>
  <div class="step" style="background:var(--lilac)"><div class="n">4</div><div class="t">3&ndash;6 months of costs</div></div>
  <div class="step" style="background:var(--leaf)"><div class="n">5</div><div class="t">a roth ira</div></div>
  <div class="step" style="background:#fff"><div class="n">6</div><div class="t">everything after</div></div>
</div>
<div class="foot">
  <div class="logo">malti<i>/</i>plata</div>
  <p>money + legal 101, for women &middot; maltiplata.com</p>
</div>
</body></html>"""

JOBS = [("og-image.png", OG, 1200, 630), ("pin-money-map.png", PIN, 1000, 1500)]
out = pathlib.Path('/home/claude/site')

with sync_playwright() as pw:
    b = pw.chromium.launch()
    for name, html, w, h in JOBS:
        for k in ("AB", "SG4", "SG7"):
            html = html.replace("__%s__" % k, F[k])
        tmp = pathlib.Path('/home/claude/_share.html'); tmp.write_text(html)
        pg = b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
        pg.goto(tmp.as_uri()); pg.wait_for_timeout(700)
        pg.screenshot(path=str(out / name))
        print("wrote", name, (out / name).stat().st_size, "bytes")
        pg.close()
    b.close()
