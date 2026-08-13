# Docker Cheatsheet

## Container Lifecycle
| Command | What it does |
|---|---|
| `docker run IMAGE` | Download + create + start |
| `docker run -d -p 8080:80 IMAGE` | Background, expose port |
| `docker ps` | List running containers |
| `docker ps -a` | List ALL containers (incl stopped) |
| `docker stop NAME` | Stop a container |
| `docker rm NAME` | Remove a container |
| `docker rm -f NAME` | Force stop + remove |
| `docker logs -f NAME` | Follow live logs |
| `docker exec -it NAME sh` | Enter a running container |
| `docker inspect NAME` | Full container details |

## Images
| Command | What it does |
|---|---|
| `docker images` | List local images |
| `docker pull IMAGE:TAG` | Download an image |
| `docker build -t NAME:TAG .` | Build from Dockerfile |
| `docker rmi IMAGE` | Remove an image |
| `docker tag OLD NEW` | Retag an image |
| `docker push USER/REPO:TAG` | Push to Docker Hub |

## Volumes
| Command | What it does |
|---|---|
| `docker volume create NAME` | Create named volume |
| `docker volume ls` | List volumes |
| `docker volume rm NAME` | Remove a volume |
| `-v NAME:/path` | Mount named volume |
| `-v $(pwd):/path` | Bind mount host directory |

## Networks
| Command | What it does |
|---|---|
| `docker network create NAME` | Create custom network |
| `docker network ls` | List networks |
| `docker network inspect NAME` | Show network details |
| `docker network rm NAME` | Remove a network |
| `--network NAME` | Connect container to network |

## Compose
| Command | What it does |
|---|---|
| `docker compose up -d --build` | Start all services |
| `docker compose ps` | Show running services |
| `docker compose logs -f` | Follow all logs |
| `docker compose down` | Stop + remove services |
| `docker compose down -v` | Also remove volumes |

## Dockerfile Keywords
| Keyword | Purpose |
|---|---|
| `FROM` | Base image |
| `WORKDIR` | Working directory |
| `COPY` | Copy files from host |
| `RUN` | Execute at build time |
| `ENV` | Set environment variable |
| `EXPOSE` | Document port |
| `CMD` | Default command |
| `HEALTHCHECK` | Health monitoring |
