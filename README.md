# maltiplata — v6 (restructured: homepage hub + topic pages)

## what changed in v6
**The original homepage is intact — unchanged, all 6,585px of it.** The reclaim wall,
the interactive decoder, the dictionary tiles, the money-map widget, free forms, find-a-pro,
the hero stickers and marquee are all exactly as they were.

What's ADDED (nothing removed):
- NEW `/topics/` section — subject pages, reachable from a new "topics" link in the nav
- NEW `/topics/_topics.js` — the topic registry (single source of truth)
- NEW `/topics/how-to-start-an-llc.html` — first fully-researched topic article (1,920 words)



## design consistency (v6.3) — verified across all 30 pages
Every page shares one system, all driven by `guides/_article.css`:

**Chrome (all 30):** sticky dark nav (62px) with the three-part `malti/plata` yellow-slash
logo, same 5 links, same yellow "join free" pill; dark footer with logo + disclaimer.

**Index pages (`/guides/`, `/topics/`):** identical 999px pill search, Archivo Black filter
buttons, and cards (2.5px border / 16px radius / 5px offset shadow / 20px padding /
ink `l-kind` badge / 17px Archivo Black title).

**Article pages (all 27) — every one has:** hero card, breadcrumb, kicker, meta row,
`a-tldr` summary, sidebar with TOC + money-map CTA, `a-nums` stat blocks where useful,
`a-table` for comparisons, `a-call` callouts with exactly one `a-call--accent` key takeaway,
collapsible `<details>` FAQ, `a-src` numbered citations, and the related-reads strip.

**Fixed in this pass:** the LLC topic page had invented its own classes (`a-resources`,
a plain `<ol>` FAQ) instead of using guide conventions — rewritten to match. Three guides
(dont-grubhub, health-insurance, the-pink-tax) were missing the accent callout the other
24 had — added. Unused CSS removed.

**Fixed in the screenshot-comparison pass (v6.4):** the homepage nav carried 8 links
(`why the name?`, `start here`, `the wall` extra) while every other page had 5 — now all
30 pages show the identical set: topics · guides · dictionary · find a pro · join free.
The homepage content containers were also 1200px vs 1100px everywhere else — aligned to
1100px. (The marquee and dictionary bands stay full-bleed at 1280px by design, with their
inner content constrained to 1100px.)

**Rule going forward:** never invent a new class. Copy an existing guide as the starting
point for any new article — it already carries every convention.


## content status (v7) — all 12 topics live
**Topic articles written (6 original, ~1,700–2,050 words each):**
| topic | sources |
|---|---|
| how-to-start-an-llc | SBA, IRS, FinCEN |
| how-to-build-credit | CFPB, FTC, FICO factor weights |
| emergency-fund | Federal Reserve SHED, BLS, FDIC |
| start-investing | IRS 2026 limits, Fidelity |
| how-to-file-taxes | IRS Free File, VITA, self-employment rules |
| prenup-101 | Uniform Law Commission (UPAA/UPMAA), CA Family Code |

**Topics mapped to existing guides (6).** These already had full guides, so their topic
cards link straight to them rather than duplicating the content — writing a second version
would have split traffic between two of our own pages competing for the same search terms:
- how-to-get-out-of-debt → `guides/how-to-get-out-of-debt.html`
- how-to-negotiate-salary → `guides/how-to-negotiate-your-salary.html`
- health-insurance → `guides/health-insurance-decoded.html`
- first-apartment → `guides/your-first-apartment.html`
- student-loans → `guides/student-loans-decoded.html`
- buying-a-car → `guides/buying-your-first-car.html`

The registry supports an optional `href` field for exactly this: set it and the card points
wherever you want, instead of assuming `/topics/<slug>.html`.

**Total: 35 pages · 294 internal links · 0 broken · 0 JS errors.**



## v8 — search, carousels, and everything as a page
**Sticky search header.** Scroll past the hero and a dark bar slides down with a search box,
logo, and join button. `assets/home-enhance.js` + `assets/home-enhance.css`.

**Autocomplete, everywhere.** Both the hero search and the sticky search now show live
results as you type — colour-coded by kind (word / topic / guide / page), keyboard
navigable (↑ ↓ Enter Esc), each going straight to a real page. Powered by
`assets/search-index.js` — **46 unique pages indexed**.

**Everything is a separate, searchable page now:**
- `dictionary/` — 10 term pages (roth ira, escrow, apr vs apy, vesting, prenup…) + a
  searchable, filterable index. Clicking a dictionary card on the homepage opens its page.
- `wall/` — the reclaim wall as its own page with all stories + a share CTA.

**Homepage sections shrunk to single-row carousels:**
| section | before | after |
|---|---|---|
| dictionary | 941px | 470px |
| reclaim wall | 1131px | 883px |

Both auto-cycle (pausable, arrow controls, pauses on hover, respects
`prefers-reduced-motion`) and end with a link to the full page.

**Art on the three start cards.** Inline SVG line-art backgrounds (no image files, no
licensing) so the block reads as three distinct cards rather than one repeated shape.

**To regenerate the search index** after adding content, rebuild it from the topic registry,
guides index, and dictionary — it's a plain JS file assigning `window.MALTI_SEARCH`.


## v9 — responding to the UX review
**Homepage cut 34%: 6,599px → 4,339px.** Four sections that now have dedicated pages were
removed from the homepage entirely (`decoder`, `toolkit`, `grownup`, `forms`), and the two
longest were compressed into single-strip previews with a link:
| section | before | after |
|---|---|---|
| matilda | 856px | 264px (strip → the-matilda-effect guide) |
| reclaim wall | 883px | 245px (strip → /wall/) |

**NEW `/start/` — the guided triage tool.** Users describe their situation in plain language
("my husband handled all the money and we split up") or tap one of 8 situation cards, and get
a short ordered path of 2–4 steps instead of a wall of content. Free-text matching runs on a
keyword map; unmatched queries get an honest fallback rather than a dead end. Deep-linkable
via `/start/?s=debt`. A lilac banner under the hero search points to it.

**NEW `/about/` — the trust page.** Who's behind it, the name story, the sourcing hierarchy
(government → primary research → commercial, in that order), a do/don't table drawing the
education-vs-advice line, how we'll make money and the three commitments about it, a
corrections policy, and an honest statement that the library has **not yet been reviewed by a
licensed CPA/CFP/attorney** — with a call for professionals to do it.

**Nav is now:** start here · topics · guides · dictionary · about · join free (all 49 pages).


## v10 — the structural-gap articles (Morning Brew style sourcing)
Three new topic articles, written with **inline hyperlinks on the words themselves** (the
Morning Brew pattern) so every claim links to its source where you read it — plus the usual
numbered source list at the bottom.

| article | words | inline source links |
|---|---|---|
| social security, the part nobody tells you | 2,095 | 23 |
| the caregiving career break, priced | 1,869 | 14 |
| the form that overrides your will | 1,668 | 13 |

**Why these three.** They're structural gaps that mainstream money media barely covers, and
they map to women's actual life paths rather than to investing-product marketing:
- **Divorced-spouse Social Security** — 10-year marriage rule, up to 50% of an ex's benefit
  (100% as a survivor), claimable without the ex knowing or losing a dollar.
- **The caregiving break** — CAP's 3–4x-salary-per-year-out finding and PensionBee's
  $346k five-year retirement gap, plus the protective moves (spousal IRA is the big one).
- **Beneficiary designations** — Kennedy v. Plan Administrator (2009) and Egelhoff (2001):
  the form beats the will, and beats the divorce decree.

**Search upgrade.** Index entries now carry a `kw` keyword field, so natural phrasing works:
"stay at home mom" → caregiving, "divorced" → social security, "will" → beneficiaries.

Site total: **52 pages · 578 internal links · 0 broken · 0 JS errors.**


## v11 — safety, retirement recovery, and finding help
Three more researched topic articles (Morning Brew-style inline source links):

| article | words | inline links |
|---|---|---|
| when money is the leash (financial abuse) | 1,967 | 21 |
| the 401(k) you left at an old job | 1,606 | 14 |
| how to vet a financial advisor | 1,704 | 19 |

**The financial-abuse page has safety features built in**, because the audience for it may be
monitored: a fixed **"quick exit ✕"** button that leaves the site immediately, a safety banner
above the article about device monitoring and clearing history, and the National Domestic
Violence Hotline (1-800-799-7233 / text START to 88788) surfaced at both the top and bottom.
Sources: NNEDV, PCADV, NYLAG, California DFPI, Insurance Information Institute.

**Search now handles natural language.** The scorer filters stopwords and matches on meaningful
tokens, so full sentences work:
- "my partner controls the money" → financial abuse
- "left my job retirement" → 401(k) rollover
- "how do i find an advisor" → vetting an advisor
- "stay at home mom" → caregiving career break

Site total: **55 pages · 608 internal links · 0 broken · 0 JS errors · 18 live topics.**


## v12 — divorce, disability, HSAs
Three more, same Morning Brew-style inline sourcing:

| article | words | inline links |
|---|---|---|
| the divorce money checklist | 1,748 | 16 |
| the insurance nobody talks about (disability) | 1,668 | 18 |
| the account with three tax breaks (HSA) | 1,623 | 15 |

Highlights: **QDROs** (a 401(k) needs a separate court order per plan; an IRA doesn't — and the
lump-sum QDRO distribution is the one route that dodges the 10% penalty under 59½).
**Disability** — 1 in 4 of today's 20-year-olds out of work a year+ before retirement, only ~33%
have employer LTD, and the "own occupation" vs "any occupation" distinction that decides claims.
**HSAs** — the only triple-tax-advantaged account, the receipt strategy with no time limit, and
the establishment-date rule that makes opening one early matter.

**New: `regen.py`.** One script rebuilds the topics index grid, the category filters, and the
search index from `topics/_topics.js`. Run it after adding any topic — no manual editing.

**Bug caught in testing:** a section id starting with a digit (`id="65"`) is an invalid CSS
selector and broke `querySelector`. Renamed to `after65`; all 21 topic pages audited for the
same pattern.

Site total: **58 pages · 638 internal links · 0 broken · 0 JS errors · 21 live topics.**


## v13 — the gap list is complete
The final five, closing out the content gap analysis:

| article | words | inline links |
|---|---|---|
| retirement when you work for yourself | 1,574 | 17 |
| the 20% down payment myth | 1,442 | 13 |
| rsus and the tax bill nobody warns you about | 1,665 | 19 |
| $124 trillion is about to change hands | 1,703 | 13 |
| do you need crypto? (honestly) | 1,523 | 10 |

**All 26 topics are now live.** The gap list identified after the "what am I missing" analysis
is fully written — 20 original topic articles plus 6 mapped to existing guides.

Highlights: **solo 401(k) vs SEP** can be worth $24,000/yr at ordinary incomes (the SEP's one
edge is the tax-filing-deadline funding window). **Down payments** — median first-time buyer is
~10%, not 20%. **RSUs** — the flat 22% supplemental withholding under-collects for anyone in the
24%+ brackets, and the $0-cost-basis 1099-B error is the most expensive filing mistake.
**Wealth transfer** — women expected to receive ~70% of $124T; the advice is do nothing for 90
days. **Crypto** — written as permission to skip rather than pressure to join, because women
hold less of it and have outperformed anyway.

Site total: **63 pages · 688 internal links · 0 broken · 0 JS errors · 26 live topics ·
62 pages in the search index.**


## v14 — palette, playful heroes, honest name story
**Hot pink retired.** `--pink` went from `#ff7ab6` (bubblegum) to `#9db8ff` (periwinkle) —
which also adds the palette's first cool hue, so it no longer reads as default-women's-brand
pink. Changed in `guides/_article.css` AND inside the homepage bundle (it stores its own copy,
uppercase `#FF7AB6`). Verified: 0 hot-pink elements sitewide.

**Playful details on the coloured headline boxes:**
- dot-halftone texture in the top-right corner of every article hero
- a hand-drawn SVG underline swoop beneath each h1
- the category kicker is now a tilted sticker with a drop shadow
- confetti seeds beside the dek; index cards get a corner seed too

**The name story is plainer.** The old strip led with a slogan ("they wrote her out / we wrote
her back in"). It now leads with "matilda + plata. the honest version," names Matilda Joslyn
Gage and 1876, says plainly that *plata* is just the word our founder grew up with in Chile,
and admits we almost picked something easier to spell. The about page matches.

**Bugs fixed:** `down-payment-myth` referenced an undefined `--butter` variable; the new kicker
styling initially overlapped the h1 and hid its own text (dark pill, cream text, overridden
background). Both caught in testing.

**Inline-link audit.** 13 articles had 5–19 inline source links; 18 had zero. Added links to
the six early topic pages. **The 26 original guides still need a manual pass** — see below.


## v15 — inline source links (Morning Brew style) across the library
Started at **18 articles with zero inline links**. Now **5**, and each of those five has a
reason:

| article | why it has none |
|---|---|
| the-stuff-nobody-taught-you | orientation page — routes to other guides, makes no sourced claims |
| your-first-apartment | rules of thumb (30% rent), no external sources cited yet |
| sudden-money-what-to-do | behavioural advice, no statistics cited |
| mortgage-points-worth-it | pure arithmetic (break-even math), self-contained |
| dont-grubhub-invest-the-difference | illustrative compounding math, self-contained |

Those four non-orientation ones need **new research** to earn citations — I didn't invent
sources to fill the gap.

**Two factual corrections came out of this pass:**
1. `women-money-101` said women earn "roughly 85 cents." That's Pew's measure (hourly, all
   workers). Census's full-time year-round measure is **81 cents**, and it has widened two
   years running — the first back-to-back widening since the 1960s. The guide now states both
   measures, each linked to its own source, consistent with how the other guides cite it.
2. An invented Census URL got caught before shipping and replaced with verified USAFacts and
   NWLC links.

**Method note:** every URL added was either already cited on the page or verified by search
first. Mis-attributed links are worse than no links.


## v16 — header rewrite + "start with a topic" was actually broken
**The section wasn't styled — it was three real bugs:**
1. The injector emitted `soon-name` / `soon-go`, class names that **don't exist** in the
   stylesheet, so titles rendered as plain 16px body text instead of Archivo Black.
2. Live cards used `soon-card` instead of `soon-card soon-card--live`, so every card rendered
   as a **default underlined blue link**.
3. `COLORS` had no entry for `retirement` or `safety`, and the homepage's own `:root` was
   missing `--leaf` and `--coral` — so half the cards had **no background at all**.

Fixed all three, added a corner dot texture matching the article heroes, and diversified the
category palette (work → coral, life → yellow) so adjacent cards no longer alternate between
two colours. `regen.py` updated to match, so the topics index stays consistent.

**New header.** Was: *"money 101, on your terms."* Now:

> **the money talk `nobody` gave you.**
> not at the dinner table, not at school, not anywhere. so we wrote it down — every money and
> legal word, in plain language, at your own pace.

It states the problem instead of the category, and it's the same thesis the rest of the site
runs on. Alternates considered: "you weren't bad at money. you were left out of the room." /
"the stuff they skipped." / "your money. your name. your call."


## v17 — "the stuff they skipped" + build-your-own-thing + herstory
**New header.** *"the stuff `they` skipped."* — sub: "money, legal, and how to actually build
something — in plain language. the class nobody gave you, closing the gap any way we can."

**NEW `/herstory/` — then. now. next.** The financial timeline, because every gap this site
closes has a date on it and the dates are recent: **1974** ECOA (a credit card in her own name),
**1988** Women's Business Ownership Act (a business loan without a male co-signer in every
state), **2013** CARD Act amendment (household income for stay-at-home spouses), and next the
$124T transfer. Includes the honest caveat that ECOA formalized the right to *sue* over
discrimination rather than inventing access from nothing. Ends on "you're not behind. you're early."

**Minimal on the homepage, as asked:** one quiet line above "start here" — a pill, a year, one
fact, rotating every 5 seconds, linking to the full page. No block, no grid, no takeover.
Respects `prefers-reduced-motion`.

**NEW category: `build` — build your own thing.** The badass pillar:
- `start-an-etsy-shop` — **written**, 1,818 words, 21 inline source links
- `build-with-ai` (vibe-coding without a CS degree) — registered, coming soon
- `creator-income` (tiktok & instagram) — registered, coming soon
- `sell-on-amazon` — registered, coming soon

The Etsy piece leads with the numbers the tutorials skip: ~10% fees before ads, **22–25% after**
offsite ads become mandatory at $10k/yr, the **median seller earns under $500/year**, and digital
products carry 70–90% margins versus 20–40% handmade.

Site total: **65 pages · 0 broken links · 0 JS errors · 27 live topics.**


## v18 — trademark + vibe coding, and the build pillar filled out
Two written:

| article | words | inline links |
|---|---|---|
| how to trademark your name | 1,885 | 21 |
| build it yourself with ai | 1,841 | 15 |

**A correction worth knowing:** the USPTO **eliminated the TEAS Plus ($250) / TEAS Standard
($350) tiers on January 18, 2025** and replaced them with a single **$350 base fee per class
plus surcharges**. A large share of 2026-dated articles still quote the old two-tier system.
Ours states the current structure and flags that the stale number is circulating.

**The AI piece leads with the thing beginner guides skip:** AI-generated code carries roughly
**1.7x more major issues** than human-written code, and non-engineers can't spot them. So the
rule is match the stakes to the tool — landing pages and internal tools yes, anything holding
payment or health data gets a human review first. It also separates browser tools (Lovable,
Bolt, Replit, v0) from developer tools (Cursor, Claude Code), which is the single most common
reason beginners bounce.

**Five more topics registered** (my suggestions, not yet written):
`price-your-work` · `get-paid-freelance` · `women-owned-certification` (WBENC/WOSB) ·
`business-banking-books` · `read-a-contract`

Site total: **67 pages · 0 broken links · 0 JS errors · 30 live topics · 41 registered.**


## v18 — the "build your own thing" pillar
Three written, four more registered. This is the badass pillar: not just managing money, but
making it.

| article | words | inline links |
|---|---|---|
| start an etsy shop (with the real numbers) | 1,818 | 21 |
| how to trademark your name | 1,752 | 17 |
| build it yourself with ai | 1,690 | 14 |

**Two corrections that came out of the research:**
1. **Trademark fees changed.** Most articles still quote TEAS Plus ($250) / TEAS Standard ($350).
   Those tiers were **eliminated January 18, 2025** and replaced with a single **$350 per class**
   base fee plus surcharges, filed through the new Trademark Center. Verified against USPTO.
2. **The AI security risk nobody tells beginners.** An analysis of 470 pull requests found AI
   co-authored code had **1.7x more major issues** — SQL injection, hardcoded API keys, XSS —
   and non-engineers can't spot them. The article draws a hard line: build freely with no real
   user data or money moving; get human review before payments, logins, or personal data.

**Registered, coming soon (my additions to the pillar):**
- `woman-owned-certification` — WOSB / WBENC, what it unlocks and whether it's worth it
- `get-paid-freelance` — contracts, deposits, and chasing unpaid invoices
- `price-your-work` — hourly vs project vs value, and raising rates on existing clients
- `creator-income` — tiktok & instagram monetisation
- `sell-on-amazon` — FBA fees and whether it's still worth entering

Site total: **67 pages · 0 broken links · 0 JS errors · 31 live topics · 65 pages searchable.**

## v51 — automatic cache busting

Symptom: a redeploy goes out and the site looks unchanged. Cause: every design change in the
last several versions lives in `_article.css`, `nav.css`, `home-enhance.css`, and `icons.js` —
the files browsers cache hardest. A returning visitor keeps the old CSS and sees the old design
on top of new HTML.

**`regen.py` now stamps every local asset reference with `?v=<hash>`**, where the hash is an
md5 of the contents of every CSS and JS file on the site. Change any of them and the URL
changes, so browsers are forced to fetch fresh. Change nothing and the hash is stable, so
caching still works. No manual version bumping.

Verified: editing `nav.css` moved the stamp from `3bf3d8a6` to `f10230a6` across all 78 pages,
and reverting moved it back.

**`_headers` added** — HTML revalidates on every request, `/assets/*` and `/images/*` cache for
a year. Safe because those URLs now change whenever their contents do. Netlify reads this file
natively; on DigitalOcean App Platform it's harmless if unsupported, and the query stamp does
the real work regardless of host.

**Note:** the link checker now strips `?v=` before resolving paths.

Site total: **78 pages · 0 broken links · 0 JS errors.**

## v50 — restraint pass on the card grids

Reference: the Artisan site — black type and white space carrying the page, colour used as
punctuation. The grids were doing the opposite: 49 topic cards, every one a saturated pastel
fill. Nothing could be more important than anything else because everything was loud.

**Colour moved from fill to index mark.** Cards are now cream with an **11px coloured rail**
down the left edge — the pillar colour is still there and still legible at a glance, but it
punctuates instead of shouting. Typography does the work.

Other changes in the same pass:
- **Category tag** went from a solid black pill to an outlined one.
- **Halftone corner removed** — it was competing with the SVG icon added in v43.
- **Grid gap** 16px → 20px, more breathing room.
- **Featured topics keep a pale tint**, so the grid still has high points rather than going
  uniformly flat. Requires `data-featured` on the card, now emitted by `regen.py`.
- Rail palettes for the guides taxonomy (`guide` / `series`) and dictionary, which use
  different `data-kind` values than topics.

Verified: five distinct rail colours on topics and dictionary, two on guides, no overflow at
390 or 1280, no JS errors.

**Not adopted: the gradient wordmark reference.** Multicolour gradient type reads as
2021–2023 SaaS and would fight the flat neo-brutalist system everywhere else on the site. The
"timeless" half of the brief and the gradient half point in opposite directions; this pass
took the timeless one.

Site total: **78 pages · 0 broken links · 0 JS errors.**

## v49 — headers rebalanced toward agency

An audit of every homepage heading found **six of eleven** were about what had been withheld:
*the stuff they skipped · you're not bad with money, you were just never shown · this is all
newer than you think · why you were never taught this · the stuff nobody taught you · no-shame
reference desk.* Each is good alone. Stacked, the site's voice became grievance and repair —
which contradicts the new direction, where money is *the number of choices you get to make.*

**Changed — the forward-facing surfaces:**

| was | now |
|---|---|
| the stuff they skipped. | **build a life of your own.** |
| you're not bad with money. / you were just never shown. | **you already have the judgment. / here's the vocabulary.** |
| finally — a place to start | **start anywhere** |
| no-shame reference desk | **every word, decoded** |
| the dictionary, but fun | **never nod along again.** |
| start with a topic | **pick what's bugging you.** |
| the grown-up stuff | **the big moves** |

**Deliberately unchanged — where the deficit framing is the analysis, not the mood:** the
flagship *why you were never taught this*, the herstory band *this is all newer than you think*,
*the matilda effect*, and the reclaim wall. Those pages are literally about history; removing the
past tense would gut them.

The distinction: the site can *explain* what was withheld without *addressing the reader* as
someone who was withheld from. Analysis in the articles, agency on the surfaces.

**Fourth copy found.** "start with a topic" existed in a `top-topics` builder inlined in
`index.html`, separate from the React bundle and from `home-enhance.js` — the same
multiple-copies pattern as the guard list and the herstory ticker. Worth grepping the raw HTML,
not just the JS, whenever homepage copy changes.

Site total: **78 pages · 0 broken links · 0 JS errors.**

## v48 — "what this is actually for"

The site explained the gap it fills but never said what it wants *for* the reader. New about-page
section, plus a condensed version on the homepage mission band.

Opens on the reframe: **money is the boring word for something that isn't boring at all — the
number of choices you get to make.** Then the founder's list, kept in her voice: learn the thing,
take the class, change the career, book the trip, start the business, make the work.

A "the girl we're writing for" box: passions, money, opinions, dreams, an identity that belongs
to her — *not because she's rejecting anything, because she's additive.*

### the framing decision on the marriage line

Written as **"marriage does not have to be the largest thing you build"**, not as a warning about
marriage — and then immediately grounded in the composites already on the page: the woman
starting over after decades, the mother who stopped deciding. Neither was failed by *being
married*. They were failed by **never having built anything alongside it.**

That distinction does real work. A large share of the audience is married — the spousal-IRA
reader, the stay-at-home mother, the single-income household. An anti-marriage register would
lose exactly the readers who need the site most, while the additive framing is both truer and
turns the origin stories into evidence for the argument rather than decoration.

Closes on her line verbatim: **have dreams. have goals. have a life of your own.** Then the
deflation the brand runs on: *we'll handle the part where somebody has to explain what a Roth
IRA is.*

Site total: **78 pages · 0 broken links · 0 JS errors.**

## v47 — mobile navigation (the site was a dead end on a phone)

Under 860px, CSS hid **every** nav link except the logo and "join free". Articles run ~13
screens tall, so once you were a few screens into one, the only route back to `/topics/` was
scrolling all the way up to a 13px breadcrumb — or the browser back button. Reported by the
founder; confirmed on every article, dictionary, and guide page.

**`assets/nav.js` + `assets/nav.css`**, wired into all 78 pages:

- **Menu button** in the sticky nav under 860px. Opens a full-width panel with all six
  sections plus the money-map CTA. Animates to an X, closes on link tap, backdrop tap, or
  Escape; locks body scroll while open; focuses the first link on open.
- **Current section highlighted** in yellow via `aria-current="page"`, so you know where you are.
- **Relative paths computed from URL depth**, so one script works at every folder level.
- **Back-to-top pill**, bottom-right, only injected on pages taller than 3 screens and only
  visible past 1.5 screens of scroll.

### three bugs found while building it

1. **Homepage nav is `nav.nav`, not `.a-nav`** — the selector missed it entirely.
2. **The homepage nav is React-rendered**, so the script ran before it existed. Now retries at
   150/400/900/1600/2600ms, same pattern as `home-enhance.js`.
3. **`nav.nav #mp-menu-btn { color: var(--ink) }`** rendered the button near-black on a black
   bar — invisible but present. Both navs are dark; the override was simply wrong.

Verified across 12 representative pages at 390px: menu present, no horizontal overflow, no JS
errors.

Site total: **78 pages · 0 broken links · 0 JS errors.**

## v46 — generated header art on eight articles

**`build_art.py`** — six SVG header banners built from the brand's own vocabulary (offset-shadow
cards, halftone dots, the five palette colours). 1.6–2.6 KB each, infinitely scalable, and they
**ship as-is** — these aren't grey placeholders waiting on photography.

| art | where |
|---|---|
| `art-two.svg` — two cards, both "hers" | spousal-ira |
| `art-taxes.svg` — three tilted forms | freelance-taxes, w4-explained, kids-and-taxes |
| `art-grow.svg` — rising bars | start-investing |
| `art-ladder.svg` — five stacked bars | where-to-park-cash |
| `art-record.svg` — the 1963–2026 timeline | why-you-were-never-taught-this, firsts |
| `art-table.svg` — four figures, one empty coral chair | held for the about page |

Two bugs fixed along the way: the generator emitted **duplicate `stroke-width` attributes**,
which made five of six SVGs fail to parse (only the one that never overrode the default
rendered); and the first canvas at **1200×470 was too tall** — the art dominated the article it
was heading. Rebuilt at 1200×330 with every composition re-laid out.

`images/README-UPLOAD-HERE.md` now carries a numbered shopping list with **exact filenames** —
drop a file in, name it as listed, and it slots straight into the right page.

Site total: **78 pages · 0 broken links · 0 JS errors · 91 icons · 6 art banners · 4 figures · 1 photo.**

## v45 — photo system (used sparingly, on purpose)

Three photos uploaded, all of the same subject: piles of $100 bills.

**One is in use. Two are not.** Cash-pile imagery is the visual language of get-rich-quick
content — the exact infomercial register this brand avoids — so it's used only where cash is
literally the subject: `topics/where-to-park-cash.html`. Restraint noted in
`images/README-UPLOAD-HERE.md` along with better search terms.

**`build_photos.py`** — resizes, crops, compresses, and **duotones** source photos onto the
brand ink/cream ramp. Stock-green disappears; the texture stays; the photo stops fighting the
palette. 10.4 MB source → 197 KB output.

*Implementation note:* the first duotone used `putpalette` + `convert('P')`, which dithered and
scattered coloured speckles through the image. Rewritten with per-channel LUTs via
`Image.merge` — no dithering, and a smaller file.

**`.a-photo` component** in `guides/_article.css` — bordered, offset-shadowed, with a caption
row that puts an editorial line on the left and a source credit on the right. Unsplash doesn't
require attribution, but crediting is good practice and it matches the site's sourcing ethic.

Site total: **78 pages · 0 broken links · 0 JS errors · 91 icons · 4 figures · 1 photo.**

## v44 — explanatory figures (and the photo handoff)

**Cannot fetch stock photos.** Verified: `images.unsplash.com`, `api.unsplash.com`, `pexels.com`,
and `commons.wikimedia.org` all return `403 host_not_allowed`. The sandbox allowlist covers
package registries only. Photography has to be uploaded by the founder — see
`images/README-UPLOAD-HERE.md` for specs and licensing rules.

**Four inline SVG figures added** — these explain rather than decorate, which is why they're
worth more than stock photos here:

1. **`freelance-taxes`** — the FICA split. Two bars: at a job, employer 7.65% / you 7.65%; on
   your own, the full 15.3%. Plus the dollar comparison on $60k. This is the single hardest
   idea on the page and the diagram carries it in one look.
2. **`why-you-were-never-taught-this`** — the 1963/1974/1988/2026 timeline, with *"your mother's
   lifetime starts somewhere on this line"* above it.
3. **`where-to-park-cash`** — an access spectrum from "get it tomorrow" to "locked up," which is
   the article's whole organising argument made visual.
4. **`kids-and-taxes`** — why the FSA and childcare credit can't both apply to the same $3,000.

New `.a-fig` figure system in `guides/_article.css` — bordered, offset-shadowed, with caption
and label classes. Any future diagram drops straight in.

Site total: **78 pages · 0 broken links · 0 JS errors · 91 card icons · 4 figures.**

## v43 — a real icon system

The site had graphics on exactly one page. Now every card grid has them, without hand-editing
78 files.

**`assets/icons.js`** — 37 inline SVG paths plus a per-slug map, injected at runtime into every
`.l-card` on the topics, dictionary, and guides indexes. Icons inherit `--ink` and use
`stroke:none/fill` so they read correctly on every card colour. Zero external requests, zero
licensing risk.

**Per-topic, not per-category.** First pass keyed off `data-kind`, which rendered fifteen
identical house icons down the "build it" column. Now a slug map gives trademark a stamp, Etsy
a thread spool, freelance taxes a receipt, kids-and-taxes a baby, spousal IRA a ring, divorce a
fork in the path — **33 distinct shapes across 49 cards**.

**`regen.py` now emits `data-slug`.** Coming-soon cards are `<div>`, not `<a>`, so they had no
href to key off and fell back to the category icon. The registry writes the slug explicitly now.

**Emoji removed from card titles** — they were doing the icon's job badly, and the regex needed
widening to catch `®️` (U+00AE + variation selector), which the first pattern missed.

**Seat-at-the-table illustration** on the mission band: four seated figures at 34% opacity, and
one empty chair in coral, drawn in profile. The brand's central metaphor had never actually
been drawn. First attempt read as a "T" — redrawn with back, seat, and legs.

Note: `herstory/firsts.html` reports one "broken" image on load. It isn't — the Pinterest
graphic is `loading="lazy"` and resolves on scroll. Verified.

Site total: **78 pages · 0 broken links · 0 JS errors · 91 icons across three grids.**

## v42 — third story replaced (no spouse in it at all)

The "owns more of the house" composite was cut at the founder's request — even composited, a
property-split story implies a real husband. Replaced with one that does the same structural job
and involves no partner whatsoever:

> **the woman who's doing everything right and is sure she's behind.** Steady job, money in the
> 401(k), something in savings. On paper she's fine. But she's never seen anyone else's numbers —
> not a salary, not a balance, not a plan — so she has no idea whether "fine" means on track or
> badly behind. Asking what someone earns sounds nosy; saying what you earn sounds like bragging
> or confessing. So she guesses, and the guess is always that she's the one falling short.

**Why this works better, not just safer.** The job of the third story is to prove the problem
isn't only dependence — someone can be completely fine and still unable to speak. The house
version made that point through property. This one makes it through *information*, which is
what the site actually sells, and it lands on the confidence gap already documented in the
flagship article: women guess they're behind when the evidence doesn't say so.

It also has the widest reach of the three. Most readers won't be leaving a thirty-year marriage.
Nearly all of them have wondered whether they're behind and had no way to check.

Verified: no "50/50", "down payment", or "deed" references remain anywhere on the site.

Site total: **78 pages · 0 broken links or images · 0 JS errors.**

## v41 — stories are now genuine composites

Previous version said *"the stories above are real, but the details are changed"* — which still
claims other people's lives without their consent. Rewritten so nothing belongs to anyone.

**Framing changed from accounts to archetypes.** "One was starting over after a long marriage"
became "**there's the woman** starting over after a long marriage" — present tense, a recognizable
pattern rather than a person. Same for the other two.

**Identifying specifics removed.** The house/down-payment detail became "who owns what she owns,
who did the sensible thing years ago." The chapel became "something she wanted to do with money."
"Almost thirty years" became "decades in."

**The disclosure moved up and got honest.** It's now a box *before* the stories, not a footnote
after: these are composites, patterns heard repeatedly, **no real person's story is being told
here.** Stating it up front reads as integrity rather than hedging.

**What stayed real:** the founding moment. A happy hour, a conversation that turned to money,
the realisation there was nowhere to send anyone. That's the founder's own experience and
doesn't expose anybody.

The founder's own section is unchanged — that story is hers to tell.

Site total: **78 pages · 0 broken links or images · 0 JS errors.**

## v40 — corrected a stale guide the new tax pages exposed

Checking whether search surfaced "1099" turned up **`guides/side-hustle-taxes.html`**, a
pre-existing 1,190-word guide covering the same ground as the new `freelance-taxes` topic — and
carrying an **outdated threshold**. It described $600 as "recently in flux and changing again"
when it's settled at **$2,000 for 2026 payments** (1099-K back at $20,000 / 200 transactions).
A reader would have gotten a number wrong by more than triple.

Corrected throughout — heading, dek, TL;DR, and body — with a source link, and cross-linked to
the fuller topic page. The remaining `$600` mention is now historical ("rose from $600 to
$2,000"), which is accurate.

**Process note:** this duplication should have been caught before writing. The check that works
is `grep` the topic registry *and* the guides index for the subject before starting, which is
how the PMI/ETF overlap was caught in v22.

Search confirmed: "1099" returns `freelance-taxes` first, then `how-to-file-taxes` and
`side-hustle-taxes`. "w-4" returns the new page.

Site total: **78 pages · 0 broken links or images · 0 JS errors · 33 live topics · 77 searchable.**

## v39 — three tax topics (1099, W-4, kids)

2026 is the first full year under OBBBA, and several figures moved — stale numbers here would
be worse than none, so every one is sourced.

**`topics/freelance-taxes.html`** — the "surprise" article. Self-employment tax is **15.3% of
92.35% of net profit** because you pay both halves of FICA. **$400** of net profit triggers it
(unchanged since 1990); **$1,000** of expected tax triggers quarterly payments. The 2026 trap:
the **1099-NEC threshold rose $600 → $2,000**, so fewer forms arrive while the obligation is
identical — bill six clients $1,500 each and you may get *zero* 1099s and still owe on $9,000.
Also covers safe harbor (100%/110%), the four dates, QBI at 23%, and the split 2026 mileage
rate (72.5¢ / 76¢).

**`topics/w4-explained.html`** — withholding, why a big refund is an interest-free loan, and
why "claim 0 or 1" describes a form that hasn't existed since 2020. The most useful thing on it:
**the IRS treats withholding as paid evenly across all four quarters even if you change it in
November** — the one legitimate way to retroactively fix an underpayment.

**`topics/kids-and-taxes.html`** — **CTC $2,200** (permanent, $1,700 refundable, phases out
$200k/$400k), **CDCTC top rate 35% → 50%**, **DCFSA $5,000 → $7,500** (first increase since
1986). The rule people miss: FSA contributions reduce credit-eligible expenses dollar-for-dollar,
so with one child you're effectively choosing. Includes the non-refundability trap (below ~$30k
AGI the credit yields nothing), the day-camp/overnight-camp line, the custodial-parent rule in
divorce, and the custodial Roth IRA.

Retired two now-superseded stubs: `quarterly-taxes` and `childcare-tax-credit`.

Site total: **78 pages · 0 broken links or images · 0 JS errors · 33 live topics · 77 searchable.**

## v38 — composites, and the founder's story

**The friends' stories are now composites.** Same emotional truth, no identifying specifics: the
wedding chapel became "a plan she'd thought about for years," the thirty-year marriage became "a
long marriage," and a short **"about these stories"** note states plainly that details are
changed and combined. Being open about it reads as editorial integrity rather than weakness.

**New section: "and one more, from the inside."** The founder as the child a family had already
decided about — the role assigned early, success not part of the story her family told. More
than a decade of deliberate work to put it down. A daughter, which is the actual deadline.

The bridge to the site's thesis: *the story you inherit about what you're capable of is not a
fact — it's just the story that got told first.* Then it connects outward to 1974 and links to
the flagship, so a personal story becomes an argument about inherited information rather than
a memoir detour. Closing line: **"You just do it with a savings account instead of a therapist."**

### deliberately left out — see the chat note

Two specifics the founder offered were held back: the **clinical diagnosis of a living family
member**, and the **list of treatment modalities**. Reasoning given in full to the founder;
short version is legal exposure on the first, category drift on the second. Both are trivially
re-addable if she wants them.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v37 — three stories, one table

The origin story now holds all three accounts from that night, and the through-line the founder
identified: **none of these conversations happen in daylight.**

1. **Leaving after thirty years** — a savings account (her first), her own passwords, **her own
   email address**. The infrastructure of being a separate adult, rebuilt at that stage of life.
2. **A friend's mother** — when her husband retired he was home all day and the balance shifted
   without an argument. She had wanted to build a wedding chapel, a real one other people would
   get married in. The idea went from a plan, to something she mentioned occasionally, to
   something she stopped bringing up. *She wasn't poor — what she lost was the authority to
   decide what the money was for.*
3. **That friend's own house** — weighted toward her because she put in the down payment before
   marrying. Not a strategy; she just bought first. And she'd never said it at a table before,
   because it sounds like planning for divorce, or bragging, or admitting distrust.

The third story is what makes the set work: it's not a story about a woman who got trapped.
It's a woman who is *fine*, who still couldn't say the thing out loud. That moves the thesis
from "women get taken advantage of" to **"nobody talks about any of this,"** which is both
truer and far less alienating.

Closing line: *the goal was never just information — it's that the woman with the chapel should
have been able to build the chapel.*

Everyone stays unidentifiable: no names, no cities, no datable details.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v36 — the real origin story

The site claimed a "seat at the table" without ever saying where the table was. Now it says.

**About page, new "why this exists" section:** a friend leaving a marriage of almost thirty
years, working out at a happy hour what she actually needed — *a* savings account, her first
one. Her own passwords. **Her own email address.** The basic infrastructure of being a separate
adult, rebuilt at that stage of life. The point of the story isn't that she didn't know things —
she'd run a household for three decades — it's that **there was nowhere obvious to send her.**

**Homepage mission band** now carries the short version instead of abstract claims about
money advice, with "her own email address" highlighted.

Two editorial decisions worth keeping:
- **She stays unidentifiable.** No name, no city, no timeline detail that would narrow it. She's
  described as capable, not as a cautionary tale — she's the reason the site exists.
- **It ends with her being fine.** Own accounts, own email, own money, about a year. Without
  that, the story is a warning; with it, it's a reason the site should exist.

The insight the founder didn't flag: the dinner-table framing was never a marketing metaphor.
It's a literal description of the founding moment. The About page now says so.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v35 — design review response

**Hero hierarchy flipped.** "Money + Legal 101 for Women" was a 13px grey label above an 80px
headline. It's now the dominant element (56px desktop / 33px mobile, Archivo Black, title case)
with "the stuff they skipped." demoted to a supporting line beneath it. Positioning first,
personality second.

**Matilda section now says who she was.** "They wrote her out of the record" named nobody.
Replaced with: Matilda Joslyn Gage was a suffragist and inventor who wrote in 1876 that women's
ideas were routinely credited to men — and a century later historians named the pattern after
her *because she had been written out of the record herself*.

**Reclaim wall reframed** from "we're done being quiet about money" to **"someone taught us
money was private. we're done keeping secrets."** Body copy widened from women specifically to
anyone kept out of the money conversation. Money silence is real and gendered, but it's also
class — the universal frame is both truer and less alienating.

**Sentence case on body prose.** Display type (headings, kickers) stays lowercase — that's the
design system, not an error. Every sentence of running prose now capitalises properly.

**Colour system defined:** yellow = clickable, only. It was decorating the reclaim band while
also marking every CTA, which is why it read as "most important" arbitrarily. Reclaim moved to
pink; yellow is now reserved for buttons and the hero highlight.

**Fewer inverted bands.** The mission card went from black to cream, cutting the dark/light
alternation down the page. Remaining dark blocks: sticky search bar, start-note, dictionary.

**Not changed:** "any way we can" — that copy was replaced in **v30** and doesn't exist in this
build. The reviewer was looking at the deployed site, which is still running an old version.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v34 — the herstory strip became a real section

The bare rotating line ("HERSTORY · 1963 · equal pay became law…") had no context, and
`.mp-hs-go` — the only thing explaining where it went — was `display:none` under 640px. On a
phone it was a stray fact floating between two sections with no visible way in.

Replaced with a proper lilac band: kicker, headline **"this is all newer than you think."**, a
one-line reason it matters, **three receipts visible at once** (1963 / 1974 / 1988), and two
buttons — the timeline and the new firsts wall. Nothing rotates, so nothing is hidden from
someone who doesn't wait around.

### two duplicate-code bugs found underneath it

1. **`herstoryLine()` and `var HERSTORY` were each defined twice** (both labelled "section 9").
   The second shadowed the first, so an entire ticker implementation (`#mp-hxline`, plus its
   ~20 lines of CSS) was dead code that could never render. Deleted.
2. **`herstoryLine()` was called twice per tick** — `done.herstory` and `done.hx` — a leftover
   from the duplicate. Removed.

Also reordered: mission now renders **above** herstory (why we exist → the evidence). Both
insert before `#start-here`, so call order in `tick()` determines visual order — mission must be
called first.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v33 — "pull up a chair" moved up

The mission band was sitting at **5,430px on mobile** — five screens down, below the topic grid
and the coming-soon list. Anyone who bounced before then never learned what the site was for.

`missionBand()` now anchors to `#start-here` instead of `#matilda`, so it lands at **1,122px
mobile / 839px desktop** — the first thing after the hero, and the second screen on a phone.

The resulting order reads as an argument: hero says **what this is** → mission says **why it
exists** → start-here asks **what do you need** → topics deliver. Context before the ask.

The name band ("what the name means") stays where it was, further down. Etymology is a
nice-to-know, not a first-read.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v32 — images, finally (and a share bug that was live the whole time)

**`og-image.png` did not exist.** Every page referenced
`https://maltiplata.netlify.app/og-image.png` and it 404'd — so every share on Instagram,
Pinterest, Facebook, or iMessage showed a blank preview. Built now: 1200×630, brand fonts,
the headline with the tilted highlight, the one-line description, three feature pills.

**`pin-money-map.png`** — a 1000×1500 Pinterest-ratio graphic of the six-step order of
operations. Pinterest is the priority acquisition channel and 2:3 vertical is its native ratio;
a landscape OG image gets cropped badly there.

**Every page now has `og:image` + `twitter:card=summary_large_image`.** 74 pages were missing
one or both.

**16 inline SVG illustrations** on the firsts wall — peak, plane, sailboat, bar chart, gavel,
boot, star, credit card, capitol, mortarboard — paired to each card and inheriting `--ink`, so
they work on every card colour. Zero external requests, zero licensing risk.

**Pinnable money-map block** added to `herstory/firsts.html`, linking the PDF.

**On photos:** deliberately none. Real photographs of Lynn Hill, Junko Tabei, Muriel Siebert
etc. are all rights-reserved — using them would be infringement, not fair use. The site's
neo-brutalist system is better served by flat vector graphics anyway.

Regenerate the share images with `python3 build_share_images.py`.

Site total: **75 pages · 0 broken links or images · 0 JS errors.**

## v31 — "women who went first" fun-facts wall

**`herstory/firsts.html`** — 16 filterable fact cards across four categories (the rock, the sky
& sea, the money, the record). Each card is year + name + what happened + **the detail**, which
is the part that actually travels.

The best of them: Lynn Hill's three-word comment after the first free ascent of the Nose by
*anyone* (*"It goes, boys."*); Masse Critique, the 5.14a whose first ascensionist said no woman
would climb it — Hill sent it in fewer tries than he did; Junko Tabei summiting Everest twelve
days after an avalanche knocked her unconscious, in gear her club sewed from recycled materials;
Muriel Siebert getting rejected by nine sponsors, then having the NYSE invent a $300,000
bank-guarantee rule just for her that no bank would grant a woman; Jeannette Rankin elected to
Congress four years before women could vote nationally.

Ties into the existing library: the 1974 and 1988 cards link to the flagship article, so the
wall feeds the long read rather than sitting in a corner.

Cross-linked from `/herstory/`, registered in the search index with keywords, filter chips are
plain JS with `aria-pressed` (no framework, no JS errors).

Site total: **75 pages · 0 broken links · 0 JS errors · 74 searchable.**

## v30 — the "what is this" now lands above the fold

A first-time visitor previously got the headline, then *"money, legal, and how to actually build
something — in plain language. the class nobody gave you, closing the gap any way we can."*
That never says what the site **is**, who it's for, or what you get from it. The plain
explanation only appeared in the mission band, far below the fold.

**New hero subhead:**

> a free, plain-language library for women: **money, legal stuff, and independence** — at any
> stage. every confusing word decoded, every big decision walked through.
> *like dinner with a friend who already figured it out.*

Four things a stranger needs, in the first sentence: **free** (no catch), **plain-language**
(the promise), **library** (what kind of thing it is), **for women** (who it's for). Then what
you actually get — words decoded, decisions walked through — then the warmth line, set as its
own dimmed second line so it lands as a closer rather than competing with the facts.

Verified above-the-fold at 390px: the bolded *money, legal stuff, and independence* sits at
374px, the dinner line at 486px — both well inside the first screen.

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics.**

## v29 — tighter highlight box

Trimmed the yellow highlight's vertical padding and dropped `line-height` from 1.14 to 1.0.
Box height at 390px went **69.7px → 60.3px** (−13%); the type now sits in it rather than
floating in a tall block.

Clearance held on both edges: **5.2px below / 2.0px above** at 390px, **7.7px / 2.7px** at
1280px. Border-radius pulled in to 10px (9px mobile) so the corners stay proportional to the
shorter box.

Note: going tighter than this clips — at `line-height:.96` with no top padding, ascenders
crossed the top border (measured −0.2px at 390px, −1.3px at 1280px).

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics.**

## v28 — the highlight reads as a sticker now

`-1.5deg` was the problem: too small to register as a choice, big enough to look like a
rendering accident. Now **`-3.5deg` desktop / `-3deg` mobile** plus a hard offset shadow
(`4px 4px 0 var(--ink)`, 3px on mobile), which matches the offset-shadow language used on every
card and button across the site. It reads as a sticker slapped on the headline.

Descender clearance held: 11.5px at 390px, 17.9px at 1280px. No horizontal overflow at either.

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics.**

## v27 — the pitch, tightened

Same message, fewer words, faster to land.

**Homepage name band:** *money, legal, and independence for women — explained like dinner with a
friend, not a lecture from a bank.*

**Homepage mission band:** *a seat at the table for life's big moves — money, legal, and
independence, at any stage. no jargon, no shame, no gatekeeping.* The two paragraphs under it
were cut roughly in half.

**About page** hero dek and opening paragraph matched to the same lines.

**Meta descriptions** on `index.html` and `about/index.html` now carry the short pitch, so the
one-liner travels with every shared link. Section index pages (topics, guides, dictionary,
herstory, start, wall) keep their own specific descriptions — a site-wide overwrite was reverted.

Copy edits made to the founder's phrasing: *"at every stage of their life"* → *"at any stage"*
(same meaning, half the words), and the dinner image moved to the **end** of the sentence where
it lands as the payoff rather than getting buried mid-clause.

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics.**

## v26 — mobile type fixes + a plain description of what this is

**The "y" in "they" was clipping the yellow box.** `.hero-highlight` had `padding:0 14px` and a
sub-1.0 line-height, so descenders ran into the border. Now em-based padding with extra bottom
room (`.06em .38em .16em`) and `line-height:1.14` — the descender sits fully inside with ~11px
clearance at 390px. Same headroom added to `.mp-mission-h`, `.mp-name-word`, `.mp-name-punch`.

**New one-line description** in the name band, above the malti/plata split: *maltiplata is a
plain-language money and legal library for women — free, sourced, and written like a friend
explaining it.* The band explained the etymology before it ever said what the site is.

### the deployed site is running an old build — confirmed

Two independent proofs, both from the current code:

1. **`guides/how-to-get-out-of-debt.html` returns 200 locally** and the homepage link points at
   the correct relative path. It cannot 404 from this build.
2. **The "money map, live" allocator is `display:none` in this build** — `hideSections()` in
   `home-enhance.js` kills `decoder`, `toolkit`, `grownup`, and `forms`. If it's visible on the
   deployed site with overlapping numbers, that build predates the change.

Nothing in the current source can produce either symptom. Redeploy from this zip.

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics.**

## v25 — the name, explained at a glance

The name was explained in a dense paragraph that buried the two things people actually need:
**plata = money in Spanish**, and **malti = multi + Matilda**. Rebuilt as a visual split so
it reads in about three seconds.

**Homepage** — `compact('matilda', …)` replaced with a new `nameBand()` in `home-enhance.js`:
two side-by-side cream cards on pink, **malti** / **plata**, each with its two meanings stacked
underneath, then the payoff line — *multiply your money — and put her name back on it.* The
Matilda-effect history drops below as one short line instead of leading.

**About page** — same two-card structure, same payoff line, with the fuller Rossiter/Gage/Chile
explanation kept underneath for anyone who wants it.

Both stack to one column under 640px.

**Note:** `.ab h3` and paragraph rules on the about page override new classes — the name
headings need `!important` on font-family and size to hold Archivo Black.

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics.**

## v24 — the mission, said out loud

The site explained *the name* everywhere and the *mission* nowhere. Fixed in two places.

**New homepage mission band** (`#mp-mission`, inverted black card with a lilac offset shadow,
sits directly above the matilda strip): **"pull up a chair."** — money, legal stuff, and
independence for women at **every stage of life**, explained the way a friend would explain
them over dinner. A table, not a podium.

**About page rewritten at the top** — new hero dek plus a full "a seat at the table" section
that names the actual audience (the stay-at-home mom with no account in her own name, the
single parent filing wrong, the woman with three degrees who was never told what her 403(b)
held, the one starting a business at fifty-one) and a "what we mean by independence" box:
the concrete kind, not the lifestyle-brand kind. *Independence is mostly information.*

**Found while doing this:** the homepage bundle contains a large `sf()` "they wrote her out"
matilda component that is **dead code — it never renders.** The live section is built at
runtime by `compact('matilda', …)` in `assets/home-enhance.js`. Editing homepage copy means
editing `home-enhance.js`, not the React bundle. The mission band is a new `missionBand()`
function in that same file.

Site total: **74 pages · 0 broken links · 0 JS errors · 30 live topics.**

## v23 — removed the vibe-coding topic

**`topics/build-with-ai.html` ("build it yourself with ai") is gone.** Removed the page, its
registry entry in `_topics.js`, its card on `/topics/`, its search-index entry, and the
read-next card pointing at it from `trademark-your-name` (replaced with `how-to-start-an-llc`,
which is a closer sibling anyway).

The build pillar is now trademark + etsy shop, with the rest of the segment stubs still
registered as `ready:false`.

Site total: **74 pages · 1,476 internal links · 0 broken · 0 JS errors · 30 live topics · 72 searchable.**

## v22 — the safe-money gap, plus 5 new dictionary words

**`topics/where-to-park-cash.html`** — high-yield savings vs. CDs vs. treasury bills vs. I bonds,
sorted by **when you need the money back** rather than by yield. The framing is the point: the
spread between these is under a point (about $50/yr on $10k), while the access rules differ
enormously. Includes a four-way comparison table, the CD-ladder explainer, and three mistakes —
the first being locking up the emergency fund.

All figures are August 2026 and sourced: top CDs at **4.25–4.50%**, I bonds at **4.26%** through
October (0.90% fixed + 3.34% inflation, per TreasuryDirect), inflation at **3.5%** YoY, plus the
12-month I-bond lockup, the $10,000 annual limit, and the end of paper bonds via tax refund.

**5 new dictionary words:** `cd`, `bond`, `mutual-fund`, `etf`, `pmi`. Dictionary is now 15 words.

**Deliberately not written:** PMI and down payments already had a full section in
`down-payment-myth`, and ETF vs. mutual fund is already covered in `difference-between-stocks` —
so those became dictionary entries rather than duplicate articles.

**Template gotcha:** `.a-hero-card h1` has `text-transform:lowercase`, which renders acronyms as
"cd" and "pmi". Acronym dictionary entries need an inline `text-transform:uppercase` override.

Site total: **75 pages · 1,496 internal links · 0 broken · 0 JS errors · 31 live topics · 73 searchable.**

## v21 — spousal IRA (live), 11 new topics registered, instagram wired

**`topics/spousal-ira.html`** — the first of the new segment topics, and the highest-leverage
one on the list. A non-working spouse can fund an IRA in their **own name** using the working
spouse's income: **$7,500** in 2026 ($8,600 at 50+), **$15,000** across two accounts for a
one-earner couple. Three conditions only — married, filing jointly, spouse's earned income
covers both. All 2026 figures cite IRS Notice 2025-67 directly, including the $242K–$252K
spousal phase-out (far more generous than the $129K–$149K covered-spouse range).

**11 topics registered as `ready:false`** across the new segments — single parents
(head of household, child support, childcare credit vs. FSA, guardianship + life insurance),
degreed professionals (403(b) trap, PSLF), entrepreneurs (quarterly taxes, self-employed
health insurance, grants for women, pinterest), and military spouses.

**Instagram wired site-wide** — `https://www.instagram.com/maltiplata/` now appears in all 69
footers, the homepage footer link, and the schema.org `sameAs` block. The dead
`https://tiktok.com` placeholder was removed; add it back when the account exists.

**Registry gotcha:** `_topics.js` emoji must be **literal characters**, not `\U0001f331`
escapes — `regen.py` treats backslash escapes as regex escapes and crashes.

Site total: **69 pages · 1,379 internal links · 0 broken · 0 JS errors · 30 live topics · 67 searchable.**

## v20 — money map built, guard bug fixed, hero badge replaced

**`downloads/the-money-map-maltiplata.pdf`** is now a real one-page lead magnet (was a 4.5KB
stub). Letter size, brand fonts embedded (Archivo Black + Space Grotesk), selectable text,
prints clean in black and white. Contents: the 6-step order of operations, both allocation
splits, a three-checkbox "this week" block, and the 1974/1988 line. Regenerate with
`python3 build_moneymap.py` — the generator is checked in, fonts are embedded as base64.

**Guard bug (mine, from v19).** `why-you-were-never-taught-this` was added to the homepage's
`MP_LIVE` set but not to the two *other* copies of the live-guides list — `guides/_guard.js`
and a third list inlined in `index.html`. The guard was therefore stripping the href off the
flagship link and relabelling it "soon" wherever it appeared. All three lists now agree.
**If you add a guide, update all three.**

**Hero name badge removed.** The `malti/plata = Matilda + plata (money)` formula pill explained
the etymology before giving anyone a reason to care. Replaced with a single line — *named for a
woman they wrote out of the record* / **her story →** — same anchor to `#matilda`, where the
full story already lives.

Site total: **68 pages · 1,357 internal links · 0 broken · 0 JS errors · 29 live topics · 66 searchable.**

## v19 — the flagship, plus two registry bugs fixed

**`guides/why-you-were-never-taught-this.html`** — 1,900 words, 21 inline source links.
The origin-story piece the whole site rests on: women couldn't get a credit card in their own
name until **1974**, or a business loan without a male relative co-signing until **1988**.
Sources are primary where possible — National Archives, Ford Presidential Library, Congress.gov
(H.R. 5050), Federal Reserve FEDS Notes, CEE Survey of the States 2026, TIAA PFI 2026, GFLEC.

Registered on the guides index (first card), the homepage guide grid, and the search index.
Cross-linked from `/herstory/` and from the matilda-effect guide's read-next.

### two bugs found in v18

1. **The registry had the build pillar in it three times.** `topics/_topics.js` held 45 entries
   for 38 slugs — `trademark-your-name`, `start-an-etsy-shop`, `build-with-ai`, `price-your-work`,
   `get-paid-freelance`, and `sell-on-amazon` were each duplicated, plus near-duplicate slugs
   (`woman-owned` vs `women-owned`, `creator-income` vs `get-paid-as-a-creator`). Since `regen.py`
   only de-dupes the *search* index, `/topics/` was rendering the same card two or three times.
   Now 36 unique entries, one clean build block.
2. **`regen.py` couldn't be re-run.** It loaded `/tmp/dict.json` and `/tmp/guides.json`, which were
   session scratch files that no longer existed — so running it would crash. It now scrapes the
   dictionary and guides straight from their own index pages, including the `data-text` keywords,
   which also means guide and dictionary entries now carry search keywords they previously lost.

Site total: **68 pages · 1,359 internal links · 0 broken · 0 JS errors · 29 live topics · 66 pages searchable.**

## the structure
```
index.html                  → lean hub: 6 top topics + 3 top guides + matilda band + money map
topics/
  index.html                → all topics, searchable + filterable by category
  _topics.js                → THE REGISTRY (add topics here)
  how-to-start-an-llc.html  → live, fully researched
guides/
  index.html                → the 26-guide library (unchanged)
  _article.css              → shared styles (now also covers topic pages)
  _guard.js                 → link safety net
  *.html                    → all 26 guides
downloads/                  → the money map PDF
```

## how to add a topic (2 steps)
1. **Register it** in `topics/_topics.js`:
   ```js
   { slug:"how-to-build-credit", emoji:"💳", title:"how to build credit", cat:"credit",
     featured:true, ready:false,
     blurb:"one sentence that earns the click." }
   ```
   With `ready:false` it shows as "coming soon" and is NOT clickable — so a registered
   topic can never produce a 404 before its page exists.
2. **Write the page**, then flip `ready:true`. Copy `topics/how-to-start-an-llc.html` as
   your template — it has the full structure: TL;DR → sections → `.a-call` callouts →
   `.a-steps-list` numbered steps → `.a-resources` link list → FAQ → sidebar TOC.

`featured:true` surfaces it on the homepage (first 6 shown).

## the article recipe (what makes these work)
Every topic article follows the same shape the 26 guides use:
1. **TL;DR** — the whole answer in 4-5 bullets, with real numbers
2. **What it actually is** — plain language, no assumed knowledge
3. **What it really costs** — actual figures, not "it varies"
4. **The steps, in order** — numbered, doable
5. **Callouts** for the traps people fall into
6. **The resources worth your time** — free/official sources first (.gov before .com)
7. **The bottom line** + one tiny next step
8. **FAQ** — the questions people actually search

## deploy (Netlify, ~2 min)
1. UNZIP to a NEW, empty folder.
2. app.netlify.com → "Add new site" → "Deploy manually"
3. Drag the WHOLE unzipped folder onto the page.

## cache gotcha
Update not showing? Hard-refresh (Cmd+Shift+R) or use an incognito window. Always unzip
to a fresh folder so old files don't linger.

## still to write (registered, marked "coming soon")
how-to-build-credit · how-to-file-taxes · how-to-get-out-of-debt (topic version) ·
start-investing · emergency-fund · how-to-negotiate-salary · prenup-101 ·
health-insurance · first-apartment · student-loans · buying-a-car

## when you get a real domain
Search-replace `maltiplata.netlify.app` across the HTML (canonical + og: tags).
