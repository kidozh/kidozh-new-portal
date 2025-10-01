const fs = require('fs')
const path = require('path')

function walk(dir, exts, files=[]) {
  const items = fs.readdirSync(dir)
  for (const it of items) {
    const p = path.join(dir, it)
    const st = fs.statSync(p)
    if (st.isDirectory()) {
      walk(p, exts, files)
    } else if (exts.includes(path.extname(it))) {
      files.push(p)
    }
  }
  return files
}

function extractKeysFromFile(content) {
  const keys = new Set()
  // match t('...') or t("...") or t(`...`)
  const re = /\bt\(\s*(['"`])([^'"`]+?)\1/g
  let m
  while ((m = re.exec(content)) !== null) {
    const key = m[2]
    if (key && !key.startsWith('{') && !key.includes('+')) keys.add(key)
  }
  return [...keys]
}

function flatten(obj, prefix=''){
  const keys = []
  if (typeof obj !== 'object' || obj === null) return [prefix.replace(/\.$/, '')]
  if (Array.isArray(obj)) {
    // arrays are considered terminal values
    keys.push(prefix.replace(/\.$/, ''))
    return keys
  }
  for (const k of Object.keys(obj)){
    const p = prefix ? `${prefix}.${k}` : k
    const v = obj[k]
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys.push(...flatten(v, p))
    } else {
      keys.push(p)
    }
  }
  return keys
}

;(async()=>{
  try{
    const root = process.cwd()
    const src = path.join(root, 'src')
    const files = walk(src, ['.js','.jsx','.ts','.tsx'])
    const usedKeys = new Set()
    for (const f of files) {
      const c = fs.readFileSync(f, 'utf8')
      const keys = extractKeysFromFile(c)
      for (const k of keys) usedKeys.add(k)
    }

    // read locales
    const localesDir = path.join(root, 'src','locales')
    const enPath = path.join(localesDir,'en','translation.json')
    const zhPath = path.join(localesDir,'zh','translation.json')
    const en = fs.existsSync(enPath) ? JSON.parse(fs.readFileSync(enPath,'utf8')) : {}
    const zh = fs.existsSync(zhPath) ? JSON.parse(fs.readFileSync(zhPath,'utf8')) : {}

    const enKeys = new Set(flatten(en).map(s=>s))
    const zhKeys = new Set(flatten(zh).map(s=>s))

    // normalize used keys: keep only those that look like i18n keys (contain dot)
    const used = [...usedKeys].filter(k=>k.includes('.'))

    const missingEn = []
    const missingZh = []
    for (const k of used){
      if (!enKeys.has(k)) missingEn.push(k)
      if (!zhKeys.has(k)) missingZh.push(k)
    }

    const report = {
      scannedFiles: files.length,
      usedKeyCount: used.length,
      missingEnCount: missingEn.length,
      missingZhCount: missingZh.length,
      missingEn,
      missingZh,
    }

    fs.writeFileSync(path.join(root,'tmp','missing_i18n_report.json'), JSON.stringify(report,null,2))

    // write a short markdown report
    let md = `# i18n Missing Keys Report\n\n`
    md += `Scanned JS/TS files: ${files.length}\\n\n`
    md += `Found i18n usage keys: ${used.length}\\n\n`
    md += `Missing in en: ${missingEn.length}\\n\n`
    md += `Missing in zh: ${missingZh.length}\\n\n`

    if (missingEn.length>0) {
      md += '## Missing keys in en/translation.json\n\n'
      for (const k of missingEn.slice(0,200)) md += `- ${k}\n`
      if (missingEn.length>200) md += `\n...and ${missingEn.length-200} more\n`
      md += '\n'
    }
    if (missingZh.length>0) {
      md += '## Missing keys in zh/translation.json\n\n'
      for (const k of missingZh.slice(0,200)) md += `- ${k}\n`
      if (missingZh.length>200) md += `\n...and ${missingZh.length-200} more\n`
      md += '\n'
    }

    fs.writeFileSync(path.join(root,'tmp','missing_i18n_report.md'), md)

    console.log('Report written to tmp/missing_i18n_report.json and .md')
    console.log(JSON.stringify({scannedFiles: files.length, usedKeyCount: used.length, missingEnCount: missingEn.length, missingZhCount: missingZh.length}, null, 2))
  }catch(e){
    console.error('ERROR', e && (e.stack || e))
    process.exit(1)
  }
})()
