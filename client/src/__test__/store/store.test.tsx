import { PayloadAction } from "@reduxjs/toolkit";
import taskSlice, { TasksState, taskActions } from "../../store/task-slice";
import { initial } from "lodash";


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

  describe("filter task by status", () => {
    it("should set filter task by status by showNotcompleted ", () => {
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
      expect(newStateAfterFilterByStatus).not.toBeNull();
      expect(newStateAfterFilterByStatus.filterMessage).toEqual(
        "Results for Not Completed Tasks"
      );
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
    it("should set filter task by status by showcompleted ", () => {
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
          task_status: true,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af8371fbf1d8b053eec9",
        },
      ];

      const action1 = taskActions.setTasks(tasks);
      const newState1 = taskSlice.reducer(initialState, action1);

      const action2 = taskActions.setFilterByStatus({
        searchTerm: "",
        showCompleted: true,
        showNotCompleted: false,
      });
      const newStateAfterFilterByStatus = taskSlice.reducer(newState1, action2);
      expect(newStateAfterFilterByStatus).not.toBeNull();
      expect(newStateAfterFilterByStatus.filterMessage).toEqual(
        "Results for Completed Tasks"
      );
      expect(newStateAfterFilterByStatus.filteredTask).toEqual([
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
          task_status: true,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af8371fbf1d8b053eec9",
        },
      ]);
    });
    it("should set filter task by status by showcompleted and showcomplete ", () => {
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
          task_status: true,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af8371fbf1d8b053eec9",
        },
      ];

      const action1 = taskActions.setTasks(tasks);
      const newState1 = taskSlice.reducer(initialState, action1);

      const action2 = taskActions.setFilterByStatus({
        searchTerm: "",
        showCompleted: true,
        showNotCompleted: true,
      });
      const newStateAfterFilterByStatus = taskSlice.reducer(newState1, action2);
      expect(newStateAfterFilterByStatus).not.toBeNull();
      expect(newStateAfterFilterByStatus.filterMessage).toEqual(
        "Results for Both Completed & Not Completed Tasks"
      );
      expect(newStateAfterFilterByStatus.filteredTask).toEqual(tasks);
    });
  });
describe("filter task by date",()=>{
  let tasks = [
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
      task_status: false,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af8371fbf1d8b053eeca",
    },
    {
      date: "2024-04-22T00:00:00.000Z",
      task_description: "4",
      task_status: false,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af7e71fbf1d8b053eec8",
    },
    {
      date: "2024-04-25T00:00:00.000Z",
      task_description: "40",
      task_status: true,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af7e71fbf1d8b053eec8",
    },
    {
      date: "2024-04-30T00:00:00.000Z",
      task_description: "5",
      task_status: false,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af8371fbf1d8b053eec9",
    }, 
    {
      date: "2024-03-21T00:00:00.000Z",
      task_description: "6",
      task_status: false,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af8371fbf1d8b053eeca",
    },
  ];

  it("should filter task by date that are not completed", () => {
    const action1 = taskActions.setTasks(tasks);
    const newState1 = taskSlice.reducer(initialState, action1);

    const action2 = taskActions.setFilterByDate({
      date: { selection: { startDate: "2024-03-18", endDate: "2024-04-26" } },
      searchTerm: "",
      showCompleted: false,
      showNotCompleted: true,
    });

    const newState2 = taskSlice.reducer(newState1, action2);
    expect(newState2.filteredTask).not.toBeNull();
    expect(newState2.filteredTask).toEqual([
  
      {
        date: "2024-03-22T00:00:00.000Z",
        task_description: "3",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },

      {
        date: "2024-04-22T00:00:00.000Z",
        task_description: "4",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec8",
      },
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "6",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },
    ]);
    console.log("redux store after date filter", newState2);
  });

  it("should filter task by date that are completed", () => {
  
    const action1 = taskActions.setTasks(tasks);
    const newState1 = taskSlice.reducer(initialState, action1);

    const action2 = taskActions.setFilterByDate({
      date: { selection: { startDate: "2024-03-21", endDate: "2024-04-26" } },
      searchTerm: "",
      showCompleted: true,
      showNotCompleted: false,
    });

    const newState2 = taskSlice.reducer(newState1, action2);
    expect(newState2.filteredTask).not.toBeNull();
    expect(newState2.filteredTask).toEqual([
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "2",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec7",
      },
      {
        date: "2024-04-25T00:00:00.000Z",
        task_description: "40",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec8",
      },
    ]);
    console.log("redux store after date filter", newState2);
  });

  it("should filter tasks by a single date",() => {
    const dummySingleDate=[
      {
      date: "2024-03-21T00:00:00.000Z",
      task_description: "5",
      task_status: false,
      userID: "65c73f02e32fc26d22101e27",
      __v: 0,
      _id: "65e5af8371fbf1d8b053eec9",
    }, 
    {
      date: "2024-03-21T00:00:00.000Z",
      task_description: "6",
      task_status: true,
      userID: "65c73f02e32fc26d22101e27", 
      __v: 0,
      _id: "65e5af8371fbf1d8b053eeca",
    },
  ]
    const action1 = taskActions.setTasks(dummySingleDate);
    const newState1 = taskSlice.reducer(initialState, action1);

    const action2 = taskActions.setFilterByDate({
      date: { selection: { startDate: "2024-03-21", endDate: "2024-03-21" } },
      searchTerm: "",
      showCompleted: true,
      showNotCompleted: true,
    });

    const newState2 = taskSlice.reducer(newState1, action2);
    expect(newState2.filteredTask).toEqual([
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "5",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eec9",
      }, 
      {
        date: "2024-03-21T00:00:00.000Z",
        task_description: "6",
        task_status: true,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },
    ]);
  });
})


  describe("filter overduetasks", () => {
    it("should filter taskoverdue", () => {
      const tasks = [
        {
          date: "2024-03-01T00:00:00.000Z",
          task_description: "2",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af7e71fbf1d8b053eec7",
        },
        {
          date: "2024-03-02T00:00:00.000Z",
          task_description: "3",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af8371fbf1d8b053eeca",
        },
        {
          date: "2024-03-06T00:00:00.000Z",
          task_description: "4",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af7e71fbf1d8b053eec8",
        },
        {
          date: "2024-03-20T00:00:00.000Z",
          task_description: "5",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af8371fbf1d8b053eec9",
        },
      ];

      const action1 = taskActions.setTasks(tasks);
      const newState1 = taskSlice.reducer(initialState, action1);

      const action2 = taskActions.filterTaskDueDate();
      const newState2 = taskSlice.reducer(newState1, action2);

      expect(newState2).not.toBeNull();

      expect(newState2.filteredTask).toEqual([
        {
          date: "2024-03-01T00:00:00.000Z",
          task_description: "2",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af7e71fbf1d8b053eec7",
        },
        {
          date: "2024-03-02T00:00:00.000Z",
          task_description: "3",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af8371fbf1d8b053eeca",
        },
        {
          date: "2024-03-06T00:00:00.000Z",
          task_description: "4",
          task_status: false,
          userID: "65c73f02e32fc26d22101e27",
          __v: 0,
          _id: "65e5af7e71fbf1d8b053eec8",
        },
      ]);
    });
  });

  it("should set 0 overduetasks", () => {
    const tasks = [
      {
        date: "2050-03-20T00:00:00.000Z",
        task_description: "2",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec7",
      },
      {
        date: "2050-03-30T00:00:00.000Z",
        task_description: "3",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eeca",
      },
      {
        date: "2050-04-06T00:00:00.000Z",
        task_description: "4",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af7e71fbf1d8b053eec8",
      },
      {
        date: "2050-09-20T00:00:00.000Z",
        task_description: "5",
        task_status: false,
        userID: "65c73f02e32fc26d22101e27",
        __v: 0,
        _id: "65e5af8371fbf1d8b053eec9",
      },
    ];

    const action1 = taskActions.setTasks(tasks);
    const newState1 = taskSlice.reducer(initialState, action1);

    const action2 = taskActions.filterTaskDueDate();
    const newState2 = taskSlice.reducer(newState1, action2);

    expect(newState2.filteredTask).toEqual([]);
  });
});
