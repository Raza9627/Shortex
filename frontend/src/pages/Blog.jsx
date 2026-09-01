
import React from "react";
import {
    Link,
    ArrowLeft,
    BarChart3,
    ShieldCheck,
    Zap,
    CheckCircle2,
    MousePointerClick
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blog = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* Header */}

            <header className="border-b border-slate-200 bg-white">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="h-16 flex items-center justify-between">

                        {/* Logo */}

                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2.5"
                        >

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
                            ">
                                Shortex
                            </span>

                        </button>


                        {/* Back */}

                        <button
                            onClick={() => navigate("/")}
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
                            Back to home
                        </button>

                    </div>

                </div>

            </header>


            {/* Article */}

            <main>

                {/* Hero */}

                <section className="
                    bg-slate-50
                    border-b
                    border-slate-200
                ">

                    <div className="
                        max-w-4xl
                        mx-auto
                        px-4
                        sm:px-6
                        py-16
                        sm:py-20
                    ">

                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            bg-purple-100
                            text-purple-700
                            text-xs
                            font-semibold
                            mb-5
                        ">
                            <Zap size={14} />
                            Shortex Guide
                        </div>


                        <h1 className="
                            text-3xl
                            sm:text-4xl
                            lg:text-5xl
                            font-bold
                            tracking-tight
                            leading-tight
                            text-slate-900
                        ">
                            Why URL Shorteners Matter
                            for Modern Link Sharing
                        </h1>


                        <p className="
                            mt-5
                            text-base
                            sm:text-lg
                            leading-8
                            text-slate-500
                            max-w-3xl
                        ">
                            Long URLs can be difficult to share, remember,
                            and track. A good URL shortener turns complicated
                            links into simple, manageable URLs while giving
                            you useful insights into how people interact
                            with them.
                        </p>


                        <div className="
                            flex
                            items-center
                            gap-3
                            mt-6
                            text-sm
                            text-slate-400
                        ">
                            <span>Shortex</span>
                            <span>•</span>
                            <span>5 min read</span>
                        </div>

                    </div>

                </section>


                {/* Content */}

                <article className="
                    max-w-3xl
                    mx-auto
                    px-4
                    sm:px-6
                    py-12
                    sm:py-16
                ">

                    {/* Introduction */}

                    <p className="
                        text-lg
                        leading-8
                        text-slate-600
                    ">
                        Links are everywhere. We share them through social
                        media, emails, websites, advertisements, portfolios,
                        and messaging applications. But the original URLs
                        behind those links are often long and difficult to
                        manage.
                    </p>


                    <h2 className="
                        mt-12
                        text-2xl
                        sm:text-3xl
                        font-bold
                    ">
                        What is a URL shortener?
                    </h2>

                    <p className="
                        mt-4
                        text-base
                        leading-8
                        text-slate-600
                    ">
                        A URL shortener is a service that converts a long
                        web address into a shorter link. Instead of sharing
                        a complicated URL containing many parameters, you
                        can share a simple link that redirects visitors to
                        the original destination.
                    </p>


                    {/* Example */}

                    <div className="
                        mt-6
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-5
                        sm:p-6
                    ">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Example
                        </p>

                        <p className="
                            mt-3
                            text-sm
                            text-slate-500
                            break-all
                        ">
                            Long URL:
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-700
                            break-all
                        ">
                            https://example.com/projects/my-awesome-project
                        </p>

                        <p className="
                            mt-4
                            text-sm
                            text-slate-500
                        ">
                            Short URL:
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-semibold
                            text-purple-600
                        ">
                            shortex.dev/abc123
                        </p>

                    </div>


                    {/* Why */}

                    <h2 className="
                        mt-12
                        text-2xl
                        sm:text-3xl
                        font-bold
                    ">
                        Why should you use one?
                    </h2>


                    <div className="mt-7 space-y-6">

                        <div className="flex gap-4">

                            <div className="
                                shrink-0
                                w-10
                                h-10
                                rounded-xl
                                bg-purple-100
                                flex
                                items-center
                                justify-center
                            ">
                                <Link
                                    size={19}
                                    className="text-purple-600"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Cleaner links
                                </h3>

                                <p className="
                                    mt-1
                                    text-sm
                                    leading-7
                                    text-slate-500
                                ">
                                    Short links are easier to read, share,
                                    remember, and place inside social media
                                    posts or marketing material.
                                </p>
                            </div>

                        </div>


                        <div className="flex gap-4">

                            <div className="
                                shrink-0
                                w-10
                                h-10
                                rounded-xl
                                bg-purple-100
                                flex
                                items-center
                                justify-center
                            ">
                                <BarChart3
                                    size={19}
                                    className="text-purple-600"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Track your links
                                </h3>

                                <p className="
                                    mt-1
                                    text-sm
                                    leading-7
                                    text-slate-500
                                ">
                                    Instead of simply sharing a link,
                                    analytics can help you understand how
                                    often that link is being clicked.
                                </p>
                            </div>

                        </div>


                        <div className="flex gap-4">

                            <div className="
                                shrink-0
                                w-10
                                h-10
                                rounded-xl
                                bg-purple-100
                                flex
                                items-center
                                justify-center
                            ">
                                <ShieldCheck
                                    size={19}
                                    className="text-purple-600"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Manage links
                                </h3>

                                <p className="
                                    mt-1
                                    text-sm
                                    leading-7
                                    text-slate-500
                                ">
                                    You can control whether a link remains
                                    active and use expiration settings when
                                    a link should only work for a limited
                                    period.
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Analytics */}

                    <h2 className="
                        mt-14
                        text-2xl
                        sm:text-3xl
                        font-bold
                    ">
                        Why link analytics are useful
                    </h2>

                    <p className="
                        mt-4
                        text-base
                        leading-8
                        text-slate-600
                    ">
                        Creating a short link is only one part of the
                        process. Understanding what happens after someone
                        clicks it can be even more valuable.
                    </p>


                    <div className="
                        mt-7
                        grid
                        sm:grid-cols-2
                        gap-4
                    ">

                        <div className="
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                        ">

                            <MousePointerClick
                                size={21}
                                className="text-purple-600"
                            />

                            <h3 className="mt-3 font-semibold">
                                Click tracking
                            </h3>

                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-slate-500
                            ">
                                See how many times your links have been
                                accessed.
                            </p>

                        </div>


                        <div className="
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                        ">

                            <BarChart3
                                size={21}
                                className="text-purple-600"
                            />

                            <h3 className="mt-3 font-semibold">
                                Performance insights
                            </h3>

                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-slate-500
                            ">
                                Compare link activity over different
                                periods to understand performance.
                            </p>

                        </div>

                    </div>


                    {/* Security */}

                    <h2 className="
                        mt-14
                        text-2xl
                        sm:text-3xl
                        font-bold
                    ">
                        Security and control
                    </h2>

                    <p className="
                        mt-4
                        text-base
                        leading-8
                        text-slate-600
                    ">
                        A link should not necessarily remain available
                        forever. For campaigns, temporary resources, or
                        shared projects, being able to disable or expire
                        links gives you more control over the destinations
                        you share.
                    </p>


                    <ul className="
                        mt-6
                        space-y-3
                    ">

                        <li className="flex items-start gap-3">
                            <CheckCircle2
                                size={19}
                                className="text-purple-600 shrink-0 mt-0.5"
                            />
                            <span className="text-sm leading-6 text-slate-600">
                                Disable links when they are no longer needed.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <CheckCircle2
                                size={19}
                                className="text-purple-600 shrink-0 mt-0.5"
                            />
                            <span className="text-sm leading-6 text-slate-600">
                                Set expiration dates for temporary links.
                            </span>
                        </li>

                        <li className="flex items-start gap-3">
                            <CheckCircle2
                                size={19}
                                className="text-purple-600 shrink-0 mt-0.5"
                            />
                            <span className="text-sm leading-6 text-slate-600">
                                Keep your links organized from one dashboard.
                            </span>
                        </li>

                    </ul>


                    {/* Conclusion */}

                    <div className="
                        mt-14
                        rounded-2xl
                        bg-slate-50
                        border
                        border-slate-200
                        p-6
                        sm:p-8
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                        ">
                            Keep your links simple
                        </h2>

                        <p className="
                            mt-3
                            text-sm
                            sm:text-base
                            leading-7
                            text-slate-600
                        ">
                            URL shorteners are more than a way to make long
                            links shorter. They can make links easier to
                            share, provide useful click insights, and give
                            you better control over the URLs you create.
                        </p>

                        <button
                            onClick={() => navigate("/register")}
                            className="
                                mt-6
                                inline-flex
                                items-center
                                justify-center
                                px-5
                                py-3
                                rounded-xl
                                bg-purple-600
                                hover:bg-purple-700
                                text-white
                                text-sm
                                font-semibold
                                transition
                            "
                        >
                            Create your first short link
                        </button>

                    </div>

                </article>

            </main>


            {/* Footer */}

            <footer className="
                border-t
                border-slate-200
                mt-10
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-7
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-4
                ">

                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} Shortex. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5">

                        <button
                            onClick={() => navigate("/privacy")}
                            className="
                                text-xs
                                text-slate-400
                                hover:text-slate-700
                            "
                        >
                            Privacy
                        </button>

                        <button
                            onClick={() => navigate("/terms")}
                            className="
                                text-xs
                                text-slate-400
                                hover:text-slate-700
                            "
                        >
                            Terms
                        </button>

                    </div>

                </div>

            </footer>

        </div>
    );
};

export default Blog;

