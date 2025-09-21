const fs = require('fs');
const path = './trace.json';
if (!fs.existsSync(path)) { console.error('trace.json not found'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const events = data.traceEvents || [];
const complete = events.filter(e => e.ph === 'X' && typeof e.dur === 'number');
complete.sort((a,b)=>b.dur - a.dur);
console.log('Total complete events:', complete.length);
const top = complete.slice(0, 40);
for (let i=0;i<top.length;i++){
  const e = top[i];
  console.log(`#${i+1} dur=${e.dur} name=${e.name} cat=${e.cat} pid=${e.pid} tid=${e.tid} ts=${e.ts}`);
}
