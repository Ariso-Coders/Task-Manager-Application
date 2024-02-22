import {
  useGetAllTasksQuery,
  usePostTaskMutation,
} from "../store/fetures/task-api";
import { useDispatch} from "react-redux";
import { taskActions } from "../store/task-slice";

const useTaskData = (userId: string) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetAllTasksQuery(userId);
  const [postTaskMutation, { isError }] = usePostTaskMutation();
  const handlerPostTask = async () => {
    try {
      await postTaskMutation({
        taskDate: new Date(),
        task: "RTK task",
        userId: "65c70d1370397cf307b38065",
      });
    } catch (error: any) {
      console.log("post task execute error", error);
    }
  };

  dispatch(taskActions.filterTaskDueDate());
  // console.log("values from RTK respond", data?.tasksToTheUser);

  // const taskFromRedux:Task[] = useSelector((state)=>{state.task.t})

  return {
    values: data,
    isLoading,
    error,
  };
};

export default useTaskData;
