# Design System — ravichahal.com

## Overview
Dark, premium content platform for AI Agents and Bitcoin. Tech-forward but approachable. The aesthetic of a curated intelligence feed — not a blog, not a portfolio. Newsletter-first with subscriber-gated experiments section.

## Colors
- **Background** (#0F172A): Page base — deep navy slate
- **Surface** (#1E293B): Cards, sections, elevated containers
- **Surface High** (#334155): Hover states, active elements
- **Text Primary** (#F8FAFC): Headlines, body text
- **Text Muted** (#94A3B8): Secondary text, dates, descriptions
- **AI Accent** (#00d4ec): Agentic AI tags, primary CTAs, interactive elements
- **BTC Accent** (#F59E0B): Bitcoin tags, gold highlights, secondary accents
- **Error** (#FF716C): Validation errors

## Typography
- **Headlines**: Space Grotesk, 600-700 weight, uppercase for section headers
- **Body**: DM Sans, 400-500 weight, 16px base
- **Code**: Fira Code, 400 weight (for any code snippets in posts)
- **Google Fonts**: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400&display=swap`

## Tailwind Config
```js
fontFamily: {
  headline: ['Space Grotesk', 'sans-serif'],
  body: ['DM Sans', 'sans-serif'],
  code: ['Fira Code', 'monospace'],
}
```

## Elevation
No traditional shadows. Use glassmorphism for cards:
- Surface cards: `bg-surface/60 backdrop-blur-xl border border-white/5`
- Hover glow: `shadow-[0_0_40px_rgba(0,212,236,0.06)]`
- No 1px borders for section separation — use spacing and surface color shifts

## Components

### Buttons
- Primary: Cyan (#00d4ec) fill, pill-shaped (rounded-full), white text
- Secondary: Transparent with cyan border, cyan text
- All buttons: `cursor-pointer`, hover transition 200ms ease

### Cards (Post Cards)
- Surface background (#1E293B), rounded-xl (12px)
- Colored tag pill: cyan for AI, gold for BTC
- Bold headline, one-line muted preview, date
- Hover: subtle surface shift to #334155

### Email Signup Form
- Wide input: surface background, subtle border, placeholder "your@email.com"
- Submit button: cyan pill "Join the Feed"
- Social proof text below: "Join X readers" in muted text

### The Lab (Locked Cards)
- Same card style but with frosted blur overlay
- Lock icon + "Subscribe to unlock" CTA
- Status badges: Active (cyan), Completed (green), Paused (gold)

## Patterns
- **Sticky header**: Slim signup bar appears on scroll past hero
- **Typewriter effect**: Hero headline cycles "Where AI Agents Meet ▌" → Bitcoin / Enterprise / Production
- **"Read a sample" link**: Below signup form — lets visitors preview before committing
- **Social proof**: Subscriber count in hero, even if starting at zero

## Do's and Don'ts
- DO use AI accent sparingly — only for the most important CTA per screen
- DO maintain WCAG AAA contrast (dark bg + white text already passes)
- DO respect `prefers-reduced-motion` for typewriter and fade-in effects
- DO use Lucide icons — no emojis as icons
- DON'T use 1px dividers — separate sections with spacing
- DON'T mix rounded and sharp corners
- DON'T exceed 3 cards in The Lab section
- DON'T use more than 2 font weights per section

## Responsive Breakpoints
- 375px (mobile)
- 768px (tablet)
- 1024px (laptop)
- 1440px (desktop — primary design target)
