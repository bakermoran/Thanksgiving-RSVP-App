import { type Event } from "@/db/schema/event";
import { type InviteGroupWithInvitees } from "@/db/schema/inviteGroup";
import { groupLabel } from "@/features/admin/groupLabel";
import { Stat } from "@/features/home/components/Stat";
import { ResponseBadge } from "@/features/rsvps/components/ResponseBadge";
import { Card } from "@/ui/card";
import { ListItem } from "@/ui/list";
import { toAddressString } from "@/utils/address";
import { formatEventTimeRange } from "@/utils/date";

interface AdminEventCardProps {
  event: Event;
  inviteGroups: InviteGroupWithInvitees[];
  responses: Map<number, boolean>;
  tilt: "left" | "right";
}

export const AdminEventCard = ({
  event,
  inviteGroups,
  responses,
  tilt,
}: AdminEventCardProps) => {
  const invitees = inviteGroups.flatMap((g) => g.invitees);
  const attending = invitees.filter((i) => responses.get(i.id) === true);
  const declined = invitees.filter((i) => responses.get(i.id) === false);
  const pending = invitees.length - attending.length - declined.length;

  return (
    <Card tilt={tilt} className="flex flex-col">
      <h3 className="font-display text-3xl leading-tight text-cocoa">
        {event.name}
      </h3>
      <p className="mt-1 text-sm font-bold text-cocoa">
        {formatEventTimeRange(event.startTime, event.endTime)}
      </p>
      <p className="text-sm text-cocoa">{toAddressString(event)}</p>

      <div className="mt-4 grid grid-cols-3 divide-x-2 divide-dashed divide-harvest/40">
        <Stat value={attending.length} label="attending" />
        <Stat value={declined.length} label="not attending" />
        <Stat value={pending} label="no response" />
      </div>

      <div className="mt-4 space-y-4">
        {inviteGroups.map((group) => (
          <div key={group.id}>
            <p className="eyebrow">{groupLabel(group)}</p>
            <ul>
              {group.invitees.map((invitee) => (
                <ListItem key={invitee.id} className="py-1.5 text-base">
                  <span className="flex-1">
                    {invitee.firstName} {invitee.lastName}
                  </span>
                  <ResponseBadge isAttending={responses.get(invitee.id)} />
                </ListItem>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};
