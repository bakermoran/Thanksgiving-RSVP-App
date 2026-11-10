import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { createHmac, timingSafeEqual } from "node:crypto";

interface SignedCookieOptions {
  name: string;
  secretEnv: string;
  maxAge: number;
  sameSite?: "lax" | "strict";
}

export function createSignedCookie({
  name,
  secretEnv,
  maxAge,
  sameSite = "lax",
}: SignedCookieOptions) {
  const secret = () => {
    const s = process.env[secretEnv];
    if (!s) throw new Error(`${secretEnv} is not set`);
    return s;
  };

  const sign = (value: string) =>
    createHmac("sha256", secret()).update(value).digest("base64url");

  return {
    set(value: string) {
      const encoded = Buffer.from(value).toString("base64url");
      setCookie(name, `${encoded}.${sign(encoded)}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite,
        path: "/",
        maxAge,
      });
    },

    get(): string | null {
      const raw = getCookie(name);
      if (!raw) return null;

      const [encoded, sig, ...rest] = raw.split(".");
      if (!encoded || !sig || rest.length) return null;

      const expected = Buffer.from(sign(encoded));
      const actual = Buffer.from(sig);
      if (
        expected.length !== actual.length ||
        !timingSafeEqual(expected, actual)
      ) {
        return null;
      }

      return Buffer.from(encoded, "base64url").toString();
    },

    clear() {
      deleteCookie(name, { path: "/" });
    },
  };
}
