# Multi-stage build for nep-web (Next.js 15 standalone output). Placeholder — stages to be defined.
# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app
# COPY package files / install deps TBD

FROM node:20-alpine AS build
WORKDIR /app
# COPY source / next build TBD

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# COPY standalone output TBD
EXPOSE 3000
CMD ["node", "server.js"]
