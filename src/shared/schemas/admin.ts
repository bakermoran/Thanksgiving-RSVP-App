import { inviteeNameSchema } from "@/shared/schemas/invitees";
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

export const renameInviteeSchema = inviteeNameSchema.extend({
  inviteeId: z.number().int().positive(),
});

export const destroyObligationSchema = z.object({
  id: z.number().int().positive(),
});

// Matches <input type="datetime-local"> values, e.g. "2026-11-26T15:00".
const dateTimeLocalSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/, "Enter a date and time");

const endsAfterStart = (e: { startTime: string; endTime: string }) =>
  e.endTime >= e.startTime;
const endsAfterStartIssue = {
  message: "End must be after start",
  path: ["endTime"],
};

export const updateEventSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().trim().min(1, "Name is required"),
    startTime: dateTimeLocalSchema,
    endTime: dateTimeLocalSchema,
  })
  .refine(endsAfterStart, endsAfterStartIssue);

export type UpdateEventInput = z.infer<typeof updateEventSchema>;

export const createEventSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    startTime: dateTimeLocalSchema,
    endTime: dateTimeLocalSchema,
    address1: z.string().trim().min(1, "Enter a street address"),
    address2: z.string().trim(),
    city: z.string().trim().min(1, "Enter a city"),
    state: z.string().trim().min(1, "Enter a state"),
    zip: z.string().trim().min(1, "Enter a zip code"),
  })
  .refine(endsAfterStart, endsAfterStartIssue);

export type CreateEventInput = z.infer<typeof createEventSchema>;

export const adminEventIdSchema = z.object({
  id: z.number().int().positive(),
});

export const removeEventSchema = adminEventIdSchema;

export const removeInviteGroupSchema = z.object({
  inviteGroupId: z.number().int().positive(),
});

export const addObligationSchema = z.object({
  name: z.string().trim().min(1, "Add a name"),
  categoryId: z.number().int().positive(),
});

export const addObligationCategorySchema = addObligationSchema.pick({
  name: true,
});

export const renameObligationCategorySchema =
  addObligationCategorySchema.extend({
    id: z.number().int().positive(),
  });

export const destroyObligationCategorySchema = destroyObligationSchema;

export const reorderObligationCategoriesSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1)
    .refine((ids) => new Set(ids).size === ids.length, "Duplicate category"),
});

export const renameObligationSchema = addObligationSchema
  .pick({ name: true })
  .extend({ id: z.number().int().positive() });
