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
        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-chalk outline-none placeholder:text-chalk/40 focus:border-volt"
      />
      {results.length > 0 && (
        <ul className="panel-emboss absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10">
          {results.map((app) => (
            <li key={app.id}>
              <button
                onClick={() => {
                  onSelect(app);
                  setQuery("");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
              >
                <img src={app.icon} alt="" className="h-8 w-8 rounded-lg" />
                <div>
                  <div className="text-sm font-medium text-chalk">{app.name}</div>
                  <div className="text-xs text-chalk/40">{app.category}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
