import { getEvents } from "@/features/events/events.functions";
import { getMyInviteGroup } from "@/features/inviteGroups/inviteeGroups.functions";
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
    <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-12">
      <div className="mx-auto mb-6 flex w-fit -rotate-1 items-center gap-2 rounded-full border-3 border-bark bg-cream py-1 pr-4 pl-1 shadow-chunky-sm">
        <img src="/images/turkey.svg" alt="" className="h-10" />
        <span className="font-display text-xl text-cranberry">
          Thanksgiving RSVP
        </span>
      </div>
      <Outlet />
    </main>
  );
}
