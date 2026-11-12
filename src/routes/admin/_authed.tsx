import { AdminLogOutButton } from "@/components/adminAuth/AdminLogOutButton";
import { requireAdmin } from "@/routes/-guards";
import { Page } from "@/ui/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed")({
  beforeLoad: requireAdmin,
  component: AdminLayout,
});

function AdminLayout() {
  const { admin } = Route.useRouteContext();

  return (
    <Page>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
        <span className="font-semibold text-cocoa">
          Signed in as {admin.email}
        </span>
        <AdminLogOutButton />
      </div>
      <Outlet />
    </Page>
  );
}
