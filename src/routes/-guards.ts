import { getCurrentAdmin } from "@/functions/adminAuth.functions";
import { getCurrentSession } from "@/functions/auth.functions";
import { redirect } from "@tanstack/react-router";

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) throw redirect({ to: "/" });
  return { session };
}

export async function redirectIfLoggedIn() {
  const session = await getCurrentSession();
  if (session) throw redirect({ to: "/home" });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw redirect({ to: "/admin" });
  return { admin };
}

export async function redirectIfAdmin() {
  const admin = await getCurrentAdmin();
  if (admin) throw redirect({ to: "/admin/home" });
}
