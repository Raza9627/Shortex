
import React, { useState } from "react";
import axios from "axios";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {

    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
   const handleChangePassword = async (e) => {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill all fields");
        return;
    }

    if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match");
        return;
    }

    if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        setIsLoading(true);

        console.log("BEFORE AXIOS");

        const response = await axios.patch(
            "http://localhost:3000/api/auth/change-password",
            {
                currentPassword,
                newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("AFTER AXIOS");
        console.log("RESPONSE:", response.data);

        toast.success("Password changed successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        console.log("BEFORE NAVIGATE");

        navigate("/dashboard");

        console.log("AFTER NAVIGATE");

    } catch (error) {

        console.log("CATCH ERROR");
        console.log(error.response?.data || error.message);

        toast.error(
            error.response?.data?.message ||
            "Failed to change password"
        );

    } finally {
        setIsLoading(false);
    }
};
    return (
        <>
            <ToastContainer position="top-right" />

            <div className="min-h-screen bg-slate-50">

                {/* Header */}

                <header className="bg-white border-b border-slate-200">

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-slate-600
                                hover:text-purple-600
                                transition
                            "
                        >
                            <ArrowLeft size={17} />
                            Back to dashboard
                        </button>

                    </div>

                </header>


                {/* Main */}

                <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

                    <div className="max-w-lg mx-auto">

                        {/* Title */}

                        <div className="mb-7">

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-purple-100
                                flex
                                items-center
                                justify-center
                                mb-4
                            ">
                                <Lock
                                    size={23}
                                    className="text-purple-600"
                                />
                            </div>

                            <h1 className="
                                text-2xl
                                font-bold
                                text-slate-900
                            ">
                                Change Password
                            </h1>

                            <p className="
                                mt-2
                                text-sm
                                text-slate-500
                            ">
                                Update your password to keep your Shortex
                                account secure.
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
                                onSubmit={handleChangePassword}
                                className="space-y-5"
                            >

                                {/* Current Password */}

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        mb-2
                                    ">
                                        Current password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={
                                                showCurrent
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            placeholder="Enter current password"
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
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrent(!showCurrent)
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
                                            {showCurrent
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                            }
                                        </button>

                                    </div>

                                </div>


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
                                                showNew
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            placeholder="Enter new password"
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
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNew(!showNew)
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
                                            {showNew
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
                                                showConfirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            placeholder="Confirm new password"
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
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirm(!showConfirm)
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
                                            {showConfirm
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
                                    "
                                >
                                    {isLoading
                                        ? "Changing password..."
                                        : "Change Password"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </main>

            </div>
        </>
    );
};

export default ChangePassword;

