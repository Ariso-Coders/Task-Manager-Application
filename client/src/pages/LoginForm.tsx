import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../store/fetures/task-api";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm = () => {
  const navigation = useNavigate();

  const [loginMutation, { isError }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {

      let loginRespond: any = await loginMutation({
        email: data.email,
        password: data.password
      })


      if (loginRespond.error) {
        setErrorMessage("This email is not registered or Invalid Password");
        setSuccessMessage("");
        return;
      }

      console.log("login respond from login", loginRespond, "This is error", isError);
      setSuccessMessage("Login Successful");
      const decodedToken: any = jwtDecode(loginRespond.data.token);
      localStorage.setItem("userToken", loginRespond.data.token);
      localStorage.setItem("userEmail", decodedToken.email);
      localStorage.setItem("userId", decodedToken.userId);
      localStorage.setItem("userName", loginRespond.data.name);
     
      navigation("/task");

    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("This email is not registered or Invalid Password");
        setSuccessMessage("");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="sm:border border-gray-300 p-8 rounded-lg">
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-4xl mb-4 font-bold">Login</h2>
          <p className="text-xl mb-8">Welcome Back! Please Enter Your details</p>
          <div className="mb-4">
            <label className="flex mb-2 font-semibold">Email</label>
            <input
              {...register("email", {
                required: "Email Is Required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid Email",
                },
              })}
              className="p-3 w-full border-2 border-gray-300 rounded-md"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p className="text-left text-red-700">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex mb-2 font-semibold">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password Should Be At Least 8 Characters",
                },
              })}
              className="p-3 w-full border-2 border-gray-300 rounded-md"
              placeholder="Enter Your Password"
              type="password"
            />
            {errors.password && (
              <p className="text-left text-red-700">{errors.password.message}</p>
            )}
          </div>

          {/* <Button buttonLabel="Login"/> */}

          <button type="submit" className="bg-main_color py-2 px-6 rounded-md mb-4 text-white">Signin</button>
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
          {successMessage && <p className="text-green-400">{successMessage}</p>}
          <p>
            Don't Have an Account?{" "}
            <Link to="/signup" className="font-semibold">
              Sign Up
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};
export default LoginForm;
