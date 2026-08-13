# Lab 04 — Volumes & Persistence — Water Drum Analogy

**Analogy:** NEPA takes light, container dies, data inside dies. The water drum (volume) sits outside — NEPA takes light, water stays safe.

## Prerequisites
- Completed Labs 01-03
- Docker running

## Step 1: Create a named volume
```bash
docker volume create mydata
```
**Expected Output:** `mydata`. Named volume = Docker-managed storage, referred to by name.

## Step 2: Write data to the volume
```bash
docker run -d -v mydata:/data --name writer busybox sh -c "echo 'Lagos' > /data/city && sleep 3600"
```
**Expected Output:** Container ID. `-v mydata:/data` mounts the volume at /data inside the container.

## Step 3: Destroy the writer container
```bash
docker rm -f writer
```
**Expected Output:** `writer`. The container is gone but the volume still exists — the water drum is still full.

## Step 4: Read data from a NEW container
```bash
docker run --rm -v mydata:/data busybox cat /data/city
```
**Expected Output:** `Lagos`. The data survived! NEPA took the light, but the water is safe.

## Step 5: Try a bind mount for local development
```bash
mkdir app && echo "hello from host" > app/file.txt
docker run --rm -v $(pwd)/app:/app busybox cat /app/file.txt
```
**Expected Output:** `hello from host`. Bind mounts = host directory, real-time sync for development.

## What You Learned
- Named volumes = Docker-managed, survive container deletion
- Bind mounts = host directory, real-time sync for development
- `docker volume create/ls/rm` = manage volumes independently
- Without volumes, all container data is lost when container is removed

## Cleanup
```bash
docker volume rm mydata
rm -rf app
```

## Production Note
Named volumes for databases and app state. Bind mounts for development only — never in production. Use `docker volume prune` to clean unused volumes.

## Common Error
"volume is in use" when trying to rm? A container is still using it. Run `docker rm -f` on any container that mounted it, then try again.
