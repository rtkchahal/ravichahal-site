"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Lock, Unlock, ExternalLink, ArrowLeft } from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const EXPERIMENTS = [
  {
    id: 1,
    title: "LinkedIn Visibility Sprint",
    status: "active" as const,
    week: "Week 2 of 4",
    description:
      "Testing whether a structured 4-week posting cadence — one AI post, one Bitcoin post, one personal take — meaningfully lifts profile impressions and newsletter subscribers. Tracking weekly deltas in a shared doc.",
    details:
      "Current results: +34% profile views in week 1. Hypothesis: consistent cross-topic posting creates a compound identity signal that rewards both audiences. Next metric to watch: subscriber conversion rate from LinkedIn traffic vs. direct.",
  },
  {
    id: 2,
    title: "Enterprise Agent Self-Learning Loop",
    status: "active" as const,
    description:
      "An agent that reviews its own past outputs, identifies recurring failure patterns, and rewrites its system prompt accordingly. No human intervention after the initial setup.",
    details:
      "Architecture: a reviewer agent scores each production run against a rubric, writes findings to a structured log, and a rewriter agent synthesizes the last 10 logs into a refined system prompt. Running on 30-iteration cycles. Currently on iteration 8. Initial quality score: 6.2/10. Current: 7.4/10.",
  },
  {
    id: 3,
    title: "R&D Council",
    status: "active" as const,
    description:
      "A multi-agent council that convenes weekly to evaluate content strategy, research directions, and site experiments. Each agent plays a distinct role: Strategist, Editor, Researcher, Devil's Advocate.",
    details:
      "Four sessions completed. The council has approved the production launch, greenlit halving coverage, and deferred the Lab expansion pending subscriber growth. View the full council log and latest memo for session transcripts.",
    link: "/council",
    linkLabel: "View Council Log",
  },
];

function statusLabel(status: string) {
  switch (status) {
    case "active":
      return { label: "Active", class: "bg-ai-accent/10 text-ai-accent" };
    case "completed":
      return { label: "Completed", class: "bg-green-500/10 text-green-400" };
    case "paused":
      return { label: "Paused", class: "bg-btc-accent/10 text-btc-accent" };
    default:
      return { label: status, class: "bg-surface-high text-text-muted" };
  }
}

export default function LabPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSubscribed(localStorage.getItem("subscribed") === "true");
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        // Even if already subscribed (409), we unlock locally
        if (res.status === 409) {
          localStorage.setItem("subscribed", "true");
          setSubscribed(true);
          setSubmitted(true);
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
      } else {
        localStorage.setItem("subscribed", "true");
        setSubscribed(true);
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <Nav />
        <main className="min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-8 pt-40 md:pt-48 mb-32" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-40 md:pt-48 mb-32">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 text-sm uppercase tracking-widest mb-12 group"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
              strokeWidth={2}
            />
            Home
          </Link>

          {/* Section header */}
          <div className="flex flex-col mb-16">
            <div className="flex items-center gap-4 mb-4">
              <h1
                className="text-5xl font-bold tracking-tighter text-text-primary uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                The Lab
              </h1>
              {subscribed ? (
                <Unlock className="w-7 h-7 text-ai-accent" strokeWidth={1.5} />
              ) : (
                <Lock className="w-7 h-7 text-btc-accent" strokeWidth={1.5} />
              )}
            </div>
            <p
              className="text-text-muted text-lg max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {subscribed
                ? "Full access unlocked. Here's what's running."
                : "Subscriber-only experiments. Subscribe to see the full details."}
            </p>
          </div>

          {/* Intro copy */}
          {!subscribed && (
            <div className="max-w-2xl mb-12">
              <p
                className="text-text-muted text-base leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The Lab is where I run real experiments at the intersection of
                AI agents and Bitcoin — not demos, not thought experiments, but
                live systems with hypotheses and tracked results. Each
                experiment documents what I&apos;m testing, what&apos;s
                working, and what isn&apos;t. Subscribers get full access to
                the raw data, architectural decisions, and iteration logs as
                they happen. Currently running 3 active experiments.
              </p>
            </div>
          )}

          {/* Experiment cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {EXPERIMENTS.map((experiment) => {
              const { label, class: badgeClass } = statusLabel(
                experiment.status
              );

              return (
                <div
                  key={experiment.id}
                  className="relative rounded-2xl overflow-hidden"
                >
                  {/* Card body */}
                  <div className="p-8 border border-white/5 bg-surface/60 h-full flex flex-col">
                    {/* Header row */}
                    <div className="flex justify-between items-start mb-4">
                      <h2
                        className="font-bold text-xl text-text-primary leading-tight pr-4"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {experiment.title}
                      </h2>
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded uppercase shrink-0 ${badgeClass}`}
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Week badge if applicable */}
                    {experiment.week && subscribed && (
                      <span
                        className="text-[10px] uppercase tracking-widest text-text-muted/60 mb-3 block"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {experiment.week}
                      </span>
                    )}

                    {/* Description */}
                    <p
                      className="text-text-muted text-sm leading-relaxed mb-4 flex-1"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {experiment.description}
                    </p>

                    {/* Details — always rendered, blurred when not subscribed */}
                    <div
                      className={`mt-2 pt-4 border-t border-white/5 relative ${
                        !subscribed ? "select-none" : ""
                      }`}
                    >
                      <p
                        className={`text-text-primary/70 text-sm leading-relaxed ${
                          !subscribed ? "blur-sm" : ""
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {experiment.details}
                      </p>
                      {!subscribed && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-[10px] uppercase tracking-widest text-text-muted/70 flex items-center gap-1.5"
                            style={{ fontFamily: "var(--font-headline)" }}
                          >
                            <Lock className="w-3 h-3" strokeWidth={2} />
                            Subscribe to unlock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Link if applicable */}
                    {subscribed && experiment.link && (
                      <Link
                        href={experiment.link}
                        className="inline-flex items-center gap-2 mt-4 text-ai-accent text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {experiment.linkLabel}
                        <ExternalLink className="w-3 h-3" strokeWidth={2} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Email signup CTA (only shown if not subscribed) */}
          {!subscribed && (
            <div className="max-w-xl mx-auto text-center">
              <h2
                className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-tight"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Unlock The Lab
              </h2>
              <p
                className="text-text-muted mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Free newsletter. Get full experiment details, raw code, and
                architectural write-ups. Delivered by agents, written by a
                human.
              </p>

              {submitted ? (
                <div className="w-full flex items-center justify-center p-4 rounded-full bg-ai-accent/10 border border-ai-accent/30">
                  <span className="text-ai-accent font-semibold">
                    You&apos;re in! Refreshing...
                  </span>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex p-1 rounded-full bg-surface border border-surface-high/50 shadow-2xl mb-4 focus-within:ring-2 focus-within:ring-ai-accent/20 transition-all duration-200"
                  >
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className="flex-1 bg-transparent border-none outline-none px-6 py-3 text-text-primary placeholder:text-text-muted/50"
                      style={{ fontFamily: "var(--font-body)" }}
                      required
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-slate-900 font-black px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                        fontFamily: "var(--font-headline)",
                      }}
                    >
                      {loading ? "Joining..." : "Unlock"}
                    </button>
                  </form>
                  {error && (
                    <p
                      className="text-error text-xs mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
