# Boilerplate120 - Project Starter Template

A modern React boilerplate created by **120 Ventures GmbH** for Lovable and Cursor Vibe Coder projects. This template provides a solid foundation for rapid development with best practices and modern tooling.

## 🎯 Why Use This Boilerplate?

**Built for Venture Builders Who Move Fast**

As a venture builder, every day counts. This boilerplate eliminates the repetitive setup work that typically consumes the first 1-2 weeks of any new project, letting you focus on what matters: **building and shipping value to your customers**.

### ⚡ Ship Faster
- **Zero Setup Time**: Start coding immediately with a fully configured development environment
- **Pre-built Components**: Skip the tedious UI work with a complete shadcn/ui component library
- **Modern Tooling**: Vite's lightning-fast hot reload keeps you in the flow
- **TypeScript Ready**: Catch bugs early and refactor with confidence

### 🛡️ Build Safer
- **Battle-tested Stack**: Every technology choice has been validated in production environments
- **Type Safety**: TypeScript prevents runtime errors before they reach your customers
- **Linting & Standards**: Consistent code quality across your entire team
- **Responsive by Default**: Mobile-first approach ensures your product works everywhere

### 💰 Deliver More Value
- **Focus on Features**: Spend time building unique value propositions, not boilerplate
- **Consistent Quality**: Every project starts with the same high standards
- **Team Velocity**: New developers can contribute immediately with familiar patterns
- **Scalable Foundation**: Architecture that grows with your venture from MVP to scale

**Perfect for**: MVPs, client projects, internal tools, and any venture that needs to validate ideas quickly while maintaining professional quality.

## 🚀 About This Boilerplate

This project serves as a starting point for new applications, featuring:

**Currently Included:**
- Modern React setup with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui component library (fully configured)
- ESLint configuration
- Basic routing structure
- Mobile-responsive hooks

**Coming Soon:**
- Additional custom components
- Style guides and design tokens
- Pre-configured packages for common use cases
- Advanced patterns and utilities
- Documentation templates

## 🛠️ How to Use This Boilerplate

### Option 1: Clone with Cursor (Recommended)

1. **Open Cursor IDE**
2. **Clone Repository:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Git: Clone" and select it
   - Enter this repository URL: `https://github.com/your-username/boilerplate120.git`
   - Choose a local directory for your new project

3. **Create Your Own Repository:**
   - Remove the existing git remote: `git remote remove origin`
   - Create a new repository on GitHub (or your preferred git service)
   - Add your new remote: `git remote add origin <YOUR_NEW_REPO_URL>`
   - Push to your new repository: `git push -u origin main`

### Option 2: Manual Setup

```sh
# Step 1: Clone this boilerplate
git clone https://github.com/your-username/boilerplate120.git your-project-name

# Step 2: Navigate to your project
cd your-project-name

# Step 3: Remove the original git history and create a new one
rm -rf .git
git init
git add .
git commit -m "Initial commit from boilerplate120"

# Step 4: Connect to your new repository
git remote add origin <YOUR_NEW_REPO_URL>
git push -u origin main

# Step 5: Install dependencies
pnpm install

# Step 6: Start development
pnpm dev
```

### Option 3: Use as Template

1. Click "Use this template" button on GitHub
2. Create a new repository from this template
3. Clone your new repository
4. Install dependencies and start developing

## 📁 Project Structure

```
src/
├── components/ui/     # shadcn/ui components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## 🛠️ Technology Stack

This boilerplate is built with modern, production-ready technologies:

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **ESLint** - Code linting and formatting

## 🚀 Development

This project uses **pnpm** as its package manager. If you don't have it installed, run `npm install -g pnpm` (or see [pnpm.io/installation](https://pnpm.io/installation)).

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## 🧪 Testing

The boilerplate ships with a two-layer testing setup:

- **Unit tests** — [Vitest](https://vitest.dev/) with `jsdom`, located under `tests/unit/**/*.spec.ts(x)` (or co-located in `src/`).
- **E2E tests** — [Playwright](https://playwright.dev/) against a local Supabase stack, located under `tests/e2e/**/*.spec.ts`. A `global-setup` auto-starts Supabase and loads env from `.env.test`; auth flows use the seeded `TEST_USER` from `supabase/seed.sql`.

```sh
# Run unit tests
pnpm exec vitest run

# Run e2e tests (starts the dev server + Supabase automatically)
pnpm test:e2e

# Run a single e2e spec
pnpm exec playwright test tests/e2e/<file>.spec.ts
```

> **For Cursor users:** this repo includes an `add-tests` skill at `.cursor/skills/add-tests/SKILL.md` with repo-specific conventions (fixtures, selectors, RLS seeding, common pitfalls). Cursor loads it automatically when you ask it to write or debug tests — follow it when adding new specs.

## 📦 What's Included

- ✅ Pre-configured Vite + React + TypeScript setup
- ✅ Tailwind CSS with custom configuration
- ✅ Complete shadcn/ui component library
- ✅ ESLint configuration for code quality
- ✅ Cursor rules for consistent development standards
- ✅ Mobile-responsive utilities
- ✅ Basic routing structure
- ✅ Toast notifications system
- ✅ Dark mode support (via shadcn/ui)

## 🤝 Contributing to the Boilerplate

This boilerplate is maintained by 120 Ventures GmbH. If you have suggestions for improvements or additional features that would benefit all projects using this template, please:

1. Fork this repository
2. Create a feature branch
3. Submit a pull request with your improvements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Created with ❤️ by 120 Ventures GmbH**
