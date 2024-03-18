import React from "react";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import SignUp from "./pages/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";
import ViewTask from "./pages/ViewTask";



const MyComponent = () => {
  const navigation = useNavigate();
  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-10 items-center justify-center">  <p className="text-white">You Have To Log into Site to View This Page </p> <button className="bg-white py-3 px-5 rounded hover:scale-105" onClick={() => {


      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      console.log("CONSOLE LOG FOR TESTING WORKFLOW");
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

            localStorage.getItem("userToken") !== null ? <ViewTask /> : <MyComponent />
          } />

          <Route path="*" element={<MyComponent />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
