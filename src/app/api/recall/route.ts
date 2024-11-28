import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("pawprint");
    const collection = db.collection("articles");

    const { path } = await req.json();

    const data = await collection.findOne({ path });
    console.log("Document found:", data);

    return new Response(JSON.stringify({ data }), { status: 200 });
    
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

