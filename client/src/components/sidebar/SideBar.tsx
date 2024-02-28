import React from 'react';
import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi'; // Import FiLogOut icon from React Icons
export default function SideBar() {
  return (
    <div className='flex h-screen'>
      <div className='bg-dark_purple h-screen  pt-vh4 sm:w-vw20 w-full flex flex-col gap-vh5 items-center justify-between'>
        <div className="inline-flex text-view_task_white origin-left font-medium md:text-4xl">
          ARISO Technologies
        </div>
        {/* <div className="h-1 w-full bg-white mt-1 "></div> */}
        <div className='w-full flex flex-col gap-vh3 text-white items-center justify-center px-vw5 '>
          <Link className='text-left w-full ' to={""}>Tasks</Link>
          <Link className='text-left w-full' to={""}>Users</Link>
          <Link className='text-left w-full' to={""}>Settings</Link>
        </div>

        <div className="w-full flex flex-col items-start  ">
          <hr className="border-gray-400 w-full" />
          <div className='w-full px-vw5'>

            <button className="text-gray-300 text-sm flex justify-start items-center gap-x-4 cursor-pointer p-5  pl-0  hover:underline rounded-sm ">
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}