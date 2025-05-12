import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection<Quiz>("quiz");
        const quizzes = await collection.find({ 
            author: userId,
        }).toArray();
        
        if (!quizzes.length) {
            return NextResponse.json(
                { success: false, error: "Aucun quiz trouvé de cette utilisateur." },
                { status: 401 }
            );
        }
  
        return NextResponse.json({ success: true, data: quizzes });
      
    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}