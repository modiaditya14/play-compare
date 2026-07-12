import type { PlayApp } from "../types/app";

function countEnabledFeatures(app: PlayApp): number {
  return Object.values(app.features ?? {}).filter((value) => value === true).length;
}

// Score = rating weighted by review volume (log-scaled so a 4.9 with 50
// reviews doesn't beat a 4.6 with 10M reviews), plus a feature bonus and a small recency bump.
function score(app: PlayApp): number {
  if (app.rating == null || app.reviews < 1000) return -Infinity;
  const reviewWeight = Math.log10(app.reviews + 1);
  const featureBonus = countEnabledFeatures(app) * 0.5;
  const recencyBump = app.lastUpdated >= "2025-01-01" ? 0.1 : 0;
  return app.rating * reviewWeight * 0.2 + featureBonus + recencyBump;
}

export function getOurPick(appa: PlayApp, appb: PlayApp): PlayApp {
  return score(appa) > score(appb) ? appa : appb;
}
