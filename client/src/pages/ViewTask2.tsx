import { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
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





const ViewTask2 = () => {

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
    const tasksPerPage = 4;
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = taskValues.filteredTask.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(taskValues.filteredTask.length / tasksPerPage);

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
        const startDate=new Date(date.selection.startDate).toISOString()
        const endDate=new Date(date.selection.endDate).toISOString()
        dispatch(
            taskActions.setFilterByDate({
                date: { selection: { endDate: endDate, startDate:startDate } },
                searchTerm: searchTerm,
                showCompleted: showCompleted,
                showNotCompleted: showNotCompleted,
            })
        );
        setSelectStartDate(date.selection.startDate);
        setSelectEndDate(date.selection.endDate);

    };


    const handleRadioChange = (taskId: string, status: boolean) => {
        setSelectedTask({ id: taskId, status });
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

    useEffect(() => {

        dispatch(taskActions.setFilterByStatus({ searchTerm: searchTerm, showCompleted: showCompleted, showNotCompleted: showNotCompleted }));
        // dispatch(taskActions.filterTaskDueDate());
        console.log("called")
        console.log("redux store after status filter", taskValues)



    }, [showCompleted, showNotCompleted, searchTerm])

    //   return (
    //     <div> </div>
    //   )



    return (
        <div className="w-full min-h-screen flex flex-col justify-start px-3 gap-20 pb-10">
            <div className="w-full">
                <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 mt-view_task_4  md:ml-4xl items-center ">
                    <input
                        placeholder="Search For Task"
                        className="w-2/3 md:w-3/4 border border-gray p-view_task_1 rounded-md mb-4 md:mb-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="relative">
                        <FaFilter
                            className="text-4xl hover:cursor-pointer"
                            onClick={() => { setFilterMenuOpen((prev) => !prev); }}
                        />
                    </div>
                    <MdLogout
                        className="text-5xl hover:cursor-pointer"
                        onClick={() => { setLogouErrorLogic(true); }}
                    />
                </div>
                <div className=" w-full flex flex-col md:flex-row mt-4  gap-4 md:gap-8 items-center ">
                    <h1 className="font-bold text-3xl mb-4 ml-60 md:mb-0 	text-transform:capitalize " onClick={() => { window.location.reload() }}>
                        <span className="hover:underline" onClick={() => { window.location.reload() }}>
                            {`You have got ${taskValues.totalTask.length} tasks `}  </span>
                        {taskValues.overdueTasks.length > 0 && (
                            <span
                                className="text-over_due hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    dispatch(taskActions.filterTaskDueDate())
                                }}
                            >
                                And You Have {taskValues.overdueTasks.length} Overdue{" "}
                                {taskValues.overdueTasks.length > 1 ? "Tasks" : "Task"}
                            </span>
                        )}{" "}
                    </h1>
                    <button
                        className="text-xl bg-view_task_main_color  px-2 py-2 rounded-md text-view_task_white font-bold flex items-center justify-center hover:bg-green "
                        onClick={() => {

                            setTaskOverLayLogic(true);
                        }}
                    >
                        <IoAddSharp className="size-8" />
                        <span className="">Add</span>
                    </button>
                </div>
            </div>
            <div className="w-full items-start justify-center px-20 -mb-5 md:gap-8 ">
                <h2 className="text-2xl font-bold text-blue">{taskValues.filterMessage}</h2>
                {/* <h2 className="text-2xl font-bold text-blue">{taskValues.filterMessage}</h2> */}
                {/*Need extra look  {filterDateMessage} */}
            </div>
            <div className="w-full flex items-start justify-center  px-20  h-view_task_13  ">
                <div className="w-full ">
                    <div className="text-xl w-full flex flex-col justify-center gap-4 ">
                        {!(taskValues.filteredTask.length > 0) && (taskValues.totalTask.map((task: Task) => (
                            <div
                                key={task._id}
                                className=" w-full flex items-center hover:bg-task_hover px-5  py-2 hover:cursor-pointer "
                            >
                                <div className="  flex-1 	text-transform: capitalize  text-left overflow-hidden">

                                    {task.task_description}
                                </div>
                                <div className="  flex-1 text-left">

                                    {task.date.split("T")[0]}
                                </div>

                                <div className="w-view_task_6  flex-1 flex justify-start ">

                                    <button
                                        onClick={() => {

                                            setDeleteErroLogic({ ...deleteErroLogic, delete: true });

                                            setTaskIdToDelete(task._id)

                                        }}
                                        className="w-10 text-view_task_4 bg-view_task_main_color rounded-md text-view_task_white p-view_task_1 hover:bg-over_due"
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                                <div className=" flex-1 flex justify-start  ">

                                    <label className="flex items-center ">
                                        <span className="">Mark as Complete</span>
                                        <span>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                                                onChange={() => {
                                                    // handleRadioChange()
                                                    setSelectedTask({ id: task._id.trim(), status: !task.task_status })
                                                    console.log("onchaged", task._id, task.task_status)
                                                }


                                                }
                                                checked={
                                                    task.task_status ||
                                                    (selectedTask?.id.trim() === task._id.trim() &&
                                                        selectedTask?.status)


                                                }
                                                disabled={editMode !== task._id}
                                            />
                                        </span>
                                    </label>
                                </div>
                                <div className="  flex-1">
                                    {" "}

                                    {!editMode || editMode !== task._id ? (
                                        <button
                                            className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-view_task_10 hover:bg-opacity-75"
                                            onClick={() => {
                                                setEditMode((prev) => (prev === task._id ? null : task._id));
                                            }}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex">
                                            <button
                                                className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-view_task_10 hover:bg-opacity-75"
                                                onClick={() => window.location.reload()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-2 hover:bg-opacity-75"
                                                onClick={handleSaveClick}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )))}
                        {(taskValues.filteredTask.length > 0) && (taskValues.filteredTask.map((task: Task) => (
                            <div
                                key={task._id}
                                className=" w-full flex items-center hover:bg-task_hover px-5  py-2 hover:cursor-pointer "
                            >
                                <div className="  flex-1 	text-transform: capitalize  text-left overflow-hidden">

                                    {task.task_description}
                                </div>
                                <div className="  flex-1 text-left">

                                    {task.date.split("T")[0]}
                                </div>

                                <div className="w-view_task_6  flex-1 flex justify-start ">

                                    <button
                                        onClick={() => {

                                            setDeleteErroLogic({ ...deleteErroLogic, delete: true });

                                            setTaskIdToDelete(task._id)

                                        }}
                                        className="w-10 text-view_task_4 bg-view_task_main_color rounded-md text-view_task_white p-view_task_1 hover:bg-over_due"
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                                <div className=" flex-1 flex justify-start  ">

                                    <label className="flex items-center ">
                                        <span className="">Mark as Complete</span>
                                        <span>
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                                                onChange={() => {
                                                    // handleRadioChange()
                                                    setSelectedTask({ id: task._id.trim(), status: !task.task_status })
                                                    console.log("onchaged", task._id, task.task_status)
                                                }


                                                }
                                                checked={
                                                    task.task_status ||
                                                    (selectedTask?.id.trim() === task._id.trim() &&
                                                        selectedTask?.status)


                                                }
                                                disabled={editMode !== task._id}
                                            />
                                        </span>
                                    </label>
                                </div>
                                <div className="  flex-1">
                                    {" "}

                                    {!editMode || editMode !== task._id ? (
                                        <button
                                            className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-view_task_10 hover:bg-opacity-75"
                                            onClick={() => {
                                                setEditMode((prev) => (prev === task._id ? null : task._id));
                                            }}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex">
                                            <button
                                                className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-view_task_10 hover:bg-opacity-75"
                                                onClick={() => window.location.reload()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-2 hover:bg-opacity-75"
                                                onClick={handleSaveClick}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )))}
                    </div>
                </div>

                {deleteErroLogic.delete && (
                    <ErrorCard
                        fn={handleDeleteErrorCardClick}
                        details={{
                            message: "Do you want to  Delete this task ?",
                            btn1: [true, "Yes"],
                            btn2: [true, "No"],
                        }}
                    />
                )}
                {logoutErroLogic && (
                    <ErrorCard
                        fn={handleLogoutErrorCardClick}
                        details={{
                            message: "Are you sure you want to log out?",
                            btn1: [true, "Yes"],
                            btn2: [true, "No"],
                        }}
                    />
                )}

                {isFilterMenuOpen && (
                    <div className="absolute top-20 right-10 bg-purple px-5 py-10 rounded-md">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-4">
                                <p className="mr-2">Filter by:</p>
                                <div className="flex">
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-500"
                                            checked={showCompleted}
                                            onChange={() => setShowCompleted(!showCompleted)}
                                        />
                                        <span className="ml-2">Completed</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-500"
                                            checked={showNotCompleted}
                                            onChange={() => setShowNotCompleted(!showNotCompleted)}
                                        />
                                        <span className="ml-2">Not Completed</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="mr-2">Date:</p>
                                <div>
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        onChange={handleDateRange}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => {

                            setCurrentPage(index + 1)
                        }}
                        className={` text-blue text-2xl mx-2 px-3 py-1 ${currentPage === index + 1 ? "bg-gray-300" : "bg-gray-100"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {taskOverLayLogic && <TaskOverlay onCancelClick={taskOVerLayHandler} />}
        </div>
    );
};

export default ViewTask2;