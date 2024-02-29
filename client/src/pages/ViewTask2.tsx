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
import {
  UpdateTaskStatusResponse,
  useDeleteTaskByIdMutation,
  useGetAllTasksQuery,
  useUpdateTaskStatusMutation,
} from "../store/fetures/task-api";
import { useDispatch, useSelector } from "react-redux";
import { TasksState, taskActions } from "../store/task-slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IoIosWarning } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

export interface Task {
  _id: string;
  task_description: string;
  task_status: boolean;
  date: String;
}

interface updateTaskMutationResponse {
  data?: UpdateTaskStatusResponse;

  error?: FetchBaseQueryError | SerializedError;
}

interface ErroCardLogicState {
  delete: boolean | false;
  update: boolean | false;
}
interface MobileTaskStyleInterface {
  taskClass: string;
  cound: number;
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
          task_status: false,
        },
      ],
      filteredTask: [
        {
          _id: "",
          date: "",
          task_description: "",
          task_status: false,
        },
      ],
      filterMessage: "",
      overdueTasks: [
        {
          _id: "",
          date: "",
          task_description: "",
          task_status: false,
        },
      ],
    };
  }
  taskValues = useSelector((state: RootState) => state.task);
  console.log("task values", taskValues);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
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
  const [mobileTaskStyleClass, setMobileTaskStyleClass] =
    useState<MobileTaskStyleInterface>({
      cound: 0,
      taskClass: "",
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
      let updateTaskBackendRespond: updateTaskMutationResponse =
        await updateTaskMutation({ taskId: taskId, status: status });
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
    const startDate = new Date(date.selection.startDate).toISOString();
    const endDate = new Date(date.selection.endDate).toISOString();
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

  // const handleRadioChange = (taskId: string, status: boolean) => {
  //   setSelectedTask({ id: taskId, status });
  // };

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
      localStorage.removeItem("userName");
      navigation("/");
    } else {
      setLogouErrorLogic(false);
    }
  };

  const taskOVerLayHandler = (value: boolean) => {
    setTaskOverLayLogic(value);
  };

  const mobileStyleClassHandler = (id: string): string => {
    if (
      id === mobileTaskStyleClass.taskClass &&
      mobileTaskStyleClass.cound % 2 !== 0
    ) {
      return `h-vh10 translate-y-0`;
    } else {
      return "";
    }
  };

  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAppear, setIsAppear] = useState(false);
  const [isTopic, setIsTopic] = useState(false);
  const handleCloseClick = () => {
    setIsVisible(false);
    setIsAppear(true);
    // Add any additional logic here
  };

  useEffect(() => {
    dispatch(
      taskActions.setFilterByStatus({
        searchTerm: searchTerm,
        showCompleted: showCompleted,
        showNotCompleted: showNotCompleted,
      })
    );
    // dispatch(taskActions.filterTaskDueDate());
    console.log("called");
    console.log("redux store after status filter", taskValues);
  }, [showCompleted, showNotCompleted, searchTerm]);

  const userName = localStorage.getItem("userName");

  return (
    <div className="w-full min-h-screen flex flex-col justify-start px-3 gap-10 pb-10 ">
      <div className="w-full ">
        <div className=" w-full mt-5 flex items-center justify-end gap-2">
          <h1 className=" w-full font-bold text-3xl text-center animate-bounce md:mb-0 capitalize ">
            Welcome Back To Task Manager, {userName}!
          </h1>
          <MdLogout
            className="text-3xl hover:cursor-pointer"
            onClick={() => {
              setLogouErrorLogic(true);
            }}
          />
        </div>
        <div className="w-full flex items-center gap-3 py-3 ">
          <input
            placeholder="Search For Task"
            className="w-3/4 py-2 px-3  border-2 rounded-sm border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoFilter
            className="text-3xl hover:cursor-pointer"
            onClick={() => {
              setFilterMenuOpen((prev) => !prev);
            }}
          />
        </div>
        <div className=" w-full flex flex-col md:flex-row mt-4 md:gap-8 items-end justify-center lg:px-vw2 ">
          <h1 className=" w-full font-bold text-xl text-center md:mb-0 capitalize ">
            <span
              className="hover:underline hover:cursor-pointer capitalize"
              onClick={() => {
                window.location.reload();
              }}
            >
              {`You have got ${taskValues.totalTask.length} tasks `}{" "}
            </span>
          </h1>
          <button
            className="text-sm  min-w-vw8 flex items-center justify-center gap-2 px-3 py-2 font-semibold uppercase text-white bg-green-400 transition-all "
            onClick={() => {
              setTaskOverLayLogic(true);
            }}
          >
            {" "}
            Add new
            <IoAddSharp className="size-4  text-white font-bold" />
            {/* <span className="">Add</span> */}
          </button>
        </div>
        <div className="w-full flex gap-5 justify-center">
          {taskValues.overdueTasks.length > 0 && isVisible && (
            <span
              className="text-over_due hover:underline hover:cursor-pointer relative"
              onClick={() => {
                dispatch(taskActions.filterTaskDueDate());
              }}
            >
              <div className="relative group">
                <div className="w-full h-vh5 bg-over_due_background flex items-center justify-center gap-5 p-2 rounded group-hover:pr-8">
                  <IoIosWarning className="text-2xl" />
                  And You Have {taskValues.overdueTasks.length} Overdue{" "}
                  {taskValues.overdueTasks.length > 1 ? "Tasks" : "Task"}
                </div>
                <button
                  className="absolute -top-5 -right-2 m-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from propagating to the outer span
                    handleCloseClick();
                  }}
                >
                  <IoIosCloseCircle className="text-over_due" />
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
                <div className="absolute bg-white p-1 rounded-md text-sm">
                  Click here to view tasks
                </div>
              )}
            </button>
          </div>
        )}
        {isTopic && <h1 className="text-black">Overdue Tasks</h1>}
      </div>
      <div className="w-full items-start justify-center px-20 -mb-5 md:gap-8 lg:px-vw2">
        <h2 className="text-2xl font-bold text-blue-600">
          {taskValues.filterMessage}
        </h2>
      </div>
      <div className="w-full h-auto flex items-start justify-center  px-1   text-sm lg:px-vw10 ">
        <div className="w-full">
          <div className=" w-full flex flex-col justify-center  ">
            <div className="w-full flex items-center  justify-between    h-vh10 z-10">
              <div className="text-transform:capitalize  text-left overflow-hidden  lg:basis-1/2">
                <h3>Task Name</h3>
              </div>
              <div className="text-left  lg:basis-1/2 flex items-center gap-4">
                <h3>Task Date</h3>
              </div>
              <div className="text-left  lg:basis-1/2 flex items-center gap-4">
                <h3>Task Satus</h3>
              </div>
              <div className="text-left  lg:basis-1/2 flex items-center gap-4">
                <h3>Task Delete Option</h3>
              </div>
              <div className="text-left  lg:basis-1/2 flex items-center gap-4">
                <h3>Task Edit Option</h3>
              </div>
            </div>
            {currentTasks.length > 0 &&
              currentTasks.map((task: Task) => (
                <div
                  key={task._id}
                  className=" w-full flex flex-col relative  lg:flex-row hover:bg-gray-100 lg:px-5"
                >
                  <div className="w-full flex items-center  justify-between    h-vh10 z-10">
                    <div className="text-transform:capitalize  text-left overflow-hidden  lg:basis-1/2">
                      {" "}
                      {/* 1*/}
                      {task.task_description}
                    </div>
                    <div className="text-left  lg:basis-1/2 flex items-center gap-4">
                      {" "}
                      {/* 2*/}
                      <span>{task.date.split("T")[0]}</span>
                      <div
                        className=" lg:hidden "
                        onClick={() => {
                          setMobileTaskStyleClass({
                            taskClass: task._id,
                            cound: mobileTaskStyleClass.cound + 1,
                          });
                        }}
                      >
                        <CiMenuKebab />
                      </div>
                    </div>

                    <div className=" justify-start  bg-pink lg:basis-1/2 hidden">
                      {" "}
                      {/* 3*/}
                      <label className="flex items-center ">
                        {/* <span className="">Mark as Complete</span> */}
                        <span>
                          {/* <input
                            type="checkbox"
                            className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                            onChange={() => {
                              // handleRadioChange()
                              setSelectedTask({
                                id: task._id.trim(),
                                status: !task.task_status,
                              });
                              console.log(
                                "onchaged",
                                task._id,
                                task.task_status
                              );
                            }}
                            checked={
                              task.task_status ||
                              (selectedTask?.id.trim() === task._id.trim() &&
                                selectedTask?.status)
                            }
                            disabled={editMode !== task._id}
                          /> */}
                          <input
                            type="checkbox"
                            className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                            onChange={() =>
                              handleRadioChange(task._id, task.task_status)
                            }
                            checked={task.task_status}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="    justify-start   lg:basis-1/5  hidden">
                      {" "}
                      {/* 4*/}
                      <button
                        onClick={() => {
                          setDeleteErroLogic({
                            ...deleteErroLogic,
                            delete: true,
                          });

                          setTaskIdToDelete(task._id);
                        }}
                        className="w-10 text-view_task_4 bg-view_task_main_color rounded-md text-view_task_white p-view_task_1 hover:bg-over_due"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                    <div className="  lg:basis-1/4 hidden">
                      {" "}
                      {/* 5*/}{" "}
                      {!editMode || editMode !== task._id ? (
                        <button
                          className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold hover:bg-opacity-75"
                          onClick={() => {
                            setEditMode((prev) =>
                              prev === task._id ? null : task._id
                            );
                          }}
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex ">
                          <button
                            className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold  hover:bg-opacity-75"
                            onClick={() => window.location.reload()}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold  hover:bg-opacity-75"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-full  h-0   -translate-y-vh10  transition-all flex items-center justify-between ${mobileStyleClassHandler(
                      task._id
                    )} lg:translate-y-0   lg:h-vh10`}
                  >
                    <div className={`   lg:basis-2/3`}>
                      {" "}
                      {/* 3*/}
                      <label className="flex items-center ">
                        <span className="">Mark as Complete</span>
                        <span>
                          {/* <input
                            type="checkbox"
                            className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                            onChange={() => {
                              setSelectedTask({
                                id: task._id.trim(),
                                status: !task.task_status,
                              });
                              console.log(
                                "onchaged",
                                task._id,
                                task.task_status
                              );
                            }}
                            checked={
                              task.task_status ||
                              (selectedTask?.id.trim() === task._id.trim() &&
                                selectedTask?.status)
                            }
                            disabled={editMode !== task._id}
                          /> */}
                          <input
                            type="checkbox"
                            className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                            onChange={() =>
                              handleRadioChange(task._id, task.task_status)
                            }
                            checked={task.task_status}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="   flex justify-start   lg:basis-1/3 ">
                      {" "}
                      {/* 4*/}
                      <button
                        onClick={() => {
                          setDeleteErroLogic({
                            ...deleteErroLogic,
                            delete: true,
                          });

                          setTaskIdToDelete(task._id);
                        }}
                        className=" text-view_task_4  rounded-sm text-red-500 p-1 transition-all  hover:scale-150"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                    {/* <div className="  lg:basis-1/3 ">
                      {" "}
                      {}{" "}
                      {!editMode || editMode !== task._id ? (
                        <button
                          className=" rounded-sm text-black bg-gray-300 py-1 px-2 transition-all hover:text-white hover:bg-gray-700"
                          onClick={() => {
                            setEditMode((prev) =>
                              prev === task._id ? null : task._id
                            );
                          }}
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex gap-2 ">
                          <button
                            className="rounded-sm text-black bg-gray-300 py-1 px-2 transition-all hover:text-white hover:bg-gray-700"
                            onClick={() => window.location.reload()}
                          >
                            Cancel
                          </button>
                          <button
                            className="rounded-sm text-black bg-green-300 py-1 px-2 transition-all hover:text-white hover:bg-green-700"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              ))}
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
              <div className="flex items-center w-1/4 bg-purple">
                <p className="mr-2">Date:</p>
                <div className="bg-black">
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleDateRange}
                    className="w-full"
                  />
                </div>
              </div>
              <button onClick={() => window.location.reload()}>
                Clear Dates
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
            className={` text-blue text-2xl mx-2 px-3 py-1 ${
              currentPage === index + 1 ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
      {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium">1</span>
              to
              <span className="font-medium">10</span>
              of
              <span className="font-medium">97</span>
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div> */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {tasksPerPage * currentPage - tasksPerPage + 1}
            </span>
            to
            <span className="font-medium">{tasksPerPage * currentPage}</span>
            of
            <span className="font-medium">{taskValues.totalTask.length}</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* {Array.from({ length: totalPages }, (_, index) => (
              <a
                key={index}
                href="#"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900"
                }`}
                onClick={() => {
                  setCurrentPage(index + 1);
                }}
              >
                {index + 1}
              </a>
            ))} */}
            <button
              onClick={() => {
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
              }}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              Previous
            </button>

            <button
              onClick={() => {
                setCurrentPage((prevPage) =>
                  Math.min(prevPage + 1, totalPages)
                );
              }}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      {taskOverLayLogic && <TaskOverlay onCancelClick={taskOVerLayHandler} />}
    </div>
  );
};

export default ViewTask2;
