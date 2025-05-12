import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {

        (await cookies()).delete("token");

        return NextResponse.json(
            { success: true, message: "Déconnexion réussie." },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json(
            JSON.stringify({ success: false, message: error }),
            { status: 500 }
        );
    }
}