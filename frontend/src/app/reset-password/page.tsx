"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setEmail(searchParams.get("email") || "");
        setOtp(searchParams.get("code") || "");
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/users/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to reset password");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center bg-black/40">
            <div className="max-w-md mx-auto w-full">
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-3xl font-extrabold text-white mb-3">Reset Password</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Please enter your new password below.
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
                            Password has been reset successfully! Redirecting to login...
                        </div>
                    )}

                    {!success && (
                        <>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-input-bg border border-white/5 focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                                        placeholder="••••••••••••"
                                        required
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl">
                                        lock
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-input-bg border border-white/5 focus:border-accent-green/50 focus:ring-2 focus:ring-accent-green/20 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                                        placeholder="••••••••••••"
                                        required
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl">
                                        lock_reset
                                    </span>
                                </div>
                            </div>

                            <button
                                className="w-full bg-white text-black font-extrabold py-4 rounded-2xl mt-4 hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-widest shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </>
                    )}
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
    );
}

export default function ResetPasswordPage() {
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
                            Create New <span className="text-accent-pink">Auth</span>.
                        </h1>
                        <p className="text-gray-400 mt-6 text-lg max-w-sm">
                            Your security is our priority. Set a strong password to protect your account.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80">
                            <div className="size-12 rounded-full bg-accent-pink flex items-center justify-center">
                                <span className="material-symbols-outlined text-black">security</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">Strong Encryption</p>
                                <p className="text-gray-400 text-xs">AES-256 standard security</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-24 -left-24 size-80 bg-accent-pink/10 blur-[100px] rounded-full"></div>
                    <div className="absolute -top-24 -right-24 size-80 bg-accent-green/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Right Side: Form Section */}
                <Suspense fallback={<div className="w-full lg:w-1/2 flex items-center justify-center"><p>Loading...</p></div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
