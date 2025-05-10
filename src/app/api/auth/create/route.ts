import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import SHA3 from "sha3";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();
        const created_at = new Date();
        const updated_at = new Date();

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        // vérifier si l'utilisateur existe déjà
        const existingEmail = await collection.findOne({ email });
        const existingUsername = await collection.findOne({ username });
        if (existingEmail || existingUsername) {
            return NextResponse.json(
                { success: false, error: "L'utilisateur existe déjà." },
                { status: 409 }
            );
        }

        const hash = new SHA3(512);
        hash.update(password);
        const hashedPassword = hash.digest("hex");

        const userCount = await collection.countDocuments();
        const result = await collection.insertOne({
            email,
            username,
            password: hashedPassword,
            score: 0,
            rank: userCount + 1,
            role: "user",
            created_at,
            updated_at,
        });

        const token = jwt.sign(
            { id: result.insertedId.toString() },
            process.env.JWT_SECRET ||
                "b8a21193bafb7ad901775e2b935283fa19e8fe44ba3f995fcecf21701451cd5a015e56b60c610e5dd352a1aaf2c50a614c24932ef62ae1edc00f5bf5acbfc83c",
            { expiresIn: "7d" }
        );

        (await cookies()).set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        const newUser = await collection.findOne({ _id: result.insertedId }, { projection: { password: 0 } });

        return NextResponse.json(
            { success: true, message: "Inscription réussie.", user: newUser },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de l'inscription: ${error}` },
            { status: 500 }
        );
    }
}