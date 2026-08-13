# Lab 08 — Multi-Stage — Scaffolding

Build with scaffolding, ship without.

```dockerfile
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt
FROM python:3.11-slim
COPY --from=builder /root/.local /root/.local
COPY . .
```
