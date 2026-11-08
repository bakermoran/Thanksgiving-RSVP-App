import {
  claimObligationSchema,
  releaseObligationSchema,
} from "@/db/schema/obligation";
import { requireInviteGroupId } from "@/features/inviteGroups/inviteGroupAccess";
import { requireInviteeId } from "@/features/invitees/inviteeAccess";
import {
  claimObligation as claimObligationDb,
  getObligations as getObligationsDb,
  releaseObligation as releaseObligationDb,
} from "@/repositories/obligationsRepository";
import { createServerFn } from "@tanstack/react-start";

export const getObligations = createServerFn({
  method: "GET",
}).handler(async () => {
  requireInviteGroupId();
  return getObligationsDb();
});

export const claimObligation = createServerFn({
  method: "POST",
})
  .validator(claimObligationSchema)
  .handler(async ({ data: { id, inviteeId } }) => {
    requireInviteGroupId();
    if (inviteeId !== requireInviteeId()) {
      throw new Error("You can only claim obligations for yourself.");
    }
    return claimObligationDb({ id, inviteeId });
  });

export const releaseObligation = createServerFn({
  method: "POST",
})
  .validator(releaseObligationSchema)
  .handler(async ({ data: { id, inviteeId } }) => {
    requireInviteGroupId();
    if (inviteeId !== requireInviteeId()) {
      throw new Error("You can only release obligations for yourself.");
    }
    return releaseObligationDb({ id, inviteeId });
  });
