import { AddInviteeForm } from "@/components/admin/AddInviteeForm";
import { InviteGroupCard } from "@/components/admin/InviteGroupCard";
import { getAdminGuests } from "@/functions/admin.functions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { PageHeader } from "@/ui/platform/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_authed/guests")({
  loader: () => getAdminGuests(),
  gcTime: 0,
  component: GuestsPage,
});

function GuestsPage() {
  const inviteGroups = Route.useLoaderData();
  const total = inviteGroups.reduce((n, g) => n + g.invitees.length, 0);

  return (
    <>
      <PageHeader
        title="Guests"
        description={`${total} guests in ${inviteGroups.length} groups.`}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {inviteGroups.map((group) => (
          <InviteGroupCard
            key={group.id}
            group={group}
            inviteGroups={inviteGroups}
          />
        ))}

        <Card className="border-dashed shadow-none">
          <CardHeader>
            <CardTitle>New group</CardTitle>
            <CardDescription>
              Add someone to start a new group. You can move others in after.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1" />
          <CardFooter>
            <AddInviteeForm inviteGroupId={null} submitLabel="Create" />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
