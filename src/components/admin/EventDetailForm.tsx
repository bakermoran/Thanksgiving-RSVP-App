import { updateEvent } from "@/functions/admin.functions";
import { toDateTimeLocal } from "@/shared/date";
import { updateEventSchema } from "@/shared/schemas/admin";
import type { Event } from "@/shared/types";
import { Button } from "@/ui/platform/button";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { Label } from "@/ui/platform/label";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const fields = [
  { name: "name", label: "Event name", type: "text" },
  { name: "startTime", label: "Start time", type: "datetime-local" },
  { name: "endTime", label: "End time", type: "datetime-local" },
] as const;

interface EventDetailFormProps {
  event: Event;
}

export const EventDetailForm = ({ event }: EventDetailFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      id: event.id,
      name: event.name,
      startTime: toDateTimeLocal(event.startTime),
      endTime: toDateTimeLocal(event.endTime),
    },
    validators: { onSubmit: updateEventSchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await updateEvent({ data: value });
        navigate({ to: "/admin/events" });
      } catch (error) {
        console.error(error);
        setError("Couldn't update the event. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="space-y-5">
      {fields.map(({ name, label, type }) => (
        <form.Field key={name} name={name}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={`event-${name}`}>{label}</Label>
              <Input
                id={`event-${name}`}
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

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting && <LoaderCircle className="animate-spin" />}
              Save
            </Button>
          )}
        </form.Subscribe>
        <Button asChild variant="ghost">
          <Link to="/admin/events">Cancel</Link>
        </Button>
      </div>
    </Form>
  );
};
