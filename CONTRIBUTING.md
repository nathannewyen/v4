# Contributing to v4

First off, thanks for taking the time to contribute! This portfolio is open source and contributions are welcome.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:

- A clear description of the feature
- Why it would be useful
- Any implementation ideas you have

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Ensure the build passes (`npm run build`)
4. Run linting (`npm run lint`)
5. Submit your pull request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/v4.git
cd v4

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your values in .env.local
# See .env.example for required variables

# Start development server
npm run dev
```

### Available Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Build for production     |
| `npm run lint`     | Run ESLint               |
| `npm run lint:fix` | Fix ESLint issues        |
| `npm run format`   | Format with Prettier     |
| `npm run test`     | Run unit tests           |
| `npm run test:e2e` | Run E2E tests            |

## Code Style

This project uses:

- **ESLint** for linting
- **Prettier** for formatting
- **TypeScript** for type safety

Pre-commit hooks will automatically lint and format staged files.

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # React components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── constants/    # App-wide constants
├── types/        # TypeScript types
└── data/         # Static data
```

## Questions?

Feel free to open an issue if you have questions about contributing.
