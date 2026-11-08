import type { Invitee } from "@/db/schema/invitee";
import type { Obligation } from "@/db/schema/obligation";
import {
  claimObligation,
  releaseObligation,
} from "@/features/obligations/obligations.functions";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { cn } from "@/ui/cn";
import { ListItem } from "@/ui/list";
import { useRouter } from "@tanstack/react-router";

export type ObligationWithInvitee = Obligation & { invitee: Invitee | null };

interface ObligationRowProps {
  obligation: ObligationWithInvitee;
  inviteeId: number;
}

export const ObligationRow = ({
  obligation,
  inviteeId,
}: ObligationRowProps) => {
  const router = useRouter();
  const { invitee } = obligation;
  const isMine = invitee?.id === inviteeId;

  const claim = async () => {
    await claimObligation({ data: { id: obligation.id, inviteeId } });
    await router.invalidate();
  };

  const release = async () => {
    await releaseObligation({ data: { id: obligation.id, inviteeId } });
    await router.invalidate();
  };

  return (
    <ListItem className="gap-x-4 py-3">
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "text-xl font-semibold",
            invitee && !isMine && "text-cocoa",
          )}
        >
          {obligation.name}
        </div>
        <div className="text-sm text-cocoa">
          {isMine
            ? "You're on it!"
            : invitee
              ? `${invitee.firstName} has it covered`
              : "Up for grabs"}
        </div>
      </div>

      {isMine ? (
        <div className="flex items-center gap-2">
          <Badge variant="olive">Yours</Badge>
          <Button variant="ghost" size="sm" onClick={release}>
            <span aria-hidden>↩</span> Release
          </Button>
        </div>
      ) : invitee ? (
        <Badge>{invitee.firstName}</Badge>
      ) : (
        <Button size="sm" onClick={claim}>
          I'll bring it
        </Button>
      )}
    </ListItem>
  );
};
