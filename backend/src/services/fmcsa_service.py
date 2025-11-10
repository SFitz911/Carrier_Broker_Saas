"""
FMCSA API Service
Handles DOT/MC number verification using centralized credentials
"""

import httpx
from typing import Dict, Optional
from src.utils.config import config


class FMCSAService:
    """
    Service for interacting with FMCSA API
    All API credentials are loaded from centralized config
    """
    
    def __init__(self):
        # Load credentials from centralized config
        self.api_key = config.get("fmcsa.api_key")
        self.api_url = config.get("fmcsa.api_url")
        self.timeout = config.get("fmcsa.timeout", 10)
    
    async def verify_mc_number(self, mc_number: str) -> Optional[Dict]:
        """
        Verify MC number with FMCSA API
        
        Args:
            mc_number: Motor Carrier number to verify
        
        Returns:
            Company data if found, None otherwise
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    f"{self.api_url}/{mc_number}",
                    headers={
                        "Authorization": f"Bearer {self.api_key}"
                    }
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    print(f"FMCSA API error: {response.status_code}")
                    return None
                    
        except Exception as e:
            print(f"Error calling FMCSA API: {e}")
            return None
    
    async def verify_dot_number(self, dot_number: str) -> Optional[Dict]:
        """
        Verify DOT number with FMCSA API
        
        Args:
            dot_number: Department of Transportation number to verify
        
        Returns:
            Company data if found, None otherwise
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    f"{self.api_url}/dot/{dot_number}",
                    headers={
                        "Authorization": f"Bearer {self.api_key}"
                    }
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    print(f"FMCSA API error: {response.status_code}")
                    return None
                    
        except Exception as e:
            print(f"Error calling FMCSA API: {e}")
            return None


# Global instance - credentials loaded automatically
fmcsa_service = FMCSAService()

