const express = require('express');
const {execSync} = require('child_process');
const path = '/etc/nginx/conf.d/active_upstream.conf'; // inside gateway container
const app = express();
const PORT = 3000;

function sh(cmd){ return execSync(cmd,{stdio:'pipe'}).toString().trim(); }
function gwExec(cmd){ return sh(`docker exec project1_gateway ${cmd}`); }

function readLog(){ return sh(`docker exec project1_storage sh -c "cat /data/storage.log || true"`); }
function truncateLog(){ sh(`docker exec project1_storage sh -c "truncate -s 0 /data/storage.log || true"`); }

function setActive(version) {
  const target =
    version === 'v2'
      ? 'app_v2_service1:8199'
      : 'app_v1_service1:8199';

  const prefix = version === 'v2' ? 'app_v2' : 'app_v1';

  // Ensure target version containers are running (if they exist but are stopped)
  try {
    sh(`docker start ${prefix}_service1 ${prefix}_service2 || true`);
  } catch {}
  
  const content = `# version:${version}
upstream active_service1 { server ${target}; }`;

  const cmd = `docker exec project1_gateway sh -c 'cat <<EOF > ${path}
${content}
EOF'`;

  sh(cmd);
  gwExec('nginx -s reload');
}

function currentVersion() {
  const cur = sh('docker exec project1_gateway cat /etc/nginx/conf.d/active_upstream.conf');
  return /version:v2/.test(cur) ? 'v2' : 'v1';
}

// quick/portable metrics
function listUptimes(){
  const names = sh('docker ps --format "{{.Names}}"').split('\n');
  const m = {};
  names.forEach(n=>{
    const startedAt = sh(`docker inspect -f '{{.State.StartedAt}}' ${n}`);
    m[n] = { startedAt };
  });
  return m;
}

// --- routes
app.use(express.static('public'));

app.post('/api/switch', (_req,res)=>{
  setActive(currentVersion() === 'v1' ? 'v2' : 'v1');
  res.sendStatus(204);
});

app.post('/api/discard', (_req,res)=>{
  const cur = sh('docker exec project1_gateway cat /etc/nginx/conf.d/active_upstream.conf');
  const old = /version:v2/.test(cur) ? 'v1' : 'v2';
  const prefix = old === 'v1' ? 'app_v1' : 'app_v2';
  try { sh(`docker stop ${prefix}_service1 ${prefix}_service2`); } catch {}
  res.sendStatus(204);
});

app.post('/api/reset-log', (_req,res)=>{ truncateLog(); res.sendStatus(204); });

app.get('/api/log', (_req,res)=> res.type('text/plain').send(readLog()));

app.get('/api/metrics', (_req,res)=>{
  res.json({
    uptimeContainers: listUptimes(),
    logSizeBytes: Number(sh(`docker exec project1_storage sh -c "stat -c %s /data/storage.log || echo 0"`)),
    hostCpu: Number(sh(`sh -c "cat /proc/loadavg | awk '{print \\$1}'"`))
  });
});

app.listen(PORT, ()=>console.log('console listening', PORT));