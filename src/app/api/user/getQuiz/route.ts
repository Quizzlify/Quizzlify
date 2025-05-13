import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("quiz");

        if (!userId) {
            return NextResponse.json(
                { success: false, error: "ID de l'utilisateur manquant." },
                { status: 400 }
            );
        }
        const quiz = await collection.find({ author: userId }).toArray();

        return NextResponse.json({ success: true, quiz }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}
