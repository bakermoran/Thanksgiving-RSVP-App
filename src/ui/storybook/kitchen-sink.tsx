import { Fragment } from "react";

export const Caption = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-xs tracking-wider whitespace-nowrap uppercase opacity-60">
    {children}
  </span>
);

export const Sink = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-10">{children}</div>
);

export const Section = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-3">
    <h2>
      <Caption>{title}</Caption>
    </h2>
    {children}
  </section>
);

export const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-start gap-6">{children}</div>
);

export const Cell = ({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-start gap-2">
    <Caption>{label}</Caption>
    {children}
  </div>
);

export const Matrix = <R extends string, C extends string>({
  rows,
  cols,
  render,
}: {
  rows: readonly R[];
  cols: readonly C[];
  render: (row: R, col: C) => React.ReactNode;
}) => {
  if (rows.length === 0 || cols.length === 0) {
    return <Caption>Nothing selected</Caption>;
  }
  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="grid w-max items-center gap-x-6 gap-y-5"
        style={{
          gridTemplateColumns: `auto repeat(${cols.length}, max-content)`,
        }}
      >
        <span />
        {cols.map((col) => (
          <Caption key={col}>{col}</Caption>
        ))}
        {rows.map((row) => (
          <Fragment key={row}>
            <Caption>{row}</Caption>
            {cols.map((col) => (
              <div key={col}>{render(row, col)}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const keysOf = <T extends string>(record: Record<T, true>) =>
  Object.keys(record) as T[];

export const pick = <T extends string>(
  options: readonly T[],
  selected: readonly T[] | undefined,
) => options.filter((option) => selected?.includes(option));
