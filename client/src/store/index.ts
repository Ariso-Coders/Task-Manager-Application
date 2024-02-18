import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user-slice";
import taskSlice, { TaskState } from "./task-slice";
import { taskApi } from "./fetures/task-api";

export interface RootState {
  user: UserState;
  task: TaskState;
  [taskApi.reducerPath]: typeof taskApi.reducer;
}

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    task: taskSlice.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export default store;
