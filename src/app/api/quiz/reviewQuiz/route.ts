import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { quizId, action } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("quiz");

        // Vérification de l'existence du quiz
        const quiz = await collection.findOne({ _id: new ObjectId(quizId) });
        if (!quiz) {
            return NextResponse.json(
                { success: false, error: "Quiz non trouvé." },
                { status: 404 }
            );
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(quizId) },
            { $set: { status: action } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Quiz non rejeté.");
        }

        return NextResponse.json({ success: true });
      
    } catch (error) {
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}