import { groupLabel } from "@/components/admin/groupLabel";
import { removeEvent } from "@/functions/admin.functions";
import { toAddressString } from "@/shared/address";
import { formatEventTimeRange } from "@/shared/date";
import { type Event, type InviteGroupWithInvitees } from "@/shared/types";
import { Badge } from "@/ui/platform/badge";
import { Button } from "@/ui/platform/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { Link, useRouter } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const ResponseBadge = ({
  isAttending,
}: {
  isAttending: boolean | undefined;
}) => {
  if (isAttending === undefined) {
    return <Badge variant="outline">No response</Badge>;
  }
  return isAttending ? (
    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
      Attending
    </Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
      Declined
    </Badge>
  );
};

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div className="rounded-lg bg-muted/50 px-3 py-2">
    <p className="text-2xl font-semibold tabular-nums">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

interface AdminEventCardProps {
  event: Event;
  inviteGroups: InviteGroupWithInvitees[];
  responses: Map<number, boolean>;
}

export const AdminEventCard = ({
  event,
  inviteGroups,
  responses,
}: AdminEventCardProps) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRemove = async () => {
    if (
      !window.confirm(
        `Delete ${event.name}? Everyone's RSVPs for it are deleted too.`,
      )
    ) {
      return;
    }

    setError(null);
    setIsBusy(true);
    try {
      await removeEvent({ data: { id: event.id } });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("Couldn't delete that event. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const invitees = inviteGroups.flatMap((g) => g.invitees);
  const attending = invitees.filter((i) => responses.get(i.id) === true);
  const declined = invitees.filter((i) => responses.get(i.id) === false);
  const pending = invitees.length - attending.length - declined.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{event.name}</CardTitle>
        <CardDescription>
          <span className="block">
            {formatEventTimeRange(event.startTime, event.endTime)}
          </span>
          <span className="block">{toAddressString(event)}</span>
        </CardDescription>
        <CardAction className="flex items-center gap-1">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/events/$eventId" params={{ eventId: event.id }}>
              <Pencil />
              Edit
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isBusy}
            onClick={onRemove}
            aria-label={`Delete ${event.name}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-5">
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Stat value={attending.length} label="Attending" />
          <Stat value={declined.length} label="Declined" />
          <Stat value={pending} label="No response" />
        </div>

        <div className="space-y-4">
          {inviteGroups.map((group) => (
            <div key={group.id}>
              <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {groupLabel(group)}
              </p>
              <ul className="divide-y">
                {group.invitees.map((invitee) => (
                  <li
                    key={invitee.id}
                    className="flex items-center justify-between gap-3 py-1.5 text-sm"
                  >
                    <span>
                      {invitee.firstName} {invitee.lastName}
                    </span>
                    <ResponseBadge isAttending={responses.get(invitee.id)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
