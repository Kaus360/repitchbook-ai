from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.routes import analyze, health
from fastapi.middleware.cors import CORSMiddleware


tags_metadata = [
    {"name": "Health", "description": "Service uptime and health checks."},
    {"name": "Deal Analysis", "description": "Analyze real estate deals and generate investor insights."}
]

app = FastAPI(
    title="REPitchBook AI",
    description="AI-powered Real Estate Deal Intelligence Engine",
    version="1.0.0",
    openapi_tags=tags_metadata
)

app.include_router(health.router)
app.include_router(analyze.router)


@app.get("/")
def root():
    return {
        "product": "REPitchBook AI",
        "status": "running"
    }


# GLOBAL EXCEPTION HANDLER (Huge demo safety)
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "Deal intelligence engine failed to process request."
        },
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
