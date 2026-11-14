import { groupLabel } from "@/components/admin/groupLabel";
import { removeInviteGroup } from "@/functions/admin.functions";
import { type InviteGroupWithInvitees } from "@/shared/types";
import { Button } from "@/ui/platform/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { ScrollArea } from "@/ui/platform/scroll-area";
import { useRouter } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { AddInviteeForm } from "./AddInviteeForm";
import { AdminInviteeRow } from "./AdminInviteeRow";

interface InviteGroupCardProps {
  group: InviteGroupWithInvitees;
  inviteGroups: InviteGroupWithInvitees[];
}

export const InviteGroupCard = ({
  group,
  inviteGroups,
}: InviteGroupCardProps) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const count = group.invitees.length;

  const onRemove = async () => {
    const message = count
      ? `Delete ${groupLabel(group)} and its ${count} ${count === 1 ? "guest" : "guests"}? Their RSVPs are deleted and any dishes they claimed go back up for grabs.`
      : `Delete ${groupLabel(group)}?`;
    if (!window.confirm(message)) return;

    setError(null);
    setIsBusy(true);
    try {
      await removeInviteGroup({ data: { inviteGroupId: group.id } });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("Couldn't delete that group. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{groupLabel(group)}</CardTitle>
        <CardDescription>
          {count} {count === 1 ? "guest" : "guests"}
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isBusy}
            onClick={onRemove}
            aria-label={`Delete ${groupLabel(group)}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        {error && (
          <p role="alert" className="mb-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {count ? (
          <ScrollArea viewportClassName="h-96">
            <ul className="divide-y">
              {group.invitees.map((invitee) => (
                <AdminInviteeRow
                  key={invitee.id}
                  invitee={invitee}
                  inviteGroups={inviteGroups}
                />
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground">Nobody here yet.</p>
        )}
      </CardContent>

      <CardFooter>
        <AddInviteeForm inviteGroupId={group.id} />
      </CardFooter>
    </Card>
  );
};
