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
      className="btn-install inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[0.65rem] sm:text-[0.75rem] font-semibold tracking-[0.1em] text-chalk/90 bg-white/10 border border-white/10 shadow-[0_6px_16px_rgba(204,255,51,0.12)] transition duration-200 hover:bg-white/15 hover:shadow-[0_8px_20px_rgba(204,255,51,0.18)]"
    >
      <span className="material-symbols-outlined mr-1 text-[1rem] leading-none text-chalk/70">download</span>
      Install
    </a>
  );
}

function AppHeader({ app, align }: { app: PlayApp; align: "left" | "right" }) {
  const category = app.category as string;
  return (
    <div className={`flex items-start gap-2 sm:gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <img
        src={app.icon}
        alt=""
        className="h-10 sm:h-14 w-10 sm:w-14 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
      />
      <div className="min-w-0">
        <h2 className="font-display kinetic text-sm sm:text-xl font-semibold text-chalk">{app.name}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-[0.65rem] sm:text-xs uppercase tracking-wide text-chalk/50">
            {category}
          </span>
          <InstallButton app={app} />
        </div>
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
      <div className="panel-emboss ancient-scroll-panel overflow-hidden rounded-3xl border border-white/5 z-[1]">
        <div className="grid grid-cols-3 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 border-b border-white/5 p-3 sm:p-6">
          <AppHeader app={appA} align="left" />
          <span className="badge-gloss rounded-full px-2 sm:px-4 py-1 sm:py-1.5 font-display text-xs sm:text-sm md:text-base font-bold text-ink leading-tight">
            V / S
          </span>
          <AppHeader app={appB} align="right" />
        </div>

        <div className="divide-y divide-white/5">
          {rows.map((row, index) => (
            <div
              key={row.label}
              className="row-animate grid grid-cols-3 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4"
              style={{ animationDelay: `${1.3 + index * 0.16}s` }}
            >
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
