import * as inviteGroupRepository from "@/server/repositories/inviteGroupRepository";

export function list() {
  return inviteGroupRepository.getAllInviteGroups();
}

export function get(id: number) {
  return inviteGroupRepository.getInviteGroup(id);
}
