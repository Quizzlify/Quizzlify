import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        console.log(email, password)

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        const user = await collection.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { success: false, error: "L'identifiant ou le mot de passe est incorrect." },
                { status: 401 }
            );
        }

        const isPasswordValid = password === user.password
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, error: `Mot de passe incorrect: ${password}` },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Connexion établie." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la connexion: ${error}` },
            { status: 401 }
        );
    }
}
