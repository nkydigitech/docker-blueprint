# Capstone — NaijaFood App

**Analogy:** Full Owambe Stack — Flask API (jollof kitchen) + Redis (store room) + Nginx (bouncer at gate). Production-ready.

## What You're Building
A NaijaFood API that:
1. Serves a menu of Naija foods via Flask
2. Tracks visitor count in Redis
3. Routes traffic through Nginx reverse proxy
4. Uses multi-stage build for small images
5. Has healthchecks on all services

## Project Structure
```
capstone/
  app.py                  # Flask API
  requirements.txt        # Python deps
  Dockerfile.multi        # Multi-stage build
  docker-compose.prod.yml # Production compose
  nginx.conf              # Reverse proxy config
  .dockerignore           # Exclude junk
```

## app.py
```python
from flask import Flask, jsonify
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST','localhost'), decode_responses=True)

@app.route('/health')
def health(): return {'status': 'ok'}

@app.route('/api/menu')
def menu():
    r.incr('hits')
    return jsonify({
        "foods": ["Jollof", "Suya", "Pounded Yam", "Egusi"],
        "hits": r.get('hits')
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

## Dockerfile.multi
```dockerfile
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1
CMD ["python", "app.py"]
```

## docker-compose.prod.yml
```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.multi
    depends_on:
      redis:
        condition: service_healthy
    environment: [REDIS_HOST=redis]
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 10s
      retries: 5
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"]
    depends_on: [api]
    restart: unless-stopped
volumes:
  redisdata:
```

## Build and Run
```bash
cd capstone
docker compose -f docker-compose.prod.yml up --build -d
docker compose -f docker-compose.prod.yml ps
```
**Expected Output:** All 3 services Up (healthy). Nginx exposed on port 80.

## Test
```bash
curl http://localhost/api/menu
curl http://localhost/api/menu
curl http://localhost/health
```
**Expected Output:** Hit counter increments. `{"foods":["Jollof","Suya","Pounded Yam","Egusi"],"hits":"1"}`

## Success Criteria
1. compose up brings up 3 services — all healthy
2. /api/menu returns Naija foods with a hit counter
3. Redis data persists after docker compose down (without -v)
4. API image is under 200MB (multi-stage build)
5. Healthchecks pass on all services

## Cleanup
```bash
docker compose -f docker-compose.prod.yml down -v
```

## Production Checklist
1. Add .env for secrets (Lab 07)
2. Use named volumes for Redis data persistence
3. Set restart: unless-stopped on all services
4. Configure nginx for SSL/TLS termination in production
5. Add resource limits (memory, CPU) in compose
6. Tag images with commit SHA in CI/CD
7. Set up log aggregation (Promtail/Fluentd)
