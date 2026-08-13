# Lab 07 — Env Vars, Secrets & Config — POS Machine PIN

**Analogy:** You don't write your PIN on the POS machine. Same with Docker — never hardcode secrets in your image.

## Prerequisites
- Completed Labs 01-06
- Docker Compose running

## Step 1: Create a .env file
```bash
echo 'REDIS_HOST=redis
SECRET_KEY=change-me-in-prod
API_KEY=sk-test-12345' > .env
```
.env files are the standard way to manage secrets locally. Docker Compose reads them automatically.

## Step 2: Use env_file in docker-compose.yml
```yaml
services:
  api:
    build: .
    ports: ["5000:5000"]
    env_file: .env
    environment:
      - APP_ENV=production
      - REDIS_HOST=redis
  redis:
    image: redis:7-alpine
```
**Key difference:** `env_file: .env` loads many vars from file. `environment:` sets individual vars inline. Both can coexist — inline overrides env_file.

## Step 3: Verify what Compose sees
```bash
docker compose config
```
**Expected Output:** Shows fully resolved config with all env vars merged. Your debugging tool for missing/wrong vars.

## Step 4: Check variables inside the running container
```bash
docker compose up -d
docker compose exec api env | grep -E "REDIS|SECRET|API_KEY"
```
**Expected Output:** All four variables listed: REDIS_HOST, SECRET_KEY, API_KEY, APP_ENV.

## What You Learned
- `.env files` = store secrets outside the image, load with `env_file:`
- `environment:` = set non-sensitive config inline
- `docker compose config` = see fully resolved config (debugging tool)
- NEVER bake secrets in Dockerfile with ENV — anyone with the image can extract them

## Cleanup
```bash
docker compose down -v
```

## CRITICAL: Never commit .env to git!
Add `.env` to your `.gitignore` immediately. Create a `.env.example` with fake values for documentation. In production, use Docker Secrets, AWS Secrets Manager, or HashiCorp Vault.

## Production Note
For real secrets, use `docker secret` (Swarm mode) or mount secrets as files (read-only). File-based secrets are safer than env vars because `env` exposes all variables to anyone with exec access.
