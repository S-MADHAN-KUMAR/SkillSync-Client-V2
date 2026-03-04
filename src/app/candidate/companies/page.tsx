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

export default function CompaniesPage() {
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
        <div className="flex bg-[#1a1a1a] min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
        :root {
            --deep-charcoal: #252525;
            --off-white: #f5f7f9;
            --preview-bg: #f8fafc;
            --card-white: #ffffff;
            --accent-blue: #3b82f6;
            --accent-red: #ef4444;
            --accent-yellow: #facc15;
            --accent-pink: #f472b6;
            --accent-green: #4ade80;
        }
        body {
            font-family: 'Inter', sans-serif;
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      ` }} />

            <Sidebar user={user} onLogout={handleLogout} />

            <div className="flex-1 bg-white overflow-hidden flex rounded-l-[40px] my-2">
                <main className="w-[520px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Explore Companies</h1>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input
                                className="w-full bg-white border-none rounded-2xl h-12 pl-12 text-sm shadow-sm focus:ring-2 focus:ring-gray-900 transition-all"
                                placeholder="Search industries, names..."
                                type="text"
                            />
                        </div>
                        <div className="flex space-x-6 mt-6 text-sm font-semibold">
                            <button className="text-black border-b-2 border-black pb-2 px-1">All Companies</button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors pb-2 px-1">Following</button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors pb-2 px-1">Recommended</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-6">
                        {/* Featured Card */}
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-gray-900 group">
                            <div className="h-28 w-full bg-gray-100 relative">
                                <img
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600"
                                />
                                <div className="absolute -bottom-6 left-6 w-14 h-14 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center border border-gray-100">
                                    <img
                                        alt="Logo"
                                        className="w-full h-full object-contain rounded-lg text-xs"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
                                    />
                                </div>
                            </div>
                            <div className="pt-8 px-6 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">DesignFlow</h3>
                                        <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-100 text-blue-600 rounded-full uppercase tracking-wider">Technology</span>
                                    </div>
                                    <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors">Following</button>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">Building the next generation of collaborative workspace tools for global creative teams.</p>
                            </div>
                        </div>

                        {/* Other Cards */}
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200">
                            <div className="h-24 w-full bg-gray-100 relative">
                                <img
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
                                />
                                <div className="absolute -bottom-6 left-6 w-14 h-14 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center border border-gray-100">
                                    <div className="w-full h-full bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm">VS</div>
                                </div>
                            </div>
                            <div className="pt-8 px-6 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">Visionary Studio</h3>
                                        <span className="text-[10px] font-bold px-2.5 py-1 bg-pink-100 text-pink-600 rounded-full uppercase tracking-wider">Creative Agency</span>
                                    </div>
                                    <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">Follow</button>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">A multi-disciplinary design studio focused on high-end branding and digital experiences.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200">
                            <div className="h-24 w-full bg-gray-100 relative">
                                <img
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=600"
                                />
                                <div className="absolute -bottom-6 left-6 w-14 h-14 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center border border-gray-100">
                                    <div className="w-full h-full bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold text-sm">NT</div>
                                </div>
                            </div>
                            <div className="pt-8 px-6 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">NextTier Data</h3>
                                        <span className="text-[10px] font-bold px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full uppercase tracking-wider">FinTech</span>
                                    </div>
                                    <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">Follow</button>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">Providing advanced analytics and data solutions for modern financial institutions worldwide.</p>
                            </div>
                        </div>
                    </div>
                </main>

                <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
                    <div className="absolute top-8 right-8 z-10">
                        <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-12 pt-12 pb-32 custom-scrollbar">
                        <div className="max-w-3xl mx-auto">
                            {/* Profile Header */}
                            <div className="flex items-center space-x-8 mb-12">
                                <div className="w-28 h-28 bg-white rounded-[32px] shadow-2xl p-4 flex items-center justify-center border border-gray-100 shrink-0 transform -rotate-1">
                                    <img
                                        alt="DesignFlow Logo"
                                        className="w-full h-full object-contain"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">DesignFlow</h1>
                                    <div className="flex items-center space-x-4 mt-3">
                                        <span className="text-sm font-semibold text-gray-500 flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-50">
                                            <span className="material-symbols-outlined text-base mr-1.5 text-blue-500">location_on</span>
                                            San Francisco, CA
                                        </span>
                                        <span className="text-gray-200">|</span>
                                        <span className="text-sm font-semibold text-gray-500 flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-50">
                                            <span className="material-symbols-outlined text-base mr-1.5 text-purple-500">groups</span>
                                            500-1000 Employees
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {/* Mission Section */}
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 w-1 h-full bg-blue-500 rounded-full opacity-20"></div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Our Mission</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        We exist to bridge the gap between imagination and execution. Our platform enables thousands of creative teams to collaborate in real-time, regardless of where they are in the world.
                                    </p>
                                </div>

                                {/* Highlights Section */}
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Culture Highlights</h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1">Fast Growth</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">Voted Top 10 fastest growing startups in 2023 by TechCrunch.</p>
                                        </div>
                                        <div className="p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-2xl">home_work</span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1">Remote First</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">Flexible work arrangements and comprehensive home office stipends.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Jobs Section */}
                                <div>
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-8">
                                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest text-xs">Active Job Openings (4)</h2>
                                        <button className="text-sm font-bold text-gray-500 flex items-center hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-50">
                                            Filter <span className="material-symbols-outlined text-lg ml-2">filter_list</span>
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { title: "Senior Product Designer", type: "Full-time", salary: "$140k - $180k", color: "blue" },
                                            { title: "Lead Frontend Engineer", type: "Remote", salary: "$160k - $210k", color: "green" },
                                            { title: "Backend Systems Architect", type: "Hybrid", salary: "$170k - $230k", color: "purple" },
                                            { title: "Product Marketing Manager", type: "Full-time", salary: "$130k - $160k", color: "orange" }
                                        ].map((job, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-between group hover:border-gray-200 hover:shadow-md transition-all">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-1.5 h-10 rounded-full bg-${job.color}-500 opacity-20 group-hover:opacity-100 transition-opacity`}></div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-900 transition-colors group-hover:text-blue-600">{job.title}</h5>
                                                        <div className="flex gap-3 mt-1.5">
                                                            <span className={`px-3 py-0.5 bg-${job.color}-50 text-${job.color}-600 text-[10px] font-bold rounded-full uppercase tracking-tighter`}>{job.type}</span>
                                                            <span className="px-3 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-tighter">{job.salary}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-2xl text-xs font-bold hover:bg-gray-900 hover:text-white transition-all transform active:scale-95 shadow-sm">
                                                    View
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent pt-12 backdrop-blur-[2px]">
                        <div className="w-full max-w-2xl flex flex-col items-center">
                            <button className="w-[340px] h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95">
                                Visit Website
                                <span className="material-symbols-outlined text-xl">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
