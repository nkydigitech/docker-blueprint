# Lab 08 — Multi-Stage Builds — Scaffolding Removal

**Analogy:** You build a house with scaffolding, but remove it before renting. Multi-stage builds = build with tools, ship only the product. 1GB → 80MB.

## Prerequisites
- Completed Labs 01-07
- Docker 17.05+ (multi-stage support)

## Step 1: See the problem — a bloated single-stage image
```dockerfile
# Bad: Single-stage (everything in one image)
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```
```bash
docker build -t naija-app:fat .
docker images naija-app:fat
```
**Expected Output:** `naija-app fat 950MB`. python:3.11 includes build tools, compilers, man pages — none needed at runtime.

## Step 2: Write a multi-stage Dockerfile
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
CMD ["python", "app.py"]
```
**How it works:** Stage 1 (builder) uses full python:3.11 to install deps. Stage 2 (slim) copies ONLY installed packages from builder. Build tools left behind.

## Step 3: Build the multi-stage image
```bash
docker build -t naija-app:multi .
```
**Expected Output:** `Successfully tagged naija-app:multi`

## Step 4: Compare the sizes
```bash
docker images | grep naija-app
```
**Expected Output:** `fat 950MB` vs `multi 165MB`. 82% reduction. Smaller = faster pulls, less storage, smaller attack surface.

## Step 5: Verify the slim image works
```bash
docker run -d -p 5000:5000 --name naija-slim naija-app:multi
curl http://localhost:5000
```
**Expected Output:** `Naija Docker - E don work!` — same app, 785MB smaller.

## What You Learned
- Multi-stage builds = build with tools, ship without them
- `AS builder` = name a stage, `--from=builder` = copy from it
- slim images = smaller attack surface, faster CI/CD, lower storage
- Typical savings: 70-85% image size reduction

## Cleanup
```bash
docker rm -f naija-slim
docker rmi naija-app:fat naija-app:multi
```

## Production Note
For even smaller images, use `python:3.11-alpine` (~50MB). Be careful — Alpine uses musl libc, which can break some Python packages that expect glibc. Test thoroughly.
