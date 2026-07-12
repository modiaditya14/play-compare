import { useState } from "react";
import type { PlayApp } from "../types/app";
import { searchApps } from "../lib/search";

export function SearchBar({ onSelect }: { onSelect: (app: PlayApp) => void }) {
  const [query, setQuery] = useState("");
  const results = searchApps(query);

  return (
    <div className="relative z-[120] w-full max-w-md animate-fade-up">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search an app, e.g. Instagram"
        className="animate-float w-full rounded-full border border-white/10 bg-white/5 px-5 pr-12 py-3 text-sm text-chalk outline-none placeholder:text-chalk/50 transition duration-200 focus:border-volt focus:shadow-[0_0_0_8px_rgba(204,255,51,0.18)]"
      />
      <span className="search-icon material-symbols-outlined">search</span>
      {results.length > 0 && (
        <ul className="panel-emboss search-dropdown absolute z-[200] mt-2 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
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
