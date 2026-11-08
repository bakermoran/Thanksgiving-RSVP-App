import { cn } from "./cn";

type TitleSize = "md" | "lg" | "xl";

const titleSizes: Record<TitleSize, string> = {
  md: "text-5xl sm:text-6xl",
  lg: "text-6xl",
  xl: "text-6xl sm:text-7xl",
};

interface PageHeaderProps {
  illustration?: React.ReactNode;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  size?: TitleSize;
  children?: React.ReactNode;
  className?: string;
  detail?: React.ReactNode;
}

export const PageHeader = ({
  illustration,
  eyebrow,
  title,
  size = "lg",
  children,
  className,
  detail,
}: PageHeaderProps) => (
  <header className={cn("mb-10 text-center", className)}>
    {illustration}
    <p className={cn("eyebrow", !!illustration && "mt-3")}>{eyebrow}</p>
    <h1 className={cn("title-retro mt-2", titleSizes[size])}>{title}</h1>
    {detail && (
      <h3 className="text-cocoa hover:text-bark mt-2 text-md font-bold">
        {detail}
      </h3>
    )}
    {children && (
      <p className="mx-auto mt-4 max-w-md text-lg font-medium text-cocoa">
        {children}
      </p>
    )}
  </header>
);
