import { type InviteGroupWithInvitees } from "@/db/schema/inviteGroup";
import { groupLabel } from "@/features/admin/groupLabel";
import { Card } from "@/ui/card";

import { AddInviteeForm } from "./AddInviteeForm";
import { AdminInviteeRow } from "./AdminInviteeRow";

interface InviteGroupCardProps {
  group: InviteGroupWithInvitees;
  inviteGroups: InviteGroupWithInvitees[];
}

export const InviteGroupCard = ({
  group,
  inviteGroups,
}: InviteGroupCardProps) => (
  <Card className="flex flex-col">
    <h3 className="font-display text-3xl leading-tight text-cocoa">
      {groupLabel(group)}
    </h3>

    {group.invitees.length ? (
      <ul className="mt-3 mb-4">
        {group.invitees.map((invitee) => (
          <AdminInviteeRow
            key={invitee.id}
            invitee={invitee}
            inviteGroups={inviteGroups}
          />
        ))}
      </ul>
    ) : (
      <p className="mt-3 mb-4 text-cocoa">Nobody here yet.</p>
    )}

    <div className="mt-auto">
      <AddInviteeForm inviteGroupId={group.id} />
    </div>
  </Card>
);
