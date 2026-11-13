import { addObligationSchema } from "@/shared/schemas/admin";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { Label } from "@/ui/platform/label";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { cn } from "cn";
import { useState } from "react";

import { RenameButton, SaveCancelButtons } from "./RenameControls";

const nameSchema = addObligationSchema.pick({ name: true });

interface EditableNameProps {
  name: string;
  /** DOM id for the input while editing. */
  inputId: string;
  /** Accessible label for the input, e.g. "Category name". */
  label: string;
  /** Shown when the save fails, e.g. because the name is already taken. */
  errorMessage: string;
  onRename: (name: string) => Promise<unknown>;
  className?: string;
}

export const EditableName = ({
  name,
  className,
  ...formProps
}: EditableNameProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <RenameForm
        name={name}
        onDone={() => setIsEditing(false)}
        {...formProps}
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span>{name}</span>
      <RenameButton
        label={`Rename ${name}`}
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

// Mounted only while editing, so the input always starts from the current name.
const RenameForm = ({
  name,
  inputId,
  label,
  errorMessage,
  onRename,
  onDone,
}: Omit<EditableNameProps, "className"> & { onDone: () => void }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { name },
    validators: { onSubmit: nameSchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      const trimmed = value.name.trim();
      if (trimmed === name) {
        onDone();
        return;
      }
      try {
        await onRename(trimmed);
        await router.invalidate();
        onDone();
      } catch (error) {
        console.error(error);
        setError(errorMessage);
      }
    },
  });

  return (
    <Form form={form} className="w-full space-y-1 font-normal">
      <form.Field name="name">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor={inputId} className="sr-only">
              {label}
            </Label>
            <div className="flex items-center gap-1">
              <Input
                id={inputId}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onDone();
                }}
                aria-invalid={field.state.meta.errors.length > 0}
                autoFocus
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <SaveCancelButtons
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                    onCancel={onDone}
                  />
                )}
              </form.Subscribe>
            </div>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Form>
  );
};
