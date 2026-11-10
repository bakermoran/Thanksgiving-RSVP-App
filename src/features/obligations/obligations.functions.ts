import {
  claimObligationSchema,
  createObligationSchema,
  releaseObligationSchema,
} from "@/db/schema/obligation";
import { authMiddleware } from "@/features/auth/auth.middleware";
import {
  claimObligation as claimObligationDb,
  createObligation as createObligationDb,
  getObligationCategories as getObligationCategoriesDb,
  getObligations as getObligationsDb,
  releaseObligation as releaseObligationDb,
} from "@/repositories/obligationsRepository";
import { createServerFn } from "@tanstack/react-start";

export const getObligations = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => getObligationsDb());

export const getObligationCategories = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => getObligationCategoriesDb());

export const createObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(createObligationSchema)
  .handler(async ({ data: { name, inviteeId, categoryId } }) =>
    createObligationDb({ name, inviteeId, categoryId }),
  );

export const claimObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(claimObligationSchema)
  .handler(async ({ data: { id, inviteeId }, context: { session } }) => {
    if (inviteeId !== session.inviteeId) {
      throw new Error("You can only claim obligations for yourself.");
    }
    return claimObligationDb({ id, inviteeId });
  });

export const releaseObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(releaseObligationSchema)
  .handler(async ({ data: { id, inviteeId }, context: { session } }) => {
    if (inviteeId !== session.inviteeId) {
      throw new Error("You can only release obligations for yourself.");
    }
    return releaseObligationDb({ id, inviteeId });
  });
