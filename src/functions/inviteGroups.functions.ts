import { clearSession } from "@/server/auth/guestSession";
import * as inviteGroupService from "@/server/services/inviteGroup";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "./middleware";

export const getMyInviteGroup = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) => {
    const inviteGroup = await inviteGroupService.get(session.inviteGroupId);
    if (!inviteGroup) {
      clearSession();
      throw redirect({ to: "/" });
    }

    return inviteGroup;
  });
