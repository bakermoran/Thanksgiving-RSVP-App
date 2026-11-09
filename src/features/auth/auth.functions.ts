import { getInvitee } from "@/repositories/inviteeRepository";
import { createServerFn } from "@tanstack/react-start";

import { type Session, clearSession, getSession } from "./session";

export const getCurrentSession = createServerFn({
  method: "GET",
}).handler(async (): Promise<Session | null> => {
  const session = getSession();
  if (!session) return null;

  const invitee = await getInvitee(session.inviteeId);
  if (!invitee || invitee.inviteGroupId !== session.inviteGroupId) {
    clearSession();
    return null;
  }

  return session;
});

export const logOut = createServerFn({
  method: "POST",
}).handler(async () => {
  clearSession();
});
