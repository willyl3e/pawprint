import { MongoClient } from "mongodb";

const MAX_IDLE_TIME_MS = 15 * 60_000;

const client = new MongoClient(
  process.env.MONGODB_URI!,
  {
    maxPoolSize: 2,
    maxIdleTimeMS: MAX_IDLE_TIME_MS,
  }
);

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
