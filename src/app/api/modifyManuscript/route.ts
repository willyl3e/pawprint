import { Collection, BSON } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface Manuscript {
  _id?: BSON.ObjectId;
  title: string;
  author: string;
  category: string;
  img: string;
  content: string;
  history: string[];
}

export async function POST(req: Request) {
  const { actionType, id, title, content, category, img } =
    JSON.parse(await req.text());
  const session = await getServerSession(options);

  const client = await clientPromise;
  const db = client.db("pawprint");
  const collection: Collection<Manuscript> = db.collection("manuscripts");

  const authenticatedUserId = session!.user.id;
  const authenticatedUserName = session!.user.name || "";

  try {
    switch (actionType) {
      case "getAllArticles": {
        const data = await collection
          .find({ author: authenticatedUserId })
          .toArray();
        return new Response(JSON.stringify({ data }), { status: 200 });
      }
      case "create": {
        const newDoc: Manuscript = {
          title,
          author: authenticatedUserId,
          content,
          category,
          img,
          history: [`Created on ${new Date()} by ${authenticatedUserName}`],
        };
        await collection.insertOne(newDoc);
        return new Response(JSON.stringify({ status: 200 }));
      }
      case "update": {
        await collection.updateOne(
          { _id: new BSON.ObjectId(id) },
          {
            $set: {
              title,
              content,
              category,
              img,
            },
            $push: {
              history: `Updated on ${new Date()} by ${authenticatedUserName}`,
            },
          }
        );
        return new Response(JSON.stringify({ status: 200 }));
      }
      case "delete": {
        await collection.deleteOne({ _id: new BSON.ObjectId(id) });
        return new Response(JSON.stringify({ status: 200 }));
      }
      default:
        return new Response(JSON.stringify({ error: "Invalid action type" }), {
          status: 400,
        });
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
