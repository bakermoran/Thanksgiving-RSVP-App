import * as eventRepository from "@/server/repositories/eventRepository";
import * as inviteGroupRepository from "@/server/repositories/inviteGroupRepository";
import * as rsvpRepository from "@/server/repositories/rsvpRepository";

export async function save({
  inviteGroupId,
  eventId,
  rsvps,
}: {
  inviteGroupId: number;
  eventId: number;
  rsvps: { inviteeId: number; isAttending: boolean }[];
}): Promise<boolean> {
  const [event, inviteGroup] = await Promise.all([
    eventRepository.getEvent(eventId),
    inviteGroupRepository.getInviteGroup(inviteGroupId),
  ]);
  if (!event || !inviteGroup) return false;

  const allowed = new Set(inviteGroup.invitees.map((i) => i.id));
  if (rsvps.some((r) => !allowed.has(r.inviteeId))) {
    throw new Error("You can only RSVP for people in your invite group.");
  }

  await rsvpRepository.upsertRsvps(
    rsvps.map((r) => ({ ...r, eventId: event.id })),
  );
  return true;
}
