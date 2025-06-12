import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";
import { SiweMessage } from "viem/siwe";

const IRON_PASSWORD = process.env.IRON_PASSWORD;
if (!IRON_PASSWORD) {
  throw new Error("IRON_PASSWORD environment variable is not defined");
}

const IRON_DOMAIN = process.env.IRON_DOMAIN;
if (!IRON_DOMAIN) {
  throw new Error("IRON_DOMAIN environment variable is not defined");
}

export const ironOptions: SessionOptions = {
  password: IRON_PASSWORD,
  cookieName: "jumper-session",
  cookieOptions: {
    domain: IRON_DOMAIN,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

export interface JumperSession {
  nonce?: string;
  siwe?: SiweMessage;
}

export const getSession = () => getIronSession<JumperSession>(cookies(), ironOptions); 
