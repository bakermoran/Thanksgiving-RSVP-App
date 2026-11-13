import type { ObligationCategoryWithObligations } from "@/shared/types";
import { Card } from "@/ui/guest/card";

import { CreateObligationForm } from "./CreateObligationForm";
import { ObligationRow } from "./ObligationRow";

interface ObligationListProps {
  categories: ObligationCategoryWithObligations[];
  inviteeId: number;
  onDestroy?: (id: number) => void;
}

export const ObligationList = ({
  categories,
  inviteeId,
  onDestroy,
}: ObligationListProps) => {
  return (
    <Card tilt="left">
      <div className="space-y-10">
        {categories.map((category) => (
          <section
            key={category.id}
            aria-labelledby={`obligation-category-${category.id}`}
          >
            <h3
              id={`obligation-category-${category.id}`}
              className="font-display text-2xl text-cranberry"
            >
              {category.name}
            </h3>
            {category.obligations.length === 0 ? (
              <p className="py-2.5 text-lg font-medium text-cocoa">
                Nothing here yet.
              </p>
            ) : (
              <ul>
                {category.obligations.map((obligation) => (
                  <ObligationRow
                    key={obligation.id}
                    obligation={obligation}
                    inviteeId={inviteeId}
                    onDestroy={onDestroy}
                  />
                ))}
              </ul>
            )}
            <CreateObligationForm
              inviteeId={inviteeId}
              categoryId={category.id}
              categoryName={category.name}
            />
          </section>
        ))}
      </div>
    </Card>
  );
};
