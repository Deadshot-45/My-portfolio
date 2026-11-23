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

const { MongoClient } = await import('mongodb');
const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/portfolio';
const client = new MongoClient(uri);
await client.connect();
const db = client.db('mayank_portfolio');
const rawProjects = await db.collection('projects').find({ status: 'PUBLISHED' }).toArray();
console.log('rawProjects with status: PUBLISHED count:', rawProjects.length);
const allProjects = await db.collection('projects').find({}).toArray();
console.log('allProjects count:', allProjects.length);
await client.close();
