import { NextResponse, type NextRequest } from "next/server";
import clientPromise from "@/config/MongoDB";
import jwt from "jsonwebtoken";

function getOrigin(req: NextRequest): string {
    return req.headers.get("origin") ?? "";
}

function corsHeaders(origin: string) {
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}

// === PRE-FLIGHT ===
export async function OPTIONS(req: NextRequest) {
    const origin = getOrigin(req);
    return NextResponse.json(null, {
        status: 204,
        headers: corsHeaders(origin),
    });
}


export async function GET(req: NextRequest) {
    const origin = getOrigin(req);

    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, error: "Non authentifié" },
                { status: 401, headers: corsHeaders(origin) }
            );
        }

        const JWT_SECRET = process.env.JWT_SECRET!;
        let payload: any;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch {
            return NextResponse.json(
                { success: false, error: "Token invalide ou expiré" },
                { status: 401, headers: corsHeaders(origin) }
            );
        }

        const userId = payload.id;
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Payload JWT invalide" },
                { status: 401, headers: corsHeaders(origin) }
            );
        }

        const client = await clientPromise;
        const db = client.db("quizzlify");
        const users = db.collection("users");
        const user = await users.findOne(
            { _id: new (require("mongodb").ObjectId)(userId) },
            { projection: { password: 0 } }
        );
        if (!user) {
            return NextResponse.json(
                { success: false, error: "Utilisateur introuvable" },
                { status: 404, headers: corsHeaders(origin) }
            );
        }

        return NextResponse.json(
            { success: true, id: userId, user },
            { status: 200, headers: corsHeaders(origin) }
        );
    } catch (err) {
        console.error("Erreur /api/auth/me:", err);
        return NextResponse.json(
            { success: false, error: "Erreur interne" },
            { status: 500, headers: corsHeaders(origin) }
        );
    }
}