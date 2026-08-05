import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import initialData from "@/data/site-data.json";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "portfolio_db";
const COLLECTION_NAME = "site_data";

let client: MongoClient | null = null;

async function getMongoClient() {
  if (!MONGODB_URI) return null;
  if (client) return client;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client;
}

export async function getSiteData() {
  try {
    const mongo = await getMongoClient();
    if (mongo) {
      const db = mongo.db(DATABASE_NAME);
      const collection = db.collection(COLLECTION_NAME);
      const doc = await collection.findOne({ id: "main" });
      if (doc) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, id, ...rest } = doc as Record<string, unknown>;
        return rest;
      }
    }
  } catch (error) {
    console.error("MongoDB read failed, falling back to local files:", error);
  }

  // Fallback to local file system
  try {
    const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
    if (fs.existsSync(filePath)) {
      const dataStr = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(dataStr);
    }
  } catch (error) {
    console.error("Local read failed:", error);
  }
  
  return initialData;
}

export async function saveSiteData(data: Record<string, unknown>) {
  try {
    const mongo = await getMongoClient();
    if (mongo) {
      const db = mongo.db(DATABASE_NAME);
      const collection = db.collection(COLLECTION_NAME);
      await collection.updateOne(
        { id: "main" },
        { $set: { id: "main", ...data } },
        { upsert: true }
      );
      return { success: true, mode: "mongodb" };
    }
  } catch (error) {
    console.error("MongoDB save failed, falling back to local files:", error);
  }

  // Fallback to local file system
  try {
    const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return { success: true, mode: "local" };
  } catch (error) {
    console.error("Local save failed:", error);
    throw error;
  }
}
