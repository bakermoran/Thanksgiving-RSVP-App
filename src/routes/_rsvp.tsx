import { getEvents } from "@/features/events/events.functions";
import { getMyInviteGroup } from "@/features/inviteGroups/inviteeGroups.functions";
import { RsvpBanner } from "@/features/rsvps/components/RsvpBanner";
import { Page } from "@/ui/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_rsvp")({
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
  return (
    <Page>
      <RsvpBanner />
      <Outlet />
    </Page>
  );
}
