import { db } from "@/server/db/client";
import {
  obligationCategoriesTable,
  obligationsTable,
} from "@/server/db/schema/obligation";
import { and, eq, isNull, sql } from "drizzle-orm";

export function getObligationCategories() {
  return db.query.obligationCategoriesTable.findMany({
    orderBy: { sortOrder: "asc" },
    with: { obligations: { orderBy: { id: "asc" }, with: { invitee: true } } },
  });
}

export function createObligationCategory({ name }: { name: string }) {
  return db.insert(obligationCategoriesTable).values({
    name,
    // New categories go last. Computed inside the insert so the unique
    // sort_order index can't be hit by a read-then-write race.
    sortOrder: sql`(select coalesce(max(${obligationCategoriesTable.sortOrder}), 0) + 1 from ${obligationCategoriesTable})`,
  });
}

export async function renameObligationCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [renamed] = await db
    .update(obligationCategoriesTable)
    .set({ name })
    .where(eq(obligationCategoriesTable.id, id))
    .returning();

  return renamed;
}

export async function renameObligation({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [renamed] = await db
    .update(obligationsTable)
    .set({ name })
    .where(eq(obligationsTable.id, id))
    .returning();

  return renamed;
}

// Deletes the category's obligations first, in the same transaction, rather
// than relying on the FK's ON DELETE CASCADE existing in the live database.
export function destroyObligationCategory({ id }: { id: number }) {
  return db.transaction((tx) => {
    tx.delete(obligationsTable)
      .where(eq(obligationsTable.categoryId, id))
      .run();

    return tx
      .delete(obligationCategoriesTable)
      .where(eq(obligationCategoriesTable.id, id))
      .returning()
      .get();
  });
}

export function createObligation({
  name,
  inviteeId,
  categoryId,
}: {
  inviteeId: number | null;
  categoryId: number;
  name: string;
}) {
  return db.insert(obligationsTable).values({
    name,
    inviteeId,
    categoryId,
  });
}

export function getObligationsForInviteGroup(inviteGroupId: number) {
  return db.query.obligationsTable.findMany({
    where: { invitee: { inviteGroupId } },
    orderBy: { id: "asc" },
  });
}

export async function claimObligation({
  id,
  inviteeId,
}: {
  id: number;
  inviteeId: number;
}) {
  const [claimed] = await db
    .update(obligationsTable)
    .set({ inviteeId })
    .where(and(eq(obligationsTable.id, id), isNull(obligationsTable.inviteeId)))
    .returning();

  return claimed;
}

export async function releaseObligation({
  id,
  inviteeId,
}: {
  id: number;
  inviteeId: number;
}) {
  const [claimed] = await db
    .update(obligationsTable)
    .set({ inviteeId: null })
    .where(
      and(
        eq(obligationsTable.id, id),
        eq(obligationsTable.inviteeId, inviteeId),
      ),
    )
    .returning();

  return claimed;
}

export async function destroyObligation({ id }: { id: number }) {
  const [deleted] = await db
    .delete(obligationsTable)
    .where(eq(obligationsTable.id, id))
    .returning();

  return deleted;
}
