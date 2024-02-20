export function formatDate(date: Date): string {
    if (date.getMonth() + 1 < 10) {
      return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
    } else {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
  export function compareDates(date1: string, date2: string): boolean {
    return date1 < date2;
  }