# Docker Blueprint — Zero to Hero
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Compose](https://img.shields.io/badge/Compose-000000?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)
![Beginners](https://img.shields.io/badge/Beginners-Welcome-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Built by [Nkechi Anna Ahanonye](https://www.linkedin.com/in/nkechiahanonye) — Cloud & DevOps Engineer | I turn manual, 3 AM-breaking deployments into 1-min automated pipelines with AWS + Ansible + Terraform | Featured: 15-Module Ansible Lab with real terminal**

For DevOps students who need relatable, hands-on examples — not textbook theory.

---

> **From `docker run` to multi-stage builds — one copy-paste lab at a time.**

A static, beginner-to-hero Docker learning platform designed for GitHub Pages. Covers images, containers, volumes, networks, Docker Compose, multi-stage builds, and production best practices.

## What's Inside (Original)

- Hands-on labs with copy-paste commands and expected output
- Capstone project
- Nigerian-context analogies throughout
- Browser localStorage progress tracking
- Responsive design with dark/light theme toggle
- No build system — pure HTML/CSS/JS

## Live Site

**Live:** https://nkydigitech.github.io/docker-blueprint/  
**Repo:** https://github.com/nkydigitech/docker-blueprint

---

## PART 1: Overview — Why This Blueprint?

This blueprint was built because most Docker tutorials use abstract examples. Here, we use **Naija analogies** you live every day:

- **Danfo Bus** = Containers vs VMs
- **Jollof Pot vs Plate** = Images vs Containers
- **Water Drum** = Volumes (data survives NEPA)
- **Compound Wiring** = Docker Networking
- **Owambe Party** = Docker Compose

No theory without terminal. Every concept has a copy-paste lab.

---

## PART 2: Learning Path — 10 Labs + Capstone

Built around your README promise: *images, containers, volumes, networks, Compose, multi-stage builds*.

### Lab 01 — Intro to Containerization — Danfo Bus
**Goal:** Understand what Docker is.
- What is Docker? Client / Daemon / Registry
- VM vs Container
- Install Docker Desktop
- **Lab:** `docker run hello-world` + `nginx:alpine` on :8080

### Lab 02 — Images vs Containers — Jollof Pot vs Plate
**Goal:** Understand layers and lifecycle.
- Image = read-only pot, Container = writable plate
- **Lab:** `pull`, `create`, `start`, `exec`, `diff`, `rm`, `rmi`

### Lab 03 — Your First Dockerfile — Mama's Soup Recipe
**Goal:** Write your own image.
- FROM, WORKDIR, COPY, RUN, EXPOSE, CMD vs ENTRYPOINT
- Cache ordering, .dockerignore
- **Lab:** Build Flask `naija-hello:1.0` and run on :5000

### Lab 04 — Volumes & Persistence — Water Drum
**Goal:** Make data survive container death.
- Named volumes vs Bind mounts vs tmpfs
- **Lab:** `mydata` volume, Postgres with `pgdata` volume

### Lab 05 — Networking — Compound House Wiring
**Goal:** Connect containers by name.
- Bridge, host, none, custom bridge
- Docker DNS — ping by container name
- **Lab:** `naija-net` network, `db` redis, `ping db`

### Lab 06 — Docker Compose — Owambe Party Planning
**Goal:** Run multi-container with one YAML.
- services, volumes, networks, depends_on, ports
- **Lab:** `docker compose up -d` with api + redis + nginx

### Lab 07 — Env Vars, Secrets & Config — POS PIN
**Goal:** Protect secrets like POS PIN.
- ENV vs ARG, env_file, .env
- **Lab:** `.env` file, `compose config`, `.gitignore` secret

### Lab 08 — Multi-Stage Builds — Scaffolding Removal
**Goal:** Shrink image from 1GB to 80MB.
- Builder pattern, final slim stage
- **Lab:** `Dockerfile.multi` with builder + slim, compare `docker images`

### Lab 09 — Docker Hub & Optimization — Balogun Market Shipping
**Goal:** Ship small, pay less freight.
- .dockerignore, layer ordering, Alpine/slim, cache
- **Lab:** `docker tag`, `docker login`, `docker push nkydigitech/naija-app:1.0`

### Lab 10 — Logs, Debugging & Healthchecks — LASTMA Diagnostics
**Goal:** Debug like LASTMA.
- logs, exec, inspect, stats, HEALTHCHECK
- **Lab:** Add HEALTHCHECK to Flask, check `(healthy)` status

### Capstone — NaijaFood App — Full Owambe Stack
**Implements everything from README:**
- Flask API (Jollof kitchen) + Redis (store) + Nginx (bouncer)
- Multi-stage Dockerfile (<150MB)
- `docker-compose.prod.yml` with volumes, custom network `naija-prod`, healthchecks, depends_on condition
- Test: `/api/menu` returns Jollof, Suya, Pounded Yam, Egusi, hits persist after `down`

**Stack:** Python 3.11-slim, Redis 7-alpine, Nginx alpine

---

## PART 3: Nigerian-Context Analogies Table

| Docker Concept | Naija Analogy | Why it sticks |
|---|---|---|
| Containers vs VMs | Danfo Bus seats | Same engine, isolated seats |
| Image vs Container | Jollof Pot vs Plate | Pot is template, plate is instance |
| Dockerfile | Mama's Soup Recipe | Order matters for cache/taste |
| Volumes | Water Drum | Drum survives NEPA outage |
| Networks | Compound Wiring | Call Flat 2B by name, not IP |
| Compose | Owambe Planning | One invitation list starts party |
| Env/Secrets | POS PIN | Don't write PIN on machine |
| Multi-stage | Scaffolding | Remove scaffolding before tenant enters |
| Optimization | Balogun Shipping | Small container = less freight |
| Debugging | LASTMA | Check logs, smoke, engine no |

---

## PART 4: How To Use This Blueprint (3 Ways)

### Way A — Pure HTML/CSS/JS (GitHub Pages — No Build)
This is what you have in `index.html` + `css/` + `js/` — exactly as README says: *No build system*.

```bash
# Local preview
python -m http.server 8000
# open http://localhost:8000

# Deploy to Pages
git add index.html css js
git commit -m "docs: blueprint"
git push origin main
# Settings > Pages > main / root
```

### Way B — MkDocs Material (Matches ansible-guide)
For those who love MkDocs Material 9.7.6 like your ansible-guide.

```bash
pip install mkdocs-material==9.7.6
mkdocs serve
mkdocs gh-deploy
```

### Way C — Dockerized (Run docs as container)
```bash
docker build -t docker-blueprint:local .
docker run -p 8080:80 docker-blueprint:local
# or
docker compose up --build
```

---

## PART 5: Project Structure

```
docker-blueprint/
├── index.html              # Main learning platform (all 11 labs) — pure HTML/CSS/JS
├── css/
│   └── style.css           # Dark/light theme, responsive, no framework
├── js/
│   └── app.js              # LABS array + CONTENT + localStorage progress + theme
├── capstone/
│   ├── app.py              # Flask NaijaFood API
│   ├── requirements.txt
│   ├── Dockerfile.multi    # Multi-stage build
│   └── nginx.conf
├── Dockerfile              # Nginx to serve static site
├── nginx.conf              # SPA fallback + gzip + /health
├── docker-compose.yml      # Blueprint + capstone demo
├── mkdocs.yml              # For Material docs version
├── docs/                   # MkDocs markdown version
└── README.md               # This file — from scratch but preserving originals
```

---

## PART 6: Quick Start Commands Cheat Sheet

| Task | Command |
|---|---|
| First container | `docker run hello-world` |
| List containers | `docker ps -a` |
| Build image | `docker build -t myapp:1.0 .` |
| Run with port | `docker run -p 5000:5000 myapp:1.0` |
| Volume | `docker volume create mydata && docker run -v mydata:/data busybox` |
| Network | `docker network create naija-net` |
| Compose up | `docker compose up -d` |
| Logs | `docker logs -f myapp` |
| Exec inside | `docker exec -it myapp sh` |
| Health | `docker inspect --format '{{.State.Health.Status}}' myapp` |
| Clean | `docker system prune -f` |

---

## PART 7: Blueprint Series (Original — Preserved)

| # | Blueprint | Focus | Status |
|---|---|---|---|
| 1 | [ansible-guide](https://github.com/nkydigitech/ansible-guide) | Ansible Automation | ✅ Live |
| 2 | [terraform-blueprint](https://github.com/nkydigitech/terraform-blueprint) | Infrastructure as Code | ✅ Live |
| 3 | [aws-blueprint](https://github.com/nkydigitech/aws-blueprint) | Amazon Web Services | ✅ Live |
| 4 | [azure-blueprint](https://github.com/nkydigitech/azure-blueprint) | Microsoft Azure | ✅ Live |
| 5 | [kubernetes-blueprint](https://github.com/nkydigitech/kubernetes-blueprint) | Container Orchestration | ✅ Live |
| 6 | [linux-blueprint](https://github.com/nkydigitech/linux-blueprint) | Linux Command Line | 🚧 Coming Soon |
| 7 | [github-blueprint](https://github.com/nkydigitech/github-blueprint) | Git & GitHub | 🚧 Coming Soon |
| 8 | docker-blueprint | Containerization | 🚧 Coming Soon |

## Part of the Blueprint Series (Full 17 — Preserved & Extended)

| # | Blueprint | Category | Status |
|---|---|---|---|
| 1 | [ansible-guide](https://github.com/nkydigitech/ansible-guide) | Automation | ✅ Live |
| 2 | [terraform-blueprint](https://github.com/nkydigitech/terraform-blueprint) | IaC | ✅ Live |
| 3 | [aws-blueprint](https://github.com/nkydigitech/aws-blueprint) | Cloud | ✅ Live |
| 4 | [azure-blueprint](https://github.com/nkydigitech/azure-blueprint) | Cloud | ✅ Live |
| 5 | [kubernetes-blueprint](https://github.com/nkydigitech/kubernetes-blueprint) | Orchestration | ✅ Live |
| 6 | [linux-blueprint](https://github.com/nkydigitech/linux-blueprint) | Fundamentals | 🚧 Coming Soon |
| 7 | [github-blueprint](https://github.com/nkydigitech/github-blueprint) | Version Control | 🚧 Coming Soon |
| 8 | **docker-blueprint** | Containers | 🚧 Coming Soon (this repo — now built) |
| 9 | [bash-scripting-blueprint](https://github.com/nkydigitech/bash-scripting-blueprint) | Scripting | 🚧 Coming Soon |
| 10 | [sdlc-blueprint](https://github.com/nkydigitech/sdlc-blueprint) | Methodology | 🚧 Coming Soon |
| 11 | [cicd-blueprint](https://github.com/nkydigitech/cicd-blueprint) | CI/CD | 🚧 Coming Soon |
| 12 | [jenkins-blueprint](https://github.com/nkydigitech/jenkins-blueprint) | CI/CD | 🚧 Coming Soon |
| 13 | [azure-devops-blueprint](https://github.com/nkydigitech/azure-devops-blueprint) | DevOps Platform | 🚧 Coming Soon |
| 14 | [prometheus-blueprint](https://github.com/nkydigitech/prometheus-blueprint) | Monitoring | 🚧 Coming Soon |
| 15 | [grafana-blueprint](https://github.com/nkydigitech/grafana-blueprint) | Visualization | 🚧 Coming Soon |
| 16 | [openshift-blueprint](https://github.com/nkydigitech/openshift-blueprint) | Enterprise K8s | 🚧 Coming Soon |
| 17 | [cybersecurity-blueprint](https://github.com/nkydigitech/cybersecurity-blueprint) | DevSecOps | 🚧 Coming Soon |

---

## PART 8: Features Built Around Original README

Original README said:
- Hands-on labs with copy-paste → Done: every lab has Copy button, expected output
- Capstone → Done: NaijaFood full stack
- Nigerian-context → Done: 10 analogies table
- localStorage progress → Done: `docker-blueprint-progress` key + progress bar
- Dark/light toggle → Done: CSS variables + localStorage `docker-theme`
- No build system → Done: pure `index.html` + `css/style.css` + `js/app.js`, works on GitHub Pages

---

## Connect (Original — Preserved)

- **LinkedIn:** [Nkechi Ahanonye](https://www.linkedin.com/in/nkechiahanonye)
- **X (Twitter):** [@NAhanonye](https://www.x.com/NAhanonye)
- **Facebook:** [NkyDigitech](https://web.facebook.com/NkyDigitech)
- **Instagram:** [@nahanonye](https://www.instagram.com/nahanonye)
- **TikTok:** [@nkechiahanonye](https://www.tiktok.com/@nkechiahanonye)
- **Portfolio:** [nkydigitech.github.io/nky-portfolio](https://nkydigitech.github.io/nky-portfolio)

---

*Built with ❤️ for the DevOps community. Especially for African engineers who deserve accessible, relatable learning resources.*

> From `docker run` to multi-stage builds — one copy-paste lab at a time. 🇳🇬🐳
