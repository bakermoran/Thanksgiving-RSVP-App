import { CreateInviteeForm } from "@/components/invitees/CreateInviteeForm";
import { HarvestRow } from "@/components/layout/HarvestRow";
import { validateInvite } from "@/functions/invite.functions";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Page } from "@/ui/page";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/redeem")({
  component: RedeemComponent,
  validateSearch: z.object({
    code: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    if (!search.code) {
      throw redirect({ to: "/", search: { error: "missing-invite" } });
    }

    const valid = await validateInvite({ data: { code: search.code } });
    if (!valid) {
      throw redirect({ to: "/", search: { error: "invalid-invite" } });
    }

    return { code: search.code };
  },
});

function RedeemComponent() {
  const navigate = useNavigate();
  const { code } = Route.useRouteContext();

  return (
    <Page width="sm" className="pt-8">
      <PageHeader
        illustration={
          <Illustration
            name="turkey"
            animate="wobble"
            className="mx-auto w-52 origin-bottom drop-shadow-[4px_4px_0_rgba(61,35,20,0.25)] sm:w-64"
          />
        }
        eyebrow="You're invited to a"
        title="Thanksgiving Feast!"
        size="xl"
      >
        Gobble gobble! Come join the fun!
      </PageHeader>

      <Card>
        <CreateInviteeForm
          code={code}
          onSubmit={() => navigate({ to: "/rsvp" })}
        />
      </Card>

      <HarvestRow />
    </Page>
  );
}
