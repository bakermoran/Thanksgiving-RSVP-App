import { getSignedIdCookie, setSignedIdCookie } from "@/utils/signedCookie";
import { redirect } from "@tanstack/react-router";

const COOKIE_NAME = "invite_group";

export function grantInviteGroupAccess(inviteGroupId: number) {
  setSignedIdCookie(COOKIE_NAME, inviteGroupId);
}

export function getInviteGroupIdFromCookie(): number | null {
  return getSignedIdCookie(COOKIE_NAME);
}

export function requireInviteGroupId(): number {
  const id = getInviteGroupIdFromCookie();
  if (id === null) throw redirect({ to: "/" });
  return id;
}
