import { renameInvitee } from "@/functions/admin.functions";
import { renameInviteeSchema } from "@/shared/schemas/admin";
import type { Invitee } from "@/shared/types";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { RenameButton, SaveCancelButtons } from "./RenameControls";

const nameFields = [
  { name: "firstName", label: "First name", placeholder: "First" },
  { name: "lastName", label: "Last name", placeholder: "Last" },
] as const;

interface EditableInviteeNameProps {
  invitee: Invitee;
}

export const EditableInviteeName = ({ invitee }: EditableInviteeNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const fullName = `${invitee.firstName} ${invitee.lastName}`;

  if (isEditing) {
    return (
      <RenameInviteeForm invitee={invitee} onDone={() => setIsEditing(false)} />
    );
  }

  return (
    <div className="flex min-w-0 flex-1 basis-32 items-center gap-1 font-medium">
      <span>{fullName}</span>
      <RenameButton
        label={`Rename ${fullName}`}
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};

// Mounted only while editing, so the inputs always start from the current name.
const RenameInviteeForm = ({
  invitee,
  onDone,
}: EditableInviteeNameProps & { onDone: () => void }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      inviteeId: invitee.id,
      firstName: invitee.firstName,
      lastName: invitee.lastName,
    },
    validators: { onSubmit: renameInviteeSchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      const firstName = value.firstName.trim();
      const lastName = value.lastName.trim();
      if (firstName === invitee.firstName && lastName === invitee.lastName) {
        onDone();
        return;
      }
      try {
        await renameInvitee({
          data: { inviteeId: invitee.id, firstName, lastName },
        });
        await router.invalidate();
        onDone();
      } catch (error) {
        console.error(error);
        setError("Couldn't rename them. Please try again.");
      }
    },
  });

  return (
    // Full width, so inside the wrapping row it takes its own line.
    <Form form={form} className="w-full space-y-1 font-normal">
      <div className="flex flex-wrap items-start gap-2">
        {nameFields.map(({ name, label, placeholder }) => (
          <form.Field key={name} name={name}>
            {(field) => (
              <div className="min-w-0 flex-1 basis-28 space-y-1">
                <Input
                  id={`rename-invitee-${invitee.id}-${name}`}
                  name={name}
                  aria-label={label}
                  placeholder={placeholder}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") onDone();
                  }}
                  aria-invalid={field.state.meta.errors.length > 0}
                  autoFocus={name === "firstName"}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        ))}

        <div className="flex items-center gap-1">
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
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Form>
  );
};
