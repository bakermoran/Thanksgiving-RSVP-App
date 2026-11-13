import { reorderObligationCategories } from "@/functions/admin.functions";
import type { ObligationCategoryWithObligations } from "@/shared/types";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useRouter } from "@tanstack/react-router";
import { type ReactNode, useRef, useState } from "react";

import { AdminObligationList } from "./AdminObligationCard";

const DND_ID = "obligation-categories";

interface SortableObligationCategoriesProps {
  categories: ObligationCategoryWithObligations[];
  children?: ReactNode;
}

export const SortableObligationCategories = ({
  categories,
  children,
}: SortableObligationCategoriesProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<number[] | null>(null);
  const latestSave = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const byId = new Map(categories.map((category) => [category.id, category]));
  const ordered = pendingIds
    ? pendingIds.flatMap((id) => byId.get(id) ?? [])
    : categories;

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const ids = ordered.map((category) => category.id);
    const next = arrayMove(
      ids,
      ids.indexOf(active.id as number),
      ids.indexOf(over.id as number),
    );

    const save = ++latestSave.current;
    setError(null);
    setPendingIds(next);
    try {
      await reorderObligationCategories({ data: { ids: next } });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("Couldn't save the new order. Please try again.");
    } finally {
      if (save === latestSave.current) setPendingIds(null);
    }
  };

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
