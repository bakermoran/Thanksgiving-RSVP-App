import { type InviteGroupWithInvitees } from "@/db/schema/inviteGroup";
import { type Invitee } from "@/db/schema/invitee";
import { moveInvitee, removeInvitee } from "@/features/admin/admin.functions";
import { groupLabel } from "@/features/admin/groupLabel";
import { Button } from "@/ui/button";
import { ListItem } from "@/ui/list";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

const NEW_GROUP = "new";

interface AdminInviteeRowProps {
  invitee: Invitee;
  inviteGroups: InviteGroupWithInvitees[];
}

export const AdminInviteeRow = ({
  invitee,
  inviteGroups,
}: AdminInviteeRowProps) => {
  const router = useRouter();
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fullName = `${invitee.firstName} ${invitee.lastName}`;

  const run = async (action: () => Promise<unknown>) => {
    setError(null);
    try {
      await action();
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("That didn't work. Please try again.");
    }
  };

  const onMove = async (value: string) => {
    setIsMoving(true);
    await run(() =>
      moveInvitee({
        data: {
          inviteeId: invitee.id,
          inviteGroupId: value === NEW_GROUP ? null : Number(value),
        },
      }),
    );
    setIsMoving(false);
  };

  const onRemove = () => {
    if (
      !window.confirm(
        `Remove ${fullName}? Their RSVPs are deleted and any dishes they claimed go back up for grabs.`,
      )
    ) {
      return;
    }
    return run(() => removeInvitee({ data: { inviteeId: invitee.id } }));
  };

  return (
    <ListItem className="py-2 text-base">
      <span className="min-w-0 flex-1 basis-32">{fullName}</span>

      <label className="sr-only" htmlFor={`move-${invitee.id}`}>
        Move {fullName} to
      </label>
      <select
        id={`move-${invitee.id}`}
        value={invitee.inviteGroupId}
        disabled={isMoving}
        onChange={(e) => onMove(e.target.value)}
        className="max-w-48 rounded-full border-3 border-bark bg-white px-3 py-1 text-sm font-semibold text-bark shadow-chunky-sm focus:ring-4 focus:ring-mustard focus:outline-none disabled:opacity-60"
      >
        {inviteGroups.map((group) => (
          <option key={group.id} value={group.id}>
            {groupLabel(group)}
          </option>
        ))}
        <option value={NEW_GROUP}>New group</option>
      </select>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        aria-label={`Remove ${fullName}`}
      >
        Remove
      </Button>

      {error && (
        <p role="alert" className="w-full text-sm font-semibold text-cranberry">
          {error}
        </p>
      )}
    </ListItem>
  );
};
