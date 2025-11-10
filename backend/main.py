"""
Carrier Board - Main API Entry Point
FastAPI Backend Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import health

# Create FastAPI application
app = FastAPI(
    title="Carrier Board API",
    description="Two-way rating platform for freight industry",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration
origins = [
    "http://localhost:3000",  # Frontend development server
    "http://127.0.0.1:3000",
]

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

