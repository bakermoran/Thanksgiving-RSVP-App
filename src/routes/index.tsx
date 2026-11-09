import { redirectIfLoggedIn } from "@/features/auth/guards";
import { GetInviteeForm } from "@/features/invitees/components/GetInviteeForm";
import { HarvestRow } from "@/features/layout/components/HarvestRow";
import { Alert } from "@/ui/alert";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Page } from "@/ui/page";
import { PageHeader } from "@/ui/page-header";
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

export const Route = createFileRoute("/")({
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

  // Hold onto the flash after we strip it from the URL so it shows once,
  // but doesn't come back on refresh.
  const [flash] = useState(() => (error ? flashMessages[error] : undefined));

  useEffect(() => {
    if (error) {
      navigate({ to: "/", search: {}, replace: true });
    }
  }, [error, navigate]);

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
        <GetInviteeForm onSubmit={() => navigate({ to: "/rsvp" })} />
      </Card>

      <HarvestRow />
    </Page>
  );
}
