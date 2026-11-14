import { reorderObligations } from "@/functions/admin.functions";
import type { ObligationWithInvitee } from "@/shared/types";
import { ScrollArea } from "@/ui/platform/scroll-area";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { AdminObligationRow } from "./AdminObligationRow";
import { useSortableOrder } from "./useSortableOrder";

interface SortableObligationListProps {
  categoryId: number;
  obligations: ObligationWithInvitee[];
  onDestroy: (id: number) => Promise<void>;
}

export const SortableObligationList = ({
  categoryId,
  obligations,
  onDestroy,
}: SortableObligationListProps) => {
  const { ordered, error, sensors, onDragEnd } = useSortableOrder(
    obligations,
    (ids) => reorderObligations({ data: { categoryId, ids } }),
  );
  const dndId = `obligations-${categoryId}`;

  return (
    <>
      {error && (
        <p role="alert" className="mb-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          id={dndId}
          items={ordered.map((obligation) => obligation.id)}
          strategy={verticalListSortingStrategy}
        >
          <ScrollArea className="-mx-2" viewportClassName="h-96">
            <ul className="divide-y px-2">
              {ordered.map((obligation) => (
                <AdminObligationRow
                  key={obligation.id}
                  obligation={obligation}
                  onDestroy={onDestroy}
                />
              ))}
            </ul>
          </ScrollArea>
        </SortableContext>
      </DndContext>
    </>
  );
};
