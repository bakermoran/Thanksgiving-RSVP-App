import * as obligationRepository from "@/server/repositories/obligationRepository";

export function listCategories() {
  return obligationRepository.getObligationCategories();
}
