# Docker Blueprint — Build Outputs

You have 3 ways to deploy:

## Option A: Pure HTML/CSS/JS (GitHub Pages simple)
Just push index.html + css/ + js/ to main branch. Enable Pages -> root.

## Option B: MkDocs Material (matches ansible-guide)
```
pip install mkdocs-material==9.7.6
mkdocs serve
mkdocs gh-deploy
```
This uses mkdocs.yml and docs/ folder.

## Option C: Dockerized (run your docs as container)
```
docker build -t docker-blueprint:local .
docker run -p 8080:80 docker-blueprint:local
# or
docker compose up --build
```

Capstone demo is in ./capstone

Push to https://github.com/nkydigitech/docker-blueprint
