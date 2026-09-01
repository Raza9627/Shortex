import React from "react";
import { Link2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
             
             <Navbar/>
         
            {/* Content */}
            <main className="max-w-4xl mx-auto px-5 py-12">

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>


                <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10">

                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Privacy Policy
                    </h1>

                    <p className="mt-3 text-sm text-gray-400">
                        Last updated: August 2026
                    </p>


                    <div className="mt-10 space-y-8 text-gray-600 leading-7">

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                1. Information We Collect
                            </h2>

                            <p className="mt-3">
                                When you create a Shortex account, we may
                                collect information such as your name and
                                email address. We also store the URLs you
                                create and information related to their
                                usage.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                2. How We Use Your Information
                            </h2>

                            <p className="mt-3">
                                We use your information to provide and
                                improve Shortex, manage your account,
                                generate short URLs, provide analytics,
                                and communicate with you when necessary.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                3. Link Analytics
                            </h2>

                            <p className="mt-3">
                                Shortex may collect information about
                                interactions with shortened URLs, such as
                                click counts, in order to provide analytics
                                to users.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                4. Password Security
                            </h2>

                            <p className="mt-3">
                                Passwords are securely hashed before being
                                stored. We do not store your password in
                                plain text.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                5. Password Reset
                            </h2>

                            <p className="mt-3">
                                If you request a password reset, we may send
                                a password reset link to your registered
                                email address. Reset links are temporary
                                and expire after a limited period.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                6. Data Protection
                            </h2>

                            <p className="mt-3">
                                We take reasonable measures to protect your
                                account information and prevent unauthorized
                                access.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                7. Third-Party Services
                            </h2>

                            <p className="mt-3">
                                Shortex may use third-party services for
                                hosting, email delivery, database storage,
                                analytics, or other infrastructure required
                                to operate the application.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                8. Changes to This Policy
                            </h2>

                            <p className="mt-3">
                                This Privacy Policy may be updated from
                                time to time. Any changes will be reflected
                                on this page.
                            </p>
                        </section>


                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                9. Contact
                            </h2>

                            <p className="mt-3">
                                If you have questions about this Privacy
                                Policy, you can contact the Shortex
                                project administrator.
                            </p>
                        </section>


                        {/* Disclaimer */}
                        <div className="mt-10 rounded-xl bg-purple-50 border border-purple-100 p-5 text-sm text-gray-600">
                            <strong className="text-gray-900">
                                Note:
                            </strong>{" "}
                            Shortex is a portfolio/demo project. This
                            Privacy Policy is provided for informational
                            purposes and does not constitute legal advice.
                        </div>

                    </div>

                </div>

            </main>
            <Footer/>

        </div>
    );
};

export default Privacy;