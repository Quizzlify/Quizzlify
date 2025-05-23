import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");

        if (!token) {
            return new NextResponse(
                JSON.stringify({ success: false, message: "Token not found" }),
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET);
        const userId = typeof decoded === 'object' ? decoded.id : null;

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        }

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;        
        
        return NextResponse.json(
            { success: true, user: userWithoutPassword },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking authentication:", error);
        return NextResponse.json(
            { success: false, message: error },
            { status: 500 }
        );
    }
}