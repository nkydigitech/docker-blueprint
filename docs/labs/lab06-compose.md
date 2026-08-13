# Lab 06 — Docker Compose — Owambe Party Planning

**Analogy:** One YAML invitation controls the DJ (API), caterer (Redis), and hall (Nginx). One command starts the whole party.

## Prerequisites
- Completed Labs 01-05
- Docker Compose installed (comes with Docker Desktop)

## Step 1: Create the project files
```bash
mkdir owambe && cd owambe
echo 'from flask import Flask
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv("REDIS_HOST","localhost"), decode_responses=True)
@app.route("/")
def home():
    r.incr("guests")
    return f"Welcome to the Owambe! Guest #{r.get('guests')}"
if __name__ == "__main__": app.run(host="0.0.0.0", port=5000)' > app.py
echo 'flask==3.0.0
redis==5.0.0' > requirements.txt
echo 'FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]' > Dockerfile
```

## Step 2: Write docker-compose.yml
```yaml
services:
  api:
    build: .
    ports: ["5000:5000"]
    depends_on: [redis]
    environment: ["REDIS_HOST=redis"]
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
volumes:
  redisdata:
```
**Key concepts:** `build: .` = build Dockerfile, `depends_on` = start order, `environment` = inject vars, `volumes` = persist data.

## Step 3: Start everything with one command
```bash
docker compose up -d --build
```
**Expected Output:** Creates network, builds image, starts Redis and API containers.

## Step 4: Test the running app
```bash
curl http://localhost:5000
curl http://localhost:5000
```
**Expected Output:** `Welcome to the Owambe! Guest #1` then `Guest #2`. Redis counts guests, data persists across restarts.

## Step 5: View all running services
```bash
docker compose ps
```
**Expected Output:** Shows only services from THIS compose file — cleaner than `docker ps`.

## What You Learned
- `docker-compose.yml` = define multi-container apps in one file
- `depends_on` = start order, `environment` = inject config, `volumes` = persist data
- `docker compose up -d` = start all, `docker compose ps` = see status
- Compose creates its own network — containers reach each other by service name

## Cleanup
```bash
docker compose down -v
```
`-v` also removes volumes. Without `-v`, Redis data persists for next time.

## Production Note
Use `docker compose -f docker-compose.prod.yml up -d` to separate dev/prod. Add `condition: service_healthy` in depends_on for real readiness checks.
