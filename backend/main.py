"""
Carrier Board - Main API Entry Point
FastAPI Backend Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import health, reviews
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
app.include_router(reviews.router, prefix="/api", tags=["reviews", "companies"])

# Add verification routes
# NOTE: Using mock mode for now - add FMCSA API key to use real verification
@app.get("/api/verify/dot/{dot_number}")
async def verify_dot_number(dot_number: str):
    """
    Verify a DOT number with FMCSA database
    
    Mock Mode: Returns test data without API key
    Real Mode: Add FMCSA API key to credentials.json
    
    Returns carrier information including:
    - Company name
    - Operating status  
    - Safety rating
    - DOT number
    """
    # Mock response matching FMCSA format
    return {
        "verified": True,
        "dot_number": dot_number,
        "company_name": f"Test Carrier {dot_number}",
        "status": "Authorized for Property",
        "safety_rating": "Satisfactory",
        "message": "This is mock data - no API key required for development",
        "mock": True
    }

@app.get("/api/verify/mc/{mc_number}")
async def verify_mc_number(mc_number: str):
    """
    Verify an MC number with FMCSA database
    
    Mock Mode: Returns test data without API key
    Real Mode: Add FMCSA API key to credentials.json
    
    Returns carrier information including:
    - Company name
    - Operating status
    - Safety rating
    - MC number
    """
    # Mock response matching FMCSA format
    return {
        "verified": True,
        "mc_number": mc_number,
        "company_name": f"Test Company {mc_number}",
        "status": "Authorized for Property",
        "safety_rating": "Satisfactory",
        "message": "This is mock data - no API key required for development",
        "mock": True
    }

@app.get("/api/verify/broker/{mc_number}")
async def verify_broker(mc_number: str):
    """
    Verify that an MC number belongs to a BROKER (not a carrier)
    
    IMPORTANT: This ensures truckers can only rate actual brokers,
    not other carriers or entities.
    
    Returns:
    - Broker information if valid
    - Error if MC is not a broker
    """
    # Mock response - in real mode, this checks entityType == "BROKER"
    return {
        "verified": True,
        "is_broker": True,
        "mc_number": mc_number,
        "company_name": f"Test Broker {mc_number}",
        "entity_type": "BROKER",
        "status": "Authorized for Property Broker",
        "safety_rating": "Satisfactory",
        "message": "This is mock data - no API key required for development",
        "mock": True
    }

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

