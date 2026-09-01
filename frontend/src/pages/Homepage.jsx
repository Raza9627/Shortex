import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    Link2,
    ArrowRight,
    Zap,
    BarChart3,
    Pencil,
    Clock3,
    ShieldCheck,
    QrCode,
    MousePointerClick,
    Globe,
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


// ---------------------------------------------
// Demo analytics data
// ---------------------------------------------

const analyticsData = [
    { day: "May 12", clicks: 1200 },
    { day: "May 13", clicks: 3000 },
    { day: "May 14", clicks: 2850 },
    { day: "May 15", clicks: 2100 },
    { day: "May 16", clicks: 3900 },
    { day: "May 17", clicks: 3000 },
    { day: "May 18", clicks: 5800 },
];


// ---------------------------------------------
// Features
// ---------------------------------------------

const features = [
    {
        icon: Zap,
        title: "Fast Redirects",
        description:
            "Create short links and redirect users quickly with reliable performance.",
    },
    {
        icon: BarChart3,
        title: "Detailed Analytics",
        description:
            "Track clicks and monitor the performance of all your shortened URLs.",
    },
    {
        icon: Pencil,
        title: "Custom Links",
        description:
            "Create memorable short URLs that are easy to share and remember.",
    },
    {
        icon: Clock3,
        title: "Link Expiration",
        description:
            "Set expiration dates and automatically stop links when they expire.",
    },
    {
        icon: ShieldCheck,
        title: "Secure & Reliable",
        description:
            "Authentication and protected routes keep your links and account secure.",
    },
    {
        icon: QrCode,
        title: "QR Code Ready",
        description:
            "Turn your shortened URLs into QR codes for easy sharing anywhere.",
    },
];


// ---------------------------------------------
// Homepage
// ---------------------------------------------

const Homepage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900">

            <Navbar />

            {/* =========================================
                HERO
            ========================================= */}

            <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">

                {/* Background glow */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-10">

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* ---------------------------------
                            Left side
                        --------------------------------- */}

                        <div>

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                                <Zap size={14} />
                                Fast. Secure. Reliable.
                            </div>


                            {/* Heading */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">

                                Shorten, Share, and
                                <br />

                                Track{" "}
                                <span className="text-purple-600">
                                    Every Link
                                </span>

                            </h1>


                            {/* Description */}
                            <p className="mt-6 text-lg text-gray-500 leading-8 max-w-xl">
                                Create short, memorable URLs in seconds.
                                Get powerful analytics and take control
                                of your links.
                            </p>


                            {/* URL Input */}
                            <div className="mt-8">

                                <div className="
                                    flex items-center
                                    bg-white
                                    border border-gray-200
                                    rounded-xl
                                    shadow-sm
                                    p-1.5
                                    focus-within:ring-2
                                    focus-within:ring-purple-200
                                    focus-within:border-purple-400
                                    transition
                                ">

                                    <Link2
                                        size={21}
                                        className="ml-3 text-purple-600 shrink-0"
                                    />

                                    <input
                                        type="url"
                                        placeholder="Paste your long URL here..."
                                        className="
                                            flex-1
                                            min-w-0
                                            px-3
                                            py-3
                                            outline-none
                                            text-gray-800
                                            placeholder:text-gray-400
                                            bg-transparent
                                        "
                                    />

                                    <button
                                        className="
                                            flex items-center gap-2
                                            bg-purple-600
                                            hover:bg-purple-700
                                            text-white
                                            font-semibold
                                            px-5
                                            py-3
                                            rounded-lg
                                            transition
                                            shrink-0
                                        "
                                    >
                                        <span className="hidden sm:inline">
                                            Shorten URL
                                        </span>

                                        <ArrowRight size={18} />
                                    </button>

                                </div>


                                {/* Terms */}
                                <p className="mt-4 text-xs sm:text-sm text-gray-500">
                                    By using Shortex, you agree to our{" "}
                                    <a
                                        href="/terms"
                                        className="text-purple-600 hover:underline"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="/privacy"
                                        className="text-purple-600 hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </p>

                            </div>

                        </div>


                        {/* ---------------------------------
                            Analytics Preview
                        --------------------------------- */}

                        <div className="
                            bg-white
                            rounded-2xl
                            border border-gray-200
                            shadow-xl
                            shadow-purple-100/40
                            p-5
                            lg:p-6
                        ">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-5">

                                <h2 className="font-semibold text-gray-900">
                                    Analytics Overview
                                </h2>

                                <select
                                    className="
                                        text-xs
                                        border border-gray-200
                                        rounded-md
                                        px-2
                                        py-1.5
                                        text-gray-500
                                        outline-none
                                        bg-white
                                    "
                                >
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 90 days</option>
                                </select>

                            </div>


                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                                <StatCard
                                    title="Total Clicks"
                                    value="24.8K"
                                    change="+12.5%"
                                    icon={MousePointerClick}
                                />

                                <StatCard
                                    title="Unique Clicks"
                                    value="18.6K"
                                    change="+8.3%"
                                    icon={Globe}
                                />

                                <StatCard
                                    title="Links Created"
                                    value="1.2K"
                                    change="+15.7%"
                                    icon={Link2}
                                />

                                <StatCard
                                    title="QR Scans"
                                    value="2.6K"
                                    change="+11.3%"
                                    icon={QrCode}
                                />

                            </div>


                            {/* Graph */}
                            <div className="mt-6">

                                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                                    Clicks Over Time
                                </h3>

                                <div className="h-56 w-full">

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            data={analyticsData}
                                            margin={{
                                                top: 5,
                                                right: 10,
                                                left: -20,
                                                bottom: 0,
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="#eeeeee"
                                            />

                                            <XAxis
                                                dataKey="day"
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#9ca3af",
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                            />

                                            <YAxis
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#9ca3af",
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                                tickFormatter={(value) =>
                                                    value >= 1000
                                                        ? `${value / 1000}K`
                                                        : value
                                                }
                                            />

                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: "10px",
                                                    border: "1px solid #eee",
                                                    boxShadow:
                                                        "0 10px 30px rgba(0,0,0,0.08)",
                                                }}
                                            />

                                            <Line
                                                type="monotone"
                                                dataKey="clicks"
                                                stroke="#7c3aed"
                                                strokeWidth={3}
                                                dot={{
                                                    r: 3,
                                                    fill: "#7c3aed",
                                                }}
                                                activeDot={{
                                                    r: 5,
                                                }}
                                            />

                                        </LineChart>
                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* =========================================
                FEATURES
            ========================================= */}

            <section
                id="features"
                className="bg-white py-16 lg:py-6"
            >

                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center max-w-2xl mx-auto">

                        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                            Features
                        </p>

                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                            Everything you need to optimize your links
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Powerful features to help you shorten,
                            manage, and analyze your URLs.
                        </p>

                    </div>


                    {/* Feature Cards */}
                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-4
                        mt-12
                    ">

                        {features.map((feature) => {

                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="
                                        group
                                        border border-gray-200
                                        rounded-xl
                                        p-6
                                        hover:border-purple-200
                                        hover:shadow-lg
                                        hover:shadow-purple-100/40
                                        transition-all
                                    "
                                >

                                    <div className="
                                        w-10 h-10
                                        flex items-center justify-center
                                        rounded-lg
                                        bg-purple-50
                                        text-purple-600
                                        group-hover:bg-purple-100
                                        transition
                                    ">
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-5 font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {feature.description}
                                    </p>

                                </div>
                            );

                        })}

                    </div>

                </div>

            </section>


            {/* =========================================
                HOW IT WORKS
            ========================================= */}

            <section
                id="how-it-works"
                className="py-16 lg:py-8 bg-white"
            >

                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Steps */}

                        <div>

                            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                                How It Works
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Shorten in 3 simple steps
                            </h2>


                            <div className="mt-10 space-y-8">

                                <Step
                                    number="1"
                                    title="Paste your URL"
                                    description="Add the long URL you want to shorten."
                                />

                                <Step
                                    number="2"
                                    title="Generate Short Link"
                                    description="We'll create a short, unique link for you."
                                />

                                <Step
                                    number="3"
                                    title="Share Anywhere"
                                    description="Share your link and track its performance."
                                />

                            </div>

                        </div>


                        {/* CTA */}

                        <div className="
                            rounded-2xl
                            bg-purple-50
                            border border-purple-100
                            p-8 sm:p-10
                            relative
                            overflow-hidden
                        ">

                            <div className="relative z-10">

                                <h3 className="text-3xl font-bold">
                                    Ready to get started?
                                </h3>

                                <p className="mt-4 text-gray-500 leading-7 max-w-md">
                                    Create your first short link and
                                    start tracking its performance.
                                </p>

                                <a
                                    href="/register"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        mt-7
                                        bg-purple-600
                                        hover:bg-purple-700
                                        text-white
                                        font-semibold
                                        px-5
                                        py-3
                                        rounded-lg
                                        transition
                                    "
                                >
                                    Get Started for Free
                                    <ArrowRight size={18} />
                                </a>

                            </div>


                            {/* Decorative analytics card */}
                            <div className="
                                absolute
                                right-6
                                bottom-6
                                hidden sm:block
                                w-32
                                h-24
                                rounded-xl
                                bg-white
                                border border-purple-100
                                shadow-sm
                                p-4
                            ">

                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Link2
                                            size={15}
                                            className="text-purple-600"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="h-2 bg-gray-100 rounded" />
                                        <div className="h-2 bg-gray-100 rounded mt-2 w-2/3" />
                                    </div>
                                </div>

                                <div className="flex items-end gap-1 mt-4 h-7">
                                    <div className="w-2 h-3 bg-purple-200 rounded-sm" />
                                    <div className="w-2 h-5 bg-purple-300 rounded-sm" />
                                    <div className="w-2 h-4 bg-purple-300 rounded-sm" />
                                    <div className="w-2 h-7 bg-purple-500 rounded-sm" />
                                    <div className="w-2 h-6 bg-purple-400 rounded-sm" />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <Footer />

        </div>
    );
};


// =============================================
// Small Components
// =============================================

const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
}) => {
    return (
        <div className="
            border border-gray-100
            rounded-lg
            p-3
            bg-white
        ">

            <div className="flex items-center justify-between gap-2">

                <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                    {title}
                </p>

                <Icon
                    size={14}
                    className="text-purple-500 shrink-0"
                />

            </div>

            <p className="mt-2 text-lg sm:text-xl font-bold text-gray-900">
                {value}
            </p>

            <p className="mt-1 text-[10px] text-emerald-500">
                ↑ {change}
            </p>

        </div>
    );
};


const Step = ({
    number,
    title,
    description,
}) => {
    return (
        <div className="flex gap-5">

            <div className="
                w-9 h-9
                rounded-full
                bg-purple-600
                text-white
                flex items-center justify-center
                font-semibold
                shrink-0
            ">
                {number}
            </div>

            <div>

                <h3 className="font-semibold text-gray-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>

            </div>

        </div>
    );
};


export default Homepage;