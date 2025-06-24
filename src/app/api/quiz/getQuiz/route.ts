import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { category, level } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection<Quiz>("quiz");

        let quizzes;
        if (category && level) {
            quizzes = await collection.find({ 
                category: category,
                level: level,
                status: "published"
            }).toArray();
        } else {
            quizzes = await collection.find({}).toArray();
        }
        
        if (!quizzes.length) {
            return NextResponse.json(
                { success: false, error: "Aucun quiz trouvé avec ces spécifications." },
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