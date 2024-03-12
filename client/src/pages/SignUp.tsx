import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


type FormData = {
  email: string;
  name: string;
  dob: Date;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Use watch to track changes in input fields
  } = useForm<FormData>();
  const [user, setUser] = useState({
    email: "",
    name: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  // Get the values of "password" and "confirmPassword" fields
  const password = watch("password", "");
  // const confirmPassword = watch("confirmPassword", "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigation = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const signUpRespond = await axios.post(
        "http://localhost:8080/user/signup",
        {
          email: data.email,
          name: data.name,
          dob: data.dob,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      console.log("signUp respond from signup", signUpRespond);
      setSuccessMessage("Registered successfully!");
      navigation("/");


    } catch (error: any) {
      console.error("Error occurred during sign up:", error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Email is already exist");
        setSuccessMessage(" ")
      } else {
        console.error("An error occurred:", error);
      }
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center" data-testid="custom-element">
          Sign Up
        </div>
      </div>
      <div className="max-w-md w-full  mx-auto mt-4 bg-white sm:border border-gray-300 p-8 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
  <label htmlFor="email" className="flex mb-2 font-semibold">
    Email
  </label>
  <input
    {...register("email", {
      required: "Email Is Required",
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Invalid Email",
      },
    })}
    id="email" 
    className="p-3 w-full border-2 border-gray-300 rounded-md" 
  />
  {errors.email && (
    <p className="text-left text-red-700">{errors.email.message}</p>
  )}
</div>

          <div>
            <label htmlFor="name" className="flex mb-2 font-semibold">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              id="name"
              className="p-3 w-full border-2 border-gray-300 rounded-md"
              type="text"
            />
            {errors.name && (
              <p className="text-left text-red-700">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="flex mb-2 font-semibold">
              DOB
            </label>
            <input
              {...register("dob", {
                required: "DOB is required",
              })}
              id="dob"
              className="p-3 w-full border-2 border-gray-300 rounded-md"
              type="date"
            />
            {errors.dob && (
              <p className="text-lefts text-red-700">{errors.dob.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="flex mb-2 font-semibold">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password Should Be At Least 8 Characters",
                },
              })}
              id="password"
              className="p-3 w-full border-2 border-gray-300 rounded-md"
              type="password"
            />
            {errors.password && (
              <p className="text-left text-red-700">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="flex mb-2 font-semibold">
              Re-enter password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirm-Password is required",
                minLength: {
                  value: 8,
                  message: "Re-enter Password Should Be At Least 8 Characters",
                },
                validate: (value) =>
                  value === password || "The passwords do not match", // Validate if confirmPassword matches password
              })}
              id="confirmPassword"
              className="p-3 w-full border-2 border-gray-300 rounded-md"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-left text-red-700">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-5 px-4 text-white bg-main_color hover:bg-main_color rounded-md text-sm"
          >
            SignUp
          </button>
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
          {successMessage && <p className="text-green">{successMessage}</p>}

          <div className="mt-4">
            <p>
              Already Have an Account?{" "}
              <Link to="/" className="font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
