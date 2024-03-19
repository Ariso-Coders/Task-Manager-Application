export function formatDate(date: Date): string {
  if (date.getMonth() + 1 < 10) {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
export function compareDates(date1: string, date2: string): boolean {
  const parsedDate1 = new Date(date1);
  const parsedDate2 = new Date(date2);
  return parsedDate1 < parsedDate2;
}
