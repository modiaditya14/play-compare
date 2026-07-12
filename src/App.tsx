import { useEffect, useState } from "react";
import type { PlayApp } from "./types/app";
import { getAppBySlug } from "./lib/apps";
import { getOurPick } from "./lib/ourPick";
import { SearchBar } from "./components/SearchBar";
import { AlternativesChips } from "./components/AlternativesChips";
import { CompareSplit } from "./components/CompareSplit";
import { OurPick } from "./components/OurPick";

type HomeSuggestion = {
  label: string;
  a: string;
  b: string;
};

const homeSuggestions: HomeSuggestion[] = [
  { label: "Spotify vs YouTube Music", a: "spotify-music-and-podcasts", b: "youtube-music" },
  { label: "Amazon vs Flipkart", a: "amazon-shopping", b: "flipkart-online-shopping-app" },
  { label: "Photoshop vs PicsArt", a: "photoshop-express-photo-editor", b: "picsart-ai-photo-editor-video" },
  { label: "Netflix vs Prime Video", a: "netflix", b: "prime-video" },
  { label: "WhatsApp vs Telegram", a: "whatsapp-messenger", b: "telegram" },
];

function Kinetic({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`kinetic ${className ?? ""}`}>
      {text.split("").map((c, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
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
    <div className="min-h-screen bg-ink px-3 sm:px-6 md:px-8 py-8 sm:py-12 tilted-dot-grid">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 sm:mb-10 text-center cursor-pointer transition-opacity duration-500 hover:opacity-80 animate-fade-up" onClick={() => window.location.href = window.location.pathname}>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-chalk flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <Kinetic text="Tarazoo" />
            <span className="kinetic logo-bloom animate-float inline-flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-[1.35em] w-[1.35em] shrink-0 sm:h-[1.5em] sm:w-[1.5em]">
                <g className="fill-none stroke-amber-400 stroke-[40px] stroke-linecap-round stroke-linejoin-round">
                  <path d="M 150 450 L 362 450" />
                  <path d="M 180 430 L 332 430" />
                  <path d="M 256 430 L 256 160" />
                  <circle cx="256" cy="160" r="16" className="fill-amber-400" />
                  <circle cx="256" cy="115" r="12" />
                </g>
                <g className="fill-none stroke-amber-400 stroke-[40px] stroke-linecap-round stroke-linejoin-round" transform="rotate(15 256 160)">
                  <path d="M 100 160 L 412 160" />
                  <g>
                    <path d="M 100 160 L 60 260 L 140 260 Z" />
                    <path d="M 50 260 C 50 310, 150 310, 150 260 Z" />
                  </g>
                  <g>
                    <path d="M 412 160 L 372 260 L 452 260 Z" />
                    <path d="M 362 260 C 362 310, 462 310, 462 260 Z" />
                  </g>
                </g>
              </svg>
            </span>
          </h1>



          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-chalk/50 animate-fade-up">
            Compare apps side-by-side. Kiska palda bhari?
          </p>
        </header>

        <div className="mb-6 sm:mb-8 flex justify-center animate-fade-up">
          <SearchBar
            onSelect={(app) => {
              setAppA(app);
              setAppB(null);
            }}
          />
        </div>

        {appA && !appB && (
          <div className="mb-6 sm:mb-8 animate-fade-up">
            <AlternativesChips app={appA} onPick={setAppB} />
          </div>
        )}

        {appA && appB && (
          <div className="mb-8 flex flex-col gap-6 ">
            <div className="flex justify-center animate-fade-up">
              <button
                onClick={() => {
                  setAppA(null);
                  setAppB(null);
                }}
                className="text-s text-chalk/40 underline hover:text-volt"
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
          <>
            <p className="animate-fade-up text-center text-sm text-chalk/60">
              Try searching "Instagram", "Notion", or "Spotify" to get started.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-up">
              {homeSuggestions.map(({ label, a, b }) => {
                const appAOption = getAppBySlug(a);
                const appBOption = getAppBySlug(b);

                if (!appAOption || !appBOption) {
                  return null;
                }

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setAppA(appAOption);
                      setAppB(appBOption);
                    }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-chalk/70 transition hover:border-volt hover:bg-white/10 hover:text-chalk"
                  >
                    <img src={appAOption.icon} alt="" className="h-6 w-6 rounded-xl" />
                    <span className="text-[0.7rem] tracking-[0.18em] leading-none">{label}</span>
                    <img src={appBOption.icon} alt="" className="h-6 w-6 rounded-xl" />
                  </button>
                );
              })}
            </div>
          </>
        )}

        <footer className="mt-12 sm:mt-16 animate-fade-up text-center text-xs text-chalk/20">
          Data fetched live from Google Play via google-play-scraper · Android apps only · Aditya Modi
        </footer>
      </div>
    </div>
  );
}
