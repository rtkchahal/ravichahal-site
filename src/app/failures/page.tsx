"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  GitBranch,
  Shield,
  Lock,
  Mail,
} from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { RevealSection } from "@/components/motion/RevealSection";
import { StaggerGrid } from "@/components/motion/StaggerGrid";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const BENEFITS = [
  {
    icon: FileText,
    title: "Weekly Case Study",
    description:
      "One real enterprise AI failure, fully anonymized. The stack, the team size, the cost — all included. No vague hand-waving.",
  },
  {
    icon: GitBranch,
    title: "Root Cause Analysis",
    description:
      "What actually went wrong beneath the surface. Architectural anti-patterns, prompt failures, orchestration breakdowns — traced to the source.",
  },
  {
    icon: Shield,
    title: "Prevention Playbook",
    description:
      "Concrete fixes you can apply this week. Guardrail designs, eval frameworks, and the architectural changes that would have stopped it.",
  },
];

export default function FailuresPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("subscribed") === "true") {
      setSubmitted(true);
    }
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
        if (res.status === 409) {
          localStorage.setItem("subscribed", "true");
          window.dispatchEvent(new Event("subscribed"));
          setSubmitted(true);
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
      } else {
        localStorage.setItem("subscribed", "true");
        window.dispatchEvent(new Event("subscribed"));
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-40 md:pt-48 mb-32">

          {/* Back link */}
          <RevealSection>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 text-sm uppercase tracking-widest mb-16 group"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
                strokeWidth={2}
              />
              Home
            </Link>
          </RevealSection>

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <RevealSection delay={0.05}>
            <div className="mb-24">
              <p
                className="text-xs uppercase tracking-[0.2em] text-ai-accent mb-6"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Newsletter
              </p>

              <h1
                className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary uppercase leading-[1.0] mb-8"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Agent Failure
                <br />
                <span className="text-ai-accent">Friday</span>
              </h1>

              <p
                className="text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Real enterprise AI failures.{" "}
                <span className="text-text-primary">Anonymized.</span>{" "}
                <span className="text-text-primary">Analyzed.</span> So you
                don&apos;t repeat them.
              </p>
            </div>
          </RevealSection>

          {/* ── What you'll get ───────────────────────────────────────────── */}
          <RevealSection delay={0.1}>
            <p
              className="text-xs uppercase tracking-[0.2em] text-text-muted mb-8"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              What you&apos;ll get
            </p>
          </RevealSection>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <TiltCard
                key={title}
                className="rounded-2xl border border-white/5 bg-surface/60 p-8 flex flex-col gap-5 hover:border-ai-accent/20 hover:shadow-[0_0_40px_rgba(0,212,236,0.07)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-ai-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-ai-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg text-text-primary mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-text-muted text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </StaggerGrid>

          {/* ── Email capture ─────────────────────────────────────────────── */}
          <RevealSection delay={0.05}>
            <div className="rounded-3xl border border-white/5 bg-surface/40 p-10 md:p-14 mb-16">
              {/* Social proof */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ai-accent/10 border border-ai-accent/20">
                  <Mail className="w-3.5 h-3.5 text-ai-accent" strokeWidth={2} />
                  <span
                    className="text-[11px] uppercase tracking-widest text-ai-accent font-bold"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    1,200+ readers getting smarter about AI failures
                  </span>
                </div>
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold tracking-tighter text-text-primary uppercase mb-4"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Get the First Issue
              </h2>
              <p
                className="text-text-muted mb-10 max-w-lg leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Every Friday, one failure. One root cause. One playbook. Free,
                forever. The first issue drops this week.
              </p>

              {submitted ? (
                <div className="w-full flex items-center justify-center p-4 rounded-full bg-ai-accent/10 border border-ai-accent/30">
                  <span
                    className="text-ai-accent font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    You&apos;re in. Check your inbox Friday.
                  </span>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:p-1 sm:rounded-full sm:bg-surface sm:border sm:border-surface-high/50 sm:shadow-2xl sm:focus-within:ring-2 sm:focus-within:ring-ai-accent/20 sm:transition-all sm:duration-200 mb-4"
                  >
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className="flex-1 bg-surface sm:bg-transparent border border-surface-high/50 sm:border-none outline-none rounded-full sm:rounded-none px-6 py-3.5 text-text-primary placeholder:text-text-muted/50 focus:ring-2 focus:ring-ai-accent/20 sm:focus:ring-0 transition-all duration-200"
                      style={{ fontFamily: "var(--font-body)" }}
                      required
                      disabled={loading}
                    />
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto text-slate-900 font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,212,236,0.45)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                        style={{
                          background:
                            "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                          fontFamily: "var(--font-headline)",
                        }}
                      >
                        {loading ? "Joining..." : "Get the First Issue"}
                      </button>
                    </MagneticButton>
                  </form>

                  {error && (
                    <p
                      className="text-error text-xs mb-3"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {error}
                    </p>
                  )}
                </>
              )}

              <p
                className="text-text-muted/50 text-xs mt-5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                No spam. One email per week. Unsubscribe anytime.
              </p>
            </div>
          </RevealSection>

          {/* ── Locked teaser card ───────────────────────────────────────── */}
          <RevealSection delay={0.1}>
            <p
              className="text-xs uppercase tracking-[0.2em] text-text-muted mb-8"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Sample issue
            </p>

            <div className="relative rounded-2xl overflow-hidden">
              {/* Card content (shown blurred) */}
              <div className="p-8 md:p-10 border border-white/5 bg-surface/60">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-widest text-ai-accent/60 block mb-2"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Issue #1 &mdash; Week of May 2, 2025
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-text-primary tracking-tighter"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      The $200K Hallucination
                    </h3>
                  </div>
                  <span
                    className="text-[10px] font-black px-2 py-1 rounded uppercase shrink-0 bg-btc-accent/10 text-btc-accent"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Finance
                  </span>
                </div>

                {/* Fake blurred body text */}
                <div className="space-y-3">
                  <p
                    className="text-text-muted text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    A Series B fintech deployed a contract-review agent across
                    their underwriting pipeline. The agent was tasked with
                    flagging non-standard clauses and summarizing liability
                    exposure for each deal.
                  </p>
                  <p
                    className="text-text-muted text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    For eleven days, it confidently cited clauses that did not
                    exist. Reviewers, trusting the summaries, approved seven
                    contracts. Total exposure: $200K in renegotiation costs and
                    one deal unwound entirely.
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p
                      className="text-[10px] uppercase tracking-widest text-text-muted/40 mb-3"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Root Cause
                    </p>
                    <p
                      className="text-text-muted text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      No grounding step. The model was retrieving clause text
                      from memory rather than the document corpus. A retrieval
                      confidence threshold of 0.0 meant every fabricated
                      citation passed the pipeline unchallenged.
                    </p>
                  </div>
                </div>
              </div>

              {/* Blur overlay */}
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-white/10 flex items-center justify-center">
                  <Lock
                    className="w-6 h-6 text-text-primary/50"
                    strokeWidth={1.5}
                  />
                </div>
                <p
                  className="text-xs uppercase tracking-widest text-text-primary/40"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Subscribe to unlock
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
