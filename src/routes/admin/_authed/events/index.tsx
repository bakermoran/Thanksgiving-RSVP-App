import { AddEventForm } from "@/components/admin/AddEventForm";
import { AdminEventCard } from "@/components/admin/AdminEventCard";
import { getAdminEvents } from "@/functions/admin.functions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { PageHeader } from "@/ui/platform/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed/events/")({
  loader: () => getAdminEvents(),
  gcTime: 0,
  component: EventsPage,
});

function EventsPage() {
  const { events, inviteGroups, rsvps } = Route.useLoaderData();

  const responsesFor = (eventId: number) =>
    new Map(
      rsvps
        .filter((r) => r.eventId === eventId)
        .map((r) => [r.inviteeId, r.isAttending]),
    );

  return (
    <>
      <PageHeader title="Events" description="Who's coming to what." />

      <div className="grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <AdminEventCard
            key={event.id}
            event={event}
            inviteGroups={inviteGroups}
            responses={responsesFor(event.id)}
          />
        ))}

        <Card className="border-dashed shadow-none">
          <CardHeader>
            <CardTitle>New event</CardTitle>
            <CardDescription>
              {events.length
                ? "Add another event for guests to RSVP to."
                : "No events yet. Add the first one."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <AddEventForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
