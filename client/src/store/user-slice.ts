

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  token: string | null;
  userId: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // updateUser: (state, action: PayloadAction<UserState>) => {
    //   state.email = action.payload.email;
    //   state.token = action.payload.token;
    //   state.userId = action.payload.userId;
    // },

    updateUser: (state, action: PayloadAction<UserState>) => {
      console.log("values came to set", action.payload);
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
