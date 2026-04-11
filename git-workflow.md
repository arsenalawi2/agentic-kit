# Git Workflow

Follow these rules for all git operations in every project.

## Initial Setup

Every new project gets initialized with git immediately:
```bash
git init
```

And a `.gitignore` from day one — BEFORE the first commit:
```
# Dependencies
node_modules/
venv/
.venv/
__pycache__/
*.pyc

# Environment
.env
.env.local
.env.production

# Build output
dist/
build/
*.egg-info/

# Databases
*.db
*.sqlite3
*.sql.bak

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Docker volumes (local)
pgdata/

# Logs
*.log
```

## When to Commit

Commit after completing a **logical unit of work** — not after every file edit, not after 6 hours of changes.

Good commit points:
- Project scaffolding is done (first commit)
- A feature is working end-to-end
- A bug is fixed and verified
- A refactor is complete and nothing is broken
- Database schema changes
- Before switching to a different area of the codebase

Bad commit points:
- After every single file save
- Mid-feature when things are broken
- "Just in case" with a pile of unrelated changes

## Commit Message Format

```
type: short description (imperative, under 70 chars)
```

Types:
- `feat:` — new feature or page
- `fix:` — bug fix
- `refactor:` — restructuring code without changing behavior
- `style:` — CSS, formatting, no logic changes
- `data:` — data model, schema, seed data changes
- `docs:` — documentation, README, comments
- `chore:` — dependencies, config, build scripts
- `init:` — initial project setup

Examples:
```
init: scaffold Vue 3 + FastAPI project with PostgreSQL
feat: add employee dashboard with filter and pagination
fix: resolve CORS error on API calls from frontend
refactor: extract sidebar into reusable component
data: add division and department seed data
style: apply dark mode to all dashboard cards
chore: update dependencies and fix deprecation warnings
```

Rules:
- Imperative mood ("add" not "added", "fix" not "fixed")
- No period at the end
- Under 70 characters
- Lowercase after the type prefix

## Branching

For small/solo projects:
- Work directly on `main` — it's fine for personal projects
- Commit frequently with good messages

For shared/team projects:
- Create feature branches: `feature/employee-dashboard`, `fix/cors-error`
- Keep `main` deployable at all times
- Merge via PR or squash merge when the feature is done

## What NEVER to Commit

- `.env` files with secrets (API keys, database passwords)
- `node_modules/` or `venv/` directories
- Database files (`.db`, `.sqlite3`)
- Build output (`dist/`, `build/`)
- Large binary files (images over 1MB, videos, datasets)
- Credentials, tokens, private keys of any kind

If you accidentally commit a secret, it's in the git history forever. Rotate the credential immediately.

## First Commit Pattern

Every project's first commit should be:
```bash
git add .gitignore
git commit -m "init: add gitignore"

# Then scaffold the project...

git add -A
git commit -m "init: scaffold project with [Vue 3 + FastAPI + PostgreSQL]"
```
