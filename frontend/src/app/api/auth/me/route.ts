import { getSession } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    return NextResponse.json({
      address: session.siwe?.address,
    });
  } catch (error) {
    return NextResponse.json(
      {
        address: null,
      },
      { status: 500 }
    );
  }
}
