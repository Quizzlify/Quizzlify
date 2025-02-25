import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();
        const created_at = new Date();
        const updated_at = new Date();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        // vérifier si l'utilisateur existe déjà
        const existingEmail = await collection.findOne({ email });
        const existingUsername = await collection.findOne({ username });
        if (existingEmail || existingUsername) {
            return NextResponse.json(
                { success: false, error: "L'utilisateur existe déjà." },
                { status: 409 }
            );
        }

        const userCount = await collection.countDocuments();
        await collection.insertOne({ email, username, password, score: 0, rank: userCount + 1, role: 'user', created_at, updated_at });

        return NextResponse.json(
            { success: true, message: "Inscription réussie." },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de l'inscription: ${error}` },
            { status: 500 }
        );
    }
}