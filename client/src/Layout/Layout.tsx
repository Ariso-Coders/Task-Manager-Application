
import React, { useState } from 'react'
import SideBar from '../components/sidebar/SideBar';
import { NavBar } from '../components/NavBar/NavBar';

interface Props {
  children: React.ReactNode,
  taskLogicCallBack?: (value: boolean) => void
}

const Layout = ({ children, taskLogicCallBack }: Props) => {
  const [sliderMobileLogic, setSliderMobileLogic] = useState<boolean | false>(false);

  const navBarHandler = (value: boolean) => {

    setSliderMobileLogic(value);
  }
  const sideBarHandler = (value: boolean) => {

    console.log("side bar triggerd", value)
    if (taskLogicCallBack) {
      if(value){

        taskLogicCallBack(value);
      }else{
        taskLogicCallBack(false);

      }
    }
  }
  return (

    <div className='min-h-screen w-full flex sm:justify-center overflow-x-hidden ' onClick={() => {

      if (sliderMobileLogic) {
        setSliderMobileLogic(false);
      }
    }}>
      <div className={`sm:fixed sm:left-0 sm:top-0 h-screen sm:w-1/5  w-1/2 absolute top-0  transition-all   ${sliderMobileLogic ? '-translate-x-0' : '-translate-x-full '} sm:translate-x-0 `}>
        <SideBar onCallback={sideBarHandler} />



      </div>
      <div className=' sm:absolute sm:right-0 sm:top-0 min-h-full sm:w-4/5 w-full  flex flex-col justify-start '>

        <NavBar onCallback={navBarHandler} onCallBacklogic={sliderMobileLogic} />

        <div>{children}</div>

      </div>

    </div>

  )
}

export default Layout;