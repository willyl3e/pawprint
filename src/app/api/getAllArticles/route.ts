import clientPromise from "@/lib/mongodb";
import { BSON } from "mongodb";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const { category, numberOfArticles } = JSON.parse(bodyText);

    const client = await clientPromise;
    const db = client.db("pawprint");
    const collection = db.collection("articles");

    console.log(category);

    const data = await collection.find({ category }).toArray();

    for (let i = 0; i < data.length; i++) {
      const author = data[i].author;
      const credentialsCollection = db.collection("credentials");

      const authorNameObject = await credentialsCollection.findOne(
        {
          _id: new BSON.ObjectId(author),
        },
        { projection: { name: 1 } }
      );

      data[i].author = authorNameObject!.name
    }

    if (numberOfArticles) {
      data.splice(numberOfArticles);
    }

    return new Response(JSON.stringify({ data }), { status: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }, });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }, }), {
      status: 500,
    });
  }
}
