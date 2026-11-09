interface StatProps {
  value: React.ReactNode;
  label: string;
}

export const Stat = ({ value, label }: StatProps) => (
  <div className="flex flex-col items-center px-2 text-center">
    <span className="font-display text-3xl leading-none text-cranberry sm:text-5xl">
      {value}
    </span>
    <span className="mt-2 text-sm leading-tight font-bold text-cocoa">
      {label}
    </span>
  </div>
);
