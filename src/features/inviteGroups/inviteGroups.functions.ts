import { authMiddleware } from "@/features/auth/auth.middleware";
import { clearSession } from "@/features/auth/session";
import { getInviteGroup } from "@/repositories/inviteGroupRepository";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const getMyInviteGroup = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) => {
    const inviteGroup = await getInviteGroup(session.inviteGroupId);
    if (!inviteGroup) {
      clearSession();
      throw redirect({ to: "/" });
    }

    return inviteGroup;
  });
