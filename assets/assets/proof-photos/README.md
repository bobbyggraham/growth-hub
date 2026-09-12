# Proof photos

Images referenced by records in `assets/proofs.js`.

**Naming:** `PRF-0XX-<client>-<what>.jpg` — id first, so the folder always says
which proof owns which file and everything sorts by record.

**Why files and not data URIs:** `proofs.js` loads on every hub page. Embedding
photos as base64 added ~130 KB per record to a file every visitor downloads.
Files are fetched only when a proof card is actually opened.

**Sizing:** longest edge 1200px, JPEG quality 80, progressive. Roughly 60–110 KB
each. Anything much larger is a photo that hasn't been resized.

**Paths in `proofs.js`** are repo-relative and must start with `assets/` —
`photo: "assets/proof-photos/PRF-020-oculus-rgbw.jpg"`. The renderer prefixes
the site root, so the same string resolves from `index.html` and from
`story/products.html` one level down. A `data:` URI still works and is left
untouched, so older records keep rendering.

**The downloaded proof card is different** — it keeps photos embedded as data
URIs on purpose, so the file a rep emails to a client is self-contained.
