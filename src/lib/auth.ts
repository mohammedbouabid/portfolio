import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me");

export async function createSession() {
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function destroySession() {
  cookies().delete(COOKIE);
}

export async function getSession(token?: string): Promise<boolean> {
  const t = token ?? cookies().get(COOKIE)?.value;
  if (!t) return false;
  try {
    await jwtVerify(t, secret());
    return true;
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await getSession())) throw new Error("UNAUTHORIZED");
}
