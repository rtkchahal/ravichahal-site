export default function Footer() {
  return (
    <footer className="bg-slate-950 w-full py-12 px-6 md:px-8">
      {/* Gradient divider */}
      <div className="bg-gradient-to-r from-transparent via-slate-800 to-transparent h-px mb-8 w-full max-w-screen-2xl mx-auto" />

      <div className="flex flex-col items-center justify-center space-y-4 w-full text-center">
        {/* Logo */}
        <div
          className="text-lg font-black text-text-primary tracking-widest uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          RAVI CHAHAL
        </div>

        {/* Social links */}
        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/in/ravichahal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-slate-500 hover:text-ai-accent transition-colors duration-200"
            style={{ fontFamily: "var(--font-body)" }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/rtkchahal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-slate-500 hover:text-ai-accent transition-colors duration-200"
            style={{ fontFamily: "var(--font-body)" }}
          >
            GitHub
          </a>
          <a
            href="mailto:ravi4chahal@gmail.com"
            className="text-xs tracking-widest uppercase text-slate-500 hover:text-ai-accent transition-colors duration-200"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p
          className="text-xs tracking-widest uppercase text-slate-600 mt-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          &copy; 2026 Ravi Chahal
        </p>
      </div>
    </footer>
  );
}
