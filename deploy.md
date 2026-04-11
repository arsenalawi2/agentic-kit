# Deployment Guide

How to get a project from local development to accessible by others.

## Option 1: Tailscale Funnel (Quickest — Share with Specific People)

Tailscale Funnel exposes a local port to the internet via your Tailscale network. No server, no cloud, no DNS setup.

**Install Tailscale:**
```bash
# macOS
brew install tailscale

# or download from https://tailscale.com/download
```

**Expose a port:**
```bash
# Serve your Vue dev server
tailscale funnel 3100

# Or serve your FastAPI backend
tailscale funnel 8001

# Serve on a specific path
tailscale funnel --set-path /api 8001

# Serve HTTPS on port 443 (default funnel port)
tailscale funnel 443
```

This gives you a URL like `https://your-machine.tailnet-name.ts.net` that anyone on the internet can access.

**For production-like serving (Vue build + FastAPI):**
```bash
# Build the frontend
cd frontend && npm run build && cd ..

# Serve the built frontend via FastAPI
# In app.py, mount the static files:
# app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="frontend")

# Run the backend
cd backend && python3 app.py

# Expose it
tailscale funnel 8001
```

## Option 2: Docker Compose (Production-Ready)

Package everything into containers for deployment anywhere.

**docker-compose.prod.yml:**
```yaml
services:
  db:
    image: postgres:16
    container_name: myproject-pg
    environment:
      POSTGRES_DB: myproject
      POSTGRES_USER: prod_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

  backend:
    build: ./backend
    container_name: myproject-api
    ports:
      - "8001:8000"
    environment:
      DATABASE_URL: postgresql+asyncpg://prod_user:${DB_PASSWORD}@db:5432/myproject
    depends_on:
      - db
    restart: unless-stopped

  frontend:
    build: ./frontend
    container_name: myproject-web
    ports:
      - "3100:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  pgdata:
```

**Frontend Dockerfile (nginx serving the Vue build):**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

**Frontend nginx.conf:**
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # SPA: route all paths to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to backend
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Backend Dockerfile:**
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Deploy:**
```bash
# Create .env with production secrets
echo "DB_PASSWORD=$(openssl rand -hex 16)" > .env

# Build and start
docker compose -f docker-compose.prod.yml up -d --build

# Check logs
docker compose -f docker-compose.prod.yml logs -f
```

## Option 3: Serve Vue Build from FastAPI (Simplest Single-Server)

Skip nginx entirely — FastAPI serves the built frontend as static files.

```python
# In app.py, at the bottom (after all API routes):
from fastapi.staticfiles import StaticFiles
from pathlib import Path

frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
```

Then:
```bash
cd frontend && npm run build && cd ..
cd backend && python3 app.py
```

One process, one port, serves both API and frontend.

## Pre-Deploy Checklist

- [ ] Frontend builds without errors: `cd frontend && npm run build`
- [ ] No hardcoded `localhost` URLs in frontend code — use relative paths (`/api/...`)
- [ ] `.env` file has production values (not dev defaults)
- [ ] `.env` is in `.gitignore`
- [ ] CORS is configured for production domain (not `allow_origins=["*"]`)
- [ ] Database has proper credentials (not dev/dev)
- [ ] Static files are served (frontend build mounted in FastAPI or via nginx)
- [ ] Health check endpoint works: `GET /api/health`
- [ ] Dark mode works in production build (CSS variables load correctly)
- [ ] Mobile responsive (test at 640px and 960px widths)
