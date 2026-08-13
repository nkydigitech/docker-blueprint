# Lab 10 — Logs, Debugging & Healthchecks — LASTMA Diagnostics

**Analogy:** LASTMA checks exhaust (logs), inspects engine (inspect), opens door (exec). Plus HEALTHCHECK to detect problems before users do.

## Prerequisites
- Completed Labs 01-09
- Docker running

## Step 1: Start a container and generate logs
```bash
docker run -d -p 5000:5000 --name my-api naija-app:multi
curl http://localhost:5000
curl http://localhost:5000
```

## Step 2: View logs with different options
```bash
# Follow mode (live stream):
docker logs -f my-api --tail 50
# With timestamps:
docker logs -t my-api
# Last 10 lines:
docker logs --tail 10 my-api
```
**Expected Output:** Request logs with timestamps. `-f` = follow, `--tail N` = last N lines, `-t` = timestamps.

## Step 3: Enter the running container to debug
```bash
docker exec -it my-api sh
# Inside:
ls /app
ps aux
exit
```
**Expected Output:** Lists files and processes. `docker exec` = open the door and look inside.

## Step 4: Inspect container state
```bash
docker inspect my-api --format '{{.State.Status}} | IP: {{.NetworkSettings.IPAddress}} | Restarts: {{.RestartCount}}'
```
**Expected Output:** `running | IP: 172.17.0.2 | Restarts: 0`

## Step 5: Add a HEALTHCHECK to your Dockerfile
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1
```
```bash
docker build -t naija-app:health .
docker run -d -p 5000:5000 --name healthy-api naija-app:health
```

## Step 6: Check health status
```bash
docker inspect healthy-api --format '{{.State.Health.Status}}'
```
**Expected Output:** `healthy`. Other states: `starting`, `unhealthy`, or `none`.

## What You Learned
- `docker logs -f --tail N` = live log stream (the exhaust)
- `docker exec -it` = enter a running container (open the door)
- `docker inspect --format` = extract specific details (inspect the engine)
- `HEALTHCHECK` = Docker monitors your app and flags unhealthy containers

## Cleanup
```bash
docker rm -f my-api healthy-api
docker rmi naija-app:multi naija-app:health 2>/dev/null; true
```

## Production Note
Use a log aggregator (Promtail, Fluentd) to collect container logs. Use `docker events` to monitor lifecycle events. Set up alerting on unhealthy status — don't wait for users to tell you something is broken.
