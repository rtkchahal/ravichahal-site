import Link from "next/link";
import { Lock } from "lucide-react";
import { LAB_EXPERIMENTS } from "@/lib/data";

function statusStyles(status: string) {
  switch (status) {
    case "active":
      return "bg-ai-accent/10 text-ai-accent";
    case "completed":
      return "bg-green-500/10 text-green-400";
    case "paused":
      return "bg-btc-accent/10 text-btc-accent";
    default:
      return "bg-surface-high text-text-muted";
  }
}

export default function TheLab() {
  return (
    <section id="the-lab" className="max-w-7xl mx-auto px-6 md:px-8 mb-32">
      {/* Section header */}
      <div className="flex flex-col mb-16">
        <div className="flex items-center gap-4 mb-4">
          <h2
            className="text-5xl font-bold tracking-tighter text-text-primary uppercase"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            The Lab
          </h2>
          <Lock className="w-8 h-8 text-btc-accent" strokeWidth={1.5} />
        </div>
        <p
          className="text-text-muted text-lg max-w-xl leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Subscriber-only experiments. Access raw code, architectural diagrams,
          and failed prototypes from the edge.
        </p>
      </div>

      {/* Experiment cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LAB_EXPERIMENTS.map((experiment) => (
          <div
            key={experiment.id}
            className="relative group overflow-hidden rounded-2xl"
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-surface-high/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 group-hover:bg-surface-high/60 transition-all duration-300">
              <Lock className="w-10 h-10 text-text-primary mb-4" strokeWidth={1.5} />
              <p
                className="text-xs uppercase tracking-widest text-text-primary/60"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Locked Experiment
              </p>
            </div>

            {/* Card body */}
            <div className="p-10 border border-white/5 h-64 flex flex-col justify-end bg-surface/60">
              <div className="flex justify-between items-center">
                <h5
                  className="font-bold text-xl text-text-primary"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {experiment.title}
                </h5>
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded uppercase ${statusStyles(experiment.status)}`}
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {experiment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/lab"
          className="inline-block px-8 py-4 rounded-full border border-btc-accent text-btc-accent font-bold uppercase tracking-widest text-sm hover:bg-btc-accent hover:text-slate-900 transition-all duration-200 cursor-pointer"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Subscribe to unlock The Lab
        </Link>
      </div>
    </section>
  );
}
