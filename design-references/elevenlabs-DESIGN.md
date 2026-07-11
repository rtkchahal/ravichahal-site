# Design System: ElevenLabs
> Reference file — grabbed from awesome-design-md (2026-04-05)
> Use for: HITL app UI, clean dashboard components, audio/voice-related UI patterns

## 1. Visual Theme & Atmosphere

ElevenLabs' website is a study in restrained elegance — a near-white canvas (`#ffffff`, `#f5f5f5`) where typography and subtle shadows do all the heavy lifting. The design feels like a premium audio product brochure: clean, spacious, and confident enough to let the content speak (literally, given ElevenLabs makes voice AI). There's an almost Apple-like quality to the whitespace strategy, but warmer — the occasional warm stone tint (`#f5f2ef`, `#777169`) prevents the purity from feeling clinical.

**Key Characteristics:**
- Near-white canvas with warm undertones (`#f5f5f5`, `#f5f2ef`)
- Waldenburg weight 300 (light) for display — ethereal, whisper-thin headings
- Inter with positive letter-spacing (0.14–0.18px) for body — airy readability
- Multi-layered shadow stacks at sub-0.1 opacity — surfaces barely exist
- Pill buttons (9999px) with warm stone-tinted backgrounds
- Warm shadow tints: `rgba(78, 50, 23, 0.04)` — shadows have color, not just darkness

## 2. Color Palette & Roles

### Primary
- **Pure White** (`#ffffff`): Primary background, card surfaces
- **Light Gray** (`#f5f5f5`): Secondary surface
- **Warm Stone** (`rgba(245, 242, 239, 0.8)`): Featured button background — the warm signature
- **Black** (`#000000`): Primary text, headings, dark buttons

### Neutral Scale
- **Dark Gray** (`#4e4e4e`): Secondary text
- **Warm Gray** (`#777169`): Tertiary text, muted
- **Border Light** (`#e5e5e5`): Explicit borders

### Shadows
- **Inset Border**: `rgba(0,0,0,0.075) 0px 0px 0px 0.5px inset`
- **Outline Ring**: `rgba(0,0,0,0.06) 0px 0px 0px 1px`
- **Card Shadow**: `rgba(0,0,0,0.4) 0px 0px 1px, rgba(0,0,0,0.04) 0px 4px 4px`
- **Warm Shadow**: `rgba(78,50,23,0.04) 0px 6px 16px`

## 3. Typography Rules

### Font Families
- **Display**: `Waldenburg` weight 300 — use Inter or a thin system font as fallback
- **Body / UI**: `Inter`
- **Monospace**: `Geist Mono`

### Hierarchy
| Role | Font | Size | Weight | Letter Spacing |
|------|------|------|--------|----------------|
| Display Hero | Waldenburg | 48px | 300 | -0.96px |
| Section Heading | Waldenburg | 36px | 300 | normal |
| Body | Inter | 18px | 400 | 0.18px |
| Body Standard | Inter | 16px | 400 | 0.16px |
| Nav / UI | Inter | 15px | 500 | 0.15px |
| Button | Inter | 15px | 500 | normal |

## 4. Component Stylings

### Buttons
**Primary Black Pill**: `#000000` bg, `#ffffff` text, `9999px` radius
**Warm Stone Pill**: `rgba(245,242,239,0.8)` bg, `30px` radius, warm shadow
**White Pill**: `#ffffff` bg with card shadow border

### Cards
- Background: `#ffffff`
- Border: shadow-as-border (`rgba(0,0,0,0.06) 0px 0px 0px 1px`)
- Radius: 16px–24px
- Shadow: inset + outline + elevation stack

## 5. Agent Prompt Guide

### Quick Color Reference
- Background: `#ffffff` or `#f5f5f5`
- Text: `#000000`
- Secondary text: `#4e4e4e`
- Muted: `#777169`
- Warm surface: `rgba(245, 242, 239, 0.8)`
- Border: `#e5e5e5`

### Example Prompts
- Hero: "48px Waldenburg weight 300, line-height 1.08, letter-spacing -0.96px. Subtitle 18px Inter weight 400, letter-spacing 0.18px, #4e4e4e. Two pill buttons: black (9999px) and warm stone (rgba(245,242,239,0.8), 30px radius, warm shadow rgba(78,50,23,0.04) 0px 6px 16px)."
- Card: "White bg, 20px radius. Shadow: rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px. Title 32px Waldenburg weight 300. Body 16px Inter weight 400 letter-spacing 0.16px."

## When to Use This
- L'Oreal HITL claims review app (clean enterprise dashboard)
- Any light-mode UI for client deliverables
- Voice-related UI components (Protective Life ACS)
- Component reference when building clean admin interfaces
