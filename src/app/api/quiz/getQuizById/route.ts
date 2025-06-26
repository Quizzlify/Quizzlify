import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("quiz");

        const quiz = await collection.findOne({ _id: new ObjectId(id), status: "published" });
        if (!quiz) {
            return NextResponse.json({ success: false, error: "Quiz non trouvé." }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, quiz });
    } catch (error) {
        return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 });
    }
}