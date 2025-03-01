import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { title, author, content, category, level } = await req.json();
        const created_at = new Date();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("quiz");

        const quizCount = await collection.countDocuments();
        await collection.insertOne({ index: quizCount === 0 ? 0 : quizCount+1, title, author, created_at, content, category, level});

        return NextResponse.json(
            { success: true, message: "Quiz ajouté." },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de l'ajout: ${error}` },
            { status: 500 }
        );
    }
}