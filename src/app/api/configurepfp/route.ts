import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { BSON } from "mongodb";

export async function POST(req: Request, res: Response) {
  const { pfp } = JSON.parse(await req.text());
  const session = await getServerSession(options);
  const client = await clientPromise;
  const db = client.db("pawprint");
  const collection = db.collection("credentials");

  await collection.updateOne(
    { _id: new BSON.ObjectId(session?.user.id) },
    { $set: {pfp: pfp} }
  );
  return Response.json({ status: 200 });
}
