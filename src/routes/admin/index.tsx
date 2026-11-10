import { AdminLoginForm } from "@/features/adminAuth/components/AdminLoginForm";
import { redirectIfAdmin } from "@/features/adminAuth/guards";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Page } from "@/ui/page";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: redirectIfAdmin,
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();

  const onSubmit = async () => {
    router.clearCache();
    await router.navigate({ to: "/admin/home" });
  };

  return (
    <Page width="sm" className="pt-8">
      <PageHeader
        illustration={
          <Illustration name="pie" animate="wobble" className="mx-auto w-32" />
        }
        eyebrow="Hosts only"
        title="Kitchen Door"
      />

      <Card>
        <AdminLoginForm onSubmit={onSubmit} />
      </Card>
    </Page>
  );
}
