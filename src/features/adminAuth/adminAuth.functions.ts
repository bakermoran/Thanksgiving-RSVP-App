import { type PublicUser } from "@/db/schema/user";
import { verifyUserCredentials } from "@/repositories/userRepository";
import { createServerFn } from "@tanstack/react-start";

import { adminLoginSchema } from "./adminAuth.schemas";
import {
  clearAdminSession,
  getVerifiedAdmin,
  setAdminSession,
} from "./session";

export const getCurrentAdmin = createServerFn({
  method: "GET",
}).handler(async (): Promise<PublicUser | null> => getVerifiedAdmin());

export const adminLogIn = createServerFn({
  method: "POST",
})
  .validator(adminLoginSchema)
  .handler(async ({ data }) => {
    const user = await verifyUserCredentials(data);
    if (!user) return { ok: false as const };

    setAdminSession({ userId: user.id });
    return { ok: true as const };
  });

export const adminLogOut = createServerFn({
  method: "POST",
}).handler(async () => {
  clearAdminSession();
});
