export type FieldErrors = ReadonlyArray<
  { message?: string } | string | undefined
>;

const errorMessage = (error: FieldErrors[number]) =>
  typeof error === "string" ? error : error?.message;

export const FieldError = ({ errors }: { errors: FieldErrors }) => (
  <>
    {errors.map(errorMessage).map(
      (message) =>
        message && (
          <p key={message} role="alert" className="text-sm text-destructive">
            {message}
          </p>
        ),
    )}
  </>
);
