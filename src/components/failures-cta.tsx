import Link from "next/link";
import { Flame } from "lucide-react";
import { RevealSection } from "@/components/motion/RevealSection";

export default function FailuresCTA() {
  return (
    <section className="px-6 md:px-8 py-16 max-w-screen-2xl mx-auto">
      <RevealSection>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-surface rounded-2xl p-8 md:p-12 border border-white/5 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,212,236,0.06)]">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <Flame className="w-6 h-6 text-ai-accent flex-shrink-0" />
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary leading-tight"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Agent Failure Friday
              </h2>
            </div>
            <p
              className="text-text-muted text-lg mb-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Real enterprise AI failures. Anonymized. Analyzed. Weekly.
            </p>
            <p
              className="text-sm"
              style={{ color: "rgba(148,163,184,0.6)", fontFamily: "var(--font-body)" }}
            >
              One email per week. No spam.
            </p>
          </div>

          {/* Right */}
          <div className="flex-shrink-0">
            <Link
              href="/failures"
              className="inline-flex items-center gap-2 text-slate-900 font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] active:scale-95 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                fontFamily: "var(--font-headline)",
              }}
            >
              Get the First Issue →
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
