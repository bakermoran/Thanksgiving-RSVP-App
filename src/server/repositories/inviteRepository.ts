import { db } from "@/server/db/client";
import { invitesTable } from "@/server/db/schema/invite";
import { inviteGroupsTable } from "@/server/db/schema/inviteGroup";
import { inviteesTable } from "@/server/db/schema/invitee";
import { and, eq, gt, isNull, sql } from "drizzle-orm";

export async function validateInvite(code: string) {
  const invite = db
    .select()
    .from(invitesTable)
    .where(
      and(
        eq(invitesTable.code, code),
        isNull(invitesTable.redeemedAt),
        isNull(invitesTable.redeemedBy),
        gt(invitesTable.expiresAt, sql`CURRENT_TIMESTAMP`),
      ),
    )
    .get();
  return !!invite;
}

export async function createInvite(
  invite: Pick<typeof invitesTable.$inferInsert, "code" | "createdBy">,
) {
  return db.insert(invitesTable).values(invite).returning().get();
}

export async function redeemInvite(
  code: string,
  invitee: Pick<typeof inviteesTable.$inferInsert, "firstName" | "lastName">,
) {
  return db.transaction((tx) => {
    const group = tx
      .insert(inviteGroupsTable)
      .values({})
      .returning({ id: inviteGroupsTable.id })
      .get();

    const newInvitee = tx
      .insert(inviteesTable)
      .values({ ...invitee, inviteGroupId: group.id })
      .returning()
      .get();

    const redeemed = tx
      .update(invitesTable)
      .set({ redeemedAt: new Date().toISOString(), redeemedBy: newInvitee.id })
      .where(
        and(
          eq(invitesTable.code, code),
          isNull(invitesTable.redeemedAt),
          gt(invitesTable.expiresAt, sql`CURRENT_TIMESTAMP`),
        ),
      )
      .returning({ id: invitesTable.id })
      .get();

    if (!redeemed) {
      tx.rollback();
    }

    return newInvitee;
  });
}
