import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";
import { gatheringsTable } from "./gathering";
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
    gatheringId: int("gathering_id")
      .notNull()
      .references(() => gatheringsTable.id),
  },
  (table) => [
    index("idx_invitees_fullname").on(table.firstName, table.lastName),
  ],
);

export const inviteeAliasesTable = sqliteTable(
  "invitee_aliases",
  {
    ...baseColumns,
    inviteeId: int("invitee_id")
      .notNull()
      .references(() => inviteesTable.id, { onDelete: "cascade" }),
    alias: text("alias").notNull(),
  },
  (table) => [index("idx_invitee_aliases_alias").on(table.alias)],
);

export const inviteeSchema = createSelectSchema(inviteesTable);
export type Invitee = z.infer<typeof inviteeSchema>;
