# Carrier Board - Backend API

FastAPI backend for the Carrier Board platform.

## Tech Stack

- **Framework:** FastAPI
- **Language:** Python 3.10+
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy (planned)
- **Authentication:** JWT

## Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r ../requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Run Development Server

```bash
python main.py
```

The API will be available at:
- API: http://localhost:8000
- Swagger Docs: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Project Structure

```
backend/
├── main.py              # Application entry point
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── tests/               # Unit and integration tests
└── .env.example         # Environment template
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Coming Soon
- Authentication endpoints
- User management
- Company profiles
- Reviews and ratings

## Development

### Run Tests

```bash
pytest
```

### Code Formatting

```bash
black .
```

### Linting

```bash
flake8 .
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

