import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";

// SQLite stores "YYYY-MM-DD HH:MM:SS" in UTC;
const parse = (value: string) => new UTCDate(`${value.replace(" ", "T")}Z`);
const formatString = "MMM, d h:mm a  ";

export const formatEventTimeRange = (start: string, end: string) => {
  const s = parse(start);
  const e = parse(end);

  return `${format(s, formatString)} – ${format(e, formatString)}`;
};
