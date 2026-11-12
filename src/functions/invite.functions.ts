import { setSession } from "@/server/auth/guestSession";
import * as inviteService from "@/server/services/invite";
import { getInviteSchema, redeemInviteSchema } from "@/shared/schemas/invite";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "./middleware";

export const createInvite = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .handler(async ({ context }) =>
    inviteService.create({ createdBy: context.session.inviteeId }),
  );

export const validateInvite = createServerFn({
  method: "POST",
})
  .validator(getInviteSchema)
  .handler(async ({ data }) => inviteService.isRedeemable(data.code));

export const redeemInvite = createServerFn({
  method: "POST",
})
  .validator(redeemInviteSchema)
  .handler(async ({ data }) => {
    const invitee = await inviteService.redeem(data.code, data.invitee);

    setSession({ inviteeId: invitee.id, inviteGroupId: invitee.inviteGroupId });
    return invitee;
  });
