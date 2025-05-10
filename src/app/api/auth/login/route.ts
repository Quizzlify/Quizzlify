import { NextResponse } from "next/server";
import clientPromise from "@/config/MongoDB";
import SHA3 from "sha3";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        console.log(email, password)

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        const user = await collection.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { success: false, error: "L'identifiant ou le mot de passe est incorrect." },
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

        const token = jwt.sign(
            { id: user._id.toString() },
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
            path: "/"
        })

        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            { success: true, message: "Connexion établie.", user: userWithoutPassword },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return NextResponse.json(
            { success: false, error: `Erreur lors de la connexion: ${error}` },
            { status: 401 }
        );
    }
}
