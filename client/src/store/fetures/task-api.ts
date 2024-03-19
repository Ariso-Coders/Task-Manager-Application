import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../pages/Task";
import { url } from "inspector";


export interface getAllTaskRTKInterface {
  tasksToTheUser: Task[];
}

export interface PostTaskRequestInterface {
  taskDate: Date | any;
  task: string | "";
  userId: string | "";
}
export interface PostTaskResponsetInterface {
  data: {
    details: Task;
    message: string | "";
  };
  error?: {
    data: {
      message: string | "";
    };
    status: number;
  };
}

export interface UpdateTaskStatusRequest {
  taskId: string;
  status: boolean;
  userId:string
}
export interface UpdateTaskStatusResponse {
  data?: { message?: string | "" ,tasks?:Task[]};
  // error?: {
  //   data: {
  //     message: string | "";
  //   };
  //   status: number;
  // };
}

export interface UpdateTaskStatusResponseError {
  error?: {
    data: {
      message: string | "";
    };
    status: number;
  };
}


interface LoginRequestInterface {
  email:string,
  password:string
}

interface SignupRequestInterface {
  email: string,
  name: string,
  dob: Date,
  password: string,
  confirmPassword: string,
}

export interface deleteTaskRTKInterface {
  message: string | "";
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
    getAllTasks: builder.query<
      getAllTaskRTKInterface,
      { userID: string; pageNumber: number }
    >({
      query: ({ userID, pageNumber }) =>
        `task/tasks/${userID}?pageNumber=${pageNumber}`,
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

    login:builder.mutation<LoginRequestInterface ,any>({
      query:(body) =>({
        url:`user/login`,
        method:"POST",
        body:body
      })
    }),
    
    signup:builder.mutation<SignupRequestInterface ,any>({
      query:(body) =>({
        url:`user/signup`,
        method:"POST",
        body:body
      })
    }),

    getTaskById: builder.query<Task, string>({
      query: (taskId) => `task/taskById/${taskId}`,
    }),

    updateTaskStatus: builder.mutation<
      UpdateTaskStatusResponse,
      UpdateTaskStatusRequest
    >({
      query: ({ taskId, status,userId }) => ({
        url: `task/tasks/${taskId}?userId=${userId}`,
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
  usePostTaskMutation,
  useGetTaskByIdQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskStatusMutation,
  useLoginMutation,
  useSignupMutation
} = taskApi;
