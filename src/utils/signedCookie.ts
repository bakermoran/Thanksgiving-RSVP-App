import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE = 60 * 60 * 24 * 60; // 60 days

function secret() {
  const s = process.env.INVITE_COOKIE_SECRET;
  if (!s) throw new Error("INVITE_COOKIE_SECRET is not set");
  return s;
}

const sign = (value: string) =>
  createHmac("sha256", secret()).update(value).digest("base64url");

export function setSignedCookie(name: string, value: string) {
  const encoded = Buffer.from(value).toString("base64url");
  setCookie(name, `${encoded}.${sign(encoded)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function getSignedCookie(name: string): string | null {
  const raw = getCookie(name);
  if (!raw) return null;

  const [encoded, sig, ...rest] = raw.split(".");
  if (!encoded || !sig || rest.length) return null;

  const expected = Buffer.from(sign(encoded));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  return Buffer.from(encoded, "base64url").toString();
}

export function clearCookie(name: string) {
  deleteCookie(name, { path: "/" });
}
