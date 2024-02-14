import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user-slice";
import taskSlice,{TaskState} from "./task-slice";
export interface RootState {
  user: UserState;
  task:TaskState;
}
const store = configureStore({
  reducer: {
    user: userSlice.reducer,task:taskSlice.reducer
  },
});
export default store;










