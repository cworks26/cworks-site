# AGENTS.md — cworks-site

Working rules for any agent (Hermes, Claude Code, Codex, Copilot, Cursor) in this repo.
Read the workspace-level `../AGENTS.md` too; this file holds the project specifics.

## What it is

The current CWorks agency site. **Next 16 (App Router) + Tailwind 4 + Lenis** smooth scroll.
Repo: `cworks26/cworks-site`.

| Path | Holds |
|---|---|
| `src/content/site.json` | All page copy and structured content |
| `src/app/<page>/` | Pages: `/`, `/services`, `/work`, `/team`, `/contact` |
| `public/logo-mark.png`, `logo-mark-dark.png`, `favicon.png` | Real logo artwork traced from the owner's logo — not hand-drawn SVG |

## The workflow (follow it in order)

1. **Tier the task** — trivial / standard / large; state the tier when it is not obvious.
2. **Think first** — restate the problem, list assumptions, name the files and the test/check that will prove it. `sequentialthinking` tool for anything non-trivial.
3. **Ask only what changes the design** — one batched `clarify` call; take obvious defaults and state them.
4. **Plan** — read the real files first (never invent components, tokens, or copy). Large work → `.hermes/plans/`, wait for approval.
5. **Execute with strict TDD** — RED → GREEN → REFACTOR. No implementation without a test that demanded it.
6. **Verify, then report** — real output only. Independent review of the diff before calling anything done.

Full detail: the `coding-workflow` skill.

## Commands

```bash
npm run dev          # dev server on :3000 — background, never pipe the log to the head
npm run build        # the acceptance gate
npx tsc --noEmit     # typecheck
npx eslint .         # lint
```

Visual QA: append `?static=1` to a URL to bypass scroll-reveal animations so a headless
screenshot shows the page's true final state. For a change to layout or styling, screenshot
before/after rather than describing the diff.

## Design constraints (owner-decided — do not relitigate)

- **Palette: cwblue `#3fb9ec`, ivory `#f6f2e7`, black. Nothing else.** Acid lime was removed; blue is the action colour.
- **Full-screen sections:** `.section` is `min-h-100svh`, flex-centred, with scroll-snap (proximity while Lenis is active). `PageHead` headers and the footer are full-screen snap points.
- **Motion is opt-in-safe:** `LenisProvider` skips reduced-motion users; `PinnedDeck` locks and steps through pricing tiers on desktop without reduced-motion, and falls back to a plain stack otherwise. Any new motion must keep that fallback.
- Interaction primitives live in `Interactions.tsx` (Spotlight/Tilt/Magnetic/ScrollProgress) — extend them, do not re-implement.
- Avoid these design tells (owner feedback): ALL-CAPS eyebrow labels, middle-dot meta separators, decorative arrows, filler copy.

## Content rules

- **Never invent content** — no fake testimonials, metrics, team bios, client names, or contact details. Ask for real material or leave an explicit placeholder.
- Team section currently has Jamie noted as "New" and Elisha Mukisa with a real bio — leave the rest out until real copy arrives.
- **Pricing tiers are legacy UGX numbers — confirm with the owner before treating them as launch-ready.** Flag, never quietly ship.
- Footer social links are still `#`. Any new placeholder link must be called out in your report.

## Verification rules

- **Never** say done/working/complete before `npm run build` has actually passed. Quote real output; if you could not run something, say so in plain words.
- Screenshots are the visual truth; DOM/text checks are cheaper than vision analysis — prefer them first.
- Only new failures are regressions. The implementer does not sign off on their own work — a fresh-context reviewer gets the diff. Max 2 fix cycles, then ask.

## Code rules & boundaries

- Read before editing; minimal diff; no drive-by refactors or reformatting; match existing Tailwind and component conventions.
- YAGNI. New dependency only with a stated reason and a `package.json` check.
- **Never** push or rewrite history unless explicitly asked (GitHub Pages deploy only on the owner's word). **Never** touch `.env` or secrets.
- Never dump whole HTML/JSON/build logs into context — truncate.
- Blocked? Stop and report it. Never fake a passing result.
