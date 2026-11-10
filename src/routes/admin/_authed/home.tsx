import { getAdminDashboard } from "@/features/admin/admin.functions";
import { AddInviteeForm } from "@/features/admin/components/AddInviteeForm";
import { AdminEventCard } from "@/features/admin/components/AdminEventCard";
import { InviteGroupCard } from "@/features/admin/components/InviteGroupCard";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed/home")({
  loader: () => getAdminDashboard(),
  gcTime: 0,
  component: AdminHome,
});

const SectionHeading = ({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) => (
  <div className="mb-6">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="font-display text-4xl text-cranberry">{title}</h2>
  </div>
);

function AdminHome() {
  const { events, inviteGroups, rsvps } = Route.useLoaderData();

  const responsesFor = (eventId: number) =>
    new Map(
      rsvps
        .filter((r) => r.eventId === eventId)
        .map((r) => [r.inviteeId, r.isAttending]),
    );

  return (
    <div className="space-y-14">
      <PageHeader
        illustration={
          <Illustration
            name="turkey"
            animate="wobble"
            className="mx-auto w-32"
          />
        }
        eyebrow="Behind the scenes"
        title="Host Dashboard"
      />

      <section>
        <SectionHeading eyebrow="Who's coming" title="Events & RSVPs" />
        {events.length ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {events.map((event, i) => (
              <AdminEventCard
                key={event.id}
                event={event}
                inviteGroups={inviteGroups}
                responses={responsesFor(event.id)}
                tilt={i % 2 ? "right" : "left"}
              />
            ))}
          </div>
        ) : (
          <p className="text-cocoa">No events yet.</p>
        )}
      </section>

      <section>
        <SectionHeading eyebrow="The guest list" title="Groups" />
        <div className="grid gap-8 sm:grid-cols-2">
          {inviteGroups.map((group) => (
            <InviteGroupCard
              key={group.id}
              group={group}
              inviteGroups={inviteGroups}
            />
          ))}

          <Card className="flex flex-col">
            <h3 className="font-display text-3xl leading-tight text-cocoa">
              New group
            </h3>
            <p className="mt-1 mb-4 text-cocoa">
              Add someone to start a new group. You can move others in after.
            </p>
            <div className="mt-auto">
              <AddInviteeForm inviteGroupId={null} submitLabel="Create" />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
