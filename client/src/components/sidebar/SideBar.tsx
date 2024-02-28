import React from 'react';
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className='flex h-screen'>
      <div className='bg-dark_purple h-screen p-5 pt-8 w-vw20'>
        <div className="inline-flex text-view_task_white origin-left font-medium md:text-4xl">
          ARISO Technologies
        </div>
        <div className="h-1 w-full bg-white mt-1 "></div>

        <ul className="pt-2 justify-center">
          <Link to="/task">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-5 hover:underline rounded-sm mt-1">
              Tasks
            </li>
          </Link>
          <Link to="/about">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-5 hover:underline rounded-sm mt-1">
              Users
            </li>
          </Link>
          <Link to="/settings">
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-5 hover:underline rounded-sm mt-1">Settings</li>
          </Link>
        </ul>
        <div className="mt-auto">
          <button className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-5 hover:underline rounded-sm mt-1">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

