# ─── STAGE 1: Build the frontend ──────────────────────────────────────────────
# settings.py wires STATICFILES_DIRS to frontend/dist/assets, so the Vite
# build MUST happen before `collectstatic` runs in stage 2.
FROM node:26-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ─── STAGE 2: Python/Django runtime ───────────────────────────────────────────
FROM python:3.12-slim

# Prevent Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

# Overlay the freshly built frontend assets (overrides any stale local dist/)
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Collect static files
RUN python manage.py collectstatic --noinput

# Run gunicorn
CMD ["sh", "-c", "gunicorn prepro_tracker.wsgi:application --bind 0.0.0.0:${PORT:-8080} --workers 1 --threads 8"]