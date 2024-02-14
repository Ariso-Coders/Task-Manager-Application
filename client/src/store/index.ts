import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "./user-slice";

export interface RootState {
  user: UserState;
}

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
