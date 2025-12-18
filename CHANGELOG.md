# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-12-18

### Changed

- CI workflow now triggers on both `main` and `develop` branches
- Updated CONTRIBUTING.md to require running tests before PRs
- Contributors should now branch from and PR to `develop`

## [1.0.1] - 2025-12-18

### Added

- Centralized site config (`src/config/site.ts`) for easier forking and customization
- Detailed customization instructions in README

### Changed

- Updated Hero and Connect components to use centralized site config
- Site now available at custom domain `newyen.dev`
- Derived `SOCIAL_LINKS` from site config for backward compatibility

### Fixed

- Fixed Stack Exchange API 400 error in useStackOverflow hook
- Centralized SWR configuration to reduce duplication across hooks

## [1.0.0] - 2025-12-18

### Added

- Initial public release
- Portfolio homepage with Hero, Experience, Projects, and Stack Overflow sections
- Open source contributions showcase page with GitHub and Gerrit integration
- Dark/Light theme support with `next-themes`
- Real-time GitHub stars fetching via SWR
- Stack Overflow top answers integration
- Contribution heatmap visualization
- Responsive design with Tailwind CSS 4
- PWA support with `next-pwa`
- Unit testing with Vitest
- E2E testing with Playwright
- GitHub Actions CI workflow
- Environment variable configuration for easy forking

### Infrastructure

- Next.js 16 with App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint + Prettier for code quality
- Husky + lint-staged for pre-commit hooks
