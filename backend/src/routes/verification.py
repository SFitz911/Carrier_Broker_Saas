"""
DOT/MC Verification Routes
Handles company verification through FMCSA database
"""

from fastapi import APIRouter, HTTPException
from src.services.fmcsa_service import fmcsa_service

router = APIRouter()


@router.get("/verify/dot/{dot_number}")
async def verify_dot_number(dot_number: str):
    """
    Verify a DOT number with FMCSA database
    
    Args:
        dot_number: Department of Transportation number
        
    Returns:
        Verification result with company information
    """
    if not dot_number.isdigit():
        raise HTTPException(
            status_code=400,
            detail="DOT number must contain only digits"
        )
    
    result = await fmcsa_service.verify_dot_number(dot_number)
    
    if result:
        return {
            "verified": True,
            "dot_number": dot_number,
            "company_name": result.get("company_name"),
            "status": result.get("status"),
            "message": result.get("message", "Company verified successfully")
        }
    else:
        return {
            "verified": False,
            "dot_number": dot_number,
            "message": "DOT number not found in FMCSA database"
        }


@router.get("/verify/mc/{mc_number}")
async def verify_mc_number(mc_number: str):
    """
    Verify an MC number with FMCSA database
    
    Args:
        mc_number: Motor Carrier number
        
    Returns:
        Verification result with company information
    """
    if not mc_number.isdigit():
        raise HTTPException(
            status_code=400,
            detail="MC number must contain only digits"
        )
    
    result = await fmcsa_service.verify_mc_number(mc_number)
    
    if result:
        return {
            "verified": True,
            "mc_number": mc_number,
            "company_name": result.get("company_name"),
            "status": result.get("status"),
            "message": result.get("message", "Company verified successfully")
        }
    else:
        return {
            "verified": False,
            "mc_number": mc_number,
            "message": "MC number not found in FMCSA database"
        }

