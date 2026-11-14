import { reorderObligationCategories } from "@/functions/admin.functions";
import type { ObligationCategoryWithObligations } from "@/shared/types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { type ReactNode } from "react";

import { AdminObligationList } from "./AdminObligationCard";
import { useSortableOrder } from "./useSortableOrder";

const DND_ID = "obligation-categories";

interface SortableObligationCategoriesProps {
  categories: ObligationCategoryWithObligations[];
  children?: ReactNode;
}

export const SortableObligationCategories = ({
  categories,
  children,
}: SortableObligationCategoriesProps) => {
  const { ordered, error, sensors, onDragEnd } = useSortableOrder(
    categories,
    (ids) => reorderObligationCategories({ data: { ids } }),
  );

  return (
    <>
      {error && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {error}
        </p>
      )}
      <DndContext
        id={DND_ID}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          id={DND_ID}
          items={ordered.map((category) => category.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {ordered.map((category) => (
              <AdminObligationList key={category.id} category={category} />
            ))}
            {children}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};
