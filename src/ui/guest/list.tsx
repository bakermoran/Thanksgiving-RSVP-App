import { cn } from "./cn";
import { Illustration } from "./illustration";

export const ListItem = ({
  className,
  children,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li
    {...props}
    className={cn(
      "flex flex-wrap items-center gap-x-3 gap-y-2 border-b-2 border-dashed border-harvest/40 py-2.5 text-lg font-medium last:border-b-0",
      className,
    )}
  >
    <Illustration name="acorn" className="h-5 shrink-0" />
    {children}
  </li>
);
