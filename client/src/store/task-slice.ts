import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../pages/ViewTask";
import { formatDate } from "../utils/OverdueCheck";

export interface TaskState {
  userID: string | null;
  date: string | any;
  task_description: string | "";
  task_status: boolean | null;
}

export interface TasksState {
  totalTask: TaskState[];
  filteredTask: TaskState[];
  filterMessage: string;
}

export interface filterTaskStaus {
  tasks: Task[];
  searchTerm: string;
  showCompleted: boolean;
  showNotCompleted: boolean;
  //setFilterMessage: string;
}

const initialState: TasksState = {
  totalTask: [],
  filteredTask: [],
  filterMessage: "",
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskState[]>) {
      console.log("values came to set", action.payload);
      state = {
        ...state,
        totalTask: action.payload,
      };

      console.log("state in redux", state);

      return state;
    },
    setFilterByStatus(state, action: PayloadAction<filterTaskStaus>) {
      //console.log("Values came to redux", action.payload);

      state = {
        ...state,
        filteredTask: state.totalTask.filter(
          (task) =>
            task.task_description
              .toLowerCase()
              .includes(action.payload.searchTerm.toLowerCase()) &&
            ((action.payload.showCompleted && task.task_status) ||
              (action.payload.showNotCompleted && !task.task_status) ||
              (!action.payload.showCompleted &&
                !action.payload.showNotCompleted))
        ),
      };
      if (action.payload.showCompleted && action.payload.showNotCompleted) {
        state =  {
          ...state,
          filterMessage: "Results for Both Completed & Not Completed Tasks",
        };
      } else if (action.payload.showNotCompleted) {
        state = {
          ...state,
          filterMessage: "Results for Not Completed Tasks",
        };
      } else if (action.payload.showCompleted) {
        state = {
          ...state,
          filterMessage: "Results for Completed Tasks",
        };
      } else {
        state = {
          ...state,
          filterMessage: "",
        };
      }
      console.log("These are my filterd by status",state)
      return state;
    },

    setFilterByDate(
      state,
      action: PayloadAction<{
        date: { selection: { startDate: Date; endDate: Date } };
        searchTerm: string;
        showCompleted: boolean;
        showNotCompleted: boolean;
      }>
    ) {
      const { date, searchTerm, showCompleted, showNotCompleted } =
        action.payload;

      state = {
        ...state,
        filteredTask: state.totalTask.filter((task) => {
          const taskDate = task.date?.split("T")[0];
          const withinRange =
            task.date?.split("T")[0] >= formatDate(date.selection.startDate) &&
            taskDate <= formatDate(date.selection.endDate);
          const singleDay =
            taskDate.toDateString === date.selection.startDate.toDateString;
          return (
            (withinRange || singleDay) &&
            task.task_description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) &&
            ((showCompleted && task.task_status) ||
              (showNotCompleted && !task.task_status) ||
              (!showCompleted && !showNotCompleted))
          );
        }),
      };

      console.log("Filter Task output", state);

      return state;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
