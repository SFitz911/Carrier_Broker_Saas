# Credentials Setup Guide

> **⚠️ OPTIONAL FOR STUDENTS!**  
> This guide is for production deployment only.  
> **Students do NOT need API keys to develop on this project!**  
> See [NO_API_KEYS_REQUIRED.md](./NO_API_KEYS_REQUIRED.md) instead.

---

This project uses a **centralized credentials system** for managing production API keys and sensitive information.

## 🎓 For Students

**You can skip this entire document!** 

The project works WITHOUT credentials using mock services. Only read this if you're:
- Deploying to production
- Want to test with real APIs (optional)
- Setting up a production environment

## 🔐 Why Centralized Credentials? (Production Only)

- ✅ **Single Source of Truth** - Update credentials in one place
- ✅ **Security** - Keep sensitive data out of code
- ✅ **Easy Management** - No hunting through multiple files
- ✅ **Optional for Development** - Students don't need it

## 📁 Setup Instructions

### Step 1: Create Your Credentials File

```bash
# Copy the example file
cp credentials.example.json credentials.json
```

### Step 2: Edit credentials.json

Open `credentials.json` and update with your actual values:

```json
{
  "database": {
    "url": "postgresql://user:password@localhost:5432/carrier_board",
    "password": "YOUR_ACTUAL_DB_PASSWORD"
  },
  "jwt": {
    "secret": "GENERATE_A_RANDOM_SECRET_KEY_HERE"
  },
  "fmcsa": {
    "api_key": "YOUR_FMCSA_API_KEY"
  }
  // ... etc
}
```

### Step 3: Secure the File

**IMPORTANT:** `credentials.json` is in `.gitignore` and will NEVER be committed to git.

```bash
# Verify it's ignored
git status  # Should NOT show credentials.json
```

## 🔧 How to Use in Code

### Backend (Python)

The config module automatically loads credentials:

```python
from src.utils.config import config

# Get any credential using dot notation
database_url = config.get("database.url")
jwt_secret = config.get("jwt.secret")
fmcsa_key = config.get("fmcsa.api_key")

# Use helper methods
db_url = config.get_database_url()
jwt = config.get_jwt_secret()
```

### Example Service

```python
# backend/src/services/my_service.py
from src.utils.config import config

class MyService:
    def __init__(self):
        # Credentials loaded automatically from credentials.json
        self.api_key = config.get("my_api.api_key")
        self.api_url = config.get("my_api.api_url")
    
    def call_api(self):
        # Use self.api_key
        pass
```

### Frontend (JavaScript/TypeScript)

For frontend, use environment variables that reference backend config:

```typescript
// frontend/src/utils/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
});
```

## 🎯 When to Update Credentials

### Adding a New API Service

1. **Add to `credentials.example.json`** (template for team):
   ```json
   {
     "new_service": {
       "api_key": "your_api_key_here",
       "api_url": "https://api.example.com"
     }
   }
   ```

2. **Add to your `credentials.json`** (your actual keys):
   ```json
   {
     "new_service": {
       "api_key": "abc123real",
       "api_url": "https://api.example.com"
     }
   }
   ```

3. **Use in code**:
   ```python
   from src.utils.config import config
   
   api_key = config.get("new_service.api_key")
   ```

### Changing an Existing Key

Just update `credentials.json`:

```json
{
  "fmcsa": {
    "api_key": "NEW_KEY_HERE"  // ← Change here
  }
}
```

**All code automatically uses the new key** - no code changes needed!

## 🔑 Generating Secure Keys

### JWT Secret

```bash
# Generate random secret
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Password Hash

```bash
# Use bcrypt (installed with requirements.txt)
python -c "from passlib.hash import bcrypt; print(bcrypt.hash('your_password'))"
```

## 🌍 Environment-Based Configuration

The system supports multiple configuration sources:

1. **credentials.json** (highest priority)
2. **Environment variables** (fallback)
3. **Default values** (last resort)

### Using Environment Variables

If `credentials.json` doesn't exist, the system falls back to environment variables:

```bash
export DATABASE_URL="postgresql://..."
export JWT_SECRET="your-secret"
export FMCSA_API_KEY="your-key"
```

## 📂 File Locations

The config system checks these locations (in order):

1. `./credentials.json` (project root)
2. `$HOME/.carrier_board/credentials.json` (user directory)
3. Environment variables

## 🚫 Security Best Practices

### DO:
- ✅ Keep `credentials.json` out of version control
- ✅ Use strong, randomly generated secrets
- ✅ Rotate keys regularly
- ✅ Use different keys for development/production
- ✅ Share `credentials.example.json` with team

### DON'T:
- ❌ Never commit `credentials.json` to git
- ❌ Don't hardcode credentials in code
- ❌ Don't share your `credentials.json` file
- ❌ Don't use weak or default passwords
- ❌ Don't reuse secrets across environments

## 🔄 Team Collaboration

### For New Team Members:

1. Clone the repository
2. Copy `credentials.example.json` to `credentials.json`
3. Ask team lead for development credentials
4. Update `credentials.json` with provided values

### For Team Leads:

1. Keep development credentials in a secure password manager
2. Share development keys securely (never via email/chat)
3. Use different credentials for dev/staging/production
4. Rotate keys when team members leave

## 🐛 Troubleshooting

### "Configuration not found" error

```bash
# Make sure credentials.json exists
ls credentials.json

# If not, create it
cp credentials.example.json credentials.json
```

### "Invalid API key" error

Check that your `credentials.json` has the correct key:

```json
{
  "service_name": {
    "api_key": "CHECK_THIS_VALUE"
  }
}
```

### Reload Configuration

If you update `credentials.json` while the app is running:

```python
from src.utils.config import config
config.reload()  # Reload from file
```

## 📚 Configuration Reference

See `credentials.example.json` for complete list of all configuration options.

### Quick Reference:

| Service | Key Path | Description |
|---------|----------|-------------|
| Database | `database.url` | PostgreSQL connection string |
| JWT | `jwt.secret` | Secret for JWT tokens |
| FMCSA | `fmcsa.api_key` | DOT/MC verification API |
| Email | `email.smtp_password` | SMTP password |
| AWS | `aws.access_key_id` | AWS access key |
| Redis | `redis.url` | Redis connection string |

## 🆘 Need Help?

- Check `backend/src/utils/config.py` for implementation
- Review `credentials.example.json` for structure
- Ask in project Discord #help channel

---

**Remember: Never commit `credentials.json` to version control!** ⚠️

