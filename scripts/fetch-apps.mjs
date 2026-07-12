// fetch-apps.mjs
//
// Usage:
//   npm install google-play-scraper
//   node fetch-apps.mjs
//
// Reads the package IDs / categories / features from apps-config.mjs,
// looks each one up on the Play Store via google-play-scraper, and
// writes a fully-populated apps.json matching the PlayApp type in app.ts.
//
// Only "features" (which the Play Store doesn't expose) is taken from
// the hand-written config. Everything else — icon, rating, reviews,
// installs, developer, contentRating, price/type, lastUpdated — comes
// straight from the live scrape.

import gplay from "google-play-scraper";
import fs from "fs/promises";
import { APPS } from "./apps-config.mjs";

const CONCURRENCY = 5;
const COUNTRY = "us";
const LANG = "en";

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toDateOnly(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

async function fetchOne({ id, category, features }) {
  try {
    const app = await gplay.app({ appId: id, country: COUNTRY, lang: LANG });

    return {
      id: app.appId,
      name: app.title,
      slug: toSlug(app.title),
      icon: app.icon,
      genres: app.genres && app.genres.length ? app.genres : [app.genre],
      rating: typeof app.score === "number" ? Math.round(app.score * 10) / 10 : null,
      reviews: app.reviews ?? 0,
      installs: app.maxInstalls ?? app.minInstalls ?? 0,
      type: app.free ? "Free" : "Paid",
      price: app.priceText ? app.price ?? 0 : 0,
      developer: app.developer,
      contentRating: app.contentRating,
      lastUpdated: app.updated ? toDateOnly(app.updated) : "",
      category,
      features,
    };
  } catch (err) {
    console.error(`Failed to fetch ${id}: ${err.message}`);
    return null;
  }
}

async function runBatched(items, size, worker) {
  const results = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    const batchResults = await Promise.all(batch.map(worker));
    results.push(...batchResults);
    console.error(`Fetched ${Math.min(i + size, items.length)}/${items.length}`);
  }
  return results;
}

async function main() {
  const results = await runBatched(APPS, CONCURRENCY, fetchOne);
  const apps = results.filter(Boolean);

  const failed = APPS.length - apps.length;
  if (failed > 0) {
    console.error(`\n${failed} app(s) failed to fetch — see errors above.`);
  }

  await fs.writeFile("apps.json", JSON.stringify(apps, null, 2));
  console.error(`\nWrote ${apps.length} apps to apps.json`);
}

main();
