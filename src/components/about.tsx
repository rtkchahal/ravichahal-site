import Image from "next/image";
import { Link2, Code2, Mail } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 md:px-8 mb-32">
      <div className="bg-surface/60 backdrop-blur-xl border border-white/5 rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-12">
        {/* Profile photo */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 ring-4 ring-surface-high/40 shadow-2xl">
            <Image
              src="/images/ravi.png"
              alt="Professional portrait of Ravi Chahal"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2
            className="text-4xl font-bold text-text-primary mb-6 uppercase"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            About Ravi
          </h2>
          <p
            className="text-text-muted text-xl leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            I am Ravi. I build AI agents by day and study{" "}
            <span className="text-btc-accent font-bold">Bitcoin</span> by
            conviction. This is my public notebook—a synthesis of engineering
            and monetary theory.
          </p>

          {/* Social icons */}
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/ravichahal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-ai-accent transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Link2 className="w-6 h-6" strokeWidth={1.5} />
            </a>
            <a
              href="https://github.com/rtkchahal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-ai-accent transition-colors duration-200"
              aria-label="GitHub"
            >
              <Code2 className="w-6 h-6" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:ravi4chahal@gmail.com"
              className="text-text-muted hover:text-ai-accent transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
