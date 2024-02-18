import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../pages/ViewTask";

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
    getAllTasks: builder.query<Task[], string>({
      query: (taskId) => `task/tasks/${taskId}`,
    }),
  }),
});

export const {useGetAllTasksQuery}   = taskApi;
