import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SiweMessage } from "viem/siwe";

const NEXT_IRON_PASSWORD = process.env.NEXT_IRON_PASSWORD;
if (!NEXT_IRON_PASSWORD) {
  throw new Error("NEXT_IRON_PASSWORD environment variable is not defined");
}

export const ironOptions = {
  password: NEXT_IRON_PASSWORD,
  cookieName: "jumper-session",
};

export interface JumperSession {
  nonce?: string;
  siwe?: SiweMessage;
}

export const getSession = () => getIronSession<JumperSession>(cookies(), ironOptions); 
