# Lab 05 — Networking — Compound House Wiring

**Analogy:** Default bridge = everyone shouting, nobody knows names. Custom network = intercom system — call "db" and it connects.

## Prerequisites
- Completed Labs 01-04
- Docker running

## Step 1: Create a custom network
```bash
docker network create naija-net
```
**Expected Output:** Network ID. Custom networks give you DNS by container name. Default bridge does NOT have DNS.

## Step 2: Start a database container on the network
```bash
docker run -d --network naija-net --name db redis:7-alpine
```
**Expected Output:** Container ID. Redis hostname is "db" — Docker DNS registered it automatically.

## Step 3: Test DNS resolution from another container
```bash
docker run --rm --network naija-net busybox ping -c 2 db
```
**Expected Output:** `PING db (172.18.0.2)` with 0% packet loss. On default bridge, this would fail with "bad address".

## Step 4: Inspect the network
```bash
docker network inspect naija-net
```
**Expected Output:** Shows all containers on this network with their IPs and the subnet.

## What You Learned
- Custom networks give DNS by container name — "db" resolves automatically
- Default bridge does NOT have DNS — you must use IP addresses
- `--network` flag connects a container to a specific network
- `docker network inspect` shows all containers, IPs, and subnet details

## Cleanup
```bash
docker rm -f db
docker network rm naija-net
```

## Production Note
Create a dedicated network per application stack. Use `--internal` for networks with no internet access (database-only networks) to isolate services.
