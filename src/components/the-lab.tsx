"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, FlaskConical } from "lucide-react";
import { LAB_EXPERIMENTS } from "@/lib/data";

function statusStyles(status: string) {
  switch (status) {
    case "active":
      return "bg-ai-accent/10 text-ai-accent";
    case "completed":
      return "bg-green-500/10 text-green-400";
    default:
      return "bg-btc-accent/10 text-btc-accent";
  }
}

export default function TheLab() {
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSubscribed(localStorage.getItem("subscribed") === "true");

    // Listen for storage changes (from other components on same page)
    const handler = () => {
      setSubscribed(localStorage.getItem("subscribed") === "true");
    };
    window.addEventListener("storage", handler);
    window.addEventListener("subscribed", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("subscribed", handler);
    };
  }, []);

  return (
    <section id="the-lab" className="max-w-7xl mx-auto px-6 md:px-8 mb-32">
      <div className="flex flex-col mb-16">
        <div className="flex items-center gap-4 mb-4">
          <h2
            className="text-5xl font-bold tracking-tighter text-text-primary uppercase"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            The Lab
          </h2>
          <Lock className="w-8 h-8 text-btc-accent" />
        </div>
        <p
          className="text-text-muted text-lg max-w-xl leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Subscriber-only experiments. Access raw data, architectural decisions, and results from the edge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LAB_EXPERIMENTS.map((exp) => (
          <div key={exp.id} className="relative group overflow-hidden rounded-2xl">
            {/* Hover overlay for subscribed users */}
            {mounted && subscribed && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-ai-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <FlaskConical className="w-10 h-10 text-ai-accent mb-4" />
                <p
                  className="text-xs uppercase tracking-widest text-ai-accent"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  View Experiment
                </p>
              </div>
            )}
            <div className="p-10 border border-white/5 h-64 flex flex-col justify-end bg-surface/60">
              <div className="flex justify-between items-center mb-2">
                <h5
                  className="font-bold text-xl text-text-primary"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {exp.title}
                </h5>
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded uppercase ${statusStyles(exp.status)}`}
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {exp.status}
                </span>
              </div>
              {/* Subtle locked indicator for non-subscribers */}
              {mounted && !subscribed && (
                <p
                  className="text-[10px] uppercase tracking-widest text-text-muted/40 flex items-center gap-1 mt-1"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  <Lock className="w-2.5 h-2.5" strokeWidth={2} />
                  Subscribe for full access
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        {mounted && subscribed ? (
          <Link
            href="/lab"
            className="px-8 py-4 rounded-full bg-ai-accent text-slate-900 font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] transition-all duration-200 cursor-pointer inline-block"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Enter The Lab
          </Link>
        ) : (
          <Link
            href="/lab"
            className="px-8 py-4 rounded-full border border-btc-accent text-btc-accent font-bold uppercase tracking-widest text-sm hover:bg-btc-accent hover:text-slate-900 transition-all duration-200 cursor-pointer inline-block"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Subscribe to unlock The Lab
          </Link>
        )}
      </div>
    </section>
  );
}
