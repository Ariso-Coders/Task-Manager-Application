import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi'; // Import FiLogOut icon from React Icons
import ErrorCard from '../ErrorCard/ErrorCard';

type prop = {
  onCallback: (value: boolean) => void,
  logoutLogic: boolean
}

export default function SideBar({ onCallback, logoutLogic }: prop) {

  return (
    <div className='flex h-screen'>
      <div className='bg-dark_purple h-screen  pt-vh4 sm:w-vw20 w-full flex flex-col gap-vh5 items-center justify-between' >
        <div className="inline-flex text-view_task_white origin-left font-medium ">
          ARISO Technologies
        </div>
        {/* <div className="h-1 w-full bg-white mt-1 "></div> */}
        <div className='w-full flex flex-col gap-vh3 text-white items-center justify-center px-vw5 '>

          <NavLink className={({ isActive, isPending }) =>
            isPending ? " text-left w-full transition-all hover:scale-105   text-white" : isActive ? "py-vh1 px-vw1 rounded text-blue-700 bg-white scale-105 text-left w-full transition-all hover:scale-105 " : "text-left w-full transition-all hover:scale-105"
          } to="/task">Task</NavLink>
          <NavLink className={({ isActive, isPending }) =>
            isPending ? " text-left w-full transition-all hover:scale-105   text-white" : isActive ? " py-vh1 px-vw1 rounded text-blue-700 bg-white  scale-105 text-left w-full transition-all hover:scale-105 " : "text-left w-full transition-all hover:scale-105 "
          } to="/user">Users</NavLink>
          <NavLink className={({ isActive, isPending }) =>
            isPending ? " text-left w-full transition-all hover:scale-105   text-white" : isActive ? "py-vh1 px-vw1 rounded text-blue-700 bg-white  scale-105 text-left w-full transition-all hover:scale-105  " : "text-left w-full transition-all hover:scale-105"
          } to="/setting">Settings</NavLink>


        </div>

        <div className="w-full flex flex-col items-start  ">
          <hr className="border-gray-400 w-full" />
          <div className='w-full px-vw5'>

            <button className="text-gray-300 text-sm flex justify-start items-center gap-x-4 cursor-pointer p-5  pl-0  hover:underline rounded-sm " onClick={() => {
              onCallback(!logoutLogic);



            }


            }>
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}