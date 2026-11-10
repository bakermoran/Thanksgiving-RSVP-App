import { createServerFn } from "@tanstack/react-start";

import { type Session, clearSession, getVerifiedSession } from "./session";

export const getCurrentSession = createServerFn({
  method: "GET",
}).handler(async (): Promise<Session | null> => getVerifiedSession());

export const logOut = createServerFn({
  method: "POST",
}).handler(async () => {
  clearSession();
});
