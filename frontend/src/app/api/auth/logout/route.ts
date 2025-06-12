import { getSession } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
