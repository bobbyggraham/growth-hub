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
story/                the deck library — who we are
how/                  methodology and messaging
resources/            orientation, brand standards, personal development
tools/
  proof-builder.html  the Proof Builder app
  plays.html          the Growth Hub Plays shelf
  plays/              Growth Hub Plays — walkthroughs for hub tools
  engage/             Engage Plays — walkthroughs for the CRM
  wire.html  wire/    The Wire — industry issues
  fsg-app-faq.html    Ask Engage
assets/               proofs.js (Results data) and proof photos
```

Two folders are named `plays` and they are different things. `/plays/` holds customer-facing vertical decks. `/tools/plays/` holds internal Growth Hub Plays. Do not merge them.

## Updating the site

Upload through the GitHub website: **Add file → Upload files**, drag the *contents* of the unzipped folder (not the folder itself), commit to `main`.

Three rules, each of which has broken the site before:

1. **Drag the contents, not the wrapper folder.** Everything lands one level too deep otherwise and every relative link breaks silently.
2. **Never rename a file on the way in.** Each page's links are written for its exact depth — one level under `tools/` uses `../`, two levels uses `../../`.
3. **One commit for everything.** The home page checks each card's link and hides any card it can't find, so a page without its `index.html` (or the reverse) is invisible with no error.

Cards are self-revealing: drop a file at the path a card already points to and the card appears on its own. Chips hide themselves when nothing behind them is live.

After any upload, mirror the same files into `Google Drive › Growth Hub › site/`. When the two drift, the next person to work from Drive ships the wrong version.
