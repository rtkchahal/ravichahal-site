import Link from "next/link";
import { LayoutList, ArrowRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Columns | Ravi Chahal",
  description: "Named series covering AI agents, Bitcoin, and the infrastructure that connects them.",
};

interface Column {
  name: string;
  description: string;
  status: "Active" | "Coming Soon";
  path: string;
  tag: "ai" | "btc" | "both";
}

const COLUMNS: Column[] = [
  {
    name: "Agent Failure Friday",
    description:
      "Weekly forensic breakdowns of real enterprise AI failures. What went wrong, why it went wrong, and what it costs when it does.",
    status: "Coming Soon",
    path: "/failures",
    tag: "ai",
  },
  {
    name: "R&D Council",
    description:
      "AI agents debate content strategy and research directions. Four agents, one editorial voice — watch the reasoning live.",
    status: "Active",
    path: "/council",
    tag: "ai",
  },
  {
    name: "The Lab",
    description:
      "Subscriber-only experiments with raw data, architectural decisions, and half-formed ideas worth shipping anyway.",
    status: "Active",
    path: "/lab",
    tag: "both",
  },
  {
    name: "Deep Dives",
    description:
      "Long-form technical posts on AI agents and Bitcoin. No hot takes — just the architecture and the reasoning behind it.",
    status: "Active",
    path: "/posts",
    tag: "both",
  },
];

export default function ColumnsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-ai-accent transition-colors duration-200 mb-10 text-sm uppercase tracking-widest"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            Back
          </Link>

          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <LayoutList className="w-8 h-8 text-ai-accent" strokeWidth={1.5} />
              <h1
                className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Columns
              </h1>
            </div>
            <p
              className="text-text-muted text-lg max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Named series covering AI agents, Bitcoin, and the infrastructure
              that connects them. Each column has a focus, a format, and a reason
              to exist.
            </p>
          </div>

          {/* Column cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COLUMNS.map((col) => (
              <Link
                key={col.name}
                href={col.path}
                className="group block"
                aria-label={`Go to ${col.name}`}
              >
                <div className="bg-surface/60 border border-white/5 rounded-2xl p-8 h-full hover:bg-surface-high/40 hover:border-white/10 transition-all duration-200">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full ${
                        col.status === "Active"
                          ? "bg-ai-accent/10 text-ai-accent"
                          : "bg-surface-high text-text-muted"
                      }`}
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      {col.status}
                    </span>

                    {/* Tag pills */}
                    <div className="flex items-center gap-1.5">
                      {(col.tag === "ai" || col.tag === "both") && (
                        <span
                          className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-ai-accent/10 text-ai-accent/70"
                          style={{ fontFamily: "var(--font-headline)" }}
                        >
                          AI
                        </span>
                      )}
                      {(col.tag === "btc" || col.tag === "both") && (
                        <span
                          className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-btc-accent/10 text-btc-accent/70"
                          style={{ fontFamily: "var(--font-headline)" }}
                        >
                          BTC
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h2
                    className="text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-ai-accent transition-colors duration-200"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {col.name}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-text-muted text-sm leading-relaxed mb-6 opacity-80"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {col.description}
                  </p>

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-text-muted group-hover:text-ai-accent transition-colors duration-200"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {col.status === "Coming Soon" ? "Get Notified" : "View"}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
