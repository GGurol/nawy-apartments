# syntax=docker/dockerfile:1.7

# ---------- base ----------
    FROM node:20-alpine AS base
    WORKDIR /app
    # Needed by Prisma engines on Alpine
    RUN apk add --no-cache openssl libc6-compat
    
    # ---------- deps (install with dev deps) ----------
    FROM base AS deps
    ENV NODE_ENV=development
    COPY package.json package-lock.json* ./
    RUN npm ci --no-audit --no-fund  # installs dev deps because NODE_ENV=development
    
    # ---------- build ----------
    FROM deps AS build
    COPY tsconfig.json ./
    COPY prisma ./prisma
    COPY src ./src
    # Generate Prisma client & compile TS
    RUN npx prisma generate && npm run build
    # Keep only prod deps in node_modules (prisma stays because it's in dependencies)
    RUN npm prune --omit=dev
    
    # ---------- runtime ----------
    FROM base AS runner
    ENV NODE_ENV=production
    WORKDIR /app
    
    # Copy runtime artifacts
    COPY --from=build /app/node_modules ./node_modules
    COPY --from=build /app/dist ./dist
    # ⬇️ Required for migrate deploy (needs migrations folder)
    COPY --from=build /app/prisma ./prisma
    
    EXPOSE 4000
    # If compose overrides command, fine. Otherwise:
    CMD ["sh","-c","npx prisma migrate deploy && (node dist/prisma/seed.js || echo 'seed skipped') && node dist/src/index.js"]
    