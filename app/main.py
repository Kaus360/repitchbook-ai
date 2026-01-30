from fastapi import FastAPI
from app.routes import analyze, health

tags_metadata = [
    {
        "name": "Health",
        "description": "Service health and uptime checks."
    },
    {
        "name": "Deal Analysis",
        "description": "Analyze real estate deals and generate investor-grade insights."
    }
]

app = FastAPI(
    title="REPitchBook AI",
    description="AI-powered Real Estate Deal Intelligence Platform",
    version="1.0.0",
    openapi_tags=tags_metadata
)


app.include_router(health.router)
app.include_router(analyze.router)
