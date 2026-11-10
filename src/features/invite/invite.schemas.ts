import { inviteeNameSchema } from "@/features/invitees/invitees.schemas";
import { z } from "zod";

export const getInviteSchema = z.object({
  code: z.string(),
});

export const redeemInviteSchema = getInviteSchema.extend({
  invitee: inviteeNameSchema,
});
