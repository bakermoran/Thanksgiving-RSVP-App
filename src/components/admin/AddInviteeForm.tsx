import { addInvitee } from "@/functions/admin.functions";
import { inviteeNameSchema } from "@/shared/schemas/invitees";
import { Button } from "@/ui/platform/button";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";

interface AddInviteeFormProps {
  inviteGroupId: number | null;
  submitLabel?: string;
}

export const AddInviteeForm = ({
  inviteGroupId,
  submitLabel = "Add",
}: AddInviteeFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const idPrefix = `add-invitee-${inviteGroupId ?? "new"}`;

  const form = useForm({
    defaultValues: { firstName: "", lastName: "" },
    validators: { onSubmit: inviteeNameSchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await addInvitee({ data: { ...value, inviteGroupId } });
        form.reset();
        await router.invalidate();
      } catch (error) {
        console.error(error);
        setError("Couldn't add them. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="w-full space-y-2">
      <div className="flex flex-wrap items-start gap-2">
        {(["firstName", "lastName"] as const).map((name) => (
          <form.Field key={name} name={name}>
            {(field) => (
              <div className="min-w-0 flex-1 basis-28 space-y-1">
                <Input
                  id={`${idPrefix}-${name}`}
                  name={name}
                  aria-label={name === "firstName" ? "First name" : "Last name"}
                  placeholder={name === "firstName" ? "First" : "Last"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        ))}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="secondary"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Plus />
              )}
              {submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Form>
  );
};
