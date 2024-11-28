import { MongoClient } from "mongodb";

//const client = new MongoClient(process.env.MONGODB_URI!);
const client = new MongoClient("mongodb+srv://williamlee080508:zTZxFzCop3d7mFJq@main.pwhbm.mongodb.net/?retryWrites=true&w=majority&appName=Main");

declare global {
  // Add `clientPromise` to the NodeJS Global interface to avoid re-declaration
  var _mongoClientPromise: Promise<MongoClient>;
}

// Use the existing promise in the global scope in development
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Always create a new promise in production
  clientPromise = client.connect();
}

export default clientPromise;

/*import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;*/