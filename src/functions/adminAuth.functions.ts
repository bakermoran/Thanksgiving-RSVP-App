import {
  clearAdminSession,
  getVerifiedAdmin,
  setAdminSession,
} from "@/server/auth/adminSession";
import * as userService from "@/server/services/user";
import { adminLoginSchema } from "@/shared/schemas/adminAuth";
import { type PublicUser } from "@/shared/types";
import { createServerFn } from "@tanstack/react-start";

export const getCurrentAdmin = createServerFn({
  method: "GET",
}).handler(async (): Promise<PublicUser | null> => getVerifiedAdmin());

export const adminLogIn = createServerFn({
  method: "POST",
})
  .validator(adminLoginSchema)
  .handler(async ({ data }) => {
    const user = await userService.verifyCredentials(data);
    if (!user) return { ok: false as const };

    setAdminSession({ userId: user.id });
    return { ok: true as const };
  });

export const adminLogOut = createServerFn({
  method: "POST",
}).handler(async () => {
  clearAdminSession();
});
