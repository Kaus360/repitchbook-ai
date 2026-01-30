from fastapi import FastAPI
from app.routes import analyze, health

app = FastAPI(
    title="REPitchBook AI",
    description="AI-powered Real Estate Deal Intelligence Platform",
    version="1.0"
)

app.include_router(health.router)
app.include_router(analyze.router)
