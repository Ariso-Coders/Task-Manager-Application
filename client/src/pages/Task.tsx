import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import TaskOverlay from "../components/taskoverlay/TaskOverlay";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useDeleteTaskByIdMutation, useGetAllTasksQuery, useUpdateTaskStatusMutation } from "../store/fetures/task-api";
import { useDispatch, useSelector } from "react-redux";
import { TasksState, taskActions } from "../store/task-slice";
import { fetchTask } from "../store/task-slice";
import { RootState } from "../store";
import { FaSliders } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

export interface Task {
    _id: string;
    task_description: string;
    task_status: boolean;
    date: String | any;
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
    const [taskPageNumber, setTaskPageNumber] = useState<number>(1);
    let taskValues: TasksState;

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
        ],
        taskPageNumber: 0
    };

    taskValues = useSelector((state: RootState) => state.task);
    const { data, isError } = useGetAllTasksQuery({ userID: userId, pageNumber: taskValues.taskPageNumber }); // calling API 
    const dispatch = useDispatch();
    const [updateTaskMutation] = useUpdateTaskStatusMutation();
    const [mutate, ,] = useDeleteTaskByIdMutation();



    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
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

    if (taskValues.filteredTask.length != 0) {
        var noOfResults = taskValues.filteredTask.length;
    } else {
        var noOfResults = taskValues.totalTask.length;
    }
    if (currentTasks.length % tasksPerPage != 0) {
        var ofResults =
            tasksPerPage * currentPage -
            tasksPerPage +
            (currentTasks.length % tasksPerPage);
    } else {
        var ofResults = indexOfLastTask;
    }

    // state values

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
    const [logoutErroLogic, setLogouErrorLogic] = useState<boolean>(false);
    const [taskOverLayLogic, setTaskOverLayLogic] = useState<boolean>(false);
    const [deleteErroLogic, setDeleteErroLogic] = useState<ErroCardLogicState>({
        delete: false,
        update: true,
    });
    const [showCompleted, setShowCompleted] = useState(false);
    const [showNotCompleted, setShowNotCompleted] = useState(false);
    const [startDate, setSelectStartDate] = useState(new Date());
    const [endDate, setSelectEndDate] = useState(new Date());
    const navigation = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isAppear, setIsAppear] = useState(false);
    const [isTopic, setIsTopic] = useState(false);
    const handleCloseClick = () => {
        setIsVisible(false);
        setIsAppear(true);
    };

    // variables 

    const [taskIdToDelete, setTaskIdToDelete] = useState<string>("");
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    // functions 

    const updateTaskStatus = async (taskId: string, status: boolean) => {
        try {
            let updateTaskBackendRespond: any = await updateTaskMutation({ taskId: taskId, status: status, userId: userId })
            dispatch(taskActions.setTasks(updateTaskBackendRespond.data.tasks))

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
            await updateTaskStatus(taskId, !status);

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

    useEffect(() => {

        dispatch(taskActions.setFilterByStatus({ searchTerm: searchTerm, showCompleted: showCompleted, showNotCompleted: showNotCompleted }));

    }, [showCompleted, showNotCompleted, searchTerm, taskPageNumber])


    return (
        <div className='w-full py-vh5  px-vw5 flex flex-col gap-vh5' >
            <section className=" flex flex-col gap-vh5" >

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
                <div className="w-full flex gap-5 justify-center">
                    {taskValues.overdueTasks.length > 0 && isVisible && (
                        <span
                            className="text-white hover:underline hover:cursor-pointer relative transition-all bg-red-500 "
                            onClick={() => {
                                dispatch(taskActions.filterTaskDueDate());
                            }}
                        >
                            <div className="relative group flex">
                                <div className="w-full h-vh5 bg-over_due_background flex items-center justify-center gap-5 p-2 rounded ">
                                    <IoIosWarning className="text-2xl" />
                                    And You Have {taskValues.overdueTasks.length} Overdue{" "}
                                    {taskValues.overdueTasks.length > 1 ? "Tasks" : "Task"}
                                </div>
                                <button
                                    className="absolute z-10 -top-5 -right-2 m-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCloseClick();
                                    }}
                                >
                                    <IoIosCloseCircle className="text-red-600 text-xl relative left-3 transition-all hover:text-red-950" />
                                </button>
                            </div>
                        </span>
                    )}
                </div>
                {!isVisible && isAppear && (
                    <div className="flex items-center justify-center">
                        <button
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <IoIosWarning
                                className="text-2xl text-over_due"
                                onClick={() => {
                                    setIsAppear(false);
                                    dispatch(taskActions.filterTaskDueDate());
                                    setIsTopic(true);
                                }}
                            />
                            {isHovered && (
                                <div className={` absolute  bg-white p-1 rounded-md text-sm  transition-all hover:text-red-600`}>
                                    Click here to view tasks
                                </div>
                            )}
                        </button>
                    </div>
                )}
                {isTopic && <h1 className="capitalize font-bold text-xl text-red-700">You have {taskValues.overdueTasks.length} overdue tasks</h1>}
            </section>

            {isFilterMenuOpen && (
                <div className="sm:absolute top-vw10 lg:absolute right-10 bg-white px-1 py-1 rounded-md border-4 border-dark_purple">
                    <div className="flex flex-col">
                        <div className="flex justify-end">
                            <button onClick={() => { setFilterMenuOpen(false); }}>
                                <IoIosClose className="text-3xl hover:cursor-pointer" />
                            </button>
                        </div>
                        <div className="flex items-center mb-4">
                            <p className="mr-2 sm:text-sm">Filter by:</p>
                            <div className="flex">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-500"
                                        checked={showCompleted}
                                        onChange={() => setShowCompleted(!showCompleted)}
                                    />
                                    <span className="ml-2 sm:text-sm">Completed</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-500"
                                        checked={showNotCompleted}
                                        onChange={() => setShowNotCompleted(!showNotCompleted)}
                                    />
                                    <span className="ml-2 sm:text-sm">Not Completed</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="sm:rdrInputRange hidden sm:block lg:flex lg:mr-10">
                                <DateRangePicker
                                    ranges={[selectionRange]}
                                    onChange={handleDateRange}
                                    className="w-full hidden"
                                />
                            </div>
                            <div className="sm:rdrStaticRangeLabel w-1 lg:mr-10 sm:hidden">
                                <DateRangePicker
                                    ranges={[selectionRange]}
                                    onChange={handleDateRange}
                                    staticRanges={[]}
                                    inputRanges={[]}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-end px-4">
                            <button
                                className="bg-dark_purple text-white rounded-sm w-32 p-1.5"
                                onClick={() => window.location.reload()}
                            >
                                Clear Dates
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="w-full h-auto flex flex-col gap-vh4">
                {!isTopic && (<h1 className="capitalize font-bold text-xl">you have {taskValues.totalTask.length} tasks</h1>)}
                <div className="w-full flex justify-end">
                    <button className="px-vw5 rounded-sm  py-1 border-2 border-main_color hover:bg-main_color hover:text-white transition-all" onClick={() => {

                        setTaskOverLayLogic(true);
                    }} >ADD</button>
                </div>
                <h1 className="w-full text-green-600 text-left">{taskValues.filterMessage}</h1>
                <div className=" h-vh40 overflow-x-hidden overflow-y-scroll flex items-start justify-center border border-gray-200 py-vh4 px-vw3 rounded-md">
                    <table className="table-auto  w-full h-auto overflow-scroll ">
                        <thead>
                            <tr className=" text-left border-b h-vh5 border-b-gray-300 ">
                                <th>Task Name</th>
                                <th>Task Date</th>
                                <th>Task Status</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (currentTasks.length > 0) && (
                                    currentTasks.map((task: Task) => (

                                        <tr key={task._id} className="text-left border-b  border-gray-400 transition-all hover:bg-gray-100">
                                            <td className="">{task.task_description}</td>
                                            <td>{task.date.split("T")[0]}</td>
                                            <td> <span>
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                                                    onChange={() =>
                                                        handleRadioChange(task._id, task.task_status)
                                                    }
                                                    checked={task.task_status}
                                                />
                                            </span></td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setDeleteErroLogic({ ...deleteErroLogic, delete: true });
                                                        setTaskIdToDelete(task._id)
                                                    }}
                                                    className=" text-view_task_4  rounded-sm text-red-500 p-1 transition-all  hover:scale-150"
                                                >
                                                    <AiOutlineDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </section>
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
            {taskOverLayLogic && <TaskOverlay onCancelClick={taskOVerLayHandler} />}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 flex ">
                        Showing
                        <span className="font-medium mr-1 ml-1">
                            {tasksPerPage * currentPage - tasksPerPage + 1}
                        </span>
                        to
                        <span className="font-medium ml-1 mr-1">{ofResults}</span>
                        of
                        <span className="font-medium ml-1 mr-1">{noOfResults}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={() => {
                                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
                                if (taskValues.taskPageNumber > 1) {

                                    dispatch(taskActions.setTaskPageNumber(taskValues.taskPageNumber - 1))

                                }
                            }}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage((prevPage) =>
                                    Math.min(prevPage + 1, totalPages)
                                );
                                setTaskPageNumber(taskPageNumber + 1)
                                dispatch(taskActions.setTaskPageNumber(taskValues.taskPageNumber + 1));

                             
                               
                            }}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Task;