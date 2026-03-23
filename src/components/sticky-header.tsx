"use client";

import { useState, useEffect, FormEvent } from "react";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(localStorage.getItem("subscribed") === "true");
    const handler = () => setSubscribed(localStorage.getItem("subscribed") === "true");
    window.addEventListener("subscribed", handler);
    window.addEventListener("storage", handler);

    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("subscribed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Valid email required.");
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
        setError(data.error ?? "Something went wrong.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] bg-slate-900/80 backdrop-blur-xl border-b border-white/10 transition-transform duration-300 ${
        visible && !subscribed ? "translate-y-0" : "-translate-y-full"
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
          <div className="flex-1 max-w-md flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="flex p-1 rounded-full bg-surface border border-surface-high/50 focus-within:ring-2 focus-within:ring-ai-accent/20 transition-all duration-200"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="flex-1 bg-transparent border-none outline-none px-4 py-1.5 text-sm text-text-primary placeholder:text-text-muted/50"
                style={{ fontFamily: "var(--font-body)" }}
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="text-slate-900 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                  fontFamily: "var(--font-headline)",
                }}
              >
                {loading ? "..." : "Join"}
              </button>
            </form>
            {error && (
              <p
                className="text-error text-[10px] mt-1 px-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
