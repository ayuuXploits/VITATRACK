# VitaTrack 
| | |
|---|---|
| ![Dashboard](./docs/vitatrack1.png) | ![Targets](./docs/vitatrack2.png) |
| ![Activity](./docs/vitatrack3.png) | ![Workouts](./docs/vitatrack4.png) |

Smart nutrition & personalized fitness tracker — a full-stack web application for managing your health goals.

## Features

- **Personalized Calorie & Macro Targets** — calculated from your age, weight, height, and activity level using the Mifflin-St Jeor formula
- **6 Fitness Goals** — Lose Weight, Gain Weight, Stay Healthy — with gym, home, and no-workout plans
- **Weekly Workout Routines** — 7-day plans tailored to your goal and workout environment (gym or home)
- **Guided Workout Mode** — step-through exercise coach with integrated rest timer
- **Exercise Library** — 40+ exercises across chest, back, legs, shoulders, arms, and core
- **Smart Calorie Log** — searchable food database with 50+ Indian & international foods
- **Meal Templates** — save and reload your favourite meals in one click
- **Body Measurement Tracker** — log chest, waist, hips, and arms over time
- **Weight Trend Chart** — visualize progress with a 7-day moving average
- **Sleep Tracker** — log bedtime and wake time, see weekly averages
- **Mood & Energy Log** — track your wellbeing alongside your fitness data
- **Hydration Tracker** — glass-by-glass water logging with a daily goal
- **Streak & Badges** — 49-day activity heatmap and 7 achievement badges
- **Daily Challenges** — 3 randomized daily health challenges
- **AI Health Coach** — powered by Claude (Anthropic) via Replit AI Integrations; provides meal suggestions, workout tips, weekly summaries, and motivation
- **Export** — download food and weight logs as CSV, print as PDF
- **Custom Targets** — override calorie/macro goals with doctor-prescribed values

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, TypeScript 5.9 |
| Styling | Custom CSS (dark theme) + Tailwind CSS v4 |
| Charts | Recharts + Chart.js |
| Backend | Node.js 24, Express 5 |
| AI | Anthropic Claude (via Replit AI Integrations) |
| Validation | Zod v4, Drizzle-Zod |
| API Contract | OpenAPI 3.1 + Orval codegen |
| Database | PostgreSQL + Drizzle ORM |
| Package Manager | pnpm workspaces |
| Build | esbuild (server), Vite (client) |

## Project Structure

```
vitatrack/
├── artifacts/
│   ├── vitatrack/               # Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── data/            # Static data: food DB, exercise DB, routines
│   │   │   ├── hooks/           # useVitaTrack — centralized state management
│   │   │   ├── components/      # UI components by feature
│   │   │   │   └── vitatrack/   # VitaTrack-specific components
│   │   │   │       └── tabs/    # Tab content components
│   │   │   ├── pages/           # Route-level pages
│   │   │   └── styles/          # Feature CSS (vitatrack.css)
│   │   └── vite.config.ts
│   └── api-server/              # Backend (Express)
│       └── src/
│           ├── routes/
│           │   ├── health.ts    # GET /api/healthz
│           │   └── vitatrack.ts # POST /api/vitatrack/ai-coach
│           └── app.ts
├── lib/
│   ├── api-spec/                # OpenAPI 3.1 source of truth
│   ├── api-client-react/        # Generated React Query hooks
│   ├── api-zod/                 # Generated Zod validation schemas
│   ├── db/                      # Drizzle ORM schema + client
│   └── integrations-anthropic-ai/ # Replit AI Integration client
├── docs/                        # Architecture docs and assets
├── scripts/                     # Utility scripts
└── pnpm-workspace.yaml
```

## Installation & Setup

### Prerequisites

- Node.js 24+
- pnpm 9+

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd vitatrack
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` | Anthropic API proxy URL (auto-set on Replit) |
| `AI_INTEGRATIONS_ANTHROPIC_API_KEY` | Anthropic API key (auto-set on Replit) |
| `SESSION_SECRET` | Secret for session signing |

### 4. Set up the database

```bash
pnpm --filter @workspace/db run push
```

### 5. Run in development

Start the API server:

```bash
pnpm --filter @workspace/api-server run dev
```

Start the frontend:

```bash
pnpm --filter @workspace/vitatrack run dev
```

### 6. Regenerate API types (after spec changes)

```bash
pnpm --filter @workspace/api-spec run codegen
```

### 7. Build for production

```bash
pnpm run build
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/healthz` | Health check |
| `POST` | `/api/vitatrack/ai-coach` | AI health coach (Claude) |

### AI Coach Request

```json
POST /api/vitatrack/ai-coach
{
  "prompt": "Suggest 3 meal ideas for 400 remaining calories"
}
```

### AI Coach Response

```json
{
  "text": "Here are 3 great meal ideas..."
}
```

## Development Notes

- **Never call `pnpm dev` at the workspace root** — each artifact has its own dev script
- **Run codegen after every spec change** — `pnpm --filter @workspace/api-spec run codegen`
- **Use `pnpm run typecheck`** for a full type check across all packages
- The API server uses structured JSON logging via `pino` — use `req.log` inside route handlers

## License

MIT
