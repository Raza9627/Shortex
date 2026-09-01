import React, { useState } from "react";
import { Link2, Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

                <div className="h-18 flex items-center justify-between">

                    {/* Logo */}
                    <a
                        href="/"
                        className="flex items-center gap-2 shrink-0"
                    >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-50">
                            <Link2
                                size={23}
                                strokeWidth={2.4}
                                className="text-purple-600"
                            />
                        </div>

                        <span className="text-xl font-bold tracking-tight text-black">
                            Shortex
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#features"
                            className="text-sm font-medium text-black hover:text-gray-800 transition-colors"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-black hover:text-gray-800 transition-colors"
                        >
                            How It Works
                        </a>

                        <a
                            href="/blog"
                            className="text-sm font-medium  text-black hover:text-gray-800  transition-colors"
                        >
                            Blog
                        </a>

                        <a
                            href="https://github.com/Raza9627/Shortex"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium  text-black hover:text-gray-800 transition-colors"
                        >
                            GitHub
                        </a>
                    </div>

                    {/* Desktop Authentication */}
                    <div className="hidden md:flex items-center gap-5">
                        <a
                            href="/login"
                            className="text-sm font-semibold text-gray-700 hover:text-gray-950 transition-colors"
                        >
                            Login
                        </a>

                        <a
                            href="/register"
                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
                        >
                            Sign Up
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">
                        <div className="flex flex-col gap-1">

                            <a
                                href="#features"
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                            >
                                Features
                            </a>

                            <a
                                href="#how-it-works"
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                            >
                                How It Works
                            </a>

                            <a
                                href="/blog"
                                className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                            >
                                Blog
                            </a>

                            <a
                                href="https://github.com/Raza9627/Shortex"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                            >
                                GitHub
                            </a>

                            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">

                                <a
                                    href="/login"
                                    className="px-3 py-3 text-center rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                                >
                                    Login
                                </a>

                                <a
                                    href="/register"
                                    className="px-3 py-3 text-center rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                >
                                    Sign Up
                                </a>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </nav>
    );
};

export default Navbar;