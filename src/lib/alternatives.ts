import type { PlayApp } from "../types/app";
import { apps } from "./apps";

export type AlternativeMatch = {
  app: PlayApp;
  sharedGenres: number;
  reason: string;
};

export function getAlternatives(app: PlayApp, limit = 6): AlternativeMatch[] {
  const genreSet = new Set(app.genres);

  const candidates = apps
    .filter((a) => a.id !== app.id && a.category === app.category)
    .map((a) => {
      const sharedGenres = a.genres.filter((g) => genreSet.has(g)).length;
      return { app: a, sharedGenres };
    })
    .sort((a, b) => {
      if (b.sharedGenres !== a.sharedGenres) return b.sharedGenres - a.sharedGenres;
      return b.app.installs - a.app.installs;
    })
    .slice(0, limit);

  return candidates.map(({ app: a, sharedGenres }) => ({
    app: a,
    sharedGenres,
    reason: `Same category${sharedGenres > 0 ? ` · ${sharedGenres} shared genre${sharedGenres > 1 ? "s" : ""}` : ""} · ${a.installsText} installs`,
  }));
}
