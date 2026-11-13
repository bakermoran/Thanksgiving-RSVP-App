import {
  destroyObligation,
  destroyObligationCategory,
  renameObligationCategory,
} from "@/functions/admin.functions";
import type { ObligationCategoryWithObligations } from "@/shared/types";
import { Button } from "@/ui/platform/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "@tanstack/react-router";
import { cn } from "cn";
import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";

import { AddObligationForm } from "./AddObligationForm";
import { AdminObligationRow } from "./AdminObligationRow";
import { EditableName } from "./EditableName";

interface AdminObligationListProps {
  category: ObligationCategoryWithObligations;
}

export const AdminObligationList = ({ category }: AdminObligationListProps) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const onDestroy = async (id: number) => {
    if (!window.confirm("Delete this? Anyone who claimed it loses it.")) return;
    await destroyObligation({ data: { id } });
    await router.invalidate();
  };

  const onDestroyCategory = async () => {
    const count = category.obligations.length;
    const message = count
      ? `Delete ${category.name} and its ${count} ${count === 1 ? "item" : "items"}? Anyone who claimed one loses it.`
      : `Delete ${category.name}?`;
    if (!window.confirm(message)) return;

    setError(null);
    setIsBusy(true);
    try {
      await destroyObligationCategory({ data: { id: category.id } });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("Couldn't delete that category. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const claimed = category.obligations.filter((o) => o.invitee).length;

  return (
    <Card
      key={category.id}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && "relative z-10 shadow-lg")}
    >
      <CardHeader>
        <CardTitle>
          <EditableName
            name={category.name}
            inputId={`rename-category-${category.id}`}
            label="Category name"
            errorMessage="Couldn't rename that category. The name may already exist."
            onRename={(name) =>
              renameObligationCategory({ data: { id: category.id, name } })
            }
          />
        </CardTitle>
        <CardDescription>
          {claimed} of {category.obligations.length} claimed
        </CardDescription>
        <CardAction className="flex items-center gap-1">
          <Button
            ref={setActivatorNodeRef}
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Reorder ${category.name}`}
            className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isBusy}
            onClick={onDestroyCategory}
            aria-label={`Delete ${category.name}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        {error && (
          <p role="alert" className="mb-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {category.obligations.length ? (
          <ul className="divide-y">
            {category.obligations.map((obligation) => (
              <AdminObligationRow
                key={obligation.id}
                obligation={obligation}
                onDestroy={onDestroy}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nothing here yet.</p>
        )}
      </CardContent>

      <CardFooter>
        <AddObligationForm
          categoryId={category.id}
          categoryName={category.name}
        />
      </CardFooter>
    </Card>
  );
};
