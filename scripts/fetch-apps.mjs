// scripts/fetch-apps.mjs
// Run with: node scripts/fetch-apps.mjs
// Fetches live app data via google-play-scraper for a curated seed list
// spanning multiple categories, then writes data/apps.json.

import gplay from "google-play-scraper";
import { writeFile } from "node:fs/promises";

// Curated seed list: package IDs across categories.
// Categories are auto-detected from live data.
const SEED_APP_IDS = [
  // =========================
  // Social
  // =========================
  "com.instagram.android",
  "com.facebook.katana",
  "com.snapchat.android",
  "com.twitter.android",              // X
  "com.zhiliaoapp.musically",         // TikTok
  "com.pinterest",
  "com.linkedin.android",
  "com.reddit.frontpage",
  "com.discord",
  "com.threadsapp",
  "com.tumblr",
  "com.bereal.ft",

  // =========================
  // Communication / Messaging
  // =========================
  "com.whatsapp",
  "org.telegram.messenger",
  "com.facebook.orca",                // Messenger
  "com.google.android.apps.messaging",
  "com.viber.voip",
  "jp.naver.line.android",
  "com.skype.raider",
  "com.microsoft.teams",
  "us.zoom.videomeetings",
  "com.google.android.apps.meetings", // Google Meet
  "com.google.android.gm",            // Gmail
  "com.yahoo.mobile.client.android.mail",
  "com.microsoft.office.outlook",
  "com.samsung.android.email.provider",

  // =========================
  // Productivity
  // =========================
  "com.google.android.apps.docs",
  "com.google.android.apps.docs.editors.sheets",
  "com.google.android.apps.docs.editors.slides",
  "com.google.android.keep",
  "com.google.android.calendar",
  "com.todoist",
  "com.notion.id",
  "com.evernote",
  "com.microsoft.todos",
  "com.asana.app",
  "com.trello",
  "com.slack",
  "com.clickup.app",
  "com.anydo",
  "com.ticktick.task",
  "com.microsoft.office.word",
  "com.microsoft.office.excel",
  "com.microsoft.office.powerpoint",
  "com.microsoft.office.officehubrow",
  "com.dropbox.android",
  "com.box.android",
  "com.google.android.apps.drive",

  // =========================
  // Finance
  // =========================
  "com.mint",
  "com.paypal.android.p2pmobile",
  "com.venmo",
  "com.squareup.cash",
  "com.coinbase.android",
  "com.binance.dev",
  "com.revolut.revolut",
  "com.robinhood.android",
  "com.sofi.mobile",
  "com.chime",

  // =========================
  // Health & Fitness
  // =========================
  "com.myfitnesspal.android",
  "com.strava",
  "com.nike.ntc",
  "fit.plusminus.fastic",
  "com.fitbit.FitbitMobile",
  "com.google.android.apps.fitness",
  "com.adidas.app",
  "com.calm.android",
  "com.getsomeheadspace.android",
  "com.samsung.android.app.shealth",

  // =========================
  // Entertainment / Streaming
  // =========================
  "com.netflix.mediaclient",
  "com.spotify.music",
  "com.google.android.youtube",
  "com.google.android.apps.youtube.music",
  "com.disney.disneyplus",
  "com.amazon.avod.thirdpartyclient",
  "com.hulu.plus",
  "tv.twitch.android.app",
  "com.mxtech.videoplayer.ad",
  "com.amazon.mShop.android.shopping",

  // =========================
  // Music & Audio
  // =========================
  "deezer.android.app",
  "com.soundcloud.android",
  "com.apple.android.music",
  "com.pandora.android",

  // =========================
  // Photography / Video Editing
  // =========================
  "com.adobe.lrmobile",
  "com.canva.editor",
  "com.picsart.studio",
  "com.vsco.cam",
  "com.adobe.psmobile",
  "com.lemon.lvoverseas",          // CapCut
  "com.camerasideas.instashot",    // InShot
  "com.google.android.apps.photos",
  "com.b612.android.camera",

  // =========================
  // Shopping
  // =========================
  "com.amazon.mShop.android.shopping",
  "com.ebay.mobile",
  "com.walmart.android",
  "com.contextlogic.wish",
  "com.etsy.android",
  "com.target.ui",
  "com.alibaba.aliexpresshd",
  "com.flipkart.android",
  "in.amazon.mShop.android.shopping",

  // =========================
  // Food & Delivery
  // =========================
  "com.ubercab.eats",
  "com.dd.doordash",
  "com.grubhub.android",
  "com.postmates.android",
  "com.zomato",
  "com.Swiggy",
  "com.dominos",

  // =========================
  // Travel
  // =========================
  "com.ubercab",
  "me.lyft.android",
  "com.airbnb.android",
  "com.booking",
  "com.expedia.bookings",
  "com.tripadvisor.tripadvisor",
  "com.skyscanner.skybook",

  // =========================
  // Maps & Navigation
  // =========================
  "com.google.android.apps.maps",
  "com.waze",
  "com.sygic.aura",
  "com.here.app.maps",

  // =========================
  // Browsers
  // =========================
  "com.android.chrome",
  "org.mozilla.firefox",
  "com.microsoft.emmx",
  "com.opera.browser",
  "com.brave.browser",

  // =========================
  // Education
  // =========================
  "com.duolingo",
  "org.khanacademy.android",
  "com.udemy.android",
  "com.coursera.android",
  "com.google.android.apps.classroom",

  // =========================
  // News
  // =========================
  "flipboard.app",
  "com.google.android.apps.magazines",
  "bbc.mobile.news.ww",
  "com.cnn.mobile.android.phone",

  // =========================
  // Books
  // =========================
  "com.amazon.kindle",
  "com.google.android.apps.books",
  "com.audible.application",

  // =========================
  // Weather
  // =========================
  "com.weather.Weather",
  "com.accuweather.android",
  "com.weather.Weather",

  // =========================
  // Utilities
  // =========================
  "com.google.android.apps.files",
  "com.microsoft.skydrive",
  "com.teamviewer.teamviewer.market.mobile",
  "com.cpuid.cpu_z",

  // =========================
  // Security
  // =========================
  "com.avast.android.mobilesecurity",
  "com.bitdefender.antivirus",
  "com.lookout",

  // =========================
  // AI
  // =========================
  "com.openai.chatgpt",
  "com.google.android.apps.bard",
  "ai.perplexity.app.android",
  "com.microsoft.copilot",

  // =========================
  // Developer
  // =========================
  "com.termux",
  "io.github.muntashirakon.AppManager",
  "com.foxdebug.acodefree",
  "ru.iiec.pydroid3"
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
