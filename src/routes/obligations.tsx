import { getMyInviteeId } from "@/features/invitees/invitees.functions";
import {
  claimObligation,
  getObligations,
  releaseObligation,
} from "@/features/obligations/obligations.functions";
import { Button } from "@/features/ui/button";
import { Card } from "@/features/ui/card";
import { Link } from "@/features/ui/link";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/obligations")({
  loader: async () => {
    const [obligations, inviteeId] = await Promise.all([
      getObligations(),
      getMyInviteeId(),
    ]);
    return { obligations, inviteeId };
  },
  component: ObligationPage,
});

function ObligationPage() {
  const { obligations, inviteeId } = Route.useLoaderData();
  const router = useRouter();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-12">
      <Link to="/summary">Back</Link>
      <Card>
        {obligations.map((obligation) => (
          <div key={obligation.id} className="gap-4 flex justify-between">
            <div>{obligation.name}</div>
            <div>{obligation.invitee?.firstName ?? "Unclaimed"}</div>
            <Button
              onClick={async () => {
                await claimObligation({
                  data: { id: obligation.id, inviteeId },
                });
                await router.invalidate();
              }}
            >
              Take
            </Button>
            {obligation.invitee?.id === inviteeId && (
              <Button
                onClick={async () => {
                  await releaseObligation({
                    data: { id: obligation.id, inviteeId },
                  });
                  await router.invalidate();
                }}
              >
                Release
              </Button>
            )}
          </div>
        ))}
      </Card>
    </main>
  );
}
