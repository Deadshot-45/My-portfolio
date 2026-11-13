import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mayank_portfolio';

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!password) {
    console.warn('ADMIN_SEED_PASSWORD environment variable is not set. Skipping admin seed.');
    console.log('To seed an admin user, run:');
    console.log('  ADMIN_SEED_PASSWORD="YourStrongPassword123!" pnpm db:seed');
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();

    // Setup indexes
    await db.collection('admin_users').createIndex({ email: 1 }, { unique: true });
    await db.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true });
    await db.collection('sessions').createIndex({ expiresAt: 1 });
    await db.collection('projects').createIndex({ slug: 1 }, { unique: true });
    await db.collection('projects').createIndex({ status: 1 });
    await db.collection('projects').createIndex({ displayOrder: 1 });
    await db.collection('services').createIndex({ slug: 1 }, { unique: true });
    await db.collection('clients').createIndex({ slug: 1 }, { unique: true });
    await db.collection('testimonials').createIndex({ status: 1 });
    await db.collection('site_settings').createIndex({ key: 1 }, { unique: true });

    // Idempotent: only create the first admin if none exists
    const existing = await db.collection('admin_users').findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log(`Admin user already exists: ${email}`);
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date();
    const admin = {
      id: randomUUID(),
      email: email.toLowerCase(),
      name: 'Administrator',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection('admin_users').insertOne(admin);
    console.log(`Seeded admin account in MongoDB: ${admin.email} (id: ${admin.id})`);
    console.log('SECURITY: Change the admin password immediately after first login.');
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error('MongoDB seed error:', err);
  process.exit(1);
});
