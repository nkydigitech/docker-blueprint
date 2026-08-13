const LABS = [
{id:'lab01',n:1,title:'Intro to Containerization',tag:'Danfo Bus — One engine, many passengers',obj:['What Docker is','VM vs Container','Architecture','First container']},
{id:'lab02',n:2,title:'Images vs Containers',tag:'Jollof Pot vs Served Plate',obj:['Layers & writable layer','Image lifecycle','Container lifecycle']},
{id:'lab03',n:3,title:'Your First Dockerfile',tag:"Mama's Soup Recipe Book",obj:['FROM, WORKDIR, COPY, RUN','CMD vs ENTRYPOINT','Cache & build context']},
{id:'lab04',n:4,title:'Volumes & Persistence',tag:'Water Drum — Data survives NEPA',obj:['Bind vs named volumes','Backup & restore','DB persistence']},
{id:'lab05',n:5,title:'Networking',tag:'Compound House Wiring',obj:['Bridge, host, none','Custom network & DNS']},
{id:'lab06',n:6,title:'Docker Compose — Multi-Container',tag:'Owambe Party Planning',obj:['Compose file','Services, volumes, networks','One command up']},
{id:'lab07',n:7,title:'Env Vars, Secrets & Config',tag:'POS PIN Protection',obj:['ENV vs ARG','env_file']},
{id:'lab08',n:8,title:'Multi-Stage Builds',tag:'Scaffolding Removal',obj:['Builder pattern','Shrink 1GB to 80MB']},
{id:'lab09',n:9,title:'Docker Hub & Optimization',tag:'Balogun Market Shipping',obj:['Tag & push','.dockerignore','Cache']},
{id:'lab10',n:10,title:'Logs, Debugging & Healthchecks',tag:'LASTMA Diagnostics',obj:['logs, exec, inspect','HEALTHCHECK']},
{id:'capstone',n:11,title:'Capstone: NaijaFood App',tag:'Full Owambe Stack — Production Ready',obj:['Multi-stage','Compose prod','Nginx proxy']},
];

const CONTENT = {
lab01: `
<div class="card analogy"><b>🇳🇬 Danfo Analogy:</b> VM = buy whole danfo for one passenger (2GB each). Container = same engine (host kernel) but isolated seats. Starts in 1 sec.</div>
<h2>What is Docker? (From README)</h2>
<p>Docker packages app + deps into portable image that runs same on laptop and AWS. Covers images, containers, volumes, networks, Compose, multi-stage.</p>
<ul><li><b>Client:</b> you type docker</li><li><b>Daemon:</b> engine</li><li><b>Registry:</b> Docker Hub market</li></ul>
<h3>VM vs Container</h3>
<div class="grid2"><div class="card"><b>VM</b><br>• Hypervisor • Guest OS • Heavy • Slow</div><div class="card"><b>Container</b><br>• Shares kernel • No guest OS • MBs • Fast</div></div>
<h3>Lab 01 — First container</h3>
<div class="code">docker --version
docker run hello-world
docker run -d -p 8080:80 --name my-nginx nginx:alpine
docker ps
docker logs my-nginx
# open http://localhost:8080
docker stop my-nginx && docker rm my-nginx<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
<div class="card"><b>Expected:</b> Nginx welcome page. ps shows running.</div>
`,
lab02: `
<div class="card analogy"><b>🇳🇬 Jollof Analogy:</b> Image = pot of jollof (read-only). Container = plate served (writable).</div>
<h2>Images = Blueprint</h2>
<p>Image = stacked layers. Each Dockerfile line = layer. Container adds writable layer.</p>
<div class="code">docker images
docker pull redis:7-alpine
docker create --name my-redis redis:7-alpine
docker start my-redis
docker exec -it my-redis sh
# redis-cli ping
# exit
docker diff my-redis
docker stop my-redis && docker rm my-redis
docker rmi redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
lab03: `
<div class="card analogy"><b>🇳🇬 Recipe Book:</b> Dockerfile = mama's soup recipe. Order matters for cache.</div>
<h2>Dockerfile Anatomy — Core of README</h2>
<ul><li>FROM — base</li><li>WORKDIR — kitchen</li><li>COPY — ingredients</li><li>RUN — cook</li><li>EXPOSE — window</li><li>CMD — default dish</li></ul>
<div class="code">FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python","app.py"]

# Build & Run
docker build -t naija-hello:1.0 .
docker run -d -p 5000:5000 naija-hello:1.0
curl http://localhost:5000/
<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
<div class="card"><b>Best Practice:</b> COPY requirements first for cache. Add .dockerignore with .git, __pycache__, .env</div>
`,
lab04: `
<div class="card analogy"><b>🇳🇬 Water Drum:</b> NEPA takes light, container dies, data inside dies. Drum (volume) outside survives.</div>
<h2>Volumes — Persistence</h2>
<ul><li>Named volume — Docker managed, best for DB</li><li>Bind mount — laptop folder -> container, dev</li></ul>
<div class="code">docker volume create mydata
docker run -d -v mydata:/data --name writer busybox sh -c "echo Lagos > /data/city && sleep 3600"
docker run --rm -v mydata:/data busybox cat /data/city
# Postgres example
docker run -d --name pg -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres:15-alpine
docker rm -f writer pg
<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
lab05: `
<div class="card analogy"><b>🇳🇬 Compound Wiring:</b> Custom network = intercom, call by name. Docker DNS resolves container name.</div>
<h2>Networking — From README</h2>
<div class="code">docker network create naija-net
docker run -d --network naija-net --name db redis:7-alpine
docker run --rm --network naija-net busybox ping -c 2 db
docker network inspect naija-net
docker rm -f db && docker network rm naija-net<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
lab06: `
<div class="card analogy"><b>🇳🇬 Owambe:</b> One YAML invitation controls DJ, caterer, MC. compose up = party starts.</div>
<h2>Docker Compose — Multi-Container (README core)</h2>
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
  redisdata:

# Run
docker compose up -d
docker compose logs -f
docker compose down -v<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
lab07: `
<div class="card analogy"><b>🇳🇬 POS PIN:</b> Don't write PIN on POS machine. Use .env file.</div>
<h2>Env & Secrets</h2>
<div class="code">cat > .env <<'ENV'
REDIS_HOST=redis
SECRET_KEY=change-me
ENV
# compose uses env_file: .env
docker compose config
<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
lab08: `
<div class="card analogy"><b>🇳🇬 Scaffolding:</b> Build house with scaffolding, remove before renting. Final image clean.</div>
<h2>Multi-Stage Builds — README core topic</h2>
<div class="code">FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python","app.py"]

# Build
docker build -f Dockerfile.multi -t naija-app:multi .
docker images | grep naija-app<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
<div class="card">Result: ~80MB vs 1GB.</div>
`,
lab09: `
<div class="card analogy"><b>🇳🇬 Balogun Market:</b> Ship small = pay less. .dockerignore removes trash.</div>
<h2>Hub & Optimization</h2>
<div class="code">cat > .dockerignore <<'IGN'
.git
__pycache__
.env
IGN

docker tag naija-app:multi nkydigitech/naija-app:1.0
docker login
docker push nkydigitech/naija-app:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
lab10: `
<div class="card analogy"><b>🇳🇬 LASTMA:</b> LASTMA checks logs, exec, inspect to diagnose.</div>
<h2>Logs & Debugging</h2>
<div class="code">docker logs -f my-api --tail 50
docker exec -it my-api sh
docker inspect my-api --format '{{ .State.Health.Status }}'
# Dockerfile
HEALTHCHECK --interval=30s CMD curl -f http://localhost:5000/health || exit 1<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
capstone: `
<div class="card analogy"><b>🇳🇬 Full Owambe Stack:</b> Flask API (kitchen) + Redis (store) + Nginx (bouncer). Production ready per README capstone.</div>
<h2>Capstone — NaijaFood App</h2>
<p>Implements everything from README: images, containers, volumes, networks, Compose, multi-stage.</p>
<div class="grid2"><div class="card"><b>Stack</b><br>• Flask API<br>• Redis<br>• Nginx<br>• Multi-stage<br>• Healthcheck<br>• Named volume</div><div class="card"><b>Test Criteria</b><br>• compose up = 3 services healthy<br>• /api/menu returns Jollof, Suya, etc<br>• Data persists<br>• Image &lt;150MB</div></div>
<h3>app.py</h3>
<div class="code">from flask import Flask, jsonify
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST','localhost'), decode_responses=True)
@app.route('/health')
def health(): return {'status':'ok'}
@app.route('/api/menu')
def menu():
    hits = r.incr('hits')
    return jsonify({'foods':['Jollof','Suya','Pounded Yam','Egusi','Amala'],'hits':hits})
if __name__ == '__main__': app.run(host='0.0.0.0', port=5000)
<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
<h3>docker-compose.prod.yml</h3>
<div class="code">services:
  api:
    build:
      context: .
      dockerfile: capstone/Dockerfile.multi
    environment: [REDIS_HOST=redis]
    depends_on:
      redis: {condition: service_healthy}
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
    healthcheck: {test: ["CMD","redis-cli","ping"]}
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./capstone/nginx.conf:/etc/nginx/nginx.conf:ro"]
volumes:
  redisdata:
<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
<div class="code">docker compose -f capstone/docker-compose.prod.yml up --build -d
curl http://localhost/api/menu
curl http://localhost/health
docker compose down -v
<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
`,
};

let active='lab01';
function prog(){try{return JSON.parse(localStorage.getItem('docker-blueprint-progress')||'{}')}catch{return{}}}
function save(p){localStorage.setItem('docker-blueprint-progress',JSON.stringify(p));bar();side()}
function bar(){const p=prog();const d=Object.values(p).filter(Boolean).length;const pct=Math.round(d/LABS.length*100);document.getElementById('bar').style.width=pct+'%';document.getElementById('pct').textContent=pct+'% • '+d+'/'+LABS.length;document.getElementById('celebrate').style.display=pct===100?'block':'none'}
function side(){const p=prog();const q=(document.getElementById('search')?.value||'').toLowerCase();document.getElementById('list').innerHTML=LABS.filter(l=>l.title.toLowerCase().includes(q)||l.tag.toLowerCase().includes(q)).map(l=>`<div class="lab ${l.id===active?'active':''}" onclick="openLab('${l.id}')"><div class="check ${p[l.id]?'done':''}">${p[l.id]?'✓':''}</div><div><div style="font-weight:800;font-size:13px">Lab ${l.n}: ${l.title}</div><div style="font-size:11px;color:var(--muted)">${l.tag}</div></div></div>`).join('')}
function openLab(id){active=id;const lab=LABS.find(x=>x.id===id);const p=prog();document.getElementById('main').innerHTML=`<div class="hero"><span class="badge">LAB ${lab.n}</span><span class="badge">${lab.tag}</span><h1>${lab.title}</h1><div style="color:var(--muted);margin-top:6px">${lab.obj.join(' • ')}</div><div style="margin-top:14px;display:flex;gap:8px"><button class="btn primary" onclick="toggle('${id}')">${p[id]?'✓ Completed':'Mark as Complete'}</button><button class="btn" onclick="copyAll()">Copy All Commands</button></div></div><div id="content">${CONTENT[id]||''}</div><div style="display:flex;justify-content:space-between;margin-top:20px"><button class="btn" onclick="prev()">← Previous</button><button class="btn primary" onclick="next()">Next →</button></div>`;side();window.scrollTo(0,0)}
function toggle(id){const p=prog();p[id]=!p[id];save(p);openLab(id)}
function copyCode(btn){const txt=btn.parentElement.innerText.replace('Copy','').trim();navigator.clipboard.writeText(txt);btn.textContent='Copied!';setTimeout(()=>btn.textContent='Copy',1200)}
function copyAll(){const nodes=[...document.querySelectorAll('#content .code')].map(c=>c.innerText.replace('Copy','').trim()).join('\n\n');navigator.clipboard.writeText(nodes);alert('All lab commands copied!')}
function prev(){let i=LABS.findIndex(x=>x.id===active);if(i>0)openLab(LABS[i-1].id)}
function next(){let i=LABS.findIndex(x=>x.id===active);if(i<LABS.length-1)openLab(LABS[i+1].id)}
function theme(){const cur=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',cur);localStorage.setItem('docker-theme',cur)}
(function init(){const t=localStorage.getItem('docker-theme')||'dark';document.documentElement.setAttribute('data-theme',t);side();openLab('lab01');bar();document.getElementById('search').addEventListener('input',side)})();