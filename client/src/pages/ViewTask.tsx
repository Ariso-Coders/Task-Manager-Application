import React, { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import axios from "axios";
import TaskOverlay from "../components/taskoverlay/TaskOverlay";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { IsOverDue, isOverdue } from "../utils/OverdueCheck";
import { useGetAllTasksQuery } from "../store/fetures/task-api";
import { useDispatch, useSelector } from "react-redux";
// import { Tasks, taskActions } from "../store/task-slice";
import useTaskData from "../Logic/Task";
import { da } from "date-fns/locale";
import { taskActions } from "../store/task-slice";

export interface Task {
  _id: string;
  task_description: string;
  task_status: boolean;
  date: String;
}

interface ErroCardLogicState {
  delete: boolean | false;
  update: boolean | false;
}
const ViewTask = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userId: string | null = localStorage.getItem("userId");
  const userToken: string | null = localStorage.getItem("userToken");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [taskOverLayLogic, setTaskOverLayLogic] = useState<boolean>(false);
  const [deleteErroLogic, setDeleteErroLogic] = useState<ErroCardLogicState>({
    delete: false,
    update: true,
  });
  const [logoutErroLogic, setLogouErrorLogic] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<{
    id: string;
    status: boolean;
  } | null>(null);

  const [editMode, setEditMode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showNotCompleted, setShowNotCompleted] = useState(false);
  //const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, selectStartDate] = useState(new Date());
  const [endDate, selectEndDate] = useState(new Date());
  const [isOverDue, setIsOverdue] = useState<IsOverDue>({
    logic: false,
    values: [],
  });
  const [filterMessage, setFilterMessage] = useState<string>("");
  const [filterDateMessage, setFilterDateMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { values, error, isLoading } = useTaskData(
    localStorage.getItem("userId") || ""
  );

  

  // fetching and setting values to redux


  // dispatch(taskActions.filterTaskDueDate("2024-02-20"))

  function getValuesRedux(): void {}

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/task/tasks/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        const data = await response.json();
        setTasks(data.tasksToTheUser);
        setTaskCount(data.tasksToTheUser.length);
        setFilteredTasks(data.tasksToTheUser);
        setIsOverdue(isOverdue(data.tasksToTheUser));
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, [userId]);

  // dispatch(taskActions.setTasks({}))

  useEffect(() => {
    // Filter tasks based on search term and completion status
    const filtered = tasks.filter(
      (task) =>
        task.task_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        ((showCompleted && task.task_status) ||
          (showNotCompleted && !task.task_status) ||
          (!showCompleted && !showNotCompleted))
    );
    setFilteredTasks(filtered);


    // Set filter message based on the filter criteria
    if (showCompleted && showNotCompleted) {
      setFilterMessage("Results for Both Completed & Not Completed Tasks");
    } else if (showNotCompleted) {
      setFilterMessage("Results for Not Completed Tasks");
    } else if (showCompleted) {
      setFilterMessage("Results for Completed Tasks");
    } else {
      setFilterMessage("");
    }
  }, [searchTerm, tasks, showCompleted, showNotCompleted]);

  //Date Range
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleDateRange = (date: any) => {
    const taskDateFilter = (task: any) => {
      const taskDate = new Date(task.date);
      const startDate = date.selection.startDate;
      const endDate = date.selection.endDate;

      const withinRange = taskDate >= startDate && taskDate <= endDate;
      const singleDay = taskDate.toDateString() === startDate.toDateString();

      dispatch(
        taskActions.setFilterByDate({
          date: { selection: { endDate: endDate, startDate: startDate } },
          searchTerm: searchTerm,
          showCompleted: showCompleted,
          showNotCompleted: showNotCompleted,
        })
      );

      return (
        (withinRange || singleDay) &&
        task.task_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        ((showCompleted && task.task_status) ||
          (showNotCompleted && !task.task_status) ||
          (!showCompleted && !showNotCompleted))
      );
    };

    const filteredDate = tasks.filter(taskDateFilter);
    setFilteredTasks(filteredDate);
    selectStartDate(date.selection.startDate);
    selectEndDate(date.selection.endDate);
    console.log(date.selection.startDate);
    console.log(date.selection.endDate);



    // Set filter message based on the date filter criteria
    if (showCompleted && showNotCompleted) {
      setFilterMessage("Results for Both Completed & Not Completed Tasks");
    } else if (showNotCompleted) {
      setFilterMessage("Results for Not Completed Tasks");
    } else if (showCompleted) {
      setFilterMessage("Results for Completed Tasks");
    } else {
      setFilterMessage("");
    }

    // Set date filter message
    if (date.selection.startDate && date.selection.endDate) {
      const formattedStartDate = date.selection.startDate.toDateString();
      const formattedEndDate = date.selection.endDate.toDateString();
      setFilterDateMessage(
        `Results for tasks between ${formattedStartDate} and ${formattedEndDate}`
      );
    } else {
      setFilterDateMessage("");
    }
  };

  // UPDATE STATUS

  const handleRadioChange = (taskId: string, status: boolean) => {
    setSelectedTask({ id: taskId, status });
  };

  const updateTaskStatus = async (taskId: string, status: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/task/tasks/${taskId}`,
        {
          task_status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const handleSaveClick = async () => {
    if (selectedTask) {
      window.location.reload();
      await updateTaskStatus(selectedTask.id, selectedTask.status);
      setSelectedTask(null);
      setEditMode(null);
    }
  };

  const toggleEditMode = (taskId: string | null) => {
    setEditMode((prev) => (prev === taskId ? null : taskId));
  };

  const logoutHandler = () => {
    setLogouErrorLogic(true);
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

  const deleteTaskHandler = async (taskId: string) => {
    setTaskIdToDelete(taskId);
    console.log("this is deleteHAndler", taskId);
    setDeleteErroLogic({ ...deleteErroLogic, delete: true });
  };

  const deleteTaskByIdFunction = async (taskId: string) => {
    try {
      const deletedTask = await axios.delete(
        `http://localhost:8080/task/tasks/${taskId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      if (deletedTask) {
        window.location.reload(); 
      }
    } catch (err: any) {
      console.log("error of deleting task", err);
    }


  };

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

  const taskOVerLayHandler = (value: boolean) => {
    setTaskOverLayLogic(value);
  };

  const toggleFilterMenu = () => {
    setFilterMenuOpen((prev) => !prev);
  };

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
              onClick={toggleFilterMenu}
            />
          </div>
          <MdLogout
            className="text-5xl hover:cursor-pointer"
            onClick={logoutHandler}
          />
        </div>
        <div className=" w-full flex flex-col md:flex-row mt-4  gap-4 md:gap-8 items-center ">
          <h1 className="font-bold text-3xl mb-4 ml-60 md:mb-0 	text-transform:capitalize">
            {`You have got ${taskCount} tasks `}
            {isOverDue.logic && (
              <span
                className="text-over_due hover:underline hover:cursor-pointer"
                onClick={() => {
                  setFilteredTasks(isOverDue.values);
                }}
              >
                And You Have {isOverDue.values.length} Overdue{" "}
                {isOverDue.values.length > 1 ? "Tasks" : "Task"}
              </span>
            )}{" "}
          </h1>
          <button
            className="text-xl bg-view_task_main_color  px-2 py-2 rounded-md text-view_task_white font-bold flex items-center justify-center hover:bg-green "
            onClick={() => {
              // navigation('/taskpopup');
              setTaskOverLayLogic(true);
            }}
          >
            <IoAddSharp className="size-8" />
            <span className="">Add</span>
          </button>
        </div>
      </div>
      <div className="w-full items-start justify-center px-20 -mb-5 md:gap-8 ">
        <h2 className="text-2xl font-bold text-blue">{filterMessage}</h2>
        <h2 className="text-2xl font-bold text-blue">{filterDateMessage}</h2>
      </div>
      <div className="w-full flex items-start justify-center  px-20  h-view_task_13  ">
        <div className="w-full ">
          <div className="text-xl w-full flex flex-col justify-center gap-4 ">
            {currentTasks.map((task: Task) => (
              <div
                key={task._id}
                className=" w-full flex items-center hover:bg-task_hover px-5  py-2 hover:cursor-pointer "
              >
                <div className="  flex-1 	text-transform: capitalize  text-left overflow-hidden">
                  {" "}
                  {/* 1*/}
                  {task.task_description}
                </div>
                <div className="  flex-1 text-left">
                  {" "}
                  {/* 2*/}
                  {task.date.split("T")[0]}
                </div>

                <div className="w-view_task_6  flex-1 flex justify-start ">
                  {" "}
                  {/* 3*/}
                  <button
                    onClick={() => {
                      deleteTaskHandler(task._id);
                    }}
                    className="w-10 text-view_task_4 bg-view_task_main_color rounded-md text-view_task_white p-view_task_1 hover:bg-over_due"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
                <div className=" flex-1 flex justify-start  ">
                  {" "}
                  {/* 4*/}
                  <label className="flex items-center ">
                    <span className="">Mark as Complete</span>
                    <span>
                      <input
                        type="checkbox"
                        className="form-checkbox h-view_task_3 w-view_task_3 text-view_task_main_color ml-8"
                        onChange={() =>
                          handleRadioChange(task._id, !task.task_status)
                        }
                        checked={
                          task.task_status ||
                          (selectedTask?.id === task._id &&
                            selectedTask?.status)
                        }
                        disabled={editMode !== task._id}
                      />
                    </span>
                  </label>
                </div>
                <div className="  flex-1">
                  {" "}
                  {/* 5*/}
                  {!editMode || editMode !== task._id ? (
                    <button
                      className="bg-view_task_main_color p-view_task_1 rounded-md text-view_task_white font-bold ml-view_task_10 hover:bg-opacity-75"
                      onClick={() => toggleEditMode(task._id)}
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
            onClick={() => handlePageChange(index + 1)}
            className={` text-blue text-2xl mx-2 px-3 py-1 ${
              currentPage === index + 1 ? "bg-gray-300" : "bg-gray-100"
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
export default ViewTask;
