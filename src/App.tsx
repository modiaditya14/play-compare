import { useEffect, useState } from "react";
import type { PlayApp } from "./types/app";
import { getAppBySlug } from "./lib/apps";
import { SearchBar } from "./components/SearchBar";
import { AlternativesChips } from "./components/AlternativesChips";
import { CompareSplit } from "./components/CompareSplit";

function readParams() {
  const params = new URLSearchParams(window.location.search);
  return { a: params.get("a"), b: params.get("b") };
}

function writeParams(a?: string, b?: string) {
  const params = new URLSearchParams();
  if (a) params.set("a", a);
  if (b) params.set("b", b);
  const query = params.toString();
  window.history.replaceState({}, "", query ? `?${query}` : window.location.pathname);
}

export default function App() {
  const [appA, setAppA] = useState<PlayApp | null>(null);
  const [appB, setAppB] = useState<PlayApp | null>(null);

  useEffect(() => {
    const { a, b } = readParams();
    if (a) setAppA(getAppBySlug(a) ?? null);
    if (b) setAppB(getAppBySlug(b) ?? null);
  }, []);

  useEffect(() => {
    writeParams(appA?.slug, appB?.slug);
  }, [appA, appB]);

  return (
    <div className="min-h-screen bg-paper px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-medium text-neutral-900">Play Compare</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Search an Android app, pick an alternative, compare side-by-side.
          </p>
        </header>

        <div className="mb-8 flex justify-center">
          <SearchBar
            onSelect={(app) => {
              setAppA(app);
              setAppB(null);
            }}
          />
        </div>

        {appA && !appB && (
          <div className="mb-8">
            <AlternativesChips app={appA} onPick={setAppB} />
          </div>
        )}

        {appA && appB && (
          <>
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => {
                  setAppA(null);
                  setAppB(null);
                }}
                className="text-xs text-neutral-500 underline hover:text-terracotta"
              >
                Start a new comparison
              </button>
            </div>
            <CompareSplit appA={appA} appB={appB} />
          </>
        )}

        {!appA && (
          <p className="text-center text-sm text-neutral-400">
            Try searching "Instagram", "Notion", or "Spotify" to get started.
          </p>
        )}

        <footer className="mt-16 text-center text-xs text-neutral-400">
          Data fetched live from Google Play via google-play-scraper · Android apps only
        </footer>
      </div>
    </div>
  );
}
