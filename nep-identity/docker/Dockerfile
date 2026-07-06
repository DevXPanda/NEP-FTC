# Multi-stage build for nep-identity (NestJS). Build context is the repo root.
# syntax=docker/dockerfile:1

# ---------- deps: install all dependencies (incl. dev) ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---------- build: generate Prisma client + compile TypeScript ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ---------- prod-deps: production-only node_modules ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
# Prisma client must exist in the pruned modules for runtime.
COPY prisma ./prisma
RUN npx prisma generate

# ---------- runtime: minimal image ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
USER nestjs
EXPOSE 3000
CMD ["node", "dist/main.js"]
