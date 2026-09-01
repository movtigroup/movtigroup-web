# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Environment variables (configurable)
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Copy built application
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev --legacy-peer-deps

# Expose port (configurable via NUXT_PORT)
EXPOSE ${NUXT_PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${NUXT_PORT}/api/health || exit 1

# Start the application
CMD ["node", ".output/server/index.mjs"]
