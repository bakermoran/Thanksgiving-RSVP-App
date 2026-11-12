import { z } from "zod";

export const saveRsvpsSchema = z.object({
  eventId: z.number().int(),
  rsvps: z
    .array(
      z.object({
        inviteeId: z.number().int(),
        isAttending: z.boolean(),
      }),
    )
    .min(1),
});
