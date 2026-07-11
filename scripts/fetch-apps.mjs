// scripts/fetch-apps.mjs
// Run with: node scripts/fetch-apps.mjs
// Fetches live app data via google-play-scraper for a curated seed list
// spanning multiple categories, then writes data/apps.json.

import gplay from "google-play-scraper";
import { writeFile } from "node:fs/promises";

// Curated seed list: package IDs across categories.
// Extend this list any time — categories are auto-detected from live data.
const SEED_APP_IDS = [
  // Social
  "com.instagram.android",
  "com.facebook.katana",
  "com.snapchat.android",
  "com.twitter.android",
  "com.zhiliaoapp.musically", // TikTok
  "com.pinterest",
  "com.linkedin.android",
  "com.reddit.frontpage",
  "com.discord",

  // Productivity
  "com.microsoft.office.outlook",
  "com.google.android.apps.docs",
  "com.todoist",
  "com.notion.id",
  "com.evernote",
  "com.microsoft.todos",
  "com.asana.app",
  "com.trello",
  "com.slack",
  "com.google.android.calendar",

  // Finance
  "com.mint",
  "com.paypal.android.p2pmobile",
  "com.venmo",
  "com.squareup.cash",
  "com.coinbase.android",

  // Fitness
  "com.myfitnesspal.android",
  "com.strava",
  "com.nike.ntc",
  "fit.plusminus.fastic",
  "com.fitbit.FitbitMobile",

  // Streaming / Entertainment
  "com.netflix.mediaclient",
  "com.spotify.music",
  "com.google.android.youtube",
  "com.disney.disneyplus",
  "com.amazon.avod.thirdpartyclient",
  "com.hulu.plus",

  // Messaging
  "com.whatsapp",
  "org.telegram.messenger",
  "com.viber.voip",
  "com.google.android.apps.messaging",

  // Photo/Video editing
  "com.adobe.lrmobile",
  "com.canva.editor",
  "com.picsart.studio",
  "com.vsco.cam",

  // Shopping
  "com.amazon.mShop.android.shopping",
  "com.ebay.mobile",
  "com.walmart.android",

  // Navigation
  "com.google.android.apps.maps",
  "com.waze",

  // Note-taking / docs alt
  "com.microsoft.office.word",
  "com.google.android.keep",
];

async function fetchApp(id) {
  try {
    const app = await gplay.app({ appId: id });
    return {
      id: app.appId,
      name: app.title,
      slug: app.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      icon: app.icon,
      category: app.genre,
      genres: app.genreId ? [app.genreId] : [app.genre],
      rating: app.score ?? null,
      reviews: app.ratings ?? 0,
      installs: app.minInstalls ?? 0,
      installsText: app.installs ?? "N/A",
      type: app.free ? "Free" : "Paid",
      price: app.priceText ? parseFloat(app.price) || 0 : 0,
      developer: app.developer,
      contentRating: app.contentRating ?? "Unrated",
      lastUpdated: app.updated ? new Date(app.updated).toISOString().slice(0, 10) : "",
    };
  } catch (err) {
    console.warn(`  ! failed to fetch ${id}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`Fetching ${SEED_APP_IDS.length} apps from Google Play...`);
  const results = [];

  // Fetch sequentially with a small delay to be polite / avoid throttling.
  for (const id of SEED_APP_IDS) {
    process.stdout.write(`  - ${id}\n`);
    const app = await fetchApp(id);
    if (app) results.push(app);
    await new Promise((r) => setTimeout(r, 150));
  }

  await writeFile(
    new URL("../data/apps.json", import.meta.url),
    JSON.stringify(results, null, 2)
  );

  console.log(`\nDone. Wrote ${results.length}/${SEED_APP_IDS.length} apps to data/apps.json`);
}

main();
