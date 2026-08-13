# Lab 05 — Networking — Compound Wiring

```bash
docker network create naija-net
docker run -d --network naija-net --name db redis:7-alpine
docker run --rm --network naija-net busybox ping -c 2 db
```
