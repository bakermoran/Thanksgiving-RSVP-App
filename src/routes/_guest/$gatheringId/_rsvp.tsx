import { LogOutButton } from "@/components/auth/LogOutButton";
import { InviteButton } from "@/components/invite/InviteButton";
import { RsvpBanner } from "@/components/rsvps/RsvpBanner";
import { getEvents } from "@/functions/events.functions";
import { getMyInviteGroup } from "@/functions/inviteGroups.functions";
import { requireSession } from "@/routes/-guards";
import { Page } from "@/ui/guest/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/$gatheringId/_rsvp")({
  beforeLoad: requireSession,
  loader: async () => {
    const [inviteGroup, events] = await Promise.all([
      getMyInviteGroup(),
      getEvents(),
    ]);
    return { inviteGroup, events };
  },
  component: RsvpLayout,
});

function RsvpLayout() {
  const { session } = Route.useRouteContext();
  const { inviteGroup } = Route.useLoaderData();
  const me = inviteGroup.invitees.find((i) => i.id === session.inviteeId);

  return (
    <Page>
      <RsvpBanner />
      <div className="mb-6 flex justify-center gap-4">
        {me && <LogOutButton name={me.firstName} />}
        <InviteButton />
      </div>
      <Outlet />
    </Page>
  );
}
