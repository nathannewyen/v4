<div align="center">
  <h1>v4</h1>
  <p>The fourth iteration of my personal website built with Next.js 16 and Tailwind CSS 4</p>

<a href="https://nathan-v4.vercel.app/" target="_blank">nathan-v4.vercel.app</a>

</div>

---

<img width="1600" height="800" alt="image" src="https://github.com/user-attachments/assets/527a0a07-e4e1-4904-a12c-0af3e98755a9" />

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat-square&logo=vitest)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat-square&logo=playwright)

## Features

- Server-side rendering with Next.js App Router
- Dark/Light theme with `next-themes`
- GitHub stars fetched via SWR
- Stack Overflow integration
- Responsive design with Tailwind CSS 4
- PWA support with `next-pwa`
- E2E testing with Playwright
- Unit testing with Vitest and Testing Library

## Color Reference

### Light Mode

| Color                | Hex       | Preview                                                                         |
| -------------------- | --------- | ------------------------------------------------------------------------------- |
| Background           | `#f5f5f5` | ![#f5f5f5](https://img.shields.io/badge/-f5f5f5?style=flat-square&color=f5f5f5) |
| Primary Text         | `#1A2234` | ![#1A2234](https://img.shields.io/badge/-1A2234?style=flat-square&color=1A2234) |
| Secondary Background | `#E2E8F0` | ![#E2E8F0](https://img.shields.io/badge/-E2E8F0?style=flat-square&color=E2E8F0) |
| Tertiary Background  | `#CBD5E1` | ![#CBD5E1](https://img.shields.io/badge/-CBD5E1?style=flat-square&color=CBD5E1) |

### Dark Mode

| Color           | Hex       | Preview                                                                         |
| --------------- | --------- | ------------------------------------------------------------------------------- |
| Background      | `#0a0a0f` | ![#0a0a0f](https://img.shields.io/badge/-0a0a0f?style=flat-square&color=0a0a0f) |
| Navigation      | `#15151f` | ![#15151f](https://img.shields.io/badge/-15151f?style=flat-square&color=15151f) |
| Primary Text    | `#e5e5e5` | ![#e5e5e5](https://img.shields.io/badge/-e5e5e5?style=flat-square&color=e5e5e5) |
| Secondary Text  | `#a0a0a0` | ![#a0a0a0](https://img.shields.io/badge/-a0a0a0?style=flat-square&color=a0a0a0) |
| Card Background | `#1a1a2e` | ![#1a1a2e](https://img.shields.io/badge/-1a1a2e?style=flat-square&color=1a1a2e) |
| Card Accent     | `#2a2a3e` | ![#2a2a3e](https://img.shields.io/badge/-2a2a3e?style=flat-square&color=2a2a3e) |
| Border          | `#3a3a4e` | ![#3a3a4e](https://img.shields.io/badge/-3a3a4e?style=flat-square&color=3a3a4e) |

## Forking This Repo

Yes, you can fork this repo. Please give me proper credit by linking back to [nathannewyen.github.io/v4](https://nathannewyen.github.io/v4). Thanks!

I value keeping this site open source, but as you all know, _plagiarism is bad_. I spent a non-trivial amount of effort building and designing this iteration of my site, and I am proud of it! All I ask is that you not claim this effort as your own.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/nathannewyen/v4.git
cd v4
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your own values (GitHub token, username, etc.)

4. Start the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

To make this portfolio your own:

1. Update `.env.local` with your credentials
2. Edit `src/data/` for your projects and experience
3. Update `src/constants/` for colors and social links
4. Replace images in `public/`

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details on development.

## Available Scripts

| Script                  | Description                      |
| ----------------------- | -------------------------------- |
| `npm run dev`           | Start development server         |
| `npm run build`         | Build for production             |
| `npm run start`         | Start production server          |
| `npm run lint`          | Run ESLint                       |
| `npm run lint:fix`      | Fix ESLint errors                |
| `npm run format`        | Format code with Prettier        |
| `npm run test`          | Run unit tests with Vitest       |
| `npm run test:ui`       | Run tests with Vitest UI         |
| `npm run test:coverage` | Generate test coverage report    |
| `npm run test:e2e`      | Run E2E tests with Playwright    |
| `npm run test:e2e:ui`   | Run E2E tests with Playwright UI |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contributions/      # Contributions page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── sections/           # Page sections (Hero, Experience, Projects, etc.)
│   ├── ui/                 # Reusable UI components
│   └── icons/              # SVG icon components
├── constants/              # App constants and configuration
├── data/                   # Static data (projects, experience)
├── hooks/                  # Custom React hooks
└── __tests__/              # Test files
```

## License

[MIT](LICENSE)
