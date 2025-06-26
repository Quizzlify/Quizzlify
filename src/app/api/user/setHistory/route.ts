import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";

export async function POST(req: Request) {
    try {
        const { id, category, at, answers } = await req.json();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("history");

        await collection.insertOne({
            userId: id,
            category: category,
            at: at,
            answers: answers
        });

        const count = await collection.countDocuments({ userId: id });
        if (count > 4) {
            const oldest = await collection
                .find({ userId: id })
                .sort({ at: 1 })
                .limit(count - 4)
                .toArray();
            const oldestIds = oldest.map(doc => doc._id);
            if (oldestIds.length > 0) {
                await collection.deleteMany({ _id: { $in: oldestIds } });
            }
        }

        return NextResponse.json(
            { success: true, message: "Historique mis à jour avec succès." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}