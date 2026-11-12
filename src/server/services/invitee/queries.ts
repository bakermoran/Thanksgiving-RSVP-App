import * as inviteeRepository from "@/server/repositories/inviteeRepository";

export function findByName(name: { firstName: string; lastName: string }) {
  return inviteeRepository.getInviteeByNameWithGroup(name);
}

export function get(id: number) {
  return inviteeRepository.getInvitee(id);
}
