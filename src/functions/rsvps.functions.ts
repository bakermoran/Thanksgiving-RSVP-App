import * as rsvpService from "@/server/services/rsvp";
import { getEventSchema } from "@/shared/schemas/events";
import { saveRsvpsSchema } from "@/shared/schemas/rsvps";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "./middleware";

export const getEventRsvps = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .validator(getEventSchema)
  .handler(async ({ data, context: { session } }) => {
    const result = await rsvpService.getForEvent({
      inviteGroupId: session.inviteGroupId,
      eventId: data.id,
    });
    if (!result) throw notFound();
    return result;
  });

export const getMyRsvps = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) =>
    rsvpService.listForGroup(session.inviteGroupId),
  );

export const hasCompletedAllRsvps = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) =>
    rsvpService.hasCompletedAll(session.inviteGroupId),
  );

export const saveRsvps = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(saveRsvpsSchema)
  .handler(async ({ data, context: { session } }) => {
    const saved = await rsvpService.save({
      inviteGroupId: session.inviteGroupId,
      eventId: data.eventId,
      rsvps: data.rsvps,
    });
    if (!saved) throw notFound();
  });
