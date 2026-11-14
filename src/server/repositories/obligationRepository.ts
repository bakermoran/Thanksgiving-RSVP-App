import { db } from "@/server/db/client";
import {
  obligationCategoriesTable,
  obligationsTable,
} from "@/server/db/schema/obligation";
import { and, asc, eq, inArray, isNull, sql } from "drizzle-orm";

export function getObligationCategories() {
  return db.query.obligationCategoriesTable.findMany({
    orderBy: { sortOrder: "asc" },
    with: {
      obligations: { orderBy: { sortOrder: "asc" }, with: { invitee: true } },
    },
  });
}

export function createObligationCategory({ name }: { name: string }) {
  return db.insert(obligationCategoriesTable).values({
    name,
    sortOrder: sql`(select coalesce(max(${obligationCategoriesTable.sortOrder}), 0) + 1 from ${obligationCategoriesTable})`,
  });
}

export async function getObligationCategoryIds() {
  const rows = await db
    .select({ id: obligationCategoriesTable.id })
    .from(obligationCategoriesTable);

  return rows.map((row) => row.id);
}

// sort_order has a unique index, so rows can't be renumbered one at a time
export function reorderObligationCategories({ ids }: { ids: number[] }) {
  return db.transaction((tx) => {
    const setSortOrder = (id: number, sortOrder: number) =>
      tx
        .update(obligationCategoriesTable)
        .set({ sortOrder })
        .where(eq(obligationCategoriesTable.id, id))
        .run();

    ids.forEach((id, index) => setSortOrder(id, -(index + 1)));
    ids.forEach((id, index) => setSortOrder(id, index + 1));
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
    sortOrder: sql`(select coalesce(max(${obligationsTable.sortOrder}), 0) + 1 from ${obligationsTable})`,
  });
}

export async function getObligationIdsForCategory(categoryId: number) {
  const rows = await db
    .select({ id: obligationsTable.id })
    .from(obligationsTable)
    .where(eq(obligationsTable.categoryId, categoryId));

  return rows.map((row) => row.id);
}

export function reorderObligations({ ids }: { ids: number[] }) {
  return db.transaction((tx) => {
    const sortOrders = tx
      .select({ sortOrder: obligationsTable.sortOrder })
      .from(obligationsTable)
      .where(inArray(obligationsTable.id, ids))
      .orderBy(asc(obligationsTable.sortOrder))
      .all()
      .map((row) => row.sortOrder);

    const setSortOrder = (id: number, sortOrder: number) =>
      tx
        .update(obligationsTable)
        .set({ sortOrder })
        .where(eq(obligationsTable.id, id))
        .run();

    ids.forEach((id, index) => setSortOrder(id, -sortOrders[index]));
    ids.forEach((id, index) => setSortOrder(id, sortOrders[index]));
  });
}

export function getObligationsForInviteGroup(inviteGroupId: number) {
  return db.query.obligationsTable.findMany({
    where: { invitee: { inviteGroupId } },
    orderBy: { sortOrder: "asc" },
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
