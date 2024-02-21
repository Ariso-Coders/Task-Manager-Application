import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TaskState } from "../task-slice";
import { Task } from "../../pages/ViewTask";

export interface getAllTaskRTKInterface {
  tasksToTheUser: TaskState[];
}

export interface PostTaskRequestInterface {
  taskDate: Date | any;
  task: string | "";
  userId: string | "";
}
export interface PostTaskResponsetInterface {
  message: string | "";
  details?: Task | any;
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

    postTask: builder.mutation<
      PostTaskResponsetInterface,
      PostTaskRequestInterface
    >({
      query: (body) => ({
        url: `task/createTask`,
        method: `POST`,
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllTasksQuery,usePostTaskMutation,
  useGetTaskByIdQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskStatusMutation,
} = taskApi;
