import { NextResponse, type NextRequest } from "next/server";
import clientPromise from "@/config/MongoDB";
import SHA3 from "sha3";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

function getOrigin(req: NextRequest): string {
  return req.headers.get("origin") ?? "";
}

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function OPTIONS(req: NextRequest) {
  try {
    const origin = getOrigin(req);
    return NextResponse.json(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  } catch (err) {
    return NextResponse.json(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS",
      },
    });
  }
}

export async function POST(req: NextRequest) {
  const origin = getOrigin(req);

  try {
    const { username, email, password } = await req.json();
    const now = new Date();

    const client = await clientPromise;
    const db = client.db("quizzlify");
    const users = db.collection("users");

    const [byEmail, byUsername] = await Promise.all([
      users.findOne({ email }),
      users.findOne({ username }),
    ]);
    if (byEmail || byUsername) {
      return NextResponse.json(
        { success: false, error: "L'utilisateur existe déjà." },
        { status: 409, headers: corsHeaders(origin) }
      );
    }

    const hash = new SHA3(512);
    hash.update(password);
    const hashed = hash.digest("hex");

    const result = await users.insertOne({
      email,
      username,
      password: hashed,
      score: 0,
      quizCompleted: 0,
      role: "user",
      created_at: now,
      updated_at: now,
    });

    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign(
      { id: result.insertedId.toString() },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    (await cookies()).set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    const newUser = await users.findOne(
      { _id: result.insertedId },
      { projection: { password: 0 } }
    );

    return NextResponse.json(
      { success: true, message: "Inscription réussie.", user: newUser },
      { status: 201, headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { success: false, error: `Erreur lors de l'inscription: ${error}` },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
