import { AdminLoginForm } from "@/components/adminAuth/AdminLoginForm";
import { redirectIfAdmin } from "@/routes/-guards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: redirectIfAdmin,
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();

  const onSubmit = async () => {
    router.clearCache();
    await router.navigate({ to: "/admin/events" });
  };

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Host sign in</CardTitle>
          <CardDescription>
            Hosts only. Guests RSVP with their invite link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminLoginForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </main>
  );
}
