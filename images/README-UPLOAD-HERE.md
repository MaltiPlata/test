# Photos go in this folder

Drop files here, then tell Claude the filenames. Naming convention:

    images/about-table.jpg
    images/hero-desk.jpg
    images/topic-freelance.jpg

## Specs
- **Format:** .jpg for photos, .png only if it needs transparency
- **Width:** 1600px for full-width, 900px for in-article. Anything wider is wasted bytes.
- **Under 400KB each.** Compress at squoosh.app (free, in-browser) before uploading.
- **Landscape** (3:2 or 16:9) for hero and in-article. Portrait only for Pinterest assets.

## Licensing — this matters
Only use images you can legally publish on a commercial site:
- **Unsplash / Pexels / Pixabay** — free, no attribution required, commercial use OK
- **Your own photos** — always fine
- **NOT** Google Images, Pinterest, or anything found via search. Those are almost all rights-reserved.

Keep a note of where each image came from in this file as you add them.


---

## What we already have

### Generated art (ships as-is — no photo needed)
Regenerate any of these with `python3 build_art.py`.

| file | on | what it shows |
|---|---|---|
| `art-table.svg` | *available* | four figures at a table, one empty chair in coral |
| `art-taxes.svg` | freelance-taxes, w4-explained, kids-and-taxes | three tilted forms |
| `art-two.svg` | spousal-ira | two cards, both labelled "hers" |
| `art-grow.svg` | start-investing | rising bars |
| `art-ladder.svg` | where-to-park-cash | five stacked bars |
| `art-record.svg` | why-you-were-never-taught-this, firsts | the 1963–2026 timeline |

### Photos
| file | source | used on |
|---|---|---|
| `cash-texture.jpg` | Giorgio Trovato / Unsplash | where-to-park-cash |
| `cash-band.jpg` | Mackenzie Marco / Unsplash | *unused* |

Both duotoned to the brand ramp by `build_photos.py`.

---

# THE SHOPPING LIST

Save each with the **exact filename** in the left column, drop it in this folder, and
tell Claude it's there. Everything already has generated art, so nothing is broken while
you wait — these are upgrades, in priority order.

| # | filename | what to search | goes on |
|---|---|---|---|
| 1 | `photo-table.jpg` | "friends dinner table talking", "wine bar conversation" | about page — the origin story |
| 2 | `photo-desk.jpg` | "kitchen table paperwork laptop", "notebook pen morning" | homepage |
| 3 | `photo-freelance.jpg` | "home office receipts laptop", "small business owner desk" | freelance taxes |
| 4 | `photo-family.jpg` | "family calendar fridge", "school lunchbox morning" | kids and taxes |
| 5 | `photo-two-cups.jpg` | "two coffee cups table morning" | spousal IRA |
| 6 | `photo-archive.jpg` | "library archive old paper", "filing cabinet documents" | herstory |
| 7 | `photo-founder.jpg` | *you* — optional, entirely your call | about page |

**Specs:** JPG, ~1600px wide, landscape (3:2 or 16:9), under 400KB.
Compress free at squoosh.app. `build_photos.py` will handle final sizing.

**Licensing:** Unsplash / Pexels / Pixabay / your own camera only.
Not Google Images, not Pinterest.

**The test:** it should look like a moment someone could have had — not an illustration
of wealth. If it could sell a trading course, skip it.
