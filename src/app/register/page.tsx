"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState<"candidate" | "employer">("candidate");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // Replace with real submit logic
    // eslint-disable-next-line no-console
    console.log({ ...data, role });
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
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
          <input
            name="name"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="George Wilson"
            type="text"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <input
            name="email"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="george@example.com"
            type="email"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Mobile Number</label>
          <input
            name="mobile"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="+1 (555) 555-5555"
            type="tel"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
          <input
            name="password"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="••••••••••••"
            type="password"
          />
        </div>
        <button
          className="w-full bg-white text-black font-extrabold py-4 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide primary-cta"
          type="submit"
        >
          Create Account
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
