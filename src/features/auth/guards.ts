import { redirect } from "@tanstack/react-router";

import { getCurrentSession } from "./auth.functions";

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) throw redirect({ to: "/" });
  return { session };
}

export async function redirectIfLoggedIn() {
  const session = await getCurrentSession();
  if (session) throw redirect({ to: "/home" });
}
