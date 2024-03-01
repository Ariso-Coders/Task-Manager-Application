import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

type props = {
  onCallback: (value: boolean) => void
  onCallBacklogic: boolean;
}

export const NavBar = ({ onCallback, onCallBacklogic }: props) => {
  const navigtion = useNavigate();
  const userName = localStorage.getItem('userName');
  const [menuLogic, setMenuLogic] = useState<boolean>(false)
  return (

    <header className="bg-slate-200 shadow-md w-full px-5 h-vh10  flex items-center justify-between ">

      <div className="flex justify-between items-center w-full p-3 ">
        <div className="sm:hidden" onClick={() => {
          onCallback(!onCallBacklogic);
          setMenuLogic(!menuLogic);

        }} ><IoMenu /></div>
        <div className=" text-sm sm:text-xl flex gap-5 ">
          <h1 className="hover:cursor-pointer transition-all hover:font-semibold" > <NavLink to="/about" className={({ isActive }) => isActive ? "font-bold" : ""} > About Us </NavLink></h1>
          <h1 className="hover:cursor-pointer transition-all hover:font-semibold"  ><NavLink to="/contact" className={({ isActive }) => isActive ? "font-bold" : ""} > ContactUs </NavLink></h1>
        </div>
        <div className="font-semibold text-sm sm:text-xl hidden sm:inline ">
          <h1 className="flex gap-2"> Welcome Back ! <span className="capitalize">{userName}</span></h1>
        </div>

      </div>
    </header>


  );
};
