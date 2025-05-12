import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection<User>("users");
  
        const users = await collection.find().toArray();
  
        if (!users.length) {
            return NextResponse.json(
                { success: false, error: "Aucun utilisateur trouvé." },
                { status: 401 }
            );
        }

        const userWithoutInfo = users.map((user) => {
            const { _id, username, role, score, quizCompleted } = user;
            return { _id, username, role, score, quizCompleted };
        });
  
        return NextResponse.json({ success: true, data: userWithoutInfo });
      
    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}