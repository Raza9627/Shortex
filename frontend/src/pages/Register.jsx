import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await axios.post(
               `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    Name,
                    Email,
                    Password
                }
            )
            toast.success(response.data.message);

            setName("")
            setEmail("")
            setPassword("")
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
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
                                Create your account
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Start shortening and tracking your links
                            </p>

                        </div>


                        {/* Form */}
                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="Name"
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    name="Email"
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
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="Password"
                                    type="password"
                                    placeholder="Create a password"
                                    minLength={8}
                                    required
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                                <p className="mt-2 text-xs text-gray-400">
                                    Password must be at least 8 characters.
                                </p>
                            </div>


                            {/* Register button */}
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
                                Create Account
                            </button>

                        </form>


                        {/* Login */}
                        <p className="mt-6 text-center text-sm text-gray-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-purple-600 hover:text-purple-700"
                            >
                                Login
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

export default Register;