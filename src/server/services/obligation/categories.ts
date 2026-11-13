import * as obligationRepository from "@/server/repositories/obligationRepository";

export function createCategory({ name }: { name: string }) {
  return obligationRepository.createObligationCategory({ name });
}

export function destroyCategory({ id }: { id: number }) {
  return obligationRepository.destroyObligationCategory({ id });
}

export function renameCategory({ id, name }: { id: number; name: string }) {
  return obligationRepository.renameObligationCategory({ id, name });
}

export async function reorderCategories({ ids }: { ids: number[] }) {
  const existing = await obligationRepository.getObligationCategoryIds();
  const isComplete =
    ids.length === existing.length && existing.every((id) => ids.includes(id));
  if (!isComplete) {
    throw new Error("Categories changed. Refresh the page and try again.");
  }

  return obligationRepository.reorderObligationCategories({ ids });
}
