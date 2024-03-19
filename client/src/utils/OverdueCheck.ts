import { Task } from "../pages/Task";

interface TaskState {
  
  _id: string;
  task_description: string;
  task_status: boolean;
  date: String;
}
export interface IsOverDue {
  logic: boolean | false;
  values: Task[] | [];
}
let overDueTasks: Task[];
let overDueLogic: boolean = false;
export const today: Date = new Date();
export function formatDate(date: Date): string {
  if (date.getMonth() + 1 < 10) {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
function compareDates(date1: string, date2: string): boolean {
  return date1 < date2;
}
export function isOverdue(value: Task[]): IsOverDue {
  overDueTasks = value.filter(
    (singleTask: Task | any) =>
      compareDates(singleTask.date.split("T")[0].trim(), formatDate(today)) &&
      singleTask.task_status === false
  );
  overDueLogic = overDueTasks.length > 0;
  return { logic: overDueLogic, values: overDueTasks };
}
