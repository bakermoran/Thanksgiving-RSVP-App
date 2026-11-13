import { renameObligation } from "@/functions/admin.functions";
import type { ObligationWithInvitee } from "@/shared/types";
import { Badge } from "@/ui/platform/badge";
import { Button } from "@/ui/platform/button";
import { Trash2 } from "lucide-react";
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

  const onClick = async () => {
    setIsBusy(true);
    try {
      await onDestroy(obligation.id);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <li className="flex items-center gap-3 py-2 text-sm">
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
