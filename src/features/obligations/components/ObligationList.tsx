import type { ObligationCategory } from "@/db/schema/obligation";
import { Card } from "@/ui/card";

import { CreateObligationForm } from "./CreateObligationForm";
import { ObligationRow, type ObligationWithInvitee } from "./ObligationRow";

interface ObligationListProps {
  obligations: ObligationWithInvitee[];
  categories: ObligationCategory[];
  inviteeId: number;
}

export const ObligationList = ({
  obligations,
  categories,
  inviteeId,
}: ObligationListProps) => {
  const sections = categories.map((category) => ({
    key: String(category.id),
    categoryId: category.id,
    title: category.name,
    items: obligations.filter((o) => o.categoryId === category.id),
  }));

  return (
    <Card tilt="left">
      <div className="space-y-10">
        {sections.map((section) => (
          <section
            key={section.key}
            aria-labelledby={`obligation-category-${section.key}`}
          >
            <h3
              id={`obligation-category-${section.key}`}
              className="font-display text-2xl text-cranberry"
            >
              {section.title}
            </h3>
            {section.items.length === 0 ? (
              <p className="py-2.5 text-lg font-medium text-cocoa">
                Nothing here yet.
              </p>
            ) : (
              <ul>
                {section.items.map((obligation) => (
                  <ObligationRow
                    key={obligation.id}
                    obligation={obligation}
                    inviteeId={inviteeId}
                  />
                ))}
              </ul>
            )}
            <CreateObligationForm
              inviteeId={inviteeId}
              categoryId={section.categoryId}
              categoryName={section.title}
            />
          </section>
        ))}
      </div>
    </Card>
  );
};
