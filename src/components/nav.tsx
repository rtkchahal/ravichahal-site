export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/40 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,212,236,0.06)]">
      <div className="flex justify-between items-center px-6 md:px-8 h-20 w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div
          className="text-2xl font-bold tracking-tighter text-white uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          RAVI CHAHAL
        </div>

        {/* Center nav links */}
        <div
          className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-tight"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <a
            href="#latest"
            className="text-ai-accent font-bold border-b-2 border-ai-accent pb-1 transition-colors duration-200"
          >
            Latest
          </a>
          <a
            href="#the-lab"
            className="text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            The Lab
          </a>
          <a
            href="#about"
            className="text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            About
          </a>
        </div>

        {/* CTA Button */}
        <button
          className="text-slate-900 font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wide transition-all duration-200 active:scale-90 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)] cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
            fontFamily: "var(--font-headline)",
          }}
        >
          Join the Feed
        </button>
      </div>
    </nav>
  );
}
