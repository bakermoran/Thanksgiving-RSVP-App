import * as eventRepository from "@/server/repositories/eventRepository";
import * as rsvpRepository from "@/server/repositories/rsvpRepository";

export async function set({
  eventId,
  inviteeId,
  isAttending,
}: {
  eventId: number;
  inviteeId: number;
  isAttending: boolean | null;
}): Promise<boolean> {
  const event = await eventRepository.getEvent(eventId);
  if (!event) return false;

  if (isAttending === null) {
    await rsvpRepository.deleteRsvp({ eventId, inviteeId });
  } else {
    await rsvpRepository.upsertRsvps([{ eventId, inviteeId, isAttending }]);
  }
  return true;
}
