import { getMyInviteeId } from "@/features/invitees/invitees.functions";
import { ObligationList } from "@/features/obligations/components/ObligationList";
import { getObligations } from "@/features/obligations/obligations.functions";
import { Illustration } from "@/ui/illustration";
import { Link } from "@/ui/link";
import { Page } from "@/ui/page";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes")({
  loader: async () => {
    const [obligations, inviteeId] = await Promise.all([
      getObligations(),
      getMyInviteeId(),
    ]);
    return { obligations, inviteeId };
  },
  component: RecipesPage,
});

function RecipesPage() {
  const { obligations, inviteeId } = Route.useLoaderData();
  const claimedCount = obligations.filter((o) => o.invitee).length;

  return (
    <Page>
      <Link to="/summary" className="mb-6">
        <span aria-hidden>←</span> Back
      </Link>

      <PageHeader
        illustration={
          <Illustration
            name="drumstick"
            animate="wobble"
            className="mx-auto w-28"
          />
        }
        eyebrow="Many hands, one feast"
        title="Who's Bringing What"
      >
        {claimedCount} of {obligations.length} dishes spoken for
      </PageHeader>

      <ObligationList obligations={obligations} inviteeId={inviteeId} />
    </Page>
  );
}
