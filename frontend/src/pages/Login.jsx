import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          Email,
          Password
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);

      toast.success(response.data.message);

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Link2
              size={25}
              className="text-purple-600"
            />

            <span className="text-2xl font-bold text-gray-900">
              Shortex
            </span>
          </Link>


          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

            {/* Heading */}
            <div className="text-center">

              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Login to manage your shortened links
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    px-4
                    py-3
                    border border-gray-200
                    rounded-lg
                    outline-none
                    text-sm
                    transition
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-100
                  "
                />

              </div>


              {/* Password */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-purple-600 hover:text-purple-700"
                  >
                    Forgot password?
                  </Link>

                </div>


                {/* Password input + eye button */}
                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full
                      px-4
                      py-3
                      pr-12
                      border border-gray-200
                      rounded-lg
                      outline-none
                      text-sm
                      transition
                      focus:border-purple-500
                      focus:ring-2
                      focus:ring-purple-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-gray-600
                      transition
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>


              {/* Login button */}
              <button
                type="submit"
                className="
                  w-full
                  bg-purple-600
                  hover:bg-purple-700
                  text-white
                  font-semibold
                  py-3
                  rounded-lg
                  transition
                  shadow-sm
                "
              >
                Login
              </button>

            </form>


            {/* Register */}
            <p className="mt-6 text-center text-sm text-gray-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                Sign Up
              </Link>

            </p>

          </div>


          {/* Back */}
          <Link
            to="/"
            className="
              flex
              items-center
              justify-center
              gap-2
              mt-6
              text-sm
              text-gray-500
              hover:text-purple-600
              transition
            "
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>

        </div>

      </div>
    </>
  );
};

export default Login;