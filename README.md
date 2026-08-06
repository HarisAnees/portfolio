# Haris Anees — Portfolio (v2)

A bold, modern, dev-tool-inspired portfolio (Vercel / Linear / Stripe energy) with a **dark + light theme toggle**, an intro loader, Three-ready atmospheric background, typing effect, scroll animations, and a filterable project showcase with click-to-play video demos. Single file, no build step.

## Stack
- **HTML / CSS / JavaScript** — one self-contained `index.html`, zero framework
- **Three.js** (vendored locally as `three.min.js` — no CDN, works offline) powers the hero security node-network
- A 2D canvas powers the interactive skills constellation
- **Google Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- Pure-CSS theming via `[data-theme]` variables; all motion respects `prefers-reduced-motion`

### Signature interactions
- **Hero node-network** — a live 3D constellation of indigo/cyan nodes connected by lines, drifting, rotating, and reacting to your cursor. Reinforces the "secure connected systems" identity.
- **Skills constellation** — skill nodes orbit a central core on three rings; hover to disturb them. A readable column breakdown sits below for accessibility.

## Run locally
```bash
# simplest
open index.html
# or serve (recommended so fonts/video load cleanly)
python3 -m http.server 8000   # → http://localhost:8000
```

## Your assets — what to add
This build already includes your photo (`haris.jpg`). Two things left to make it 100% complete:

**1. Resume PDF** — the "Download CV" button points to `Haris_Anees_Resume.pdf`. Drop that file in this folder (you already have the resume I generated earlier — just rename it to match, or update the `href` in the hero).

**2. Project demo videos** — the six project cards are click-to-play. Name your clips `project1.mp4` … `project6.mp4` and drop them in this folder. Each card's placeholder tells you which file it expects (e.g. `drop: project1.mp4`). Keep them short (15–40s) and H.264-compressed.

## Customize
| What | Where |
|------|-------|
| Accent colors | `--accent`, `--accent-2`, `--accent-3` in `:root` |
| Dark palette | the `[data-theme="dark"]` block |
| Light palette | the `[data-theme="light"]` block |
| Default theme | `data-theme="dark"` on the `<html>` tag + `setTheme('dark')` in JS |
| Typing words | the `words` array in the script |
| Project categories | `data-cat` on each `.proj-card` (matches the filter buttons) |

## Features
- **Theme toggle** — persists for the session; smooth 0.5s transition across every surface
- **Intro loader** — animated logo + progress bar, auto-dismisses (with a fallback timer so it never hangs)
- **Hero** — typing effect, gradient headline, animated entrance, social links, CV download, 3D photo tilt on hover, floating glass stat cards
- **Filterable projects** — All / Security / Full-Stack / API, with click-to-play video cards
- **Scroll progress bar**, reveal-on-scroll, count-up stats, infinite tech marquee
- **Accessible** — semantic landmarks, keyboard-focusable, reduced-motion safe, single `<h1>`

## SEO (already wired)
Meta description, Open Graph, Twitter card, `Person` JSON-LD, canonical URL (update `https://harisanees.dev/` to your domain).

## Deploy
**Netlify:** drag this folder onto app.netlify.com.
**Vercel:** run `vercel` inside the folder.
**GitHub Pages:** push to a repo → Settings → Pages → deploy from root.

---
© 2026 Haris Anees.
