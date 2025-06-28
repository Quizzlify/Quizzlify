import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { userId, limit } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("history");

        const history = await collection.find({ userId: userId }).toArray();
        const limitedHistory = history
            .sort((a, b) => (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0))
            .slice(0, limit);
        if (!history) {
            return NextResponse.json(
                { success: false, error: "L'utilisateur n'a pas encore effectué de quiz." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: limitedHistory });

    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la récupération: ${error}.` },
            { status: 500 }
        );
    }
}
