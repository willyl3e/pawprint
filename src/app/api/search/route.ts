import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const client = await clientPromise;
  const db = client.db("pawprint");
  const collection = db.collection("articles");

  console.log(query)

  const regex = new RegExp(query, "i");
  const results = await collection
    .find({ title: { $regex: regex } })
    .limit(20)
    .toArray();

  console.log(results)

  return NextResponse.json(results);
}
