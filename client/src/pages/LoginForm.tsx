import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
 
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");


  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
    try {
      const loginRespond = await axios.post(
        "http://localhost:8080/user/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("login respond from login", loginRespond);
      setSuccessMessage("Login Successful");
      const decodedToken: any = jwtDecode(loginRespond.data.token);
      localStorage.setItem("userToken", loginRespond.data.token);
      localStorage.setItem("userEmail", decodedToken.email);
      localStorage.setItem("userId",decodedToken.userId);
      navigation("/task");
      window.location.reload();
  
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
      <div className="border border-gray-300 p-8 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-4xl mb-4 font-bold">Login</h2>
          <p className="text-xl mb-8">
            Welcome Back! Please Enter Your details
          </p>
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
              <p className="text-left text-red">{errors.email.message}</p>
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
              <p className="text-left text-red">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              {...register("rememberMe")}
            />
            <label>Remember Me</label>
          </div>

          <Button buttonLabel="Login" />
          {errorMessage && <p className="text-red">{errorMessage}</p>}
          {successMessage && <p className="text-green">{successMessage}</p>}
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