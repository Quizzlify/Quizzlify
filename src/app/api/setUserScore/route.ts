import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { id, score } = await req.json();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");
        const newScore = score + 

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { score: score } }
        );

        return NextResponse.json(
            { success: true, message: "Score mis à jour." },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de la mise à jour du score:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la mise à jour du score: ${error}` },
            { status: 500 }
        );
    }
}