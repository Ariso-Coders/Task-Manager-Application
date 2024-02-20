import {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Task } from "../../pages/ViewTask";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { TaskState } from "../task-slice";

export interface getAllTaskRTKInterface {
  tasksToTheUser:TaskState[]
}

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("userToken");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllTasks: builder.query<getAllTaskRTKInterface, string>({
      query: (userId) => `task/tasks/${userId}`,
      
    }),
  }),
});

export const { useGetAllTasksQuery } = taskApi;
