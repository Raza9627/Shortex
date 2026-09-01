import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    Link2,
    LogOut,
    User,
    MousePointerClick,
    Link as LinkIcon,
    Activity,
    Copy,
    ExternalLink,
    MoreHorizontal,
    Plus,
    BarChart3,
    ArrowUpRight,
    Search,
    Settings,
    Trash2,
    Pencil,KeyRound,
    ChevronDown
} from "lucide-react";
const Dashboard = () => {
    const [analytics, setanalytics] = useState(null)
    const [details, setDetails] = useState([]);
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [weeklyAnalytics, setWeeklyAnalytics] = useState([]);
    const [editName, setEditName] = useState(false);
    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [search, setSearch] = useState("");
    const [profileMenu, setProfileMenu] = useState(false);
    const navigate=useNavigate()
    //getprofile
    useEffect(() => {

        const getProfile = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProfile(response.data);

            } catch (error) {

                console.log(
                    "Error:",
                    error.response?.data?.message || error.message
                );

            }
        };

        getProfile();

    }, []);

    //fetch analytics
    useEffect(() => {
        const getAnalytics = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/urls/analytics`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("Profile:", response.data);

                setanalytics(response.data);

            } catch (error) {

                console.log(
                    "Error:",
                    error.response?.data?.message || error.message
                );

            }
        };

        getAnalytics();

    }, []);

    //for link details
    useEffect(() => {

        const getAnalyticsDetails = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/urls/analytics/details`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("Analytics Details:", response.data);

                setDetails(response.data);

            } catch (error) {

                console.log(
                    "Error:",
                    error.response?.data?.message || error.message
                );

            }
        };

        getAnalyticsDetails();

    }, []);
    //link filter
    const filteredDetails = details.filter((link) =>
        link.shortCode.toLowerCase().includes(search.toLowerCase()) ||
        link.originalUrl.toLowerCase().includes(search.toLowerCase())
    );
    //top links
    const topLinks = [...details]
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 3);

    const maxClicks = Math.max(
        ...topLinks.map(link => link.clicks),
        1
    );

    //for create URL
    const handleShortenUrl = async () => {
        if (isLoading) return;
        const token = localStorage.getItem("token");

        if (!url.trim()) {
            toast.error("Please enter a URL");
            return;
        }

        try {
            setIsLoading(true);
            const parsedUrl = new URL(url);

            if (
                parsedUrl.protocol !== "http:" &&
                parsedUrl.protocol !== "https:"
            ) {
                toast.error("Only HTTP and HTTPS URLs are allowed");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/urls`,
                {
                    originalUrl: url.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const detailsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/urls/analytics/details`, { headers: { Authorization: `Bearer ${token}` } }); setDetails(detailsResponse.data);
            toast.success(response.data.message);

            console.log("Created URL:", response.data);

            setShortenedUrl(response.data.shortUrl);

            setUrl("");

            // Refresh analytics
            const analyticsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/urls/analytics`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setanalytics(analyticsResponse.data);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Invalid URL"
            );
        } finally {
            setIsLoading(false);
        }
    };
    //fetch weekly anaytics
    useEffect(() => {

        const getWeeklyAnalytics = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/urls/analytics/weekly`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("Weekly Analytics:", response.data);

                setWeeklyAnalytics(response.data.days);

            } catch (error) {

                console.log(
                    "Error:",
                    error.response?.data?.message || error.message
                );

            }
        };

        getWeeklyAnalytics();

    }, []);
    //enable disable
    const handleToggleStatus = async (id, isActive) => {
        const token = localStorage.getItem("token");

        try {
            const endpoint = isActive
                ? `${import.meta.env.VITE_API_URL}/api/urls/${id}/disable`
                : `${import.meta.env.VITE_API_URL}/api/urls/${id}/enable`;

            await axios.patch(
                endpoint,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(
                isActive ? "Link disabled" : "Link enabled"
            );

            // Update the link immediately in React state
            setDetails((prevDetails) =>
                prevDetails.map((link) =>
                    link._id === id
                        ? { ...link, isActive: !isActive }
                        : link
                )
            );

            // Update dashboard statistics
            const analyticsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/urls/analytics`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setanalytics(analyticsResponse.data);

        } catch (error) {
           

            toast.error(
                error.response?.data?.message ||
                "Failed to update link"
            );
        }
    };

    //handle delete
    const handleDeleteUrl = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(
               `${import.meta.env.VITE_API_URL}/api/urls/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Link deleted");

            // Remove it immediately from UI
            setDetails((prevDetails) =>
                prevDetails.filter((link) => link._id !== id)
            );

            // Refresh analytics
            const analyticsResponse = await axios.get(
               `${import.meta.env.VITE_API_URL}/api/urls/analytics`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setanalytics(analyticsResponse.data);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete link"
            );
        }
    };

    //handle Delete
    const handleUpdateProfile = async () => {
    if (!name.trim()) {
        toast.error("Name cannot be empty");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        setIsUpdating(true);

        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            {
                Name: name.trim()
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        toast.success(response.data.message);

        // Update navbar immediately
        setProfile(prev => ({
            ...prev,
            Name: name.trim()
        }));

        setEditName(false);

    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            "Failed to update profile"
        );
    } finally {
        setIsUpdating(false);
    }
};
    //handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    //for monthly groth in clicks
    const clickChange =
        analytics && analytics.lastMonthClicks > 0
            ? ((analytics.thisMonthClicks - analytics.lastMonthClicks) /
                analytics.lastMonthClicks) * 100
            : 0;

    //for monthly growth in links
    const urlChange =
        analytics?.lastMonthUrls > 0
            ? ((analytics.thisMonthUrls - analytics.lastMonthUrls) /
                analytics.lastMonthUrls) * 100
            : 0;

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="min-h-screen bg-slate-50">

                {/* ================= NAVBAR ================= */}

                <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="h-16 flex items-center justify-between">

                            {/* Logo */}

                            <div className="flex items-center gap-2.5">

                                <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-sm">

                                    <Link2
                                        size={20}
                                        className="text-white"
                                    />

                                </div>

                                <span className="text-xl font-bold tracking-tight text-slate-900">
                                    Shortex
                                </span>

                            </div>


                      
{/* Right side */}

<div className="flex items-center gap-2 sm:gap-4">

    <div className="hidden sm:block h-7 w-px bg-slate-200" />


    {/* Profile */}

    <div className="relative">

        <button
            onClick={() => {
                setProfileMenu(!profileMenu);
                setEditName(false)
            }}
            className="
                flex
                items-center
                gap-2.5
                text-left
                rounded-xl
                px-2
                py-1.5
                hover:bg-slate-50
                transition
            "
        >

            <div className="relative">

                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">

                    <User
                        size={18}
                        className="text-purple-600"
                    />

                </div>


            </div>


            <div className="hidden md:block">

                <p className="text-sm font-semibold text-slate-900">
                    {profile?.Name || "User"}
                </p>

                <p className="text-xs text-slate-500">
                    {profile?.Email || "Loading..."}
                </p>

            </div>


            <ChevronDown
                size={16}
                className={`
                    hidden md:block
                    text-slate-400
                    transition-transform
                    ${profileMenu ? "rotate-180" : ""}
                `}
            />

        </button>


        {/* Profile Dropdown */}

        {profileMenu && (

            <div
                className="
                    absolute
                    right-0
                    top-14
                    w-64
                    bg-white
                    border
                    border-slate-200
                    rounded-xl
                    shadow-lg
                    overflow-hidden
                    z-50
                "
            >

                {/* Profile header */}

                <div className="px-4 py-3 border-b border-slate-100">

                    <p className="text-sm font-semibold text-slate-900">
                        {profile?.Name || "User"}
                    </p>

                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {profile?.Email || "Loading..."}
                    </p>

                </div>


                {/* Edit Name */}

      
{/* Edit Name */}

{!editName ? (

    <button
        onClick={() => {
            setName(profile?.Name || "");
            setEditName(true);
        }}
        className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            text-sm
            text-slate-700
            hover:bg-slate-50
            transition
        "
    >

        <Pencil
            size={17}
            className="text-slate-500"
        />

        <span>
            Edit name
        </span>

    </button>

) : (

    <div className="px-4 py-4">

        <p className="text-sm font-semibold text-slate-900 mb-2">
            Edit your name
        </p>

        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="
                w-full
                px-3
                py-2
                text-sm
                border
                border-slate-200
                rounded-lg
                outline-none
                focus:border-purple-500
                focus:ring-2
                focus:ring-purple-50
            "
        />

        <div className="flex justify-end gap-2 mt-3">

            <button
                onClick={() => {
                    setEditName(false);
                    setName(profile?.Name || "");
                }}
                className="
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-600
                    hover:bg-slate-100
                    rounded-lg
                "
            >
                Cancel
            </button>

            <button
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    bg-purple-600
                    hover:bg-purple-700
                    disabled:bg-purple-300
                    rounded-lg
                "
            >
                {isUpdating ? "Saving..." : "Save"}
            </button>

        </div>

    </div>

)}
                {/* Change Password */}

                <button
                    onClick={() => {
                        setProfileMenu(false);
                        navigate("/change-password")
                    }}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        hover:bg-slate-50
                        transition
                    "
                >

                    <KeyRound
                        size={17}
                        className="text-slate-500"
                    />

                    <span>
                        Change password
                    </span>

                </button>


                {/* Logout */}

                <div className="border-t border-slate-100">

                    <button
                        onClick={handleLogout}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            text-sm
                            text-red-600
                            hover:bg-red-50
                            transition
                        "
                    >

                        <LogOut size={17} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </div>

        )}

    </div>

</div>


                            

                        </div>

                    </div>

                </header>



                {/* ================= MAIN ================= */}

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">


                    {/* ================= WELCOME ================= */}

                    <section className="mb-8">

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                            <div>

                                <p className="text-sm font-semibold text-purple-600 mb-1">
                                    Overview
                                </p>

                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                    Welcome back, {profile?.Name || "there"} 👋
                                </h1>

                                <p className="mt-2 text-sm sm:text-base text-slate-500">
                                    Here's what's happening with your links.
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* ================= STATS ================= */}

                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">


                        {/* Total Links */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Total Links
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                        {analytics?.totalUrls}
                                    </h2>

                                </div>

                                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                                    <LinkIcon
                                        size={21}
                                        className="text-purple-600"
                                    />

                                </div>

                            </div>

                            <div
                                className={`flex items-center gap-1.5 mt-4 text-xs font-medium ${urlChange >= 0
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                    }`}
                            >
                                <ArrowUpRight
                                    size={14}
                                    className={urlChange < 0 ? "rotate-90" : ""}
                                />

                                {urlChange >= 0 ? "+" : ""}
                                {urlChange.toFixed(0)}% from last month
                            </div>

                        </div>


                        {/* Clicks */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Total Clicks
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                        {analytics?.totalClicks ?? 0}
                                    </h2>

                                    <div
                                        className={`flex items-center gap-1.5 mt-4 text-xs font-medium ${clickChange >= 0
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        <ArrowUpRight
                                            size={14}
                                            className={clickChange < 0 ? "rotate-90" : ""}
                                        />

                                        {clickChange >= 0 ? "+" : ""}
                                        {clickChange.toFixed(0)}% from last month
                                    </div>

                                </div>

                                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                                    <MousePointerClick
                                        size={21}
                                        className="text-blue-600"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Active */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm font-medium text-slate-500">
                                        Active Links
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                        {analytics?.activeUrls}
                                    </h2>

                                </div>

                                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">

                                    <Activity
                                        size={21}
                                        className="text-emerald-600"
                                    />

                                </div>

                            </div>

                            <div className="mt-4 text-xs font-medium text-slate-500">
                                {analytics?.disabledUrls} inactive links
                            </div>

                        </div>

                    </section>


                    {/* ================= CREATE URL ================= */}

                    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-7">

                        <div className="flex items-start gap-3 mb-5">

                            <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-50 flex items-center justify-center">

                                <Link2
                                    size={20}
                                    className="text-purple-600"
                                />

                            </div>

                            <div>

                                <h2 className="font-semibold text-slate-900">
                                    Shorten a URL
                                </h2>

                                <p className="text-sm text-slate-500 mt-0.5">
                                    Create a short, shareable link in seconds.
                                </p>

                            </div>

                        </div>


                        <div className="flex flex-col sm:flex-row gap-3">

                            <div className="relative flex-1">

                                <LinkIcon
                                    size={18}
                                    className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                                />

                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Paste your long URL here..."
                                    required
                                    maxLength={2048}
                                    className="
        w-full
        pl-11
        pr-4
        py-3
        border border-slate-200
        rounded-xl
        outline-none
        text-sm
        text-slate-900
        placeholder:text-slate-400
        bg-slate-50
        focus:bg-white
        focus:border-purple-500
        focus:ring-4
        focus:ring-purple-50
        transition
    "
                                />

                            </div>
                            <button
                                onClick={handleShortenUrl}
                                disabled={isLoading}
                                className="
        flex
        items-center
        justify-center
        gap-2
        px-6
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
        whitespace-nowrap
    "
                            >
                                <Link2 size={17} />
                                {isLoading ? "Shortening..." : "Shorten URL"}
                            </button>

                        </div>
                        {shortenedUrl && (
                            <div className="mt-5">

                                <p className="text-sm font-medium text-slate-600 mb-2">
                                    Your shortened URL
                                </p>

                                <div className="flex items-center gap-2">

                                    <div className="flex-1 flex items-center justify-between gap-3 px-4 py-3 bg-purple-50 border border-purple-100 rounded-xl">

                                        <a
                                            href={shortenedUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-purple-600 truncate hover:text-purple-700"
                                        >
                                            {shortenedUrl}
                                        </a>

                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(shortenedUrl);
                                                toast.success("Copied!");
                                            }}
                                            className="
                        shrink-0
                        p-2
                        text-purple-600
                        hover:bg-purple-100
                        rounded-lg
                        transition
                    "
                                            title="Copy URL"
                                        >
                                            <Copy size={17} />
                                        </button>

                                    </div>

                                </div>

                            </div>
                        )}
                    </section>


                    {/* ================= ANALYTICS + RECENT LINKS ================= */}

                    <section className="grid grid-cols-1 lg:grid-cols-5 gap-7 mb-7">


                        {/* Analytics */}

                        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

                            <div className="flex items-center justify-between mb-6">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                                        <BarChart3
                                            size={20}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-slate-900">
                                            Click Analytics
                                        </h2>

                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Last 7 days
                                        </p>

                                    </div>

                                </div>

                                <span className="text-sm font-semibold text-slate-900">
                                    {analytics?.totalClicks}
                                </span>

                            </div>


                            {/* Simple graph */}

                            <div className="h-52 flex items-end gap-2 sm:gap-4 border-b border-slate-100 px-2">

                                {weeklyAnalytics.map((day, index) => (

                                    <div
                                        key={index}
                                        className="flex-1 flex flex-col justify-end h-full"
                                    >

                                        <div
                                            title={`${day.clicks} clicks`}
                                            style={{
                                                height: `${weeklyAnalytics.length > 0
                                                    ? (day.clicks / Math.max(...weeklyAnalytics.map(d => d.clicks), 1)) * 100
                                                    : 0
                                                    }%`
                                            }}
                                            className="
        w-full
        max-w-10
        mx-auto
        bg-purple-100
        hover:bg-purple-500
        rounded-t-lg
        transition
    "
                                        />

                                    </div>

                                ))}

                            </div>


                            <div className="flex justify-between mt-3 px-1 text-xs text-slate-400">
                                {weeklyAnalytics.map((day, index) => (
                                    <span key={index}>{day.label}</span>
                                ))}
                            </div>

                        </div>


                        {/* Quick overview */}

                        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                                    <Activity
                                        size={20}
                                        className="text-emerald-600"
                                    />

                                </div>

                                <div>

                                    <h2 className="font-semibold text-slate-900">
                                        Link Performance
                                    </h2>

                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Your top links
                                    </p>

                                </div>

                            </div>

                            <div className="space-y-5">

                                {topLinks.map((link) => {

                                    const percentage =
                                        (link.clicks / maxClicks) * 100;

                                    return (
                                        <div key={link.shortCode}>

                                            <div className="flex justify-between mb-2">

                                                <a
                                                    href={`${API_URL}/${link.shortCode}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-semibold text-purple-600 truncate max-w-[75%]"
                                                >
                                                    {`${API_URL}/${link.shortCode}`}
                                                </a>
                                                <span className="text-sm font-semibold text-slate-900">
                                                    {link.clicks}
                                                </span>

                                            </div>

                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                                                <div
                                                    style={{
                                                        width: `${percentage}%`
                                                    }}
                                                    className="
                            h-full
                            bg-purple-500
                            rounded-full
                            transition-all
                            duration-500
                        "
                                                />

                                            </div>

                                        </div>
                                    );

                                })}

                            </div>

                        </div>

                    </section>


                    {/* ================= RECENT LINKS ================= */}

                    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                        <div className="p-5 sm:p-6 border-b border-slate-200">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                <div>

                                    <h2 className="font-semibold text-slate-900">
                                        Recent Links
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Manage your latest shortened URLs.
                                    </p>

                                </div>


                                <div className="flex items-center gap-2">

                                    <div className="relative hidden sm:block">

                                        <Search
                                            size={16}
                                            className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                        "
                                        />

                                        <input
                                            type="text"
                                            placeholder="Search links..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="
        w-48
        pl-9
        pr-3
        py-2
        text-sm
        bg-slate-50
        border
        border-slate-200
        rounded-lg
        outline-none
        focus:border-purple-400
    "
                                        />

                                    </div>


                                </div>

                            </div>

                        </div>


                        {/* Desktop */}

                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="bg-slate-50 border-b border-slate-200">

                                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Short Link
                                        </th>

                                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Destination
                                        </th>

                                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Clicks
                                        </th>

                                        <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-3"></th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-slate-100">

                                    {filteredDetails.slice(0, details.length).map((link) => {

                                        const shortUrl = `${API_URL}/${link.shortCode}`;

                                        return (
                                            <tr
                                                key={link.shortCode}
                                                className="hover:bg-slate-50 transition"
                                            >

                                                {/* Short Link */}
                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-2">

                                                        <a
                                                            href={shortUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-semibold text-purple-600 hover:text-purple-700"
                                                        >
                                                            {shortUrl}
                                                        </a>

                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(shortUrl);
                                                                toast.success("Copied!");
                                                            }}
                                                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
                                                        >
                                                            <Copy size={15} />
                                                        </button>

                                                    </div>

                                                </td>


                                                {/* Destination */}
                                                <td className="px-6 py-4">

                                                    <span className="block max-w-xs truncate text-sm text-slate-500">
                                                        {link.originalUrl}
                                                    </span>

                                                </td>


                                                {/* Clicks */}
                                                <td className="px-6 py-4">

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {link.clicks}
                                                    </span>

                                                </td>


                                                {/* Status */}
                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${link.isActive
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-red-50 text-red-700"
                                                            }`}
                                                    >

                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${link.isActive
                                                                ? "bg-emerald-500"
                                                                : "bg-red-500"
                                                                }`}
                                                        />

                                                        {link.isActive ? "Active" : "Disabled"}

                                                    </span>

                                                </td>


                                                {/* Menu */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">

                                                        {/* Enable / Disable */}
                                                        <button
                                                            onClick={() =>
                                                                handleToggleStatus(link._id, link.isActive)
                                                            }
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${link.isActive
                                                                ? "bg-purple-600"
                                                                : "bg-slate-300"
                                                                }`}
                                                            title={link.isActive ? "Disable link" : "Enable link"}
                                                        >
                                                            <span
                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${link.isActive
                                                                    ? "translate-x-6"
                                                                    : "translate-x-1"
                                                                    }`}
                                                            />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() => handleDeleteUrl(link._id)}
                                                            className="
                p-2
               
               text-red-600
                hover:bg-red-50
                rounded-lg
                transition
            "
                                                            title="Delete link"
                                                        >
                                                            <Trash2 size={17} />
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>


                        {/* Mobile */}

                        <div className="md:hidden divide-y divide-slate-100">

    {filteredDetails.slice(0, details.length).map((link) => {

        const shortUrl = `${API_URL}/${link.shortCode}`;

        return (
            <div
                key={link.shortCode}
                className="p-5"
            >

                {/* Top section */}
                <div className="flex items-start justify-between gap-3">

                    {/* Link information */}
                    <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">

                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    text-sm
                                    font-semibold
                                    text-purple-600
                                    hover:text-purple-700
                                    truncate
                                "
                            >
                                {shortUrl}
                            </a>

                            {/* Copy */}
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shortUrl);
                                    toast.success("Copied!");
                                }}
                                className="
                                    shrink-0
                                    p-1
                                    text-slate-400
                                    hover:text-slate-700
                                    rounded
                                    transition
                                "
                            >
                                <Copy size={14} />
                            </button>

                        </div>

                        {/* Destination */}
                        <p className="
                            text-xs
                            text-slate-500
                            truncate
                            mt-1
                        ">
                            {link.originalUrl}
                        </p>

                    </div>

                </div>


                {/* Bottom section */}
                <div className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    mt-4
                ">

                    <div className="flex items-center gap-4">

                        {/* Clicks */}
                        <span className="text-xs text-slate-500">
                            {link.clicks} clicks
                        </span>

                        {/* Status */}
                        <span
                            className={`
                                inline-flex
                                items-center
                                gap-1.5
                                px-2
                                py-1
                                text-xs
                                font-semibold
                                rounded-full
                                ${
                                    link.isActive
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-700"
                                }
                            `}
                        >

                            <span
                                className={`
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    ${
                                        link.isActive
                                            ? "bg-emerald-500"
                                            : "bg-red-500"
                                    }
                                `}
                            />

                            {link.isActive
                                ? "Active"
                                : "Disabled"
                            }

                        </span>

                    </div>


                    {/* Actions */}
                    <div className="flex items-center gap-2">

                        {/* Enable / Disable */}
                        <button
                            onClick={() =>
                                handleToggleStatus(
                                    link._id,
                                    link.isActive
                                )
                            }
                            className={`
                                relative
                                inline-flex
                                h-6
                                w-11
                                items-center
                                rounded-full
                                transition-colors
                                ${
                                    link.isActive
                                        ? "bg-purple-600"
                                        : "bg-slate-300"
                                }
                            `}
                            title={
                                link.isActive
                                    ? "Disable link"
                                    : "Enable link"
                            }
                        >

                            <span
                                className={`
                                    inline-block
                                    h-4
                                    w-4
                                    transform
                                    rounded-full
                                    bg-white
                                    shadow-sm
                                    transition-transform
                                    ${
                                        link.isActive
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }
                                `}
                            />

                        </button>


                        {/* Delete */}
                        <button
                            onClick={() =>
                                handleDeleteUrl(link._id)
                            }
                            className="
                                p-2
                                text-red-600
                                hover:bg-red-50
                                rounded-lg
                                transition
                            "
                            title="Delete link"
                        >
                            <Trash2 size={17} />
                        </button>

                    </div>

                </div>

            </div>
        );

    })}

</div>

                    </section>

                </main>

            </div>
        </>
    );
};

export default Dashboard;