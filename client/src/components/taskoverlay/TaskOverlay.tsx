import React, { FC, FormEvent, useState } from "react";
import { isEmpty } from "../../utils/Validations";
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../store/';
import { PostTaskResponsetInterface, PostTaskRequestInterface, taskApi, usePostTaskMutation } from '../../store/fetures/task-api';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface InputState {
  date: Date | "";
  task: string | "";
  erorMsg: string | "";
  erroLogic: boolean | false
}

interface TaskDetails {
  date: string;
  task_description: string;
  task_status: boolean;
  userID: string;
  _id: string;
}

interface ErrorResponse {
  message?: string | "";
}

interface PostTaskMutationResponse {
  data?: PostTaskResponsetInterface;
  error?: FetchBaseQueryError | SerializedError
}

interface MyFunctionalComponentProps {
  onCancelClick: (value: boolean) => void;
  // userId:string;
}

interface respond {
  message: string | null,
  details: string | null
}

const TaskOverlay: FC<MyFunctionalComponentProps> = (props) => {
  const [postTaskMutation, { isLoading, status, isError, data, error }] = usePostTaskMutation();
  const [inputDetails, setInputDetails] = useState<InputState>({
    date: "",
    task: "",
    erorMsg: "",
    erroLogic: false
  });

  const userId: string | null = localStorage.getItem("userId");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty(inputDetails.date) || isEmpty(inputDetails.task)) {
      setInputDetails({ ...inputDetails, erroLogic: true, erorMsg: "Date or task cannot be empty" })
      return;
    } else {
      setInputDetails({ ...inputDetails, erroLogic: false, erorMsg: "" })
    }
    try {
      let createTaskBackendRespond: PostTaskMutationResponse = await postTaskMutation({
        task: inputDetails.task || "",
        taskDate: inputDetails.date,
        userId: userId?.toString() || ""
      });
      window.location.reload();
    } catch (err: any) {
      console.log("error that passed into ", err)
      if (err.response.status === 400 || err.response.status === 500) {
        if (!inputDetails.erroLogic) {

          setInputDetails({ ...inputDetails, erroLogic: true, erorMsg: err.response.data.message })
        }
      } else {
        setInputDetails({ ...inputDetails, erroLogic: false, erorMsg: "" })
      }
    }
  };
  return (
    <div className="absolute top-0 left-0 
    w-full h-full 
    flex items-center justify-center text-white opacity bg-black bg-opacity-50">
      <form
        className=" mx-vw5 w-full sm:mx-vw10 lg:w-1/2 bg-blue-700 px-10 py-10 flex flex-col  gap-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl">Add New Task</h1>
        <section>
          <h4 className="w-full text-left">Select Date</h4>
          <input
            type="date"
            name="date"
            className="w-full pl-2 text-black outline-none rounded"
            onChange={(e) => {
              setInputDetails({ ...inputDetails, date: new Date(e.target.value) });
            }}
          />
        </section>
        <section>
          <h4 className="w-full text-left">Enter Task</h4>
          <input
            type="text"
            name="task"
            className="w-full pl-2 text-black outline-none rounded"
            onChange={(e) => {
              setInputDetails({ ...inputDetails, task: e.target.value });
            }}
          />
        </section>
        {inputDetails.erroLogic && (
          <p className="text-red-700 capitalize text-center font-bold  w-full ">
            {inputDetails.erorMsg}
          </p>
        )}
        <section className="w-full  flex flex-row justify-end gap-3  transition-all">
          <button
            type="submit"
            className="rounded-md text-sm bg-white text-main_color py-1 px-3 hover:bg-green-500 hover:text-white border border-white "
          >
            Save
          </button>
          <button
            type="reset"
            onClick={() => {
              setInputDetails({
                date: "",
                task: "",
                erorMsg: "",
                erroLogic: false
              });
              props.onCancelClick(false);
            }}
            className="rounded-md text-sm bg-white text-blue-800  py-1 px-3 hover:bg-gray-300 hover:text-white border border-white"
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
};

export default TaskOverlay;
