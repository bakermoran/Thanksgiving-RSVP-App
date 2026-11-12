import * as eventRepository from "@/server/repositories/eventRepository";
import * as inviteGroupRepository from "@/server/repositories/inviteGroupRepository";
import * as rsvpRepository from "@/server/repositories/rsvpRepository";

export async function hasCompletedAll(inviteGroupId: number) {
  const [events, inviteGroup, rsvps] = await Promise.all([
    eventRepository.getEvents(),
    inviteGroupRepository.getInviteGroup(inviteGroupId),
    rsvpRepository.getRsvpsForInviteGroup({ inviteGroupId }),
  ]);
  if (!inviteGroup) return false;

  const answered = new Set(rsvps.map((r) => `${r.eventId}:${r.inviteeId}`));
  return events.every((event) =>
    inviteGroup.invitees.every((i) => answered.has(`${event.id}:${i.id}`)),
  );
}
