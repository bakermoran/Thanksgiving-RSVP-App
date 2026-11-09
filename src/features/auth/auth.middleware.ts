import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { getSession } from "./session";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  ({ next }) => {
    const session = getSession();
    if (!session) throw redirect({ to: "/" });
    return next({ context: { session } });
  },
);
