# API Design Patterns

Follow these patterns for all FastAPI backends.

## Endpoint Naming

```
GET    /api/resources          — list all
GET    /api/resources/{id}     — get one
POST   /api/resources          — create
PUT    /api/resources/{id}     — full update
PATCH  /api/resources/{id}     — partial update
DELETE /api/resources/{id}     — delete
POST   /api/resources/search   — complex search with body
```

Rules:
- Always prefix with `/api/`
- Use plural nouns (`/api/employees`, not `/api/employee`)
- Use kebab-case for multi-word resources (`/api/project-stats`)
- Nest for relationships: `/api/projects/{id}/sessions`
- No verbs in URLs (`/api/employees`, not `/api/getEmployees`)

## Response Format

Every API response follows this structure:

**Success (single item):**
```json
{
  "data": { "id": 1, "name": "..." },
  "meta": { "timestamp": "2025-04-10T14:30:00Z" }
}
```

**Success (list):**
```json
{
  "data": [{ "id": 1 }, { "id": 2 }],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 20,
    "pages": 8
  }
}
```

**Error:**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Employee with id 99 not found"
  }
}
```

**FastAPI implementation:**
```python
from fastapi.responses import JSONResponse

def success(data, meta=None):
    body = {"data": data}
    if meta:
        body["meta"] = meta
    return body

def error(code: str, message: str, status: int = 400):
    return JSONResponse(
        {"error": {"code": code, "message": message}},
        status_code=status,
    )
```

## Pagination

For any list endpoint that could return more than 50 items:

```python
@app.get("/api/employees")
def list_employees(page: int = 1, per_page: int = 20, q: str = ""):
    offset = (page - 1) * per_page
    query = db.query(Employee)

    if q:
        query = query.filter(Employee.name.ilike(f"%{q}%"))

    total = query.count()
    items = query.offset(offset).limit(per_page).all()

    return success(
        data=[item.to_dict() for item in items],
        meta={
            "total": total,
            "page": page,
            "per_page": per_page,
            "pages": (total + per_page - 1) // per_page,
        },
    )
```

## Error Handling

```python
from fastapi import HTTPException

# Use HTTPException for expected errors
@app.get("/api/employees/{id}")
def get_employee(id: int):
    emp = db.query(Employee).get(id)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return success(emp.to_dict())

# Global exception handler for unexpected errors
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    import uuid, logging
    error_id = str(uuid.uuid4())[:8]
    logging.exception(f"Error {error_id}: {exc}")
    return JSONResponse(
        {"error": {"code": "INTERNAL", "message": f"Internal error (ref: {error_id})"}},
        status_code=500,
    )
```

Rules:
- Never expose stack traces to the client
- Log the full error server-side with a reference ID
- Return the reference ID to the client so they can report it
- Use specific HTTP status codes (400, 401, 403, 404, 409, 422, 500)

## CORS

Development — allow everything:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Production — restrict to your domain:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)
```

## Request Validation

Use Pydantic models for all request bodies:

```python
from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    name: str
    pr_number: str
    division_id: int
    department_id: int | None = None

@app.post("/api/employees")
def create_employee(body: EmployeeCreate):
    # body is already validated — invalid requests return 422 automatically
    emp = Employee(**body.model_dump())
    db.add(emp)
    db.commit()
    return success(emp.to_dict())
```

## Health Check

Every backend gets a health endpoint:

```python
@app.get("/api/health")
def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}
```

## File Structure

```
backend/
  app.py           # FastAPI app, middleware, lifespan, mount static files
  routes/          # Route modules (one per resource for large apps)
    employees.py
    projects.py
  database.py      # Engine, session, Base
  models.py        # SQLAlchemy ORM models
  schemas.py       # Pydantic request/response schemas
```

For small apps (under 10 endpoints), keep everything in `app.py`. Split into `routes/` when it grows beyond that.
