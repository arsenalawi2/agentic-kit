"""Async SQLAlchemy 2 session manager — DAK default.

Uses asyncpg for Postgres. For local-only SQLite tools, swap the URL
to `sqlite+aiosqlite:///./app.db`.

Usage in routes:
    from database import get_session

    @router.get("/items")
    async def list_items(db: AsyncSession = Depends(get_session)):
        ...
"""
import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)


DB_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:postgres@localhost:5432/app",
)

engine = create_async_engine(DB_URL, echo=False, pool_pre_ping=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)


async def get_session() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:
        yield session


async def db_ping() -> bool:
    """Used by /readyz."""
    try:
        async with engine.connect() as conn:
            await conn.execute("SELECT 1")
        return True
    except Exception:
        return False


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI lifespan — runs once on startup/shutdown."""
    # Add Alembic migration trigger here if you want auto-migrate on boot.
    yield
    await engine.dispose()
