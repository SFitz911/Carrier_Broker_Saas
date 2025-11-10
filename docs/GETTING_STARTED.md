# Getting Started with Carrier Board

Welcome to the Carrier Board project! This guide will help you get up and running quickly.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Git** - Version control
- **Python 3.10+** - Backend runtime
- **Node.js 18+** - Frontend runtime
- **PostgreSQL 15+** - Database
- **Docker & Docker Compose** (Optional but recommended)

## 🚀 Quick Start (Using Docker)

The easiest way to get started is using Docker Compose:

```bash
# 1. Clone the repository
git clone https://github.com/SFitz911/Carrier_Broker_Saas.git
cd Carrier_Broker_Saas

# 2. Start all services
cd docker
docker-compose up
```

That's it! The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs
- Database: localhost:5432

## 🛠️ Manual Setup

### Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r ../requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Start the server
python main.py
```

Backend will be available at http://localhost:8000

### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# 4. Start development server
npm run dev
```

Frontend will be available at http://localhost:3000

### Database Setup

```bash
# 1. Create PostgreSQL database
createdb carrier_board

# 2. Run schema
psql carrier_board < database/schema.sql

# 3. (Optional) Seed data
psql carrier_board < database/seeds/seed.sql
```

## 🎯 Your First Contribution

1. **Pick an issue** - Check [Issues](https://github.com/SFitz911/Carrier_Broker_Saas/issues) for `good first issue` label

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** - Follow the [Contributing Guidelines](../CONTRIBUTING.md)

4. **Test your changes**
   ```bash
   # Backend
   cd backend && pytest
   
   # Frontend
   cd frontend && npm test
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** - Use the PR template

## 📚 Next Steps

- Read the [Project Outline](../PROJECT_OUTLINE.md)
- Check the [Logic Tree](../LOGIC_TREE.md) for architecture
- Review the [Audit Report](../AUDIT_REPORT.md)
- Join the Discord/communication channel

## ❓ Common Issues

### Port Already in Use

```bash
# Check what's using the port
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Mac/Linux
lsof -i :3000
lsof -i :8000
```

### Database Connection Failed

- Make sure PostgreSQL is running
- Check your DATABASE_URL in .env
- Verify database credentials

### Module Not Found

```bash
# Backend
pip install -r requirements.txt

# Frontend
cd frontend && npm install
```

## 💬 Need Help?

- Check the [Documentation](../README.md)
- Ask in the project Discord
- Open an issue with the `question` label

Happy coding! 🚀

