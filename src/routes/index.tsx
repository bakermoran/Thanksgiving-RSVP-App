import { redirectIfLoggedIn } from "@/features/auth/guards";
import { GetInviteeForm } from "@/features/invitees/components/GetInviteeForm";
import { HarvestRow } from "@/features/layout/components/HarvestRow";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Page } from "@/ui/page";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: redirectIfLoggedIn,
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

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
        Gobble gobble! Look yourself up to RSVP for your whole crew.
      </PageHeader>

      <Card>
        <GetInviteeForm onSubmit={() => navigate({ to: "/rsvp" })} />
      </Card>

      <HarvestRow />
    </Page>
  );
}
