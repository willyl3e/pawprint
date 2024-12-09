import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

// Extend globalThis to include _mongoClientPromise
declare global {
  // Using `globalThis` directly
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to the environment variables.");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable to persist the client during development
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
