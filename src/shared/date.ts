import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";

// SQLite stores "YYYY-MM-DD HH:MM:SS" in UTC;
const parse = (value: string) => new UTCDate(`${value.replace(" ", "T")}Z`);
const formatString = "MMM, d h:mm a  ";

// "YYYY-MM-DD HH:MM:SS" -> "YYYY-MM-DDTHH:MM" for <input type="datetime-local">
export const toDateTimeLocal = (value: string) =>
  value.replace(" ", "T").slice(0, 16);

// "YYYY-MM-DDTHH:MM[:SS]" -> "YYYY-MM-DD HH:MM:SS" for SQLite
export const fromDateTimeLocal = (value: string) => {
  const [date, time] = value.split("T");
  return `${date} ${time.length === 5 ? `${time}:00` : time}`;
};

export const formatEventTimeRange = (start: string, end: string) => {
  const s = parse(start);
  const e = parse(end);

  return `${format(s, formatString)} – ${format(e, formatString)}`;
};
