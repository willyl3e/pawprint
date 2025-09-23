import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

async function createAccount(
  username: string,
  plainPassword: string,
  role: string,
  name: string,
  pfp: string
) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    // const client = new MongoClient("CONNECTIONURI AS STRING", {});
    const client = await clientPromise
    const db = client.db("pawprint");
    const collection = db.collection("credentials");

    const result = await collection.insertOne({
      username,
      password: hashedPassword,
      role,
      name,
      pfp,
    });

    console.log(
      `Account created for '${username}' with ID: ${result.insertedId}`
    );
  } catch (error) {
    console.error("Error creating account:", error);
  }
}

createAccount("erin.scozzafava", "VarsityBlues15", "editor", "Erin Scozzafava", "");
