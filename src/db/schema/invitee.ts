import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import { baseColumns } from "./base";
import { inviteGroupsTable } from "./inviteGroup";

export const inviteesTable = sqliteTable(
  "invitees",
  {
    ...baseColumns,
    inviteGroupId: int("invite_group_id")
      .notNull()
      .references(() => inviteGroupsTable.id),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
  },
  (table) => [
    index("idx_invitees_fullname").on(table.firstName, table.lastName),
  ],
);

export const inviteeSchema = createSelectSchema(inviteesTable);
export type Invitee = z.infer<typeof inviteeSchema>;

export const getInviteeSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name"),
  lastName: z.string().trim().min(1, "Enter your last name"),
});
