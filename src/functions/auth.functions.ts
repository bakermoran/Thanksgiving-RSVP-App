import {
  type Session,
  clearSession,
  getVerifiedSession,
} from "@/server/auth/guestSession";
import { createServerFn } from "@tanstack/react-start";

export const getCurrentSession = createServerFn({
  method: "GET",
}).handler(async (): Promise<Session | null> => getVerifiedSession());

export const logOut = createServerFn({
  method: "POST",
}).handler(async () => {
  clearSession();
});
