"""
Centralized Configuration Management
All credentials and API keys are loaded from this module
"""

import json
import os
from pathlib import Path
from typing import Any, Dict, Optional


class Config:
    """
    Configuration Manager - Single source of truth for all credentials
    
    Usage:
        from src.utils.config import config
        
        # Access database credentials
        db_url = config.get("database.url")
        
        # Access API keys
        fmcsa_key = config.get("fmcsa.api_key")
        
        # Access nested values
        jwt_secret = config.get("jwt.secret")
    """
    
    _instance = None
    _config: Dict[str, Any] = {}
    
    def __new__(cls):
        """Singleton pattern - only one instance of Config"""
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
            cls._instance._load_config()
        return cls._instance
    
    def _load_config(self):
        """Load configuration from credentials.json file"""
        # Try to find credentials.json in project root
        possible_paths = [
            Path(__file__).parent.parent.parent.parent / "credentials.json",  # From backend/src/utils
            Path.cwd() / "credentials.json",  # Current directory
            Path.home() / ".carrier_board" / "credentials.json",  # User home directory
        ]
        
        config_path = None
        for path in possible_paths:
            if path.exists():
                config_path = path
                break
        
        if config_path is None:
            # If no credentials.json found, try to load from environment variables
            print("WARNING: credentials.json not found. Using environment variables or defaults.")
            self._config = self._load_from_env()
        else:
            try:
                with open(config_path, 'r') as f:
                    self._config = json.load(f)
                print(f"✓ Configuration loaded from: {config_path}")
            except Exception as e:
                print(f"ERROR: Failed to load credentials.json: {e}")
                self._config = self._load_from_env()
    
    def _load_from_env(self) -> Dict[str, Any]:
        """Fallback: Load configuration from environment variables"""
        return {
            "database": {
                "url": os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/carrier_board"),
                "host": os.getenv("DB_HOST", "localhost"),
                "port": int(os.getenv("DB_PORT", "5432")),
                "name": os.getenv("DB_NAME", "carrier_board"),
                "user": os.getenv("DB_USER", "postgres"),
                "password": os.getenv("DB_PASSWORD", "postgres"),
            },
            "jwt": {
                "secret": os.getenv("JWT_SECRET", "change-this-secret-key"),
                "algorithm": os.getenv("JWT_ALGORITHM", "HS256"),
                "access_token_expire_minutes": int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")),
                "refresh_token_expire_days": int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7")),
            },
            "fmcsa": {
                "api_key": os.getenv("FMCSA_API_KEY", ""),
                "api_url": os.getenv("FMCSA_API_URL", "https://mobile.fmcsa.dot.gov/qc/services/carriers"),
                "timeout": int(os.getenv("FMCSA_TIMEOUT", "10")),
            },
            "email": {
                "smtp_host": os.getenv("SMTP_HOST", "smtp.gmail.com"),
                "smtp_port": int(os.getenv("SMTP_PORT", "587")),
                "smtp_user": os.getenv("SMTP_USER", ""),
                "smtp_password": os.getenv("SMTP_PASSWORD", ""),
                "from_email": os.getenv("EMAIL_FROM", "noreply@carrierboard.com"),
            },
            "redis": {
                "url": os.getenv("REDIS_URL", "redis://localhost:6379"),
                "host": os.getenv("REDIS_HOST", "localhost"),
                "port": int(os.getenv("REDIS_PORT", "6379")),
                "password": os.getenv("REDIS_PASSWORD"),
            },
            "aws": {
                "access_key_id": os.getenv("AWS_ACCESS_KEY_ID", ""),
                "secret_access_key": os.getenv("AWS_SECRET_ACCESS_KEY", ""),
                "s3_bucket": os.getenv("AWS_S3_BUCKET", "carrier-board-uploads"),
                "region": os.getenv("AWS_REGION", "us-east-1"),
            },
            "frontend": {
                "url": os.getenv("FRONTEND_URL", "http://localhost:3000"),
                "cors_origins": os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(","),
            },
            "backend": {
                "url": os.getenv("BACKEND_URL", "http://localhost:8000"),
                "debug": os.getenv("DEBUG", "True").lower() == "true",
                "port": int(os.getenv("PORT", "8000")),
            },
            "security": {
                "rate_limit_per_minute": int(os.getenv("RATE_LIMIT_PER_MINUTE", "60")),
                "rate_limit_per_hour": int(os.getenv("RATE_LIMIT_PER_HOUR", "1000")),
                "bcrypt_rounds": int(os.getenv("BCRYPT_ROUNDS", "12")),
            },
            "monitoring": {
                "sentry_dsn": os.getenv("SENTRY_DSN", ""),
                "log_level": os.getenv("LOG_LEVEL", "INFO"),
            },
        }
    
    def get(self, key: str, default: Any = None) -> Any:
        """
        Get configuration value using dot notation
        
        Examples:
            config.get("database.url")
            config.get("jwt.secret")
            config.get("fmcsa.api_key")
        
        Args:
            key: Dot-separated path to configuration value
            default: Default value if key not found
        
        Returns:
            Configuration value or default
        """
        keys = key.split('.')
        value = self._config
        
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        
        return value
    
    def get_database_url(self) -> str:
        """Get database connection URL"""
        return self.get("database.url")
    
    def get_jwt_secret(self) -> str:
        """Get JWT secret key"""
        return self.get("jwt.secret")
    
    def get_fmcsa_api_key(self) -> str:
        """Get FMCSA API key"""
        return self.get("fmcsa.api_key")
    
    def get_cors_origins(self) -> list:
        """Get CORS allowed origins"""
        return self.get("frontend.cors_origins", [])
    
    def is_debug(self) -> bool:
        """Check if debug mode is enabled"""
        return self.get("backend.debug", False)
    
    def reload(self):
        """Reload configuration from file"""
        self._load_config()


# Global configuration instance
# Import this in other modules: from src.utils.config import config
config = Config()


# Convenience functions for common use cases
def get_database_url() -> str:
    """Get database URL"""
    return config.get_database_url()


def get_jwt_secret() -> str:
    """Get JWT secret"""
    return config.get_jwt_secret()


def get_fmcsa_config() -> Dict[str, Any]:
    """Get FMCSA API configuration"""
    return {
        "api_key": config.get("fmcsa.api_key"),
        "api_url": config.get("fmcsa.api_url"),
        "timeout": config.get("fmcsa.timeout", 10),
    }


def get_email_config() -> Dict[str, Any]:
    """Get email configuration"""
    return {
        "smtp_host": config.get("email.smtp_host"),
        "smtp_port": config.get("email.smtp_port"),
        "smtp_user": config.get("email.smtp_user"),
        "smtp_password": config.get("email.smtp_password"),
        "from_email": config.get("email.from_email"),
    }

