import { GetInviteeForm } from "@/components/invitees/GetInviteeForm";
import { HarvestRow } from "@/components/layout/HarvestRow";
import { redirectIfLoggedIn } from "@/routes/-guards";
import { Alert } from "@/ui/guest/alert";
import { Card } from "@/ui/guest/card";
import { Illustration } from "@/ui/guest/illustration";
import { Page } from "@/ui/guest/page";
import { PageHeader } from "@/ui/guest/page-header";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

const flashMessages = {
  "missing-invite":
    "That invite link is missing its code. Ask your host for a new one!",
  "invalid-invite":
    "That invite link has already been used or isn't valid. Ask your host for a new one!",
} as const;

type FlashKey = keyof typeof flashMessages;

export const Route = createFileRoute("/_guest/$gatheringId/")({
  validateSearch: z.object({
    error: z
      .enum(Object.keys(flashMessages) as [FlashKey, ...FlashKey[]])
      .optional()
      .catch(undefined),
  }),
  beforeLoad: redirectIfLoggedIn,
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const { error } = Route.useSearch();
  const params = Route.useParams();

  const [flash] = useState(() => (error ? flashMessages[error] : undefined));

  useEffect(() => {
    if (error) {
      navigate({ to: "/$gatheringId", params, search: {}, replace: true });
    }
  }, [error, navigate, params]);

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

      {flash && <Alert className="mb-4">{flash}</Alert>}

      <Card>
        <GetInviteeForm
          onSubmit={() => navigate({ to: "/$gatheringId/rsvp", params })}
        />
      </Card>

      <HarvestRow />
    </Page>
  );
}
