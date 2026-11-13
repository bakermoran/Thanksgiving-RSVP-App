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
