import { GetInviteeForm } from "@/features/invitees/components/GetInviteeForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  // getInvitee has set the invite-group cookie; /rsvp sends them to the first event.
  return <GetInviteeForm onSubmit={() => navigate({ to: "/rsvp" })} />;
}
