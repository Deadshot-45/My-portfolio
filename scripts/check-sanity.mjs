import fs from 'node:fs';

for (const envFile of ['.env.local', '.env']) {
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
console.log('Sanity Project ID:', projectId, 'Dataset:', dataset);

const query = encodeURIComponent('*[_type == "project"]');
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;

try {
  const res = await fetch(url);
  const data = await res.json();
  console.log('Sanity projects count:', data.result?.length);
  console.log('Sanity projects:', JSON.stringify(data.result, null, 2));
} catch (err) {
  console.error('Fetch error:', err);
}
