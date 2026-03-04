"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:5000/api/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-black text-white selection:bg-accent-green selection:text-black">
            <div className="registration-container w-full max-w-5xl h-[85vh] rounded-5xl overflow-hidden flex shadow-2xl border border-white/5 bg-reg-dark">
                {/* Left Side: Creative Section */}
                <div className="hidden lg:flex w-1/2 bg-reg-card p-12 flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <img src="/logo.png" alt="SkillSync Logo" className="w-10 h-10" />
                            <span className="text-white font-extrabold text-xl tracking-tight">SkillSync</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-white leading-tight">
                            Reset <span className="text-accent-pink">Password</span>.
                        </h1>
                        <p className="text-gray-400 mt-6 text-lg max-w-sm">
                            Secure your account access and continue your professional journey.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80">
                            <div className="size-12 rounded-full bg-accent-green flex items-center justify-center">
                                <span className="material-symbols-outlined text-black">mail</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">Instructions Sent</p>
                                <p className="text-gray-400 text-xs">Check your inbox for a link</p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80 translate-x-12">
                            <div className="size-12 rounded-full bg-accent-yellow flex items-center justify-center">
                                <span className="material-symbols-outlined text-black">verified_user</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">Security Verified</p>
                                <p className="text-gray-400 text-xs">Identity confirmed via email</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Blurs */}
                    <div className="absolute -bottom-24 -left-24 size-80 bg-accent-pink/10 blur-[100px] rounded-full"></div>
                    <div className="absolute -top-24 -right-24 size-80 bg-accent-green/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Right Side: Form Section */}
                <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center bg-black/40">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-extrabold text-white mb-3 text-balance">Forgot Password?</h2>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Enter your email address to receive a secure password reset link.
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="bg-accent-green/10 border border-accent-green/20 text-accent-green p-4 rounded-xl text-sm font-medium">
                                    Reset link has been sent to your email!
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-input-bg border border-white/5 focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                                        placeholder="george@example.com"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl">
                                        alternate_email
                                    </span>
                                </div>
                            </div>

                            <button
                                className="w-full bg-white text-black font-extrabold py-4 rounded-2xl mt-4 hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-widest shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <Link
                                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white font-bold transition-colors group"
                                href="/login"
                            >
                                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                                    arrow_back
                                </span>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
