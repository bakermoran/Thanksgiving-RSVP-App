import { adminLogIn } from "@/functions/adminAuth.functions";
import { adminLoginSchema } from "@/shared/schemas/adminAuth";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { TextField } from "@/ui/text-field";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

interface AdminLoginFormProps {
  onSubmit: () => void;
}

export const AdminLoginForm = ({ onSubmit }: AdminLoginFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: adminLoginSchema,
    },

    listeners: {
      onChange: () => setError(null),
    },

    onSubmit: async ({ value }) => {
      setError(null);
      try {
        const result = await adminLogIn({ data: value });
        if (!result.ok) {
          setError("That email and password don't match.");
          form.setFieldValue("password", "");
          return;
        }
        onSubmit();
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="space-y-6">
      <form.Field
        name="email"
        validators={{ onBlur: adminLoginSchema.shape.email }}
      >
        {(field) => (
          <TextField
            label="Email"
            type="email"
            autoComplete="username"
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors}
          />
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{ onBlur: adminLoginSchema.shape.password }}
      >
        {(field) => (
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors}
          />
        )}
      </form.Field>

      {error && <Alert>{error}</Alert>}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            loading={isSubmitting}
            className="w-full"
          >
            Log in
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
