import { Bot, Bitcoin } from "lucide-react";

export default function Pillars() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-32 grid md:grid-cols-2 gap-8">
      {/* AI Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-10 group hover:shadow-[0_0_40px_rgba(0,212,236,0.06)] hover:bg-surface-high/30 transition-all duration-500 cursor-default">
        <div className="mb-6 flex items-center justify-between">
          <Bot className="w-10 h-10 text-ai-accent" strokeWidth={1.5} />
          <span
            className="text-xs uppercase tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity duration-300"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            0x01
          </span>
        </div>
        <h3
          className="text-3xl font-bold text-ai-accent mb-4 uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Agentic AI
        </h3>
        <p className="text-text-muted text-lg leading-relaxed">
          Production agent systems with LangGraph, Claude Code, and OpenClaw.
          Architecture for the autonomous future.
        </p>
      </div>

      {/* Bitcoin Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-10 group hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:bg-surface-high/30 transition-all duration-500 cursor-default">
        <div className="mb-6 flex items-center justify-between">
          <Bitcoin className="w-10 h-10 text-btc-accent" strokeWidth={1.5} />
          <span
            className="text-xs uppercase tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity duration-300"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            0x02
          </span>
        </div>
        <h3
          className="text-3xl font-bold text-btc-accent mb-4 uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Bitcoin
        </h3>
        <p className="text-text-muted text-lg leading-relaxed">
          Sound money, Lightning network, self-custody protocols, and
          macro-economic shifts. Freedom by code.
        </p>
      </div>
    </section>
  );
}
