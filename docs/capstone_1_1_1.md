# Capstone — NaijaFood App

Full stack: Flask API + Redis + Nginx, multi-stage, healthcheck, volume.

## app.py
```python
from flask import Flask, jsonify
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST','localhost'), decode_responses=True)

@app.route('/api/menu')
def menu():
    r.incr('hits')
    return jsonify({"foods":["Jollof","Suya","Pounded Yam"],"hits":r.get('hits')})
```

## docker-compose.prod.yml
```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.multi
  redis:
    image: redis:7-alpine
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
```

Test: `docker compose -f docker-compose.prod.yml up --build -d && curl http://localhost/api/menu`
