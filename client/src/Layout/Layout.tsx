
import React, { useState } from 'react'
import SideBar from '../components/sidebar/SideBar';
import { NavBar } from '../components/NavBar/NavBar';

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [sliderMobileLogic, setSliderMobileLogic] = useState<boolean | false>(false);
  return (

    <div className='min-h-screen w-full flex sm:justify-center overflow-x-hidden '>
      <div className={`sm:fixed sm:left-0 sm:top-0 h-screen sm:w-1/5  w-1/2 absolute top-0  transition-all   ${sliderMobileLogic ? '-translate-x-0' : '-translate-x-full '} sm:translate-x-0 `}>
        <SideBar />
        {/* <div className={`w-full h-full  ${sliderMobileLogic === true ? 'bg-blue-500' : 'bg-red-500 '}`}> teset side bar</div> */}


      </div>
      <div className=' sm:absolute sm:right-0 sm:top-0 min-h-full sm:w-4/5 w-full  flex flex-col justify-start '>

        <NavBar />
        {/* <div className='w-full bg-red-400 h-vh4' onClick={() => {

          setSliderMobileLogic(!sliderMobileLogic);


        }}>

          <button> teset</button>

        </div> */}
        <div>{children}</div>

      </div>

    </div>

  )
}

export default Layout;