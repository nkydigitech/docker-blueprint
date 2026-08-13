# Lab 04 — Volumes — Water Drum

NEPA takes light, container dies, data dies. Drum saves water.

```bash
docker volume create mydata
docker run -d -v mydata:/data --name writer busybox sh -c "echo Lagos > /data/city && sleep 3600"
```
