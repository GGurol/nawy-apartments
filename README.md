Nawy Apartments – Full Stack Skeleton
Stack

Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS

Backend: Node.js + Express + TypeScript + Prisma ORM

Database: PostgreSQL

Containers: Dockerfiles for frontend & backend, Docker Compose to run all

Node: v20+

Project Structure
nawy-apartments/
├─ docker-compose.yml
├─ backend/
│  ├─ src/
│  │  └─ index.ts            # server entry
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.ts             # compiled to dist/prisma/seed.js
│  ├─ dist/                  # build output (includes dist/src/index.js, dist/prisma/seed.js)
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ Dockerfile
│  └─ .dockerignore
└─ frontend/
   ├─ src/
   │  └─ app/
   │     ├─ layout.tsx
   │     ├─ page.tsx
   │     └─ apartments/[id]/page.tsx
   ├─ public/
   ├─ tailwind.config.ts
   ├─ postcss.config.js
   ├─ package.json
   ├─ tsconfig.json
   ├─ Dockerfile
   └─ .dockerignore


Build output note: with the current tsconfig (rootDir: "."), the server compiles to dist/src/index.js and the seed to dist/prisma/seed.js.

Environment
Local (host)

backend/.env

DATABASE_URL=postgresql://postgres:<PASSWORD>@localhost:5432/nawy?schema=public
PORT=4000
CORS_ORIGIN=http://localhost:3000


frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:4000/api

Docker Compose

Inside containers, the DB host is db. On the host, Postgres is published as 5433.

backend/.env (used by Compose)

DATABASE_URL=postgresql://postgres:<PASSWORD>@db:5432/nawy?schema=public
PORT=4000
CORS_ORIGIN=http://localhost:3000


frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:4000/api


If <PASSWORD> contains special characters, URL-encode them (e.g. @ → %40).

Install (no Docker)
cd backend && npm install
cd ../frontend && npm install

Run locally (no Docker)

Start Postgres yourself and ensure DATABASE_URL points to it.

Backend:

cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run dev


Frontend:

cd frontend
npm run dev


Seed (after building TypeScript):

cd backend
npm run build
node dist/prisma/seed.js

Run with Docker

From the project root:

docker compose up --build


Frontend: http://localhost:3000

Backend: http://localhost:4000

Postgres: localhost:5433 (maps to container db:5432)

What Compose does

Starts Postgres (db) with healthcheck (published on host port 5433).

Builds and starts backend, runs npx prisma migrate deploy on startup, then starts the server (entry: dist/src/index.js).

Builds and starts frontend.

Seed in Docker (no package.json change required)
docker compose run --rm backend node dist/prisma/seed.js

API Endpoints

GET /api/apartments?search=&page=&limit=

GET /api/apartments/:id

POST /api/apartments

Troubleshooting

Backend container exits immediately

Check logs: docker compose logs --tail=200 backend

If you see Cannot find module '/app/dist/index.js', use the correct path: dist/src/index.js.

curl localhost:4000 → connection refused

Backend likely crashed during start (e.g., migrations). See logs above.

Prisma P1000 (auth failed)

DB password in DATABASE_URL doesn’t match the actual Postgres user password.

For Compose, change it inside the container:

docker compose exec -u postgres db psql -d postgres -c "ALTER USER postgres WITH PASSWORD '<PASSWORD>';"


Prisma CLI not found at runtime

Your image must include prisma at runtime or you must run migrations in a separate job.

Current Dockerfile/compose run npx prisma migrate deploy on start; ensure prisma is installed in the image (dependencies) and prisma/ is copied.

Frontend can’t reach backend when using Compose

Use NEXT_PUBLIC_API_URL=http://localhost:4000/api in the browser. http://backend:4000 works only inside Docker network, not in the browser.

Port conflicts

EADDRINUSE :3000 or :4000:

lsof -ti :3000 | xargs -r kill -9
lsof -ti :4000 | xargs -r kill -9


Reset database volume

Destroys data and re-initializes DB:

docker compose down -v
docker compose up --build