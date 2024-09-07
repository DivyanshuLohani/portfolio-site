export function formatTime(time: Date) {
  const formater = Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  });
  return formater.format(time);
}

export function formatDate(date: string) {
  const formater = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formater.format(new Date(date));
}
