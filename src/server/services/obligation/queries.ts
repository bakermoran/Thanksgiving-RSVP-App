import * as obligationRepository from "@/server/repositories/obligationRepository";

export function list() {
  return obligationRepository.getObligations();
}

export function listCategories() {
  return obligationRepository.getObligationCategories();
}
