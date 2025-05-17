import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { updatedQuiz, id } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("quiz");

        // Vérification de l'existence du quiz
        const quiz = await collection.findOne({ _id: new ObjectId(id) });
        if (!quiz) {
            return NextResponse.json(
                { success: false, error: "Quiz non trouvé." },
                { status: 404 }
            );
        }

        // Remove _id from updatedQuiz if present to avoid immutable field error
        if ('_id' in updatedQuiz) {
            delete updatedQuiz._id;
        }
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedQuiz }
        );

        if (result.matchedCount === 0) {
            throw new Error("Quiz non trouvé");
        }

        return NextResponse.json({ success: true });
      
    } catch (error) {
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}