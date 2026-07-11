import type { PlayApp } from "../types/app";
import { apps } from "./apps";

// Score = rating weighted by review volume (log-scaled so a 4.9 with 50
// reviews doesn't beat a 4.6 with 10M reviews), with a small recency bump.
function score(app: PlayApp): number {
  if (app.rating == null || app.reviews < 1000) return -Infinity;
  const reviewWeight = Math.log10(app.reviews + 1);
  const recencyBump = app.lastUpdated >= "2026-01-01" ? 0.1 : 0;
  return app.rating * reviewWeight * 0.4 + recencyBump;
}

export function getOurPick(category: string): PlayApp | null {
  const inCategory = apps.filter((a) => a.category === category);
  if (inCategory.length === 0) return null;
  return inCategory.reduce((best, a) => (score(a) > score(best) ? a : best));
}
