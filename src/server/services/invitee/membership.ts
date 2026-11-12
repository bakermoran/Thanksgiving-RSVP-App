import * as inviteeRepository from "@/server/repositories/inviteeRepository";

export function add(invitee: {
  firstName: string;
  lastName: string;
  inviteGroupId: number | null;
}) {
  return inviteeRepository.createInvitee(invitee);
}

export function move(move: {
  inviteeId: number;
  inviteGroupId: number | null;
}) {
  return inviteeRepository.moveInvitee(move);
}

export function remove(inviteeId: number) {
  return inviteeRepository.deleteInvitee(inviteeId);
}
