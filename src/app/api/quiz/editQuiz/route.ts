import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { category, level, title, content, id } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection<Quiz>("quiz");
        console.log(id)
        const result = await collection.updateOne(
            { _id: id },
            { $set: { category, level, title, content } }
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