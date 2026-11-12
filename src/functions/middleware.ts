import { getVerifiedAdmin } from "@/server/auth/adminSession";
import { getVerifiedSession } from "@/server/auth/guestSession";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await getVerifiedSession();
    if (!session) throw redirect({ to: "/" });
    return next({ context: { session } });
  },
);

export const adminAuthMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const admin = await getVerifiedAdmin();
  if (!admin) throw redirect({ to: "/admin" });
  return next({ context: { admin } });
});
