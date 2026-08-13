const LABS = [
 {id:'lab01', num:1, title:'Intro to Containerization', analogy:'Danfo Bus - One engine, many passengers', obj:['Understand containers vs VMs','Run first container']},
 {id:'lab02', num:2, title:'Images vs Containers', analogy:'Jollof Pot vs Served Plate', obj:['Image is blueprint, container is instance','List, inspect, remove']},
 {id:'lab03', num:3, title:'Your First Dockerfile', analogy:"Mama's Soup Recipe Book", obj:['Write Dockerfile','Build and run custom image']},
 {id:'lab04', num:4, title:'Volumes & Persistence', analogy:'Water Drum - Data survives NEPA', obj:['Bind mounts vs named volumes','Persist data']},
 {id:'lab05', num:5, title:'Networking', analogy:'Compound House Wiring', obj:['Bridge networks','DNS by container name']},
 {id:'lab06', num:6, title:'Docker Compose', analogy:'Owambe Party Planning', obj:['Multi-container with YAML','One command up']},
 {id:'lab07', num:7, title:'Env Vars, Secrets & Config', analogy:'POS Machine PIN', obj:['ENV, env_file','Handle secrets safely']},
 {id:'lab08', num:8, title:'Multi-Stage Builds', analogy:'Scaffolding Removal', obj:['Builder pattern','Shrink from 1GB to 80MB']},
 {id:'lab09', num:9, title:'Docker Hub & Optimization', analogy:'Balogun Market Shipping', obj:['Push to Hub','.dockerignore & cache']},
 {id:'lab10', num:10, title:'Logs, Debugging & Healthchecks', analogy:'LASTMA Diagnostics', obj:['logs, exec, inspect','HEALTHCHECK']},
 {id:'capstone', num:11, title:'Capstone: NaijaFood App', analogy:'Full Owambe Stack - Flask + Redis + Nginx', obj:['Compose production','Multi-stage + healthcheck']},
];

const CONTENT = {
 lab01: `
  <div class="card analogy"><b>Analogy - Danfo Bus:</b> VM = buying a whole danfo for one passenger (heavy, slow to start). Container = same danfo engine (kernel) but isolated seats. Lightweight, starts in seconds.</div>
  <h3>Prerequisites</h3>
  <ul><li>Docker Desktop (Mac/Windows) or Docker Engine (Linux) installed</li><li>Terminal open</li><li>~500MB free disk space</li></ul>
  <h3>Step 1: Verify Docker is installed</h3>
  <div class="code">docker --version<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Docker version 24.0.7, build afdd53b<br><i>Your version may differ. Anything 20+ is fine.</i></div>
  <h3>Step 2: Run your first container</h3>
  <div class="code">docker run hello-world<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Hello from Docker!<br>This message shows that your installation appears to be working correctly.<br>...<br>Docker downloaded the image, created a container, ran it, and stopped it. All in 2 seconds.</div>
  <h3>Step 3: Run a web server in the background</h3>
  <div class="code">docker run -d -p 8080:80 --name my-nginx nginx<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>a1b2c3d4e5f6... (container ID)<br><i>-d = detached (background), -p 8080:80 = map port 8080 on your machine to port 80 inside the container, --name = give it a friendly name.</i></div>
  <h3>Step 4: Verify it's running</h3>
  <div class="code">docker ps<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES<br>a1b2c3d4e5f6   nginx   "/docker..."  5s ago  Up 5s  0.0.0.0:8080->80/tcp   my-nginx<br><i>Open http://localhost:8080 in your browser. You should see the Nginx welcome page.</i></div>
  <h3>Step 5: View container logs</h3>
  <div class="code">docker logs my-nginx<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>172.17.0.1 - - [10/Aug/2026:14:00:00 +0000] "GET / HTTP/1.1" 200 615 "-" "Mozilla/5.0..."<br><i>Every visitor creates a new log line. Logs are your first debugging tool.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>docker run</b> = download image + create container + start it (3 steps, 1 command)</li><li><b>-d</b> = run in background, <b>-p</b> = expose port, <b>--name</b> = label your container</li><li><b>docker ps</b> = see running containers, <b>docker logs</b> = see what happened inside</li><li>Containers start in seconds vs VMs that take minutes</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker stop my-nginx && docker rm my-nginx<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>my-nginx<br>my-nginx<br><i>First line = stopped, second = removed. The image stays on disk (use docker rmi nginx to remove it too).</i></div>
  <div class="card" style="border-color:var(--warn)"><b>Troubleshooting:</b><br><b>port already in use?</b> Another service on the same port. Change to -p 8081:80.<br><b>permission denied?</b> On Linux, run: sudo usermod -aG docker $USER, then log out and back in.<br><b>Cannot connect to Docker?</b> Make sure Docker Desktop or daemon is running first.</div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> Always use --name for readable logs and --restart unless-stopped so your container survives server reboots.</div>`,

 lab02: `
  <div class="card analogy"><b>Analogy - Jollof Pot:</b> Image = the pot of jollof (template, read-only recipe). Container = the plate you serve (writable layer). One pot feeds many plates. You can serve many containers from one image.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Lab 01</li><li>Docker running</li></ul>
  <h3>Step 1: List images on your machine</h3>
  <div class="code">docker images<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>REPOSITORY   TAG       IMAGE ID       CREATED   SIZE<br>nginx        latest    605c77e624dd   2 weeks   141MB<br>hello-world  latest    feb5d9fea6a5   1 month   13KB<br><i>These are images from Lab 01. Each image is a read-only template.</i></div>
  <h3>Step 2: Pull a specific image version</h3>
  <div class="code">docker pull redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>7-alpine: Pulling from library/redis<br>...<br>Status: Downloaded newer image for redis:7-alpine<br><i>:7-alpine is a tag (specific version). Alpine = tiny Linux base (~5MB). Always pin versions in production, never use :latest.</i></div>
  <h3>Step 3: Create a container (without starting it)</h3>
  <div class="code">docker create --name my-redis redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>b3c4d5e6f7g8... (container ID)<br><i>docker create = make the plate but do not serve food yet. The container exists but is not running.</i></div>
  <h3>Step 4: Start the container</h3>
  <div class="code">docker start my-redis<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>my-redis<br><i>Now the container is running. docker ps will show it.</i></div>
  <h3>Step 5: Enter the running container</h3>
  <div class="code">docker exec -it my-redis sh
# Inside the container, run:
redis-cli ping<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br># redis-cli ping<br>PONG<br><i>-it = interactive terminal. You are now INSIDE the container. Type exit twice to leave.</i></div>
  <h3>Step 6: See what changed inside the container</h3>
  <div class="code">docker diff my-redis<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>C /data<br>A /data/dump.rdb<br><i>C = Changed, A = Added. This is the writable layer. Changes die when the container is removed. This is why volumes exist (Lab 04).</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>Image</b> = read-only template (the jollof pot), <b>Container</b> = running instance (the plate)</li><li><b>docker create</b> makes a container, <b>docker start</b> runs it, <b>docker exec</b> enters it</li><li><b>docker diff</b> shows the writable layer. Changes are lost when container is removed</li><li>Always pin image tags (redis:7-alpine, not redis:latest)</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker rm -f my-redis
docker rmi redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> Use <code>docker inspect my-redis</code> to see full container details: IP, mounts, env vars, restart policy. Critical for debugging.</div>`,

 lab03: `
  <div class="card analogy"><b>Analogy - Recipe Book:</b> Dockerfile = your mama's recipe steps. FROM = start with a base ingredient. RUN = add pepper, stir. COPY = bring your own ingredients. Order matters. If you change a step, everything after it re-runs (cache miss).</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-02</li><li>A text editor (VS Code, nano, anything)</li></ul>
  <h3>Step 1: Create project files</h3>
  <div class="code">mkdir naija-hello && cd naija-hello
echo 'from flask import Flask
app = Flask(__name__)
@app.route("/")
def home(): return "Naija Docker - E don work!"
if __name__ == "__main__": app.run(host="0.0.0.0", port=5000)' > app.py
echo 'flask==3.0.0' > requirements.txt<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>No output. Files are created silently. Run <code>ls</code> to verify: app.py  requirements.txt</div>
  <h3>Step 2: Write the Dockerfile</h3>
  <div class="code"># Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Why this order matters:</b><br>We COPY requirements.txt FIRST, run pip install, THEN copy the rest. If you change app.py, Docker reuses the cached pip install layer. If you copied everything at once, every code change would trigger a full reinstall. Like buying spices before you start cooking.</div>
  <h3>Step 3: Build the image</h3>
  <div class="code">docker build -t naija-hello:1.0 .<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Sending build context to Docker daemon  4.096kB<br>Step 1/7 : FROM python:3.11-slim<br>...<br>Step 4/7 : RUN pip install --no-cache-dir -r requirements.txt<br>Successfully installed flask-3.0.0<br>...<br>Successfully tagged naija-hello:1.0<br><i>The . at the end = current directory is the build context. -t = tag (name:version).</i></div>
  <h3>Step 4: Run the container</h3>
  <div class="code">docker run -d -p 5000:5000 --name naija-web naija-hello:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>c4d5e6f7g8h9... (container ID)<br>Open http://localhost:5000. You should see: Naija Docker - E don work!</div>
  <h3>Step 5: Verify with curl</h3>
  <div class="code">curl http://localhost:5000<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Naija Docker - E don work!</div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>FROM</b> = base image, <b>WORKDIR</b> = working directory inside container</li><li><b>RUN</b> = execute at build time, <b>COPY</b> = bring files from host into image</li><li><b>EXPOSE</b> = document the port, <b>CMD</b> = what runs when container starts</li><li>Copy requirements.txt before code for layer caching</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker rm -f naija-web
docker rmi naija-hello:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> Add a <code>.dockerignore</code> file with .git, __pycache__, *.pyc, .env to prevent secrets and junk from entering your image. You will learn this in Lab 09.</div>`,

 lab04: `
  <div class="card analogy"><b>Analogy - Water Drum:</b> NEPA takes light, your container dies, data inside dies too. The water drum (volume) sits outside the house. NEPA can take light, but the water stays safe. Volumes survive container deletion.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-03</li><li>Docker running</li></ul>
  <h3>Step 1: Create a named volume</h3>
  <div class="code">docker volume create mydata<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>mydata<br><i>A named volume is Docker-managed storage. Docker decides where it lives on disk. You just refer to it by name.</i></div>
  <h3>Step 2: Write data to the volume</h3>
  <div class="code">docker run -d -v mydata:/data --name writer busybox sh -c "echo 'Lagos' > /data/city && sleep 3600"<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>d5e6f7g8h9i0... (container ID)<br><i>-v mydata:/data = mount the volume "mydata" at /data inside the container. The container writes "Lagos" to /data/city, then sleeps to stay alive.</i></div>
  <h3>Step 3: Destroy the writer container</h3>
  <div class="code">docker rm -f writer<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>writer<br><i>The container is gone. But the volume still exists. The water drum is still full.</i></div>
  <h3>Step 4: Read data from a NEW container using the same volume</h3>
  <div class="code">docker run --rm -v mydata:/data busybox cat /data/city<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Lagos<br><i>The data survived! The writer container is dead, but a brand new container can read what it wrote. NEPA took the light, but the water is safe.</i></div>
  <h3>Step 5: Try a bind mount for local development</h3>
  <div class="code">mkdir app && echo "hello from host" > app/file.txt
docker run --rm -v $(pwd)/app:/app busybox cat /app/file.txt<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>hello from host<br><i>Bind mounts = mount a specific host directory. Changes on host appear instantly in container. Perfect for development. Edit code on host, see changes in container without rebuilding.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>Named volumes</b> = Docker-managed, survive container deletion (the water drum)</li><li><b>Bind mounts</b> = host directory mounted into container, real-time sync for development</li><li><b>docker volume create/ls/rm</b> = manage volumes independently of containers</li><li>Without volumes, all container data is lost when the container is removed</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker volume rm mydata
rm -rf app<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> Named volumes are for databases and app state. Bind mounts are for development only. Never use bind mounts in production because the path depends on the host filesystem. Use docker volume prune to clean unused volumes.</div>
  <div class="card" style="border-color:var(--warn)"><b>Common Error:</b> "volume is in use" when trying to rm? A container is still using it. Run <code>docker rm -f</code> on any container that mounted it, then try again.</div>`,

 lab05: `
  <div class="card analogy"><b>Analogy - Compound Wiring:</b> Default bridge network = everyone shouting in the compound, nobody knows names. Custom network = intercom system. You call "db" and it connects. Docker DNS resolves container names automatically on custom networks.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-04</li><li>Docker running</li></ul>
  <h3>Step 1: Create a custom network</h3>
  <div class="code">docker network create naija-net<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>c6d7e8f9g0h1... (network ID)<br><i>Custom networks give you DNS by container name. On the default bridge, DNS does NOT work. You must use IP addresses. This is the #1 networking mistake beginners make.</i></div>
  <h3>Step 2: Start a database container on the network</h3>
  <div class="code">docker run -d --network naija-net --name db redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>e7f8g9h0i1j2... (container ID)<br><i>Redis is running on the naija-net network. Its hostname is "db". Docker DNS registered it automatically.</i></div>
  <h3>Step 3: Test DNS resolution from another container</h3>
  <div class="code">docker run --rm --network naija-net busybox ping -c 2 db<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>PING db (172.18.0.2): 56 data bytes<br>64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.123 ms<br>64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.089 ms<br>--- db ping statistics ---<br>2 packets transmitted, 2 received, 0% packet loss<br><i>"db" resolved to 172.18.0.2 automatically. On the default bridge, this would fail with "bad address".</i></div>
  <h3>Step 4: Inspect the network</h3>
  <div class="code">docker network inspect naija-net<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>...<br>"Containers": {<br>  "e7f8g9h0...": { "Name": "db", "IPv4Address": "172.18.0.2/16" }<br>}<br>...<br><i>Shows all containers on this network, their IPs, and the subnet. Useful for debugging connectivity.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>Custom networks</b> give you DNS by container name. "db" resolves automatically</li><li><b>Default bridge</b> does NOT have DNS. You must use IP addresses (the shouting compound)</li><li><b>--network</b> flag connects a container to a specific network</li><li><b>docker network inspect</b> shows all containers, IPs, and subnet details</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker rm -f db
docker network rm naija-net<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> Create a dedicated network per application stack. Use <code>--internal</code> for networks that should have no internet access (database-only networks). This is how you isolate services.</div>`,

 lab06: `
  <div class="card analogy"><b>Analogy - Owambe Planning:</b> One YAML invitation controls the DJ (API), caterer (Redis), and hall (Nginx). One command starts the whole party. One command tears it down. That is Docker Compose. Orchestration in a single file.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-05</li><li>Docker Compose installed (comes with Docker Desktop)</li></ul>
  <h3>Step 1: Create the project files</h3>
  <div class="code">mkdir owambe && cd owambe
echo 'from flask import Flask
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv("REDIS_HOST","localhost"), decode_responses=True)
@app.route("/")
def home():
    r.incr("guests")
    return f"Welcome to the Owambe! Guest #{r.get('guests')}"
if __name__ == "__main__": app.run(host="0.0.0.0", port=5000)' > app.py
echo 'flask==3.0.0
redis==5.0.0' > requirements.txt
echo 'FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]' > Dockerfile<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Files created. Run <code>ls</code> to verify: app.py  requirements.txt  Dockerfile</div>
  <h3>Step 2: Write docker-compose.yml</h3>
  <div class="code">services:
  api:
    build: .
    ports: ["5000:5000"]
    depends_on: [redis]
    environment: ["REDIS_HOST=redis"]
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
volumes:
  redisdata:<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Key concepts:</b><br><b>build: .</b> = build Dockerfile in current dir (for API)<br><b>image:</b> = use pre-built image (for Redis)<br><b>depends_on</b> = start order (Redis before API)<br><b>environment</b> = inject env vars (REDIS_HOST=redis. Docker DNS resolves "redis" to the Redis container)<br><b>volumes</b> = persist Redis data across restarts</div>
  <h3>Step 3: Start everything with one command</h3>
  <div class="code">docker compose up -d --build<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Creating network "owambe_default" with the default driver<br>Creating volume "owambe_redisdata" with default driver<br>Building api...<br>Creating owambe-redis-1 ... done<br>Creating owambe-api-1   ... done<br><i>-d = detached (background), --build = rebuild image if Dockerfile changed.</i></div>
  <h3>Step 4: Test the running app</h3>
  <div class="code">curl http://localhost:5000
curl http://localhost:5000<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Welcome to the Owambe! Guest #1<br>Welcome to the Owambe! Guest #2<br><i>Redis is counting guests. Each request increments the counter. If you restart the containers, the count persists because of the volume.</i></div>
  <h3>Step 5: View all running services</h3>
  <div class="code">docker compose ps<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>NAME              IMAGE           STATUS     PORTS<br>owambe-api-1      owambe-api      Up 10s     0.0.0.0:5000->5000/tcp<br>owambe-redis-1    redis:7-alpine  Up 11s     6379/tcp<br><i>docker compose ps only shows services from THIS compose file. Cleaner than docker ps which shows everything.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>docker-compose.yml</b> = define multi-container apps in one file</li><li><b>depends_on</b> = start order, <b>environment</b> = inject config, <b>volumes</b> = persist data</li><li><b>docker compose up -d</b> = start all services, <b>docker compose ps</b> = see their status</li><li>Compose creates its own network. Containers reach each other by service name automatically</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker compose down -v<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Stopping owambe-api-1   ... done<br>Stopping owambe-redis-1 ... done<br>Removing owambe-api-1    ... done<br>Removing owambe-redis-1  ... done<br>Removing network owambe_default<br><i>-v = also remove volumes. Without -v, Redis data persists for next time.</i></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> Use <code>docker compose -f docker-compose.prod.yml up -d</code> to separate dev and prod configs. Add healthchecks with <code>condition: service_healthy</code> in depends_on to ensure Redis is actually ready, not just started.</div>`,

 lab07: `
  <div class="card analogy"><b>Analogy - POS PIN:</b> You do not write your PIN on the POS machine where customers can see it. Same with Docker. Never hardcode secrets in your Dockerfile or image. Use environment variables and .env files. The image is shareable. Secrets must not be baked in.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-06</li><li>Docker Compose running</li></ul>
  <h3>Step 1: Create a .env file</h3>
  <div class="code">echo 'REDIS_HOST=redis
SECRET_KEY=change-me-in-prod
API_KEY=sk-test-12345' > .env<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>No output. File created. Run <code>cat .env</code> to verify.<br><i>.env files are the standard way to manage secrets locally. Docker Compose reads them automatically.</i></div>
  <h3>Step 2: Use env_file in docker-compose.yml</h3>
  <div class="code">services:
  api:
    build: .
    ports: ["5000:5000"]
    env_file: .env
    environment:
      - APP_ENV=production
      - REDIS_HOST=redis
  redis:
    image: redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Key difference:</b><br><b>env_file: .env</b> = load all variables from a file (good for many secrets)<br><b>environment: - KEY=val</b> = set individual variables inline (good for non-sensitive config)<br><b>Both can coexist</b>. Inline environment overrides env_file if the same key exists.</div>
  <h3>Step 3: Verify what Compose sees</h3>
  <div class="code">docker compose config<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>...<br>environment:<br>  API_KEY: sk-test-12345<br>  APP_ENV: production<br>  REDIS_HOST: redis<br>  SECRET_KEY: change-me-in-prod<br>...<br><i>docker compose config shows the fully resolved config. All env vars merged. This is your debugging tool when a variable is missing or wrong.</i></div>
  <h3>Step 4: Check variables inside the running container</h3>
  <div class="code">docker compose up -d
docker compose exec api env | grep -E "REDIS|SECRET|API_KEY"<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>REDIS_HOST=redis<br>SECRET_KEY=change-me-in-prod<br>API_KEY=sk-test-12345<br>APP_ENV=production<br><i>env command lists all environment variables inside the container. grep filters to the ones you care about.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>.env files</b> = store secrets outside the image, load with <code>env_file:</code></li><li><b>environment:</b> = set non-sensitive config inline in compose</li><li><b>docker compose config</b> = see the fully resolved config (debugging tool)</li><li><b>Never</b> bake secrets in Dockerfile with ENV. Anyone with the image can extract them</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker compose down -v<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--warn)"><b>CRITICAL: Never commit .env to git!</b><br>Add <code>.env</code> to your .gitignore file immediately. Create a <code>.env.example</code> with fake values for documentation. In production, use Docker Secrets, AWS Secrets Manager, or HashiCorp Vault. Not .env files.</div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> For real secrets, use <code>docker secret</code> (Swarm mode) or mount secrets as files (read-only). File-based secrets are safer than env vars because <code>env</code> exposes all variables to anyone with exec access.</div>`,

 lab08: `
  <div class="card analogy"><b>Analogy - Scaffolding:</b> You build a house with scaffolding, but you remove it before renting. Nobody rents a house full of scaffolding. Multi-stage builds = build with all the tools, ship only the final product. Your image goes from 1GB to 80MB.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-07</li><li>Docker 17.05+ (multi-stage support)</li></ul>
  <h3>Step 1: See the problem - a bloated single-stage image</h3>
  <div class="code"># Bad: Single-stage Dockerfile (everything in one image)
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]

docker build -t naija-app:fat .
docker images naija-app:fat<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>REPOSITORY     TAG   SIZE<br>naija-app      fat   950MB<br><i>python:3.11 is 950MB. It includes build tools, compilers, man pages. None of which your app needs at runtime. You are shipping scaffolding.</i></div>
  <h3>Step 2: Write a multi-stage Dockerfile</h3>
  <div class="code"># Multi-stage: builder installs deps, slim ships the app
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>How it works:</b><br><b>Stage 1 (builder):</b> Uses full python:3.11 (~950MB) to install pip packages. This is the scaffolding stage.<br><b>Stage 2 (slim):</b> Uses python:3.11-slim (~150MB). Copies ONLY the installed packages from the builder. Build tools, compilers, and man pages are left behind.<br><b>--from=builder</b> = copy from the builder stage, not from the host.</div>
  <h3>Step 3: Build the multi-stage image</h3>
  <div class="code">docker build -t naija-app:multi .<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Step 1/8 : FROM python:3.11 AS builder<br>...<br>Step 5/8 : FROM python:3.11-slim<br>...<br>Successfully tagged naija-app:multi</div>
  <h3>Step 4: Compare the sizes</h3>
  <div class="code">docker images | grep naija-app<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>naija-app   fat     950MB<br>naija-app   multi    165MB<br><i>From 950MB to 165MB. That is an 82% reduction. Smaller images = faster pulls, less storage, smaller attack surface. In production, every MB matters.</i></div>
  <h3>Step 5: Verify the slim image works</h3>
  <div class="code">docker run -d -p 5000:5000 --name naija-slim naija-app:multi
curl http://localhost:5000<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Naija Docker - E don work!<br><i>Same app, same behavior, 785MB smaller. That is the power of multi-stage builds.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>Multi-stage builds</b> = build with tools, ship without them (remove the scaffolding)</li><li><b>AS builder</b> = name a stage, <b>--from=builder</b> = copy from it</li><li><b>slim images</b> = smaller attack surface, faster CI/CD, lower storage costs</li><li>Typical savings: 70-85% image size reduction</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker rm -f naija-slim
docker rmi naija-app:fat naija-app:multi<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> For even smaller images, use <code>python:3.11-alpine</code> as the final stage (~50MB). Be careful. Alpine uses musl libc, which can break some Python packages that expect glibc. Test thoroughly.</div>`,

 lab09: `
  <div class="card analogy"><b>Analogy - Balogun Market:</b> Ship container small = pay less transport. .dockerignore = remove market trash before shipping. Docker Hub = the shipping company that delivers your image to the world.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-08</li><li>Docker Hub account (create free at hub.docker.com)</li></ul>
  <h3>Step 1: Create a .dockerignore file</h3>
  <div class="code">.git
__pycache__
*.pyc
.env
.venv
node_modules
Dockerfile
docker-compose.yml
.gitignore
*.md<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Why .dockerignore matters:</b><br>Everything in your project directory is sent to Docker as "build context". Without .dockerignore, you are sending .git history, virtual environments, and secrets to the Docker daemon. This slows builds and risks leaking secrets into the image layer cache.</div>
  <h3>Step 2: Build with cache optimization</h3>
  <div class="code">docker build -t naija-app:v1 .
# Build again without changes:
docker build -t naija-app:v1 .<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output (second build):</b><br>Step 1/7 : FROM python:3.11-slim<br>---> Using cache<br>Step 2/7 : WORKDIR /app<br>---> Using cache<br>...<br>Successfully tagged naija-app:v1<br><i>Every step says "Using cache". The build finishes in 1 second instead of 30. Docker caches each layer. Change requirements.txt and only the pip install + COPY steps re-run.</i></div>
  <h3>Step 3: Tag your image for Docker Hub</h3>
  <div class="code">docker tag naija-app:v1 YOUR_USERNAME/naija-app:1.0
# Replace YOUR_USERNAME with your Docker Hub username<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>No output. Tagging is silent. Run <code>docker images | grep naija-app</code> to verify.<br><i>Tag format: username/repository:tag. Without a tag, Docker defaults to :latest.</i></div>
  <h3>Step 4: Login to Docker Hub</h3>
  <div class="code">docker login<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Username: (type your Docker Hub username)<br>Password: (type your password or access token)<br>Login Succeeded<br><i>Use an Access Token instead of your password (Settings > Security > New Access Token). Safer than your real password.</i></div>
  <h3>Step 5: Push the image</h3>
  <div class="code">docker push YOUR_USERNAME/naija-app:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>The push refers to repository [docker.io/YOUR_USERNAME/naija-app]<br>abc123: Pushed<br>def456: Pushed<br>1.0: digest: sha256:a1b2c3... size: 165MB<br><i>Your image is now on Docker Hub. Anyone in the world can pull it.</i></div>
  <h3>Step 6: Pull it from anywhere</h3>
  <div class="code">docker pull YOUR_USERNAME/naija-app:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>1.0: Pulling from YOUR_USERNAME/naija-app<br>Status: Downloaded newer image (or up to date if local)<br><i>This is how teams share images. CI/CD pushes, production servers pull. No need to build on every server.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>.dockerignore</b> = exclude junk from build context (faster, safer builds)</li><li><b>Layer caching</b> = unchanged steps use cache, changed steps re-run from that point</li><li><b>docker tag</b> = rename for Hub, <b>docker push</b> = upload, <b>docker pull</b> = download</li><li>Use Access Tokens instead of passwords for Docker Hub auth</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker rmi naija-app:v1 YOUR_USERNAME/naija-app:1.0
docker logout<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> In CI/CD, tag images with git commit SHA (e.g., naija-app:abc1234) for traceability. Use semantic versioning (1.0, 1.1, 2.0) for releases. Avoid :latest in production. You cannot roll back to a specific version if :latest is overwritten.</div>`,

 lab10: `
  <div class="card analogy"><b>Analogy - LASTMA Diagnostics:</b> LASTMA checks the exhaust (logs), inspects the engine (inspect), opens the door (exec) to diagnose a broken-down vehicle. Docker gives you the same tools. Logs, inspect, exec. Plus HEALTHCHECK to detect problems before users do.</div>
  <h3>Prerequisites</h3>
  <ul><li>Completed Labs 01-09</li><li>Docker running</li></ul>
  <h3>Step 1: Start a container and generate logs</h3>
  <div class="code">docker run -d -p 5000:5000 --name my-api naija-app:multi
# Hit the endpoint a few times:
curl http://localhost:5000
curl http://localhost:5000<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Naija Docker - E don work!<br>Naija Docker - E don work!<br><i>Two successful requests. Now let us check what the container logged.</i></div>
  <h3>Step 2: View logs with different options</h3>
  <div class="code"># Last 50 lines (follow mode):
docker logs -f my-api --tail 50

# With timestamps:
docker logs -t my-api

# Last 10 lines only:
docker logs --tail 10 my-api<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output (with timestamps):</b><br>2026-08-13T14:00:01.123Z * Running on http://0.0.0.0:5000<br>2026-08-13T14:00:05.456Z 172.17.0.1 - - "GET / HTTP/1.1" 200 -<br>2026-08-13T14:00:06.789Z 172.17.0.1 - - "GET / HTTP/1.1" 200 -<br><i>-f = follow (live stream, Ctrl+C to exit), --tail N = last N lines, -t = timestamps. Always use --tail in production to avoid dumping millions of lines.</i></div>
  <h3>Step 3: Enter the running container to debug</h3>
  <div class="code">docker exec -it my-api sh
# Inside the container:
ls /app
cat /app/app.py
ps aux
exit<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br># ls /app<br>app.py  requirements.txt<br># ps aux<br>PID  USER  COMMAND<br>1    root  python app.py<br><i>docker exec = open the door and look inside. Useful for debugging file issues, checking processes, or running one-off commands. Always use -it for interactive sessions.</i></div>
  <h3>Step 4: Inspect container state</h3>
  <div class="code">docker inspect my-api --format '{{.State.Status}} | IP: {{.NetworkSettings.IPAddress}} | Restarts: {{.RestartCount}}'<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>running | IP: 172.17.0.2 | Restarts: 0<br><i>docker inspect gives you EVERYTHING. IP, mounts, env vars, restart count, health status. The --format flag extracts specific fields. Without it, you get a huge JSON dump.</i></div>
  <h3>Step 5: Add a HEALTHCHECK to your Dockerfile</h3>
  <div class="code"># Add to Dockerfile:
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Rebuild and run:
docker build -t naija-app:health .
docker run -d -p 5000:5000 --name healthy-api naija-app:health<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>After 5 seconds, check health status. Docker will ping / every 30 seconds. If it fails 3 times in a row, the container is marked "unhealthy".</div>
  <h3>Step 6: Check health status</h3>
  <div class="code">docker inspect healthy-api --format '{{.State.Health.Status}}'<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>healthy<br><i>Other states: "starting" (first few seconds), "healthy", "unhealthy", or "none" (no HEALTHCHECK defined). In production, unhealthy containers can trigger auto-restart or alerting.</i></div>
  <h3>What You Learned</h3>
  <div class="card"><ul><li><b>docker logs -f --tail N</b> = live log stream (the exhaust)</li><li><b>docker exec -it</b> = enter a running container (open the door)</li><li><b>docker inspect --format</b> = extract specific container details (inspect the engine)</li><li><b>HEALTHCHECK</b> = Docker monitors your app automatically and flags unhealthy containers</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker rm -f my-api healthy-api
docker rmi naija-app:multi naija-app:health 2>/dev/null; true<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Note:</b> In production, use a log aggregator (Promtail, Fluentd) to collect container logs. Use <code>docker events</code> to monitor container lifecycle events. Set up alerting on unhealthy status. Do not wait for users to tell you something is broken.</div>`,

 capstone: `
  <div class="card analogy"><b>Analogy - Full Owambe Stack:</b> Flask API (jollof kitchen) + Redis (store room) + Nginx (bouncer at the gate). Production-ready multi-container app with healthchecks, multi-stage build, and data persistence.</div>
  <h3>What You Are Building</h3>
  <div class="card">A NaijaFood API that:<br>1. Serves a menu of Naija foods via Flask<br>2. Tracks visitor count in Redis<br>3. Routes traffic through Nginx reverse proxy<br>4. Uses multi-stage build for small images<br>5. Has healthchecks on all services</div>
  <h3>Project Structure</h3>
  <div class="code">capstone/
  app.py                 # Flask API
  requirements.txt       # Python deps
  Dockerfile.multi       # Multi-stage build
  docker-compose.prod.yml # Production compose
  nginx.conf             # Reverse proxy config
  .dockerignore          # Exclude junk<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <h3>app.py - The Flask API</h3>
  <div class="code">from flask import Flask, jsonify
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST','localhost'), decode_responses=True)

@app.route('/health')
def health(): return {'status': 'ok'}

@app.route('/api/menu')
def menu():
    r.incr('hits')
    return jsonify({
        "foods": ["Jollof", "Suya", "Pounded Yam", "Egusi"],
        "hits": r.get('hits')
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <h3>Dockerfile.multi - Multi-Stage Build</h3>
  <div class="code">FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1
CMD ["python", "app.py"]<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <h3>docker-compose.prod.yml - Production Stack</h3>
  <div class="code">services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.multi
    depends_on:
      redis:
        condition: service_healthy
    environment: [REDIS_HOST=redis]
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 10s
      retries: 5
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"]
    depends_on: [api]
    restart: unless-stopped
volumes:
  redisdata:<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <h3>nginx.conf - Reverse Proxy</h3>
  <div class="code">events {}
http {
  upstream naija_api { server api:5000; }
  server {
    listen 80;
    location / { proxy_pass http://naija_api; }
    location /health { proxy_pass http://naija_api/health; }
    location /api { proxy_pass http://naija_api/api/menu; }
  }
}<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <h3>Build and Run</h3>
  <div class="code">cd capstone
docker compose -f docker-compose.prod.yml up --build -d
docker compose -f docker-compose.prod.yml ps<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>NAME                STATUS                   PORTS<br>capstone-api-1      Up (healthy)             5000/tcp<br>capstone-redis-1    Up (healthy)             6379/tcp<br>capstone-nginx-1    Up                       0.0.0.0:80->80/tcp<br><i>All 3 services running and healthy. Nginx is the only one exposed to port 80.</i></div>
  <h3>Test the Full Stack</h3>
  <div class="code">curl http://localhost/api/menu
curl http://localhost/api/menu
curl http://localhost/health<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>{"foods":["Jollof","Suya","Pounded Yam","Egusi"],"hits":"1"}<br>{"foods":["Jollof","Suya","Pounded Yam","Egusi"],"hits":"2"}<br>{"status":"ok"}<br><i>Nginx routes /api to Flask, Flask reads from Redis, Redis counts hits. Each request increments the counter. Data persists across restarts.</i></div>
  <h3>Success Criteria</h3>
  <div class="card"><ul><li>compose up brings up 3 services, all healthy</li><li>/api/menu returns Naija foods with a hit counter</li><li>Redis data persists after docker compose down (without -v)</li><li>API image is under 200MB (multi-stage build)</li><li>Healthchecks pass on all services</li></ul></div>
  <h3>Cleanup</h3>
  <div class="code">docker compose -f docker-compose.prod.yml down -v<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card" style="border-color:var(--ok)"><b>Production Checklist:</b><br>1. Add .env for secrets (Lab 07)<br>2. Use named volumes for Redis data persistence<br>3. Set restart: unless-stopped on all services<br>4. Configure nginx for SSL/TLS termination in production<br>5. Add resource limits (memory, CPU) in compose<br>6. Tag images with commit SHA in CI/CD<br>7. Set up log aggregation (Promtail/Fluentd)</div>`
};

let activeId = 'lab01';
function getProgress(){ try{return JSON.parse(localStorage.getItem('docker-blueprint-progress')||'{}')}catch{return{}} }
function saveProgress(p){ localStorage.setItem('docker-blueprint-progress', JSON.stringify(p)); updateProgressBar(); renderSidebar(); }
function updateProgressBar(){
  const p=getProgress(); const done=Object.values(p).filter(Boolean).length; const pct=Math.round(done/LABS.length*100);
  document.getElementById('progressBar').style.width=pct+'%';
  document.getElementById('progressText').textContent=pct+'% '+done+'/'+LABS.length;
  document.getElementById('celebrate').style.display=done===LABS.length?'block':'none';
}
function renderSidebar(){
  const q=document.getElementById('search').value.toLowerCase();
  document.getElementById('sidebarList').innerHTML = LABS.filter(l=> l.title.toLowerCase().includes(q) || l.analogy.toLowerCase().includes(q)).map(l=>{
    const p=getProgress(); const done=p[l.id];
    return `<div class="lab-item ${l.id===activeId?'active':''}" onclick="openLab('${l.id}')">
      <div class="check ${done?'done':''}">${done?'✓':''}</div>
      <div><div style="font-weight:700;font-size:13px">Lab ${l.num}: ${l.title}</div><div style="font-size:11px;color:var(--muted)">${l.analogy}</div></div>
    </div>`;
  }).join('');
}
function openLab(id){
  activeId=id; const lab=LABS.find(l=>l.id===id);
  document.getElementById('main').innerHTML = `
    <div class="hero">
      <span class="badge">Lab ${lab.num}</span> <span class="badge">${lab.analogy}</span>
      <h1>${lab.title}</h1>
      <div style="color:var(--muted)">Objectives: ${lab.obj.join(' • ')}</div>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn primary" onclick="markDone('${id}')">Mark as Complete</button>
        <button class="btn" onclick="copyAll()">Copy Lab Commands</button>
      </div>
    </div>
    <div id="labContent">${CONTENT[id]||''}</div>
  `;
  renderSidebar();
  window.scrollTo(0,0);
}
function markDone(id){
  const p=getProgress(); p[id]=!p[id]; saveProgress(p);
  openLab(id);
}
function copyCode(btn){
  const code=btn.parentElement.textContent.replace('Copy','').trim();
  navigator.clipboard.writeText(code);
  btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy',1500);
}
function copyAll(){
  const el=document.getElementById('labContent'); const codes=[...el.querySelectorAll('.code')].map(c=>c.innerText.replace('Copy','').trim());
  navigator.clipboard.writeText(codes.join('\n\n'));
  alert('All commands copied to clipboard!');
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', cur==='dark'?'light':'dark');
}
document.getElementById('search').addEventListener('input', renderSidebar);
renderSidebar(); openLab('lab01'); updateProgressBar();
