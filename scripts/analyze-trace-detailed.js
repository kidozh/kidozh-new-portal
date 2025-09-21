const fs = require('fs');
const path = './trace.json';
if (!fs.existsSync(path)) { console.error('trace.json not found'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const events = data.traceEvents || [];
const complete = events.filter(e => e.ph === 'X' && typeof e.dur === 'number');
complete.sort((a,b)=>b.dur - a.dur);
const top = complete.slice(0, 10);
console.log('Top 10 long events:');
for (let i=0;i<top.length;i++){
  const e = top[i];
  console.log('---');
  console.log(`#${i+1} dur=${e.dur} name=${e.name} cat=${e.cat} pid=${e.pid} tid=${e.tid} ts=${e.ts}`);
  if (e.args && Object.keys(e.args).length) {
    console.log(' args keys:', Object.keys(e.args));
    try{
      console.log(' args sample:', JSON.stringify(e.args, Object.keys(e.args).slice(0,5), 2));
    }catch(err){ console.log(' args stringify err', err.message); }
  }
  if (e.stack && e.stack.length) console.log(' stack length', e.stack.length);
  if (e.stackTrace) {
    console.log(' stackTrace length:', e.stackTrace.length);
    // try to print top frames
    e.stackTrace.slice(0,5).forEach((f, idx)=>{
      console.log(' frame', idx, f);
    });
  }
}

// Also try to find devtools.timeline markers referencing function names
const markers = events.filter(e => e.cat && e.cat.includes('devtools.timeline') && e.name && (e.name.toLowerCase().includes('script') || e.name.toLowerCase().includes('function'))).slice(0,50);
console.log('\nSample devtools.timeline markers:', markers.length);
markers.forEach((m,idx)=>{
  console.log(idx, m.name, m.ts, m.dur || '');
});
