import { addInvitee } from "@/functions/admin.functions";
import { inviteeNameSchema } from "@/shared/schemas/invitees";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { Input } from "@/ui/input";
import { FieldError } from "@/ui/text-field";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
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
    <Form form={form} className="space-y-2">
      <div className="flex flex-wrap items-start gap-2">
        {(["firstName", "lastName"] as const).map((name) => (
          <form.Field key={name} name={name}>
            {(field) => (
              <div className="min-w-0 flex-1 basis-32">
                <Input
                  id={`${idPrefix}-${name}`}
                  name={name}
                  aria-label={name === "firstName" ? "First name" : "Last name"}
                  placeholder={name === "firstName" ? "First" : "Last"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  className="px-3 py-1.5 text-base"
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
              disabled={!canSubmit}
              loading={isSubmitting}
            >
              {submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </div>

      {error && <Alert>{error}</Alert>}
    </Form>
  );
};
