import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../pages/ViewTask";
import { useSelector } from "react-redux";
export interface TaskState {
  userID: string | null;
  date: Date | null;
  task_description: string | null;
  task_status: boolean | null;
}


export interface Tasks {
  totalTask: TaskState[];
  filterdTask: TaskState[];
}
const initialState: Tasks[] = [];
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      return { ...state, totalTask: action.payload };
     
    },

    setFilterByStatus(state,action:PayloadAction<Task>){
     if(true){
      return {...state,filterdTask:action.payload}
     }

    }
  },
});
export const taskActions = taskSlice.actions;
export default taskSlice;
