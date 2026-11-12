import * as inviteRepository from "@/server/repositories/inviteRepository";

export function isRedeemable(code: string) {
  return inviteRepository.validateInvite(code);
}

export function redeem(
  code: string,
  invitee: { firstName: string; lastName: string },
) {
  return inviteRepository.redeemInvite(code, invitee);
}
