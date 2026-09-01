import React from "react";
import { Link2 } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5">

                <div className="flex items-center justify-between gap-3">

                    {/* Left */}
                    <div className="flex items-center gap-2 min-w-0">
                        <a
                            href="/"
                            className="flex items-center gap-1.5 shrink-0"
                        >
                            <Link2
                                size={18}
                                strokeWidth={2.4}
                                className="text-purple-600"
                            />

                            <span className="text-sm sm:text-base font-bold text-gray-900">
                                Shortex
                            </span>
                        </a>

                        <span className="text-gray-300 shrink-0">
                            |
                        </span>

                        <p className="text-[10px] sm:text-sm text-gray-400 whitespace-nowrap">
                            © 2026 Shortex. All rights reserved.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-1 sm:gap-3 shrink-0">

                        <a
                            href="https://github.com/Raza9627/Shortex"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
                        >
                            <FaGithub size={17} />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/raza9627"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        >
                            <FaLinkedinIn size={16} />
                        </a>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;