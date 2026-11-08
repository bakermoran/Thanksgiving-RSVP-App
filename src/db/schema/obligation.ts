import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import { baseColumns } from "./base";
import { inviteesTable } from "./invitee";

export const obligationsTable = sqliteTable("obligations", {
  ...baseColumns,
  name: text().notNull(),
  inviteeId: int("invitee_id").references(() => inviteesTable.id),
});

export const obligationsSchema = createSelectSchema(obligationsTable);
export type Obligation = z.infer<typeof obligationsSchema>;

export const claimObligationSchema = z.object({
  id: z.number().int(),
  inviteeId: z.number().int(),
});

export const releaseObligationSchema = z.object({
  id: z.number().int(),
  inviteeId: z.number().int(),
});
