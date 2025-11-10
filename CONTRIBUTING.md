# Contributing to Carrier Board

First off, thank you for considering contributing to Carrier Board! 🎉

This is a student-led project, and we welcome contributions from developers of all skill levels. Whether you're fixing a typo, adding a feature, or improving documentation, your help is appreciated.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Communication](#communication)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Git
- Node.js (v18+)
- Python (v3.10+)
- Docker & Docker Compose
- A GitHub account

### Setup Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Carrier_Board.git
   cd Carrier_Board
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Nextwork-org/Carrier_Board.git
   ```

4. **Set up virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

5. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   cd frontend && npm install
   ```

6. **Create environment files**:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

7. **Run the application**:
   ```bash
   docker-compose up
   ```

## 🤝 How to Contribute

### Types of Contributions

We welcome many types of contributions:

- 🐛 **Bug fixes** - Found a bug? Open an issue and submit a fix
- ✨ **New features** - Have an idea? Discuss it first, then implement
- 📝 **Documentation** - Improve README, add guides, fix typos
- 🎨 **UI/UX improvements** - Make the app more beautiful and usable
- ✅ **Tests** - Increase test coverage
- 🔧 **Refactoring** - Improve code quality without changing functionality
- 🌐 **Translations** - Add support for new languages (future)

### Finding Something to Work On

1. Check the [Issues](https://github.com/Nextwork-org/Carrier_Board/issues) page
2. Look for labels:
   - `good first issue` - Great for beginners
   - `help wanted` - We need help on these
   - `bug` - Something isn't working
   - `enhancement` - New feature or request
   - `documentation` - Documentation improvements

3. **Comment on an issue** to let others know you're working on it

## 🔄 Development Workflow

### Branching Strategy

We use **Git Flow** branching strategy:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features (branch from `develop`)
- `bugfix/*` - Bug fixes (branch from `develop`)
- `hotfix/*` - Urgent fixes (branch from `main`)
- `release/*` - Release preparation (branch from `develop`)

### Working on a Feature

1. **Create a new branch** from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit regularly:
   ```bash
   git add .
   git commit -m "feat: add user profile page"
   ```

3. **Keep your branch updated**:
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub

## 📏 Coding Standards

### General Principles

- Write clean, readable, and maintainable code
- Follow DRY (Don't Repeat Yourself) principle
- Write meaningful variable and function names
- Comment complex logic
- Keep functions small and focused

### Frontend (JavaScript/TypeScript)

- Use **ESLint** and **Prettier** for code formatting
- Follow **React** best practices
- Use functional components and hooks
- TypeScript types for all props and functions
- Use `const` and `let`, avoid `var`

**Example:**
```typescript
interface UserProps {
  name: string;
  email: string;
  role: 'carrier' | 'broker' | 'shipper';
}

const UserCard: React.FC<UserProps> = ({ name, email, role }) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
};
```

### Backend (Python)

- Follow **PEP 8** style guide
- Use **Black** for formatting
- Use type hints
- Write docstrings for functions and classes
- Use meaningful variable names

**Example:**
```python
from typing import List, Optional
from pydantic import BaseModel

class User(BaseModel):
    """User model representing a platform user."""
    
    id: int
    username: str
    email: str
    role: str
    
    def get_full_profile(self) -> dict:
        """
        Get complete user profile with additional data.
        
        Returns:
            dict: Complete user profile data
        """
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role
        }
```

### Testing

- Write tests for new features
- Maintain or improve test coverage
- Use descriptive test names

**Test Example:**
```python
def test_user_creation():
    """Test that a user can be created successfully."""
    user = User(
        id=1,
        username="testuser",
        email="test@example.com",
        role="carrier"
    )
    assert user.username == "testuser"
    assert user.email == "test@example.com"
```

## 💬 Commit Message Guidelines

We follow the **Conventional Commits** specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no code change)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependencies

### Examples

```bash
feat(auth): add email verification

Implement email verification flow for new users.
Users will receive an email with a verification link.

Closes #123
```

```bash
fix(api): resolve 500 error on user registration

The error was caused by missing email validation.
Added proper validation and error handling.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added Docker setup instructions and troubleshooting section.
```

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] Added tests for new features
- [ ] Updated documentation if needed
- [ ] Commits follow commit message guidelines
- [ ] Branch is up to date with `develop`

### PR Template

When you open a PR, please include:

**Description:**
- What does this PR do?
- Why is this change needed?

**Related Issue:**
- Closes #123

**Type of Change:**
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

**Testing:**
- How has this been tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

**Screenshots:** (if applicable)

### Review Process

1. **Automated checks** will run (CI/CD pipeline)
2. **At least 2 reviewers** must approve
3. Address any requested changes
4. Once approved, a maintainer will merge

### After Merge

- Delete your feature branch
- Pull the latest `develop` branch
- Start working on your next contribution!

## 🐛 Issue Guidelines

### Creating an Issue

**Bug Report:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 96]
- Version: [e.g. v1.0.0]
```

**Feature Request:**
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other relevant information.
```

## 💬 Communication

### Where to Get Help

- **Discord:** [Nextwork.org Community](https://discord.gg/nextwork)
- **GitHub Discussions:** For general questions and ideas
- **GitHub Issues:** For bugs and feature requests

### Daily Standups

- Core team members attend daily standups
- Share what you worked on, what you're working on, and any blockers
- Optional for casual contributors

### Weekly Meetings

- All-hands meeting every week
- Review progress, discuss challenges, plan next steps
- Calendar invite sent via Discord

## 🎯 First-Time Contributors

Welcome! Here's how to make your first contribution:

1. **Pick a "good first issue"** from the Issues page
2. **Comment** on the issue to claim it
3. **Ask questions** if anything is unclear
4. **Submit your PR** - don't worry about making it perfect
5. **Learn from feedback** - reviewers are here to help!

## 🏆 Recognition

Contributors will be:
- Listed in [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Mentioned in release notes
- Featured in project showcases
- Eligible for recommendation letters (core contributors)

## 📚 Additional Resources

- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

---

**Thank you for contributing to Carrier Board! 🚛✨**

Questions? Reach out on Discord or open a discussion on GitHub.

