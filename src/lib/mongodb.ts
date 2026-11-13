import { MongoClient, Db, Collection } from 'mongodb';
import { randomUUID } from 'node:crypto';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mayank_portfolio';
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let cachedPromise: Promise<MongoClient> | null = null;

async function initClient(): Promise<MongoClient> {
  const client = new MongoClient(uri, options);
  try {
    const connectedClient = await client.connect();
    // Sanitize credentials from URI before logging to protect secrets
    const sanitizedUri = uri.replace(/\/\/[^@]+@/, '//***:***@');
    console.log(`[MongoDB] Connected successfully to ${sanitizedUri}`);
    return connectedClient;
  } catch (err: unknown) {
    // Clear cached promise on failure so next request can retry instead of permanently failing
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = undefined;
    }
    cachedPromise = null;

    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes('tlsv1 alert internal error') || errMsg.includes('SSL alert')) {
      console.error(
        '[MongoDB] TLS/SSL Alert 80: MongoDB Atlas rejected the connection. Your public IP address is not whitelisted in MongoDB Atlas Network Access. Add 0.0.0.0/0 or your current IP in Atlas Dashboard -> Network Access.'
      );
    }
    throw err;
  }
}

export function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = initClient();
    }
    return global._mongoClientPromise;
  }

  if (!cachedPromise) {
    cachedPromise = initClient();
  }
  return cachedPromise;
}

export default getClientPromise;

export async function getDb(dbName?: string): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName || 'mayank_portfolio');
}

export async function getCollection<T extends import('mongodb').Document = import('mongodb').Document>(
  collectionName: string
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(collectionName);
}

export function generateId(): string {
  return randomUUID();
}

export function serializeDoc<T>(doc: any): T {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || (_id ? _id.toString() : ''),
  } as T;
}

export function serializeDocs<T>(docs: any[]): T[] {
  return docs.map((d) => serializeDoc<T>(d));
}
