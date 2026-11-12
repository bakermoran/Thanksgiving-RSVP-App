import * as inviteeService from "@/server/services/invitee";
import { z } from "zod";

import { createSignedCookie } from "./signedCookie";

const sessionCookie = createSignedCookie({
  name: "session",
  secretEnv: "INVITE_COOKIE_SECRET",
  maxAge: 60 * 60 * 24 * 60, // 60 days
});

export const sessionSchema = z.object({
  inviteeId: z.number().int(),
  inviteGroupId: z.number().int(),
});
export type Session = z.infer<typeof sessionSchema>;

export function setSession(session: Session) {
  sessionCookie.set(JSON.stringify(session));
}

function readSessionCookie(): Session | null {
  const raw = sessionCookie.get();
  if (!raw) return null;

  try {
    const parsed = sessionSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionCookie.clear();
}

export async function getVerifiedSession(): Promise<Session | null> {
  const session = readSessionCookie();
  if (!session) return null;

  const invitee = await inviteeService.get(session.inviteeId);
  if (!invitee || invitee.inviteGroupId !== session.inviteGroupId) {
    clearSession();
    return null;
  }

  return session;
}
