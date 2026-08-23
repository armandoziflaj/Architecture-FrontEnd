# Claude Code Directives

> **MANDATORY SYSTEM RULE:** Before proposing, planning, refactoring, or writing any code, you MUST search and read `./PROJECT_KNOWLEDGE.md` first. This mirrors the identical rule `GEMINI.md` gives other assistants working in this repo — keep both docs true, not just one.

## Operational Constraints

1. **Search Before Implementation:** Check `./PROJECT_KNOWLEDGE.md` for an existing pattern/dependency before introducing a new one.
2. **Strict Architecture Adherence:** React + TypeScript + Vite + CSS Modules, feature-based structure, React Query for server state, named exports only.
3. **i18n is non-negotiable:** every user-facing string goes through `react-i18next`'s `t()`. Add the key to **both** `public/locales/en/translation.json` and `public/locales/el/translation.json` in the same change — never one without the other. Never hardcode English (or any language) directly in JSX.
4. **No API changes without asking.** Don't touch `src/api/*`, hook contracts, or request/response types unless the user's request names an API/type change directly (e.g. "add a field," "change the endpoint"). If a task only *seems* to need one — confirm with the user first rather than assuming.
5. **English only** for code, comments, commit messages, and chat explanations (per `GEMINI.md`).

## Design System — "Mediterranean Minimalism"

Introduced to replace the earlier generic "corporate minimal" look (Bootstrap blue, unloaded Inter, sharp 0-radius edges). The direction is warm stone/plaster neutrals plus a two-tone accent (terracotta + muted Aegean teal). Display type is an editorial serif; geometry is softened; motion is considered rather than decorative. All tokens live in `src/index.css`; consume them via `var(--token-name)`, never hardcode hex values or magic-number spacing/radius.

**Color roles** (defined for both `:root` and `[data-theme="dark"]`):

- `--color-background` / `--color-background-secondary` / `--color-card-background`
- `--color-text` / `--color-text-muted`
- `--color-accent` (terracotta — the primary, most-used accent: CTAs, active states, hover highlights)
- `--color-primary` / `--color-primary-dark` (muted Aegean teal — secondary accent, focus rings, spinners)
- `--color-border`, `--color-success`, `--color-error`
- `--color-accent-rgb` — for `rgba(var(--color-accent-rgb), <alpha>)` tints (e.g. subtle hover backgrounds)

**Typography** (loaded via `<link>` in `index.html`, not CSS `@import`):

- `--font-display` (`Fraunces`) — hero/section headings, manifesto-style copy, card/page titles. Warm editorial serif, used sparingly for impact, not body text. Generic fallback: `serif`.
- `--font-primary` (`Inter`) — all body copy and UI chrome (labels, buttons, form fields). This is the default; most elements don't need to set it explicitly. Generic fallback: `sans-serif`.
- `--font-mono` (`JetBrains Mono`) — index numbers, counters (`01 — 03`), metadata rows (location/year/size), language-switcher codes, dashboard stat values. Signals "data," not prose. Generic fallback: `monospace` — **not** `serif`; a lint auto-fix has previously appended the wrong generic family here, so double-check this whenever `--font-mono` shows up in a diff.

**Geometry:** `--radius-sm` (4px, buttons/inputs/badges), `--radius-md` (12px, cards), `--radius-lg` (24px, photography/media containers). `--shadow-sm` / `--shadow-md` are warm-tinted (not neutral grey) — use them for card elevation instead of adding more borders.

**Motion:** Framer Motion is the only animation system. Don't reach for raw CSS `@keyframes` for entrance/reveal animation — reuse or extend `src/animations/variants.ts` instead. See `PROJECT_KNOWLEDGE.md`'s "UI/UX & Animations" section for the shared-variants pattern. Admin/dashboard surfaces intentionally stay lower-motion than the public site: dense and utilitarian, so don't add scroll-reveal choreography to data tables or forms there.

**Icons:** hand-written inline SVG (see `src/Components/ThemeToggle/ThemeToggle.tsx` for the pattern), not an icon library and not emoji. Keep stroke width consistent (~1.5–1.6) with existing icons if you add more.

**Decorative signature:** a single thin-stroke arch SVG motif (see `src/Components/Hero/Hero.tsx` / `src/Components/Contact/Contact.tsx`) nods to Mediterranean archways. It's intentionally used in exactly two places — don't scatter it across every section, that dilutes it into wallpaper.

## Working Notes (lessons from past sessions)

- **Triaging Codacy/static-analysis findings:** fix real issues, but push back on ones that misapply generic rules to this specific file/context rather than silently "resolving" them. Past examples that were false positives, not real problems: a docs-quality linter flagging this file for having "no persona defined" or "no tool documentation" (this is an AI-directives file, not a chatbot spec or API reference); flagging `GEMINI.md` or a real component file as "not found" when they do exist in the repo (verify with a file check before trusting the finding). State *why* a finding is being rejected rather than either silently ignoring it or blindly applying a bad fix.
- **Array indexing and "unnecessary conditional" lint flags:** this tsconfig doesn't set `noUncheckedIndexedAccess`, so `someArray[0]` types as `T`, not `T | undefined` — a linter will then flag `someArray[0] ?? fallback` as dead code even though the array can genuinely be empty at runtime. Don't just delete the null check (that reintroduces a real crash risk); use `someArray.at(0) ?? fallback` instead — `Array.prototype.at` always types its return as `T | undefined` regardless of tsconfig, so the safety check becomes real again from the type-checker's point of view too.
- **"Object injection sink" security warnings** on `obj[dynamicKey]` patterns (e.g. from `eslint-plugin-security`): prefer `Object.entries(obj).map(...)` + `Object.fromEntries(...)` over `Object.keys(obj)` + bracket-indexed reads/writes. Same behavior, no dynamic bracket access to flag.
