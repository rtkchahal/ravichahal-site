"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Check } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSubscribed(localStorage.getItem("subscribed") === "true");
    const handler = () =>
      setSubscribed(localStorage.getItem("subscribed") === "true");
    window.addEventListener("subscribed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("subscribed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,212,236,0.06)]">
      <div className="flex justify-between items-center px-6 md:px-8 h-20 w-full max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-white uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          RAVI CHAHAL
        </Link>

        <div
          className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-tight"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <Link href="/posts" className="text-text-muted hover:text-text-primary transition-colors duration-200">Latest</Link>
          <Link href="/lab" className="text-text-muted hover:text-text-primary transition-colors duration-200">The Lab</Link>
          <a href="/#about" className="text-text-muted hover:text-text-primary transition-colors duration-200">About</a>
          <Link href="/council" className="text-text-muted hover:text-text-primary transition-colors duration-200">Council</Link>
        </div>

        <div className="flex items-center gap-4">
          {mounted && subscribed ? (
            <Link
              href="/lab"
              className="flex items-center gap-2 text-ai-accent font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wide border border-ai-accent/30 transition-all duration-200 hover:bg-ai-accent/10"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              <Check className="w-4 h-4" />
              Subscribed
            </Link>
          ) : (
            <a
              href="/#join"
              className="text-slate-900 font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wide transition-all duration-200 active:scale-90 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                fontFamily: "var(--font-headline)",
              }}
            >
              Join the Feed
            </a>
          )}

          <button
            className="md:hidden text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl" style={{ fontFamily: "var(--font-headline)" }}>
          <div className="flex flex-col px-6 py-4 space-y-1">
            <Link href="/posts" onClick={() => setMenuOpen(false)} className="py-3 text-sm uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-200 border-b border-white/5">Latest</Link>
            <Link href="/lab" onClick={() => setMenuOpen(false)} className="py-3 text-sm uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-200 border-b border-white/5">The Lab</Link>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="py-3 text-sm uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-200 border-b border-white/5">About</a>
            <Link href="/council" onClick={() => setMenuOpen(false)} className="py-3 text-sm uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-200">Council</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
