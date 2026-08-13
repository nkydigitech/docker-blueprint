# Lab 01 — Intro to Containerization — Danfo Analogy

**Analogy:** VM = buying a whole danfo for one passenger (heavy, slow). Container = same danfo engine (kernel) but isolated seats. Lightweight, fast start.

## Prerequisites
- Docker Desktop (Mac/Windows) or Docker Engine (Linux) installed
- Terminal open
- ~500MB free disk space

## Step 1: Verify Docker is installed
```bash
docker --version
```
**Expected Output:** `Docker version 24.0.7, build afdd53b` — your version may differ, anything 20+ is fine.

## Step 2: Run your first container
```bash
docker run hello-world
```
**Expected Output:** `Hello from Docker!` — Docker downloaded the image, created a container, ran it, and stopped it. All in 2 seconds.

## Step 3: Run a web server in the background
```bash
docker run -d -p 8080:80 --name my-nginx nginx
```
**Expected Output:** Container ID hash. `-d` = detached, `-p 8080:80` = map port, `--name` = friendly label.

## Step 4: Verify it's running
```bash
docker ps
```
**Expected Output:** Shows container with STATUS "Up Xs" and PORTS "0.0.0.0:8080->80/tcp". Open http://localhost:8080 in browser.

## Step 5: View container logs
```bash
docker logs my-nginx
```
**Expected Output:** Each visitor creates a new log line. Logs are your first debugging tool.

## What You Learned
- `docker run` = download image + create container + start it (3 steps, 1 command)
- `-d` = background, `-p` = expose port, `--name` = label your container
- `docker ps` = see running containers, `docker logs` = see what happened inside
- Containers start in seconds vs VMs that take minutes

## Cleanup
```bash
docker stop my-nginx && docker rm my-nginx
```

## Troubleshooting
- **Port already in use?** Change to `-p 8081:80`
- **Permission denied?** On Linux: `sudo usermod -aG docker $USER`, then log out and back in
- **Cannot connect?** Make sure Docker Desktop/daemon is running

## Production Note
Always use `--name` for readable logs and `--restart unless-stopped` so containers survive reboots.
