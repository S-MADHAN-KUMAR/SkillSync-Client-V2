"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // Validate inputs
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      // Make API call to login
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Login failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      console.log("Login successful:", data);

      // Normalize and store user info to avoid casing/column-name differences
      if (data.data) {
        const raw: any = data.data;
        const normalized = {
          id: raw.id ?? raw.ID ?? raw.userId ?? raw.userid ?? raw.user_id ?? null,
          email: raw.email ?? raw.email_address ?? null,
          fullName: raw.fullName ?? raw.fullname ?? raw.full_name ?? raw.name ?? "",
          userType: raw.userType ?? raw.usertype ?? raw.user_type ?? raw.role ?? "",
        };

        // Fallback: if still missing userType, try to infer
        if (!normalized.userType && raw.role) normalized.userType = raw.role;

        localStorage.setItem("user", JSON.stringify(normalized));

        // Redirect based on normalized userType
        const redirectPath = normalized.userType === "employer" ? "/employer" : "/candidate";
        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-500 font-medium">Log in to your account to continue.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-2xl text-sm">
            Login successful! Redirecting...
          </div>
        )}

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
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
          <input
            name="password"
            className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
            placeholder="••••••••••••"
            type="password"
            required
            disabled={loading}
          />
        </div>
        <div className="flex justify-end mt-1">
          <Link href="#" className="text-xs font-bold text-accent-green hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button
          className="w-full bg-white text-black font-extrabold py-4 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || success}
        >
          {loading ? "Signing In..." : "Sign In"}
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
        Sign in with Google
      </button>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link className="text-white font-bold hover:underline" href="/register">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
