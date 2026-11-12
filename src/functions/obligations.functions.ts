import * as obligationService from "@/server/services/obligation";
import {
  createObligationSchema,
  obligationAssignmentSchema,
} from "@/shared/schemas/obligations";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "./middleware";

export const getObligations = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => obligationService.list());

export const getObligationCategories = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => obligationService.listCategories());

export const createObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(createObligationSchema)
  .handler(async ({ data, context: { session } }) =>
    obligationService.create({ ...data, actorInviteeId: session.inviteeId }),
  );

export const claimObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(obligationAssignmentSchema)
  .handler(async ({ data, context: { session } }) =>
    obligationService.claim({ ...data, actorInviteeId: session.inviteeId }),
  );

export const releaseObligation = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(obligationAssignmentSchema)
  .handler(async ({ data, context: { session } }) =>
    obligationService.release({ ...data, actorInviteeId: session.inviteeId }),
  );
