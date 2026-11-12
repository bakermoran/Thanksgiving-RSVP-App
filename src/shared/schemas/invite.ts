import { inviteeNameSchema } from "@/shared/schemas/invitees";
import { z } from "zod";

export const getInviteSchema = z.object({
  code: z.string(),
});

export const redeemInviteSchema = getInviteSchema.extend({
  invitee: inviteeNameSchema,
});
