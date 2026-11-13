import { MongoClient, Db, Collection } from 'mongodb';
import { randomUUID } from 'node:crypto';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mayank_portfolio';
const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let cachedPromise: Promise<MongoClient> | null = null;

export function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!cachedPromise) {
    const client = new MongoClient(uri, options);
    cachedPromise = client.connect();
  }
  return cachedPromise;
}

export default getClientPromise;

export async function getDb(dbName?: string): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
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
