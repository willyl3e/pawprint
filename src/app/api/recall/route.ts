import clientPromise from "@/lib/mongodb";
import { BSON } from "mongodb";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

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
        return new Response(JSON.stringify({ data }), { status: 200 });
      case "recallAction":
        const username = session?.user.name
        const selectedArticle = await articlesCollection.findOneAndDelete({
          _id: new BSON.ObjectId(id),
        });
        await manuscriptsCollection.insertOne({$set:
          { 
          _id:selectedArticle?._id,
          title:selectedArticle!.title,
          author: selectedArticle!.author,
          content:selectedArticle!.content,
          category:selectedArticle!.category,
          img:selectedArticle!.img,
         },
        $push:{
          history:`Recalled on ${new Date()} by ${username}`
        }
        });
        return new Response(JSON.stringify({ status: 200 }));
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
