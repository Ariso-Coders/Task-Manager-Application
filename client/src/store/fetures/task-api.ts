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

export interface deleteTaskRTKInterface{
  message: string | "",
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

    getTaskById: builder.query<Task, string>({
      query: (taskId) => `task/taskById/${taskId}`,
    }),

    updateTaskStatus: builder.mutation<
      Task,
      { taskId: string; status: boolean }
    >({
      query: ({ taskId, status }) => ({
        url: `task/tasks/${taskId}`,
        method: "PUT",
        body: { task_status: status },
      }),
    }),

    deleteTaskById: builder.mutation<deleteTaskRTKInterface, string>({
      query: (taskId) => ({
        url: `task/tasks/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskStatusMutation,
} = taskApi;
