import { Button } from "@/ui/platform/button";
import { Check, LoaderCircle, Pencil, X } from "lucide-react";

export const RenameButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="icon-xs"
    onClick={onClick}
    aria-label={label}
    className="text-muted-foreground"
  >
    <Pencil />
  </Button>
);

export const SaveCancelButtons = ({
  canSubmit,
  isSubmitting,
  onCancel,
}: {
  canSubmit: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
}) => (
  <>
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={!canSubmit || isSubmitting}
      aria-label="Save name"
    >
      {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Check />}
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onCancel}
      aria-label="Cancel renaming"
      className="text-muted-foreground"
    >
      <X />
    </Button>
  </>
);
