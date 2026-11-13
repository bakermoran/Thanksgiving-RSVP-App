import { cn } from "./cn";

type PageWidth = "sm" | "md";

const widths: Record<PageWidth, string> = {
  sm: "max-w-xl",
  md: "max-w-6xl",
};

type PageProps = React.HTMLAttributes<HTMLElement> & {
  width?: PageWidth;
};

export const Page = ({ width = "md", className, ...props }: PageProps) => (
  <main
    {...props}
    className={cn("mx-auto w-full px-4 pt-6 pb-12", widths[width], className)}
  />
);
