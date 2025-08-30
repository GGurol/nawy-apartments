# Nawy Apartments — Backend (Node.js + TypeScript)

A minimal REST API to list, fetch, and add apartments. Built with Express, Prisma (PostgreSQL), and zod. Output compiled to CommonJS.

Tech Stack

Node.js 20+ (works on 18+), TypeScript (CJS)

Express – Web framework

Prisma 5.18.0 (PostgreSQL) – ORM

Zod – Validation

dotenv, cors, morgan – Utilities

Quick Start (Local)
cd backend
cp .env.example .env
# Set DATABASE_URL to your local Postgres (5432 if running locally; 5433 if using docker-compose mapping)
npm install
npx prisma generate
npx prisma migrate dev --name init

# Seed (local, via ts-node)
npm run seed

# Dev
npm run dev

# Prod-style run without changing package.json:
npm run build
node dist/src/index.js

Environment Variables

Create backend/.env from the example:

DATABASE_URL=postgresql://postgres:<PASSWORD>@localhost:5432/nawy?schema=public
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development


If you use docker-compose with 5433:5432, connect from the host using localhost:5433.
Inside containers, use db:5432 (service name).

API Endpoints
Health

GET /api/health → { ok: true }

Apartments

List GET /api/apartments?search=&page=&limit=
Params: search (unitName/unitNumber/project, case-insensitive), page (default 1), limit (default 10, max 100)
Response:

{
  "items": [/* Apartment */],
  "page": 1,
  "limit": 10,
  "total": 123
}


Get by ID GET /api/apartments/:id → 200 or 404 { "message": "Not found" }

Create POST /api/apartments

{
  "unitName": "Lake View 1BR",
  "unitNumber": "C-12",
  "project": "Mivida",
  "price": 3200000,
  "description": "One-bedroom overlooking lake",
  "imageUrl": "https://..." // optional
}

Database Schema (Prisma)
model Apartment {
  id          String   @id @default(uuid())
  unitName    String
  unitNumber  String
  project     String
  price       Int
  description String
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

Scripts

npm run dev – Start with hot reload (ts-node-dev)

npm run build – Compile TypeScript to dist/
(server → dist/src/index.js, seed → dist/prisma/seed.js)

npm start – Uses node dist/index.js (won’t work with current tsconfig).
Use node dist/src/index.js or change rootDir to "src".

npm run prisma:generate – Prisma client

npm run prisma:migrate – Dev migration

npm run prisma:deploy – Deploy migrations

npm run seed – Local seed via ts-node (prisma/seed.ts)

Docker Notes

Backend start (in compose/Dockerfile) should use the actual compiled path:
node dist/src/index.js

Migrations on start (if configured):
npx prisma migrate deploy && node dist/src/index.js

Requires prisma to be available at runtime (it is, in your dependencies) and prisma/ copied into the image.

Seed in Docker (no package.json change needed):

docker compose run --rm backend node dist/prisma/seed.js


DB host/ports: inside containers use db:5432; from host use localhost:5433 (mapped).

Error Handling

400 Zod validation details

404 Not found

500 { "message": "Internal Server Error" } with server-side logging