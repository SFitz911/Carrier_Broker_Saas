# 🚛 Carrier Board

> **A Nextwork.org Student DevOps Project**  
> Building transparency and fairness in the freight brokering industry

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🎯 What is Carrier Board?

Carrier Board is a **two-way rating platform** for the freight and trucking industry. Currently, brokers and shippers can rate carriers (truck drivers), but carriers have no way to rate brokers back. This creates an unfair power imbalance.

**We're changing that.**

Carrier Board allows:
- ✅ Carriers to rate and review brokers
- ✅ Brokers to rate and review carriers
- ✅ Verified company profiles using DOT/MC numbers
- ✅ Transparent reputation scores for all parties
- ✅ A fair, accountable freight ecosystem

---

## 🎓 About This Project

This is a **student-led, production-grade SaaS project** developed by the Nextwork.org learning community. It serves two purposes:

1. **Solve a real problem** in the logistics industry
2. **Provide hands-on DevOps experience** for students learning modern software development

### Built By Students, For Learning

- 👥 Team Size: 10-30 students
- ⏱️ Timeline: 8-10 weeks
- 🛠️ Stack: React, Node.js, PostgreSQL, Docker, GitHub Actions
- 🚀 Goal: Production-ready SaaS application

---

## ✨ Features

### Current (MVP)
- 🔐 User authentication and authorization
- ✅ DOT/MC number verification
- ⭐ Two-way rating and review system
- 📊 Company reputation dashboards
- 🔍 Search and filter companies
- 📱 Responsive design (mobile-friendly)

### Coming Soon
- 🤖 AI-powered fake review detection
- 📧 Email notifications
- 💬 Company response to reviews
- 🏆 Badges and achievements
- 📈 Analytics and insights
- 🔗 FMCSA safety rating integration

---

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Next.js** for SSR/SSG
- **Tailwind CSS** for styling
- **Zustand** for state management

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication

### DevOps
- **Docker** & Docker Compose
- **GitHub Actions** for CI/CD
- **Vercel** (Frontend hosting)
- **Railway** (Backend & Database)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nextwork-org/Carrier_Board.git
   cd Carrier_Board
   ```

2. **Set up Python virtual environment**
   ```bash
   python -m venv .venv
   
   # Windows
   .venv\Scripts\activate
   
   # Mac/Linux
   source .venv/bin/activate
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Copy example env files
   cp .env.example .env
   cp frontend/.env.example frontend/.env.local
   
   # Edit with your configuration
   ```

6. **Run with Docker Compose** (Recommended)
   ```bash
   docker-compose up
   ```

   The app will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:5432

### Manual Setup (Without Docker)

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py migrate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Database:**
```bash
# Make sure PostgreSQL is running
psql -U postgres
CREATE DATABASE carrier_board;
```

---

## 📁 Project Structure

```
Carrier_Board/
├── .github/              # GitHub Actions workflows
├── backend/              # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── tests/
│   └── package.json
├── frontend/             # Frontend (React/Next.js)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── database/             # Database schemas and migrations
│   ├── migrations/
│   └── seeds/
├── docs/                 # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
├── docker/               # Docker configurations
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── .venv/                # Python virtual environment
├── .gitignore
├── PROJECT_OUTLINE.md    # Detailed project plan
├── README.md             # This file
├── CONTRIBUTING.md       # Contribution guidelines
├── CODE_OF_CONDUCT.md    # Community standards
└── requirements.txt      # Python dependencies
```

---

## 🤝 Contributing

We welcome contributions from all Nextwork.org students and the wider community!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Good First Issues

Look for issues tagged with `good first issue` or `help wanted` in the Issues tab.

---

## 👥 Team

### Project Lead
- **Student Developer** - Project Founder & Lead

### Core Contributors
- See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for the full list

### Want to Join?
Contact us on the Nextwork.org Discord or open an issue expressing interest!

---

## 📚 Documentation

- **[Project Outline](./PROJECT_OUTLINE.md)** - Detailed implementation plan
- **[API Documentation](./docs/API.md)** - Backend API reference
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and architecture
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - How to deploy
- **[User Guide](./docs/USER_GUIDE.md)** - For end users

---

## 🧪 Testing

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

### Test Coverage

```bash
npm run test:coverage
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Nextwork.org** - For providing the learning community and support
- **All Contributors** - For their time and effort
- **Freight Industry Advisors** - For domain expertise and feedback

---

## 📞 Contact & Support

- **Discord:** [Nextwork.org Community](https://discord.gg/nextwork)
- **Email:** carrier-board@nextwork.org
- **Issues:** [GitHub Issues](https://github.com/Nextwork-org/Carrier_Board/issues)

---

## 🗺️ Roadmap

### Phase 1: MVP (Weeks 1-5) ✅
- [x] Project setup and team organization
- [x] Basic authentication
- [x] Company profiles
- [x] Review system
- [x] Search functionality

### Phase 2: Production Features (Weeks 6-7) 🚧
- [ ] Advanced authentication (RBAC, email verification)
- [ ] FMCSA/DOT API integration
- [ ] Comment moderation
- [ ] Company responses to reviews
- [ ] Security hardening

### Phase 3: Launch (Weeks 8-10) 📅
- [ ] Beta testing
- [ ] Performance optimization
- [ ] Documentation
- [ ] Public launch
- [ ] Showcase presentation

### Phase 4: Future Enhancements 🔮
- [ ] AI-powered review analysis
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] API for third-party integrations

---

## ⭐ Star Us!

If you find this project helpful or interesting, please give it a star! It helps us reach more students and contributors.

---

**Built with ❤️ by the Nextwork.org Community**

*Curiosity • Collaboration • Creation*

