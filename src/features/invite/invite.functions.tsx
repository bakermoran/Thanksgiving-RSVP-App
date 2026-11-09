import { getInviteSchema, redeemInviteSchema } from "@/db/schema/invite";
import {
  createInvite as createInviteDb,
  redeemInvite as redeemInviteDb,
  validateInvite as validateInviteDb,
} from "@/repositories/inviteRepository";
import { createServerFn } from "@tanstack/react-start";
import { randomBytes } from "node:crypto";

import { authMiddleware } from "../auth/auth.middleware";
import { setSession } from "../auth/session";

export const createInvite = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .handler(async () => {
    const code = randomBytes(8).toString("hex");
    return await createInviteDb(code);
  });

export const validateInvite = createServerFn({
  method: "POST",
})
  .validator(getInviteSchema)
  .handler(async ({ data }) => {
    const valid = await validateInviteDb(data.code);
    return valid;
  });

export const redeemInvite = createServerFn({
  method: "POST",
})
  .validator(redeemInviteSchema)
  .handler(async ({ data }) => {
    const invitee = await redeemInviteDb(data.code, data.invitee);

    setSession({ inviteeId: invitee.id, inviteGroupId: invitee.inviteGroupId });
    return invitee;
  });
