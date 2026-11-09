import { sqliteTable } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import { baseColumns } from "./base";
import { Invitee } from "./invitee";

export const inviteGroupsTable = sqliteTable("invite_groups", {
  ...baseColumns,
});

export const inviteGroupSchema = createSelectSchema(inviteGroupsTable);
export type InviteGroup = z.infer<typeof inviteGroupSchema>;
export type InviteGroupWithInvitees = InviteGroup & {
  invitees: Invitee[];
};

export const getInviteGroupSchema = inviteGroupSchema.pick({
  id: true,
});
