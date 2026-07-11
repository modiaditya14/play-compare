# Play Compare

A lean 1v1 Android app comparison site: search an app, pick an alternative in the same category, compare metrics side-by-side.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Fuse.js (fuzzy search)
- google-play-scraper (live data, no API key needed)

## Getting started

```bash
npm install
npm run dev
```

## Refreshing app data

`data/apps.json` currently ships with a small hand-written sample so the app runs out of the box.
To pull real, live data from Google Play:

```bash
npm run fetch-data
```

This runs `scripts/fetch-apps.mjs`, which fetches a curated seed list of ~50 popular apps
across categories (social, productivity, finance, fitness, streaming, etc.) via
`google-play-scraper` and writes the result to `data/apps.json`.

**Note:** This requires outbound network access to `play.google.com`. It will not work in
network-sandboxed environments (like this build container) -- run it locally or in CI.

To add more apps, edit the `SEED_APP_IDS` list in `scripts/fetch-apps.mjs` with any Google
Play package ID (found in a Play Store URL, e.g. `com.spotify.music`), then re-run the script.

## How it works

1. **Search** -- Fuse.js fuzzy-matches against app names/developers/categories.
2. **Alternatives** -- apps sharing the same Play Store category are ranked by shared genres,
   then by install count, showing the top 6.
3. **Compare** -- an editorial two-column split shows rating, reviews, installs, price, type,
   content rating, and last-updated, with a dot marking the winner per row.
4. **Shareable links** -- the current comparison is synced to the URL as `?a=slug&b=slug`.

## Known limitations

- Data reflects whatever was fetched at build time -- re-run `npm run fetch-data` to refresh.
- The seed list covers a curated set of popular apps, not the entire Play Store -- search only
  finds apps already in `data/apps.json`.
- No app screenshots, feature checklists, or sentiment analysis (out of scope for v1).
- Play Store category/genre naming can be broad, so "alternatives" is a heuristic, not semantic matching.
