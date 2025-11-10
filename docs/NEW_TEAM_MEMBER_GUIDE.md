# 👋 Welcome New Team Member!

**Getting started is EASY! Follow these steps and you'll be coding in 10 minutes.**

---

## 📋 What You Need (One-Time Setup)

Install these on your computer:

1. **Git** - [Download here](https://git-scm.com/downloads)
2. **Python 3.10+** - [Download here](https://www.python.org/downloads/)
3. **Node.js 18+** - [Download here](https://nodejs.org/)
4. **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Get the Code

```bash
# Open Terminal (Mac/Linux) or PowerShell (Windows)

# Go to where you want the project
cd Desktop  # or wherever you like

# Clone the project
git clone https://github.com/SFitz911/Carrier_Broker_Saas.git

# Go into the project folder
cd Carrier_Broker_Saas
```

### Step 2: Start the Backend

```bash
# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate

# Install packages
pip install -r ../requirements.txt

# Start the backend server
python main.py
```

**You should see:** `Starting Carrier Board API on port 8000`

✅ **Backend is running!** Keep this terminal open.

### Step 3: Start the Frontend

**Open a NEW terminal window** (keep backend running!)

```bash
# Go to project folder
cd Carrier_Broker_Saas

# Go to frontend folder
cd frontend

# Install packages (first time only)
npm install

# Start the frontend
npm run dev
```

**You should see:** `ready - started server on 0.0.0.0:3000`

✅ **Frontend is running!** 

### Step 4: See It Working!

Open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API Docs:** http://localhost:8000/api/docs

**🎉 You're done! The app is running!**

---

## 💻 Making Your First Change

### 1. Create a New Branch

```bash
# Make sure you're in the main project folder
cd Carrier_Broker_Saas

# Create your own branch
git checkout -b feature/your-name-first-feature

# Example:
git checkout -b feature/john-add-button
```

### 2. Make a Change

Let's try editing something simple:

**File:** `frontend/src/pages/index.tsx`

```typescript
// Find this line (around line 18):
<h1 className="text-5xl font-bold text-gray-900 mb-4">
  🚛 Carrier Board
</h1>

// Add your name below it:
<p className="text-lg text-gray-600">
  Built by [YOUR NAME] and the Nextwork team!
</p>
```

**Save the file.** Your browser will auto-refresh!

### 3. Save Your Changes

```bash
# See what you changed
git status

# Add your changes
git add .

# Commit with a SHORT message
git commit -m "feat: add developer name to homepage"

# Push to GitHub
git push origin feature/your-name-first-feature
```

### 4. Create a Pull Request

1. Go to: https://github.com/SFitz911/Carrier_Broker_Saas
2. Click **"Pull requests"**
3. Click **"New pull request"**
4. Choose your branch
5. Click **"Create pull request"**
6. Fill out the form
7. Submit!

**🎉 You just made your first contribution!**

---

## 📁 Project Structure (Where Things Are)

```
Carrier_Broker_Saas/
├── backend/                # Python API
│   ├── main.py            # Start here
│   └── src/
│       ├── routes/        # API endpoints
│       ├── services/      # Business logic
│       └── models/        # Database models
│
├── frontend/              # React/Next.js
│   └── src/
│       ├── pages/         # Website pages
│       ├── components/    # Reusable UI parts
│       └── styles/        # CSS styles
│
└── docs/                  # Documentation
    └── YOU ARE HERE! 📍
```

---

## 🎯 What Can I Work On?

### 1. Check GitHub Issues

Go to: https://github.com/SFitz911/Carrier_Broker_Saas/issues

Look for labels:
- **`good first issue`** - Perfect for beginners!
- **`help wanted`** - We need help here

### 2. Pick Your Squad

- **Frontend Team** - Build the website (React/TypeScript)
- **Backend Team** - Build the API (Python/FastAPI)
- **DevOps Team** - Deploy and manage servers
- **QA Team** - Test and find bugs

Ask the team lead which squad needs help!

---

## 💬 Getting Help

### Stuck? Don't Worry!

**Everyone gets stuck!** Here's what to do:

1. **Check the docs** - Look in the `docs/` folder
2. **Ask in Discord** - Post in #help channel
3. **Google it** - Copy the error message
4. **Ask a teammate** - We're here to help!

### Common Problems

**"Python not found"**
```bash
# Make sure Python is installed
python --version

# Try python3 instead
python3 --version
```

**"npm not found"**
```bash
# Install Node.js from nodejs.org
# Then restart your terminal
```

**"Port already in use"**
```bash
# Something else is using port 3000 or 8000
# Close other apps or change the port
```

**"Module not found"**
```bash
# Backend:
pip install -r requirements.txt

# Frontend:
npm install
```

---

## 📖 Important Files to Read

1. **[README.md](../README.md)** - Project overview
2. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - How to contribute properly
3. **[CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)** - Be nice to everyone
4. **[PROJECT_OUTLINE.md](../PROJECT_OUTLINE.md)** - What we're building

---

## 🎓 Learning Resources

### New to Git?
- [Git Tutorial](https://www.atlassian.com/git/tutorials)
- [GitHub Hello World](https://guides.github.com/activities/hello-world/)

### New to Python?
- [Python Tutorial](https://www.python.org/about/gettingstarted/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)

### New to React?
- [React Tutorial](https://react.dev/learn)
- [Next.js Tutorial](https://nextjs.org/learn)

### New to TypeScript?
- [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)

---

## ✅ Daily Workflow

**Every time you start working:**

1. **Pull latest changes**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create/switch to your branch**
   ```bash
   git checkout feature/your-branch
   ```

3. **Start coding!**

4. **Save your work often**
   ```bash
   git add .
   git commit -m "feat: short description"
   git push origin feature/your-branch
   ```

---

## 🎉 Tips for Success

1. **Ask questions** - No question is dumb!
2. **Commit often** - Save your work frequently
3. **Test your code** - Make sure it works
4. **Read others' code** - Learn from the team
5. **Be patient** - Everyone starts somewhere
6. **Have fun!** - This is a learning project

---

## 🚨 Need Help Right Now?

**Discord:** [Nextwork.org Server]  
**Email:** carrier-board@nextwork.org  
**GitHub Issues:** Tag @SFitz911

---

**Welcome to the team! We're excited to have you! 🎊**

*Last updated: November 10, 2025*

