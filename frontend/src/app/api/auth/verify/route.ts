import { getSession } from "@/auth";
import { publicClient } from "@/viem";
import { NextRequest, NextResponse } from "next/server";
import { parseSiweMessage, type SiweMessage } from "viem/siwe";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { message, signature } = body;

    const siweMessage = parseSiweMessage(message) as SiweMessage;

    const success = await publicClient.verifyMessage({
      address: siweMessage.address,
      message,
      signature,
    });

    if (!success) {
      throw new Error("Invalid signature.");
    }

    if (siweMessage.nonce !== session.nonce) {
      return NextResponse.json({ message: "Invalid nonce." }, { status: 422 });
    }

    session.siwe = siweMessage;
    await session.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}
