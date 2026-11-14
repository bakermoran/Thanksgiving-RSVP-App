import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";
import { gatheringsTable } from "./gathering";
import { type Invitee } from "./invitee";

export const inviteGroupsTable = sqliteTable("invite_groups", {
  ...baseColumns,
  gatheringId: int("gathering_id")
    .notNull()
    .references(() => gatheringsTable.id),
});

export const inviteGroupSchema = createSelectSchema(inviteGroupsTable);
export type InviteGroup = z.infer<typeof inviteGroupSchema>;
export type InviteGroupWithInvitees = InviteGroup & {
  invitees: Invitee[];
};
