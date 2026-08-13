# Lab 02 — Images vs Containers — Jollof Pot vs Plate

Image = pot of jollof (read-only template). Container = plate served.

```bash
docker pull redis:7-alpine
docker create --name my-redis redis:7-alpine
docker start my-redis
docker exec -it my-redis sh
```
