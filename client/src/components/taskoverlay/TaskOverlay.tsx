import React, { FC, FormEvent, useState } from "react";
import { isEmpty } from "../../utils/Validations";
import axios from "axios";
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../store/';

// interface MyFunctionalComponentProps { }

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface InputState {
  date: Date | null;
  task: string | null;
  erorMsg: string | null;
  erroLogic: boolean
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


  const [inputDetails, setInputDetails] = useState<InputState>({
    date: null,
    task: "",
    erorMsg: "",
    erroLogic: false
  });

  const userId: string | null = localStorage.getItem("userId");
  const userToken: string | null = localStorage.getItem("userToken");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty(inputDetails.date) || isEmpty(inputDetails.task)) {
      setInputDetails({ ...inputDetails, erroLogic: true, erorMsg: "Date or task cannot be empty" })
      return;
    } else {
      setInputDetails({ ...inputDetails, erroLogic: false, erorMsg: "" })
    }

    try {

      const taskCreationRespond: respond = await axios.post(
        "http://localhost:8080/task/createTask", {
        taskDate: inputDetails.date,
        task: inputDetails.task,
        userId: userId?.toString()

      }, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
      )
      window.location.reload();


    } catch (err: any) {
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
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center text-white opacity bg-black bg-opacity-50">
      <form
        className=" w-1/3 bg-main_color px-10 py-10 flex flex-col  gap-5"
        onSubmit={handleSubmit}
      >
        <section>
          <h4>Select Date</h4>
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
          <h4>Enter Task</h4>
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
        <section className="w-full  flex flex-row justify-end gap-3 ">
          <button
            type="submit"
            className="rounded-md text-sm bg-white text-main_color py-1 px-3 hover:bg-main_color hover:text-white border border-white "
          >
            Save
          </button>
          <button
            type="reset"
            onClick={() => {
              setInputDetails({
                date: null,
                task: "",
                erorMsg: "",
                erroLogic: false
              });
              props.onCancelClick(false);
            }}
            className="rounded-md text-sm bg-white text-main_color py-1 px-3 hover:bg-gray hover:text-white border border-white"
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
};

export default TaskOverlay;
