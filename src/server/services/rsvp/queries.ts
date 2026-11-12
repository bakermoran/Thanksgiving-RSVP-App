import * as eventRepository from "@/server/repositories/eventRepository";
import * as rsvpRepository from "@/server/repositories/rsvpRepository";

export function listAll() {
  return rsvpRepository.getAllRsvps();
}

export function listForGroup(inviteGroupId: number) {
  return rsvpRepository.getRsvpsForInviteGroup({ inviteGroupId });
}

export async function getForEvent({
  inviteGroupId,
  eventId,
}: {
  inviteGroupId: number;
  eventId: number;
}) {
  const event = await eventRepository.getEvent(eventId);
  if (!event) return null;

  const rsvps = await rsvpRepository.getRsvpsForInviteGroup({
    inviteGroupId,
    eventId: event.id,
  });
  return { event, rsvps };
}
