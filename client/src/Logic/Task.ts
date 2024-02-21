import {
  useGetAllTasksQuery,
  useDeleteTaskByIdMutation,
} from "../store/fetures/task-api";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../store/task-slice";
import { Task } from "../pages/ViewTask";

const useTaskData = (userId: string) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetAllTasksQuery(userId);

  dispatch(taskActions.setTasks(data?.tasksToTheUser || []));
  // dispatch(taskActions.filterTaskDueDate("2024-02-20"));

  console.log("values from RTK respond", data?.tasksToTheUser);

  // const taskFromRedux:Task[] = useSelector((state)=>{state.task.t})

  return {
    values: data,
    isLoading,
    error,
  };
};

export default useTaskData;
