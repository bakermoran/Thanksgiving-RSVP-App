import { getSignedIdCookie, setSignedIdCookie } from "@/utils/signedCookie";
import { redirect } from "@tanstack/react-router";

const COOKIE_NAME = "invitee";

export function grantInviteeAccess(inviteeId: number) {
  setSignedIdCookie(COOKIE_NAME, inviteeId);
}

export function getInviteeIdFromCookie(): number | null {
  return getSignedIdCookie(COOKIE_NAME);
}

export function requireInviteeId(): number {
  const id = getInviteeIdFromCookie();
  if (id === null) throw redirect({ to: "/" });
  return id;
}
