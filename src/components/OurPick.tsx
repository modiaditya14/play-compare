import type { PlayApp } from "../types/app";

export function OurPick({ app }: { app: PlayApp }) {
  return (
    <div className="panel-emboss relative overflow-hidden rounded-3xl border border-white/5 p-6">
      <div className="badge-gloss absolute -right-[-6] -top-6 flex h-12 w-24 rotate-[-30] items-center justify-center rounded-full text-[15px] font-bold uppercase tracking-wide text-ink">
        <span className="kinetic rotate-[-10deg] text-l">
          Our<br />Pick
        </span>
      </div>

      <p className=" mb-4 font-display text-s font-semibold uppercase tracking-[0.3em] text-volt">
        {"editor's pick".split("").map((c, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.02}s` }}>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </p>

      <div className="flex items-center gap-4">
        <img
          src={app.icon}
          alt=""
          className="h-16 w-16 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
        />
        <div>
          <h3 className="font-display text-2xl font-semibold text-chalk">{app.name}</h3>
          <p className="text-sm text-chalk/50">
            {app.rating?.toFixed(1)} rating · {app.reviews.toLocaleString()} reviews
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-chalk/70">
        Highest-scoring app in {app.category} once we weigh rating against review volume —
        loved by a lot of people, not just a few.
      </p>
    </div>
  );
}
