import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import SHA3 from "sha3";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const { userId, password, newUsername } = await req.json();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return NextResponse.json(
                { success: false, error: "L'identifiant est pas bon." },
                { status: 401 }
            );
        }

        const hash = new SHA3(512);
        hash.update(password);
        const hashedPassword = hash.digest("hex");

        const isPasswordValid = hashedPassword === user.password
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, error: `Mot de passe incorrect: ${password}` },
                { status: 401 }
            );
        }

        if (newUsername === user.username) {
            return NextResponse.json(
                { success: false, error: "Le nouveau nom d'utilisateur est identique à l'ancien." },
                { status: 400 }
            );
        }
        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { username: newUsername } }
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: `Une erreur est survenue: ${error}` },
            { status: 500 }
        );
    }
}