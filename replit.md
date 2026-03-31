# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── mann-jenny-universe/ # Mann & Jenny's Universe website (react-vite, at /)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Mann & Jenny's Universe

A private, emotionally-rich website for Mann (Dehradun, India) and Jenny/Suna/Aracely (Florida, USA). Built with React + Vite, no backend.

### Features
- **Home**: Live IST/EDT clocks, day counters (met: May 6 2025, married: June 7 2025), connection signal buttons, 55 twinkling gold stars
- **Story**: 6 chapters + epilogue of their love story with pull quotes
- **Memories**: Vertical animated timeline of 8 key moments
- **Letters**: Expandable cards with Mann's poems and Suna's letters, staggered poem-line animations
- **Messages**: Live message board with pre-seeded messages, send new ones
- **Recipes**: Indian & Guatemalan recipe cards, beetroot paratha dream card with float animation

### Design
- Fonts: Cormorant Garamond (serif) + DM Sans
- Light/dark mode toggle (persisted via localStorage key `mjTheme`)
- Scroll-triggered animations: fade-up, fade-in, scale-in, slide-left
- Scroll progress bar (rose color, 2px, fixed top)
- CSS custom properties for all colors — adapts seamlessly to dark mode

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/mann-jenny-universe` (`@workspace/mann-jenny-universe`)

React + Vite SPA. All frontend-only, no backend needed.

- Entry: `src/App.tsx` — router + ThemeProvider + Stars + ScrollProgress + Nav
- Pages: `src/pages/` — Home, Story, Memories, Letters, Messages, Recipes
- Components: `src/components/` — Nav, Stars, ScrollProgress, ThemeProvider

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Not used by mann-jenny-universe but available for future features.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec + Orval codegen config.
