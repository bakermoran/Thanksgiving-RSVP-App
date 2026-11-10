import { z } from "zod";

export const getEventSchema = z.object({
  id: z.number().int(),
});
