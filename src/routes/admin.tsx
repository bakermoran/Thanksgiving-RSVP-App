import { useAdminDarkMode } from "@/components/admin/theme";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Admin" },
    ],
  }),
  component: PlatformLayout,
});

function PlatformLayout() {
  useAdminDarkMode();

  return (
    <div className="platform flex min-h-dvh flex-1 flex-col">
      <Outlet />
    </div>
  );
}
