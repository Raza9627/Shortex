
import React, { useState } from "react";
import { Link, LockKeyhole, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
                {
                    newPassword
                }
            );

            toast.success(
                response.data.message || "Password reset successfully"
            );

            setNewPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.log(
                error.response?.data?.message || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to reset password"
            );
        } finally { setIsLoading(false); }
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

                                <div className="
                                w-9
                                h-9
                                rounded-xl
                                bg-purple-600
                                flex
                                items-center
                                justify-center
                                shadow-sm
                            ">
                                    <Link
                                        size={20}
                                        className="text-white"
                                    />
                                </div>

                                <span className="
                                text-xl
                                font-bold
                                tracking-tight
                                text-slate-900
                            ">
                                    Shortex
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                {/* Main */}

                <main className="
                flex-1
                flex
                items-center
                justify-center
                px-4
                py-10
            ">

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
                                Reset your password
                            </h1>

                            <p className="
                            mt-2
                            text-sm
                            text-slate-500
                            leading-6
                        ">
                                Create a new password for your Shortex account.
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
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* New Password */}

                                <div>

                                    <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                        New password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            placeholder="Enter new password"
                                            required
                                            className="
                                            w-full
                                            px-4
                                            py-3
                                            pr-11
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

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                            className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            hover:text-slate-700
                                        "
                                        >
                                            {showNewPassword
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                            }
                                        </button>

                                    </div>

                                    <p className="
                                    mt-2
                                    text-xs
                                    text-slate-400
                                ">
                                        Use at least 6 characters.
                                    </p>

                                </div>


                                {/* Confirm Password */}

                                <div>

                                    <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                        Confirm new password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm new password"
                                            required
                                            className="
                                            w-full
                                            px-4
                                            py-3
                                            pr-11
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

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            hover:text-slate-700
                                        "
                                        >
                                            {showConfirmPassword
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                            }
                                        </button>

                                    </div>

                                </div>


                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="
                                    w-full
                                    py-3
                                    bg-purple-600
                                    hover:bg-purple-700
                                    disabled:bg-purple-300
                                    disabled:cursor-not-allowed
                                    text-white
                                    text-sm
                                    font-semibold
                                    rounded-xl
                                    transition
                                    shadow-sm
                                "
                                >
                                    {isLoading
                                        ? "Resetting..."
                                        : "Reset Password"
                                    }
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

export default ResetPassword;

