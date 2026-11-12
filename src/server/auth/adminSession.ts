import { type PublicUser } from "@/server/db/schema/user";
import * as userService from "@/server/services/user";
import { z } from "zod";

import { createSignedCookie } from "./signedCookie";

const adminCookie = createSignedCookie({
  name: "admin_session",
  secretEnv: "ADMIN_COOKIE_SECRET",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  sameSite: "strict",
});

const adminSessionSchema = z.object({ userId: z.number().int() });
type AdminSession = z.infer<typeof adminSessionSchema>;

export function setAdminSession(session: AdminSession) {
  adminCookie.set(JSON.stringify(session));
}

export function clearAdminSession() {
  adminCookie.clear();
}

function readAdminSession(): AdminSession | null {
  const raw = adminCookie.get();
  if (!raw) return null;

  try {
    const parsed = adminSessionSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function getVerifiedAdmin(): Promise<PublicUser | null> {
  const session = readAdminSession();
  if (!session) return null;

  const user = await userService.get(session.userId);
  if (!user) {
    clearAdminSession();
    return null;
  }

  return user;
}
