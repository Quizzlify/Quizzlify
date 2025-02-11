import clientPromise from "@/config/MongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const usersCollection = db.collection("users");

        const result = await usersCollection.find({}).toArray();

        return NextResponse.json(
            { success: true, message: "Utilisateur envoyé", users: result },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Erreur interne du serveur." },
            { status: 500 }
        );
    }
}