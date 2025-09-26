import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const client = await clientPromise;
  const db = client.db("pawprint");
  const collection = db.collection("resources");

  const regex = new RegExp(query, "i");
  const results = await collection
    .find({ location: { $regex: regex } })
    .limit(20)
    .toArray();

  return NextResponse.json(results);
}
