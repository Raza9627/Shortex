import React, { useState } from "react";
import { Link, Mail, ArrowLeft, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {

    const [Email, setEmail] = useState("");
    const [Isloading, setIsloading] = useState(false)
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    if(Isloading) return;
    try {
        setIsloading(true)
        const response = await axios.post(
             `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
            {
                Email
            }
        );
        console.log(response.data)
        toast.success(response.data.message || "Reset Link sent successfully")
        setEmail("")
    } catch (error) {
        console.log(
            error.response?.data?.message || error.message
        );
    }
    finally {
        setIsloading(false);
    }
};
    return (
        <>
        <ToastContainer position="top-right" />
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* Header */}

            <header className="bg-white border-b border-slate-200">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="h-16 flex items-center">

                        {/* Logo */}

                        <div className="flex items-center gap-2.5">

                            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-sm">

                                <Link
                                    size={20}
                                    className="text-white"
                                />

                            </div>

                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                Shortex
                            </span>

                        </div>

                    </div>

                </div>

            </header>


            {/* Main */}

            <main className="flex-1 flex justify-center px-4 py-18">

                <div className="w-full max-w-md">

                    {/* Icon */}

                    <div className="flex justify-center mb-5">

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-purple-100
                            flex
                            items-center
                            justify-center
                        ">

                            <LockKeyhole
                                size={25}
                                className="text-purple-600"
                            />

                        </div>

                    </div>


                    {/* Heading */}

                    <div className="text-center mb-7">

                        <h1 className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        ">
                            Forgot your password?
                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                            leading-6
                        ">
                            Enter the email address associated with your
                            Shortex account and we'll help you reset your
                            password.
                        </p>

                    </div>


                    {/* Card */}

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-6
                        sm:p-7
                        shadow-sm
                    ">

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="
                                            absolute
                                            left-3.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        type="email"
                                        value={Email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        required
                                        className="
                                            w-full
                                            pl-10
                                            pr-4
                                            py-3
                                            text-sm
                                            border
                                            border-slate-200
                                            rounded-xl
                                            outline-none
                                            bg-slate-50
                                            focus:bg-white
                                            focus:border-purple-500
                                            focus:ring-4
                                            focus:ring-purple-50
                                            transition
                                        "
                                    />

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={Isloading}
                                className="
                                    w-full
                                    py-3
                                    bg-purple-600 disabled:bg-purple-300
                                    hover:bg-purple-700
                                    text-white
                                    text-sm
                                    font-semibold
                                    rounded-xl
                                    transition
                                    shadow-sm
                                "
                            >
                              {Isloading ? "Sending..." : "Send reset link"}
                            </button>

                        </form>


                        {/* Back to Login */}

                        <div className="
                            flex
                            justify-center
                            mt-6
                            pt-5
                            border-t
                            border-slate-100
                        ">

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-slate-500
                                    hover:text-purple-600
                                    transition
                                "
                            >

                                <ArrowLeft size={16} />

                                Back to login

                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
        </>
    );
};

export default ForgotPassword;

