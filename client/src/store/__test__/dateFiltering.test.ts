import { PayloadAction } from '@reduxjs/toolkit';
import taskSlice, { TasksState, taskActions } from '../task-slice';

describe('Date Filtering Reducer', () => {
  let initialState: TasksState;

  beforeEach(() => {
    initialState = {
      totalTask: [],
      filteredTask: [],
      filterMessage: '',
      overdueTasks: [],
    };
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

