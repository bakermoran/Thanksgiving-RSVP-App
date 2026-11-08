import { redirect } from "@tanstack/react-router";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "invite_group";

function secret() {
  const s = process.env.INVITE_COOKIE_SECRET;
  if (!s) throw new Error("INVITE_COOKIE_SECRET is not set");
  return s;
}

const sign = (value: string) =>
  createHmac("sha256", secret()).update(value).digest("base64url");

export function grantInviteGroupAccess(inviteGroupId: number) {
  const value = String(inviteGroupId);
  setCookie(COOKIE_NAME, `${value}.${sign(value)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60, // 60 days
  });
}

export function getInviteGroupIdFromCookie(): number | null {
  const raw = getCookie(COOKIE_NAME);
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

export function requireInviteGroupId(): number {
  const id = getInviteGroupIdFromCookie();
  if (id === null) throw redirect({ to: "/" });
  return id;
}
