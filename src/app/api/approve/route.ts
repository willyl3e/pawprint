import { Collection, BSON } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import algoliasearch from "algoliasearch";
import { options } from "@/app/api/auth/[...nextauth]/options";
const client = algoliasearch(process.env.ALGOLIAID!, process.env.ALGOLIAKEY!);
const index = client.initIndex("pawprint");

interface Manuscript {
  _id?: BSON.ObjectId;
  title: string;
  author: string;
  date: Date;
  path: string;
  category: string;
  img: string;
  content: string;
  history: string[];
  status: string;
}

export async function POST(req: Request) {
  const { actionType, id, title, content, path, category, img, comment } =
    JSON.parse(await req.text());
  const session = await getServerSession(options);

  const client = await clientPromise;
  const db = client.db("pawprint");
  const collection: Collection<Manuscript> = db.collection("manuscripts");

  const authenticatedUserName = session!.user.name || "";

  try {
    switch (actionType) {
      case "getAllArticles": {
        const data = await collection.find().toArray();

        return new Response(JSON.stringify({ data }), { status: 200, headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        } });
      }
      case "comment": {
        await collection.updateOne(
          { _id: new BSON.ObjectId(id) },
          {
            $push: {
              history: `${authenticatedUserName} commented on ${new Date()}: ${comment}`,
            },
          }
        );
        return new Response(JSON.stringify({ status: 200, headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        } }));
      }
      case "edit": {
        await collection.updateOne(
          { _id: new BSON.ObjectId(id) },
          {
            $set: {
              title,
              content,
              path,
              category,
              img,
              date: new Date(),
            },
            $push: {
              history: `Updated on ${new Date()} by ${authenticatedUserName}`,
            },
          }
        );

        return new Response(JSON.stringify({ status: 200, headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        } }));
      }
      case "delete": {
        await collection.deleteOne({ _id: new BSON.ObjectId(id) });
        return new Response(JSON.stringify({ status: 200, headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        } }));
      }
      case "publish": {
        const articlesCollection: Collection<Manuscript> = await db.collection(
          "articles"
        );
        const manuscriptToBePublished = await collection.findOne({
          _id: new BSON.ObjectId(id),
        });

        if (!manuscriptToBePublished) {
          return new Response(JSON.stringify({ data: "id aint valid", headers: {
            "Access-Control-Allow-Origin": "*", 
            "Content-Type": "application/json",
          } }));
        }

        await articlesCollection.insertOne(manuscriptToBePublished!);
        await collection.deleteOne({ _id: new BSON.ObjectId(id) });
        await articlesCollection.updateOne(
          {
            _id: new BSON.ObjectId(id),
          },
          {
            $set: {
              date: new Date(),
            },
            $push: {
              history: `${authenticatedUserName} published on ${new Date()}`,
            },
          }
        );

        const date = new Date()

        await index.saveObject({
          title: manuscriptToBePublished.title,
          author: authenticatedUserName,
          img:manuscriptToBePublished.img,
          date:date.toString(),
          objectID: id,
        });

        return new Response(JSON.stringify({ status: 200, data: "got it!", headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        } }));
      }
      default:
        return new Response(JSON.stringify({ error: "Invalid action type", headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        } }), {
          status: 400,
        });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error", headers: {
      "Access-Control-Allow-Origin": "*", 
      "Content-Type": "application/json",
    } }), {
      status: 500,
    });
  }
}
