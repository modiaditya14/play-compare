import type { PlayApp } from "../types/app";
import { buildComparison } from "../lib/compare";
import { FeaturesComparison } from "./FeaturesComparison";

function playStoreUrl(app: PlayApp): string {
  return `https://play.google.com/store/apps/details?id=${app.id}`;
}

function InstallButton({ app }: { app: PlayApp }) {
  return (
    <a
      href={playStoreUrl(app)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-install"
    >
      Install
    </a>
  );
}

function AppHeader({ app, align }: { app: PlayApp; align: "left" | "right" }) {
  const category = app.category as string;
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <img
        src={app.icon}
        alt=""
        className="h-10 sm:h-14 w-10 sm:w-14 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
      />
      {/* <InstallButton app={app} /> */}
      <div className="min-w-0">
        <h2 className="font-display kinetic text-sm sm:text-xl font-semibold text-chalk truncate">{app.name}</h2>
        <span className="inline-block rounded-full bg-white/5 px-2 py-0.5 text-[0.65rem] sm:text-xs uppercase tracking-wide text-chalk/50">
          {category}

        </span>
      </div>

    </div>
  );
}

export function CompareSplit({ appA, appB }: { appA: PlayApp; appB: PlayApp }) {
  const rows = buildComparison(appA, appB);
  const hasFeatures = true;
  // "features" in appA || "features" in appB
  return (
    <>
      <div className="panel-emboss overflow-hidden rounded-3xl border border-white/5">
        <div className="grid grid-cols-3 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 border-b border-white/5 p-3 sm:p-6">
          <AppHeader app={appA} align="left" />
          <span className="badge-gloss kinetic rounded-full px-2 sm:px-4 py-1 sm:py-1.5 font-display text-xs sm:text-sm md:text-base font-bold text-ink leading-tight">
            {"VS".split("").map((c, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.4}s` }}>{c}</span>
            ))}
          </span>
          <AppHeader app={appB} align="right" />
        </div>

        <div className="divide-y divide-white/5">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-3 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4">
              <div className={`text-xs sm:text-sm ${row.winner === "A" ? "font-semibold text-volt" : "text-chalk/60"}`}>
                {row.winner === "A" && (
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-volt shadow-[0_0_8px_var(--color-volt)]" />
                )}
                {row.valueA}
              </div>
              <div className="text-[0.7rem] sm:text-[0.85rem] uppercase tracking-wide text-chalk/80 font-semibold text-center">{row.label}</div>
              <div
                className={`text-right text-xs sm:text-sm ${row.winner === "B" ? "font-semibold text-volt" : "text-chalk/60"}`}
              >
                {row.valueB}
                {row.winner === "B" && (
                  <span className="ml-2 inline-block h-2 w-2 rounded-full bg-volt shadow-[0_0_8px_var(--color-volt)]" />
                )}
              </div>
            </div>
          ))}
          {hasFeatures && <FeaturesComparison appA={appA} appB={appB} />}
        </div>

      </div>

    </>
  );
}
