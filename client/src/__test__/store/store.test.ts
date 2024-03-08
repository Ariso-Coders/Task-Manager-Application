import { PayloadAction } from "@reduxjs/toolkit";
import taskSlice, { TasksState, taskActions } from "../../store/task-slice";

describe("Task Slice", () => {
  let initialState: TasksState;

  beforeEach(() => {
    initialState = {
      totalTask: [],
      filteredTask: [],
      filterMessage: "",
      overdueTasks: [],
      taskPageNumber: 1,
    };
  });

  it("should be set tasks correctly", () => {
    const tasks = [
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "2",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec7",
      },
      {
        date: "2024-03-22T00:00:00.000Z",
        task_description: "3",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },
    ];

    const action = taskActions.setTasks(tasks);
    const newState = taskSlice.reducer(initialState, action);
    expect(newState.totalTask).toEqual(tasks);
  });

  it("should set filter task by status", () => {
    const tasks = [
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "2",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec7",
      },
      {
        date: "2024-03-22T00:00:00.000Z",
        task_description: "3",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "4",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec8",
      },
      {
        date: "2024-03-22T00:00:00.000Z",
        task_description: "5",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eec9",
      },
    ];

    const action1 = taskActions.setTasks(tasks);
    const newState1 = taskSlice.reducer(initialState, action1);

    const action2 = taskActions.setFilterByStatus({
      searchTerm: "",
      showCompleted: false,
      showNotCompleted: true,
    });
    const newStateAfterFilterByStatus = taskSlice.reducer(newState1, action2);
    console.log("new taasks", newStateAfterFilterByStatus.filteredTask);
    expect(newStateAfterFilterByStatus).not.toBeNull();
    expect(newStateAfterFilterByStatus.filteredTask).toEqual([
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "2",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec7",
      },
      {
        date: "2024-03-22T00:00:00.000Z",
        task_description: "3",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },

      {
        date: "2024-03-22T00:00:00.000Z",
        task_description: "5",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eec9",
      },
    ]);
  });


  it('should filter tasks by date range correctly', () => {
    const actionPayload: PayloadAction<{
      date: { selection: { startDate: string; endDate: string } };
      searchTerm: string;
      showCompleted: boolean;
      showNotCompleted: boolean;
    }> = {
      type: 'task/setFilterByDate',
      payload: {
        date: {
          selection: {
            startDate: '2024-03-01T00:00:00Z',
            endDate: '2024-03-10T23:59:59Z',
          },
        },
        searchTerm: 'example search term',
        showCompleted: true,
        showNotCompleted: true,
      },
    };

    const newState = taskSlice.reducer(initialState, actionPayload);

    const dummyTasks = [
      {
        _id: '1',
        task_description: 'Task 1',
        task_status: true,
        date: '2024-03-05T00:00:00Z',
      },
      {
        _id: '2',
        task_description: 'Task 2',
        task_status: false,
        date: '2024-03-08T00:00:00Z',
      },
    ];

    const expectedFilteredTasks = dummyTasks.filter((task) => {
      const taskDate = new Date(task.date.split('T')[0]);
      const startDate = new Date(actionPayload.payload.date.selection.startDate);
      const endDate = new Date(actionPayload.payload.date.selection.endDate);
    });

    expect(newState.filteredTask).toEqual(expectedFilteredTasks);
  });


});
