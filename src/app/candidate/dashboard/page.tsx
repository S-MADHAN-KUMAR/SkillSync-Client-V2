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
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
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
      <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden flex font-inter selection:bg-blue-100">
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      ` }} />

      {/* Main Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 bg-[#f5f7f9] flex flex-col border-r border-gray-200 overflow-hidden relative">
        <div className="p-8 h-full overflow-y-auto custom-scrollbar">

          {/* Create Post Section */}
          <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">edit_note</span>
              Create Post
            </h2>
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div>
                  <input
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    placeholder="Post Title"
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all resize-none h-24 outline-none"
                    placeholder="What's on your mind? Share your thoughts or achievements..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  <button className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all shrink-0">
                    <span className="material-symbols-outlined">add_photo_alternate</span>
                  </button>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 relative group cursor-pointer overflow-hidden">
                      <span className="material-symbols-outlined text-gray-400">image</span>
                      <div className="absolute inset-0 bg-black/40 rounded-xl hidden group-hover:flex items-center justify-center backdrop-blur-[1px] transition-all">
                        <span className="material-symbols-outlined text-white">close</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
                    disabled={!postTitle || !postContent}>
                    <span className="material-symbols-outlined text-sm">send</span>
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">query_stats</span>
              Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Total Applied */}
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 flex flex-col h-56 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Applied</p>
                    <h3 className="text-3xl font-bold text-gray-900">42</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">send</span>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-between gap-2 px-1">
                  {[40, 70, 50, 85, 60].map((h, i) => (
                    <div key={i}
                      style={{
                        height: `${h}%`,
                        transitionDelay: `${i * 100}ms`
                      }}
                      className={`w-full bg-blue-500 rounded-t-sm transition-all duration-1000`}
                    >
                      <div className="w-full h-full" style={{ backgroundColor: `rgba(59, 130, 246, ${i === 3 ? 1 : (i + 1) * 0.15 + 0.1})` }}></div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center font-medium">Last 7 Days</p>
              </div>

              {/* Profile Views */}
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 flex flex-col h-56 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Profile Views</p>
                    <h3 className="text-3xl font-bold text-gray-900">1,208</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center relative group">
                  <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                    <path d="M0,45 C20,40 40,10 60,25 S80,35 100,5" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="3" className="path-animation"></path>
                    <circle cx="100" cy="5" fill="#ffffff" r="3" stroke="#4ade80" strokeWidth="2" className="animate-pulse"></circle>
                  </svg>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes draw { to { stroke-dashoffset: 0; } }
                    .path-animation {
                      stroke-dasharray: 200;
                      stroke-dashoffset: 200;
                      animation: draw 1.5s ease-out forwards;
                    }
                  ` }} />
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +12% this week
                </p>
              </div>

              {/* Saved Items Summary */}
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 flex flex-col h-56 justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Saved Items</p>
                    <h3 className="text-3xl font-bold text-gray-900">18</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                    <span className="material-symbols-outlined">bookmark</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group transition-all hover:bg-blue-50 hover:pl-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-sm">work</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Jobs</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group transition-all hover:bg-blue-50 hover:pl-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-sm">article</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Posts</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">6</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>

      {/* Right Sidebar - Saved Content */}
      <aside className="w-[380px] bg-[#f8fafc] flex flex-col relative overflow-hidden border-l border-gray-100 hidden xl:flex">
        <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">View All</button>
          </div>

          <div className="space-y-3 mb-10">
            {/* Job Item 1 */}
            <div className="bg-white p-4 rounded-[24px] shadow-sm border border-transparent hover:border-blue-200 transition-all cursor-pointer group hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 shrink-0 group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined">square</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">Middle UX/UI Designer</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Dropbox Inc.</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">Applied</span>
                <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-lg">$1.5k</span>
              </div>
            </div>

            {/* Job Item 2 */}
            <div className="bg-white p-4 rounded-[24px] shadow-sm border border-transparent hover:border-blue-200 transition-all cursor-pointer group hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 shrink-0 group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined">crop_din</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">Senior React Dev</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Spotify Inc.</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">Remote</span>
                <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-lg">$3.2k</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-gray-900">Saved Posts</h2>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">View All</button>
          </div>

          <div className="space-y-4">
            {/* Post Item 1 */}
            <div className="bg-white p-4 rounded-[24px] shadow-sm border border-transparent hover:border-pink-200 transition-all cursor-pointer group hover:shadow-lg">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100">
                  <img
                    alt="Author"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-900">Sarah Jenkins</h4>
                    <span className="text-[10px] text-gray-400 font-medium">2h ago</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">Just published a new case study on minimalist design systems for fintech apps. Check it out!</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-pink-50 text-pink-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">#Design</span>
                </div>
                <button className="text-gray-400 hover:text-blue-600 transition-colors transform hover:rotate-12">
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                </button>
              </div>
            </div>

            {/* Post Item 2 */}
            <div className="bg-white p-4 rounded-[24px] shadow-sm border border-transparent hover:border-pink-200 transition-all cursor-pointer group hover:shadow-lg">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-100">
                  <img
                    alt="Author"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-900">Tech Daily</h4>
                    <span className="text-[10px] text-gray-400 font-medium">5h ago</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">Top 10 VS Code extensions you need in 2024. Productivity boosters inside.</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">#Coding</span>
                </div>
                <button className="text-gray-400 hover:text-blue-600 transition-colors transform hover:rotate-12">
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                </button>
              </div>
            </div>
          </div>

          <div className="h-28"></div>
        </div>

        {/* Global Action Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center bg-gradient-to-t from-[#f8fafc] via-[#f8fafc] to-transparent pointer-events-none">
          <button className="w-full h-14 bg-gray-900 text-white rounded-full font-bold text-base hover:bg-black transition-all shadow-xl pointer-events-auto flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-95">
            <span className="material-symbols-outlined">person</span>
            Manage Profile
          </button>
        </div>
      </aside>
    </div>
  );
}
