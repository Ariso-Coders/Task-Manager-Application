
import React, { useState } from 'react'
import SideBar from '../components/sidebar/SideBar';
import { NavBar } from '../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import ErrorCard from '../components/ErrorCard/ErrorCard';

interface Props {
  children: React.ReactNode,
  
}

const Layout = ({ children }: Props) => {
  const [sliderMobileLogic, setSliderMobileLogic] = useState<boolean | false>(false);
  

  const [logoutErroLogic, setLogouErrorLogic] = useState<boolean>(false);
  const navigation = useNavigate();

  const navBarHandler = (value: boolean) => {

    setSliderMobileLogic(value);
  }
  const sideBarHandler = (value: boolean) => {

      setLogouErrorLogic(value);
   
  }



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

  return (

    <div className='min-h-screen w-full flex sm:justify-center overflow-x-hidden ' onClick={() => {

      if (sliderMobileLogic) {
        setSliderMobileLogic(false);
      }
    }}>
      <div className={`sm:fixed sm:left-0 sm:top-0 h-screen sm:w-1/5  w-1/2 absolute top-0  transition-all   ${sliderMobileLogic ? '-translate-x-0' : '-translate-x-full '} sm:translate-x-0 `}>
        <SideBar onCallback={sideBarHandler} logoutLogic={logoutErroLogic}/>



      </div>
      <div className=' sm:absolute sm:right-0 sm:top-0 min-h-full sm:w-4/5 w-full  flex flex-col justify-start '>

        <NavBar onCallback={navBarHandler} onCallBacklogic={sliderMobileLogic} />

        <div>{children}</div>
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

      </div>

    </div>

  )
}

export default Layout;