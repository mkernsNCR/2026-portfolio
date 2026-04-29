# 2026 Portfolio

Personal portfolio site for **Matt Kerns**, built with React 19, TypeScript, Vite 8, Tailwind CSS 4, Framer Motion, and Three.js (via `@react-three/fiber`).

## Tech stack

- **React** 19 + **react-dom** 19
- **TypeScript** 5.9
- **Vite** 8 + `@vitejs/plugin-react` 6
- **Tailwind CSS** 4 (via `@tailwindcss/postcss`)
- **Framer Motion** 12
- **Three.js** 0.184 with `@react-three/fiber` 9 and `@react-three/drei` 10
- **ESLint** 9 (flat config) with `typescript-eslint` 8 and `eslint-plugin-react-hooks` 7

## Getting started

```bash
npm install
npm run dev          # start Vite dev server (http://localhost:5173)
npm run build        # type-check + production build
npm run preview      # preview the production build locally
npm run lint         # ESLint (flat config)
npm run type-check   # tsc --noEmit
```

## Project structure

```
src/
  App.tsx
  main.tsx
  index.css            # Tailwind v4 entry (@import "tailwindcss")
  components/          # Hero, Nav, Projects, Skills, Contact, ModeToggle, ...
  context/             # ThemeContext (mode toggle, persisted)
  data/                # site config + projects/skills data
  pages/               # PortfolioPage, Home
  themes/              # theme primitives
  utils/
```

## Tailwind v4 notes

This project uses Tailwind v4 with the legacy JS config bridge so the existing
`tailwind.config.js` (custom colors, animations, gradients, shadows) keeps working:

```css
/* src/index.css */
@import "tailwindcss";
@config "../tailwind.config.js";
```

PostCSS uses the new dedicated plugin:

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## ESLint flat config

ESLint 9 requires `eslint.config.js` (flat config). The config wires up
`typescript-eslint`, `eslint-plugin-react-hooks` v7, and
`eslint-plugin-react-refresh`. The new react-hooks v7 rules
(`purity`, `set-state-in-effect`, `refs`, `immutability`, `exhaustive-deps`)
are set to `warn` so the existing codebase can adopt them incrementally.

## Security & dependency maintenance

Run a security audit and apply fixes:

```bash
npm audit
npm audit fix          # non-breaking
npm audit fix --force  # includes major-version bumps (review carefully)
```

Status as of the last refresh: **0 vulnerabilities**.

## Deployment

The `dist/` directory is the production build output (gitignored). Deploy it
to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).