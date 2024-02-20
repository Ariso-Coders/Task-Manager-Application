// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// export interface TaskState {
//   userID: string | null;
//   date: String | null;
//   task_description: string | null;
//   task_status: boolean | null;
//   _v?: number | any;
//   _id?: string;
// }

// export interface Tasks {
//   totalTask: TaskState[];
//   filterdTask: TaskState[];
// }
// const initialState: Tasks = { totalTask: [], filterdTask: [] };
// const taskSlice = createSlice({
//   name: "task",
//   initialState,
  
//   reducers: {
//     setTasks(state, action: PayloadAction<TaskState[]>) {
//       console.log("values came to set", action.payload);
//       state = {
//         ...state,
//         totalTask: action.payload,
//       };

//       console.log(
//         "state in redux",state
//       );

//       return state;
//     },

//     filterTaskDueDate(state, action: PayloadAction<string>) {
      
//       console.log(
//         "filterTaskDueDate state",
//         state.totalTask.map((task) => task.task_description)
//       );
      
//     },
//   },
// });
// export const taskActions = taskSlice.actions;
// export default taskSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../pages/ViewTask";
import { formatDate } from "../utils/OverdueCheck";

export interface TaskState {
  userID: string | null;
  date: string |any;
  task_description: string | null;
  task_status: boolean | null;
}

export interface TasksState {
  totalTask: TaskState[];
  filteredTask: TaskState[];
}

const initialState: TasksState = {
  totalTask: [],
  filteredTask: [],
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
      
            console.log(
              "state in redux",state
            );
      
            return state;
          },
    setFilterByStatus(
      state,
      action: PayloadAction<{
        date: { selection: { startDate: Date; endDate: Date } };
        searchTerm: string;
        showCompleted: boolean;
        showNotCompleted: boolean;
      }>
    ) 
    {
      const { date, searchTerm, showCompleted, showNotCompleted } =
        action.payload;
        
        state = {...state,filteredTask:state.totalTask.filter((task) => {
          const taskDate = task.date?.split("T")[0]
          const withinRange = task.date?.split("T")[0] >= formatDate( date.selection.startDate) && taskDate <= formatDate(date.selection.endDate);
          const singleDay = taskDate.toDateString ===  date.selection.startDate.toDateString;
          return (
            (withinRange || singleDay) &&
            task.task_description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) && 
            ((showCompleted && task.task_status) ||
              (showNotCompleted && !task.task_status) ||
              (!showCompleted && !showNotCompleted))
          );
        }
        )};

        console.log("Filter Task output",state);

        return state;
      // state.filteredTask = state.totalTask.filter((task) => {
      //   const taskDate = task.date?.split("T")[0]
      //   const withinRange = task.date?.split("T")[0] >= formatDate( date.selection.startDate) && taskDate <= formatDate(date.selection.endDate);
      //   const singleDay = taskDate.toDateString ===  date.selection.startDate.toDateString;
      //   return (
      //     (withinRange || singleDay) &&
      //     task.task_description
      //       ?.toLowerCase()
      //       .includes(searchTerm.toLowerCase()) && 
      //     ((showCompleted && task.task_status) ||
      //       (showNotCompleted && !task.task_status) ||
      //       (!showCompleted && !showNotCompleted))
      //   );
      // }
      // );
     
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
