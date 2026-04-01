# Job Tracker Pro

A portfolio-focused Next.js app for tracking applications, interviews, follow-ups, and offers.

## Why This Project

This app is designed to strengthen core React and Next.js fundamentals with practical features that are easy to explain in interviews:

- App Router architecture
- Server and client component boundaries
- Route handlers and data mutations
- Form UX and validation
- Sorting, filtering, and pagination
- Auth and role-based pages

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Milestone Plan

### Milestone 1: UI foundation (current)

- Dashboard shell with KPI cards and recent applications table
- Design system colors and typography
- Mobile-responsive layout

### Milestone 2: Core CRUD with local data

- Add route for application list and detail pages
- Add new application form with validation
- Edit and delete actions

### Milestone 3: Real backend

- Add Prisma + Postgres
- Build route handlers for applications and notes
- Add seed script for demo data

### Milestone 4: Auth and protected routes

- Sign in and sign out flows
- User-specific dashboard data
- Middleware for protected pages

### Milestone 5: Portfolio polish

- Pipeline analytics chart
- Saved filters
- Empty/loading/error states
- README screenshots and architecture notes

## Suggested Tech Stack Upgrades

- Form handling: react-hook-form + zod
- Data and cache: TanStack Query or server actions
- Database: Postgres + Prisma
- Auth: Clerk or Auth.js
- Charts: Recharts

## Milestone 3 Database Setup

1. Update DATABASE_URL in .env to your Postgres instance.
2. Generate Prisma client:

```bash
npm run db:generate
```

3. Create and apply your first migration:

```bash
npm run db:migrate -- --name init
```

4. Seed demo records:

```bash
npm run db:seed
```

## Deploy

```bash
npx vercel --prod
```

## Portfolio Checklist

- Add a short case study in README (problem, choices, tradeoffs)
- Include screenshots and a live Vercel URL
- Add a short Loom walkthrough
- Keep commit history clean and incremental
