"""
Carrier Board - Main API Entry Point
FastAPI Backend Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import health
from src.utils.config import config

# Create FastAPI application
app = FastAPI(
    title="Carrier Board API",
    description="Two-way rating platform for freight industry",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration - Load from centralized config
origins = config.get_cors_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Carrier Board API",
        "version": "0.1.0",
        "docs": "/api/docs"
    }

if __name__ == "__main__":
    import uvicorn
    
    # Load port from config
    port = config.get("backend.port", 8000)
    debug = config.is_debug()
    
    print(f"Starting Carrier Board API on port {port}")
    print(f"Debug mode: {debug}")
    print(f"CORS origins: {origins}")
    
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=debug)

