"use client";

import { useState, useEffect, FormEvent } from "react";

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] bg-slate-900/80 backdrop-blur-xl border-b border-white/10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Site name */}
        <span
          className="text-sm font-bold tracking-widest uppercase text-text-primary hidden sm:block flex-shrink-0"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          RAVI CHAHAL
        </span>

        {/* Compact email form */}
        {submitted ? (
          <div className="flex-1 max-w-md flex items-center justify-center">
            <span className="text-ai-accent text-sm font-semibold">
              You&apos;re in! Check your inbox.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 max-w-md flex p-1 rounded-full bg-surface border border-surface-high/50 focus-within:ring-2 focus-within:ring-ai-accent/20 transition-all duration-200"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-4 py-1.5 text-sm text-text-primary placeholder:text-text-muted/50"
              style={{ fontFamily: "var(--font-body)" }}
              required
            />
            <button
              type="submit"
              className="text-slate-900 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                fontFamily: "var(--font-headline)",
              }}
            >
              Join the Feed
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
