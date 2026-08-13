# Lab 02 — Images vs Containers — Jollof Pot Analogy

**Analogy:** Image = the pot of jollof (template, read-only). Container = the plate you serve (writable layer). One pot feeds many plates.

## Prerequisites
- Completed Lab 01
- Docker running

## Step 1: List images on your machine
```bash
docker images
```
**Expected Output:** Shows nginx, hello-world images with their sizes. Each image is a read-only template.

## Step 2: Pull a specific image version
```bash
docker pull redis:7-alpine
```
**Expected Output:** `Status: Downloaded newer image for redis:7-alpine`. Always pin versions, never use `:latest`.

## Step 3: Create a container (without starting it)
```bash
docker create --name my-redis redis:7-alpine
```
**Expected Output:** Container ID. `docker create` = make the plate but don't serve food yet.

## Step 4: Start the container
```bash
docker start my-redis
```
**Expected Output:** `my-redis`. Now the container is running.

## Step 5: Enter the running container
```bash
docker exec -it my-redis sh
# Inside:
redis-cli ping
```
**Expected Output:** `PONG`. Type `exit` twice to leave.

## Step 6: See what changed inside the container
```bash
docker diff my-redis
```
**Expected Output:** `C /data` (Changed), `A /data/dump.rdb` (Added). Changes die when container is removed — this is why volumes exist.

## What You Learned
- Image = read-only template (the jollof pot), Container = running instance (the plate)
- `docker create` makes, `docker start` runs, `docker exec` enters
- `docker diff` shows the writable layer — lost when container is removed
- Always pin image tags (`redis:7-alpine`, not `redis:latest`)

## Cleanup
```bash
docker rm -f my-redis
docker rmi redis:7-alpine
```

## Production Note
Use `docker inspect my-redis` to see full container details: IP, mounts, env vars, restart policy.
