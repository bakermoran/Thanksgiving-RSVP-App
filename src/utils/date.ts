const parseSqliteDateTime = (value: string) =>
  new Date(`${value.replace(" ", "T")}Z`);

const eventTimeFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export const formatEventTime = (value: string) =>
  eventTimeFormat.format(parseSqliteDateTime(value));
