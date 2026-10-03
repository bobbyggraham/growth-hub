# FSG Growth Hub

Internal enablement site for the FSG growth organization. Live at **https://bobbyggraham.github.io/growth-hub/**

Static HTML, no build step. GitHub Pages serves `main` directly — commit and the site updates in about a minute.

## Layout

```
index.html            the hub home page — cards, chips, search
join.html             Join the Hub signup (ungated front door, QR target)
field.html            The Field — contests and games
field/                individual games
plays/                vertical activation decks (not yet built)
story/                Who We Are — the deck library + Products × Delivery Method
how/                  Messaging Playbook (carded under Who We Are)
resources/            How To Run The Hub, brand standards, personal development (Growth chip)
tools/
  plays.html          The Playbook — Engage Live · Engage Plays · Guides (Plays chip lands here)
  plays/              hub plays (Opening Drive, Account Plan, Get My Proof Live) — filed under Guides
  engage/             Engage Live episodes + Engage Plays — walkthroughs for the CRM
  proof-builder.html  the Proof Builder app (linked from the Playbook top bar)
  wire.html  wire/    The Wire — industry issues
  fsg-app-faq.html    Ask Engage
assets/               proofs.js (Results), motion.js (Growth in Motion), search-index.js,
                      vendor/pdf-lib.min.js, audio/, master/, nsa/, reliability/, proof photos
value-at-the-core-lyrics.html, one-shot*.html   anthem pages (repo root)
build-search-index.py regenerates assets/search-index.js — run after adding or editing pages
```

## The chip row

`All · Products → · Results · Who We Are · Plays → · Growth · The Field · Wire →`

Arrow chips open a page (Products → `story/products.html`, Plays → `tools/plays.html`, Wire → `tools/wire.html`). The rest filter the home page in place. `data-filter` keys: `proof` = Results, `story` = Who We Are, `tools` = Growth, `field` = The Field. Old deep links still work: `?chip=how` → Who We Are, `?chip=plays` → the Playbook, `?chip=solutions` → Products. Results and Growth in Motion cards are chip-only (hidden under All); What's New copies show under All only.

## Adding a page — one commit, three places

1. The page itself, at its final path.
2. Its card in `index.html` with the right `data-section` (and, for a play or guide, its entry at the top of `LIBRARY` in `tools/plays.html` — `cat`: `live`, `engage`, or `guide`).
3. A regenerated `assets/search-index.js` (`python3 build-search-index.py`).

Two folders are named `plays` and they are different things. `/plays/` holds customer-facing vertical decks. `/tools/plays/` holds internal hub plays. Do not merge them.

## Updating the site

Upload through the GitHub website: **Add file → Upload files**, drag the *contents* of the unzipped folder (not the folder itself), commit to `main`.

Three rules, each of which has broken the site before:

1. **Drag the contents, not the wrapper folder.** Everything lands one level too deep otherwise and every relative link breaks silently.
2. **Never rename a file on the way in.** Each page's links are written for its exact depth — one level under `tools/` uses `../`, two levels uses `../../`.
3. **One commit for everything.** The home page checks each card's link and hides any card it can't find, so a page without its `index.html` (or the reverse) is invisible with no error.

Cards are self-revealing: drop a file at the path a card already points to and the card appears on its own. Chips hide themselves when nothing behind them is live.

After any upload, mirror the same files into `Google Drive › Growth Hub › site/`. When the two drift, the next person to work from Drive ships the wrong version.

## Growth in Motion

Weekly motivation cards, built Sunday from Bobby's Wire label, reviewed Monday, posted here. All data lives in `assets/motion.js` — paste the approved week block under the `ADD NEW APPROVED WEEKS HERE` marker, newest first, and commit that one file. A week goes live on its Monday date on its own: the gold "This Week" spotlight in the Growth section rotates it, and every card sits behind the Growth chip (hidden under All, like Results). People-first standard: cards sign "— Bobby" only, and downloaded wallpapers carry no name, title, or stamp.
