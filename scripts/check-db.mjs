import fs from 'node:fs';
import { MongoClient } from 'mongodb';

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

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/portfolio';
const client = new MongoClient(uri);
try {
  await client.connect();
  const adminDb = client.db().admin();
  const dbs = await adminDb.listDatabases();
  console.log('Databases:', dbs.databases.map(d => d.name));
  
  for (const d of dbs.databases) {
    if (d.name === 'admin' || d.name === 'local') continue;
    const db = client.db(d.name);
    const cols = await db.listCollections().toArray();
    console.log(`DB ${d.name} collections:`, cols.map(c => c.name));
    if (cols.some(c => c.name === 'projects')) {
      const projs = await db.collection('projects').find({}).toArray();
      console.log(`DB ${d.name} projects:`, projs.map(p => ({ title: p.title, status: p.status, coverImage: p.coverImage })));
    }
  }
} catch (err) {
  console.error(err);
} finally {
  await client.close();
}
