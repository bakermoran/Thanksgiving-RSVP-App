import { AddObligationCategoryForm } from "@/components/admin/AddObligationCategoryForm";
import { AdminObligationList } from "@/components/admin/AdminObligationCard";
import { getAdminObligations } from "@/functions/admin.functions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { PageHeader } from "@/ui/platform/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed/obligations")({
  loader: () => getAdminObligations(),
  gcTime: 0,
  component: ObligationsPage,
});

function ObligationsPage() {
  const categories = Route.useLoaderData();

  return (
    <>
      <PageHeader
        title="Obligations"
        description="Dishes and jobs guests can claim."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <AdminObligationList key={category.id} category={category} />
        ))}

        <Card className="border-dashed shadow-none">
          <CardHeader>
            <CardTitle>New category</CardTitle>
            <CardDescription>Name a new category</CardDescription>
          </CardHeader>
          <CardContent className="flex-1" />
          <CardFooter>
            <AddObligationCategoryForm />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
