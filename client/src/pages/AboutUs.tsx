import React from "react";

export default function AboutUs() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen ">
      <div className="max-w-md flex flex-col bg-gray-100 rounded-lg p-4 shadow-md ">
        <div className="mb-2">
          <b> # About Us</b>

          <p className="text-justify">
            Welcome to TaskMaster, your go-to task management solution! We
            understand the importance of staying organized and on top of your
            responsibilities. TaskMaster is designed with simplicity and
            efficiency in mind to help you manage your tasks and boost
            productivity.
          </p>
        </div>
        <div className="mb-2 ">
          <b># Our Mission</b>

          <p className="text-justify">
            At TaskMaster, our mission is to provide you with a seamless and
            intuitive task management experience. We believe that effective task
            management is a key element in achieving your goals and maintaining
            a healthy work-life balance.
          </p>
        </div>
        </div>
      </div>
 
  );
}