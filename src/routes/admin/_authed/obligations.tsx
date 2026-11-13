import { AddObligationCategoryForm } from "@/components/admin/AddObligationCategoryForm";
import { SortableObligationCategories } from "@/components/admin/SortableObligationCategories";
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
      <SortableObligationCategories categories={categories}>
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
      </SortableObligationCategories>
    </>
  );
}
