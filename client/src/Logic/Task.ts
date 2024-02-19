import { useEffect } from "react";
import { Task } from '../pages/ViewTask';
import { useGetAllTasksQuery } from "../store/fetures/task-api";
import { useDispatch } from "react-redux";
import { taskActions } from "../store/task-slice";



const useTaskData = (userId:string)  =>{
    const dispatch = useDispatch();
    const  {data,isLoading,error}  = useGetAllTasksQuery(userId);
    dispatch(taskActions.setTasks(data ||[]));


    return {
        values:data,
        isLoading,
        error
    }
}

export default useTaskData;