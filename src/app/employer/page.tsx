"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
}

export default function EmployerFeed() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    // Prevent multiple checks
    if (hasChecked.current) return;
    hasChecked.current = true;

    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const userData: User = JSON.parse(storedUser);
    
    if (userData.userType !== "employer") {
      router.push("/candidate");
      return;
    }

    setUser(userData);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Show loading state while checking auth
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.fullName}!</h1>
            <p className="text-gray-400">Manage your job postings and review applicants</p>
          </div>

          {/* Applicants Feed */}
          <div className="space-y-6">
            {/* Sample Applicant Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">John Doe</h3>
                    <p className="text-gray-400">Applied for Senior React Developer</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-accent-green text-black font-bold rounded-full hover:opacity-90 transition-opacity">
                    Accept
                  </button>
                  <button className="px-6 py-2 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mb-3">3+ years of React experience, TypeScript expert</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">React</span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">TypeScript</span>
              </div>
            </div>

            {/* Sample Applicant Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold">SM</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Sarah Miller</h3>
                    <p className="text-gray-400">Applied for Full Stack Engineer</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-accent-green text-black font-bold rounded-full hover:opacity-90 transition-opacity">
                    Accept
                  </button>
                  <button className="px-6 py-2 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mb-3">Full stack developer with Node.js and React expertise</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Node.js</span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">React</span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
