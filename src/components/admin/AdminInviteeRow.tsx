import { groupLabel } from "@/components/admin/groupLabel";
import { moveInvitee, removeInvitee } from "@/functions/admin.functions";
import { type InviteGroupWithInvitees, type Invitee } from "@/shared/types";
import { Button } from "@/ui/platform/button";
import { NativeSelect } from "@/ui/platform/native-select";
import { useRouter } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { EditableInviteeName } from "./EditableInviteeName";

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
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fullName = `${invitee.firstName} ${invitee.lastName}`;

  const run = async (action: () => Promise<unknown>) => {
    setError(null);
    setIsBusy(true);
    try {
      await action();
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("That didn't work. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const onMove = (value: string) =>
    run(() =>
      moveInvitee({
        data: {
          inviteeId: invitee.id,
          inviteGroupId: value === NEW_GROUP ? null : Number(value),
        },
      }),
    );

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
    <li className="flex flex-wrap items-center gap-2 py-2 text-sm">
      <EditableInviteeName invitee={invitee} />

      <label className="sr-only" htmlFor={`move-${invitee.id}`}>
        Move {fullName} to
      </label>
      <NativeSelect
        id={`move-${invitee.id}`}
        value={invitee.inviteGroupId}
        disabled={isBusy}
        onChange={(e) => onMove(e.target.value)}
        className="max-w-44"
      >
        {inviteGroups.map((group) => (
          <option key={group.id} value={group.id}>
            {groupLabel(group)}
          </option>
        ))}
        <option value={NEW_GROUP}>New group</option>
      </NativeSelect>

      <Button
        variant="ghost"
        size="icon-sm"
        disabled={isBusy}
        onClick={onRemove}
        aria-label={`Remove ${fullName}`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 />
      </Button>

      {error && (
        <p role="alert" className="w-full text-xs text-destructive">
          {error}
        </p>
      )}
    </li>
  );
};
