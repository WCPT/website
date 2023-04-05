import { format } from "date-fns";

export function formatDate(date: string, outputFormat?: string) {
  return format(new Date(date), outputFormat ?? "d MMM yyyy");
}
