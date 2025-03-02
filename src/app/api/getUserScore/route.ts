import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        const user = await collection.findOne({ _id: new ObjectId(id) });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Aucun utilisateur trouvé." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, score: user.score });

    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}
