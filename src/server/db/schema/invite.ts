import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";
import { inviteesTable } from "./invitee";

export const invitesTable = sqliteTable(
  "invites",
  {
    ...baseColumns,
    code: text("code").notNull(),
    createdBy: int("created_by").references(() => inviteesTable.id),
    expiresAt: text("expires_at")
      .notNull()
      .default(sql`(datetime('now', '+7 days'))`),
    redeemedAt: text("redeemed_at"),
    redeemedBy: int("redeemed_by").references(() => inviteesTable.id),
  },
  (table) => [uniqueIndex("unique_invite_code").on(table.code)],
);

export const inviteSchema = createSelectSchema(invitesTable);
export type Invite = z.infer<typeof inviteSchema>;
