import { createEvent } from "@/functions/admin.functions";
import { createEventSchema } from "@/shared/schemas/admin";
import { Button } from "@/ui/platform/button";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { Label } from "@/ui/platform/label";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { cn } from "cn";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";

// `wide` fields take the full row; the rest share it two to a row.
const fields = [
  { name: "name", label: "Event name", type: "text", wide: true },
  { name: "startTime", label: "Start time", type: "datetime-local" },
  { name: "endTime", label: "End time", type: "datetime-local" },
  { name: "address1", label: "Street address", type: "text", wide: true },
  {
    name: "address2",
    label: "Apt, suite, etc. (optional)",
    type: "text",
    wide: true,
  },
  { name: "city", label: "City", type: "text", wide: true },
  { name: "state", label: "State", type: "text" },
  { name: "zip", label: "Zip code", type: "text" },
] as const;

export const AddEventForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    },
    validators: { onSubmit: createEventSchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await createEvent({ data: value });
        form.reset();
        await router.invalidate();
      } catch (error) {
        console.error(error);
        setError("Couldn't create the event. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        {fields.map(({ name, label, type, ...rest }) => (
          <form.Field key={name} name={name}>
            {(field) => (
              <div
                className={cn(
                  "min-w-0 space-y-2",
                  "wide" in rest ? "col-span-2" : "col-span-2 sm:col-span-1",
                )}
              >
                <Label htmlFor={`new-event-${name}`}>{label}</Label>
                <Input
                  id={`new-event-${name}`}
                  name={name}
                  type={type}
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
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

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
            Create
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
