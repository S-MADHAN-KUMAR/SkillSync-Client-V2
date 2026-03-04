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

const SavedJobCard = ({
  iconClass,
  iconBg,
  iconColor,
  icon,
  title,
  company,
  badgeColor,
  badgeText,
  salary,
}: {
  iconClass?: string;
  iconBg: string;
  iconColor: string;
  icon: string;
  title: string;
  company: string;
  badgeColor: string;
  badgeText: string;
  salary?: string;
}) => (
  <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-blue-200 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-gray-900 truncate">{title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{company}</p>
      </div>
      <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
    <div className="mt-3 flex gap-2">
      <span className={`px-2 py-1 ${badgeColor} text-[10px] font-bold rounded-md`}>{badgeText}</span>
      {salary && (
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">{salary}</span>
      )}
    </div>
  </div>
);

const SavedPostCard = ({
  avatar,
  author,
  time,
  snippet,
  tag,
  tagColor,
}: {
  avatar: string;
  author: string;
  time: string;
  snippet: string;
  tag: string;
  tagColor: string;
}) => (
  <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-pink-200 transition-all cursor-pointer group">
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
        <img alt={author} className="w-full h-full object-cover" src={avatar} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-sm text-gray-900">{author}</h4>
          <span className="text-[10px] text-gray-400">{time}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{snippet}</p>
      </div>
    </div>
    <div className="mt-3 flex justify-between items-center">
      <div className="flex gap-2">
        <span className={`px-2 py-1 ${tagColor} text-[10px] font-bold rounded-md`}>{tag}</span>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <span className="material-symbols-outlined text-lg">open_in_new</span>
      </button>
    </div>
  </div>
);

export default function CandidateDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const hasChecked = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="w-full bg-white overflow-hidden flex">
        <Sidebar user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <main className="flex-1 bg-[var(--off-white)] flex flex-col border-r border-gray-200 overflow-hidden relative">
          <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            {/* Header with Dropdown */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back to your workspace</p>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-gray-100 font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <span className="material-symbols-outlined text-blue-500">grid_view</span>
                  <span>Quick Actions</span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-gray-50 py-3 z-50 animate-in fade-in zoom-in duration-200">
                    <button
                      onClick={() => { router.push("/candidate/posts"); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg text-blue-500">article</span>
                      All Posts
                    </button>
                    <button
                      onClick={() => { router.push("/candidate/applications"); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg text-green-500">description</span>
                      Applications
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg text-purple-500">settings</span>
                      Settings
                    </button>
                    <div className="my-2 border-t border-gray-100 mx-4" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Create Post */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Post</h2>
              <div className="bg-white p-6 rounded-[32px] shadow-sm">
                <div className="space-y-4">
                  <div>
                    <input
                      className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Post Title"
                      type="text"
                    />
                  </div>
                  <div>
                    <textarea
                      className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all resize-none h-24"
                      placeholder="What's on your mind? Share your thoughts or achievements..."
                    />
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    <button className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors shrink-0">
                      <span className="material-symbols-outlined">add_photo_alternate</span>
                    </button>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 relative group cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-gray-400">image</span>
                        {i === 1 && (
                          <div className="absolute inset-0 bg-black/20 rounded-xl hidden group-hover:flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">close</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-black transition-colors shadow-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">send</span>
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Total Applied */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-56">
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
                    {[40, 60, 50, 100, 70].map((h, i) => (
                      <div
                        key={i}
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ height: `${h}%`, opacity: h / 100 + 0.2 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">Last 7 Days</p>
                </div>

                {/* Profile Views */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-56">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Profile Views</p>
                      <h3 className="text-3xl font-bold text-gray-900">1,208</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                      <path
                        d="M0,45 C20,40 40,10 60,25 S80,35 100,5"
                        fill="none"
                        stroke="#4ade80"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <circle cx="100" cy="5" fill="#ffffff" r="3" stroke="#4ade80" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    +12% this week
                  </p>
                </div>

                {/* Saved Items */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-56 justify-between">
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
                    {[
                      { bg: "bg-yellow-100", color: "text-yellow-600", icon: "work", label: "Jobs", count: 12 },
                      { bg: "bg-purple-100", color: "text-purple-600", icon: "article", label: "Posts", count: 6 },
                    ].map(({ bg, color, icon, label, count }) => (
                      <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center ${color}`}>
                            <span className="material-symbols-outlined text-sm">{icon}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{label}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar (Right Aside) */}
        <aside className="w-[380px] bg-[var(--preview-bg)] flex flex-col relative overflow-hidden border-l border-gray-100">
          <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
            {/* Saved Jobs */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3 mb-10">
              <SavedJobCard
                iconBg="bg-blue-100"
                iconColor="text-blue-500"
                icon="square"
                title="Middle UX/UI Designer"
                company="Dropbox Inc."
                badgeColor="bg-green-50 text-green-700"
                badgeText="Applied"
                salary="$1.5k"
              />
              <SavedJobCard
                iconBg="bg-red-100"
                iconColor="text-red-500"
                icon="crop_din"
                title="Senior React Dev"
                company="Spotify Inc."
                badgeColor="bg-blue-50 text-blue-700"
                badgeText="Remote"
                salary="$3.2k"
              />
              <SavedJobCard
                iconBg="bg-yellow-100"
                iconColor="text-yellow-600"
                icon="bolt"
                title="Product Manager"
                company="Linear"
                badgeColor="bg-purple-50 text-purple-700"
                badgeText="Contract"
              />
            </div>

            {/* Saved Posts */}
            <div className="flex items-center justify-between mb-6 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Posts</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              <SavedPostCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAk8bWL2pjSvFph9iM9-Bd4s8sYYFtUqfRfRkD3sk_HD7fSpGf0MkqR1hLBklwLmAFrE7KdOcqscTZvd6rsshH7HhjnzqK35K2U1JgHKZ9xhYly9R5LmpxaQqXlaZnIY8H8bl5KRv8gm-ZC1FZQPK-PemjHEkNt9-8o3mKP-LsGql0NjHxCaqvSfZOoas-IDHl_f3ose9LmILOR3wb-p4j39MYxBgK5rdkUnsVDDUcm9tgmy9SVEQrqsf5ipOnsZVM3AXIc21prXuY"
                author="Sarah Jenkins"
                time="2h ago"
                snippet="Just published a new case study on minimalist design systems for fintech apps. Check it out!"
                tag="#Design"
                tagColor="bg-pink-50 text-pink-700"
              />
              <SavedPostCard
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuA6zrUOgbKD3GLprvjHm1og1HuNnqoJiX2aZI_kejsCEyEPT76bAIdKTjyKvblGFbIpxACuC1IVPsKRBIOwwKqII3phrwLNQ-LRltTotZUSz9ajoUHpbQDkuhd2AgFS_TFTGAcOJ4s3tqDLMIltTSxezLyi34FVDebylZwQe0FasABXYc8sJAsj4SGrkK97mZlKAG7s5P7sFV9OXrbGYFAWhIsYfEqLtt0luxktnpVWSGEA1nEZCuWrqhXXMPA1GwlVzx0pvGdcTY0"
                author="Tech Daily"
                time="5h ago"
                snippet="Top 10 VS Code extensions you need in 2024. Productivity boosters inside."
                tag="#Coding"
                tagColor="bg-blue-50 text-blue-700"
              />
              <div className="h-20" />
            </div>
          </div>

          {/* Manage Profile CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent pointer-events-none">
            <button className="w-full h-14 bg-gray-900 text-white rounded-full font-bold text-base hover:bg-black transition-colors shadow-xl pointer-events-auto flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">person</span>
              Manage Profile
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}