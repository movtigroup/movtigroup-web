# Multi-stage build for production (app listens on port 3002)
# Node 22+ is required by better-sqlite3 (used by @nuxt/content)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (better-sqlite3 needs build deps on alpine)
RUN apk add --no-cache python3 make g++ \
  && npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Environment variables (configurable) — default port: 3002
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3002

# Copy built application + start script
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/scripts/start.mjs ./scripts/start.mjs
COPY --from=builder /app/package*.json ./

# Expose port (configurable via PORT)
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/api/health || exit 1

# Start the application (scripts/start.mjs defaults PORT to 3002)
CMD ["node", "scripts/start.mjs"]
