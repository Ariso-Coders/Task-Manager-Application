import React from "react";

export default function ContactUs() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen gap-6">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <form className="text-start">
        <h1 className="text-lg font-semibold mb-4 text-center">Send your message to us</h1>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          
        </form>
        <button
            type="submit"
            className="bg-dark_purple text-white p-2 rounded-md hover:bg-opacity-80 flex items-end"
          >
            Submit
          </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="text-justify">
          <h2 className="text-lg font-semibold mb-2">Business Address</h2>
          <p>123 Main Street</p>
          <p>City, State, ZIP Code</p>
          <p>Country</p>
        </div>
        <div className="text-justify">
          <h2 className="text-lg font-semibold mb-2">Phone Number</h2>
          <p>(123) 456-7890</p>
        </div>
      </div>
    </div>
  );
}