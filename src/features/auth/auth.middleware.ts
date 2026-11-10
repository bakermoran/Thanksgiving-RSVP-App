import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { getVerifiedSession } from "./session";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await getVerifiedSession();
    if (!session) throw redirect({ to: "/" });
    return next({ context: { session } });
  },
);
