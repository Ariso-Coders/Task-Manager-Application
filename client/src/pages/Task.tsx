import { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import TaskOverlay from "../components/taskoverlay/TaskOverlay";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { UpdateTaskStatusResponse, useDeleteTaskByIdMutation, useGetAllTasksQuery, useUpdateTaskStatusMutation } from "../store/fetures/task-api";
import { useDispatch, useSelector } from "react-redux";
import { TasksState, taskActions } from "../store/task-slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FaSliders } from "react-icons/fa6";


export interface Task {
    _id: string;
    task_description: string;
    task_status: boolean;
    date: String;
}

interface updateTaskMutationResponse {
    data?: UpdateTaskStatusResponse

    error?: FetchBaseQueryError | SerializedError
}

interface ErroCardLogicState {
    delete: boolean | false;
    update: boolean | false;
}
interface MobileTaskStyleInterface {
    taskClass: string,
    cound: number
}





const Task = () => {


    const userId: string | any = localStorage.getItem("userId");
    const { data, isError } = useGetAllTasksQuery(userId); // calling API 
    const dispatch = useDispatch();

    const [updateTaskMutation] = useUpdateTaskStatusMutation();
    const [mutate, ,] = useDeleteTaskByIdMutation();

    let taskValues: TasksState;
    if (isError) {
        taskValues = {
            totalTask: [
                {
                    _id: "",
                    date: "",
                    task_description: "",
                    task_status: false
                }],
            filteredTask: [
                {
                    _id: "",
                    date: "",
                    task_description: "",
                    task_status: false
                }],
            filterMessage: "",
            overdueTasks: [
                {
                    _id: "",
                    date: "",
                    task_description: "",
                    task_status: false
                }
            ]
        };
    }
    taskValues = useSelector((state: RootState) => state.task);
    console.log("task values", taskValues)



    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;


    let currentTasks;
    if (taskValues.filteredTask.length === 0) {
        currentTasks = taskValues.totalTask.slice(
            indexOfFirstTask,
            indexOfLastTask
        );
    } else {
        currentTasks = taskValues.filteredTask.slice(
            indexOfFirstTask,
            indexOfLastTask
        );
    }

    const totalPages = Math.ceil(taskValues.totalTask.length / tasksPerPage);

    // state values

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
    const [logoutErroLogic, setLogouErrorLogic] = useState<boolean>(false);
    const [taskOverLayLogic, setTaskOverLayLogic] = useState<boolean>(false);
    const [deleteErroLogic, setDeleteErroLogic] = useState<ErroCardLogicState>({
        delete: false,
        update: true,
    });
    const [selectedTask, setSelectedTask] = useState<{
        id: string;
        status: boolean;
    } | null>(null);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showNotCompleted, setShowNotCompleted] = useState(false);
    const [startDate, setSelectStartDate] = useState(new Date());
    const [endDate, setSelectEndDate] = useState(new Date());
    const [mobileTaskStyleClass, setMobileTaskStyleClass] = useState<MobileTaskStyleInterface>({
        cound: 0,
        taskClass: ""
    });
    const navigation = useNavigate();

    // variables 

    const [taskIdToDelete, setTaskIdToDelete] = useState<string>("");
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };


    // functions 


    const handleSaveClick = () => {
        if (selectedTask) {

            updateTaskStatus(selectedTask.id, selectedTask.status);
            setSelectedTask(null);
            setEditMode(null);
        }
    };


    const updateTaskStatus = async (taskId: string, status: boolean) => {

        try {

            let updateTaskBackendRespond: updateTaskMutationResponse = await updateTaskMutation({ taskId: taskId, status: status })
            window.location.reload();

        } catch (error) {
            console.error("Error updating task status", error);
        }
    };


    const deleteTaskByIdFunction = async (taskId: string) => {
        try {

            let delteTaskBackendRespond = await mutate(taskId);

        } catch (err: any) {
            console.log("error of deleting task", err);
        }




    };


    const handleDateRange = (date: any) => {
        const startDate = new Date(date.selection.startDate).toISOString()
        const endDate = new Date(date.selection.endDate).toISOString()
        dispatch(
            taskActions.setFilterByDate({
                date: { selection: { endDate: endDate, startDate: startDate } },
                searchTerm: searchTerm,
                showCompleted: showCompleted,
                showNotCompleted: showNotCompleted,
            })
        );
        setSelectStartDate(date.selection.startDate);
        setSelectEndDate(date.selection.endDate);

    };


    const handleRadioChange = async (taskId: string, status: boolean) => {
        try {
            await updateTaskStatus(taskId, !status); // Invert the status when checkbox is clicked
        } catch (error) {
            console.error("Error updating task status", error);
        }
    };


    // error card handlers 

    const handleDeleteErrorCardClick = async (args: {
        btn1: boolean;
        btn2: boolean;
    }) => {
        if (args.btn1) {
            deleteTaskByIdFunction(taskIdToDelete);
            window.location.reload();
        } else {
            setDeleteErroLogic({ ...deleteErroLogic, delete: false });
        }
    };


    const handleLogoutErrorCardClick = async (args: {
        btn1: boolean;
        btn2: boolean;
    }) => {
        if (args.btn1) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userId");
            navigation("/");
        } else {
            setLogouErrorLogic(false);
        }
    };

    const taskOVerLayHandler = (value: boolean) => {
        setTaskOverLayLogic(value);
    };

    const mobileStyleClassHandler = (id: string): string => {
        if ((id === mobileTaskStyleClass.taskClass) && (mobileTaskStyleClass.cound % 2 !== 0)) {
            return `h-vh10 translate-y-0`
        } else {

            return ""
        }
    }

    useEffect(() => {

        dispatch(taskActions.setFilterByStatus({ searchTerm: searchTerm, showCompleted: showCompleted, showNotCompleted: showNotCompleted }));
        // dispatch(taskActions.filterTaskDueDate());
        console.log("called")
        console.log("redux store after status filter", taskValues)



    }, [showCompleted, showNotCompleted, searchTerm])




    return (
        <div className='w-full py-vh5  px-vw5 flex flex-col gap-vh5' >

            <section >

                <div className="w-full flex items-center justify-between  gap-vw3">
                    <input
                        placeholder="Search For Task"
                        className=" py-2 px-3 flex-1 border-2 rounded-sm border-gray-200 "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <FaSliders
                        className="text-3xl hover:cursor-pointer"
                        onClick={() => { setFilterMenuOpen((prev) => !prev); }}
                    />

                </div>
                overdue warning
            </section>

            <section className="w-full flex flex-col gap-vh4">
                <h1 className="capitalize font-bold text-xl">you have 4 tasks</h1>
                <div className="w-full flex justify-end">
                    <button className="px-vw5 rounded-sm  py-1 border-2 border-main_color hover:bg-main_color hover:text-white transition-all">ADD</button>
                </div>
                mapped tasks <br />
            </section>


        </div>
    )
}
export default Task;