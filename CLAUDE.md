# DAK

You are configured with the DAK — an opinionated set of defaults for building production-grade applications with Claude Code.

## Tech Stack (read ~/.claude/stack.md for details)

- **Frontend:** Vue 3 + Vite + Vue Router (NOT static HTML, NOT React unless asked)
- **Backend:** FastAPI + SQLAlchemy 2 async + Pydantic (NOT Flask, NOT Express unless asked)
- **Database:** PostgreSQL via Docker for shared apps. SQLite only for local-only tools.
- **Styling:** EZ Design System — `~/design-system/index.css` (NOT Tailwind, NOT Bootstrap unless asked)
- **Docker:** Required for every project with a database. Read ~/.claude/deploy.md for patterns.
- **Ports:** Check `lsof -iTCP -sTCP:LISTEN` before assigning. Frontend 3xxx, Backend 8xxx, DB 54xx.

## Design System (read ~/design-system/guide.md when building UI)

Warm neutrals (#faf9f7 bg, #23221f text), Space Grotesk headings, DM Sans body, JetBrains Mono metrics. One accent: dark green #0f4024. Sidebar-first layout. Borders over shadows. Dark mode via html.dark. Never use pure black/white.

## Guides (read when relevant — NOT every conversation)

| Guide | When to read | Location |
|-------|-------------|----------|
| Tech stack rationale | Starting a new project | `~/.claude/stack.md` |
| Git workflow | Any git operation | `~/.claude/git-workflow.md` |
| API patterns | Building REST endpoints | `~/.claude/api-patterns.md` |
| Deployment | Shipping to production | `~/.claude/deploy.md` |
| Design system | Building any UI | `~/design-system/guide.md` |
| Security (OWASP) | Invoke `/owasp-security` | `~/.claude/skills/owasp-security/` |

## Project Management

When starting a new project:
1. Copy `~/.claude/project-management-template.md` into the project root as `PROJECT.md`
2. Update PROJECT.md after each significant phase (what was done, issues, lessons)
3. Keep the "Current State" section always up to date

This is NOT optional. Every project gets a PROJECT.md.

## Auto-Updating Pages

Every project gets three pages that auto-update:

| Page | Data file | Updated by |
|------|-----------|------------|
| `/vibe-code` | `public/vibe-stats.json` | Leaderboard hook (after every session) |
| `/journey` | `public/journey-data.json` | You (Claude Code) — after significant work |
| `/architecture` | `public/tech-stack.json` | Leaderboard hook (scans project files) |
| `/pm-log` | `PROJECT.md` (repo root, imported via Vite `?raw`) | You (Claude Code) — throughout the project lifecycle |

Templates: `~/.claude/templates/vibe-stats.md`, `journey.md`, `architecture.md`, `pm-log.md`

**PM Log:** The `/pm-log` page renders `PROJECT.md` directly via `marked` + `mermaid` — no intermediate JSON file. Edit `PROJECT.md`, the page updates. Follow `~/.claude/templates/pm-log.md` for the Vue component structure, dependencies, and styling.

**Journey data:** After completing significant work, update `public/journey-data.json` by reading the project's code, README, and PROJECT.md. Read `~/.claude/templates/journey.md` for the JSON schema and generation rules.

**Tech stack:** The hook auto-detects from package.json/requirements.txt/docker-compose.yml. When you notice missing technologies (Tailscale, external APIs, etc.), add them to tech-stack.json manually — the hook preserves hand-curated entries.

## What NOT To Do

- Static HTML files as a "solution" — use a proper SPA framework
- Tailwind class soup — use the design system
- Component library default themes out of the box
- Skip PROJECT.md — it is mandatory
- Pure black (#000) or pure white (#fff)
- Glassmorphism, gradient text, glow borders, bounce animations
- Modals — use slide-in panels instead
- Hardcode stats in vibe/journey pages — read from JSON files
