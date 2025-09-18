Nawy Apartments – Full Stack Skeleton
Stack

Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS

Backend: Node.js + Express + TypeScript + Prisma (PostgreSQL)

Database: PostgreSQL

Containers: Dockerfiles for frontend & backend, Docker Compose to run all


### Local Installation ###

1. Clone the repository:
```bash
git clone https://github.com/GGurol/nawy-apartments.git
```

2. Navigate to project directory:
```bash
cd nawy-apartments
```

3. Build the docker:
```bash
docker compose up --build -d
```


Frontend: http://localhost:3000

Backend: http://localhost:4000

Postgres: localhost:5433 (maps to container db:5432)



API Endpoints

GET /api/apartments?search=&page=&limit=

search (optional): case-insensitive match on unitName, unitNumber, project

page (default: 1)

limit (default: 10, max: 100)

GET /api/apartments/:id

POST /api/apartments

