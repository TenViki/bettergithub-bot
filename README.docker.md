# Docker Setup Guide

This application is fully dockerized with Docker Compose for easy deployment.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose V2

## Quick Start

1. **Configure environment variables**
   
   Copy the `.env.template` to `.env` and fill in your values:
   ```bash
   cp .env.template .env
   ```

   Add MongoDB credentials to your `.env`:
   ```
   MONGO_USERNAME=admin
   MONGO_PASSWORD=your_secure_password
   MONGO_DATABASE=bettergithub
   ```

2. **Build and start all services**
   
   ```bash
   docker compose up -d
   ```

   This will start:
   - MongoDB on port 27017
   - Backend API on port 3000 (configurable via BACKEND_PORT)
   - Frontend on port 80 (configurable via FRONTEND_PORT)

3. **View logs**
   
   ```bash
   # All services
   docker compose logs -f
   
   # Specific service
   docker compose logs -f backend
   docker compose logs -f frontend
   docker compose logs -f mongodb
   ```

4. **Stop services**
   
   ```bash
   docker compose down
   ```

5. **Stop and remove volumes (WARNING: deletes database data)**
   
   ```bash
   docker compose down -v
   ```

## Development

For development with hot-reload, you can override the backend and frontend services:

```bash
# Start only MongoDB
docker compose up -d mongodb

# Run backend and frontend locally
cd backend && npm run dev
cd frontend && npm run dev
```

## Production Deployment

1. Ensure all environment variables are properly set in `.env`
2. Build with production optimization:
   ```bash
   docker compose build --no-cache
   ```
3. Start services:
   ```bash
   docker compose up -d
   ```

## Troubleshooting

**Port conflicts:**
- Change ports in `.env`:
  ```
  BACKEND_PORT=3001
  FRONTEND_PORT=8080
  ```

**Database connection issues:**
- Check MongoDB is running: `docker compose ps`
- Verify credentials in `.env`
- Check logs: `docker compose logs mongodb`

**Rebuild after code changes:**
```bash
docker compose up -d --build
```

## Backup & Restore

**Backup MongoDB:**
```bash
docker compose exec mongodb mongodump --username admin --password changeme --authenticationDatabase admin --out /dump
docker compose cp mongodb:/dump ./backup
```

**Restore MongoDB:**
```bash
docker compose cp ./backup mongodb:/dump
docker compose exec mongodb mongorestore --username admin --password changeme --authenticationDatabase admin /dump
```
