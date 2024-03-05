import React, { useState } from "react";
import "./App.css";
import LoginForm from "./pages/LoginForm";
import SignUp from "./pages/SignUp";
import { Routes, Route, useNavigate } from "react-router-dom";


import Layout from "./Layout/Layout";
import Task from "./pages/Task";
import User from "./pages/User";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";



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

        

          <Route path="/task" element={<Layout  >
            <Task />
          </Layout>} >
          </Route>
          <Route path="/user" element={<Layout  >
            <User />
          </Layout>} >
          </Route>
          <Route path="/about" element={<Layout  >
            <AboutUs />
          </Layout>} >
          </Route>
          <Route path="/contact" element={<Layout  >
            <ContactUs />
          </Layout>} >
          </Route>
          <Route path="/setting" element={<Layout  >
            <div className="w-full h-full flex items-center justify-center text-blue-600 text-xl">SETTNG</div>
          </Layout>} >
          </Route>


          <Route path="/task2" element={<Layout>
            <User />
          </Layout>} >



          </Route>




          <Route path="*" element={<MyComponent />} />









        </Routes>

      </div>
    </div>
  );
}

export default App;
