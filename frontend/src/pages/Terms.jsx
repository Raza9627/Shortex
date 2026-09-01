import React from "react";
import { Link2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
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
                        Terms of Service
                    </h1>

                    <p className="mt-3 text-sm text-gray-400">
                        Last updated: August 2026
                    </p>


                    <div className="mt-10 space-y-8 text-gray-600 leading-7">

                        {/* 1 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                1. Acceptance of Terms
                            </h2>

                            <p className="mt-3">
                                By accessing or using Shortex, you agree to
                                these Terms of Service. If you do not agree
                                with these terms, please do not use the
                                service.
                            </p>
                        </section>


                        {/* 2 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                2. Use of the Service
                            </h2>

                            <p className="mt-3">
                                Shortex allows users to create, manage, and
                                analyze shortened URLs. You agree to use
                                the service only for lawful purposes.
                            </p>
                        </section>


                        {/* 3 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                3. Prohibited Activities
                            </h2>

                            <p className="mt-3">
                                You must not use Shortex to create or
                                distribute links that are intended to:
                            </p>

                            <ul className="mt-3 list-disc pl-6 space-y-2">
                                <li>Distribute malware or harmful software.</li>
                                <li>Conduct phishing or fraud.</li>
                                <li>Distribute illegal content.</li>
                                <li>Send spam or malicious redirects.</li>
                                <li>Attempt to compromise other users or the service.</li>
                            </ul>
                        </section>


                        {/* 4 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                4. User Accounts
                            </h2>

                            <p className="mt-3">
                                You are responsible for maintaining the
                                security of your account credentials and
                                for all activity performed through your
                                account.
                            </p>
                        </section>


                        {/* 5 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                5. Shortened URLs
                            </h2>

                            <p className="mt-3">
                                Shortex reserves the right to disable or
                                remove shortened URLs that violate these
                                terms, are abusive, or pose a security
                                risk.
                            </p>
                        </section>


                        {/* 6 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                6. Link Expiration
                            </h2>

                            <p className="mt-3">
                                Users may configure expiration dates for
                                their shortened URLs. Expired links may no
                                longer redirect to their original
                                destinations.
                            </p>
                        </section>


                        {/* 7 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                7. Service Availability
                            </h2>

                            <p className="mt-3">
                                Shortex is provided on an
                                "as-is" and "as-available" basis. We do not
                                guarantee that the service will always be
                                available, uninterrupted, or error-free.
                            </p>
                        </section>


                        {/* 8 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                8. Account Termination
                            </h2>

                            <p className="mt-3">
                                We may suspend or terminate accounts that
                                violate these Terms of Service or misuse
                                the Shortex platform.
                            </p>
                        </section>


                        {/* 9 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                9. Changes to These Terms
                            </h2>

                            <p className="mt-3">
                                These Terms of Service may be updated from
                                time to time. Changes will be reflected on
                                this page.
                            </p>
                        </section>


                        {/* 10 */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900">
                                10. Contact
                            </h2>

                            <p className="mt-3">
                                If you have questions regarding these
                                Terms of Service, you can contact the
                                Shortex project administrator.
                            </p>
                        </section>


                        {/* Disclaimer */}
                        <div className="mt-10 rounded-xl bg-purple-50 border border-purple-100 p-5 text-sm text-gray-600">

                            <strong className="text-gray-900">
                                Note:
                            </strong>{" "}
                            Shortex is a portfolio/demo project. These
                            Terms of Service are provided for
                            informational purposes and do not constitute
                            legal advice.

                        </div>

                    </div>

                </div>

            </main>
            <Footer/>

        </div>
    );
};

export default Terms;