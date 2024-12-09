import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { BSON } from "mongodb";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const selectedPath = url.searchParams.get("articlePath");

  if (!selectedPath) {
    return NextResponse.json(
      { error: "articlePath query parameter is required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("pawprint");
  const collection = db.collection("articles");

  const selectedArticle = await collection.findOne({
    _id: new BSON.ObjectId(selectedPath),
  });

  if (!selectedArticle) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const credentialsCollection = db.collection("credentials");

  const authorInformation = await credentialsCollection.findOne(
    { _id: new BSON.ObjectId(selectedArticle!.author) },
    {
      projection: { name: 1, pfp: 1 },
    }
  );

  const returnedCombined = { ...selectedArticle, ...authorInformation };

  return NextResponse.json({ data: returnedCombined });
}
