"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(45);
    const [canResend, setCanResend] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) {
            router.push("/register");
        }
    }, [email, router]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullOtp = otp.join("");
        if (fullOtp.length < 6) {
            setError("Please enter the full 6-digit code");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/users/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: fullOtp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Verification failed");
            }

            router.push("/login?verified=true");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend || !email) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/users/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to resend OTP");
            }

            setTimer(45);
            setCanResend(false);
            setOtp(new Array(6).fill(""));
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-black font-display">
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        :root {
            --reg-dark: #0f0f0f;
            --reg-card: #1a1a1a;
            --accent-green: #c1e7d1;
            --accent-pink: #f6c3cc;
            --accent-yellow: #f9e8b1;
            --input-bg: #262626;
        }
        body {
            font-family: 'Manrope', sans-serif;
        }
        .registration-container {
            background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
      ` }} />

            <div className="registration-container w-full max-w-5xl h-[85vh] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden flex shadow-2xl border border-white/5">
                <div className="hidden lg:flex w-1/2 bg-reg-card p-12 flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <img src="/logo.png" alt="SkillSync Logo" className="w-10 h-10" />
                            <span className="text-white font-extrabold text-xl tracking-tight">SkillSync</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-white leading-tight">
                            Security <span className="text-accent-green">First.</span>
                        </h1>
                        <p className="text-gray-400 mt-6 text-lg max-w-sm">
                            We've sent a 6-digit verification code to your registered email to ensure your account remains protected.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4 w-72">
                            <div className="size-12 rounded-full bg-accent-pink flex items-center justify-center">
                                <span className="material-symbols-outlined text-black">lock</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">2FA Enabled</p>
                                <p className="text-gray-400 text-xs">Secure login active</p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4 w-72 translate-x-8">
                            <div className="size-12 rounded-full bg-accent-yellow flex items-center justify-center">
                                <span className="material-symbols-outlined text-black">verified_user</span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">Identity Verified</p>
                                <p className="text-gray-400 text-xs">Automatic threat detection</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-24 -left-24 size-80 bg-accent-green/10 blur-[100px] rounded-full"></div>
                    <div className="absolute -top-24 -right-24 size-80 bg-accent-pink/10 blur-[100px] rounded-full"></div>
                </div>

                <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center bg-black/40">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-extrabold text-white mb-2">Enter Verification Code</h2>
                            <p className="text-gray-500 font-medium">Please enter the 6-digit code sent to <span className="text-white">{email}</span></p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-between gap-2">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        className="w-12 h-16 bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl text-center text-2xl font-bold transition-all"
                                        type="text"
                                        maxLength={1}
                                        value={data}
                                        placeholder="•"
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        disabled={loading}
                                    />
                                ))}
                            </div>

                            <div className="space-y-4">
                                <button
                                    className="w-full bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide disabled:opacity-50"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Verify & Proceed"}
                                </button>

                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm text-gray-500">Didn't receive the code?</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            className={`${canResend ? "text-accent-green hover:underline" : "text-gray-600 cursor-not-allowed"} font-bold text-sm transition-all`}
                                            disabled={!canResend}
                                        >
                                            Resend Code
                                        </button>
                                        {!canResend && (
                                            <span className="text-gray-600 text-sm font-medium">in 00:{timer.toString().padStart(2, '0')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-gray-500">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <button
                                onClick={() => router.push("/login")}
                                className="text-sm font-bold hover:text-white transition-colors"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
