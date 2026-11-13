import * as inviteeRepository from "@/server/repositories/inviteeRepository";

export function remove(inviteGroupId: number) {
  return inviteeRepository.deleteInviteGroup(inviteGroupId);
}
