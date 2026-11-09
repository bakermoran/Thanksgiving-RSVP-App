import { getEventSchema } from "@/db/schema/event";
import { saveRsvpsSchema } from "@/db/schema/rsvp";
import { authMiddleware } from "@/features/auth/auth.middleware";
import { getEvent, getEvents } from "@/repositories/eventsRepository";
import { getInviteGroup } from "@/repositories/inviteGroupRepository";
import {
  getRsvpsForInviteGroup,
  upsertRsvps,
} from "@/repositories/rsvpRepository";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const getEventRsvps = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .validator(getEventSchema)
  .handler(async ({ data, context: { session } }) => {
    const event = await getEvent(data.id);
    if (!event) throw notFound();

    const rsvps = await getRsvpsForInviteGroup({
      inviteGroupId: session.inviteGroupId,
      eventId: event.id,
    });
    return { event, rsvps };
  });

export const getMyRsvps = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) =>
    getRsvpsForInviteGroup({ inviteGroupId: session.inviteGroupId }),
  );

export const hasCompletedAllRsvps = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) => {
    const [events, inviteGroup, rsvps] = await Promise.all([
      getEvents(),
      getInviteGroup(session.inviteGroupId),
      getRsvpsForInviteGroup({ inviteGroupId: session.inviteGroupId }),
    ]);
    if (!inviteGroup) return false;

    const answered = new Set(rsvps.map((r) => `${r.eventId}:${r.inviteeId}`));
    return events.every((event) =>
      inviteGroup.invitees.every((i) => answered.has(`${event.id}:${i.id}`)),
    );
  });

export const saveRsvps = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(saveRsvpsSchema)
  .handler(async ({ data, context: { session } }) => {
    const [event, inviteGroup] = await Promise.all([
      getEvent(data.eventId),
      getInviteGroup(session.inviteGroupId),
    ]);
    if (!event || !inviteGroup) throw notFound();

    const allowed = new Set(inviteGroup.invitees.map((i) => i.id));
    if (data.rsvps.some((r) => !allowed.has(r.inviteeId))) {
      throw new Error("You can only RSVP for people in your invite group.");
    }

    await upsertRsvps(data.rsvps.map((r) => ({ ...r, eventId: event.id })));
  });
