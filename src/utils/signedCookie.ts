import { getCookie, setCookie } from "@tanstack/react-start/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE = 60 * 60 * 24 * 60; // 60 days

function secret() {
  const s = process.env.INVITE_COOKIE_SECRET;
  if (!s) throw new Error("INVITE_COOKIE_SECRET is not set");
  return s;
}

const sign = (value: string) =>
  createHmac("sha256", secret()).update(value).digest("base64url");

export function setSignedIdCookie(name: string, id: number) {
  const value = String(id);
  setCookie(name, `${value}.${sign(value)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function getSignedIdCookie(name: string): number | null {
  const raw = getCookie(name);
  if (!raw) return null;

  const [value, sig] = raw.split(".");
  if (!value || !sig) return null;

  const expected = Buffer.from(sign(value));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  const id = Number(value);
  return Number.isInteger(id) ? id : null;
}
