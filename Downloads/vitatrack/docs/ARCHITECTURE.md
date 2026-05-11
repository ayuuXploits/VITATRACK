# VitaTrack — Architecture

## Overview

VitaTrack is a full-stack health tracking application built in a pnpm monorepo.

```
Browser (React SPA)
       │
       │  GET /          → Vite-built React app (artifacts/vitatrack)
       │  POST /api/*    → Express REST API (artifacts/api-server)
       │
       ▼
  Shared Proxy (localhost:80)
       │
   ┌───┴────────────────────┐
   │                        │
   ▼                        ▼
React+Vite app        Express 5 API
port 23680            port 5000
```

## Design Decisions

### 1. AI Proxied via Backend
The original HTML called Anthropic's API directly from the browser (no auth header, 401 error). All AI requests are now proxied through `POST /api/vitatrack/ai-coach`, keeping the key server-side and enabling future rate limiting.

### 2. Contract-First API (OpenAPI → Codegen)
The API contract lives in `lib/api-spec/openapi.yaml`. Running `pnpm --filter @workspace/api-spec run codegen` generates:
- **`@workspace/api-client-react`** — React Query hooks for the frontend
- **`@workspace/api-zod`** — Zod schemas for backend validation

Both the frontend and backend use the same source of truth.

### 3. Client-Side State (No DB for Tracking Data)
Food logs, weight entries, sleep/mood data are kept in React state (via `useVitaTrack` hook). This matches the original HTML app's UX. Persistence can be added later via the existing Drizzle ORM/PostgreSQL setup.

### 4. CSS Architecture
VitaTrack uses its own CSS file (`src/styles/vitatrack.css`) with CSS custom properties alongside Tailwind CSS v4. The VitaTrack CSS uses the `.vt-*` namespace to avoid collisions.

### 5. Mifflin-St Jeor BMR Formula
```
Male:   BMR = 10W + 6.25H - 5A + 5
Female: BMR = 10W + 6.25H - 5A - 161
TDEE = BMR × activity multiplier
```
Macro splits: Lose → P35/C35/F30, Gain → P30/C45/F25, Maintain → P25/C50/F25

## Package Map

| Package | Type | Purpose |
|---|---|---|
| `artifacts/vitatrack` | leaf app | React + Vite frontend |
| `artifacts/api-server` | leaf app | Express API server |
| `lib/api-spec` | lib | OpenAPI spec + Orval codegen config |
| `lib/api-client-react` | lib | Generated React Query hooks |
| `lib/api-zod` | lib | Generated Zod validation schemas |
| `lib/db` | lib | Drizzle ORM schema + DB client |
| `lib/integrations-anthropic-ai` | lib | Replit AI Integration for Anthropic |

## Data Flow — AI Coach

```
User types prompt
      │
      ▼
AICoachTab.tsx
      │ POST /api/vitatrack/ai-coach
      ▼
artifacts/api-server/src/routes/vitatrack.ts
      │ client.messages.create()
      ▼
Anthropic Claude (via Replit AI proxy)
      │
      ▼
{ text: "..." } → displayed in UI
```

## Adding a New Feature

1. Define the API contract in `lib/api-spec/openapi.yaml`
2. Run `pnpm --filter @workspace/api-spec run codegen`
3. Add the backend route in `artifacts/api-server/src/routes/`
4. Register it in `artifacts/api-server/src/routes/index.ts`
5. Use the generated React Query hook from `@workspace/api-client-react` in the frontend
6. Use the generated Zod schema from `@workspace/api-zod` for validation
