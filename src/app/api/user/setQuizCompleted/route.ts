import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");
        

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { quizCompleted: 1 } }
        );

        return NextResponse.json(
            { success: true, message: "Nombre de quiz complété mis à jour." },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de la mise à jour du nombre de quiz complété:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la mise à jour du nombre de quiz complété: ${error}` },
            { status: 500 }
        );
    }
}