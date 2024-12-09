import clientPromise from "@/lib/mongodb";
import { BSON } from "mongodb";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import algoliasearch from "algoliasearch";
const client = algoliasearch(process.env.ALGOLIAID!, process.env.ALGOLIAKEY!);
const index = client.initIndex("pawprint");

export async function POST(req: Request) {
  const session = await getServerSession(options);
  try {
    const client = await clientPromise;
    const db = client.db("pawprint");
    const articlesCollection = db.collection("articles");
    const manuscriptsCollection = db.collection("manuscripts");

    const { actionType, id } = await req.json();

    switch (actionType) {
      case "getAll":
        const data = await articlesCollection.find().toArray();
        return new Response(JSON.stringify({ data }), { status: 200,   });
      case "recallAction":
        const username = session?.user.name;
        const selectedArticle = await articlesCollection.findOneAndDelete({
          _id: new BSON.ObjectId(id),
        });

        if (selectedArticle) {
          await manuscriptsCollection.insertOne({
            _id: selectedArticle?._id,
            title: selectedArticle.title,
            author: selectedArticle.author,
            content: selectedArticle.content,
            category: selectedArticle.category,
            img: selectedArticle.img,
            history: [
              ...selectedArticle.history,
              `Recalled on ${new Date()} by ${username}`,
            ],
          });
        }

        await index.deleteObject(id.toString())

        return new Response(JSON.stringify({ status: 200,   }));
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", headers: {
      "Access-Control-Allow-Origin": "*", 
      "Content-Type": "application/json",
    } }), {
      status: 500,
    });
  }
}
