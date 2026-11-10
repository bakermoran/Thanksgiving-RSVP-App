import { redirect } from "@tanstack/react-router";

import { getCurrentAdmin } from "./adminAuth.functions";

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw redirect({ to: "/admin" });
  return { admin };
}

export async function redirectIfAdmin() {
  const admin = await getCurrentAdmin();
  if (admin) throw redirect({ to: "/admin/home" });
}
