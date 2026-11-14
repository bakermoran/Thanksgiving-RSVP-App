import { getCurrentAdmin } from "@/functions/adminAuth.functions";
import { getCurrentSession } from "@/functions/auth.functions";
import { redirect } from "@tanstack/react-router";

type GatheringParams = { params: { gatheringId: string } };

export async function requireSession({ params }: GatheringParams) {
  const session = await getCurrentSession();
  if (!session) throw redirect({ to: "/$gatheringId", params });
  return { session };
}

export async function redirectIfLoggedIn({ params }: GatheringParams) {
  const session = await getCurrentSession();
  if (session) throw redirect({ to: "/$gatheringId/home", params });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw redirect({ to: "/admin" });
  return { admin };
}

export async function redirectIfAdmin() {
  const admin = await getCurrentAdmin();
  if (admin) throw redirect({ to: "/admin/events" });
}
