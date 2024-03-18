import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskApi, useGetAllTasksQuery } from "./fetures/task-api";
import { formatDate } from "../utils/Functions";
import { compareDates } from "../utils/Functions";
import { Task } from "../pages/Task";

import { RootState } from "./index";
import axios from "axios";
// const axios = require("axios");

interface overdueInterface {
  overdueLogic: boolean | any;
  overdueTaskCount: number | any;
}

export interface TasksState {
  totalTask: Task[];
  filteredTask: Task[];
  filterMessage: string;
  overdueTasks: Task[];
  taskPageNumber: number;
}

export interface filterTaskStaus {
  searchTerm: string;
  showCompleted: boolean;
  showNotCompleted: boolean;
}

const initialState: TasksState = {
  totalTask: [],
  filteredTask: [],
  filterMessage: "",
  overdueTasks: [],
  taskPageNumber: 1,
};

interface GetTasksRequest {
  userId: string;
  pageNumber: number;
}

export const fetchTask = createAsyncThunk<Task[], GetTasksRequest>(
  "tasks/fetchTask",
  async ({ userId, pageNumber }: GetTasksRequest, thunkAPI) => {
    const token = localStorage.getItem("userToken");
    console.log("fetch task executed");
    const state = thunkAPI.getState() as RootState;
    const response = await axios.get(
      `http://localhost:8080/task/tasks/${userId}?pageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: "Bearer" + token,
        },
      }
    );

    console.log("fetchtask response", response);
    if (response.data.tasksToTheUser) {
      return response.data.tasksToTheUser;
    }
    console.log("get fethTask executed");

    return [];
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state = {
        ...state,
        totalTask: action.payload,
      };
      return state;
    },
    setTaskPageNumber(state, action: PayloadAction<number>) {
      state = { ...state, taskPageNumber: action.payload };

      return state;
    },

    filterTaskDueDate(state) {
      state = {
        ...state,
        filteredTask: state.totalTask.filter(
          (task) =>
            compareDates(task.date.split("T")[0], formatDate(new Date())) &&
            task.task_status === false
        ),
      };
      return state;
    },
    setFilterByStatus(state, action: PayloadAction<filterTaskStaus>) {
      state = {
        ...state,
        filteredTask: state.totalTask.filter(
          (task) =>
            task.task_description
              .toLowerCase()
              .includes(action.payload.searchTerm.toLowerCase()) &&
            ((action.payload.showCompleted && task.task_status) ||
              (action.payload.showNotCompleted && !task.task_status) ||
              (!action.payload.showCompleted &&
                !action.payload.showNotCompleted))
        ),
      };
      if (action.payload.showCompleted && action.payload.showNotCompleted) {
        state = {
          ...state,
          filterMessage: "Results for Both Completed & Not Completed Tasks",
        };
      } else if (action.payload.showNotCompleted) {
        state = {
          ...state,
          filterMessage: "Results for Not Completed Tasks",
        };
      } else if (action.payload.showCompleted) {
        state = {
          ...state,
          filterMessage: "Results for Completed Tasks",
        };
      } else {
        state = {
          ...state,
          filterMessage: "",
        };
      }

      return state;
    },

    setFilterByDate(
      state,
      action: PayloadAction<{
        date: { selection: { startDate: string; endDate: string } };
        searchTerm: string;
        showCompleted: boolean;
        showNotCompleted: boolean;
      }>
    ) {
      const { date, searchTerm, showCompleted, showNotCompleted } =
        action.payload;
      const filteredTasks = state.totalTask.filter((task) => {
        const taskDate = new Date(task.date?.split("T")[0]);
        const newStartDate = new Date(date.selection.startDate);
        const newEndDate = new Date(date.selection.endDate);
        newStartDate.setDate(newStartDate.getDate() + 1);
        newEndDate.setDate(newEndDate.getDate() + 1);
        const withinRange =
          taskDate >= new Date(date.selection.startDate) &&
          taskDate <= newEndDate;
        const singleDay = taskDate === newStartDate;
        console.log("singleDay", singleDay);
        return (
          (withinRange || singleDay) &&
          task.task_description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          ((showCompleted && task.task_status) ||
            (showNotCompleted && !task.task_status) ||
            (!showCompleted && !showNotCompleted))
        );
      });
      const newStartDate = new Date(date.selection.startDate);
      const newEndDate = new Date(date.selection.endDate);
      newStartDate.setDate(newStartDate.getDate() + 1);
      newEndDate.setDate(newEndDate.getDate() + 1);
      state = {
        ...state,
        filteredTask: filteredTasks,
        filterMessage:
          filteredTasks.length > 0
            ? `Results for tasks between ${
                newStartDate.toISOString().split("T")[0]
              } and ${newEndDate.toISOString().split("T")[0]}`
            : "No tasks available for the selected date range",
      };

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      console.log("add case worked");
      state.totalTask = action.payload;
      console.log("extra reducer output", state.totalTask);
      return state;
    });

    builder.addMatcher(
      taskApi.endpoints.getAllTasks.matchFulfilled,
      (state, { payload }) => {
        console.log("extra reducer worked");
        state = {
          ...state,
          totalTask: payload.tasksToTheUser,
          overdueTasks: payload.tasksToTheUser.filter(
            (task) =>
              compareDates(
                task.date.split("T")[0].trim(),
                formatDate(new Date())
              ) && task.task_status === false
          ),
        };
        console.log("extra reducer values", state.totalTask);
        return state;
      }
    );
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
