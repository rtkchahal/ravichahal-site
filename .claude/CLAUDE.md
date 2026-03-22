# CLAUDE.md — ravichahal.com

## Project
Personal content platform for Ravi Chahal. Two pillars: Agentic AI + Bitcoin.
Newsletter-first with subscriber-gated "Lab" section for experiments.

## Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui where appropriate
- **Icons**: Lucide React
- **Deployment target**: Vercel
- **Email**: TBD (Resend or Buttondown for newsletter)

## Key Files
- `DESIGN.md` — Full design system. READ THIS FIRST before writing any UI code.
- `stitch/landing.html` — Reference Stitch design (Tailwind HTML). Convert to React components.
- `public/images/ravi.png` — Profile photo for About section.

## Architecture
```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Landing page (all sections)
│   └── globals.css         # Tailwind imports + custom CSS
├── components/
│   ├── hero.tsx            # Hero + email signup
│   ├── pillars.tsx         # AI + BTC glassmorphism cards
│   ├── latest-posts.tsx    # 2-column post grid
│   ├── the-lab.tsx         # Subscriber-gated experiments
│   ├── about.tsx           # Bio + photo + social links
│   ├── footer.tsx          # Minimal footer
│   ├── sticky-header.tsx   # Scroll-triggered signup bar
│   └── ui/                 # Reusable primitives (button, card, tag, input)
```

## Rules
- Follow DESIGN.md for all visual decisions — colors, fonts, spacing, component styles
- Convert Stitch HTML as reference but write clean React — don't copy-paste raw HTML
- Server components by default, client components only when needed (signup form, typewriter, scroll detection)
- Mobile-first responsive (375px → 1440px)
- All interactive elements need hover states (200ms transition)
- No hardcoded content — use constants or data files for posts, experiments
- Accessibility: WCAG AAA contrast, keyboard nav, focus states, prefers-reduced-motion
