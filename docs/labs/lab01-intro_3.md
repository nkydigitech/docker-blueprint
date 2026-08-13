# Lab 01 — Intro to Containerization — Danfo Analogy

**Analogy:** Danfo bus. VM = buying whole danfo for one passenger. Container = same engine, isolated seats.

```bash
docker run hello-world
docker run -d -p 8080:80 --name my-nginx nginx
docker ps
docker logs my-nginx
```
