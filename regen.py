import pathlib
#!/usr/bin/env python3
"""Regenerate topics index + search index from the registry. Run after adding topics."""
import re, json, html

reg=open('topics/_topics.js').read()
blocks=re.findall(r'\{[^{}]*slug:"[^"]+"[^{}]*\}', reg)
T=[]
for b in blocks:
    g=lambda k:(re.search(k+r':"([^"]*)"',b).group(1) if re.search(k+r':"([^"]*)"',b) else '')
    T.append({'slug':g('slug'),'emoji':g('emoji'),'title':g('title'),'cat':g('cat'),
              'blurb':g('blurb'),'href':g('href'),'ready':'ready:true' in b,'featured':'featured:true' in b})

CATS={'legal':'legal','credit':'credit','taxes':'taxes','debt':'debt','invest':'investing','save':'saving',
      'work':'work','insurance':'insurance','life':'life','retirement':'retirement','safety':'safety','build':'build it'}
COLORS={'legal':'var(--lilac)','credit':'var(--pink)','taxes':'var(--yellow)','debt':'var(--pink)',
        'invest':'var(--leaf)','save':'var(--yellow)','work':'var(--coral)','insurance':'var(--coral)',
        'life':'var(--yellow)','retirement':'var(--leaf)','safety':'var(--coral)','build':'var(--pink)'}
KW={
 'herstory/firsts.html':'lynn hill nose el capitan climbing junko tabei everest bessie coleman pilot muriel siebert nyse katharine graham jeannette rankin firsts fun facts women history trailblazers records',"topics/beneficiary-designations.html":"beneficiary designation will estate inherit 401k ex-spouse death probate",
 "topics/social-security-for-women.html":"social security divorced spouse survivor benefits retirement ex",
 "topics/caregiving-career-break.html":"caregiving career break maternity leave stay at home mom elder care childcare",
 "topics/financial-abuse.html":"financial abuse economic abuse domestic violence controlling partner coercive control leaving safety",
 "topics/old-401k-rollover.html":"401k rollover old job forgotten retirement account ira cash out quit left",
 "topics/vet-a-financial-advisor.html":"financial advisor fiduciary planner cfp brokercheck fee only find a pro help",
 "topics/divorce-money-checklist.html":"divorce separation qdro splitting assets alimony marital property leaving husband",
 "topics/disability-insurance.html":"disability insurance income protection sick injured cant work ltd std own occupation",
 "topics/hsa-stealth-retirement.html":"hsa health savings account triple tax hdhp medical retirement receipts",
 "topics/prenup-101.html":"prenup postnup prenuptial marriage divorce",
 "topics/how-to-start-an-llc.html":"llc business ein registered agent sole proprietor",
 "topics/emergency-fund.html":"emergency fund savings hysa cushion rainy day",
 "topics/how-to-file-taxes.html":"tax taxes irs filing refund w2 1099 withholding",
 "topics/start-investing.html":"invest investing roth ira index fund 401k retirement stocks",
 "topics/how-to-build-credit.html":"credit score fico secured card utilization report",
 "wall/index.html":"stories wall reclaim anonymous community",
 "start/index.html":"start help where do i begin quiz guide me",
 "about/index.html":"about who founder trust sources team contact"}

cards=[]
for t in T:
    dest=t['href'] or f"./{t['slug']}.html"
    txt=html.escape((t['title']+' '+t['blurb']+' '+CATS.get(t['cat'],t['cat'])).lower(),quote=True)
    tag='a' if t['ready'] else 'div'
    cls='l-card' if t['ready'] else 'l-card l-card--soon'
    href=f' href="{dest}"' if t['ready'] else ''
    cards.append(f'''    <{tag} class="{cls}"{href}
       style="background:{COLORS.get(t['cat'],'var(--paper)')}"
       data-kind="{t['cat']}" data-slug="{t['slug']}" data-live="{'1' if t['ready'] else '0'}" data-featured="{'1' if t.get('featured') else '0'}"
       data-text="{txt}">
      <span class="l-kind">{CATS.get(t['cat'],t['cat'])}</span>
      <span class="l-title">{t['emoji']} {t['title']}</span>
      <span class="l-blurb">{html.escape(t['blurb'])}</span>
      <span class="l-go">{'read it →' if t['ready'] else 'coming soon'}</span>
    </{tag}>''')

s=open('topics/index.html').read()
s=re.sub(r'<div class="l-grid" id="grid">.*?\n</div>','<div class="l-grid" id="grid">\n'+"\n".join(cards)+'\n</div>',s,flags=re.S)
cats=[]
for t in T:
    if t['cat'] not in cats: cats.append(t['cat'])
filt='\n      '.join(['<button class="l-fbtn on" data-f="all">everything</button>']+
  [f'<button class="l-fbtn" data-f="{c}">{CATS.get(c,c)}</button>' for c in cats])
s=re.sub(r'<div class="l-filters"[^>]*>.*?</div>',
         '<div class="l-filters" role="group" aria-label="filter by category">\n      '+filt+'\n  </div>',
         s, count=1, flags=re.S)
open('topics/index.html','w').write(s)
print("topics index:", s.count('data-live="1"'), "live cards")

idx=[]
def add(t,d,u,k,c='',kw=''):
    e={"t":t,"d":(d or '')[:140],"u":u,"k":k,"c":c}
    if kw: e['kw']=kw
    idx.append(e)
for t in T:
    if not t['ready'] or t['href']: continue
    u=f"topics/{t['slug']}.html"
    add(t['title'],t['blurb'],u,"topic",t['cat'],KW.get(u,''))
# --- scrape dictionary + guides straight from their index pages (no /tmp deps) ---
CARD=re.compile(r'<a class="l-card" href="\./([^"]+)"[^>]*?data-kind="([^"]*)"[^>]*?'
                r'data-text="([^"]*)"[^>]*?>\s*'
                r'<span class="l-kind">[^<]*</span>\s*<span class="l-title">([^<]*)</span>\s*'
                r'<span class="l-blurb">([^<]*)</span>', re.S)
def scrape(folder):
    src=open(f'{folder}/index.html').read()
    out=[]
    for f,k,dt,t,b in CARD.findall(src):
        t=html.unescape(t.strip()); b=html.unescape(b.strip()); dt=html.unescape(dt)
        # data-text = title + blurb + extra keywords; keep only the tail as kw
        kw=dt.replace((t+' '+b).lower(),'').strip()
        out.append((t,b,f'{folder}/{f}',k,kw))
    return out

for t,d,u,k,kw in scrape('dictionary'): add(t,d,u,"word",k,kw)
for t,d,u,k,kw in scrape('guides'):     add(t,d,u,"guide",k,kw)
for t,d,u in [("where do i start?","tell us what's going on — we'll point you at the 2–3 things that help","start/index.html"),
              ("about maltiplata","who's behind this, how we source everything, and how we make money","about/index.html"),
              ("all topics","every money + legal topic, searchable","topics/index.html"),
              ("all guides","the full 26-guide library","guides/index.html"),
              ("the money dictionary","every confusing word, explained like you're 5","dictionary/index.html"),
              ("the reclaim wall","anonymous stories from women who took their money back","wall/index.html"),
              ("women who went first","climbers, pilots, sailors, and the first woman on the floor of the NYSE","herstory/firsts.html"),
              ("then / now / next","the timeline of women's financial rights","herstory/index.html")]:
    add(t,d,u,"page",'',KW.get(u,''))
seen=set(); out=[]
for r in idx:
    if r['u'] in seen: continue
    seen.add(r['u']); out.append(r)
open('assets/search-index.js','w').write("window.MALTI_SEARCH="+json.dumps(out,ensure_ascii=False,separators=(',',':'))+";")
print("search index:", len(out), "pages")

# ---------------------------------------------------------------
# CACHE BUSTING
# Browsers cache .css/.js aggressively, so a redeploy alone doesn't
# show design changes to anyone who visited before. Stamping every
# local asset with ?v=<build> forces a fresh fetch each build.
# Bump BUILD (or leave it — it auto-derives from file contents).
# ---------------------------------------------------------------
import hashlib as _hl

def _asset_hash():
    h = _hl.md5()
    for f in sorted(pathlib.Path('.').rglob('*')):
        if f.suffix in ('.css', '.js') and '/.'not in str(f):
            h.update(f.read_bytes())
    return h.hexdigest()[:8]

BUILD = _asset_hash()
_ASSET = re.compile(r'((?:href|src)=")([^"]+\.(?:css|js))(\?v=[^"]*)?(")')

def _stamp(m):
    url = m.group(2)
    if url.startswith(('http://', 'https://', '//')):
        return m.group(0)
    return f'{m.group(1)}{url}?v={BUILD}{m.group(4)}'

_n = 0
for _f in pathlib.Path('.').rglob('*.html'):
    _t = _f.read_text(encoding='utf-8')
    _new = _ASSET.sub(_stamp, _t)
    if _new != _t:
        _f.write_text(_new, encoding='utf-8')
        _n += 1
print(f'cache-bust: stamped {_n} pages with ?v={BUILD}')
