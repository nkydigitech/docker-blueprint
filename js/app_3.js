
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
  <div class="card analogy"><b>🇳🇬 Analogy - Danfo Bus:</b> VM = buying a whole danfo for one passenger (heavy, slow). Container = same danfo engine (kernel) but isolated seats. Lightweight, fast start.</div>
  <h3>Objectives</h3><ul><li>Install Docker Desktop / Engine</li><li>Run hello-world, nginx</li></ul>
  <div class="card"><b>Lab</b></div>
  <div class="code">docker --version
docker run hello-world
docker run -d -p 8080:80 --name my-nginx nginx
# Visit http://localhost:8080
docker ps
docker logs my-nginx
docker stop my-nginx && docker rm my-nginx<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Expected Output:</b><br>Container runs, port 8080 serves Nginx welcome page. <code>docker ps</code> shows running.</div>
  <div class="card" style="border-color:var(--warn)"><b>Common Error - Lagos Style:</b> port already in use? Another danfo on same lane. Change to -p 8081:80</div>`,

 lab02: `
  <div class="card analogy"><b>🇳🇬 Jollof Analogy:</b> Image = pot of jollof (template, read-only). Container = plate you serve (writable layer). You can serve many plates from one pot.</div>
  <div class="code">docker images
docker pull redis:7-alpine
docker create --name my-redis redis:7-alpine
docker start my-redis
docker exec -it my-redis sh
# inside: redis-cli ping
docker diff my-redis
docker rm -f my-redis
docker rmi redis:7-alpine<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card">Key: <span class="kbd">create</span> makes container, <span class="kbd">start</span> runs it, <span class="kbd">exec</span> enters it.</div>`,

 lab03: `
  <div class="card analogy"><b>🇳🇬 Recipe Book:</b> Dockerfile = your mama's recipe steps. Each RUN = add pepper. Order matters for taste (cache).</div>
  <div class="code"># Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python","app.py"]

# Build & Run
docker build -t naija-hello:1.0 .
docker run -p 5000:5000 naija-hello:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Best Practice:</b> Put COPY requirements first for better caching. Like buying spices before cooking.</div>`,

 lab04: `
  <div class="card analogy"><b>🇳🇬 Water Drum:</b> If NEPA takes light and your container dies, data inside dies. Drum (volume) outside keeps water safe.</div>
  <div class="code"># Named volume
docker volume create mydata
docker run -d -v mydata:/data --name writer busybox sh -c "echo 'Lagos' > /data/city && sleep 3600"
docker run --rm -v mydata:/data busybox cat /data/city

# Bind mount for dev
mkdir app && echo "hello" > app/file.txt
docker run --rm -v $(pwd)/app:/app busybox ls /app<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 lab05: `
  <div class="card analogy"><b>🇳🇬 Compound Wiring:</b> Default bridge = everyone shouting. Custom network = intercom, call by name.</div>
  <div class="code">docker network create naija-net
docker run -d --network naija-net --name db redis:7-alpine
docker run --rm --network naija-net busybox ping -c 2 db
# db resolves via Docker DNS
docker network inspect naija-net
docker network rm naija-net<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 lab06: `
  <div class="card analogy"><b>🇳🇬 Owambe Planning:</b> One YAML invitation controls DJ (api), caterer (redis), hall (nginx). One command starts party.</div>
  <div class="code"># docker-compose.yml
services:
  api:
    build: .
    ports: ["5000:5000"]
    depends_on: [redis]
    environment: ["REDIS_HOST=redis"]
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"]
    depends_on: [api]
volumes:
  redisdata:

# Run
docker compose up -d
docker compose logs -f
docker compose down -v<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 lab07: `
  <div class="card analogy"><b>🇳🇬 POS PIN:</b> You don't write PIN on POS machine. Use ENV, don't commit secrets.</div>
  <div class="code"># .env
REDIS_HOST=redis
SECRET_KEY=change-me-in-prod

# compose
services:
  api:
    env_file: .env
    environment:
      - APP_ENV=production

# Check
docker compose config
# Never commit .env to git!<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 lab08: `
  <div class="card analogy"><b>🇳🇬 Scaffolding:</b> You build house with scaffolding, but remove it before renting. Final image = clean house.</div>
  <div class="code"># Multi-stage Dockerfile
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python","app.py"]

docker build -t naija-app:multi .
docker images | grep naija-app # ~80MB vs 1GB<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 lab09: `
  <div class="card analogy"><b>🇳🇬 Balogun Market:</b> Ship container small = pay less. .dockerignore = remove market trash.</div>
  <div class="code"># .dockerignore
.git
__pycache__
*.pyc
.env
node_modules

# Tag & Push
docker tag naija-app:multi nkydigitech/naija-app:1.0
docker login
docker push nkydigitech/naija-app:1.0
docker pull nkydigitech/naija-app:1.0<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 lab10: `
  <div class="card analogy"><b>🇳🇬 LASTMA:</b> LASTMA checks logs (exhaust), inspects (engine), exec (open door) to diagnose.</div>
  <div class="code">docker logs -f my-api --tail 50
docker exec -it my-api sh
docker inspect my-api --format '{{ .State.Health.Status }}'

# Dockerfile HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:5000/health || exit 1<button class="btn copy" onclick="copyCode(this)">Copy</button></div>`,

 capstone: `
  <div class="card analogy"><b>🇳🇬 Full Owambe Stack:</b> Flask API (jollof kitchen) + Redis (store) + Nginx (bouncer at gate). Production ready.</div>
  <div class="grid2">
   <div class="card"><b>Project Structure</b><div class="code" style="position:static">/app
 /app.py (Flask)
 /requirements.txt
 /Dockerfile.multi
 /docker-compose.prod.yml
 /nginx.conf</div></div>
   <div class="card"><b>Success Criteria</b><ul><li>compose up brings 3 services</li><li>/api/menu returns Naija foods</li><li>Data persists after down</li><li>Image <100MB</li></ul></div>
  </div>
  <h3>app.py</h3>
  <div class="code">from flask import Flask, jsonify
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST','localhost'), decode_responses=True)

@app.route('/health')
def health(): return {'status':'ok'}

@app.route('/api/menu')
def menu():
    r.incr('hits')
    return jsonify({"foods":["Jollof","Suya","Pounded Yam","Egusi"],"hits":r.get('hits')})

if __name__ == '__main__': app.run(host='0.0.0.0', port=5000)<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <h3>docker-compose.prod.yml</h3>
  <div class="code">services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.multi
    depends_on:
      redis:
        condition: service_healthy
    environment: [REDIS_HOST=redis]
    healthcheck:
      test: ["CMD","curl","-f","http://localhost:5000/health"]
      interval: 10s
      retries: 5
  redis:
    image: redis:7-alpine
    volumes: [redisdata:/data]
    healthcheck:
      test: ["CMD","redis-cli","ping"]
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"]
    depends_on: [api]
volumes: {redisdata:}<button class="btn copy" onclick="copyCode(this)">Copy</button></div>
  <div class="card"><b>Test</b><div class="code">docker compose -f docker-compose.prod.yml up --build -d
curl http://localhost/api/menu
curl http://localhost/health
docker compose down -v</div></div>`
};

let activeId = 'lab01';
function getProgress(){ try{return JSON.parse(localStorage.getItem('docker-blueprint-progress')||'{}')}catch{return{}} }
function saveProgress(p){ localStorage.setItem('docker-blueprint-progress', JSON.stringify(p)); updateProgressBar(); renderSidebar(); }
function updateProgressBar(){
  const p=getProgress(); const done=Object.values(p).filter(Boolean).length; const pct=Math.round(done/LABS.length*100);
  document.getElementById('progressBar').style.width=pct+'%';
  document.getElementById('progressText').textContent=pct+'% • '+done+'/'+LABS.length;
  if(pct===100){ document.getElementById('celebrate').style.display='block'; }
}
function renderSidebar(){
  const p=getProgress(); const q=(document.getElementById('search')?.value||'').toLowerCase();
  document.getElementById('sidebarList').innerHTML = LABS.filter(l=> l.title.toLowerCase().includes(q) || l.analogy.toLowerCase().includes(q)).map(l=>`
    <div class="lab-item ${l.id===activeId?'active':''}" onclick="openLab('${l.id}')">
      <div class="check ${p[l.id]?'done':''}">${p[l.id]?'✓':''}</div>
      <div><div style="font-weight:700;font-size:13px">Lab ${l.num}: ${l.title}</div><div style="font-size:11px;color:var(--muted)">${l.analogy}</div></div>
    </div>`).join('');
}
function openLab(id){
  activeId=id; const lab=LABS.find(l=>l.id===id);
  const p=getProgress();
  document.getElementById('main').innerHTML = `
    <div class="hero">
      <span class="badge">Lab ${lab.num}</span> <span class="badge">${lab.analogy}</span>
      <h1>${lab.title}</h1>
      <div style="color:var(--muted)">Objectives: ${lab.obj.join(' • ')}</div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn primary" onclick="toggleComplete('${id}')">${p[id]?'✓ Completed':'Mark as Complete'}</button>
        <button class="btn" onclick="copyAll()">Copy Lab Commands</button>
      </div>
    </div>
    <div id="labContent">${CONTENT[id]||''}</div>
  `;
  renderSidebar(); window.scrollTo(0,0);
}
function toggleComplete(id){
  const p=getProgress(); p[id]=!p[id]; saveProgress(p);
  openLab(id);
}
function copyCode(btn){
  const code = btn.parentElement.innerText.replace('Copy','').trim();
  navigator.clipboard.writeText(code); btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy',1500);
}
function copyAll(){
  const el=document.getElementById('labContent'); const codes=[...el.querySelectorAll('.code')].map(c=>c.innerText.replace('Copy','').trim()).join('\n\n');
  navigator.clipboard.writeText(codes); alert('All commands copied!');
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',cur); localStorage.setItem('docker-theme',cur);
}
(function init(){
  const savedTheme=localStorage.getItem('docker-theme')||'dark'; document.documentElement.setAttribute('data-theme',savedTheme);
  renderSidebar(); openLab('lab01'); updateProgressBar();
  document.getElementById('search').addEventListener('input', renderSidebar);
})();
