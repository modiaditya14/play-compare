import type { PlayApp } from "../types/app";

export function OurPick({ app }: { app: PlayApp }) {
  return (
    <div className="panel-emboss relative overflow-hidden rounded-3xl border border-white/5 p-4 sm:p-6">
      <div className="badge-gloss-gold absolute -right-[-6] -top-6 flex h-10 sm:h-12 w-20 sm:w-24 rotate-[-30] items-center justify-center rounded-full text-xs sm:text-[15px] font-bold uppercase tracking-wide text-ink">
        <span className="kinetic rotate-[-10deg]">
          Our<br />Pick
        </span>
      </div>

      <p className="mb-3 sm:mb-4 font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold">
        {"editor's pick".split("").map((c, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.02}s` }}>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </p>

      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={app.icon}
          alt=""
          className="h-12 sm:h-16 w-12 sm:w-16 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
        />
        <div className="min-w-0">
          <h3 className="font-display text-lg sm:text-2xl font-semibold text-chalk truncate">{app.name}</h3>
          <p className="text-xs sm:text-sm text-chalk/50 truncate">
            {app.rating?.toFixed(1)} rating · {app.reviews.toLocaleString()} reviews
          </p>
        </div>
      </div>

      <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-chalk/70">
        Highest-scoring app in {app.category} once we weigh rating against review volume —
        loved by a lot of people, not just a few.
      </p>
    </div>
  );
}
