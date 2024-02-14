import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface TaskState {
    userID: string | null;
    date: Date | null;
    task_description: string | null;
    task_status: boolean | null;
}
const initialState: TaskState[] = [];
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskState[]>) {
        return action.payload;
    },
  },
});
export const taskActions = taskSlice.actions;
export default taskSlice;