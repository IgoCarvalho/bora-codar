export function getUTCDate(originalDate: Date) {
  const date = new Date(originalDate);

  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date;
}
