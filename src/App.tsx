import { useEffect, useState } from "react";
import type { PlayApp } from "./types/app";
import { getAppBySlug } from "./lib/apps";
import { getOurPick } from "./lib/ourPick";
import { SearchBar } from "./components/SearchBar";
import { AlternativesChips } from "./components/AlternativesChips";
import { CompareSplit } from "./components/CompareSplit";
import { OurPick } from "./components/OurPick";

function Kinetic({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`kinetic ${className ?? ""}`}>
      {text.split("").map((c, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.025}s` }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

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

  const ourPick = appA ? getOurPick(appA.category) : null;

  return (
    <div className="min-h-screen bg-ink px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-5xl font-bold text-chalk">
            <Kinetic text="Play Compare" />
          </h1>
          <p className="mt-3 text-sm text-chalk/50">
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
          <div className="mb-8 flex flex-col gap-6">
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setAppA(null);
                  setAppB(null);
                }}
                className="text-xs text-chalk/40 underline hover:text-volt"
              >
                Start a new comparison
              </button>
            </div>
            <CompareSplit appA={appA} appB={appB} />
            {ourPick && ourPick.id !== appA.id && ourPick.id !== appB.id && (
              <OurPick app={ourPick} />
            )}
          </div>
        )}

        {!appA && (
          <p className="text-center text-sm text-chalk/30">
            Try searching "Instagram", "Notion", or "Spotify" to get started.
          </p>
        )}

        <footer className="mt-16 text-center text-xs text-chalk/20">
          Data fetched live from Google Play via google-play-scraper · Android apps only
        </footer>
      </div>
    </div>
  );
}
