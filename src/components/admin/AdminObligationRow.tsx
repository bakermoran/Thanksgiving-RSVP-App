import { renameObligation } from "@/functions/admin.functions";
import type { ObligationWithInvitee } from "@/shared/types";
import { Badge } from "@/ui/platform/badge";
import { Button } from "@/ui/platform/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "cn";
import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import { EditableName } from "./EditableName";

export const AdminObligationRow = ({
  obligation,
  onDestroy,
}: {
  obligation: ObligationWithInvitee;
  onDestroy: (id: number) => Promise<void>;
}) => {
  const [isBusy, setIsBusy] = useState(false);
  const { invitee } = obligation;
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
      {invitee ? (
        <Badge variant="secondary">Claimed</Badge>
      ) : (
        <Badge variant="outline">Open</Badge>
      )}
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
