import { NextResponse, type NextRequest } from "next/server";
import clientPromise from "@/config/MongoDB";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

// Récupère dynamiquement l'origine de la requête
function getOrigin(req: NextRequest): string {
  return req.headers.get("origin") ?? "";
}

// En-têtes CORS dynamiques, avec prise en charge des cookies
function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

// Pré-réponse aux preflight CORS
export async function OPTIONS(req: NextRequest) {
  const origin = getOrigin(req);
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

// GET /api/auth/me
export async function GET(req: NextRequest) {
  const origin = getOrigin(req);

  // 1) Récupérer le token JWT depuis les cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Non authentifié" },
      { status: 401, headers: corsHeaders(origin) }
    );
  }

  // 2) Vérifier et décoder le JWT
  let payload: string | JwtPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return NextResponse.json(
      { success: false, error: "Token invalide ou expiré" },
      { status: 401, headers: corsHeaders(origin) }
    );
  }

  // 3) Extraire l'id du payload
  if (
    typeof payload !== "object" ||
    payload === null ||
    typeof payload.id !== "string"
  ) {
    return NextResponse.json(
      { success: false, error: "Payload JWT invalide" },
      { status: 401, headers: corsHeaders(origin) }
    );
  }
  const userId = payload.id;

  try {
    // 4) Vérifier que l'utilisateur existe en base
    const client = await clientPromise;
    const db = client.db("quizzlify");
    const users = db.collection("users");

    const user = await users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Utilisateur introuvable" },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    // 5) Répondre avec succès
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
