import type { PlayApp } from "../types/app";
import { buildComparison } from "../lib/compare";

function AppHeader({ app, align }: { app: PlayApp; align: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <img src={app.icon} alt="" className="h-14 w-14 rounded-2xl shadow-sm" />
      <div>
        <h2 className="font-serif text-xl font-medium text-neutral-900">{app.name}</h2>
        <span className="inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs uppercase tracking-wide text-neutral-500">
          {app.category}
        </span>
      </div>
    </div>
  );
}

export function CompareSplit({ appA, appB }: { appA: PlayApp; appB: PlayApp }) {
  const rows = buildComparison(appA, appB);

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-neutral-200 p-6">
        <AppHeader app={appA} align="left" />
        <span className="rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-white">
          VS
        </span>
        <AppHeader app={appB} align="right" />
      </div>

      <div className="divide-y divide-neutral-100">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
            <div className={`text-sm ${row.winner === "A" ? "font-semibold text-neutral-900" : "text-neutral-600"}`}>
              {row.winner === "A" && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-terracotta" />}
              {row.valueA}
            </div>
            <div className="text-xs uppercase tracking-wide text-neutral-400">{row.label}</div>
            <div
              className={`text-right text-sm ${row.winner === "B" ? "font-semibold text-neutral-900" : "text-neutral-600"}`}
            >
              {row.valueB}
              {row.winner === "B" && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-terracotta" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
