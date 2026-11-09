import {
  clearCookie,
  getSignedCookie,
  setSignedCookie,
} from "@/utils/signedCookie";
import { z } from "zod";

const COOKIE_NAME = "session";

export const sessionSchema = z.object({
  inviteeId: z.number().int(),
  inviteGroupId: z.number().int(),
});
export type Session = z.infer<typeof sessionSchema>;

export function setSession(session: Session) {
  setSignedCookie(COOKIE_NAME, JSON.stringify(session));
}

export function getSession(): Session | null {
  const raw = getSignedCookie(COOKIE_NAME);
  if (!raw) return null;

  try {
    const parsed = sessionSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  clearCookie(COOKIE_NAME);
}
