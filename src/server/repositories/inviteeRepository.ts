import { db } from "@/server/db/client";
import { invitesTable } from "@/server/db/schema/invite";
import { inviteGroupsTable } from "@/server/db/schema/inviteGroup";
import { inviteeAliasesTable, inviteesTable } from "@/server/db/schema/invitee";
import { obligationsTable } from "@/server/db/schema/obligation";
import { rsvpsTable } from "@/server/db/schema/rsvp";
import { type SQLWrapper, and, eq, notExists, sql } from "drizzle-orm";

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

const equalsIgnoreCase = (column: SQLWrapper, value: string) =>
  sql`lower(${column}) = lower(${value})`;

export async function getInviteeByNameWithGroup({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const withGroup = { inviteGroup: { with: { invitees: true } } } as const;

  const exact = await db.query.inviteesTable.findFirst({
    where: {
      RAW: (t) =>
        sql`${equalsIgnoreCase(t.firstName, firstName)} and ${equalsIgnoreCase(t.lastName, lastName)}`,
    },
    with: withGroup,
  });
  if (exact) return exact;

  return db.query.inviteesTable.findFirst({
    where: {
      RAW: (t) => equalsIgnoreCase(t.lastName, lastName),
      aliases: { RAW: (t) => equalsIgnoreCase(t.alias, firstName) },
    },
    with: withGroup,
  });
}

export function getInvitee(id: number) {
  return db.query.inviteesTable.findFirst({ where: { id } });
}

function resolveGroup(tx: Tx, inviteGroupId: number | null) {
  if (inviteGroupId === null) {
    return tx
      .insert(inviteGroupsTable)
      .values({})
      .returning({ id: inviteGroupsTable.id })
      .get().id;
  }

  const group = tx
    .select({ id: inviteGroupsTable.id })
    .from(inviteGroupsTable)
    .where(eq(inviteGroupsTable.id, inviteGroupId))
    .get();
  if (!group) throw new Error(`Invite group ${inviteGroupId} not found`);
  return group.id;
}

function deleteGroupIfEmpty(tx: Tx, inviteGroupId: number) {
  tx.delete(inviteGroupsTable)
    .where(
      and(
        eq(inviteGroupsTable.id, inviteGroupId),
        notExists(
          tx
            .select({ id: inviteesTable.id })
            .from(inviteesTable)
            .where(eq(inviteesTable.inviteGroupId, inviteGroupId)),
        ),
      ),
    )
    .run();
}

export function createInvitee({
  firstName,
  lastName,
  inviteGroupId,
}: {
  firstName: string;
  lastName: string;
  inviteGroupId: number | null;
}) {
  return db.transaction((tx) =>
    tx
      .insert(inviteesTable)
      .values({
        firstName,
        lastName,
        inviteGroupId: resolveGroup(tx, inviteGroupId),
      })
      .returning()
      .get(),
  );
}

export function renameInvitee({
  inviteeId,
  firstName,
  lastName,
}: {
  inviteeId: number;
  firstName: string;
  lastName: string;
}) {
  return db
    .update(inviteesTable)
    .set({ firstName, lastName })
    .where(eq(inviteesTable.id, inviteeId))
    .returning()
    .get();
}

export function moveInvitee({
  inviteeId,
  inviteGroupId,
}: {
  inviteeId: number;
  inviteGroupId: number | null;
}) {
  return db.transaction((tx) => {
    const invitee = tx
      .select()
      .from(inviteesTable)
      .where(eq(inviteesTable.id, inviteeId))
      .get();
    if (!invitee) return undefined;
    if (invitee.inviteGroupId === inviteGroupId) return invitee;

    const moved = tx
      .update(inviteesTable)
      .set({ inviteGroupId: resolveGroup(tx, inviteGroupId) })
      .where(eq(inviteesTable.id, inviteeId))
      .returning()
      .get();

    deleteGroupIfEmpty(tx, invitee.inviteGroupId);
    return moved;
  });
}

// Deletes an invitee and everything that points at them. Their claimed
// obligations are released rather than deleted.
function purgeInvitee(tx: Tx, inviteeId: number) {
  tx.delete(rsvpsTable).where(eq(rsvpsTable.inviteeId, inviteeId)).run();
  tx.delete(inviteeAliasesTable)
    .where(eq(inviteeAliasesTable.inviteeId, inviteeId))
    .run();
  tx.update(obligationsTable)
    .set({ inviteeId: null })
    .where(eq(obligationsTable.inviteeId, inviteeId))
    .run();
  tx.update(invitesTable)
    .set({ createdBy: null })
    .where(eq(invitesTable.createdBy, inviteeId))
    .run();
  tx.update(invitesTable)
    .set({ redeemedBy: null })
    .where(eq(invitesTable.redeemedBy, inviteeId))
    .run();
  tx.delete(inviteesTable).where(eq(inviteesTable.id, inviteeId)).run();
}

export function deleteInvitee(inviteeId: number) {
  return db.transaction((tx) => {
    const invitee = tx
      .select()
      .from(inviteesTable)
      .where(eq(inviteesTable.id, inviteeId))
      .get();
    if (!invitee) return undefined;

    purgeInvitee(tx, inviteeId);

    deleteGroupIfEmpty(tx, invitee.inviteGroupId);
    return invitee;
  });
}

// Invitees must belong to a group, so deleting a group deletes its guests too.
export function deleteInviteGroup(inviteGroupId: number) {
  return db.transaction((tx) => {
    const group = tx
      .select()
      .from(inviteGroupsTable)
      .where(eq(inviteGroupsTable.id, inviteGroupId))
      .get();
    if (!group) return undefined;

    const members = tx
      .select({ id: inviteesTable.id })
      .from(inviteesTable)
      .where(eq(inviteesTable.inviteGroupId, inviteGroupId))
      .all();
    for (const { id } of members) purgeInvitee(tx, id);

    tx.delete(inviteGroupsTable)
      .where(eq(inviteGroupsTable.id, inviteGroupId))
      .run();
    return group;
  });
}
