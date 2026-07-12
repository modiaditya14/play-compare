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

  const ourPick = appA && appB ? getOurPick(appA, appB) : null;

  return (
    <div className="min-h-screen bg-ink px-6 py-12 tilted-dot-grid">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-5xl font-bold text-chalk flex items-center justify-center gap-4">
            <Kinetic text="Tarazoo" />
            <svg xmlns="http://w3.org" viewBox="0 0 100 100" width="10%" height="10%">
              <rect width="100" height="100" fill="#0B132B" rx="8" />

              <path d="M35,90 L65,90 L60,85 L40,85 Z" fill="#FFFFFF" />
              <rect x="47" y="30" width="6" height="55" rx="2" fill="#E0FBFC" />
              <circle cx="50" cy="27" r="5" fill="#00B4D8" />

              <path d="M15,32 Q50,22 85,32 L85,28 Q50,18 15,28 Z" fill="#FFD700" />
              <circle cx="50" cy="25" r="2.5" fill="#0B132B" />
              <circle cx="16" cy="30" r="2" fill="#FF9F1C" />
              <circle cx="84" cy="30" r="2" fill="#FF9F1C" />

              <line x1="16" y1="30" x2="6" y2="55" stroke="#00F5D4" stroke-width="1.2" />
              <line x1="16" y1="30" x2="26" y2="55" stroke="#00F5D4" stroke-width="1.2" />
              <path d="M4,55 Q16,63 28,55 Z" fill="#E2E8F0" />
              <path d="M4,55 L28,55 L26,57 L6,57 Z" fill="#94A3B8" />

              <line x1="84" y1="30" x2="74" y2="55" stroke="#00F5D4" stroke-width="1.2" />
              <line x1="84" y1="30" x2="94" y2="55" stroke="#00F5D4" stroke-width="1.2" />
              <path d="M72,55 Q84,63 96,55 Z" fill="#E2E8F0" />
              <path d="M72,55 L96,55 L94,57 L74,57 Z" fill="#94A3B8" />
            </svg>

          </h1>


          <p className="mt-3 text-sm text-chalk/50">
            Compare apps side-by-side. Kiska palda bhari?

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
            {ourPick && (
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
