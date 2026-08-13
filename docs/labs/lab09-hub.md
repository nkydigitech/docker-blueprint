# Lab 09 — Docker Hub & Optimization — Balogun Market Shipping

**Analogy:** Ship container small = pay less transport. .dockerignore = remove market trash. Docker Hub = the shipping company.

## Prerequisites
- Completed Labs 01-08
- Docker Hub account (create free at hub.docker.com)

## Step 1: Create a .dockerignore file
```
.git
__pycache__
*.pyc
.env
.venv
node_modules
Dockerfile
docker-compose.yml
.gitignore
*.md
```
Without .dockerignore, you send .git history, virtual environments, and secrets to the Docker daemon. Slows builds and risks leaking secrets.

## Step 2: Build with cache optimization
```bash
docker build -t naija-app:v1 .
docker build -t naija-app:v1 .  # build again
```
**Expected Output (second build):** Every step says "Using cache". Build finishes in 1 second instead of 30.

## Step 3: Tag your image for Docker Hub
```bash
docker tag naija-app:v1 YOUR_USERNAME/naija-app:1.0
```
Replace YOUR_USERNAME with your Docker Hub username. Tag format: username/repository:tag.

## Step 4: Login to Docker Hub
```bash
docker login
```
Use an Access Token instead of your password (Settings > Security > New Access Token).

## Step 5: Push the image
```bash
docker push YOUR_USERNAME/naija-app:1.0
```
**Expected Output:** `1.0: digest: sha256:a1b2c3... size: 165MB`. Your image is now on Docker Hub — anyone can pull it.

## Step 6: Pull it from anywhere
```bash
docker pull YOUR_USERNAME/naija-app:1.0
```
This is how teams share images. CI/CD pushes, production servers pull.

## What You Learned
- `.dockerignore` = exclude junk from build context (faster, safer builds)
- Layer caching = unchanged steps use cache, changed steps re-run from that point
- `docker tag` = rename for Hub, `docker push` = upload, `docker pull` = download
- Use Access Tokens instead of passwords for Docker Hub auth

## Cleanup
```bash
docker rmi naija-app:v1 YOUR_USERNAME/naija-app:1.0
docker logout
```

## Production Note
In CI/CD, tag images with git commit SHA (e.g., naija-app:abc1234) for traceability. Use semantic versioning for releases. Avoid `:latest` in production — you can't roll back if it's overwritten.
