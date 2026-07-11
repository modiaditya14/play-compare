import { useState } from "react";
import type { PlayApp } from "../types/app";
import { searchApps } from "../lib/search";

export function SearchBar({ onSelect }: { onSelect: (app: PlayApp) => void }) {
  const [query, setQuery] = useState("");
  const results = searchApps(query);

  return (
    <div className="relative w-full max-w-md">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search an app, e.g. Instagram"
        className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm outline-none focus:border-terracotta"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
          {results.map((app) => (
            <li key={app.id}>
              <button
                onClick={() => {
                  onSelect(app);
                  setQuery("");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-paper"
              >
                <img src={app.icon} alt="" className="h-8 w-8 rounded-lg" />
                <div>
                  <div className="text-sm font-medium">{app.name}</div>
                  <div className="text-xs text-neutral-500">{app.category}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
