import {
  assignObligation,
  renameObligation,
} from "@/functions/admin.functions";
import type {
  InviteGroupWithInvitees,
  ObligationWithInvitee,
} from "@/shared/types";
import { Button } from "@/ui/platform/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "@tanstack/react-router";
import { cn } from "cn";
import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import { BadgeSelect } from "./BadgeSelect";
import { EditableName } from "./EditableName";
import { groupLabel } from "./groupLabel";

const OPEN = "open";

export const AdminObligationRow = ({
  obligation,
  inviteGroups,
  onDestroy,
}: {
  obligation: ObligationWithInvitee;
  inviteGroups: InviteGroupWithInvitees[];
  onDestroy: (id: number) => Promise<void>;
}) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [pendingAssignee, setPendingAssignee] = useState<string | null>(null);
  const [assignError, setAssignError] = useState(false);
  const { invitee } = obligation;
  const assignee = pendingAssignee ?? (invitee ? String(invitee.id) : OPEN);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: obligation.id });

  const onClick = async () => {
    setIsBusy(true);
    try {
      await onDestroy(obligation.id);
    } finally {
      setIsBusy(false);
    }
  };

  const onAssign = async (value: string) => {
    setAssignError(false);
    setPendingAssignee(value);
    try {
      await assignObligation({
        data: {
          id: obligation.id,
          inviteeId: value === OPEN ? null : Number(value),
        },
      });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setAssignError(true);
    } finally {
      setPendingAssignee(null);
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "flex items-center gap-3 bg-card py-2 text-sm",
        isDragging && "relative z-10 shadow-md",
      )}
    >
      <Button
        ref={setActivatorNodeRef}
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Reorder ${obligation.name}`}
        className="-ml-2 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical />
      </Button>
      <div className="min-w-0 flex-1">
        <EditableName
          name={obligation.name}
          inputId={`rename-obligation-${obligation.id}`}
          label="Name"
          errorMessage="Couldn't rename that. The name may already exist."
          onRename={(name) =>
            renameObligation({ data: { id: obligation.id, name } })
          }
          className="font-medium"
        />
        <p className="text-xs text-muted-foreground">
          {invitee ? `${invitee.firstName} ${invitee.lastName}` : "Unclaimed"}
        </p>
      </div>
      {assignError && (
        <span role="alert" className="text-xs text-destructive">
          Couldn't save
        </span>
      )}
      <BadgeSelect
        label={assignee === OPEN ? "Open" : "Claimed"}
        variant={assignee === OPEN ? "outline" : "secondary"}
        ariaLabel={`Who's bringing ${obligation.name}`}
        value={assignee}
        isPending={pendingAssignee !== null}
        onChange={onAssign}
      >
        <option value={OPEN}>Open</option>
        {inviteGroups.map((group) => (
          <optgroup key={group.id} label={groupLabel(group)}>
            {group.invitees.map((i) => (
              <option key={i.id} value={i.id}>
                {i.firstName} {i.lastName}
              </option>
            ))}
          </optgroup>
        ))}
      </BadgeSelect>
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={isBusy}
        onClick={onClick}
        aria-label={`Delete ${obligation.name}`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 />
      </Button>
    </li>
  );
};
