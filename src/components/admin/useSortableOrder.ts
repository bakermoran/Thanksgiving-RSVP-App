import {
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const useSortableOrder = <T extends { id: number }>(
  items: T[],
  save: (ids: number[]) => Promise<unknown>,
) => {
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

  const byId = new Map(items.map((item) => [item.id, item]));
  const ordered = pendingIds
    ? pendingIds.flatMap((id) => byId.get(id) ?? [])
    : items;

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const ids = ordered.map((item) => item.id);
    const next = arrayMove(
      ids,
      ids.indexOf(active.id as number),
      ids.indexOf(over.id as number),
    );

    const attempt = ++latestSave.current;
    setError(null);
    setPendingIds(next);
    try {
      await save(next);
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("Couldn't save the new order. Please try again.");
    } finally {
      if (attempt === latestSave.current) setPendingIds(null);
    }
  };

  return { ordered, error, sensors, onDragEnd };
};
