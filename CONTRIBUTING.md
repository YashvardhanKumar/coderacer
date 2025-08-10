# Contributing to CodeRacer

Thank you for considering contributing to CodeRacer! We welcome contributions from developers of all skill levels. This guide will help you understand our development process and how to contribute effectively.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Architecture Overview](#architecture-overview)
- [Code of Conduct](#code-of-conduct)

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (version 18 or later)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/coderacer.git
   cd coderacer
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/YashvardhanKumar/coderacer.git
   ```

## 🔧 Development Setup

### Option 1: Docker Development (Recommended)

1. **Install dependencies and start all services**:

   ```bash
   # Install root dependencies
   npm install

   # Install dependencies for all workspaces
   cd client/user && npm install
   cd ../contributor && npm install
   cd ../../server && npm install
   cd ..

   # Start all services with Docker
   docker-compose up -d
   ```

2. **Access the application**:
   - Main application: http://localhost

### Option 2: Local Development

1. **Install dependencies**:

   ```bash
   npm install
   cd client/user && npm install
   cd ../contributor && npm install
   cd ../../server && npm install
   ```

2. **Start development servers**:
   ```bash
   # In separate terminals:
   npm run dev:user        # User frontend
   npm run dev:contributor # Contributor frontend
   npm run dev:server      # Backend server
   ```

## 🔄 Development Workflow

### Creating a Feature Branch

1. **Sync with upstream**:

   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

### Making Changes

1. **Make your changes** in the appropriate directory:
   - `client/user/` - User-facing frontend
   - `client/contributor/` - Contributor frontend
   - `server/` - Backend API
   - Root directory - Configuration files

2. **Test your changes**:

   ```bash
   # Run linting
   npm run lint:all

   # Type checking (server)
   npm run type-check:server

   # Test with Docker
   docker-compose build
   docker-compose up -d
   ```

### Pre-commit Checks

This project uses automated pre-commit hooks that will run automatically when you commit:

- **ESLint**: Code quality checks
- **Prettier**: Automatic code formatting
- **Commitlint**: Validates commit message format

If any check fails, fix the issues and try committing again.

## 🎨 Code Style Guidelines

### Formatting

- **Prettier** handles all code formatting automatically
- Configuration is in `.prettierrc`
- Format files manually: `npx prettier --write .`

### Linting

- **ESLint** enforces code quality rules
- Server uses TypeScript ESLint configuration
- Client apps have their own ESLint configurations
- Fix linting issues: `npm run lint:all`

### File Organization

```
coderacer/
├── client/
│   ├── user/          # User frontend (Next.js)
│   └── contributor/   # Contributor frontend
├── server/            # Backend API (TypeScript)
├── .github/          # GitHub Actions workflows
└── docs/             # Documentation
```

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements
- `ci:` - Changes to CI configuration files and scripts

### Examples

```bash
git commit -m "feat: add user profile page"
git commit -m "fix: resolve login authentication issue"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
```

## 🔀 Pull Request Process

### Before Submitting

1. **Ensure your branch is up to date**:

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run all checks locally**:

   ```bash
   npm run lint:all
   npm run type-check:server
   ```

3. **Test your changes** thoroughly

### Submitting Your PR

1. **Push your branch**:

   ```bash
   git push origin your-branch
   ```

2. **Create a Pull Request** on GitHub with:
   - **Clear title** following conventional commit format
   - **Detailed description** explaining your changes
   - **Reference to related issues** (e.g., "Fixes #123")
   - **Screenshots** for UI changes

### PR Requirements

- ✅ All CI checks must pass
- ✅ Code follows project style guidelines
- ✅ Commit messages follow conventional format
- ✅ No merge conflicts with main branch
- ✅ PR description clearly explains the changes

### Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be **squash merged** into main
- Your branch will be automatically deleted after merge

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, browser, Docker version)
- **Screenshots or logs** if applicable

### Feature Requests

For new features:

- **Describe the problem** you're trying to solve
- **Explain your proposed solution**
- **Consider alternative approaches**
- **Discuss implementation details** if relevant

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## 🏗️ Architecture Overview

CodeRacer is built as a monorepo with the following components:

### Frontend Applications

- **User App** (`client/user/`): Next.js application for end users
- **Contributor App** (`client/contributor/`): Interface for content contributors

### Backend

- **Server** (`server/`): TypeScript/Node.js API server
- **Database**: Configured through Docker Compose
- **Nginx**: Reverse proxy and static file serving

### Development Tools

- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files
- **Prettier**: Code formatting
- **ESLint**: Code quality analysis
- **Commitlint**: Commit message validation

## 🤝 Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code. Please report unacceptable behavior to the project maintainers.

## 💡 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Pull Request Reviews**: For code-specific questions

## 🏆 Recognition

Contributors will be recognized in our README.md file. We appreciate all contributions, whether they're code, documentation, bug reports, or feature suggestions!

---

Thank you for contributing to CodeRacer! 🎉
