import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { getVerifiedAdmin } from "./session";

export const adminAuthMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const admin = await getVerifiedAdmin();
  if (!admin) throw redirect({ to: "/admin" });
  return next({ context: { admin } });
});
