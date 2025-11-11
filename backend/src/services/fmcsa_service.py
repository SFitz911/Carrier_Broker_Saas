"""
FMCSA API Service
Handles DOT/MC number verification - OPTIONAL for development

NOTE: This service is OPTIONAL. Students can develop without FMCSA API keys.
If no API key is configured, it returns mock data for testing.
"""

import httpx
from typing import Dict, Optional
from src.utils.config import config


class FMCSAService:
    """
    Service for interacting with FMCSA API
    
    OPTIONAL: Works without API key for development/testing
    If api_key is not set, returns mock data instead
    """
    
    def __init__(self):
        # Load credentials from centralized config (OPTIONAL)
        self.api_key = config.get("fmcsa.api_key")
        self.api_url = config.get("fmcsa.api_url")
        self.timeout = config.get("fmcsa.timeout", 10)
        self.mock_mode = not self.api_key or self.api_key == "your_fmcsa_api_key_here"
    
    async def verify_mc_number(self, mc_number: str) -> Optional[Dict]:
        """
        Verify MC number with FMCSA API
        
        DEVELOPMENT MODE: If no API key configured, returns mock data
        
        Args:
            mc_number: Motor Carrier number to verify
        
        Returns:
            Company data if found, None otherwise
        """
        # MOCK MODE - No API key needed for development
        if self.mock_mode:
            print(f"🔧 MOCK MODE: Simulating FMCSA verification for MC#{mc_number}")
            return {
                "mc_number": mc_number,
                "company_name": f"Test Company {mc_number}",
                "status": "Authorized for Property",
                "safety_rating": "Satisfactory",
                "verified": True,
                "mock": True,  # Flag to indicate this is mock data
                "message": "This is mock data - no API key required for development"
            }
        
        # REAL API MODE - Using FMCSA's official endpoint
        # Format: https://mobile.fmcsa.dot.gov/qc/services/carriers/DOT_NUMBER?webKey=YOUR_API_KEY
        # Note: MC numbers can be queried using the same endpoint
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    f"{self.api_url}/{mc_number}",
                    params={"webKey": self.api_key}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Parse FMCSA response structure
                    if "content" in data and "carrier" in data["content"]:
                        carrier = data["content"]["carrier"]
                        return {
                            "mc_number": carrier.get("mcNumber") or mc_number,
                            "dot_number": carrier.get("dotNumber"),
                            "company_name": carrier.get("legalName"),
                            "status": carrier.get("status"),
                            "safety_rating": carrier.get("safetyRating"),
                            "verified": True,
                            "mock": False
                        }
                    else:
                        return None
                elif response.status_code == 404:
                    print(f"MC number {mc_number} not found in FMCSA database")
                    return None
                else:
                    print(f"FMCSA API error: {response.status_code}")
                    return None
                    
        except Exception as e:
            print(f"Error calling FMCSA API: {e}")
            return None
    
    async def verify_dot_number(self, dot_number: str) -> Optional[Dict]:
        """
        Verify DOT number with FMCSA API
        
        DEVELOPMENT MODE: If no API key configured, returns mock data
        
        Args:
            dot_number: Department of Transportation number to verify
        
        Returns:
            Company data if found, None otherwise
        """
        # MOCK MODE - No API key needed for development
        if self.mock_mode:
            print(f"🔧 MOCK MODE: Simulating FMCSA verification for DOT#{dot_number}")
            return {
                "dot_number": dot_number,
                "company_name": f"Test Carrier {dot_number}",
                "status": "Authorized for Property",
                "safety_rating": "Satisfactory",
                "verified": True,
                "mock": True,  # Flag to indicate this is mock data
                "message": "This is mock data - no API key required for development"
            }
        
        # REAL API MODE - Using FMCSA's official endpoint
        # Format: https://mobile.fmcsa.dot.gov/qc/services/carriers/DOT_NUMBER?webKey=YOUR_API_KEY
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    f"{self.api_url}/{dot_number}",
                    params={"webKey": self.api_key}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Parse FMCSA response structure
                    if "content" in data and "carrier" in data["content"]:
                        carrier = data["content"]["carrier"]
                        return {
                            "dot_number": carrier.get("dotNumber"),
                            "company_name": carrier.get("legalName"),
                            "status": carrier.get("status"),
                            "safety_rating": carrier.get("safetyRating"),
                            "verified": True,
                            "mock": False
                        }
                    else:
                        return None
                elif response.status_code == 404:
                    print(f"DOT number {dot_number} not found in FMCSA database")
                    return None
                else:
                    print(f"FMCSA API error: {response.status_code}")
                    return None
                    
        except Exception as e:
            print(f"Error calling FMCSA API: {e}")
            return None


# Global instance - credentials loaded automatically
fmcsa_service = FMCSAService()

