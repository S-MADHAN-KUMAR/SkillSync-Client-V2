"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
}

export default function AIInterviewResult() {
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
        <div className="text-white text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen   bg-[#1a1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full bg-white overflow-hidden flex  ">
        <Sidebar user={user} onLogout={handleLogout} />

        <main className="flex-1 bg-[var(--off-white)] flex flex-col border-r border-gray-200 overflow-hidden relative">
          <div className="p-8 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">Interview Analysis</h1>
            <p className="text-gray-500 text-sm">Session ID: #AI-2023-884 • Frontend Architect Role</p>
          </div>

          <div className="px-8 pb-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900">Overall Score</h3>
                <p className="text-sm text-gray-500 max-w-[200px] mt-1">Great performance! You showed strong technical knowledge but could improve on pacing.</p>
              </div>
              <div className="relative w-32 h-32 rounded-full donut-chart flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-3xl font-bold text-blue-600">84</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">/ 100</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mb-4">
              <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-full">All Questions</button>
              <button className="px-4 py-2 bg-white text-gray-500 border border-gray-200 text-xs font-bold rounded-full hover:bg-gray-50">Technical</button>
              <button className="px-4 py-2 bg-white text-gray-500 border border-gray-200 text-xs font-bold rounded-full hover:bg-gray-50">Behavioral</button>
              <button className="px-4 py-2 bg-white text-red-500 border border-red-100 text-xs font-bold rounded-full hover:bg-red-50 flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Needs Work
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-6">
            <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-800 text-lg">Q1. Explain the difference between debouncing and throttling.</h4>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Score: 9/10</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-gray-300">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">What you said</p>
                  <p className="text-sm text-gray-700 leading-relaxed">"Debouncing ensures a function doesn't execute until <span className="bg-green-100 text-green-800 px-1 rounded">a certain amount of time has passed</span> since the last call. Throttling, on the other hand, limits the execution to once every specified time interval."</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-400">
                  <p className="text-xs font-bold text-blue-400 uppercase mb-1 flex items-center"><span className="material-symbols-outlined text-sm mr-1">auto_awesome</span> AI Suggestion</p>
                  <p className="text-sm text-gray-700 leading-relaxed">Your definition is accurate. To improve, mention <span className="bg-blue-100 text-blue-800 px-1 rounded">practical use cases</span> like search bars for debouncing and scroll events for throttling to show applied knowledge.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-800 text-lg">Q2. How do you handle conflict in a team?</h4>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Score: 6/10</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-gray-300">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">What you said</p>
                  <p className="text-sm text-gray-700 leading-relaxed">"I usually just try to ignore it and focus on my work. If it gets bad, I might tell the manager <span className="bg-red-100 text-red-800 px-1 rounded">so they can fix it</span>."</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-400">
                  <p className="text-xs font-bold text-blue-400 uppercase mb-1 flex items-center"><span className="material-symbols-outlined text-sm mr-1">auto_awesome</span> AI Suggestion</p>
                  <p className="text-sm text-gray-700 leading-relaxed">This response avoids direct resolution. Instead, emphasize <span className="bg-blue-100 text-blue-800 px-1 rounded">active listening</span> and <span className="bg-blue-100 text-blue-800 px-1 rounded">open communication</span> before escalating. Use the STAR method to describe a specific past situation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-800 text-lg">Q3. Describe React Context API.</h4>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Score: 10/10</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-gray-300">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">What you said</p>
                  <p className="text-sm text-gray-700 leading-relaxed">"Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's useful for global state management like theme or user auth."</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-400">
                  <p className="text-xs font-bold text-blue-400 uppercase mb-1 flex items-center"><span className="material-symbols-outlined text-sm mr-1">auto_awesome</span> AI Suggestion</p>
                  <p className="text-sm text-gray-700 leading-relaxed">Excellent answer! You covered the core purpose and provided perfect examples. No major improvements needed here.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-[380px] bg-[var(--preview-bg)] flex flex-col p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Detailed Ratings</h2>
            <button className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-gray-900 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-lg">settings</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8 pr-2">
            <div className="bg-white p-5 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">code</span>
                  </span>
                  <span className="font-bold text-gray-800">Technical Accuracy</span>
                </div>
                <span className="text-xl font-bold text-blue-600">92%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Your technical definitions were precise. You correctly identified key concepts in 9 out of 10 questions.</p>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  </span>
                  <span className="font-bold text-gray-800">Tone & Confidence</span>
                </div>
                <span className="text-xl font-bold text-purple-600">78%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '78%' }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Generally confident, but hesitation markers ("um", "uh") appeared frequently during behavioral questions.</p>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">speed</span>
                  </span>
                  <span className="font-bold text-gray-800">Speaking Pace</span>
                </div>
                <span className="text-xl font-bold text-orange-600">65%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div className="bg-orange-400 h-3 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Slightly too fast at 160 words per minute. Aim for 130-150 wpm for better clarity.</p>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">label</span>
                  </span>
                  <span className="font-bold text-gray-800">Keyword Coverage</span>
                </div>
                <span className="text-xl font-bold text-green-600">88%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '88%' }} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">You hit most of the expected industry keywords for a Senior Frontend role.</p>
            </div>
          </div>

          <div className="mt-auto pt-6 flex justify-center w-full">
            <button className="w-full h-14 bg-gray-900 text-white rounded-2xl font-bold text-base hover:bg-black transition-colors shadow-lg flex items-center justify-center space-x-2 group">
              <span className="material-symbols-outlined group-hover:animate-bounce">download</span>
              <span>Download Full Report</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
