# Stage 1: Build the frontend
FROM node:26-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the backend and runtime
FROM node:26-slim
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production
COPY backend/ ./

# Copy built frontend assets from stage 1
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Switch to the existing non-root user
USER node

# Expose the Cloud Run port
ENV PORT=8080
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
