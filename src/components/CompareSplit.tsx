import type { PlayApp } from "../types/app";
import { buildComparison } from "../lib/compare";

function AppHeader({ app, align }: { app: PlayApp; align: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <img
        src={app.icon}
        alt=""
        className="h-14 w-14 rounded-2xl shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
      />
      <div>
        <h2 className="font-display kinetic text-xl font-semibold text-chalk">{app.name}</h2>
        <span className="inline-block rounded-full bg-white/5 px-2 py-0.5 text-xs uppercase tracking-wide text-chalk/50">
          {app.category}
        </span>
      </div>
    </div>
  );
}

export function CompareSplit({ appA, appB }: { appA: PlayApp; appB: PlayApp }) {
  const rows = buildComparison(appA, appB);

  return (
    <div className="panel-emboss overflow-hidden rounded-3xl border border-white/5">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-white/5 p-6">
        <AppHeader app={appA} align="left" />
        <span className="badge-gloss kinetic rounded-full px-4 py-1.5 font-display text-xs font-bold text-ink">
          {"VS".split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.4}s` }}>{c}</span>
          ))}
        </span>
        <AppHeader app={appB} align="right" />
      </div>

      <div className="divide-y divide-white/5">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
            <div className={`text-sm ${row.winner === "A" ? "font-semibold text-volt" : "text-chalk/60"}`}>
              {row.winner === "A" && (
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-volt shadow-[0_0_8px_var(--color-volt)]" />
              )}
              {row.valueA}
            </div>
            <div className="text-xs uppercase tracking-wide text-chalk/30">{row.label}</div>
            <div
              className={`text-right text-sm ${row.winner === "B" ? "font-semibold text-volt" : "text-chalk/60"}`}
            >
              {row.valueB}
              {row.winner === "B" && (
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-volt shadow-[0_0_8px_var(--color-volt)]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
