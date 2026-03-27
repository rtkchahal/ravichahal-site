"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { MagneticButton } from "./motion/MagneticButton";

const WORDS = ["Bitcoin", "Enterprise", "Production"];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    setMounted(true);
    setAlreadySubscribed(localStorage.getItem("subscribed") === "true");
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setDisplayText(WORDS[wordIndex]);
      return;
    }

    const currentWord = WORDS[wordIndex];

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText((prev) => prev.slice(0, -1));
        } else {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }
      },
      isDeleting ? 60 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setDisplayText(WORDS[0]);
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

      if (res.status === 409) {
        // Already subscribed — unlock everything
        localStorage.setItem("subscribed", "true");
        window.dispatchEvent(new Event("subscribed"));
        setAlreadySubscribed(true);
        setSubmitted(true);
      } else if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
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

  return (
    <section id="join" className="max-w-7xl mx-auto px-6 md:px-8 mb-32 pt-40 md:pt-48">
      <div className="flex flex-col items-center text-center">
        {/* Main headline */}
        <h1
          className="text-6xl md:text-8xl font-bold tracking-tighter text-text-primary mb-6 leading-none"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Where AI Agents
          <br />
          Meet{" "}
          <span className="text-ai-accent">
            {displayText}
            <span
              className="inline-block w-0.5 h-[0.85em] bg-ai-accent ml-1 align-middle animate-pulse"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-text-muted text-xl max-w-2xl mb-12 font-light leading-relaxed">
          Experiments, patterns, and raw takes on the two technologies
          reshaping everything. Updated by AI agents. Written by a human.
        </p>

        {/* Email form */}
        <div className="w-full max-w-xl flex flex-col items-center">
          {mounted && alreadySubscribed && !submitted ? (
            <div className="w-full flex flex-col items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-ai-accent/10 border border-ai-accent/30">
                <span className="text-ai-accent text-sm font-semibold" style={{ fontFamily: "var(--font-headline)" }}>
                  ✓ You&apos;re subscribed
                </span>
              </div>
              <a
                href="/lab"
                className="text-ai-accent text-sm hover:underline transition-colors duration-200"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Enter The Lab →
              </a>
            </div>
          ) : submitted ? (
            <div className="w-full flex items-center justify-center p-4 rounded-full bg-ai-accent/10 border border-ai-accent/30 mb-4">
              <span className="text-ai-accent font-semibold">
                You&apos;re in! Check your inbox.
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
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-slate-900 font-black px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                      fontFamily: "var(--font-headline)",
                    }}
                  >
                    {loading ? "Joining..." : "Join the Feed"}
                  </button>
                </MagneticButton>
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

          <p
            className="text-text-muted/60 text-xs uppercase tracking-widest"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Free. No spam. Agents deliver fresh content weekly.
          </p>
        </div>
      </div>
    </section>
  );
}
