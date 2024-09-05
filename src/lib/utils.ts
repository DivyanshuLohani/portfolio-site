export function formatTime(time: Date) {
  // Get the following format
  // MonthName Year number
  const formater = Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  });
  return formater.format(time);
}
