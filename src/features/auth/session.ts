import { getInvitee } from "@/repositories/inviteeRepository";
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

function readSessionCookie(): Session | null {
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

export async function getVerifiedSession(): Promise<Session | null> {
  const session = readSessionCookie();
  if (!session) return null;

  const invitee = await getInvitee(session.inviteeId);
  if (!invitee || invitee.inviteGroupId !== session.inviteGroupId) {
    clearSession();
    return null;
  }

  return session;
}
