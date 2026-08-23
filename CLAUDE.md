# Claude Code Directives

> **MANDATORY SYSTEM RULE:** Before proposing, planning, refactoring, or writing ANY code, you MUST search and read `./PROJECT_KNOWLEDGE.md` first (same rule `GEMINI.md` gives other assistants working in this repo — keep both docs true, not just one).

## Operational Constraints

1. **Search Before Implementation:** Check `./PROJECT_KNOWLEDGE.md` for an existing pattern/dependency before introducing a new one.
2. **Strict Architecture Adherence:** React + TypeScript + Vite + CSS Modules, feature-based structure, React Query for server state, named exports only.
3. **i18n is non-negotiable:** every user-facing string goes through `react-i18next`'s `t()`. Add the key to **both** `public/locales/en/translation.json` and `public/locales/el/translation.json` in the same change — never one without the other. Never hardcode English (or any language) directly in JSX.
4. **No API changes without asking.** Don't touch `src/api/*`, hook contracts, or request/response types unless the task explicitly requires it — confirm with the user first if it seems necessary.
5. **English only** for code, comments, commit messages, and chat explanations (per `GEMINI.md`).

## Design System — "Mediterranean Minimalism"

Introduced to replace the earlier generic "corporate minimal" look (Bootstrap blue, unloaded Inter, sharp 0-radius edges). Warm stone/plaster neutrals + a two-tone accent (terracotta + muted Aegean teal), editorial serif for display type, softened geometry, considered motion. All tokens live in `src/index.css`; consume them via `var(--token-name)`, never hardcode hex values or magic-number spacing/radius.

**Color roles** (defined for both `:root` and `[data-theme="dark"]`):
- `--color-background` / `--color-background-secondary` / `--color-card-background`
- `--color-text` / `--color-text-muted`
- `--color-accent` (terracotta — the primary, most-used accent: CTAs, active states, hover highlights)
- `--color-primary` / `--color-primary-dark` (muted Aegean teal — secondary accent, focus rings, spinners)
- `--color-border`, `--color-success`, `--color-error`
- `--color-accent-rgb` — for `rgba(var(--color-accent-rgb), <alpha>)` tints (e.g. subtle hover backgrounds)

**Typography** (loaded via `<link>` in `index.html`, not CSS `@import`):
- `--font-display` (`Fraunces`) — hero/section headings, manifesto-style copy, card/page titles. Warm editorial serif, used sparingly for impact, not body text.
- `--font-primary` (`Inter`) — all body copy and UI chrome (labels, buttons, form fields). This is the default; most elements don't need to set it explicitly.
- `--font-mono` (`JetBrains Mono`) — index numbers, counters (`01 — 03`), metadata rows (location/year/size), language-switcher codes, dashboard stat values. Signals "data," not prose.

**Geometry:** `--radius-sm` (4px, buttons/inputs/badges), `--radius-md` (12px, cards), `--radius-lg` (24px, photography/media containers). `--shadow-sm` / `--shadow-md` are warm-tinted (not neutral grey) — use them for card elevation instead of adding more borders.

**Motion:** Framer Motion is the only animation system — see the `PROJECT_KNOWLEDGE.md` "UI/UX & Animations" section for the shared-variants pattern. Don't reach for raw CSS `@keyframes` for entrance/reveal animation; reuse or extend `src/animations/variants.ts`. Admin/dashboard surfaces intentionally stay lower-motion than the public site (dense, utilitarian) — don't add scroll-reveal choreography to data tables/forms there.

**Icons:** hand-written inline SVG (see `ThemeToggle.tsx` for the pattern), not an icon library and not emoji. Keep stroke width consistent (~1.5–1.6) with existing icons if you add more.

**Decorative signature:** a single thin-stroke arch SVG motif (see `Hero.tsx` / `Contact.tsx`) nods to Mediterranean archways. It's intentionally used in exactly two places — don't scatter it across every section, that dilutes it into wallpaper.
