import { inviteeNameSchema } from "@/features/invitees/invitees.schemas";
import { z } from "zod";

const targetGroupSchema = z.number().int().positive().nullable();

export const addInviteeSchema = inviteeNameSchema.extend({
  inviteGroupId: targetGroupSchema,
});

export const moveInviteeSchema = z.object({
  inviteeId: z.number().int().positive(),
  inviteGroupId: targetGroupSchema,
});

export const removeInviteeSchema = z.object({
  inviteeId: z.number().int().positive(),
});
