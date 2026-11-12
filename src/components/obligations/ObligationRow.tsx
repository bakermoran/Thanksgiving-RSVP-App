import {
  claimObligation,
  releaseObligation,
} from "@/functions/obligations.functions";
import type { Invitee } from "@/shared/types";
import type { Obligation } from "@/shared/types";
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

  const nameInitial = invitee
    ? `${invitee.firstName} ${invitee.lastName.slice(0, 1)}`
    : "";

  const whoClaimedIt = isMine
    ? "You're on it!"
    : invitee
      ? `${nameInitial} has it covered`
      : "Up for grabs";

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
        <div className="text-sm text-cocoa">{whoClaimedIt}</div>
      </div>

      {isMine ? (
        <div className="flex items-center gap-2">
          <Badge variant="olive">You</Badge>
          <Button variant="ghost" size="sm" onClick={release}>
            <span aria-hidden>↩</span> Never mind
          </Button>
        </div>
      ) : invitee ? (
        <Badge>{nameInitial}</Badge>
      ) : (
        <Button size="sm" onClick={claim}>
          I'll bring it
        </Button>
      )}
    </ListItem>
  );
};
