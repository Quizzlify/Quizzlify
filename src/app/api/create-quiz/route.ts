import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { author, content, category, level, title } = await req.json();
        const created_at = new Date();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("pendingQuiz");

        const quizCount = await collection.countDocuments();
        await collection.insertOne({ index: quizCount === 0 ? 0 : quizCount+1, author, title, created_at, content, category, level});

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