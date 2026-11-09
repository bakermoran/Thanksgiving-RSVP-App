import {
  claimObligationSchema,
  createObligationSchema,
  releaseObligationSchema,
} from "@/db/schema/obligation";
import { authMiddleware } from "@/features/auth/auth.middleware";
import {
  claimObligation as claimObligationDb,
  createObligation as createObligationDb,
  getObligations as getObligationsDb,
  releaseObligation as releaseObligationDb,
} from "@/repositories/obligationsRepository";
import { createServerFn } from "@tanstack/react-start";

export const getObligations = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => getObligationsDb());

export const createObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(createObligationSchema)
  .handler(async ({ data: { name, inviteeId } }) =>
    createObligationDb({ name, inviteeId }),
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
