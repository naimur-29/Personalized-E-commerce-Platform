import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Mongo URI not found!");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string) {
  try {
    await client.connect();
    console.log(">>>>>>Connected to DB<<<<<<");
    return client.db(dbName);
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("pep_db");
  if (db) return db.collection(collectionName);

  return null;
}
