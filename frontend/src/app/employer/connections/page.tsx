"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface User {
    id: number;
    email: string;
    fullName: string;
    userType: "candidate" | "employer";
    is_onboarded: boolean;
}

export default function ConnectionsPage() {
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
            if (userData.userType !== "employer") {
                router.push("/candidate");
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
            --accent-indigo: #6366f1;
            --accent-green: #22c55e;
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

            <div className="flex-1 bg-white overflow-hidden flex">
                <main className="w-[500px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Network Hub</h1>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input
                                className="w-full bg-white border-none rounded-2xl h-12 pl-12 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="Search by name, role, or company..."
                                type="text"
                            />
                        </div>
                        <div className="flex space-x-6 mt-6 text-sm font-semibold">
                            <button className="text-black border-b-2 border-black pb-2 px-1">Discover</button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors pb-2 px-1 flex items-center">
                                Pending
                                <span className="ml-2 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors pb-2 px-1">My Network</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Suggestions for you</p>

                        {[
                            { name: "Sarah J. Miller", role: "Senior UX Designer", company: "Meta", image: "https://i.pravatar.cc/150?u=sarah", mutuals: 12 },
                            { name: "David Chen", role: "Lead Frontend Engineer", company: "Google", image: "https://i.pravatar.cc/150?u=david", mutuals: 8 },
                            { name: "Elena Rodriguez", role: "Product Manager", company: "Airbnb", image: "https://i.pravatar.cc/150?u=elena", mutuals: 15 },
                            { name: "Marcus Thorne", role: "Full Stack Developer", company: "Stripe", image: "https://i.pravatar.cc/150?u=marcus", mutuals: 4 },
                            { name: "Aria Kim", role: "UI/UX Researcher", company: "Netflix", image: "https://i.pravatar.cc/150?u=aria", mutuals: 21 }
                        ].map((person, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-indigo-100 group flex items-center space-x-4">
                                <div className="relative shrink-0">
                                    <img src={person.image} className="w-14 h-14 rounded-2xl object-cover" alt={person.name} />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{person.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{person.role} @ {person.company}</p>
                                    <p className="text-[10px] text-indigo-500 font-semibold mt-1 flex items-center">
                                        <span className="material-symbols-outlined text-[12px] mr-1">group</span>
                                        {person.mutuals} mutual connections
                                    </p>
                                </div>
                                <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white">
                                    <span className="material-symbols-outlined">person_add</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </main>

                <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
                    <div className="absolute top-8 right-8 z-10 flex space-x-2">
                        <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-xl">share</span>
                        </button>
                        <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                            <span className="material-symbols-outlined text-xl">more_horiz</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-12 pt-16 pb-32 custom-scrollbar">
                        <div className="max-w-2xl mx-auto flex flex-col items-center">
                            {/* Profile Card */}
                            <div className="w-full bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden mb-10">
                                <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                                </div>
                                <div className="px-10 pb-10 relative">
                                    <div className="absolute -top-16 left-10">
                                        <img src="https://i.pravatar.cc/150?u=sarah" className="w-32 h-32 rounded-[32px] border-4 border-white shadow-2xl object-cover" alt="Sarah J. Miller" />
                                    </div>
                                    <div className="pt-20 flex justify-between items-start">
                                        <div>
                                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sarah J. Miller</h1>
                                            <p className="text-lg font-medium text-gray-600 mt-1">Senior UX Designer at Meta</p>
                                            <div className="flex items-center space-x-3 mt-4">
                                                <span className="text-sm font-semibold text-gray-400 flex items-center">
                                                    <span className="material-symbols-outlined text-base mr-1 text-indigo-500">location_on</span>
                                                    San Francisco, US
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-sm font-semibold text-gray-400">500+ Connections</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                                                Message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-6 w-full mb-12">
                                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center">
                                    <div className="text-2xl font-black text-gray-900">42</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Posts</div>
                                </div>
                                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center">
                                    <div className="text-2xl font-black text-gray-900">12k</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Followers</div>
                                </div>
                                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center">
                                    <div className="text-2xl font-black text-gray-900">856</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Connections</div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="w-full space-y-10">
                                <div>
                                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">About</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                        Passionate about creating human-centric digital experiences. Currently leading the design system team at Meta, focusing on accessibility and visual harmony across platforms.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Recent Activity</h2>
                                    <div className="space-y-4">
                                        <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm hover:border-indigo-200 transition-all cursor-pointer">
                                            <p className="text-sm font-bold text-gray-900 leading-tight">Just published: "The Future of AI in UX Design Systems"</p>
                                            <div className="flex items-center mt-3 space-x-4">
                                                <span className="text-[10px] font-bold text-gray-400 flex items-center">
                                                    <span className="material-symbols-outlined text-xs mr-1 text-red-500">favorite</span> 1.2k
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-400 flex items-center">
                                                    <span className="material-symbols-outlined text-xs mr-1 text-blue-500">chat_bubble</span> 84
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent pt-12">
                        <button className="w-full max-w-md h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 transform hover:-translate-y-1">
                            <span className="material-symbols-outlined">person_add</span>
                            Connect with Sarah
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
