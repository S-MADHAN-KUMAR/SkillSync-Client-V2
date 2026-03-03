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

export default function CandidateDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const userData: User = JSON.parse(storedUser);
      if (userData.userType !== "candidate") {
        router.push("/employer");
        return;
      }
      setUser(userData);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

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

      <div className="flex-1 overflow-y-auto">
        <div className="bg-[var(--off-white)] min-h-screen">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.fullName}!</p>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Applications</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">+2 this week</p>
              </div>

              <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Profile Views</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">248</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">+45 this week</p>
              </div>

              <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Saved Jobs</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">+1 this week</p>
              </div>

              <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Interviews</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">2 upcoming</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Applications</h2>
                <div className="space-y-4">
                  {[
                    { company: "Dropbox Inc.", position: "UX/UI Designer", status: "In Review", date: "2 days ago" },
                    { company: "Spotify Inc.", position: "Frontend Developer", status: "Screening", date: "4 days ago" },
                    { company: "Airbnb Agency", position: "Content Manager", status: "Rejected", date: "1 week ago" },
                  ].map((app, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{app.position}</p>
                        <p className="text-xs text-gray-500 mt-1">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          app.status === "In Review" ? "bg-yellow-100 text-yellow-700" :
                          app.status === "Screening" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-gray-400">{app.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Profile Completeness</span>
                      <span className="text-sm font-bold text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Match Rate</span>
                      <span className="text-sm font-bold text-gray-900">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Response Rate</span>
                      <span className="text-sm font-bold text-gray-900">64%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
