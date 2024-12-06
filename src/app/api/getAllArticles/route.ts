import express from 'express';
const app = express();
app.use(express.json());
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const { category, numberOfArticles } = JSON.parse(bodyText);

    const client = await clientPromise;
    const db = client.db("pawprint");
    const collection = db.collection("articles");

    const data = await collection.find({category}).toArray();

    if (numberOfArticles) {
      data.splice(numberOfArticles)
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
    
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}