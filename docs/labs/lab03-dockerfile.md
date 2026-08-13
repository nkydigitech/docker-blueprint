# Lab 03 — Your First Dockerfile — Recipe Book Analogy

**Analogy:** Dockerfile = your mama's recipe steps. FROM = base ingredient. RUN = add pepper. COPY = bring your ingredients. Order matters for caching.

## Prerequisites
- Completed Labs 01-02
- A text editor (VS Code, nano, anything)

## Step 1: Create project files
```bash
mkdir naija-hello && cd naija-hello
echo 'from flask import Flask
app = Flask(__name__)
@app.route("/")
def home(): return "Naija Docker - E don work!"
if __name__ == "__main__": app.run(host="0.0.0.0", port=5000)' > app.py
echo 'flask==3.0.0' > requirements.txt
```

## Step 2: Write the Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```
**Why this order matters:** Copy requirements.txt FIRST, run pip install, THEN copy the rest. Change app.py → Docker reuses the cached pip install layer.

## Step 3: Build the image
```bash
docker build -t naija-hello:1.0 .
```
**Expected Output:** `Successfully tagged naija-hello:1.0`. The `.` at the end = current directory is build context.

## Step 4: Run the container
```bash
docker run -d -p 5000:5000 --name naija-web naija-hello:1.0
```
**Expected Output:** Container ID. Open http://localhost:5000 to see "Naija Docker - E don work!"

## Step 5: Verify with curl
```bash
curl http://localhost:5000
```
**Expected Output:** `Naija Docker - E don work!`

## What You Learned
- `FROM` = base image, `WORKDIR` = working directory inside container
- `RUN` = execute at build time, `COPY` = bring files from host
- `EXPOSE` = document port, `CMD` = what runs at container start
- Copy requirements.txt before code for layer caching

## Cleanup
```bash
docker rm -f naija-web
docker rmi naija-hello:1.0
```

## Production Note
Add a `.dockerignore` file with `.git`, `__pycache__`, `*.pyc`, `.env` to prevent secrets from entering your image.
