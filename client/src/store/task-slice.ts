import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskApi } from "./fetures/task-api";
export interface TaskState {
  userID: string | null;
  date: String | null;
  task_description: string | null;
  task_status: boolean | null;
  _v?: number | any;
  _id?: string;
}

export interface Tasks {
  totalTask: TaskState[];
  filterdTask: TaskState[];
}
const initialState: Tasks = { totalTask: [], filterdTask: [] };
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

    filterTaskDueDate(state, action: PayloadAction<string>) {
      console.log("tasks in redux from filterTaskDueDate", state.totalTask);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      taskApi.endpoints.getAllTasks.matchFulfilled,
      (state, { payload }) => {
        state = { ...state, totalTask: payload.tasksToTheUser };
        console.log("output from extrareducers", state.totalTask);
        return state;
      }
    );
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
