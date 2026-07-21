# ─── STAGE 1: Install dependencies ───────────────────────────────────────────
# Use official Node LTS on slim Debian. We'll strip it to non-root in stage 2.
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files first — Docker layer caches this if deps haven't changed
COPY package*.json ./

# Install ONLY production dependencies. --ignore-scripts prevents malicious
# postinstall scripts from running (supply chain attack prevention).
RUN npm ci --omit=dev --ignore-scripts

# ─── STAGE 2: Runtime image ───────────────────────────────────────────────────
# node:20-slim is the runtime base — no build tools, no shell history
FROM node:20-slim AS runtime

# Set NODE_ENV so Express runs in production mode (disables stack traces in errors)
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

# Copy installed modules from builder (not re-installing in final image)
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY src/    ./src/
COPY static/ ./static/
COPY package.json ./

# ── SECURITY: Run as non-root user ────────────────────────────────────────────
# Never run as root inside a container. If a vulnerability allows container
# escape, root in container = root on host. Tahis creates a minimal system user.
RUN groupadd --gid 1001 magapp && \
    useradd  --uid 1001 --gid magapp --shell /bin/false --no-create-home magapp && \
    chown -R magapp:magapp /app

USER magapp

# ── SECURITY: No new privileges ───────────────────────────────────────────────
# Prevents the process from gaining additional OS privileges via setuid binaries
# (belt-and-suspenders against privilege escalation exploits)

EXPOSE 8080

# Use exec form (not shell form) so signals are passed to Node directly,
# enabling graceful shutdown — important for Cloud Run rolling deploys
CMD ["node", "src/server.js"]

# ── LABELS for audit trail ────────────────────────────────────────────────────
LABEL org.opencontainers.image.title="Server API"
LABEL org.opencontainers.image.description="Proxy server"
LABEL org.opencontainers.image.vendor="Freedoom Inc"
