"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const mobile = formData.get("mobile") as string;
      const password = formData.get("password") as string;

      // Validate inputs
      if (!name || !email || !password) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Make API call to register
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email: email,
          mobile_number: mobile,
          password: password,
          userType: role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      console.log("Registration successful:", data);

      // Redirect to OTP verification page
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-extrabold text-white mb-2">Create Account</h2>
        <p className="text-gray-500 font-medium">Step into your future with one click.</p>
      </div>

      <div className="role-toggle bg-input-bg p-1.5 rounded-2xl flex mb-8">
        <button
          type="button"
          onClick={() => setRole("candidate")}
          className={
            (role === "candidate"
              ? "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all bg-white text-black shadow-lg"
              : "flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all")
          }
        >
          Candidate
        </button>
        <button
          type="button"
          onClick={() => setRole("employer")}
          className={
            (role === "employer"
              ? "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all bg-white text-black shadow-lg"
              : "flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all")
          }
        >
          Employer
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-2xl text-sm">
            Registration successful! Redirecting to login...
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
          <input
            name="name"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="George Wilson"
            type="text"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <input
            name="email"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="george@example.com"
            type="email"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Mobile Number</label>
          <input
            name="mobile"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="+1 (555) 555-5555"
            type="tel"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
          <input
            name="password"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="••••••••••••"
            type="password"
            required
            minLength={6}
            disabled={loading}
          />
        </div>
        <button
          className="w-full bg-white text-black font-extrabold py-4 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide primary-cta disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || success}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0f0f0f] px-4 text-gray-500 font-bold tracking-widest">Or continue with</span>
        </div>
      </div>

      <button className="w-full bg-input-bg hover:bg-white/10 border border-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all">
        <svg className="size-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          ></path>
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          ></path>
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          ></path>
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          ></path>
        </svg>
        Sign up with Google
      </button>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link className="text-white font-bold hover:underline" href="/login">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
