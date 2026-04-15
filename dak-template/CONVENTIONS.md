# CONVENTIONS — {{project-name}}

> Claude reads this before any work. Keep it short, specific, and current. This isn't `PROJECT.md` (which is narrative history); this is the project's style rulebook.

## Naming

- **Python modules:** `snake_case.py`
- **Python classes:** `PascalCase`
- **Python functions / vars:** `snake_case`
- **Vue components:** `PascalCase.vue` (e.g. `PlayerCard.vue`)
- **Vue composables:** `useX.js` (e.g. `usePlayers.js`)
- **Vue views (top-level routes):** `PascalCase.vue` in `src/views/`
- **CSS classes:** `kebab-case`, no BEM (rely on scoped styles)
- **Env vars:** `SCREAMING_SNAKE_CASE`, prefixed with project code (e.g. `{{PREFIX}}_DB_URL`)

## File structure

```
project-root/
├── backend/
│   ├── app.py              # aggregator, <200 lines
│   ├── api/                # route modules, one per resource
│   │   ├── users.py
│   │   └── ideas.py
│   ├── services/           # business logic, no HTTP
│   ├── models/             # SQLAlchemy models
│   ├── auth.py             # DAK standard auth dep
│   ├── database.py         # connection + session
│   ├── logging_config.py   # structured JSON logs
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── router.js
│   │   ├── views/          # top-level route pages
│   │   ├── components/     # reusable pieces
│   │   ├── composables/    # shared state logic
│   │   ├── utils/          # pure helpers
│   │   └── styles/
│   ├── public/
│   │   ├── vibe-stats.json      # auto-updated
│   │   ├── journey-data.json    # Claude-updated
│   │   └── tech-stack.json      # auto-updated
│   └── vite.config.js
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .dockerignore
├── PROJECT.md              # narrative history
├── CONVENTIONS.md          # this file
└── README.md
```

## Soft file size caps

See `~/.claude/CLAUDE.md`. Summary:
- Function: 50 lines · Vue SFC: 250 · composable/util: 200 · backend module: 400 · aggregator: 200 · test: 500.

## Testing

- **Backend:** `pytest` in `backend/tests/`. Mirror source tree: `api/users.py` → `tests/api/test_users.py`.
- **Frontend:** `vitest` in `frontend/src/**/__tests__/` or `*.spec.js` adjacent.
- **Every new module needs:** golden-path test + one edge case. No exceptions for "it's trivial."

## Money

All money displayed to users uses `<Aed>` from `~/design-system/components/Aed.vue`. Never hardcode `$` or `AED` strings. Internal storage can be USD (tag the column; convert on read) but the UI is always AED.

## API patterns

- REST verbs + resource-named paths: `GET /api/users`, `POST /api/users`, `GET /api/users/{id}`.
- Pydantic models for every request/response body.
- Errors: raise `HTTPException(status_code=..., detail=...)`. Never return `{"error": "..."}` with 200.
- ETag / 304 where cheap (read-heavy list endpoints).
- Structured log on every non-2xx.

## Auth

Admin-gated endpoints use the `require_admin` FastAPI dep from `backend/auth.py`. Validates `X-Admin-Key` header or `admin_key` cookie against `DETAILED_PASSWORD`. Don't reinvent.

## Commits

- Conventional-commit style: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
- One logical change per commit. Reviewer shouldn't have to untangle two features from one diff.
- Commit message explains the *why*, not the *what* (the diff shows what).

## Conventions specific to this project

> Fill in anything non-standard below. Examples:
> - Timezone: Asia/Dubai
> - Customer IDs: `cus_` prefix
> - Feature flags: `flags.FOO_ENABLED` pattern
> - Third-party APIs used: [list]

- _...add as project grows..._
