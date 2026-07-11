import type { PlayApp } from "../types/app";
import { getAlternatives } from "../lib/alternatives";

export function AlternativesChips({
  app,
  onPick,
}: {
  app: PlayApp;
  onPick: (app: PlayApp) => void;
}) {
  const alts = getAlternatives(app);

  if (alts.length === 0) {
    return <p className="text-sm text-chalk/40">No alternatives found in the same category yet.</p>;
  }

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-wide text-chalk/40">
        Alternatives to {app.name}
      </p>
      <div className="flex flex-wrap gap-2">
        {alts.map(({ app: alt, reason }) => (
          <button
            key={alt.id}
            onClick={() => onPick(alt)}
            title={reason}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-chalk/80 transition hover:border-volt hover:text-volt"
          >
            <img src={alt.icon} alt="" className="h-5 w-5 rounded" />
            {alt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
