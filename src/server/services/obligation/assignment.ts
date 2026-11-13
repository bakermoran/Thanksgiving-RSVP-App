import * as obligationRepository from "@/server/repositories/obligationRepository";

export async function create({
  actorInviteeId,
  name,
  inviteeId,
  categoryId,
}: {
  actorInviteeId: number;
  name: string;
  inviteeId: number | null;
  categoryId: number;
}) {
  if (inviteeId !== null && inviteeId !== actorInviteeId) {
    throw new Error("You can only assign obligations to yourself.");
  }
  return obligationRepository.createObligation({ name, inviteeId, categoryId });
}

// Hosts add obligations without claiming them; guests claim later.
export async function createUnassigned({
  name,
  categoryId,
}: {
  name: string;
  categoryId: number;
}) {
  return obligationRepository.createObligation({
    name,
    inviteeId: null,
    categoryId,
  });
}

export async function rename({ id, name }: { id: number; name: string }) {
  return obligationRepository.renameObligation({ id, name });
}

export async function destroy({ id }: { id: number }) {
  return obligationRepository.destroyObligation({ id });
}

export async function claim({
  actorInviteeId,
  id,
  inviteeId,
}: {
  actorInviteeId: number;
  id: number;
  inviteeId: number;
}) {
  if (inviteeId !== actorInviteeId) {
    throw new Error("You can only claim obligations for yourself.");
  }
  return obligationRepository.claimObligation({ id, inviteeId });
}

export async function release({
  actorInviteeId,
  id,
  inviteeId,
}: {
  actorInviteeId: number;
  id: number;
  inviteeId: number;
}) {
  if (inviteeId !== actorInviteeId) {
    throw new Error("You can only release obligations for yourself.");
  }
  return obligationRepository.releaseObligation({ id, inviteeId });
}
