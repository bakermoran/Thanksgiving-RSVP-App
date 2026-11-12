import { z } from "zod";

export const createObligationSchema = z.object({
  name: z.string().min(1, "Add a name"),
  inviteeId: z.number().int().nullable(),
  categoryId: z.number().int(),
});

// Shared by claim and release: which obligation, and on whose behalf.
export const obligationAssignmentSchema = z.object({
  id: z.number().int(),
  inviteeId: z.number().int(),
});
