import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { quizId } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("quiz");
        await collection.deleteOne({ _id: quizId });
  
        return NextResponse.json({ success: true });
      
    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}