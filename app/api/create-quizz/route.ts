import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = request.body;

    return new Response("OK", { status: 200 });
  } catch (e: any) {
    return new Response(e, { status: 500 });
  }
}
