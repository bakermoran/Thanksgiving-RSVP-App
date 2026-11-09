import { LogOutButton } from "@/features/auth/components/LogOutButton";
import { requireSession } from "@/features/auth/guards";
import { getEvents } from "@/features/events/events.functions";
import { InviteButton } from "@/features/invite/InviteButton";
import { getMyInviteGroup } from "@/features/inviteGroups/inviteeGroups.functions";
import { RsvpBanner } from "@/features/rsvps/components/RsvpBanner";
import { Page } from "@/ui/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_rsvp")({
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
