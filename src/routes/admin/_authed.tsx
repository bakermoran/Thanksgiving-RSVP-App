import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/routes/-guards";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed")({
  beforeLoad: requireAdmin,
  component: AdminLayout,
});

function AdminLayout() {
  const { admin } = Route.useRouteContext();

  return (
    <AdminShell email={admin.email}>
      <Outlet />
    </AdminShell>
  );
}
