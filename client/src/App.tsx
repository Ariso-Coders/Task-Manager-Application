import React from "react";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import SignUp from "./pages/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";
// import ViewTask from "./pages/ViewTask";
import ViewTask2 from "./pages/ViewTask2";
import SideBar from './components/sidebar/SideBar';
import { NavBar } from "./components/NavBar/NavBar";



const MyComponent = () => {
  const navigation = useNavigate();
  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-10 items-center justify-center">  <p className="text-white">You Have To Log into Site to View This Page </p> <button className="bg-white py-3 px-5 rounded hover:scale-105" onClick={() => {


      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      navigation("/")
    }}>Go To Login</button> </div>
  )
}

function App() {

  return (
    <div className="App">
      <div className="text-center">

        <Routes>
          <Route path="/" element={<LoginForm />} />


          <Route path="/signup" element={<SignUp />} />

          <Route path="/task" element={

            localStorage.getItem("userToken") !== null ? <ViewTask2 /> : <MyComponent />
          } />

          

          
          <Route path="*" element={<MyComponent />} />
          <Route path="/sidebar" element={<SideBar/>}></Route>







          
        </Routes>

      </div>
    </div>
  );
}

export default App;
