import { generateSiweNonce } from "viem/siwe";
import { NextResponse } from "next/server";
import { getSession } from "@/auth";

export async function GET() {
  try {
    const session = await getSession();

    session.nonce = generateSiweNonce();
    await session.save();

    return new NextResponse(session.nonce, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
