import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import clientPromise from "@/config/MongoDB";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;

        const JWT_SECRET = process.env.JWT_SECRET || "b8a21193bafb7ad901775e2b935283fa19e8fe44ba3f995fcecf21701451cd5a015e56b60c610e5dd352a1aaf2c50a614c24932ef62ae1edc00f5bf5acbfc83c";

        if (!token) {
            return new Response(
                JSON.stringify({ success: false, message: "Token not found" }),
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET);
        const userId = typeof decoded === 'object' ? decoded.id : null;

        if (!userId) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid token" }),
                { status: 401 }
            );
        }

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const collection = db.collection("users");

        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                { status: 404 }
            );
        }

        const { password, ...userWithoutPassword } = user;

        return new Response(
            JSON.stringify({ success: true, user: userWithoutPassword }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking authentication:", error);
        return new Response(
            JSON.stringify({ success: false, message: `Error checking authentication: ${error}` }),
            { status: 500 }
        );
    }
}