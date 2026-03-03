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

export default function SyncAIPage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const hasChecked = useRef(false);
    const [selectedFeature, setSelectedFeature] = useState("interview");

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

    const features = [
        {
            id: "interview",
            icon: "mic",
            title: "Mock Interview",
            tag: "Interview Prep",
            color: "blue",
            description: "Practice with our AI coach and get real-time feedback on your answers.",
            longDescription: "Simulate real job interviews with our intelligent conversational engine. Receive feedback on tone, body language, and content accuracy.",
            bgColor: "bg-blue-50",
            pillColor: "bg-[#e0f2fe]",
            textColor: "text-blue-600",
            iconColor: "text-blue-500",
            detailIcon: "graphic_eq"
        },
        {
            id: "resume",
            icon: "description",
            title: "Resume Analyzer",
            tag: "Optimization",
            color: "purple",
            description: "Score your resume against top industry benchmarks and fix weaknesses.",
            longDescription: "Our AI analyzes your resume structure, keyword density, and formatting to ensure it passes through ATS systems with high scores.",
            bgColor: "bg-purple-50",
            pillColor: "bg-[#f3e8ff]",
            textColor: "text-purple-600",
            iconColor: "text-purple-500",
            detailIcon: "analytics"
        },
        {
            id: "skill",
            icon: "bar_chart",
            title: "Skill Gap Analysis",
            tag: "Career Path",
            color: "emerald",
            description: "Discover what skills you're missing for your dream job roles.",
            longDescription: "Map your skills against current market needs. We'll show you exactly which technologies or certifications you need to advance.",
            bgColor: "bg-emerald-50",
            pillColor: "bg-[#ecfdf5]",
            textColor: "text-emerald-600",
            iconColor: "text-emerald-500",
            detailIcon: "trending_up"
        },
        {
            id: "match",
            icon: "auto_awesome",
            title: "AI Job Matcher",
            tag: "Smart Search",
            color: "rose",
            description: "Get curated job listings that perfectly align with your profile and goals.",
            longDescription: "Go beyond keyword matching. Our AI understands your career trajectory and preferences to find your true next destination.",
            bgColor: "bg-rose-50",
            pillColor: "bg-[#fff1f2]",
            textColor: "text-rose-600",
            iconColor: "text-rose-500",
            detailIcon: "hub"
        }
    ];

    const activeFeature = features.find(f => f.id === selectedFeature) || features[0];

    return (
        <div className="w-full min-h-screen bg-white overflow-hidden flex font-inter">
            <style dangerouslySetInnerHTML={{
                __html: `
        :root {
            --deep-charcoal: #252525;
            --off-white: #f5f7f9;
            --preview-bg: #f8fafc;
            --card-white: #ffffff;
            --accent-blue: #3b82f6;
            --accent-purple: #8b5cf6;
            --accent-emerald: #10b981;
            --accent-rose: #f43f5e;
            --pastel-blue: #e0f2fe;
            --pastel-purple: #f3e8ff;
            --pastel-emerald: #ecfdf5;
            --pastel-rose: #fff1f2;
        }
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
        .card-shadow {
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      ` }} />

            {/* Sidebar Integration */}
            <Sidebar user={user} onLogout={handleLogout} />

            {/* Main Hub Content */}
            <main className="w-[580px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 shrink-0 overflow-hidden">
                <div className="p-8 h-full">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Features Hub</h1>
                        <p className="text-sm text-gray-500">Supercharge your career journey with our advanced AI tools.</p>
                    </header>

                    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar pb-10">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                onClick={() => setSelectedFeature(feature.id)}
                                className={`bg-white p-6 rounded-[32px] card-shadow border transition-all cursor-pointer h-[280px] flex flex-col group ${selectedFeature === feature.id ? 'border-blue-200 scale-[1.02] shadow-lg' : 'border-transparent hover:scale-[1.02] hover:shadow-md'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl ${feature.bgColor} flex items-center justify-center ${feature.iconColor} mb-4 transition-transform group-hover:rotate-6`}>
                                    <span className="material-symbols-outlined">{feature.icon}</span>
                                </div>
                                <span className={`w-fit px-3 py-1 ${feature.pillColor} ${feature.textColor} text-[10px] font-bold rounded-full mb-3 uppercase tracking-wider`}>
                                    {feature.tag}
                                </span>
                                <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{feature.description}</p>
                                <div className="mt-auto flex justify-end">
                                    <span className={`material-symbols-outlined transition-all ${selectedFeature === feature.id ? 'text-blue-500 translate-x-1' : 'text-gray-200'}`}>
                                        arrow_forward
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Feature Preview Section */}
            <section className="flex-1 bg-[#f8fafc] flex flex-col relative overflow-hidden">
                <div className="absolute top-8 right-8 z-20">
                    <button
                        onClick={() => router.push('/candidate/dashboard')}
                        className="w-10 h-10 bg-white text-gray-400 rounded-full flex items-center justify-center shadow-sm hover:text-gray-900 hover:shadow-md transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-12 pt-16 pb-24 custom-scrollbar flex flex-col items-center">
                    <div className="w-full max-w-md bg-white rounded-[40px] p-8 card-shadow mb-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">

                        <div className={`w-full aspect-square ${activeFeature.bgColor} rounded-[32px] flex items-center justify-center mb-8 relative overflow-hidden group`}>
                            <div className="absolute inset-0 opacity-10 flex items-center justify-center transition-transform group-hover:scale-110 duration-1000">
                                <span className="material-symbols-outlined text-[200px]">{activeFeature.detailIcon}</span>
                            </div>
                            <div className="relative z-10 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-8 border-white/50 ring-4 ring-offset-2 ring-gray-50">
                                <span className={`material-symbols-outlined text-5xl ${activeFeature.iconColor}`}>{activeFeature.icon}</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeFeature.title}</h2>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            {activeFeature.longDescription}
                        </p>

                        <div className="w-full space-y-4 mb-8">
                            <div className="flex items-center p-4 bg-[#f9fafb] rounded-2xl w-full border border-gray-50 hover:bg-white hover:border-blue-100 transition-all">
                                <span className={`material-symbols-outlined ${activeFeature.iconColor} mr-4`}>psychology</span>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-gray-900">Personalized Insights</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-tight">Tailored to your career level</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-[#f9fafb] rounded-2xl w-full border border-gray-50 hover:bg-white hover:border-emerald-100 transition-all">
                                <span className="material-symbols-outlined text-emerald-500 mr-4">analytics</span>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-gray-900">Real-time Feedback</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-tight">Data-driven scoring engine</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full h-16 bg-gray-900 text-white rounded-3xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center space-x-3 group active:scale-[0.98]">
                            <span>Get Started</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">play_arrow</span>
                        </button>
                    </div>

                    <div className="max-w-md w-full px-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                            <span className="material-symbols-outlined text-yellow-400 mr-2 animate-spin-slow">stars</span>
                            Next Learning Milestone
                        </h4>
                        <div className="flex space-x-2">
                            <div className="flex-1 h-2.5 bg-blue-500 rounded-full shadow-sm shadow-blue-200"></div>
                            <div className="flex-1 h-2.5 bg-blue-500 rounded-full shadow-sm shadow-blue-200"></div>
                            <div className="flex-1 h-2.5 bg-gray-200 rounded-full"></div>
                        </div>
                        <p className="text-[11px] font-semibold text-gray-400 mt-2 text-center">2 of 3 sessions completed this week</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
