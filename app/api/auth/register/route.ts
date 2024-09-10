import clientPromise from "@/app/lib/mongodbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("next14-mongodb-restapis");
    const createAccount = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      username: email,
    });
    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
