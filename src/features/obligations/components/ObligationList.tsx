import { Card } from "@/ui/card";

import { CreateObligationForm } from "./CreateObligationForm";
import { ObligationRow, type ObligationWithInvitee } from "./ObligationRow";

interface ObligationListProps {
  obligations: ObligationWithInvitee[];
  inviteeId: number;
}

export const ObligationList = ({
  obligations,
  inviteeId,
}: ObligationListProps) => (
  <Card tilt="left">
    {obligations.length === 0 ? (
      <p className="py-6 text-center text-lg font-medium text-cocoa">
        Nothing on the menu yet. Check back soon!
      </p>
    ) : (
      <ul>
        {obligations.map((obligation) => (
          <ObligationRow
            key={obligation.id}
            obligation={obligation}
            inviteeId={inviteeId}
          />
        ))}
      </ul>
    )}
    <CreateObligationForm inviteeId={inviteeId} />
  </Card>
);
